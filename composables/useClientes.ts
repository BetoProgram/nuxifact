import { ClienteRequest, ClienteResponse } from "./models"
import * as SweetAlert2 from 'sweetalert2'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

const clientes = ref<ClienteResponse[]>([])

export default function useClientes() {
    const api = useNuxtApp().$api
    const swal = inject('$swal') as typeof SweetAlert2.default
    const queryClient = useQueryClient()

    /* onMounted(() => {
        obtenerClientes()
    }) */

    const obtenerClientes = async () => {
        const { data } = await api.get<ClienteResponse[]>('/clientes')
        return data
    }

    const cargarClientes = (data: ClienteResponse[]) => {
        clientes.value = data
    }

    const guardarClientes = async (cliente: ClienteRequest) => {
        try {
            await api.post('/clientes', cliente)
            //obtenerClientes()
        } catch (error) {
            console.log(error)
        }
    }

    const actualizaClientes = async ({ id, cli }: { id: number, cli: ClienteRequest }) => {
        try {
            await api.put(`/clientes/${id}`, cli)
            
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarCliente = async (id: number) => {
        try {
            await api.delete(`/clientes/${id}`)
        } catch (error) {
            console.log(error)
        }

    }


    const { isLoading } = useQuery(
        ['clientes'],
        obtenerClientes,
        { 
            onSuccess:cargarClientes
        }
    )

    const issueMutationAddCliente = useMutation(guardarClientes,{
        onSuccess:(cliente) => {
            queryClient.invalidateQueries({
                queryKey: ['clientes'],
                exact: false,
            })

           /*  queryClient.refetchQueries(
                ['clientes'],
                {
                  exact: false,
                }
              ); */
      
            /* queryClient.setQueryData(
                ['cliente', cliente ],
                cliente
            ); */
        }
    })

    const clienteMutationUpdateCliente = useMutation(actualizaClientes,{
        onSuccess: (cliente) => {
            queryClient.invalidateQueries({
                queryKey: ['clientes'],
                exact: false
            })
        }
    })

    
    const clienteMutationDelete = useMutation(eliminarCliente,{
        onSuccess: (cliente) => {
            queryClient.invalidateQueries({
                queryKey: ['clientes'],
                exact: false
            })
        }
    })
    

    const confirmarEliminarCliente = async(id: number) => {
        const result = await swal.fire({
            title: 'Realmente desear eliminar el registro?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
        })

        if (result.isConfirmed) {
            clienteMutationDelete.mutate(id);
            swal.fire('Eliminado con Exito!', '', 'success')
        }
    }

    return {
        clientes,
        isLoading,
        issueMutationAddCliente,
        clienteMutationUpdateCliente,
        confirmarEliminarCliente
    }
}