<template lang='pug'>
  div(class='placeholder') 
    h2(class='placeholder__title') {{text}}
    svg(class='placeholder__icon'): use(:xlink:href="require('@/assets/sprite.svg')+ '#' + icon")
</template>

<script>
export default {
  name: 'Placeholder',
  props: {
    text: String,
    icon: String
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  },
  mounted() {
    
  }
}
</script>