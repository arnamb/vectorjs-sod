"use strict";
/**
* @title Cubic Bezier Curve
* @description This interactive demonstrates the cubic bezier command for a SVG path element. There are four control points that allow the user to control the shape of the bezier curve that is drawn.
* @tags [math]
*/
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../index.js");
let interactive = new index_js_1.Interactive(index_js_1.getScriptName());
interactive.border = true;
let l1 = interactive.line(0, 0, 0, 0);
let l2 = interactive.line(0, 0, 0, 0);
let l3 = interactive.line(0, 0, 0, 0);
l1.stroke = 'cornflowerblue';
l2.stroke = 'cornflowerblue';
l3.stroke = 'cornflowerblue';
let path = interactive.path('');
path.classList.add('default');
let c1 = interactive.control(150, 100);
let c2 = interactive.control(150, 200);
let c3 = interactive.control(450, 200);
let c4 = interactive.control(450, 100);
path.update = function () {
    path.d = `M ${c1.x} ${c1.y} C ${c2.x} ${c2.y} ${c3.x} ${c3.y} ${c4.x} ${c4.y}`;
};
path.update();
path.addDependency(c1);
path.addDependency(c2);
path.addDependency(c3);
path.addDependency(c4);
l1.update = function () {
    this.x1 = c1.x;
    this.y1 = c1.y;
    this.x2 = c2.x;
    this.y2 = c2.y;
};
l1.update();
l1.addDependency(c1);
l1.addDependency(c2);
l2.update = function () {
    this.x1 = c2.x;
    this.y1 = c2.y;
    this.x2 = c3.x;
    this.y2 = c3.y;
};
l2.update();
l2.addDependency(c2);
l2.addDependency(c3);
l3.update = function () {
    this.x1 = c3.x;
    this.y1 = c3.y;
    this.x2 = c4.x;
    this.y2 = c4.y;
};
l3.update();
l3.addDependency(c3);
l3.addDependency(c4);
//# sourceMappingURL=bezier-curve-cubic.js.map