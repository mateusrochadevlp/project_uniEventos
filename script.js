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
  diference(otherSet) {
    const diferenceSet = new Custom();
    this.values().forEach((value) => {
      if (!otherSet.has(value)) {
        diferenceSet.add(value);
      }
    });
    return diferenceSet;
  }
}

// Banco de dados em memória
const usuarios = {};

function Registrar() {
  //registra os dados conforme o nome digitado e o interesse checado.
  const nome = document.getElementById("nomeUsuario").value.trim();
  const checkboxes = document.querySelectorAll('input[name="interesse"]:checked');

  if (!nome || checkboxes.length === 0) {
    alert("Preencha o nome e selecione pelo menos um interesse.");
    return;
  }

  const setUsuarios = new Custom();
  // criar um set que irá armazenar o interesse do usuario.
  checkboxes.forEach((checkbox) => setUsuarios.add(checkbox.value));
  //dentro do objeto usuarios vai ser armazenado o nome juntop ao set que ja possui os interesses.
  usuarios[nome] = setUsuarios;
  document.getElementById("saidaCadastro").innerText = `✅ Usuário "${nome}" cadastrado com: ${setUsuarios.values().join(", ")}`;

  // Limpa os campos 
  document.getElementById("nomeUsuario").value = "";
  checkboxes.forEach((cb) => (cb.checked = false));
}

function mostrarComum() {
  // nao obrigatorio
  const u1 = document.getElementById("user1").value.trim();
  const u2 = document.getElementById("user2").value.trim();

  if (!usuarios[u1] || !usuarios[u2]) {
    document.getElementById("saidaComum").innerText ="❌ Usuário(s) não encontrado(s).";
    return;
  }

  const comum = usuarios[u1].intersection(usuarios[u2]).values();
  document.getElementById("saidaComum").innerText = comum.length
    ? `🔗 Em comum: ${comum.join(", ")}`
    : "Nenhum interesse em comum.";
}

function mostrarUniao() {
  const u1 = document.getElementById("userUni1").value.trim();
  const u2 = document.getElementById("userUni2").value.trim();

  if (!usuarios[u1] || !usuarios[u2]) {
    document.getElementById("saidaUniao").innerText ="❌ Usuário(s) não encontrado(s).";
    return;
  }

  const uniao = usuarios[u1].union(usuarios[u2]).values();
  document.getElementById("saidaUniao" ).innerText = `🔄 União de interesses: ${uniao.join(", ")}`;
}

function mostrarSugestoes() {
  const alvo = document.getElementById("userSugestao").value.trim();
  if (!usuarios[alvo]) {
    document.getElementById("saidaSugestoes").innerText ="❌ Usuário não encontrado.";
    return;
  }

  const sugestoes = new Custom();
  const interessesAlvo = usuarios[alvo];

  for (const nome in usuarios) {
    if (nome !== alvo) {
      const outros = usuarios[nome];
      const novos = outros.diference(interessesAlvo);
      novos.values().forEach((v) => sugestoes.add(v));
    }
  }

  const resultado = sugestoes.values();
  document.getElementById("saidaSugestoes").innerText = resultado.length
    ? `💡 Sugestões: ${resultado.join(", ")}`
    : "Nenhuma sugestão encontrada.";
}

function buscarUsuariosPorInteresse() {
  const interesse = document.getElementById("interesseBusca").value.trim().toLowerCase();
  const encontrados = [];

  for (const nome in usuarios) {
    if (usuarios[nome].has(interesse)) {
      encontrados.push(nome);
    }
  }
  document.getElementById("saidaBusca").innerText = encontrados.length
    ? `👥 Usuários com "${interesse}": ${encontrados.join(", ")}`
    : "Nenhum usuário encontrado.";
}
