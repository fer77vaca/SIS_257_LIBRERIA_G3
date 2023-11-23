<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import type { Producto } from '@/models/producto';
import type { Venta } from '@/models/venta';

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


const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const cantidad = ref('')
const precioUnitario = ref('')
const total = ref('')
const idVenta = ref('')
const idProducto = ref('')

async function crearDetalle() {
  await http
    .post(ENDPOINT, {
      cantidad: cantidad.value,
      precioUnitario: precioUnitario.value,
      total: total.value,
      idVenta: idVenta.value,
      idProducto: idProducto.value
    })
    .then(() => router.push('/detalles'))
}

function goBack() {
  router.go(-1)
}
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/">Inicio</RouterLink>
        </li>
        <li class="breadcrumb-item">
          <RouterLink to="/detalles">Detalles</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Crear Detalle</li>
      </ol>
    </nav>
    <div class="row">
      <h2>Crear Nuevo Detalle</h2>
    </div>

    <div class="row">
      <form @submit.prevent="crearDetalle">
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
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Crear Detalle
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
