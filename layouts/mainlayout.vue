<template>
  <div>
    <Header/>
    <div>
      <nuxt/>
    </div>
    <Footer/>
  </div>
</template>
<script>
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
export default {
  components: {
    Header,
    Footer
  }
}
</script>
<style scoped>
</style>
