var validation = new Validation();
// var listTask = new TaskList();
var listTask_todo = new TaskList();
var listTask_completed = new TaskList();

getLocalStorage();
getEle('addItem').addEventListener('click', function () {

    var layTask_Name = getEle('newTask').value;
    var layTask_Status = 'todo';
    // console.log(layTask_Input);
    var isValid = true;
    isValid &= validation.kiemTraRong(layTask_Name, 'notiInput', '(*) Vui lòng nhập thông tin') && validation.kiemTraTrungTask(layTask_Name, 'notiInput', '(*) Đã có task trùng tên', listTask_todo.arr);

    var task = new Task(layTask_Name, layTask_Status);

    if (!isValid) return;
    console.log('thêm Thành công');

    listTask_todo.addTask(task);
    console.log(listTask_todo.arr);
    AddTask(listTask_todo.arr);
    // listTask.timViTri(task.id);
    setLocalStorage();
})

function CreateTable(task){
    // var tagUL_todo = getEle('todo');
    // var tagUL_completed = getEle('completed');
    return `<li>
            <span>${task.name}</span> 
            <div>
                <button><i class="fa fa-trash-alt" id="delete_icon" onclick="DeleteTask(${task.id})"></i></button> 
                <button><i class="fa fa-check-circle" id="todo_icon" onclick="ChangeStatus(${task.id})"></i></button>
            </div>
        </li>`
        // if(item.status == 'todo'){
        //     tagUL_todo.innerHTML = content;
        //     tagUL_completed.innerHTML = '';
        // }else if(item.status == 'completed'){
        //     tagUL_todo.innerHTML = '';
        //     tagUL_completed.innerHTML = content;
        // 
    };

function AddTask() {
    var tagUL_todo = getEle('todo');
    tagUL_todo.innerHTML ='';
    var tagUL_completed = getEle('completed');
    tagUL_completed.innerHTML ='';
    listTask_todo.arr.forEach(function(item) {
        tagUL_todo.innerHTML += CreateTable(item);
    });
    listTask_completed.arr.forEach(function(item) {
        tagUL_completed.innerHTML += CreateTable(item);
    })
    setLocalStorage();
}
function DeleteTask(id) {
    // console.log(id);
    listTask_todo.deleteTask(id);
    listTask_completed.deleteTask(id);
    AddTask();
    setLocalStorage();
}
function ChangeStatus(id) {
    /**
     * 1. Lấy task trong mảng todo thêm vào mảng complete (ngược lại)
     * 2. Xóa task ở ul todo và thêm vào ở ul completed (ngược lại)
     */
    var task_todo = listTask_todo.getTaskById(id);
    var task_completed = listTask_completed.getTaskById(id);
 
    // // console.log(task);
    if( listTask_todo.arr.length > 0 && task_todo.status === 'todo'){
        task_todo.status = task_todo.status === 'todo'? "completed" : "todo"
        //Cách 2 mảng
        listTask_completed.addTask(task_todo);
        listTask_todo.deleteTask(task_todo.id);
        AddTask();
        // console.log(listTask_todo.arr);
        // console.log(listTask_completed.arr);

    }else if(listTask_completed.arr.length > 0 && task_completed.status === 'completed'){
        task_completed.status =  task_completed.status === 'completed'?  "todo" : "completed"
        //Cách 2 mảng
        listTask_todo.addTask(task_completed);
        listTask_completed.deleteTask(task_completed.id);
        AddTask();
        
    }

    //Cách cũ
    // listTask.updateTask(task);
    

    // console.log('Change Status Success!');
}
function getEle(id) {
    return document.getElementById(id);
}
function setLocalStorage() {
    localStorage.setItem('DSTask_TODO', JSON.stringify(listTask_todo.arr)); //stringify chuyển value thành chuỗi
    localStorage.setItem('DSTask_DONE', JSON.stringify(listTask_completed.arr));
}
function getLocalStorage() {
    if (localStorage.getItem('DSTask')) {
        listTask_todo.arr = JSON.parse(localStorage.getItem('DSTask_TODO'));
        listTask_completed.arr = JSON.parse(localStorage.getItem('DSTask_DONE'));
         AddTask();
    }
}