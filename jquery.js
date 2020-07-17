/**
 * Deletes task from array, if confirm-delete-button is clicked in delete confirm. modal
 */
$('#deleteConfirmation').on('click', '.btn-ok', function() {
    let taskIndex = parseInt($(this).attr('id'));
    allTasks.splice(taskIndex, 1);
    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString); 
    location.reload();
});

$(function() {
    let taskClassification = ['urgency-high', 'urgency-low', 'importance-high', 'importance-low'];
     for (m =0; m< taskClassification.length; m++){
        $('#' + taskClassification[m] + '-line').hover(function() {
            $('#' + taskClassification[m] + '-arrow').css('background-color', 'black')
            $('#' + taskClassification[m] + '-arrow').css('transition', 'scale(1.05)');
            console.log(taskClassification[m]);
          }, function() {
            // on mouseout, reset the background colour
            $('#' + taskClassification[m] + '-arrow').css('background-color', '');
          });
    }
  });

  /**
   * Change arrow-color when hovering over arrow-line 
   */
  $(document).ready(function(){
    let taskClassification = ['urgency-high', 'urgency-low', 'importance-high', 'importance-low'];
        // Urgency high
        $('#urgency-high-line').mouseover(function(){
            $('#urgency-high-arrow').css('border-right', '#D8D8D8 1.5em solid');
        });
        $('#urgency-high-line').mouseout(function(){
            $('#urgency-high-arrow').css("border-right", '#4c5aa7 1.5em solid');
        });
        // Urgency low
        $('#urgency-low-line').mouseover(function(){
            $('#urgency-low-arrow').css('border-right', '#D8D8D8 1.5em solid');
        });
        $('#urgency-low-line').mouseout(function(){
            $('#urgency-low-arrow').css("border-right", '#4c5aa7 1.5em solid');
        });
        // Importance high
        $('#importance-high-line').mouseover(function(){
            $('#importance-high-arrow').css('border-right', '#D8D8D8 1.5em solid');
        });
        $('#importance-high-line').mouseout(function(){
            $('#importance-high-arrow').css("border-right", '#4c5aa7 1.5em solid');
        })
        // Importance low
        ;$('#importance-low-line').mouseover(function(){
            $('#importance-low-arrow').css('border-right', '#D8D8D8 1.5em solid');
        });
        $('#importance-low-line').mouseout(function(){
            $('#importance-low-arrow').css("border-right", '#4c5aa7 1.5em solid');
        });
  });


  
