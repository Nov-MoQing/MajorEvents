$(function(){
  const form = layui.form
  const layer = layui.layer
  infoList()
  // 获取文章分类列表
  function infoList() {
    $.ajax({
      method:'GET',
      url:'/my/cate/list',
      success(res){
        if(res.code !== 0) return layer.msg('获取文章分类列表失败！')
        const htmlStr = template('tpl-cate',res)
        $('tbody').empty().html(htmlStr)
      }
    })
  }

  // 弹出层
  let index = null
  $('.btnCate').on('click',function(){
    index = layer.open({
      type:1,
      area: ['500px', '250px'],
      title: '添加分类',
      content: $('#addCate').html()
    })
  })

  let isEdie = false
  // 新增文章分类 与 修改分类信息
  $('body').on('submit','#addForm',function(e){
    e.preventDefault()
    if(isEdie) {
      $.ajax({
        method:'PUT',
        url:'/my/cate/info',
        data:$(this).serialize(),
        success(res){
          if(res.code !== 0) return layer.msg('更新分类信息失败！')
          layer.msg('更新分类信息成功！')
          infoList()
        }
      })
    } else {
      $.ajax({
      method:'POST',
      url:'/my/cate/add',
      data:$(this).serialize(),
      success(res){
        if(res.code !== 0) return layer.msg('新增文章分类失败！')
        layer.msg('新增文章分类成功！')
        
        infoList()
      }
    })
    }
    isEdie = false
    layer.close(index)
  })
  // 点击编辑弹框与填充内容
  $('tbody').on('click','.btnEdit',function(){
    isEdie = true

    index = layer.open({
      type:1,
      area: ['500px', '250px'],
      title: '修改分类',
      content: $('#addCate').html()
    })

    $('#btnccc').text('修改分类')

    const id = $(this).attr('data-id')
    $.ajax({
      method:'GET',
      url:`/my/cate/info?id=${id}`,
      success(res){
        if(res.code !== 0) return layer.msg('获取文章分类失败！')

        form.val('addForm',res.data)
      }
    })
  })


  // 删除功能
  $('tbody').on('click','.btnDelete',function(){
    const id = $(this).attr('data-id')
    layer.confirm('您确认要删除吗?', {icon: 3, title:'提示'}, function(index){
      //do something
      $.ajax({
        method:'DELETE',
        url:`/my/cate/del?id=${id}`,
        success(res){
          if(res.code !== 0) return layer.msg('删除文章分类失败！')
          layer.msg('删除文章分类成功！')
          infoList()
        }
      })
    })
      layer.close(index);
    })
    
})