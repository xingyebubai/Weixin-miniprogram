// pages/orders/orders.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        products: [],
        count: [],
        total: 0,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let food_map = getApp().globalData.food_map;
        let products = [];
        let count = []; 
        let total = 0;
        for (const item of food_map.keys()) {
            products.push(item);
            count.push(food_map.get(item));
            total += item.price * food_map.get(item);
        }
        this.setData({
            products: products,
            count: count,
            total: total,
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