import fs from "fs";
import path from "path";

// read files list
const readFiles = new Promise(resolve => {
  const dir = path.join(__dirname, "../src");
  fs.readdir(dir, (err, files) => {
    
    resolve(files);
    // resolve(files.filter((v) => exts.includes(path.parse(v).ext)))
  });
});

// create root dir
const createRootDir = () =>
  new Promise(resolve => {
    const dir = path.join(__dirname, "../dist");
    fs.mkdir(dir, err => {
      if (err) {
        if (err.code === "EEXIST") {
          // console.log(`${dir} 目录已经存在`);
          resolve(true);
        } else {
          throw err;
        }
      } else {
        // console.log('目录创建成功');
        resolve(true);
      }
    });
  });

// create dir
const createDir = file =>
  new Promise(resolve => {
    const fileDir = path.join(__dirname, "../dist", file);
    fs.mkdir(fileDir, err => {
      if (err) {
        if (err.code === "EEXIST") {
          // console.log(`${fileDir} 目录已经存在`);
          resolve(true);
        } else {
          throw err;
          // resolve(false);
        }
      } else {
        // console.log('目录创建成功');
        resolve(true);
      }
    });
  });

//  judgment
const exists = dir =>
  new Promise(resolve => {
    fs.exists(dir, exi => {
      resolve(exi);
    });
  });

//  read file
const readFile = doc =>
  new Promise(async resolve => {
    const fileDir = path.join(__dirname, "../src", doc, "html/index.html");
    const exi = await exists(fileDir);
    if (exi) {
      fs.readFile(fileDir, "utf-8", (err, data) => {
        if (err) {
          throw err;
        } else {
          resolve(data);
        }
      });
    } else {
      resolve(false);
    }
  });

// write file
const writeFile = (file, data) =>
  new Promise(resolve => {
    const outputDir = path.join(__dirname, "../dist", file);
    fs.writeFile(outputDir, data, err => {
      if (err) {
        // console.error(err);
        resolve(false);
      } else {
        // console.log('拷贝成功');
        resolve(true);
      }
    });
  });

(async () => {
  const docs = await readFiles("src");
  const rootDir = await createRootDir();

  if (rootDir) {
    for (let doc of docs) {
      const dirExist = await createDir(doc);
      if (dirExist) {
        const data = await readFile(doc);
        await writeFile(`${doc}/index.html`, data);
      }
    }
  }
})();
