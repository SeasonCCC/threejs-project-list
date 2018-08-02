import fs from 'fs'
import path from 'path'

const htmlDir = path.join(__dirname, '../src/html')
const exts = [
  '.html'
]

// read files list
let readFiles = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(htmlDir, (err, files) => {
      resolve(files.filter((v) => exts.includes(path.parse(v).ext)))
    })
  })
}

//  run
;(async () => {
  let files = await readFiles()
  console.log(files)
})()

// fs.readFile('./src/html/index.html', 'utf-8', function(err, data) {
//   if (err) {
//     throw err
//   }
// })
//
// fs.mkdir('./dist/', function(err) {
//   if (err) {
//     return console.error(err)
//   }
//   console.log('目录创建成功。')
// })
//
// fs.writeFile('./dist/index.html', data, function(err) {
//   if (err) {
//     console.error(err)
//   } else {
//     console.log('写入成功')
//   }
// })
