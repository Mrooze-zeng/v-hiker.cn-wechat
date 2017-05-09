// pages/huodong/huodong.js
Page({
  data:{
    height:'',
    avater:'',
    nickname:'',
    width:"",
    lists:"",
    myActivities:[],
    view:false
  },
  onLoad:function(options){
    let _this=this;
    this.setData({
      view:options.view
    })
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          height:res.windowHeight+'px',
          width:res.windowWidth+"px"
        })
      }
    })
    wx.getStorage({
      key: 'userInfo',
      success: function(res){
        _this.setData({
          avater:res.data.avatarUrl,
          nickname:res.data.nickName
        })
      }
    })
    wx.getStorage({
      key: 'myActivities',
      success: function(res){
        _this.setData({
          myActivities:res.data
        })
      }
    })
    wx.getStorage({
      key: 'newLists',
      success: function(res){
        _this.getData(res,_this);
      },
      fail: function(res) {
        wx.getStorage({
          key: 'lists',
          success: function(res){
            _this.getData(res,_this);
          }
        })   
      }
    })
    wx.setNavigationBarTitle({
      title: '我报名的活动'
    })
  },
  navigator:function(e){
    if(this.data.view=='false'){
      wx.navigateTo({
        url: "../show/show?id="+e.currentTarget.id
      })
    }else{
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
      })
    }
  },
  getData:function(res,_this){
    let box=[];
    for(let index in res.data){
      for (let item in _this.data.myActivities){
        if(res.data[index].id==_this.data.myActivities[item]){
          box=box.concat(res.data[index])
        }
      }
    }
    _this.setData({
      lists:box
    })
  }
})