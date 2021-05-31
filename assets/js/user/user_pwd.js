$(function () {
    var layer = layui.layer
    var form = layui.form

    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入密码不一致'
            }
        }
    })

    // 重置密码事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            // data: {
            //     oldPwd: $('[name=oldPwd]').val(),
            //     newPwd: $('[name=newPwd]').val(),
            // },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('重置密码失败')
                }
                layer.msg('重置密码成功了')
                $('.layui-form')[0].reset()
            }

        })
    })

})