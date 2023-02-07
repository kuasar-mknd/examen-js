"use strict";

import * as User from "./modules/User.js";

let dataUsers;

const getRandomUsers = async () => {
    const response = await(fetch("https://randomuser.me/api/?results=20"));
    const data = await response.json();

    //clean data
    const cleanData = data.results.map((user) => {
        return {
            title: user.name.title,
            first: user.name.first,
            last: user.name.last,
            city: user.location.city,
            country: user.location.country,
            age: user.dob.age,
            email: user.email,
            picture: user.picture.large
        }
    });
    //order cleanData by last property
    cleanData.sort((a, b) => {
        if (a.last < b.last) {
            return -1;
        }
        if (a.last > b.last) {
            return 1;
        }
        return 0;
    });
    console.log(cleanData);
    return cleanData;
}

/*
 * Create users
 */
const createUsers = async () => {
    const usersPromise = await getRandomUsers();
    dataUsers = usersPromise;
    usersPromise.forEach((user) => {
        const userObject = new User.User(user.first,user.last, user.age, user.email, user.picture, user.city, user.country, user.title);
        userObject.render();
    }
    );
}

/*
 * Order users by name
 */
const orderUsersByName = (map) => {
    map.sort((a, b) => {
        if (a.last < b.last) {
            return -1;
        }
        if (a.last > b.last) {
            return 1;
        }
        return 0;
    });
    return map
}


/*
 * Order users by age
 */
const orderUsersByAge = (map) => {
    map.sort((a, b) => {
        if (a.age < b.age) {
            return -1;
        }
        if (a.age > b.age) {
            return 1;
        }
        return 0;
    });
    return map
}

/*
 * update render
 */
const updateRender = (map) => {
    document.querySelector("main").innerHTML = "";
    map.forEach((user) => {
        const userObject = new User.User(user.first,user.last, user.age, user.email, user.picture, user.city, user.country, user.title);
        userObject.render();
    }
    );
}


createUsers().catch((error) => {
    console.error(error);
});


/*
 * Events listener for button with id id="sort--name"
 */
document.querySelector("#sort--name").addEventListener("click", () => {
    //change class="selected" to the button clicked
    document.querySelector(".selected").classList.remove("selected");
    document.querySelector("#sort--name").classList.add("selected");
    updateRender(orderUsersByName(dataUsers));
});
document.querySelector("#sort--age").addEventListener("click", () => {
    document.querySelector(".selected").classList.remove("selected");
    document.querySelector("#sort--age").classList.add("selected");
    updateRender(orderUsersByAge(dataUsers));
});

