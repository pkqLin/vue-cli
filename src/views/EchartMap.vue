<template>
    <div id="myEcharts" ref="myEcharts"></div>
</template>

<script>
import * as echarts from "echarts";
import chinaJson from "../mock/data/mapData.json"

export default {
    name: "Home",
    props: {

    },
    mounted() {  // 页面元素渲染之后再触发
    },
    methods: {
        load() {
            this.$echarts.registerMap("china", chinaJson);
            //2.初始化echarts
            let myChart = this.$echarts.init(this.$refs.myEcharts);
            var
                option = {
                    title: {
                        text: '四色预警',
                        x: 'center'
                    },
                    dataRange: {
                        min: 0,
                        max: 500,
                        text: ['高', '低'],
                        realtime: true,
                        calculable: true,
                        color: ['orangered', 'yellow', 'green']
                    },
                    series: [
                        {
                            name: '犯罪数量',
                            type: 'map',
                            map: '滁州',
                            mapLocation: {
                                y: 60
                            },
                            itemSytle: {
                                emphasis: { label: { show: false } }
                            },
                            data: [
                                { name: '琅琊区', value: 700 },
                                { name: '南谯区', value: 600 },
                                { name: '定远县', value: 500 },
                                { name: '凤阳县', value: 400 },
                                { name: '明光市', value: 300 },
                                { name: '来安县', value: 200 },
                                { name: '天长市', value: 100 }
                            ]
                        }
                    ],

                };
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        }
    },
    mounted() {
        this.load();
    }
}

</script>