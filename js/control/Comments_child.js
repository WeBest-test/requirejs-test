/**
 * 对二级回复页面就行初始化
 */
define(
    [
        'bedtime',
        'comp/Reply',
        'base64',
        'template',
        'comp/Play',
        'comp/Download',
        'comp/Dom'
    ],
    function (bed, Reply, Base64, template,Play,download,Dom) {
        bed.templateConfig(template);
        var c = function () {
            jQuery(function ($) {



                $(".download").click(download);

                //Dom.initSharingBottomWidth();
                $(window).resize(Dom.initSharingBottomWidth);




                /*获取当前页面的评论列表*/
                var req = 'userid=' + bed.currUserId + '&beatid=' + bed.beatid + '&commentid=' + bed.currCommentId + '&page=1';
                var r = Base64.encode(req);
                var code = 3804;
                $.ajax({
                    type: "get",
                    url: "//" + bed.serverURL + "/Get_beatcomments_child_mp3/info?data=" + r,
                    dataType: "json",
                    success: function (data) {
                        Dom.removeLoading();
                        //var d = data.info;
                        data.bed = bed;
                        var html = template('otherstmpl', data);

                        $(".others").html(html);

                        Reply.init(2);
                        Dom.initSharingBottomWidth();
                        Dom.fixWhiteHeight();

                        Play.cplay();
                        Play.c2play();

                        //二级回复页面
                        //$("body").on("click",".cmtmore",showCmt);
                        $("body").children().on("click", ".cmtmore", download);


                        if (data.code == code) { //滑动加载下一页

                            var sH = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                            if (( viewportTop() - $(window).height() - (sH) < 200 ) && (3804 == code)) {
                                ajaxLoadComment(nowPage);
                                nowPage += 1;
                            }



                            $(window).scroll(function () {
                                var sH = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                                if (( viewportTop() - $(window).height() - (sH) < 200 ) && (3804 == code)) {
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
                    return $(".cmtwrap:last").offset().top;
                };

                /**
                 * ajax方式要请求的下一页的页码
                 * @type {number}
                 */
                var nowPage = 2;


                /*ajax方式获取指定页的评论，并添加到DOM中去*/
                function ajaxLoadComment(page) {
                    var req = 'userid=' + bed.currUserId + '&beatid=' + bed.beatid + '&commentid=' + bed.currCommentId + '&page=' + nowPage;
                    var r = Base64.encode(req);
                    $.ajax({
                        type: "post",
                        url: "//" + bed.serverURL + "/Get_beatcomments_child_mp3/info?data=" + r,
                        dataType: "json",
                        async: false,
                        beforeSend: function () {
                            //$(".others").append("<div id='loading' style='position: absolute;bottom: 0'>加载中，请稍等</div>");
                        },
                        success: function (data) {
                            code = data.code;
                            if(data.info == "")
                                return;
                            data.bed = bed;
                            var html = template('cmtwraptmpl', data);
                            $(".cmtwrap:last").after(html);

                            Dom.initSharingBottomWidth();
                            Dom.fixWhiteHeight();


                            Play.cplay();
                            Play.c2play();

                        }
                    });

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
                var osrc;


            });

        };


        var exports = {
            init: c
        };
        return exports;


    }
);