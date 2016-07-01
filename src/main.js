import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

import 'font-awesome/css/font-awesome.css' // << import CSS

new Vue({
  el: 'body',
  components: { App }
})
