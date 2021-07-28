/*
const inputText = document.querySelector('#inputText')
const btnSubmit = document.querySelector('#btnSubmit')
const infoForm = document.querySelector('form')
const newNodeWithInputText = document.createElement('div')

var letters = []

btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  letters.concat(addInputTextToPage());
});

function addSpanForEveryLetter(e, textFromInput) {
  let letters=[];
  let fragmentSpan = document.createDocumentFragment();
  textFromInput.forEach(letter => {
    let nodeWithLetter = document.createElement('span');
    nodeWithLetter.innerText = letter;
    letters.push(nodeWithLetter)
    fragmentSpan.appendChild(nodeWithLetter);
    moveSelectedSymbol(e, nodeWithLetter);
  })
  e.appendChild(fragmentSpan);
  return letters;
}

function addInputTextToPage() {
  let fragmentCanvas = document.createDocumentFragment();
  let lettersLength = letters.length;
  for(let i = 0; i < lettersLength; i++){
    let letter = letters.pop()
    console.log("letter")
    console.log(letter)
    letter.remove();
  }

  let splitText = inputText.value.split('');
  splitText.value = '';
  newNodeWithInputText.classList.add('canvas');
  fragmentCanvas.appendChild(newNodeWithInputText);
  infoForm.appendChild(fragmentCanvas);
  return addSpanForEveryLetter(newNodeWithInputText, splitText)
/!*
  let bodyChildren = document.body.children;
  deleteNextSiblingElement([...bodyChildren])*!/
}

/!*function deleteNextSiblingElement(elements) {
  elements.forEach(element => {
    const nextDivDesc = element.nextElementSibling;
    if (element.nodeName === 'DIV' && element.className === 'canvas' && nextDivDesc !== null) {
      nextDivDesc.remove();
    }
  })
}*!/

function moveSelectedSymbol(canvasContainer, e) {
  e.addEventListener('click', e => {
    let letter = e.target;
    letter.classList.add('spanAfterMove');
    let canvas = document.querySelector('.canvas');
    let offsetXCanvas = canvas.offsetLeft;
    let offsetYCanvas = canvas.offsetTop;

    let listener = (e) => {
      letter.style.left = `${e.x - offsetXCanvas}px`;
      letter.style.top = `${e.y - offsetYCanvas}px`;
    }
    canvas.addEventListener('mousemove', listener, false);

    canvasContainer.addEventListener('click', (e) => {
      if (e.target.nodeName === 'DIV') {
        canvas.removeEventListener('mousemove', listener, false)
      }
    });
  })
}*/
