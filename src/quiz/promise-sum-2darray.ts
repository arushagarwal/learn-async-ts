function sum2DArrayConcurrent(arr: number[][]): Promise<number> {
    return new Promise((resolve, reject) => {
        if(arr.length === 0) {
            reject('Cannot sum an empty array');
        }

        const rowSumPromises = arr.map(row => {
            return new Promise<number>((resolve) => {
                let rowSum = 0;
                for(let j = 0 ; j< row.length ; j++){
                    rowSum += row[j];
                }
                resolve(rowSum);
            })
        })

        Promise.all(rowSumPromises)
            .then(rowSums => {
                const totalSum = rowSums.reduce((acc, sum) => acc + sum, 0);
                resolve(totalSum);
            })
            .catch(err => reject('Error while summing the rows: ' + err));
    });
}

const array2D_1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

sum2DArrayConcurrent(array2D_1)
    .then(sum => {
        console.log('sumPromise1:', sum);
    })
    .catch(err => {
        console.log("error ", err);
    })


sum2DArrayConcurrent([])
.then(sum => {
    console.log('sumPromise1:', sum);
})
.catch(err => {
    console.log("error ", err);
})