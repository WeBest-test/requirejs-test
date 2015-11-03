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
                if((!!bed.ajaxTotal)&&(bed.ajaxTotal>0)){
                    bed.ajaxTotal-=1;
                }
                if((typeof bed.ajaxTotal == 'undefined')||(bed.ajaxTotal==0)){
                    $("body").css("height","auto");
                    $(".container").css("display","block");
                    $("#loading").remove();
                }

            },
            /**
             * 改变wrap的宽度 方便margin 0 auto 居中
             */
            initSharingBottomWidth:function(){

                var baseW = $("html").width();

                $(".others .otherswrap").width(parseInt(baseW * 0.95));//对像素值取整数
                var v = $(".others .otherswrap").width() - $(".others .headpic").width();
                $(".others .contentwrap").width(v);
                $(".others .hr").width(v + parseInt(baseW * 0.025) - 12); //0.025 = 5%/2  12 = cmtwrap left margin
            },
            fixWhiteHeight:function(){
                var l = $(".otherswrap:last").has('img.c2btn').length;
                if(!!l){
                    $(".white").height('60px');
                }
            }
        };

        return Dom;


    }
);