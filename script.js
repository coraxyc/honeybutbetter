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
    return data;
}

let whiteLogoURL = chrome.runtime.getURL('images/logo-white-27x27.svg');
let blackLogoURL = chrome.runtime.getURL('images/logo-black-27x27.svg');
let mainButtonHTML = document.createElement('div');
let currURL = window.location.toString();
getSponsoredProductFromUrl(currURL).then(
    res => { 
        mainButtonHTML.setAttribute('id', 'honeycomb');
        mainButtonHTML.innerHTML = 
        `
            <div class='container'>
                <img src=${whiteLogoURL}>
                <span class='hoverable'>
                    <div class="header">
                        <div class="logo-with-name">
                            <img src=${blackLogoURL}>
                            <div class="name">
                                <b>honeycomb</b>
                            </div>
                        </div>
                        <span style="display: flex; align-items: center">
                            &#10005
                        </span>
                    </div>
                    <div class="body">
                        <div class="product-suggestions">
                            <h1>Greener Alternatives</h1>
                            <div class="carousel">
                                <div class="row">
                                    <div class="product-item">
                                        <img src="${res.image}"/>
                                        <div class="description">
                                            <p class="a-text">${res.title}</p>
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
                                    <div class="product-item">
                                        <img src="${res.image}"/>
                                        <div class="description">
                                            <p class="a-text">${res.title}</p>
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
                                    <div class="product-item">
                                        <img src="${res.image}"/>
                                        <div class="description">
                                            <p class="a-text">${res.title}</p>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </span>
            </div>
        `
    });


document.getElementById('price')
    .insertAdjacentElement(
        'beforebegin', 
        mainButtonHTML
    );