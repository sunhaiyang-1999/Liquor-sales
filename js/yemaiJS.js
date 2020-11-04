$(function () {
//  ------------------------轮播图封装-----------------------------↓

//    第一个轮播图的父元素   appraise_left_box
    $(".appraise_left_box").lunbo("select_dot");

    //  第二个轮播图
    $(".jinkou_box_content").lunbo("jinkou_content");

//    第三个轮播图
    $(".jinkou_box_content_1").lunbo("jinkou_content");

    $(".jinkou_box_content_2").lunbo("jinkou_content");

    $(".jinkou_box_content_3").lunbo("jinkou_content");

    $(".jinkou_box_content_4").lunbo("jinkou_content");

//    手风琴效果展示------
    xph_box();
//    人气抢购效果展示-------
    gundong();
//    酒友品鉴翻页效果展示------------
    jiuYouList();
//    最大轮播图效果展示---------------
    breatheCarousel();

//  ------------------------轮播图封装-----------------------------↑

// ---------------------------手风琴效果----------------------------↓
    function xph_box() {
        var maxWidth = 450;
        var minWidth = 150;
        var index = 0;

        $(".xph_box>ul>li").eq(0).css("width", maxWidth);
        $(".xph_box>ul>li").eq($(".xph_box>ul>li").length).css("width", minWidth);

        $(".xph_box>ul>li").mouseenter(function () {
            index = $(this).index();
            $(this).stop().animate({
                width: maxWidth,
            }, 200)
                .siblings().stop().animate({
                width: minWidth
            }, 200)
        })

        //    自动轮播的功能
        var timer = setInterval(autoPlay, 2000);
        var index = 0;

        function autoPlay() {
            index++;
            if (index > $(".xph_box>ul>li").length - 1) {
                index = 0;
            }

            $(".xph_box>ul>li").eq(index).stop().animate({
                width: maxWidth,
            }, 200)
                .siblings().stop().animate({
                width: minWidth
            }, 200)
        }

        $(".xph_box").hover(function () {
            clearInterval(timer);
        }, function () {
            timer = setInterval(autoPlay, 2000);
        })


    }

// ---------------------------手风琴效果----------------------------↑

// ----------------------------人气抢购效果---------------------------↓
    function gundong() {
        $(".jiulan>li").mouseenter(function () {
            var index = $(this).index();
            $(".wicket_ul").stop().animate({
                top: -index * 320
            }, 400);
        })
    }

// ----------------------------人气抢购效果---------------------------↑

//  --------------------------酒友品鉴翻页效果-------------------------↓
    function jiuYouList() {
        //      这个总页数是通过服务器来获取的
        var totalPage = 3;
        //      表示现在到多少页了
        var xianzai = 1;
        //      表示第一个页数
        var first = 1;

        //    页面加载肯定处在第一的位置
        $(".jiao_left").css("opacity", 0.4);

        //鼠标移入移出样式改变
        $(".jiao_left").hover(function () {
            if (xianzai == first) {
                return;
            }
            $(this).css("background-position", "-193px -65px");
        }, function () {
            $(this).css("background-position", "-130px -76px");
        })

        //鼠标移入移出样式改变
        $(".jiao_right").hover(function () {
            if (xianzai == totalPage) {
                return;
            }
            $(this).css("background-position", "-193px -48px")

        }, function () {
            $(this).css("background-position", "-154px -76px")
        })

        //    添加左键点击事件
        $(".jiao_left").click(function () {
            //    左边按钮点击事件
            //    点击左边按钮 右边肯定不是半透明
            $(".jiao_right").css("opacity", 1);
            xianzai--;
            if (xianzai <= first) {
                //  此处表示翻页到第一页 左键变半透明 没有hover效果
                xianzai = first;
                $(this).css({
                    opacity: 0.4,
                    "background-position": "-130px -76px"
                })
            }
            $(".yeshu").html(xianzai + "/" + totalPage);
            fan((xianzai - 1))
        })

        //  添加右键点击事件
        $(".jiao_right").click(function () {
            $(".jiao_left").css("opacity", 1);
            xianzai++;
            if (xianzai >= totalPage) {
                xianzai = totalPage;
                //    翻页到最大值取消右键hover 并且变成半透明
                $(this).css({
                    opacity: 0.4,
                    "background-position": "-154px -76px"
                })
            }
            $(".yeshu").html(xianzai + "/" + totalPage)
            fan((xianzai - 1));
        });

        //    下面实现翻转效果
        function fan(page) {
            var windowWidth = $(".window_ul>li").width();
            $(".window_ul").stop().animate({
                left: -page * windowWidth,
            }, 400)
        }

    }

//  --------------------------酒友品鉴翻页效果-------------------------↑

//  ---------------------------最大轮播图效果--------------------------↓
    function breatheCarousel() {
        var index = 0;

        var timer = setInterval(autoPlay, 3000);

        function autoPlay() {
            //    变化大图
            index++;
            if (index > $(".major1>li").length - 1) {
                index = 0;
            }
            setAnimate(index);
        }

        //    先获取原来li的宽高
        var sWidth = $(".major1>li").width();
        var sHeight = $(".major1>li").height();


        //    鼠标移入移出暂停于开始 并且把li变大变小
        $("#home").hover(function () {
            clearInterval(timer);
            //    放大
            $(".major1>li").stop().animate({
                width: sWidth * 1.1,
                height: sHeight * 1.1,
                marginLeft: -sWidth * 0.05,
                marginTop: -sHeight * 0.05
            }, 2000)
        }, function () {
            timer = setInterval(autoPlay, 3000);
            //  缩小
            $(".major1>li").stop().animate({
                width: sWidth,
                height: sHeight,
                marginLeft: 0,
                marginTop: 0
            }, 2000)
        });

        //    小圆点鼠标点击事件
        $(".major2>li").click(function () {
            index = $(this).index();
            setAnimate(index);
        })

        //  吧位移大图和位移小圆点的代码封装成方法
        function setAnimate(index) {
            $(".major1>li").eq(index)
                .show()
                .stop().animate({
                opacity: 1
            }, 2000).siblings().stop()
                .animate({
                    opacity: 0
                }, 2000, function () {
                    $(this).css("display", "none");
                })
            //    变化小圆点
            $(".major2>li").eq(index).addClass("select")
                .siblings().removeClass("select")
        }

    }

//  ---------------------------最大轮播图效果--------------------------↑



//  ------用来判断是否登录的方法---------------------------------------
    function isLogin(){
        var loginMobile=sessionStorage.getItem("loginMobile");
        if (loginMobile){
            var s1=loginMobile.slice(0,3);
            var s2=loginMobile.slice(loginMobile.length-4);

            $(".topLeft").html("" +
                "")
        }
    }
});