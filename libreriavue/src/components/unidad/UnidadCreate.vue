<script setup lang="ts">
import { ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''

const descripcion = ref('')

async function crearUnidad() { 
  await http
    .post(ENDPOINT, { descripcion: descripcion.value })
    .then(() => router.push('/unidades'))  
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
        <li class="breadcrumb-item"> </li>
          <RouterLink to="/unidades">Unidades</RouterLink>  
        <li class="breadcrumb-item active" aria-current="page">Crear</li>
      </ol>
    </nav>
    <div class="row">
      <h2>Crear Nueva Unidad</h2>  
    </div>
    <div class="row">
      <form @submit.prevent="crearUnidad">  
        
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
