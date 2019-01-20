<template>
  <div>
    <el-row><h1 style="color:#ce4114">别问&nbsp;ci&nbsp;什么</h1></el-row>
    <hr>
    <el-row>
      <a :href="'/items/itemDetail?id='+ dish._id">
        <img
          :src="dish.filename"
          class="food-img"
          alt="">
      </a>
      <span class="food-title">美食：<a :href="'/items/itemDetail?id='+ dish._id">{{ dish.title }}</a></span>
      <a
        href="javascript:void(0);"
        class="float-right"
        @click="randomFood('美食','dish')">
        换一换
      </a>
    </el-row>
    <el-row>
      <a :href="'/items/itemDetail?id='+ drink._id">
        <img
          :src="drink.filename"
          class="food-img"
          alt="">
      </a>
      <span>饮品：<a :href="'/items/itemDetail?id='+ drink._id">{{ drink.title }}</a></span>
      <a
        href="javascript:void(0);"
        class="float-right"
        @click="randomFood('饮品','drink')">换一换
    </a></el-row>
    <el-row>
      <a :href="'/items/itemDetail?id='+ bake._id">
        <img
          :src="bake.filename"
          class="food-img"
          alt="">
      </a>
      <span>烘焙：<a :href="'/items/itemDetail?id='+ bake._id">{{ bake.title }}</a></span>
      <a
        href="javascript:void(0);"
        class="float-right"
        @click="randomFood('烘焙','bake')">换一换
      </a>
    </el-row>
  </div>
</template>

<style scoped>
.el-row {
  margin: 5px;
}
.food-title {
  width: 150px;
  overflow: hidden;
}
.food-img {
  width: 200px;
  height: 118px;
}
</style>
<script>
export default {
  data() {
    return {
      dish: '',
      drink: '',
      bake: ''
    }
  },
  async mounted() {
    this.randomFood('美食', 'dish')
    this.randomFood('饮品', 'drink')
    this.randomFood('烘焙', 'bake')
  },
  methods: {
    randomFood: async function(category, food) {
      const self = this
      let queryForm = {
        status: '1',
        category: category
      }
      let range = 0
      let {
        code,
        data: { count }
      } = await self.$axios
        .get('/items/getItemCount', { params: queryForm })
        .then(resp => resp.data)
      let offset = Math.floor(Math.random() * parseInt(count))
      queryForm.offset = offset
      queryForm.limit = 1
      await self.$axios
        .get('/items/getItemList', { params: queryForm })
        .then(resp => {
          if (resp.status === 200 && resp.data) {
            if (resp.data.code === 0) {
              if (resp.data.data.results[0].title.length > 7) {
                let title =
                  resp.data.data.results[0].title.substring(0, 6) + '...'
                resp.data.data.results[0].title = title
              }
              self[food] = resp.data.data.results[0]
            }
          }
        })
    }
  }
}
</script>
