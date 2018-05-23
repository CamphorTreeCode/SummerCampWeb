// pages/paySuccess/paySuccess.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showShade:'block',
    showWishes:'block',
    showMember:'none',
    loadingShow:'none',
    vipNumber:'',
    enlistHomeExpectText:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var orderId = options.orderId;
    var enlistHomeExpectText = options.enlistHomeExpectText
  
    var that = this
    that.setData({
      enlistHomeExpectText: enlistHomeExpectText
    })
    
    var OpenId = app.returnOpenId()
    if (orderId==null){
      wx.request({
        url: app.globalData.url + 'wxOrder/selectOrderOpenIds?openId=' + OpenId,
        header: {
          // 'content-type': 'application/x-www-form-urlencoded' // 默认值
         'content-type': 'application/x-www-form-urlencoded', // 默认值
          xcxuser_name: "xcxuser_name"
        },
        success: function (res) {
          console.info(res)
          that.setData({
            Order: res.data[0]
          })

        }
      }) 
    }else{
      wx.request({
        url: app.globalData.url + 'wxOrder/getOrder?orderId='+ orderId,
        header: {
          // 'content-type': 'application/x-www-form-urlencoded' // 默认值
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          xcxuser_name: "xcxuser_name"
        },
        success: function (res) {
          console.info(res)
          that.setData({
            Order: res.data[0]
          })

        }
      }) 
    }
    // //显示获取vip卡
    // wx.request({
    //   url: app.globalData.url + '/wxSvip/getsvipnumber?openId=' + OpenId,
    //   header: {
    //     // 'content-type': 'application/x-www-form-urlencoded' // 默认值
    //     'content-type': 'application/x-www-form-urlencoded', // 默认值
    //     xcxuser_name: "xcxuser_name"
    //   },
    //   success: function (res) {
    //     console.info(res.data)
    //     that.setData({
    //       vipNumber: res.data == "添加失败" ? '' : res.data
    //     })
    //   }
    // })

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
    var openId = wx.getStorageSync('openid')
    if (openId) {
      console.log("有openid")
    } else {
      console.log("沒有openid")
      app.getOpenId();
      openId = wx.getStorageSync('openid')
    }
    wx.request({
      url: app.globalData.url + 'wxOrder/selectOrderOne?openId=' + openId,
      header: {
        // 'content-type': 'application/x-www-form-urlencoded' // 默认值
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info(res.data)
        that.setData({
          huiyuan: res.data,

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
    withShareTicket: true
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '想对你说',
      path: '/pages/share/share?enlistHomeExpectText=' + this.data.enlistHomeExpectText,
      imageUrl: app.globalData.paySuccessImg,
      success: function (res) {
        // 转发成功
        console.info('成功')
      },
      fail: function (res) {
        // 转发失败
        console.info('失败')
      }
    }
  },
  closeWishes:function(){
    var showMember = this.data.huiyuan[0] == 1 ? 'block' : 'none'
    this.setData({
      showWishes:'none', 
      showMember: showMember
    })
    if (showMember == "none"){
      this.setData({
        showWishes: 'none',
        showShade: 'none',
      })
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/order/order',
        })
      }, 1000)
    }

  },
  closeMember:function(){
    this.setData({
      showMember: 'none',
      showShade: 'none',
     
    })
    setTimeout(function () {
      wx.switchTab({
        url: '/pages/order/order',
      })
    }, 1000)

  }
})