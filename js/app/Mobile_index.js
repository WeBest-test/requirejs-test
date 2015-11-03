/**
 * 对二级回复页面就行初始化
 */
define(
    [
        'comp/Weixin'
    ],
    function (weixin) {

        var c = function () {

            weixin.init(0);

        };


        var exports = {
            init: c
        };
        return exports;


    }
);