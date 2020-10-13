var validation = new Validation();
var listTask = new TaskList();
getEle('addItem').addEventListener('click', function () {

    var layTask_Name = getEle('newTask').value;
    var layTask_Status = 'todo';
    // console.log(layTask_Input);
    var isValid = true;
    isValid &= validation.kiemTraRong(layTask_Name, 'notiInput', '(*) Vui lòng nhập thông tin') && validation.kiemTraTrungTask(layTask_Name, 'notiInput', '(*) Đã có task trùng tên', listTask.arr);

    var task = new Task(layTask_Name, layTask_Status);

    if (!isValid) return;
    console.log('thêm Thành công');

    listTask.addTask(task);
    console.log(listTask.arr);
    AddTask(listTask.arr);
    // listTask.timViTri(task.id);
})

function CreateTable(arr){
    var tagUL_todo = getEle('todo');
    var tagUL_completed = getEle('completed');
    var content = '';
    arr.forEach(function (item) {
        content += `
        <li>
            <span>${item.name}</span> 
            <div>
                <button><i class="fa fa-trash-alt" id="delete_icon" onclick="DeleteTask(${item.id})"></i></button> 
                <button><i class="fa fa-check-circle" id="todo_icon" onclick="ChangeStatus(${item.id})"></i></button>
            </div>
        </li>         
        `
        if(item.status == 'todo'){
            tagUL_todo.innerHTML = content;
        }else if(item.status == 'completed'){
            tagUL_completed.innerHTML = content;
        }
    });
    tagUL_todo.innerHTML = content;
}
// function renderTaskList() {
//     todoService.getListTask().then(function (e) {
//         var t = "", n = "";
//         getEle("todo").innerHTML = "",
//             getEle("completed").innerHTML = "",
//             e.data && e.data.length > 0 && e.data.forEach(function (e) {
//                 "todo" === e.status ? (t += renderListLiHtml(e), getEle("todo").innerHTML = t) : "completed" === e.status && (n += renderListLiHtml(e), getEle("completed").innerHTML = n)
//             }
//             )
//     }).catch(function (e) { console.log(e) })
// } 
function AddTask(arr) {
  CreateTable(arr);
}

function DeleteTask(id) {
    // console.log(id);
    listTask.deleteTask(id);
    CreateTable(listTask.arr);

}
function ChangeStatus(id) {
    var task = listTask.getTaskById(id);;
    // console.log(task);
    task.status = task.status === 'todo' ? "completed" : "todo"
    listTask.updateTask(task);
    console.log('Change Status Success!');
    CreateTable(listTask.arr)
}
function getEle(id) {
    return document.getElementById(id);
}
// function setLocalStorage() {
//     localStorage.setItem('DSTask', JSON.stringify(listTask.arr)); //stringify chuyển value thành chuỗi
// }
// function getLocalStorage() {
//     if (localStorage.getItem('DSTask')) {
//         listTask.arr = JSON.parse(localStorage.getItem('DSTask'));
//          taoBang(listTask.arr);
//     }


// function changeStatus(e) {
//     todoService.getTaskById(e).then(function (e) {
//         var t = e.data; 
//         return t.status = "todo" === t.status ? "completed" : "todo", todoService.updateTask(t) }).then(function () 
//         { alert("Change Status Success!"), renderTaskList() 
//         }) }

// var todoService = new TodoService;

//  function renderListLiHtml(e) { 
//     return `<li>\n    <span>${e.textTask}</span>\n    
//     <div class="buttons">\n      
//     <button\n        class="remove"\n        onclick="deleteToDo(${e.id})"\n      >\n        <i class="fa fa-trash-alt"></i>\n      </button>\n      
//     <button\n        class="complete"\n        onclick="changeStatus(${e.id})"\n      >\n        <i class="far fa-check-circle"></i>\n        <i class="fas fa-check-circle"></i>\n      </button>\n    </div>\n  </li>` }

// function deleteToDo(e) { todoService.deleteTask(e).then(function () { alert("Delete Success!"), renderTaskList() }).catch(function (e) { console.log(e) }) } 


// function getEle(e) { return document.getElementById(e) } renderTaskList(), getEle("addItem").addEventListener("click", function () { var e = getEle("newTask").value; if ("" !== e) { var t = new Task(e, "todo"); todoService.addTask(t).then(function () { alert("Add Success!"), renderTaskList(), getEle("newTask").value = "" }).catch(function (e) { console.log(e) }) } else alert("Task empty!") });