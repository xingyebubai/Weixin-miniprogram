// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 商品种类的url链接
        urls: [
            "/imgs/banner1.jpg",
            "/imgs/banner2.jpg",
            "/imgs/banner3.jpg",
            "/imgs/banner4.jpg",
            "/imgs/banner5.jpg",
            "/imgs/banner6.jpg",
            "/imgs/banner7.jpg",
            "/imgs/banner8.jpg",
            "/imgs/banner9.jpg",
            "/imgs/banner10.jpg",
        ],
        // 所有产品的信息
        products: [],

        // 分类产品信息
        products_list: [],
        // 热销榜
        hot_products_cate_id: 0,
        hot_products_cate_list: [],


    },
    gotoProductDetails: function (event) {
      var target_id = event.currentTarget.dataset.id;
      wx.navigateTo({
          url: "/pages/details/details?id=" + target_id,
      })  
    },

    gotoProductCategory: function (event) {
        var target_id = event.currentTarget.dataset.id;
        // console.log(target_id);
        wx.navigateTo({
            url: "/pages/category/category?cateId=" + target_id,
        })

    },
    // 因为数据框中没有设计图片url, 所以这里需要拼接一个url
    processProducts: function (obj) {
        var ret = [];
        var i = 0;
        for (let item of obj) {
            if (item.catename == "热销榜") continue;

            item.url = this.data.urls[i++];
            ret.push(item);
        }
        return ret;
    },

    /**
     * 生命周期函数--监听页面加载
     */
  
    requestGoodsByCateId: function() {
        wx.request({
            url: 'http://192.168.5.31:8080/goods/queryByCateId',
            method: "GET",
            data: {
                cateId: this.data.hot_products_cate_id,
                // cateId: 47,
            },
            success: (res) => {
                this.setData({
                    hot_products_cate_list: res.data.data,
                })
            }
        })
    },
    onLoad: function (options) {
        var processed_products;
        wx.request({
            url: "http://192.168.5.31:8080/cate/queryAll",
            method: "GET",
            success: res => {
                processed_products = this.processProducts(res.data.data);
                this.setData({
                    // products: res.data.data
                    products: processed_products,
                    hot_products_cate_id: res.data.data[0].id
                });
                // 下面这个函数的请求参数需要hot_products_cate_id，wx.request是异步的，不知道执行顺序。
                // 把requestGoodsByCateId放到success回调函数里执行
                // 保证了执行的先后顺序
                this.requestGoodsByCateId();
            },
        });
       
        wx.request({
            url: "http://192.168.5.31:8080/goods/goodsList",
            method: "GET",
            success: res => {
                this.setData({
                    products_list: res.data.data
                })
            }
        });
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