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
        'comp/Dom',
        'comp/Location'
    ],
    function (bed, Reply, Base64, template,Play,download,Dom,Loc) {
        bed.templateConfig(template);
        var c = function () {
            jQuery(function ($) {



                $(".download").click(download);

                //Dom.initSharingBottomWidth();
                $(window).resize(Dom.initSharingBottomWidth);


                /**
                 * 获取当前页面声音的详情，如用户、时间、分类等
                 */
                $.ajax({
                    type: "post",
                    url: "//" + bed.serverURL + "/Get_beatinfo_one_mp3/info",
                    data: {userid: bed.currUserId, beatid: bed.beatid},//TODO PHP Get方式
                    dataType: "json",
                    success: function (data) {
                        Dom.removeLoading();
                        //console.log(data);
                        var d = data.info;

                        Loc.getLoc(
                            function(){ //成功获取到位置后的回调函数
                                if(bed.loc){
                                    var ddd = Loc.getDistance(d.latitude,d.longitude,bed.loc.lat,bed.loc.lng);
                                    $("span.distance").html(ddd+"km");
                                }else{
                                    $("span.distance").html("未知");
                                }

                                Dom.removeLoading();

                            }
                        );

                        d.bed = bed;
                        var html = template('selftmpl', d);
                        //console.log(html);
                        $(".self").html(html);


                        if (d.sex == 1) {
                            $(".self .sexage").css('background-image', 'url(' + bed.base + 'public/sharing/img/boy.png)');

                        } else if (d.sex == 0 || d.sex == 2) {
                            $(".self .sexage").css('background-image', 'url(' + bed.base + 'public/sharing/img/girl.png)');
                        } else {

                        }
                        $("title").html(d.title);

                        //标题居中
                        //$(".title").css('left',-($(".title").offset().left+$('.title').width()/2-$('html').width()/2));

                        //播放控制
                        var ai = new Image();
                        ai.src = "" + bed.base + "public/sharing/v2/img/pausebtn.png";
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
                        Reply.init(1);


                    }
                });

                /*获取当前页面的评论列表*/
                var req = 'userid=' + bed.currUserId + '&beatid=' + bed.beatid + '&page=1';
                var r = Base64.encode(req);
                var code = 1704;
                $.ajax({
                    type: "get",
                    url: "//" + bed.serverURL + "/Get_beatcomments_mp3/info?data=" + r,
                    dataType: "json",
                    success: function (data) {
                        Dom.removeLoading();
                        //var d = data.info;
                        data.bed = bed;
                        var html = template('otherstmpl', data);

                        $(".others").html(html);

                        Dom.initSharingBottomWidth();
                        Dom.fixWhiteHeight();

                        Play.cplay();
                        Play.c2play();

                        //二级回复页面
                        //$("body").on("click",".cmtmore",showCmt);
                        $("body").children().on("click", ".cmtmore", function(){
                            window.location.href = bed.base + 'Comments_child?commentid='+$(this).data('comment-id')+'&beatid='+bed.beatid;
                        });


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
                            //$(".others").append("<div id='loading' style='position: absolute;bottom: 0'>加载中，请稍等</div>");
                        },
                        success: function (data) {
                            data.bed = bed;
                            var html = template('otherstmpl', data);

                            /**
                             * 添加分割线
                             * */
                            html = '<hr class="hr" />'+html;
                            $(".others").append(html);

                            Dom.initSharingBottomWidth();
                            Dom.fixWhiteHeight();

                            code = data.code;


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