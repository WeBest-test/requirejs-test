/**
 * DOM相关逻辑
 */
define(
    [],
    function () {

        var Dom = {
            /**
             * 隐藏Loading提示，恢复body高度为auto
             */
            removeLoading:function(){
                $("body").css("height","auto");
                $(".container").css("display","block");
                $("#loading").remove();
            }
        };

        return Dom;


    }
);