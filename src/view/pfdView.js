import EventEmitter from '../helper/eventEmitter';

class PFDView extends EventEmitter {
    constructor(){
        super();

        this.course = document.getElementById('canvas-course');
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    handleKeyUp(event){
        event.preventDefault();
        console.log('keyUp: ' + event.keyCode);
        this.emit('keyUp', event.keyCode);
    }

    handleKeyDown(event){
        event.preventDefault();
        console.log('keyDown: ' + event.keyCode);
        this.emit('keyDown', event.keyCode);
    }
}

export default PFDView;