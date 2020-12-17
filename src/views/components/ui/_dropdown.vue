<template lang='pug'>

  div(class='dropdown')
    div(class='dropdown__label') {{label}}
    div(
      class='dropdown__toggle'
      @click="switchDropdown()"
      :class="{'dropdown__toggle--active': dropdownOpened}")
        svg(
          class='dropdown__icon'
          v-if='category != undefined && type != undefined'): use(:xlink:href="require('@/assets/sprite.svg')+ '#' + currentIcon")
        span {{currentName}}
        svg(class='dropdown__chevron'): use(xlink:href='#chevron-down')
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
    category: String,
    type: String,
    label: String,
    current: String,
    length: Number
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
    }
  },
  computed: {
    currentName() {
      if (this.category != undefined && this.type != undefined) {
        let path = this.$store.state[this.category][this.type]

        if (this.current != undefined && this.current.length > 0) {
          return path.filter(i => i.id == this.current)[0].name
        } else {
          return path.filter(i => i.default)[0].name
        }
      } else {
        return this.current
      }
    },

    currentIcon() {
      if (this.category != undefined && this.type != undefined) {
        let path = this.$store.state[this.category][this.type]

        if (this.current != undefined && this.current.length > 0) {
          return path.filter(i => i.id == this.current)[0].id
        } else {
          return path.filter(i => i.default)[0].id
        }
      } else {
        return this.current
      }
    },

    itemsCount() {
      if (this.category != undefined && this.type != undefined) {
        return this.$store.state[this.category][this.type].length
      } else {
        return this.length
      }
    }
  },
  methods: {
    documentClick(event) {
      if (this.$el !== event.target && !this.$el.contains(event.target)) {
        this.dropdownOpened = false
      }
    },

    setHeight() {
      let limit = this.visibleItems * this.itemHeight + 1 + 'px'
      this.dropdownHeight['height'] = limit
      this.dropdownHeight['max-height'] = limit
    },

    switchDropdown() {
      this.setHeight()

      if (this.dropdownOpened) {
        this.dropdownOpened = false
        if (this.itemsCount > this.visibleItems) {
          this.$vuebar.destroyScrollbar(this.$refs.dropdown)
        }
      } else {
        this.dropdownOpened = true
        if (this.itemsCount > this.visibleItems) {
          this.$vuebar.initScrollbar(this.$refs.dropdown, { preventParentScroll: true })
        }
      }
    },
  },
  created() {
    document.addEventListener("click", this.documentClick)
  },
  destroyed() {
    document.removeEventListener("click", this.documentClick)
  }
}
</script>