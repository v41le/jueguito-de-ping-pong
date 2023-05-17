// JavaScript source code
/*creamo el objeto a continuacion lo vamos hacer dentro de una funcion anonima 
para que no infecte el scope del proyecto y se ejecute a si misma*/
(function () {
    self.Board = function (width,height) { /*board le vamos a llamar al pizarron recordar que esta function es como si estuvieramos declarando una clase a los cuales le damos como parametro de contructor ancho alto para posteriormente asignarlo a variables de la clase :*/
        this.width = width;
        this.height = height;  /*recordar que estas son variables del objeto y las estamos igualando a lo que pasa por parametro la persona o usuario*/
        this.playing = false;
        this.game_over = false; /*mas dos expresiones booleanas para si el juego se esta jugan o si perdio*/
        this.bars = [];
        this.ball = null;
        this.playing = false;
    }
    /*despues de haber declarado la clase vamos a modificar el prototipo de la clase para colocarlos los metodos de la misma */
    self.Board.prototype = { /*el siguiente objeto json nos permitira declarar diferentes funciones o metodos para el prototipo */
        get elements() {
            var elements = this.bars.map(function (bar) { return bar; }); /*estas son la barras laterales del juego y no la ponemos var elements = this.bars donde en lugar de pasarle a la variable elements una referencia al arreglo de las barras(linea10) lo copiamos del arreglo con map y retornamos cada uno de los elementos, buscando modificar desde aqui al padre;este arreglo tuvo que pasarse como copia y no como referencia para que funcionase
            porque no queria funcionar entonces esta nueva variable elements la estamos asignando arreglo de bar y el reciclador de basura no pudo recoger o desacerse de elements(recordar que debe ir borrando por donde va pasando el dibujo de barra) porque contiene una referencia bars que se sigue usando(linea10)pero la copia si la percibe como inutilizable y la recicla*/
            elements.push(this.ball); /*y lo decomentamos...lo comentamos debido a lo que hicimos en la linea 82 */ /*agregamos la pelota */
            return elements; /*y retornamos todos los elementos que hay en el tablero */
        } /*el anterior metodo lo unico que va hacer es retornar tanto las barras como la pelota */
    }

})();
(function () {/**hacemos la function de la pelota*/
    self.Ball = function (x, y, radius, board) {/**a la pelota le damos los atributos de ubicacion x y radius board*/
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3;
        this.board = board;
        this.direction = 1; /**es si pa la recha o izquierda*/
        this.bounce_angle = 0;/**angulo de la pelota*/
        this.max_bounce_angle = Math.PI / 12; /**el angulo maximo en que la pelota puede salir disparada pi entre 12*/
        this.speed = 3; /**este atributo speed funciona para calcular speed x y speed y*/
        this.rebote = 1; /**rebote lo usaremos para el rebote en las bandas del cuadro*/

        board.ball = this;/**boarball es this es decir esto de la linea 11 (ball) y volvemos a agregar la linea 17*/
        this.kind = "circle";

    }
    /**vamos hacer que la pelota se mueva con el siguiente metodo, dicho metodo lo movimos de dentro de la function anterior a afuera para que funcionara su movimiento de pelota*/
    self.Ball.prototype = { /**y acontinuacion su respectiva function*/
        move: function () { /**y dentro de esta especificamos...*/
            if (this.y >= 399 || this.y <= 1) { /**con este if logramos hacer que pegue en las bandas*/
                this.rebote = this.direction;
            }
            this.x += (this.speed_x * this.direction); /**positivo para la derecha la movera direction negativo al contrario*/
            this.y += (this.speed_y * this.rebote);

        },

        get width() {
            return this.radius * 2;
        },
        get height() {
            return this.radius * 2;
        },

        collision: function (bar) {

            //Reacciona a la colisión con una barra que recibe como parámetro
            var relative_intersect_y = (bar.y + (bar.height / 2)) - this.y;

            var normalized_intersect_y = relative_intersect_y / (bar.height / 2);

            this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;

            this.speed_y = this.speed * -Math.sin(this.bounce_angle);
            this.speed_x = this.speed * Math.cos(this.bounce_angle);/**hubo que agregar atributo angulo de rebote y lo agregamos en la linea 35*/
    
            if (this.x > (this.board.width / 2)) this.direction = -1; /**cambiamos la direccion dependiendo cual barra colisiona si es la izquierda va a la derecha si es derecha  a la izquierda*/
            else this.direction = 1;
        }/**este bloque de codigo lo que hace es calcular el angulo en que va moverse la pelota*/

    }


})();


