import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

const host = process.env.HOST | 'localhost'
const port = host === 'localhost' ? ':3000' : ''
const socket = SocketIO(`http://${host}${port}`)

Vue.config.productionTip = false

socket.on('unauthorized', function (err) {
  console.log('There was an error with the authentication:', err.message)
})

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
// Socket
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: socket
  })
)

new Vue({
  render: h => h(App)
}).$mount('#app')
