// Description:
//   Script for få dagens middag på diverse kantiner på NTNU
//   Burde også si i fra hvis det ikke er noe mat i dag
//
// Commands:
//   hubot hva er dagens middag på <kantine>

const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');


const kantineURL = 'https://www.sit.no/middag/';

module.exports = function (robot) {
  robot.respond(/hva er dagens middag på (\w+)/, function (res) {
    const kantine = res.match[1];
    const url = kantineURL + kantine;

    //hent websiden med kantineinfoen
    request(url, function (error, response, htmlBody) {
      //vi bryr oss bare om htmlBody her

      //code here

    });
  });
};

//Under finner du hjelpefunksjoner du kan bruke


// Funksjon for å hente ut kantinematteksten fra html-koden
// Du trenger å sende inn dagens ukedag som et tall her
// Hint: Bruk moment for å finne ukedagen
function hentKantineMatenFraHTML(htmlBody, ukedag = 0) {
  const $ = cheerio.load(htmlBody); //hjelpebiblotek for å enklere lese html-siden

  const mat = $('.dishes__container .dishes__week .dishes__dishes'); // henter ut maten

  const dagensMat = $(mat.get(ukedag)).text();

  //kantinemat-teksten er ganske rotete, derfor må vi rydde den litt
  return ryddOppKantineMatTeksten(dagensMat);
}

function ryddOppKantineMatTeksten(tekst) {
  //regex magi
  return tekst
    .replace(/ +(?= )/g, '')
    .replace(/^\s*[\r\n]/gm, "\n")
    .replace(/^ +/gm, '').trim();
}
