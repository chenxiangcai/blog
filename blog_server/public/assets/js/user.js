//用户添加
$('#userForm').on('submit',function () {
    const user = $(this).serialize();
    console.log(user)
    $.ajax({
        type:'post',
        url:'/users',
        data: user ,
        success:function (response) {
            location.href = 'users.html'
        },
        error:function (response) {
            alert(JSON.parse(response.responseText).message);
        }
    })
    return false;
})

//头像上传
$('#modifyBox').on('change','#avatar',function () {
    let formData = new FormData();
    console.log(formData)
    formData.append('avatar',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success:function (response) {
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        }
    })
})

//用户修改
$('#userBox').on('click','#edit',function () {
    const id = $(this).attr('data-id');
    $.ajax({
        type:'get',
        url:'/users/'+id,
        success:function (response) {
            $('#modifyBox').html(template('modifyTpl',response));
        }
    })
})
$('#modifyBox').on('submit','#modifyForm',function () {
    const id = $(this).attr('data-id');
    const user = $(this).serialize();
    $.ajax({
        type:'put',
        url:'/users/'+id,
        data:user,
        success:function (response) {
            location.reload();
        },
        error:function (response) {
            alert(JSON.parse(response.responseText).message);
        }
    })
    return false;
})

//用户删除
$('#userBox').on('click','#del',function () {
    if(confirm('您确定要删除用户吗？')){
        const id = $(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:'/users/'+id,
            success:function (response) {
                location.reload();
            }
        })
    }
})
//多选删除
$('#deleteMany').on('click',function () {
   if(confirm('您确认要删除所选用户吗？')){
       let delIds = [];
       let checkUsers = $('#userBox').find('input').filter(':checked');
       checkUsers.each(function (index,value) {
           delIds.push($(value).attr('data-id'));
       })
       $.ajax({
           type:'delete',
           url:'/users/'+ delIds.join('-'),
           success:function () {
               location.reload();
           }
       })
   }
})

//页面数据渲染
$.ajax({
    type:'get',
    url:'/users',
    success:function (response) {
        $('#userBox').html(template('userTpl',{ data:response }));
    }
})

//全选复选
$('#checkboxAll').on('change',function () {
    $('#userBox').find('input').prop('checked',$(this).prop('checked'));
    if($(this).prop('checked')) $('#deleteMany').show();
    else $('#deleteMany').hide();
})
$('#userBox').on('change','.userStatus',function () {   //通过js获取的数据 用事件委托处理
    const inputs = $('#userBox').find('input');
    if(inputs.length === inputs.filter(':checked').length) $('#checkboxAll').prop('checked',true);
    else $('#checkboxAll').prop('checked',false);
    if(inputs.filter(':checked').length > 0 ) $('#deleteMany').show();
    else $('#deleteMany').hide();
})


