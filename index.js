const fs = require("fs");
const inquirer = require("inquirer");
const file = "outputREADME.md";

inquirer
    .prompt([
        {
            type: "input",
            message: "Project Title:",
            name: "Title",
        },
        {
            type: "input",
            message: "Description:",
            name: "Description",
        },
        {
            type: "input",
            message: "Installation Instructions:",
            name: "Installation Instructions",
        },
        {
            type: "input",
            message: "Usage Information:",
            name: "Usage Information",
        },
        {
            type: "input",
            message: "Contribution Guidelines:",
            name: "Contribution Guidelines",
        },
        {
            type: "input",
            message: "Test Instructions:",
            name: "Test Instructions",
        },
        {
            type: "list",
            message: "Licence:",
            name: "Licence",
            choices: ["MIT","Apache-2.0","GPL-3.0","BSD-2-Clause","BSD-3-Clause","BSD-4-Clause"],
        },
        {
            type: "input",
            message: "GitHub Username:",
            name: "GitHub Username",
        },
        {
            type: "input",
            message: "Email:",
            name: "Email",
        },
    ])
    .then((answer) => {
        const mainText = {...answer};
        delete mainText["Title"];
        delete mainText["Licence"];
        delete mainText["GitHub Username"];
        delete mainText["Email"];
        
        fs.appendFileSync(file,`# ${answer.Title}\n`,(err) =>
            err ? console.error(err) : console.log('Success!')
        );

        fs.appendFileSync(file,`## Table of Contents\n`,(err) =>
        err ? console.error(err) : console.log('Success!')
        );
        for (const [key] of Object.entries(mainText)) {
            const link = key.replace(/\s+/g, '-');
            fs.appendFileSync(file,`- [${key}](#${link})\n`,(err) =>
            err ? console.error(err) : console.log('Success!')
            );
        }
        fs.appendFileSync(file,`- [Questions](#Questions)\n`,(err) =>
        err ? console.error(err) : console.log('Success!')
        );

        for (const [key,value] of Object.entries(mainText)) {
            fs.appendFileSync(file,`## ${key}\n${value}\n`,(err) =>
            err ? console.error(err) : console.log('Success!')
        );
        }

        fs.appendFileSync(file,`## Questions\nGitHub profile: github.com/${answer["GitHub Username"]}/\n\nEmail: ${answer["Email"]}\n`,(err) =>
        err ? console.error(err) : console.log('Success!')
    );
    });
