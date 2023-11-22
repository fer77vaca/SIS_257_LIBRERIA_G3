<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const usuario = ref('')
const clave = ref('')
const email = ref('')
const rol = ref('')
const premiun = ref('')
const id = router.currentRoute.value.params['id']

async function editarUsuario() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
      usuario: usuario.value,
      clave: clave.value,
      email: email.value,
      rol: rol.value,
      premiun: premiun.value
    })
    .then(() => router.push('/usuarios'))
}

async function getUsuario() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    usuario.value = response.data.usuario
    clave.value = response.data.clave
    email.value = response.data.email
    rol.value = response.data.rol
    premiun.value = response.data.premiun
  })
}

function goBack() {
  router.go(-1)
}

onMounted(() => {
  getUsuario()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/">Inicio</RouterLink>
        </li>
        <li class="breadcrumb-item">
          <RouterLink to="/usuarios">Usuarios</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Editar</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Editar Usuario</h2>
    </div>

    <div class="row">
      <form @submit.prevent="editarUsuario">
        <div class="form-floating mb-3">
          <input type="string" class="form-control" v-model="usuario" placeholder="usuario" required />
          <label for="usuario">usuario</label>
        </div>
        <div class="form-floating mb-3">
          <input type="string" class="form-control" v-model="clave" placeholder="clave" required />
          <label for="clave">clave</label>
        </div>
        <div class="form-floating mb-3">
          <input type="string" class="form-control" v-model="email" placeholder="Email" required />
          <label for="email">Email</label>
        </div>
        <div class="form-floating mb-3">
          <input type="string" class="form-control" v-model="rol" placeholder="Rol" required />
          <label for="rol">Rol</label>
        </div>
        <div class="form-floating mb-3">
          <input type="bool" class="form-control" v-model="premiun" placeholder="premiun" required />
          <label for="premiun">premiun</label>
        </div>
        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">Guardar</button>
        </div>
      </form>
    </div>
    <div class="text-left">
      <button class="btn btn-link" @click="goBack">Volver</button>
    </div>
  </div>
</template>

<style></style>
