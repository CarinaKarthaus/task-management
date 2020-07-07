let allTasks = [];	
let peopleAssigned = [];	
let morePeopleCount = 2;
let contacts = [	
    [1,'Darrin S. Jones','Darrin@gmail.com', 'img/profile1.jpg' ],	
    [2,'Robert D. Cover','robert@gmail.com', 'img/profile2.jpg' ],	
    [3,'Terri W. Bec','terri@gmail.com', 'img/profile3.jpg' ]	
];	
let newTaskHTML;	
let contactName;	
let contactEmail; 	
let contactImg; 	
let specialCategory;	
//When plus-button is clicked, more people will be shown	
function showMorePeople() {	
    for (i = morePeopleCount; i <  morePeopleCount + 2 ; i++){
        document.getElementById('plus-btn').insertAdjacentHTML('beforebegin' ,`<img onclick='selectPerson(this.id)' class='assigned-pic' src='img/profile${i}.jpg' id='${i}'>`);
        }
        morePeopleCount += 2;
        if(morePeopleCount > contacts.length) document.getElementById('plus-btn').classList.add('d-none');
}	
//if person is already selected, remove selection and remove from peopleAssigned array; else select & add to array	
function selectPerson(id) {
        if (document.getElementById(id).classList.contains('selected-person-pic')){
            document.getElementById(id).classList.remove('selected-person-pic');
            for (i = 0; i < peopleAssigned.length; i++){
                if(peopleAssigned[i] == id ){
                    peopleAssigned.splice(i,1);
                     console.log(peopleAssigned);
                }
            }
        } else if(!document.getElementById(id).classList.contains('selected-person-pic')){
            document.getElementById(id).classList.add('selected-person-pic');
            peopleAssigned.push(id);
            console.log(peopleAssigned);
        }
    }
function addTask(){	
    let title = document.getElementById('task-title').value;	
    let dueDate = document.getElementById('task-due-date').value;	
    let category = document.getElementById('task-category').value;	
    let urgency = document.getElementById('task-urgency').value;	
    let details = document.getElementById('task-details').value;	
    let task = {	
        'title' : title,	
        'createdAt': new Date().getTime(),	
        'dueDate' : dueDate,	
        'category' : category,	
        'urgency' : urgency,	
        'details' : details,	
        'peopleAssigned' : peopleAssigned	
    };	
    allTasks.push(task);	
    let allTasksAsString = JSON.stringify(allTasks);	
    localStorage.setItem('allTasks', allTasksAsString);  	
}	
function loadAllTasks(){	
    let allTasksAsString = localStorage.getItem('allTasks');	
    allTasks = JSON.parse(allTasksAsString);	
    console.log('Loaded all tasks: ', allTasks);	
    console.log('People assigned: ' + peopleAssigned);	
}	



//JS for task-list (index.html)	

    // Load, append and show all tasks in task-list 	
    function showTasks(){	
        loadAllTasks();	
        let list = document.getElementById('list-box');	
        console.log(allTasks.length);
        // Load data of each task	
        for (i=0; i< allTasks.length; i++) {	
            let task = allTasks[i];	
            let peopleAssigned = task.peopleAssigned;	
            let category = task.category;	
            let details = task.details;	
            	
            specialCategory = categoryCheck(category); 	
            console.log('Special category: ', specialCategory);	
        	
            newTaskHTML = `	
                <div class="task-listed"> 	
                    <div class="category-marker ${specialCategory}"></div>  	
                        <div class="person-assigned">`;	
            	
            for (j=0; j< peopleAssigned.length; j++){	
                newTaskHTML = compileContactData(peopleAssigned, newTaskHTML, j); 	
            }	
            newTaskHTML += `</div> 	
                <p class="task-category">${category}</p> 	
                <p>${details}</p> 	
            </div>`;	
            	
            list.insertAdjacentHTML("beforeend", newTaskHTML);	
        }	
    }	
    // Check task-category to assign correct color for category-marker	
    function categoryCheck(category){	
        console.log('Category: ', category);	
        if (category == 'Marketing'){	
            specialCategory = 'Marketing';	
        } else if (category == 'Sales'){	
            specialCategory = 'ctg-sales';	
        }else if (category == 'Product'){	
            specialCategory = 'ctg-product';	
        }else if (category == 'Management'){	
            specialCategory = 'ctg-mgmt';	
        };     	
        return specialCategory; 	
    }	
    // compiile contact data section for the task and return it to showTasks()	
    function compileContactData(peopleAssigned, newTaskHTML, j) {	
        let taskContact;
        if (peopleAssigned[j] == '1'){	
            taskContact = contacts[0];	
        } else if (peopleAssigned[j] == '2') {	
            taskContact = contacts[1];	
        } else {	
            taskContact = contacts[2]; 	
        }	
        contactName = taskContact[1];	
        contactEmail = taskContact[2];	
        contactImg = taskContact[3];	
        newTaskHTML += `<img src=${contactImg}> 	
        <div class="contact-data"> 	
            <p>${contactName}</p> 	
            <p class="email">${contactEmail}</p> 	
        </div>  `;	
        console.log(newTaskHTML);	
        return newTaskHTML;	
    }