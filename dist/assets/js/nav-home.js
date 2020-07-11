document.addEventListener("DOMContentLoaded", () => {

    const loadNavHome = async() => {
        const response = await fetch('nav-home.html');
        // console.log("response ", response);

        const responseHtml = await response.text();
        // console.log(response);
        if (response.ok == true) {
            if (response.status != 200) return;
            // Muat daftar tautan menu
            document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                elm.innerHTML = responseHtml;
            });

            // Daftarkan event listener untuk setiap tautan menu
            document
                .querySelectorAll(".sidenav a, .topnav a")
                .forEach(function(elm) {
                    elm.addEventListener("click", function(event) {
                        // Tutup sidenav
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        // Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
        }

    }

    // Load page content
    const loadPage = async(page) => {
        const response = await fetch('assets/pages/' + page + '.html');
        // get Html
        const responseHtml = await response.text();
        // get element
        const content = document.querySelector(".body-content");

        if (response.status == 200) content.innerHTML = responseHtml;
        else if (response.status == 404) content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        else content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
    }

    loadNavHome();
    let page = window.location.hash.substr(1);
    if (page === "") loadPage("home");

});