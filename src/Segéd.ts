export default class Segéd {
    // 6. feladat:
    public static napokszama(e1: number, h1: number, n1: number, e2: number, h2: number, n2: number): number {
        h1 = (h1 + 9) % 12;
        e1 = e1 - ~~(h1 / 10);
        const d1: number = 365 * e1 + ~~(e1 / 4) - ~~(e1 / 100) + ~~(e1 / 400) + ~~((h1 * 306 + 5) / 10) + n1 - 1;
        h2 = (h2 + 9) % 12;
        e2 = e2 - ~~(h2 / 10);
        const d2: number = 365 * e2 + ~~(e2 / 4) - ~~(e2 / 100) + ~~(e2 / 400) + ~~((h2 * 306 + 5) / 10) + n2 - 1;
        return d2 - d1;
    }

    // Saját fg. a Date típus használatával
    public static napokszama2(d1: Date, d2: Date): number {
        const date1ms: number = d1.valueOf();
        const date2ms: number = d2.valueOf();
        const diffMs: number = date2ms - date1ms;
        return ~~(diffMs / (1000 * 60 * 60 * 24));
    }
}
