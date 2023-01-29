<script setup>
import {auth, storage} from './firebase.js'
import {onAuthStateChanged, signOut} from "firebase/auth";

import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import pie from './components/pie.vue'
//leer de firebase
import {useCollection, useFirestore} from 'vuefire'
import {doc, collection, getDocs, query, where, orderBy, addDoc, deleteDoc, updateDoc} from 'firebase/firestore'
const db = useFirestore()
const chores = useCollection(collection(db, 'recordatorios'))

//insertar en firebase
function crearArticuloFirebase(articulo){
  const docRef = addDoc(collection(db, "articulos"), articulo);
}
//añadir a firebase con id
function borrarCompletadasFirebase(){
  for(var i = 0; i < chores.value.length; i++){
    if(chores.value[i].hecho){
      deleteDoc(doc(db, "tarea", chores.value[i].idTar))
    }
  }
}

function actualizarArticuloFirebase(nota){
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
  } else {
    estaAutentificado.value = false
  }
})

var catego = ref('');
var objetos = ref([]);
var carrito = ref([]);
var cantidadProductos = ref(0);
var verFormulario = ref(false);

function cambiarFormulario(){
  verFormulario.value = true
  console.log(verFormulario.value);
}
function quitarFormulario(){
  verFormulario.value = false
  console.log(verFormulario.value); 
}

function cambiarCategoria(categoria) {
    catego.value = categoria;
}
function mostrarProductos(){
console.log('Mostrar productos');
}



</script>

<template>
  <body>
    <div class="container">
        <header>
            <router-link to="/" class="logo" @click="quitarFormulario">
                <img src="./assets/99b0e593f9237abf16df5cb1b1a87735.webp" alt="logo" title="Mi Tienda">
            </router-link>
            <nav class="search">
                <ul>
                    <li id="hombre" title="Men" @click="cambiarCategoria('Men')"><router-link class="router" to="/listadoTienda">Men</router-link></li>
                    <li id="mujer" title="Women" @click="cambiarCategoria('Women')"><router-link class="router" to="/listadoTienda">Women</router-link></li>
                    <li id="joyeria" title="Jewelry" @click="cambiarCategoria('Jewelry')"><router-link class="router" to="/listadoTienda">Jewelry</router-link></li>
                    <li id="electro" title="Electronics" @click="cambiarCategoria('Electronics')"><router-link class="router" to="/listadoTienda">Electronics</router-link></li>
                    <li id="electro" title="Electronics" @click="cambiarCategoria('All')"><router-link class="router" to="/listadoTienda">Full Catalogue</router-link></li>
                </ul>
            </nav>
            <div class="log-shop">
                <ul>
                  <button v-if=!estaAutentificado id="inicio" title="Login"><router-link to="/registro" class="router" @click="cambiarFormulario">Login</router-link></button>
                  <button v-else id="inicio2" title="Logout"><router-link to="/admin" class="router" @click="cambiarFormulario">Perfil admin</router-link></button>
                    <li title="Carrito"><router-link to="/carrito" class="router"><i class="fa-solid fa-cart-shopping"></i>
                       <span :class="['cantidadProductos',{llena:carrito.length > 0}]">{{ carrito.length }}</span></router-link>
                    </li>
                </ul>
            </div>
          </header>
          <main :class="[{formulario:verFormulario}]">
            <router-view @mostrarTodo=mostrarProductos :categoria=catego></router-view>
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
