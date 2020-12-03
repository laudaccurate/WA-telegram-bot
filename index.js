const request = require('request');

const TelegramBot = require('node-telegram-bot-api');
const token = '1371738365:AAGbyPADkB_bUocs1Z_vdlR-enKz9Mxo3yE';
var bot = new TelegramBot(token, {polling: true});

bot.onText(/\/movie (.+)/, function(msg, match) {
  var chatId = msg.chat.id;
  var movie = match[1];

  request(`http://www.omdbapi.com/?apikey=c09a0ce4&t=${movie}`, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      bot.sendMessage(chatId, "_Looking for _ " + movie + "...", {parse_mode: 'Markdown'})
      .then(function(msg) {
        var res = JSON.parse(body);
        bot.sendPhoto(chatId, res.Poster, {caption: 'Result: \nTitle: ' + res.Title + '\nYear: ' + res.Year + '\nRated: ' + res.Rated + '\nReleased: ' + res.Released});
      })

    }
  })
});