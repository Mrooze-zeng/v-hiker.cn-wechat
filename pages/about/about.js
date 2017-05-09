// pages/about/about.js
Page({
  data:{
    height:''
  },
  onLoad:function(options){
    let _this=this;
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          height:res.windowHeight+"px"
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '关于俱乐部'
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})