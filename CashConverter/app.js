const puppeteer = require('puppeteer-extra');
const readlineSync = require('readline-sync');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const NtpTimeSync = require("ntp-time-sync").NtpTimeSync;

console.log('Iniciando bot');

puppeteer.use(StealthPlugin());

async function robo() {
   const browser = await puppeteer.launch({ headless: false });
   const page = await browser.newPage();
   const moedaBase = readlineSync.question('Informe uma moeda base: ') || 'dolar';
   const moedaFinal = readlineSync.question('Informe uma moeda desejada:') || 'real';

   const qualquerUrl = `https://www.google.com/search?q=${moedaBase}+para+${moedaFinal}&oq=${moedaBase}+para+${moedaFinal}&aqs=chrome.0.69i59j0l7.1726j0j4&sourceid=chrome&ie=UTF-8`;
   await page.goto(qualquerUrl);
   // await page.screenshot({path: 'example.png'});

   const resultado = await page.evaluate(() => {
       return document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value;
   });

   console.log(`1 ${moedaBase} at ${moedaFinal} its ${resultado}`)

   //await browser.close();
}

robo();