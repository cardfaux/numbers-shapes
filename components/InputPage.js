import css from '../components/InputPage.css?raw';

export class InputPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    const styles = document.createElement('style');
    styles.textContent = css;
    this.root.appendChild(styles);
    const section = document.createElement('section');
    section.classList.add('input-page-section');
    this.root.appendChild(section);
  }
  connectedCallback() {
    window.addEventListener('app-input-change', () => {
      this.render();
      this.addEventListeners();
    });
    this.render();
    this.addEventListeners();
  }

  //* divisible by 2 should be a square
  //* divisible by 3 should be a rectangle
  //* less than 10 and odd should be a triangle
  //* prime should be a circle if they are not divisible by 2, 3, or less than 10 and odd
  //* prime numbers from 0 - 100 is 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97.
  //* a prime number is a natural number greater than 1 that have only two positive divisors: 1 and the number itself.
  //* if the number is odd the inside of the shape should be filled with green.
  //* if it is even it should be the shape should be transparent with a background color of red.
  //* background color of the shape should be gray if the number is greater than 50.
  //* if the number is greater than 50, the gray background should take priority over the red or green background of the even or odd numbers.

  //! The way this currently is set up, the number 9 shows up as a green rectangle and not a triangle with green filling.
  //! Because it is divisible by 3 which comes first in the checks & it is odd.

  checkNumber(number, index) {
    const shapeContainer = this.root.querySelector('#shape-container');
    const styles = this.root.querySelector('#dynamic-styles');

    let shapeHTML = '';
    let shapeClass = '';
    let fillColor = number % 2 !== 0 ? 'green' : 'transparent';

    let condition = '';
    if (number % 2 === 0) {
      condition = 'divisibleBy2';
    } else if (number % 3 === 0) {
      condition = 'divisibleBy3';
    } else if (number < 10 && number % 2 !== 0) {
      condition = 'lessThan10AndOdd';
    } else if (this.isPrime(number)) {
      condition = 'prime';
    } else if (number > 50 && number % 2 !== 0) {
      condition = 'greaterThan50AndOdd';
    } else if (number > 50 && number % 2 === 0) {
      condition = 'greaterThan50AndEven';
    }

    switch (condition) {
      case 'divisibleBy2':
        shapeHTML = '<div class="square"></div>';
        shapeClass = 'square';
        styles.innerHTML += `.${shapeClass} { width: 100px; height: 100px; border: 1px solid black; background-color: ${fillColor}; }`;
        shapeContainer.style.backgroundColor = 'var(--color-peach-bud)';
        break;
      case 'divisibleBy3':
        shapeHTML = '<div class="rectangle"></div>';
        shapeClass = 'rectangle';
        styles.innerHTML += `.${shapeClass} { width: 200px; height: 100px; border: 1px solid black; background-color: ${fillColor}; }`;
        shapeContainer.style.backgroundColor = 'var(--color-peach-bud)';
        break;
      case 'lessThan10AndOdd':
        shapeHTML = '<div class="triangle"></div>';
        shapeClass = 'triangle';
        styles.innerHTML += `.${shapeClass} { width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 100px solid ${fillColor}; background-color: transparent; }`;
        shapeContainer.style.backgroundColor = 'var(--color-peach-bud)';
        break;
      case 'prime':
        shapeHTML = '<div class="circle"></div>';
        shapeClass = 'circle';
        styles.innerHTML += `.${shapeClass} { width: 100px; height: 100px; border-radius: 50%; border: 1px solid black; background-color: ${fillColor}; }`;
        shapeContainer.style.backgroundColor = 'var(--color-peach-bud)';
        break;
      default:
        shapeHTML = '<p>No shape for this number</p>';
        break;
    }

    //* condition messages
    const conditionMessages = {
      divisibleBy2: 'The number is divisible by 2.',
      divisibleBy3: 'The number is divisible by 3.',
      lessThan10AndOdd: 'The number is less than 10 and odd.',
      prime: 'The number is prime.',
      greaterThan50AndEven: 'The number is greater than 50 and even.',
      greaterThan50AndOdd: 'The number is greater than 50 and odd.',
    };

    //? check if number is greater than 50
    if (number > 50) {
      let condition50 = number % 2 === 0 ? 'greaterThan50AndEven' : 'greaterThan50AndOdd';
      switch (condition50) {
        case 'greaterThan50AndOdd':
          shapeContainer.style.backgroundColor = 'gray';
          break;
        case 'greaterThan50AndEven':
          shapeHTML = '<div class="square"></div>';
          shapeClass = 'square';
          styles.innerHTML += `.${shapeClass} { width: 100px; height: 100px; border: 1px solid black; background-color: gray; }`;
          shapeContainer.style.backgroundColor = 'var(--color-peach-bud)';
          break;
      }
      shapeContainer.innerHTML += `<div>${index}. <br> Condition: ${conditionMessages[condition50]} ${shapeHTML}</div><br>`;
    } else {
      shapeContainer.innerHTML += `<div>${index}. <br> Condition: ${conditionMessages[condition]} ${shapeHTML}</div><br>`;
    }
  }

  //? check if number is prime
  isPrime(num) {
    if (num <= 1) return false;
    if (num === 2) return true;

    for (let i = 2; i <= num / 2; i++) {
      if (num % i === 0) return false;
    }

    return true;
  }

  addEventListeners() {
    const buttonElement = this.root.querySelector('#submitBtn');
    if (buttonElement) {
      buttonElement.addEventListener('click', () => {
        const inputElement = this.root.querySelector('#number-input');
        const shapeContainer = this.root.querySelector('#shape-container');
        shapeContainer.innerHTML = '';
        if (inputElement) {
          const numbers = inputElement.value.split(',').map(Number);
          numbers.forEach((number, index) => {
            this.checkNumber(number, index + 1);
          });
        } else {
          console.log('inputElement is null');
        }

        //animations
        const shapes = this.root.querySelectorAll('.square, .rectangle, .triangle, .circle');
        shapes.forEach((shape) => {
          shape.classList.remove('animate');
          void shape.offsetWidth;
          shape.classList.add('animate');
        });
        //animations
      });
    }
  }

  render() {
    let section = this.root.querySelector('section');
    const template = document.getElementById('input-page-template');
    const content = template.content.cloneNode(true);
    section.appendChild(content);
  }
}

customElements.define('input-page', InputPage);
