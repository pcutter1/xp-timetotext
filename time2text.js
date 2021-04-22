'use strict'
function time2text (time) {
  // handle edge cases
  if (time === '00:00') return 'midnight';
  if (time === '12:00') return 'noon';
  // process the input
  let [hourStr, minutesStr] = time.split(":");
  let hour = parseInt(hourStr);
  let originalHour = parseInt(hourStr)
  //let minuts = parseInt(minutesStr);
  let morningAfternoonEvening = "";
  // get the ampm
  // if (hour >= 0 && hour < 12) {
  //     morningAfternoonEvening = "in the morning";
  // } else if (hour >=12 && hour <18){
  //     morningAfternoonEvening = "in the afternoon";
  // } else {
  //     morningAfternoonEvening = "in the evening";
  // }
  // convert the hour
  if (hour > 12) {
    hour -= 12;
  }
  // map hours to string format
  let numberWordMap = {
    0: "twelve",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen"
  }
  let tensMap = {
    2: "twenty",
    3: "thirty",
    4: "fourty",
    5: "fifty"
  }
  hourStr = numberWordMap[hour];
  if (parseInt(minutesStr) < 20) {
    //2 scenarios
    //1 - minutes might be 00, return oh clock
    if(minutesStr === '00') {
      return hourStr + " o'clock " + helper(originalHour);
    }
    //handle the 5, 10, 15 min cases
    if(minutesStr === '05') {
      return 'five past ' + hourStr + " " + helper(originalHour);
    } else if(minutesStr === '10') {
      return 'ten past ' + hourStr + " " + helper(originalHour);
    } else if(minutesStr === '15') {
      return 'quarter past ' + hourStr + " " + helper(originalHour);
    }
    //2 - 01 - 09, return oh + minute
    if(minutesStr.charAt(0) === '0') {
      minutesStr = "oh " + numberWordMap[minutesStr.charAt(1)];
    } else {
      minutesStr = numberWordMap[minutesStr];
    }
  } else {
    //handle the 20, 30, 40, 45, 50, 55 min cases
    if(minutesStr === '20') {
      return 'twenty past ' + hourStr + " " + helper(originalHour);
    } else if(minutesStr === '30') {
      return 'half past ' + hourStr + " " + helper(originalHour);
    } else if(minutesStr === '40') {
      hourStr = numberWordMap[(hour + 1) % 12];
      return 'twenty to ' + hourStr + " " + helper(originalHour + 1);
    } else if(minutesStr === '45') {
      hourStr = numberWordMap[(hour + 1) % 12];
      return 'quarter to ' + hourStr + " " + helper(originalHour + 1);
    } else if(minutesStr === '50') {
      hourStr = numberWordMap[(hour + 1) % 12];
      return 'ten to ' + hourStr + " " + helper(originalHour + 1);
    } else if(minutesStr === '55') {
      hourStr = numberWordMap[(hour + 1) % 12];
      return 'five to ' + hourStr + " " + helper(originalHour + 1);
    }
    minutesStr = tensMap[minutesStr.charAt(0)] + "-" + numberWordMap[minutesStr.charAt(1)];
  }
  // the conversion
  return hourStr + " " + minutesStr + " " + helper(originalHour);
}
function helper(hour) {
  if (hour >= 0 && hour < 12) {
    return "in the morning";
  } else if (hour >=12 && hour <18){
    return "in the afternoon";
  } else {
    return "in the evening";
  }
}

module.exports = time2text

