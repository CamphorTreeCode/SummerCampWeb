// pages/applicationForm/formManagement.js
var app = getApp()
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
  var OpenId = app.returnOpenId()  
  console.log(OpenId)
  var that = this
    wx.request({
      url: app.globalData.url + 'admin/WxEnlist/selectEnlistPage', //仅为示例，并非真实的接口地址 `
      data: { openId: OpenId },
      method: "get",
      header: {
        // 'content-type': 'application/x-www-form-urlencoded' // 默认值
        'content-type': 'application/x-www-form-urlencoded', // 默认值
         xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        that.setData({
        enlistList:res.data[0].lists
        })
        console.log(res)
      }
    })
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
  updateEnlistPage(e){
    console.log(e, e.currentTarget.dataset.enlistid, e.currentTarget.dataset.orderid)
    var enlistid = e.currentTarget.dataset.enlistid;
    var orderid = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: '/pages/applicationForm/applicationForm?enlistId=' + enlistid + '&orderId='+orderid,
    })
  }
})