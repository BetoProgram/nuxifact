export default defineNuxtRouteMiddleware((to, from) =>{
    const token = localStorage.getItem('token')

    if(!token){
        alert('Token Invalido')
        return navigateTo('/auth/login')
    }
})