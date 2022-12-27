
let goods = (localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
let waitting = (localStorage.getItem('wait')) ? JSON.parse(localStorage.getItem('wait')) : [];
let dele = (localStorage.getItem('remove')) ? JSON.parse(localStorage.getItem('remove')) : [];
let bill = [];
let soluong;

let TOF = 1;

function setbill() {
    console.log("setbill");
    if (goods.length > 0) {
        for (let i = 0; i < goods.length; i++) {
            bill[i] = 2;
        }
    }
}

function choose(a) {
    size = a;
    if (a === 'L') {
        document.getElementById("sizeM").style.backgroundColor = "white";
        document.getElementById("sizeXL").style.backgroundColor = "white";
        document.getElementById("sizeL").style.backgroundColor = "orange";
    }
    if (a === 'XL') {
        document.getElementById("sizeM").style.backgroundColor = "white";
        document.getElementById("sizeL").style.backgroundColor = "white";
        document.getElementById("sizeXL").style.backgroundColor = "orange";
    }
    if (a === 'M') {
        document.getElementById("sizeM").style.backgroundColor = "orange";
        document.getElementById("sizeL").style.backgroundColor = "white";
        document.getElementById("sizeXL").style.backgroundColor = "white";
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
        document.getElementById("check").innerHTML = '<input type="checkbox"  id="checkbox" onclick="chooseall();" value="" /><span id="all">Tất cả (' + goods.length + ')</span>';
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
    } else {
        if (localStorage.getItem('userlogin')) {
            if (size === 'L' || size === 'XL' || size === 'M') {
                alert("Đã thêm vào giỏ hàng");
            }
        }
        var productList = JSON.parse(localStorage.getItem('product'));
        for (var i = 0; i < productList.length; i++) {
            if (productList[i].productId === productId) {
                var g_product = {
                    g_cos: JSON.parse(localStorage.getItem('userlogin')),
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
                document.getElementById("product-info-container").classList.toggle("hienThi");
                break;
            }
        }
    }
}

function checkcart() {
    console.log("checkcart");
    setbill();
    if (!JSON.parse(localStorage.getItem('userlogin'))) {
        if (confirm("Vui lòng đăng nhập để xem giỏ hàng", 'warning'))
            location.href = "../Account/signin.html";
        else
            location.href = "../File/products.html";
    } else {
        var pcart = JSON.parse(localStorage.getItem('cart'));
        var user = JSON.parse(localStorage.getItem('userlogin'));
        var l = 0;
        var info = '';
        var dem = 0;
        //if (pcart.length > 0) {
        for (var i = 0; i < pcart.length; ++i) {
            if (user.email === pcart[i].g_cos.email) {
                dem++;
                bill[i] = 0;
                console.log(i, bill[i]);
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
                    + '<button class="minusQuantity" onclick="quantityDownCART(' + i + ',' + pcart[i].g_price + ')">-</button>'
                    + '<input type="text" class="quantity" id="quantity' + i + '" value="' + pcart[i].g_quantity + '" readonly>'
                    + '<button class="plusQuantity" onclick="quantityUpCART(' + i + ',' + pcart[i].g_price + ')">+</button>'
                    + '</div>'
                    + '</div>'
                    + '<div class="total" id="total' + i + '"><p>' + new Intl.NumberFormat().format(Number(pcart[i].g_price) * Number(pcart[i].g_quantity)) + 'đ</p></div>'
                    + '<div class="trash" onClick="Remove(' + i + ',' + 1 + ')"><i class="fa-solid fa-trash"></i></div>'
                    + '</div>';
                l = 1;
            }
        }
        if (l == 1) {
            document.getElementById("product_cart").innerHTML = info;
            document.getElementById("product_cart").style.overflowY = "scroll";
        } else {
            document.getElementById("product_cart").style.overflowY = "hidden";
            document.getElementById("product_cart").innerHTML = '<span id="notification">Chưa có sản phẩm vui lòng mua sản phẩm</span>';
        }
    }
    if (l === 0) {
        document.getElementById("product_cart").style.overflowY = "hidden";
        document.getElementById("product_cart").innerHTML = '<span id="notification">Chưa có sản phẩm vui lòng mua sản phẩm</span>';
    }
    document.getElementById("cost").innerHTML = '<p>' + new Intl.NumberFormat().format(cost) + 'đ</p>';
    document.getElementById("product_cart").style.display = "block"
    document.getElementById("cart").style.backgroundColor = "orange";
    document.getElementById("wait").style.backgroundColor = "white";
    document.getElementById("check").innerHTML = '<input type="checkbox"  id="checkbox" onclick="chooseall();" value="" /><span id="all">Tất cả (' + dem + ')</span>';
    document.getElementById("money").style.display = "block";
    document.getElementById("product_show").style.display = "none";
    document.getElementById("pcart").style.display = "block";
    document.getElementById("sym").style.display = "flex";
    document.getElementById("show_product").style.display = "none";
}
let kt = 0;
let cost = 0;
function buyit(productNum) {
    console.log("buyit");
    if (bill[productNum] === 0) {
        bill[productNum] = 1;
        kt++;
        cost = cost + Number(goods[productNum].g_price) * Number(goods[productNum].g_quantity);
    }
    else if (bill[i] === 1) {
        bill[productNum] = 0;
        kt--;
        cost = cost - Number(goods[productNum].g_price) * Number(goods[productNum].g_quantity);
    }
    document.getElementById("cost").innerHTML = '<p>' + new Intl.NumberFormat().format(cost) + 'đ</p>';
    if ((kt < soluong) && (document.getElementById("checkbox").checked == true)) {
        document.getElementById("checkbox").checked = false;
        TOF = 1;
    }
    if ((kt === soluong) && (document.getElementById("checkbox").checked == false)) {
        document.getElementById("checkbox").checked = true;
        TOF = 0;
    }
    console.log(bill[productNum], productNum);
}
function refresh() {
    console.log("refresh");
    kt = 0;
    cost = 0;
    setbill();
}

function randomID() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function Buy() {
    console.log("Buy");
    let items = ' ';
    let code = 0;
    let total = 0;
    let date = new Date();
    let d;
    if (date.getDate() < 10 ){
        d = String (date.getDate()).padStart(2, '0');
    }
    if (localStorage.getItem('userlogin') === null) {
        if (confirm("vui lòng đăng nhập khi mua hàng.", 'warning') == true) {
            location.replace("../Account/signin.html");
            return;
        } else {
            location.replace("../File/products.html");
            return;
        }
    }
    code = waitting.length;
    for (var i = 0; i < goods.length; i++) {
        if (bill[i] === 1) {
            items += goods[i].g_productName + ' ' + goods[i].g_category + ' ' + goods[i].g_quantity + ' ' + goods[i].g_size + ' ' + goods[i].g_price + '; ';
            var day = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + d;
            total += goods[i].g_price * goods[i].g_quantity;
        }
    }
    let w_product = {
        costumer: JSON.parse(localStorage.getItem("userlogin")),
        codeID: code,
        product: items,
        totalprice: total,
        time: day,
        status: 'Chưa xử lý',
    };
    waitting.push(w_product);
    localStorage.setItem('wait', JSON.stringify(waitting));
    console.log(JSON.parse(localStorage.getItem('wait')))
    checkwait();
    Remove2();
}


function checkwait() {
    console.log("checkwait");
    var pwait = JSON.parse(localStorage.getItem('wait'));
    var productList = JSON.parse(localStorage.getItem('product'));
    var info = '';
    let id_product;
    let c;
    var l = 0;
    var user = JSON.parse(localStorage.getItem('userlogin'));
    //if (pwait.length != 0) {
    var i = 0;
    while (i < pwait.length) {
        if (user.email == pwait[i].costumer.email) {
            let d = new Date();
            let date
            if (d.getDate() < 10 ){
                date = String (d.getDate()).padStart(2, '0');
            }
            l = 1;
            j = 0;
            c = '';
            var dem = 0;
            info += '<div class="info2">'
                + '<div class="introduct">'
                + '<span class="id">ID: ' + pwait[i].codeID + '. <span class="chitiet" onclick="Show(' + 0 + ',' + 0 + ',' + 0 + ',' + 0 + ',' + i + ',' + 0 + ',' + 1 + ');">Nhấn để xem chi tiết.</span></span>'
                + '<span class="time">Thời gian: ' + d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + '</span>'
                + '</div>'
                + '<div class="product_w">'
                + '<ul class="pro5">';
            while (j < pwait[i].product.length) {
                if (pwait[i].product.charAt(j) != ';' && pwait[i].product.charAt(j) != null) {
                    c += pwait[i].product.charAt(j);
                } else if (pwait[i].product.charAt(j) != null) {
                    var NQS = c.split(' ');
                    let Name = '';
                    for (var s = 1; s <= NQS.length; s++) {
                        if (Number(NQS[s + 1])) { break; }
                        Name += NQS[s] + ' ';
                    }
                    Name = Name.slice(0, -1);
                    for (var k = 0; k < productList.length; k++) {
                        if (productList[k].productName === Name) {
                            id_product = productList[k].productId;
                        }
                    };
                    info += '<li class="Table" onclick="Show(' + pwait[i].codeID + ',' + id_product + ',' + NQS[s + 1] + ',' + NQS[s + 3] + ',' + i + ',' + (dem + 1) + ',' + 0 + ');">' + (dem + 1) + '. ' + Name + ', ' + NQS[s] + ', ' + NQS[s + 1] + ', ' + NQS[s + 2] + '.</li>';
                    c = '';
                    dem++;
                    let w_id = i + 'id' + dem + 'size';
                    info += '<input type="hidden" value="' + NQS[s + 2] + '" id="' + w_id + '">';
                    w_id = i + 'id' + dem + 'id';
                    info += '<input type="hidden" value="' + id_product + '" id="' + w_id + '">';
                    w_id = i + 'id' + dem + 'quantity';
                    info += '<input type="hidden" value="' + NQS[s + 1] + '" id="' + w_id + '">';
                }
                j++;
            };
            info += '</ul>'
                + '<div class="trash_w" onclick="Remove(' + i + ',' + 2 + ')"><i class="fa-solid fa-trash"></i></div>'
                + '</div>'
                + '</div>';
        }
        i++;
    }
    //}
    if (l === 0) {
        info = '<span id="notification">Chưa có sản phẩm vui lòng mua sản phẩm</span>';
        document.getElementById("show_product").style.display = "none";
        document.getElementById("product_show").style.overflowY = "hidden";
    }
    document.getElementById("product_cart").style.display = "none";
    document.getElementById("wait").style.backgroundColor = "orange";
    document.getElementById("cart").style.backgroundColor = "white";
    document.getElementById("check").innerHTML = '<div id="checkbox" class="sanpham">Sản phẩm</div>';
    document.getElementById("money").style.display = "none";
    document.getElementById("product_show").style.display = "block";
    document.getElementById("product_show").innerHTML = info;
    document.getElementById("sym").style.display = "none";
    document.getElementById("product_show").style.overflowY = "scroll";
}

// ,category,quantity,size,price,doiso
function Show(ID, idchild, quantity, price, vitri, thu, doiso) {
    let info = '';
    var productList = JSON.parse(localStorage.getItem('product'));
    var pwait = JSON.parse(localStorage.getItem('wait'));
    if (doiso === 0) {
        for (var i = 0; i < productList.length; i++) {
            if (idchild == productList[i].productId) {
                let w_id = vitri + 'id' + thu + 'size';
                info = '<div class="show_image">'
                    + '<img src="' + productList[i].image + '" alt="Hình ảnh :)))">'
                    + '</div>'
                    + '<ul class="show_introduction">'
                    + '<li class="li_show ten">- Tên: ' + productList[i].productName + '</li>'
                    + '<li class="li_show soluong">- Số lượng: ' + quantity + '</li>'
                    + '<li class="li_show kichco">- Size: ' + document.getElementById(w_id).value + '</li>'
                    + '<li class="li_show gia">- Giá: ' + new Intl.NumberFormat().format(productList[i].price) + 'đ (1 cái)</li>'
                    + '<li class="li_show tong">- Tổng giá: ' + new Intl.NumberFormat().format(Number(quantity) * Number(productList[i].price)) + 'đ</li>'
                    + '</ul>'
                    + '<span class="show_idspan">MÃ ĐƠN HÀNG: ' + vitri + '.</span>';
                document.getElementById("show_product").innerHTML = info;
                document.getElementById("show_product").style.display = "block";
                document.getElementById("show_product").style.overflowY = "hidden";
                document.getElementById("show_product").style.overflowX = "hidden";
                document.getElementById("show_product").style.paddingBottom = "23px";
            }
        }
    } else {
        var j = 1;
        let w_id = vitri + 'id' + j + 'id';
        let w_quantity = vitri + 'id' + j + 'quantity';
        let w_size = vitri + 'id' + j + 'size';
        while (document.getElementById(w_id)) {
            for (var i = 0; i < productList.length; i++) {
                if (document.getElementById(w_id).value == productList[i].productId) {
                    let w_id = vitri + 'id' + thu + 'size';
                    info += '<div class="sanpham_show">'
                        + '<div class="show_image">'
                        + '<img src="' + productList[i].image + '" alt="Hình ảnh :)))">'
                        + '</div>'
                        + '<ul class="show_introduction">'
                        + '<li class="li_show ten">-Tên: ' + productList[i].productName + '.</li>'
                        + '<li class="li_show soluong">-Số lượng: ' + quantity + '</li>'
                        + '<li class="li_show kichco">-Size: ' + document.getElementById(w_size).value + '.</li>'
                        + '<li class="li_show gia">-Giá: ' + new Intl.NumberFormat().format(productList[i].price) + 'đ(1 cái).</li>'
                        + '<li class="li_show tong">-Tổng giá: ' + new Intl.NumberFormat().format(Number(document.getElementById(w_quantity).value) * Number(productList[i].price)) + 'đ.</li>'
                        + '</ul>'
                        + '</div>';
                }
            }
            j++;
            w_id = vitri + 'id' + j + 'id';
            w_quantity = vitri + 'id' + j + 'quantity';
            w_size = vitri + 'id' + j + 'size';
        }
        info += '<p class="show_id">MÃ ĐƠN HÀNG: ' + ID + '.</p>'
            + '<p class="show_total">Tổng tiền: ' + new Intl.NumberFormat().format(pwait[vitri].totalprice) + 'đ.</p>';
        document.getElementById("show_product").innerHTML = info;
        document.getElementById("show_product").style.display = "block";
        document.getElementById("show_product").style.overflowY = "scroll";
        document.getElementById("show_product").style.overflowX = "hidden";
        document.getElementById("show_product").style.maxHeight = "300px";
        document.getElementById("show_product").style.paddingBottom = "10px";
    }
}

function Remove2() {
    console.log("Remove2");
    let item = [];
    var user = JSON.parse(localStorage.getItem('userlogin'));
    for (var i = 0; i < goods.length; i++) {
        if (bill[i] === 1) {
            console.log(i);
            dele.push(goods[i]);
        } else if (bill[i] === 0 || bill[i] === 2) {
            item.push(goods[i]);
        }
    }
    localStorage.setItem('cart', JSON.stringify(item));
    goods = JSON.parse(localStorage.getItem('cart'));
    localStorage.setItem('remove', JSON.stringify(dele));
    refresh();
}

function Remove(productNum, co) {
    let item = [];
    if (confirm("Bạn có chắc là muốn xóa không? Nếu đồng ý thì chúng tôi không thể khôi phục lại cho bạn", 'warning')) {
        if (co === 1) {
            dele.push(goods[productNum]);
            item = goods.splice(productNum, 1);
            localStorage.setItem('cart', JSON.stringify(goods));
            localStorage.setItem('remove', JSON.stringify(dele));
            refresh()
            checkcart();
        }
        if (co === 2) {
            dele.push(wait[productNum]);
            item = waitting.splice(productNum, 1);
            localStorage.setItem('wait', JSON.stringify(waitting));
            localStorage.setItem('remove', JSON.stringify(dele));
            refresh()
            checkwait();
        }
    } else return;
}

function chooseall() {
    let checkbox = document.getElementsByName("[]");
    if (TOF === 1) {
        for (var i = 0; i < goods.length; i++)
            if (bill[i] != 2)
                if (checkbox[i].checked == false) {
                    checkbox[i].checked = true;
                    buyit(i);
                }
        TOF = 0;
    } else if (TOF === 0) {
        for (var i = 0; i < goods.length; i++)
            if (bill[i] != 2)
                if (checkbox[i].checked == true) {
                    checkbox[i].checked = false;
                    buyit(i);
                }
        TOF = 1;
    }
}


