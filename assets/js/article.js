//查    获取数据并渲染
function getCate() {
    $.ajax({
    url: '/my/article/cates',
    success: function (res) {
        console.log(res);
        $('tbody').html(template('table-temp',res))
    }
})
}
getCate()
let index
//增    添加分类数据
$('.add-btn').click(function () {
    index=layer.open({
        type:1,
        title: '添加分类',
        content: $('#add-form').html(),
        area:['500px','250px']
    })
})
//绑定提交-事件委托
$('body').on('submit', '.add-form', function (e) {
    e.preventDefault()
    $.ajax({
        url: '/my/article/addcates',
        method: 'POST',
        data: $(this).serialize(),
        success: function (res) {
            console.log(res);
            if (res.status === 0) {
                layer.close(index)
                getCate()
            }
            layer.msg(res.message)
        }
    })
        
})

//删    删除分类数据
$('tbody').on('click', '.remove', function () {
    layer.confirm('是否删除该分类？', { icon: 3, title: '提示' }, (index)=> {
        //点击确定是执行
        //请求删除
        $.ajax({
            url: '/my/article/deletecate/'+$(this).attr('data-id'),
            success: function (res) {
                if (res.status === 0) {
                    //渲染表格
                    getCate()
                }
                layer.msg(res.message)
            }    
        })
        layer.close(index)
    })
})
$('tbody').on('click', '.edit', function () {
    console.log(1);
    index=layer.open({
        type:1,
        title: '修改分类',
        content: $('#edit-form').html(),
        area:['500px','250px']
    })
    $.ajax({
        url: '/my/article/cates/' + $(this).attr('data-id'),
        success: function (res) {
            console.log(res);
            layui.form.val('edit-form',res.data)
        }
    })
})
//改    修改分类数据
$('body').on('submit', '.edit-form', function (e) {
    e.preventDefault()
     $.ajax({
        url: '/my/article/updatecate',
        method: 'POST',
        data: $(this).serialize(),
        success: function (res) {
            console.log(res);
            if (res.status === 0) {
                layer.close(index)
                getCate()
            }
            layer.msg(res.message)
        }
    })
})