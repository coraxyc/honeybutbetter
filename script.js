async function buildSidebar(resData) {
    // get logo
    let whiteLogoURL = chrome.runtime.getURL('images/logo-white-27x27.svg');
    let blackLogoURL = chrome.runtime.getURL('images/logo-black-27x27.svg');
    let sidebarUrl = chrome.runtime.getURL('sidebar.html');
    let mainButtonHTML = document.createElement('div');
    mainButtonHTML.setAttribute('id', 'honeycomb');
    await fetch(sidebarUrl).then(res=>res.text()).then(data=> mainButtonHTML.innerHTML = data);
    /*let resData = {
        'title': 'Test',
        'image': 'https://images-na.ssl-images-amazon.com/images/I/81%2BHtDnUzyL._AC_SX466_.jpg',
        'rating': '4.9/5',
        'price': 13.99,
        'url': 'https://www.example.com'
    }*/
    mainButtonHTML.getElementsByClassName('container')[0].firstChild.nextSibling.setAttribute('src', whiteLogoURL);
    mainButtonHTML.getElementsByClassName('logo-with-name')[0].firstChild.nextSibling.setAttribute('src', blackLogoURL);
    var productItems = mainButtonHTML.getElementsByClassName('product-item');
    for(let i = 0; i < productItems.length; i++) {
        productItems[i].firstChild.nextSibling.setAttribute('src', resData.image);
        productItems[i].getElementsByClassName('a-text')[0].innerText = resData.url;
        productItems[i].getElementsByTagName('b')[0].innerText = resData.price;
        productItems[i].getElementsByClassName('a-icon-alt')[0].innerText = resData.rating;
    }

    document.getElementById('price')
        .insertAdjacentElement(
            'beforebegin', 
            mainButtonHTML
    );
}

var div=document.createElement("div"); 
document.body.appendChild(div); 
div.innerText="test123";

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
getSponsoredProductFromUrl(currURL).then(
    res => { 
        buildSidebar(res);
    });


document.getElementById('price')
    .insertAdjacentElement(
        'beforebegin', 
        mainButtonHTML
    );