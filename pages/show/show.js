// pages/show/show.js
Page({
  data:{
    id:"",
    text:"",
    indicator:true,
    tap:"a",
    ballTop:'',
    ballLeft:'',
    windowHeight:'',
    windowWidth:'',
    newDay:'',
    newTime:'',
    time:'',
    userInfo:'',
    isLogin:"",
    color:'',
    joinedId:[],
    isJoin:false,
    outdate:false,
    lists:'',
    newLists:''
  },
  onLoad:function(options){
    let _this=this;
    wx.setNavigationBarTitle({
      title: '活动详情'
    });
    this.setData({
      id:options.id,
    });
    wx.getStorage({
      key:'newLists',
      success:function(res){
        _this.getData(res,_this)
      },
      fail:function(){
        wx.getStorage({
          key: 'lists',
          success: function(res){
            _this.getData(res,_this)
          }
        });
      }
    });
    wx.getStorage({
      key:'myActivities',
      success: function(res){
        if((res.data).some((x)=>x==options.id)){
            _this.setData({
              isJoin:true,
              color:"#b2b2b2"
            })
          }
        _this.setData({
          joinedId:res.data
        })
      }
    });
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          windowWidth:res.windowWidth,
          windowHeight:res.windowHeight,
          ballTop:res.windowHeight-100,
          ballLeft:res.windowWidth-80
        })
      }
    });
    wx.getStorage({
      key: 'userInfo',
      success: function(res){
        _this.setData({
          isLogin:true
        })
      },
      fail: function(res) {
        _this.setData({
          isLogin:false
        })
      }
    })
  },
  onShow:function(){
    let _this=this;
    if((_this.data.joinedId).some((x)=>x==_this.data.id)){
      _this.setData({
        isJoin:true,
        color:"#b2b2b2"
      })
    }
  },
  forHome:function(){
    wx.switchTab({
      url: '../home/home', 
    })
  },
  forJoin:function(){
    let _this=this;
    if(this.data.isLogin){
      if(this.data.time>0){
        if(_this.data.joinedId.length!=0){
          if((_this.data.joinedId).some((x)=>x==_this.data.id)){
              wx.navigateTo({
                url: '../huodong/huodong?view=true'
              })
          }else{
            wx.navigateTo({
              url: '../join/join?id='+this.data.id
            })
          }
        }else{
            wx.navigateTo({
              url: '../join/join?id='+this.data.id
            })
        }
      }
    }else{
      wx.switchTab({
        url: '../login/login'
      })
    }
  },
  onShareAppMessage: function () {
    if(this.data.isJoin==true){
      return {
        title: "我参加了"+this.data.title+'!\n你也来看看吧！',
        path: 'pages/show/show?id='+this.data.id
      }
    }else{
      return {
        title: this.data.title,
        path: 'pages/show/show?id='+this.data.id
      }
    }
  },
  tapShow:function(e){
    let _e=e.target.id;
    let _this=this;
    wx.getStorage({
      key: 'lists',
      success: function(res){
        let a,b,c,d;
        for(let i=0;i<res.data.length;i++){
          if(res.data[i].id==_this.data.id){
            a=res.data[i].a;
            b=res.data[i].b;
            c=res.data[i].c;
            d=res.data[i].d;
          }
        }
        switch(_e){
          case "a":
            _this.setData({
              text:a,
              tap:'a'
            })
            break;
          case "b":
            _this.setData({
              text:b,
              tap:'b'
            })
            break;
          case "c":
            _this.setData({
              text:c,
              tap:'c'
            })
            break;
          case "d":
            _this.setData({
              text:d,
              tap:'d'
            })
            break
        }
      }
    })
    
  },
  ballMoveEvent:function(e){
    let _this=this;
    if(e.touches[0].pageY-23<0)return;
    if(e.touches[0].pageX-60<0)return;
    if(e.touches[0].pageY+80>this.data.windowHeight)return;
    if(e.touches[0].pageX>this.data.windowWidth)return;
    this.setData({
      ballTop:e.touches[0].pageY-23,
      ballLeft:e.touches[0].pageX-60
    })
  },
  getData:function(res,_this){
    for(let index in res.data){
      if(res.data[index].id==_this.data.id){
        setTimeout(function(){
          let nowd=new Date().getTime();
          let thend=new Date(res.data[index].date).getTime();
          let num=((thend-nowd)/24/60/60/1000).toFixed(2);
          let minu=num.toString().split('.')[1];
          let time=((thend-nowd)/24/60/60/1000).toFixed(1);
          let newDay=((thend-nowd)/24/60/60/1000).toFixed(0)
          let newTime=(minu*24/100).toFixed(0);
          if(((thend-nowd)/24/60/60/1000).toFixed(1)<=0){
            _this.setData({
              outdate:true
            })
          }
          _this.setData({
            time:time,
            newDay:newDay,
            newTime:newTime
          })
        },100)
        _this.setData({
          lists:res.data[index],
          text:res.data[index].a
        })
        if(res.data[index].imageUrl.length<=1){
          _this.setData({
            indicator:false
          })
        }
      }
    }
  }
})