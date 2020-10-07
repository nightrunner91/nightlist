<template lang='pug'>

  .dropdown(
    :class="[setTheme]" 
    :id="[setId]")

    .dropdown__toggle(
      @click="open = !open, removeInvalid($event)"
      :class="{active: open}"
      v-ripple)

      slot.dropdown__toggle--text(name="toggler") dropdown toggle

      .dropdown__toggle--caret(v-if="caret")

    transition(name="dropdown")

      .dropdown__menu(
        @click="open = false"
        v-if="open"
        :class="[setAlign]"
        v-scrollbar="{preventParentScroll: true}")

          .dropdown__wrapper

            ul(v-if="getMenu()")
              li(
                v-for="item in setMenu"
                :class="item.type == 'separator' ? 'dropdown__menu--separator' : ''"
                @click="open = !open")
                span.dropdown__menu--icon(v-if="item.icon") {{ item.icon }}
                span.dropdown__menu--text(v-if="item.text") {{ item.text }}

            slot(v-else name="menu"): .dropdown__menu--empty no items found

</template>

<script>
export default {
  name: "Dropdown",
  props: {
    caret: {
      type: Boolean,
      default: true
    },
    justify: {
      type: String,
      default: "left" // 'left', 'right', 'stretch'
    },
    theme: {
      type: String,
      default: "light" // 'light', 'dark', 'any custom class'
    },
    id: {
      type: String,
      default: ""
    },
    options: {
      type: Array
    }
  },
  computed: {
    setCaret() {
      return this.caret;
    },
    setAlign() {
      return "dropdown__menu--" + this.justify;
    },
    setTheme() {
      return this.theme;
    },
    setId() {
      return this.id;
    },
    setMenu() {
      return this.options;
    }
  },
  methods: {
    getMenu() {
      if (this.setMenu && this.setMenu.length) {
        return true;
      }
      return false;
    },
    documentClick(event) {
      if (this.$el !== event.target && !this.$el.contains(event.target))
        this.open = false;
    },
    removeInvalid(event) {
      event.target.closest(".dropdown").classList.remove("dropdown--invalid");
    }
  },
  data() {
    return {
      open: false
    };
  },
  created() {
    document.addEventListener("click", this.documentClick);
  },
  destroyed() {
    document.removeEventListener("click", this.documentClick);
  }
};
</script>