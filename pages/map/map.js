// pages/map/map.js
const amap = require('../../utils/amap-config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: '',
    tips: []
  },
  showInput() {
    this.setData({
      inputShowed: true,
    });
  },
  hideInput() {
    this.setData({
      inputVal: '',
      inputShowed: false,
    });
  },
  clearInput() {
    this.setData({
      inputVal: '',
    });
  },
  inputTyping(e) {
    console.log(e)
    this.setData({
      inputVal: e.detail.value,
    })
    this.keyword(e.detail.value)
  },
  keyword(k){
    const that = this
    amap.map.getInputtips({
      keywords: k,
      location: wx.getStorageSync('userLocation'),
      success: function(data){
        console.log(data)
        if(data && data.tips){
          that.setData({
            tips: data.tips
          })
        }
      }
    })
  },
  goRoute(e){
    if(e.currentTarget.dataset.destination){
      wx.navigateTo({
        url: '/pages/route/walking?destination=' + e.currentTarget.dataset.destination + '&name=' + e.currentTarget.dataset.name
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    amap.map.getRegeo({
      success(res) {
        console.log(res)
        const city = res[0].name.split('市')[0]
        // console.log(city)
        wx.setStorageSync('city', city)
        that.setData({
          des: res[0],
          setting: {
            scale: 14,
            // style: 'width: 100%; height: 160px;',
            latitude: wx.getStorageSync('latitude'),
            longitude: wx.getStorageSync('longitude'),
            markers: [{
              id: 0,
              iconPath: wx.getStorageSync('avatar') || '/static/images/location.png',
              width: 40,
              height: 40,
              callout: {
                'display': 'ALWAYS',
                'fontsize': '30rpx',
                'content': wx.getStorageSync('nickName'),
                'boxShadow': '0 0 5rpx #333',
                'padding': '8rpx'
              },
              latitude: wx.getStorageSync('latitude'),
              longitude: wx.getStorageSync('longitude'),
            }]
          }
        })
      },
      fail(res) {
        console.log('Fail   ',res)
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