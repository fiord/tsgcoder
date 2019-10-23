import * as html from 'html';
import * as markdown from 'markdown';
import * as fs from 'fs';

function main() {
  if (process.argv.length !== 3) {
    console.error("Usage: node test.js <markdown file>");
    process.exit();
  }

  const mdFile = process.argv[2];
  console.log("input file: " + mdFile);
  const content = fs.readFileSync(mdFile, {encoding: 'utf-8'});
  const output = html.prettyPrint(markdown.markdown.toHTML(content));
  const outFile = mdFile + ".html";
  console.log("output file: " + outFile);
  fs.writeFileSync(outFile, output, "utf-8");
  console.log("completed");
  process.exit();
}

main();
