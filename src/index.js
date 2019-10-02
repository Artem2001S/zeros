module.exports = function zeros(expression) {
  let values = expression.split('*');
  let decomp = '';

  for (let i = 0; i < values.length; i++) {
    //get value before '!'
    const value = values[i].slice(0, values[i].indexOf('!'));

    //check is it double factorial
    if (values[i][values[i].length - 1] + values[i][values[i].length - 2] !== '!!')
      decomp += '*' + getDecomposition(value);
    else
      decomp += '*' + getDecomposition(value, true, Number(value) % 2 === 0);
  }

  let zeroes = 0;
  //split decomp, get array
  let decompValues = decomp.split('*');

  //delete first element because it is ''
  decompValues.shift();

  let countOfTwo = 0;
  let countOfFive = 0;

  for (let i = 0; i < decompValues.length; i++) {
    let tmp = decompValues[i];
    if (Number(decompValues[i]) % 2 === 0) {
      while (Number(decompValues[i]) % 2 === 0) {
        decompValues[i] = Number(decompValues[i]) / 2;
        countOfTwo++;
      }
    }

    if (Number(decompValues[i]) % 5 === 0) {
      while (Number(decompValues[i]) % 5 === 0) {
        decompValues[i] = Number(decompValues[i]) / 5;
        countOfFive++;
      }
    }
    decompValues[i] = tmp;
  }

  // return 0  if have 0 two
  if (countOfTwo === 0) return 0;
  // return smaller value
  zeroes = countOfTwo > countOfFive ? countOfFive : countOfTwo;
  return zeroes;
}

function getDecomposition(value, isDoubleFactorial = false, isEven) {
  let decomp = '';
  let startValue = 1;
  let step = 1;
  if (isDoubleFactorial === true) {
    if (isEven) {
      startValue = 2;
      step = 2;
    } else {
      startValue = 1;
      step = 2;
    }
  }

  for (i = startValue; i <= Number(value); i += step) {
    decomp = i === Number(value) ? decomp + i + '' : decomp + i + '*';
  }

  return decomp;
}