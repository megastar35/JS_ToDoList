function Task(_name, _status) {
    this.id = Math.floor(Math.random() * 1000) ;
    this.name = _name;
    this.status = _status;
}