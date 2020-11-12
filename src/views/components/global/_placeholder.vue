<template lang='pug'>
  div(class='placeholder') 
    h3(class='placeholder__title') {{status.title}}
    svg(class='placeholder__icon'): use(:xlink:href="require('@/assets/sprite.svg')+ '#server-' + status.icon")
</template>

<script>
export default {
  name: 'Placeholder',
  props: {
    status: Object
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