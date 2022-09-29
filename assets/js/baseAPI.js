
$.ajaxPrefilter(function (config) {
  // 把数据转为json字符串
  function format2Json(sourec) {
    let target = {}
    sourec.split('&').forEach(el => {
      let k = el.split('=')
      target[k[0]] = k[1]
    })
    return JSON.stringify(target)
  }
  // 定义根路径
  config.url = 'http://big-event-vue-api-t.itheima.net' + config.url
  // 定义请求头
  config.contentType = 'application/json'
  // 定义请求参数
  config.data = format2Json(config.data)
})

