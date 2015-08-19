/**
 * 登陆相关逻辑
 */
define(
    [],
    function () {

        var Login = {
            show:function(){
                $(".login").css({
                    width:$("html").width()*0.9+"px",
                    height:$("html").height()*0.9+"px",
                    left:$("html").width()*0.1/2+"px",
                    top:$("html").height()*0.1/2+"px",
                    display:"block"
                })
                if(document.body.clientWidth<=320){
                    $(".login").css({
                            "width": $("html").width(),
                            left:"0px",
                            top:"0px"
                        }
                    );
                };
            },
            hide: function(){
                $(".login").hide();
            },
            isLogin:function(){ //对是否已登陆进行判断。可以用php中的session或cookie判断
                if(true){
                    return 1;
                } else{
                    return 0;
                }
            },
            redirect:function(){
                window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxab18db1751df337d&redirect_uri=http%3A%2F%2F"+bed.wxCallback+"%2FLogin%2Fwx%3Fbeatid%3D"+bed.beatid+(bed.wxIsTest?("%26test%3D"+bed.wxIsTest):"")+"&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect"+"";
            },
            logined:function(){
                if(Login.getCookie("wxuid")){
                    return true;
                }else{
                    return false;
                }
            },
            getCookie:function(c_name){

                if (document.cookie.length>0)
                {
                    c_start=document.cookie.indexOf(c_name + "=")
                    if (c_start!=-1)
                    {
                        c_start=c_start + c_name.length+1
                        c_end=document.cookie.indexOf(";",c_start)
                        if (c_end==-1) c_end=document.cookie.length
                        return (document.cookie.substring(c_start,c_end))
                    }
                }
                return "";
            }
        };

        return Login;


    }
);