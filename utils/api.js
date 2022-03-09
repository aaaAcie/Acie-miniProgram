const base_url = 'https://devapi.qweather.com/v7/weather'
const key = '489490ee27524ccbb26492962db71dc2'

const request = (url, method, data) => {
  data.key = key
  return new Promise((resovle, reject) => {
    wx.request({
      url: url,
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: method,
      success: (result) => {resovle(result)},
      fail: (res) => {reject(res)},
    })
  })
}

module.exports = {
  nowWeather: (data) => {
    return request(base_url + '/now', 'get', data)
  },
  threeDaysWeather: (data) => {
    return request(base_url + '/3d', 'get', data)
  }
}