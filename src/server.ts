import express, {
    Application,
    json,
    urlencoded,
    Router
} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { UserRouter } from './router/user.router';
import { ConfigServer } from './config/config';

class ServerBootstrap extends ConfigServer {
    public app: Application = express();
    private port: number = this.getNumberEnv('PORT');

    /**
     * Recuerda que dentro del constructor de una clase, podemos
     * definir codigo que se ejecuta al momento de instancias la
     * misma, es por eso que podemos ejecutar el metodo .listen()
     * desde el constructor para levantar el servidor colo con l
     * instancia de new ServerBotstrap();
     */
    constructor() {
        /**
         * Usamos el metodo super() para poder ejecutar el codigo
         * del constructor de la clase ConfigServer de la cual
         * estamos herdando
         */
        super();
        /**
         * Aqui mismo podemos definir las configuraciones del
         * servidor de express antes de que este se inicialice,
         * como lo es .json, .urlencoded, el uso de morgan,
         * configuracion de cors y demas que utilicemos.
         */
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        this.app.use(cors());

        /**
         * Esta seria la forma en la que podemos definir todas las
         * rutas para nuestra aplicacion, asi como definir un
         * prefijo general para los endpoint de nuestra api, el cual
         * puede ser solo /api o la version /v1 etc.
         */
        this.app.use('/api', this.routers());
        this.listen();
    }

    /**
     * En esta funcion definimos todas las clases de tipo Router
     * de las que dispondra nuestra aplicacion.
     * 
     * Estas se iran agregando en el array como una nueva instancia
     * con la cual accedemos a la propiedad router definida en la
     * clase BaseRouter de la cual deberian de heredar nuestras
     * clases de tipo Router
     */
    routers(): Array<Router> {
        return [new UserRouter().router];
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log('Server listening on port ' + this.port);
        });
    }
}

new ServerBootstrap();