/*---------------------------------------------------------------------------
           BOT BIENVENIDA PARA NUEVOS SOCIOS DE MakersUPV
Este bot permite facilitar la entrada de un nuevo miembro al grupo de MakersUPV
para ello le da la bienvenida y le invita a realizar un cuestionario de
bienvenida.

Creación y matenimiento: Jaime Laborda - jaimelaborda@gmail.com
----------------------------------------------------------------------------*/

require("dotenv").config();
const Telegraf = require("telegraf");
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(token);

bot.command("testbot", ctx => {
  const { first_name } = ctx.from;
  ctx.reply("Hola " + first_name + ", estoy vivo!");
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

const preguntas = [
  "¿Que son 8 bocabits?: ",
  "Razona, ¿Edison o Tesla?: ",
  "¿Cual es la gran respuesta del universo?: ",
  "¿Cual es el Hola Mundo de Arduino?: ",
  "Si tiramos una piedra roja en el mar azul, ¿qué le pasará?: ",
  "¿1 + 1 = 10?: ",
  "¿Qué es Arduino?: ",
  "¿Quien es David Cuartielles?: "
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

  const {
    first_name,
    last_name,
    username,
    is_bot
  } = ctx.message.new_chat_participant;
  if (is_bot) return;

  ctx.reply(`¡Hola @${username}!, bienvenido al grupo de MakersUPV.`);
  ctx.reply(`🤖 CUESTIONARIO DE BIENVENIDA PARA NUEV@S MAKERS 🤖
 (respondiendo este formulario ganarás mil minipuntos makers)
Nombre: ${first_name} ${last_name || ""}
Apodo:
Estudio...:
¿Qué quiero crear?:
¿Cuáles son mis súperpoderes?:
¿Qué quiero aprender en MakersUPV?:
`
+
//Random questions
preguntas[Math.floor(Math.random() * preguntas.length)]+`
`+
preguntas[Math.floor(Math.random() * preguntas.length)]
+
`

IMPORTANTE
No te olvides rellenar la EMA: https://goo.gl/forms/N8yXa4ApPrmqVbOm1


Una vez terminado este ritual pasarás a ser aceptado por parte del resto de la comunidad! ✨`);
});

bot.startPolling();
