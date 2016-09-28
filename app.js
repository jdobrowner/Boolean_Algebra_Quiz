$( function() {
  toggleHidden();
});

function toggleHidden() {
$('.plus-minus-button').click( function(event){
  var button = $(this);
  button.closest('div').children('.could-hide').toggleClass('hidden');

  console.log(button.text());
  if (button.text() === '-') button.text('+');
  else button.text('-');
  });
}
