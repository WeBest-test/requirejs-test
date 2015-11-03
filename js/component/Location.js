/**
 * 浏览器定位
 */
define(
    ['comp/Dom'],
    function (Dom) {

        var Loc = {
            /**
             * js获取当前浏览器的经纬度坐标
             */
            getLoc:function(callback){
                var geolocation = new BMap.Geolocation();

                //方法异步执行 函数体内的返回值在getLoc内获取不到，为异步，只好回调
                geolocation.getCurrentPosition(function(r){
                    //re.prototype.status = this.getStatus();
                   /**
                    * 关于状态码
                    * BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
                    * BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
                    * BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
                    * BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
                    * BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
                    * BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
                    * BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
                    * BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
                    * BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
                    */
                     if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        bed.loc = r.point;
                        callback();
                        //return r.point;
                    }
                    else {
                        bed.loc = false;
                        Dom.removeLoading();
                    }
                },{enableHighAccuracy: true});

            },
            getDistance:function(lat1, lng1, lat2, lng2){
                if ((Math.abs(lat1) > 90) || (Math.abs(lat2) > 90)) {
                    return "99999";
                }
                if ((Math.abs(lng1) > 180) || (Math.abs(lng2) > 180)) {

                    return "99999";
                }
                var radLat1 = this.rad(lat1);
                var radLat2 = this.rad(lat2);
                var a = radLat1 - radLat2;
                var b = this.rad(lng1) - this.rad(lng2);
                var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
                    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
                s = s * 6378.137;
                // EARTH_RADIUS;
                s = Math.round(s * 10000) / 10000;
                if(s<10&&(s+'').length>4){
                    s = (s+'').substring(0,4);
                }
				if(s>10&&s<100&&(s+'').length>5){
					s = (s+'').substring(0,4);
				}
                if(s>100){
                    s = parseInt(s);
                }
				
                return parseFloat(s);
            },
            rad:function (d){
                return d * Math.PI / 180.0;
            }

    };

        return Loc;


    }
);