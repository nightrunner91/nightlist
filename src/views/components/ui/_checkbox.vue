<template lang='pug'>

  div(class='checkbox')
    div(class='checkbox__label') Checkbox
    div(
      class='checkbox__body'
      @click='changeCheckbox()')
      div(
        class='checkbox__input'
        :class='{"checkbox__input--active" : currentCheckbox }')
      div(class='checkbox__text') {{text}}

</template>

<script>
import { eventBus } from "../../../main";

export default {
  name: "Checkbox",
  props: {
    text: String,
    currentCheckbox: Boolean,
    event: String
  },
  data() {
    return {
      
    };
  },
  computed: {

  },
  methods: {
    changeCheckbox() {
      if (this.currentCheckbox) {
        eventBus.$emit(this.event, false);
      } else {
        eventBus.$emit(this.event, true);
      }
    }
  },
  created() {
    
  },
  destroyed() {
    
  }
};
</script>