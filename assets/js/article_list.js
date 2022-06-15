//获取并获得文章列表
const params = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state:''
}

//分页器函数
function page(count) {
    layui.laypage.render({
        elem: 'page-box',
        //服务器数据总条数
        count: count,
        //设置每页显示条数
        limit: params.pagesize,
        limits: [2, 4, 10, 20],
        //当前在看第几页
        curr: params.pagenum,
        //分页器排版
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        jump: function (obj,first) {
            if (!first) {
                //操作分页器时执行
                params.pagenum = obj.curr
                params.pagesize = obj.limit
                getList()
           }
        }
    })
}
//因为会多次调用接口获取文章列表所有需要封装一个函数
//方便以后多次调用
function getList() {
    $.ajax({
        url: '/my/article/list',
        //因为外部筛选不同，所展示不同，所以不能写成固定数据
        data: params, //需要声明一个常量在外部发生变化
        success: function (res) {
            console.log(res);
            page(res.total)
            $('tbody').html(template('table-temp',res)) 
        }
    })
}
getList()

function addZero(n) {
    return n<10? '0'+n:n
}
//过滤器
template.defaults.imports.dataForm = function (value) {
    const date=new Date(value)
    const n=date.getFullYear()
    const y=date.getMonth()+1
    const r=date.getDate()
    const s=date.getHours()
    const f=date.getMinutes()
    const m = date.getSeconds()
    return ` ${n}-${addZero(y)}-${addZero(r)} ${addZero(s)}:${addZero(f)}:${addZero(m)}`
}

//删除
$('tbody').on('click', '.remove', function () {
    $.ajax({
        url: '/my/article/delete/' + $(this).attr('data-id'),
        success: function (res) {
            console.log(res);
            if (res.status === 0) {
                getList()
            }
            layer.msg(res.message)
        }
    })
})

//获取文章分类
$.ajax({
    url: '/my/article/cates',
    success: function (res) {
        console.log(res);
        $('select[name=cate_id]').html(template('select-temp', res))
        layui.form.render()
    }    
})

//筛选
$('.select-form').submit(function (e) {
    e.preventDefault()
    //修改请求参数对象
    params.cate_id = $('select[name=cate_id]').val()
    params.state = $('select[name=state]').val()
    getList()
})