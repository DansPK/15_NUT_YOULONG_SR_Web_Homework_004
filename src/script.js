let editIndex = -1;


var task = [
  { task: "Korean Homework", Priority: "High", Status: "Progress" },
  { task: "Java Homework", Priority: "Medium", Status: "Progress" },
  { task: "Web Homework", Priority: "Low", Status: "Progress" },
];

buildTable(task);

function buildTable(data) {
  var table = document.getElementById("table-body");

  for (var i = 0; i < data.length; i++) {
    var priority = data[i].Priority;

    if (priority === "High") {
      color = "text-red-500";
    } else if (priority === "Medium") {
      color = "text-yellow-500";
    } else {
      color = "text-green-500";
    }

    var row = `<tr class="bg-white w-200 h-15  hover:scale-110 transition-all">
                        <td class="rounded-l-full text-left px-5">${data[i].task}</td>
                        <td class="text-center ${color}">${data[i].Priority}</td>
                        <td class="text-center">${data[i].Status}</td>
                        <td class="rounded-r-full text-center">
                            <button onclick="btn_edit(${i})" class="cursor-pointer text-3xl text-yellow-600"><i class="fa-solid fa-pen-to-square"></i></button><button onclick="btn_delete(${i})" class="cursor-pointer text-3xl text-red-600"><i class="fa-solid fa-trash"></i></button>
                        </td>
                        
                    </tr>
                `;

    table.innerHTML += row;
  }
}

const btnAdd = document.getElementById("btn_add");
const btnSubmit = document.getElementById("btn_submit");
const btnClose = document.getElementById("btn_close");
const btnCancel = document.getElementById("btn_cancel");

btnSubmit.addEventListener("click", function () {

    //get value from element

    var taskval = document.getElementById("ftaskname").value;
    var selectedPriority = document.querySelector(
        'input[name="priority_radio"]:checked',
    ).value;
    var selectedStatus = document.querySelector(
        'input[name="status_radio"]:checked',
    ).value;


    if (btnSubmit.textContent === "Add") {
        task.push({
                task: taskval,
                Priority: selectedPriority,
                Status: selectedStatus,
            });
    }
    else {
        task[editIndex].task = taskval;
        task[editIndex].Priority = selectedPriority;
        task[editIndex].Status = selectedStatus;
        btnSubmit.textContent = "Add";
    }

    
    document.getElementById("overlay").classList.add("hidden");
    clearForm();
    document.getElementById("table-body").innerHTML = "";
    buildTable(task);
    
    
});


//close form and clear 

btnClose.addEventListener("click", function () {
  document.getElementById("overlay").classList.add("hidden");
  clearForm();
});

btnCancel.addEventListener("click", function () {
  document.getElementById("overlay").classList.add("hidden");
  clearForm();
});


// show form
btnAdd.addEventListener("click", function () {
  btnSubmit.textContent = "Add";
  document.getElementById("overlay").classList.remove("hidden");
  document.getElementById("btn_cancel").classList.add("hidden");
});

function btn_edit(i) {

    clearForm();
    editIndex = i;

    document.getElementById("overlay").classList.remove("hidden");
    document.getElementById("btn_submit").textContent = "Update";
    document.getElementById("ftaskname").value = task[i].task;
    document.querySelector(`input[name="priority_radio"][value="${task[i].Priority}"]`).checked = true;
        document.querySelector(`input[name="status_radio"][value="${task[i].Status}"]`).checked = true;

    btnSubmit.textContent = "Update";
    document.getElementById("btn_cancel").classList.remove("hidden");



}



function btn_delete(i) {

    //remove 1 item from the index
    task.splice(i, 1);

    document.getElementById("table-body").innerHTML = "";
    buildTable(task);
}


function clearForm(){

    document.getElementById("ftaskname").value = "";


    document.querySelectorAll('input[name="priority_radio"]').forEach(r => r.checked = false);

    document.querySelectorAll('input[name="status_radio"]').forEach(r => r.checked = false);

}
