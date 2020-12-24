<template>
  <div class="main">

    <h2 style="margin: 3px 0;">{{ result.begin_time }} 一 {{ result.end_time }}</h2>

    <div class="sort-button">
      <Button type="primary" @click="getList('label')">按热度排序</Button>
      <Button type="primary" @click="getList('rank')">按排名排序</Button>
    </div>

    <Table :columns="columns" :data="result.data">

      <template slot-scope="{row}" slot="content_slot">
        <div class="trend-jump">
          <span @click="trendJump(row.content)">[趋势图]</span>
          <a :href="'https://s.weibo.com/' + row.link" target="_blank">{{ row.content }}</a>
        </div>
      </template>

      <template slot-scope="{row}" slot="rank_score_slot">
        <span>{{ row.rank_score | formatFloat }}</span>
      </template>

      <template slot-scope="{row}" slot="label_score_slot">
        <span>{{ row.label_score | formatFloat }}</span>
      </template>


      <template slot-scope="{row}" slot="is_ad_slot">
        <span :class="row.is_ad == true ? 'is_ad_class' : '' ">{{ row.is_ad == true ? '是' : '否' }}</span>
      </template>

    </Table>

  </div>
</template>

<script>
export default {
  name: "Report",
  data() {
    return {
      columns: [
        {
          title: '关键词',
          key: 'content',
          slot: 'content_slot'
        },
        {
          title: '排名分数',
          key: 'rank_score',
          slot: 'rank_score_slot',
          width: 105,

        },
        {
          title: '热度分数',
          key: 'label_score',
          slot: 'label_score_slot',
          width: 105,

        },
        {
          title: '是否广告',
          key: 'is_ad',
          slot: 'is_ad_slot',
          width: 105,

        },
        {
          title: '开始时间',
          key: 'start_time_str',
          width: 200,
        },
        {
          title: '结束时间',
          key: 'end_time_str',
          width: 200,
        },
        {
          title: '持续时间',
          key: 'duration',
          width: 200,
        },
      ],
      result: {
        data: [],
      },
      // listData: []
    }
  },
  created() {
    this.$store.commit('setGlobalTitle', '热搜关键词')
    this.getList('default')
  },
  methods: {
    getList(sort) {
      this.$http({
        method: "GET",
        url: "/search/report",
        params: {
          type: this.$route.query.type,
          sort: sort
        }
      }).then((res) => {
        console.log(res)
        this.result = res.data
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

  },
  filters: {
    formatFloat(value) {
      return (new Number(value)).toFixed(2)
    }
  }
}
</script>

<style scoped lang="scss">
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

.sort-button {
  margin: 10px 0;

  button {
    margin-right: 25px;
  }
}
</style>