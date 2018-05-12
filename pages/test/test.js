// pages/test/test.js
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
  
  },

  //下单
  xiadan: function () {
    var that = this;
    var user = that.data.user
    var json = JSON.stringify(user)

    wx.login({
      success: function (res) {
        var jscode = res.code
        wx.request({
          url: app.globalData.appurl + '/WXPay/wxpay',
          method: 'POST',
          header: {
            // 'content-type': 'application/x-www-form-urlencoded' // 默认值
            'content-type': 'application/x-www-form-urlencoded', // 默认值
            xcxuser_name: "xcxuser_name"
          },
          data: { jscode},
          success: function (res) {
            var prepay_id = res.data.prepay_id;
            console.log("统一下单返回 prepay_id:" + prepay_id);
            that.sign(prepay_id);
          }
        })
      }
    })
  },
  //签名
  sign: function (prepay_id) {
    var that = this;
    wx.request({
      url: app.globalData.appurl + '/WXPay/sign',
      method: 'POST',
      header: {
        // 'content-type': 'application/x-www-form-urlencoded' // 默认值
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      data: { 'repay_id': prepay_id },
      success: function (res) {
        that.requestPayment(res.data);

      }
    })
  },
  //申请支付
  requestPayment: function (obj) {
    wx.requestPayment({
      'timeStamp': obj.timeStamp,
      'nonceStr': obj.nonceStr,
      'package': obj.package,
      'signType': obj.signType,
      'paySign': obj.paySign,
      'success': function (res) {
       console.log(res)        
      },
      'fail': function (res) {
      }
    })
  },
})