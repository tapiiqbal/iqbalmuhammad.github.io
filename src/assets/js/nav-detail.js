import { setTimeLoader } from '../js/helper.js';
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector('#body-content')) {
        const loadNavDetail = async() => {
                const response = await fetch('nav-detail.html');
                const responseHtml = await response.text();
                if (response.ok == true) {
                    if (response.status != 200) return;
                    // Muat daftar tautan menu
                    document.querySelectorAll(".topnavdetail, .sidenavdetail").forEach(function(elm) {
                        elm.innerHTML = responseHtml;
                    });

                    document.querySelectorAll(".sidenavdetail a, .topnavdetail a").forEach(function(elm) {
                        elm.addEventListener("click", function(event) {
                            // Tutup sidenav
                            var sidenav = document.querySelector(".sidenav");
                            M.Sidenav.getInstance(sidenav).close();
                        });
                    });
                }

            }
            // Load page content
        const loadPage = async(page) => {
            const response = await fetch('pages/' + page + '.html');
            // get Html
            const responseHtml = await response.text();
            // get element
            const content = document.querySelector("#body-content");

            if (response.status == 200) content.innerHTML = responseHtml;
            else if (response.status == 404) {
                setTimeLoader();
                loadPage("404");
            } else {
                setTimeLoader();
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }

        let page = window.location.hash.substr(1);
        if (page === "") loadPage("detail");
        loadNavDetail();
    }
})