function findNegativeRow(arr: number[][]): Promise<string> {
    return new Promise((resolve, reject) => {
        if(arr.length === 0) {
            reject('Cannot sum an empty array');
        }

        const rowCheckPromises = arr.map((row, rowIndex)=> {
            return new Promise<string>((resolve, reject) => {
                let isNegative = false;
                for (const num of row){
                    if(num<0){
                        isNegative = true;
                        break;
                    } 
                }
                if(isNegative) resolve("negative number found for row : "+rowIndex);
                else reject("No negative number found");
            })
        });

        Promise.any(rowCheckPromises)
            .then((str) => resolve(str))
            .catch(err => reject(err));
    });
}

const array2D_3 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, -9]
];

findNegativeRow(array2D_3)
    .then(str => {
        console.log(str);
    })
    .catch(err => {
        console.log(err);
    })