$( document ).ready(function(){

  console.log('app.js running');


  if (document.location.href.indexOf('edit') > -1){ 
  // console.log('update');
  document.getElementById('a--input__edit').addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById('form--journal__edit').submit();
    console.log('clicked');
    });
  }


  if (document.location.href.indexOf('new') > -1){ 
    //Your code goes here
    // console.log('create');
  document.getElementById('a--input__submit').addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById('form--journal__new').submit();
    console.log('clicked');
    });
  }

  $(".dropdown-button").dropdown();
  $('.modal').modal();
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