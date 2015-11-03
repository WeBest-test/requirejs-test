/**
 * 模板文件
 * 个人详情
 * */
/**
 * 登陆相关逻辑
 */
define(
    ['template','bedtime'],
    function (template,bed) {
        bed.templateConfig(template);
        var c = ''
                +'        <div class="selfwrap">'
                +'        <div class="selfup">'
                +'        <div class="headpic"><img src="http://{{=bed.userURL+\'/\'+(headportrait?headportrait:\'user/headpic/default.png\')}}" alt="" /></div>'
                +'        <div class="detail">'
                +'        <div class="detailup">'
                +'        <div class="sexage">{{=age}}&nbsp;</div>'
                +'<div class="nick">{{=nickname}}</div>'
                +'</div>'
                +'<div class="detailbtm">'
                +'<div class="play">'
                +'<img id="bbtn" src="{{=bed.base}}public/sharing/img/playl.png?3" alt="">'
                +''
                +''
                +'<audio id="baudio" src="http://{{=bed.beatURL}}/{{=voice}}" ></audio>'
                +'</div>'
                +'<div class="last">{{=voicetime}}s</div>'
                +'</div>'
                +''
                +'</div>'
                +'</div>'
                +'<div class="selfbtm">'
                +'<div class="cat">{{=difftime}} 来自<span id="cat">{{=catname}}</span></div>'
                +'<div class="replycount">回应 <span id="rplnum">{{=commentnum}}</span></div>'
                +'</div>'
                +'</div>';

        var data = {"code":1202,"message":"\u58f0\u97f3\u4fe1\u606f\u83b7\u53d6\u6210\u529f","info":{"id":"328","title":"\u4eca\u540e\u6d3b\u5728\u6d4b\u8bd5\u670d\u52a1\u5668\u91cc","anonymous":"1","catname":"\u6252\u8da3\u4e8b","userid":"42","categoryid":"2","commentnum":"58","voicetime":"5","voice":"beats\/audio\/55ba02c057bed.mp3","heartnum":"129","nickname":"\u539f\u9633\u5e05\u54e5 \u4e13\u4e1a\u6316\u575f","age":"100","sex":"1","headportrait":"user\/headpic\/55a7b7855d7ab.png","releasetime":"1438253760","transferred":"1","select":"0","dongni":"0","buxihuan":"0","jubao":"0","zhiding":"0","difftime":"07-30","dongni_num":"0","buxihuan_num":"0"}};
        data.info.bed = bed;
        var r = template.compile(c);
        var re = r(data.info);

        return re;


    }
);