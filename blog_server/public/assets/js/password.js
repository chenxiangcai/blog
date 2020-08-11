$('#updatePassword').on('submit',function () {
    if($('#password').val() != $('#confirm').val()) {
         alert('两次输入密码不一致');
         return false;
    }else {
        const formData = $(this).serialize();
        $.ajax({
            type:'put',
            url:'/users/password',
            data:formData,
            success:function () {
                location.href = '/admin/login.html'
            },
            error:function (response) {
                alert(JSON.parse(response.responseText).message)
            }
        })
        return false;
    }
})
