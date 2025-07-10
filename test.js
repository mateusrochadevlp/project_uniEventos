const usuario = {}
function Registrar() {
    const interesse = [];
    const nome = document.getElementById('nomeUsuario').value;
    const checkboxes = document.querySelectorAll('input[name="interesse"]:checked')

    if (!nome || checkboxes.length == 0) {
        alert("dados invalidos, tente novamente");
    } else {
        checkboxes.forEach(checkbox => {
            interesse.push(checkbox.value)
        });
        usuario[nome] = interesse;
      alert('usuario cadastrado')
    }
}  