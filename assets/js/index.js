//退出登录
//绑定事件
$('.logout').click(function () {
    //询问用户
    layer.confirm('是否退出页面', { icon: '3', title:'提示'}, function (index) {
    //清空token
    localStorage.removeItem('token')
    //回到登陆页面
        location.href = '/login.html'
        //关闭
        layer.close(index)
    })
})
//获取用户信息并渲染
$.ajax({
    url: '/my/userinfo',
    // headers: {
    //     Authorization:localStorage.getItem('token')
    // },
    success: function (res) {
        console.log(res);
        if(!res.data) return
        //渲染头像
        if (res.data.user_pic === null) {
            //显示文字头像
            $('.text-avatar').html((res.data.nickname || res.data.username).charAt(0).toUpperCase())
            //图片文字隐藏
            $('.img-avater').hide()
        } else {
            //显示图片头像
            $('.img-avater').attr('src', res.data.user_pic)
            //隐藏文字头像
            $('.text-avatar').hide()
        }
        //渲染欢迎头像
        $('.wel-text span').html(res.data.nickname || res.data.username)
    }
})