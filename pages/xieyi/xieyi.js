// pages/xieyi/xieyi.js
Page({
  data:{
    height:'',
    width:''
  },
  onLoad:function(options){
    let _this=this;
    wx.setNavigationBarTitle({
      title: 'XXX协议',
    })
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          height:res.windowHeight-60+"px",
          width:res.windowWidth-60+"px",
        })
      }
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