const Telegraf = require('telegraf')
const fs = require("fs")

const bot = new Telegraf("1024637003:AAElOJ2439dAKhp-_FglPFSC__lQTrS5y2s")
bot.start((ctx) => ctx.reply('Hmm... I think I know you 🤔!\n\nJazmin, is it You?', testMenu))
// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.hears('sendphone', (ctx) => {
  ctx.reply('Send me your number please')
})

bot.on('contact', (ctx) => {
  console.log(ctx.update.message.contact.phone_number)
  return ctx.reply('Hello')
})

let sendStupid = false

// bot.use((ctx) => {
//   console.log(ctx)
// })


// Menu
const testMenu = Telegraf.Extra
  // .markdown()
  .markup((m) => {
    return m.inlineKeyboard([
      [m.callbackButton("Yes, it's me, Jazmine", 'test')],
      [m.callbackButton('No, sorry', 'test2')]
    ])
  })

bot.hears(/.*/, (ctx) => {
  if(ctx.update.message.from.username == 'queridajazmin' && sendStupid) {
    setTimeout(() => ctx.reply('Sorry, Jazmin, I`m too stupid to understand this. Could you ask Misha make me smarter, please?☺️'), 4000)
  } else {
    setTimeout(() => ctx.reply('I don`t want speak with you'), 4000)
  }
  let { username, first_name, last_name, id } = ctx.update.message.from
  console.log('\n new message >>>', ctx.match[0], `${username} ${first_name} ${last_name} ${id}`)
  let text = `\n>>>>\nnew message: ${ctx.match[0]}\nFrom: ${username} ${first_name} ${last_name}\n<<<<\n`
  fs.appendFileSync("hello.txt", text)
})


bot.action('test', (ctx) => {
  if(ctx.update.callback_query.from.username == 'queridajazmin') {
    sendStupid = true
    ctx.reply('Oh! Hi, beuty😏') 
    setTimeout(() => ctx.reply('😘'), 1500)
    setTimeout(() => ctx.reply('Did you sleep well?'), 5000)
  } else {
    ctx.reply('Go away, liar')
    ctx.reply('😡')
  }
})

bot.action('test2', (ctx) => ctx.reply('Who are you and what are you doing here?')) 

bot.launch()
