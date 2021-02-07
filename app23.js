var deck = []
for (x = 2; x < 11 ; x++){
    for (y = 0; y < 4; y++){
        deck.push(x)
    }
}
royals= ['J','J','J','J','Q','Q','Q','Q','K','K','K','K','A','A','A','A']
royals.forEach(value => deck.push(value))
print(deck)

function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }

  d3.csv("assets/data/data.csv").then(function(options, err) {
    options.forEach(function(data) {
        data.Num1 = +data.Num1;
        data.Num2 = +data.Num2;
        data.Num3 = +data.Num3;
        // data.Num4 = +data.Num4;
        // data.Oper1 = +data.poverty;
        // data.Oper2 = +data.age;
        // data.Oper3 = +data.income;
        // data.Oper4= +data.obesity;
      });

})   