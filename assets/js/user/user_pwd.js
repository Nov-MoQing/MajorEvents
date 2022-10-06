$(function(){
  const form = layui.form
  const layer = layui.layer

  form.verify({
    pass: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    fresh:(value)=>{
      if(value === $('[name="old_pwd"]').val()) {
        return '不能与原密码一致！'
      }
    },
    repwd:(value)=>{
      if(value !== $('[name="new_pwd"]').val()) {
        return '两次输入的密码不一致！'
      }
    }
  })

  $('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      method:'PATCH',
      url:'/my/updatepwd',
      data:$(this).serialize(),
      success(res){
        if(res.code !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        btnReset.click()
      }
    })
  })
})