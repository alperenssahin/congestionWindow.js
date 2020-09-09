(async ()=>{
    async function foo(){
        return new Promise((resolve => {
            setTimeout(()=>{resolve()},200+800*Math.random());
        }))
    }
    let congestionWindowSize = 10;
    let congestionTimeout = 900;
    let promiseArray = [];
    for(let i=0; i<1000; i++){
        promiseArray.push(foo());
        if(promiseArray.length >= congestionWindowSize){
            console.log(`${promiseArray.length} promises in progress`);
            let congestionTimeoutHandler = setTimeout(()=>{
                console.log("CONGESTION TIMEOUT");
                congestionWindowSize /= 2;
            },congestionTimeout);
            await Promise.all(promiseArray);
            clearTimeout(congestionTimeoutHandler);
            promiseArray = [];
            congestionWindowSize++;
        }
    }
})();
