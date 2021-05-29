$(function () {
    // 调用获取用户信息函数
    getUserInfo()
    // 点击按钮实现退出功能
    $('#btnlogout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1.清除本地存储
            localStorage.removeItem('token')
            // 2.实现本地跳转
            location.href = 'login.html'
            layer.close(index);
        });
    })
})
var layer = layui.layer
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            // 渲染用户头像
            renderAvatar(res.data)
        },


        // 无论请求失败还是成功都会调用complete函数
        // complete: function (res) {
        //     // console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 清除本地的token
        //         localStorage.removeItem('token');
        //         // 跳转至登录界面
        //         location.href = 'login.html'
        //     }
        // }
    })
}

//  渲染用户头像
function renderAvatar(use) {
    // 1.获取用户昵称
    var name = use.nickname || use.username;
    // 2.设置欢迎文本
    $('.weclome').html('欢迎' + name)
    // 3.渲染用户头像
    if (use.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img').attr('src', use.user_pic).show();
        $('.text-avater').hide();
    } else {
        // 3.2 渲染文头像
        var first = name[0].toUpperCase();
        $('.layui-nav-img').hide();
        $('.text-avater').html(first).show()
    }
}