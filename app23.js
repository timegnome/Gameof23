var deck = [];
for (x = 2; x < 11 ; x++){
    for (y = 0; y < 4; y++){
        deck.push(x);
    }
}
royals= ['J','J','J','J','Q','Q','Q','Q','K','K','K','K','A','A','A','A'];
royals.forEach(value => deck.push(value));
print(deck);
operations = ['+','-','*','&#xF7'];

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
        deckpos.push(i*Math.ceil(52/numply)+Math.ceil(52/numply));
      }
      deckpos.push(51);
      total = 0;
      deck = shuffle(deck);
      var answer = d3.select("#sortable");
      answer.html('');
      for ( i = 0; i < deckpos.length-1; i ++)
      {
        for(y = 0; y< 4/numply; y++)
        {
          li = answer.append('li').attr('class','ui-state-default');
          li.append('text').html(deck[deckpos[i]]);
          deck.push(deck.splice(deckpos[i],1)[0]);
          deckpos[i]--;
        }
      }
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
              answer.html('');
              // pull cards from amount of players into 4
              for ( i = 0; i < deckpos.length-1; i ++)
              {
                for(y = 0; y< Math.ceil(4/numply); y++)
                {
                  li = answer.append('li').attr('class','ui-state-default');
                  li.append('text').html(deck[deckpos[i]]);
                  deck.push(deck.splice(deckpos[i],1)[0]);
                  deckpos[i]--;
                  
                }
              }
          }
          else{
            var orderIndex = 0;
            order = answer.selectAll('li').nodes()

            opers = d3.selectAll('#oper').nodes();
            opers.forEach(val => {
              switch(val){
                case '+':
                  total += order[orderIndex].textContent;
                  orderIndex++;
                  break;
                case '-':
                  total -= order[orderIndex].textContent;
                  orderIndex++;
                  break
                case '*':
                  total *= order[orderIndex].textContent;
                  orderIndex++;
                  break;
                case '&#xF7':
                  total /= order[orderIndex].textContent;
                  orderIndex++;
                  break;
              }
            });
            console.log(total)
          }
        }
      }, 1000);

  })   
}
var fiveMinutes = 60 * 2,
display = document.querySelector('#time');
startTimer(fiveMinutes, display);