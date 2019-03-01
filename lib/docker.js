const model = require('../models/');
const fs = require('fs');
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

  const code = await model.exec.findAll({
    where: {
      state: 'pending'
    },
    order: [['updated_at']],
    limit: 1,
  });

  if(code.length == 0) {
    console.info("there are no codes to execute.");
    using = false;
    return;
  }

  fs.writeFileSync("./tmp/code", code[0].code);

  // set state = 'executing'
  await code.update({state: 'executing'});

  let container = await docker.createContainer({
    Image: 'fiord/gcc',
    name: `test${code[0].id}`,
    User: 'fiord',
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

  let exec = await container.exec({
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    Cmd: ['python', 'code'],
  });

  let execStream = await exec.start({
    hijack: true,
    stdin: true
  });
 
  console.info("execution started");

  docker.modem.demuxStream(execStream.output, process.stdout, process.stderr);

  await new Promise((resolve) => {
    execStream.output.on('end', resolve);
    execStream.output.on('error', resolve);
  });

  console.info('execution ended');
  await container.stop();
  await container.remove({force: true});
  console.info('container removed');

  // set state="finished"
  await code.update({ state: 'finished' });
  using = false;
};
