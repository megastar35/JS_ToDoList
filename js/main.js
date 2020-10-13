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
            tagUL_completed.innerHTML = '';
        }else if(item.status == 'completed'){
            tagUL_todo.innerHTML = '';
            tagUL_completed.innerHTML = content;
        }
    });
    // tagUL_todo.innerHTML = content;
}

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


