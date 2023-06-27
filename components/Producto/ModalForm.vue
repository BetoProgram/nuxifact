<template>
    <div>
        <Dialog v-model:visible="dialogVisible" :style="{ width: '500px' }" header="Cliente" :modal="true" class="p-fluid"
            :closable="false">
            <form @submit="onSubmit">
                <div class="field">
                    <label for="nombre">Nombre</label>
                    <InputText id="nombre" v-model="nombre" :class="{ 'p-invalid': errors.nombre }"  />
                    <small class="p-error" id="text-error" v-if="errors.nombre">
                    {{ errors.nombre }}
                    </small>
                </div>
                <div class="field">
                    <label for="descripcion">Descripcion</label>
                    <Textarea id="descripcion" v-model="descripcion" :class="{ 'p-invalid': errors.descripcion }" />
                    <small class="p-error" id="text-error" v-if="errors.descripcion">
                    {{ errors.descripcion }}
                    </small>
                </div>
                <div class="field">
                    <label for="precio">Precio</label>
                    <InputNumber id="precio" v-model="precio" :class="{ 'p-invalid': errors.precio }"  />
                    <small class="p-error" id="text-error" v-if="errors.precio">
                    {{ errors.precio }}
                    </small>
                </div>
                <div class="field">
                    <label for="impuesto">Impuesto</label>
                    <InputNumber id="impuesto" v-model="impuesto" :class="{ 'p-invalid': errors.impuesto }"  />
                    <small class="p-error" id="text-error" v-if="errors.impuesto">
                    {{ errors.impuesto }}
                    </small>
                </div>
                <div class="field">
                    <label for="cantidad">Cantidad</label>
                    <InputNumber id="cantidad" v-model="cantidad" :class="{ 'p-invalid': errors.cantidad }"  />
                    <small class="p-error" id="text-error" v-if="errors.cantidad">
                    {{ errors.cantidad }}
                    </small>
                </div>
                <div class="grid">
                    <div class="col-6">
                        <Button label="Cerrar" icon="pi pi-times" @click="cerrarModal" />
                    </div>
                    <div class="col-6">
                        <Button type="submit" label="Guardar" icon="pi pi-check" />
                    </div>
                </div>
            </form>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup'
import { ProductoRequest, ProductoResponse } from '~/composables/models';

interface Props {
    dialogVisible: boolean,
    editedValue: boolean,
    productoEdited: ProductoResponse
}

const schemaForm = yup.object({
    nombre: yup.string().required('El nombre es requerido')
    .min(3, 'El nombre no debe de ser menor a 3 caracteres'),
    descripcion: yup.string().required('La descripcion es requerida'),
    precio: yup.number().required('El precio es requerido'),
    impuesto: yup.number().required('El impuesto es requerido'),
    cantidad: yup.number().required('El cantidad es requerido'),
})

const { handleSubmit, errors, resetForm, setFieldValue } = useForm({
    validationSchema: schemaForm
})

const { value: nombre } = useField<string>('nombre')
const { value: descripcion } = useField<string>('descripcion')
const { value: precio } = useField<number>('precio')
const { value: cantidad } = useField<number>('cantidad')
const { value: impuesto } = useField<number>('impuesto')

const props = defineProps<Props>();
const dialogVisible = toRef(props, 'dialogVisible')
const productoEditedPase = toRef(props,'productoEdited')
const editedValue = toRef(props, 'editedValue')
const emit = defineEmits(['closeModal', 'enviarDatos'])

onBeforeUpdate(() => {
    if(editedValue.value){
        console.log('editas')
        setFieldValue('nombre', productoEditedPase.value.nombre)
        setFieldValue('descripcion', productoEditedPase.value.descripcion)
        setFieldValue('precio', productoEditedPase.value.precio)
        setFieldValue('impuesto', productoEditedPase.value.impuesto)
    }
    else{
        resetForm()
    }
})

const onSubmit = handleSubmit((values) => {
    console.log(values)
    emit('enviarDatos', values)
    emit('closeModal', false)
    resetForm()
})

const cerrarModal = () => {
    emit('closeModal', false)
    resetForm()
}
</script>

<style scoped></style>