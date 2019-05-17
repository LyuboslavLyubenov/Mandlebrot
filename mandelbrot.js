/**
 * Utility for drawing pixel by pixel efficiently on canvas
 */
class CanvasDrawer {
    constructor(canvasId) {
        const canvas = document.getElementById(canvasId);
        this._canvasWidth = canvas.width;
        this._canvasHeight = canvas.height;
        this._context = canvas.getContext('2d');
        this._initBuffer(this._context, this._canvasWidth, this._canvasHeight);
    }

    _initBuffer(context, width, height) {
        this._canvasData = context.getImageData(0, 0, width, height);
    }

    /**
     * Draws pixel to buffer
     * @param x
     * @param y
     * @param r
     * @param g
     * @param b
     * @param a
     */
    drawPixel(x, y, r, g, b, a = 255) {
        const index = (x + y * this._canvasWidth) * 4;
        this._canvasData.data[index] = r;
        this._canvasData.data[index + 1] = g;
        this._canvasData.data[index + 2] = b;
        this._canvasData.data[index + 3] = a;
    }

    /**
     * Renders buffer
     */
    renderCanvas() {
        this._context.putImageData(this._canvasData, 0, 0);
    }

    /**
     * Clears canvas and buffer
     */
    clear() {
        this._context.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
        this._initBuffer(this._context, this._canvasWidth, this._canvasHeight);
    }

}

(function () {
    const canvasDrawer = new CanvasDrawer('canvas');
})();