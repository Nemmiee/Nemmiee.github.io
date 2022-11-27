let productlist = JSON.parse(localStorage.getItem('product'));

function Find() {
    var content = document.getElementById('header-search-input').value;
    var product = '';
    var add;
    let j = 0;
    console.log(content.length);
    if (content.length === 0) document.getElementById("result").style.display = 'none';
    else {
        for (var i = 0; i < productlist.length; i++) {
            var p = productlist[i].productName.toLowerCase();
            if (p.includes(content)) {
                j++;
                add = 'content' + j;
                product += '<div class="contentresult" onclick="showProductInfo(' + productlist[i].productId + ')">'
                    + '<div class="co-img"><img src="' + productlist[i].image + '" alt="Image"></div>'
                    + '<div class="co-name">' + productlist[i].productName + '</div>'
                    + '</div>';
            }
            document.getElementById("result").innerHTML = product;
            document.getElementById('result').style.display = "block";
        }
    }
}
function OK(){
    var content = document.getElementById('header-search-input').value;
    if (content.length === 0) document.getElementById("result").style.display = 'none';
}