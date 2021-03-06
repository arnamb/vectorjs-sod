"use strict";
/**
* @ignore true
*/
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../index.js");
function main(id) {
    // Initialize the interactive
    // let margin = 32;
    let interactive = new index_js_1.Interactive(id);
    interactive.border = false;
    interactive.width = 350;
    interactive.height = 350;
    interactive.originX = interactive.width / 2;
    interactive.originY = interactive.height / 2;
    interactive.style.overflow = 'visible';
    // Create three control points
    let point = interactive.control(0, 0);
    let radius = 45;
    let n = 3;
    let border = interactive.circle(0, 0, n * radius);
    border.style.fill = 'none';
    border.style.stroke = '#333333';
    // Create a path
    let path = interactive.path('');
    path.addDependency(point);
    path.style.fill = 'rgb(236,236,236)';
    path.style.stroke = '#333333';
    path.update = function () {
        let flag = (point.y > 0) ? 1 : 0;
        let angle = getAngle();
        let r = 45;
        path.d = `M 0 0
              L ${r} 0
              A ${r} ${r} 0 ${flag} 0 ${r * Math.cos(angle)} ${-r * Math.sin(angle)}
              z`;
    };
    path.update();
    point.constrainTo(border);
    let group = interactive.group();
    group.style.strokeOpacity = '.2';
    group.root.setAttribute('vector-effect', 'non-scaling-stroke');
    for (let i = 0; i <= n; i++) {
        let circle = group.circle(0, 0, i * radius);
        circle.style.fill = 'none';
        circle.style.stroke = '#333333';
    }
    for (let i = 0; i <= 2 * Math.PI; i++) {
        let x = border.r * Math.cos(i);
        let y = border.r * Math.sin(i);
        group.line(0, 0, x, -y);
        let label = group.text(x + 20 * Math.cos(i), -y - 20 * Math.sin(i), i.toString());
        label.style.alignmentBaseline = 'middle';
        label.style.textAnchor = 'middle';
    }
    point.translate(3 * radius * Math.cos(2), -3 * radius * Math.sin(2));
    let radiusLine = interactive.line(0, 0, 0, 0);
    radiusLine.style.stroke = 'cornflowerblue';
    radiusLine.addDependency(point);
    radiusLine.update = function () {
        this.x2 = point.x;
        this.y2 = point.y;
    };
    radiusLine.update();
    interactive.circle(0, 0, 3).style.fill = '#404040';
    let textGroup = interactive.group();
    let rectangle = textGroup.rectangle(0, 0, 64, 30);
    rectangle.style.fill = '#f8f8f8';
    rectangle.style.borderRadius = '6px';
    rectangle.style.stroke = '#333333';
    rectangle.style.strokeWidth = '1px';
    let text = textGroup.text(18, 20, "myText");
    textGroup.addDependency(point);
    textGroup.update = function () {
        let x = point.x;
        let y = point.y - 30;
        textGroup.setAttribute('transform', `translate(${x},${y})`);
        text.contents = `${getAngle().toFixed(2)}`;
    };
    textGroup.update();
    // Gets the normalized angle between zero and tau. TODO: Maybe transform the
    // coordinate system so that the positive y-direction is up instead of down.
    // UPDATE: transform = 'scale(1,-1)' applied to the main svg  didn't quite work
    // as expected: the text element was upside down, but maybe that could be
    // reversed? bleh.
    function getAngle() {
        if (point.y <= 0) {
            return Math.abs(Math.atan2(point.y, point.x));
        }
        else {
            return Math.PI * 2 - Math.atan2(point.y, point.x);
        }
    }
}
exports.default = main;
//# sourceMappingURL=radians.js.map