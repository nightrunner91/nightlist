<template lang='pug'>
  section(class='section') Dashboard

    div(
      class='section__content'
      :class='{"section__content--blured" : modalVisible}')
      
</template>

<script>
export default {
  name: 'Dashboard',
  methods : {
    randomNumber(max) {
      return Math.floor(Math.random() * max);
    }
  }
}
</script>
