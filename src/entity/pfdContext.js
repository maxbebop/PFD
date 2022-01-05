class PFDContext{
    constructor(width = 0, hight = 0, imgSource = '', context = null){
        this.width = width;
        this.hight = hight;
        this.imgSource = imgSource;
        this.img = new Image();
        this.img.src = this.imgSource;
        this.context = context;
    }
}

export default PFDContext;