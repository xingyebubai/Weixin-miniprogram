// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
        products: [
            {
                "id": 2,
                "cateName": "单人精彩套餐",
                "state": 1,
                "url": "/imgs/banner1.jpg"
            },
            {
                "id": 3,
                "cateName": "冰爽饮品限时特惠",
                "state": 1,
                "url": "/imgs/banner2.jpg"
            },
            {
                "id": 4,
                "cateName": "精选热菜",
                "state": 1,
                "url": "/imgs/banner3.jpg"
            },
            {
                "id": 5,
                "cateName": "爽口凉菜",
                "state": 1,
                "url": "/imgs/banner4.jpg"
            },
            {
                "id": 6,
                "cateName": "老八秘制系列",
                "state": 1,
                "url": "/imgs/banner5.jpg"
            },
            {
                "id": 7,
                "cateName": "现炒盖饭",
                "state": 1,
                "url": "/imgs/banner6.jpg"
            },
            {
                "id": 8,
                "cateName": "烤串区",
                "state": 1,
                "url": "/imgs/banner7.jpg"
            },
            {
                "id": 9,
                "cateName": "盖饭系列",
                "state": 1,
                "url": "/imgs/banner8.jpg"
            },
            {
                "id": 10,
                "cateName": "小吃搭饮料",
                "state": 1,
                "url": "/imgs/banner9.jpg"
            },
            {
                "id": 11,
                "cateName": "新品专项",
                "state": 1,
                "url": "/imgs/banner10.jpg"
            },
    
        ],
        products_list: [],
        
    
    },

    // 因为数据框中没有设计图片url, 所以这里需要拼接一个url
    processProducts: function(obj) {
        var ret = [];
        var i = 0;
        for (let item of obj) {
            if(item.catename == "热销榜")  continue;

            item.url = this.data.urls[i++];
            ret.push(item);
        }
        return ret;
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var processed_products;
        wx.request({
            url: "http://192.168.5.31:8080/cate/queryAll",
            method:"GET",
            success: res => {
                processed_products = this.processProducts(res.data.data);
                this.setData({
                // products: res.data.data
                products: processed_products
            })
        }
    });
        wx.request({
            url: "http://192.168.5.31:8080/goods/goodsList",
            method: "GET",
            success: res => {
                // console.log(res);
                this.setData({
                    products_list: res.data.data
                })
            }
        })
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