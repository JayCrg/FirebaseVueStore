<script setup>
import { ref } from 'vue'
import { auth, storage } from '../firebase.js'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref as ref2, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage'
import { addDoc, collection, getFirestore, doc, getDoc, getDocs, query, where, orderBy, deleteDoc, updateDoc } from 'firebase/firestore'
import { useCollection, useFirestore } from 'vuefire'

//guardamos productos en firebase
var categoria = ref('')
var titulo = ref('')
var descripcion = ref('')
var precio = ref('')
var rating = ref('')
var count = ref('')

var file = ref()
function subirArchivo() {
  const storageRef = ref2(storage, file.value.files[0].name);
  uploadBytes(storageRef, file.value.files[0]).then((snapshot) => {
    getDownloadURL(storageRef).then((url) => {
      guardarProducto(url)
    })
  });
}
function guardarProducto(url) {
  var articulo = {
    title: titulo.value,
    category: categoria.value,
    description: descripcion.value,
    price: precio.value,
    rating: rating.value,
    count: count.value,
    image: url
  }
  crearArticuloFirebase(articulo)
  titulo.value = ''
  descripcion.value = ''
  precio.value = ''
  rating.value = ''
  count.value = ''
  file.value=''
}
const db = useFirestore()
function crearArticuloFirebase(articulo) {
  const docRef = addDoc(collection(db, "productos"), articulo);
}

//leer de firebase lista de productos
const productos = useCollection(collection(db, 'productos'))

//borrar de firebase
function eliminarProducto(id) {
  deleteDoc(doc(db, "productos", id))
}



//seccion usuario
function salir() {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  })
}
var nombreUsuario = ref('')
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid
    nombreUsuario.value = user.email
  } else {

  }
})
</script>

<template>
  <div id="admin">
    <div class="presentacion">
      <h1>Panel de Administracion</h1>
      <h1>Bienvenido {{ nombreUsuario }}</h1>
      <button @click=salir>Cerrar sesion</button>
    </div>
    <div class="formularioAdmin">
      <h2>Insertar nuevo producto</h2>
      <label for="titulo">Title</label>
      <input type="text" id="titulo" v-model=titulo>
      <label for="categoria">Category</label>
      <select name="categoria" id="categoria" v-model="categoria">
        <option value="Men's clothing">Men's clothing</option>
        <option value="Women's clothing">Women's clothing</option>
        <option value="Electronics">Electronics</option>
        <option value="Jewelery">Jewelery</option>
      </select>
      <textarea name="descripcion" id="descripcion" cols="45" rows="5" placeholder="Insert description"
        v-model="descripcion"></textarea>
      <label for="precio">Precio</label>
      <input type="number" id="precio" v-model="precio">
      <label for="rating">Rating</label>
      <input type="number" name="rating" id="rating" v-model="rating">
      <label for="count">Votos</label>
      <input type="number" name="count" id="count" v-model="count">
      <label for="file">Sube archivo</label>
      <input type="file" id="file" ref="file">
      <button @click=subirArchivo>Guardar Producto</button>      
    </div>
  </div>
  <div id="listaObjetos">
    <h2>Lista de productos</h2>
        <div class="producto" v-for="producto in productos" :key="producto.id">
          <div class="imagenAcompañamiento">
            <img :src="producto.image" alt="">
          </div>
          <div class="info">
            <h3>{{ producto.title }}</h3>
            <p>{{ producto.description }}</p>
            <p>Price: {{ producto.price }}€</p>
            <p>Rating: {{ producto.rating }}<i class="fa-solid fa-star"></i></p>
            <p>Votes: {{ producto.count }}</p>
            <button class="eleminarDeBD" @click=eliminarProducto(producto.id)>Eliminar</button>
          </div>
        </div>
  </div>
</template>

