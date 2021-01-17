let mainButtonHTML = document.createElement('div');
mainButtonHTML.setAttribute('id', 'honeycomb');
mainButtonHTML.innerHTML = 
`
    <div class='container'>
        <svg class="logo" width="26" height="28" viewBox="0 0 52 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.5 3.44338C25.047 2.55021 26.953 2.55021 28.5 3.44338L46.0167 13.5566C47.5637 14.4498 48.5167 16.1004 48.5167 17.8868V38.1132C48.5167 39.8996 47.5637 41.5502 46.0167 42.4434L28.5 52.5566C26.953 53.4498 25.047 53.4498 23.5 52.5566L5.98334 42.4434C4.43633 41.5502 3.48334 39.8996 3.48334 38.1132V17.8868C3.48334 16.1004 4.43633 14.4498 5.98334 13.5566L23.5 3.44338Z" stroke="white" stroke-width="5"/>
            <path d="M19.4601 23.2642C15.3079 25.9667 14.5752 31.6174 15.5522 33.5828C16.5291 35.5483 21.2431 38.0051 26.2991 35.7939C31.355 33.5828 39 19.3333 39 19.3333C39 19.3333 23.6124 20.5617 19.4601 23.2642Z" fill="white"/>
            <path d="M20.913 28.65C19.5364 29.6395 15.0097 33.4167 13 35.3667L13.7536 36.6667C15.2609 35.2222 19.6743 30.8876 20.5362 30.1667C22.6087 28.4334 26.942 25.8334 30.3333 23.6667C27.8213 25.0389 22.4203 27.5667 20.913 28.65Z" fill="#159800"/>
        </svg>
        <span class='hoverable'>
            <div class="header">
                <div class="logo-with-name">
                    <svg width="27" height="31" viewBox="0 0 27 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.86603C12.9282 2.33013 14.0718 2.33013 15 2.86603L23.6913 7.88397C24.6195 8.41987 25.1913 9.41025 25.1913 10.4821V20.5179C25.1913 21.5897 24.6195 22.5801 23.6913 23.116L15 28.134C14.0718 28.6699 12.9282 28.6699 12 28.134L3.30866 23.116C2.38045 22.5801 1.80866 21.5897 1.80866 20.5179V10.4821C1.80866 9.41025 2.38045 8.41987 3.30866 7.88397L12 2.86603Z" fill="white" stroke="black" stroke-width="3"/>
                        <path d="M10.1043 13.041C7.94835 14.4443 7.5679 17.3783 8.07518 18.3988C8.58246 19.4193 11.0301 20.695 13.6553 19.5469C16.2805 18.3988 20.25 11 20.25 11C20.25 11 12.2603 11.6378 10.1043 13.041Z" fill="black"/>
                        <path d="M10.8587 15.8375C10.1439 16.3512 7.79348 18.3125 6.75 19.325L7.1413 20C7.92391 19.25 10.2155 16.9993 10.663 16.625C11.7391 15.725 13.9891 14.375 15.75 13.25C14.4457 13.9625 11.6413 15.275 10.8587 15.8375Z" fill="white"/>
                    </svg>
                    <div class="name">
                        <b>honeycomb</b>
                    </div>
                </div>
                <div style="display: flex; align-items: center">
                    &#10005
                </div>
            </div>
            <div class="body">
                <div class="product-suggestions">
                    <h1>Greener Alternatives</h1>
                    <div class="carousel">
                        hello
                    </div>
                </div>
            </div>
        </span>
    </div>
`

document.getElementById('price')
    .insertAdjacentElement(
        'beforebegin', 
        mainButtonHTML
    );
var div=document.createElement("div"); 
document.body.appendChild(div); 
div.innerText="test123";

console.log('inserting');
var testdiv = document.createElement('div');
testdiv.setAttribute('id', 'honeycomb');
testdiv.innerHTML = "injected!!!";
document.getElementById('price').insertAdjacentElement('beforebegin', testdiv);
console.log('done inserting!');

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
