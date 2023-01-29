const fs = require("fs");
const { ChatTypes } = require("whatsapp-web.js");

const logfitur = async(nomor, nama, fitur, grup, link) => {
    if(nomor, nama, fitur){
        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hour = ("0" + date_ob.getHours()).slice(-2);;
        let minutes = ("0" + date_ob.getMinutes()).slice(-2);
        let second = ("0" + date_ob.getSeconds()).slice(-2);
        const tanggalSekarang = date+""+month+""+year;
        const jamSekarang = hour+""+minutes+""+second;
        const waktuSekarang = jamSekarang+"_"+tanggalSekarang;
        let grrup, linkk;
        if(grup == false){grrup = " - Private Chat"}else{grrup = " - Group "+grup}
        let isi = await fs.readFileSync("./log/log-fitur.txt","utf-8");
        isi = isi + waktuSekarang+" -> "+nomor+" - "+nama+" Request "+fitur+grrup+" - "+link+"\n";
        await fs.writeFileSync("./log/log-fitur.txt",isi,"utf-8");
        console.log("log : "+nama+" Request "+fitur);
        return(true)
    }
}

const logchat = async(nomor, nama, grup, chat) =>{
    
}

module.exports = {logfitur}