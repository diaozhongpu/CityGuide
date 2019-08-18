//form.js

Page({
  data: {
    talks: [],
    touchStart: 0,
    inputValue: '',
    inputBiaoqing: '',
    faces: ['https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1566108410&di=8e0053e7fbb32341d0ae8caf98e347bb&src=http://b-ssl.duitang.com/uploads/item/201411/10/20141110082413_Ssjyz.thumb.700_0.jpeg', 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1566108410&di=4486c0cf11e3b8be287c0646a14f1893&src=http://b-ssl.duitang.com/uploads/item/201411/10/20141110084037_R2Hyx.jpeg', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3133392387,704141259&fm=26&gp=0.jpg','https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100073575,2501831933&fm=26&gp=0.jpg'],
    names: ['小明', '李先生', '王小姐', '赵女士'],
    isShow: false, //控制emoji表情是否显示 
    isLoad: true, //解决初试加载时emoji动画执行一次
    cfBg: false,
    emojiChar: "☺-😋-😌-😍-😏-😜-😝-😞-😔-😪-😭-😁-😂-😃-😅-😆-👿-😒-😓-😔-😏-😖-😘-😚-😒-😡-😢-😣-😤-😢-😨-😳-😵-😷-😸-😻-😼-😽-😾-😿-🙊-🙋-🙏-✈-🚇-🚃-🚌-🍄-🍅-🍆-🍇-🍈-🍉-🍑-🍒-🍓-🐔-🐶-🐷-👦-👧-👱-👩-👰-👨-👲-👳-💃-💄-💅-💆-💇-🌹-💑-💓-💘-🚲",
    //0x1f---
    emoji: [
      "60a", "60b", "60c", "60d", "60f",
      "61b", "61d", "61e", "61f",
      "62a", "62c", "62e",
      "602", "603", "605", "606", "608",
      "612", "613", "614", "615", "616", "618", "619", "620", "621", "623", "624", "625", "627", "629", "633", "635", "637",
      "63a", "63b", "63c", "63d", "63e", "63f",
      "64a", "64b", "64f", "681",
      "68a", "68b", "68c",
      "344", "345", "346", "347", "348", "349", "351", "352", "353",
      "414", "415", "416",
      "466", "467", "468", "469", "470", "471", "472", "473",
      "483", "484", "485", "486", "487", "490", "491", "493", "498", "6b4"
    ],
    emojis: [], //qq、微信原始表情
    alipayEmoji: [], //支付宝表情


  },

  onLoad: function () {


    var em = {},
      that = this,
      emChar = that.data.emojiChar.split("-");
    var emojis = []
    that.data.emoji.forEach(function (v, i) {
      em = {
        char: emChar[i],
        emoji: "0x1f" + v
      };
      emojis.push(em)
    });
    that.setData({
      emojis: emojis
    })
  },




  //解决滑动穿透问题
  emojiScroll: function (e) {
    console.log(e)
  },
  //点击表情显示隐藏表情盒子
  emojiShowHide: function () {
    this.setData({
      isShow: !this.data.isShow,
      isLoad: false,
      cfBg: !this.data.false
    })
  },
  //表情选择
  emojiChoose: function (e) {
    console.log(e)
    //当前输入内容和表情合并
    // let value = e.currentTarget.dataset.emoji;
    this.data.inputBiaoqing += e.currentTarget.dataset.emoji;
    console.log(this.data.inputBiaoqing)
    this.setData({
      inputValue: this.data.inputBiaoqing
    })
  },
  //点击emoji背景遮罩隐藏emoji盒子
  cemojiCfBg: function () {
    console.log('womenlai')
    this.setData({
      isShow: false,
      cfBg: false
    })
  },
  onReady: function () {
    // 评论弹出层动画创建
    this.animation = wx.createAnimation({
      duration: 400, // 整个动画过程花费的时间，单位为毫秒
      timingFunction: "ease", // 动画的类型
      delay: 0 // 动画延迟参数
    })
  },
  showTalks: function () {
    // 加载数据
    this.loadTalks();
    // 设置动画内容为：使用绝对定位显示区域，高度变为100%
    this.animation.bottom("0rpx").height("100%").step()
    this.setData({
      talksAnimationData: this.animation.export()
    })
  },

  hideTalks: function () {
    // 设置动画内容为：使用绝对定位隐藏整个区域，高度变为0
    this.animation.bottom("-100%").height("0rpx").step()
    this.setData({
      talks: [],
      talksAnimationData: this.animation.export()
    })
  },

  // 加载数据
  loadTalks: function () {
    // 随机产生一些评论
    wx.showNavigationBarLoading();
    let that = this;
    let talks = [];
    let faces = ['https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1566108410&di=8e0053e7fbb32341d0ae8caf98e347bb&src=http://b-ssl.duitang.com/uploads/item/201411/10/20141110082413_Ssjyz.thumb.700_0.jpeg', 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1566108410&di=4486c0cf11e3b8be287c0646a14f1893&src=http://b-ssl.duitang.com/uploads/item/201411/10/20141110084037_R2Hyx.jpeg', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3133392387,704141259&fm=26&gp=0.jpg', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100073575,2501831933&fm=26&gp=0.jpg'];
    let names = ['小明', '李先生', '王小姐', '赵女士', '匿名用户'];
    let contents = ['杭州的西湖景色很美！', '推荐南京到上海的高铁，很快~', '我们都有旅行的梦想', '希望攻略能够越做越好！'];
    let talktime = '刚刚';
    console.log(talktime)
    talks = talks.concat(that.data.talks);

    // 随机产生10条评论
    for (var i = 0; i < 10; i++) {
      talks.push({
        avatarUrl: faces[Math.floor(Math.random() * faces.length)],
        nickName: names[Math.floor(Math.random() * names.length)],
        content: contents[Math.floor(Math.random() * contents.length)],
        talkTime: talktime
      });
    }
    this.setData({
      talks: talks,
      talksAnimationData: that.animation.export()
    })
    wx.hideNavigationBarLoading();
  },

  onScrollLoad: function () {
    // 加载新的数据
    this.loadTalks();
  },
  //下拉评论框隐藏
  touchStart: function (e) {
    let touchStart = e.touches[0].clientY;
    this.setData({
      touchStart,
    })
  },
  touchMove: function (e) {
    // console.log(this.data.touchStart)
    let touchLength = e.touches[0].clientY - this.data.touchStart;
    console.log(touchLength - 100)
    if (touchLength > 100) {
      this.animation.bottom("-100%").height("0rpx").step()
      this.setData({
        talks: [],
        talksAnimationData: this.animation.export(),
      })
    }
  },
  //输入框失去焦点时触发
  bindInputBlur: function (e) {
    console.log(e)
    console.log(this.data.inputBiaoqing)
    this.data.inputValue = e.detail.value + this.data.inputBiaoqing;
  },
  //点击发布，发布评论
  faBu: function () {
    let that = this;
    this.data.talks.unshift({
      avatarUrl: this.data.faces[Math.floor(Math.random() * this.data.faces.length)],
      nickName: this.data.names[Math.floor(Math.random() * this.data.names.length)],
      content: this.data.inputValue,
      talkTime: '刚刚'
    })
    that.data.inputValue = '';
    that.setData({
      talks: that.data.talks,
      inputValue: that.data.inputValue,
      talksAnimationData: that.animation.export()
    })

  }
})