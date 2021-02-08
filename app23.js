var deck = []
for (x = 2; x < 11 ; x++){
    for (y = 0; y < 4; y++){
        deck.push(x)
    }
}
royals= ['J','J','J','J','Q','Q','Q','Q','K','K','K','K','A','A','A','A']
royals.forEach(value => deck.push(value))
print(deck)
operations = ['+','-','*','&#xF7']
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

  
function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  d3.csv("results.csv").then(function(options, err) {
    options.forEach(function(data) {
        data.Num1 = +data.Num1;
        data.Num2 = +data.Num2;
        data.Num3 = +data.Num3;
        data.Num4 = +data.Num4;
// data.Oper1 = +data.poverty;// data.Oper2 = +data.age;// data.Oper3 = +data.income;// data.Oper4= +data.obesity;
      });
      setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
  
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
  
        display.textContent = minutes + ":" + seconds;
        
        numply = 2
        deckpos = []
        for(i =0 ; i <numply; i++)
        {
          deckpos.push(i*52/3)
        }
        if( --timer< 0)
          if (timer == -10) {
              timer = duration;
              answer = d3.select("#sortable")
              answer.html() = ''
              operations.forEach(oper => {
                li = answer.append('li').attr('class','ui-state-default')
                li.append('span').attr('class','ui-icon ui-icon-arrowthick-2-n-s')
                li.append('text').html(oper)
              })
              
              li = answer.append('li').attr('class','ui-state-default')
              li.append('span').attr('class','ui-icon ui-icon-arrowthick-2-n-s')
              li.append('text').html('test')
          }
          else{
            
          }
      }, 1000);

  })   
}
var fiveMinutes = 60 * 2,
display = document.querySelector('#time');
startTimer(fiveMinutes, display);