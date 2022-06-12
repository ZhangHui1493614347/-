//获取用户数据并填充到表单
function getInfo() {
    $.ajax({
    url: '/my/userinfo',
    success: function (res) {
        console.log(res);
        //如果成功
        if (res.status === 0) {
            //填充数据到表单
            //第一个参数：选择器，layui专用选择器
            //第二个参数：要回填的数据对象
            layui.form.val('info-form',res.data)
        }
    }
})
}
getInfo()
//提交修改
$('form').submit(function (e) {
    e.preventDefault()
    //发起强求
    $.ajax({
        url: '/my/userinfo',
        method: 'POST',
        data: $(this).serialize(),
        success: function (res) {
            console.log(res);
            if (res.status === 0) {
                // 刷新首页的欢迎文字
                window.parent.initInfo()
            }
            //提示用户
            layer.msg(res.message)
        }
    })
})
$('.reset').click(function () {
    getInfo()
})