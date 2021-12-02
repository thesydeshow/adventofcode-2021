const setCourse = async (data) => {
    const debug = data.length < 10;

    let horizontal = 0;
    let depth = 0;
    for(let i = 0; i < data.length; i++) {
        const direction = data[i][0];
        const magnatude = data[i][1];
        switch(direction) {
            case 'forward':
                horizontal += magnatude;
                break;
            case 'down':
                depth += magnatude;
                break;
            case 'up':
                depth -= magnatude;
                break;
            default:
                console.error(`invalid direction: ${direction}`);
        }
    }

    console.log('horizontal position:', horizontal);
    console.log('depth:', depth);
    console.log('product:', horizontal * depth);
}

export {
    setCourse
}
