
class PFDController{
    constructor(pfd, pfdView, pfdService, pfdContextService){
        this.pfd = pfd;
        this.pfdView = pfdView;
        this.pfdService = pfdService;
        this.pfdContextService = pfdContextService;
        this.keyMap = new Array();
        this.courseCanvas = document.getElementById('canvas-course');
        this.attitudeIndicatorCanvas = document.getElementById('canvas-attitude-indicator');
        //canvas-attitude-indicator

        pfdView.on('keyUp', this.keyUp.bind(this));
        pfdView.on('keyDown', this.keyDown.bind(this));

        this.initContext();

        this.fpsInterval=1000/60;
        this.then = new Date();
        this.keyMap['init'] = true;
       
    }

    initContext(){
        if (this.courseCanvas.getContext){
            this.pfd.courseContext.context = this.courseCanvas.getContext('2d');
        }
        if (this.attitudeIndicatorCanvas.getContext){
            this.pfd.attitudeIndicatorCanvas.context = this.attitudeIndicatorCanvas.getContext('2d');
        }
    }

    keyUp(code){
        this.keyMap[code] = false;
        this.draw();
    }

    keyDown(code){
        if (!this.keyMap[code]){
            this.then = new Date();
        }
        this.keyMap[code] = true;        
        //this.draw();
        window.requestAnimationFrame(this.draw.bind(this));  
    }

    changeCourse(direction){
       this.pfdService.updateCourse(this.pfd, direction);
       this.pfdContextService.rotate(this.pfd.courseContext, this.pfd.course);
    }

    changeRoll(direction){
        this.pfdService.updateRoll(this.pfd, direction);
        this.pfdContextService.moveY(this.pfd.attitudeIndicatorCanvas, this.pfd.roll, this.pfd.pitch);
     }

     changePitch(direction){
        this.pfdService.updatePitch(this.pfd, direction);
        this.pfdContextService.moveY(this.pfd.attitudeIndicatorCanvas, this.pfd.roll, this.pfd.pitch);
     }

    initPFD(){
        this.pfdContextService.initDraw(this.pfd.courseContext);
        this.pfdContextService.initDraw(this.pfd.attitudeIndicatorCanvas);
    }

    draw(){
        let isAnimationEnable = false;
        if (this.keyMap[79]){
            this.changeCourse(-1);
            isAnimationEnable = true;
        } else if (this.keyMap[80]){
            this.changeCourse(1);
            isAnimationEnable = true;
        } else if (this.keyMap[38]){
            this.changeRoll(-1);
            isAnimationEnable = true;
        } else if (this.keyMap[40]){
            this.changeRoll(1);
            isAnimationEnable = true;
        } else if (this.keyMap[39]){
            this.changePitch(1);
            isAnimationEnable = true;
        }else if (this.keyMap[37]){
            this.changePitch(-1);
            isAnimationEnable = true;
        }else if (this.keyMap['init'])
        {
            this.keyMap['init'] = false;
            this.initPFD();
        }

        if(isAnimationEnable){            
            let now = new Date();
            let delta = now - this.then;
            console.log('delta: ' + delta);
            if (delta > this.fpsInterval) {
                this.then = now - (delta % this.fpsInterval);
                window.requestAnimationFrame(this.draw.bind(this));    
            }
        }
    }
}

export default PFDController;