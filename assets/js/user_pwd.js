layui.form.verify({
    pwd: [/^[\S]{6,12}$/, '请输入6-12位非空字符'],
    repwd: function (value) {
        if (value !== $('.newpwd').val()) {
            return '两次密码不一致'
        }
    }
})
$('form').submit(function (e) {
    e.preventDefault()
    $.ajax({
        url:'/my/updatepwd',
        method: 'POST',
        data: $(this).serialize(),
        success: (res) => {
            if (res.status === 0) {
                this.reset()
            }
            layer.msg(res.message)
        }
        
    })
})