<script setup lang="ts">
import type { Cliente } from '@/models/cliente';
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios' 
import router from '@/router' 

const props = defineProps<{
  ENDPOINT_API: string
}>();

const ENDPOINT = props.ENDPOINT_API ?? ''
const clientes = ref<Cliente[]>([])

async function getClientes() {
  clientes.value = await http.get(ENDPOINT).then((response) => response.data)
}

function toEdit(id: number) {
  router.push(`/clientes/editar/${id}`)
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que desea eliminar el Cliente?')
  if (r) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getClientes())
  }
}

onMounted(() => {
  getClientes()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Clientes</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de Clientes</h2>
      <div class="col-12">
        <RouterLink to="/clientes/crear">
          <font-awesome-icon icon="fa-solid fa-plus" /> Crear Nuevo
        </RouterLink>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr style="background-color: black;">
            <th scope="col" style="color: white;">N°</th>
            <th scope="col" style="color: white;">Nombre</th>
            <th scope="col" style="color: white;">Telefono</th>
            <th scope="col" style="color: white;">NIT</th>
            <th scope="col" style="color: white;">RazonSocial</th>
            <th scope="col" style="color: white;">Direccion</th>
            <th scope="col" style="color: white;">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cliente, index) in clientes" :key="cliente.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ cliente.nombre }}</td>
            <td>{{ cliente.telefono }}</td>
            <td>{{ cliente.nit }}</td>
            <td>{{ cliente.razonSocial }}</td>
            <td>{{ cliente.direccion }}</td>
          
            <td>
              <button class="btn text-success" @click="toEdit(cliente.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
                Editar
              </button>
              <button class="btn text-danger" @click="toDelete(cliente.id)">
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
