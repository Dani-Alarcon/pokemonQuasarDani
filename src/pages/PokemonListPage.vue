<template>
  <q-page padding class="bg-grey-1">
    <div class="q-mb-md q-px-sm">
      <h5 class="q-ma-none text-weight-bolder text-primary">La meva Pokédex</h5>
      <p class="text-grey-7 q-mb-none">Tens {{ arrayProvaPokemons.length }} Pokémon registrats</p>
    </div>

    <div class="row q-col-gutter-md">
      <div v-for="pokemon in arrayProvaPokemons" :key="pokemon.id" class="col-12">
        
        <q-card class="my-card shadow-2 rounded-borders-15">
          <q-card-section horizontal>
            
            <q-img
              class="col-4 flex flex-center bg-grey-2"
              :src="pokemon.imatge || 'https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg'"
              style="max-height: 120px; object-fit: contain;"
            />

            <q-card-section class="col-8">
              <div class="text-overline text-orange-9">Generació {{ pokemon.generation }}</div>
              <div class="text-h6 text-weight-bold">{{ pokemon.name }}</div>
              
              <div class="q-mt-sm">
                <q-chip outline color="primary" size="sm" icon="bolt">
                  {{ pokemon.type }}
                </q-chip>
              </div>
            </q-card-section>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right" class="q-py-sm">
            <q-btn flat round color="blue-7" icon="edit" />
            <q-btn flat round color="red-7" icon="delete" />
            <q-btn flat color="primary" label="Veure Detalls" no-caps />
          </q-card-actions>
        </q-card>

      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" to="/crear" />
    </q-page-sticky>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'


const arrayProvaPokemons = ref([
  {
    id: 1,
    name: 'Pikachu',
    type: 'Elèctric',
    generation: 1,
    imatge: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
  },
  {
    id: 2,
    name: 'Charmander',
    type: 'Foc',
    generation: 1,
    imatge: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png'
  },
  {
    id: 3,
    name: 'Bulbasaur',
    type: 'Planta',
    generation: 1,
    imatge: ''
  }
])
</script>

<style scoped>
.rounded-borders-15 {
  border-radius: 15px;
}

.my-card {
  transition: transform 0.2s;
}

.my-card:active {
  transform: scale(0.98); 
}
</style>