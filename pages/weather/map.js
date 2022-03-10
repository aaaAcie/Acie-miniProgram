// pages/weather/map.js
const amap = require('../../utils/amap-config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poisData: [],
    markers: []
  },
  bindMarker(e){
    const that = this
    // 重置所有 iconPath
    this.data.markers.forEach(marker => {
      marker.iconPath = '/static/images/marker.png'
    })
    const id = e.detail.markerId
    // 修改指定 iconPath
    this.data.markers[id].iconPath = '/static/images/marker_checked.png'

    this.setData({
      markerText: {
        name: that.data.poisData[id].name,
        address: that.data.poisData[id].address
      },
      // 进行数据更新
      markers: that.data.markers
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.k)
    wx.setNavigationBarTitle({
      title: '周边' + options.k,
    })
    const that = this
    amap.map.getPoiAround({
      querykeywords: options.k,
      success: function(data){
        //成功回调
        data.markers.forEach(marker => {
          marker.iconPath = '/static/images/location.png'
          marker.width = 40
          marker.height = 40
        })
        console.log(data)

        that.setData({
          poisData: data.poisData,
          markers: data.markers
        })
        that.setData({
          setting: {
            scale: 14,
            // style: 'width: 100%; height: 160px;',
            latitude: wx.getStorageSync('latitude'),
            longitude: wx.getStorageSync('longitude'),
          }
        })
        // console.log(data.poisData)
        that.setData({
          markerText: {
            name: that.data.poisData[0].name,
            address: that.data.poisData[0].address
          }
        })
      },
      fail: function(info){
        //失败回调
        console.log(info)
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

  }
})