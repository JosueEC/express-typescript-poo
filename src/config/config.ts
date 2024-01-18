import * as dotenv from 'dotenv';

/**
 * Una clase Abstracta no se puede instanciar, solo heredar
 */
export abstract class ConfigServer {
    constructor() {
        /**
         * Esta funcion setea el archivo de variables de entorno
         * para que sea leido, ya sea el ambiente de desarrollo o el
         * de produccion.
         * 
         * .createPathEnv() es la funcion que crea este nombre del
         * archivo de ambiente.
         * 
         * this.nodeEnv devuelve el ambien seteado, ya sea que
         * se definio en la varaible NODE_ENV o devuelve un string
         * vacio, el cual en la funcion createPathEnv() se modifica
         * como '.env'
         */
        const nodeNameEnv = this.createPathEnv(this.nodeEnv);
        /**
         * Finalmente, la varaible de arriba puede devolver
         * cualquier path de la siguiente forma:
         * * .develop.env
         * * .production.env
         * * .env
         * * etc
         * Y este path es el que necesita el metodo config de
         * dotenv, por lo que se lo pasamos
         */
        dotenv.config({
            path: nodeNameEnv,
        });
    }

    /**
     * @param key
     * Este sera el nombre de la variables de entorno definidas en
     * los archivos .env. Cuando se reciba el nombre, esta funcion
     * devuelve el valor de esa varaible de entorno especifica.
     */
    public getEnvironment(key: string): string | undefined {
        return process.env[key]; // process.env[PORT];
    }

    public getNumberEnv(key: string): number {
        /**
         * Una funcion del tipo de dato Number es poder castear
         * un valor a un numero.
         */
        return Number(this.getEnvironment(key));
    }

    /**
     * En TypeScript, tambien podemos definie metodos accesores como
     * lo son los getters y setters. En este caso este es un ejemplo
     * de un getter, el cual devuelve el entorno de desarrollo que
     * se esta utilizando
     */
    public get nodeEnv(): string {
        return this.getEnvironment('NODE_ENV')?.trim() || '';
    }

    /**
     * Basicamente este metodo construye los paths de los entornos
     * de la siguiente forma:
     * * * .develop.env
     * * .production.env
     * * .env
     */
    public createPathEnv(path: string): string {
        const arrEnv: Array<string> = ['env'];

        if (path.length > 0) {
            const stringToArray = path.split('.');
            arrEnv.unshift(...stringToArray);
        }
        return '.' + arrEnv.join('.');
    }
}