import fs from "fs";
import Felszállás from "./Felszállás";
import FelszállásJegy from "./FelszállásJegy";
import FelszállásBérlet from "./FelszállásBérlet";

interface ILegtöbbFelszálló {
    megálló: number;
    felszálló: number;
}
export default class Megoldás {
    #utasadatok: Felszállás[] = [];

    get felszállók_száma(): number {
        return this.#utasadatok.length;
    }

    get érvénytelenFelszállásokSzáma(): number {
        let érvénytelen: number = 0;
        for (const e of this.#utasadatok) {
            if (!e.ezÉrvényesFelszállás) érvénytelen++;
        }
        return érvénytelen;
    }

    get legtöbbFelszálló(): ILegtöbbFelszálló {
        const legtöbb: ILegtöbbFelszálló = { felszálló: -1, megálló: -1 };
        let aktMegálló: number = 0;
        let aktMegállóFelszálló: number = 0;
        for (const e of this.#utasadatok) {
            if (e.megállóSorszáma == aktMegálló) aktMegállóFelszálló++;
            else {
                // váltás van a megálló sorszámában
                if (aktMegállóFelszálló > legtöbb.felszálló) {
                    legtöbb.felszálló = aktMegállóFelszálló;
                    legtöbb.megálló = aktMegálló;
                }
                aktMegálló = e.megállóSorszáma;
                aktMegállóFelszálló = 1;
            }
        }
        return legtöbb;
    }

    get legtöbbFelszállóArray(): ILegtöbbFelszálló {
        const legtöbb: ILegtöbbFelszálló = { felszálló: -1, megálló: -1 };
        const stat: number[] = Array(30).fill(0);
        for (const e of this.#utasadatok) stat[e.megállóSorszáma]++;
        legtöbb.felszálló = Math.max(...stat);
        for (let i = 0; i < stat.length; i++) {
            if (stat[i] == legtöbb.felszálló) {
                legtöbb.megálló = i;
                break;
            }
        }
        return legtöbb;
    }

    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(sor => {
                // 3 20190326-0703 2642616 FEB 20190402
                const aktSor: string = sor.trim();
                const típus: string = sor.split(" ")[3];
                if (típus == "JGY") {
                    this.#utasadatok.push(new FelszállásJegy(aktSor));
                }
                if (["FEB", "TAB", "NYB", "NYP", "RVS", "GYK"].includes(típus)) {
                    this.#utasadatok.push(new FelszállásBérlet(aktSor));
                }
            });
    }
}
