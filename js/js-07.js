/**
 * Created by Administrator on 2016/10/9 0009.
 */
/*
$('.logo').click(function(){
    window.open("http://192.168.0.197/part2/首页-01.html")
});
$('.login2').click(function(){
    window.open("http://192.168.0.197/part2/登录-06.html")
});
 */

$('.tk-box b').toggle(
    function () {
        $(this).addClass('xieyi')
    }, function () {
        $(this).removeClass('xieyi')
    }

);
var off={'input1':'false','input2':'false','input3':'false','input4':'false','input5':'false'};
            //创建一个空对象，用来存储每个需要提交时验证是否通过，
             //当每个input失去焦点的时候获取这个input的类，
             // 当然这个类可以是其他的标识，他只起到的作用是用来甄别这个输入框正确的完成了输入，
             // 然后把这个名字当对象的属性存储到off里面，值为true或false
//判断输入的用户名是否合法
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
//判断输入的密码是否合法
$('form input[name=lpassword]').on({
    focus: function () {
        $(this).parent().css({
            'border-color': 'rgb(112, 173, 70)'
        })
    },
    blur:function () {
        var val=$(this).val();
        isinput(/^[a-zA-Z0-9][\w]{5,19}/.test(val),this);
    }
});
//判断输入的密码是否和上面输入的密码相同
$('form .input-3').on({
    focus: function () {
        $(this).parent().css({
            'border-color': 'rgb(112, 173, 70)'
        })
    },
    blur:function () {
        var val=$(this).val();
        isinput(val==''?false:val===$('form input[name=lpassword]').val(),this);
    }
});

//判断输入的邮箱格式是否合法
$('form input[name=lemail]').on({
    focus: function () {
        $(this).parent().css({
            'border-color': 'rgb(112, 173, 70)'
        })
    },
    blur:function () {
        var val=$(this).val();
        isinput(/^[a-zA-Z0-9][\w]{5,17}@[a-z0-9]{2,6}(\.[a-z]{2,3}){1,2}$/.test(val),this);
    }
});
//判断输入的手机号码的格式是否合法
$('form input[name=lphone]').on({
    focus: function () {
        $(this).parent().css({
            'border-color': 'rgb(112, 173, 70)'
        })
    },
    blur:function () {
        var val=$(this).val();
        isinput(/^1[0-9]{10}$/.test(val),this);
    }
});

function isinput(put,_this){
    if(put){
        $(_this).parent().css({
            'border-color': 'rgb(112, 173, 70)'
        });
        // console.log(_this.className);
        off[_this.className]=true;         //????/??
    }else {
        $(_this).parent().css({
            'border-color': '#981616'
        });
        off[_this.className]=false;
        //console.log($(_this).name());
    }
}



$('form .zhuce').click(function () {
    var isform=true;
    if (isform) {
        $('form input').blur();    //作用等同于下面注释的内容

/*        if (!(/[\w]{6,20}/.test($('form input[name=lname]').val()))) {
         $('form input[name=lname]').blur();
         }
         if (!(/^[a-zA-Z0-9][\w]{5,19}/.test($('form input[name=lpassword]').val()))) {
         $('form input[name=lpassword]').blur();
         }
         if (!($('form .input-3').val() === $('form input[name=lpassword]').val()) || $('form .input-3').val()=='' ) {
         $('form .input-3').blur();
         }
         if (!(/^[a-zA-Z0-9][\w]{5,17}@[a-z0-9]{2,6}(\.[a-z]{2,3}){1,2}$/.test($('form input[name=lemail]').val()))) {
         $('form input[name=lemail]').blur();
         }
         if (!(/^1[0-9]{10}$/.test($('form input[name=lphone]').val()))) {
         $('form input[name=lphone]').blur();
         }*/
        if (!$('.tk-box b').attr('class') == '') {
            //alert('请选择');
            isform=false;
        }
    }
    for (var i in off){
        if(!off[i]){
            isform=false;
        }
    }
    if(isform){
        console.log($('form').serialize());
        $.ajax({
            type:'post',
            url:'http://www.zhijunxing.com/yiju/saveLandlord.action',
            dataType:'jsonp',
            data:$('form').serialize(),
            success: function (data) {
                alert(data.resultCode);
                if(data.resultCode=='0000'){
                    $('.alt-box').css('display','block');

                    //location.href='http://192.168.0.197/part2/登录-06.html'
                }

            }
        })
    }else {
        alert('请重新输入')
    }
});
$('.in').on(
    'click',function(){
        location.href='登录-06.html'
    });
$('.cuo').on(
    'click',function(){
        location.href='注册-07.html'
    });















 /*


var off={};

$('form input[name=lname]').on({
    focus:function(){
        $('this').parent().css({
            'border-color':'rgb(112,173,70)'
        });
    },
    blur:function(){
       var val=$(this).val();
        isinput(/[\w]{6,20}/.test(val).this);
    }

}).focus();

$('form input[name=lpassword]').on({
    focus: function () {
        // console.log($(this).tagName);


        $(this).parent().css({
            'border-color': 'rgb(112, 173, 70)'
        })
    },
    blur: function () {
        var val = $(this).val();
        isinput(/^[a-zA-Z0-9][\w]{5,19}/.test(val), this);

    }
});

function isinput(put, _this) {
    if (put) {
        $(_this).parent().css({
            'border-color': 'rgb(112, 173, 70)'
        });
        off[_this.className] = true
    } else {

        $(_this).parent().css({
            'border-color': '#981616'
        });
        off[_this.className] = false;
    }

}

$('form .submit').click(function () {

    var isform = true;
    for (var i in off) {
        if (!off[i]) {
            isform = false;
        }
    }

    if (!$('.tk-box a').attr('class') == '') {
        isform = false;

    }

    if (isform) {


        $.ajax({
            type: 'post',
            url: 'http://www.zhijunxing.com/yiju/landlordLogin.action',
            dataType: 'jsonp',
            data: $('form').serialize(),
            success: function (data) {

                if (data.resultCode == 0000) {
                    alert('通过')
                } else {
                    alert('失败')
                }
            }
        })
    }

})

*/



/*
function isinput(put,_this) {
    if (put) {
        $(_this).parent().css({
            'border-color': 'rgb(112, 173, 70)'
        });
        off[_this.className] = true
    } else {

        $(_this).parent().css({
            'border-color': '#981616'
        });
        off[_this.className] = false;
    }

}*/
