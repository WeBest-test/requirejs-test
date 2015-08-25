/**
 * 声音播放相关
 */
define(
    [],
    function () {

        var osrc1, osrc2;
        var ai1 = new Image();
        ai1.src = "" + bed.base + "public/sharing/img/plays.gif?2";

        var ai2 = new Image();
        ai2.src = "" + bed.base + "public/sharing/img/plays.gif?2";

        /**
         * 一级评论播放
         */
        function cplay() {
            if ($("audio.playing")[0]) {
                var p = $("audio.playing")[0];
                p.pause();
                p.currentTime = 0.0;
            }

            //一级回复播放控制
            var c = $(".cbtn");
            c.off("click");

            c.click(function () {

                if ($("audio.playing")[0]) {
                    var p = $("audio.playing")[0];
                    p.pause();
                    p.currentTime = 0.0;
                }

                var that = this;
                var a = $(this).next("audio")[0];
                if (!$(a).hasClass("playing")) {
                    osrc1 = that.src;
                    that.src = ai1.src;
                    a.play();
                    $(a).addClass("playing");
                }
                $(a).off("ended pause");
                $(a).on("ended pause", function () {
                    $(a).removeClass("playing");
                    that.src = osrc1;
                });
            });
        }

        /**
         * 二级评论播放
         */
        function c2play() {


            //二级回复播放控制
            var c2 = $(".c2btn");
            c2.off("click");

            c2.click(function () {

                if ($("audio.playing")[0]) {
                    var p = $("audio.playing")[0];
                    p.pause();
                    p.currentTime = 0.0;
                }

                var that = this;
                var a = $(this).next("audio")[0];
                if (!$(a).hasClass("playing")) {
                    osrc2 = that.src;
                    that.src = ai2.src;
                    a.play();
                    $(a).addClass("playing");
                }
                $(a).off("ended pause");
                $(a).on("ended pause", function () {
                    $(a).removeClass("playing");
                    that.src = osrc2;
                });
            });
        }


        /**
         * 暴露，返回
         */

        var p = {
            cplay:cplay,
            c2play:c2play
        };
        return p;


    }
);