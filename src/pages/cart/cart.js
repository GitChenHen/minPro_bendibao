// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editText:"编辑",  //编辑按钮
    singleCheck:false,//单选按钮
    allCheck:false,   //全选按钮
    cartList:[],      //购物车列表
    sumMoney:1000     //结算金额
  },

  /**
   * 封装计算金额的总价
   */
  getAllPrice(){
    //结算累计
    var price = 0;
    //取出所有的商品列表
    var arrList = this.data.cartList;
    arrList.forEach((item, index) => {

    })
  },

  /**
   * 点击编辑按钮函数
   */
  handleEdit(){
    // 三元表达式 a ? b : c => a为true时值为b;false时为c
    var txt = this.data.editText == "编辑" ? "完成" : "编辑"
    this.setData({
      editText : txt
    })
  },

  /**
   * 购物车单选按钮操作函数
   */
  handleSingle(e){
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var arr = this.data.cartList;
    arr[index].singleCheck = !arr[index].singleCheck
    console.log(arr[index].singleCheck)
    //把编辑好的购物车商品重新加入列表中
    this.setData({
      cartList: arr
    });
    //反证法
    //假设全选按钮时选中的
    var flag = true;
    arr.forEach((item,index)=>{
      if(item.singleCheck == false){
        //出现一个不选中的状态 推翻假设
        flag = false; 
        return;       
      }      
    });
    // 法一
    this.setData({
      allCheck: flag
    })
    // 法二
    // 通过全选中的结果来决定全选按钮是否为选中
    // if(flag){
    //   this.setData({
    //     allCheck:true
    //   })
    // }else{
    //   this.setData({
    //     allCheck:false
    //   })
    // }    
    //调用计算总价函数
    this.getAllPrice();
  },
  
   /**
   * 购物车底部全选按钮操作函数
   */
  //法一
  handleAllCheck(){
    console.log(this.data.allCheck)
    if(this.data.allCheck == false){
      this.setData({
        allCheck:true,
        singleCheck:true
      })
    }else{
      this.setData({
        allCheck: false,
        singleCheck: false
      })
    }
    //调用计算总价函数
    this.getAllPrice();
  },
  //法二
  // handleAllCheck(){
  //   var allCheck = !this.data.allCheck
  //   this.setData({
  //     allCheck
  //   })
  //   //修改所有单选按钮
  //   var arr = this.data.cartList;
  //   arr.forEach((item,index)=>{
  //     item.singleCheck = allCheck      
  //   })
  //   this.setData({
  //     cartList: arr
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //注意  设置从本地缓存中取出数据时，在没有刷新时是无法更数据的，所以在onShow():function(options){}更好使用
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getStorage({
      key: 'cartList',
      success: (res)=> {
        console.log(res.data)
        this.setData({
          cartList:res.data          
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})