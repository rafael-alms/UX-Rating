onload = () => {

  //Verifica se existem avaliações armazenadas localmente e adiciona na tabela do componente 4 as que existirem
  if (localStorage.hasOwnProperty("avaliacao")) {
    JSON.parse(localStorage.getItem("avaliacao")).forEach(avaliacao => {
      document.getElementById("tabelaAvaliacoes").insertAdjacentHTML('beforeend',
      `<tr><td>${avaliacao.repeticoes}</td>
      <td>${avaliacao.site}</td> 
      <td>${avaliacao.nota + " / 50"}</td> 
      <td>${avaliacao.frase}</td></tr>`)
    });
  }

  //Adiciona um id em todas as tags "tr" existentes
  var linhas = document.getElementsByTagName("tr");
  var numLinha = 1;

  for (var i = 1; i < linhas.length; i++) {
      linhas[i].id = numLinha;
      numLinha++;
  }
};

//Númera as perguntas para saber qual a próxima ou anterior
var numPergunta = 1;

//Armazena a resposta de cada pergunta
var resultado = new Array(10);

//Ao clicar no botão "COMEÇAR", chama a função que verifica se a URL inserida é válida, caso seja, insere o link clicável na tela
function clickStart(url, urlA, comp1, comp2) {
  var urlText = document.getElementById(url).value;
  verificaURL(comp1, comp2, urlText, function() {alert('Endereço inválido! Verifique a URL inserida e tente novamente.')});
  document.getElementById(urlA).href = urlText;
  document.getElementById(urlA).innerHTML = urlText;
};

//Verifica se a URL inserida pelo usuário é válida, se não for válida, alerta o usuário, caso contrário, inicia as perguntas
function verificaURL(comp1, comp2, url, erro) {
  try {
      var scriptElem = document.createElement('script');
      scriptElem.type = 'text/javascript';
      scriptElem.onerror = function(){erro();};
      scriptElem.onload = function(){trocaComp(comp1, comp2);};
      scriptElem.src = url;
      document.getElementsByTagName("body")[0].appendChild(scriptElem);
  } catch(err) {
      error(err);
  }
};

//Esconde o componente que está sendo exibido e mostra o componente selecionado em determinada ação
function trocaComp(esconde, mostra) {
  var hide = document.getElementById(esconde).style.display;
  document.getElementById(esconde).style.display = 'none';
  var display = document.getElementById(mostra).style.display;
  document.getElementById(mostra).style.display = 'block';
};

//Esconde todos os componentes
function escondeComps() {
  document.getElementById("componente1").style.display = 'none';
  document.getElementById("componente2").style.display = 'none';
  document.getElementById("componente3").style.display = 'none';
  document.getElementById("componente4").style.display = 'none';
  document.getElementById("componente5").style.display = 'none';
  document.getElementById("componente6").style.display = 'none';
  document.getElementById("componente7").style.display = 'none';
};

//Mostra o componente "Avaliações" e esconde os outros
function clickAvaliacoes() {
  escondeComps();
  document.getElementById("componente4").style.display = 'block';
  document.getElementById("dica1").innerHTML = "- N/A";
  document.getElementById("dica1-1").style.display = 'none';
  document.getElementById("dica2").innerHTML = "- N/A";
  document.getElementById("dica3").innerHTML = "- N/A";
  document.getElementById("dica4").innerHTML = "- N/A";
  document.getElementById("dica5").innerHTML = "- N/A";
  document.getElementById("dica6").innerHTML = "- N/A";
  document.getElementById("dica7").innerHTML = "- N/A";
  document.getElementById("dica8").innerHTML = "- N/A";
  document.getElementById("dica9").innerHTML = "- N/A";
  document.getElementById("dica9-1").style.display = 'none';
  document.getElementById("dica10").innerHTML = "- N/A";
};

