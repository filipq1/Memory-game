var cards = ["dog1.jpg", "dog5.jpg", "dog3.jpg", "dog1.jpg", "dog8.jpg", "dog6.jpg", "dog5.jpg", "dog9.jpg", "dog10.jpg", "dog7.jpg", "dog9.jpg", 
"dog8.jpg", "dog2.jpg", "dog4.jpg", "dog3.jpg", "dog7.jpg", "dog4.jpg", "dog6.jpg", "dog2.jpg", "dog10.jpg"];


/*window.onload = function(){
	  var temp = [];
	  var temp_2 = [];
	  var i = 0;
	  while(i < 10)
	  {
	  	  var n = 0;
	      var x = Math.ceil(Math.random()*10);
	      if(temp.includes(x) == false)
	      { 
	      	temp.push(x); 
	      	i++;
	      	while(n < 2)
	      	{
	      		var z = Math.floor(Math.random()*20);
	      		if(temp_2.includes(z) == false)
	      		{
	      			temp_2.push(z);
	      			n++;
	      			cards[z] = 'dog' + x + '.jpg';
	      		}
	      		else continue;
	      	}
	      }
	      else continue;
      }
      console.log(cards);
}*/

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

window.onload = function(){
	shuffle(cards);
	console.log(cards);
}

var i;
for(i = 0; i < 20; i++)
{
	var c = document.getElementById('c'+i);
	c.addEventListener("click", function(i) { return function() {revealCard(i);}; }(i));
}

var oneVisible = false;
var turnCounter = 0;
var visible_nr;
var lock = false;
var pairsLeft = 10;


function revealCard(nr)
{
	if(lock == false)
	{
      lock = true;

	  var obraz = "url(img/" + cards[nr] + ")";

	  $('#c' + nr).css('background-image', obraz);
	  $('#c' + nr).addClass('cardA');
	  $('#c' + nr).removeClass('card');

	  if(oneVisible==false)
	  {
	       visible_nr=nr;
	       oneVisible = true;  
	       lock=false;                            //first card
	  }
	  else
	  {
	  	 if(visible_nr != nr)
	  	 {
	         if(cards[visible_nr] == cards[nr])
	         {
	         	setTimeout(function(){ hide2Cards(nr, visible_nr) }, 700);
	         }
	         else
	         {
	            setTimeout(function(){ restore2Cards(nr, visible_nr) }, 1000);
	         }

	         turnCounter++;
	         $('.score').html("Turn counter: "+turnCounter);
	         oneVisible=false; 
	     } 
	     else lock = false; 
	   }
	                           
	}
}

function hide2Cards(numer1, numer2)
{
	$("#c"+numer1).css("visibility", "hidden");
	$("#c"+numer2).css("visibility", "hidden");
	lock = false;
	pairsLeft--;
	if(pairsLeft==0)
	{
		if(turnCounter <= 20) 
			{
				$(".board").html("<h1>Congratulations Genius! <br>You win in just " + turnCounter + " turns</h1>" + 
					"<h2>Click here to play again</h2>");
				$(".title").css("visibility","hidden");
				$("h2").click(function(){
                     location.reload();
				});
			}
		else if((turnCounter > 20) && (turnCounter <= 26))
			{
				$(".board").html("<h1>Pretty good game <br>You win in " + turnCounter + " turns</h1>" + 
					"<h2>Click here to play again</h2>");
				$(".title").css("visibility","hidden");
				$("h2").click(function(){
                     location.reload();
				});
			}
		else if(turnCounter >26 )
			{
				$(".board").html("<h1>Not so good to be honest <br>You needed " + turnCounter + " turns</h1>"+
					"<h2>Click here to play again</h2>");
				$(".title").css("visibility","hidden");
				$("h2").click(function(){
                     location.reload();
				});
			}
	}
}

function restore2Cards(numer1, numer2)
{
	 $('#c' + numer1).css('background-image', "url(img/karta.jpg)");
	 $('#c' + numer1).addClass('card');
     $('#c' + numer1).removeClass('cardA');

     $('#c' + numer2).css('background-image', "url(img/karta.jpg)");
	 $('#c' + numer2).addClass('card');
     $('#c' + numer2).removeClass('cardA');
	
     lock = false;
}