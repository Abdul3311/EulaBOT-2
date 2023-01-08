const fs = require("fs");

const addSession = async(noPengirim, noPenerima, namaPengirim) => {
    let json = await fs.readFileSync("./menfess/menfess-session.json","utf-8");
    let array = JSON.parse(json);
    const defaultSession = {"nomorPengirim":noPengirim,"nomorPenerima":noPenerima,"namaPengirim":namaPengirim,"statusBalas":false};
    array.push(defaultSession);
    json = JSON.stringify(array);
    await fs.writeFileSync("./menfess/menfess-session.json",json,"utf-8");
    return(true)
}

const hapusSession = async(nomor) => {
    let json = await fs.readFileSync("./menfess/menfess-session.json","utf-8");
    let array = JSON.parse(json);
    let jumlahArray = array.length;
    for(let a=0;a<jumlahArray;a++){
        if(array[a]["nomor"] == nomor){
            array.splice(a,1);
            json = JSON.stringify(array);
            await fs.writeFileSync("./menfess/menfess-session.json",json,"utf-8");
            return(true)
        }
    }
    return(false)
}

const cekPengirim = async(nomor) => {
    let json = await fs.readFileSync("./user/register-session.json","utf-8");
    let array = JSON.parse(json);
    let jumlahUser = array.length;
    for(let a=0;a<jumlahUser;a++){
        if(array[a]["nomor"] == nomor){
            return(array[a]['nomorPengirim']);
        }
    }
    return(false);
}

const cekPenerima = async(nomor) => {
    let json = await fs.readFileSync("./user/register-session.json","utf-8");
    let array = JSON.parse(json);
    let jumlahUser = array.length;
    for(let a=0;a<jumlahUser;a++){
        if(array[a]["nomor"] == nomor){
            return(array[a]['nomorPenerima']);
        }
    }
    return(false);
}

module.exports = {addSession, hapusSession, cekPenerima, cekPengirim}