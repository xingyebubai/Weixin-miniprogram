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
        // 分类产品信息
        products: [],

        // 所有产品的信息
        products_list: [],
        // 热销榜
        hot_products_cate_id: 0,
        hot_products_cate_list: [],
        keyword: "",
        show_search_result: false,


    },
    addToShoppingCart: function (event) {
        let global_products_list = getApp().globalData.products_list;
        // debugger;
        let food_id = event.currentTarget.dataset.id;

        // 花括号需要 return 
        let food_index = global_products_list.findIndex(item => item.id == food_id);
        if (getApp().globalData.food_map === null) {
            getApp().globalData.food_map = new Map();
        }
        let count = getApp().globalData.food_map.get(global_products_list[food_index]) || 0;
        getApp().globalData.food_map.set(global_products_list[food_index], count + 1);
        console.log(getApp().globalData.food_map);

    },
    // 动态获取输入框的值
    getkeyword: function (event) {
        console.log(event.detail.value);
        this.setData({
            keyword: event.detail.value
        })
    },

    // 执行搜索
    dosearch: function () {
        let host = getApp().globalData.host;
        wx.request({
            url: `${host}/goods/goodsLike`,
            method: "GET",
            data: {
                value: this.data.keyword
            },
            success: (res) => {
                // debugger;
                this.setData({
                    products_list: res.data.data
                })

            },
        })
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

        // var target_index = event.currentTarget.dataset.index;
        // wx.navigateTo({
        //     url: "/pages/details/details?index=" + target_index,
        // })
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

    requestGoodsByCateId: function () {
        var shopId = 1;
        var host = getApp().globalData.host;
        wx.request({
            // resetful风格的请求，不用传参
            url: `${host}/goods/goods/${shopId}/${this.data.hot_products_cate_id}`,
            method: "GET",
            // data: {
            //     cateId: this.data.hot_products_cate_id,
            //     // cateId: 47,
            // },
            success: (res) => {
                console.log(res.data.data);
                this.setData({
                    hot_products_cate_list: res.data.data,
                })
            }
        })
    },
    onLoad: function (options) {
        var processed_products;
        var host = getApp().globalData.host;
        wx.request({
            url: `${host}/cate/cates`,
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
            url: `${host}/goods/goodss`,
            method: "GET",
            success: res => {
                getApp().globalData.products_list = res.data.data;
                // debugger;
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