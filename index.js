const inquirer = require("inquirer");
const axios = require("axios")
const fs = require("fs");
const path = require("path");
const convertFactory = require("electron-html-to");
const generateHTML = require("./generateHTML");
const questions = [
    {
        type: "prompt",
        name: "name",
        message: "What is your full name?"
    },
    {
        type: "input",
        name: "username",
        message: "What is your username?"
    },
    {
        type: "list",
        name: "color",
        message: "What is your favorite color?",
        choices: ["red", "blue", "green", "pink"]
    }
];

function writeToFile(fileName, data) {
    console.log(fileName, data)
}

function init() {
    const data = {};
    inquirer.prompt(questions).then((answers) => {
        //get values for data object from answers object
        data.color = answers.color;
        data.name = answers.name;

        //get username answer to make github call
        const username = answers.username;
        const queryUrl = `https://api.github.com/users/${username}`;
        axios
            .get(queryUrl)
            .then(function (res) {
                //get values for data object from res object
                data.username = res.data.login;
                data.profile = res.data.avatar_url;
                data.location = res.data.location;
                data.github_url = res.data.html_url;
                data.blog = res.data.blog;
                data.bio = res.data.bio;
                data.repos = res.data.public_repos;
                data.followers = res.data.followers;
                data.following = res.data.following;

                console.log(data);
                const htmlString = generateHTML(data);
                console.log(htmlString);
                //test our finished html by creating a new html file
                fs.writeFile("./index.html", htmlString, (err) => {
                    if (err) throw err;

                    console.log("created our test html file!");
                });

                // console.log(generateHTML(github));
                // console.log(generateHTML.generateHTML(github))
                // writeToFile(generateHTML, res.data)
            })
    })
};

init();