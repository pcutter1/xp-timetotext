'use strict'

  function money2text (money) {
    //PARSING THE MONEY (AT THE DECIMAL POINT)
    let [dollarStr, centStr] = money.split(".");
    let dollarValue = parseInt(dollarStr);
    let centValue = parseInt(centStr);
    //CENTS PORTION - LAST 2 CHARACTERS
    if (centValue === 0) {
      return humanize(dollarValue) + " dollars";
    }
    //IF 0 DOLLARS => RETURN CENTS STRING
    return humanize(dollarValue)+" dollars" + " and " + humanize(centValue) +" cents";
        }
module.exports = money2text


function humanize(num){
  var ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
    'seventeen', 'eighteen', 'nineteen'];
  var tens = ['', '', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty',
    'ninety'];

  var numString = num.toString();

  if (num < 0) throw new Error('Negative numbers are not supported.');

  if (num === 0) return 'zero';

  //the case of 1 - 20
  if (num < 20) {
    return ones[num];
  }

  if (numString.length === 2) {
    return tens[numString[0]] + ' ' + ones[numString[1]];
  }

  //100 and more
  if (numString.length === 3) {
    if (numString[1] === '0' && numString[2] === '0')
      return ones[numString[0]] + ' hundred';
    else
      return ones[numString[0]] + ' hundred and ' + humanize(+(numString[1] + numString[2]));
  }

  if (numString.length === 4) {
    var end = +(numString[1] + numString[2] + numString[3]);
    if (end === 0) return ones[numString[0]] + ' thousand';
    if (end < 100) return ones[numString[0]] + ' thousand and ' + humanize(end);
    return ones[numString[0]] + ' thousand ' + humanize(end);
  }
}