function Validation() {

    this.kiemTraRong = function(input, divId, mess){
        if(input === ""){
            getEle(divId).style.display = "block";
            getEle(divId).innerHTML = mess;
            return false;
        }else{
            getEle(divId).style.display='none';
            getEle(divId).innerHTML = '';
            return true;
        }
    };
    this.kiemTraTrungTask = function(input, divId, mess, arrList) {

        var status = false;
        arrList.forEach(function(item) {
            if(item.name === input){
                status = true;
            }
        });

        if(status){
            getEle(divId).style.display='block';
            getEle(divId).innerHTML = mess;
            return false;
        }
            getEle(divId).style.display='none';
            getEle(divId).innerHTML = '';
            return true;
        } ;
}