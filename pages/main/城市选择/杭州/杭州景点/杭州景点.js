Page({
  onShow() {
    wx.reportAnalytics('enter_home_programmatically', {})
  },


  onShareAppMessage() {
    return {
      title: '山一程水一程',
      path: 'page/component/index'
    }
  },


  data: {
    list: [
      {
        id: '西湖',
        name: '西湖',
        open: false,
        pages: ['简介','情况','地图','评论']
      }, {
        id: 'lingyinsi',
        name: '灵隐寺',
        open: false,
        pages: ['简介', '情况', '地图', '评论']
      },
      {
        id: 'lingyinsi',
        name: '岳庙',
        open: false,
        pages: ['简介', '情况', '地图', '评论']
      },
      {
        id: 'lingyinsi',
        name: '西溪湿地',
        open: false,
        pages: ['简介', '情况', '地图', '评论']
      },
      {
        id: 'lingyinsi',
        name: '良渚遗址',
        open: false,
        pages: ['简介', '情况', '地图', '评论']
      },
    
    ]
  },


  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    for (let i = 0, len = list.length; i <      len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list
    })
    wx.reportAnalytics('click_view_programmatically', {})
  }
})