//Mostra o componente "Quem Somos" e esconde os outros
function clickQuemSomos() {
  escondeComps();
  document.getElementById("componente5").style.display = 'block';
};

//Mostra o componente "O que é UX Rating?" e esconde os outros
function clickuxrating() {
  escondeComps();
  document.getElementById("componente6").style.display = 'block';
};

//Mostra o componente "detalhes", esconde os outros componentes e carrega os detalhes da avaliação selecionada
function clickDetalhes() {
  escondeComps();
  document.getElementById("componente7").style.display = 'block';
  carregaAvaliacao();
};

//Captura a linha que foi clicada, armazena o site dessa linha em um elemento existente e mostra os detalhes da avalição desse site
function mouseOverTabela() {
  var linhas = document.getElementsByTagName("tr");

  for(var linha of linhas){
    linha.addEventListener('click', function(){
      document.getElementById("urlInserida").innerHTML = linhas[JSON.parse(this.id)].cells[1].innerHTML;
      clickDetalhes();
    });
  }
};

//Carrega todos os detalhes de uma avaliação
function carregaAvaliacao() {
  var avaliacao = new Array();
  var percorreArray = 0;

  //Verifica se a propriedade existe, caso exista, converte de String para Object
  if (localStorage.hasOwnProperty("avaliacao")) {
    avaliacao = JSON.parse(localStorage.getItem("avaliacao"));
  }
    
  //Descobre o índice em que a avaliação do site em questão foi feita anteriormente no array
  while(percorreArray < avaliacao.length && avaliacao[percorreArray].site !== document.getElementById("urlInserida").textContent) {
    percorreArray++;
  }

  document.getElementById("linkDetalhes").innerHTML = avaliacao[percorreArray].site;
  document.getElementById("linkDetalhes").href = avaliacao[percorreArray].site;
  document.getElementById("totalAvaliacoes").innerHTML = avaliacao[percorreArray].repeticoes;
  document.getElementById("resultadoGeral").innerHTML = (avaliacao[percorreArray].nota + " / 50 (" + avaliacao[percorreArray].frase + ")");
  document.getElementById("nota1").innerHTML = (avaliacao[percorreArray].resposta1 + " / 5");
  document.getElementById("nota2").innerHTML = (avaliacao[percorreArray].resposta2 + " / 5");
  document.getElementById("nota3").innerHTML = (avaliacao[percorreArray].resposta3 + " / 5");
  document.getElementById("nota4").innerHTML = (avaliacao[percorreArray].resposta4 + " / 5");
  document.getElementById("nota5").innerHTML = (avaliacao[percorreArray].resposta5 + " / 5");
  document.getElementById("nota6").innerHTML = (avaliacao[percorreArray].resposta6 + " / 5");
  document.getElementById("nota7").innerHTML = (avaliacao[percorreArray].resposta7 + " / 5");
  document.getElementById("nota8").innerHTML = (avaliacao[percorreArray].resposta8 + " / 5");
  document.getElementById("nota9").innerHTML = (avaliacao[percorreArray].resposta9 + " / 5");
  document.getElementById("nota10").innerHTML = (avaliacao[percorreArray].resposta10 + " / 5");
  mostraDicas(avaliacao[percorreArray]);
};

