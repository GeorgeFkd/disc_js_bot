//TODO GLOBAL AN XREIASTEI

module.exports = {
    updateXP(userID,points){
        const newpoints = global.XP.get(userID) + points;
        global.XP.set(userID,newpoints)
        //for collection[map] reasons it looks like this
    }
}