// pages/join/join.js
Page({
  data:{
    id:'',
    list:'',
    lists:'',
    mine:'',
    userInfo:'',
    height:'',
    width:'',
    minwidth:'',
    isshow:true,
    myActivities:[],
    joinedNum:''
  },
  onLoad:function(options){
    let _this=this;
    this.setData({
      id:options.id
    })
    wx.setNavigationBarTitle({
      title: '活动报名'
    })
    wx.getStorage({
      key: 'newLists',
      success: function(res){
        _this.getData(res,_this,options)
      },
      fail: function(res) {
        wx.getStorage({
          key: 'lists',
          success: function(res){
            _this.getData(res,_this,options)
          }
        })
      }
    })

    wx.getStorage({
      key: 'mine',
      success: function(res){
        _this.setData({
          mine:res.data
        })
      }
    })
    wx.getStorage({
      key: 'userInfo',
      success: function(res){
        _this.setData({
          userInfo:res.data
        })
      }
    })
    wx.getStorage({
      key: 'myActivities',
      success: function(res){
        if(res.data.indexOf(_this.data.id)!=-1){
          wx.showToast({
            title: '不可重复报名！',
            icon: 'loading',
            duration: 600            
          })
          setTimeout(function(){
            wx.switchTab({
              url: '../home/home',
            })
          },599)
        }
        _this.setData({
          myActivities:res.data,
          isshow:true
        })
      }
    })
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          height:res.windowHeight+"px",
          width:res.windowWidth+"px",
          minwidth:res.windowWidth-20+"px"
        })
      }
    })
  },
  show:function(e){
    if(e.detail.value.lenght!=0){
      this.setData({
        isshow:false
      })
    }else{
      this.setData({
        isshow:true
      })
    }
  },
  formSubmit:function(data){
    let _this=this;
    let arr=[];
    for(let value in data.detail.value){
      arr.push(data.detail.value[value])
    }
    if(arr.some(function(x){return x==""})){
        wx.showToast({
          title: '所有选项为必填项！',
          icon: 'loading',
          duration: 1000
        })
    }else if(data.detail.value.idcard.length<18){
        wx.showToast({
          title: '身份证号码为18位数字！',
          icon: 'loading',
          duration: 1000
        })
    }else if(data.detail.value.phone.length<11||data.detail.value.lianxiphone.length<11){
        wx.showToast({
          title: '手机号码为11位数字！',
          icon: 'loading',
          duration: 1000
        })
    }else{
      wx.showModal({
        title: '提示！',
        content: '确定你的报名信息正确吗？一旦报名成功则无法取消，且个人信息无法修改！',
        success: function(res) {
          if (res.confirm) {
            wx.setStorage({
              key: 'mine',
              data: data.detail.value,
              success: function(res){
                wx.showToast({
                  title: '报名成功！',
                  icon: 'success',
                  duration: 1000
                })
                let count=_this.data.joinedNum+1
                for(let index in _this.data.lists){
                  if(_this.data.lists[index].id==_this.data.id){
                    _this.data.lists[index].joinedNum=count;
                  }
                }
                let newLists=_this.data.lists;
                wx.setStorage({
                  key: 'myActivities',
                  data: _this.data.myActivities.concat([_this.data.id]),
                })
                wx.setStorage({
                  key:"newLists",
                  data:newLists
                })
                setTimeout(function(){
                    wx.navigateBack({
                      delta: 1, // 回退前 delta(默认为1) 页面
                    })
                },1000)
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  back:function(){
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },
  getData:function(res,_this,options){
    for(let index in res.data){
      if(res.data[index].id==options.id){
       return _this.setData({
          list:res.data[index],
          lists:res.data,
          joinedNum:res.data[index].joinedNum
        })
      }
    }
  }
})