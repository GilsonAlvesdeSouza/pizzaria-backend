const palavras = ["valor", "aprender", "praticar", "sucesso"];

let resultado = [];
let primeiraEUltimaLetra = "";
for (let i = 0; i < palavras.length; i++) {
  primeiraEUltimaLetra += palavras[i][0]; //nessa linha vc adiciona a primeira letra
  primeiraEUltimaLetra += palavras[i][palavras[i].length - 1];// nessa linha vc adiciona a ultima letra
  resultado.push(primeiraEUltimaLetra); // aqui esta adicionando ao array as duas letras
  primeiraEUltimaLetra = ""; // aqui limpa a variável para receber nova posição
}
console.log(resultado);
