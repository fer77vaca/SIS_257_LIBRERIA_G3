<script setup lang="ts">
import type { Detalle } from '@/models/detalle'; 
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios' 
import router from '@/router' 

const props = defineProps<{
  ENDPOINT_API: string
}>();

const ENDPOINT = props.ENDPOINT_API ?? ''
var detalles = ref<Detalle[]>([]) 

async function getDetalles() {
  detalles.value = await http.get(ENDPOINT).then((response) => response.data)
}

function toEdit(id: number) {
  router.push(`detalles/editar/${id}`)
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el Detalle?') 
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getDetalles()) 
  }
}

onMounted(() => {
  getDetalles()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Detalles</li> 
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de Detalles</h2> 
      <div class="col-12">
        <RouterLink to="/detalles/crear"> 
          <font-awesome-icon icon="fa-solid fa-plus" /> Crear Nuevo
        </RouterLink>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio_Unitario</th> 
            <th scope="col">Total</th> 
            <th scope="col">Transaccion</th> 
            <th scope="col">Nombre_Producto</th> 
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detalle, index) in detalles" :key="detalle.id"> 
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ detalle.cantidad }}</td> 
            <td>{{ detalle.precioUnitario }}</td>
            <td>{{ detalle.total }}</td>
            <td>{{ detalle.idVenta }}</td>
            <td>{{ detalle.producto.descripcion }}</td>
            <td>
              <button class="btn text-success" @click="toEdit(detalle.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
              </button>
              <button class="btn text-danger" @click="toDelete(detalle.id)">
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
