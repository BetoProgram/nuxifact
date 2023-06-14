<template>
    <div>
        <h1>Clientes</h1>

        <Toolbar class="mb-4">
          <template #start>
              <Button label="Nuevo" @click="openDialog" icon="pi pi-plus" severity="success" class="mr-2" />
          </template>
          <template #end>
              
          </template>
        </Toolbar>

        <DataTable :value="clientes" paginator :rows="10" :rowsPerPageOptions="[10, 20, 30,50]" tableStyle="min-width: 50rem">
          <Column field="nombre" header="Nombre" style="width: 25%"></Column>
          <Column field="direccion" header="Direccion" style="width: 25%"></Column>
          <Column field="telefono" header="Telefono" style="width: 25%"></Column>
          <Column field="email" header="Email" style="width: 25%"></Column>

          <Column :exportable="false" style="min-width:15rem">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editarClient(slotProps.data)" />
                <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmarEliminarCliente(slotProps.data.id)" />
            </template>
          </Column>
        </DataTable>
        <ClienteModalForm 
        :clienteDialog="showDialog"
        :cliente="clientePase"
        @close="showDialog = $event"
        @clearCliente="clientePase = $event"
        @agregarCliente = "guardarClientes($event)"
        @actualizaCliente="actualizaClientes($event)"
         />
    </div>
</template>

<script setup lang="ts">
import { ClienteResponse } from '~/composables/models';

const { clientes, guardarClientes, actualizaClientes, confirmarEliminarCliente } = useClientes()
const showDialog = ref(false)
const clientePase = ref<ClienteResponse>()

const openDialog = () => {
  showDialog.value = true
}

const editarClient = (cliente:any) => {
  openDialog()
  clientePase.value = {...cliente}
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