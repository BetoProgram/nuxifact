let pathName = ''

function ObtenerPath() {
    const host = window.location.hostname;
    if(host !== 'localhost'){
        pathName = '/AppNuxt'
    }
    
    fetch(`${pathName}/data/api.json`).then(res => res.json())
    .then(data => {
        const { pathLocal, pathDev, pathProd } = data
    
        switch(host){
            case "localhost":
                localStorage.setItem('pathApiApp', pathLocal.app)
                break
            case "otro":
                localStorage.setItem('pathApiApp', pathDev.app)
                break
            default:
                localStorage.setItem('pathApiApp', pathDev.app)
                break
        }
    })
}

ObtenerPath();


