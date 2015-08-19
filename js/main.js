/**
 * 程序主入口文件
 * By 刘各欢
 * 20150818
 * */
require(['./config/config'], function () {
    require(
        [
            'wx',
            'bedtime',
            'template',
            'app',
            'control/Login',
            'control/Reply',
            'control/Weixin'
        ],
        function(wx,bed,template,app,Login,Reply,Weixin){
            //require('app');
        }
    );
});