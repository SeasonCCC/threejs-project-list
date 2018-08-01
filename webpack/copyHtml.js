const fs = require('fs')

fs.readFile('./src/html/index.html', 'utf-8', function(err, data) {
  if (err) {
    throw err
  }

  fs.mkdir('./dist/', function(err) {
    if (err) {
      return console.error(err)
    }
    console.log('目录创建成功。')
  })

  fs.writeFile('./dist/index.html', data, function(err) {
    if (err) {
      console.error(err)
    } else {
      console.log('写入成功')
    }
  })
});
