const franc = require("franc");
const langs = require("langs");
const colors = require("colors");

const input = process.argv[2];
//const langCode = franc('Alle menneske er fødde til fridom');
const langCode = franc(input);
if (langCode === "und") {
    console.log("Sorry, couldn't figure it out! Please try with more sample text!".red);
}
else {
    const res = langs.where("3", langCode);
    console.log(`Our guess is: ${res.name.rainbow}`);
}

