/**
 * Created by Administrator on 2016/10/9 0009.
 */
window,onload= function () {

    function initMap(){
        createMap();//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
        addMapOverlay();//向地图添加覆盖物
    }
    function createMap(){
        map = new BMap.Map("map");
        map.centerAndZoom(new BMap.Point(113.664254,34.765743),14);
    }
    function setMapEvent(){
        map.enableScrollWheelZoom();
        map.enableKeyboard();
        map.enableDragging();
        map.enableDoubleClickZoom()
    }
    function addClickHandler(target,window){
        target.addEventListener("click",function(){
            target.openInfoWindow(window);
        });
    }
    function addMapOverlay(){
    }
    //向地图添加控件
    function addMapControl(){
        var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
        scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
        map.addControl(scaleControl);
        var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
        map.addControl(navControl);
        var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});
        map.addControl(overviewControl);
    }
    var map;
    initMap();








    $.ajax({
    type: 'post',
    url: 'http://www.zhijunxing.com/yiju/loginSession.action',
    dataType: 'jsonp',
    success: function (data) {
        //  console.log(data);
        if (data.success) {
            $('#log-box a').eq(0).html('欢迎' + data.data[0].lname).attr('href', '个人中心-02.html');
            $('#log-box a').eq(1).html('退出').attr({
                'href': '首页-01.html',
                'onclick': 'quitLogin()'
            })
        }
    }
});
function quitLogin() {
    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/quitLogin.action',
        dataType: 'jsonp',
        success: function (data) {
            if (data.resultCode=='0000') {
                location.href = '首页-01.html';
                $('#log-box a').eq(0).html('欢迎').attr('href', '登录-06.html');
                $('#log-box a').eq(1).html('退出').attr('href', '注册-07.html').removeAttr('onclick')
            }
        }
    })
}

$('#area').mouseover(function(){
    $('.city-span ul').slideDown();
});
$('.city-span').mouseleave(function(){
    $('.city-span ul').slideUp();
});
$('.city-span li .aa span').click(function(){
    $('#area').text($(this).text());
});




var href= window.location.href;
 console.log(href.substring((href.indexOf('?')+1), href.length));
var content='';
$.ajax({
    type: 'get',
    url: 'http://www.zhijunxing.com/yiju/queryHousesByid.action',
    dataType: 'jsonp',
    data: {
        id:href.substring((href.indexOf('?')+1), href.length)
    },
    success: function (data) {
        //alert(1111);
        console.log(data);
        if (data.success) {
            //alert(1111)
            content+='<div class="xq-img-left"><img src="http://www.zhijunxing.com/yiju/upload/'+ data.data[0].photo.split(',')[0] + '" alt="" class="xq-img-ba">' +
                +'<ul style="width: 455px;height: 79px;">' +
                '<li class="xq-little-list"><img src="http://www.zhijunxing.com/yiju/upload/'+data.data[0].photo.split(',')[2] + ' " alt="未找到"></li>' +
                '<li class="xq-little-list"><img src="http://www.zhijunxing.com/yiju/upload/'+data.data[0].photo.split(',')[1] + ' " alt=""></li>' +
                '<li class="xq-little-list"><img src="http://www.zhijunxing.com/yiju/upload/'+data.data[0].photo.split(',')[2] + ' " alt=""></li>' +
                '<li class="xq-little-list"><img src="http://www.zhijunxing.com/yiju/upload/'+data.data[0].photo.split(',')[3] + ' " alt=""></li></ul></div>' +
                '<div class="xq-img-right"><div class="xq-text"><h1>'+data.data[0].tittle+'</h1><p class="sp">租金：<span style="font-size:22px;color:#eb5f00">'+data.data[0].price+'/月</span></p>' +
                '<p class="sp">面积：'+data.data[0].area+'㎡<span class="sp1">户型：'+data.data[0].room+'</span></p></p>' +
                '<p class="sp">朝向：'+data.data[0].direction+'<span class="sp2">装修：'+data.data[0].hlevel+'</span></p>' +
                '<p class="sp">租金压付：'+data.data[0].paymethod+'<span class="sp3" >租赁方式：'+data.data[0].rentway+'</span></p>' +
                '<p class="sp">特色：'+data.data[0].features+'</p><p class="sp">地址：'+data.data[0].address+'</p>' +
                '<a href="###" class="tel"><div class="tel-ico"></div><span>'+data.data[0].linkphone+'</span><i>'+data.data[0].linkman+'</i></a>' +
                '<div class="collection-box"><div class="collection"></div><span style="position: absolute;top: 17px;left: 59px;cursor: pointer">收藏</span><div class="share"></div><span style="position: absolute;top: 17px;left: 149px;cursor: pointer">分享</span></div></div></div>'
            $('.HOUSE').append(content);
        }
    }
});

}


