//Atualiza as dicas quando a nota de uma pergunta é menor ou igual a 3
function mostraDicas(avaliacao) {
  if (avaliacao.resposta1 <= 3) {
    document.getElementById("dica1").innerHTML = "- Verificar se o site apresenta muitas imagens pesadas.";
    document.getElementById("dica1-1").style.display = 'block';
  }
  if (avaliacao.resposta2 <= 3)
    document.getElementById("dica2").innerHTML = "- Utilizar uma linguagem mais simples, sem muitos termos técnicos.";
  if (avaliacao.resposta3 <= 3)
    document.getElementById("dica3").innerHTML = "- Verificar se as telas da plataforma são minimalistas, ou seja, direto ao ponto, simples.";
  if (avaliacao.resposta4 <= 3)
    document.getElementById("dica4").innerHTML = "- Verificar se as telas do site comunicam entre si, ou seja, têm continuidade.";
  if (avaliacao.resposta5 <= 3)
    document.getElementById("dica5").innerHTML = "- Apresentar opções para o usuário corrigir seus erros.";
  if (avaliacao.resposta6 <= 3)
    document.getElementById("dica6").innerHTML = "- Reduza as informações que os usuários precisam lembrar.";
  if (avaliacao.resposta7 <= 3)
    document.getElementById("dica7").innerHTML = "- Tentar deixar o site mais simples, apostando em um design minimalista.";
  if (avaliacao.resposta8 <= 3)
    document.getElementById("dica8").innerHTML = "- Priorize o conteúdo e os recursos para oferecer suporte aos objetivos principais.";
  if (avaliacao.resposta9 <= 3) {
    document.getElementById("dica9").innerHTML = "- Demonstrar para o usuário onde ele errou.";
    document.getElementById("dica9-1").style.display = 'block';
  }
  if (avaliacao.resposta10 <= 3)
    document.getElementById("dica10").innerHTML = "- Permitir que o usuário entre em contato com o suporte do site. Adicionar um suporte caso não tenha.";
};

//Colore de vermelho o botão clicado e os outros de branco, além de chamar a função que armazena as respostas
function mudaCor(vermelho, branco1, branco2, branco3, branco4) {
  document.getElementById(vermelho).style.color = "#FFF";
  document.getElementById(vermelho).style.backgroundColor = "#E71125";
  document.getElementById(vermelho).style.border = "thin solid #9B111E";
  document.getElementById(vermelho).style.borderBottomColor = "#9B111E";
  document.getElementById(vermelho).style.borderBottomWidth = "3px";
  document.getElementById(vermelho).style.borderRightColor = "#9B111E";
  document.getElementById(vermelho).style.borderRightWidth = "3px";
  document.getElementById(vermelho).style.borderTopWidth = "0";
  document.getElementById(vermelho).style.borderLeftWidth = "0";

  mudaCorBranco(branco1);
  mudaCorBranco(branco2);
  mudaCorBranco(branco3);
  mudaCorBranco(branco4);

  armazenaResposta(vermelho);
};

//Colore um botão de branco
function mudaCorBranco(branco) {
  document.getElementById(branco).style.color = "#000";
  document.getElementById(branco).style.backgroundColor = "#F9F9F9";
  document.getElementById(branco).style.border = "thin solid #C7C7C7";
  document.getElementById(branco).style.borderBottomColor = "#C7C7C7";
  document.getElementById(branco).style.borderBottomWidth = "3px";
  document.getElementById(branco).style.borderRightColor = "#C7C7C7";
  document.getElementById(branco).style.borderRightWidth = "3px";
  document.getElementById(branco).style.borderTopWidth = "0";
  document.getElementById(branco).style.borderLeftWidth = "0";
};

//Chama a função de voltar as perguntas e recolore os botões conforme as respostas gravadas, ou retorna à tela inicial
function clickAnterior(btnAnterior, btnProximo, pergunta, btn1, btn2, btn3, btn4, btn5){
  if (numPergunta === 1)
    location.reload();
  else {
    manRunAnt();
    numPergunta--;
    trocaPergunta(pergunta, btnAnterior, btnProximo, btn1, btn2, btn3, btn4, btn5);
    verificaResposta(btn1, btn2, btn3, btn4, btn5);
  }
};

