$.ajax({
    type:'get',
    url:'/comments',
    success:function (response) {
        $('#commentBox').html(template('commentTpl',response));
        $('#pageBox').html(template('pageTpl',response))
    }
})

//分页
function changePage(page) {
    $.ajax({
        type:'get',
        url:'/comments',
        data:{ page:page },
        success:function (response) {
            $('#commentBox').html(template('commentTpl',response));
            $('#pageBox').html(template('pageTpl',response))
        }
    })
}

//批准
$('#commentBox').on('click','#allow',function () {
    const id = $(this).attr('data-id');
    const state = $(this).attr('data-status');
    $.ajax({
        type:'put',
        url:'/comments/'+id,
        data:{
            state:state == 0? '1':'0'
        },
        success:function () {
            location.reload();
        }
    })
})

//删除
    //单除
    $('#commentBox').on('click','#del',function () {
        if(confirm('确定删除此评论？')){
            const id = $(this).attr('data-id');
            $.ajax({
                type:'delete',
                url:'/comments/'+id,
                success:function () {
                    location.reload();
                }
            })
        }
    })

    //多删
    $('#deleteMany').on('click',function () {
        if(confirm('确定删除所选评论？')){
            let ids = [];
            let checkComment = $('#commentBox').find('input').filter(':checked');
            checkComment.each(function (index,value) {
                ids.push($(value).attr('data-id'));
            })
            $.ajax({
                type:'delete',
                url:'/comments/' + ids.join('-'),
                success:function (response) {
                    location.reload();
                }
            })
        }
    })

//筛选
$('#filterForm').on('submit',function () {
    let state = $(this).serialize();
    $.ajax({
        type:'get',
        url:'/comments',
        data: state,
        success:function (response) {
            $('#commentBox').html(template('commentTpl',response));
            $('#pageBox').html(template('pageTpl',response))
        }
    })
    return false;
})

//全选反选
$('#checkboxAll').on('change',function () {
    let status = $(this).prop('checked');
    $('#commentBox').find('input').prop('checked',status);
    if(status) $('#deleteMany').show();
    else $('#deleteMany').hide();
})
$('#commentBox').on('change','.commentStatus',function () {
    const inputs = $('#commentBox').find('input');
    if(inputs.filter(':checked').length > 0 ) $('#deleteMany').show();
    else $('#deleteMany').hide();
    if(inputs.filter(':checked').length == inputs.length) $('#checkboxAll').prop('checked',true);
    else $('#checkboxAll').prop('checked',false);
})