/*---------------------------------------------------------------------------
           BOT BIENVENIDA PARA NUEVOS SOCIOS DE MakersUPV
Este bot permite facilitar la entrada de un nuevo miembro al grupo de MakersUPV
para ello le da la bienvenida y le invita a realizar un cuestionario de
bienvenida.

Creación y matenimiento: Jaime Laborda - jaimelaborda@gmail.com
----------------------------------------------------------------------------*/

const Telegraf = require('telegraf');
const Token = 'BotFather_token_goes_here';

const ranapepe = ['CAADBAADOQ4AAjZHEwABYUGtfJvIDiAC', 'CAADBAADbAYAAjZHEwABe0Wm_QNyWgcC', 'CAADBAADXgYAAjZHEwAB-2vZhZcVhRMC', 'CAADBAADhAYAAjZHEwABY_4JnOLbxX0C', 'CAADBAADhgYAAjZHEwABp_fhAiD4_GEC', 'CAADBAADdgYAAjZHEwABx9tJw309ZgABAg', 'CAADBAADXAYAAjZHEwABabKzEznrA-wC', 'CAADBAADWAYAAjZHEwABHT5IHCj5Tt4C', 'CAADBAADxw8AAjZHEwAB2twhZ_iM-jwC', 'CAADBAADfgYAAjZHEwABqUjJxUJ9ifgC', 'CAADBAADgAYAAjZHEwABbgj3xbMopMcC'];

const bot = new Telegraf(Token);

bot.command('testbot', (ctx) => {
  var nombre = ctx.from.first_name;

  ctx.reply("Hola " + nombre + ", estoy vivo!");
});


bot.command('ranapepe', (ctx) => {
  var chatId = ctx.chat.id;
  var random = Math.floor(Math.random() * ranapepe.length); //Del 0 al 10

  console.log("Random: " + random);

  ctx.telegram.sendSticker(chatId, ranapepe[random]);

});


//Cuando un nuevo usuario
bot.on('new_chat_members', (ctx) => {
  console.log(ctx.message.new_chat_participant);
  var nombre = ctx.message.new_chat_participant.first_name;
  var apellido = ctx.message.new_chat_participant.last_name;
  var isBot = ctx.message.new_chat_participant.is_bot;

  if (apellido == null) {
    apellido = " ";
  }

  if (isBot) {
    //Do nothing
  } else {
    ctx.reply("¡Hola " + nombre + "!, bienvenido al grupo de MakersUPV.");
    ctx.reply("🤖 CUESTIONARIO DE BIENVENIDA PARA NUEV@S MAKERS 🤖\n (respondiendo este formulario ganarás mil minipuntos makers)\nNombre: " + nombre + " " + apellido + "\nApodo:\nEstudio...:\n¿Qué quiero crear?:\n¿Cuáles son mis súperpoderes?:\n¿Qué quiero aprender en MakersUPV?:\n¿Qué son 8 bocabits?:\n¿Cuack?\n\nIMPORTANTE\nNo te olvides rellenar la EMA: https://goo.gl/forms/N8yXa4ApPrmqVbOm1\n\n\nUna vez terminado este ritual pasarás a ser aceptado por parte del resto de la comunidad! :sparkles:");
  }
});

bot.startPolling();
