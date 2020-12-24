<template>
  <div class="main">
    <div id="echarts" style="width: 100%; height: 600px">
    </div>
  </div>

</template>

<script>
export default {
  name: "Chart",
  data() {
    return {
      echartsDataRank: [],
      echartsDataHot: []
    }
  },

  methods: {
    getEchartsData() {
      console.log()
      this.$http({
        method: "GET",
        url: "search/chart",
        params: {content: this.$route.query.content}
      }).then((res) => {
        console.log(res)
        for (let key in res.data.create_time_arr) {
          let hot = [], rank = []
          hot[0] = rank[0] = res.data.create_time_arr[key]
          rank[1] = res.data.idx_arr[key]
          hot[1] = res.data.num_arr[key]

          this.echartsDataRank.push(rank)
          this.echartsDataHot.push(hot)
        }
        // this.echartsData = res.data
        console.log(this.echartsDataHot)
        this.myEcharts()

      }).catch((err) => {
        console.log(err)
      })
    },

    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('echarts'));

      // 指定图表的配置项和数据
      let option = {
        color: ['#2E9AFE', '#F7BE81'],
        title: {
          text: 'ECharts'
        },
        tooltip: {
          trigger: 'axis',

          axisPointer: {
            label: {
              backgroundColor: 'red'
            },
            // type: 'cross',
            animation: false,
          }
        },
        legend: {
          data: ['rank', 'hot']
        },
        xAxis: {
          splitLine: {
            show: false
          },
          // interval: 60 * 60 * 1000, // 设置x轴步长间隔
          axisLabel: {
            rotate: 0,
            formatter: (params) => {
              let formatTime = this.$moment(params).format('YYYY-MM-DD HH:mm:ss')
              return formatTime
            },
          },

          type: 'time',
        },
        yAxis: [
          {
            name: 'rank',
            type: 'value',
            max: 65,
          },
          {
            name: 'hot',
            // nameLocation: 'end',
            type: 'value',
            inverse: false
          }
        ],

        series: [
          {
            name: 'rank',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: this.echartsDataRank,
            areaStyle: {}
          },
          {
            name: 'hot',
            type: 'line',
            yAxisIndex: 1,
            showSymbol: false,
            hoverAnimation: false,
            data: this.echartsDataHot,
            areaStyle: {}
          },

        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  created() {
    this.$store.commit('setGlobalTitle', this.$route.query.content)
    this.getEchartsData()
  }
}
</script>

<style scoped>

</style>