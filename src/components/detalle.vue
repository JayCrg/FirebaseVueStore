<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps(['category', 'title', 'price', 'description', 'image', 'rating', 'count'])
const emit = defineEmits(['actualizarCarrito'])
var talla = 'M'
var carrito = ref([]);
function agregarACarrito() {

    if (localStorage.getItem("carrito") != null){
        tomarDeLocalStorage()
        for (let i = 0; i < carrito.value.length; i++) {
            if (carrito.value[i].title == props.title && (carrito.value[i].talla == talla || carrito.value[i].talla == ' ' && talla == 'M')) {
                carrito.value[i].cantidad++
                guardarEnLocalStorage()
    emit('actualizarCarrito')

                return
            }
        }
    }
    carrito.value.push({
        title: props.title,
        price: props.price,
        description: props.description,
        image: props.image,
        category: props.category,
        rating: props.rating,
        count: props.count,
        talla: talla=='M' && !props.category.includes('clothing') ? " ": talla,
        cantidad: 1
    })
    guardarEnLocalStorage()
    emit('actualizarCarrito')
}
function guardarEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito.value))
}
function tomarDeLocalStorage() {
    carrito.value = JSON.parse(localStorage.getItem('carrito'))
}

</script>

<template>
    <section id="especificaciones">
        <div class='textoProducto'>
            <h1>{{ title }}</h1>
            <p>{{ price }}€</p>
            <p>{{ rating }}<i class="fa-solid fa-star"></i> {{ count }}</p>
            <p>{{ description }}</p>
            <select class="tallas" v-if="category.includes('clothing')" v-model="talla">
                <option  disabled="disabled">Seleccione Una Talla</option>
                <option value="S">Talla S</option>
                <option selected="M" value="M">Talla M</option>
                <option value="L">Talla L</option>
            </select>
        <button @click="agregarACarrito" >Añadir al carrito</button>
        </div>

        <div class='imagenProducto'>
            <img :src='image'>
        </div>
    </section>

</template>
