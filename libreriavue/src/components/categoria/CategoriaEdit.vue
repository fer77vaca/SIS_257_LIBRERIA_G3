<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import { RouterLink } from 'vue-router';

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const descripcion = ref('')
const id = router.currentRoute.value.params['id']

async function editarCategoria() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
      descripcion: descripcion.value
    })
    .then(() => router.push('/categorias'))
}

async function getCategoria() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    ;(descripcion.value = response.data.descripcion)
  })
}

function goBack() {
  router.go(-1)
}

onMounted(() => {
  getCategoria()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/categorias">Categorías</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Editar</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Editar Categoría</h2>
    </div>

    <div class="row">
      <form @submit.prevent="editarCategoria">
        
        <div class="form-floating mb-3">
          <input type="string" class="form-control" v-model="descripcion" placeholder="Descripción" required />
          <label for="descripcion">Descripción</label>
        </div>
        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Guardar
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
