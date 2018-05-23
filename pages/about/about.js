// pages/about/about.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var openid = wx.getStorageSync('openid')
    if (openid) {
      console.log("有openid")
    } else {
      console.log("沒有openid")
      app.getOpenId();
      openid = wx.getStorageSync('openid')
    }
    wx.request({
      url: app.globalData.url + 'WxUser/select', //仅为示例，并非真实的接口地址
      data: { openId: openid },
      method: "get",
      header: {
        // 'content-type': 'application/x-www-form-urlencoded' // 默认值
        'content-type': 'application/x-www-form-urlencoded', // 默认值
         xcxuser_name: "xcxuser_name"
      },
  
      success: function (res) {
        console.log(res)
        that.setData({
          svipStatus: res.data.svipStatus
        })

      }
    })
    //显示红点
    //显示取消

    wx.request({
      url: app.globalData.url + 'wxSvip/selectOpenIdState',
      data: { openId: openid },
      header: {
        // 'content-type': 'application/x-www-form-urlencoded' // 默认值
        'content-type': 'application/x-www-form-urlencoded', // 默认值
          xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.log(res)

        if (res.data[0] != null) {
     
       
        if (res.data[0].showNewsState == 0) {
          wx.removeTabBarBadge({index:2});
          that.setData({
            showNewsState:true
          })
        } else {

          wx.setTabBarBadge({
            index: 2,
            text: '1'
          })
          that.setData({
            showNewsState: false
          })
        }

      }
      }
    })
    wx.request({
      url: app.globalData.url + '/wxSvip/getsvipnumber?openId=' + openid,
      header: {
        // 'content-type': 'application/x-www-form-urlencoded' // 默认值
        'content-type': 'application/x-www-form-urlencoded', // 默认值
         xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info(res.data)
        that.setData({
          vipNumber: res.data == "添加失败" ? '' : res.data
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      imageUrl: app.globalData.shareImg
    }
  },
  member: function () {
    wx.navigateTo({
      url: '/pages/center/center'
    })
  },
  form: function(){
    wx.navigateTo({
      url: '/pages/applicationForm/formManagement',
    })
  },
  company: function(){
    wx.navigateTo({
      url: '/pages/company/company'
    })
  },
  contact:function(e){
    wx.makePhoneCall({
      phoneNumber: '4000062500' //仅为示例，并非真实的电话号码
    })
  },
  message: function(){
    wx.navigateTo({
      url: '/pages/leaveMessage/leaveMessage',
    })
  }
})