/*Chama a função que avança para a próxima pergunta, alerta o usuário se uma resposta não tiver sido selecionada,
ou finaliza a avaliação somando somando e exibindo o resultado na tela*/
function clickProximo(btnProximo, btnAnterior, pergunta, comp2, comp3, btn1, btn2, btn3, btn4, btn5, soma){
  if (numPergunta === 10){
    var total = 0;
    total = resultado[0] + resultado[1] + resultado[2] + resultado[3] + resultado[4] + resultado[5] + resultado[6] + resultado[7] + resultado[8] + resultado[9];

    trocaComp(comp2, comp3);

    document.getElementById(soma).innerHTML = "Resultado: " + total + " / 50";

    document.getElementById("fraseConclusao").innerHTML = document.getElementById("urlInput").value;
    document.getElementById("fraseConclusao").href = document.getElementById("urlInput").value;

    if (total <= 15) {
      document.getElementById("barra5").style.backgroundColor = '#FFF';
      document.getElementById("barra4").style.backgroundColor = '#FFF';
      document.getElementById("barra3").style.backgroundColor = '#FFF';
      document.getElementById("barra2").style.backgroundColor = '#FFF';
    }
    else if (total > 15 && total <= 25) {
      document.getElementById("barra5").style.backgroundColor = '#FFF';
      document.getElementById("barra4").style.backgroundColor = '#FFF';
      document.getElementById("barra3").style.backgroundColor = '#FFF';
    }
    else if (total > 25 && total <= 35) {
      document.getElementById("barra5").style.backgroundColor = '#FFF';
      document.getElementById("barra4").style.backgroundColor = '#FFF';
    }
    else if (total > 35 && total <= 45) {
      document.getElementById("barra5").style.backgroundColor = '#FFF';
    }

  fraseAvaliacao(total);
  armazenaResultado(total);
  }
  else {
    if (resultado[numPergunta - 1] > 0 && resultado[numPergunta - 1] < 6){
      manRunProx();
      numPergunta++;
      trocaPergunta(pergunta, btnAnterior, btnProximo, btn1, btn2, btn3, btn4, btn5);
      verificaResposta(btn1, btn2, btn3, btn4, btn5);
    }
    else
      alert("Selecione uma resposta antes de continuar.");
  }
};

//Altera a frase que aparece no resultado da avaliação com base na nota
function fraseAvaliacao(total) {
  if (total <= 10)
    document.getElementById("fraseResultado").innerHTML = "Esse site entrega uma experiência ruim aos seus usuários!"
  else if (total > 10 && total <= 20)
    document.getElementById("fraseResultado").innerHTML = "Esse site entrega uma experiência a desejar aos seus usuários!"
  else if (total > 20 && total <= 30)
    document.getElementById("fraseResultado").innerHTML = "Esse site entrega uma experiência regular aos seus usuários!"
  else if (total > 30 && total <= 40)
    document.getElementById("fraseResultado").innerHTML = "Esse site entrega uma boa experiência aos seus usuários!"
  else if (total > 40)
    document.getElementById("fraseResultado").innerHTML = "Esse site entrega uma ótima experiência aos seus usuários!"
};

