/**
 * 回复相关逻辑
 */
define(
    [],
    function () {

        var Reply = {

            init: function () {
                $(".replyblock .send").click(Reply.sendHandler);
                if(Login.logined()){ //改变button为textarea 改变内部的文字

                    var t = $("#reply");
                    var html = t[0].outerHTML;
                    t[0].outerHTML = html.replace(/button/g,"textarea");
                    $("#reply").text("").removeAttr("placeholder").addClass("logined").attr("placeholder","回复 "+$(".self .detailup .nick").html());

                    //$("body").children().on("click focusin","textarea#reply",Reply.textAreaHandler);
                }else{ //点击按钮登陆
                    $("body").children().on("click focusin","button#reply",Reply.textAreaHandler);
                }
                /*
                 * 为textarea绑定click和获得焦点事件
                 * */


                /**
                 * 切换语音和文字按钮
                 * @type {Image}
                 */
                var v = new Image();
                v.src = bed.base+"/public/sharing/img/voice.png";
                var kb = $(".switch").find("img")[0].src;
                $(".switch").on("click",function(){
                    if(!$(this).hasClass("voice")){ //在文字回复情况下点击switch
                        $(this).addClass("voice").find("img").get(0).src = v.src;
                        var t = $(this).next("textarea");
                        var html = t[0].outerHTML;
                        t[0].outerHTML = html.replace(/textarea/g,"button");
                        $("#reply").text("点击回复");
                        if(!Login.logined()){
                            $("#reply").text("登陆后才能发语音");
                        }else{
                            $("#reply").text("点击回复");
                        }
                    }else{ //在语音回复情况下点击switch
                        $(this).removeClass("voice").find("img").get(0).src = kb;
                        if(Login.logined()){
                            var t = $(this).next("button");
                            var html = t[0].outerHTML;
                            t[0].outerHTML = html.replace(/button/g,"textarea");
                            $("#reply").html("");
                        }else{
                            $("#reply").text("登陆后才可回复");
                        }

                    }
                });


                //声音主题 监听click事件
                $("body").children().on("click",".selfwrap",Reply.replyOneHandler);
                //一级回复中监听click事件
                $("body").children().on("click",".contentup",Reply.replyOneHandler);
            },

            lastOneTarget:0,

            commentId:0,

            replyWidth:function(){
                $(".replyblock .reply textarea").css("width",($("html").width()-6-12-72-10)+"px");
            },

            /**
             *点击上方主题或下方一级评论 进行 文字回复 或者 语音回复
             *也可能跳转到微信登陆 未定
             */
            replyOneHandler:function(e) {
                var that = this;
                Reply.commentId = ($(that).data("comment-id")?$(that).data("comment-id"):0);
                console.log(e);
                if($(e.target).is("#bbtn")){//如果当前点击的是声音主题播放按钮

                }else if($(e.target).is(".cbtn")){//如果当前点击的是一级评论播放按钮

                }else if($(e.target).is(".c2btn")){//如果当前点击的是二级评论播放按钮

                }else{//弹出回复框
                    if(!$(".replyblock").hasClass("replying")){

                        if(Login.logined()){
                            $("#reply").attr("placeholder","回复 "+$(that).find(".nick").text());
                        }else{
                            var t = $("#reply");
                            var html = t[0].outerHTML;
                            t[0].outerHTML = html.replace(/textarea/g,"button");
                            $("#reply").text("登陆后才可回复");
                        }
                        $(".replyblock").show(300).addClass("replying");
                    }else if(Reply.lastOneTarget == e.target){ //已经有回复框，且点击了和上次相同的target
                        //隐藏
                        $(".replyblock").hide(300).removeClass("replying");
                    }else{//已经有了回复框 且点击了另外一个target 更新placeholder
                        if(Login.logined()){$("#reply").attr("placeholder","回复 "+$(that).find(".nick").text());}
                    }
                    Reply.lastOneTarget = e.target;
                }


            },

            /**
             * 点击回复(发送)按钮
             * @param e
             */
            sendHandler: function (e) {
                console.log("send");
                console.log(e);
                /**
                 *更新tmpData(发送的内容和针对的评论id)。
                 */
                $.extend(bed.tmpData,{
                        returncontent:$("#reply").val()+"",
                        returnid:Reply.commentId,
                        userid:bed.currUid,
                        beatid:bed.beatid
                    }
                );


                if(Login.logined()){
                    $.ajax({
                        type:"post",
                        url:"//"+bed.serverURL+"/Put_comment/info",
                        data:bed.tmpData,
                        dataType:"json",
                        async:false,
                        success:function(data){
                            window.location.href = bed.base+"Sharing?beatid="+bed.beatid ;
                        }
                    });
                }else{
                    Login.redirect();
                }

            },
            textAreaHandler: function () {
                var that = this;
                if(Login.logined()){

                }else{
                    Login.redirect();
                }
            },
            /**
             * 语音回复handler
             */
            voiceInit:function(){
                //为button#reply绑定事件

                $("body").children().on("click","button#reply",Reply.voiceHandler);

            },
            /**
             * 语音回复handler
             */
            voiceHandler:function(){
                var that = this;
                if($(".switch").hasClass('voice')){ //switch当前在voice状态下
                    if(Login.logined()){
                        if(!$(that).hasClass("recording")){
                            //weixin.testMedia();
                            wx.startRecord();
                            $(that).text("录制中").addClass("recording");
                        }else{
                            $(that).text("点击回复").removeClass("recording");
                            wx.stopRecord({
                                success: function (res) {
                                    var localId = res.localId;
                                    wx.uploadVoice({
                                        localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                                        isShowProgressTips: 1, // 默认为1，显示进度提示
                                        success: function (res) {
                                            var serverId = res.serverId; // 返回音频的服务器端ID
                                            //上传到七牛

                                            $.extend(bed.tmpData,{
                                                    returntype:'1',
                                                    returnid:Reply.commentId,
                                                    userid:bed.currUid,
                                                    beatid:bed.beatid,
                                                    amrid:serverId
                                                }
                                            );
                                            $.post(bed.base+'Upload/wxAmr',bed.tmpData,function(data){
                                                window.location.href = bed.base+"Sharing?beatid="+bed.beatid ;
                                            },'json');
                                        }
                                    });
                                }
                            });
                        }
                    }else{
                        Login.redirect();
                    }
                }

            }
        };

        return Reply;


    }
);