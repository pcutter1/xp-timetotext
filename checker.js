'use strict'

const fs = require('fs')
const time2text = require('./time2text')

const testFileName = process.argv[2]
console.log('Reading test data from file: ' + testFileName + ' ...')
fs.readFile(testFileName, (err, data) => {
  if (err) console.log('Error: ', err)
  const testData = JSON.parse(data)

  console.log('Testing time2text ...')
  const failedTests = testData
    .filter((item) => {
      return item.text !== time2text(item.time)
    })
    .map((item) => {
      return {
        time: item.time,
        expected: item.text,
        actual: time2text(item.time)
      }
    })

  if (failedTests.length > 0) {
    console.log(failedTests.length + ' Failures')
    const randomIndex = Math.floor(Math.random() * failedTests.length)
    const randomFailure = failedTests[randomIndex]
    console.log('For instance "' + randomFailure.time + '" > ',
      'expected("' + randomFailure.expected + '") ',
      'actual("' + randomFailure.actual + '")')
  } else {
    console.log('Success! No failures!')
  }
})
