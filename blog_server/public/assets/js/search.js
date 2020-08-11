var key = getUrlParams('key');
$.ajax({
    type:'get',
    url:'/posts/search/'+ key,
    success:function (response) {
        $('#listBox').html(template('searchTpl',{data:response}))
    }
})