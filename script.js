let keyword = "Coffee";

async function buildSidebar(productList, funfact) {
    // get logo
    let whiteLogoURL = chrome.runtime.getURL('images/logo-white-27x27.svg');
    let blackLogoURL = chrome.runtime.getURL('images/logo-black-27x27.svg');
    let sidebarUrl = chrome.runtime.getURL('sidebar.html');
    let mainButtonHTML = document.createElement('div');
    await fetch(sidebarUrl).then(res=>res.text()).then(data=> mainButtonHTML.innerHTML = data);
    mainButtonHTML.getElementsByClassName('fixed-button')[0].firstChild.nextSibling.setAttribute('src', whiteLogoURL);
    mainButtonHTML.getElementsByClassName('logo-with-name')[0].firstChild.nextSibling.setAttribute('src', blackLogoURL);
    
    // display matching products
    var productItemsHTML = '';
    if (productList.length === 0) {
        productItemsHTML = 'No products found.';
        return;
    } 

    for(let i = 0; i < productList.length; i++) {
        res = productList[i];
        console.log(res);
        productItemsHTML = `${productItemsHTML}
        <div class="product-item">
            <img src="${res.image}" style="height: 150px"/>
            <div class="description">
                <p class="a-text">${res.title.slice(0, 50) + '...'}</p>
                <p>
                    <b>${res.price}</b>
                    <span 
                        class="a-icon a-icon-prime" 
                        role="img" 
                        aria-label="Free Shipping for Prime Members">
                    </span>
                </p>
                <div class="a-rating">
                    <i class="a-icon a-icon-star a-star-4-5">
                        <span class="a-icon-alt">${res.rating}</span>
                    </i>
                </div>
            </div>
        </div>
        `
    }
    
    mainButtonHTML.getElementsByClassName('row')[0].innerHTML = productItemsHTML;

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

async function getProductLinksByKeyword(keyword) {
    let productsURL = chrome.runtime.getURL('products.json');
    let productData = {};
    await fetch(productsURL).then(res => res.json()).then(data => productData = data);
    return productData[keyword].reduce((acc, x) => {console.log(x.link); return [...acc, x.link];}, []);
}

let mainButtonHTML = document.createElement('div');
let currURL = window.location.toString();

let funFacts = {}

getRandomFunFact().then(
    res => {funFacts = res}
);

let products = []
getProductLinksByKeyword(keyword).then(
    res => {
        products = res.reduce((acc, x) => [...acc, getSponsoredProductFromUrl(x)], [])
    }
).then(
    () => {
        Promise.all(products).then(
            (res) => {
                buildSidebar(res, funFacts);
            }
        );
    }
)




document.getElementById('price')
    .insertAdjacentElement(
        'beforebegin', 
        mainButtonHTML
    );