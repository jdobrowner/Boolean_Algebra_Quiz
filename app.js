$( function() {
  toggleHidden();
});

function toggleHidden() {
$('.plus-minus-button').click( function(event){
  var button = $(this);
  button.closest('div').children('.could-hide').toggleClass('hidden');
  if (button.text() === '-') button.text('+');
  else button.text('-');
  });
}

function beginQuiz() {
$('.begin-quiz').click( function(event){
  var button = $(this);
  state.page = 1;
  button.siblings('p').remove();
  button.remove();
  button.closest('.quiz').



  });
}
