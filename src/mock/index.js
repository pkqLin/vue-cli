
const Mock = require('mockjs');
// require('./map/map');  //引入bar.js 文件
Mock.mock('/api/map', require('./data/map.json')) // 后面讲这个api的使用细节
Mock.mock('/ap/po', 'post', require('./data/map.json')) // 后面讲这个api的使用细节

export default Mock;

//第一种mock的get请求，记住不能以params的方式传参，可以传空，否则必报404

/*this.$axios.get("/ap/map", {
    //即此出不能传参数
}).then(res => {  // url即在 bar.js 中定义的
    console.log("111yiyiyiyi" + res.data);
}).catch(function (error) {
    console.log(error);
});
*/
//第二种mock的get请求，以data方式可以随便传参
/*
this.$axios({
    url: '/ap/map',
    method: 'get',
    // 在使用 mockjs 时， get 请求不能使用 params 进行传参，会报 404
    // params: parameter
    // 要么不传，要么先使用 post 的 data 方式先传着用
    data: {}
}).then(res => {  // url即在 bar.js 中定义的
    console.log("222yiyiyiyi" + res.data);
}).catch(function (error) {
    console.log(error);
});*/