//图片裁剪
//1.使用Jqurey 获取图片元素
const $img = $('.cropper-box img')
const options = {
    aspectRatio: 1,
    //预览的元素选择器
    preview:'.preview'
}
//调用插件
$img.cropper()
//选择图片
$('.choose').click(function () {
    $('input[type=file]').click()
})
//选择图片后，裁剪和预览
//change事件
$('input[type=file]').on('change', function (e) {
    //判断用户是否选择了文件
    if (this.files.length === 0) return
    //获取图片
    const file = this.files[0]
    //把对象转换成路径
    const path= URL.createObjectURL(file)
    //裁剪和预览
    $img
    //销毁原裁剪区域
        .cropper('destroy')
    //更换图片路径
        .attr('src',path)
    //创建裁剪区域
    .cropper(options)
    // console.log(file);
})
//上传
$('.upload').click(function () {
    //获取到裁剪图片的base64编码
    const base64 =
        $img.cropper('getCroppedCanvas', {
            width: 100,
            height:100
        })
    //2.将canvas转换成base64
            .toDataURL('img/png')
    //发送
    $.ajax({
        url: '/my/update/avatar',
        method: 'POST',
        data: {
            avatar:base64
        },
        success: function (res) {
            console.log(res);
            //刷新头像
            if (res.status === 0) {
                parent.initInfo()
            }
            layer.msg(res.message)
        }
    })
})