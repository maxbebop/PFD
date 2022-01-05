/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller/pfdController.js":
/*!*****************************************!*\
  !*** ./src/controller/pfdController.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\nclass PFDController{\n    constructor(pfd, pfdView, pfdService, pfdContextService){\n        this.pfd = pfd;\n        this.pfdView = pfdView;\n        this.pfdService = pfdService;\n        this.pfdContextService = pfdContextService;\n        this.keyMap = new Array();\n        this.courseCanvas = document.getElementById('canvas-course');\n        this.attitudeIndicatorCanvas = document.getElementById('canvas-attitude-indicator');\n        //canvas-attitude-indicator\n\n        pfdView.on('keyUp', this.keyUp.bind(this));\n        pfdView.on('keyDown', this.keyDown.bind(this));\n\n        this.initContext();\n\n        this.fpsInterval=1000/60;\n        this.then = new Date();\n        this.keyMap['init'] = true;\n       \n    }\n\n    initContext(){\n        if (this.courseCanvas.getContext){\n            this.pfd.courseContext.context = this.courseCanvas.getContext('2d');\n        }\n        if (this.attitudeIndicatorCanvas.getContext){\n            this.pfd.attitudeIndicatorCanvas.context = this.attitudeIndicatorCanvas.getContext('2d');\n        }\n    }\n\n    keyUp(code){\n        this.keyMap[code] = false;\n        this.draw();\n    }\n\n    keyDown(code){\n        if (!this.keyMap[code]){\n            this.then = new Date();\n        }\n        this.keyMap[code] = true;        \n        //this.draw();\n        window.requestAnimationFrame(this.draw.bind(this));  \n    }\n\n    changeCourse(direction){\n       this.pfdService.updateCourse(this.pfd, direction);\n       this.pfdContextService.rotate(this.pfd.courseContext, this.pfd.course);\n    }\n\n    changeRoll(direction){\n        this.pfdService.updateRoll(this.pfd, direction);\n        this.pfdContextService.moveY(this.pfd.attitudeIndicatorCanvas, this.pfd.roll, this.pfd.pitch);\n     }\n\n     changePitch(direction){\n        this.pfdService.updatePitch(this.pfd, direction);\n        this.pfdContextService.moveY(this.pfd.attitudeIndicatorCanvas, this.pfd.roll, this.pfd.pitch);\n     }\n\n    initPFD(){\n        this.pfdContextService.initDraw(this.pfd.courseContext);\n        this.pfdContextService.initDraw(this.pfd.attitudeIndicatorCanvas);\n    }\n\n    draw(){\n        let isAnimationEnable = false;\n        if (this.keyMap[79]){\n            this.changeCourse(-1);\n            isAnimationEnable = true;\n        } else if (this.keyMap[80]){\n            this.changeCourse(1);\n            isAnimationEnable = true;\n        } else if (this.keyMap[38]){\n            this.changeRoll(-1);\n            isAnimationEnable = true;\n        } else if (this.keyMap[40]){\n            this.changeRoll(1);\n            isAnimationEnable = true;\n        } else if (this.keyMap[39]){\n            this.changePitch(1);\n            isAnimationEnable = true;\n        }else if (this.keyMap[37]){\n            this.changePitch(-1);\n            isAnimationEnable = true;\n        }else if (this.keyMap['init'])\n        {\n            this.keyMap['init'] = false;\n            this.initPFD();\n        }\n\n        if(isAnimationEnable){            \n            let now = new Date();\n            let delta = now - this.then;\n            console.log('delta: ' + delta);\n            if (delta > this.fpsInterval) {\n                this.then = now - (delta % this.fpsInterval);\n                window.requestAnimationFrame(this.draw.bind(this));    \n            }\n        }\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PFDController);\n\n//# sourceURL=webpack://pfd/./src/controller/pfdController.js?");

/***/ }),

/***/ "./src/entity/pfd.js":
/*!***************************!*\
  !*** ./src/entity/pfd.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _helper_eventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/eventEmitter */ \"./src/helper/eventEmitter.js\");\n\n\nclass PFD extends _helper_eventEmitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(roll=0, pitch=0, course=0, courseContext = null, attitudeIndicatorCanvas = null){\n        super();\n        this.roll = roll;\n        this.pitch = pitch;\n        this.course = course;\n\n        this.courseContext = courseContext; \n        this.attitudeIndicatorCanvas = attitudeIndicatorCanvas;\n    }\n\n    /*updateRoll(delta){\n        if (this.roll>= -180 && this.roll <= 180){\n            this.roll += delta;    \n\n            //this.emit('change', this);\n        }\n    }\n\n    updatePitch(delta){\n        if (this.pitch>= -180 && this.pitch <= 180){\n            this.pitch += delta;  \n            //this.emit('change', this);  \n        }\n    }\n\n    updateCourse(delta){\n        let newCourse = this.course + delta;\n        if (newCourse > 360){\n            newCourse = newCourse - 360;    \n        } else if (newCourse < 0){\n            newCourse = 360 + newCourse;\n        }\n\n        this.course = newCourse;\n        //this.emit('change', this);\n    }*/\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PFD);\n\n//# sourceURL=webpack://pfd/./src/entity/pfd.js?");

