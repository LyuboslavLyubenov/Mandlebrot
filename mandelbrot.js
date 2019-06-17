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
     * Clears buffer
     */
    clearBuffer() {
        this._initBuffer(this._context, this._canvasWidth, this._canvasHeight);
        this._context.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
    }
}

(function () {
    function drawMarbelSet(canvasDrawer, width, height, max_iterations) {
        canvasDrawer.clearBuffer();

        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                let c_re = (col - width/2.0)*4.0/width;
                let c_im = (row - height/2.0)*4.0/width;
                let x = 0, y = 0;
                let iteration = 0;
                while (x*x+y*y <= 4 && iteration < max_iterations) {
                    let x_new = x*x - y*y + c_re;
                    y = 2*x*y + c_im;
                    x = x_new;
                    iteration++;
                }

                const color = (iteration / max_iterations) * 255;
                canvasDrawer.drawPixel(col, row, color, 0, 0)
            }
        }
        canvasDrawer.renderCanvas();
    }

    const canvasDrawer = new CanvasDrawer('canvas');
    const max_iterations = 10;
    const width = 800;
    const height = 400;

    drawMarbelSet(canvasDrawer, width, height, max_iterations);

})();