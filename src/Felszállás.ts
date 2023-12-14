export default abstract class Felszállás {
    protected _megállóSorszáma: number;
    protected _idő: Date;
    protected _kártyaAzon: string;

    get ezÉrvényesFelszállás(): boolean {
        return false;
    }

    get megállóSorszáma(): number {
        return this._megállóSorszáma;
    }

    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this._megállóSorszáma = parseInt(m[0]);
        // this._idő = new Date(m[1]); // a dátum formátuma nem jó!
        const d: string = m[1];
        const év: number = parseInt(d.substring(0, 4));
        const hónap: number = parseInt(d.substring(4, 6));
        const nap: number = parseInt(d.substring(6, 8));
        const óra: number = parseInt(d.substring(9, 11));
        const perc: number = parseInt(d.substring(11, 13));
        this._idő = new Date(év, hónap - 1, nap, óra, perc);
        this._kártyaAzon = m[2];
    }
}
