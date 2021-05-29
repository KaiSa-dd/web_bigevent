$(function () {
    // 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
    // 会先调用 ajaxPrefilter 这个函数
    // 在这个函数中，可以拿到我们给Ajax提供的配置对象
    $.ajaxPrefilter(function (option) {
        option.url = 'http://api-breakingnews-web.itheima.net' + option.url;
        console.log(option.url);

        // 统一为权限设置请求头
        if (option.url.indexOf('/my/') !== -1) {
            option.headers = { Authorization: localStorage.getItem('token') || '' }
        }

        // 全局统一配置 complete 函数
        option.complete = function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 清除本地的token
                localStorage.removeItem('token');
                // 跳转至登录界面
                location.href = 'login.html'
            }
        }
    })


})