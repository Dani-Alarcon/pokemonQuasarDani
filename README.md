# Quasar App (pokemonquasardani)

A Quasar Project

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).



# 📡 Arquitectura i Consum de l'API

Aquest projecte consta d'un backend desenvolupat en **Nuxt 3** (Nitro + Drizzle ORM) i un frontend mòbil desenvolupat en **Quasar Framework** (Vue 3). A continuació es detalla l'estructura de l'API i com s'ha implementat la comunicació entre ambdues parts.

## 🔗 Endpoints del Backend (Nuxt 3)

L'API RESTful gestiona l'autenticació dels entrenadors i el CRUD complet dels seus Pokémon.

### 1. Autenticació (`/auth`)

| Mètode | Endpoint | Descripció | Body (JSON) |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Registra un nou entrenador. | `name`, `email`, `password` |
| `POST` | `/auth/login` | Autentica l'usuari. | `email`, `password` |

*Nota: El backend retorna l'objecte de l'usuari sense la contrasenya en fer un login amb èxit. El frontend s'encarrega de guardar l'`id` de l'usuari per a futures peticions.*

### 2. Gestió de la Pokédex (`/api/pokemons`)

S'ha utilitzat un únic endpoint centralitzat per al CRUD, on l'acció depèn del mètode HTTP utilitzat. **Tots aquests endpoints requereixen la capçalera (header) `x-user-id`** amb l'ID de l'usuari que ha iniciat sessió.

| Mètode | Endpoint | Descripció | Paràmetres / Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/pokemons` | Obté tots els Pokémon de l'usuari actual. | - |
| `POST` | `/api/pokemons` | Crea un nou Pokémon associat a l'usuari. | **Body:** `name`, `type`, `generation` (Number), `imatge` (String, opcional) |
| `PUT` | `/api/pokemons?id={id}` | Modifica les dades d'un Pokémon existent. | **Query:** `id`<br>**Body:** `name`, `type`, `generation`, `imatge` |
| `DELETE` | `/api/pokemons?id={id}` | Elimina (allibera) un Pokémon. | **Query:** `id` |

---

## 📱 Connexió Frontend - Backend (Quasar)

Per consumir l'API des de l'aplicació mòbil generada amb Quasar, s'ha implementat la següent estratègia:

### 1. Enrutament a l'Emulador
Les peticions HTTP (`fetch` natiu) apunten a la URL `http://10.0.2.2:3000`. Aquesta és l'adreça IP especial que utilitza l'emulador d'Android per comunicar-se amb el `localhost` de la màquina de desenvolupament on s'executa el servidor Nuxt.

### 2. Gestió de Sessió (State Management)
Com que l'aplicació funciona en un entorn mòbil (on les galetes/cookies de sessió tradicionals del navegador poden ser volàtils o donar problemes de CORS), s'ha optat per un enfocament basat en `localStorage` i Custom Headers:

1. **Login:** En validar les credencials a `/auth/login`, el frontend emmagatzema l'ID de l'usuari retornat pel servidor: `localStorage.setItem('userId', dades.user.id)`.
2. **Peticions Autenticades:** Per llistar, crear, editar o esborrar un Pokémon, el client recupera el `userId` i l'injecta en cada petició mitjançant la capçalera `x-user-id`:
   ```javascript
   const resposta = await fetch('[http://10.0.2.2:3000/api/pokemons](http://10.0.2.2:3000/api/pokemons)', {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
       'x-user-id': localStorage.getItem('userId')
     }
   })
