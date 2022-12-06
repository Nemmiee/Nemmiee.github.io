/* #----------------# */
/* |                | */
/* |    JS CHUNG    | */
/* |                | */
/* #----------------# */

/* Hiển thị nội dung của nút tìm kiếm ở phàn Header */
let kiemdich = 1;
function search_dropdown() {
    if (kiemdich === 1) {
        document.querySelector("#header-search .header-dropdown").style.display = "block";
        kiemdich = 0;
    } else {
        document.querySelector("#header-search .header-dropdown").style.display = "none";
        kiemdich = 1;
    }
}

/* Hiển thị Menu 3 gạch khi responsive */
let showSidebar = document.getElementById("hamburger-icon");
showSidebar.addEventListener("click", function () {
    document.getElementById("sidebar-container").classList.remove("hide");
    document.getElementById("sidebar-container").classList.add("hienThi");
});

/* Tắt Menu 3 gạch khi nhấn nút X */
let turnOffSideBar = document.getElementById("turnoff-btn");
turnOffSideBar.addEventListener("click", function () {
    document.getElementById("sidebar-container").classList.remove("hienThi");
    document.getElementById("sidebar-container").classList.add("hide");
});

/* Tắt sidebar khi bấm vào nền */
// let turnOffSideBarByBody = document.getElementById("sidebar-container");
// turnOffSideBarByBody.addEventListener("click", function() {
//     document.getElementById("sidebar-container").classList.remove("hienThi");
//     document.getElementById("sidebar-container").classList.add("hide");   
// });

/* sizecheck.html */
function toggleShopSidebarMenu() {
    document.getElementById("menu-items").classList.toggle("hide");
}
// end

let menuList = ['Shirt', 'Jacket', 'Sweater', 'Hoodie'];
/* Tạo dropdown khi hover vào mục Sản Phẩm ở thanh header */
function showHeaderProductCategory() {
    var headerProductDropdown = document.getElementById("header-product-dropdown");
    var link = '<ul>';
    for (var i = 0; i < menuList.length; ++i) {
        link += '<a href="/File/products.html?' + menuList[i].toLowerCase() + '&0">' +
            '<li>' + menuList[i] + '</li>';
    }
    headerProductDropdown.innerHTML = link + '</ul>';
}

/* Tạo danh mục Sản phẩm ở phần Footer */
function showFooterMenuItems() {
    var footerMenuItems = document.getElementById("top-footer-menu-category");
    var footerMenuItemsLink = '<h3>Sản phẩm</h3>';
    for (var i = 0; i < menuList.length; ++i) {
        footerMenuItemsLink += '<a href="/File/products.html?' + menuList[i].toLowerCase() + '&0">' + menuList[i] + '</a>';
    }
    footerMenuItems.innerHTML = footerMenuItemsLink;
}

/* Hiển thị nút scroll to top và thanh header khi scroll chuột xuống 250px */
const fixedHeader = document.querySelector("#header");
const backtotop = document.querySelector("#backtotop");
backtotop.addEventListener("click", function () {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});
window.addEventListener("scroll", function () {
    if (window.pageYOffset > 250) {
        backtotop.classList.add("backtotop-active");
        fixedHeader.classList.add("fixed");
    } else {
        backtotop.classList.remove("backtotop-active");
        fixedHeader.classList.remove("fixed");
    }
});


let isDarkMode = 1;
let darkModeBtn = document.getElementById("darkmode-btn");
darkModeBtn.addEventListener('click', function () {
    if (isDarkMode == 1) {
        isDarkMode = 0;
        changeWhiteMode();
    }
    else {
        isDarkMode = 1;
        changeDarkMode();
    }
});

function changeDarkMode() {
    let pos = window.location.pathname.lastIndexOf('/');
    let path = window.location.pathname.substring(pos + 1);
    path = path.split(".")[0];
    //document.getElementById("darkmode-i").style.color = "white";
    //document.getElementById("header").style.backgroundColor = "black";
    // for (var i = 0; i < document.querySelectorAll('.header-title').length; i++) {
    //     document.querySelectorAll('.header-title')[i].classList.remove("darkmode");
    // }
    // for (var i = 0; i < document.querySelectorAll('.header-icon').length; ++i) {
    //     document.querySelectorAll('.header-icon')[i].classList.remove("darkmode");
    // }
    // Footer
    //document.getElementById("footer").style.backgroundColor = "#222222";
    //document.getElementById("footer").classList.remove("darkmode");

    // Content
    if (path === "index") {
        document.getElementById("content").classList.remove("darkmode");
        document.getElementById("top-shopnow-container").classList.remove("darkmode");
        document.getElementById("bottom-shopnow-container").classList.remove("darkmode");
        document.getElementById("main-content").classList.remove("darkmode");
    }
    else if (path === "products") {

    }
    else if (path === "sizecheck") {

    }
    else if (path === "contact") {

    }
    else {

    }
}

function changeWhiteMode() {
    let pos = window.location.pathname.lastIndexOf('/');
    let path = window.location.pathname.substring(pos + 1);
    path = path.split(".")[0];
    // Header
    //document.getElementById("darkmode-i").style.color = "black";
    //document.getElementById("header").style.backgroundColor = "white";
    // for (var i = 0; i < document.querySelectorAll('.header-title').length; i++) {
    //     document.querySelectorAll('.header-title')[i].classList.add("darkmode");
    // }
    // for (var i = 0; i < document.querySelectorAll('.header-icon').length; ++i) {
    //     document.querySelectorAll('.header-icon')[i].classList.add("darkmode");
    // }
    // Footer
    //document.getElementById("footer").style.backgroundColor = "white";
    //document.getElementById("footer").classList.add("darkmode");

    // Content
    if (path === "index") {
        document.getElementById("content").classList.add("darkmode");
        document.getElementById("top-shopnow-container").classList.add("darkmode");
        document.getElementById("bottom-shopnow-container").classList.add("darkmode");
        document.getElementById("main-content").classList.add("darkmode");
    }
    else if (path === "products") {

    }
    else if (path === "sizecheck") {

    }
    else if (path === "contact") {

    }
    else {

    }
}
