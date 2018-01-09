$( document ).ready(function(){
  $(".dropdown-button").dropdown();
  
  document.getElementById('a--input__submit').addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById('form--journal__new').submit();
    console.log('clicked');
  });


  $('.modal').modal();
  
  $('.modal-trigger').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        alert("Ready");
        console.log(modal, trigger);
      },
      complete: function() { alert('Closed'); } // Callback for Modal close
    }
  );
});