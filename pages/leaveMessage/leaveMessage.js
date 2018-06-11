// pages/leaveMessage/leaveMessage.js
var  app = getApp();
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
    return {
      imageUrl: app.globalData.shareImg,
      title: app.globalData.shareTitle
    }
  },
  formSubmit:function(e){

    /*表单验证 */
    if (e.detail.value.leaveMessage==''){
      wx.showModal({
        title: '提示',
        content: '请输入内容',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }
   
        }
        
      })
   
    }else{
      console.log(e)
      wx.getUserInfo({
        success: function (res) {
          console.log(res)
          var OpenId = app.returnOpenId()
          console.log(OpenId)
          console.info(e.detail.value.leaveMessage)
          wx.request({
            url: app.globalData.url + '/wxMessage/addMessage',
            header: {
              // 'content-type': 'application/x-www-form-urlencoded' // 默认值
              'content-type': 'application/x-www-form-urlencoded', // 默认值
              xcxuser_name: "xcxuser_name"
            },
            data: {
              messageConent: e.detail.value.leaveMessage,
              openId: OpenId,
              messageName: res.userInfo.nickName
            },
            success: function (res) {
              console.info(res)
          
         
                wx.showToast({
                  title: '留言成功!',
                  icon: 'success',
                  duration: 2000
                })
              
              setTimeout(function () {
                wx.reLaunch({
                  url: '/pages/about/about',
                })
              }, 2500)

              
            }

          })
        }
      })
    }
    
  }

})