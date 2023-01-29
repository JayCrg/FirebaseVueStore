<script setup>
import { ref } from 'vue'
import {auth} from '../firebase.js'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

var pattern = "[a-zA-Z0-9!#$%&'*\/=?^_`{|}~+-]([\.]?[a-zA-Z0-9!#$%&'*\/=?^_`{|}~+-])+@[a-zA-Z0-9]([^@&%$/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2,3})?"

var usuario=ref('')
var contraseña=ref('')
var usuariosign=ref('')
var contraseñasign=ref('')

function signUp(){
    createUserWithEmailAndPassword(auth, usuariosign.value, contraseñasign.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
}
function login(){
    signInWithEmailAndPassword(auth, usuario.value, contraseña.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
}
function google(){
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
}


</script>

<template>
    <div id="login">
        <section>
            <h1>Already have an account? <span class='color'>Log in</span></h1>
        </section>
        <section class='inputs login'>
            <input type="email" name="email" id="emailsign" placeholder="Your Email" :pattern="pattern"
                required v-model="usuario">
            <input type="password" name="password" id="passwordsign" placeholder="Password" required v-model="contraseña">
            <button @click="login">Send</button>
            <button @click="google">Log in with google &nbsp;<i class="fa fa-google" aria-hidden="true"></i></button>
        </section>
    </div>
    <div id='signup'>
        <section><h1>Don't you have any account yet? <span class="color">Sign Up</span></h1></section>
<section class='inputs sign'><input type="text" name="nombre" id="nombre" required placeholder='Name'>
<input type="password" name="password" id="password" placeholder='Password' required v-model="contraseñasign">
<input type="email" name="email" placeholder='Email' id="email" required :pattern="pattern" v-model="usuariosign">
<input type="tel" name="telefono" pattern="[0-9]{9}" id="telefono" required placeholder='Phone Number'>
<button @click="signUp">Send</button>
<div class='error sign'>Try inserting a Password</div>
<div class='welcome sign'>Welcome back to your <span class='color'>Favourite Store</span></div>
</section>
    </div>
</template>