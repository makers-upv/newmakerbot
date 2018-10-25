/*---------------------------------------------------------------------------
           BOT BIENVENIDA PARA NUEVOS SOCIOS DE MakersUPV
Este bot permite facilitar la entrada de un nuevo miembro al grupo de MakersUPV
para ello le da la bienvenida y le invita a realizar un cuestionario de
bienvenida.

Creación y matenimiento: Jaime Laborda - jaimelaborda@gmail.com
----------------------------------------------------------------------------*/

const Telegraf = require("telegraf");
const token = "BotFather_token_goes_here";
const bot = new Telegraf(token);

bot.command("testbot", ctx => {
  const nombre = ctx.from.first_name;
  ctx.reply("Hola " + nombre + ", estoy vivo!");
});

const ranapepe = [
  "CAADBAADOQ4AAjZHEwABYUGtfJvIDiAC",
  "CAADBAADbAYAAjZHEwABe0Wm_QNyWgcC",
  "CAADBAADXgYAAjZHEwAB-2vZhZcVhRMC",
  "CAADBAADhAYAAjZHEwABY_4JnOLbxX0C",
  "CAADBAADhgYAAjZHEwABp_fhAiD4_GEC",
  "CAADBAADdgYAAjZHEwABx9tJw309ZgABAg",
  "CAADBAADXAYAAjZHEwABabKzEznrA-wC",
  "CAADBAADWAYAAjZHEwABHT5IHCj5Tt4C",
  "CAADBAADxw8AAjZHEwAB2twhZ_iM-jwC",
  "CAADBAADfgYAAjZHEwABqUjJxUJ9ifgC",
  "CAADBAADgAYAAjZHEwABbgj3xbMopMcC"
];

bot.command("ranapepe", ctx => {
  const chatId = ctx.chat.id;
  const random = Math.floor(Math.random() * ranapepe.length); //Del 0 al 10
  console.log("Random: " + random);
  ctx.telegram.sendSticker(chatId, ranapepe[random]);
});

//Cuando un nuevo usuario
bot.on("new_chat_members", ctx => {
  console.log(ctx.message.new_chat_participant);

  const isBot = ctx.message.new_chat_participant.is_bot;
  if (isBot) return;

  const nombre = ctx.message.new_chat_participant.first_name;
  const apellido = ctx.message.new_chat_participant.last_name;
  const username = ctx.message.new_chat_participant.username;

  ctx.reply(`¡Hola @${username}!, bienvenido al grupo de MakersUPV.`);
  ctx.reply(`🤖 CUESTIONARIO DE BIENVENIDA PARA NUEV@S MAKERS 🤖
 (respondiendo este formulario ganarás mil minipuntos makers)
Nombre: ${nombre} ${apellido || ""}
Apodo:
Estudio...:
¿Qué quiero crear?:
¿Cuáles son mis súperpoderes?:
¿Qué quiero aprender en MakersUPV?:
¿Qué son 8 bocabits?:
¿Cuack?

IMPORTANTE
No te olvides rellenar la EMA: https://goo.gl/forms/N8yXa4ApPrmqVbOm1


Una vez terminado este ritual pasarás a ser aceptado por parte del resto de la comunidad! ✨`);
});

bot.startPolling();
