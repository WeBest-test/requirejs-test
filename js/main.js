/**
 * 程序主入口文件
 * By 刘各欢
 * 20150818
 * */
requirejs.config({
    //baseUrl: '//mtest.shuiqian.cc/public/sharing/v2/js',
    paths: {
        bedtime: './config/bedtime',
        wx: '//res.wx.qq.com/open/js/jweixin-1.0.0',
        base64:'./thirdparty/base64.min',
        template:'./thirdparty/template-native'
    },
    shim: {
        'base64': {
            exports: 'Base64'
        }
    }
});
require(
    [
        'wx',
        'control/Login',
        'control/Reply',
        'control/Weixin',
        'control/Sharing',
    ],
    function(wx,Login,Reply,Weixin,Sharing){
        Sharing.init();
        Weixin.init();
    }
);