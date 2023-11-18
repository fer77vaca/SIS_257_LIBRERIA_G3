<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const transaccion = ref('')
const fecha = ref('')
const idUsuario = ref('')
const idCliente = ref('')
const id = router.currentRoute.value.params['id']

async function editarVenta() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
      transaccion: transaccion.value,
      echa: fecha.value,
      idUsuario: idUsuario.value,
      idCliente: idCliente.value
    })
    .then(() => router.push('/ventas'))
}

async function getVenta() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    transaccion.value = response.data.transaccion
    fecha.value = response.data.fecha
    idUsuario.value = response.data.idUsuario
    idCliente.value = response.data.idCliente
  })
}

function goBack() {
  router.go(-1)
}

onMounted(() => {
  getVenta()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/ventas">Ventas</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Editar</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Editar Venta</h2>
    </div>

    <div class="row">
      <form @submit.prevent="editarVenta">
        <div class="form-floating mb-3">
                    <input type="string" class="form-control" v-model="transaccion" placeholder="Transaccion" required />
                    <label for="transaccion">Transaccion</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="Date" class="form-control" v-model="fecha" placeholder="Fecha" required />
                    <label for="fecha">Fecha</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="number" class="form-control" v-model="idUsuario" placeholder="IdUsuario" required />
                    <label for="idUsuario">IdUsuario</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="number" class="form-control" v-model="idCliente" placeholder="IdCliente" required />
                    <label for="idCliente">IdCliente</label>
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
