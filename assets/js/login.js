$(function () {
  // 获取layui表单对象
  const form = layui.form
  const layer = layui.layer

  $('.goReg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('.goLogin').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })


  // 登录表单验证

  form.verify({
    pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      const pwd = $('.reg-box [name="password"]').val()
      if (pwd !== value) return '两次密码不一致！'
    }
  })


  // 实现注册功能
  $('#form-reg').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/reg',
      // 需要加参数为：contentType: 'application/json',
      // contentType: 'application/json',
      // 把传入的数据转为json字符串类型的
      data: $(this).serialize(),
      success({ code, message }) {
        if (code !== 0) return layer.msg(message)
        layer.msg(message)
        $('.goLogin').click()
      }
    })
  })

  // 实现登录功能
  $('#form-login').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      method:'POST',
      url:'/api/login',
      data:$(this).serialize(),
      success(res){
        if(res.code !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        localStorage.setItem('token',res.token)
        location.href = '/home.html'
      }
    })
  })
})


