//logs.js
const util = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');


var app = getApp();
Page({
  data: {
    movies: [
      
      { url: "https://www.chuanshoucs.com/ServerImg/2018-04-18/8c46e7ec-0e2d-4700-a6cf-505d7ed32672.png"},
      { url: "https://www.chuanshoucs.com/ServerImg/2018-04-18/d1513fd6-ec6f-4abc-bcf1-170241439481.png" },
      { url: "https://www.chuanshoucs.com/ServerImg/2018-04-18/99a5a9f8-c91f-471d-b5ec-e9e97d4b7df5.png" },
      { url:"https://www.chuanshoucs.com/ServerImg/2018-04-18/5b6b2003-ce17-4888-af92-25c062dfaf8b.png"}

    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 700,
    circular:true,

    /*项目数据*/
    /*集结地点 */
    releaseProjectHomeUrl:'',
    /*项目金额*/
    relaaseProjectMoney:'',
    /*项目标题*/
    relaaseProjectTitle:'',
    /*活动类型*/
    releaseProjectActivityType:'',
    /*报名条件*/
    releaseProjectConditions:'',
    /*人员限制*/
    releaseProjectPersonnelRestrictions:'',
    /*营期事件*/
    releaseProjectBattalionTime:'',
    /*项目金额 */
    releaseProjectBattalionMoney:'',
    /*费用包含*/
    releaseProjectCostincludes:'',
    /*公用装备 */
    releaseProjectPublicEquipment:'',
    /*自备装备 */
    releaseProjectMyEquipment:'',
    /*注意事项 */
    releaseProjectAttention:'',
    /*导师介绍 */
    releaseProjectIntroduce:'',
    /*导师介绍图片 */
    releaseProjectIntroduceUrl:'',
    /*项目的图文详情 */
    relaaseProjectContent:'',
    /*入营协议id */
    agreementGoId:'',
    /*退营协议 */
    agreementOutId:'',
  

  },
  onLoad: function (option) {

    var pg=this
    wx.request({
      url: app.globalData.url + 'admin/swiper/selectProjectById?releaseProjectId=' + option.releaseProjectId+'',
      header: {
        // 'content-type': 'application/x-www-form-urlencoded' // 默认值
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      success:function(res){
         console.log(res)

         var article = res.data.relaaseProjectContent;
         WxParse.wxParse('article', 'html', article, pg, 5);

    //      var strs = new Array(); //定义一数组 
    //      strs = res.data.releaseProjectHomeUrl.split(","); //字符分割 
    // console.log()
         pg.setData({
           /*退营须知id */
           agreementGoId: res.data.agreementGoId,
           /*集结地点 */
          //  releaseProjectHome: res.data.releaseProjectHome,
          //  /*集结地点图片*/
          //  releaseProjectHomeUrl: res.data.releaseProjectHomeUrl.split(",") == '' ? [] : res.data.releaseProjectHomeUrl.split(","),
          //  /*项目金额*/
          relaaseProjectMoney: res.data.relaaseProjectMoney,
          //  //活动json图片
          //  releaseProjectActivityUrl: res.data.releaseProjectActivityUrl.split(",") == '' ? [] : res.data.releaseProjectActivityUrl.split(","),
          //  //报名存放图片的json图片
          //  releaseProjectConditionsUrl: res.data.releaseProjectConditionsUrl.split(",") == '' ? [] : res.data.releaseProjectConditionsUrl.split(","),
          //  //人员限制json图片
          //  releaseProjectPersonnelRestrictionsUrl: res.data.releaseProjectPersonnelRestrictionsUrl.split(",") == '' ? [] : res.data.releaseProjectPersonnelRestrictionsUrl.split(","),
          //  //营期时间的图片json
          //  releaseProjectBattalionTimeUrl: res.data.releaseProjectBattalionTimeUrl.split(",") == '' ? [] : res.data.releaseProjectBattalionTimeUrl.split(","),
          //  //项目金额的图片json
          //  releaseProjectBattalionMoneyUrl: res.data.releaseProjectBattalionMoneyUrl.split(",") == '' ? [] : res.data.releaseProjectBattalionMoneyUrl.split(","),
          //  //存放费用包含的图片json
          //  releaseProjectCostincludesUrl: res.data.releaseProjectBattalionMoneyUrl.split(",") == '' ? [] : res.data.releaseProjectBattalionMoneyUrl.split(","),
          //  //公用的装备存放的图片json
          //  releaseProjectPublicEquipmentUrl: res.data.releaseProjectPublicEquipmentUrl.split(",") == '' ? [] : res.data.releaseProjectPublicEquipmentUrl.split(","),
          //  //自备装备存放的图片json
          //  releaseProjectMyEquipmentUrl: res.data.releaseProjectMyEquipmentUrl.split(",") == '' ? [] : res.data.releaseProjectMyEquipmentUrl.split(","),
          //  //注意事项的图片的json
          //  releaseProjectAttentionUrl: res.data.releaseProjectAttentionUrl.split(",") == '' ? [] : res.data.releaseProjectAttentionUrl.split(","),
          //  //导师介绍内容存放的图片
          //  releaseProjectIntroduceUrl: res.data.releaseProjectIntroduceUrl.split(",") == '' ? [] : res.data.releaseProjectIntroduceUrl.split(","),
          //  /*项目标题*/
           relaaseProjectTitle: res.data.relaaseProjectTitle,
          //  /*活动类型*/
          //  releaseProjectActivityType: res.data.releaseProjectActivityType ,
          //  /*报名条件*/
          //  releaseProjectConditions: res.data.releaseProjectConditions,
          //  /*人员限制*/
          //  releaseProjectPersonnelRestrictions: res.data.releaseProjectPersonnelRestrictions,
          //  /*营期事件*/
          //  releaseProjectBattalionTime: res.data.releaseProjectBattalionTime,
          //  /*项目金额 */
          //  releaseProjectBattalionMoney: res.data.releaseProjectBattalionMoney,
          //  /*费用包含*/
          //  releaseProjectCostincludes: res.data.releaseProjectCostincludes ,
          //  /*公用装备 */
          //  releaseProjectPublicEquipment: res.data.releaseProjectPublicEquipment,
          //  /*自备装备 */
          //  releaseProjectMyEquipment: res.data.releaseProjectMyEquipment,
          //  /*注意事项 */
          //  releaseProjectAttention: res.data.releaseProjectAttention,
          // //  /*注意事项图片 */
          // //  releaseProjectAttentionUrl: res.data.releaseProjectAttentionUrl,
          //  /*导师介绍 */
          //  releaseProjectIntroduce: res.data.releaseProjectIntroduce,
          //  /*导师介绍图片 */
          //  releaseProjectIntroduceUrl: res.data.releaseProjectIntroduceUrl,
           /*项目的图文详情 */
           relaaseProjectContent: res.data.relaaseProjectContent,
           /*入营协议id */
           agreementGoId: res.data.agreementGoId,
           /*退营协议 */
           agreementOutId: res.data.agreementOutId,
           //项目轮播图
           movies: res.data.releaseProjectSwiper,
          //  //项目营层
          //  battalionEriod: res.data.battalionEriod,
           //项目的正文
           releaseProjectZhengWeng:res.data.releaseProjectZhengWeng,
           //项目的id
           releaseProjectId: option.releaseProjectId
         })
         
      }
    })
  },
  bind:function(){
    wx.navigateTo({
      url: '/pages/notes/notes?agreementOutId=' + this.data.agreementOutId+'',
    })
  },
  ggong:function(){
    wx.navigateTo({
      url: '/pages/agreement/agreement?agreementGoId=' + this.data.agreementGoId + '&releaseProjectId=' + this.data.releaseProjectId,
    })
  },
  onShareAppMessage: function () {
    return {
      imageUrl: app.globalData.shareImg,
      title: app.globalData.shareTitle
    }
  },
})
