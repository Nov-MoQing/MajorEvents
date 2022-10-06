const layer = layui.layer
$(function () {
  gitUser()

})
const gitUser = () => {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success(res) {
      console.log(res)
      if (res.code !== 0) layer.msg(res.message)
      gitAvatar(res.data)
    }
  })
}

const gitAvatar = (data) => {
  const uuname = data.nickname || data.username

  if (data.user_pic) {
    $('.avatar').hide()
    $('.layui-nav-img').css('src',data.user_pic).show()
  } else {
    $('.layui-nav-img').hide()
    const char = data.username.charAt(0).toUpperCase()
    $('.avatar').html(char).show()
  }
  $('.welcome').html(`欢迎&nbsp;&nbsp;${uuname}`)
}

$('.butLogOut').on('click',function(){
  layer.confirm('确认退出吗?', {icon: 3, title:'提示'}, function(index){
    //do something
    localStorage.removeItem('token')
    location.href = '/login.html'
    layer.close(index);
  })
})


