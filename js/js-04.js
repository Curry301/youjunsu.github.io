/**
 * Created by Administrator on 2016/10/9 0009.
 */
/*
$('#log-in').click(function(){
    window.open("http://192.168.0.197/part2/登录-06.html")
});
$('#regin').click(function(){
    window.open("http://192.168.0.197/part2/注册-07.html")
});
*/


$('#area').click(function(){
    $('.city-span ul').slideDown();
});
$('.city-span').mouseleave(function(){
    $('.city-span ul').slideUp();
});
$('.city-span li .aa span').click(function(){
    $('#area').text($(this).text());
    $('.city-box').hide();
});


$('.area-tit #select1').click(function(){
    $('.xq1').show();
});
$('.xq1').mouseleave(function(){
    $('.xq1').hide();
});
$('.xq1 li a').click(function(){
   $('.selection1').html($(this).html());
    $('.xq1').hide();
});

$('.area-tit #select2').click(function(){
    $('.xq2').show();
});
$('.xq2').mouseleave(function(){
    $('.xq2').hide();
});
$('.xq2 li a').click(function(){
    $('.selection2').html($(this).html()).children('.xq2').hide();
    //$('.xq2').hide();
});
//地铁  阳台
$('.area-tit i').toggle(
    function () {
        $(this).addClass('chosen')
    },
    function () {
        $(this).removeClass('chosen')
    }
);

$('.area-list a').click(function () {
    $(this).addClass('changeColor').parents('li').siblings().children('a').removeClass('changeColor');
});

