<template>
  <div/>
</template>

<script>
export default {
  data() {},
  middleware: async ctx => {
    await ctx.$axios.get('/users/exit').then(resp => {
      if (resp.status === 200) {
        if (resp.data && resp.data.code === 0) {
          ctx.redirect('/')
          //ctx.$router.push('/')
        } else {
          this.error = resp.data.msg
        }
      }
    })
  }
}
</script>
