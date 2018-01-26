$( document ).ready(function() {
  $('#form--journal__edit').submit(function(e) {
      e.preventDefault();
      $.ajax({
        method: 'PUT',
        url: $(this).attr('action'),
        data: {
          location: $('#newLocation').val(),
          mood: $('#newMood').val(),
          goal: $('#newGoal').val(),
          priority1: $('#newP1').val(),
          priority2: $('#newP2').val(),
          priority3: $('#newP3').val(),
          notes: $('#newNotes').val()
        }
      }).done(function(data){
        window.location.href = '/journal/all';
      });
    });
  });