/***/ }),

/***/ "./src/entity/pfdContext.js":
/*!**********************************!*\
  !*** ./src/entity/pfdContext.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass PFDContext{\n    constructor(width = 0, hight = 0, imgSource = '', context = null){\n        this.width = width;\n        this.hight = hight;\n        this.imgSource = imgSource;\n        this.img = new Image();\n        this.img.src = this.imgSource;\n        this.context = context;\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PFDContext);\n\n//# sourceURL=webpack://pfd/./src/entity/pfdContext.js?");

/***/ }),

/***/ "./src/helper/eventEmitter.js":
/*!************************************!*\
  !*** ./src/helper/eventEmitter.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass EventEmitter{\n    constructor(){\n        this.eventList = {};\n    }\n\n    on(type, callback) {\n        this.eventList[type] = this.eventList[type] || [];\n        this.eventList[type].push(callback);\n    }\n\n    emit(type, arg){\n        if (this.eventList[type]){\n            this.eventList[type].forEach(callback => callback(arg));\n        }\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventEmitter);\n\n//# sourceURL=webpack://pfd/./src/helper/eventEmitter.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _entity_pfd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity/pfd */ \"./src/entity/pfd.js\");\n/* harmony import */ var _entity_pfdContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entity/pfdContext */ \"./src/entity/pfdContext.js\");\n/* harmony import */ var _view_pfdView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/pfdView */ \"./src/view/pfdView.js\");\n/* harmony import */ var _controller_pfdController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controller/pfdController */ \"./src/controller/pfdController.js\");\n/* harmony import */ var _service_pfdService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./service/pfdService */ \"./src/service/pfdService.js\");\n/* harmony import */ var _service_pfdContextService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./service/pfdContextService */ \"./src/service/pfdContextService.js\");\n\n\n\n\n\n\n\nconst pfdCourseContext = new _entity_pfdContext__WEBPACK_IMPORTED_MODULE_1__[\"default\"](150,150, '/public/css/course.png');\nconst pfdAttitudeIndicatorContext = new _entity_pfdContext__WEBPACK_IMPORTED_MODULE_1__[\"default\"](150,150, '/public/css/course.png');\nconst pfd = new _entity_pfd__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0,0,0, pfdCourseContext, pfdAttitudeIndicatorContext);\nconst pfdView = new _view_pfdView__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\nconst pfdService = new _service_pfdService__WEBPACK_IMPORTED_MODULE_4__[\"default\"]();\nconst pfdContextService = new _service_pfdContextService__WEBPACK_IMPORTED_MODULE_5__[\"default\"]();\nconst pfdController = new _controller_pfdController__WEBPACK_IMPORTED_MODULE_3__[\"default\"](pfd, pfdView, pfdService, pfdContextService);\n\nvar img = new Image();   // Создаёт новое изображение\nvar keys = new Array();\nvar angle = 0;\n\nfunction doKeyDown(evt){\n    keys[evt.keyCode] = true;\n}\n\nfunction doKeyUp(evt){\n    keys[evt.keyCode] = false;\n}\n\nfunction convertToRadians(degree) {\n    return degree*(Math.PI/180);\n}\n\nfunction incrementAngle() {\n    angle += 1;\n    if(angle > 360) {\n        angle -= 360;\n    }\n}\n\nfunction decrementAngle(){\n    angle -= 1;\n    if(angle < 0){\n        angle += 360;\n    }\n}\n\nfunction init(){\n  //  img.src = '/public/css/course.png'; // Устанавливает источник файла\n  //  window.requestAnimationFrame(draw);\n\n  //  window.addEventListener('keydown',doKeyDown,true);\n  //  window.addEventListener('keyup',doKeyUp,true);\n}\nfunction draw(){\n    if(37 in keys && keys[37]){\n        decrementAngle();\n        //console.log(\"lewo\");\n    };\n    \n    if (39 in keys && keys[39]){ //right\n        //x += dx/5;\n        //rotacja w prawo\n        incrementAngle();\n        //console.log(\"prawo\");\n    };\n\n    var canvas = document.getElementById('canvas-course');\n    if (canvas.getContext){\n      var ctx = canvas.getContext('2d');\n      var time = new Date();\n      ctx.save();\n      ctx.clearRect(0,0,150,150);\n        /*img.addEventListener(\"load\", function() {\n            ctx.drawImage(img,0,0, 150,150);\n        }, false);\n        */\n\n        ctx.translate(75, 75);\n        //ctx.rotate( ( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() ) * -1);\n        ctx.rotate(convertToRadians(angle));\n        ctx.translate(-75, -75);\n        ctx.drawImage(img,0,0, 150,150);\n\n        ctx.restore();\n       /* ctx.fillStyle = \"rgb(200,0,0)\";\n        ctx.fillRect (10, 10, 55, 50);\n\n        ctx.fillStyle = \"rgba(0, 0, 200, 0.5)\";\n        ctx.fillRect (30, 30, 55, 50);*/\n        window.requestAnimationFrame(draw);\n    }\n  }\n\n\n  //window.onload = draw;\n  //init();\n\n  \n\n//# sourceURL=webpack://pfd/./src/index.js?");

