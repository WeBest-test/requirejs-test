/**
 * 微信相关逻辑
 */
define(
    ['bedtime','wx','comp/Reply'],
    function(bed,wx,Reply) {

        /**
         * 微信js sdk
         */
        var Weixin = {
            init: function () {
                wx.config(bed.weixin.config);
                wx.ready(function(){
                    Reply.voiceInit();

                    //分享到按钮功能
                    wx.onMenuShareTimeline({
                        title: $("title").html()+"", // 分享标题
                        link: window.location.href+"", // 分享链接
                        imgUrl: 'http://mtest.shuiqian.cc/public/sharing/img/logo.png?3', // 分享图标
                        success: function () {

                        },
                        cancel: function () {

                        }
                    });

                    wx.onMenuShareAppMessage({
                        title: $("title").html()+"", // 分享标题
                        desc: '睡前的你不再孤单', // 分享描述
                        link: window.location.href+"", // 分享链接
                        imgUrl: 'http://mtest.shuiqian.cc/public/sharing/img/logo.png?3', // 分享图标
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
        }

        return Weixin;


    }
);