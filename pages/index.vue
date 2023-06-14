<template>
  <div>
    <h1>Pagina Principal</h1>
  </div>
</template>
<script setup lang="ts">

//ruta protegida
definePageMeta({
  middleware: [
    'auth'
  ]
})
</script>

