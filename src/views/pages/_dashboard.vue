<template lang='pug'>
  section(class='section') Dashboard
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
