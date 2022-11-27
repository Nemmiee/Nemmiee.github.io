
function search_dropdown() {
    document.getElementById("header-dropdown").classList.toggle("hienThi");
}

function logout(){
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

function showProductList(vitri){
	var productList = JSON.parse(localStorage.getItem('product'));
	var s='<tr><th>Mã sản phẩm</th><th>Ảnh áo</th><th>Tên sản phẩm</th><th>Loại áo</th><th>Giá (VNĐ)</th><th>Chức năng</th></tr>';
	var dem = 0;
	for(var i=vitri;i<productList.length;i++){
		s+='<tr>'+
				'<td>'+productList[i].productId+'</td>'+
				'<td><img src="../'+productList[i].image+'"></td>'+
				'<td>'+productList[i].productName+'</td>'+
				'<td>'+productList[i].category.toUpperCase()+'</td>'+
				'<td>'+productList[i].price+'</td>'+
				'<td>'+
					'<button class="delete" onClick="deleteproduct(\''+productList[i].productId+'\')">&times;</div>'+
					'<button class="change" onClick="showchangeproductbox(\''+productList[i].productId+'\')">Sửa</div>'+
					'</td>'+
			'</tr>';
		dem++;
		if(dem==10){
			break;
		}
	}
	document.getElementById('productlist').innerHTML=s;
	setPagination();
}

function setPagination(){
	var productList = JSON.parse(localStorage.getItem('product'));
	var sotrang=Math.ceil(productList.length/10);
		var button='';
		for(var i = 1;i<=sotrang;i++){
			vitri=(i-1)*10;
			button += '<button class="pageNumber" onClick="showProductList('+vitri+')">'+i+'</button>';
		}
	document.getElementById('pagination').innerHTML = button;
}

function hidePagination() {
	const pag = document.querySelector('.pagination')
	console.log(pag);
	pag.classList.add('hide')
}

function showPagination() {
	const pag = document.querySelector('.pagination')
	console.log(pag);
	pag.classList.remove('hide')
}

function searchproduct(){
	var productList = JSON.parse(localStorage.getItem('product'));
	var name = document.getElementById('searchproductname').value.toLowerCase();
	var category = document.getElementById('searchproductbrand').value.toLowerCase();
	var s='<tr><th>Mã sản phẩm</th><th>Ảnh áo</th><th>Tên sản phẩm</th><th>Loại áo</th><th>Giá (VNĐ)</th><th>Chức năng</th></tr>';
		if (category=='all') {
			if(!name){
				showProductList(0);
				showPagination()
			}
			else {
				for(var i = 0; i < productList.length; i++) {
					if (productList[i].productName.toLowerCase().search(name) >=0) {
						s+='<tr>'+
							'<td>'+productList[i].productId+'</td>'+
							'<td><img src="../'+productList[i].image+'"></td>'+
							'<td>'+productList[i].productName+'</td>'+
							'<td>'+productList[i].category.toUpperCase()+'</td>'+
							'<td>'+productList[i].price+'</td>'+
							'<td>'+
								'<button class="delete" onClick="deleteproduct(\''+productList[i].productId+'\')">&times;</div>'+
								'<button class="change" onClick="showchangeproductbox(\''+productList[i].productId+'\')">Sửa</div>'+
							'</td>'+
						'</tr>';
					}
				}
				hidePagination()
				document.getElementById('productlist').innerHTML=s;
			}
		}
		else{
			for(var i = 0; i < productList.length; i++) {
						if (productList[i].productName.toLowerCase().search(name)  >=0  && productList[i].category.toLowerCase()==category) {
							s+='<tr>'+
									'<td>'+productList[i].productId+'</td>'+
									'<td><img src="../'+productList[i].image+'"></td>'+
									'<td>'+productList[i].productName+'</td>'+
									'<td>'+productList[i].category.toUpperCase()+'</td>'+
									'<td>'+productList[i].price+'</td>'+
									'<td>'+
										'<button class="delete" onClick="deleteproduct(\''+productList[i].productId+'\')">&times;</div>'+
										'<button class="change" onClick="showchangeproductbox(\''+productList[i].productId+'\')">Sửa</div>'+
									'</td>'+
							'</tr>';
						}		
			}
			hidePagination()
			document.getElementById('productlist').innerHTML=s;
		}
}

function deleteproduct(btndelete){
	var productArray = JSON.parse(localStorage.getItem('product'));
	var vitri;
	for(var i=0;i<productArray.length;i++){
		if(productArray[i].productId == btndelete){
			if(confirm('Bạn có muốn xóa sản phẩm này?')){
				productArray.splice(i, 1);
			}
		vitri=(Math.floor(i/10)*10);
		}
	}
	localStorage.setItem('product',JSON.stringify(productArray));
	showProductList(vitri);
}

function showchangeproductbox(productid){
	document.getElementById('modal1').style.display = 'block';
	var productList = JSON.parse(localStorage.getItem('product'));
	for(var i=0;i<productList.length;i++){
		if(productList[i].productId == productid){
			document.getElementById('imgbefore').src="../"+productList[i].image;
			document.getElementById('name').value=productList[i].productName;
			document.getElementById('price').value=productList[i].price;
			document.getElementById('save').setAttribute('onClick', 'changeproduct('+productList[i].productId+')');
		}
	}
}

function changeproduct(productid){
	document.getElementById('modal1').style.display = 'none';
	var productList = JSON.parse(localStorage.getItem('product'));
	var vitri;
	for(var i=0;i<productList.length;i++){
		if(productList[i].productId == productid){
			productList[i].image=document.getElementById('imgbefore').src;
			productList[i].productName=document.getElementById('name').value;
			productList[i].price=document.getElementById('price').value;
			vitri = (Math.floor(i/10))*10;
		}
	}
	localStorage.setItem('product', JSON.stringify(productList));
	showProductList(vitri);
}

function changeimg(input){
    var reader = new FileReader();	
    reader.onload = function (e) {
        document.getElementById('imgbefore').src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
}

function changeimgadd(event){
	var selectedFile = event.target.files[0];
	var reader = new FileReader();
  
	var imgtag = document.getElementById("imgadd");
	imgtag.title = selectedFile.name;
  
	reader.onload = function(event) {
	  imgtag.src = event.target.result;
	};
  
	reader.readAsDataURL(selectedFile);
	
}
function showaddbox(){
	document.getElementById('modal2').style.display = 'block';
}

function addProduct(){
	document.getElementById('modal2').style.display = 'none';
	var productList = JSON.parse(localStorage.getItem('product'));
	var productid = productList[0].productId+1;
	var productname = document.getElementById('productname');
	var brand = document.getElementById('brand');
	var price = document.getElementById('productprice');
	
	if(!brand.value || !productname.value || !price.value){
		alert('Bạn chưa nhập đủ thông tin sản phẩm','warning');
		return false;
	   }
	if(isNaN(Number(price.value))){
		alert('Giá không hợp lệ','warning');
		return false;
	   }
	var producttemp = {productId: productid, category: brand.value,image: '/img/products/no-image.jpg', productName: productname.value, price: price.value};
	productList.unshift(producttemp);
	localStorage.setItem('product',JSON.stringify(productList));
	showProductList(0);
	alert("Thêm sản phẩm thành công");
}

function closebox(){
	document.getElementById('modal1').style.display = 'none';
	document.getElementById('modal2').style.display = 'none';
}

// User
function showUserList(){
	if(localStorage.getItem('user')===null){
		return false;
	}
	var userArray = JSON.parse(localStorage.getItem('user'));
	var tr='<tr><th>STT</th><th>HỌ TÊN KHÁCH HÀNG</th><th>TÊN ĐĂNG NHẬP</th><th>ĐỊA CHỈ</th><th>SỐ ĐIỆN THOẠI</th><th>CHỨC NĂNG</th></tr>';
	for(var i = 1; i< userArray.length;i++){
		tr+='<tr>'+
		'<td>'+i+'</td>'+
		'<td>'+userArray[i].fullname+'</td>'+
		'<td>'+userArray[i].email+'</td>'+
		'<td>'+userArray[i].address+'</td>'+
		'<td>'+userArray[i].phoneNum+'</td>'+
		'<td>'+
			'<button class="delete" onClick="deleteUser(\''+userArray[i].email+'\')">&times;</button>'+
		'</td>'+
		'</tr>';
	}
	document.getElementById('userlist').innerHTML=tr;
}
function searchUser(){
	var userArray = JSON.parse(localStorage.getItem('user'));
	var name = document.getElementById('username').value.toLowerCase();
	var fullName =document.getElementById('fullname').value.toLowerCase();
	var tr='<tr><th>STT</th><th>HỌ TÊN KHÁCH HÀNG</th><th>TÊN ĐĂNG NHẬP</th><th>ĐỊA CHỈ</th><th>SỐ ĐIỆN THOẠI</th><th>CHỨC NĂNG</th></tr>';
	for(var i = 1; i < userArray.length; i++) {
		if (userArray[i].email.toLowerCase().search(name) >=0 && userArray[i].fullname.toLowerCase().search(fullName) >=0) {
			tr+='<tr>'+
			'<td>'+i+'</td>'+
			'<td>'+userArray[i].fullname+'</td>'+
			'<td>'+userArray[i].address+'</td>'+
			'<td>'+userArray[i].email+'</td>'+
			'<td>'+userArray[i].phoneNum+'</td>'+
			'<td>'+
				'<button class="delete" onClick="deleteUser(\''+userArray[i].email+'\')">&times;</button>'+
			'</td>'+
			'</tr>';
		}
	}
	document.getElementById('userlist').innerHTML=tr;
}
function deleteUser(btndelete){
		var userArray = JSON.parse(localStorage.getItem('user'));
		var vitri;
		for(var i=0;i<userArray.length;i++){
			if(userArray[i].email == btndelete){
				if(confirm('Bạn có muốn xóa sản phẩm này?')){
					userArray.splice(i, 1);
				}
			vitri=(Math.floor(i/10)*10);
			}
		}
		localStorage.setItem('user',JSON.stringify(userArray));
		showUserList(vitri);
}

// Bill cart
 