// read tips.json
// const tips = require('tips.json'); @Athena: require is a method in the node.js framework, not plain js,
// feel free to ask me for help for loading in a json file

//set global variables

async function findCategory(){
    funFactsUrl = chrome.runtime.getURL('tips.json');
    var funFactsFile = {};
    funFactsFile = await fetch(funFactsUrl).then(res=>{return res.json()}).then(data=> funFactsFile = data);

    var title = document.getElementById('productTitle').innerHTML;
    var words = title.trim().toLowerCase().replace(/[^a-zA-Z ]/g, "").split(' ');
    var allKeys = funFactsFile.allKeywords;

    console.log(words);

    let exist = false;
    let word = "";
    for(i = 0; i < words.length; i++){
        word = words[i];
        exist = allKeys.includes(word);
        if (exist == true){
            break;
        }
    }

    let funfact = {};
    if(exist == true){
        getFact(word).then(res => {funfact = res});
    }
    else{
        getRandomFunFact().then(res => {funfact = res});
    }

    return funfact;
}

async function getRandomFunFact() {
    funFactsUrl = chrome.runtime.getURL('tips.json');
    var funFactsFile = {};
    funFactsFile = await fetch(funFactsUrl).then(res=>{return res.json()}).then(data=> funFactsFile = data);
    //generate random fun facts if product not exist in tips
    let keywordId = Math.floor(Math.random() * (funFactsFile.allKeywords.length -1));
    let keyword = funFactsFile.allKeywords[keywordId];
    let funFactId = Math.floor(Math.random() * (funFactsFile.keywords[keyword].length -1));
    return funFactsFile.keywords[keyword][funFactId];
}

async function getFact(word){
    //generate fun facts according to matched category in tips
    funFactsUrl = chrome.runtime.getURL('tips.json');
    var funFactsFile = {};
    funFactsFile = await fetch(funFactsUrl).then(res=>{return res.json()}).then(data=> funFactsFile = data);

    let keyword = word;
    let funFactId = Math.floor(Math.random() * (funFactsFile.keywords[keyword].length - 1));
    return funFactsFile.keywords[keyword][funFactId];
}
