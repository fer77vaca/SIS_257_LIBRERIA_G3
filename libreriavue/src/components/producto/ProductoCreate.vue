<script setup lang="ts">
import { ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'


const props = defineProps<{
  ENDPOINT_API: string
}>()


const ENDPOINT = props.ENDPOINT_API ?? ''
const nombre = ref('')
const precio = ref('')
const unidadMonetaria  = ref('')
const codigo = ref('')
const descripcion = ref('')



async function crearProducto() {
  await http
    .post(ENDPOINT, { nombre: nombre.value, precio: precio.value, unidadMonetaria : unidadMonetaria .value, codigo: codigo.value,descripcion: descripcion.value })
    .then(() => router.push('/productos')) 
}

function goBack() {
  router.go(-1)
}
</script>

<template>
    <div class="container">
      <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/productos">Productos</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Crear</li>
      </ol>
    </nav>
      <div class="row">
        <h2>Crear Nuevo Producto</h2>
      </div>
  
      <div class="row">
        <form @submit.prevent="crearProducto()">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" v-model="nombre" placeholder="Nombre" required />
            <label for="nombre">Nombre</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" class="form-control" v-model="precio" placeholder="Precio" required />
            <label for="precio">Precio</label>
          </div>
          <div class="form-floating mb-3">
            <input type="string" class="form-control" v-model="unidadMonetaria" placeholder="Unidad Monetaria" required />
            <label for="unidadMonetaria">Unidad Monetaria</label>
          </div>
          <div class="form-floating mb-3">
            <input type="string" class="form-control" v-model="codigo" placeholder="Código" required />
            <label for="codigo">Código</label>
          </div>
          <div class="form-floating mb-3">
            <input type="string " class="form-control" v-model="descripcion" placeholder="Descripción" required />
            <label for="descripcion">Descripción</label>
          </div>
          <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Crear
          </button>
        </div>
        </form>
      </div>
      <div class="text-left">
        <button class="btn btn-link" @click="goBack">Volver</button>
      </div>
    </div>
  </template>
  

<style></style>
