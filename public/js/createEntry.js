$( document ).ready(function() {
  console.log('Create entry js');
  document.getElementById('a--input__submit').addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById('form--journal__new').submit();
    console.log('clicked');
    });

});