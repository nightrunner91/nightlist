<template lang='pug'>

  div(class='dropdown')
    div(class='dropdown__label') {{label}}
    div(
      class='dropdown__toggle'
      @click="switchDropdown()"
      :class="{'dropdown__toggle--active': dropdownOpened}")
        svg(
          class='dropdown__icon'
          v-if='currentId'): use(:xlink:href="require('@/assets/sprite.svg')+ '#' + currentId")
        span(v-if='currentValue != undefined && currentValue.length > 0') {{currentValue}}
        span(v-else) {{defaultValue}}
        svg(class='dropdown__chevron'): use(xlink:href='#chevron-down-black')
    div(
      class='dropdown__body'
      :class='{"dropdown__body--active" : dropdownOpened}')
      div(
        class='dropdown__sliding'
        :style='dropdownHeight'
        ref='dropdown')
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
    currentId: String,
    defaultValue: String,
    itemsCount: Number
  },
  data() {
    return {
      dropdownOpened: false,
      visibleItems: 4,
      itemHeight: 40,
      dropdownHeight: {
        'height': undefined,
        'max-height': undefined
      }
    };
  },
  computed: {

  },
  methods: {
    documentClick(event) {
      if (this.$el !== event.target && !this.$el.contains(event.target)) {
        this.dropdownOpened = false;
      }
    },

    setHeight() {
      let limit = this.visibleItems * this.itemHeight + 1 + 'px';
      this.dropdownHeight['height'] = limit;
      this.dropdownHeight['max-height'] = limit;
    },

    switchDropdown() {
      this.setHeight();

      if (this.dropdownOpened) {
        this.dropdownOpened = false;
        if (this.itemsCount > this.visibleItems) {
          this.$vuebar.destroyScrollbar(this.$refs.dropdown)
        }
      } else {
        this.dropdownOpened = true;
        if (this.itemsCount > this.visibleItems) {
          this.$vuebar.initScrollbar(this.$refs.dropdown, { preventParentScroll: true })
        }
      }
    },
  },
  created() {
    document.addEventListener("click", this.documentClick);
  },
  destroyed() {
    document.removeEventListener("click", this.documentClick);
  }
};
</script>