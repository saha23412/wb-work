
function formatNumber(intNumber) {
    let int = String(Math.trunc(intNumber));
    if (int.length <= 3) return int;
    let space = 0;
    let number = '';

    for (let i = int.length - 1; i >= 0; i--) {
        if (space == 3) {
            number = ' ' + number;
            space = 0;
        }
        number = int.charAt(i) + number;
        space++;
    }

    return number;
}
export default formatNumber