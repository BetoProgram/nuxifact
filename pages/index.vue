<template>
  <div>
    <Button @click="irRuta" label="Ir a ruta"/>
  </div>
</template>
<script setup lang="ts">
const router = useRouter()


function irRuta(){
  router.push('/ruta')
}
</script>

