/**
 * Created by Administrator on 2016/10/9 0009.
 */
//获取登录信息和退出
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
//搜索框
$('#area').mouseover(function(){
    $('.city-span ul').slideDown();
});
$('.city-span').mouseleave(function(){
    $('.city-span ul').slideUp();
});
$('.city-span li .aa span').click(function(){
    $('#area').text($(this).text());
});
//身份
$('.choose-box').click(function () {
        $(this).addClass('choosen-house').siblings('span').removeClass('choosen-house')
    });

$('.input-box3').click(function(){
    $('.xq1').show()
});
$('.xq1').mouseleave(function(){
    $('.xq1').hide()
});
$('.xq1 li a').click(function(){
    $('.direction').val($(this).html());
    $('.xq1').hide();
});

$('.input-box4').eq(0).click(function(){
    $('.xq2').show()
});
$('.xq2').mouseleave(function(){
    $('.xq2').hide()
});
$('.xq2 li a').click(function(){
    $('.hou-tp').val($(this).html());
    $('.xq2').hide();
});

$('.input-box4').eq(1).click(function(){
    $('.xq3').show()
});
$('.xq3').mouseleave(function(){
    $('.xq3').hide()
});
$('.xq3 li a').click(function(){
    $('.rent-money').val($(this).html());
    $('.xq3').hide();
});

//房屋配置
/*$('.house-peizhi li').toggle(
    function () {
    $(this).addClass('peizhi1');
},
    function () {
        $(this).removeClass('peizhi1')
    }
);*/
//上传图片
var obj={furniture:''};
$('.rent-type span').click(function () {
    //alert(22222)
    obj['rentway']=$('.choosen-house').eq(0).text();
    //console.log(obj);
});
$('.identity span').click(function () {
    //alert(8888)
    obj['type']=$('.choosen-house').eq(1).text();
    //console.log(obj);
});
$('.xquName input').blur(function () {
    obj['villageName']=$(this).val();
    //console.log(obj);
});
$('.room input').blur(function () {
    obj['room']=$('.room-input').eq(0).val()+$('.shi span').text()+$('.room-input').eq(1).val()+$('.ting span').text()+$('.room-input').eq(2).val()+$('.wei span').text()+$('.room-input').eq(3).val()+$('.mi span').text();
    console.log(obj);
});
$('input[name=floor]').blur(function () {
    //obj['floor']=$('.floorNum span').eq(0).text()+$('input').eq(0).val()+$('.floorNum span').eq(1).text()+$('.floorCount span').eq(0).text()+$('input').eq(1).val()+$('.floorCount span').eq(1).text();
    obj['floor']=$(this).val();
    //console.log(obj);
});
$('input[name=countfloor]').blur(function () {
    obj['countfloor']=$(this).val();
    //console.log(obj);
});
$('input[name=direction]').blur(function () {
    obj['direction']=$(this).val();
    //console.log(obj);
});
$('input[name=level]').blur(function () {
    obj['level']=$(this).val();
    //console.log(obj);
});
$('input[name=price]').blur(function () {
    obj['price']=$(this).val();
    //console.log(obj);
});
$('input[name=paymethod]').blur(function () {
    obj['paymethod']=$(this).val();
    //console.log(obj);
});
$('input[name=tittle]').blur(function () {
    obj['tittle']=$(this).val();
    //console.log(obj);
});
/*$('.house-peizhi li').click(function () {
    obj['furniture']=$(this).html()
    console.log(obj);
})*/

//  不懂
$('.house-peizhi li').click(function(){
    if(!(this.className=='peizhi1')){
        obj.furniture+=$(this).html();
        $(this).attr('class','peizhi1')
    }else{
        length=$(this).html().length;
        str= $(this).html();
        num= obj.furniture.indexOf($(this).html());
        tt=obj.furniture.substring(num,parseInt(num+length));
        obj.furniture = obj.furniture.replace(tt,' ');
        $(this).attr('class',' ')
    }
    //console.log(obj);
    //console.log(obj.furniture);
});


$('input[name=features]').blur(function () {
    obj['features']=$(this).val();
    //console.log(obj);
});
$('input[name=address]').blur(function () {
    obj['address']=$(this).val();
    //console.log(obj);
});

$('input[name=linkman]').blur(function () {
    obj['linkman']=$(this).val();
    //console.log(obj);
});
$('input[name=linkphone]').blur(function () {
    obj['linkphone']=$(this).val();
    //console.log(obj);
});

var fileIds = [], num = 1;
$('#IMG').on('change', 'input[type=file]', function () {
    var reader = new FileReader(), val = $(this).get(0).files[0];
    reader.readAsDataURL(val);
    console.log(typeof reader);
    reader.onload = function () {
        fileIds.push('file' + num);
        $('#' + fileIds[num - 1]).hide();
        num += 1;
        $('.imgBox').append('<img src="' + reader.result + '"/>');
        $('#IMG').append('<input type="file" name="file" id="file' + num + '">');
    }
});
//

$('.put-out').click(function () {
    $.ajaxFileUpload({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/addHouses.action',
        secureuri: false,
        fileElementId: fileIds,
        // data:$('#form1').serialize()+$.param(obj),
        data:obj,
        async: true,
        cache: true,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        success: function (data) {
            alert(111111);
            console.log(data);
        }
    })
});

$.ajax({
    type:'post',
    url:'http://www.zhijunxing.com/yiju/queryHousesBylid.action',
    dataType:'jsonp',
    data:{
        pageNo:'1'
    },
    success:function(data){
        if(data.success){
            console.log(data)
        }
    }
});


