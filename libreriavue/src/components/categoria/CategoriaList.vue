<script setup lang="ts">
import type { Categoria } from '@/models/categoria'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var categorias = ref<Categoria[]>([])

async function getCategorias() {
  categorias.value = await http.get(ENDPOINT).then((response) => response.data)
}

function toEdit(id: number) {
  router.push(`categorias/editar/${id}`)
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar la Categoría?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getCategorias())
  }
}

onMounted(() => {
  getCategorias()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Categorías</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de Categorías</h2>
      <div class="col-12">
        <RouterLink to="/categorias/crear">
          <font-awesome-icon icon="fa-solid fa-plus" /> Crear Nueva Categoría
        </RouterLink>
      </div>
    </div>

    <div class="table-responsive" >
      <table class="table table-bordered" >
        <thead>
          <tr style="background-color: black;">
            <th scope="col" style="color: white;">N°</th>
            <th scope="col" style="color: white;">Descripción</th>
            <th scope="col" style="color: white;">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(categoria, index) in categorias.values()" :key="categoria.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ categoria.descripcion }}</td>
            <td>
              <button class="btn text-success" @click="toEdit(categoria.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
                Editar
              </button>
              <button class="btn text-danger" @click="toDelete(categoria.id)">
                <font-awesome-icon icon="fa-solid fa-trash" />
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
