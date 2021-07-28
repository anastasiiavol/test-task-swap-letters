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
    this.isDragging = false;

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

  addSpanForEveryLetter(container, textFromInput) {
    let fragmentSpan = document.createDocumentFragment();
    let width = 0;
    let computedFontSize = parseInt(window.getComputedStyle(document.getElementById("inputText")).fontSize) + 30;
    textFromInput.forEach(letter => {
      let nodeWithLetter = document.createElement('span');
      nodeWithLetter.classList.add('letter');
      nodeWithLetter.style.position = 'absolute';
      nodeWithLetter.style.left = width + 'px';
      nodeWithLetter.innerText = letter;
      fragmentSpan.appendChild(nodeWithLetter);
      this.moveSelectedSymbol(container, nodeWithLetter);
      this.letters.push(nodeWithLetter)
      width += computedFontSize;
    })
    container.appendChild(fragmentSpan);
  }

  findIntersectingLetter(letter) {
    let minX = letter.offsetLeft;
    let maxX = letter.offsetLeft + letter.offsetWidth;
    let minY = letter.offsetTop;
    let maxY = letter.offsetTop + letter.offsetHeight;
    let letters = document.getElementsByClassName('letter');
    for (let index = 0; index < letters.length; index++) {
      let item = letters.item(index);
      let minItemX = item.offsetLeft;
      let maxItemX = item.offsetLeft + item.offsetWidth;
      let minItemY = item.offsetTop;
      let maxItemY = item.offsetTop + item.offsetHeight;

      let isLeft = maxX < minItemX;
      let isRight = minX > maxItemX;
      let isAbove = minY > maxItemY;
      let isBelow = maxY < minItemY;

      if (!(isLeft || isRight || isAbove || isBelow)) {
        return item
      }
    }
    return null
  }

  swapLetters(a, b) {
    let t = a.innerText;
    a.innerText = b.innerText;
    b.innerText = t;
  }

  moveSelectedSymbol(container, letter) {
    letter.addEventListener('click', e => {
      e.preventDefault();
      this.isDragging = !this.isDragging;
      let offsetXCanvas = container.offsetLeft;
      let offsetYCanvas = container.offsetTop;

      let onMouseMoveListener = (e) => {
        letter.style.left = `${e.x - offsetXCanvas}px`;
        letter.style.top = `${e.y - offsetYCanvas}px`;
      }

      if (this.isDragging) {

        container.addEventListener('mousemove', onMouseMoveListener, false);

        container.addEventListener('click', (e) => {
          if (e.target.nodeName === 'DIV') {
            container.removeEventListener('mousemove', onMouseMoveListener, false)
          }
        });

      } else {
        let intersection = this.findIntersectingLetter(letter)
        if (intersection) {
          this.swapLetters(letter, intersection);
          container.removeEventListener('mousemove', onMouseMoveListener, false)
        }
      }
    })
  }
}

let dynamicLetters = new DynamicLetters(inputText, btnSubmit, infoForm, newNodeWithInputText)