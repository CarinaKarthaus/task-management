let allTasks = [];
let peopleAssigned = [];
let contacts = [
    [1,'Darrin S. Jones','Darrin@gmail.com'],
    [2,'Robert D. Cover','robert@gmail.com'],
    [3,'Terri W. Bec','terri@gmail.com']
];
//When plus-button is clicked, more people will be shown
function showMorePeople() {
    document.getElementById('plus-btn').classList.add('d-none');
    document.getElementById('1').classList.remove('d-none');
    document.getElementById('2').classList.remove('d-none');
    document.getElementById('3').classList.remove('d-none');
}
//if person is already selected, remove selection and remove from peopleAssigned array; else select & add to array
function selectPerson(id) {
    if (document.getElementById(id).classList.contains('selected-person-pic')){
        document.getElementById(id).classList.remove('selected-person-pic');
        document.getElementById(id).classList.add('d-none');
        document.getElementById('plus-btn').classList.remove('d-none');
        for (i = 0; i <= peopleAssigned.length -1; i++){
            if(peopleAssigned[i] == document.getElementById(id).id){
                peopleAssigned.splice(i,1);
            }
        }
    } else if(!document.getElementById(id).classList.contains('selected-person-pic')){
        document.getElementById(id).classList.add('selected-person-pic');
        peopleAssigned.push(document.getElementById(id).id);
        console.log(peopleAssigned);
    }
}
function addTask(){
    console.log('hey');
    let title = document.getElementById('task-title').value;
    let dueDate = document.getElementById('task-due-date').value;
    let category = document.getElementById('task-category').value;
    let urgency = document.getElementById('task-urgency').value;
    let details = document.getElementById('task-details').value;
    let task = {
        'title' : title,
        'createdAt': new Date().getTime(),
        'dueDate' : dueDate,
        'category' : category,
        'urgency' : urgency,
        'details' : details
        //'PeopleAssigned' : peopleAssigned 
    };
    allTasks.push(task);
    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);  
}
function loadAllTasks(){
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString);
    console.log('Loaded all tasks: ', allTasks);
    console.log('People assigned: ' + peopleAssigned);
}