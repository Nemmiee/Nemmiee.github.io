/* #---------------------# */
/* |                     | */
/* | JS TRANG NGƯỜI DÙNG | */
/* |                     | */
/* #---------------------# */
createAdmin();
var e;
function createAdmin() {
	if (localStorage.getItem('user') === null) {
		var userArray = [];
		var user = { email: 'admin@gmail.com', password: 'admin1234', address: '273 An Dương Vương, Phường 3, Quận 5', phonenum: '0123456789', fullname: 'Nguyễn Minh Quang', };
		userArray.push(user);
		localStorage.setItem('user', JSON.stringify(userArray));
	}
}
function showLogin() {
	location.href = '../Account/signin.html';
}

function createUser(e) {
	e.preventDefault();
	var fullname = document.getElementById('fullname');
	var email = document.getElementById('Email');
	var password = document.getElementById('Password');
	var address = document.getElementById('Address');
	var phonenum = document.getElementById('Phonenum');
	var flag = true;
	if (!fullname.value) {
		document.getElementById('fullname').style.border = "2px solid red";
		document.getElementById('fullname').placeholder = "Vui lòng nhập họ tên";
		flag = false;
	}
	if (!email.value) {
		document.getElementById('Email').style.border = "2px solid red";
		document.getElementById('Email').placeholder = "Vui lòng nhập email của bạn";
		flag = false;
	}
	if (!address.value) {
		document.getElementById('Address').style.border = "2px solid red";
		document.getElementById('Address').placeholder = "Vui lòng nhập địa chỉ của bạn";
		flag = false;
	}
	if (!phonenum.value){
		document.getElementById('Phonenum').style.border = "2px solid red";
		document.getElementById('Phonenum').placeholder = "Vui lòng nhập SĐT của bạn";
		flag = false;
	}else{
		if (isNaN(Number(phonenum.value))) {
		document.getElementById('phonenum').style.display = "2px solid red";
		alert("Số điện thoại không hợp lệ") ;
		flag = false;
	}else {
		if (Number(phonenum.value)<100000000 || Number(phonenum.value)>999999999) {
			document.getElementById('Phonenum').style.border = "2px solid red";
			alert("Số điện thoại không đúng");
			flag = false;
			}
		document.getElementById('phonenum').style.border = "none";
		}
	}
	if (!password.value) {
		document.getElementById('Password').style.border = "2px solid red";
		document.getElementById('Password').placeholder = "Vui lòng nhập password của bạn";
		flag = false;
	} else {
		if (password.value.length < 8) {
			document.getElementById('password').style.border = "2px solid red";
			document.getElementById('Password').placeholder = "Mật khẩu của bạn phải dài hơn 8 ký tự";
			flag = false;
		}else{
			document.getElementById('password').style.border = "none";
		}
	}
	if (flag == false) {
		return false;
	}
	createAdmin();
	let user = { email: email.value, password: password.value, address: address.value, fullname: fullname.value, phoneNum: phonenum.value };
	var userArray = JSON.parse(localStorage.getItem('user'));
	for (var i = 0; i < userArray.length; i++) {
		if (user.email == userArray[i].email) {
			document.getElementById('Email').style.border = "2px solid red";
			alert("Email này đã có người sử dụng") ;
			email.focus();
			return false;
		}else{
			document.getElementById('email').style.border = "none";
		}
	}
	userArray.push(user);
	localStorage.setItem('user', JSON.stringify(userArray));
	alert('Bạn đã đăng ký thành công!', 'success');
	showLogin();
}
function login(e) {
	e.preventDefault();
	document.getElementById('loginerror').style.display = 'none';
	var email = document.getElementById('Emaillogin');
	var password = document.getElementById('Passwordlogin');
	var flag = true;
	if (!email.value) {
		document.getElementById('emaillogin').style.border = "2px solid red";
		document.getElementById('Emaillogin').placeholder = "Vui lòng nhập email của bạn";
		flag = false;
	}
	else {
		document.getElementById('emaillogin').style.border = "none";
	}
	if (!password.value) {
		document.getElementById('passwordlogin').style.border = "2px solid red";
		document.getElementById('Passwordlogin').placeholder = "Vui lòng nhập password của bạn";
		flag = false;
	}
	else {
		document.getElementById('passwordlogin').style.border = "none";
	}
	if (flag == false) {
		return false;
	}
	var userArray = JSON.parse(localStorage.getItem('user'));
	for (var i = 0; i < userArray.length; i++) {
		if (email.value == userArray[i].email) {
			if (password.value == userArray[i].password) {
				localStorage.setItem('userlogin', JSON.stringify(userArray[i]));
				window.location.href ="../index.html";
				return true;
			}
		}
	}
	document.getElementById('loginerror').style.display = 'block';
	// document.getElementById('loginrerror').innerHTML = 'sai';
	return false;
}
function logout() {
	localStorage.removeItem('userlogin');
	// localStorage.removeItem('cart');
	location.href = "../index.html";
}
function checklogin() {
	if (localStorage.getItem('userlogin')) {
		var user = JSON.parse(localStorage.getItem('userlogin'));
		var s = '';
		var d ='';
		var t = '';
		if (user.email == 'admin@gmail.com') {
			d = '<div class="icon"><a href="../admin/products.html"><i class="fa-solid fa-lg fa-cog header-icon"></i></a></div>';
			s =	'<li>'+
						'<button id="btnlg">' + user.fullname +'</button>'+
						'<a href="../index.html" onclick="logout()" class="user-icon">'+
							'<i class="fa-solid fa-lg fa-right-from-bracket"></i>'+
						'</a>'
				'</li>' ;
				
			t = '<a href="../index.html"><li><span class="sidebar-item">Trang chủ</span></li></a>'+
				'<a href="../File/products.html""><li><span class="sidebar-item">Sản Phẩm</span></li></a>'+
				'<a href="../File/sizecheck.html"><li><span class="sidebar-item">Size guide</span></li></a>'+
				'<a href="../File/contact.html"><li><span class="sidebar-item">Liên hệ</span></li></a>'+
				'<a href="../admin/products.html"><li><span class="sidebar-item">Quản lý</span></li></a>'+
				'<a href="#"><li><span class="sidebar-item" onClick="logout()">Đăng xuất</span></li></a>';
			} else {
			s = '<li>'+
						'<button id="btnlg">' + user.fullname +'</button>'+
						'<a href="../index.html" onclick="logout()" class="user-icon">'+
							'<i class="fa-solid fa-right-from-bracket"></i>'+
						'</a>'
				'</li>' ;
			
			t = '<a href="../index.html"><li><span class="sidebar-item">Trang chủ</span></li></a>'+
				'<a href="../File/products.html""><li><span class="sidebar-item">Sản Phẩm</span></li></a>'+
				'<a href="../File/sizecheck.html"><li><span class="sidebar-item">Size guide</span></li></a>'+
				'<a href="../File/contact.html"><li><span class="sidebar-item">Liên hệ</span></li></a>'+
				'<a href="#" onClick="logout()"><li><span class="sidebar-item">Đăng xuất</span></li></a>';
		}
		document.querySelector('.user').innerHTML = s;
		document.querySelector('#manage').innerHTML = d;
		document.querySelector('#sidebar-list').innerHTML = t;
	}
}