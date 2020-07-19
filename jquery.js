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

/**
 * For portrait view 
*  Change arrow-color when hovering over arrow-line 
*/
  $(document).ready(function(){
    //let taskClassification = ['urgency-high', 'urgency-low', 'importance-high', 'importance-low'];
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
/**
 * For desktop-view
 * Change arrow-color when hovering over arrow-line 
 */
  $(document).ready(function(){
    //let taskClassification = ['urgency-high', 'urgency-low', 'importance-high', 'importance-low'];
        // Urgency high
        $('#urgency-high-line-desktop').mouseover(function(){
            $('#urgency-high-arrow-desktop').css('border-right', '#D8D8D8 1.5em solid');
        });
        $('#urgency-high-line-desktop').mouseout(function(){
            $('#urgency-high-arrow-desktop').css("border-right", '#4c5aa7 1.5em solid');
        });
        // Urgency low
        $('#urgency-low-line-desktop').mouseover(function(){
            $('#urgency-low-arrow-desktop').css('border-right', '#D8D8D8 1.5em solid'); 
        });
        $('#urgency-low-line-desktop').mouseout(function(){
            $('#urgency-low-arrow-desktop').css("border-right", '#4c5aa7 1.5em solid');
        });
        // Importance high
        $('#importance-high-line-desktop').mouseover(function(){
            $('#importance-high-arrow-desktop').css('border-right', '#D8D8D8 1.5em solid');
        });
        $('#importance-high-line-desktop').mouseout(function(){
            $('#importance-high-arrow-desktop').css("border-right", '#4c5aa7 1.5em solid');
        })
        // Importance low
        ;$('#importance-low-line-desktop').mouseover(function(){
            $('#importance-low-arrow-desktop').css('border-right', '#D8D8D8 1.5em solid');
        });
        $('#importance-low-line-desktop').mouseout(function(){
            $('#importance-low-arrow-desktop').css("border-right", '#4c5aa7 1.5em solid');
        });
  });



  
