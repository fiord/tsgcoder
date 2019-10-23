const model = require('../models/');
const fs = require('fs');
const streams = require('memory-streams');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const Docker = require('dockerode');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });
let using = false;

module.exports.exec = async () => {
  if(using) {
    console.log("code_executing is running now.");
    return;
  }
  using = true;

  const code = await model.exec.findOne({
    where: {
      state: 'pending'
    },
    order: [['created_at']],
  });

  console.log("code:", code);

  if(!code) {
    console.info("there are no codes to execute.");
    using = false;
    return;
  }

  // 言語を取得
  const lang = await model.lang.findOne({
    where: {
      id: code.lang,
    },
  });

  console.log("lang:", lang);

  if(!lang) {
    console.log("there are no language.");
    await code.update({
      state: "finished",
      stderr: "there are no programming language",
    });
    using = false;
    return;
  }

  console.log("[log] start write code to tmp file...");

  fs.writeFileSync("./tmp/code", code.code);

  // set state = 'executing'
  await code.update({state: 'executing'});

  console.log("[log] set state to 'executing'");

  const stdinStream = new streams.ReadableStream(code.stdin + "\n");
  const compileStream = new streams.WritableStream();
  const stdoutStream = new streams.WritableStream();
  const stderrStream = new streams.WritableStream();

  let container = await docker.createContainer({
    Image: 'fiord/tsgcoder',
    name: `test${code.id}`,
    User: 'fiord',
    Detach: false,
    stream: true,
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    Tty: false,
    OpenStdin: true,
    StdinOnce: false,
    WorkingDir: '/home/fiord',
    Volumes: {
      '/volume': {},
    },
    HostConfig: {
      Binds: [`${process.env.PWD}/tmp:/home/fiord`],
    }
  });
  await container.start();
  console.info("container started");

  let skipExecution = false;

  if(lang.compile_code) {
    let exec = await container.exec({
      Cmd: ["/bin/sh", "-c", lang.compile_code],
    });

    let execStream = await exec.start({
      stream: true,
      hijack: true,
      stdin: false,
    });

    execStream.output.pipe(compileStream);

    await new Promise((resolve) => {
      execStream.output.on('end', () => {
        console.info("compile finished");
        resolve();
      });
      execStream.output.on('error', async() => {
        console.info("compile error");
        await code.update({
          compile: compileStream.toString(),
        });
        skipExecution = true;
        resolve();
      });
    });
  }

  if (!skipExecution) {
    console.log(["/bin/sh", "-c", lang.commands]);
    let exec = await container.exec({
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Cmd: ["/bin/sh", "-c", lang.commands],
    });

    let execStream = await exec.start({
      stream: true,
      hijack: true,
      stdin: true
    });

    console.info("execution started");

    stdinStream.pipe(execStream.output);
    docker.modem.demuxStream(execStream.output, stdoutStream, stderrStream);

    await new Promise((resolve) => {
      execStream.output.on('end', async() => {
        console.info("ended");
        let stdout = stdoutStream.toString();
        let stderr = stderrStream.toString();
        console.log(stdout, stderr);
        await code.update({
          stdout,
          stderr,
        });
        resolve();
      });
      execStream.output.on('error', resolve);
    });

    console.info('execution ended');
  }
  // await container.stop();
  // await container.remove({force: true});
  console.info('container removed');

  // set state="finished"
  await code.update({
    state: 'finished'
  });
  using = false;
};
