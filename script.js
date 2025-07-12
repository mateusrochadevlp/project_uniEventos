      class Custom {
        constructor() {
          this.itens = {};
        }
        has(Element) {
          return this.itens.hasOwnProperty(Element);
        }
        add(Element) {
          if (!this.has(Element)) {
            this.itens[Element] = Element;
            return true;
          }
          return false;
        }
        remove(Element) {
          if (this.has(Element)) {
            delete this.itens[Element];
            return true;
          }
          return false;
        }
        clear() {
          this.itens = {};
        }
        values() {
          return Object.values(this.itens);
        }
        union(otherSet) {
          const unionSet = new Custom();
          let values = this.values();
          for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
          }
          values = otherSet.values();
          for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
          }
          return unionSet;
        }
        intersection(otherSet) {
          const intersectionSet = new Custom();
          const values = this.values();
          const otherSetValues = otherSet.values();

          let bigSet = values;
          let smallSet = otherSetValues;
          if (otherSetValues.length > values.length) {
            bigSet = otherSetValues;
            smallSet = values;
          }

          smallSet.forEach((value) => {
            if (bigSet.includes(value)) {
              intersectionSet.add(value);
            }
          });
          return intersectionSet;
        }
        difference(otherSet) {
          const diferenceSet = new Custom();
          this.values().forEach((value) => {
            if (!otherSet.has(value)) {
              diferenceSet.add(value);
            }
          });
          return diferenceSet;
        }
      }
      const usuario = {};
      function Registrar() {
        const setUsuariosInteresses = new Custom();
        const nome = document.getElementById("nomeUsuario").value;
        const checkboxes = document.querySelectorAll('input[name="interesse"]:checked');

        if (!nome || checkboxes.length == 0) {
          alert("dados invalidos, tente novamente");
        } else {
          checkboxes.forEach((checkbox) =>
            setUsuariosInteresses.add(checkbox.value)
          );
          usuario[nome] = setUsuariosInteresses;
          document.getElementById( "saidaCadastro").innerText = `cadastro salvo ${nome} interessado em ${setUsuariosInteresses.values()
            .join("/")}`;
        }
      }
      function mostrarUniao() {
        const u1 = document.getElementById("userUni1").value;
        const u2 = document.getElementById("userUni2").value;

        if (!usuario[u1] || !usuario[u2]) {
          alert("coloque um usuario por favor.");
        } else {
          const setUniao = usuario[u1].union(usuario[u2]).values();
          const uniao = [...setUniao].join(", ");
          document.getElementById("saidaUniao").innerText = `união: ${uniao}`;
        }
      }
      function mostrarComum() {
        const u1 = document.getElementById("user1").value;
        const u2 = document.getElementById("user2").value;

        if (!usuario[u1] || !usuario[u2]) {
          alert("usuarios nao definidos");
          return;
        }
        const interessesComuns = usuario[u1].intersection(usuario[u2]).values();
        const interesse = [...interessesComuns].join("/");
        document.getElementById("saidaComum").innerText = interesse.length
          ? `interesses: ${interesse}`
          : `sem interesses em comum`;
      }
      function mostrarSugestoes() {
        const alvo = document.getElementById('userSugestao').value
        if (!usuario[alvo]) {
            alert('usuario não encontrado')
        }
        const interesseAlvo = usuario[alvo];
        const sugestao = new Custom();

        for (const nome in usuario) {
            if (nome !== usuario[alvo]) {
                const interessesOutros = usuario[nome]
                const interesseDiferença = interessesOutros.difference(interesseAlvo)

                for (const interesse of interesseDiferença.values()) {
                    sugestao.add(interesse)
                }
            }
        }
            document.getElementById('saidaSugestoes').innerText = `Sugestões: ${sugestao.values().join(", ")}`;
      }
      function buscarUsuariosPorInteresse() {
        const interesse = document.getElementById("interesseBusca").value.trim().toLowerCase();

        let encontrados = [];
        for (chavenome in usuario) {
          if (usuario[chavenome].has(interesse)) {
            encontrados.push(chavenome);
          }
        }
        document.getElementById("saidaBusca").innerText = `${encontrados}`;
      }