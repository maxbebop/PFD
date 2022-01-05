import PFD from './entity/pfd';
import PFDContext from './entity/pfdContext';
import PFDView from './view/pfdView';
import PFDController from './controller/pfdController';
import PFDService from './service/pfdService';
import PFDContextService from './service/pfdContextService';

const pfdCourseContext = new PFDContext(150,150, '/public/css/course.png');
const pfdAttitudeIndicatorContext = new PFDContext(150,150, '/public/css/course.png');
const pfd = new PFD(0,0,0, pfdCourseContext, pfdAttitudeIndicatorContext);
const pfdView = new PFDView();
const pfdService = new PFDService();
const pfdContextService = new PFDContextService();
const pfdController = new PFDController(pfd, pfdView, pfdService, pfdContextService);

var img = new Image();   // Создаёт новое изображение
var keys = new Array();
var angle = 0;

function doKeyDown(evt){
    keys[evt.keyCode] = true;
}

function doKeyUp(evt){
    keys[evt.keyCode] = false;
}

function convertToRadians(degree) {
    return degree*(Math.PI/180);
}

function incrementAngle() {
    angle += 1;
    if(angle > 360) {
        angle -= 360;
    }
}

function decrementAngle(){
    angle -= 1;
    if(angle < 0){
        angle += 360;
    }
}

function init(){
  //  img.src = '/public/css/course.png'; // Устанавливает источник файла
  //  window.requestAnimationFrame(draw);

  //  window.addEventListener('keydown',doKeyDown,true);
  //  window.addEventListener('keyup',doKeyUp,true);
}
function draw(){
    if(37 in keys && keys[37]){
        decrementAngle();
        //console.log("lewo");
    };
    
    if (39 in keys && keys[39]){ //right
        //x += dx/5;
        //rotacja w prawo
        incrementAngle();
        //console.log("prawo");
    };

    var canvas = document.getElementById('canvas-course');
    if (canvas.getContext){
      var ctx = canvas.getContext('2d');
      var time = new Date();
      ctx.save();
      ctx.clearRect(0,0,150,150);
        /*img.addEventListener("load", function() {
            ctx.drawImage(img,0,0, 150,150);
        }, false);
        */

        ctx.translate(75, 75);
        //ctx.rotate( ( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() ) * -1);
        ctx.rotate(convertToRadians(angle));
        ctx.translate(-75, -75);
        ctx.drawImage(img,0,0, 150,150);

        ctx.restore();
       /* ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (10, 10, 55, 50);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (30, 30, 55, 50);*/
        window.requestAnimationFrame(draw);
    }
  }


  //window.onload = draw;
  //init();

  