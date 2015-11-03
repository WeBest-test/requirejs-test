/**
 * 程序主app文件
 * By 刘各欢
 * 20150818
 * */

define(
    [
        'comp/Weixin',
        'comp/Dom',
        'cont/Comments_child'
    ],
    function(Weixin,Dom,Comments){
        function init(){
            Comments.init();
            Weixin.init(1);
        }

        var c = {
            init:init
        }
        return c;

    }
);