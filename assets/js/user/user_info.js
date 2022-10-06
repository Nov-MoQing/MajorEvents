$(function(){
  const form = layui.form
  const layer = layui.layer

  form.verify({
    nickname:function(value){
      if(value.length > 6) {
        return '用户名的长度在1~6之间！'
      }
    }
  })
  // 获取用户信息
  initUserInfo()

  function initUserInfo() {
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      success(res){
        if(res.code !==0) return layer.msg('用户信息获取失败！')

        form.val('userForm',res.data)
      }
    })
  }
  // 重置表单数据
  $('#btnReset').on('cilck',function(e){
    e.preventDefault()
    initUserInfo()
  })

  // 给表单填提交事件
  $('.layui-form').on('submit',function(e){
    e.preventDefault()

    $.ajax({
      method:'PUT',
      url:'/my/userinfo',
      data:form.val('userForm'),
      success(res){
        if(res.code !== 0) return layer.msg('用户信息更新失败！')
        layer.msg('修改用户信息成功！')
        window.parent.gitUser()
      }
    })
  })
})