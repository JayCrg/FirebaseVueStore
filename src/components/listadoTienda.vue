<script setup>
import { ref } from 'vue'
import { auth, storage } from '../firebase.js'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref as ref2, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage'
import { addDoc, collection, getFirestore, doc, getDoc, getDocs, query, where, orderBy, deleteDoc, updateDoc } from 'firebase/firestore'
import { useCollection, useFirestore } from 'vuefire'
defineProps({ 'categoria': String })

//leer por categoria
const db = useFirestore()
const productos = useCollection(query(collection(db, 'productos'), where("category", "==", categoria)))


</script>

<template>
    <section id="presentacion">
        <h1><span class="color">{{ categoria }}</span> List</h1>
    </section>
</template>