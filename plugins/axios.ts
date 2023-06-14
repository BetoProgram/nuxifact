import axios from "axios"

export default defineNuxtPlugin((nuxtApp) => {

    const config = useRuntimeConfig()

    let api = axios.create({
        baseURL: config.public.baseURL,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    })

    return {
        provide: {
            api:api
        }
    }
})