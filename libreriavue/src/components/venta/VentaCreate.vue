<script setup lang="ts">
import { onMounted, ref } from 'vue';
import http from '@/plugins/axios';
import router from '@/router';
import type { Usuario } from '@/models/usuario';
import type { Cliente } from '@/models/cliente';

const usuarios = ref<Usuario[]>([]);
const clientes = ref<Cliente[]>([]);
const transaccion = ref('');
const fecha = ref('');
const idUsuario = ref('');
const idCliente = ref('');

onMounted(async () => {
  try {
    usuarios.value = await http.get('usuarios').then((response) => response.data);
    clientes.value = await http.get('clientes').then((response) => response.data);
  } catch (error) {
    console.error('Error al obtener usuarios o clientes:', error);
  }
});

async function crearVenta() {
  try {
    await http.post(ENDPOINT, {
      transaccion: transaccion.value,
      fecha: fecha.value,
      idUsuario: idUsuario.value,
      idCliente: idCliente.value,
    });

    // Redirigir después de una venta exitosa
    router.push('/ventas');
  } catch (error) {
    console.error('Error al crear venta:', error);
    // Puedes mostrar un mensaje de error al usuario si lo deseas
  }
}

function goBack() {
  router.go(-1);
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
                    <RouterLink to="/ventas">Ventas</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Crear Ventas</li>
            </ol>
        </nav>
        <br><br><br>
        <div class="row">
            <h2>Crear Nueva Venta</h2>
        </div>

        <div class="row">
            <form @submit.prevent="crearVenta()">
                <div class="form-floating mb-3">
                    <input type="string" class="form-control" v-model="transaccion" placeholder="Transaccion" required />
                    <label for="transaccion">Transaccion</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="Date" class="form-control" v-model="fecha" placeholder="Fecha" required />
                    <label for="fecha">Fecha</label>
                </div>

                <div class="form-floating mb-3">
                    <br>
                    <label for="idUsuario">Usuario</label>
                    <br>
                    <select v-model="idUsuario" class="form-select">
                        <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.usuario">
                            {{ usuario.usuario }}
                        </option>
                    </select>
                </div>

                <div class="form-floating mb-3">
                    <select v-model="idCliente" class="form-select">
                        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.nombre }}
                        </option>
                    </select>
                    <label for="idCliente">Cliente</label>
                </div>



                <div class="text-center mt-3">
                    <button type="submit" class="btn btn-primary btn-lg">
                        <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Crear
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
