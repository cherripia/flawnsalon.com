const express = require('express');
const noblox = require('noblox.js');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
app.use(helmet());

const port = process.env.PORT || 3000;
const groupId = process.env.GROUP_ID;

async function robloxLogin() {
	try {
		const currentUser = await noblox.setCookie(process.env.ROBLOSECURITY);
		console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`);
	} catch (err) {
		console.log("Unable to log in!", err);
	}
}

robloxLogin();

app.post('/game/application-approved', async function(req, res) {
	console.log('Application approved!');
	res.send("Application approved!");
});

app.get('/api', async function(req, res) {
	res.send("api");
});

app.get('/', function (req, res) { 
	res.redirect('https://www.roblox.com/groups/33267151/Flawn-Salon');
});

app.listen(port, function () { 
	console.log(`Server running on port ${port}`);
});