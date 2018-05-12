

function login(that){
      var app = getApp()
      wx.getUserInfo({
        success: function (res) {
  
        var userInfo = res.userInfo
        console.log(res)
          // user.nickname = userInfo.nickName
          // user.avatarurl = userInfo.avatarUrl
          // user.gender = userInfo.gender //性别 0：未知、1：男、2：女
          // user.province = userInfo.province
          // user.city = userInfo.city
          // user.country = userInfo.country
          // user.language = userInfo.language       
          var openid = wx.getStorageSync('openid')
          userInfo.openId = openid
          
          wx.request({
            url: app.globalData.url + 'WxUser/addUser', //仅为示例，并非真实的接口地址
            data: userInfo,
            header: {
              'content-type': 'application/x-www-form-urlencoded', // 默认值
               xcxuser_name: "xcxuser_name"
            },
      
            method: "post",
            success: function (res) {
              console.log(res)
            }
          })
        }
      })

 
/**传用户数据 */

}
function getOpenid() {
  // 登录
  wx.login({
    success: res => {
      var app = getApp()
      try {
        var value = wx.getStorageSync('openid')
        if (value) {

        } else {
          wx.request({
            url: app.globalData.url + 'WxUser/getOpenid', //仅为示例，并非真实的接口地址
            data: { jscode: res.code },
            method: "get",
            header: {
              // 'content-type': 'application/x-www-form-urlencoded' // 默认值
              'content-type': 'application/json', // 默认值

            },
            success: function (res) {
              console.log(res)

              try {
                wx.setStorageSync('openid', res.data.openId)
              } catch (e) {
              }
            }

          })
        }
      } catch (e) {
        // Do something when catch error
      }


    }
  })
}
module.exports = {
  login: login,
  getOpenid: getOpenid
}