//Armazena as avaliações
function armazenaResultado(total) {
  
  //Array para armazenar os resultados localmente
  var avaliacao = new Array();
  var contaRepeticoes = 1;
  var media = 0;
  var fraseNota;

  //Verifica se a propriedade existe, caso exista, converte de String para Object
  if (localStorage.hasOwnProperty("avaliacao")) {
    avaliacao = JSON.parse(localStorage.getItem("avaliacao"));

    //Verifica se o site já foi avaliado, atualiza o número de repetições e realiza uma média das notas
    avaliacao.forEach(avaliacao => {
      if(avaliacao.site == document.getElementById("urlInserida").textContent) {
        contaRepeticoes = avaliacao.repeticoes + 1;
        media = (avaliacao.nota + total) / 2;
      }
    });
  }

  if (contaRepeticoes == 1) {

    //Adiciona um novo valor no array criado
    avaliacao.push({ repeticoes: 1, 
      site: document.getElementById("urlInserida").textContent, 
      nota: total, 
      frase: document.getElementById("fraseResultado").textContent, 
      resposta1: resultado[0],
      resposta2: resultado[1],
      resposta3: resultado[2],
      resposta4: resultado[3],
      resposta5: resultado[4],
      resposta6: resultado[5],
      resposta7: resultado[6],
      resposta8: resultado[7],
      resposta9: resultado[8],
      resposta10: resultado[9]
    });

    //Salva o item
    localStorage.setItem("avaliacao", JSON.stringify(avaliacao));
  }
  else {
    var percorreArray = 0;
    
    //Descobre o índice em que a avaliação do site em questão foi feita anteriormente no array
    while(percorreArray < avaliacao.length && avaliacao[percorreArray].site !== document.getElementById("urlInserida").textContent) {
      percorreArray++;
    }

    if (media <= 10)
    fraseNota = "Esse site entrega uma experiência ruim aos seus usuários!"
    else if (media > 10 && media <= 20)
    fraseNota = "Esse site entrega uma experiência a desejar aos seus usuários!"
    else if (media > 20 && media <= 30)
    fraseNota = "Esse site entrega uma experiência regular aos seus usuários!"
    else if (media > 30 && media <= 40)
    fraseNota = "Esse site entrega uma boa experiência aos seus usuários!"
    else if (media > 40)
    fraseNota = "Esse site entrega uma ótima experiência aos seus usuários!"

    //Atualiza os valores do item
    avaliacao[percorreArray].repeticoes = contaRepeticoes; 
    avaliacao[percorreArray].site = document.getElementById("urlInserida").textContent;
    avaliacao[percorreArray].nota = media;
    avaliacao[percorreArray].frase = fraseNota;
    avaliacao[percorreArray].resposta1 = (avaliacao[percorreArray].resposta1 + resultado[0]) / 2;
    avaliacao[percorreArray].resposta2 = (avaliacao[percorreArray].resposta2 + resultado[1]) / 2;
    avaliacao[percorreArray].resposta3 = (avaliacao[percorreArray].resposta3 + resultado[2]) / 2;
    avaliacao[percorreArray].resposta4 = (avaliacao[percorreArray].resposta4 + resultado[3]) / 2;
    avaliacao[percorreArray].resposta5 = (avaliacao[percorreArray].resposta5 + resultado[4]) / 2;
    avaliacao[percorreArray].resposta6 = (avaliacao[percorreArray].resposta6 + resultado[5]) / 2;
    avaliacao[percorreArray].resposta7 = (avaliacao[percorreArray].resposta7 + resultado[6]) / 2;
    avaliacao[percorreArray].resposta8 = (avaliacao[percorreArray].resposta8 + resultado[7]) / 2;
    avaliacao[percorreArray].resposta9 = (avaliacao[percorreArray].resposta9 + resultado[8]) / 2;
    avaliacao[percorreArray].resposta10 = (avaliacao[percorreArray].resposta10 + resultado[9]) / 2;

    //Salva o item
    localStorage.setItem("avaliacao", JSON.stringify(avaliacao));
  }
};

