// pages/agreement/agreement.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    operate:''
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.info(options)
     
    var pg = this
    wx.request({
      url: app.globalData.url +'wxAgreement/getAgreement?agreementId=' + options.agreementGoId + '',
      header: {
        // 'content-type': 'application/x-www-form-urlencoded' // 默认值
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info(res.data.agreementContent)
        pg.setData({
          operate: res.data.agreementContent,
          releaseProjectId: options.releaseProjectId
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
      imageUrl: app.globalData.shareImg
    }
  },
  submit:function(){
    if (this.data.checked==false){
      wx.showModal({
        title: '提示',
        content: '您需要同意说明',
      })
      return false;
    }
    wx.navigateTo({
      url: '/pages/pay/pay?releaseProjectId=' + this.data.releaseProjectId,
    })
  },
  checkState:function(e){
    console.info(e.detail.value[0])
    if (e.detail.value[0]=='xz'){
      this.setData({
        checked:true
      })
    }
    else{
      this.setData({
        checked: false
      })
    }
  }
})