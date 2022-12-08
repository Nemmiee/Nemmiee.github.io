let productlist = JSON.parse(localStorage.getItem('product'));
let s = document.getElementById("filter_choose");
let k = 0;
let attitrue="all";
let dus;

function Show_choose() {
    console.log("choose");
    if (k === 0) { s.style.display = "block"; k = 1; }
    else { s.style.display = "none"; k = 0; }
};

function clock() {
    document.getElementById("product-search-content").style.display = "none";
}
function opensearch() {
    document.getElementById("product-search-content").style.display = "flex";
}

let result = [];

function search_product() {
    console.log("search_product");
    var all = document.getElementById
    var productlist = JSON.parse(localStorage.getItem("product"));
    let content = document.getElementById("search").value;
    if(content=='' && dus!='') content=dus;
    if (content != '') {
        content = content.toLowerCase();
        result = [];
        for (var i = 0; i < productlist.length; i++) {
            let pro = productlist[i].productName.toLowerCase();
            if (pro.search(content) != -1) {
                result.push(productlist[i]);
                console.log("vao")
            }
        }
        dus=content;
        if (result.length != 0) Search(0);
        else { document.getElementById("product-search-result").innerHTML = '<p>Không tìm thấy sản phẩm phù hợp với nhu cầu của bạn :)</p>'; document.getElementById("Numpage").innerHTML = ''; }
    }
    else {
        document.getElementById("product-search-result").innerHTML = '<p>Vui lòng nhập tên sản phẩm</p>';
    }
}

function search_product_sidebar() {
    opensearch();
    var productlist = JSON.parse(localStorage.getItem("product"));
    document.getElementById("search").value = document.getElementById("sidebar-search").value;
    content = document.getElementById("search").value;
    if(content=='' && dus!='') content=dus;
    if (content != '') {
        content = content.toLowerCase();
        result = [];
        for (var i = 0; i < productlist.length; i++) {
            let pro = productlist[i].productName.toLowerCase();
            if (pro.search(content) != -1) {
                result.push(productlist[i]);
            }
        }
        if (result.length != 0) Search(0);
        else { document.getElementById("product-search-result").innerHTML = '<p>Không tìm thấy sản phẩm phù hợp với nhu cầu của bạn :)</p>'; document.getElementById("Numpage").innerHTML = ''; }

    }
    else {
        document.getElementById("product-search-result").innerHTML = '<p>Vui lòng nhập tên sản phẩm</p>';
    }
}

let pageNum;
let perpage = 4;
let perstart;
let perpro;

function Search(page) {
    let info = '';
    let num = '';
    if (result.length != 0) {
        perstart = page;
        pageNum = 1;
        if (result.length - page * perpage >= 4) {
            perpro = result.slice(page * perpage, perpage * (page + 1));
        } else {
            perpro = result.slice(page * perpage);
        }
        for (var i = 0; i < perpro.length; i++) {
            info += '<div class="pro_result" onclick="showProductInfo(' + perpro[i].productId + ');">'
                + '<div class="image_result"><img src=' + perpro[i].image + '></div>'
                + '<div class="product_resutl">'
                + '<p>Tên: ' + perpro[i].productName + '</p>'
                + '<p>Giá: ' + perpro[i].price + '</p>'
                + '</div>'
                + '</div>'
        }
        num = '<ul>';
        console.log(Number(result.length / perpage + 1));
        for (var i = 1; i <= result.length / perpage + 1; i++) {
            num += '<li onclick="Search(' + (i - 1) + ')">' + i + '</li>';
        }
        num += '</ul>';
    }
    document.getElementById("product-search-result").innerHTML = info;
    document.getElementById("Numpage").innerHTML = num;
}

function ALL(){
    console.log("ALL");
    search_product();
    search_product_sidebar();
    attitrue="all";
    Search(0);
}

function cheap() {
    search_product();
    search_product_sidebar();
    if (result.length != 0) {
        for (var i = 0; i < result.length; i++) {
            for (var j = 0; j < result.length - 1; j++)
                if (Number(result[j].price) > Number(result[j + 1].price)) {
                    let t = result[j];
                    result[j] = result[j + 1];
                    result[j + 1] = t;
                }
        }
        Search(0);
        attitrue="cheap";
    }
    else{
        attitrue="all";
    }
}
function expensive() {
    search_product();
    search_product_sidebar();
    if (result.length != 0) {
        for (var i = 0; i < result.length; i++) {
            for (var j = 0; j < result.length - 1; j++)
                if (Number(result[j].price) < Number(result[j + 1].price)) {
                    let t = result[j];
                    result[j] = result[j + 1];
                    result[j + 1] = t;
                }
        }
        Search(0);
        attitrue="expensive";
    }else{
        attitrue="all";
    }
}

function U500(){
    search_product();
    search_product_sidebar();
    console.log("U500");
    if(result!=0){
        let width=result.length;
        for(var i=0;i<width;i++)
            if(Number(result[i].price)<500000){
                result.push(result[i]);
            }
        result=result.slice(width,result.length);
        console.log(result);
        attitrue="U500";
        Search(0);
    }
}

function H500(){
    search_product();
    search_product_sidebar();
    if(result!=0){
        let width=result.length;
        for(var i=0;i<width;i++)
            if(Number(result[i].price)>=500000){
                result.push(result[i]);
            }
        result=result.slice(width,result.length);
        attitrue="H500";
        Search(0);
    }
}