import axios, { InternalAxiosRequestConfig } from "axios"

export default defineNuxtPlugin((nuxtApp) => {

    const config = useRuntimeConfig()

    let api = axios.create({
        baseURL: config.public.baseURL
    })

    api.interceptors.request.use((request:InternalAxiosRequestConfig) => {
        request.headers.Authorization = "Bearer " + localStorage.getItem('token')
        request.headers.Accept = 'application/json'
        request.headers["Content-Type"] = 'application/json'
        return request
    }, error => { Promise.reject(error) }
    )

    api.interceptors.response.use(response => {
        return response
    }, error => {
        if(error.response.status === 401){
            localStorage.removeItem('token')
            
            navigateTo('/auth/login')
        }
        throw error
    })

    return {
        provide: {
            api:api
        }
    }
})