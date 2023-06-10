const entrarApp = ref(false)

export default function useAuthentication() 
{
    const usuario = {
        username: 'juan',
        password: '123'
    };

    const login = (username:string, password:string) => {
        if(usuario.username == username && usuario.password == password)
        {
            entrarApp.value = true
            return navigateTo('/')
        }

        entrarApp.value = false
        alert('Usuario incorrecto')
        return navigateTo('/auth/login')
    }

    return {
        entrarApp,
        login
    }


}