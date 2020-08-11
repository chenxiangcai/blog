$('#logo').on('change',function () {
    const file = this.files[0];
    const formData = new FormData();
    formData.append('logo',file);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        contentType:false,
        processData:false,
        success:function (response) {
            $('#logoPre').attr('src',response[0].logo);
            $('#hiddenLogo').val(response[0].logo)
        }
    })
})

$('#logoForm').on('submit',function () {
    const logo = $(this).serialize();
    $.ajax({
        type:'post',
        url:'/settings',
        data:logo,
        success:function (response) {
            console.log(response)
            location.reload();
        },
        error:function (response) {
            alert(JSON.parse(response.responseText).message)
        }
    })
    return false;
})
$.ajax({
    type:'get',
    url:'/settings',
    success:function (response) {
        $('#logoPre').attr('src',response[0].logo);
        $('#hiddenLogo').val(response[0].logo);
        $('#title').val(response[0].title);
        $('input[name="comment"]').prop('checked',response[0].comment);
        $('input[name="review"]').prop('checked',response[0].review);
    }
})