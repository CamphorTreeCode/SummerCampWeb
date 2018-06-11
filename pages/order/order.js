var app= getApp();
var pagesize = 0
function selectOrderState(that,orderState){
  var openId = wx.getStorageSync('openid')
  if (openId) {
    console.log("有openid")
  } else {
    console.log("沒有openid")
    app.getOpenId();
    openId = wx.getStorageSync('openid')
  }
  
  
  wx.request({
    url: app.globalData.url + 'wxOrder/selectOrderState',
    data:{
     openId:openId,
     orderState: orderState,
     currentPage: ++pagesize
    },
    header: {
      // 'content-type': 'application/x-www-form-urlencoded' // 默认值
      'content-type': 'application/x-www-form-urlencoded', // 默认值
      xcxuser_name: "xcxuser_name"
    },
    method: 'get',
    success: function (res) {
    
    
 
      if (res.data[0].lists.length>0){
        
        var orderList = that.data.orderList
        for (var i = 0; i < res.data[0].lists.length;i++){
          if (res.data[0].lists[i].releaseProject.length==0){
 
           res.data[0].lists[i].releaseProject[0]=JSON.parse(res.data[0].lists[i].orderContent)
           console.log(res.data[0].lists[i])
          }
          orderList.push(res.data[0].lists[i])
        }
      
     
      
      console.info(res.data[0].lists, orderList)
      that.setData({
        orderList
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
    navItems: [
      {
        typeId: 0,
        name: '全部',
        url: 'bill',
        imageUrl: '/image/dingdan/quanbu.png ',
        textColor: '#942625'
      },
      {
        typeId: 1,
        name: '待付款',
        url: 'bill',
        imageUrl: '../../image/dingdan/daifukuan.png',
        textColor: '#333'
      },
      {
        typeId: 2,
        name: '已付款',
        url: 'bill',
        imageUrl: '../../image/dingdan/yfk.png',
        textColor: '#333'
      },
      {
        typeId: 3,
        name: '报名成功',
        url: 'bill',
        imageUrl: '../../image/dingdan/gou.png',
        textColor: '#333'
      }
      
    ],
    orderList:[],
    orderState:null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    selectOrderState(that,null)
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
      title: "成长 才能赢  来吗"
    }
  },
  navigation:function(e){
    var that =this
    console.info(e.currentTarget.dataset.type)
    if (e.currentTarget.dataset.type=='全部'){
      pagesize = 0;
      selectOrderState(that, null)
 
         
      this.setData({
        navItems: [
          {
            typeId: 0,
            name: '全部',
            url: 'bill',
            imageUrl: '../../image/dingdan/quanbu.png',
            textColor: '#942625'
          },
          {
            typeId: 1,
            name: '待付款',
            url: 'bill',
            imageUrl: '../../image/dingdan/daifukuan.png',
            textColor: '#333'
          },
          {
            typeId:2,
            name: '已付款',
            url: 'bill',
            imageUrl: '../../image/dingdan/yfk.png',
            textColor: '#333'
          },
          {
            typeId: 3,
            name: '报名成功',
            url: 'bill',
            imageUrl: '../../image/dingdan/gou.png',
            textColor: '#333'
          }
        ],
        orderList:[]

      })
    }

    if (e.currentTarget.dataset.type == '待付款') {
      pagesize = 0;
      selectOrderState(that, 1)
    
  
      this.setData({
        navItems: [
          {
            typeId: 0,
            name: '全部',
            url: 'bill',
            imageUrl: '/image/dingdan/quanbu2.png ',
            textColor: '#333'
          },
          {
            typeId: 1,
            name: '待付款',
            url: 'bill',
            imageUrl: '/image/dingdan/daifukuan2.png ',
            textColor: '#942625'
          },
          {
            typeId: 2,
            name: '已付款',
            url: 'bill',
            imageUrl: '../../image/dingdan/yfk.png',
            textColor: '#333'
          },
          {
            typeId: 3,
            name: '报名成功',
            url: 'bill',
            imageUrl: '../../image/dingdan/gou.png',
            textColor: '#333'
          }
        ],
        orderList: [],
        orderState:1

      })
    }

    if (e.currentTarget.dataset.type == '报名成功') {
      pagesize = 0;
      selectOrderState(that, 2)
  
      this.setData({
        navItems: [
          {
            typeId: 0,
            name: '全部',
            url: 'bill',
            imageUrl: '/image/dingdan/quanbu2.png',
            textColor: '#333'
          },
          {
            typeId: 1,
            name: '待付款',
            url: 'bill',
            imageUrl: '../../image/dingdan/daifukuan.png',
            textColor: '#333'
          },
          {
            typeId: 2,
            name: '已付款',
            url: 'bill',
            imageUrl: '../../image/dingdan/yfk.png',
            textColor: '#333'
          },
          {
            typeId: 3,
            name: '报名成功',
            url: 'bill',
            imageUrl: '/image/dingdan/gou2.png ',
            textColor: '#942625'
          }
        ]
        ,
        orderList: [],
        orderState: 2
      })
    }
    if (e.currentTarget.dataset.type == '已付款') {
      pagesize = 0;
      selectOrderState(that, 3)

      this.setData({
        navItems: [
          {
            typeId: 0,
            name: '全部',
            url: 'bill',
            imageUrl: '/image/dingdan/quanbu2.png',
            textColor: '#333'
          },
          {
            typeId: 1,
            name: '待付款',
            url: 'bill',
            imageUrl: '../../image/dingdan/daifukuan.png',
            textColor: '#333'
          },
          {
            typeId: 2,
            name: '已付款',
            url: 'bill',
            imageUrl: '../../image/dingdan/selectykf.png',
            textColor: '#942625'
          },
          {
            typeId: 3,
            name: '报名成功',
            url: 'bill',
            imageUrl: '../../image/dingdan/gou.png ',
            textColor: '#333'
          }
        ]
        ,
        orderList: [],
        orderState: 3
      })
    }

    
  },
  gopay:function(e){
    console.log(e);
    var orderId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/pay/pay?orderId=' + orderId,
    })
  },
  //上拉刷新
  lower(){
    var that = this
    selectOrderState(that, that.data.orderState)
  }
})