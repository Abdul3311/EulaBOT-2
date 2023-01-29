const {tambahUser} = require("./gacha/gacha-handle");
const run = async()=> {
    for(let a=0;a<1;a++){
        const res = await tambahUser("6285608689687",1);
        //console.log(res);
    }
}

run()