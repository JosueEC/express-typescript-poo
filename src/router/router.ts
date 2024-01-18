import { Router } from "express";

/**
 * Esta clase se podra instanciar pasandole un generico como dato de
 * tipado, esto nos permite poder usar esta clase para crear un
 * enrutador para cualquier controlador de nuestra aplicacion
 */
export class BaseRouter<T> {
    public router: Router;
    public controller: T;
    // public middleware: U;

    /**
     * @param TController
     * El tipado que añadimos a este parametro es para tipar la
     * instancia de un generico.
     * 
     * Basicamente, el constructor de esta clase podra recibir algo
     * como 'new UserController()' y esto es lo mismo para cualquier
     * controller.
     * 
     * Una vez que definimos this.controller = new TController es
     * como decir que cree la instancia que ha recibido y la asigne
     * a la propiedad controller que definimos en esta clase
     */
    constructor(TController: { new(): T }) {
        this.router = Router();
        this.controller = new TController;
        this.routes();
    }

    routes() {

    }
}