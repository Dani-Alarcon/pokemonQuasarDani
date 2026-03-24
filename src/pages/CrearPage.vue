<template>
  <q-page padding class="bg-grey-1 flex flex-center">
    <q-card class="full-width rounded-borders-20 shadow-4" style="max-width: 500px">
      
      <q-card-section class="bg-primary text-white q-pa-lg">
        <div class="text-h5 text-weight-bold">Nou Pokémon</div>
        <div class="text-subtitle2">Registra una nova captura a la teva base de dades</div>
      </q-card-section>

      <q-card-section class="q-pa-lg">
        <q-form @submit.prevent="gestionarEnviament" class="q-gutter-md">          
          <q-input
            v-model="nouPokemon.name"
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
            v-model="nouPokemon.type"
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
            v-model.number="nouPokemon.generation"
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
            v-model="nouPokemon.imatge"
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
                :src="nouPokemon.imatge || 'https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg'"
                style="width: 100px; object-fit: contain;"
              />
            </q-card>
          </div>

          <div class="row q-col-gutter-sm q-mt-lg">
            <div class="col-12 col-sm-6">
              <q-btn
                label="Guardar Pokémon"
                type="submit"
                color="primary"
                rounded
                class="full-width q-py-sm"
                icon="save"
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
import { reactive } from 'vue'

const nouPokemon = reactive({
  name: '',
  type: '',
  generation: 1,
  imatge: ''
})

function gestionarEnviament() {
  console.log('Dades del nou Pokémon:', nouPokemon)

}
</script>

<style scoped>
.rounded-borders-20 {
  border-radius: 20px;
}
.rounded-borders-15 {
  border-radius: 15px;
}
</style>