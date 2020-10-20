<template lang='pug'>

  div(class='dropdown')
    div(class='dropdown__label') {{label}}
    div(
      class='dropdown__toggle'
      @click="dropdownOpened = !dropdownOpened"
      :class="{'dropdown__toggle--active': dropdownOpened}")
        span(v-if='currentValue != undefined && currentValue.length > 0') {{currentValue}}
        span(v-else) {{defaultValue}}
        svg(class='dropdown__chevron'): use(xlink:href='#chevron-down-black')
    div(
      class='dropdown__body'
      :class='{"dropdown__body--active" : dropdownOpened}')
      div(
        v-if='itemsCount > 4'
        class='dropdown__sliding' 
        v-scrollbar='{ preventParentScroll: true }')
        ul(
          class='dropdown__menu'
          :class='{"dropdown__menu--opened" : dropdownOpened}'
          @click="dropdownOpened = false")
            slot(name='dropdown-menu')
      div(
        v-else
        class='dropdown__sliding' )
        ul(
          class='dropdown__menu'
          :class='{"dropdown__menu--opened" : dropdownOpened}'
          @click="dropdownOpened = false")
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