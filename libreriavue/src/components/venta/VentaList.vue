<script setup lang="ts">
import type { Venta } from '@/models/venta';
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios' 
import router from '@/router' 

const props = defineProps<{
  ENDPOINT_API: string
}>();

const ENDPOINT = props.ENDPOINT_API ?? ''
const ventas = ref<Venta[]>([])

async function getVentas() {
  ventas.value = await http.get(ENDPOINT).then((response) => response.data)
}

function toEdit(id: number) {
  router.push(`/ventas/editar/${id}`)
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que desea eliminar la Venta?')
  if (r) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getVentas())
  }
}

onMounted(() => {
  getVentas()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Ventas</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de Ventas</h2>
      <div class="col-12">
        <RouterLink to="/ventas/crear">
          <font-awesome-icon icon="fa-solid fa-plus" /> Crear Nuevo
        </RouterLink>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Fecha</th>
            
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(venta, index) in ventas" :key="venta.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ venta.fechaVenta }}</td>
            
            <td>
              <button class="btn text-success" @click="toEdit(venta.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
              </button>
              <button class="btn text-danger" @click="toDelete(venta.id)">
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
