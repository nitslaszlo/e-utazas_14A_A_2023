import fs from "fs"; //  https://nodejs.org/docs/latest-v14.x/api/fs.html
import http from "http"; //  https://nodejs.org/docs/latest-v14.x/api/http.html
import url from "url"; //  https://nodejs.org/docs/latest-v14.x/api/url.html
import Megoldás, { ILegtöbbFelszálló } from "./Megoldás";

export default function content(req: http.IncomingMessage, res: http.ServerResponse): void {
    // favicon.ico kérés kiszolgálása:
    if (req.url === "/favicon.ico") {
        res.writeHead(200, { "Content-Type": "image/x-icon" });
        fs.createReadStream("favicon.ico").pipe(res);
        return;
    }
    // Weboldal inicializálása + head rész:
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<!DOCTYPE html>");
    res.write("<html lang='hu'>");
    res.write("<head>");
    res.write("<meta charset='utf-8'>");
    res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
    res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
    res.write("<title>Jedlik Ts Template</title>");
    res.write("</head>");
    res.write("<body><form><pre>");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;

    // Kezd a kódolást innen -->
    const mo: Megoldás = new Megoldás("utasadat.txt");

    res.write(`2. feladat:\nA buszra ${mo.felszállók_száma} utas akart felszállni.\n`);

    res.write(`3. feladat:\nA buszra ${mo.érvénytelenFelszállásokSzáma} utas nem szállhatott fel.\n`);

    const legtöbb: ILegtöbbFelszálló = mo.legtöbbFelszálló;
    res.write(`4. feladat:\nA legtöbb utas (${legtöbb.felszálló} fő) a ${legtöbb.megálló}. megállóban próbált felszállni.\n`);

    const legtöbb2: ILegtöbbFelszálló = mo.legtöbbFelszállóArray;
    res.write(`4. feladat:\nA legtöbb utas (${legtöbb2.felszálló} fő) a ${legtöbb2.megálló}. megállóban próbált felszállni.\n`);

    res.write(`5. feladat:\nIngyenesen utazók: ${mo.IngyenesUtazókSzáma} fő\n`);
    res.write(`Kedvezményesen utazók: ${mo.KedvezményesenUtazókSzáma} fő\n`);

    mo.figyelmeztetéseketÍr("figyelmeztetes.txt");

    // <---- Fejezd be a kódolást

    res.write("</pre></form></body></html>");
    res.end();
}
