/**
 * 程序主app文件
 * By 刘各欢
 * 20150818
 * */

define(
    [
        'comp/Weixin',
        'cont/Sharing',
        'comp/Dom'
    ],
    function(Weixin,Sharing,d){
        function init(){
            Sharing.init();
            Weixin.init(1);
        }

        var c = {
            init:init
        };
        return c;

    }
);