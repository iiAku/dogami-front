<template>
  <div>
    <Header />
    <div class="container is-fluid">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' },
        },
      ],
    }
  },
}
</script>

<style scoped></style>
