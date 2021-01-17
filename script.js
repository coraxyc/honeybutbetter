var div=document.createElement("div"); 
document.body.appendChild(div); 
div.innerText="test123";

console.log('inserting');
var testdiv = document.createElement('div');
testdiv.setAttribute('id', 'honeycomb');
testdiv.innerHTML = "injected!!!";
document.getElementById('price').insertAdjacentElement('beforebegin', testdiv);
console.log('done inserting!');
/*let honeycombUrl = chrome.extension.getURL('small.html');
console.log(honeycombUrl);
fetch(honeycombUrl, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "text/plain"
},).then(data => data.text()).then(res => {console.log(res)})*/

async function getSponsoredProductFromUrl(url) {
    var sponsoredProductHtml = '';
    sponsoredProductHtml = await fetch(url).then(res=>res.text()).then(data=> sponsoredProductHtml = data);
    let data = {};
    let parser = new DOMParser();
    let sponsoredProductElement = parser.parseFromString(sponsoredProductHtml, 'text/html');
    // console.log(sponsoredProductElement);
    data['title'] = sponsoredProductElement.getElementById('productTitle').innerText.trim();
    data['image'] = sponsoredProductElement.getElementById('imgTagWrapperId').firstChild.nextSibling.getAttribute('src').trim();
    data['price'] = sponsoredProductElement.getElementById('priceblock_saleprice') ? sponsoredProductElement.getElementById('priceblock_saleprice').innerText : sponsoredProductElement.getElementById('priceblock_ourprice').innerText;
    data['rating'] = sponsoredProductElement.getElementById('acrPopover').innerText.trim();
    console.log(data);
}

// test: remove this line of code before publishing
getSponsoredProductFromUrl('https://www.amazon.com/Tiny-Footprint-Coffee-Organic-Medium/dp/B009PIFCCO/')