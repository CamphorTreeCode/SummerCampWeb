// pages/pay/pay.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payments:true,
    orderIds:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //console.log(options.releaseProjectId)
    if (options.releaseProjectId){
      this.setData({
        releaseProjectId: options.releaseProjectId
      })
      wx.request({
        url: app.globalData.url + 'admin/swiper/selectProjectById?releaseProjectId=' + options.releaseProjectId,
        header: {
          // 'content-type': 'application/x-www-form-urlencoded' // 默认值
         'content-type': 'application/x-www-form-urlencoded', // 默认值
          xcxuser_name: "xcxuser_name"
        },
        success: function (res) {
          console.log(res)
          that.setData({
            releaseProject: res.data,
            orderMoney: res.data.relaaseProjectMoney
          })

        }
      })
    }
    if (options.orderId) {
      this.setData({
        orderIds: options.orderId
      })
      wx.request({
        url: app.globalData.url + 'wxOrder/getOrder?orderId=' + options.orderId,
        header: {
          // 'content-type': 'application/x-www-form-urlencoded' // 默认值
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          xcxuser_name: "xcxuser_name"
        },
        success: function (res) {
          console.log(res)
          var strrp = res.data[0].orderContent
          var releaseProject = JSON.parse(strrp)
          console.log(releaseProject)
          that.setData({
            releaseProject: releaseProject ,
            orderMoney: res.data[0].orderMoney,
            releaseProjectId: res.data[0].releaseProjectId
          })

        }
      })
    }

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
  payment:function(){
    var that = this;
    that.setData({
      payments:false
    })
//验证有没有订单没有结算
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
      url: app.globalData.url + 'wxOrder/selectOpenidOrder',
      method: 'get',
      header: {
        // 'content-type': 'application/x-www-form-urlencoded' // 默认值
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      data: { 'openId': openId },
      success: function (res) {
      console.log(res)
      if(!res.data.payState){
        var orderId = res.data.orderId
        wx.showModal({
          title: '提示',
          content: '请填写完整报名表再进行支付',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/applicationForm/applicationForm?orderId=' + orderId,
              })
              that.setData({
                payments: true
              })
              return
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
            that.setData({
              payments: true
            })
          }
        })
       
      }else{
        console.log("可以支付")
        var releaseProject = that.data.releaseProject
        releaseProject = JSON.stringify(releaseProject)
        // console.log(releaseProject)
        wx.login({
          success: function (res) {
            var jscode = res.code
            wx.request({
              url: app.globalData.url + '/WXPay/wxpay',
              method: 'POST',
              header: {
                // 'content-type': 'application/x-www-form-urlencoded' // 默认值
                'content-type': 'application/x-www-form-urlencoded', // 默认值
                xcxuser_name: "xcxuser_name"
              },
              data: {
                jscode,
                releaseProject,
                releaseProjectId: that.data.releaseProjectId,
                orderMoney: that.data.orderMoney,
                orderId: that.data.orderIds
              },
              success: function (res) {
                var prepay_id = res.data.prepay_id;
                console.log("统一下单返回 prepay_id:" + prepay_id);
                 that.setData({
                  orderId: res.data.orderId
                })
                that.sign(prepay_id, res.data.orderId);


              }
            })
          }
        })
      }
      }
    })


   
  },
  //签名
  sign: function (prepay_id, orderId) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/WXPay/sign',
      method: 'POST',
      header: {
        // 'content-type': 'application/x-www-form-urlencoded' // 默认值
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      data: { 'repay_id': prepay_id },
      success: function (res) {
        that.requestPayment(res.data, orderId);
        
      }
      
    })
  },
  //申请支付
  requestPayment: function (obj, orderId) {
    var that = this
    //openid 验证
    var openId = wx.getStorageSync('openid')
    if (openId) {
      console.log("有openid")
    } else {
      console.log("沒有openid")
      app.getOpenId();
      openId = wx.getStorageSync('openid')
    }
    console.log(orderId)
    wx.requestPayment({
      'timeStamp': obj.timeStamp,
      'nonceStr': obj.nonceStr,
      'package': obj.package,
      'signType': obj.signType,
      'paySign': obj.paySign,
      'success': function (res) {
        console.log(res)
        console.log(res, res.errMsg)
        that.setData({
          payments: true
        })
        if (res.errMsg == 'requestPayment:ok') {
        wx.request({
          url: app.globalData.url + '/wxOrder/updateOrder',
          method: 'get',
          header: {
            // 'content-type': 'application/x-www-form-urlencoded' // 默认值
            'content-type': 'application/x-www-form-urlencoded', // 默认值
            xcxuser_name: "xcxuser_name"
          },
          data: { orderId: orderId ,
            openId: openId},
            success: function (res) {
            console.log(res)

             if (res.data.enlistState) {
            //    wx.navigateTo({
            //      url: '/pages/paySuccess/paySuccess?orderId=' + orderId,
            //    })
            //  } else {
               wx.navigateTo({
                 url: '/pages/applicationForm/applicationForm?orderId=' + orderId,
               })
          }
        
       
        
          }
          })
        }
      },
      'fail': function (res) {
        that.setData({
          payments: true
        })
      }
    })
  },
})