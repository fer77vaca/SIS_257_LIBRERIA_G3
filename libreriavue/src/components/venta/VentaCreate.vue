<script setup lang="ts">
import { ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'


const props = defineProps<{
    ENDPOINT_API: string
}>()


const ENDPOINT = props.ENDPOINT_API ?? ''
const fechaVenta = ref('')


async function crearVenta() {
    await http
        .post(ENDPOINT, {
            fechaVenta: fechaVenta.value,
        })
        .then(() => router.push('/ventas'))
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
                    <RouterLink to="/ventas">Ventas</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Crear Ventas</li>
            </ol>
        </nav>
        <div class="row">
            <h2>Crear Nueva Venta</h2>
        </div>

        <div class="row">
            <form @submit.prevent="crearVenta()">
                <div class="form-floating mb-3">
                    <input type="Date" class="form-control" v-model="fechaVenta" required />
                    <label for="fechaVenta">Fecha</label>
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
