const path = require('path')
const express = require('express')
const proxy = require('http-proxy-middleware')

const app = express()

app.use(express.static(path.resolve(__dirname, './public')))

app.use('/proxy', proxy({
  target: 'http://m.kugou.com', // 当匹配到/proxy/rank/list?json=true时，会把/proxy替换成http://m.kugou.com/rank/list?json=true
  secure: false, // 不开启https
  changeOrigin: true, // 是否跨域
  pathRewrite: {
    '^/proxy': '' // 重写路径，当我们定义了一个字符串，如api时，请求路径会被重写为http://m.kugou.com/api/rank/list?json=true
  },
  headers: { // 设置请求头，模拟手机端发送请求
    'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Mobile Safari/537.36'
  }
}))

app.use('/sproxy', proxy({
  target: 'http://mobilecdn.kugou.com',
  changeOrigin: true,
  pathRewrite: {
    '^/sproxy': ''
  }
}))

app.use('/bproxy', proxy({
  target: 'http://www.kugou.com',
  changeOrigin: true,
  pathRewrite: {
    '^/bproxy': ''
  }
}))

app.listen(3000)
