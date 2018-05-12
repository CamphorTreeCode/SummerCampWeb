// pages/home/home.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    /*页面数据渲染开始 */
    /*轮播图数据 */
    imgUrls: [],
    /*项目列表数据*/
    projectList:[
      {
        title:'菲律宾潜能营',
        projectImg:'https://www.chuanshoucs.com/ServerImg/2018-04-18/e4c4a539-de11-49ff-a281-a65a2261a080.jpg',
        content:'酒店开了房间打扫；发进口量的书法家；劳动纠纷；拉法基阿三的书法家；啊'
      },
      {
        title: '菲律宾潜能营',
        projectImg: 'https://www.chuanshoucs.com/ServerImg/2018-04-18/e4c4a539-de11-49ff-a281-a65a2261a080.jpg',
        content: '酒店开了房间打扫；发进口量的书法家；劳动纠纷；拉法基阿三的书法家；啊'
      },
      {
        title: '菲律宾潜能营',
        projectImg: 'https://www.chuanshoucs.com/ServerImg/2018-04-18/e4c4a539-de11-49ff-a281-a65a2261a080.jpg',
        content: '酒店开了房间打扫；发进口量的书法家；劳动纠纷；拉法基阿三的书法家；啊'
      }
    ],
    Selected:[]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*请求后台拿到全部轮播图绑定轮播图id */
    var pg=this
    var that = this
    console.log(app.globalData.url)
    wx.request({
      url: app.globalData.url +'admin/swiper/weixinselectAll',
      header:{
        xcxuser_name:"xcxuser_name"
      },
      success: function (res) {
        console.log(res)
        var imgUrls=[];
        // console.info(res.data)       
        for (var i = 0; i < res.data.length;i++){
          var a = { swiperUrl: '', releaseProjectId:''}
          
        a.swiperUrl = res.data[i].swiperImg;
        a.releaseProjectId = res.data[i].releaseProjectId;
          // console.info(a)
        imgUrls.push(a)
        }
        console.info(imgUrls)
        pg.setData({
          imgUrls: imgUrls
        })
      }
    })
     //精选项目
    wx.request({
      url: app.globalData.url + 'WXSelected/SelectedReleaseProject',
      header: {
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.log(res)
        that.setData({
          Selected:res.data
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
  
  },
  locatingProject: function (e) {
    console.info(e)
    var releaseProjectId = e.currentTarget.dataset.releaseprojectid
    wx.navigateTo({
      url: '/pages/logs/logs?releaseProjectId=' + releaseProjectId
    })
  }
})