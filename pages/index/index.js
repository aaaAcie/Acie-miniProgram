// index.js
// 获取应用实例
const app = getApp()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({
  data: {
    motto: 'Have A Good Day : )',
    avatarUrl: wx.getStorageSync('avatar') || defaultAvatarUrl,
    nickName: wx.getStorageSync('nickName') || ''
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
    wx.setStorageSync('avatar', avatarUrl)
  },
  bindInput(e){
    this.setData({
      nickName: e.detail.value,
    })
    wx.setStorageSync('nickName', e.detail.value)
  },
  onLoad() {
    
  }
})
