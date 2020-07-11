document.addEventListener("DOMContentLoaded", () => {
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
    loadNavDetail();
})