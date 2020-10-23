$(function () {
    // 去注册
    $('#link_reg').on('click', function () {
        // 隐藏登录框
        $('.login-box').hide();
        // 显示注册框
        $('.reg-box').show();
    });
    $('#link_login').on('click', function () {
        // 隐藏注册框
        $('.reg-box').hide();
        // 显示登录框
        $('.login-box').show();
    });

    // 自定义校验规则
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则 return 一个提示消息即可
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致！';
            }
        }
    });
});