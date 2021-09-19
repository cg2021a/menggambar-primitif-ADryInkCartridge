function main() {
   /**
   * @type {HTMLCanvasElement} canvas
   */
   const canvas = document.getElementById('myCanvas');

  /**
   * @type {WebGLRenderingContext} gl
   */
   const context = canvas.getContext('webgl');

   var vertexShaderCode = `
   void main(){
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
        gl_PointSize = 10.0;
   }`;

   var shader = context.createShader(context.VERTEX_SHADER);
   context.shaderSource(shader,vertexShaderCode);
   context.compileShader(shader);

   var fragment = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }`;

    var fragshader = context.createShader(context.FRAGMENT_SHADER);
    context.shaderSource(fragshader,fragment);
    context.compileShader(fragshader);

    var prog = context.createProgram();
    context.attachShader(prog, shader);
    context.attachShader(prog, fragshader);
    context.linkProgram(prog);
    context.useProgram(prog);

    context.clearColor(0.0, 0.0, 1.0, 1.0);
    context.clear(context.COLOR_BUFFER_BIT);

    context.drawArrays(context.POINTS,0,1);
}