
var app={
  inicio: function(){
    DIAMETRO_BOLA = 10;
    // velocidad random
	velocidad = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
	anchoCuadrado = 200;
    
    alto  = document.documentElement.clientHeight;
    ancho = document.documentElement.clientWidth;

    app.iniciaJuego();
  },

  iniciaJuego: function(){

    function preload() {
      game.physics.startSystem(Phaser.Physics.BODY);

    }

    function create() {

		// pinto la bola
		bola = game.add.graphics(0,0);
		bola.beginFill(0xFFFFFF, 1);
		bola.drawCircle(ancho/2, 0, DIAMETRO_BOLA);

		// pinto el cuadrado
		cuadrado = game.add.graphics(0,0);
		cuadrado.beginFill(0xFFFFFF, 1);
		cuadrado.drawRect(ancho/2 - anchoCuadrado/2, bordeSupCuadrado, anchoCuadrado, anchoCuadrado);

		// pinto la linea que determina el borde (para el modo debug)
		linea = new Phaser.Line(0, bordeInfCuadrado, ancho, bordeInfCuadrado);

		// coloco textos en pantalla
    	scoreText = game.add.text(0,0, puntuacion, { fontSize: '25px', fill: '#00FF00',});
    	failText = game.add.text(0,0, failText, { fontSize: '50px', fill: '#FF0000',});
    	instruccionesText = game.add.text(0,0, 'Para detener la bola pulsa la pantalla', { fontSize: '15px', fill: '#00FF00',});
    	scoreText.anchor.set(0.5);
    	scoreText.x = Math.floor(0 + ancho / 2);
    	failText.anchor.set(0.5);
    	failText.x = Math.floor(0 + ancho / 2);
    	failText.y = Math.floor(0 + alto / 2);
    	instruccionesText.anchor.set(0.5);
    	instruccionesText.x = Math.floor(0 + ancho / 2);
    	instruccionesText.y = Math.floor(alto - 10);


		game.physics.arcade.enable(bola);

		bola.body.collideWorldBounds = true;
		bola.body.onWorldBounds = new Phaser.Signal();
		bola.body.onWorldBounds.add(app.resetGame, this);
		
		game.input.onTap.add(onTap, this);
    }

    function onTap(pointer, doubleTap) {
	    game.paused = true;
	    cuadrado.alpha = 0.3;

		if ((posBolaInf <= bordeInfCuadrado) && (posBolaSup >= bordeSupCuadrado)){
	    	puntuacion = (bordeInfCuadrado - posBolaInf);
	    	// posiciono la puntuacion sobre la bola
	    	scoreText.y = posBolaSup - 15;
	    	scoreText.text =  puntuacion;  	
	    }else {
	    	failText.text = 'Fail!';
	    }

	    if (doubleTap){
	    	app.resetGame();
	    }
	    
	}

    function update(){

    	if (game.paused != true){
			bola.y = bola.y + velocidad;
			posBolaInf = bola.y + DIAMETRO_BOLA/2;
    		posBolaSup = bola.y - DIAMETRO_BOLA/2;
		}else{
			game.paused = true;
			cuadrado.alpha = 0.2;
		}
    }
	
	// modo para debuggear
    function render() {
	    //game.debug.geom(linea);
	}
	
    var estados = { preload: preload, create: create, update: update , render:render};
    var game = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'phaser',estados);
	var bola;
	var cuadrado;
	var puntuacion;
	var failText;
	var instruccionesText;
	var posBolaSup, posBolaInf;
	var bordeInfCuadrado = alto/2 + anchoCuadrado/2;
	var bordeSupCuadrado = alto/2 - anchoCuadrado/2;
  },
  
  resetGame: function(){
	document.location.reload(true);
  }

};

if ('addEventListener' in document) {
    document.addEventListener('deviceready', function() {
        app.inicio();
    }, false);
}