const fs = require("fs");

const tambahUser = async(nomor, nama, gender, umur, hobi) => {
    const userAvailable = await cekUser(nomor);
    if(userAvailable == false){
        const defaultUser = {"nomor":nomor,"nama":nama,"gender":gender,"umur":umur,"hobi":hobi,"admin":false,"banned":false,"hit":0,"poin":200};
        let userJson = await fs.readFileSync("./user/user-account.json","utf-8");
        let userArray = JSON.parse(userJson);
        userArray.push(defaultUser);
        userJson = JSON.stringify(userArray);
        fs.writeFileSync("./user/user-account.json",userJson,"utf-8");
        return(true);
        //add function to create gacha default data
    }else{
        return(false);
    }
}

const cekUser = async(nomor) => {
    let userJson = await fs.readFileSync("./user/user-account.json","utf-8");
    let userArray = JSON.parse(userJson);
    let jumlahUser = userArray.length;
    let found=false;
    for(let a=0;a<jumlahUser;a++){
        if(userArray[a]["nomor"] == nomor){
            found = userArray[a];
        }
    }
    if(found){
        return(found);
    }else{
        return(false)
    }
}

const gantiNama = async(nomor, namaBaru) => {
    let userJson = await fs.readFileSync("./user/user-account.json","utf-8");
    let userArray = JSON.parse(userJson);
    let jumlahUser = userArray.length,found=false;
    for(let a=0;a<jumlahUser;a++){
        if(userArray[a]["nomor"] == nomor){
            userArray[a]['nama'] = namaBaru
            found=true
        }
    }
    if(found == true){
        userJson = JSON.stringify(userArray);
        fs.writeFileSync("./user/user-account.json",userJson,"utf-8");
        return(true)
    }else{
        return(false);
    }

}




module.exports = {cekUser,gantiNama, tambahUser}