import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '@/stores'
import { getTokenFromLocalStorage } from '@/helpers'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: LoginView },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/productos',
      name: 'productos',
      component: () => import('../views/ProductoView.vue'),
      children: [
        { path: '', component: () => import('../components/producto/ProductoList.vue') },
        { path: 'crear', component: () => import('../components/producto/ProductoCreate.vue') },
        {
          path: 'editar/:id',
         component: () => import('../components/producto/ProductoEdit.vue')
        }
      ]
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../views/UsuarioView.vue'),
      children: [
        { path: '', component: () => import('../components/usuario/UsuarioList.vue') },
        { path: 'crear', component: () => import('../components/usuario/UsuarioCreate.vue') },
        {
          path: 'editar/:id',
          component: () => import('../components/usuario/UsuarioEdit.vue')
        }
      ]
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('../views/ClienteView.vue'),
      children: [
        { path: '', component: () => import('../components/cliente/ClienteList.vue') },
        { path: 'crear', component: () => import('../components/cliente/ClienteCreate.vue') },        {
          path: 'editar/:id',
          component: () => import('../components/cliente/ClienteEdit.vue')
        }
      ]
    },
    {
      path: '/ventas',
      name: 'ventas',
      component: () => import('../views/VentaView.vue'),
      children: [
        { path: '', component: () => import('../components/venta/VentaList.vue') },
        { path: 'crear', component: () => import('../components/venta/VentaCreate.vue') },        {
          path: 'editar/:id',
          component: () => import('../components/venta/VentaEdit.vue')
        }
      ]
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: () => import('../views/CategoriaView.vue'),
      children: [
        { path: '', component: () => import('../components/categoria/CategoriaList.vue') },
        { path: 'crear', component: () => import('../components/categoria/CategoriaCreate.vue') },
        {
          path: 'editar/:id',
          component: () => import('../components/categoria/CategoriaEdit.vue')
        }
      ]
    },
    {
      path: '/detalles',
      name: 'detalles',
      component: () => import('../views/DetalleView.vue'),
      children: [
        { path: '', component: () => import('../components/detalle/DetalleList.vue') },
        { path: 'crear', component: () => import('../components/detalle/DetalleCreate.vue') },
        {
          path: 'editar/:id',
          component: () => import('../components/detalle/DetalleEdit.vue')
        }
      ]
    },
    {
      path: '/unidades',
      name: 'unidades',
      component: () => import('../views/UnidadView.vue'),
      children: [
       { path: '', component: () => import('../components/unidad/UnidadList.vue') },
        { path: 'crear', component: () => import('../components/unidad/UnidadCreate.vue') },
       {
          path: 'editar/:id',
          component: () => import('../components/unidad/UnidadEdit.vue')
        }
      ]
    },
  ] 
})


router.beforeEach(async (to) => {
  const publicPages = ['/', '/about', '/login']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuthStore()

  if (authRequired && !getTokenFromLocalStorage()) {
    if (authStore) authStore.logout()
    authStore.returnUrl = to.fullPath
    return '/login'
  }
})


export default router
