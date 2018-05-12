
function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }

      obj.fail = function (res) {
        reject(res)
      }

      fn(obj)
    })
  }
}


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// get post封装
function requstGet(url, data) {
  return requst(url, 'GET', data)
}

function requstPost(url, data) {
  return requst(url, 'POST', data)
}
//封装api
// function wxApi(apiName,data){

//   if(data==undefined){
//   var datas 
//   }else{
//     console.log(data)
//     console.log(JSON.parse(data))
//     var datas = JSON.parse(data)
//   }

//   return wxPromisify(apiName)({datas})
// }

//封装Request请求方法
function requst(url, method, data = {}) {
  wx.showNavigationBarLoading()
  data.method = method
  return new Promise((resove, reject) => {
    wx.request({
      url: url,
      data: data,
      header: {},
      method: method.toUpperCase(), // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        wx.hideNavigationBarLoading()
        resove(res.data)
      },
      fail: function (msg) {
        console.log('reqest error', msg)
        wx.hideNavigationBarLoading()
        reject(msg)
      }
    })
  })
}
//封装Request请求方法
function requst1(url, method, data = {}) {
  wx.showNavigationBarLoading()
  data.method = method
  return wxPromisify(wx.request)({
    url: url,
    data: data,
    header: {},
    method: method.toUpperCase(),
  }).then(function (res) {
    wx.hideNavigationBarLoading()
    console.log(res)
    resove(res.data)
  }).catch(function (msg) {
    console.log('reqest error', msg)
    wx.hideNavigationBarLoading()
    reject('fail')
  })
}
// 验证身份证
function isIdCard(card) {

  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (reg.test(card) === false) {

    return false;

  } else {
    return true;
  }
}
// 检验电话号
function IsTelephone(obj)// 正则判断
{
  var pattern = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/;
  if (pattern.test(obj)) {
    return true;
  }
  else {
    return false;
  }
}
// 校验邮箱
function isEmail(str) {
  var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return reg.test(str);
}

//截取字符串变为数组
function arrStr(str) {
  var arr = res.data.releaseProjectHomeUrl.split(",") == '' ? [] : res.data.releaseProjectHomeUrl.split(",")
  console.log(arr)
  
  return reg.test(str);
}

//封装api
function wxApi() {
  return { "login": "wxPromisify(wx.login)", }
}
module.exports = {
  formatTime: formatTime,
  wxPromisify: wxPromisify,
  requstGet: requstGet,
  requstPost: requstPost,
  isIdCard: isIdCard,
  IsTelephone: IsTelephone,
  isEmail: isEmail
}
