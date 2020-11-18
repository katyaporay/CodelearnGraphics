export default class Equations
{
    static rootOfTheFourthDegree(a, b, c, d)
    {

    }

    static rootOfTheThirdDegreeEquation(a, b, c)
    {
        if (a === 0)
        {
            const dd = b * b - 4 * a * c;
            if (dd < 0)
                return null;
            const d = Math.sqrt(dd);
            return (-b + d) / (2 * a);
        }
        c /= a;
        b /= a;
        a /= a;

        const q = (2 * b * b * b) / (27 * a * a * a) - (b * c) / (3 * a * a) + d / a;
        const p = c / a - (b * b) / (3 * a * a);
        const Q = (p / 3) * (p / 3) * (p / 3) + (q / 2) * (q / 2);
        let y;
        if (Q >= 0) {
            const A = Math.cbrt(-q / 2 + Math.sqrt(Q));
            const B = Math.cbrt(-q / 2 - Math.sqrt(Q));
            y = A + B;
        }
        else {

        }
    }
}
