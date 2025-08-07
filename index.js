// 简单的Express服务器作为备用方案
const express = require('express');
const path = require('path');
const app = express();

// 提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 所有路由都返回index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 使用环境变量端口或默认3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`服务器运行在端口 ${port}`);
});