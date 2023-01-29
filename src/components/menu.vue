<script setup>
var imgHero = 'https://imgs.search.brave.com/GpRAuqJ8PZcKvurK99AFxw1rY0zOLcBrPUl_vIY17ZI/rs:fit:1038:398:1/g:ce/aHR0cDovL3d3dy5w/cm90b2NvbG8ub3Jn/L2V4dGZpbGVzL2kt/MTAzNDMtY0cuMTUx/NjAuMS5qcGcucGFn/ZXNwZWVkLmNlLlpI/S0t4eW9KVE4uanBn';
var imgEslogan = "https://imgs.search.brave.com/S2_zzqvj7WXxUw8Oi2jkGdPi5tZUbS6HjYXa9NmYMb8/rs:fit:790:790:1/g:ce/aHR0cDovL3d3dy5j/dXR5cGFzdGUuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE2/LzA0L21heGlfZW50/cmFkYS5qcGc";
var ropa1 = "https://imgs.search.brave.com/E606hkcPegU9K9vWEDUD7TE1IXnTeheLEgfMfCwLUWc/rs:fit:600:883:1/g:ce/aHR0cDovLzMuYnAu/YmxvZ3Nwb3QuY29t/Ly1xRXJJTHNYSVEy/US9Ud2lxNURWaEhz/SS9BQUFBQUFBQUJG/SS9hb2xJcnVWUzhu/MC9zMTYwMC9yb3Bh/LWRlLWludmllcm5v/LWEtbGEtbW9kYS1w/YXJhLW11amVyLmpw/Zw"
var ropa2 = "https://imgs.search.brave.com/rEB50dvqGp6nHDhyGJaP5rPSZPXiaMAINwKmaHuMKkM/rs:fit:387:581:1/g:ce/aHR0cDovL21pc2lt/YWdlbmVzZGUuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE3/LzA0L2JsdXNhcy1k/ZS1tb2RhLTMuanBn"
var ropa3 = "https://imgs.search.brave.com/5C-7rJ0jZhT7c51V4NzSl3Kf658bHmh1bfohjkUaSAw/rs:fit:682:1024:1/g:ce/aHR0cDovL2JsdWVi/b3V0aXF1ZWNvbG9t/YmlhLmZpbGVzLndv/cmRwcmVzcy5jb20v/MjAxMi8wNi9yb3Bh/LWp1dmVuaWwtaG9t/YnJlLWRpZXNlbC02/ODJ4MTAyNC5qcGc"
var patter = "[a-zA-Z0-9!#$%&'*\/=?^_`{|}~+-]([\.]?[a-zA-Z0-9!#$%&'*\/=?^_`{|}~+-])+@[a-zA-Z0-9]([^@&%$/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2,3})?"

const emit = defineEmits(['mostrarTodo']);

function mostrarTodo() {
    emit('mostrarTodo');
}

</script>

<template>
    <section id="hero">
        <img :src=imgHero alt="imagen de Cabecera">
    </section>
    <section id="eslogan">
        <div class="imgEslogan">
            <img :src=imgEslogan alt="logo" title="Mi Tienda">
        </div>
        <div class="textoEslogan">
            <h1>¡Welcome to your <span class='color'>favourite Store</span>!</h1>
            <p>Here you will everything you need for your home</p>
            <p>¡And much more!</p>
            <button id='SeeProducts' @click="mostrarTodo">See products</button>
        </div>
    </section>
    <section id="carrusel">
        <div id='imagenesCarrusel'>
            <img src="" alt="">
        </div>
    </section>
    <section id="siguenos">
        <div class="imageneRedes ropa"><img :src=ropa1 alt="Modelo Femenina"></div>
        <div class="imageneRedes ropa2"><img :src=ropa2 alt="Modelo Femenina"></div>
        <div class="imageneRedes ropa3"><img :src=ropa3 alt="Modelo Masculino"></div>
        <div class="textoRedes">
            <h1>Follow us in our <span class='color'>socials</span></h1>
            <p>And tune in with all the news!</p>
            <span class='iconos'></span>
            <div class="iconos">
                <a href="https://twitter.com/" target="_blank" title='Twitter'><i class="fa-brands fa-twitter"></i></a>
                <a href="https://www.instagram.com/" target="_blank" title='Instagram'><i
                        class="fa-brands fa-instagram"></i></a>
                <a href="https://www.facebook.com/" target="_blank" title='Facebook'><i
                        class="fa-brands fa-facebook"></i></a>
            </div>
        </div>
    </section>
    <section id="contacto">
        <h1><span class='color'>Contact us!</span></h1>
        <p>Send your email to contact you</p>
        <input type="email" placeholder="Email" :pattern=patter>
        <button>Send</button>
    </section>
</template>