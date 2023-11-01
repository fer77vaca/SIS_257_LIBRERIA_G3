<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import { RouterLink } from 'vue-router';

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const nombre = ref('')
const precio = ref('')
const unidadMonetaria = ref('')
const codigo = ref('')
const descripcion = ref('')
const id = router.currentRoute.value.params['id']

async function editarProducto() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
      nombre: nombre.value,
      precio: precio.value,
      unidadMonetaria: unidadMonetaria.value,
      codigo: codigo.value,
      descripcion: descripcion.value
    })
    .then(() => router.push('/productos'))
}

async function getProducto() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    ;(nombre.value = response.data.nombre), (precio.value = response.data.precio),
    (unidadMonetaria.value = response.data.unidadMonetaria),
    (codigo.value = response.data.codigo), (descripcion.value = response.data.descripcion)
  })
}

function goBack() {
  router.go(-1)
}

onMounted(() => {
  getProducto()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/productos">Productos</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Editar</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Editar Producto</h2>
    </div>

    <div class="row">
      <form @submit.prevent="editarProducto">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="nombre" placeholder="Nombre" required />
          <label for="nombre">Nombre</label>
        </div>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="precio" placeholder="Precio" required />
          <label for="precio">Precio</label>
        </div>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="unidadMonetaria" placeholder="Unidad Monetaria" required />
          <label for="unidadMonetaria">Unidad Monetaria</label>
        </div>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="codigo" placeholder="Código" required />
          <label for="codigo">Código</label>
        </div>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="descripcion" placeholder="Descripción" required />
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
