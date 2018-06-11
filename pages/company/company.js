// pages/company/company.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyContent:'',
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pg=this
    wx.request({
      url: app.globalData.url +'admin/companyDetails/WeixinselectAll',
      header: {
        // 'content-type': 'application/x-www-form-urlencoded' // 默认值
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      success:function(res){
        console.log(res)
        console.info(res.data[0].companyDetailsContent)
        pg.setData({

          companyContent: res.data[0].companyDetailsContent,
          companyDetailsId: res.data[0].companyDetailsId,
          companyDetailsCreatTime: res.data[0].companyDetailsCreatTime
        })
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
    return {
      imageUrl: app.globalData.shareImg,
      title: app.globalData.shareTitle
    }
  },
})