<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Ingresa a Sistema
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Form @submit="onSubmit" :initial-values="initialValues" :validation-schema="schema" class="space-y-6">
                <Field name="username" v-slot="{ field, errorMessage }">
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                        <InputText id="email" v-bind="field" name="email" type="text" autocomplete="email" 
                        :class="{ 'p-invalid': errorMessage }"
                            class="p-inputtext-sm block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
                </Field>

                <Field name="password" v-slot="{ field, errorMessage }">
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div class="mt-2">
                        <InputText id="password" v-bind="field" name="password" type="password"
                        :class="{ 'p-invalid': errorMessage }"
                            class="p-inputtext-sm block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
                    </div>
                </Field>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                        in</button>
                </div>
            </Form>
            <p v-if="pending">Espere...</p>
        </div>
</div></template>

<script setup lang="ts">
import * as yup from 'yup'
import { Field, Form } from 'vee-validate'
import { LoginRequest } from '~/composables/models';

const schema = yup.object({
    username: yup.string().required().label('Username'),
    password: yup.string().required().min(6).label('Password')
})

const initialValues = {
  terms: false,
  subscribed: false,
};


const { login, pending } = useAuthentication()

//const username = ref('')
//const password = ref('')

const onSubmit = (values:any, actions:any) => {
    //console.log(JSON.stringify(values, null, 2));

    const { username, password } = values;

    const usuario = new LoginRequest();
    usuario.username = username
    usuario.password = password

    login(usuario)

    actions.resetForm();
}


definePageMeta({
    layout:'auth'
})
</script>