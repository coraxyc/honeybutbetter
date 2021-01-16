var div=document.createElement("div"); 
document.body.appendChild(div); 
div.innerText="test123";

console.log('inserting');
var testdiv = document.createElement('div');
testdiv.setAttribute('id', 'honeycomb');
testdiv.innerHTML = "injected!!!";
document.getElementById('price').insertAdjacentElement('beforebegin', testdiv);
console.log('done inserting!');