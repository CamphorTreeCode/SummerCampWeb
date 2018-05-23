// pages/center/center.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipNumber:'' 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pg=this
    //openid 验证
    var openId = wx.getStorageSync('openid')
    if (openId) {
      console.log("有openid")
    } else {
      console.log("沒有openid")
      app.getOpenId();
      openId = wx.getStorageSync('openid')
    }
    wx.request({
      url: app.globalData.url + '/wxSvip/getsvipnumber?openId=' + openId,
      header: {
        // 'content-type': 'application/x-www-form-urlencoded' // 默认值
       'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name" 
      },
      success: function (res) {
        console.info(res.data)
        pg.setData({
          vipNumber: res.data == "添加失败" ? '' : res.data
        })
       
      }
    })
    //显示红点取消显示
    wx.request({
      url: app.globalData.url + '/wxSvip/updateOpenIdState?openId=' + openId,
      header: {
        // 'content-type': 'application/x-www-form-urlencoded' // 默认值
       'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name : "xcxuser_name"
      },
      success: function (res) {
        console.info(res.data)      
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
  copeTbl:function(){
    var that =this
    wx.setClipboardData({  
      data: that.data.vipNumber.toString(),  
    success: function(res) {  
      // self.setData({copyTip:true}),  
      wx.showModal({  
      title: '提示',  
      content: '复制成功',  
      success: function(res) {  
        if (res.confirm) {  
          console.log('确定')  
        } else if (res.cancel) {  
          console.log('取消')  
        }  
      }  
})  
    }  
  }); 

  }
})