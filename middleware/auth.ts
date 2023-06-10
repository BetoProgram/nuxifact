export default defineNuxtRouteMiddleware((to, from) =>{
    const { entrarApp } = useAuthentication();

    if(!entrarApp.value){
        alert('No tienes permiso!!')
        return navigateTo('/auth/login')
    }
})