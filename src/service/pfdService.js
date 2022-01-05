class PFDService{
    constructor(){
        
    }

    updateRoll(pfd, delta){
        if ( pfd.roll >= 0){
            pfd.roll  = Math.min(180, pfd.roll + delta);  
        } else{
            pfd.roll  = Math.max(-180, pfd.roll + delta);  
        }
    }

    updatePitch(pfd,delta){
        if ( pfd.pitch >= 0){
            pfd.pitch  = Math.min(180, pfd.pitch + delta);  
        } else{
            pfd.pitch  = Math.max(-180, pfd.pitch + delta);  
        }
    }

    updateCourse(pfd,delta){
        let newCourse = pfd.course + delta;
        if (newCourse > 360){
            newCourse -= 360;    
        } else if (newCourse < 0){
            newCourse += 360;
        }

        pfd.course = newCourse;
        //this.emit('change', this);
    }
}

export default PFDService;