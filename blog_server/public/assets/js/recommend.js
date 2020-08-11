$.ajax({
    type:'get',
    url:'/posts/recommend',
    success:function (response) {
        //通过render渲染公共部分
        const recommendTpl = `
        {{each data}}
        {{if $value.cover==''}}
        <li>
            <a href="detail.html?id={{$value._id}}">
              <img src="./assets/img/default.png" alt="此文章暂时无封面">
              <span>{{$value.title}}</span>
            </a>
        </li>
        {{else}}
        <li>
            <a href="detail.html?id={{$value._id}}">
              <img src="{{$value.cover}}" alt="">
              <span>{{$value.title}}</span>
            </a>
        </li>
        {{/if}}
        
        {{/each}}
        `
        $('#recommendBox').html(template.render(recommendTpl,{data:response}))
    }
})