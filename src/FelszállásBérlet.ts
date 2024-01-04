import Felszállás from "./Felszállás";
import Segéd from "./Segéd";

export default class FelszállásBérlet extends Felszállás {
    #típus: string;
    #érvényes: Date;

    get ezÉrvényesFelszállás(): boolean {
        return this.#érvényes >= this._idő;
    }

    get érvényesÉvHóNap(): string {
        return this.#érvényes.toLocaleDateString("en-CA");
    }

    get ezIngyenesUtazás(): boolean {
        return this.ezÉrvényesFelszállás && ["NYP", "RVS", "GYK"].includes(this.#típus);
    }

    get ezKedvezményesUtazás(): boolean {
        return this.ezÉrvényesFelszállás && ["TAB", "NYB"].includes(this.#típus);
    }

    get ezLejárHáromNap(): boolean {
        return this.ezÉrvényesFelszállás && Segéd.napokszama2(this._idő, this.#érvényes) <= 3;
    }

    get ezLejárHáromNap2(): boolean {
        const e1: number = this._idő.getFullYear();
        const h1: number = this._idő.getMonth() + 1;
        const n1: number = this._idő.getDate();
        const e2: number = this.#érvényes.getFullYear();
        const h2: number = this.#érvényes.getMonth() + 1;
        const n2: number = this.#érvényes.getDate();
        return this.ezÉrvényesFelszállás && Segéd.napokszama(e1, h1, n1, e2, h2, n2) <= 3;
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
