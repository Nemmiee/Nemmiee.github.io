
function search_dropdown() {
	document.getElementById("header-dropdown").classList.toggle("hienThi");
}

function logout() {
	localStorage.removeItem('userlogin');
	localStorage.removeItem('cart');
}
/* Responsive header 3 gạch */
let hamburger = document.querySelector("#hamburger");
hamburger.addEventListener("click", function () {
	document.querySelector("body").classList.toggle("active");
})

/* Nút X tắt header 3 gạch */
let turnOffSideBar = document.querySelector("#turnoff-btn");
turnOffSideBar.addEventListener("click", function () {
	document.querySelector("body").classList.toggle("active");
})
/* Nút X tắt header 3 gạch */


// Products
function showProductList(vitri) {
	var productList = JSON.parse(localStorage.getItem('product'));
	var s = '<tr><th>ID</th><th>Ảnh áo</th><th>Tên sản phẩm</th><th>Loại áo</th><th>Giá (VNĐ)</th><th>Chức năng</th></tr>';
	var dem = 0;
	for (var i = vitri; i < productList.length; i++) {
		s += '<tr>' +
			'<td>' + productList[i].productId + '</td>' +
			'<td><img src="' + productList[i].image + '"></td>' +
			'<td>' + productList[i].productName + '</td>' +
			'<td>' + productList[i].category.toUpperCase() + '</td>' +
			'<td>' + productList[i].price + ' đ' + '</td>' +
			'<td>' +
			'<button class="delete" onClick="deleteproduct(\'' + productList[i].productId + '\')">&times;</div>' +
			'<button class="change" onClick="showchangeproductbox(\'' + productList[i].productId + '\')">Sửa</div>' +
			'</td>' +
			'</tr>';
		dem++;
		if (dem == 10) {
			break;
		}
	}
	document.getElementById('productlist').innerHTML = s;
	setPagination();
}

function setPagination() {
	var productList = JSON.parse(localStorage.getItem('product'));
	var sotrang = Math.ceil(productList.length / 10);
	var button = '';
	for (var i = 1; i <= sotrang; i++) {
		vitri = (i - 1) * 10;
		button += '<button class="pageNumber" onClick="showProductList(' + vitri + ')">' + i + '</button>';
	}
	document.getElementById('pagination').innerHTML = button;
}

function hidePagination() {
	const pag = document.querySelector('.pagination')
	pag.classList.add('hide')
}

function showPagination() {
	const pag = document.querySelector('.pagination')
	pag.classList.remove('hide')
}

function searchproduct() {
	var productList = JSON.parse(localStorage.getItem('product'));
	var name = document.getElementById('searchproductname').value.toLowerCase();
	var category = document.getElementById('searchproductbrand').value.toLowerCase();
	var s = '<tr><th>ID</th><th>Ảnh áo</th><th>Tên sản phẩm</th><th>Loại áo</th><th>Giá (VNĐ)</th><th>Chức năng</th></tr>';
	if (category == 'all') {
		if (!name) {
			showProductList(0);
			showPagination()
		}
		else {
			for (var i = 0; i < productList.length; i++) {
				if (productList[i].productName.toLowerCase().search(name) >= 0) {
					s += '<tr>' +
						'<td>' + productList[i].productId + '</td>' +
						'<td><img src="' + productList[i].image + '"></td>' +
						'<td>' + productList[i].productName + '</td>' +
						'<td>' + productList[i].category.toUpperCase() + '</td>' +
						'<td>' + productList[i].price + ' đ' + '</td>' +
						'<td>' +
						'<button class="delete" onClick="deleteproduct(\'' + productList[i].productId + '\')">&times;</div>' +
						'<button class="change" onClick="showchangeproductbox(\'' + productList[i].productId + '\')">Sửa</div>' +
						'</td>' +
						'</tr>';
				}
			}
			hidePagination()
			document.getElementById('productlist').innerHTML = s;
		}
	}
	else {
		for (var i = 0; i < productList.length; i++) {
			if (productList[i].productName.toLowerCase().search(name) >= 0 && productList[i].category.toLowerCase() == category) {
				s += '<tr>' +
					'<td>' + productList[i].productId + '</td>' +
					'<td><img src="'+ productList[i].image +'"></td>' +
					'<td>' + productList[i].productName + '</td>' +
					'<td>' + productList[i].category.toUpperCase() + '</td>' +
					'<td>' + productList[i].price + ' đ' + '</td>' +
					'<td>' +
					'<button class="delete" onClick="deleteproduct(\'' + productList[i].productId + '\')">&times;</div>' +
					'<button class="change" onClick="showchangeproductbox(\'' + productList[i].productId + '\')">Sửa</div>' +
					'</td>' +
					'</tr>';
			}
		}
		hidePagination()
		document.getElementById('productlist').innerHTML = s;
	}
}

