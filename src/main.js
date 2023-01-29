import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase.js'
import { ref } from 'vue'

import './assets/main.css'


import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faUserSecret)


import menu from './components/menu.vue'
import registro from './components/registro.vue'
import listadoTienda from './components/listadoTienda.vue'
import carrito from './components/carrito.vue'
import admin from './components/adminPanel.vue'

import { auth } from './firebase.js'
import { onAuthStateChanged } from 'firebase/auth'

var estaAutentificado = ref(false)
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid
    estaAutentificado = true
    router.push('/admin')
  } else {
    estaAutentificado = false
    router.push('/')
  }
})


const routes = [
  {
    path: '/',
    name: 'menu',
    component: menu
  },
  {
    path: '/registro',
    name: 'registro',
    component: registro
  },
  {
    path: '/listadoTienda',
    name: 'listadoTienda',
    component: listadoTienda
  },
  {
    path: '/carrito',
    name: 'carrito',
    component: carrito
  },
  {
    path: '/admin',
    name: 'admin',
    component: admin,
    beforeEnter: (to, from) => {
      if (estaAutentificado) {
        return true
      } else {
        return false
      }
    }
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const app = createApp(App)
app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
})
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
