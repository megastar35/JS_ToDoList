function TaskList() {
    this.arr =[];

    this.timViTri = function(id){
        return this.arr.findIndex(function(item){
            console.log(item.id);
            return item.id === id;
        });
    }
    this.addTask = function(task) {
        this.arr.push(task);
    }
    this.deleteTask = function(id){
        var index = this.timViTri(id);
        if(index !== -1){
            this.arr.splice(index,1);
        }
        // console.log(id,index);
    }
    this.getTaskById = function(id){
        var task;
        this.arr.forEach(function(item){
            if(item.id === id){
                task = item;
            }
        });
        // console.log(task);
        return task;
    }
    this.updateTask = function(task){
        var item = this.getTaskById(task.id);
        if( item !== -1){
            this.arr[item] = task;
        }
        console.log(this.arr[item]);
        // return this.arr[index];
    }
}

