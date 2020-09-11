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
      pages: ['games', 'tvshows', 'films', 'anime', 'books', 'hardware']
    }
  },
  methods: {

  },
  mounted() {
    //console.log(this.prop1, this.prop2);
  }
}
</script>