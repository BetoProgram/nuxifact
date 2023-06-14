import { LoginRequest, ResponseErr, UsuarioResponse } from "./models"
import decode from 'jwt-decode'
import * as SweetAlert2 from 'sweetalert2'

const pending = ref(false)
const usuario = ref<UsuarioResponse>()

export default function useAuthentication()
{
    const config = useRuntimeConfig()
    const swal = inject('$swal') as typeof SweetAlert2.default

    const login = async(request:LoginRequest) => {

        try{
            const { data, error, pending } = await useFetch<UsuarioResponse>('/Auth/Login',{
                method: 'POST',
                baseURL: config.public.baseURL,
                body: JSON.stringify(request),
                lazy:true
            })
    
            pending.value = pending.value!
    
            //console.log(pending.value)
    
            if(error.value?.data){
                const errorRes:ResponseErr = error.value?.data
                swal.fire('Error', errorRes.errores.mensaje, 'error')
                return
            }
    
            if(data.value){
                console.log(data.value)
                usuario.value = data.value!
                localStorage.setItem('token', usuario.value.token)
                return navigateTo('/')
            }
        }catch(error){
            console.log(error)
        }
    }

    const validToken = () => {
        const token = localStorage.getItem('token')!

        if(!token) return false

        const tokenDecode = decode(token) as any
        const tiempo = Date.now() / 1000
        
        return tokenDecode.exp > tiempo
    }

    return {
        pending,
        validToken,
        login
    }


}