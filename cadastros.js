const usuarios = {};

// Função: Cadastrar novo usuário
function cadastrarUsuario(nome, interessesStr) {
  const novoSet = new Custom();
  const interesses = interessesStr.split(',').map(i => i.trim().toLowerCase());
  interesses.forEach(interesse => novoSet.add(interesse));
  usuarios[nome] = novoSet;
}

// a. Interesses em comum
function interessesEmComum(usuario1, usuario2) {
  if (!usuarios[usuario1] || !usuarios[usuario2]) return null;
  return usuarios[usuario1].intersection(usuarios[usuario2]).values();
}

// b. União de interesses
function unirInteresses(usuario1, usuario2) {
  if (!usuarios[usuario1] || !usuarios[usuario2]) return null;
  return usuarios[usuario1].union(usuarios[usuario2]).values();
}

// c. Sugerir novos interesses
function sugerirInteresses(usuarioAlvo) {
  if (!usuarios[usuarioAlvo]) return null;
  const sugestoes = new Custom();
  const interessesAlvo = usuarios[usuarioAlvo];

  for (const nome in usuarios) {
    if (nome !== usuarioAlvo) {
      const outrosInteresses = usuarios[nome];
      const novos = outrosInteresses.diference(interessesAlvo);
      novos.values().forEach(i => sugestoes.add(i));
    }
  }

  return sugestoes.values();
}

// d. Filtrar usuários por interesse
function usuariosComInteresse(interesseBuscado) {
  interesseBuscado = interesseBuscado.trim().toLowerCase();
  const resultado = [];

  for (const nome in usuarios) {
    if (usuarios[nome].has(interesseBuscado)) {
      resultado.push(nome);
    }
  }

  return resultado;
}

// Exemplo de uso:
cadastrarUsuario('Mateus', 'programação, ia, startups');
cadastrarUsuario('Ana', 'ia, ux, startups');
cadastrarUsuario('Lucas', 'programação, jogos');

console.log('Interesses em comum entre Mateus e Ana:', interessesEmComum('Mateus', 'Ana'));
console.log('União entre Mateus e Lucas:', unirInteresses('Mateus', 'Lucas'));
console.log('Sugestões para Lucas:', sugerirInteresses('Lucas'));
console.log('Usuários com interesse em "startups":', usuariosComInteresse('startups'));