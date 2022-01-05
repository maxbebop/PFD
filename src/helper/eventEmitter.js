class EventEmitter{
    constructor(){
        this.eventList = {};
    }

    on(type, callback) {
        this.eventList[type] = this.eventList[type] || [];
        this.eventList[type].push(callback);
    }

    emit(type, arg){
        if (this.eventList[type]){
            this.eventList[type].forEach(callback => callback(arg));
        }
    }
}

export default EventEmitter;