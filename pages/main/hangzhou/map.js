Page({
  data: {
    markers: [{
      iconPath: "/pages/picture/zju.jpg",
      id: 0,
      latitude: 30.30200,
      longitude: 120.07965,
      width: 50,
      height: 50
    }],
    controls: [{
      id: 1,
      iconPath: '/pages/picture/logo.jpg',
      position: {
        left: 0,
        top: 50 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  GoToPage: function(param){
    wx.navigateTo({
      url: '/pages/main/hangzhou/hangzhou',
    })
  }
})