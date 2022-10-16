"use strict";
(function () {
     /**
     * This method loads the header and the following page contents
     */
    function LoadHeader(): void {
        console.log("Loading Header...");
        $.get("/JS-A1/Views/components/header.html", function (html_data) {
            // console.log(html_data);
            $("header").html(html_data);
            $("li>a#Home").addClass("active");
            $("li>a").on("click", function(event)
            {
                event.preventDefault();
                document.title=$(this).prop("id") as string;
                history.pushState({},"", "/"+document.title);
                // remove all active link class
                $("li>a").each(function()
                {
                    $(this).removeClass("active");
                });
                // activate current link
                $("li>a#" + document.title).addClass("active")
                LoadContent();
            });
            
        });
    }
    /**
     * this method injects the content based on the title of the page
     *
     */
    function LoadContent(): void 
    {
        console.log("Loading Content...");
        let contentLink= document.title.toLowerCase();
        $.get("./JS-A1//Views/content/"+contentLink+".html", function (html_data){$("main").html(html_data);})
        }
        /**
         * this method adds the foooter to each page.
         */
    function LoadFooter(): void {
        console.log("Loading Footer...");

        $.get("/JS-A1/Views/components/footer.html", function (html_data) {
            // console.log(html_data);
            $("footer").html(html_data);
        });
    }

    function redirectContent():void
    {
        console.log("redirecting...");
        let redirectLink=document.getElementById('contact');
        $.get("/JS-A1//Views/content/profile.html", function (html_data) {
            $("profile").html(html_data);
        });
    }

    function Start() {
        console.log("App started");
        document.title="Home";
        history.pushState({},"", "/Home");
        
        LoadContent();
        LoadHeader();        
        LoadFooter();
    }
    window.addEventListener("load", Start);
})();
