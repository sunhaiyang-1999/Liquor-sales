function scroll() {
    if(window.pageXOffset!=undefined){
        return{
            left:window.pageXOffset,
            top:window.pageYOffset
        }
    }else{
        return{
            left:document.documentElement.scrollLeft,
            top:document.documentElement.scrollTop
        }
    }
}

function getClient() {
    if(window.innerWidth!=undefined){
        return{
            width:window.innerWidth,
            height:window.innerHeight
        }
    }else{
        return{
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        }
    }

}

//      自定义封装插件
$.fn.lazyLoad=function (window,callback) {
    //把JQ对象转换成js对象
    var box=this.get(0);
    //开闭原则 控制加载次数
    var boo=true;

    if(box.offsetParent.nodeName!="BODY"){
        //如果当前盒子的offsetTop不是距离body 而是其他元素
        // 也就是说当前元素有父系元素的定位的  那么没办法计算
        return;
    }
    //页面第一次加载也要判断调用
    setHtml();
    //给页面添加滚动事件
    $(window).scroll(function () {
        //    每次滚动都要调用方法判断
        setHtml();
    })
    function setHtml() {
        //用盒子到body的距离- 浏览器可是区域高度
        var min=box.offsetTop-getClient().height
        //盒子距离顶部的距离+盒子的高度  就是盒子底边到body的距离
        var max=box.offsetTop+box.offsetHeight;
        if(scroll().top>min && scroll().top<max){
            //判断当前回调函数的这个参数是一个函数 并且能加载时 再去加载
            if(typeof callback=="function" && boo){
                //现在马上要加载   就把开闭原则关闭 下次不再加载
                boo=false;
                callback();
            }



        }

    }



}