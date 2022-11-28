let productlist = JSON.parse(localStorage.getItem('product'));

function Find() {
    var content = document.getElementById('header-search-input').value;
    var product = '';
    var add;
    let j = 0;
    console.log(content.charAt(content.length-1));
    if (content.length === 0) document.getElementById("result").style.display = 'none';
    else {
        for (var i = 0; i < productlist.length; i++) {
            var p = productlist[i].productName.toLowerCase();
            var q=content.toLowerCase().split(" ");
            console.log(p);
            console.log(q);
            var s=0;
            var kiemtra=1;
            while(s<q.length){
                console.log(q[s]);
                if(p.includes(q[s])==false){
                    kiemtra=0;
                    break;
                }
                s++;
            }
            if (kiemtra==1) {
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

function Find2() {
    var content = document.getElementById('sidebar-search').value;
    var product = '';
    var add;
    let j = 0;
    console.log(content.charAt(content.length-1));
    if (content.length === 0) document.getElementById("result2").style.display = 'none';
    else {
        for (var i = 0; i < productlist.length; i++) {
            var p = productlist[i].productName.toLowerCase();
            var q=content.toLowerCase().split(" ");
            console.log(p);
            console.log(q);
            var s=0;
            var kiemtra=1;
            while(s<q.length){
                console.log(q[s]);
                if(p.includes(q[s])==false){
                    kiemtra=0;
                    break;
                }
                s++;
            }
            if (kiemtra==1) {
                j++;
                add = 'content' + j;
                product += '<div class="contentresutl" onclick="showProductInfo(' + productlist[i].productId + ')">'
                    + '<div class="co-img"><img src="' + productlist[i].image + '" alt="Image"></div>'
                    + '<div class="co-name">' + productlist[i].productName + '</div>'
                    + '</div>';
            }
            document.getElementById("resutl2").innerHTML = product;
            document.getElementById('resutl2').style.display = "block";
        }
    }
}
function OK() {
    var content = document.getElementById('header-search-input').value;
    if (content.length === 0) document.getElementById("result").style.display = 'none';
}
function search() {
    console.log("da vao");
}