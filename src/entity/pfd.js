import EventEmitter from '../helper/eventEmitter';

class PFD extends EventEmitter {
    constructor(roll=0, pitch=0, course=0, courseContext = null, attitudeIndicatorCanvas = null){
        super();
        this.roll = roll;
        this.pitch = pitch;
        this.course = course;

        this.courseContext = courseContext; 
        this.attitudeIndicatorCanvas = attitudeIndicatorCanvas;
    }

    /*updateRoll(delta){
        if (this.roll>= -180 && this.roll <= 180){
            this.roll += delta;    

            //this.emit('change', this);
        }
    }

    updatePitch(delta){
        if (this.pitch>= -180 && this.pitch <= 180){
            this.pitch += delta;  
            //this.emit('change', this);  
        }
    }

    updateCourse(delta){
        let newCourse = this.course + delta;
        if (newCourse > 360){
            newCourse = newCourse - 360;    
        } else if (newCourse < 0){
            newCourse = 360 + newCourse;
        }

        this.course = newCourse;
        //this.emit('change', this);
    }*/
}

export default PFD;