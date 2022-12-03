export default class Cell {
    value: number;
    isFlagged: boolean;
    isMine: boolean;
    isHidden: boolean;
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.isHidden = true;
        this.value = 0;
        this.isFlagged = false;
        this.isMine = false;
        this.x = x;
        this.y = y;
    }
}