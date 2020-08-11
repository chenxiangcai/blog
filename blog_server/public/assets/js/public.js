//随机推荐
$.ajax({
    type:'get',
    url:'/posts/random',
    success:function (response) {
        const randomTpl = `
            {{each data}}
            <li>
            <a href="detail.html?id={{$value._id}}">
              <p class="title">{{$value.title}}</p>
              <p class="reading">阅读({{$value.meta.views}})</p>
              <div class="pic">
              {{if $value.cover == ''}}
               <img src="./assets/img/default.png" alt="">
              {{else}}
                <img src="{{$value.cover}}" alt="">
              {{/if}}
              </div>
            </a>
          </li>
          {{/each}}
        `
        $('#randomBox').html(template.render(randomTpl,{data:response}))
    }
})

//最新评论
$.ajax({
    type:'get',
    url:'/comments/new',
    success:function (response) {
        const commentTpl = `
            {{each data}}
            <li>
            <a href="detail.html?id={{$value.post}}">
              <div class="avatar">
                {{if $value.author.avatar == ''}}
                <img src="./assets/img/default.png" alt="">
                {{else}}
                <img src="{{$value.author.avatar}}" alt="">
                {{/if}}
              </div>
              <div class="txt">
                <p>
                  <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}} 说:
                </p>
                <p>{{$value.content}}</p>
              </div>
            </a>
          </li>
          {{/each}}
        `
        $('#commentBox').html(template.render(commentTpl,{data:response}))
    }
})

//左侧导航
$.ajax({
    type:'get',
    url:'/categories',
    success:function (response) {
        const categoryTpl = `
           {{each data}}
           <li>
               <a href="list.html?categoryId={{$value._id}}">
               <i class="fa {{$value.className}}"></i>{{$value.title}}</a>
           </li>
           {{/each}}
        `
        $('.categoryBox').html(template.render(categoryTpl,{data:response}))
    }
})

//地址栏获取查询参数
function getUrlParams(name) {
    const array = location.search.substr(1).split('&');
    for (const ele of array) {
        let newArray = ele.split('=');
        if(newArray[0] == name) return newArray[1];
    }
    return -1
}

//点赞
$('body').on('click','.up',function () {
    const id = $(this).attr('data-id')
    $.ajax({
        type:'post',
        url:'/posts/like/' + id,
        success:function () {
            alert('点赞成功');
        }
    })
})

//搜索
$('.search form').on('submit',function () {
    const search = $(this).find('.keys').val();
    if(search.trim().length == 0) {
        alert('请输入搜素内容');
        return false;
    }
    location.href = 'search.html?key=' + search;
    return false;
})