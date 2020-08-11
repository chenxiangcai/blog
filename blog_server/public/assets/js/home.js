//轮播图
$.ajax({
    type:'get',
    url:'/slides',
    success:function (response) {
        $('#slideBox').html(template('slideTpl',{ data:response }));
        var spanNumber = '';
        response.forEach(function (value,index) {
            if(index ==0) spanNumber += '<span class="active"></span>';
            else spanNumber += '<span></span>';
        })
        $('#spanNumber ').html(spanNumber);
        //
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
                // index++;
                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });
        // 上/下一张
        $('.swipe .arrow').on('click', function () {
            var _this = $(this);
            if(_this.is('.prev')) {
                swiper.prev();
            } else if(_this.is('.next')) {
                swiper.next();
            }
        })
    }
})

//最新发布
$.ajax({
    type:'get',
    url:'/posts/newest',
    success:function (response) {
        $('#newestBox').html(template('newestTpl',{data:response}));
    }
})