//Faz o boneco correr para trás com base na pergunta que está indo
function manRunAnt() {
  if(numPergunta === 2) {
    document.getElementById("boneco").animate([
      // keyframes
      { transform: 'translateX(125px)' },
      { transform: 'translateX(0px)' }
    ], {
      // timing options
      duration: 1000,
      fill: "forwards"
    });
  }
  else if(numPergunta === 3) {
    document.getElementById("boneco").animate([
      // keyframes
      { transform: 'translateX(210px)' },
      { transform: 'translateX(125px)' }
    ], {
      // timing options
      duration: 1000,
      fill: "forwards"
    });
  }
  else if(numPergunta === 4) {
    document.getElementById("boneco").animate([
      // keyframes
      { transform: 'translateX(295px)' },
      { transform: 'translateX(210px)' }
    ], {
      // timing options
      duration: 1000,
      fill: "forwards"
    });
  }
  else if(numPergunta === 5) {
    document.getElementById("boneco").animate([
      // keyframes
      { transform: 'translateX(380px)' },
      { transform: 'translateX(295px)' }
    ], {
      // timing options
      duration: 1000,
      fill: "forwards"
    });
  }
  else if(numPergunta === 6) {
    document.getElementById("boneco").animate([
      // keyframes
      { transform: 'translateX(465px)' },
      { transform: 'translateX(380px)' }
    ], {
      // timing options
      duration: 1000,
      fill: "forwards"
    });
  }
  else if(numPergunta === 7) {
    document.getElementById("boneco").animate([
      // keyframes
      { transform: 'translateX(550px)' },
      { transform: 'translateX(465px)' }
    ], {
      // timing options
      duration: 1000,
      fill: "forwards"
    });
  }
  else if(numPergunta === 8) {
    document.getElementById("boneco").animate([
      // keyframes
      { transform: 'translateX(635px)' },
      { transform: 'translateX(550px)' }
    ], {
      // timing options
      duration: 1000,
      fill: "forwards"
    });
  }
  else if(numPergunta === 9) {
    document.getElementById("boneco").animate([
      // keyframes
      { transform: 'translateX(720px)' },
      { transform: 'translateX(635px)' }
    ], {
      // timing options
      duration: 1000,
      fill: "forwards"
    });
  }
  else if (numPergunta === 10){
    document.getElementById("boneco").animate([
      // keyframes
      { transform: 'translateX(800px)' },
      { transform: 'translateX(720px)' }
    ], {
      // timing options
      duration: 1000,
      fill: "forwards"
    });
  }
};

//Faz o boneco correr para frente com base na pergunta que está indo
function manRunProx() {
  if(numPergunta === 1) {
    document.getElementById("boneco").animate([
      // keyframes
      { transform: 'translateX(0px)' },
      { transform: 'translateX(125px)' }
    ], {
      // timing options
      duration: 1000,
      fill: "forwards"
    });
  }
  else if(numPergunta === 2) {
    document.getElementById("boneco").animate([
      // keyframes
      { transform: 'translateX(125px)' },
      { transform: 'translateX(210px)' }
    ], {
      // timing options
      duration: 1000,
      fill: "forwards"
    });
  }
  else if(numPergunta === 3) {
    document.getElementById("boneco").animate([
      // keyframes
      { transform: 'translateX(210px)' },
      { transform: 'translateX(295px)' }
    ], {
      // timing options
      duration: 1000,
      fill: "forwards"
    });
  }
  else if(numPergunta === 4) {
    document.getElementById("boneco").animate([
      // keyframes
      { transform: 'translateX(295px)' },
      { transform: 'translateX(380px)' }
    ], {
      // timing options
      duration: 1000,
      fill: "forwards"
    });
  }
  else if(numPergunta === 5) {
    document.getElementById("boneco").animate([
      // keyframes
      { transform: 'translateX(380px)' },
      { transform: 'translateX(465px)' }
    ], {
      // timing options
      duration: 1000,
      fill: "forwards"
    });
  }
  else if(numPergunta === 6) {
    document.getElementById("boneco").animate([
      // keyframes
      { transform: 'translateX(465px)' },
      { transform: 'translateX(550px)' }
    ], {
      // timing options
      duration: 1000,
      fill: "forwards"
    });
  }
  else if(numPergunta === 7) {
    document.getElementById("boneco").animate([
      // keyframes
      { transform: 'translateX(550px)' },
      { transform: 'translateX(635px)' }
    ], {
      // timing options
      duration: 1000,
      fill: "forwards"
    });
  }
  else if(numPergunta === 8) {
    document.getElementById("boneco").animate([
      // keyframes
      { transform: 'translateX(635px)' },
      { transform: 'translateX(720px)' }
    ], {
      // timing options
      duration: 1000,
      fill: "forwards"
    });
  }
  else if (numPergunta === 9){
    document.getElementById("boneco").animate([
      // keyframes
      { transform: 'translateX(720px)' },
      { transform: 'translateX(800px)' }
    ], {
      // timing options
      duration: 1000,
      fill: "forwards"
    });
  }
};