//获取登录信息
$.ajax({
    type: 'post',
    url: 'http://www.zhijunxing.com/yiju/loginSession.action',
    dataType: 'jsonp',
    success: function (data) {
        //  console.log(data);
        if (data.success) {
            $('#log-box a').eq(0).html('欢迎' + data.data[0].lname).attr('href', '个人中心-02.html');
            $('#log-box a').eq(1).html('退出').attr({
                'href': 'index.html',
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
                location.href = 'index.html';
                $('#log-box a').eq(0).html('欢迎').attr('href', '登录-06.html');
                $('#log-box a').eq(1).html('退出').attr('href', '注册-07.html').removeAttr('onclick')
            }

        }
    })
}






//
var obj={};
$('#price a').click(function () {
    obj['price']=$(this).attr('name');
    Collect(obj)
});
$('#shi a').click(function () {
    obj['shi']=$(this).attr('name');
    Collect(obj)
});
$('#aR a').click(function () {
    obj['address']=$(this).attr('ad');
    Collect(obj)
});


$('.house-tit li').eq(0).click(function () {
    $(this).addClass('change').siblings().removeClass('change');
    $('.house-box-mid1').show();
    $('.house-box-mid2,.house-box-mid3,.house-box-mid4').hide();
   obj.pageNo = 1;
    Collect(obj);
    $('.num').on('click', 'a', function () {
        //alert(111)
        // console.log($('.page-box a').last().prev().html());
        if ($(this).html() == '上一页') {
            if (!(obj.pageNo == 1)) {
                obj.pageNo -= 1;
                Collect(obj);
            }
        } else if ($(this).html() == '下一页') {
            if (!(obj.pageNo == $('.num a').last().prev().html())) {
                obj.pageNo += 1;
                Collect(obj);
            }
        } else {
            obj.pageNo = parseInt($(this).html());
            Collect(obj);
        }
    });
}).click();

$('.house-tit li').eq(1).click(function () {
    $(this).addClass('change').siblings().removeClass('change');
    $('.house-box-mid2').show();
    $('.house-box-mid1,.house-box-mid3,.house-box-mid4').hide();
});

$('.house-tit li').eq(2).click(function () {
    $(this).addClass('change').siblings().removeClass('change');
    $('.house-box-mid3').show();
    $('.house-box-mid1,.house-box-mid2,.house-box-mid4').hide();
});

$('.house-tit li').eq(3).click(function () {
    $(this).addClass('change').siblings().removeClass('change');
    $('.house-box-mid4').show();
    $('.house-box-mid1,.house-box-mid3,.house-box-mid2').hide();
});











function Collect(obj) {
    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/queryHousesBySql.action',
        dataType: 'jsonp',
        data:obj,
        success: function (data) {
            //alert(111111);
            console.log(data.rowCount);  //房源的数量
            console.log(data);
            if (data.success) {
                var a;
                if (Math.ceil(data.rowCount / 5) <= 5  ) {   //data.rowCount收藏的房源总数（接口文档）  pageNo  当前页码

                    a = '<a href="###">上一页</a>';
                    for (var i = 1; i <= Math.ceil(data.rowCount / 5); i++) {
                        if (i == obj.pageNo) {
                            a += '<a href="###" class="page-now">' + i + '</a>'
                        } else {
                            a += '<a href="###">' + i + '</a>'
                        }
                    }
                    a += '<a href="###">下一页</a>';

                } else if (obj.pageNo <= 3  ) {

                    a = '<a href="###">上一页</a>';
                    for (var i = 1; i <= 4; i++) {
                        if (i == obj.pageNo) {
                            a += '<a href="###" class="page-now">' + i + '</a>'
                        } else {
                            a += '<a href="###">' + i + '</a>'
                        }
                    }
                    a += '<b class="page-middle"> ··· </b><a href="###">' + Math.ceil(data.rowCount / 5) + '</a><a href="###">下一页</a>';

                } else if (obj.pageNo + 2 >= Math.ceil(data.rowCount / 5)) {
                    a = '<a href="###">上一页</a>' +
                        '<a href="###">1</a>' +
                        '<b class="page-middle"> ··· </b>';
                    for (var i = 3; i >= 0; i--) {
                        if (Math.ceil(data.rowCount / 5) - i == obj.pageNo) {
                            a += '<a href="###" class="page-now">' + (Math.ceil(data.rowCount / 5) - i) + '</a>'
                        } else {
                            a += '<a href="###">' + (Math.ceil(data.rowCount / 5) - i) + '</a>'
                        }
                    }
                    a += '<a href="###">下一页</a>';

                } else if (obj.pageNo + 2 < Math.ceil(data.rowCount / 5)) {
                    a = '<a href="###">上一页</a>' +
                        '<a href="###">1</a>' +
                        '<b class="page-middle"> ··· </b>' +
                        '<a href="###">' + (parseInt(obj.pageNo) - 1) + '</a>' +
                        '<a href="###" class="page-now">' + obj.pageNo + '</a>' +
                        '<a href="###">' + (parseInt(obj.pageNo) + 1) + '</a>' +
                        '<b class="page-middle"> ··· </b>' +
                        '<a href="###">' + Math.ceil(data.rowCount / 5) + '</a>' +
                        '<a href="###">下一页</a>';
                }
                $('.num').html(a);

                var item = '';
                for (var i=0 ;i<data.data.length;i++) {
                    //console.log(data.data[i].id); //房屋的id
                    item += '<li class="house-img-box" id="'+data.data[i].id+'">' +
                        '<img src="http://www.zhijunxing.com/yiju/upload/' + data.data[i].photo.split(',')[0]+'" alt="" class="house-img">' +
                        '<div class="f-clear house-img-text">' +
                        '<div class="house-jieshao-box"><a href="###">'+data.data[i].tittle+' '+ +' '+data.data[i].room+'</a>'+'<span class="renzheng"></span><span class="chengxin"></span><button class="del">删除 ×</button>'+'</div>' +
                        '<div class="house-jieshao-box-1"><p>'+data.data[i].hcondition+'|'+data.data[i].rentway+'|'+data.data[i].floor+'/'+data.data[i].countfloor+'层</p>'+'<div class="house-price house-price2">'+'/'+'月</div>'+'<div class="house-price house-price1" >'+data.data[i].price+'</div>'+'</div>' +
                        '<div class="house-jieshao-box-2"><p>'+data.data[i].address+'</p><i>'+data.data[i].addtime+'</i></div>' +
                        '<div class="house-jieshao-box-3"><a href="###" class="house-jieshao-box-3-a1">'+data.data[i].hlevel+'</a><a href="###" class="house-jieshao-box-3-a2">'+data.data[i].region+'</a></div>'+
                        '</div></li>'
                }
                $('.house-box-mid1 ul .main-son').html(item);

            } else {

                alert('对不起没有查到相应的房源！');
            }
        }
    });
};