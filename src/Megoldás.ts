import fs from "fs";
import Felszállás from "./Felszállás";
import FelszállásJegy from "./FelszállásJegy";
import FelszállásBérlet from "./FelszállásBérlet";

export interface ILegtöbbFelszálló {
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
        // Utolsó megálló ellenőrzése
        // Nincs váltás a megállók sorszámában a végén,
        // így ez szükséges!
        if (aktMegállóFelszálló > legtöbb.felszálló) {
            legtöbb.felszálló = aktMegállóFelszálló;
            legtöbb.megálló = aktMegálló;
        }
        return legtöbb;
    }

    get legtöbbFelszállóArray(): ILegtöbbFelszálló {
        const legtöbb: ILegtöbbFelszálló = { felszálló: -1, megálló: -1 };
        const stat: number[] = Array(30).fill(0);
        for (const e of this.#utasadatok) stat[e.megállóSorszáma]++;
        legtöbb.felszálló = Math.max(...stat);
        legtöbb.megálló = stat.indexOf(legtöbb.felszálló);
        // for (let i = 0; i < stat.length; i++) {
        //     if (stat[i] == legtöbb.felszálló) {
        //         legtöbb.megálló = i;
        //         break;
        //     }
        // }
        return legtöbb;
    }

    public get IngyenesUtazókSzáma(): number {
        return this.#utasadatok.filter(x => x.ezIngyenesUtazás).length;
    }

    public get KedvezményesenUtazókSzáma(): number {
        return this.#utasadatok.filter(x => x.ezKedvezményesUtazás).length;
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

    public figyelmeztetéseketÍr(állomány: string): void {
        const ki: string[] = [];
        this.#utasadatok.forEach(e => {
            if (e instanceof FelszállásBérlet) {
                if (e.ezLejárHáromNap2) {
                    ki.push(`${e.kártyaAzon} ${e.érvényesÉvHóNap}`);
                }
            }
        });
        fs.writeFileSync(állomány, ki.join("\r\n") + "\r\n");
    }
}
