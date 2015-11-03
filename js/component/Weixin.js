/**
 * 微信相关逻辑
 */
define(
    ['wx'],//'comp/Reply'],
    function(wx) {

        /**
         * 微信js sdk
         */
        var Weixin = {
            /**
             *
             * @param initVoice 是否载入Reply.voiceInit()
             */
            init: function (initVoice) {
                wx.config(bed.weixin.config);
                wx.ready(function(){
                    if(initVoice){
                        require(['comp/Reply'],function(Reply){
                            Reply.voiceInit();
                        });
                    }
					
					var t = $(".play").css("background-image");
					var shareImg;
					if(!!t){
						shareImg = t.substring(4,t.length-1);
					}else{
						shareImg = $('.headpic img')[0].src;
					}
					
					var shareTitle = '';
					shareTitle = $("title").html();
					
					if(!shareTitle){
						var tmpTitle = '';
						if(!!!$(".tag span")){
							shareTitle = '睡前的你不孤单';
						}
						if(!!$(".tag span")){
							for(i=0 ;i<$(".tag span").length;i++){
								tmpTitle = ($(".tag span"+':eq('+i+')').text());
								 if(i>=1){
								 shareTitle = shareTitle+'-'+tmpTitle;
								 }else{
									shareTitle = tmpTitle;
								}
							}
						}
						
					}

                    //分享到按钮功能
                    wx.onMenuShareTimeline({
                        title: shareTitle+"", // 分享标题
                        link: window.location.href+"", // 分享链接
                        imgUrl: shareImg, // 分享图标
                        success: function () {

                        },
                        cancel: function () {

                        }
                    });

                    wx.onMenuShareAppMessage({
                        title: shareTitle+"", // 分享标题
                        desc: '睡前的你不再孤单', // 分享描述
                        link: window.location.href+"", // 分享链接
                        imgUrl: shareImg, // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                });
            },
            testMedia: function () {
                function hasGetUserMedia() {
                    //请注意:在Opera浏览器中不使用前缀
                    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia || navigator.msGetUserMedia);
                }
                if (hasGetUserMedia()) {
                    alert('您的浏览器支持getUserMedia方法');
                }
                else {
                    alert('您的浏览器不支持getUserMedia方法');
                }
            }
        };

        return Weixin;


    }
);