$('#logOut').on('click',function () {
    if (confirm('您确认退出吗？')){
        $.ajax({
            type:'post',
            url:'/logout',
            success:function () {
                location.href = 'login.html';
            },
            error:function () {
                alert('退出失败');
            }
        })
    }
})

function formateDate(date) {
    date = new Date(date); //日期字符串转换为日期对象
    function check(i) {
        if(i<10) i = '0' + i;
        return i ;
    }
    return date.getFullYear() + '-' + check((date.getMonth() +1 )) + '-' + check(date.getDate()) + ' ' + check(date.getHours()) +':' + check(date.getMinutes())+':'+check(date.getSeconds());
}

//左侧用户信息
$.ajax({
    type:'get',
    url:'/users/' + userId,
    success:function (response) {
        if(response.avatar == null) $('#avatar').attr('src','../uploads/avatar_2.jpg');
        $('.avatar').attr('src',response.avatar);
        $('.profile .name').html(response.nickName);
    }
})