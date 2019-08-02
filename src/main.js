import Vue from "vue"
import "./plugins/axios"
import "./plugins/vuetify"
import "./plugins/event-bus"
import App from "./App.vue"
import router from "./router/"
import store from "./store/index"
import "./registerServiceWorker"
import "roboto-fontface/css/roboto/roboto-fontface.css"
import "font-awesome/css/font-awesome.css"
import VueSocketIO from 'vue-socket.io'

// Vue.use(VueSocketIO, "http://localhost:3000");

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    } //Optional options
}))

Vue.config.productionTip = false
console.log("store", store)
console.log("dirname", __dirname)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
