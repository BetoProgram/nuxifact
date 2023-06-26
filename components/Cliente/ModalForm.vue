<template>
    <Dialog v-model:visible="clienteDialog" :style="{ width: '500px' }" 
    header="Cliente" :modal="true" class="p-fluid" closeIcon="false">
        <Form @submit="onSubmit" :initial-values="initialValues" :validation-schema="schema">
            <div class="field">
                <Field :value="clienteRef?.nombre" name="nombre" v-slot="{ field, errorMessage }">
                    <label for="nombre">Nombre</label>
                    <InputText id="nombre" v-bind="field" :class="{ 'p-invalid': errorMessage }" />
                    <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
                </Field>
            </div>
            <div class="field">
                <Field :value="clienteRef?.direccion" name="direccion" v-slot="{ field, errorMessage }">
                    <label for="dic">Direccion</label>
                    <Textarea id="dic" v-bind="field" required="true" rows="3" cols="20" :class="{ 'p-invalid': errorMessage }" />
                    <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
                </Field>
            </div>

            <div class="formgrid grid">
                <div class="field col">
                    <Field :value="clienteRef?.telefono" name="telefono" v-slot="{ field, errorMessage }">
                        <label for="tel">Telefono</label>
                        <InputText id="tel" v-bind="field" :class="{ 'p-invalid': errorMessage }" />
                        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
                    </Field>
                </div>
                <div class="field col">
                    <Field :value="clienteRef?.email" name="email" v-slot="{ field, errorMessage }">
                        <label for="email">Email</label>
                        <InputText id="email" v-bind="field" :class="{ 'p-invalid': errorMessage }" />
                        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
                    </Field>
                </div>
            </div>
            <div class="grid">
                <div class="col-6">
                    <Button label="Cerrar" icon="pi pi-times" @click="closeModal" />
                </div>
                <div class="col-6">
                    <Button type="submit" label="Guardar" icon="pi pi-check" />
                </div>
            </div>
        </Form>
    </Dialog>
</template>

<script setup lang="ts">
import * as yup from 'yup'
import { Field, Form } from 'vee-validate'
import { ClienteRequest, ClienteResponse } from '~/composables/models';

const schema = yup.object({
    nombre: yup.string().required().label('Nombre'),
    direccion: yup.string().required().min(3).label('Direccion'),
    telefono: yup.string().required().min(5).max(15).label('Telefono'),
    email: yup.string().required().email().label('Email')
})

const initialValues = {
  terms: false,
  subscribed: false,
};


interface Props {
    clienteDialog?: boolean,
    cliente?: any
}

type UpdateCliente = {
    id:number,
    cli:ClienteRequest
}

const emit = defineEmits<{ 
    (e: 'close', value: boolean): void,
    (e: 'clearCliente', value: ClienteResponse): void,
    (e: 'agregarCliente', value: ClienteRequest):void,
    (e: 'actualizaCliente', value: UpdateCliente):void
}>()

const props = defineProps<Props>()

const clienteDialog = toRef(props, 'clienteDialog')
const clienteRef = toRef(props, 'cliente')

const closeModal = () => {
    const clienteClear:ClienteResponse = {
        nombre:'',
        direccion: '',
        telefono: '',
        email: ''
    }

    emit('clearCliente', clienteClear)
    emit('close', false)
}

const onSubmit = (values:any, actions:any) => {
    const { nombre, email, telefono, direccion } = values;
    const clienteIn:ClienteRequest = {
        nombre, email, telefono, direccion
    }
    if(!clienteRef.value?.id){
        emit('agregarCliente', clienteIn)
    }else{
        const value = {
            id: clienteRef.value?.id,
            cli: clienteIn
        } as UpdateCliente
        
        emit('actualizaCliente',value)
    }

    actions.resetForm()
    closeModal()
    
    
}

watch(clienteRef, (newcli, oldcli) => {
    console.log(newcli)
})
</script>

<style scoped></style>