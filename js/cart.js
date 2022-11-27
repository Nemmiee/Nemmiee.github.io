
let goods = (localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
let waitting = (localStorage.getItem('wait')) ? JSON.parse(localStorage.getItem('wait')) : [];
let dele = (localStorage.getItem('remove')) ? JSON.parse(localStorage.getItem('remove')) : [];
let bill = [];




function setbill() {
    if (goods.length > 0) {
        for (let i = 0; i < goods.length; i++) {
            bill[i] = 0;
        }
    };
}

function choose(a) {
    if (size === a) {
        document.getElementById("sizeM").style.backgroundColor = "white";
        document.getElementById("sizeM").style.color = "black";
        document.getElementById("sizeXL").style.backgroundColor = "white";
        document.getElementById("sizeXL").style.color = "black";
        document.getElementById("sizeL").style.backgroundColor = "white";
        document.getElementById("sizeL").style.color = "black";
        size = '';
        exit();
    }
    size = a;
    if (a === 'L') {
        document.getElementById("sizeM").style.backgroundColor = "white";
        document.getElementById("sizeM").style.color = "black";
        document.getElementById("sizeXL").style.backgroundColor = "white";
        document.getElementById("sizeXL").style.color = "black";
        document.getElementById("sizeL").style.backgroundColor = "black";
        document.getElementById("sizeL").style.color = "white";
    }
    if (a === 'XL') {
        document.getElementById("sizeM").style.backgroundColor = "white";
        document.getElementById("sizeM").style.color = "black";
        document.getElementById("sizeXL").style.backgroundColor = "black";
        document.getElementById("sizeXL").style.color = "white";
        document.getElementById("sizeL").style.backgroundColor = "white";
        document.getElementById("sizeL").style.color = "black";
    }
    if (a === 'M') {
        document.getElementById("sizeM").style.backgroundColor = "black";
        document.getElementById("sizeM").style.color = "white";
        document.getElementById("sizeXL").style.backgroundColor = "white";
        document.getElementById("sizeXL").style.color = "black";
        document.getElementById("sizeL").style.backgroundColor = "white";
        document.getElementById("sizeL").style.color = "black";
    }

}

function quantityDownCART(i, price) {
    let quantity = 'quantity' + i;
    if (document.getElementById(quantity).value > 1) {
        --document.getElementById(quantity).value;
        var total = 'total' + i;
        document.getElementById(total).innerHTML = '<span>' + new Intl.NumberFormat().format(document.getElementById(quantity).value * price) + 'đ</span>';
        goods[i].g_quantity = document.getElementById(quantity).value;
        localStorage.setItem('cart', JSON.stringify(goods));
        goods = JSON.parse(localStorage.getItem('cart'));
        if (checkbox[i].checked == true) {
            cost = cost - price;
            document.getElementById("cost").innerHTML = '<p>' + new Intl.NumberFormat().format(cost) + 'đ</p>';
        }
        document.getElementById("check").innerHTML = '<input type="checkbox"  id="checkbox" onclick="chooseall();" value="" /><span id="all">Tất cả (' + soods.length + ')</span>';
    }

}

function quantityUpCART(i, price) {
    let quantity = 'quantity' + i;
    ++document.getElementById(quantity).value;
    var total = 'total' + i;
    document.getElementById(total).innerHTML = '<span>' + new Intl.NumberFormat().format(document.getElementById(quantity).value * price) + 'đ</span>';
    goods[i].g_quantity = document.getElementById(quantity).value;
    localStorage.setItem('cart', JSON.stringify(goods));
    goods = JSON.parse(localStorage.getItem('cart'));
    if (checkbox[i].checked == true) {
        cost = cost + price;
        document.getElementById("cost").innerHTML = '<p>' + new Intl.NumberFormat().format(cost) + 'đ</p>';
    }
    document.getElementById("check").innerHTML = '<input type="checkbox"  id="checkbox" onclick="chooseall();" value="" /><span id="all">Tất cả (' + goods.length + ')</span>';
}

function addToCart(productId) {
    if (size === '') {
        alert("Vui lòng chọn size");
        focus.size();
    }
    var productList = JSON.parse(localStorage.getItem('product'));
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].productId === productId) {
            var g_product = {
                g_price: productList[i].price,
                g_ID: productId,
                g_productName: productList[i].productName,
                g_category: productList[i].category,
                g_image: productList[i].image,
                g_quantity: document.getElementById("quantity").value,
                g_size: size,
                g_time: new Date(),
            };
            goods.push(g_product);
            localStorage.setItem('cart', JSON.stringify(goods));
            break;
        }
    }
}


