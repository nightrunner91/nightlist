<template lang='pug'>
  section(class='section')

    div(class='title')
      h2(class='title__name') Section title
      span(class='title__badge badge badge--medium') 10
      i(class='title__chevron')

    div(class='table')

      div(class='table__header')
        div(class='table__cell table__cell--3 table__cell--functional')
        div(class='table__cell table__cell--42 table__cell--functional') 
          span Title
          i(class='table__chevron')
        div(class='table__cell table__cell--15 table__cell--functional') 
          span Rating
        div(class='table__cell table__cell--15 table__cell--functional') Hours
        div(class='table__cell table__cell--25 table__cell--right')

      div(class='table__body')
        div(class='table__item' v-for='(item, index) in 10')
          div(class='table__cell table__cell--3') {{index + 1}}
          div(class='table__cell table__cell--42') Some Fancy Title
          div(class='table__cell table__cell--15') {{randomNumber(5)}}
          div(class='table__cell table__cell--15') {{randomNumber(101)}}
          div(class='table__cell table__cell--25 table__cell--right') edit

    div(class='title')
      h2(class='title__name') Section title
      span(class='title__badge badge badge--medium') 87
      i(class='title__chevron')

    div(class='table')

      div(class='table__header')
        div(class='table__cell table__cell--3')
        div(class='table__cell table__cell--42') 
          span Title
          i(class='table__chevron')
        div(class='table__cell table__cell--15') 
          span Rating
        div(class='table__cell table__cell--15') Hours
        div(class='table__cell table__cell--25 table__cell--right')

      div(class='table__body')
        div(class='table__item' v-for='(item, index) in 87')
          div(class='table__cell table__cell--3') {{index + 1}}
          div(class='table__cell table__cell--42') Some Fancy Title
          div(class='table__cell table__cell--15') {{randomNumber(5)}}
          div(class='table__cell table__cell--15') {{randomNumber(101)}}
          div(class='table__cell table__cell--25 table__cell--right') edit

    div(class='title')
      h2(class='title__name') Section title
      span(class='title__badge badge badge--medium') 45
      i(class='title__chevron')

    div(class='table')

      div(class='table__header')
        div(class='table__cell table__cell--3')
        div(class='table__cell table__cell--42') 
          span Title
          i(class='table__chevron')
        div(class='table__cell table__cell--15') 
          span Rating
        div(class='table__cell table__cell--15') Hours
        div(class='table__cell table__cell--25 table__cell--right')

      div(class='table__body')
        div(class='table__item' v-for='(item, index) in 45')
          div(class='table__cell table__cell--3') {{index + 1}}
          div(class='table__cell table__cell--42') Some Fancy Title
          div(class='table__cell table__cell--15') {{randomNumber(5)}}
          div(class='table__cell table__cell--15') {{randomNumber(101)}}
          div(class='table__cell table__cell--25 table__cell--right') edit

    

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
