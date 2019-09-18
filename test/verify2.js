'use strict'

const testData = require('./data/test_data_2')
const money2text = require('../money2text')

console.log('Testing money2text ...')

const failedTests = testData
  .filter((item) => {
    item.actual = money2text(item.amount)
    return item.text !== item.actual
  })
  .map((item) => {
    return {
      time: item.time,
      expected: item.text,
      actual: item.actual
    }
  })

if (failedTests.length > 0) {
  console.log(testData.length - failedTests.length + ' Passed')
  console.log(failedTests.length + ' Failed')
  const randomIndex = Math.floor(Math.random() * failedTests.length)
  const randomFailure = failedTests[randomIndex]
  console.log('For example, "' + randomFailure.time + '"',
    'expected("' + randomFailure.expected + '") ',
    'actual("' + randomFailure.actual + '")')
} else {
  console.log('Success! No failures!')
}
