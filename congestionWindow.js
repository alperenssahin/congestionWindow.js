module.exports = async (dataArray,loadFunction= async()=>{}) =>{
    let promiseArray = []
    let congestionWindowSize = 10;
    let congestionTimeout = 2000;
    for(let data of dataArray){
        promiseArray.push(loadFunction(data))
        if(congestionWindowSize < 1) congestionWindowSize = 1;
        if(promiseArray.length>=congestionWindowSize){
            let congestionWindowHandler = setTimeout(()=>{
                // console.log("Congestion W" , congestionWindowSize);
                congestionWindowSize /= 2;
            },congestionTimeout);
            await Promise.all(promiseArray);
            console.log("CongestionWindow Size",congestionWindowSize);
            console.log("Progress", `${dataArray.indexOf(data)}/${dataArray.length}`);
            promiseArray = [];
            clearTimeout(congestionWindowHandler);
            congestionWindowSize++;
        }
    }
}