function checkcart() {
    var pcart = JSON.parse(localStorage.getItem('cart'));
    var info = '';
    if (pcart.length > 0) {
        for (var i = 0; i < pcart.length; ++i) {
            info += '<div class="info" id="info' + i + '">'
                + '<div class="area">'
                + '<div class="mua"><input type="checkbox" onclick="buyit(' + i + ');" class="chon" name="[]" value="' + i + '" /></div>'
                + '<div class="gimage"><img src="' + pcart[i].g_image + '" alt="Image"></div>'
                + '<ul class="in4-pro">'
                + '<li class="productName"><p>' + pcart[i].g_productName + '</p>'
                + '<li class="g_size"><p>' + pcart[i].g_size + '</p></li>'
                + '<li class="category"><p>' + pcart[i].g_category + '</p></li>'
                + '</ul>'
                + '</div>'
                + '<div class="price"><p>' + new Intl.NumberFormat().format(Number(pcart[i].g_price)) + 'đ</p></div>'
                + '<div class="quantity_class">'
                + '<div class="buttonchoose">'
                + '<button class="minusQuantity" onclick="quantityDownCART(' + i + ',' + pcart[i].g_price + ')">−</button>'
                + '<input type="text" id="quantity" value="' + pcart[i].g_quantity + '">'
                + '<button class="plusQuantity" onclick="quantityUpCART(' + i + ',' + pcart[i].g_price + ')">+</button>'
                + '</div>'
                + '</div>'
                + '<div class="total" id="total' + i + '"><p>' + new Intl.NumberFormat().format(Number(pcart[i].g_price) * Number(pcart[i].g_quantity)) + 'đ</p></div>'
                + '<div class="trash" onClick="Remove(' + i + ',' + 1 + ')"><i class="fa-solid fa-trash"></i></div>'
                + '</div>';
        }
        document.getElementById("product_cart").innerHTML = info;
        for (var i = 0; i < goods.length; i++) {
            let quantity = 'quantity' + i;
            document.getElementById(quantity).classList.add("quantity")
        }
    }
    else {
        document.getElementById("product_cart").innerHTML = "<p>Chưa có sản phẩm vui lòng mua sản phẩm</p>";
    }
    document.getElementById("cart").style.backgroundColor = "orange";
    document.getElementById("wait").style.backgroundColor = "white";
    document.getElementById("check").innerHTML = '<input type="checkbox"  id="checkbox" onclick="chooseall();" value="" /><span id="all">Tất cả (' + pcart.length + ')</span>';
    document.getElementById("money").style.display = "block";
    document.getElementById("pcart").style.display = "block";
}
let kt = 0;
function refresh() {
    kt = 0;
    setbill();
}

let cost = 0;
function buyit(productNum) {
    if (bill[productNum] === 0) {
        bill[productNum] = 1;
        kt++;
        cost = cost + Number(goods[productNum].g_price) * Number(goods[productNum].g_quantity);
    }
    else {
        bill[productNum] = 0;
        kt--;
        cost = cost - Number(goods[productNum].g_price) * Number(goods[productNum].g_quantity);
    }
    document.getElementById("cost").innerHTML = '<p>' + new Intl.NumberFormat().format(cost) + 'đ</p>';

    if ((kt < goods.length) && (document.getElementById("checkbox").checked == true)) {
        document.getElementById("checkbox").checked = false;
        TOF = 1;
    }
    if ((kt === goods.length) && (document.getElementById("checkbox").checked == false)) {
        document.getElementById("checkbox").checked = true;
        TOF = 0;
    }
}

function Buy() {
    let items = ' ';
    let code = '';
    let total = 0;
    for (var i = 0; i < goods.length; i++) {
        if (bill[i] === 1) {
            code += goods[i].g_ID;
            items += goods[i].g_productName + ' ' + goods[i].g_category + ' ' + goods[i].g_quantity + ' ' + goods[i].g_size + ' ' + goods[i].g_price + '; ';
            total += goods[i].g_price * goods[i].g_quantity;
        }
    }
    let w_product = {
        costumer: JSON.parse(localStorage.getItem("userlogin")),
        codeID: code,
        product: items,
        totalprice: total,
        time: new Date(),
    };
    waitting.push(w_product);
    localStorage.setItem('wait', JSON.stringify(waitting));
    checkwait();
    Remove2();
}

function Remove2() {
    let item = [];
    for (var i = 0; i < goods.length; i++) {
        if (bill[i] === 1) {
            dele.push(goods[i]);
        } else {
            item.push(goods[i]);
        }
    }
    localStorage.setItem('cart', JSON.stringify(item));
    localStorage.setItem('remove', JSON.stringify(dele));
    refresh();
}

function checkwait() {
    var pwait = JSON.parse(localStorage.getItem('wait'));
    var info = '';
    if (pwait.length > 0) {
        for (var i = 0; i < pwait.length; ++i) {
            info += '<div class="info">'

                + '</div>';
        }
    }
    else {
        document.getElementById("product_cart").innerHTML = "<p>Chưa có sản phẩm vui lòng mua sản phẩm</p>";
    }
    document.getElementById("product_cart").innerHTML = info;
    document.getElementById("product_cart").innerHTML = info;
    document.getElementById("wait").style.backgroundColor = "orange";
    document.getElementById("cart").style.backgroundColor = "white";
    document.getElementById("check").innerHTML = '<div id="checkbox" class="sanpham">Sản phẩm</div>';
    document.getElementById("money").style.display = "none";
    document.getElementById("pcart").style.display = "none";
}



function Remove(productNum, co) {
    let item = [];
    if (co === 1) {
        dele.push(goods[productNum]);
        item = goods.splice(productNum, 1);
        localStorage.setItem('cart', JSON.stringify(goods));
        localStorage.setItem('remove', JSON.stringify(dele));
        refresh();
        checkcart();
    }
    if (co === 2) {
        dele.push(wait[productNum]);
        item = waitting.splice(productNum, 1);
        localStorage.setItem('wait', JSON.stringify(waitting));
        localStorage.setItem('remove', JSON.stringify(dele));
        refresh();
        checkwait();
    }
}

let checkbox = document.getElementsByName("[]");
let TOF = 1;
function chooseall() {
    if (TOF === 1) {
        for (var i = 0; i < goods.length; i++) {
            checkbox[i].checked = true;
            buyit(i);
        }
        TOF = 0;
    } else if (TOF === 0) {
        for (var i = 0; i < goods.length; i++) {
            checkbox[i].checked = false;
            buyit(i);
        }
        TOF = 1;
    }
}

