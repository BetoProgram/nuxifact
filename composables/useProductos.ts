import axios from 'axios'
import * as SweetAlert2 from 'sweetalert2'
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { ProductoRequest, ProductoResponse } from "./models";

async function obtenerProductos():Promise<ProductoResponse[]>{
    const api = useNuxtApp().$api;
    const { data } = await api.get<ProductoResponse[]>('/productos');
    return data;
}

async function guardarProducto(producto:ProductoRequest) {
    const api = useNuxtApp().$api;
    const { data } = await api.post('/productos', producto)
}

export default function useProductos() {
    const queryClient = useQueryClient()
    const swal = inject('$swal') as typeof SweetAlert2.default

    const { data, isLoading } = useQuery(['productos'], () => obtenerProductos())

    const {mutate: createProducto, isLoading: isLoadingCretePorducto} = useMutation(
        (producto:ProductoRequest) => guardarProducto(producto),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries({
                    queryKey:['productos'],
                    exact:false
                })
            },
            onError: (error:any) => {
                if(axios.isAxiosError(error)){
                    swal.fire('Info', 'Ha ocurrido un error al guardar un producto', 'error')
                }
            }
        }
    )

    return { 
        productos:data, 
        isLoading,
        isLoadingCretePorducto,
        createProducto
    }
}