const print = () => {

    console.log('Message 1');

    setTimeout(()=> {
        console.log('Message 2');
        console.log('Message 3');
    }, 3000)

}

print();

