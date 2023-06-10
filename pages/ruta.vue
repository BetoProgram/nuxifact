<template>
    <div>
        <h1>La Ruta</h1>
        <NuxtLink to="/">Regresar</NuxtLink>

        <DataTable :value="posts" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="title" header="Titulo" style="width: 25%"></Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
const posts = ref<any[]>([])

onMounted(() => {
  loadPost()
})

async function loadPost() {
  const { data } = await useFetch<any[]>('https://jsonplaceholder.typicode.com/posts')
  posts.value = data.value!
}

//ruta protegida
definePageMeta({
  middleware: [
    'auth'
  ]
})


</script>