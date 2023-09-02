// myfirst.js

exports.calculator= function (a,b,operator){
    switch(operator){
        case "+":
            return a+b;

        case "-":
            return a-b;
        case "*":
            return a*b;
        case "/":
            return a/b;

    }
}
