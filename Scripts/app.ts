"use strict";
// IFFE -- Immediately invoked function expression
// self executing function
(function () {
    /**
     * This function loads data asynchrounously from a URL.
     *It calls the callback function when the data loading is complete
     * @param {string} method
     * @param {string} url
     * @param {function} callback
     */
    function LoadData(method: string, url: string, callback: Function): void {
        let XHR = new XMLHttpRequest();
        XHR.open(method, url);
        XHR.send();
        XHR.addEventListener("readystatechange", function () {
            if ((XHR.status == 200) && (XHR.readyState == 4)) {
                callback(XHR.responseText);
            }
        });
    }
    /**
     * this method saves our data to localStorge
     *
     * @param {any[]} contactList
     */
    function SaveContactListData(contactList: any[]): void {
        let count = 0;
        for (const contact of contactList) {
            let newContact = new Contact(contact.FullName, contact.ContactNumber, contact.EmailAddress);
            //  console.log(newContact.toString());
            localStorage.setItem(count.toString(), newContact.toJSON());
            count++;
        }
    }
    /**
     * this method reads our data from the localStorage and returns a contact Array
     *
     * @return {*}  {Contact[]}
     */
    function LoadCOntactListData(): Contact[] {
        // create an empty contact array container
        let ContactArray = new Array<Contact>();
        let keys = Object.keys(localStorage);
        for (let key of keys) {
            let newContact = new Contact();
            console.log(localStorage.getItem(key));
            newContact.fromJSON(localStorage.getItem(key));
            console.log(newContact.toString());
            ContactArray.push(newContact);
        }
        return ContactArray;
    }
    /**
     * This method loads the header and page content 
     */
    function LoadHeader(): void {
        console.log("Loading Header...");
        $.get("/Views/components/header.html", function (html_data) {
            // console.log(html_data);
            $("header").html(html_data);
            $("li>a#Home").addClass("active");
            // switch (document.title) {
            //     case "Home":
            //         $("#homePage").addClass("active");
            //         break;
            //     case "About Us":
            //         $("#aboutPage").addClass("active");
            //         break;
            //     case "Our Projects":
            //         $("#projectsPage").addClass("active");
            //         break;
            //     case "Our Services":
            //         $("#servicesPage").addClass("active");
            //         break;
            //     case "Contact Us":
            //         $("#contactPage").addClass("active");
            //         break;
            // }
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
        $.get("./Views/content/"+contentLink+".html", function (html_data){$("main").html(html_data);})
        }
        /**
         * this method ad the foooter to each page.
         */
    function LoadFooter(): void {
        console.log("Loading Footer...");
        $.get("/Views/components/footer.html", function (html_data) {
            // console.log(html_data);
            $("footer").html(html_data);
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