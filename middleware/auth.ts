import * as SweetAlert2 from 'sweetalert2'

export default defineNuxtRouteMiddleware((to, from) =>{
    const swal = inject('$swal') as typeof SweetAlert2.default

    const { validToken } = useAuthentication()

    if(!validToken()){
        swal.fire('Ha caducado la sesion, o el token es invalido','','info')
        localStorage.removeItem('token')
        return navigateTo('/auth/login')
    }
})