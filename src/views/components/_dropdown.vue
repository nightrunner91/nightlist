<template lang='pug'>

  div(class='dropdown')
    div(class='dropdown__label') {{label}}
    div(
      class='dropdown__shadow'
      v-if='dropdownOpened'
      :style='dropdownHeight')  
    div(
      class='dropdown__toggle'
      @click="dropdownOpened = !dropdownOpened"
      :class="{'dropdown__toggle--active': dropdownOpened}")
        span(v-if='currentValue != undefined && currentValue.length > 0') {{currentValue}}
        span(v-else) {{defaultValue}}
        svg(class='dropdown__chevron'): use(xlink:href='#chevron-down-black')
    ul(
      class='dropdown__menu'
      @click="dropdownOpened = false"
      v-if="dropdownOpened")
      slot(name='dropdown-menu')

</template>

<script>
export default {
  name: "Dropdown",
  props: {
    label: String,
    currentValue: String,
    defaultValue: String,
    itemsCount: Number
  },
  data() {
    return {
      dropdownOpened: false
    };
  },
  computed: {
    dropdownHeight() {
      return 'height: ' + (this.itemsCount + 1) * 40 + 'px'
    }
  },
  methods: {
    documentClick(event) {
      if (this.$el !== event.target && !this.$el.contains(event.target)) {
        this.dropdownOpened = false;
      }
    }
  },
  created() {
    document.addEventListener("click", this.documentClick);
  },
  destroyed() {
    document.removeEventListener("click", this.documentClick);
  }
};
</script>