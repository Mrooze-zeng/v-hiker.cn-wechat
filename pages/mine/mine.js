// pages/mine/mine.js
Page({
  data:{
    userInfo:'',
    mine:'',
    height:'',
    width:'',
    minwidth:'',
    code:'',
    isFocus:true,
    myActivities:'',
    idHide:false
  },
  onLoad:function(options){
    this.getData();
    let _this=this;
    wx.getStorage({
      key: 'mine',
      success: function(res){
        _this.setData({
          mine:res.data,
          code:options.code,
          isFocus:false
        })
      },
      fail:function(res){
        _this.setData({
          isFocus:true
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
    // wx.getStorage({
    //   key:'newLists',
    //   success:function(res){
    //     _this.getData(res,_this)
    //   },
    //   fail:function(){
    //     wx.getStorage({
    //       key: 'lists',
    //       success: function(res){
    //         _this.getData(res,_this)
    //       }
    //     });
    //   }
    // });
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          height:res.windowHeight+"px",
          width:res.windowWidth+"px",
          minwidth:res.windowWidth-20+"px"
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '个人资料'
    })
  },
  formSubmit:function(data){
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
        wx.setStorage({
          key: 'mine',
          data: data.detail.value,
          success: function(res){
            wx.showToast({
              title: '保存成功！',
              icon: 'success',
              duration: 1000
            })
            setTimeout(function(){
              wx.navigateBack({
                delta: 1, // 回退前 delta(默认为1) 页面
              })
            },1500)
          }
        })
      }
  },
  getData:function(){
    let _this=this;
    wx.getStorage({
      key: 'myActivities',
      success: function(res){
        _this.setData({
          isHide:true
        })
      },
      fail: function(res) {
        _this.setData({
          isHide:false
        })
      }
    })
  },
  back:function(){
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  }
  // input:function(){
  //   if(this.data.isHide==false){
  //     wx.showToast({
  //       title: '有活动正在进行，不可修改个人资料！',
  //       icon: 'loading',
  //       duration: 1000            
  //     })
  //     setTimeout(function(){
  //       wx.navigateBack({
  //         delta: 1, // 回退前 delta(默认为1) 页面
  //       })
  //     },1000)
  //   }
  // },
  // getData:function(res,_this){
  //   let cellect=[];
  //   cellect=res.data.map(function(x){
  //     return x.isHide;
  //   })
  //   console.log(cellect)
  //   if(cellect.some((x)=>x=="true")){
  //     _this.setData({
  //       isHide:false
  //     })
  //   }
  // }
})