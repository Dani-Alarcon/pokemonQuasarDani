const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [

      { path: '', component: () => import('pages/LoginPage.vue') },

      { path: 'login', component: () => import('pages/LoginPage.vue') },

      { path: 'pokemons', component: () => import('pages/PokemonListPage.vue') },

      { path: 'crear', component: () => import('pages/CrearPage.vue') },
      { path: '/editar/:id', component: () => import('pages/EditarPage.vue') },
      { path: '/register', component: () => import('pages/RegisterPage.vue') }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes