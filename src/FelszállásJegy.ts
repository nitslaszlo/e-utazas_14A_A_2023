import Felszállás from "./Felszállás";

export default class FelszállásJegy extends Felszállás {
    #jegyekSzáma: number;

    get ezÉrvényesFelszállás(): boolean {
        return this.#jegyekSzáma > 0;
    }

    constructor(sor: string) {
        super(sor); // végrehajtja az ősosztály konstruktor
        // super() hívása KÖTELEZŐ!!!
        // 3 20190326-0703 9085045 JGY 8
        this.#jegyekSzáma = parseInt(sor.split(" ")[4]);
    }
}
