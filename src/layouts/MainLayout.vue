<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-weight-bold">
          Pokédex
        </q-toolbar-title>

        <q-btn flat round dense icon="account_circle" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="280"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-md bg-grey-2 text-center">
          <q-avatar size="80px" class="q-mb-sm shadow-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg">
          </q-avatar>
          <div class="text-weight-bold text-grey-9">Entrenador Pokémon</div>
          <div class="text-caption text-grey-6">Versió Mòbil 1.0</div>
        </div>

        <q-list padding>
          <q-item-label header class="text-uppercase text-weight-bolder">Menú Principal</q-item-label>

          <q-item clickable v-ripple to="/login">
            <q-item-section avatar>
              <q-icon name="login" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Iniciar Sessió</q-item-label>
              <q-item-label caption>Accedir al teu compte</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/pokemons">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>
              <q-item-label>La meva Pokédex</q-item-label>
              <q-item-label caption>Llista de captures</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/crear">
            <q-item-section avatar>
              <q-icon name="add_circle" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Nou Pokémon</q-item-label>
              <q-item-label caption>Registrar nova captura</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator q-my-md />

          <q-item clickable v-ripple class="text-red">
            <q-item-section avatar>
              <q-icon name="logout" color="red" />
            </q-item-section>
            <q-item-section>Tancar Sessió</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped>
/* Estilos para que el menú lateral se vea más "App" */
.q-item.q-router-link--active {
  color: var(--q-primary);
  background: #e3f2fd;
  border-radius: 0 25px 25px 0;
  margin-right: 8px;
}
</style>