/***/ }),

/***/ "./src/service/pfdContextService.js":
/*!******************************************!*\
  !*** ./src/service/pfdContextService.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass PFDContextService{\n\n    initDraw(fdCtx){        \n        fdCtx.context.drawImage(fdCtx.img,0,0, fdCtx.width,fdCtx.hight);\n    }\n    rotate(pfdContext, angle){\n        let ctx = pfdContext.context;\n        let width = pfdContext.width;\n        let hight = pfdContext.hight;\n        let img = pfdContext.img;\n\n        ctx.save();\n        ctx.clearRect(0,0,width,hight);\n        this.rotateContext(ctx, width, hight, angle);\n        ctx.drawImage(img,0,0, width,hight);\n      \n        ctx.restore();\n    }\n\n    rotateContext(ctx, width, hight, angle){\n        ctx.translate(width/2, hight/2);\n        ctx.rotate(this.convertToRadians(angle));\n        ctx.translate(-1*width/2, -1*hight/2);\n    }\n\n    moveY(pfdContext, delta, angle){\n        /*let ctx = pfdContext.context;\n        let width = pfdContext.width;\n        let hight = pfdContext.hight;\n        let img = pfdContext.img;\n\n        ctx.save();\n        ctx.clearRect(0,0,width,hight);\n        if(angle != undefined){\n            this.rotateContext(ctx, width, hight, angle);\n        }\n        ctx.translate(0, delta);\n        ctx.drawImage(img,0,0, width,hight);\n        \n        ctx.restore();*/\n        this.move(pfdContext, 0, delta, angle);\n    }\n\n    moveX(pfdContext, delta, angle){\n        /*let ctx = pfdContext.context;\n        let width = pfdContext.width;\n        let hight = pfdContext.hight;\n        let img = pfdContext.img;\n\n        ctx.save();\n        ctx.clearRect(0,0,width,hight);\n        if(angle != undefined){\n            this.rotateContext(ctx, width, hight, angle);\n        }\n        ctx.translate(delta, 0);\n        ctx.drawImage(img,0,0, width,hight);\n        ctx.restore();*/\n        this.move(pfdContext, delta, 0, angle);\n    }\n\n    move(pfdContext, xDelta, yDelta, angle){\n        let ctx = pfdContext.context;\n        let width = pfdContext.width;\n        let hight = pfdContext.hight;\n        let img = pfdContext.img;\n\n        ctx.save();\n        ctx.clearRect(0,0,width,hight);\n        if(angle != undefined){\n            this.rotateContext(ctx, width, hight, angle);\n        }\n        ctx.translate(xDelta, yDelta);\n        ctx.drawImage(img,0,0, width,hight);\n        ctx.restore();\n    }\n\n    convertToRadians(degree) {\n        return degree*(Math.PI/180);\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PFDContextService);\n\n\n//# sourceURL=webpack://pfd/./src/service/pfdContextService.js?");

/***/ }),

/***/ "./src/service/pfdService.js":
/*!***********************************!*\
  !*** ./src/service/pfdService.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass PFDService{\n    constructor(){\n        \n    }\n\n    updateRoll(pfd, delta){\n        if ( pfd.roll >= 0){\n            pfd.roll  = Math.min(180, pfd.roll + delta);  \n        } else{\n            pfd.roll  = Math.max(-180, pfd.roll + delta);  \n        }\n    }\n\n    updatePitch(pfd,delta){\n        if ( pfd.pitch >= 0){\n            pfd.pitch  = Math.min(180, pfd.pitch + delta);  \n        } else{\n            pfd.pitch  = Math.max(-180, pfd.pitch + delta);  \n        }\n    }\n\n    updateCourse(pfd,delta){\n        let newCourse = pfd.course + delta;\n        if (newCourse > 360){\n            newCourse -= 360;    \n        } else if (newCourse < 0){\n            newCourse += 360;\n        }\n\n        pfd.course = newCourse;\n        //this.emit('change', this);\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PFDService);\n\n//# sourceURL=webpack://pfd/./src/service/pfdService.js?");

/***/ }),

/***/ "./src/view/pfdView.js":
/*!*****************************!*\
  !*** ./src/view/pfdView.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _helper_eventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/eventEmitter */ \"./src/helper/eventEmitter.js\");\n\n\nclass PFDView extends _helper_eventEmitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(){\n        super();\n\n        this.course = document.getElementById('canvas-course');\n        window.addEventListener('keyup', this.handleKeyUp.bind(this));\n        window.addEventListener('keydown', this.handleKeyDown.bind(this));\n    }\n\n    handleKeyUp(event){\n        event.preventDefault();\n        console.log('keyUp: ' + event.keyCode);\n        this.emit('keyUp', event.keyCode);\n    }\n\n    handleKeyDown(event){\n        event.preventDefault();\n        console.log('keyDown: ' + event.keyCode);\n        this.emit('keyDown', event.keyCode);\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PFDView);\n\n//# sourceURL=webpack://pfd/./src/view/pfdView.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;