//Verifica se a pergunta já foi respondida, caso sim, marca a resposta de vermelho
function verificaResposta(btn1, btn2, btn3, btn4, btn5) {
  if (resultado[numPergunta - 1] == 1)
    mudaCor(btn1);
  else if (resultado[numPergunta - 1] == 2)
    mudaCor(btn2);
  else if (resultado[numPergunta - 1] == 3)
    mudaCor(btn3);
  else if (resultado[numPergunta - 1] == 4)
    mudaCor(btn4);
  else if (resultado[numPergunta - 1] == 5)
    mudaCor(btn5);
};

//Armazena as respostas das perguntas no vetor
function armazenaResposta(vermelho) {
  var resposta = document.getElementById(vermelho).id.toString();
  if (resposta == "btn1")
    resultado[numPergunta - 1] = 1;
  else if (resposta == "btn2")
    resultado[numPergunta - 1] = 2;
  else if (resposta == "btn3")
    resultado[numPergunta - 1] = 3;
  else if (resposta == "btn4")
    resultado[numPergunta - 1] = 4;
  else if (resposta == "btn5")
    resultado[numPergunta - 1] = 5;
};

//Altera o texto das perguntas indo para a próxima ou anterior, além de fazer as alterações necessárias nos botões da tela
function trocaPergunta(pergunta, btnAnterior, btnProximo, btn1, btn2, btn3, btn4, btn5){
  document.getElementById(btnAnterior).innerHTML = "ANTERIOR";
  document.getElementById(btnProximo).innerHTML = "PRÓXIMO";

  if (numPergunta === 1) {
    document.getElementById(pergunta).innerHTML = "O site em questão não apresenta nenhum tipo de demora considerável na sua utilização e apresentou algum status de carregamento visível na tela?";
    document.getElementById(btnAnterior).innerHTML = "PÁGINA INICIAL";
  }
  else if(numPergunta === 2)
    document.getElementById(pergunta).innerHTML = "Ao utilizar a plataforma você não encontrou nenhum jargão que você julgou difícil de ser interpretado, atrapalhando a sua experiência?";
  else if(numPergunta === 3)
    document.getElementById(pergunta).innerHTML = "Ao utilizar a plataforma você não sentiu dificuldade de manusear nenhuma tela que tenha entrado?";
  else if(numPergunta === 4)
    document.getElementById(pergunta).innerHTML = "Todas as páginas do site estão condizentes em aspectos visuais?";
  else if(numPergunta === 5)
    document.getElementById(pergunta).innerHTML = "Ao efetuar uma ação sem querer, nenhum tipo de frustração foi ocasionada?";
  else if(numPergunta === 6)
    document.getElementById(pergunta).innerHTML = "É necessário lembrar de muitas informações na utilização do site?";
  else if(numPergunta === 7)
    document.getElementById(pergunta).innerHTML = "O site era simples de utilizar?";
  else if(numPergunta === 8)
    document.getElementById(pergunta).innerHTML = "Você se sentiu distraído com elementos desnecessários no site?";
    else if(numPergunta === 9)
    document.getElementById(pergunta).innerHTML = "Caso tenha errado no preenchimento de alguma informação o site apresentou algum tipo de feedback visual?";
  else if (numPergunta === 10){
    document.getElementById(pergunta).innerHTML = "O site apresenta algum tipo de central de ajuda ao usuário?";
    document.getElementById(btnProximo).innerHTML = "FINALIZAR";
  }

  mudaCorBranco(btn1);
  mudaCorBranco(btn2);
  mudaCorBranco(btn3);
  mudaCorBranco(btn4);
  mudaCorBranco(btn5);
};