function deleteproduct(btndelete) {
	var productArray = JSON.parse(localStorage.getItem('product'));
	var vitri;
	for (var i = 0; i < productArray.length; i++) {
		if (productArray[i].productId == btndelete) {
			if (confirm('Bạn có muốn xóa sản phẩm này?')) {
				productArray.splice(i, 1);
			}
			vitri = (Math.floor(i / 10) * 10);
		}
	}
	localStorage.setItem('product', JSON.stringify(productArray));
	showProductList(vitri);
}

function showchangeproductbox(productid) {
	document.getElementById('modal1').style.display = 'block';
	var productList = JSON.parse(localStorage.getItem('product'));
	for (var i = 0; i < productList.length; i++) {
		if (productList[i].productId == productid) {
			document.getElementById('imgbefore').src = productList[i].image;
			document.getElementById('name').value = productList[i].productName;
			document.getElementById('price').value = productList[i].price;
			document.getElementById('save').setAttribute('onClick', 'changeproduct(' + productList[i].productId + ')');
		}
	}
}

function changeproduct(productid) {
	document.getElementById('modal1').style.display = 'none';
	var productList = JSON.parse(localStorage.getItem('product'));
	var vitri;
	for (var i = 0; i < productList.length; i++) {
		if (productList[i].productId == productid) {
			productList[i].image = document.getElementById('imgbefore').src;
			productList[i].productName = document.getElementById('name').value;
			productList[i].price = document.getElementById('price').value;
			vitri = (Math.floor(i / 10) * 10);
		}
	}
	localStorage.setItem('product', JSON.stringify(productList));
	showProductList(vitri);
}

function changeimg(input) {
	var reader = new FileReader();
	reader.onload = function (e) {
		document.getElementById('imgbefore').src = e.target.result;
	};
	reader.readAsDataURL(input.files[0]);
}

var arrImg = [];
function changeimgadd(event) {
	var selectedFile = event.target.files[0];
	var reader = new FileReader();

	var imgtag = document.getElementById("imgadd");
	console.log (selectedFile);
	imgtag.title = selectedFile.name;

	reader.onload = function (event) {
		imgtag.src = event.target.result;
		if (arrImg.includes(reader.result) == false) {
			arrImg.unshift(reader.result);
		  }
	};
	reader.readAsDataURL(selectedFile);
}

function showaddbox() {
	document.getElementById('modal2').style.display = 'block';
}

function addProduct() {
	document.getElementById('modal2').style.display = 'none';
	var productList = JSON.parse(localStorage.getItem('product'));
	for (let i = 1; i < productList.length; i++){
		var productid = productList[productList.length - 1].productId + i;
	}
	var productname = document.getElementById('productname');
	var brand = document.getElementById('brand');
	var price = document.getElementById('productprice');
	var img = arrImg[0];
	

	if (!brand.value || !productname.value || !price.value) {
		alert('Bạn chưa nhập đủ thông tin sản phẩm', 'warning');
		return false;
	}
	if (isNaN(Number(price.value))) {
		alert('Giá không hợp lệ', 'warning');
		return false;
	}
	var producttemp = { productId: productid, category: brand.value, image: img, productName: productname.value, price: price.value };
	productList.unshift (producttemp);
	localStorage.setItem('product', JSON.stringify(productList));
	showProductList(0);
	alert("Thêm sản phẩm thành công");
}

