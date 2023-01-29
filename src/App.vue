<script setup>
import { auth, storage } from './firebase.js'
import { onAuthStateChanged, signOut } from "firebase/auth";

import { ref as ref2, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage'
import { addDoc, collection, getFirestore, doc, getDoc, getDocs, query, where, orderBy, deleteDoc, updateDoc } from 'firebase/firestore'
import { useCollection, useFirestore } from 'vuefire'

import { router } from './main.js'
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import pie from './components/pie.vue'

// leer de firebase
const db = useFirestore()
const products = useCollection(collection(db, "productos"))


function actualizarArticuloFirebase(nota) {
  updateDoc(doc(db, "tarea", nota.id), {
    texto: nota.texto,
    fecha: nota.fecha,
    prioridad: nota.prioridad,
    hecho: nota.hecho
  })
}

var estaAutentificado = ref(false)
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid
    estaAutentificado.value = true
    verFormulario.value = false
  } else {
    estaAutentificado.value = false
  }
})
var men = "Men's clothing"
var women ="Women's clothing";
var catego = ref('');
var carrito = localStorage.getItem("carrito") != null? ref(JSON.parse(localStorage.getItem("carrito"))) : ref([]);
var cantidadProductos = ref(carrito.value.length);
var verFormulario = ref(false);
function actualizarNumeroCarrito(){
  carrito = localStorage.getItem("carrito") != null? ref(JSON.parse(localStorage.getItem("carrito"))) : ref([]);
  cantidadProductos.value = carrito.value.length;
}


function cambiarFormulario() {
  if (estaAutentificado.value == true)
    return
  quitarCarrito()
  quitarDetalle();
  verFormulario.value = true
}
function quitarFormulario() {
  verFormulario.value = false
  quitarCarrito()
  quitarDetalle();
}

function cambiarCategoria(categoria2) {
  quitarFormulario();
  quitarDetalle();
  quitarCarrito()
  catego.value = categoria2;
  router.push({ name: 'listadoTienda'});

}

var verDetalle = ref(false);
function cambiarDetalle() {
  verDetalle.value = true;
}
function quitarDetalle() {
  verDetalle.value = false;
}

var verCarrito = ref(false);
function ponerCarrito(){
  verCarrito.value = true;
}
function quitarCarrito(){
  verCarrito.value = false;
}



</script>

<template>

  <body class=''>
    <div class="container">
      <header>
        <router-link to="/" class="logo" @click="quitarFormulario">
          <img src="./assets/99b0e593f9237abf16df5cb1b1a87735.webp" alt="logo" title="Mi Tienda">
        </router-link>
        <nav class="search">
          <ul>
            <li id="hombre" title="Men" @click="cambiarCategoria(men)"><router-link class="router"
                to="/listadoTienda">Men</router-link></li>
            <li id="mujer" title="Women" @click="cambiarCategoria(women)"><router-link class="router"
                to="/listadoTienda">Women</router-link></li>
            <li id="joyeria" title="Jewelry" @click="cambiarCategoria('Jewelery')"><router-link class="router"
                to="/listadoTienda">Jewelery</router-link></li>
            <li id="electro" title="Electronics" @click="cambiarCategoria('Electronics')"><router-link class="router"
                to="/listadoTienda">Electronics</router-link></li>
          </ul>
        </nav>
        <div class="log-shop">
          <ul>
            <button v-if=!estaAutentificado id="inicio" title="Login"><router-link to="/registro" class="router"
                @click="cambiarFormulario">Login</router-link></button>
            <button v-else id="inicio2" title="Logout"><router-link to="/admin" class="router"
                @click="cambiarFormulario">Perfil admin</router-link></button>
            <li title="Carrito" @click="ponerCarrito"><router-link to="/carrito" class="router"><i class="fa-solid fa-cart-shopping"></i>
                <span :class="['cantidadProductos', { llena: carrito.length > 0 }]">{{
                  cantidadProductos
                }}</span></router-link>
            </li>
          </ul>
        </div>
      </header>
      <main :class="[{ formulario: verFormulario  && !verCarrito}, {detalle:verDetalle && !verCarrito}, {carrito:verCarrito}]">
        <router-view @mostrarTodo="cambiarCategoria('All')" :categoria=catego :articulos=products @cambiarDetalle="cambiarDetalle" 
        @actualizarCarrito="actualizarNumeroCarrito" :carrito="carrito"></router-view>
        <!-- :categoria=catego -->
      </main>
      <aside class=""><i class="fa-solid fa-spinner fa-spin-pulse"></i></aside>
      <pie></pie>
    </div>

  </body>

</template>

<style scoped>
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