/**vamos a dibujar las barras, vamos a crear una function que se autoejecuta*/
(function () { /**dentro de la funcion declaramos una nueva clase*/
    self.Bar = function (x, y, width, height, board) { /**a continuacion vamos a definir estos parametro separados por comas que seran las coordenadas medidas y la pizarra*/
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        /**en la linea de codigo 10 apreciamos el arreglo[] de barras o palitos d juego 
         * por lo que tambien es el mas importante en ir aqui en el contructor de la barra (esta function)
         * ya que va llenar el arreglo [] donde le diremos que acceda al board luego al bars y agregamos elemento con push que seria this (this simbolisaria esto todo esto objeto barra que esta en la function)
         */
        this.board.bars.push(this);
        /**a continuacion con la variable kind le diremos a canvas si va dibujar un  cuadrado o circulo o q*/
        this.kind = "rectangle";
        /**el siguiente atributo es para el movimiento de las barras*/
        this.speed = 5;
    }
    /**modificamos el prototype de dicha function*/
    self.Bar.prototype = { /**declaramos a continuacion las funciones para moverlo*/
        down: function () {
            this.y += this.speed;/**para moverlo hacia bajo le aumentamos a la coordenada en y la velocidad*/
        },
        up: function () {
            this.y -= this.speed;/**y para ir hacia arriba lo mismo pero diferente q down*/
            
        }, /**para que console log no nos diga speed no defined le ponemos this ya que de 
        lo contrario no estaria definida pero al si ser un atributo del objeto lo accedemos con this*/
        toString: function () {/**toString se usa para pasar un objeto a cadena y aqui lo hacemos para ver las coordenadas en console log */
            return "x:" + this.x + "y:" + this.y; /**aqui imprimimos en que coordenada en x esta y en que coordenada en y esta*/
        }

    }
})();


