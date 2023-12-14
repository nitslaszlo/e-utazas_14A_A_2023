import Felszállás from "./Felszállás";

export default class FelszállásBérlet extends Felszállás {
    #típus: string;
    #érvényes: Date;

    get ezÉrvényesFelszállás(): boolean {
        return this.#érvényes >= this._idő;
    }

    constructor(sor: string) {
        super(sor);
        // 3 20190326-0703 2642616 FEB 20190402
        const m: string[] = sor.split(" ");
        this.#típus = m[3];
        const d: string = m[4];
        const év: number = parseInt(d.substring(0, 4));
        const hónap: number = parseInt(d.substring(4, 6));
        const nap: number = parseInt(d.substring(6, 8));
        this.#érvényes = new Date(év, hónap - 1, nap, 23, 59, 59, 999);
    }
}
