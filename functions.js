module.exports = {
 dado() {
  let results = [];
  for (var i = 0; i < 10; i++) {
   results[i] = Math.floor(Math.random() * 99)+1;
  }//Faz 10 números aleatórios e coloca no "results"
  
  return results[Math.floor(Math.random() * results.length)];
 }
}