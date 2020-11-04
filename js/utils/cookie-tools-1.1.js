var cookieUtils = {

    getGMT: function (ms) {
        if (!ms || typeof ms != "number") {
            return;

        }
        var nowMs = new Date().getTime();
        var futureDate = new Date(nowMs + ms);

        return futureDate.toGMTString();


    },


    /*
    *
    * 获取所有cookie的方法封装
    * */
    getAllCookies: function () {
        var cookie = document.cookie;
        if (!cookie) {
            //没有cookie直接return undefined
            return;

        }
        var json = {};
        var arr = cookie.split("; ");
        arr.forEach(function (item, index) {
            var arr1 = item.split("=");
            //把键和值绑定给json
            json[arr1[0]] = arr1[1];

        })

        return json;

    },


    /*
    *   增加cookie的方法  传入json 一次可以增加多个
    *
    *   参数列表
    *       1: json对象  存储多个cookie的对象
    *
    *          2.expires 到期时间  单位: 毫秒值(正数表示未来的毫秒值  负数表示过去的毫秒值)
    *
    *
    *       返回值表示设置是否成功
    * */

    addItem: function (json, expires) {
        if (!json) {
            return false;
        }
        for (var k in json) {
            //    判断是否有第二个参数
            if (expires && typeof expires == "number") {
                //有时长就设置时长
                document.cookie = k + "=" + json[k] + "; expires=" + this.getGMT(expires);
            } else {
                //没有时长参数 直接设置cookie 默认一次会话
                document.cookie = k + "=" + json[k];
            }
        }
        return true;

    },
    /*
        删除cookie的方法
    *   参数列表:
            1.key  传入一个要删除的键

            返回undefined表示删除失败

            返回 一个值 表示删除成功 返回被删除的值
    * */
    removeItem: function (key) {
        var cookie = document.cookie;
        if (!cookie) {
            return;
        }
        var oldVal = this.getAllCookies()[key];
        if (oldVal == undefined) {
            //表示这个键不存在  所以无法删除
            return;

        }
        //    到这表示键存在  那么就随便设置一个值 主要是把时间改成过去时间
        document.cookie = key + "=随便一个值; expires=" + this.getGMT(-1000);

        //返回被删除的值
        return oldVal;


    },


    /*
    * 修改cookie的值
    *   参数列表:
    *       1.key 要修改的那个键
    *
    *       2. newVal  修改的新值
    *
    *       3.expires 修改后的到期时间
    *
    * */
    setItem: function (key, newVal, expires) {
        if (!key) {
            return;
        }
        if (this.getAllCookies()[key] == undefined) {
            //    表示要修改的键不存在  则返回undefined
            return;

        }
        //    到这一步 表示键存在  那么直接修改
        if (expires && typeof expires == "number") {
            //    表示有新的 到期时长
            document.cookie = key + "=" + newVal + "; expires=" + this.getGMT(expires);

        } else {
            document.cookie = key + "=" + newVal;
        }

        //    返回新设置的值
        return newVal;


    },

    /*获取指定cookie
    *
    *   键不存在则返回undefined
    * */
    getItem:function(key){
        if(!key){
            return;
        }
        if (!this.getAllCookies()){
            return;
        }
        return this.getAllCookies()[key];



    },


    /*
    * 清空所有cookie
    *   clear方法 没有参数
    *
    * */

    clear: function () {
        //对已经存在的所有cookie再增加一次 修改时间为 过去时间 就是清除所有
        this.addItem(this.getAllCookies(), -1000);

    }


}


