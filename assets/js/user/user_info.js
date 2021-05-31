$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度必须是1~6个字符"
            }
        }
    })
    var layer = layui.layer;
    var form = layui.form;
    // 初始化用户基本信息
    initUserInfo();
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置表单数据
    $('#btnReset').on('click', function (e) {
        // 阻止默认行为
        e.preventDefault()
        // 调用初始化函数
        initUserInfo()
    })

    // 更新用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败')
                }
                layer.msg('修改用户信息失败')
                // 调用父页面中的方法，重新渲染头像和用户信息
                window.parent.getUserInfo()
            }
        })
    })


})

