const postId = getUrlParams('id');
var review;
//文章详情
$.ajax({
    type:'get',
    url:'/posts/'+  postId,
    success:function (response) {
        $('#detailBox').html(template('detailTpl',response));
    }
})

// 获取网站的配置信息
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (response) {
        review = response[0].review;
        if (response[0].comment) {
            //如果管理员开启了评论功能 渲染评论模板
            $('#comment').html(template('commentTpl'));
        }
    }
})

//评论
$('#comment').on('submit','form',function () {
    const content = $(this).find('textarea').val();
    let state ; //状态
    if(review) state=0;
    else state=1;
    $.ajax({
        type:'post',
        url:'/comments',
        data:{
          content:content,
          state:state,
          post:postId
        },
        success:function () {
            alert('评论提交成功');
            location.reload();
        },error:function (response) {
            alert(JSON.parse(response.responseText).message);
        }
    })
    return false;
})
