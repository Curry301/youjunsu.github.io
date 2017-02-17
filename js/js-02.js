    /**
     * Created by Administrator on 2016/10/8 0008.
     */
    /*$('.logo').click(function(){
        window.open("http://192.168.0.197/part2/首页-01.html")
    });
    $('#log-in').click(function(){
        window.open("http://192.168.0.197/part2/登录-06.html")
    });
    $('#regin').click(function(){
        window.open("http://192.168.0.197/part2/注册-07.html")
    });*/

    //左侧点击切换
    $('.client-xq li').eq(0).click(function () {
        var pageNo = 1;
        $(this).addClass('change').siblings().removeClass('change');
        $('#main1').show();
        $('#main2,#main3,#main4').hide();
        Collect(pageNo);
        $('.num').on('click', 'a', function () {
            // console.log($('.page-box a').last().prev().html());
            if ($(this).html() == '上一页') {
                if (!(pageNo == 1)) {
                    pageNo -= 1;
                    Collect(pageNo);
                }
            } else if ($(this).html() == '下一页') {
                if (!(pageNo == $('.num a').last().prev().html())) {
                    pageNo += 1;
                    Collect(pageNo);
                }
            } else {
                pageNo = parseInt($(this).html());
                Collect(pageNo);
            }
        });
        //  pageNo=$('.page-box .page-checked').html();
        // Collect(pageNo);

    });

    $('.client-xq li').eq(1).click(function () {
        $(this).addClass('change').siblings().removeClass('change');
        $('#main2').show();
        $('#main1,#main3,#main4').hide();
    });

    $('.client-xq li').eq(2).click(function () {
        $(this).addClass('change').siblings().removeClass('change');
        $('#main3').show();
        $('#main1,#main2,#main4').hide();
    });

    $('.client-xq li').eq(3).click(function () {
        $(this).addClass('change').siblings().removeClass('change');
        $('#main4').show();
        $('#main1,#main3,#main2').hide();
    });
    /*-----------------------------------------我的收藏---------------------------------------*/

    for (var i = 400; i < 600; i++) {
        $.ajax({
            type: 'get',
            url: 'http://www.zhijunxing.com/yiju/addCollect.action',
            dataType: 'jsonp',
            data: {
                hid: i
            },
            success: function (data) {
                console.log(data);
            }
        });
    }


    function Collect(pageNo) {
        $.ajax({
            type: 'post',
            url: 'http://www.zhijunxing.com/yiju/queryCollectHouses.action',
            dataType: 'jsonp',
            data: {
                pageNo: pageNo
            },
            success: function (data) {
                //alert(111111);
                console.log(data.rowCount);
                if (data.success) {
                    var a;
                    if (Math.ceil(data.rowCount / 2) <= 5  ) {   //data.rowCount收藏的房源总数（接口文档）  pageNo  当前页码

                        a = '<a href="###">上一页</a>';
                        for (var i = 1; i <= Math.ceil(data.rowCount / 2); i++) {
                            if (i == pageNo) {
                                a += '<a href="###" class="page-now">' + i + '</a>'
                            } else {
                                a += '<a href="###">' + i + '</a>'
                            }
                        }
                        a += '<a href="###">下一页</a>';

                    } else if (pageNo <= 3  ) {

                        a = '<a href="###">上一页</a>';
                        for (var i = 1; i <= 4; i++) {
                            if (i == pageNo) {
                                a += '<a href="###" class="page-now">' + i + '</a>'
                            } else {
                                a += '<a href="###">' + i + '</a>'
                            }
                        }
                        a += '<b class="page-middle"> ··· </b><a href="###">' + Math.ceil(data.rowCount / 2) + '</a><a href="###">下一页</a>';

                    } else if (pageNo + 2 >= Math.ceil(data.rowCount / 2)) {
                        a = '<a href="###">上一页</a>' +
                            '<a href="###">1</a>' +
                            '<b class="page-middle"> ··· </b>';
                        for (var i = 3; i >= 0; i--) {
                            if (Math.ceil(data.rowCount / 2) - i == pageNo) {
                                a += '<a href="###" class="page-now">' + (Math.ceil(data.rowCount / 2) - i) + '</a>'
                            } else {
                                a += '<a href="###">' + (Math.ceil(data.rowCount / 2) - i) + '</a>'
                            }
                        }
                        a += '<a href="###">下一页</a>';

                    } else if (pageNo + 2 < Math.ceil(data.rowCount / 2)) {
                        a = '<a href="###">上一页</a>' +
                            '<a href="###">1</a>' +
                            '<b class="page-middle"> ··· </b>' +
                            '<a href="###">' + (parseInt(pageNo) - 1) + '</a>' +
                            '<a href="###" class="page-now">' + pageNo + '</a>' +
                            '<a href="###">' + (parseInt(pageNo) + 1) + '</a>' +
                            '<b class="page-middle"> ··· </b>' +
                            '<a href="###">' + Math.ceil(data.rowCount / 2) + '</a>' +
                            '<a href="###">下一页</a>';
                    }
                    $('.num').html(a);

                    var item = '';
                    for (var i=0 ;i<data.data.length;i++) {
                        console.log(data.data[i].id);
                        item += '<li class="house-img-box" id="'+data.data[i].id+'">' +
                            '<img src="http://www.zhijunxing.com/yiju/upload/' + data.data[i].photo.split(',')[0]+'" alt="" class="house-img">' +
                             '<div class="f-clear house-img-bot"><div class="house-jieshao-box"><a href="###">'+data.data[i].tittle+''+ +''+data.data[i].room+'</a>'+'<div class="renzheng"></div><button class="del">删除 ×</button>'+'</div>' +
                            '<div class="house-jieshao-box-1"><p>'+data.data[i].hcondition+'|'+data.data[i].rentway+'|'+data.data[i].floor+'/'+data.data[i].countfloor+'层</p>'+'<div class="house-price house-price2">'+'/'+'月</div>'+'<div class="house-price house-price1" >'+data.data[i].price+'</div>'+'</div>' +
                            '<div class="house-jieshao-box-2"><em></em><p>'+data.data[i].address+'</p><i>'+data.data[i].addtime+'</i></div>' +
                            '<div class="house-jieshao-box-3"><a href="###" class="house-jieshao-box-3-a1">'+data.data[i].hlevel+'</a><a href="###"  class="house-jieshao-box-3-a2">'+data.data[i].paymethod+'</a></div>'+
                            '</li>'
                    }
                    $('.main-son>ul').html(item);


                } else {

                    alert('您没有收藏房源！');
                }
            }
        });


    }
