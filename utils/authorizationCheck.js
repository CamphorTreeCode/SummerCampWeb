var util = require('util')
// var QQMapWX = require('qqmap-wx-jssdk');

var userlogin = require('userlogin')
userlogin.getOpenid();
var province = ""
var city = ""
var login = util.wxPromisify(wx.login)
var getUserInfo = util.wxPromisify(wx.getUserInfo)
var showModal = util.wxPromisify(wx.showModal)
var openSetting = util.wxPromisify(wx.openSetting)
var getLocation = util.wxPromisify(wx.getLocation)
var getSetting = util.wxPromisify(wx.getSetting)
var authorize = util.wxPromisify(wx.authorize)
//检查用户登陆信息
function getLoginCheck(that) {

  login({}).then(function (res) {
    console.log("sss", res)
 
    if (res.code) {
      getUserInfo({
        withCredentials: false,
      }).then(function (res) {
        console.info("1成功获取用户返回数据");
        console.info(res.userInfo);
        userlogin.login(that);      
      }).catch(function (res) {

        console.info("1授权失败返回数据", res);

        // 显示提示弹窗
        showModal({
          title: '提示',
          content: '需要获取您的"用户信息"授权才能正常使用',
        }).then(function (res) {
          if (res.confirm) {
            console.log('用户点击确定1')
            openSetting({}).then(function (res) {
              if (data) {
                if (data.authSetting["scope.userInfo"] == true) {
                  // loginStatus = false;
                  getUserInfo({ withCredentials: false, }).then(function (res) {
                    console.info("3成功获取用户返回数据");
                    console.info(data.userInfo);
                    userlogin.login(that);
                  }).catch(function (res) {
                    console.info("3授权失败返回数据");
                  })

                }
              }
            }).catch(function (res) {
              getLoginCheck();
              console.info("设置失败返回数据");
            })

          } else if (res.cancel) {

          }
        })

      })


    }
  }).catch(function () {
    console.error("get location failed")
  })


}


//检查用户地理位置信息
function getLocationCheck(that) {
  //获取地理位置

  return new Promise((resolve, reject) => { 
    getSetting({}).then(function (res) {

    console.log(res)
    if (!res.authSetting['scope.userLocation']) {
      authorize({
        scope: 'scope.userLocation',
      }).then(function (res) {
        console.log("//", res)

    
        getLocationDetails(that,resolve)

      }).catch(function (res) {

        locationModel(that, resolve)
    
      })
    } else {
      getLocationDetails(that, resolve)
    
    }

  })

  })
}


//弹出模态弹框
function locationModel(that, resolve) {

  // 显示提示弹窗
  return showModal({
    title: '提示',
    content: '需要获取您的"地理位置"授权才能正常使用',
  }).then(function (res) {

    if (res.confirm) {
      console.log('用户点击确定')
      openSetting({}).then(function (res) {
        if (res) {
          if (res.authSetting["scope.userLocation"] == true) {
            getLocationDetails(that, resolve)
          }
        }
      }).catch(function (res) {

        console.info("设置失败返回数据", res);
      })

    } else if (res.cancel) {

    }
  })

}
//获取地理位置信息
function getLocationDetails(that , resolve) {
  //获取地理位置
  getLocation({
    type: 'wgs84',
  }).then(function (res) {

    var latitude = res.latitude
    var longitude = res.longitude
    // 调用腾讯地图的接口查询当前位置
    var demo = new QQMapWX({
      key: 'RDVBZ-KSAWD-CJV4T-HZM3X-SKQVK-IBB4P' // 必填
    });

    demo.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log(res)
        var city_code = res.result.ad_info.city_code;
        var nation_code = res.result.ad_info.nation_code;
        var cityId = city_code.replace(nation_code, "")
        console.log(cityId)
        province = res.result.address_component.province
        city = res.result.address_component.city     
        demo.getDistrictByCityId({
          id: cityId, // 对应城市ID
          success: function (res) {
            //
            res.result[0].push({ id: -1, fullname:"不限"})
          
           console.log(res.result[0])
            that.setData({
              location: city,
              cityNowList: res.result[0],
            });
            
            resolve(city)
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            //  console.log(res);
          }
        });

        // that.globalData.cityNow = city
        //获取数据更新页面
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });

  })


}
module.exports = {
  getLoginCheck: getLoginCheck,
  // getLocationCheck: getLocationCheck

}
