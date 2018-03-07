const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

var janji=0;var pesan=0;

//const app = new Telegraf('568826477:AAEubq_J8EKl4in5vW1YNDlrvZfULYMtiWM'); //sismod
//const app = new Telegraf('521458898:AAHa72gg-sC-PX_bUAMCtsQAx82A5g1FJbA'); //sidea
const app = new Telegraf('550237780:AAFPcgAjtgFGfr0w9cV0QHWbG0KBPa_KD0Y'); //eka

app.start((ctx) => {
  console.log('started:', ctx.from.first_name);
  ctx.reply(`Hi ${ctx.message.from.first_name} ${ctx.message.from.last_name}!`);
  ctx.reply("Saya Asira, Asisten Virtual milik Eka Yudhi Pratama. Jika Eka sedang sibuk, saya yang akan mebalas pesan anda.");
  return ctx.reply("gunakan /help untuk bantuan. :) -Asira-")
})

app.hears(['hi','hallo','hello'], ctx => {
      var ansq='Hi '+ctx.message.from.first_name+'!';
      return ctx.reply(ansq);
});

app.hears(['Asira'], ctx => {
  ctx.reply('Iya kenapa?')
});

app.hears(['ok','Ok'], ctx => {
    ctx.reply('Pesan sudah disimpan!')
});


app.command('buatjanji', (ctx)=>{
  ctx.reply("Buat janji untuk tanggal berapa?");
  janji =1;
})



app.command('help', (ctx) => {
    var name = ctx.from.first_name;
  return ctx.reply('<b>HELP:</b> Saat ini saya baru bisa membantu hal-hal ini. Insyaallah versi Asira berikutnya lebih baik lagi, tuan'+name+'  <i> Asira - Alpha version</i>', Extra.HTML().markup((m) =>
      m.inlineKeyboard([
      m.callbackButton('Buat janji', 'janji'),
      m.callbackButton('agenda eka', 'agenda'),
      m.callbackButton('Tinggalkan pesan', 'pesan')
    ])))
})


app.command('lampu', (ctx) => {
  return ctx.reply("/matikanlampu atau /nyalakanlampu, bosq?")
})



app.on('text', ctx => {
    if(janji==1){
        janji =2;
        return ctx.reply("Jam berapa?")
    }else if (janji==2){
        return ctx.reply("Oke, jadwal sudah Asira simpan. Tunggu kabar berikutnya!")
    }else if (pesan ==1) {
        ctx.reply("oke.. ada lagi pesan yang lain? Kalau cukup bilang 'ok' ya, tuan"+nama);
        console.log(ctx.message.text);
        return ctx.message.text;
    }
    else{
        ctx.reply("hmm.. Maafkan Asira kurang paham... Itu tidak ada di databse Asira.. Silahkan cek /help untuk daftar perintah.. :)");
        console.log(ctx.message.text);
        return ctx.message.text;
    }
})


app.catch((err) => {
  console.log('Ooops', err)
})

app.action(/.+/, (ctx) => {
console.log(ctx.callbackQuery);
  switch(ctx.callbackQuery.data) {
	case 'janji': ctx.reply("Ingin buat janji ketemu dengan tuan Eka?");ctx.reply("Silahkan /buatjanji");break;
	case 'pesan': ctx.reply("Silahkan tinggalkan pesan, jika sudah selesai katakan 'ok'. Saya akan kabari tuan Eka secepatnya.");pesan=1;break;
	case 'agenda': ctx.reply("Agenda tuan Eka minggu ini: Kamis malam ada penelitian chemcar, Jumat-Minggu ke Bekasi. ~kyaa,, minggu yang padat");break;
	default: ctx.reply("hmm..");
}


  return ctx.answerCbQuery();
})

app.startPolling();