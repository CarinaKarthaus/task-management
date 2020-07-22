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




