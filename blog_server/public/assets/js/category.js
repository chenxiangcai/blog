//增加分类
$('#categoryForm').on('submit',function () {
    const category = $(this).serialize();
    $.ajax({
        type:'post',
        url:'/categories',
        data: category ,
        success:function (response) {
            location.reload();
        },
        error:function (response) {
            alert(JSON.parse(response.responseText).message)
        }
    })
    return false;
})

//渲染
$.ajax({
    type: 'get',
    url:'/categories',
    success:function (response) {
        $('#categoryBox').html(template('categoryTpl',{data:response}));
    }
})

//编辑
$('#categoryBox').on('click','#edit',function () {
    const id = $(this).attr('data-id');
    $.ajax({
        type:'get',
        url:'/categories/'+ id,
        success:function (response) {
            $('#modifyCategory').html(template('modifyCategoryTpl',response))
        }
    })
})
$('#modifyCategory').on('submit','#modifyCategoryForm',function () {
    const category = $(this).serialize();
    const id = $(this).attr('data-id');
    $.ajax({
        type:'put',
        url:'/categories/'+id,
        data:category,
        success:function () {
            location.reload();
        }
    })
    return false;
})

//删除
    //全选单选
$('#checkAll').on('change',function () {
    const status = $(this).prop('checked')
    if(status) $('#deleteMany').show();
    else $('#deleteMany').hide();
    $('#categoryBox').find('input').prop('checked',status);
})
$('#categoryBox').on('change','.userStatus',function () {
    const inputs = $('#categoryBox').find('input');
    if(inputs.filter(':checked').length>0) $('#deleteMany').show();
    else $('#deleteMany').hide();
    if(inputs.length == inputs.filter(':checked').length) $('#checkAll').prop('checked',true);
    else $('#checkAll').prop('checked',false);
})
    //单选删除
    $('#categoryBox').on('click','#del',function () {
        const id = $(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:'/categories/'+id,
            data:id,
            success:function () {
                location.reload();
            }
        })
    })
    //批量删除
    $('#deleteMany').on('click',function () {
        if(confirm('您确定要删除选中分类吗？')){
            let id = [];
            let delIds = $('#categoryBox').find('input').filter(':checked');
            delIds.each((index,value)=>{
                id.push($(value).attr('data-id'));
            });
            $.ajax({
                type:'delete',
                url:'/categories/'+id.join('-'),
                success:function () {
                    location.reload();
                }
            })
        }
    })