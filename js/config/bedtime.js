/*
*
* 睡前 电脑版手机版网页 每个页面都引入的工具/配置信息类
* By HapLeo 20150609
*
* */
(function(window,undefined){
    var bed2 = {
        formatDate:function(val)   {
            var now = new Date(+val);
            var   year=now.getFullYear();
            var   month=now.getMonth()+1;
            var   date=now.getDate();
            var   hour=now.getHours();
            var   minute=now.getMinutes();
            var   second=now.getSeconds();
            if(second <=9){
                second = "0"+second;
            }
            return   year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
        },
        serverURL:"test.shuiqian.cc",
        wxCallback:"m.shuiqian.cc",
        wxIsTest:"1",
        beatURL:"7xkfix.dl1.z0.glb.clouddn.com",
        userURL:"7xjfap.dl1.z0.glb.clouddn.com",
        commentURL:"7xkfiz.dl1.z0.glb.clouddn.com",
        templateConfig:function(template){
            template.config('openTag','{{');
            template.config('closeTag','}}');
            template.config('escape',false);
        }
    };

    /**
     * 调试用的数据 一级评论
     * @type {{userid: number, beatid: number, returnid: number, returntype: number, returnvoice: string, duration: string}}
     */
    bed2.tmpData = {
        userid:64,
        beatid:22,
        returncontent:"",
        returnid:0,
        returntype:2,
        returnvoice:"",
        duration:""
    };

    if(window.location.href.indexOf("test.shuiqian.cc")>=0){
        bed2.serverURL = "test.shuiqian.cc";
    }
    if(window.location.href.indexOf("mtest.shuiqian.cc")>=0){
        bed2.serverURL = "test.shuiqian.cc";
    }

    if ( typeof module === "object" && module && typeof module.exports === "object" ) {
        module.exports = bed2;
    } else if ( typeof define === "function" && define.amd ) {
        define(
            [],
            function () {
                if(typeof bed != "undefined"){ //bed已暴露在window中，扩展bed

                    return $.extend(bed, bed2);
                }else{
                    return bed2;
                }
            } );
    } else {
        if(typeof bed != "undefined"){
            $.extend(bed, bed2);
        }else{
            window.bed = bed2;
        }
    }

})(window,undefined);
