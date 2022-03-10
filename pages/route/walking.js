// pages/route/walking.js
const amap = require('../../utils/amap-config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    destination: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '导航至' + options.name,
    })
    this.setData({
      destination: options.destination
    })
    const that = this
    // 设置起点终点
    this.setData({
      setting: {
        scale: 14,
        // style: 'width: 100%; height: 160px;',
        latitude: wx.getStorageSync('latitude'),
        longitude: wx.getStorageSync('longitude'),
        markers: [{
          id: 0,
          iconPath: '/static/images/nav_s.png',
          width: 40,
          height: 40,
          latitude: wx.getStorageSync('latitude'),
          longitude: wx.getStorageSync('longitude'),
        },{
          id: 1,
          iconPath: '/static/images/nav_e.png',
          width: 40,
          height: 40,
          latitude: options.destination.split(',')[1],
          longitude: options.destination.split(',')[0],
        }]
      }
    })
    // 设置沿途路线 默认 car
    this.goToCar()
  },
  goToBus: function (e) {
    this.setData({
      _type: e.currentTarget.dataset.type
    })
    const that = this
    console.log('busss')
    amap.map.getTransitRoute({
      origin: wx.getStorageSync('userLocation'),
      destination: that.data.destination,
      city: wx.getStorageSync('city'),
      success: function(data){
        console.log(data)
        if(data && data.transits){
          var transits = data.transits;
          for(var i = 0; i < transits.length; i++){
            var segments = transits[i].segments;
            transits[i].transport1 = [];
            for(var j = 0; j < segments.length; j++){
              if(segments[j].bus && segments[j].bus.buslines && segments[j].bus.buslines[0] && segments[j].bus.buslines[0].name){
                var name = segments[j].bus.buslines[0].name
                if(j!==0){
                  name = ' --> ' + name;
                }
                console.log('name  ',name)
                
                transits[i].transport1.push(name);
              }
            }
            transits[i].transportName = transits[i].transport1.join('')
            transits[i].minute = parseInt(transits[i].duration/60)
            transits[i].distance = parseInt(transits[i].distance/1000).toFixed(2)
          }
        }
        console.log(transits)
        that.setData({
          transits: transits
        })
      },
      fail: function(info){
        console.log(info)
      }
    })
  },
  goToCar: function (e) {
    if(e){
      this.setData({
        _type: e.currentTarget.dataset.type
      })
    }else{
      this.setData({
        _type: '1'
      })
    }
    const that = this
    amap.map.getDrivingRoute({
      origin: wx.getStorageSync('userLocation'),
      destination: that.data.destination,
      success(data){
        console.log(data)
        that.cb(data)
      },
      fail: function(info){
        console.log(info)
      }
    })
  },
  goToRide: function (e) {
    this.setData({
      _type: e.currentTarget.dataset.type
    })
    const that = this
    amap.map.getRidingRoute({
      origin: wx.getStorageSync('userLocation'),
      destination: that.data.destination,
      success(data){
        console.log(data)
        var points = []
        if(data.paths && data.paths[0] && data.paths[0].rides){
          var steps = data.paths[0].rides
          for(var i = 0; i < steps.length; i++){
            var poLen = steps[i].polyline.split(';')
            for(var j = 0;j < poLen.length; j++){
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            } 
          }
        }
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        })
        if(data.paths[0] && data.paths[0].distance){
          that.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if(data.paths[0] && data.paths[0].duration){
          that.setData({
            cost: parseInt(data.paths[0].duration/60) + '分钟'
          });
        }
      },
      fail: function(info){
        console.log(info)
      }
    })
  },
  goToWalk(e){
    this.setData({
      _type: e.currentTarget.dataset.type
    })
    const that = this
    amap.map.getWalkingRoute({
      origin: wx.getStorageSync('userLocation'),
      destination: that.data.destination,
      success(data){
        console.log(data)
        that.cb(data)
      },
      fail: function(info){
        console.log(info)
      }
    })
  },
  cb(data){
    var points = []
    if(data.paths && data.paths[0] && data.paths[0].steps){
      var steps = data.paths[0].steps
      for(var i = 0; i < steps.length; i++){
        var poLen = steps[i].polyline.split(';')
        for(var j = 0;j < poLen.length; j++){
          points.push({
            longitude: parseFloat(poLen[j].split(',')[0]),
            latitude: parseFloat(poLen[j].split(',')[1])
          })
        } 
      }
    }
    this.setData({
      polyline: [{
        points: points,
        color: "#0091ff",
        width: 6
      }]
    });
    if(data.paths[0] && data.paths[0].distance){
      this.setData({
        distance: data.paths[0].distance + '米'
      });
    }
    if(data.paths[0] && data.paths[0].duration){
      this.setData({
        cost: parseInt(data.paths[0].duration/60) + '分钟'
      });
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

  }
})