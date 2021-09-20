const fs = require("fs");

const moment = require('moment');
const filePath = "./package.json";
const packageJson = JSON.parse(fs.readFileSync(filePath).toString());

packageJson.buildDate = moment().format("DD-MM-YYYY HH:mm:SS");

fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2));

const jsonData = {buildDate: packageJson.buildDate};

const jsonContent = JSON.stringify(jsonData);

console.log("Writing last build date to build/meta.json");

const dir = './dist';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

fs.writeFile("dist/meta.json", jsonContent, "utf8", error => {
    if (error) {
        console.log("An error occurred while saving build date and time to meta.json");
        return console.log(error);
    }

    console.log("Latest build date and time updated in meta.json file");
});
