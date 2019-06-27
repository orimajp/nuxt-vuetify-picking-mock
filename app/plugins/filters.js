import Vue from 'vue'

Vue.filter('locationName', function (value) {
  if (value === '' || value.length !== 3) {
    return
  }
  return value.substring(0, 2) + '-' + value.substring(2, 3)
})

Vue.filter('instructionNo', function (value) {
  if (value === '') {
    return
  }
  return 'I' + value.padStart(10, '0')
})

Vue.filter('detailCount', function (value) {
  if (value === '') {
    return
  }
  return `${value} 個`
})
