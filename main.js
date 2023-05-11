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
    }
    /*despues de haber declarado la clase vamos a modificar el prototipo de la clase para colocarlos los metodos de la misma */
    self.Board.prototype = { /*el siguiente objeto json nos permitira declarar diferentes funciones o metodos para el prototipo */
        get elements() {
            var elements = this.bars; /*estas son la barras laterales del juego */
            elements.push(this.ball);/*agregamos la pelota */
            return elements; /*y retornamos todos los elementos que hay en el tablero */
        } /*el anterior metodo lo unico que va hacer es retornar tanto las barras como la pelota */
    
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
        this.speed = 10;
    }
    /**modificamos el prototype de dicha function*/
    self.Bar.prototype = { /**declaramos a continuacion las funciones para moverlo*/
        down: function () {
            this.y += this.speed;/**para moverlo hacia bajo le aumentamos a la coordenada en y la velocidad*/
        },
        up: function () {
            this.y -= this.speed;/**y para ir hacia arriba lo mismo pero diferente q down*/
            
        } /**para que console log no nos diga speed no defined le ponemos this ya que de 
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
    }
    /*procedemos a modficar el protype de boarviw */
    self.BoardView.prototype = {
        draw: function () { /**hacemos un ciclo sobre el board elements de la linea de cod 15 el cual devuelve las barras y la pelota*/
            for (var i = this.board.elements.length - 1; i >= 0; i--) {
                var el = this.board.elements[i];/**estas 2 lineas deben ir con this ya que board son atributos del objeto BoardView de la linea 55 y 59*/

                draw(this.ctx, el);/**el ctx hace referencia a la linea de codigo 60 y el elemento a dibujar sera el que esta recorriendo en este momento(linea 66 aprox)*/
            }
        }
    }

    function draw(ctx, element) { /**este metodo draw va dibujar los elementos, le pasamos el contexto (ctx) y los elementos*/
        if (element !== null && element.hasOwnProperty("kind")) { /**este hasOwnProperty lo que hace es decir si el objeto tiene una propiedad kind y pueda despues acceder a ella */
            switch (element.kind) { /**kind es el atributo del elemento de la linea cod 38, kind es tipo entonces dependiento el tipo de element que lo dibuje de diferente manera indicamos a continuacion con case*/
                case "rectangle":
                    ctx.fillRect(element.x, element.y, element.width, element.height);/**fillRect es una funcion del contexto que nos permite dibujar un rectangulo o cuadrado y lo parametros son lo de adentro el elemento x y asi */
                    break;

            }
        }
    }   
})();

var board = new Board(800, 400);/*instanciamos un nuevp objeto de la clase board */
var bar = new Bar(20, 100, 40, 100, board);
var bar = new Bar(738, 100, 40, 100, board);
var canvas = document.getElementById('canvas');/*obtenemos el canvas primero que todo, obtenemos con el get elementos del document object model(la pagina) */
var board_view = new BoardView(canvas, board); /*un nuevo objeto boadview */


/**a traves de este document accedemos al dom para poner el listener sobre un elemento
 * no se recomienda hacerlo sobre el canvas ya que si lo hacemos asi el usuario tendría 
 * que dar click en el elemento para empezar a mover las barras, y ya vamos un poco mas avanzado en experiencia de usuario
 */
document.addEventListener("keydown", function (ev) {/**el evento a escuchar sera un keydown y apenas suceda el evento se ejecuta la funcion donde ev va traer informacion del evento*/
    
    if (ev.keyCode == 38) {
        bar.up();
    }
    else if (ev.keyCode == 40) {
        bar.down();
    }
    /**como la anterior functon no tiene acceso a las barras las vamos a traer de function main cortar y pegar todas las que decian var 
     * las colocamos detras del self.addEventlistener
     */
});

window.addEventListener("load", main);


/*la siguiente funcion va ejecutar todos los elementos*/
function main() {
    
    console.log(board);
    board_view.draw();/**le decimos que dibuje todos los elementos*/
}  