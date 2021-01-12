// pages/category/category.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cateId: 1,
        products_list: [],
    },

    gotoProductDetails: function (event) {
        // 需要获取相同cateId数组的元素的索引，cateId数组是products_list的子数组
        // => 获取子数组中的元素在父数组中的索引
        var target_id = event.currentTarget.dataset.id;
        // console.log(target_id);
        // debugger;
        var father_index = getApp().globalData.products_list.findIndex(item => item.id == target_id);
        // debugger;
        wx.navigateTo({
            url: `/pages/details/details?index=${father_index}`,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var cateId = options.cateId;

        // 获取分类食品
        var foods = getApp().globalData.products_list.filter(item => item.cateid == cateId);
        // console.log("category.js\n");
        // console.log(foods);
        this.setData({
            products_list: foods,
            cateId: cateId,
        })
        // console.log(this.data.cateId);
        // var shopId = 1;
        // var host = getApp().globalData.host;
        // // console.log(options.cateId);
        // wx.request({
        //     // resetful风格请求
        //     url: `${host}/goods/goods/${shopId}/${options.cateId}`,
        //     method: "GET",
        //     // data: {
        //     //     cateId: options.cateId
        //     // },
        //     success: (res) => {
        //         console.log(res);
        //         this.setData({
        //             cateId: options.cateId,
        //             products_list: res.data.data,
        //         })
        //     },

        // })


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