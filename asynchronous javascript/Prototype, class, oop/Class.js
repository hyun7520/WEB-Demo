// function Color(r, g, b) {
//     this.r = r;
//     this.g = g;
//     this.b = b;

// }

// Color.prototype.rgb = function () {
//     const { r, g, b } = this;
//     return `rgb(${r}, ${g}, ${b})`;
// }

// Color.prototype.hex = function () {
//     const { r, g, b } = this;
//     return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
// }
// Color.prototype.rgba = function (a = 1.0) {
//     const { r, g, b } = this;
//     return `rgba(${r}, ${g}, ${b}, ${a})`;
// }



class Color {
    // function Color(r, g, b) {
    //     this.r = r;
    //     this.g = g;
    //     this.b = b;
    constructor(r, g, b, name) { // MUST be added
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
        this.calcHSL();
    }
    innerRGB() {
        const { r, g, b } = this;
        return `${r}, ${g}, ${b}`;
    }
    // Color.prototype.rgb = function () {
    //     const { r, g, b } = this;
    //     return `rgb(${r}, ${g}, ${b})`;
    // }
    rgb() { //Defining a method
        const name = this.name;
        return `rgb(${this.innerRGB()}), Color is ${name}`;
    }
    // Color.prototype.hex = function () {
    //     const { r, g, b } = this;
    //     return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    // }
    rgba(a = 1.0) {
        return `rgba(${this.innerRGB()}, ${a})`;
    }
    hex() {
        const { r, g, b } = this;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    hsl() {
        const { h, s, l } = this;
        return `hsl(${h}, ${s}%, ${l}%)`
    }
    fulllySaturated() {
        const { h, l } = this;
        return `hsl(${h},100%, ${l}%)`;
    }
    opposite() {
        const { h, s, l } = this;
        const newHue = (h + 180) % 360;
        return `hsl(${newHue},${s}%, ${l}%)`;
    }
    calcHSL() {
        let { r, g, b } = this;
        // can't use const as rgb is updating 
        // Make r, g, and b fractions of 1
        r /= 255;
        g /= 255;
        b /= 255;

        // Find greatest and smallest channel values
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
        if (delta == 0) h = 0;
        else if (cmax == r)
            // Red is max
            h = ((g - b) / delta) % 6;
        else if (cmax == g)
            // Green is max
            h = (b - r) / delta + 2;
        else
            // Blue is max
            h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        // Make negative hues positive behind 360°
        if (h < 0) h += 360;
        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
        this.h = h;
        this.s = s;
        this.l = l;
    }
}

const c1 = new Color(0, 0, 255, 'blue');
const c2 = new Color(255, 0, 0, 'green');

// document.body.style.backgroundColor = c1.rgba(1.0);


document.body.style.backgroundColor = c1.rgba(0.5);

// document.body.style.backgroundColor = c2.hsl()
