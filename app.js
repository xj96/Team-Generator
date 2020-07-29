const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// writefile will create html page
// const writeFileAsync = util.promisify(fs.writeFile);

const render = require("./lib/htmlRenderer");

// const util = require("util");
const { type } = require("os");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const teamArray = []

// Create Team Members
function addTeamMember() {
    return inquirer
        .prompt([
            {
                type: "list",
                name: "role",
                message: "What is your role?",
                choices: ["Manager", "Intern", "Engineer"]
            },

        ])
        .then(function (reply) {
            if (reply.role === "Engineer") {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your name?",
                        name: "name"
                    },
                    {
                        type: "input",
                        message: "What is your ID?",
                        name: "id"
                    },
                    {
                        type: "input",
                        message: "What is your E-Mail?",
                        name: "email",
                    },
                    {
                        type: "input",
                        message: "What is your GitHub Username?",
                        name: "github"
                    },
                ]).then(function (engineerReply) {
                    const newEngineer = new Engineer(engineerReply.name, engineerReply.id, engineerReply.email, engineerReply.githubUserName);
                    teamArray.push(newEngineer)
                    newTeamMember();
                })
            } else if (reply.role === "Intern") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "What is your name?",
                            name: "name",
                        },
                        {
                            type: "input",
                            message: "What is your ID?",
                            name: "id",
                        },
                        {
                            type: "input",
                            message: "What is your E-Mail?",
                            name: "email",
                        },
                        {
                            type: "input",
                            message: "Where did you go to school?",
                            name: "school",
                        },
                    ])
                    .then(function (internReply) {
                        const newIntern = new Intern(
                            internReply.name,
                            internReply.id,
                            internReply.email,
                            internReply.school
                        )
                        teamArray.push(newIntern)
                        newTeamMember()
                    });
            } else if (reply.role === "Manager") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "What is your name?",
                            name: "name"
                        },
                        {
                            type: "input",
                            message: "What is your ID?",
                            name: "id"
                        },
                        {
                            type: "input",
                            message: "What is your E-Mail",
                            name: "email"
                        },
                        {
                            type: "input",
                            message: "Where is your office located",
                            name: "officeNum"
                        }
                    ])
                    .then(function (managerReply) {
                        const newManager = new Manager(
                            managerReply.name,
                            managerReply.id,
                            managerReply.email,
                            managerReply.officeNum
                        )
                        teamArray.push(newManager)
                        newTeamMember()
                    })
            }
        })
}

function newTeamMember() {
    return inquirer
        .prompt([
            {
                type: "confirm",
                message: "Would you like to add another Team member?",
                name: "addnew"
            },
        ]).then(function (userAddNew) {
            if (userAddNew.addnew) {
                addTeamMember();
            } else {
                // HTML Push Here
                pushToHTML();
            }
        })
}

function pushToHTML() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }

    fs.writeFile(outputPath, render(teamArray), function () {
        console.log("Success");
    })
}

addTeamMember()
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
