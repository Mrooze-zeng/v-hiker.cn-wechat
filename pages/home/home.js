// pages/home/home.js
  let X1=0;
  let X2=0;
  let Y1=0;
  let Y2=0;
  var animation = wx.createAnimation({
  duration: 600,
  transformOrigin:"0",
  timingFunction: 'ease',
})
Page({
  data: {
    lists:[],
    newLists:[],
    ballTop:'',
    ballLeft:'',
    windowHeight:'',
    windowWidth:'',
    animationData:{}
  },
  onLoad:function(){
    let _this=this;
    wx.getStorage({
      key:'newLists',
      success:function(res){
        _this.getData(res,_this)
      },
      fail:function(res){
        wx.getStorage({
          key: 'lists',
          success: function(res){
            _this.getData(res,_this)
          }
        })
      }
    })
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          windowWidth:res.windowWidth,
          windowHeight:res.windowHeight
        })
      }
    })
  },
  ballMoveEvent:function(e){
    let _this=this;
    if(e.touches[0].pageY-23<0)return;
    if(e.touches[0].pageX-60<0)return;
    if(e.touches[0].pageY+30>this.data.windowHeight)return;
    if(e.touches[0].pageX>this.data.windowWidth)return;
    this.setData({
      ballTop:e.touches[0].pageY-23,
      ballLeft:e.touches[0].pageX-60
    })
  },
  start:function(e){
   X2=e.touches[0].pageX;
   Y2=e.touches[0].pageY;
  },
  move:function(e){
    X1=e.touches[0].pageX;
    Y1=e.touches[0].pageY;
    if((X2-X1)>this.data.windowWidth/4){
      this.animation = animation
      animation.translate(-25,25).opacity(0.6).step()

      this.setData({
        animationData:animation.export()
      })
      setTimeout(this.switchcase,599)
    }
  },
  switchcase:function(){
    wx.switchTab({
      url: '../login/login',
    })
      animation.translate(0,0).opacity(1).step()

      this.setData({
        animationData:animation.export()
      })
  },
  getData:function(res,_this){
    let newRes=res.data;        
    let dateBox=[];
    for(let index in newRes){
      let nowd=(new Date().getTime())-(new Date(newRes[index].date).getTime())//判断活动是否过期
      if(nowd>0){
        newRes[index].isHide='true';
      }
    }
    //活动排序；
    let b=newRes.sort(function(a,b){
      let i=a.date;
      let e=b.date;
      if(i>e)return -1;
      if(i<e)return 1;
      return 0;
    })
    wx.setStorage({
      key: 'lists',
      data: newRes,
    })
    _this.setData({
      lists:newRes,
      ballTop:_this.data.windowHeight-80,
      ballLeft:_this.data.windowWidth-80
    })
  }
})