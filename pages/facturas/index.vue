<template>
    <div>
        <h1>Facturas</h1>
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

<style scoped>

</style>