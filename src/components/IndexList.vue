<template>
  <div class="main">
    <div class="left">
      <h4 class="time-title" v-if="time">实时热搜<span class="time-str">{{ time }}</span></h4>
      <Table :columns="columns" :data="listData">

        <template slot-scope="{row}" slot="content_slot">
          <div class="trend-jump">
            <span @click="trendJump(row.content)">[趋势图]</span>
            <a :href="'https://s.weibo.com/' + row.link" target="_blank">{{ row.content }}</a>
          </div>
        </template>

        <template slot-scope="{row}" slot="is_ad_slot">
          <span :class="row.is_ad == true ? 'is_ad_class' : '' ">{{ row.is_ad == true ? '是' : '否' }}</span>
        </template>

      </Table>
    </div>

    <div class="right">
      <div class="button" v-for="(item,index) in buttons" :key="index">
        <Button :type="item.type" @click="reportJump(item.searchType)">{{ item.name }}</Button>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      time: '',
      buttons: [
        {name: '今日关键词', type: 'primary', searchType: 'today'},
        {name: '昨日关键词', type: 'info', searchType: 'yesterday'},
        {name: '近一周关键词', type: 'warning', searchType: 'week'},
        {name: '24小时关键词', type: 'success', searchType: '24hour'},
      ],
      columns: [
        {
          title: '排名',
          key: 'rank',
          width: 70,
        },
        {
          title: '关键词',
          key: 'content',
          slot: 'content_slot'
        },
        {
          title: '热度',
          key: 'hot_num',
          width: 100,
        },
        {
          title: '标签',
          key: 'label',
          width: 70,
        },
        {
          title: '是否广告',
          key: 'is_ad',
          slot: 'is_ad_slot',
          width: 105,
        }
      ],
      listData: []
    }
  },
  created() {
    this.$store.commit('setGlobalTitle', '微博热搜排行榜')
    this.getList()
  },
  methods: {
    getList() {
      this.$http({
        method: "GET",
        url: "/search/current",
      }).then((res) => {
        console.log(res)
        this.listData = res.data
        if (this.listData.length > 0) {
          this.time = this.listData[0]['create_time_str']
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    trendJump(content) {
      let url = this.$router.resolve({
        name: 'Chart',
        query: {
          content: content
        }
      })
      console.log(url)
      window.open(url.href)
    },
    reportJump(searchType) {
      console.log(searchType)
      this.$router.push({
        name: 'Report',
        query: {
          type: searchType
        }
      })
    }
  },
  computed: {}

}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;

  .left {
    width: 70%;
  }

  .right {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    width: 30%;
    padding-top: 35px;

    .button {
      width: 70%;
      margin-bottom: 20px;
    }
  }

  .time-title {
    margin: 5px 0 10px 0;
    height: 20px;

    .time-str {
      color: red;
      margin-left: 5px;
    }
  }

  .is_ad_class {
    color: red;
  }

  .trend-jump {
    cursor: pointer;
    text-decoration: none;
    span {
      margin-right: 2px;
    }
  }
}

</style>