function closebox() {
	document.getElementById('modal1').style.display = 'none';
	document.getElementById('modal2').style.display = 'none';
}
function closeaddbox (){
	document.getElementById('modal2').style.display = 'none';
	
}
// User
function showUserList() {
	if (localStorage.getItem('user') === null) {
		return false;
	}
	var userArray = JSON.parse(localStorage.getItem('user'));
	var tr = '<tr><th>STT</th><th>Tên khách hàng</th><th>Tên đăng nhập</th><th>Địa chỉ</th><th>Số điện thoại</th><th>Chức năng</th></tr>';
	for (var i = 1; i < userArray.length; i++) {
		tr += '<tr>' +
			'<td>' + i + '</td>' +
			'<td>' + userArray[i].fullname + '</td>' +
			'<td>' + userArray[i].email + '</td>' +
			'<td>' + userArray[i].address + '</td>' +
			'<td>' + userArray[i].phoneNum + '</td>' +
			'<td>' +
			'<button class="change" onClick="showchangeuserbox(\'' + userArray[i].email + '\')">Sửa</div>'+
			'<button class="delete" onClick="deleteUser(\'' + userArray[i].email + '\')">&times;</button>' +
			'</td>' +
			'</tr>';
	}
	document.getElementById('userlist').innerHTML = tr;
}
function searchUser() {
	var userArray = JSON.parse(localStorage.getItem('user'));
	var name = document.getElementById('username').value.toLowerCase();
	var fullName = document.getElementById('fullname').value.toLowerCase();
	var tr = '<tr><th>STT</th><th>Tên khách hàng</th><th>Tên đăng nhập</th><th>Địa chỉ</th><th>Số điện thoại</th><th>Chức năng</th></tr>';
	for (var i = 1; i < userArray.length; i++) {
		if (userArray[i].email.toLowerCase().search(name) >= 0 && userArray[i].fullname.toLowerCase().search(fullName) >= 0) {
			tr += '<tr>' +
				'<td>' + i + '</td>' +
				'<td>' + userArray[i].fullname + '</td>' +
				'<td>' + userArray[i].email + '</td>' +
				'<td>' + userArray[i].address + '</td>' +
				'<td>' + userArray[i].phoneNum + '</td>' +
				'<td>' +
				'<button class="change" onClick="showchangeuserbox(\'' + userArray[i].email + '\')">Sửa</div>'+
				'<button class="delete" onClick="deleteUser(\'' + userArray[i].email + '\')">&times;</button>' +
				'</td>' +
				'</tr>';
		}
	}
	document.getElementById('userlist').innerHTML = tr;
}
function closechangebox (){
	document.getElementById('modal1').style.display = 'none';
	
} 
function showchangeuserbox(email) {
	document.getElementById('modal1').style.display = 'block';
	var userArray = JSON.parse(localStorage.getItem('user'));
	for (var i = 0; i < userArray.length; i++) {
		if (userArray[i].email === email) {
			console.log(userArray[i].email);
			document.getElementById('address').value = userArray[i].address;
			document.getElementById('fullName').value = userArray[i].fullname;
			document.getElementById('phonenum').value = userArray[i].phoneNum;
			document.getElementById('password').value = userArray[i].password;
			document.getElementById('save').setAttribute('onClick', 'changeuser('+ i +')');
		}
	}
}

function changeuser(index) {
	document.getElementById('modal1').style.display = 'none';
	var userArray = JSON.parse(localStorage.getItem('user'));
	for (var i = 0; i < userArray.length; i++){
		if (i === index){

		userArray[i] = {
			
			address : document.querySelector('#address').value,
			email: userArray[i].email,
			fullname : document.querySelector('#fullName').value,
			password : document.querySelector('#password').value,	
			phoneNum : document.querySelector('#phonenum').value,
			
			}
			vitri = (Math.floor(i / 10)) * 10;
		}
		localStorage.setItem("user", JSON.stringify(userArray));
	}
	showUserList(vitri);
}

function deleteUser(btndelete) {
	var userArray = JSON.parse(localStorage.getItem('user'));
	var vitri;
	for (var i = 0; i < userArray.length; i++) {
		if (userArray[i].email == btndelete) {
			if (confirm('Bạn có muốn xóa khách hàng này?')) {
				userArray.splice(i, 1);
			}
			vitri = (Math.floor(i / 10) * 10);
		}
	}
	localStorage.setItem('user', JSON.stringify(userArray));
	showUserList(vitri);
}

// Bill cart
function showbilllist() {
	if (localStorage.getItem('wait') === null) {
		var s = '<tr><th>Ngày</th><th>Khách hàng</th><th>Giá (VNĐ)</th><th>Thông tin</th><th>Trạng thái</th></tr>';
		document.getElementById('billlist').innerHTML = s;
		return false;
	}
	var s = '<tr><th>Ngày</th><th>Khách hàng</th><th>Giá (VNĐ)</th><th>Thông tin</th><th>Trạng thái</th></tr>';
	var billList = JSON.parse(localStorage.getItem('wait'));
	for (var i = 0; i < billList.length; i++) {
		if (billList[i].status == 'Chưa xử lý') {
			s += '<tr>' +
				'<td>' + billList[i].time + '</td>' +
				'<td>' + billList[i].costumer.fullname + '</td>' +
				'<td>' + billList[i].totalprice + ' đ' + '</td>' +
				'<td><a onClick="infobill(' + billList[i].codeID + ')">Xem thông tin</a></td>' +
				'<td style="color: red">' + billList[i].status + '</td>' +
				'</tr>';
		} else {
			s += '<tr>' +
				'<td>' + billList[i].time + '</td>' +
				'<td>' + billList[i].costumer.fullname + '</td>' +
				'<td>' + billList[i].totalprice + ' đ' + '</td>' +
				'<td><a onClick="infobill(' + billList[i].codeID + ')">Xem thông tin</a></td>' +
				'<td style="color: blue">' + billList[i].status + '</td>' +
				'</tr>';
		}
	}
	document.getElementById('billlist').innerHTML = s;
}

