array = [1, 2, 3, 4, 5, 6, 7, 8, 9]

array.forEach(function(element, index){
    setTimeout(() => {
       console.log("Printing element: " + element) 
    }, index * 500);
});