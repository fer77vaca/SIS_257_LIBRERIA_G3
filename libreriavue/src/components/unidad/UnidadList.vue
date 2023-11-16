<script setup lang="ts">
import type { Unidad } from '@/models/unidad';  
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios' 
import router from '@/router' 

const props = defineProps<{
  ENDPOINT_API: string
}>();

const ENDPOINT = props.ENDPOINT_API ?? ''
var unidades = ref<Unidad[]>([]) 

async function getUnidades() {
  unidades.value = await http.get(ENDPOINT).then((response) => response.data)
}

function toEdit(id: number) {
  router.push(`unidades/editar/${id}`)
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar la Unidad?')  
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getUnidades())  
  }
}

onMounted(() => {
  getUnidades()  
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Unidades</li> 
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de Unidades</h2> 
      <div class="col-12">
        <RouterLink to="/unidades/crear"> 
          <font-awesome-icon icon="fa-solid fa-plus" /> Crear Nuevo
        </RouterLink>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Descripción</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(unidad, index) in unidades.values()" :key="unidad.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ unidad.descripcion }}</td>
            <td>
              <button class="btn text-success" @click="toEdit(unidad.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
                Editar
              </button>
              <button class="btn text-danger" @click="toDelete(unidad.id)">
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
