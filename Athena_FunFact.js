// read tips.json
// const tips = require('tips.json'); @Athena: require is a method in the node.js framework, not plain js,
// feel free to ask me for help for loading in a json file

async function getRandomFunFact() {
    funFactsUrl = chrome.runtime.getURL('tips.json');
    var funFactsFile = {};
    funFactsFile = await fetch(funFactsUrl).then(res=>{return res.json()}).then(data=> funFactsFile = data);
    let keywordId = Math.floor(Math.random() * funFactsFile.allKeywords.length);
    let keyword = funFactsFile.allKeywords[keywordId];
    let funFactId = Math.floor(Math.random() * funFactsFile.keywords[keyword].length);
    return funFactsFile.keywords[keyword][funFactId];
}