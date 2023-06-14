import { ClienteRequest, ClienteResponse } from "./models"
import * as SweetAlert2 from 'sweetalert2'

const clientes = ref<ClienteResponse[]>([])

export default function useClientes() {
    const api = useNuxtApp().$api
    const swal = inject('$swal') as typeof SweetAlert2.default

    onMounted(() => {
        obtenerClientes()
    })

    const obtenerClientes = async () => {
        const { data } = await api.get<ClienteResponse[]>('/clientes')
        clientes.value = data;
    }

    const guardarClientes = async (cliente: ClienteRequest) => {
        try {
            await api.post('/clientes', cliente)
            obtenerClientes()
        } catch (error) {
            console.log(error)
        }
    }

    const actualizaClientes = async ({ id, cli }: { id: number, cli: ClienteRequest }) => {
        try {
            await api.put(`/clientes/${id}`, cli)
            obtenerClientes()
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarCliente = async (id: number) => {
        try {
            await api.delete(`/clientes/${id}`)
            obtenerClientes()

        } catch (error) {
            console.log(error)
        }

    }

    const confirmarEliminarCliente = (id: number) => {
        swal.fire({
            title: 'Realmente desear eliminar el registro?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarCliente(id)
                swal.fire('Eliminado con Exito!', '', 'success')
            }
        })
    }

    return {
        clientes,
        guardarClientes,
        actualizaClientes,
        confirmarEliminarCliente
    }
}