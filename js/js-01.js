/**
 * Created by Administrator on 2016/9/26 0026.
 */
$('.houseman').click(function () {
    $('#search-box-max').show();
    $('#search-box-2').hide()
});
$('.houseman2').click(function () {
    $('#search-box-max').hide();
    $('#search-box-2').show()
});


$('#area').mouseover(function () {
    $('.houseman ul').slideDown();
});
$('.city-span').mouseleave(function () {
    $('.houseman ul').slideUp();
});
$('.city-span li .aa span').click(function () {
    $('#area').text($(this).text());
});


$.ajax({
    type:'post',
    url:'http://www.zhijunxing.com/yiju/loginSession.action',
    dataType:'jsonp',
    success:function(data){
        //console.log(data.success);
        $('#log-in').html('欢迎'+data.data[0].lname).attr('href','个人中心-02.html');
        $('#regin').html('退出').attr({
            'onclick':'aa()',
            'href':'###'
        });
    }

});
function aa(){
    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/quitLogin.action',
        dataType: 'jsonp',
        success: function (data) {
            console.log(data);
            if(data.resultCode=='0000'){
                $('#log-in').html('登录').attr('href','登录-06.html');
                $('#regin').html('注册').attr('href','注册-07.html').removeAttr('onclick');
            }
        }
    });

}

/*

$.ajax({
    type: 'post',
    url: 'http://www.zhijunxing.com/yiju/queryHousesTop.action',
    dataType: 'jsonp',
    success: function (data) {
        if (data.success) {
            console.log(data.data.length);
            var item = '';
            for (var i=0 ;i<data.data.length;i++) {

                item += '<li class="tu "><div class="img-l pot img-common">' +
                    '<img src="http://www.zhijunxing.com/yiju/upload/' +
                    data.data[i].photo.split(',')[0] + '"/><p>' + data.data[i].villageName + '</p><div>' + data.data[i].room + '<span>' + data.data[i].price + '</span> 元/月</div></li>'
            }
            $('.img-wrap').append(item);

            $('.img-show-wrap').carousel({
                element: $('#banner'),
                time: 2000,
                left: $('.zuo'),
                right: $('.you'),
                oli: 4
            }, false, false);

        }else {
            alert('发生未知错误')
        }

    }
});

*/


//  底部轮播
$.ajax({
    type: 'POST',
    url: 'http://www.zhijunxing.com/yiju/queryHousesTop.action',
    dataType:'jsonp',
    success: function (data) {

        if (data.success) {
            //console.log(data.data.length);
            var item = '';
            for (var i in data.data) {
                item += '<li class="tjimg-box"><a href="详情页-03.html?'+data.data[i].id +'" target="_blank"><img class="tj-img" src="http://www.zhijunxing.com/yiju/upload/'
                    + data.data[i].photo.split(',')[0] + '"/><a href="###">' + data.data[i].villageName + '</a><span class="span1">' + data.data[i].room + '</span><span class="span2">&nbsp&nbsp&nbsp&nbsp' + data.data[i].price + '</span><span>元/月</span></a></li>'
            }
            $('.banner-list').append(item);
            $('.tuijian-img').carousel({
                element: $('.banner'),
                time: 2000,
                left: $('.prev'),
                right: $('.next'),
                oli: 4
            }, false, false);

        }
    }
});
















