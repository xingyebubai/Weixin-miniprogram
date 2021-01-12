// pages/details/details.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        product: null,
    },
    addToShoppingCart: function (event) {
        if (getApp().globalData.food_map === null) {
            getApp().globalData.food_map = new Map();
        }
        let count = getApp().globalData.food_map.get(this.data.product)|| 0;
        getApp().globalData.food_map.set(this.data.product, count + 1);
        console.log(getApp().globalData.food_map);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var shopId = 1;
        var host = getApp().globalData.host;
        wx.request({
            // resetful风格请求
            url: `${host}/goods/selectOne/${options.id}`,
            method: "GET",
            success: (res) => {
                console.log(res);
                this.setData({
                    id: options.id,
                    product: res.data.data,
                })
            },

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