const display = document.getElementById('display');
const buttons = document.querySelectorAll('#calculator button');

buttons.forEach(button => {
  button.addEventListener('click', function() {
    display.value += this.textContent;
  });
});

document.getElementById('calculate').addEventListener('click', function() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = 'Error';
  }
});
