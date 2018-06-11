// pages/applicationForm/formManagement.js
var app = getApp()
var currentPage=0
function selectEnlistPage(that) {
  var openId = wx.getStorageSync('openid')
  if (openId) {
    console.log("有openid")
  } else {
    console.log("沒有openid")
    app.getOpenId();
    openId = wx.getStorageSync('openid')
  }
  wx.request({
    url: app.globalData.url + 'admin/WxEnlist/selectEnlistPage',
    data: {
      openId: openId,
      currentPage: ++currentPage
    },
    header: {
      // 'content-type': 'application/x-www-form-urlencoded' // 默认值
     'content-type': 'application/x-www-form-urlencoded', // 默认值
      xcxuser_name: "xcxuser_name"
    },
    method: 'get',
    success: function (res) {

 console.log(res)

      if (res.data[0].lists.length > 0) {

        var enlistList = that.data.enlistList
        for (var i = 0; i < res.data[0].lists.length; i++) {
          enlistList.push(res.data[0].lists[i])
        }


        console.info(res.data[0].lists, enlistList)
        that.setData({
          enlistList
        })
      }
    }
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    enlistList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var OpenId = app.returnOpenId()  
  console.log(OpenId)
  var that = this
  currentPage=0
  selectEnlistPage(that)
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
  updateEnlistPage(e){
    console.log(e, e.currentTarget.dataset.enlistid, e.currentTarget.dataset.orderid)
    var enlistid = e.currentTarget.dataset.enlistid;
    var orderid = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: '/pages/applicationForm/applicationForm?enlistId=' + enlistid + '&orderId='+orderid,
    })
  },
  //上拉刷新
  lower(){
    var that = this
    selectEnlistPage(that)
  }
})