//取消收藏
    $('.main-son').on('click','.del',function () {
        var pageNo=1;
        //alert(1222);
        $.ajax({
            type:'GET',
            url:'http://www.zhijunxing.com/yiju/delCollect.action',
            dataType:'jsonp',
            data:{
                Hid:$(this).parent().parent().parent().attr('id')
            },
            success: function (data) {
                //alert(2222)
                console.log(data);
                $(this).parent().parent().parent().remove();
            }

        });

        Collect(pageNo);
    });









    //搜索框下拉框
    $('#area').mouseover(function(){
        $('.city-span ul').slideDown();
    });
    $('.city-span').mouseleave(function(){
        $('.city-span ul').slideUp();
    });
    $('.city-span li .aa span').click(function(){
        $('#area').text($(this).text());
    });


    //编辑资料下的点击切换
    $('.text1').click(function () {
        $('.b1').show();
        $('.b2,.b3').hide();
        $('.text1').css('backgroundColor','#ccc');
        $('.text2,.text3').css('backgroundColor','#eee');
    });
    $('.text2').click(function () {
        $('.b2').show();
        $('.b1,.b3').hide();
        $('.text2').css('backgroundColor','#ccc');
        $('.text1,.text3').css('backgroundColor','#eee');
    });
    $('.text3').click(function () {
        $('.b3').show();
        $('.b1,.b2').hide();
        $('.text3').css('backgroundColor','#ccc');
        $('.text1,.text2').css('backgroundColor','#eee');
    });


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
                    $('#log-box a').eq(0).html('欢迎').attr('href', 'http://192.168.0.197/part2/登录-06.html');
                    $('#log-box a').eq(1).html('退出').attr('href', '注册-07.html').removeAttr('onclick')
                }

            }


        })

    }


    var pass;
    /*----------------------------------------修改昵称-------------------------------------*/
    $('.b2 input').on({
        focus: function () {
            $('.b2 input').css({
                'border-color': 'rgb(112, 173, 70)'
            });
        },
        blur: function () {
            var val = $('.b2 input').val();
            if(/[\w]{6,20}$/.test(val)){
                $('.b2 .baocun').click(function () {
                    $.ajax({
                        type: 'post',
                        url: 'http://www.zhijunxing.com/yiju/uqdateLandlord.action',
                        dataType: 'jsonp',
                        data:{
                            lname:val
                        },
                        success: function (data) {
                            console.log(data);
                            if(data.resultCode=='0000'){
                                login();
                            }
                        }
                    })
                })
            }
            $('.b2 .cancel').click(function(){
                $('.b2 input').val()
            })
        }
    }).focus();
    login();
    function login(){
        $.ajax({
            type: 'post',
            url: 'http://www.zhijunxing.com/yiju/loginSession.action',
            dataType: 'jsonp',
            success: function (data) {
                console.log(data);
                if(data.success){
                    pass=data.data[0].lpassword;  //从服务器获取当前的密码并赋值给  pass
                    $('#log-in').html('欢迎'+data.data[0].lname).attr('href','11a111');
                    $('#regin').html('退出');
                    $('.client span').html(data.data[0].lname);
                    if(data.data[0].lphoto){
                        //alert(1654651)
                        $('.client img').attr('src','http://www.zhijunxing.com/yiju/upload/'+data.data[0].lphoto)
                    }else{
                        alert('没有图片什么鬼');
                    }
                }else{
                    location.href = '登录-06.html';
                }
            }
        });
    }

    $('.b1 input').change(function () {
        if (typeof FileReader == 'undefined') {
            alert("检测到您的浏览器不支持FileReader对象！");
        }
        var reader= new FileReader(),
            val=this.files[0];
        reader.readAsDataURL(val);
        reader.onload=function(){
            $('.b1 img').attr('src',reader.result);
        }
    });

    $('.b1 .preserve').click(function () {
        $.ajaxFileUpload({
            type: 'post',
            url: 'http://www.zhijunxing.com/yiju/uqdateLandlord.action',
            secureuri: false,
            fileElementId: 'uploadPhoto',
            async: true,
            cache: true,
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded;charset=UTF-8'
        });
        setTimeout(function () {
            location.href = '个人中心-02.html';
        }, 1000);//一秒后在从新获取一次登录信息
    });
    /*----------------------------------------修改密码-------------------------------------*/
    $('.b3 input').on({

        focus: function () {
           $(this).css({
                'border-color': 'rgb(112, 173, 70)'
            });
        }
    });

    $('.b3 input').eq(0).blur(function () {
        console.log(pass);
        var val = $(this).val();
        console.log(val==pass);
        if (!(val == pass)) {
            //console.log(val);
            $(this).css({ 'border-color': '#981616'});
        }
    });
    $('.b3 input').eq(1).blur(function () {
        var val = $(this).val();
        if(!(/^[a-zA-Z0-9][\w]{5,19}/.test(val))){
            $(this).css({
                'border-color': '#981616'
            });
        }

    });
    $('.b3 input').eq(2).blur(function () {
        var val = $(this).val();
        if(!(val == '' ? false : val === $('.b3 input').eq(1).val())){
            $(this).css({
                'border-color': '#981616'
            });
        }

    });
    $('.b3 .baocun').click(function () {
        //alert(555555)
        if(
            $('.b3 input').eq(0).val() == pass &&
            /^[a-zA-Z0-9][\w]{5,19}/.test( $('.b3 input').eq(1).val()) &&
            $('.b3 input').eq(2).val() === $('.b3 input').eq(1).val()
        ){
            $.ajax({
                type: 'post',
                url: 'http://www.zhijunxing.com/yiju/uqdateLandlord.action',
                dataType: 'jsonp',
                data: {
                    lpassword: $('.b3 input').eq(2).val()
                },
                success: function (data) {
                    alert(11111);
                    console.log(data);
                    if (data.resultCode == '0000') {
                        alert(222222);
                        login();
                    }
                }
            })
        }
    });
    $('.b3 .cancel').click(function (){
        $('.b3 input').val('');
    });

    /*----------------------------------------我的收藏-------------------------------------*/

























