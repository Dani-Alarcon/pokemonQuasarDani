<template>
  <q-page padding class="bg-grey-1">
    <div class="q-mb-md q-px-sm">
      <h5 class="q-ma-none text-weight-bolder text-primary">La meva Pokédex</h5>
      <p class="text-grey-7 q-mb-none">Tens {{ llistaPokemons.length }} Pokémon registrats</p>
    </div>

    <div v-if="carregant" class="flex flex-center q-py-xl">
      <q-spinner-dots color="primary" size="3em" />
    </div>

    <div v-else-if="llistaPokemons.length === 0" class="text-center q-py-xl text-grey-6">
      <q-icon name="catching_pokemon" size="4em" class="q-mb-sm" />
      <div class="text-h6">Encara no tens cap Pokémon</div>
    </div>

    <div v-else class="row q-col-gutter-md">
      <div v-for="pokemon in llistaPokemons" :key="pokemon.id" class="col-12">
        
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
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()

const llistaPokemons = ref([])
const carregant = ref(true)

async function carregarDades() {
  try {    
    const userId = localStorage.getItem('userId')

    if (!userId) {
      $q.notify({ color: 'warning', message: 'Has d\'iniciar sessió primer' })
      router.push('/')
      return
    }
    
    const resposta = await fetch('http://10.0.2.2:3000/api/pokemons', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': userId
      }
    })

    if (resposta.status === 401) {
      $q.notify({ color: 'warning', message: 'La sessió ha caducat' })
      localStorage.removeItem('userId')
      router.push('/')
      return
    }

    if (!resposta.ok) {
      throw new Error('Error al connectar amb el servidor')
    }

    const dades = await resposta.json()
    llistaPokemons.value = dades 

  } catch (err) {
    console.error('Error carregant pokemons:', err)
    $q.notify({ color: 'negative', message: err.message, timeout: 5000 })
  } finally {
    carregant.value = false
  }
}

onMounted(() => {
  carregarDades()
})
</script>

<style scoped>
.rounded-borders-15 { border-radius: 15px; }
.my-card { transition: transform 0.2s; }
.my-card:active { transform: scale(0.98); }
</style>