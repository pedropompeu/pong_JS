//tamanho da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametroBolinha = 27;
let raio = diametroBolinha / 2;

//velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;
let raqueteComprimento = 10;
let raqueteAltura = 80;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;

let colidiu = false;

//variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let vlocidadeYOponente;

//placar do jogo

let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  colideBolinha();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisao();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha() {
  circle(xBolinha - 1, yBolinha - 1, diametroBolinha);
}
function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}
function colideBolinha() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }

  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}
function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}
function verificaColisao() {
  if (
    xBolinha - raio < xRaquete + raqueteComprimento &&
    yBolinha - raio < yRaquete + raqueteAltura &&
    yBolinha + raio > yRaquete
  ) {
    velicidadeXBolinha *= -1;
  }
}
function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(
    x,
    y,
    raqueteComprimento,
    raqueteAltura,
    xBolinha,
    yBolinha,
    raio
  );
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play()
  }
}

function movimentaRaqueteOponente() {
  velocidadeYOponente =
    yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente;
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255, 140, 0));
  rect(180, 5, 40, 40, 5);
  fill(255);
  text(meusPontos, 200, 30);
  fill(color(255, 140, 0));
  rect(380, 5, 40, 40, 5);
  fill(255);
  text(pontosOponente, 400, 30);
}
function marcaPonto() {
  if (xBolinha > 585) {
    meusPontos += 1;
    ponto.play()
  }
  if (xBolinha < 15) {
    pontosOponente += 1;
    ponto.play()
  }
}
