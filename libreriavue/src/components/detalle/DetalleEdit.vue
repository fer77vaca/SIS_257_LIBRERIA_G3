<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import { RouterLink } from 'vue-router';
import type { Producto } from '@/models/producto';
import type { Venta } from '@/models/venta';
const props = defineProps<{
  ENDPOINT_API: string
}>()
var productos = ref<Producto[]>([])
async function getProductos() {
  productos.value = await http.get("productos").then((response) => response.data)
}

onMounted(() => {
  getProductos()
})

var ventas = ref<Venta[]>([])
async function getVentas() {
  ventas.value = await http.get("ventas").then((response) => response.data)
}

onMounted(() => {
  getVentas()
})


const ENDPOINT = props.ENDPOINT_API ?? ''
const cantidad = ref('')
const precioUnitario = ref('')
const total = ref('') 
const idVenta = ref('') 
const idProducto = ref('') 
const id = router.currentRoute.value.params['id']

async function editarDetalle() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
      cantidad: cantidad.value,
      precioUnitario: precioUnitario.value,
      total: total.value, 
      idVenta: idVenta.value, 
      idProducto: idProducto.value 
    })
    .then(() => router.push('/detalles')) 
}

async function getDetalle() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    ;(cantidad.value = response.data.cantidad), 
    (precioUnitario.value = response.data.precioUnitario), 
    (total.value = response.data.total), 
    (idVenta.value = response.data.idVenta), 
    (idProducto.value = response.data.idProducto)
  })
}

function goBack() {
  router.go(-1)
}

onMounted(() => {
  getDetalle()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/detalles">Detalles</RouterLink> <!-- Cambiamos '/productos' a '/detalles' -->
        </li>
        <li class="breadcrumb-item active" aria-current="page">Editar</li> <!-- Cambiamos "Editar Producto" a "Editar" -->
      </ol>
    </nav>

    <div class="row">
      <h2>Editar Detalle</h2> <!-- Cambiamos "Editar Producto" a "Editar Detalle" -->
    </div>

    <div class="row">
      <form @submit.prevent="editarDetalle">
        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="cantidad" placeholder="Cantidad" required />
          <label for="cantidad">Cantidad</label>
        </div>
        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="precioUnitario" placeholder="Precio Unitario" required />
          <label for="precioUnitario">Precio Unitario</label>
        </div>
        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="total" placeholder="Total" required />
          <label for="total">Total</label>
        </div>
        <div class="form-floating mb-3">
          <select v-model="idVenta" class="form-select">
            <option v-for="venta in ventas" :key="venta.id" :value="venta.id">
              {{ venta.transaccion }} 
            </option>
          </select>
          <label for="transaccion">transacción</label>
        </div>

        <div class="form-floating mb-3">
          <br>
          <label for="idProducto">Nombre del Producto</label>
          <br>
          <select v-model="idProducto" class="form-select" required>
            <option v-for="producto in productos" :key="producto.id" :value="producto.id">
              {{ producto.descripcion }}
            </option>
          </select>
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
