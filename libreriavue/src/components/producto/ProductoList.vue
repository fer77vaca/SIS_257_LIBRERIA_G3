<script setup lang="ts">

import type { Producto } from '@/models/producto'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import { useAuthStore } from "@/stores/index";

import Carrito from './components/Carrito.vue';

const authStore = useAuthStore();

const props = defineProps({
  ENDPOINT_API: String
})


const ENDPOINT = props.ENDPOINT_API ?? ''
var productos = ref<Producto[]>([])


async function getProductos() {
  productos.value = await http.get(ENDPOINT).then((response) => response.data)
}

function toEdit(id: number) {
  router.push(`/productos/editar/${id}`)
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el Producto?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getProductos())
  }
}

onMounted(() => {
  getProductos()
})
/*
watch(producto.precio,(antes, ahora)=>{
  console.log(antes, ahora);
})*/

</script>



<template>
  <div v-if="authStore.token">
    <div class="find-us">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="section-heading">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <RouterLink to="/">Inicio</RouterLink>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">Productos</li>
                </ol>
              </nav>
              <h2 style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Lista de Productos
              </h2>
              <div class="col-12">
              </div>
            </div>
            <RouterLink  to="/productos/crear">Crear Nuevo
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <br>
    <div class="container">
      <div class="table-responsive">
        <table class="table table-dark table-striped">
          <thead>
            <tr style="background-color: black;">
              <th scope="col">N°</th>
              <th scope="col">Categoría</th>
              <th scope="col">Código</th>
              <th scope="col">Descripción</th>
              <th scope="col">Unidad</th>
              <th scope="col">Precio</th>
              <th scope="col">Existencia Producto</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>

            <tr class="table-light" v-for="(producto, index) in productos.values()" :key="producto.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ producto.categoria.descripcion }}</td>
              <td>{{ producto.codigo }}</td>
              <td>{{ producto.descripcion }}</td>
              <td>{{ producto.unidad.descripcion }}</td>
              <td>{{ producto.precio }}</td>
              <td>{{ producto.existenciaProducto }}</td>
              <td>
              <button class="btn text-success" @click="toEdit(producto.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
              </button>
              <button class="btn text-danger" @click="toDelete(producto.id)">
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>



  <div class="find-us">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-heading">
            <h2 style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">VISTA DE PRODUCTOS</h2>
          </div>
        </div>
      </div>
    </div>
  </div>




  <div class="container">
    <div class="row">
      <div v-for="p in productos" class="col-md-4">
        <div class="product-item">
          <a href="#">
            <img :src="p.urlImagen" alt="Producto"
              style="width: 232px; height: 232px; border: 1px solid #808080; border-radius: 10px;">
          </a>
          <div v-if="p.existenciaProducto >= 1" >
            <div class="down-content">
              <a href="/detalles/crear">
                <h4>{{ p.descripcion }}</h4>
              </a>
              <h6>Bs{{ p.precio }}</h6>
              <p >{{ p.unidad.descripcion }}</p>
              <h7>DISPONIBLE</h7>
              <br><br><br>
            </div>
          </div>

          <div v-else>
            <div class="down-content">
              <a href="/detalles/crear">
                <h4 ><del> {{ p.descripcion }}</del></h4>
              </a>
              <h6>Bs{{ p.precio }}</h6>
              <p></p>
              <h4>ARTÍCULO</h4>
              <h4>AGOTADO</h4>
            </div>
          </div>
          <div>
            <button>Añadir-Carrito</button>
          </div>
          <br>
          <br>
        </div>
      </div>
    </div>
  </div>

  
</template>

<style>

del{
  color: red;
}
</style>