<script setup lang="ts">
import { ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'


const props = defineProps<{
  ENDPOINT_API: string
}>()


const ENDPOINT = props.ENDPOINT_API ?? ''
const idCategoria = ref('')
const codigo = ref('')
const descripcion  = ref('')
const idUnidad = ref('')
const precio = ref('')
const existenciaProducto = ref('')
const urlImagen = ref('')




async function crearProducto() {
  await http
    .post(ENDPOINT, { 
      idCategoria: idCategoria.value, 
      codigo: codigo.value, 
      descripcion : descripcion.value,
      precio : precio.value,
      idUnidad: idUnidad.value,
      existenciaProducto: existenciaProducto.value,
      urlImagen: urlImagen.value
       })
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
            <input type="number" class="form-control" v-model="idCategoria" placeholder="IdCategoria" required />
            <label for="idCategoria">IdCategoria</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" class="form-control" v-model="codigo" placeholder="Codigo" required />
            <label for="codigo">Codigo</label>
          </div>
          <div class="form-floating mb-3">
            <input type="string" class="form-control" v-model="descripcion" placeholder="Descripcion" required />
            <label for="descripcion">Descripción</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" class="form-control" v-model="idUnidad" placeholder="IdUnidad" required />
            <label for="idUnidad">IdUnidad</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" class="form-control" v-model="precio" placeholder="Precio" required />
            <label for="precio">Precio</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" class="form-control" v-model="existenciaProducto" placeholder="ExistenciaProducto" required />
            <label for="existenciaProducto">ExistenciaProducto</label>
          </div>
          <div class="form-floating mb-3">
            <input type="string" class="form-control" v-model="urlImagen" placeholder="UrlImagen" required />
            <label for="urlImagen">UrlImagen</label>
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
