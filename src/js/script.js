const perguntas = [
  {
    q: "Qual é o nome técnico dado ao solo da Lua?",
    opts: ["Argissolo", "Regolito lunar", "Latossolo", "Ferralsolo"],
    correta: 1,
    exp: "O solo da Lua é chamado de regolito lunar — uma camada de fragmentos de rocha e poeira criada por bilhões de anos de impactos de meteoritos."
  },
  {
    q: "Qual é o principal problema do regolito lunar para o cultivo de plantas?",
    opts: ["É muito fértil e causa crescimento excessivo", "Não possui nitrogênio nem matéria orgânica", "Tem excesso de água subterrânea", "É muito ácido para qualquer cultivo"],
    correta: 1,
    exp: "O regolito lunar carece quase totalmente de nitrogênio e matéria orgânica, elementos essenciais para o crescimento das plantas."
  },
  {
    q: "Em experimentos reais, pesquisadores conseguiram fazer plantas brotarem em amostras de regolito lunar. Qual planta foi usada?",
    opts: ["Tomate", "Milho", "Arabidopsis thaliana", "Alface"],
    correta: 2,
    exp: "Em 2022, cientistas da Universidade da Flórida cultivaram pela primeira vez Arabidopsis thaliana (planta-modelo da biologia) em amostras reais de regolito lunar."
  },
  {
    q: "Por que uma estufa na Lua precisaria de proteção contra radiação?",
    opts: ["A Lua recebe raios de frequência de rádio", "A Lua não tem magnetosfera nem atmosfera para bloquear raios cósmicos e solares", "A luz solar na Lua é mais fraca que na Terra", "Plantas crescem melhor no escuro"],
    correta: 1,
    exp: "Sem atmosfera nem magnetosfera, a superfície lunar é bombardeada por raios cósmicos e partículas solares que danificariam as plantas e o DNA humano."
  },
  {
    q: "Qual das seguintes substâncias seria necessário adicionar ao regolito lunar para torná-lo mais fértil?",
    opts: ["Sal marinho", "Compostos de nitrogênio e microrganismos", "Areia do deserto", "Dióxido de carbono sólido"],
    correta: 1,
    exp: "Para enriquecer o regolito, seria preciso adicionar compostos nitrogenados, fósforo, matéria orgânica e microrganismos que formam o húmus."
  },
  {
    q: "Qual é a duração aproximada de um dia lunar (período de luz solar contínua)?",
    opts: ["12 horas", "24 horas", "~14 dias terrestres", "30 horas"],
    correta: 2,
    exp: "Um dia lunar dura cerca de 14 dias terrestres de luz solar seguidos de 14 dias de escuridão — um ciclo extremo para qualquer planta."
  },
  {
    q: "Como a estufa poderia obter água na Lua?",
    opts: ["Importar toda a água da Terra", "Capturar chuva lunar", "Extrair gelo de água dos polos lunares", "Gerar água a partir de rochas lunares por eletrólise de hidrogênio"],
    correta: 2,
    exp: "Crateras polares da Lua contêm depósitos de gelo de água que poderiam ser extraídos e purificados para uso na estufa."
  },
  {
    q: "Qual seria a função principal de um sistema de hidroponia em uma estufa lunar?",
    opts: ["Substituir completamente a necessidade de solo", "Deixar as plantas mais coloridas", "Aumentar a gravidade local", "Filtrar a luz solar excessiva"],
    correta: 0,
    exp: "A hidroponia cultiva plantas diretamente em soluções nutritivas aquosas, contornando a necessidade de um solo fértil — ideal dado a baixa qualidade do regolito."
  },
  {
    q: "A gravidade na Lua é aproximadamente quanto em comparação com a da Terra?",
    opts: ["1/10 da gravidade terrestre", "1/6 da gravidade terrestre", "1/2 da gravidade terrestre", "Igual à da Terra"],
    correta: 1,
    exp: "A gravidade lunar é cerca de 1/6 da terrestre (≈1,62 m/s²). Isso afeta o crescimento das raízes, a circulação da seiva e o desenvolvimento das plantas."
  },
  {
    q: "Qual gás, produzido pelas plantas, poderia ser reutilizado dentro da estufa lunar fechada?",
    opts: ["Nitrogênio", "Metano", "Oxigênio", "Hélio"],
    correta: 2,
    exp: "As plantas liberam oxigênio durante a fotossíntese. Em uma estufa fechada, esse oxigênio poderia ser capturado e usado para sustentar a vida humana na base lunar."
  }
];

let atual = 0;
let pontos = 0;
let respondidas = 0;

function render() {
  const p = perguntas[atual];
  const letras = ['A', 'B', 'C', 'D'];
  document.getElementById('counter').textContent = `Pergunta ${atual + 1} de 10`;
  document.getElementById('progress-fill').style.width = `${(atual / 10) * 100}%`;

  document.getElementById('q-container').innerHTML = `
    <div class="q-card">
      <div class="q-num">Pergunta ${atual + 1} / 10</div>
      <div class="q-text">${p.q}</div>
      <div class="options" id="opts">
        ${p.opts.map((o, i) => `
          <div class="opt" data-i="${i}" onclick="responder(${i})">
            <span class="letter">${letras[i]}</span>
            <span>${o}</span>
          </div>
        `).join('')}
      </div>
      <div class="feedback" id="feedback"></div>
    </div>
  `;
}

function responder(escolha) {
  const p = perguntas[atual];
  const opts = document.querySelectorAll('.opt');
  const fb = document.getElementById('feedback');

  opts.forEach(o => o.classList.add('disabled'));

  if (escolha === p.correta) {
    opts[escolha].classList.add('correct');
    fb.className = 'feedback show ok';
    fb.innerHTML = `<i class="ti ti-check icon-check" aria-hidden="true"></i><strong>Correto!</strong> ${p.exp}`;
    pontos++;
  } else {
    opts[escolha].classList.add('wrong');
    opts[p.correta].classList.add('correct');
    fb.className = 'feedback show err';
    fb.innerHTML = `<i class="ti ti-x icon-x" aria-hidden="true"></i><strong>Incorreto.</strong> ${p.exp}`;
  }

  respondidas++;
  setTimeout(() => {
    atual++;
    if (atual < perguntas.length) {
      render();
    } else {
      mostrarResultado();
    }
  }, 2200);
}

function mostrarResultado() {
  document.getElementById('progress-fill').style.width = '100%';
  document.getElementById('counter').textContent = 'Quiz concluído!';
  document.getElementById('q-container').innerHTML = '';

  const msgs = [
    [0, 3, "Continue estudando! A ciência espacial tem muito a ensinar. 🌑"],
    [4, 6, "Bom começo! Você tem uma base interessante sobre agricultura lunar. 🌱"],
    [7, 8, "Muito bem! Você entende bastante sobre os desafios de cultivar na Lua. 🚀"],
    [9, 10, "Excelente! Você está pronto para ser o agrônomo da primeira base lunar. 🌕"]
  ];

  let msg = msgs[0][2];
  for (const [min, max, texto] of msgs) {
    if (pontos >= min && pontos <= max) { msg = texto; break; }
  }

  const sc = document.getElementById('score-card');
  sc.style.display = 'block';
  document.getElementById('score-num').textContent = `${pontos}/10`;
  document.getElementById('score-msg').textContent = msg;
}

document.getElementById('restart-btn').onclick = () => {
  atual = 0; pontos = 0; respondidas = 0;
  document.getElementById('score-card').style.display = 'none';
  render();
};

render();