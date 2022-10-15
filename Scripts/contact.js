class Contact {
    // private instance members (fields)
    fullName;
    contactNumber;
    emailAddress;
    // public properties
    get FullName() {
        return this.fullName;
    }
    set FullName(name) {
        this.fullName = name;
    }
    get ContactNumber() {
        return this.contactNumber;
    }
    set ContactNumber(contactNumber) {
        this.contactNumber = contactNumber;
    }
    get EmailAddress() {
        return this.emailAddress;
    }
    set EmailAddress(emailAddress) {
        this.emailAddress = emailAddress;
    }
    // constructor
    /**
     * Creates an instance of Contact.
     * @param {string} [fullName="unknown name"]
     * @param {string} [contactNumber="unknown contact number "]
     * @param {string} [emailAddress="unknown email address "]
     * @memberof Contact
     */
    constructor(fullName = "unknown name", contactNumber = "unknown contact number ", emailAddress = "unknown email address ") {
        this.FullName = fullName;
        this.ContactNumber = contactNumber;
        this.EmailAddress = emailAddress;
    }
    // public methods
    /**
     * this method overrides the built-in toString method for the Contact class
     *
     * @return {*}  {string}
     * @memberof Contact
     */
    toString() {
        let outputString = "";
        outputString += `Full Name: ${this.FullName}\n`;
        outputString += `Contact Number: ${this.ContactNumber}\n`;
        outputString += `Email Address: ${this.EmailAddress}\n`;
        return outputString;
    }
    /**
     *this method convetrs class data members to a coma-seperated list compatible with JSON
     *
     * @return {*}  {string}
     * @memberof Contact
     */
    toJSON() {
        return `{${this.FullName},${this.ContactNumber},${this.EmailAddress}}`;
    }
    /**
     * This method reads data from a coma-seperated list and assigns it to the class DATA members
     *
     * @param {*} data
     * @memberof Contact
     */
    fromJSON(data) {
        let stringArray = data.split(",");
        this.FullName = stringArray[0];
        this.ContactNumber = stringArray[1];
        this.EmailAddress = stringArray[2];
    }
}
//# sourceMappingURL=contact.js.map