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

const enlace_ema = 'http://makersupv.com/ema'

bot.command("testbot", ctx => {
  const { first_name } = ctx.from;
  ctx.reply("Hola " + first_name + ", estoy vivo!");
});

{
  const commitSHA = require("child_process")
    .execSync("git rev-parse HEAD")
    .toString()
    .trim();
  const shortCommitSHA = commitSHA.slice(0, 7);
  const { version, name, homepage } = require("./package.json");
  const commitUrl = new (require("url")).URL(`commit/${commitSHA}`, homepage);
  bot.command("version", ctx => {
    ctx.reply(
      `${name} v${version}
Running commit [${shortCommitSHA}](${commitUrl})`,
      { parse_mode: "markdown" }
    );
  });
}

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
  "¿1 + 1 = 10?: "
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
    id,
    is_bot
  } = ctx.message.new_chat_participant;
  if (is_bot) return;

  /**
   * Semillas para preguntas aleatorias
   *
   * Para que no salga la misma en las dos, para la segunda semilla retiramos una de las
   * posibilidades. Si sale la misma en la primera y segunda, elegimos la posibilidad que
   * retiramos. Así siempre existe la misma probabilidad de escoger cada opción, y no creamos un
   * (posible) bucle infinito.
   */
  const seed1 = Math.floor(Math.random() * preguntas.length);
  let seed2 = Math.floor(Math.random() * (preguntas.length - 1));
  if (seed1 === seed2) seed2 = preguntas.length - 1;

  ctx.reply(
    // Esta es la forma correcta de mencionar a alguien que no tiene nombre de usuario
    // Sacado de https://core.telegram.org/bots/api#formatting-options
    `¡Hola [${first_name}](tg://user?id=${id})!, bienvenido al grupo de MakersUPV.`,
    { parse_mode: "markdown" }
  );
  ctx.reply(
    `🤖 CUESTIONARIO DE BIENVENIDA PARA NUEV@S MAKERS 🤖
 (respondiendo este formulario ganarás mil minipuntos makers)
Nombre: ${first_name} ${last_name || ""}
Apodo:
Estudio...:
¿Qué quiero crear?:
¿Cuáles son mis súperpoderes?:
¿Qué quiero aprender en MakersUPV?:
${preguntas[seed1]}
${preguntas[seed2]}

IMPORTANTE
No te olvides rellenar la EMA: ${enlace_ema}


Una vez terminado este ritual pasarás a ser aceptado por parte del resto de la comunidad! ✨`
  );
});

bot.startPolling();
