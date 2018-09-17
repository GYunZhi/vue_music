export const flexible = function () {
  var tid
  var docEl = document.documentElement
  var refreshRem = function () {
    var clientWidth = docEl.clientWidth < 375 ? docEl.clientWidth : 375
    var rem = clientWidth / 375
    docEl.style.fontSize = (rem * 100) + 'px'
  }
  window.addEventListener('resize', function () {
    clearTimeout(tid)
    tid = setTimeout(refreshRem, 300)
  }, false)
  refreshRem()
}
