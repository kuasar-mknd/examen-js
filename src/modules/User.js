export class User {
    // Propriétés
    #name;
    #firstName;
    #age;
    #email;
    #picture;
    #city;
    #country;
    #title;
    #presence = "false";
    #structure;

    /*
     * Constructeur
     */
    constructor(name, firstName, age, email, picture, city, country, title) {
        this.#name = name;
        this.#firstName = firstName;
        this.#age = age;
        this.#email = email;
        this.#picture = picture;
        this.#city = city;
        this.#country = country;
        this.#title = title;
        this.#structure = this.generateHTML();
    }

    /*
     * change presence
     */
    changePresence(){
        if(this.#presence === "false"){
            this.#presence = "true";
        }else{
            this.#presence = "false";
        }
    }



    /*
     * generateHTML
     */
    generateHTML() {
        const containerElement = document.createElement("div");
        containerElement.classList.add("user");
        containerElement.dataset.present = this.#presence;

        const childHTML = `
		<img src="${this.#picture}">
        <div class="user--info">
            <h1>${this.#title} ${this.#firstName} ${this.#name}</h1>
            <p>${this.#age} years old</p>
            <p>${this.#city}, ${this.#country}</p>
        </div>
        <a href="mailto:${this.#email}">
            <span class="mail">✉️</span>
        </a>
        `
        containerElement.insertAdjacentHTML("afterbegin", childHTML);
        containerElement.addEventListener("click", () => {
            this.changePresence();
            this.updateCounter();
            containerElement.dataset.present = this.#presence;
        });
        return containerElement;
    }

    /*
     * render in main
     */
    render() {
        const main = document.querySelector("main");
        main.appendChild(this.#structure);
    }

    /*
     * update counter element
     */
    updateCounter(){
        document.querySelector(".counter").textContent = `${document.querySelectorAll("[data-present='true']").length + 1}/20 people are here`;
    }

}