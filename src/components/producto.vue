<script setup>
import producto from './producto.vue'
import { ref, onMounted } from 'vue'
import { auth, storage } from '../firebase.js'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref as ref2, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage'
import { addDoc, collection, getFirestore, doc, getDoc, getDocs, query, where, orderBy, deleteDoc, updateDoc } from 'firebase/firestore'
import { useCollection, useFirestore } from 'vuefire'
import { createDOMCompilerError } from '@vue/compiler-dom';
import { router } from '../main.js'
import { RouterLink, RouterView } from 'vue-router'
defineProps(['articulo', 'categoria2'])

</script>

<template>
    <article class="producto" :id="articulo.id" v-if="articulo.category==categoria2">
                <div class="imagenProducto">
                <img :src="articulo.image" alt="imagen">
                </div>
                <h2>{{ articulo.title }}</h2>
                <p>Price: {{ articulo.price }}€</p>
                </article>
</template>