import fs from 'fs'
import path from 'path'

// read files list
const readFiles = (type, doc = 'none') => {
  return new Promise((resolve, reject) => {
    const dir = path.join(__dirname, '../src')
    fs.readdir(dir, (err, files) => {
      resolve(files)
      // resolve(files.filter((v) => exts.includes(path.parse(v).ext)))
    })
  })
}

// create root dir
const createRootDir = () => {
  return new Promise((resolve, reject) => {
    const dir = path.join(__dirname, '../dist')
    fs.mkdir(dir, (err) => {
      if (err) {
        if (err.code === 'EEXIST') {
          console.log(dir + ' 目录已经存在')
          resolve(true)
        } else {
          throw err
          resolve(false)
        }
      } else {
        console.log('目录创建成功')
        resolve(true)
      }
    })
  })
}

// create dir
const createDir = (file) => {
  return new Promise((resolve, reject) => {
    let fileDir = path.join(__dirname, '../dist', file)
    fs.mkdir(fileDir, (err) => {
      if (err) {
        if (err.code === 'EEXIST') {
          console.log(fileDir + ' 目录已经存在')
          resolve(true)
        } else {
          throw err
          resolve(false)
        }
      } else {
        console.log('目录创建成功')
        resolve(true)
      }
    })
  })
}

//  read file
const readFile = (doc) => {
  return new Promise(async (resolve, reject) => {
    let fileDir = path.join(__dirname, '../src', doc, 'html/index.html')
    let exist = await exists(fileDir)
    if (exist) {
      fs.readFile(fileDir, 'utf-8', function(err, data) {
        if (err) {
          throw err
        } else {
          resolve(data)
        }
      })
    } else {
      resolve(false)
    }
  })
}

// write file
const writeFile = (file, data) => {
  return new Promise((resolve, reject) => {
    let outputDir = path.join(__dirname, '../dist', file)
    fs.writeFile(outputDir, data, function(err) {
      if (err) {
        console.error(err)
        resolve(false)
      } else {
        console.log('拷贝成功')
        resolve(true)
      }
    })
  })
}

//  judgment
const exists = (dir) => {
  return new Promise((resolve, reject) => {
    fs.exists(dir, (exists) => {
      resolve(exists)
    })
  })
}

//  run
(async () => {
  let docs = await readFiles('src')
  let rootDir = await createRootDir()

  if (rootDir) {
    for (let doc of docs) {

      let dirExist = await createDir(doc)
      if (dirExist) {
        let data = await readFile(doc)
        await writeFile(doc + '/index.html', data)
      }

    }
  }
})()
