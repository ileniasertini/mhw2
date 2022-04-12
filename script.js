// data-choice-id: Identifica il risultato del quiz --> element.dataset.choiceId
// data-question-id: Identifica il numero della domanda: one, two e three --> element.dataset.questionId

//memorizzo le risposte nella mappa 'risposte' 
// risposte[questionId]=choiceid
const risposte={};





//in questa funzione:
//ogni box ritorna come prima , per cui senza opacità, ecc..
//cancello le risposte dalla mappa risposte
//faccio scomparire risposta e bottone
function reset(){
  for (const box of boxes) {
    box.classList.remove('opaco');
    box.classList.remove('risposta_selezionata');
    box.querySelector('.checkbox').src='images/unchecked.png';
    box.addEventListener('click', onClick);
  }

  delete risposte.one;
  delete risposte.two;
  delete risposte.three;

  const resultContainer = document.querySelector('#risultato');
  resultContainer.classList.add('bottone');
}





//in questa funzione:
//mostro il risultato
//faccio comparire il bottone per resettare il quiz
function mostraRisultato(){
  const winner=risultato();
  const resultContainer = document.querySelector('#risultato');

  const header = document.querySelector('#risultato h1');
  const text = document.querySelector('#risultato p');
  header.textContent=RESULTS_MAP[winner].title;
  text.textContent=RESULTS_MAP[winner].contents;

  resultContainer.classList.remove('bottone');
  const bot=document.querySelector('#button');
  bot.addEventListener('click', reset);
}






//in questa funzione elaboro le risposte e vado a constatare quale risultato dare
function risultato(){
  if(risposte.one === risposte.two || 
    risposte.one === risposte.three || 
    risposte.one === risposte.two === risposte.three)
  {
    return risposte.one;
  }

  if(risposte.two === risposte.one || 
    risposte.two === risposte.three || 
    risposte.two === risposte.one === risposte.three)
  {
    return risposte.two;
  }

  if(risposte.three === risposte.one || 
    risposte.three === risposte.two || 
    risposte.two === risposte.one === risposte.three)
  {
    return risposte.three;
  }

  return risposte.one;
}





//in questa funzione:
//inserisco il check e risalto la risposta
//opacizzo le altre risposte 
//memorizzo la risposta nella mappa
//rimuovo la possibilità di cliccare se ho già selezionato le tre risposte
function onClick(event){
  const container = event.currentTarget;
  

  const image_new= container.querySelector('.checkbox');
  image_new.src="images/checked.png";
  container.classList.add('risposta_selezionata');
  container.classList.remove('opaco');
  

  elements=container.parentNode.querySelectorAll('div');
  for (const element of elements ){
    if(element != container){
      element.classList.add('opaco');
      element.classList.remove('risposta_selezionata');
      element.querySelector('.checkbox').src="images/unchecked.png";
    }
  };


  risposte[container.dataset.questionId]=container.dataset.choiceId;


  if(risposte.one && risposte.two && risposte.three !== undefined ){
    for (const box of boxes) {
      box.removeEventListener('click', onClick);
    }
    mostraRisultato();
  }
 
}





//ogni volta che clicco su un blocco si attiva la funzione onClick.
const boxes = document.querySelectorAll('.choice-grid div');
for (const box of boxes) {
  box.addEventListener('click', onClick);
}

