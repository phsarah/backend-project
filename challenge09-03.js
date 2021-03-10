function challenge09_03(n, k){
    const array = []

    for(let i = 1; i <= n; i++){
        const mult = i * k 
        array.push(mult)
    }

    console.log(array)
}
challenge09_03(6, 5)