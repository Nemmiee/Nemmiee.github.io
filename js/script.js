/* #----------------# */
/* |                | */
/* |    JS CHUNG    | */
/* |                | */
/* #----------------# */


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


let currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
    let pos = window.location.pathname.lastIndexOf('/');
    let path = window.location.pathname.substring(pos + 1);
    path = path.split(".")[0];
    document.getElementById("darkmode-btn").classList.toggle("fa-flip-horizontal");
    // Header
    document.getElementById("header").classList.toggle("darkmode");
    // Footer
    document.getElementById("footer").classList.toggle("darkmode");

    if (path == "index") {
        document.getElementById("content").classList.toggle("darkmode");
        document.getElementById("top-shopnow-container").classList.toggle("darkmode");
        document.getElementById("bottom-shopnow-container").classList.toggle("darkmode");
        document.getElementById("main-content").classList.toggle("darkmode");
    }
    else if (path == "products") {
        document.querySelector(".shop-page-title-container").classList.toggle("darkmode");
        document.getElementById("menu-container").classList.toggle("darkmode");
        document.getElementById("maincontent").classList.toggle("darkmode");
    }
    else if (path == "sizecheck") {
        document.querySelector(".shop-page-title-container").classList.toggle("darkmode");
        document.getElementById("main").classList.toggle("darkmode");
    }
    else if (path == "contact") {
        document.querySelector(".shop-page-title-container").classList.toggle("darkmode");
        document.getElementById("main").classList.toggle("darkmode");
    }
    else if (path == "signin") {
        document.getElementById("mainContent-theme").classList.toggle("darkmode");
    }
    else if (path == "signup") {
        document.getElementById("mainContent-theme").classList.toggle("darkmode");

    }
    else {

    }
}

function changeTheme() {
    let theme;
    if (!document.getElementById("header").classList.contains("darkmode")) {
        theme = "dark";
        document.getElementById("darkmode-btn").classList.toggle("fa-flip-horizontal");
        document.getElementById("sidebar-darkmode-btn").classList.toggle("fa-flip-horizontal");
        // Header
        document.getElementById("header").classList.toggle("darkmode");
        // Footer
        document.getElementById("footer").classList.toggle("darkmode");

        if (path == "index") {
            document.getElementById("content").classList.toggle("darkmode");
            document.getElementById("top-shopnow-container").classList.toggle("darkmode");
            document.getElementById("bottom-shopnow-container").classList.toggle("darkmode");
            document.getElementById("main-content").classList.toggle("darkmode");
        }
        else if (path == "products") {
            document.querySelector(".shop-page-title-container").classList.toggle("darkmode");
            document.getElementById("menu-container").classList.toggle("darkmode");
            document.getElementById("maincontent").classList.toggle("darkmode");

        }
        else if (path == "sizecheck") {
            document.querySelector(".shop-page-title-container").classList.toggle("darkmode");
            document.getElementById("main").classList.toggle("darkmode");
        }
        else if (path == "contact") {
            document.querySelector(".shop-page-title-container").classList.toggle("darkmode");
            document.getElementById("main").classList.toggle("darkmode");
        }
        else if (path == "signin") {
            document.getElementById("mainContent-theme").classList.toggle("darkmode");
        }
        else if (path == "signup") {
            document.getElementById("mainContent-theme").classList.toggle("darkmode");

        }
        else {

        }
    }
    else {
        theme = "light";
        document.getElementById("darkmode-btn").classList.toggle("fa-flip-horizontal");
        document.getElementById("sidebar-darkmode-btn").classList.toggle("fa-flip-horizontal");
        // Header
        document.getElementById("header").classList.toggle("darkmode");
        // Footer
        document.getElementById("footer").classList.toggle("darkmode");

        if (path == "index") {
            document.getElementById("content").classList.toggle("darkmode");
            document.getElementById("top-shopnow-container").classList.toggle("darkmode");
            document.getElementById("bottom-shopnow-container").classList.toggle("darkmode");
            document.getElementById("main-content").classList.toggle("darkmode");

        }
        else if (path == "products") {
            document.querySelector(".shop-page-title-container").classList.toggle("darkmode");
            document.getElementById("menu-container").classList.toggle("darkmode");
            document.getElementById("maincontent").classList.toggle("darkmode");
        }
        else if (path == "sizecheck") {
            document.querySelector(".shop-page-title-container").classList.toggle("darkmode");
            document.getElementById("main").classList.toggle("darkmode");
        }
        else if (path == "contact") {
            document.querySelector(".shop-page-title-container").classList.toggle("darkmode");
            document.getElementById("main").classList.toggle("darkmode");
        }
        else if (path == "signin") {
            document.getElementById("mainContent-theme").classList.toggle("darkmode");
        }
        else if (path == "signup") {
            document.getElementById("mainContent-theme").classList.toggle("darkmode");

        }
        else {

        }
    }
    localStorage.setItem("theme", theme);
}