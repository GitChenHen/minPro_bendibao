// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [],
    list: [],
    // 定义一个存储id的变量
    id: "",
    // 分页请求的页数
    page: 1,
    // 每一页的显示条数
    limit: 8,
    // 定义一个标识
    flag: true
  },


  /**
   * 获取详情页面的函数
   */
  handleDetail(e){
    // listdetail 跟 自身自定义的listDetail 不一样，坑很大 要敢于debug 控制台输出调试代码
    var data = e.currentTarget.dataset.listdetail;
    // 把数据缓存到本机中
    console.log(e)
    wx.setStorage({
      key: 'listDetail',
      data   //data跟自定义的data变量一致 所以不用设置值
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //options里面存储页面跳转过来所携带的信息
    // console.log(options)
    //$.ajax({url:'',type:'get'})
    // 把options中获取的id写入data的id
    this.setData({
      id: options.id
    });
    wx.request({
      url: `https://locally.uieee.com/categories/${this.data.id}/shops`,
      method: 'GET',
      //传递给后台的数据
      data: {
        // x: '_page',
        // y: '_limit'
        _page: this.data.page,
        _limit: this.data.limit
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      //箭头函数时为了把这个函数里的this指向外层
      success: (res) => {
        this.setData({
          shopList: res.data
        });
        console.log(res.data)
      }
    });
    // 动态设置页面导航的标题
    wx.setNavigationBarTitle({
      title: options.title,
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // 1. 每次上拉的时候，发送请求获取数据
    // 2. 拿到的数据，先把list从data里面获取，然后追加到list的后面，最后再把追加完的list写入data
    // 3. 每一次往上拉的时候，this.data.page 就要+1，加完之后继续写回data（这个需求要在请求之前处理）
    //  4. 当上拉加载值，返回的res.data的长度如果小于 每页显示的条数this.data.limit,则证明数据已经加载完毕

    // 定义一个标识,如果在这里定义的话，每一次上滑就会重新执行onREachBottom事件，flag就重新设置为true，这个flag需要定义在data里面
    if (this.data.flag) {
      var page = this.data.page;
      console.log("当前是第" + page + "页")
      // 模板字符串``  在里面如果有变量，就使用${}包裹
      // console.log(`当前是第${page}页`)
      page++; //自加一
      this.setData({
        page
      })
    } else {
      // 当flag为false的时候，证明已经没有数据了
      wx.showToast({
        title: '亲，已经到底了~',
        icon: "none"
      })
      return;
    }

    // 发送请求，获取数据
    // 模板字符串``  在里面如果有变量，就使用${}包裹
    wx.request({
      url: `https://locally.uieee.com/categories/${this.data.id}/shops`,
      method: 'GET',
      //传递给后台的数据
      data: {
        _page: this.data.page,
        _limit: this.data.limit
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res.data)
        //  2. 拿到的数据，先把list从data里面获取，然后追加到list的后面，最后再把追加完的list写入data
        var list = this.data.shopList;
        //es6语法 遍历数据推荐使用
        // var list = [...this.data.list,...res.data]
        for (var i = 0; i < res.data.length; i++) {
          list.push(res.data[i]);
        }
        //把数据写入data全局变量中
        this.setData({
          shopList: list
        });
        if (res.data.length < this.data.limit) {
          this.setData({
            flag: false
          })
        }
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})