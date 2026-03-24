<template>
  <q-page padding class="bg-grey-1 flex flex-center">
    <q-card class="full-width rounded-borders-20 shadow-4" style="max-width: 500px">
      
      <q-card-section class="bg-primary text-white q-pa-lg">
        <div class="text-h5 text-weight-bold">Editar Pokémon</div>
        <div class="text-subtitle2">Modifica les dades de la teva captura</div>
      </q-card-section>

      <div v-if="carregantDades" class="flex flex-center q-pa-xl">
        <q-spinner-dots color="primary" size="3em" />
      </div>

      <q-card-section v-else class="q-pa-lg">
        <q-form @submit.prevent="gestionarEdicio" class="q-gutter-md">          
          <q-input
            v-model="pokemonEditat.name"
            label="Nom del Pokémon"
            outlined
            rounded
            placeholder="Ex: Bulbasaur"
            :rules="[val => !!val || 'El nom és obligatori']"
          >
            <template v-slot:prepend>
              <q-icon name="badge" color="primary" />
            </template>
          </q-input>

          <q-input
            v-model="pokemonEditat.type"
            label="Tipus Element"
            outlined
            rounded
            placeholder="Ex: Planta / Verí"
            :rules="[val => !!val || 'El tipus és obligatori']"
          >
            <template v-slot:prepend>
              <q-icon name="local_fire_department" color="primary" />
            </template>
          </q-input>

          <q-input
            v-model.number="pokemonEditat.generation"
            label="Generació"
            type="number"
            outlined
            rounded
            :rules="[
              val => !!val || 'La generació és obligatòria',
              val => val > 0 && val <= 10 || 'Ha de ser entre 1 i 10'
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="auto_awesome_motion" color="primary" />
            </template>
          </q-input>

          <q-input
            v-model="pokemonEditat.imatge"
            label="URL de la Imatge (opcional)"
            outlined
            rounded
            hint="Si es deixa buit, s'assignarà una Pokéball"
          >
            <template v-slot:prepend>
              <q-icon name="image" color="primary" />
            </template>
          </q-input>

          <div class="flex flex-center q-mt-md">
            <q-card flat bordered class="rounded-borders-15 bg-grey-2 flex flex-center" style="width: 120px; height: 120px; overflow: hidden;">
              <q-img
                :src="pokemonEditat.imatge || 'https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg'"
                style="width: 100px; object-fit: contain;"
              />
            </q-card>
          </div>

          <div class="row q-col-gutter-sm q-mt-lg">
            <div class="col-12 col-sm-6">
              <q-btn
                label="Guardar Canvis"
                type="submit"
                color="primary"
                rounded
                class="full-width q-py-sm"
                icon="save"
                :loading="carregant" 
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-btn
                label="Cancel·lar"
                flat
                color="grey-7"
                rounded
                class="full-width q-py-sm"
                to="/pokemons"
              />
            </div>
          </div>

        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

const $q = useQuasar()
const router = useRouter()
const route = useRoute()
const carregant = ref(false)
const carregantDades = ref(true)

const pokemonEditat = reactive({
  name: '',
  type: '',
  generation: 1,
  imatge: ''
})

async function carregarPokemon() {
  const userId = localStorage.getItem('userId')
  if (!userId) {
    router.push('/')
    return
  }

  try {
    const resposta = await fetch('http://10.0.2.2:3000/api/pokemons', {
      headers: { 'x-user-id': userId }
    })
    
    if (!resposta.ok) throw new Error('Error carregant dades')
    
    const llista = await resposta.json()    
    const pokemonActual = llista.find(p => p.id === Number(route.params.id))

    if (pokemonActual) {
      pokemonEditat.name = pokemonActual.name
      pokemonEditat.type = pokemonActual.type
      pokemonEditat.generation = pokemonActual.generation
      pokemonEditat.imatge = pokemonActual.imatge || ''
    } else {
      $q.notify({ color: 'negative', message: 'Pokémon no trobat' })
      router.push('/pokemons')
    }
  } catch (err) {
    console.error('Error:', err)
    $q.notify({ color: 'negative', message: 'No s\'han pogut carregar les dades' })
  } finally {
    carregantDades.value = false
  }
}

onMounted(() => {
  carregarPokemon()
})

async function gestionarEdicio() {
  const userId = localStorage.getItem('userId')
  if (!userId) return

  carregant.value = true

  try {
    const resposta = await fetch(`http://10.0.2.2:3000/api/pokemons?id=${route.params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': userId 
      },
      body: JSON.stringify(pokemonEditat)
    })

    if (resposta.status === 401) {
      $q.notify({ color: 'warning', message: 'La sessió ha caducat' })
      localStorage.removeItem('userId')
      router.push('/')
      return
    }

    if (!resposta.ok) throw new Error('Error al modificar el Pokémon')
    
    $q.notify({ color: 'positive', message: 'Canvis guardats correctament!' })
    router.push('/pokemons')

  } catch (err) {
    console.error('Error editant pokemon:', err)
    $q.notify({ color: 'negative', message: err.message, timeout: 5000 })
  } finally {
    carregant.value = false
  }
}
</script>

<style scoped>
.rounded-borders-20 { border-radius: 20px; }
.rounded-borders-15 { border-radius: 15px; }
</style>