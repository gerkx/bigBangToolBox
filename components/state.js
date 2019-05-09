function state() {
    const stateObj = {};
    const findActiveKey = () => {
        Object.keys(stateObj).find(key => key === true)
    }
    const setInitState = list => list.reduce( (accum, val, idx) => {
        if(idx == 0) { accum[val] = true }else{ accum[val] = false}
        return accum
    }, {});
    return {
        setState: function(key, value){
            stateObj[key.toLowerCase()] = value
        },
        init: list => {
            list.map( (item, idx) => {
                if(idx == 0) { stateObj[item] = true }else{ stateObj[item] = false}
            });
        },
        getActive: () => {
            return Object.keys(stateObj).find(key => stateObj[key] === true)
        },
        val: stateObj,
    }
}

module.exports = state()
