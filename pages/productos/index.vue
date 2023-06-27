<template>
    <div>
        <h1>Productos</h1>
        <Toolbar class="mb-4">
          <template #start>
              <Button label="Nuevo" @click="openDialog" icon="pi pi-plus" 
              severity="success" class="mr-2" />
          </template>
          <template #end>
              
          </template>
        </Toolbar>
        <DataTable :value="productos" paginator :rows="10" :loading="isLoading"
        :rowsPerPageOptions="[10, 20, 30,50]" tableStyle="min-width: 50rem">
          <Column field="nombre" header="Nombre" style="width: 25%"></Column>
          <Column field="descripcion" header="Descripcion" style="width: 25%"></Column>
          <Column header="Precio" style="width: 25%">
            <template #body="slotProps">
            $ {{ slotProps.data.precio }}
            </template>
          </Column>

          <Column :exportable="false" style="min-width:15rem">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" outlined rounded class="mr-3" @click="openEdited(slotProps.data)"  />
                <Button icon="pi pi-trash" outlined rounded severity="danger" />
            </template>
          </Column>
        </DataTable>
        <ProductoModalForm 
        :dialogVisible="showModal"
        :editedValue="isEdited"
        :productoEdited="productoPase!"
        @closeModal="showModal = $event"
        @enviarDatos="createProducto($event)" />
    </div>
</template>

<script setup lang="ts">
import { ProductoResponse } from '~/composables/models';

const { productos, isLoading, createProducto } = useProductos()
const showModal = ref(false)
const isEdited = ref(false)
const productoPase = ref<ProductoResponse>()

const openDialog = (producto?:any) => {
  showModal.value = true
  isEdited.value = false
}

const openEdited = (producto:any) => {
  isEdited.value = true
  showModal.value = true
  productoPase.value = producto
}

//ruta protegida
definePageMeta({
  middleware: [
    'auth'
  ]
})
</script>

<style scoped>

</style>