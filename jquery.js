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
 * Change arrow-color in matrix when hovering over arrow-line 
 */
  $(document).ready(function(){
        // for mobile view
    highlightArrow('#urgency-high-line', '#urgency-high-arrow');
    highlightArrow('#urgency-low-line', '#urgency-low-arrow');
    highlightArrow('#importance-high-line', '#importance-high-arrow');
    highlightArrow('#importance-low-line', '#importance-low-arrow');
        // For desktop view
    highlightArrow('#urgency-high-line-desktop', '#urgency-high-arrow-desktop');
    highlightArrow('#urgency-low-line-desktop', '#urgency-low-arrow-desktop');
    highlightArrow('#importance-high-line-desktop', '#importance-high-arrow-desktop');
    highlightArrow('#importance-low-line-desktop', '#importance-low-arrow-desktop');
  
  }); 

  function highlightArrow(lineId, arrowId) {
    // Change color of arrow when hovering over arrow-line
    $(lineId).mouseover(function(){
        $(arrowId).css('border-right', '#D8D8D8 1.5em solid');
    });
    // Set arrow-color back to default when mouse is leaving arrow-line
    $(lineId).mouseout(function(){
        $(arrowId).css("border-right", '#4c5aa7 1.5em solid');
    });
  }




