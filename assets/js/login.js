//  入口函数
$(function () {
    // 点击去注册账号
    $('.link-login').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 点击去登录按钮
    $('.link-reg').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show();
    });

    // 从layui中获取form
    var form = layui.form;
    // var layer = layui.layer
    // 通过form.verify() 自定义效验规则
    form.verify({
        // 自定义密码验证规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 效验两次密码是否一致
        reqwd: function (value) {
            // 通过形参拿到的是确认框中的内容
            // 在拿到密码框中的内容进行一次判断
            // 如果失败则返回一个信息
            var val = $('#pwd').val();
            // console.log(val);
            if (val !== value) {
                return '两次输入密码不一致'
            }
        }
    })
    // 注册监听事件
    $('#form-reg').on('submit', function (e) {
        console.log($('#pwd').val());
        // 阻止默认提交事件
        e.preventDefault();
        var data = {
            username: $('#username').val(),
            password: $('#pwd').val()
        }
        // 发起post请求
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                // console.log(res);
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            $('.link-reg').click();
        })



        // // 发起post请求
        // $.post('http://api-breakingnews-web.itheima.net/api/reguser', { username: $('.layui-form [name=username]').val(), password: $('.layui-form [name=password]').val() }, function (res) {
        //     if (res.status !== 0) {
        //         // console.log(res);
        //         return layer.msg(res.message);
        //     }
        //     layer.msg('注册成功');
        //     $('.link-reg').click();
        // })
    })
    // 登录界面的点击事件
    $('#form-login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 获取表单的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功！')
                // 跳转后台主页
                localStorage.setItem('token', res.token)
                location.href = 'index.html'
            }
        })
    })

})