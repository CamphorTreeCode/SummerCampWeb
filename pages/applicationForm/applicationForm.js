// pages/applicationForm/applicationForm.js
 function yanzhen(enlist){
   if (enlist.enlistName == ''){
     wx.showToast({
       title: '请填写姓名',
       icon: 'none',
       duration: 2000
     })
     return false;
   }
   if (enlist.enlistSex == '') {
     wx.showToast({
       title: '请选择性别',
       icon: 'none',
       duration: 2000
     })
     return false;
   }
   if (enlist.enlistBirthDay == '') {
     wx.showToast({
       title: '请填写出生日期',
       icon: 'none',
       duration: 2000
     })
     return false;
   }
   if (enlist.enlistAddres == '') {
     wx.showToast({
       title: '请填写家庭地址',
       icon: 'none',
       duration: 2000
     })
     return false;
   }
   if (enlist.enlistCardNumber == '') {
     wx.showToast({
       title: '请填写',
       icon: 'none',
       duration: 2000
     })
     return false;
   }
   if (enlist.enlistCard == '') {
     wx.showToast({
       title: '请选择证件类型',
       icon: 'none',
       duration: 2000
     })
     return false;
   }
   if (enlist.enlistHealthyIs == '') {
     wx.showToast({
       title: '请选择是否健康',
       icon: 'none',
       duration: 2000
     })
     return false;
   }
   if (enlist.enlistCardNumber == '') {
     wx.showToast({
       title: '请填写证件号码',
       icon: 'none',
       duration: 2000
     })
     return false;
   }

if (enlist.enlistHeight == '') {
  wx.showToast({
    title: '请填写身高',
    icon: 'none',
    duration: 2000
  })
  return false;
}
if (enlist.enlistWeight == '') {
  wx.showToast({
    title: '请填写体重',
    icon: 'none',
    duration: 2000
  })
  return false;
}
if (enlist.enlistShoeSize == '') {
  wx.showToast({
    title: '请填写鞋子尺码',
    icon: 'none',
    duration: 2000
  })
  return false;
}
   
if (enlist.enlistMuslimIs == '') {
  wx.showToast({
    title: '请选择穆斯林是否过敏',
    icon: 'none',
    duration: 2000
  })
  }
  if (enlist.enlistCarsicknessIs == '') {
    wx.showToast({
      title: '请选择是否晕车',
      icon: 'none',
      duration: 2000
    })
  return false;
}
  if (enlist.enlistAnaphylaxisIs == '') {
    wx.showToast({
      title: '请选择是否有药品过敏史',
      icon: 'none',
      duration: 2000
    })
    return false;
  }
  if (enlist.enlistAnaphylaxisText == '') {
    wx.showToast({
      title: '请填写药品过敏史',
      icon: 'none',
      duration: 2000
    })
    return false;
  }
  if (enlist.enlistFatherName == '') {
    wx.showToast({
      title: '请填写你父亲的姓名',
      icon: 'none',
      duration: 2000
    })
    return false;
  }
  if (enlist.enlistFatherPhone == '') {
    wx.showToast({
      title: '请填写你父亲的手机',
      icon: 'none',
      duration: 2000
    })
    return false;
  }
  if (enlist.enlistMotherName == '') {
    wx.showToast({
      title: '请填写你母亲的姓名',
      icon: 'none',
      duration: 2000
    })
    return false;
  }
  if (enlist.enlistMotherPhone == '') {
    wx.showToast({
      title: '请填写你母亲的手机',
      icon: 'none',
      duration: 2000
    })
    return false;
  }
  if (enlist.enlistHomeExpectText == '') {
    wx.showToast({
      title: '请填写家长的期待',
      icon: 'none',
      duration: 2000
    })
    return false;
  }
}
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:'none',
    IdCardType:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
   console.log(options)
  that.setData({
    orderId:options.orderId,
    enlistId: options.enlistId
  })
  //有报名表回显数据
  // var OpenId = app.returnOpenId()
  // console.log(OpenId)
  wx.request({
    url: app.globalData.url + 'admin/WxEnlist/selectOpenIdEnlist', //仅为示例，并非真实的接口地址 `
    data: { orderId: options.orderId},
    method: "get",
    header: {
      // 'content-type': 'application/x-www-form-urlencoded' // 默认值
      'content-type': 'application/x-www-form-urlencoded', // 默认值
       xcxuser_name: "xcxuser_name"
    },
    success: function (res) {
    that.setData({
      enlist:res.data[0],
      IdCardType: res.data[0].enlistCard == 0 ? '身份证' : res.data[0].enlistCard == 1?'中国护照':'外国护照',
      orderState: res.data[0].orderState
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
  IdCardType:function(){

    this.setData({
      show:'block'

    })
  },
  chooseIdCardType:function(e){
      console.info(e)
      console.info(e.target.dataset.value)
      this.setData({
        IdCardType: e.target.dataset.value,
        show:'none'
      })
  },
  formSubmit:function(e){
 var that =this
  //  wx.redirectTo({
  //    url: '/pages/paySuccess/paySuccess',
  //  })

e.detail.value.enlistCard = e.detail.value.enlistCard == "身份证" ? 0 : e.detail.value.enlistCard == "中国护照"?1:2
  var enlist = e.detail.value
  //openid 验证
  var openid = wx.getStorageSync('openid')
  if(openid){
    console.log("有openid")
  }else{
    console.log("沒有openid")
    app.getOpenId();
    openid = wx.getStorageSync('openid')
  }
  var flag = yanzhen(enlist)
  if (!flag){
    return;
  }
  enlist.openId = openid
  enlist.orderState = that.data.orderState
  enlist.orderId = that.data.orderId 
  // enlist.enlistCard == '身份证' ? enlist.enlistCardenlistCard = 0 :      enlist.enlistCardenlistCard == "中国护照" ? enlist.enlistCardenlistCard = 1 : enlist.enlistCardenlistCard = 2
   console.log(e)
  //openid 验证
   console.log(e) 
   wx.request({
     url: app.globalData.url + 'admin/WxEnlist/add', //仅为示例，并非真实的接口地址
     data: enlist,
     method: "post",
     header: {
       // 'content-type': 'application/x-www-form-urlencoded' // 默认值
      'content-type': 'application/x-www-form-urlencoded', // 默认值
       xcxuser_name: "xcxuser_name"
     },
     success: function (res) {      
          console.log(res)    
          if (that.data.orderState==1) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
            wx.navigateTo({
              url: '/pages/paySuccess/paySuccess?orderId=' + that.data.orderId,
            })
       
          } else if (that.data.orderState==0){
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
        
          }
     
     }})
   }
 
})