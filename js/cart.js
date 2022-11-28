
let goods = (localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
let waitting = (localStorage.getItem('wait')) ? JSON.parse(localStorage.getItem('wait')) : [];
let dele = (localStorage.getItem('remove')) ? JSON.parse(localStorage.getItem('remove')) : [];

let bill = [];
let checkbox = document.getElementsByName("[]");
let TOF = 1;
function setbill() {
    if (goods.length > 0) {
        for (let i = 0; i < goods.length; i++) {
            bill[i] = 0;
        }
    };
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
    } if (localStorage.getItem('userlogin')) {
        if (size === 'L' || size === 'XL' || size === 'M') {
            alert("Đã thêm vào giỏ hàng");
        }
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
            document.getElementById("product-info-container").classList.toggle("hienThi");
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
                + '<button class="minusQuantity" onclick="quantityDownCART(' + i + ',' + pcart[i].g_price + ')">-</button>'
                + '<input type="text" class="quantity" id="quantity' + i + '" value="' + pcart[i].g_quantity + '">'
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
    document.getElementById("product_cart").style.display = "block"
    document.getElementById("cart").style.backgroundColor = "orange";
    document.getElementById("wait").style.backgroundColor = "white";
    document.getElementById("check").innerHTML = '<input type="checkbox"  id="checkbox" onclick="chooseall();" value="" /><span id="all">Tất cả (' + pcart.length + ')</span>';
    document.getElementById("money").style.display = "block";
    document.getElementById("product_show").style.display = "none";
    document.getElementById("pcart").style.display = "block";
    document.getElementById("sym").style.display = "flex";
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
    let code = 0;
    let total = 0;
    let date = new Date();
    if (localStorage.getItem('userlogin') === null) {
        if (confirm("vui lòng đăng nhập khi mua hàng.", 'warning') == true) {
            location.replace("../Account/signin.html");
            return;
        } else {
            location.replace("../File/products.html");
            return;
        }
    }
    for (var i = 0; i < goods.length; i++) {
        code = waitting.length;
        if (bill[i] === 1) {
            items += goods[i].g_productName + ' ' + goods[i].g_category + ' ' + goods[i].g_quantity + ' ' + goods[i].g_size + ' ' + goods[i].g_price + '; ';
            var day = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
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
    checkwait();
    Remove2();
}


function checkwait() {
    var pwait = JSON.parse(localStorage.getItem('wait'));
    var productList = JSON.parse(localStorage.getItem('product'));
    var info = '';
    let id_product;
    let d, c;
    if (pwait.length > 0) {
        for (var i = 0; i < pwait.length; ++i) {
            d = new Date(pwait[i].time);
            j = 0;
            c = '';
            var dem = 0;
            info += '<div class="info2">'
                + '<div class="introduct">'
                + '<span class="time">Thời gian: ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '-' + d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + '</span>'
                + '<span class="id" onclick="Show(' + 0 + ',' + id_product + ',' + 0 + ',' + 0 + ',' + i + ',' + 0 + ',' + 1 + ');">ID: ' + pwait[i].codeID + '</span>'
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
                    console.log(Name);
                    Name = Name.slice(0, -1);
                    for (var k = 0; k < productList.length; k++) {
                        if (productList[k].productName === Name) {
                            id_product = productList[k].productId;
                            console.log(id_product);
                            console.log("tìm thấy");
                        }
                    };
                    info += '<li class="Table" onclick="Show(' + pwait[i].codeID + ',' + id_product + ',' + NQS[s + 1] + ',' + NQS[s + 3] + ',' + i + ',' + (dem + 1) + ',' + 0 + ');">' + (dem + 1) + '. ' + Name + ', ' + NQS[s] + ', ' + NQS[s + 1] + ', ' + NQS[s + 2] + '</li>';
                    c = '';
                    dem++;
                    let w_id = i + 'id' + dem;
                    info += '<input type="hidden" value=' + NQS[s + 2] + ' id=' + w_id + '>';
                }
                j++;
            };
            info += '</ul>'
                + '<div class="trash_w" onclick="Remove(' + i + ',' + 2 + ')"><i class="fa-solid fa-trash"></i></div>'
                + '</div>'
                + '</div>';
        }
    }
    else {
        document.getElementById("product_show").innerHTML = "<p>Chưa có sản phẩm vui lòng mua sản phẩm</p>";
    }
    document.getElementById("product_cart").style.display = "none";
    document.getElementById("wait").style.backgroundColor = "orange";
    document.getElementById("cart").style.backgroundColor = "white";
    document.getElementById("check").innerHTML = '<div id="checkbox" class="sanpham">Sản phẩm</div>';
    document.getElementById("money").style.display = "none";
    document.getElementById("product_show").style.display = "block";
    document.getElementById("product_show").innerHTML = info;
    document.getElementById("sym").style.display = "none";
}

// ,category,quantity,size,price,doiso
function Show(ID, idchild, quantity, price, vitri, thu, doiso) {
    if (doiso === 0) {
        var productList = JSON.parse(localStorage.getItem('product'));
        for (var i = 0; i < productList.length; i++) {
            if (idchild == productList[i].productId) {
                let w_id = vitri + 'id' + thu;
                let info = '<span class="show_id">MÃ ĐƠN HÀNG: ' + ID + '</span>'
                    + '<div class="show_image">'
                    + '<img src="' + productList[i].image + '" alt="Hình ảnh :)))">'
                    + '</div>'
                    + '<ul class="show_introduction">'
                    + '<li class="li_show">-Tên: ' + productList[i].productName + '</li>'
                    + '<li class="li_show">-Số lượng: ' + quantity + '</li>'
                    + '<li class="li_show">-Size: ' + document.getElementById(w_id).value + '</li>'
                    + '<li class="li_show">-Giá: ' + new Intl.NumberFormat().format(productList[i].price) + 'đ (1 cái)</li>'
                    + '<li class="li_show">-Tổng giá: ' + new Intl.NumberFormat().format(Number(quantity) * Number(productList[i].price)) + 'đ</li>'
                    + '</ul>';
                document.getElementById("show_product").innerHTML = info;
            }
        }
    }else{
        
    }
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

function Remove(productNum, co) {
    let item = [];
    if (confirm("Bạn có chắc là muốn xóa không? Nếu đồng ý thì chúng tôi không thể khôi phục lại cho bạn", 'warning')) {
        if (co === 1) {
            dele.push(goods[productNum]);
            item = goods.splice(productNum, 1);
            localStorage.setItem('cart', JSON.stringify(goods));
            localStorage.setItem('remove', JSON.stringify(dele));
            refrest();
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
    } else return;
}

function chooseall() {
    if (TOF === 1) {
        for (var i = 0; i < goods.length; i++) {
            if (checkbox[i].checked == false) {
                checkbox[i].checked = true;
                buyit(i);
            }
        }
        TOF = 0;
    } else if (TOF === 0) {
        for (var i = 0; i < goods.length; i++) {
            if (checkbox[i].checked == true) {
                checkbox[i].checked = false;
                buyit(i);
            }
        }
        TOF = 1;
    }
}