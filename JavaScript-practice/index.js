function BMI(weight, height) {
    const calcBMI = weight / Math.pow(height, 2)
    return Math.round(calcBMI)
}

console.log(BMI(65, 1.8))