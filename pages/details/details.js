// pages/details/details.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // id: 0,
        index: 0,
        product: null,
        hidenModel: true,
        products_list: [],
        count: [],
        shopping_cart_is_empty: true,
        price: 0,
    },
    gotoOrder: function() {
        // 当微信小程序navigateTo传入参数是个object时，请使用JSON.strtingify将object转化为字符串
        // 需要注意的是，不要将JSON.stringify(object)字符串先使用变量存起来，然后进行传递
        // 这样写接收的时候无法解析成功object
        debugger;
        wx.navigateTo({
          url: '/pages/orders/orders'
        })
    },
    shoppingCartIsEmpty: function() {
        let food_map = getApp().globalData.food_map;
        if(food_map === null) return ;
        
        // debugger;
        for (let item of food_map.keys()) {
            // 如果能进入循环,就不是空, 改变值后结束循环
            this.setData({
                shopping_cart_is_empty: false
            })
            return;
        }

        // 如果运行到这里，说明food_map是空的
        this.setData({
            shopping_cart_is_empty: true
        })
    },
    add: function(event) {
        console.log(event);
        var index = event.currentTarget.dataset.index;

        let count = this.data.count[index];
        getApp().globalData.food_map.set(this.data.products_list[index], count + 1);
        // console.log(getApp().globalData.food_map);
        this.listenShoppingCartChange()
    },
    reduce: function(event) {
        var index = event.currentTarget.dataset.index;
        console.log(index);

        let count = this.data.count[index];
        getApp().globalData.food_map.set(this.data.products_list[index], count - 1);
        console.log(getApp().globalData.food_map);
        this.listenShoppingCartChange()
    },
    showModal: function (event) {
        // this.setData({
        //     state: this.data.state == 'hide' ? 'show':'hide',
        // })
        // setTimeout(() => {
        //     if (this.data.hidenModel) {
        //         this.setData({
        //             hidenModel: false,
        //         })
        //     } else {
        //         this.setData({
        //             hidenModel: true,
        //         })
        //     }
        // }, 1000);
        setTimeout(() => {
            this.setData({
                hidenModel: !this.data.hidenModel,
            })

        })

    },

    listenShoppingCartChange: function() {
        // debugger;
        if (getApp().globalData.food_map === null)  return;
        var temp_arr_food = [];
        var temp_arr_food_count = [];
        var food_map = getApp().globalData.food_map;
        var price = 0;

        for (let item of food_map.keys()) {
            if(food_map.get(item) == 0) {
                food_map.delete(item);
                continue;
            }
            temp_arr_food.push(item);
            temp_arr_food_count.push(food_map.get(item));
            price += item.price * food_map.get(item);

        }
        this.setData({
            products_list: temp_arr_food,
            count: temp_arr_food_count,
            price: price,
        })
        // console.log(this.data.products_list);
        // debugger;
        this.shoppingCartIsEmpty();
    },

    addToShoppingCart: function (event) {
        if (getApp().globalData.food_map === null) {
            getApp().globalData.food_map = new Map();
        }
        let count = getApp().globalData.food_map.get(this.data.product) || 0;
        getApp().globalData.food_map.set(this.data.product, count + 1);
        // console.log(getApp().globalData.food_map);
        this.listenShoppingCartChange();

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        // 数据存储在全局变量里，不用再请求
        // var shopId = 1;
        // var host = getApp().globalData.host;
        // wx.request({
        //     // resetful风格请求
        //     url: `${host}/goods/selectOne/${options.id}`,
        //     method: "GET",
        //     success: (res) => {
        //         console.log(res);
        //         this.setData({
        //             id: options.id,
        //             product: res.data.data,
        //         })
        //     },

        // })
        this.setData({
            index: options.index,
            product: getApp().globalData.products_list[options.index],
        })
        // debugger;
        // console.log(this.data.product);
        this.listenShoppingCartChange();
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