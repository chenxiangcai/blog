$.ajax({
    type:'get',
    url:'/posts/count',
    success:function (response) {
        $('#postCount').html('<strong>'+response.postCount+'</strong>篇文章（<strong>'+response.draftCount+'</strong>篇草稿）');
    }
})

$.ajax({
    type:'get',
    url:'/categories/count',
    success:function (response) {
        $('#categoryCount').html('<strong>'+response.categoryCount+'</strong>个分类');
    }
})

$.ajax({
    type:'get',
    url:'/comments/count',
    success:function (response) {
        $('#commentCount').html('<strong>'+response.commentCount+'</strong>条评论（<strong>'+response.toAllowCount+'</strong>条待审核）');
    }
})