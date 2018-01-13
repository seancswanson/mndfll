$( document ).ready(function(){

  console.log('app.js running');

  setTimeout(function(){$('#div--card__alert').fadeOut();}, 2000);

  $(".dropdown-button").dropdown();
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

  $('.button--delete').submit(function(e){
    console.log('Delete button clicked');
    e.preventDefault();
    $.ajax({
      url: $(this).attr('action'),
      method: 'DELETE'
    }).done(function(){
      window.location.href = '/journal/all';
    });
  });

});
