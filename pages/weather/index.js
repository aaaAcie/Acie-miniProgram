// pages/weather/index.js
const API = require('../../utils/api')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    now: {},
    // setting: {},
    latitude: wx.getStorageSync('latitude'),
    longitude: wx.getStorageSync('longitude'),
    threeDays: [],
    intersts: ['美食','酒店','加油站','银行','地铁','公交站','医院','公园']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    console.log(this.data.latitude,this.data.longitude)
    this.initAPI()
  },
  initAPI() {
    const that = this
    let data = {
      location: that.data.longitude + ',' + that.data.latitude
    }
    API.nowWeather(data).then((res) => {
      if(res.data.code=="200"){
        // const {now} = res.data
        that.setData({
          now: res.data.now
        })
        console.log(that.data.now)
      }
    }).catch((res) => console.log(res))

    API.threeDaysWeather(data).then((res)=> {
      if(res.data.code=="200"){
        // const {now} = res.data
        that.setData({
          threeDays: res.data.daily
        })
        console.log(that.data.threeDays)
      }
    })
  },
  goInterst(e) {
    // console.log(e.currentTarget.dataset.k)
    if(e.currentTarget.dataset.k){
      wx.navigateTo({
        url: '/pages/weather/map?k=' + e.currentTarget.dataset.k,
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

  }
})