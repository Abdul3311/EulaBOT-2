const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia, ChatTypes } = require('whatsapp-web.js');
const axios = require ('axios');
const fs = require('fs');
const {namaBot, trigger, callImg, callMsg, nomorOwner} = require('./pengaturan.json');
const {kenalan} = require("./user/register-message-handle");
const userHandle = require("./user/user-handle");
const registerSessionHandle = require("./user/register-session-handle")

const client = new Client({
    puppeteer: {
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        
    },
    authStrategy: new LocalAuth({ clientId: "EULAWANGI" }),
    ffmpegPath: 'C:/ffmpeg/bin/ffmpeg.exe'
    
});

client.on('qr', qr => {
    console.log('Scan QR Code');
    qrcode.generate(qr, {small: true});
});

client.on('authenticated', () => {
    console.log('log : Autentikasi '+ namaBot+' Berhasil');
});

client.on('ready', () => {
    console.log('log : '+namaBot+' siap Dipakai!');
});

client.initialize();

client.on('incoming_call', async call => {
    const media = await MessageMedia.fromUrl(botCallImgUrl);
    client.sendMessage(call.from, media, {caption : botCall});
    console.log('log : Ada yang nelpon woi');
    
});

client.on('message', async message => {

    //kenalan(client, message);
});

