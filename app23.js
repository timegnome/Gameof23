var deck = [];
for (x = 2; x < 11 ; x++){
    for (y = 0; y < 4; y++){
        deck.push(x);
    }
}
var royals= ['J','J','J','J','Q','Q','Q','Q','K','K','K','K','A','A','A','A'];
royals.forEach(value => deck.push(value));
print(deck);
var operations = ['+','-','*','&#xF7'];
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

  
function startTimer(duration, display, numply = 2) {
  var timer = duration, minutes, seconds;
  d3.csv("data/results.csv").then(function(options, err) {
    // set the values of the numbers to numbers
    options.forEach(function(data) {
        data.Num1 = +data.Num1;
        data.Num2 = +data.Num2;
        data.Num3 = +data.Num3;
        data.Num4 = +data.Num4;
      });
      // create values for deck position and how many players
      deckpos = [];
      for(i =0 ; i <numply; i++)
      {
        deckpos.push(i*Math.ceil(52/numply)+Math.ceil(52/numply)-1);
      }
      deckpos.push(51);
      total = 0;
      deck = shuffle(deck);
      var answer = d3.select("#sortable");
      
      addCards(answer.selectAll('li'), deck, deckpos, numply);
      // The amount of time left before a new round and results are shown
      setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
  
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
  
        display.textContent = minutes + ":" + seconds;
        
        if( --timer< 0){
          answer = d3.select("#sortable");
          if (timer == -10) {
              timer = duration;
              // pull 4 cards from amount of players
              addCards(answer.selectAll('li'),deck, deckpos, numply);
          }
          else{
            order = answer.selectAll('li').nodes();
            opers = d3.selectAll('#oper').nodes();
            d3.select('#total').html(calctotal(order, opers));
          }
        }
      }, 1000);

  })   
}

function addCards(cardlist, Deck, deckPos, numPly)
{
  var content = []
  for ( i = 0; i < deckPos.length-1; i ++)
  {
    for(y = 0; y< Math.ceil(4/numPly); y++)
    {
      content.push(Deck[deckPos[i]])
      Deck.push(Deck.splice(deckPos[i],1)[0]);
      deckPos[i]--;
    }
  }
  cardlist.data(content)
  .each(function(d,i){
    if(d === 'A'){
      this.on('dblclick', function(d){
      this.html(`${12-this.html()}`)})}
    d.append('text')
      .html(1);
  })
}
function calctotal(numOrder, totalOpers)
{
  console.log(totalOpers)
  var orderIndex = 0, temp = 0;
  totalOpers.forEach(operVal => {
    var val = numOrder[orderIndex].textContent;
    if(val in ['K','Q','J']){
        val= 10;}
    // if(val === 'A-1' || val === 'A'){
    //   val = 1
    // }
    // if(val === 'A-11'){
    //   val = 11
    // } 
    switch(operVal){
      case '+':
        temp += val;
        orderIndex++;
        break;
      case '-':
        temp -= val;
        orderIndex++;
        break
      case '*':
        temp *= val;
        orderIndex++;
        break;
      case '&#xF7':
        temp /= val;
        orderIndex++;
        break;
    }
  });
  console.log(temp)
  return temp;
}
var fiveMinutes = 60 * 2,
display = document.querySelector('#time');
startTimer(fiveMinutes, display);