/*no vamos a crear el tablero sino que vamos a crear una clase que se encargue de ello con un modelo de vista controlador a continuacion con una function anonima para declara una nueva clase*/
(function () {
    self.BoardView = function (canvas, board) {/*<este objeto es de la clase board y el canvas es el que tenemos en el html de la otra ventana, el cual usaremos para dibujar*/ 
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height; /*aqui aprecieremos como el width y el height que asignemos modificar el alto y el ancho del canvas*/
        this.board = board; /*guardamos tambien el board */
        this.ctx = canvas.getContext("2d");/*vamos a generar un contexto el cual es importante ya que es el objeto a traves del cual nostros podemos dibujar en javascript y el metodo de api canvas es getContext y tradicionalmente siempre se usa para definirlo ctx*/
        this.marcador_a = 0;
        this.marcador_b = 0; /**para la elaboracion de las lineas 155 172 (rebote bandas)*/
    }
    /*procedemos a modficar el protype de boardview */
    self.BoardView.prototype = {

        clean: function () {

            this.ctx.clearRect(0, 0,this.board.width, this.board.height);/**vamos a limpiar este repintado con clean mas específicamente clearRect que hará lo contrario es decir pasar un rectángulo transparente que borre por donde vaya dejando restos nuestro rectángulo negro (barra de pingpong) */
        },/**y le decimos que el rectangulo limpiador lo dibuje del mismo tamaño que boardwitdh y el boardheight y empieze en las coordenada 0 en x y 0 en y 
        no olvidar poner el this a lo que pusimos dentro de los parentesis o sino es como si le estuvieras diciendo clearrect que eso es null y limpiaria sin tamaño y altura*/

        draw: function () { /**hacemos un ciclo sobre el board elements de la linea de cod 15 el cual devuelve las barras y la pelota*/
            for (var i = this.board.elements.length - 1; i >= 0; i--) {
                var el = this.board.elements[i];/**estas 2 lineas deben ir con this ya que board son atributos del objeto BoardView de la linea 55 y 59*/

                draw(this.ctx, el);/**el ctx hace referencia a la linea de codigo 60 y el elemento a dibujar sera el que esta recorriendo en este momento(linea 66 aprox)*/
            };
        },
        check_collisions: function () { /**aqui chekearemos el rebote*/
            for (var i = this.board.bars.length - 1; i >= 0; i--) {/**vamos a iterar tdodos los*/
                var bar = this.board.bars[i]; 
                if (hit(bar, this.board.ball)) {
                    this.board.ball.collision(bar);/**aqui se llama al metodo collision en caso de colision en la pelota y le pasamos como parametro la barra y le hacemos su funcion la cual quedo en la linea 50 aproximadamente*/
                }
            };
        },

        check_goal: function () { /**este bloque del 156 al 172 se encargo de terminar el juego en colaboracion con la linea 127 y 128*/
            var goal = false;
            if (this.board.ball.x >= 800) {
                this.marcador_a++;
                console.log("Goal A " + this.marcador_a);
                this.board.playing = false;
                goal = true;
            } else if (this.board.ball.x <= 0) {
                this.marcador_b++;
                console.log("Goal B " + this.marcador_b);
                this.board.playing = false;
                goal = true;
            }
            return goal;
        },
        refresh_scoreboard: function () {
            var sbA = document.getElementById('teamA').innerHTML = this.marcador_a.toString();
            var sbB = document.getElementById('teamB').innerHTML = this.marcador_b.toString();
        },


        play: function () { /**este metodo play se encargara de ejecutar todo lo que tenga que ver con que el juego funcione(dibujar y limpiar)*/
            if (this.board.playing) { /**este if lo colocamos apenas y dice que haga todo lo siguiente si el juego esta en play   */
                this.clean();/**que dibuje el borra*/
                this.draw();/**le decimos que dibuje todos los elementos*/
                this.check_collisions();
                if (this.check_goal() === true) {  /**este if se encargara de ejecutar y validar el rebote de las bandas*/
                    this.refresh_scoreboard();
                    this.board.ball.x = 400;
                    this.board.ball.y = 200;
                    this.clean();
                    this.draw();
                    this.board.playing = false;
                }
                this.board.ball.move();


            }
        }
    }

    function hit(a, b) {
        //Revisa si a colisiona con b
        var hit = false;
        //Colsiones horizontales
        if (b.x + b.width >= a.x && b.x < a.x + a.width) {
            //Colisiones verticales
            if (b.y + b.height >= a.y && b.y < a.y + a.height)
                hit = true;
        }
        //Colisión de a con b
        if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
            if (b.y <= a.y && b.y + b.height >= a.y + a.height)
                hit = true;
        }
        //Colisión b con a
        if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
            if (a.y <= b.y && a.y + a.height >= b.y + b.height)
                hit = true;
        }

        return hit;
    }/**esta funcion hit cumple con la condicion de que los objetos tienen un atributo x y y que devuelvan a la posicion de donde estan y que lo elementos a y b tengan un atributo width y height y como la pelota no tiene esos atributos pusimos unos get en las lineas
    retornando asi una variable booleana con tres posibles casos de colisiones true donde si no suceden retorna hit como false(false cuando no hay colision y true cuando si*/



    function draw(ctx, element) { /**este metodo draw va dibujar los elementos, le pasamos el contexto (ctx) y los elementos*/
        /*
        if (element !== null && element.hasOwnProperty("kind")) { lo comentamos porque estaba pesando mucho y en principio solo lo pusimos para chekiar que el elemento no sea nulo y lo pusimo fue porque el elemento ball(linea 17) es nulo hace que nuestro swith no funcione bien*/ /**este hasOwnProperty lo que hace es decir si el objeto tiene una propiedad kind y pueda despues acceder a ella */
            switch (element.kind) { /**kind es el atributo del elemento de la linea cod 38, kind es tipo entonces dependiento el tipo de element que lo dibuje de diferente manera indicamos a continuacion con case*/
                case "rectangle":
                    ctx.fillRect(element.x, element.y, element.width, element.height);/**fillRect es una funcion del contexto que nos permite dibujar un rectangulo o cuadrado y lo parametros son lo de adentro el elemento x y asi */
                    break;
                case "circle":
                    ctx.beginPath();
                    ctx.arc(element.x, element.y, element.radius, 0, 7);/**y dibujamos un circle en esta linea*/
                    ctx.fill();
                    ctx.closePath();
                    break;

            }
        /*}*/
    }
     
})();

