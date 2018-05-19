//app.js
var check = require('utils/authorizationCheck.js');
var userLogin = require('utils/userlogin.js');
App({

  onLaunch: function () {
    var that = this
    // 展示本地存储能力
    userLogin.getOpenid()
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
    wx.getSetting({
      success: res => {
      console.log("123456",res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("123456",res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    //check.getLoginCheck(that)

    //显示红点
    var OpenId = that.returnOpenId()
    wx.request({
      url: that.globalData.url + 'wxSvip/selectOpenIdState',
      data: { openId: OpenId},
      header: {
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.log(res)
        if (res.data[0]!=null){
          if (res.data[0].showNewsState == 0) {

          } else {
            wx.setTabBarBadge({
              index: 2,
              text: '1'
            })
          }
        }
   
    
      }
    })
 

  },
   getOpenId:function(){
     console.log("獲取opoenid")
     var that = this
     userLogin.getOpenid()
   },
    returnOpenId:function(){
      var openid = wx.getStorageSync('openid')
      if (openid) {
        console.log("有openid")
      } else {
        console.log("沒有openid")  
        this.getOpenId();
        openid = wx.getStorageSync('openid')
      }     
      return openid
    },

  globalData: {
   
  userInfo: null,
    url:"https://www.pacata.xyz/SummerCamp/",
   // url: "http://localhost/SummerCamp/",
   appUrl: "https://www.pacata.xyz/SummerCamp/",     
  }
})