$(function () {

//    该文件主要用来渲染首页的ajax数据

//      调用懒加载的方式请求-----------------------------↓

    $("#content").lazyLoad(window,function () {
        /*     猜你喜欢模块效果    */
        guessYouMayLike();
    });

    $(".xjb").lazyLoad(window,function () {
        /*          性价比模块效果*/
        xinJiaBi();
        /*          新品上市模块效果*/
        xinPin();
    });

    //      调用懒加载的方式请求-----------------------------↑
//           判断是否已经登录的方法
    isLogin();
//             注销登录
    logout();

//     猜你喜欢模块-----------------------------------------------------↓

    function guessYouMayLike() {
        $.ajax({
            url: apiUrl.mayLike,
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    $(".exclusive_right").append("<li>" +
                        "                <img src=" + data[i].img + " alt=\"\">" +
                        "                <ol>" +
                        "                    <li><a href=\"#\">" + data[i].name + "</a></li>" +
                        "                    <li>" + data[i].enName + "</li>" +
                        "                    <li>" + data[i].location + "</li>" +
                        "                    <li>" + data[i].type + "</li>" +
                        "                    <li>" + data[i].hot + "</li>" +
                        "                </ol>" +
                        "                <div class=\"jiage\">" +
                        "                    <span class=\"red\">￥</span>" +
                        "                    <strong class=\"red\">" + data[i].price + "</strong>" +
                        "                </div>" +
                        "            </li>")
                }
            }
        })
    }

//     猜你喜欢模块-----------------------------------------------------↑

//      性价比模块------------------------------------------------------↓
    function xinJiaBi() {
        $.ajax({
            url: apiUrl.xinJiaBi,
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    $(".xjb_left_ul").append("<li>" +
                        "                    <div class=\"xjb_img\">" +
                        "                        <img src=" + data[i].img + " alt=\"\">" +
                        "                    </div>" +
                        "                    <div class=\"ganhong\">" +
                        "                        <div class=\"ganhong_div\">" +
                        "                            <a href=\"#\">" + data[i].name + "</a>" +
                        "                            <a href=\"#\"><span>" + data[i].enName + "</span></a>" +
                        "" +
                        "                            <p class=\"price\">￥ <strong>" + data[i].price + "</strong></p>" +
                        "                        </div>" +
                        "                        <p class=\"sum\">" +
                        "                            <span class=\"sum_left\">售出：<strong>" + data[i].sold + "</strong> </span>" +
                        "                            <span class=\"sum_right\">好评：<strong>" + data[i].hot + "</strong></span>" +
                        "                        </p>" +
                        "                    </div>" +
                        "                </li>")
                }
            }
        })
    }

//      性价比模块------------------------------------------------------↑

//      新品上市模块----------------------------------------------------↓

    function xinPin() {
        $.ajax({
            url: apiUrl.xinPin,
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    $(".xjb_left_ul").append("<li>" +
                        "                    <div class=\"xjb_img\">" +
                        "                        <img src=" + data[i].img + " alt=\"\">" +
                        "                    </div>" +
                        "                    <div class=\"ganhong\">" +
                        "                        <div class=\"ganhong_div\">" +
                        "                            <a href=\"#\">" + data[i].name + "</a>" +
                        "                            <a href=\"#\"><span>" + data[i].enName + "</span></a>" +
                        "" +
                        "                            <p class=\"price\">￥ <strong>" + data[i].price + "</strong></p>" +
                        "                        </div>" +
                        "                        <p class=\"sum\">" +
                        "                            <span class=\"sum_left\">售出：<strong>" + data[i].sold + "</strong> </span>" +
                        "                            <span class=\"sum_right\">好评：<strong>" + data[i].hot + "</strong></span>" +
                        "                        </p>" +
                        "                    </div>" +
                        "                </li>")
                }
            }
        })

    }

//      新品上市模块----------------------------------------------------↑


//    -------------用来判断是否登录的方法------------------------↓
    function isLogin() {

        var loginMobile = cookieUtils.getItem("loginMobile");
        // console.log(loginMobile);
        if (loginMobile) {
            var s1 = loginMobile.slice(0, 3);
            var s2 = loginMobile.slice(loginMobile.length - 4);
            $(".enter").html("<span>" + s1 + "*****" + s2 + " ,欢迎您！</span><a href='#' id='logout'>注销登录</a>")
        } else {
            $(".enter").html(" <span>9840775</span>\n" +
                "                位会员的选择\n" +
                "                <a href=\"login.html\">登录</a>\n" +
                "                <s></s>\n" +
                "                <a href=\"reg.html\">注册</a>")
        }
    }


//    -------------用来判断是否登录的方法------------------------↑


//-----------------------注销登录的方法--------------------------↓
    function logout(){
        $(".enter").on("click","#logout",function () {
           var choce=confirm("请问是否注销登录");
            if (choce){
                cookieUtils.removeItem("loginMobile");
                $(".enter").html("<span>9840775</span>\n" +
                    "                位会员的选择\n" +
                    "                <a href=\"login.html\">登录</a>\n" +
                    "                <s></s>\n" +
                    "                <a href=\"reg.html\">注册</a>")
            }
            return false;/*a标签防止跳转*/
        })
    }

//-----------------------注销登录的方法--------------------------↑

});