var board = new Board(800, 400);/*instanciamos un nuevp objeto de la clase board */
var bar = new Bar(20, 150, 40, 100, board);
var bar_2 = new Bar(735, 150, 40, 100, board);
var canvas = document.getElementById('canvas');/*obtenemos el canvas primero que todo, obtenemos con el get elementos del document object model(la pagina) */
var board_view = new BoardView(canvas, board); /*un nuevo objeto boadview */
var ball = new Ball(400, 200, 10, board);


/*
setInterval(main,100)*/ /**para animarlo usamos algo de html5 y requestanimationframe, aqui hacemos la funcion main se ejecute en el intervalo de 100 milisegundo
pero ya no se usa porque no necesitamos decirle a pc o cel cuantos frame por segundo va tener la aplication y es aqui cuando
lo reemplazamos por requestanimationframe el cual puse en la linea de cod 137*/



/**a traves de este document accedemos al dom para poner el listener sobre un elemento
 * no se recomienda hacerlo sobre el canvas ya que si lo hacemos asi el usuario tendría 
 * que dar click en el elemento para empezar a mover las barras, y ya vamos un poco mas avanzado en experiencia de usuario
 */
document.addEventListener("keydown", function (ev) {/**el evento a escuchar sera un keydown y apenas suceda el evento se ejecuta la funcion donde ev va traer informacion del evento*/
    

    if (ev.keyCode == 38) { /**keyCode es un atributo del mismo evento que permite identificar la tecla que teclea el usuario*/
        ev.preventDefault();/**esto lo ponemos por que se estaba cayendo la pagina al bajar la barra con la flecha,
    entonces le dijimos oye navegador no se que ivas hacer con el movimiento de la flecha pero ya no lo hagas
    tambien cabe mencionar que ev.preventDefault estaba entre el if y su listener (afuera del if) y lo metimos en cada uno de los if porque no estaba permitiendo que el usuario tecleara ninguna tecla*/
        bar.up();
    }
    else if (ev.keyCode == 40) {
        ev.preventDefault();
        bar.down();
    }
    /**como la anterior functon no tiene acceso a las barras las vamos a traer de function main cortar y pegar todas las que decian var 
     * las colocamos detras del window.addEventlistener
     */
    else if (ev.keyCode === 87) {
        ev.preventDefault();
        //w
        bar_2.up();
    }
    else if (ev.keyCode === 83) {
        ev.preventDefault();
        //s
        bar_2.down();
    }
    else if (ev.keyCode === 32) {
        ev.preventDefault();
        board.playing = !board.playing;/**esto lo que va hacer es si esta variable vale verdadero la vuelve falso y si es falvo a verdadero(si esta en pausa en play si esta en play la posibilidad de poner en pausa*/
    }

    /*comentamos el siguiente log porque ya no lo necesitamos solamente fue mientras sabiamos que numero representa cada tecla del tesclado
    console.log("" + bar);*/ /*aqui cambiamos bar a cadena*//**estp imprimira en console el numero de identificacion q corresponde a cada tabulacion del teclado*/
    
});


board_view.draw();/**aqui le pedimos al boardview que dibuje el relleno del cuadro cuando se actualize la pagina y asi dar contexto*/


/*
window.addEventListener("load", main); lo comente porque ya no la necesitamos porque nuestra ejecucion de la funcion main la sustituimos para que se llame controller asi ya no se hara al iniciar sino en cada uno de los frame de la animacion dependiendo de cada uno de los disponsitivos q la usen*/
/**window se pudo haber cambiado por self*/

window.requestAnimationFrame(controller);/**lo que hace este request es decir muevete al siguiente frame y lista la funcion controler(antes main)
y para que contantemente se siga actualizando la ponemos en main tambien*/



/*la siguiente funcion va ejecutar todos los elementos*/
function controller() {
    
    /**aqui antes estaban los var de la linea 100 a 105 aproximadamente para que notes que se deben mover para mejorar el codigo*/
    board_view.play();/**board este metodo play esta reemplazando a lo que pase a lalinea 86 y 87 que era borra y dicujar pero ahora todo en uno (play)*/
    requestAnimationFrame(controller);
}  