const categoryId = getUrlParams('categoryId');
//分类列表
$.ajax({
    type:'get',
    url:'/posts/category/' + categoryId,
    success:function (response) {
        $('#listBox').html(template('listTpl',{data:response}));
    }
})

//分类标题
$.ajax({
    type:'get',
    url:'/categories/'+categoryId,
    success:function (response) {
        $('#categoryTitle').html(response.title);
    }
})