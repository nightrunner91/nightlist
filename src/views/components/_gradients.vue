<template lang='pug'>
  div(class='gradients')
    div(
      v-for='page in pages'
      class='gradients__item'
      :class='["gradients__item--" + page, {"gradients__item--active" : current == page}]')
</template>

<script>
export default {
  name: 'Gradients',
  props: {
    current: String
  },
  data() {
    return {
      pages: ['dashboard', 'games', 'tvshows', 'films', 'anime', 'books', 'hardware']
    }
  },
  methods: {

  },
  mounted() {
    
  }
}
</script>