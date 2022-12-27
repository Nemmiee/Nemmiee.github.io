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
		var user = { 
		email: 'admin@gmail.com',
		password: 'admin1234',
		address: '273 An Dương Vương, Phường 3, Quận 5',
		phonenum: '0123456789',
		fullname: 'Nguyễn Minh Quang',
		};
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
	var password = document.getElementById('password');
	var address = document.getElementById('address');
	var phonenum = document.getElementById('phonenum');
	var email = document.getElementById('email');

	const isValidEmail = email => {
		const re =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return re.test(String(email).toLowerCase());
	}

	const setError= (element, message) => {
		const inputControl = element.parentElement;
		const errorDisplay = inputControl.querySelector('.error');
		
		errorDisplay.innerText = message;
		inputControl.classList.add('error');
		inputControl.classList.remove('success');
	}
	const setSuccess = element => {
		const inputControl = element.parentElement;
		const errorDisplay = inputControl.querySelector('.error');

		errorDisplay.innerText = '';
		inputControl.classList.add('success');
		inputControl.classList.remove('error');
	}
	// Check fullname
	if (fullname.value === '') {
		setError(fullname, 'Vui lòng nhập họ tên');
	}else{
		setSuccess(fullname);
	}

	// Check email

	if (email.value === '') {
		setError(email, 'Vui lòng nhập email');
    } else if (!(isValidEmail(email.value))) {
		console.log((isValidEmail(email.value)));
		setError(email, 'Vui lòng nhập đúng email (example: abc@gmail.com)');
    }else {
        setSuccess(email);
	}

	// Check address
	if (address.value === '') {
		setError(address, 'Vui lòng nhập địa chỉ');
	}else{
		setSuccess(address);
	}

	// Check Phone 
	if (phonenum.value === '') {
		setError(phonenum, 'Vui lòng nhập số điện thoại');
	} else {
		if (isNaN(Number(phonenum.value))) {
			setError(phonenum, 'Số điện thoại không hợp lệ');
			flag = false;
		} else {
			if (Number(phonenum.value) < 100000000 || Number(phonenum.value) > 999999999) {
				setError(phonenum, 'Số điện thoại không đúng ');
			}
		}
	}
	
	// Check password
    if(password.value === '') {
        setError(password, 'Vui lòng nhập mật khẩu');
    } else if (password.value.length < 8 ) {
        setError(password, 'Mật khẩu dài ít nhất 8 kí tự.')
    } else {
        setSuccess(password);
    }

	createAdmin();
	let user = { email: email.value, password: password.value, address: address.value, fullname: fullname.value, phoneNum: phonenum.value };
	var userArray = JSON.parse(localStorage.getItem('user'));
	for (var i = 0; i < userArray.length; i++) {
		if (user.email == userArray[i].email) {
			setError(email, 'Email đã có người sử dụng');
			email.focus();
		}
	}
	if (!(fullname.value === '')  &&  !(address.value === '') && (Number(phonenum.value) > 100000000 && Number(phonenum.value) < 999999999 )){
		userArray.push(user);
		localStorage.setItem('user', JSON.stringify(userArray));
		alert('Bạn đã đăng ký thành công!', 'success');
		showLogin();
	}
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
				window.location.href = "../index.html";
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
	location.href = "../index.html";
}
function checklogin() {
	if (localStorage.getItem('userlogin')) {
		var user = JSON.parse(localStorage.getItem('userlogin'));
		var s = '';
		var d = '';
		var t = '';
		if (user.email == 'admin@gmail.com') {
			d = '<div class="icon"><a href="../admin/products.html"><i class="fa-solid fa-user-gear fa-lg header-icon"></i></a></div>';
			s = '<li>' +
				'<button id="btnlg">' + cutName(user.fullname) + '</button>' +
				'<a href="../index.html" onclick="logout()" class="user-icon">' +
				'<i class="fa-solid fa-lg fa-right-from-bracket"></i>' +
				'</a>'
			'</li>';

			var pos = window.location.pathname.lastIndexOf('/');
			var path = window.location.pathname.substring(pos + 1);
			path = path.split(".")[0];
			if (path === "index") {
				t = '<a href="../index.html"><li class="active"><i class="fa-solid fa-house fa-fw"></i><span class="sidebar-item">Trang chủ</span></li></a>' +
					'<a href="../File/products.html""><li><i class="fa-solid fa-shirt fa-fw"></i><span class="sidebar-item">Sản Phẩm</span></li></a>' +
					'<a href="../File/sizecheck.html"><li><i class="fa-solid fa-ruler fa-fw"></i><span class="sidebar-item">Size guide</span></li></a>' +
					'<a href="../File/contact.html"><li><i class="fa-solid fa-envelope fa-fw"></i><span class="sidebar-item">Liên hệ</span></li></a>' +
					'<a href="../admin/products.html"><li><i class="fa-solid fa-user-gear fa-fw"></i><span class="sidebar-item">Quản lý</span></li></a>' +
					'<a href="#" onClick="logout()"><li><i class="fa-solid fa-right-to-bracket fa-fw"></i><span class="sidebar-item">Đăng xuất</span></li></a>';
			}
			else if (path === "products") {
				t = '<a href="../index.html"><li><i class="fa-solid fa-house fa-fw"></i><span class="sidebar-item">Trang chủ</span></li></a>' +
					'<a href="../File/products.html""><li class="active"><i class="fa-solid fa-shirt fa-fw"></i><span class="sidebar-item">Sản Phẩm</span></li></a>' +
					'<a href="../File/sizecheck.html"><li><i class="fa-solid fa-ruler fa-fw"></i><span class="sidebar-item">Size guide</span></li></a>' +
					'<a href="../File/contact.html"><li><i class="fa-solid fa-envelope fa-fw"></i><span class="sidebar-item">Liên hệ</span></li></a>' +
					'<a href="../admin/products.html"><li><i class="fa-solid fa-user-gear fa-fw"></i><span class="sidebar-item">Quản lý</span></li></a>' +
					'<a href="#" onClick="logout()"><li><i class="fa-solid fa-right-to-bracket fa-fw"></i><span class="sidebar-item">Đăng xuất</span></li></a>';
			}
			else if (path === "sizecheck") {
				t = '<a href="../index.html"><li><i class="fa-solid fa-house fa-fw"></i><span class="sidebar-item">Trang chủ</span></li></a>' +
					'<a href="../File/products.html""><li><i class="fa-solid fa-shirt fa-fw"></i><span class="sidebar-item">Sản Phẩm</span></li></a>' +
					'<a href="../File/sizecheck.html"><li class="active"><i class="fa-solid fa-ruler fa-fw"></i><span class="sidebar-item">Size guide</span></li></a>' +
					'<a href="../File/contact.html"><li><i class="fa-solid fa-envelope fa-fw"></i><span class="sidebar-item">Liên hệ</span></li></a>' +
					'<a href="../admin/products.html"><li><i class="fa-solid fa-user-gear fa-fw"></i><span class="sidebar-item">Quản lý</span></li></a>' +
					'<a href="#" onClick="logout()"><li><i class="fa-solid fa-right-to-bracket fa-fw"></i><span class="sidebar-item">Đăng xuất</span></li></a>';
			}
			else if (path === "contact") {
				t = '<a href="../index.html"><li><i class="fa-solid fa-house fa-fw"></i><span class="sidebar-item">Trang chủ</span></li></a>' +
					'<a href="../File/products.html""><li><i class="fa-solid fa-shirt fa-fw"></i><span class="sidebar-item">Sản Phẩm</span></li></a>' +
					'<a href="../File/sizecheck.html"><li><i class="fa-solid fa-ruler fa-fw"></i><span class="sidebar-item">Size guide</span></li></a>' +
					'<a href="../File/contact.html"><li class="active"><i class="fa-solid fa-envelope fa-fw"></i><span class="sidebar-item">Liên hệ</span></li></a>' +
					'<a href="../admin/products.html"><li><i class="fa-solid fa-user-gear fa-fw"></i><span class="sidebar-item">Quản lý</span></li></a>' +
					'<a href="#" onClick="logout()"><li><i class="fa-solid fa-right-to-bracket fa-fw"></i><span class="sidebar-item">Đăng xuất</span></li></a>';
			}
			else {
				t = '<a href="../index.html"><li><i class="fa-solid fa-house fa-fw"></i><span class="sidebar-item">Trang chủ</span></li></a>' +
					'<a href="../File/products.html""><li><i class="fa-solid fa-shirt fa-fw"></i><span class="sidebar-item">Sản Phẩm</span></li></a>' +
					'<a href="../File/sizecheck.html"><li><i class="fa-solid fa-ruler fa-fw"></i><span class="sidebar-item">Size guide</span></li></a>' +
					'<a href="../File/contact.html"><li><i class="fa-solid fa-envelope fa-fw"></i><span class="sidebar-item">Liên hệ</span></li></a>' +
					'<a href="../admin/products.html"><li><i class="fa-solid fa-user-gear fa-fw"></i><span class="sidebar-item">Quản lý</span></li></a>' +
					'<a href="#" onClick="logout()"><li><i class="fa-solid fa-right-to-bracket fa-fw"></i><span class="sidebar-item">Đăng xuất</span></li></a>';
			}

		} else {
			s = '<li>' +
				'<button id="btnlg">' + cutName(user.fullname) + '</button>' +
				'<a href="../index.html" onclick="logout()" class="user-icon">' +
				'<i class="fa-solid fa-right-from-bracket"></i>' +
				'</a>'
			'</li>';

			var pos = window.location.pathname.lastIndexOf('/');
			var path = window.location.pathname.substring(pos + 1);
			path = path.split(".")[0];
			if (path === "index") {
				t = '<a href="../index.html"><li class="active"><i class="fa-solid fa-house fa-fw"></i><span class="sidebar-item">Trang chủ</span></li></a>' +
					'<a href="../File/products.html""><li><i class="fa-solid fa-shirt fa-fw"></i><span class="sidebar-item">Sản Phẩm</span></li></a>' +
					'<a href="../File/sizecheck.html"><li><i class="fa-solid fa-ruler fa-fw"></i><span class="sidebar-item">Size guide</span></li></a>' +
					'<a href="../File/contact.html"><li><i class="fa-solid fa-envelope fa-fw"></i><span class="sidebar-item">Liên hệ</span></li></a>' +
					'<a href="#" onClick="logout()"><li><i class="fa-solid fa-right-to-bracket fa-fw"></i><span class="sidebar-item">Đăng xuất</span></li></a>';
			}
			else if (path === "products") {
				t = '<a href="../index.html"><li><i class="fa-solid fa-house fa-fw"></i><span class="sidebar-item">Trang chủ</span></li></a>' +
					'<a href="../File/products.html"><li class="active"><i class="fa-solid fa-shirt fa-fw"></i><span class="sidebar-item">Sản Phẩm</span></li></a>' +
					'<a href="../File/sizecheck.html"><li><i class="fa-solid fa-ruler fa-fw"></i><span class="sidebar-item">Size guide</span></li></a>' +
					'<a href="../File/contact.html"><li><i class="fa-solid fa-envelope fa-fw"></i><span class="sidebar-item">Liên hệ</span></li></a>' +
					'<a href="#" onClick="logout()"><li><i class="fa-solid fa-right-to-bracket fa-fw"></i><span class="sidebar-item">Đăng xuất</span></li></a>';
			}
			else if (path === "sizecheck") {
				t = '<a href="../index.html"><li><i class="fa-solid fa-house fa-fw"></i><span class="sidebar-item">Trang chủ</span></li></a>' +
					'<a href="../File/products.html"><li><i class="fa-solid fa-shirt fa-fw"></i><span class="sidebar-item">Sản Phẩm</span></li></a>' +
					'<a href="../File/sizecheck.html"><li class="active"><i class="fa-solid fa-ruler fa-fw"></i><span class="sidebar-item">Size guide</span></li></a>' +
					'<a href="../File/contact.html"><li><i class="fa-solid fa-envelope fa-fw"></i><span class="sidebar-item">Liên hệ</span></li></a>' +
					'<a href="#" onClick="logout()"><li><i class="fa-solid fa-right-to-bracket fa-fw"></i><span class="sidebar-item">Đăng xuất</span></li></a>';
			}
			else if (path === "contact") {
				t = '<a href="../index.html"><li><i class="fa-solid fa-house fa-fw"></i><span class="sidebar-item">Trang chủ</span></li></a>' +
					'<a href="../File/products.html"><li><i class="fa-solid fa-shirt fa-fw"></i><span class="sidebar-item">Sản Phẩm</span></li></a>' +
					'<a href="../File/sizecheck.html"><li><i class="fa-solid fa-ruler fa-fw"></i><span class="sidebar-item">Size guide</span></li></a>' +
					'<a href="../File/contact.html"><li class="active"><i class="fa-solid fa-envelope fa-fw"></i><span class="sidebar-item">Liên hệ</span></li></a>' +
					'<a href="#" onClick="logout()"><li><i class="fa-solid fa-right-to-bracket fa-fw"></i><span class="sidebar-item">Đăng xuất</span></li></a>';
			}
			else {
				t = '<a href="../index.html"><li><i class="fa-solid fa-house fa-fw"></i><span class="sidebar-item">Trang chủ</span></li></a>' +
					'<a href="../File/products.html"><li><i class="fa-solid fa-shirt fa-fw"></i><span class="sidebar-item">Sản Phẩm</span></li></a>' +
					'<a href="../File/sizecheck.html"><li><i class="fa-solid fa-ruler fa-fw"></i><span class="sidebar-item">Size guide</span></li></a>' +
					'<a href="../File/contact.html"><li><i class="fa-solid fa-envelope fa-fw"></i><span class="sidebar-item">Liên hệ</span></li></a>' +
					'<a href="#" onClick="logout()"><li><i class="fa-solid fa-right-to-bracket fa-fw"></i><span class="sidebar-item">Đăng xuất</span></li></a>';
			}
		}
		document.querySelector('.user').innerHTML = s;
		document.querySelector('#manage').innerHTML = d;
		document.querySelector('#sidebar-list').innerHTML = t;
	}
}

function cutName(fullName) {
	// Loại bỏ khoảng trắng thừa ở trước và sau chuỗi
	fullName = fullName.trim();
	var x = fullName.lastIndexOf(' ');
	var name = [];
	// In hoa chữ cái đầu
	name = fullName.substring(x + 1, x + 2).toUpperCase();
	// In thường các chữ cái còn lại
	for (var i = x + 2; i < fullName.length; ++i) {
		name += fullName[i].toLowerCase();
	}
	return name;
}

const viewPass = document.getElementById("viewPass");
var pos = window.location.pathname.lastIndexOf('/');
var path = window.location.pathname.substring(pos + 1);
path = path.split(".")[0];
if (path === "signin") {
	viewPass.addEventListener('click', function (e) {
		e.preventDefault();
		var password = document.getElementById("Passwordlogin");
		if (password.type == 'password') {
			password.type = 'text';
			viewPass.innerHTML = '<i class="fa-solid fa-eye"></i>';
		}
		else {
			password.type = 'password';
			viewPass.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
		}
	}); 	
}
