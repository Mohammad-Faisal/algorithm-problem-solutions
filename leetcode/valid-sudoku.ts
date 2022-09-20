const validateArray = (nums: string[]) => {
    const map ={};
    
    for(const item of nums){
        if(item !== '.'){
            if(map[item]) return false;
            map[item] = 1;    
        }
    }
    return true;
}


const generateArray = (board: string[][] , startRow: number ,startCol: number) => {
    const temp = []
    for(let i=startRow;i<startRow+3;i++){
        for(let j=startCol;j<startCol+3;j++){
            temp.push(board[i][j])
        }
    }
    return temp;
}


function isValidSudoku(board: string[][]): boolean {
    for(const row of board){
        if(!validateArray(row)) return false;
    }
    
    for(let i=0;i<9;i++){
        const colRow = [];
        for(let j=0;j<9;j++){
            colRow.push(board[j][i])
        }
        if(!validateArray(colRow)) return false;
    }
    
    const squares = [];
    squares.push(generateArray(board, 0,0))
    squares.push(generateArray(board, 0,3))
    squares.push(generateArray(board, 0,6))
    squares.push(generateArray(board, 3,0))
    squares.push(generateArray(board, 3,3))
    squares.push(generateArray(board, 3,6))
    squares.push(generateArray(board, 6,0))
    squares.push(generateArray(board, 6,3))
    squares.push(generateArray(board, 6,6))
    
    
    for(const row of squares){
        if(!validateArray(row)) return false;
    }
    return true;
    
};
