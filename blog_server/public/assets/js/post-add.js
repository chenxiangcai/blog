$.ajax({
    type:'get',
    url:'/categories',
    success:function (response) {
        $('#category').html(template('postAddTpl',{data:response}))
    }
})

//封面
$('#parentBox').on('change','#feature',function () {
    const file = this.files[0];
    const formData = new FormData();
    formData.append('cover',file);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,//不让ajax内部处理为参数名称＝字符串的形式
        contentType:false,//已经设置formData为二进制上传方式
        success:function (response) {
            $('.cover').show().attr('src',response[0].cover);
            $('#hiddenCover').val(response[0].cover);
        }
    })
})

//新增
$('#postAddForm').on('submit',function () {
    const post = $(this).serialize();
    $.ajax({
        type:'post',
        url:'/posts',
        data:post,
        success:function (response) {
            location.href = '/admin/posts.html'
        },
        error:function (response) {
            alert(JSON.parse(response.responseText).message)
        }
    })
    return false;
})

//地址栏获取查询参数
function getUrlParams(name) {
   const array = location.search.substr(1).split('&');
    for (const ele of array) {
        let newArray = ele.split('=');
        if(newArray[0] == name) return newArray[1];
    }
    return -1
}

//日期
function formateDate(date) {
    date = new Date(date); //日期字符串转换为日期对象
    function check(i) {
        if(i<10) i = '0' + i;
        return i ;
    }
    return date.getFullYear() + '-' + check((date.getMonth() +1 )) + '-' + check(date.getDate()) + 'T' + check(date.getHours()) +':' + check(date.getMinutes())+':'+check(date.getSeconds());
}


//判断：文章修改
const modifyId = getUrlParams('id');
if(modifyId != -1){
    $.ajax({
        type:'get',
        url:'/posts/' + modifyId,
        success:function (response) {
            $.ajax({    //再次获取分类信息
                type:'get',
                url:'/categories',
                success:function (categories) {
                    response.categories = categories;
                    $('#parentBox').html(template('modifyTpl',response))
                }
            })
        }
    })
}
//修改提交
$('#parentBox').on('submit','#modifyForm',function () {
    const formData = $(this).serialize();
    const  id = $(this).attr('data-id');
    $.ajax({
        type:'put',
        url:'/posts/'+id,
        data: formData,
        success:function (response) {
            location.href = '/admin/posts.html'
        }
    })
    return false;
})

