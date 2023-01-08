const {cekUser, gantiNama} = require('./user/user-handle.js');
const {addSessionRegister, deleteSessionRegister, cekCompleteNama, completingNama, cekCompleteGender, completingGender, cekCompleteUmur,completingUmur, cekCompleteHobi, completingHobi, cekAmbilData, ambilDataTrue, ambilDataFalse, returnDataUser} = require('./user/register-session-handle');
const run = async()=> {
    const res = await cekCompleteGender("62895395391278");
    console.log(res);
}

run()