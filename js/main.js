/**
 * 程序主入口文件
 * By 刘各欢
 * 20150818
 * */
var bust = function(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var h = now.getHours();
    var m = now.getMinutes();
    var M = now.getSeconds();
    if(M<=20){
        M = 0;
    }else if(M <=40){
        M = 1;
    }else{
        M = 2;
    }
    return ""+year+month+date+h+m+M;
};

requirejs.config({
    //baseUrl: '//mtest.shuiqian.cc/public/sharing/v2/js',
    paths: {
        bedtime: './config/bedtime',
        wx: '//res.wx.qq.com/open/js/jweixin-1.0.0',
        base64:'./thirdparty/base64.min',
        template:'./thirdparty/template-native',
        comp:'./component',
        cont:'./control'
    },
    shim: {
        'base64': {
            exports: 'Base64'
        }
    },
    waitSeconds:15,
    urlArgs: "bust=" +  bust()
});
//不把具体逻辑放在main中，防止main文件被浏览器长时间缓存
require(
    [
        'app/'+bed.appName
    ],
    function(app){
        app.init();
    }
);