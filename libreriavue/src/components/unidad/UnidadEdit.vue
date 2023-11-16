<script setup lang="ts">
import { onMounted, ref } from 'vue';
import http from '@/plugins/axios';
import router from '@/router';
import { RouterLink } from 'vue-router';

const props = defineProps<{
  ENDPOINT_API: string;
}>();

const ENDPOINT = props.ENDPOINT_API ?? '';
const descripcion = ref('');
const id = router.currentRoute.value.params['id'];

async function editarUnidad() {  
  try {
    await http.patch(`${ENDPOINT}/${id}`, { descripcion: descripcion.value });
    router.push('/unidades');
  } catch (error) {
    console.error('Error al editar la unidad:', error);
  }
}

async function getUnidad() {  
  try {
    const response = await http.get(`${ENDPOINT}/${id}`);
    descripcion.value = response.data.descripcion;
  } catch (error) {
    console.error('Error al obtener datos de la unidad:', error);
  }
}

function goBack() {
  router.go(-1);
}

onMounted(() => {
  getUnidad();
});
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/unidades">Unidades</RouterLink>  
        </li>
        <li class="breadcrumb-item active" aria-current="page">Editar</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Editar Unidad</h2> 

      <div class="row">
        <form @submit.prevent="editarUnidad"> 
          <div class="form-floating mb-3">
            <input type="text" class="form-control" v-model="descripcion" placeholder="Descripción" required />
            <label for="descripcion">Descripción</label>
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
  </div>
</template>

<style></style>
