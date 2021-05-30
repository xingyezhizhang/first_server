const DB = require('./DB'),
    fs = require('fs');

module.exports = {
    rootDirectory(req, res) {
        if (!req.session.prove) { //permit or prove 单词选择
            res.render('./login.html', {});
            return;
        }
        DB.select(function (data) {
            res.render('./pan_link.html', { data: data });
        });

    },
    login(req, res) {
        let steams = ''
        req.on('data', function (data) {
            steams += data;
        });
        req.on('end', function () {
            let Params = new URLSearchParams(steams);
            let user = { name: 'XiaoTu', pw: 'WoJiuShiBuGaoSuNi' };
            if (Params.get('user') == user.name && Params.get('pwd') == user.pw) {
                req.session.prove = user;
                var backstr = "<script>alert('登录成功');window.location.href='/'</script>"
                res.setHeader('Content-type', 'text/html;charset=utf-8');
                res.end(backstr);
                return;
            } else {
                res.render('./login.html', {});
            }
        });
    },
    addLink(request, res) {
        let steams = '';
        request.on('data', function (data) {
            steams += data;
        });
        request.on('end', function () {
            let content = JSON.parse(steams);
            let regexBaidu = /^.{0,}pan\.(baidu)?\.com\/s\/(.{23})?.{0,}$/;
            let regexPass1 = /^.{0,}[:|：] ([A-Za-z0-9]{4})?.{0,}$/;
            let regexPass2 = /([A-Za-z0-9]{4})?/;
            let passRegex = regexPass1.exec(content.pass) || regexPass2.exec(content.pass);
            try {
                let data = {
                    link_name: content.name,
                    // 目前只支持百度网盘
                    domain_name: `pan.${regexBaidu.exec(content.link)[1]}.com/s/`,
                    herf_link: regexBaidu.exec(content.link)[2],
                    password: passRegex[1],
                    description: ''
                };
                DB.where(`herf_link='${data.herf_link}'`).select(function (result) {
                    if (result.length == 0) { // 去重
                        DB.field(Object.keys(data)).value(`'${Object.values(data).join("','")}'`).insert(function () {
                            res.setHeader('Content-type', 'text/html;charset=utf8');
                            res.end("添加成功！");
                        })
                    }
                });
            } catch (error) {
                // console.log(error); // 属性有 message 和 stack
                if (error instanceof TypeError) {
                    res.setHeader('Content-type', 'text/palin;charset=UTF-8;')
                    res.end('链接或提取码错误！');
                }
            }
        });
    }
}
