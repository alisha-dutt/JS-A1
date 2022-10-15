"use strict";
// IFFE -- Immediately invoked function expression
// self executing function
(function () {
     /**
     * This method loads the header and page content
     */
    function LoadHeader() {
        console.log("Loading Header...");
        $.get("/Views/components/header.html", function (html_data) {
            // console.log(html_data);
            $("header").html(html_data);
            $("li>a#Home").addClass("active");
            $("li>a").on("click", function (event) {
                event.preventDefault();
                document.title = $(this).prop("id");
                history.pushState({}, "", "/" + document.title);
                // remove all active link class
                $("li>a").each(function () {
                    $(this).removeClass("active");
                });
                // activate current link
                $("li>a#" + document.title).addClass("active");
                LoadContent();
            });
        });
    }
    /**
     * this method injects the content based on the title of the page
     *
     */
    function LoadContent() {
        console.log("Loading Content...");
        let contentLink = document.title.toLowerCase();
        $.get("./Views/content/" + contentLink + ".html", function (html_data) { $("main").html(html_data); });
    }
    /**
     * this method ad the foooter to each page.
     */
    function LoadFooter() {
        console.log("Loading Footer...");
        $.get("/Views/components/footer.html", function (html_data) {
            // console.log(html_data);
            $("footer").html(html_data);
        });
    }
    function Start() {
        console.log("App started");
        document.title = "Home";
        history.pushState({}, "", "/Home");
        LoadContent();
        LoadHeader();
        LoadFooter();
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map