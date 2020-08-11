$.ajax({
    type:'get',
    url:'/posts',
    success:function (response) {
        $('#postListBox').html(template('postBoxTpl', response));
        $('#pagination').html(template('pageTpl', response));
    }
})

//日期
function formateDate(date) {
    date = new Date(date); //日期字符串转换为日期对象
    function check(i) {
        if(i<10) i = '0' + i;
        return i ;
    }
    return date.getFullYear() + '-' + check((date.getMonth() +1 )) + '-' + check(date.getDate()) + ' ' + check(date.getHours()) +':' + check(date.getMinutes())+':'+check(date.getSeconds());
}
//分页
function changePage(page) {
    $.ajax({
        type:'get',
        url:'/posts',
        data:{ page:page },
        success:function (response) {
            $('#postListBox').html(template('postBoxTpl', response));
            $('#pagination').html(template('pageTpl', response));
        }
    })
}

//分类渲染
$.ajax({
    type:'get',
    url:'/categories',
    success:function (response) {
        $('#category').html(template('categoryTpl', {data:response}));
    }
})

//筛选
$('#filterForm').on('submit',function () {
    const formData = $(this).serialize();
    $.ajax({
        type:'get',
        url:'/posts',
        data:formData,
        success:function (response) {
            $('#postListBox').html(template('postBoxTpl', response));
            $('#pagination').html(template('pageTpl', response));
        }
    })
    return false;
})

//删除
$('#postListBox').on('click','#del',function () {
    if(confirm('确定删除此文章？')){
        const id = $(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:'/posts/'+id,
            success:function () {
                location.reload();
            }
        })
    }
})
//多选删除
$('#deleteMany').on('click',function () {
    if(confirm('您确认要删除所选用户吗？')){
        let delIds = [];
        let checkUsers = $('#postListBox').find('input').filter(':checked');
        checkUsers.each(function (index,value) {
            delIds.push($(value).attr('data-id'));
        })
        $.ajax({
            type:'delete',
            url:'/posts/'+ delIds.join('-'),
            success:function () {
                location.reload();
            }
        })
    }
})

//全选复选
$('#checkboxAll').on('change',function () {
    $('#postListBox').find('input').prop('checked',$(this).prop('checked'));
    if($(this).prop('checked')) $('#deleteMany').show();
    else $('#deleteMany').hide();
})
$('#postListBox').on('change','.postStatus',function () {
    const inputs = $('#postListBox').find('input');
    if(inputs.length === inputs.filter(':checked').length) $('#checkboxAll').prop('checked',true);
    else $('#checkboxAll').prop('checked',false);
    if(inputs.filter(':checked').length > 0 ) $('#deleteMany').show();
    else $('#deleteMany').hide();
})