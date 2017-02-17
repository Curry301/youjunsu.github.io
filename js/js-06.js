/**
 * Created by Administrator on 2016/10/9 0009.
 */
/*$('.logo').click(function(){
    window.open("http://192.168.0.197/part2/首页-01.html")
});
$('.zc').click(function(){
    window.open("http://192.168.0.197/part2/注册-07.html")
});
$('.clicka').toggle(
    function(){
        $('.clicka').removeClass('agreen1');
        $('.clicka').addClass('.agreen');
    },
    function () {
        $('.clicka').removeClass('.agreen');
        $('.clicka').addClass('agreen1');
    }
);


$('.room-input').focusin(function(){
   $('.ip1').css('display','block');
    $('.input-box2').css('border','1px solid #70ad46')
});
$('.room-input').blur(function(){
   $('.ip1').css('display','none');
    $('.input-box2').css('border','1px solid #cccccc')
});
$('.pwd-input').focusin(function(){
    $('.ip4').css('display','block');
});
$('.pwd-input').blur(function(){
    $('.ip4').css('display','none');
});

*/


/*$('.tk-box b').toggle(
    function(){
        $('.tk-box b').attr('class','agreen');

    },
    function () {

        $('.tk-box b').attr('class','xieyi');
    }
);*/

var off={};

$('form input[name=lname]').on({
    focus: function () {
        $(this).parent().css({
            'border-color': 'rgb(112, 173, 70)'
        });
    },
    blur:function () {
        var val=$(this).val();
        isinput(/[\w]{6,20}/.test(val),this);
    }
}).focus();

$('form input[name=lpassword]').on({
    focus: function () {
        // console.log($(this).tagName);
        $(this).parent().css({
            'border-color': 'rgb(112, 173, 70)'
        })
    },
    blur:function () {
        var val=$(this).val();
        isinput(/^[a-zA-Z0-9][\w]{5,19}/.test(val),this);
     }
});
function isinput(put,_this){
    if(put){
        $(_this).parent().css({
            'border-color': 'rgb(112, 173, 70)'
    });
        off[_this.className]=true;           //????/??
    }else {
        $(_this).parent().css({
            'border-color': '#981616'
        });
        off[_this.className]=false;

    }

}

$('form .login').click(function () {
        var isform = true;
    if(isform) {
        $('form input').blur();
        if (!$('.tk-box b').attr('class') == '') {
            isform = false;
        }else {
            //alert('输入的信息错误');
        }
    }
        for (var i in off) {
            if (!off[i]) {
                isform = false;
            }
        }
    //alert(isform);
        if (isform) {
            $.ajax({
                type: 'post',
                url: 'http://www.zhijunxing.com/yiju/landlordLogin.action',
                dataType: 'jsonp',
                data: $('form').serialize(),
                success: function (data) {
                    if (data.resultCode == 0000) {
                          location.href = 'index.html'

                    }
                }
            })
        }else {
            alert('请勾选同意服务协议')
        }

    });


$('.tk-box b').toggle(
    function () {
        $(this).addClass('xieyi')
    }, function () {
        $(this).removeClass('xieyi')
    }

);




