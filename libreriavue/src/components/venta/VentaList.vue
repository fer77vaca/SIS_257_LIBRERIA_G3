<script setup lang="ts">
import type { Venta } from '@/models/venta';
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios' 
import router from '@/router' 
import { format } from 'date-fns';
const props = defineProps<{
  ENDPOINT_API: string
}>();

const ENDPOINT = props.ENDPOINT_API ?? ''
var ventas = ref<Venta[]>([])

async function getVentas() {
  ventas.value = await http.get(ENDPOINT).then((response) => response.data)
}

function toEdit(id: number) {
  router.push(`/ventas/editar/${id}`)
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que desea eliminar la Venta?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getVentas())
  }
}

onMounted(() => {
  getVentas()
})
</script>

<template>
  <br><br><br><br>
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
          <tr style="background-color: black;">
            <th scope="col" style="color: white;">N°</th>
            <th scope="col" style="color: white;">Transaccion</th>
            <th scope="col" style="color: white;">Fecha</th>
            <th scope="col" style="color: white;">Usuario</th>
            <th scope="col" style="color: white;">Cliente</th>
            <th scope="col" style="color: white;">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(venta, index) in ventas" :key="venta.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ venta.transaccion }}</td>
            <td>{{ format(new Date(venta.fecha), "dd/MM/yyyy") }}</td>
            <td>{{ venta.usuario.usuario }}</td>
            <td>{{ venta.cliente.nombre }}</td>

            <!-- (venta.usuario as any).usuario -->
            
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