function infobill(id) {
	document.getElementById('modal1').style.display = 'block';
	var billList = JSON.parse(localStorage.getItem('wait'));
	var s = '<button class="close" onClick="closeinfobill()">&times;</button>';
	for (var i = 0; i < billList.length; i++) {
		if (billList[i].codeID == id) {
			s += '<h4>Thông tin đơn hàng:</h4>' +
				'<p>' + billList[i].product + '</p>' +
				'<h4>Ngày tạo đơn hàng:</h4>' +
				'<p>' + billList[i].time + '</p>' +
				'<h4>Tên khách hàng:</h4>' +
				'<p>' + billList[i].costumer.fullname + '</p>' +
				'<h4>Địa chỉ:</h4>' +
				'<p>' + billList[i].costumer.address + '</p>' +
				'<h4>Số điện thoại liên lạc:</h4>' +
				'<p>' + billList[i].costumer.phoneNum + '</p>' +
				'<h4>Tổng giá tiền:</h4>' +
				'<p>' + billList[i].totalprice + ' đ' + '</p>';
			if (billList[i].status == "Chưa xử lý") {
				s += '<h4>Tình trạng:</h4>' +
					'<div><span id="status" style="color:red">' + billList[i].status + '</span><label><input type="checkbox" onchange="changeStatus(this,' + billList[i].codeID + ')" ><span class="slider"></span></label></div>';
			}
			else {
				s += '<h4>Tình trạng:</h4>' +
					'<div><span id="status" style="color:blue">' + billList[i].status + '</span><label><input type="checkbox" checked onchange="changeStatus(this,' + billList[i].codeID + ')" ><span class="slider"></span></label></div>';
			}
		}
	}
	document.getElementById('info').innerHTML = s;
}
function closeinfobill() {

	document.getElementById('modal1').style.display = 'none';
}

function changeStatus(checkbox, id) {
	var billList = JSON.parse(localStorage.getItem('wait'));
	if (checkbox.checked == true) {
		for (var i = 0; i < billList.length; i++) {
			if (billList[i].codeID == id) {
				billList[i].status = 'Đã xử lý';
			}
		}
		document.getElementById('status').innerHTML = "Đã xử lý";
		document.getElementById('status').style.color = 'blue';
	} else {
		for (var i = 0; i < billList.length; i++) {
			if (billList[i].codeID == id) {
				billList[i].status = 'Chưa xử lý';
			}
		}
		document.getElementById('status').innerHTML = "Chưa xử lý";
		document.getElementById('status').style.color = 'red';
	}
	localStorage.setItem('wait', JSON.stringify(billList));
	showbilllist();
}

function searchBill(){
	var billList = JSON.parse(localStorage.getItem('wait'));
	var status =document.getElementById('statusbill').value;
	var name =document.getElementById('fullName').value.toLowerCase();
	var dateControl = document.querySelector('input[type="date"]').value;
	console.log(dateControl);
	
	var billListTemp = [];
	for (var i = 0; i < billList.length; i++) {
		console.log(billList[i].time);
		if(status == billList[i].status && billList[i].costumer.fullname.toLowerCase().search(name) >= 0 && (billList[i].time == dateControl)) {
			billListTemp.push(billList[i]);
		}
	}
	var s = '<tr><th>Ngày</th><th>Khách hàng</th><th>Giá (VNĐ)</th><th>Thông tin</th><th>Trạng thái</th></tr>';
	for(var i=0;i<billListTemp.length;i++){
		if(billListTemp[i].status=='Chưa xử lý'){
			s+='<tr onClick="showinfobill('+billListTemp[i].codeID+')">'+
						'<td>'+billListTemp[i].time+'</td>'+
						'<td>'+billListTemp[i].costumer.fullname+'</td>'+
						'<td>'+billListTemp[i].totalprice+'</td>'+
						'<td><a onClick="infobill(' + billList[i].codeID + ')">Xem thông tin</a></td>' +
						'<td style="color: red">'+billListTemp[i].status+'</td>'+
					'</tr>';
		}
		else {
			s+='<tr onClick="showinfobill('+billListTemp[i].id+')">'+
						'<td>'+billListTemp[i].time+'</td>'+
						'<td>'+billListTemp[i].costumer.fullname+'</td>'+
						'<td>'+billListTemp[i].totalprice+'</td>'+
						'<td><a onClick="infobill(' + billList[i].codeID + ')">Xem thông tin</a></td>' +
						'<td style="color: blue">'+billListTemp[i].status+'</td>'+
					'</tr>';
		}
	}
	document.getElementById('billlist').innerHTML=s;
}