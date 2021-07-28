const inputText = document.querySelector('#inputText')
const btnSubmit = document.querySelector('#btnSubmit')
const infoForm = document.querySelector('form')
const newNodeWithInputText = document.createElement('div')

class DynamicLetters {
  constructor(
    inputText,
    btnSubmit
  ) {
    this.letters = [];

    btnSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      this.addInputTextToPage();
    });
  }

  addInputTextToPage() {
    let fragmentCanvas = document.createDocumentFragment();
    this.removeAllLetters();
    let splitText = inputText.value.split('');
    splitText.value = '';
    newNodeWithInputText.classList.add('canvas');
    fragmentCanvas.appendChild(newNodeWithInputText);
    infoForm.appendChild(fragmentCanvas);
    this.addSpanForEveryLetter(newNodeWithInputText, splitText)
  }

  removeAllLetters() {
    let lettersLength = this.letters.length;
    for (let i = 0; i < lettersLength; i++) {
      let letter = this.letters.pop()
      letter.remove();
    }
  }
  addSpanForEveryLetter(e, textFromInput) {
    let fragmentSpan = document.createDocumentFragment();
    let width = 0;
    let computedFontSize = parseInt(window.getComputedStyle(document.getElementById("inputText")).fontSize) + 5;
    console.log(computedFontSize)
    console.log("computedFontSize")
    textFromInput.forEach(letter => {
      let nodeWithLetter = document.createElement('span');
      // nodeWithLetter.classList.add('spanAfterMove');
      nodeWithLetter.style.position = 'absolute';
      nodeWithLetter.style.left = width + 'px';
      nodeWithLetter.innerText = letter;
      fragmentSpan.appendChild(nodeWithLetter);
      this.moveSelectedSymbol(e, nodeWithLetter);
      this.letters.push(nodeWithLetter)
      width += computedFontSize;
    })
    e.appendChild(fragmentSpan);
  }


  moveSelectedSymbol(canvasContainer, e) {
    e.addEventListener('click', e => {
      let letter = e.target;
      letter.classList.add('spanAfterMove');
      let canvas = document.querySelector('.canvas');
      let offsetXCanvas = canvas.offsetLeft;
      let offsetYCanvas = canvas.offsetTop;

      let onMouseMoveListener = (e) => {
        letter.style.left = `${e.x - offsetXCanvas}px`;
        letter.style.top = `${e.y - offsetYCanvas}px`;
      }
      canvas.addEventListener('mousemove', onMouseMoveListener, false);

      canvasContainer.addEventListener('click', (e) => {
        if (e.target.nodeName === 'DIV') {
          canvas.removeEventListener('mousemove', onMouseMoveListener, false)
        }
      });
    })
  }
}

let dynamicLetters = new DynamicLetters(inputText, btnSubmit, infoForm, newNodeWithInputText)