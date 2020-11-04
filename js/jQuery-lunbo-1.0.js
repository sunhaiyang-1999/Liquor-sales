//  自定义轮播图jQ插件
$.fn.lunbo = function (focusClass) {
    //   找到轮播图的父元素（就是用来动画位移的那个大长条）
    var $slide = this.find(".slide");

    var moveWidth = $slide.children().width();

//    动态设置宽度加一个宽度
    $slide.css("width", moveWidth * ($slide.children().length + 1));
//    动态把第一张图拼接到最后一张
    $slide.append($slide.children().eq(0).clone());

//    找到小圆点的父元素
    var $focus = this.find(".focus");
//      假设有小圆点的动能
    var isFocus = true;
    if ($focus.length == 0) {
        isFocus = false;
    }
    if (isFocus) {
        //    有小圆点功能
        var circleIndex = 0;
    }
    //   找到左右控制的父元素
    var control = this.find(".control");
    var isControl = true;
    if (control.length == 0) {
        isControl = false;
    }

    var index = 0;
    var timer = setInterval(autoPlay, 3000);

    function autoPlay() {
        index++;
        if (index > $slide.children().length - 1) {
            //    瞬间回到0的位置
            $slide.css("left", 0);
            index = 1;
        }

        $slide.animate({
            left: -index * moveWidth
        }, 200);

//    小圆点动能
        if (isFocus) {
            circleIndex++;
            if (circleIndex > $focus.children().length - 1) {
//          最大索引的判断
                circleIndex = 0;
            }
            $focus.children().eq(circleIndex)
                .addClass(focusClass)
                .siblings()
                .removeClass(focusClass)
        }

    }

//    鼠标移入移出开始暂停
    this.hover(function () {
        clearInterval(timer);
        //    鼠标移入显示左右按钮
        control.show();
    }, function () {
        timer = setInterval(autoPlay, 3000);
        //     如果有左右滑动则鼠标离开就影藏
        if (isControl) {
            control.hide();
        }
    });

//    小圆点添加点击功能
    if (isFocus) {
        $focus.children().click(function () {
            //    解决反着来一圈的BUG
            if (index == $slide.children().length - 1) {
                index = 0;
                $slide.css("left", 0);
            }

            //    三个索引值保持一致
            index = circleIndex = $(this).index();
            //    位移大图
            $slide.animate({
                left: -index * moveWidth
            });
            //    位移小圆点
            $(this).addClass(focusClass).siblings().removeClass(focusClass)
        })
    }
    //左右按钮控制功能
    if (isControl) {
        control.children(".left").click(function () {
            //大图的索引
            index--;
            // console.log(index,$slide.children().length-1);
            if (index < 0) {
                //    瞬间到最后一张的位置
                $slide.css("left", -($slide.children().length - 1) * moveWidth);
                index = $slide.children().length - 2;
            }

            $slide.animate({
                left: -index * moveWidth
            }, 200);

            //    小圆点功能
            if (isFocus) {
                //    有小圆点功能
                circleIndex--;
                if (circleIndex < 0) {
                    //最小索引的判断
                    circleIndex = $focus.children().length - 1;
                }

                $focus.children()
                    .eq(circleIndex)
                    .addClass(focusClass)
                    .siblings()
                    .removeClass(focusClass);
            }
        })

        control.children(".right").click(function () {
            autoPlay();
        })
    }

};



