class PFDContextService{

    initDraw(fdCtx){        
        fdCtx.context.drawImage(fdCtx.img,0,0, fdCtx.width,fdCtx.hight);
    }
    rotate(pfdContext, angle){
        let ctx = pfdContext.context;
        let width = pfdContext.width;
        let hight = pfdContext.hight;
        let img = pfdContext.img;

        ctx.save();
        ctx.clearRect(0,0,width,hight);
        this.rotateContext(ctx, width, hight, angle);
        ctx.drawImage(img,0,0, width,hight);
      
        ctx.restore();
    }

    rotateContext(ctx, width, hight, angle){
        ctx.translate(width/2, hight/2);
        ctx.rotate(this.convertToRadians(angle));
        ctx.translate(-1*width/2, -1*hight/2);
    }

    moveY(pfdContext, delta, angle){
        /*let ctx = pfdContext.context;
        let width = pfdContext.width;
        let hight = pfdContext.hight;
        let img = pfdContext.img;

        ctx.save();
        ctx.clearRect(0,0,width,hight);
        if(angle != undefined){
            this.rotateContext(ctx, width, hight, angle);
        }
        ctx.translate(0, delta);
        ctx.drawImage(img,0,0, width,hight);
        
        ctx.restore();*/
        this.move(pfdContext, 0, delta, angle);
    }

    moveX(pfdContext, delta, angle){
        /*let ctx = pfdContext.context;
        let width = pfdContext.width;
        let hight = pfdContext.hight;
        let img = pfdContext.img;

        ctx.save();
        ctx.clearRect(0,0,width,hight);
        if(angle != undefined){
            this.rotateContext(ctx, width, hight, angle);
        }
        ctx.translate(delta, 0);
        ctx.drawImage(img,0,0, width,hight);
        ctx.restore();*/
        this.move(pfdContext, delta, 0, angle);
    }

    move(pfdContext, xDelta, yDelta, angle){
        let ctx = pfdContext.context;
        let width = pfdContext.width;
        let hight = pfdContext.hight;
        let img = pfdContext.img;

        ctx.save();
        ctx.clearRect(0,0,width,hight);
        if(angle != undefined){
            this.rotateContext(ctx, width, hight, angle);
        }
        ctx.translate(xDelta, yDelta);
        ctx.drawImage(img,0,0, width,hight);
        ctx.restore();
    }

    convertToRadians(degree) {
        return degree*(Math.PI/180);
    }
}

export default PFDContextService;
