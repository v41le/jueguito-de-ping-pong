# jueguito-de-ping-pong
jueguito de ping pong basico para red local con javascript

En resumen, este código implementa un juego simple de ping-pong donde dos jugadores controlan las barras y compiten para golpear la pelota y anotar puntos. El código se divide en clases y funciones para gestionar la lógica del juego, la representación visual y la interacción del usuario.
Este juego fue desarrolado con visual studio para una red local para su visualizacion en una pagina web no publica, por lo tanto xampp se descarga, instala y configura en visual studio para su uso.
Y el código HTML ignoren la carpeta index22.html la subi sin querer es un hola mundo, en el index2.html si se crea la estructura básica de una página para el juego de ping-pong. Contiene elementos de encabezado, contenido centrado, un lienzo <canvas> para dibujar el juego y enlaces a estilos CSS y scripts JavaScript externos.

Aquí tienes un resumen de cómo funciona y los eventos y elementos clave en el código:
Clase Board: Esta clase representa el tablero del juego. Tiene atributos para el ancho, alto, estado de juego y otras propiedades como las barras y la pelota. La clase también contiene métodos para acceder a los elementos en el tablero.
Clase Ball: Representa la pelota en el juego. Tiene atributos para la posición, velocidad, dirección y otros valores relacionados con la física de la pelota. Tiene un método move para actualizar su posición.
Clase Bar: Representa las barras laterales que los jugadores controlan. Tiene atributos para la posición, tamaño y velocidad. Tiene métodos para mover las barras hacia arriba y hacia abajo.
Clase BoardView: Administra la vista del tablero y sus elementos en el canvas HTML. Se encarga de dibujar el tablero, detectar colisiones y actualizar la puntuación.
Funciones de dibujo (draw): Estas funciones se encargan de dibujar elementos en el canvas según su tipo, como rectángulos o círculos.
Eventos de teclado: El programa escucha los eventos de teclado para permitir a los jugadores mover las barras hacia arriba o hacia abajo y pausar el juego.
Función controller: Esta función es el corazón del juego. Se llama de forma recursiva usando requestAnimationFrame para actualizar y renderizar continuamente el juego en cada fotograma.
Mecánica del juego: El juego permite a los jugadores mover sus barras con las teclas "W" y "S" para uno de los jugadores, y las teclas de flecha hacia arriba y hacia abajo para el otro jugador. La pelota rebota en las barras y en los bordes del tablero. Cuando la pelota cruza los límites laterales, se suma un punto al jugador correspondiente.
Elementos HTML: El programa interactúa con elementos HTML como el canvas y elementos para mostrar el marcador del juego.

![pingpongjavascript](https://github.com/v41le/jueguito-de-ping-pong/assets/125850483/b6e85434-f7b0-45d3-b00c-5fccd929ee9e)
