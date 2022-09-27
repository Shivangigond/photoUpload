function getData() {
    console.log('gourav')
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('hello');
        }, 2000)
    })
}


console.log('hello1');
getData().then(val => {
    console.log(val);
}).catch(err => {
    console.log(err);
})
console.log('hello2')