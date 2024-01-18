import { BaseRouter } from "./router";
import { UserController } from "../controllers/user.controller";

/**
 * Aqui la forma en la que creamos enrutadores a partir de la clase
 * BaseRouter y como conectamos estos a su respectivo controller.
 * 
 * Basicamente extendemos de la clase para heredar todos sus metodos
 * y propiedades, pasamos el respectivo controller como el tipo
 * generico que espera la clase BaseRouter.
 * 
 * Y finalmente, para instanciar y conectar este router con su
 * controller, pasamos el controller al constructor de la clase
 * BaseRouter mediante el metodo super().
 */
export class UserRouter extends BaseRouter<UserController> {
    constructor() {
        super(UserController);
    }

    /**
     * Ahora, utilizando la sobreescritura de metodos, podemos
     * acceder al metodo routes que definimos en la clase BaseRouter
     * y asi poder definir las rutas especificas para este modulo,
     * ademas de que estas se ejecutan en automatico porque ya lo
     * hemos definido en la clase BaseRouter cuando ejecutamos la
     * function routes() dentro de su contructor.
     */
    routes(): void {
        /**
         * Esta es la forma en la que definimos una ruta y la
         * conectamos con su respectiva funcion en el controlador.
         * 
         * Gracias a heredar de la clase BaseRouter, podemos acceder
         * a la propiedad 'router' que definimos en esa clase y asi
         * acceder a los metodos con verbos Http.
         * 
         * Despues, en la funcion callback que reciben estos metodos,
         * tambien podemos acceder al controller definido en la
         * clase BaseRouter. Y dado que el controller que definimos
         * en el generico fue UserController, entonces podemos acceder
         * a los metodos que este contiene.
         * 
         * Finalmente solo falta pasar los parametros de 'req' y 'res'
         * que por defecto recibe la funcion callback de nuestro
         * metodo
         */
        this.router.get('/user', (req, res) => this.controller.getUsers(req, res));
    }
}