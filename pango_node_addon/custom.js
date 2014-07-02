$('#tabs a').click(function (e) {
  e.preventDefault()
  alert("test");
  $(this).tab('show')
})
$('#sender a').click(function (e) {
  e.preventDefault()
  alert("test");
  $(this).tab('show')
})
$('#recipient a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})