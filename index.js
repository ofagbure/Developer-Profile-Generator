const inquirer = require("inquirer");
const axios = require("axios")
const fs = require("fs");

inquirer
    .prompt([
        {
            type: "prompt",
            name: "name",
            message: "What is your full name?"
        },
        {
            type: "confirm",
            name: "github",
            message: "Do you have a github profile?"
        },
        {
            type: "input",
            name: "username",
            message: "What is your username?"
        },
        {
            type: "input",
            name: "color",
            message: "What is your favorite color? (Pick from Pink, Blue, Green or Red)"
        }
    ])

    .then(function ({ username }) {
        const queryUrl = `https://api.github.com/users/${username}`;

        axios
            .get(queryUrl)
            .then(function (res) {
                let username = res.data.login;
                let profile = res.data.avatar_url;
                let location = res.data.location;
                let github = res.data.html_url;
                let blog = res.data.blog;
                let bio = res.data.bio;
                let repos = res.data.public_repos;
                let followers = res.data.followers;
                let following = res.data.following;

console.log(username, profile, location, github, bio, blog, repos, followers, following)
            },
function writeToFile(fileName, data) {

                },

function init() {

                    init()

                })})
