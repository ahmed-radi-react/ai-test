const fs = require('fs');
const path = require('path');

function getFilePaths(dirPath) {
  let filePaths = [];
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const isDirectory = fs.statSync(filePath).isDirectory();

    if (isDirectory) {
      filePaths = filePaths.concat(getFilePaths(filePath));
    } else {
      filePaths.push(filePath);
    }
  }

  return filePaths;
}

const projectDirPath = path.resolve(__dirname, '..');
const filePaths = getFilePaths(projectDirPath);
const readmeContent = filePaths.join('\n');

fs.writeFile(path.resolve(projectDirPath, 'README.md'), readmeContent, (err) => {
  if (err) throw err;
  console.log('The README.md file has been updated!');
});