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

const props = defineProps(['categoria', 'articulos'])
const emit = defineEmits(['cambiarDetalle'])
function irAlDetalle(articulo) {
    router.push({
        name: 'detalle', params: {
            id: articulo.id,
            title: articulo.title,
            price: articulo.price,
            description: articulo.description,
            image: articulo.image,
            category: articulo.category,
            rating: articulo.rating,
            count: articulo.count,
        }
    });
    emit('cambiarDetalle')
}

</script>

<template>
    <section id="presentacion">
        <h1><span class="color">{{ categoria }}</span></h1>
    </section>
    <section id="listadoProductos">
        <template v-for="articulo in articulos" :key="articulo.id">
            <producto :categoria2="categoria" :articulo="articulo" @click="irAlDetalle(articulo)"></producto>
        </template>
    </section>
</template>