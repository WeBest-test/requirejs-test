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
        template:'./thirdparty/template-native',
        comp:'./component',
        cont:'./control'
    },
    shim: {
        'base64': {
            exports: 'Base64'
        }
    },
    urlArgs: "bust=" +  (new Date()).getTime()
});
require(
    [
        'comp/Weixin',
        'cont/Sharing',
        'tmpl/selftmpl'
    ],
    function(Weixin,Sharing,t){
        Sharing.init();
        Weixin.init();
    }
);