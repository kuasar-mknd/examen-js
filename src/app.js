"use strict";

import * as User from "./modules/User.js";

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
    console.log(usersPromise);
    usersPromise.forEach((user) => {
        const userObject = new User.User(user.first,user.last, user.age, user.email, user.picture, user.city, user.country, user.title);
        userObject.render();
    }
    );
}

createUsers();