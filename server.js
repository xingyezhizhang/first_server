const express = require('express'),
    router = require('./route'),
    cookSe = require('cookie-session'),
    app = express();



app.use(cookSe({
    name: 'pan.link',
    keys: ['cookie']
}));

// 引入模板引擎 设置模板引擎加载资源的后缀名
app.engine('html', require('express-art-template'));
app.use(router);

app.use(express.static('public'));

app.listen(8020, () => {
    console.log(`My server running 8020`)
});
/*
    1. config 暂不考虑
    2. cookie 暂用当前
    3. 路由
    4. 登录功能 (初步实现)
    5. 链接的失效验证 与 油猴脚本交互
    6.

*/
