//获取分类数据并渲染
$.ajax({
    //获取url地址
    url: '/my/article/cates',
    success: function (res) {
        console.log(res);
        $('select[name=cate_id]').html(template('cate-select', res))
        //重新渲染select
        layui.form.render()
    }
})
initEditor()
//1。获取裁剪图片元素
const $img = $('.left img')
//2.生成裁剪区域
const options=({
    //图片宽高比
    aspectRatio: 400 / 280,
    //预览元素的选择器
    preview:'.preview'
})
$img.cropper(options)
//选择图片
$('.choose').click(function () {
    $('input[type=file]').click()
})

//绑定用户是否选择了文件
$('input[type=file]').on('change', function () {
    //判断用户是否选择了文件
    if (this.files.length === 0) return 
    // 获取文件对象
    const file = this.files[0]
    //根据对象生成路径
    const path=URL.createObjectURL(file)
    //替换裁剪区的图片
    $img
    //1.销毁原有的裁剪区域
        .cropper('destroy')
    //2.更换img的src
        .attr('src', path)
    //3.重新生成裁剪区域
        .cropper(options)
})
let state;
$('.pub-btn').click(function () {
    state='已发布'
})
$('.save-btn').click(function () {
    state='草稿'
})
$('form').submit(function (e) {
    e.preventDefault()
    //准备formdatra参数对象
    const fd = new FormData(this)
    fd.append('content', tinymce.editors[0].getContent())
    fd.append('state',state)
    //查看
    // fd.forEach((v, k) => {
    //     console.log(k+':'+v);
    // })

    //裁剪后生成二进制对象
    $img
    //生成canvas对象
    .cropper('getCroppedCanvas', {
        width: 400,
        height:280
    })
        //转成二进制对象
        .toBlob(function (blob) {
            fd.append('cover_img', blob)
            $.ajax({
                url:'/my/article/add',
                method: 'POST',
                data: fd,
                //请求头-指定参数格式 key=value&key=value,{"name=zs"}
                contentType: false,
                //转换参数格式
                processData: false,
                success: function (res) {
                    if (res.status === 0) {
                        location.href='/article/article_list.html'
                    }
                }
            })
    })
})