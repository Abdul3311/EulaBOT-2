const registerSessionHandle = require("./register-session-handle");
const {tambahUser} = require('./user-handle.js')
const kenalan = async(client, message) =>{
    const {namaBot, owner, nomorOwner, trigger} = require("../pengaturan.json");
    const isiPesan = (message.body);
    const arrIsiPesan = isiPesan.toLowerCase().split(" ");
    const command = arrIsiPesan.slice(0,1).toString();
    const eulawangi = arrIsiPesan.slice(1).toString().replaceAll(","," ");
    const ayakawangi = (message.body).split(" ").slice(1).toString().replaceAll(","," ");
    const chat = await message.getChat();
    const kontak = await message.getContact();
    const nomor = kontak.number;
    const lowerIsiPesan = isiPesan.toLowerCase();
    const dialog = require("./register-dialog.json");
    let loop = true;
    let nama, gender, umur, hobi;
    let statusAmbilData = await registerSessionHandle.cekAmbilData(nomor);
    let statusJawabSalah = await registerSessionHandle.cekWrongAnswer(nomor);
    let dataAvailable = await registerSessionHandle.returnDataUser(nomor);
    if(dataAvailable == false){
        await registerSessionHandle.addSessionRegister(nomor);
    }

    let statusNama = await registerSessionHandle.cekCompleteNama(nomor);
    let statusGender = await registerSessionHandle.cekCompleteGender(nomor);
    let statusUmur = await registerSessionHandle.cekCompleteUmur(nomor);
    let statusHobi = await registerSessionHandle.cekCompleteHobi(nomor);
    //console.log("status nama : "+statusNama);
    //console.log("Pesan : "+isiPesan)

    if(statusNama == false){
        if(statusAmbilData == false){
            chat.sendMessage(dialog.tanyaNama1Msg1v1 + " "+namaBot+" "+dialog.tanyaNama1Msg1v2);
            chat.sendMessage(dialog.tanyaNama1Msg2);
            await registerSessionHandle.ambilDataTrue(nomor);
        }else{
            if(lowerIsiPesan == "nama" || lowerIsiPesan == "name" || lowerIsiPesan == "jeneng" || lowerIsiPesan == "manusia" || lowerIsiPesan.includes('wong') || lowerIsiPesan.includes("orang") || lowerIsiPesan.includes("kontol") || lowerIsiPesan.includes("memek") || lowerIsiPesan.includes("saya") || lowerIsiPesan.includes("namaku") || lowerIsiPesan.includes("makhluk") || lowerIsiPesan.includes("kenal") || lowerIsiPesan.includes("nama aku")){
                if(statusJawabSalah == false){
                    chat.sendMessage(dialog.jawabNamaSalah1Msg1);
                    chat.sendMessage(dialog.jawabNamaSalah1Msg2);
                    await registerSessionHandle.wrongAnswerTrue(nomor);
                }else{
                    const pilihJawab = [dialog.jawabNamaSalah2Msg1,dialog.jawabNamaSalah3Msg1,dialog.jawabNamaSalah4Msg1,dialog.jawabNamaSalah5Msg1];
                    const rand = Math.floor(Math.random() * pilihJawab.length);
                    chat.sendMessage(pilihJawab[rand]);
                }
            }else{
                if(isiPesan.includes(trigger)){
                    nama = isiPesan.replaceAll(trigger,"")
                }else{
                    nama = isiPesan
                }
                const setNama = await registerSessionHandle.completingNama(nomor, nama);
                await registerSessionHandle.wrongAnswerFalse(nomor);
                if(setNama != false){
                    chat.sendMessage(dialog.jawabNamaBenar1Msg1);
                    chat.sendMessage(dialog.tanyaGender1Msg1);
                }else{
                    chat.sendMessage("*"+namaBot+"*\n\nSistemnya lagi error, Kamu bilang langsung aja ke adminnya.");
                    chat.sendMessage("Bukannya gak mau ya, tapi emang gabisa nih sistemnya😒");
                }
            }
        }
    }else if(statusGender == false){
        if(statusAmbilData == false){
            chat.sendMessage(dialog.tanyaGender1Msg1);
            await registerSessionHandle.ambilDataTrue(nomor);
        }else{
            if(lowerIsiPesan == "l"){
                chat.sendMessage(dialog.jawabGenderBenar1Msg1);
                chat.sendMessage(dialog.tanyaUmur1msg1);
                const setGender = await registerSessionHandle.completingGender(nomor, "L");
                await registerSessionHandle.wrongAnswerFalse(nomor);
            }else if(lowerIsiPesan == "p"){
                chat.sendMessage(dialog.jawabGenderBenar2Msg1);
                chat.sendMessage(dialog.tanyaUmur1msg1);
                await registerSessionHandle.completingGender(nomor, "P");
                await registerSessionHandle.wrongAnswerFalse(nomor);
            }else{
                if(statusJawabSalah == false){
                    chat.sendMessage(dialog.jawabGenderSalah1Msg1);
                    await registerSessionHandle.wrongAnswerTrue(nomor);
                }else{
                    const salahJawab = [dialog.jawabGenderSalah2Msg1,dialog.jawabGenderSalah3Msg1,dialog.jawabGenderSalah4Msg1];
                    const rand = Math.floor(Math.random() * salahJawab.length);
                    chat.sendMessage(salahJawab[rand]);
                }
            }
        }
    }else if(statusUmur == false){
        if(statusAmbilData == false){
            chat.sendMessage(dialog.tanyaUmur1msg1);
            await registerSessionHandle.ambilDataTrue(nomor);
        }else{
            if(isiPesan.includes(1) || isiPesan.includes(2) || isiPesan.includes(3) || isiPesan.includes(4) || isiPesan.includes(5) || isiPesan.includes(6) || isiPesan.includes(7) || isiPesan.includes(8) || isiPesan.includes(9)){
                if(parseInt(isiPesan) < 14){
                    chat.sendMessage(dialog.jawabUmurBenar1Msg1+" "+isiPesan+" Tahun 😊");
                    chat.sendMessage(dialog.tanyaHobi1Msg1);
                    await registerSessionHandle.completingUmur(nomor, isiPesan);
                    await registerSessionHandle.wrongAnswerFalse(nomor);
                }else if(parseInt(isiPesan) >= 14 && parseInt(isiPesan) < 35){
                    chat.sendMessage(dialog.jawabUmurBenar2Msg1+" "+isiPesan+" Tahun");
                    chat.sendMessage(dialog.jawabUmurBenar2Msg2);
                    chat.sendMessage(dialog.tanyaHobi2Msg1);
                    await registerSessionHandle.completingUmur(nomor, isiPesan);
                    await registerSessionHandle.wrongAnswerFalse(nomor);
                }else if(parseInt(isiPesan) >= 35 && parseInt(isiPesan) < 90){
                    chat.sendMessage(dialog.jawabUmurBenar3Msg1+" "+isiPesan+" Tahun 😊");
                    chat.sendMessage(dialog.tanyaHobi2Msg1);
                    await registerSessionHandle.completingUmur(nomor, isiPesan);
                    await registerSessionHandle.wrongAnswerFalse(nomor);
                }else{
                    chat.sendMessage("kamuuu, ngisi umur yang bener dongg!");
                } 
            }else{
                if(statusJawabSalah == false){
                    chat.sendMessage(dialog.jawabUmurSalah1Msg1);
                    chat.sendMessage(dialog.jawabUmurSalah1Msg2);
                    await registerSessionHandle.wrongAnswerTrue(nomor);
                }else{
                    const salahJawaban = [dialog.jawabUmurSalah2Msg1,dialog.jawabUmurSalah3Msg1,dialog.jawabUmurSalah4Msg1];
                    const rand = Math.floor(Math.random() * salahJawaban.length);
                    chat.sendMessage(salahJawaban[rand]);
                }
            }
        }
    }else if(statusHobi == false){
        if(statusAmbilData == false){
            chat.sendMessage(dialog.tanyaHobi1Msg1);
            await registerSessionHandle.ambilDataTrue(nomor);
        }else{
            if(lowerIsiPesan.includes('kamu') || lowerIsiPesan.includes('eula') || lowerIsiPesan.includes('mencintaimu') || lowerIsiPesan.includes('menyukaimu') || lowerIsiPesan.includes('menyayangimu')){
                if(statusJawabSalah == false){
                    chat.sendMessage(dialog.jawabHobiSalah1Msg1);
                    await registerSessionHandle.wrongAnswerTrue(nomor);
                }else{
                    const salahJawab = [dialog.jawabHobiSalah2Msg1,dialog.jawabHobiSalah3Msg1,dialog.jawabHobiSalah4Msg1];
                    const rand = Math.floor(Math.random() * salahJawab.length);
                    chat.sendMessage(salahJawab[rand]);
                }
            }else{
                chat.sendMessage("Jadi hobimu "+isiPesan);
                await registerSessionHandle.completingHobi(nomor, isiPesan);
                await registerSessionHandle.wrongAnswerFalse(nomor);
                const userData = await registerSessionHandle.returnDataUser(nomor);
                const MoveUserData = await tambahUser(nomor, userData.completeNama, userData.completeGender, userData.completeUmur, userData.completeHobi);
                if(MoveUserData != false){
                    const deleteTempData = await registerSessionHandle.deleteSessionRegister(nomor);
                    if(deleteTempData != false){
                        chat.sendMessage(dialog.registrasiSelesai+" kamu bisa ketik "+trigger+"menu buat mulai");
                    }
                }else{

                }
            }
        }
    }else{
        
    }
    
}

module.exports = {kenalan}