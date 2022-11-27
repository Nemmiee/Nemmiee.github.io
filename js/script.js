/* #----------------# */
/* |                | */
/* |    JS CHUNG    | */
/* |                | */
/* #----------------# */

/* Hiển thị nội dung của nút tìm kiếm ở phàn Header */
function search_dropdown() {
    document.querySelector(".header-dropdown").classList.toggle("hienThi");
}

/* Hiển thị Menu 3 gạch khi responsive */
let showSidebar = document.getElementById("hamburger-icon");
showSidebar.addEventListener("click", function() {
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
    var headerProductTitle = document.getElementById("header-product-title");
        var headerProductTitleDropdown = headerProductTitle.getElementsByClassName("header-dropdown")[0];
    var link = '<ul>';
    for (var i = 0; i < menuList.length; ++i) {
        link += '<a href="/File/products.html?' + menuList[i].toLowerCase() + '&0">' +
            '<li>' + menuList[i] + '</li>';
    }
    headerProductTitleDropdown.innerHTML = link + '</ul>';
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