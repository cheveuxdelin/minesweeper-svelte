import Cell from "./cell";

export default class Grid {
    cells: Cell[][];
    n: number;
    m: number;
    static readonly axis = [0, 1, 1, -1, 0, -1, -1, 1, 0] as const;

    constructor(n: number, m: number, nMines: number) {
        this.cells = [];
        this.n = n;
        this.m = m;
        for (let nRow = 0; nRow < n; nRow++) {
            const row = [];
            for (let nCol = 0; nCol < m; nCol++) {
                row.push(new Cell(nRow, nCol));
            }
            this.cells.push(row);
        }

        for (let i = 0; i < nMines; i++) {
            let mineX = Grid.getRandomInt(n);
            let mineY = Grid.getRandomInt(m);
            while (this.cells[mineX][mineY].isMine) {
                mineX = Grid.getRandomInt(n);
                mineY = Grid.getRandomInt(m);
            }
            this.cells[mineX][mineY].isMine = true;
            this.cellNeighbors(mineX, mineY).forEach(({ x, y }) => {
                let numberOfMines = 0;
                this.cellNeighbors(x, y).forEach(neighbor => {
                    if (this.cells[neighbor.x][neighbor.y].isMine) {
                        numberOfMines++;
                    }
                })
                this.cells[x][y].value = numberOfMines;
            });
        }
    }

    revealCells() {
        for (const row of this.cells) {
            for (const cell of row) {
                cell.isHidden = false;
            }
        }
    }

    cellNeighbors(x: number, y: number): { x: number; y: number }[] {
        const arr = [];
        for (let ax = 0; ax < Grid.axis.length; ax++) {
            const xx = x + Grid.axis[ax];
            const yy = y + Grid.axis[ax + 1];
            if (xx >= 0 && xx < this.cells.length && yy >= 0 && yy < this.cells[0].length) {
                arr.push({ x: xx, y: yy });
            }
        }
        return arr;
    }

    static getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }

}