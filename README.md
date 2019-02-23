# vue_music

> vue仿写的酷狗音乐项目

### 1. 安装

```bash
# 拉取项目
git clone https://github.com/GYunZhi/vue_music.git
```

```bash
# 进入项目根目录
cd vue_music

# 切换到 develop 分支
git checkout develop

# 安装依赖
yarn
```

运行项目

```bash
yarn run dev
```

### 2. 分支说明

- master 用于发生产
- develop 开发分支
- 若要执行任务或是修复 bug, 我们从 develop 拉取一个分支来编写我们的代码，若执行完成再合并至 develop 分支。

### 3. 代理配置

```javascript
// 配置代理
proxyTable: {
  '/proxy': {
    target: 'http://m.kugou.com', // 当匹配到/proxy/rank/list?json=true时，会把/proxy替换成http://m.kugou.com/rank/list?json=true
    secure: false, // 不开启https
    changeOrigin: true, // 是否跨域
    pathRewrite: {
      '^/proxy': '' // 重写路径，当我们定义了一个字符串，如api时，请求路径会被重写为http://m.kugou.com/api/rank/list?json=true
    },
    headers: { // 设置请求头，模拟手机端发送请求
      'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Mobile Safari/537.36'
    }
  },
  '/sproxy': {
    target: 'http://mobilecdn.kugou.com',
    changeOrigin: true,
    pathRewrite: {
      '^/sproxy': ''
    }
  },
  '/bproxy': {
    target: 'http://www.kugou.com',
    changeOrigin: true,
    pathRewrite: {
      '^/bproxy': ''
    }
  }
},
```
