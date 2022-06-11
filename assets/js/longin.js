$('.link a').click(function () {
    $('.reg-box').toggle()
    $('.login-box').toggle()
})
//表单验证
layui.form.verify({
    usernameAndPassword: [/^[\S]{6,12}$/, '请输入6-12为字符'],
    //再次输入密码验证
    repwd: function (value) {
        if (value !== $('.reg-box .pwd').val()){
            return '请保持两次密码相同'
        }
    }
})
//注冊事件
$('.reg-box form').submit(function (e) {
    e.preventDefault()
    $.ajax({
        url: '/api/reguser',
        method: 'POST',
        data: $(this).serialize(),
        success: (res) =>{
            console.log(res);
            if (res.status === 0) {
                this.reset()
                $('.reg-box a').click()
            }
            layer.msg(res.message)
        }
    })
})
$('.login-box form').submit(function (e) {
    e.preventDefault()
    $.ajax({
        url: '/api/login',
        method: 'POST',
        data: $(this).serialize(),
        success: (res) => {
            console.log(res);
            if (res.status === 0) {
                localStorage.setItem('token',res.token)
                location.href='/index.html'
            }
            layer.msg(res.message)
        }
    })
})