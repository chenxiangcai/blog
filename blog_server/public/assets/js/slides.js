$('#pic').on('change',function () {
    const file = this.files[0];
    const formData = new FormData();
    formData.append('image',file);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        contentType:false,
        processData:false,
        success:function (response) {
            $('#hiddenPic').val(response[0].image);
            $('#see').show().attr('src',response[0].image)
        }
    })
})
$('#slideFrom').on('submit',function () {
    const slide = $(this).serialize();
    $.ajax({
        type:'post',
        url:'/slides',
        data: slide,
        success:function (response) {
            location.reload();
        },
        error:function (response) {
            alert(JSON.parse(response.responseText).message);
        }
    })
    return false;
})
$.ajax({
    type:'get',
    url:'/slides',
    success:function (response) {
        $('#slideBox').html(template('slideTpl',{data:response}));
    }
})
$('#slideBox').on('click','.del',function () {
    const id = $(this).attr('data-id');
    $.ajax({
        type:'delete',
        url:'/slides/'+id,
        success:function () {
            location.reload();
        }
    })
})