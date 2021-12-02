const getPositiveDeltaCount = async (data, increment = 1) => {
    const debug = data.length < 10;
    let positiveDeltas = 0;
    for(let i = increment; i < data.length; i++) {
        const start = data.slice(i-increment, i).reduce((total, addend) => total + addend, 0);
        const end = data.slice(i-increment+1, i+1).reduce((total, addend) => total + addend, 0);

        if(i===increment) debug && console.log(start);
        debug && console.log(end);

        if(start < end){
            positiveDeltas++;
            debug && console.log('increased, was', start);
        }
    }
    console.log('positiveDeltas:', positiveDeltas );
    console.log('------------------------------');
}

export {
    getPositiveDeltaCount
}
