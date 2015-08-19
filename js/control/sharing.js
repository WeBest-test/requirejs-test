/**
 * 对分享页面就行初始化
 */
define(
    [
        'bedtime',
        'base64',
        'template'
    ],
    function (bed, Base64, template) {
        bed.templateConfig(template);
        var sharingInit = function () {
            jQuery(function ($) {

                console.log(bed);

                //console.log(bed.Login);

                $(".download").click(download);

                changeWidth();
                $(window).resize(changeWidth);


                /**
                 * 获取当前页面声音的详情，如用户、时间、分类等
                 */
                $.ajax({
                    type: "post",
                    url: "//" + bed.serverURL + "/Get_beatinfo_mp3/info",
                    data: {userid: bed.currUserId, beatid: bed.beatid},//TODO PHP Get方式
                    dataType: "json",
                    success: function (data) {
                        //console.log(data);
                        var d = data.info;
                        d.bed = bed;
                        var html = template('selftmpl', d);
                        console.log(html);
                        //console.log(html);
                        $(".self").html(html);

                        if (d.sex == 1) {
                            $(".self .sexage").css('background-image', 'url(' + bed.base + 'public/sharing/img/boy.png)');

                        } else if (d.sex == 2) {
                            $(".self .sexage").css('background-image', 'url(' + bed.base + 'public/sharing/img/girl.png)');
                        } else {

                        }
                        $("title").html(d.title);

                        //播放控制
                        var ai = new Image();
                        ai.src = "" + bed.base + "public/sharing/img/playl.gif?1";
                        $("#bbtn").off("click");

                        $("#bbtn").click(function () {
                            if ($("audio.playing")[0]) {
                                var p = $("audio.playing")[0];
                                p.pause();
                                p.currentTime = 0.0;
                            }

                            var that = this;
                            var a = $(this).next("audio")[0];
                            if (!$(a).hasClass("playing")) {
                                osrc = that.src;
                                that.src = ai.src;
                                a.play();
                                $(a).addClass("playing");
                            }
                            $(a).off("ended pause");
                            $(a).on("ended pause", function () {
                                $(a).removeClass("playing");
                                that.src = osrc;
                            });
                        });

                        /**
                         * 初始化回复(评论)按钮
                         */
                        //Reply.init();

                    }
                });

                /*获取当前页面的评论列表*/
                var req = 'userid=' + bed.currUserId + '&beatid=' + bed.beatid + '&page=1';
                var r = Base64.encode(req);
                var code = 1704;
                $.ajax({
                    type: "post",
                    url: "//" + bed.serverURL + "/Get_beatcomments_mp3/info?data=" + r,
                    dataType: "json",
                    success: function (data) {
                        //var d = data.info;
                        data.bed = bed;
                        var html = template('otherstmpl', data);

                        $(".others").html(html);
                        changeWidth();

                        cplay();
                        c2play();

                        //二级回复页面
                        //$("body").on("click",".cmtmore",showCmt);
                        $("body").children().on("click", ".cmtmore", download);


                        if (data.code == 1704) { //滑动加载下一页

                            $(window).scroll(function () {
                                var sH = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                                if (( viewportTop() - $(window).height() - (sH) < 200 ) && (code == 1704)) {
                                    ajaxLoadComment(nowPage);
                                    nowPage += 1;
                                } else if (viewportTop() - $(window).height() - (sH) >= 200) {
                                }
                            });


                        }
                    }
                });


                /**
                 * 返回当前最后一条一级评论相对于文档的top位置
                 * @returns {jQuery.top|jQuery}
                 */
                var viewportTop = function () {
                    return $(".otherswrap:last").offset().top;
                };

                /**
                 * ajax方式要请求的下一页的页码
                 * @type {number}
                 */
                var nowPage = 2;


                /*ajax方式获取指定页的评论，并添加到DOM中去*/
                function ajaxLoadComment(page) {
                    req = 'userid=' + bed.currUserId + '&beatid=' + bed.beatid + '&page=' + (page);
                    r = Base64.encode(req);
                    $.ajax({
                        type: "post",
                        url: "//" + bed.serverURL + "/Get_beatcomments_mp3/info?data=" + r,
                        dataType: "json",
                        async: false,
                        beforeSend: function () {
                            $(".others").append("<div id='loading' style='position: absolute;bottom: 0'>加载中，请稍等</div>");
                        },
                        success: function (data) {
                            data.bed = bed;
                            var html = template('otherstmpl', data);
                            $(".others").append(html);

                            changeWidth();

                            code = data.code;

                            $(".others #loading").remove();

                            cplay();
                            c2play();

                        }
                    });

                }


                /**
                 * 改变wrap的宽度 方便margin 0 auto 居中
                 */
                function changeWidth() {
                    $(".others .otherswrap").width(parseInt($(".others").width() * 0.95));//对像素值取整数
                    $(".others .contentwrap").width($(".others .otherswrap").width() - $(".others .headpic").width());
                }


                /**
                 * 事件Handler
                 * @param e
                 */
                var showCmt = function (e) {
                    //alert($(this).data("comment-id"));
                    /*console.log($(this).parent());
                     console.log($(this).parents());
                     console.log($(this).parentsUntil(".otherswrap"));
                     console.log($(this).closest(".otherswrap"));
                     console.log(e);*/
                };

                /**
                 * 预读播放中按钮gif动画
                 */
                var osrc, osrc1, osrc2;
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

                function download() {
                    var bUA = window.navigator.userAgent;

                    var now = new Date();
                    var year = now.getFullYear();
                    var month = now.getMonth() + 1;
                    var date = now.getDate();

                    if (bUA.indexOf("Android") >= 0) {
                        window.location.href = "http://" + bed.serverURL + "/Download/";
                    } else if (bUA.indexOf("iPhone") >= 0) {
                        alert("正在开发中");
                    } else if (bUA.indexOf("iPad") >= 0) {
                        //window.location.href = "https://itunes.apple.com/app/id947205428";
                        alert("正在开发中");
                        //window.location.href = "https://itunes.apple.com/app/id947205428";
                    } else {
                        alert("抱歉，暂不支持您的手机系统！");
                    }
                }


            });

        };


        var exports = {
            init: sharingInit
        };
        return exports;


    }
);