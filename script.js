async function buildSidebar(resData, funfact) {
    // get logo
    let keyword = "Coffee";
    let whiteLogoURL = chrome.runtime.getURL('images/logo-white-27x27.svg');
    let blackLogoURL = chrome.runtime.getURL('images/logo-black-27x27.svg');
    let sidebarUrl = chrome.runtime.getURL('sidebar.html');
    let mainButtonHTML = document.createElement('div');
    await fetch(sidebarUrl).then(res=>res.text()).then(data=> mainButtonHTML.innerHTML = data);
    mainButtonHTML.getElementsByClassName('fixed-button')[0].firstChild.nextSibling.setAttribute('src', whiteLogoURL);
    mainButtonHTML.getElementsByClassName('logo-with-name')[0].firstChild.nextSibling.setAttribute('src', blackLogoURL);
    
    // display matching products
    var productItems = mainButtonHTML.getElementsByClassName('product-item');
    for(let i = 0; i < productItems.length; i++) {
        productItems[i].firstChild.nextSibling.setAttribute('src', resData.image);
        productItems[i].getElementsByClassName('a-text')[0].innerText = resData.title.slice(0, 50) + '...';
        productItems[i].getElementsByTagName('b')[0].innerText = resData.price;
        productItems[i].getElementsByClassName('a-icon-alt')[0].innerText = resData.rating;
    }

    // display keyword and fun facts
    mainButtonHTML.getElementsByClassName('keyword')[0].innerText = keyword;
    mainButtonHTML.getElementsByClassName('fun-fact-description')[0].innerText = funfact.description;
    mainButtonHTML.getElementsByClassName('fun-fact-source')[0].setAttribute('href', funfact.source);
    document.getElementById('price')
        .insertAdjacentElement(
            'beforebegin', 
            mainButtonHTML
    );
}

async function getSponsoredProductFromUrl(url) {
    var sponsoredProductHtml = '';
    sponsoredProductHtml = await fetch(url).then(res=>res.text()).then(data=> sponsoredProductHtml = data);
    let data = {};
    let parser = new DOMParser();
    let sponsoredProductElement = parser.parseFromString(sponsoredProductHtml, 'text/html');
    data['title'] = sponsoredProductElement.getElementById('productTitle').innerText.trim();
    data['image'] = sponsoredProductElement.getElementById('imgTagWrapperId').firstChild.nextSibling.getAttribute('src').trim();
    data['price'] = sponsoredProductElement.getElementById('priceblock_saleprice') ? sponsoredProductElement.getElementById('priceblock_saleprice').innerText : sponsoredProductElement.getElementById('priceblock_ourprice').innerText;
    data['rating'] = sponsoredProductElement.getElementById('acrPopover').innerText.trim();
    data['url'] = url;
    return data;
}

let mainButtonHTML = document.createElement('div');
let currURL = window.location.toString();
let funFacts = {}

getRandomFunFact().then(
    res => {funFacts = res}
);

getSponsoredProductFromUrl(currURL).then(
    res => { 
        buildSidebar(res, funFacts);
    }
);

document.getElementById('price')
    .insertAdjacentElement(
        'beforebegin', 
        mainButtonHTML
    );