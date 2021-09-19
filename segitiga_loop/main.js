function main() {
   /**
   * @type {HTMLCanvasElement} canvas
   */
   const canvas = document.getElementById('myCanvas');

  /**
   * @type {WebGLRenderingContext} gl
   */
   const context = canvas.getContext('webgl');

    var vertices = [
        -0.5,0.5,
        -0.5,-0.5,
        0.5,-0.5,
        -0.5,0.5,];
    var posBuff = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, posBuff);
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertices),context.STATIC_DRAW);
    context.bindBuffer(context.ARRAY_BUFFER, null);

    var vertexShaderCode = document.getElementById('vertexShaderCode').textContent;

    var shader = context.createShader(context.VERTEX_SHADER);
    context.shaderSource(shader,vertexShaderCode);
    context.compileShader(shader);

    var fragment = document.getElementById('fragmentShaderCode').textContent;

    var fragshader = context.createShader(context.FRAGMENT_SHADER);
    context.shaderSource(fragshader,fragment);
    context.compileShader(fragshader);

    var prog = context.createProgram();
    context.attachShader(prog, shader);
    context.attachShader(prog, fragshader);
    context.linkProgram(prog);
    context.useProgram(prog);

    context.bindBuffer(context.ARRAY_BUFFER, posBuff);
    var aPosition = context.getAttribLocation(prog,"a_position");
    context.vertexAttribPointer(aPosition,2,context.FLOAT,false,0,0);
    context.enableVertexAttribArray(aPosition)

    context.clearColor(1.0, 1.0, 1.0, 1.0);
    context.clear(context.COLOR_BUFFER_BIT);

    context.drawArrays(context.LINE_STRIP,0,4);
}