<template>
    <div id="container" style="width: 100%; height: calc(100vh - 100px)">

    </div>
</template>
  
<script>
export default {
    name: "Map",
    data() {
        return {
            user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
        }
    },
    created() {

    },
    methods: {
        logout() {
            this.$store.commit("logout")
            this.$message.success("退出成功")
        }
    },
    mounted() {
        const map = new AMap.Map('container', {
            zoom: 13,  //设置地图显示的缩放级别
            center: [116.397428, 39.90923],  //设置地图中心点坐标
           // mapStyle: 'amap://styles/whitesmoke',  //设置地图的显示样式
            // viewMode: '2D'  //设置地图模式
            resizeEnable: true
        });// 创建一个 Marker 实例：
        const marker = new AMap.Marker({
            position: new AMap.LngLat(116.39, 39.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: '北京'
        });
    }
}
</script>
  
<style></style>
  