requirejs.config({
    baseUrl: '//mtest.shuiqian.cc/public/sharing/v2/js',
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