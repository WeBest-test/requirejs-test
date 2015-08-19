/*
*
* 睡前 电脑版手机版网页 每个页面都引入的工具/配置信息类
* By HapLeo 20150609
*
* */
(function(window,undefined){
    var bed = {
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
        serverURL:"www.shuiqian.cc",
        wxCallback:"m.shuiqian.cc",
        wxIsTest:"",
        beatURL:"7xkfix.dl1.z0.glb.clouddn.com",
        userURL:"7xjfap.dl1.z0.glb.clouddn.com",
        commentURL:"7xkfiz.dl1.z0.glb.clouddn.com"
    };

    if(window.location.href.indexOf("test.shuiqian.cc")>=0){
        bed.serverURL = "test.shuiqian.cc";
    }
    if(window.location.href.indexOf("mtest.shuiqian.cc")>=0){
        bed.serverURL = "test.shuiqian.cc";
    }

    if ( typeof module === "object" && module && typeof module.exports === "object" ) {
        module.exports = bed;
    } else if ( typeof define === "function" && define.amd ) {
        define( [], function () { return bed; } );
    } else {
        window.bed = bed;
    }

})(window,undefined);
