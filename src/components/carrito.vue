<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps(['carrito'])
const emit = defineEmits(['actualizarCarrito'])
function getCarritoTotal() {
    var total = 0
    for (let i = 0; i < props.carrito.length; i++) {
        total += props.carrito[i].price * props.carrito[i].cantidad
    }
    return total
}
function borrarProducto(index) {
    props.carrito.splice(index, 1)
    localStorage.setItem('carrito', JSON.stringify(props.carrito))
    emit('actualizarCarrito')
}

function sumarCantidad(index) {
    props.carrito[index].cantidad++
    localStorage.setItem('carrito', JSON.stringify(props.carrito))
    emit('actualizarCarrito')
}
function restarCantidad(index) {
    if (props.carrito[index].cantidad > 1) {
        props.carrito[index].cantidad--
        localStorage.setItem('carrito', JSON.stringify(props.carrito))
        emit('actualizarCarrito')
    }
    else
        borrarProducto(index)
}


</script>

<template>
    <section>
        <h1>Your <span class="color">cart</span></h1>
    </section>
    <section id="listadoCarrito">
        <template v-for="prod, index in carrito" :key="index">
            <article class='producto' :id='prod.id-prod.talla'>
                <div class="imagenProductoCarrito">
                    <img :src="prod.image" :alt="prod.title">
                </div>
                <div class="info">
                    <h2>{{ prod.title }}</h2>
                    <p>{{ prod.price }}</p>
                    <p class='cantProd'>Quantity: {{ prod.cantidad }}</p>
                    <div class="cambiarCantidad">
                        <p class='restar' @click="restarCantidad(index)"  title='Restar Unidad'><i class="fa-solid fa-minus"></i></p>
                        <p class='sumar' @click="sumarCantidad(index)"  title='Sumar Unidad'><i class="fa-solid fa-plus"></i></p>
                    </div>
                </div>
                <p class='tallaje' v-if="prod.talla != ' '">Size: {{ prod.talla }}</p>
                <p class='eliminar' title='Eliminar Producto' @click="borrarProducto(index)"><i class="fa-solid fa-trash"></i></p>
            </article>
        </template>
    </section>
    <section id="totalCarrito">
        <p>Total: <span class="color">{{Math.round((getCarritoTotal() + Number.EPSILON) * 100) / 100}}€</span></p>
        <button class='botonCompra'>Comprar</button>
    </section>
</template>