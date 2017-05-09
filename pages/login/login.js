// pages/login/login.js
  let X1=0;
  let X2=0;
  let Y1=0;
  let Y2=0;
  var animation = wx.createAnimation({
  duration: 600,
  transformOrigin:"100%",
  timingFunction: 'ease',
})  
var app = getApp();
Page({
  data:{
    userInfo:'',
    isLogin:'false',
    height:"100%",
    windowWidth:''
  },
  onLoad:function(options){
    let _this=this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res){
        _this.setData({
          isLogin:"true",
          userInfo:res.data
        })
        wx.setNavigationBarTitle({ 
          title: '个人中心'
        });
      },
      fail: function(res) {
        _this.setData({
          isLogin:"false"
        })
        wx.setNavigationBarTitle({
          title: '登录'
        });
      },
    })
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          height:res.windowHeight+"px",
          windowWidth:res.windowWidth
        })
      }
    })

  }, 
  login:function(){
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      wx.setStorage({
        key: 'userInfo',
        data: userInfo,
        success: function(res){
          that.setData({
            isLogin:'true'
          })
          wx.setNavigationBarTitle({ 
            title: '个人中心'
          });
        }
      })
    })
  },
  mine:function(e){
    wx.navigateTo({
      url: '../mine/mine?code='+e.target.id
    })
  },
  huodong:function(){
    wx.navigateTo({
      url: '../huodong/huodong?view=false'
    })
  },
  about:function(){
    wx.navigateTo({
      url: '../about/about'
    })
  },
  start:function(e){
   X2=e.touches[0].pageX;
   Y2=e.touches[0].pageY;
  },
  // move:function(e){
  //   X1=e.touches[0].pageX;
  //   Y1=e.touches[0].pageY;
  //   if((X1-X2)>this.data.windowWidth/3){
  //     wx.switchTab({
  //       url: '../home/home',
  //     })
  //   }
  // }
  move:function(e){
    X1=e.touches[0].pageX;
    Y1=e.touches[0].pageY;
    if((X1-X2)>this.data.windowWidth/4){
      this.animation = animation
      animation.translate(25,25).opacity(0.6).step()

      this.setData({
        animationData:animation.export()
      })
      setTimeout(this.switchcase,599)
    }
  },
  switchcase:function(){
    wx.switchTab({
      url: '../home/home',
    })
      animation.translate(0,0).opacity(1).step()

      this.setData({
        animationData:animation.export()
      })
  },
})