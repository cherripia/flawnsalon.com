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

app.get('/game/application-approved', async function(req, res) {
	const userId = req.query.userId;
	if (!userId) {
		res.sendStatus(400);
		return;
	}
	try {
		const currentRankId = await noblox.getRankInGroup(groupId, userId);
		if (currentRankId > 0 && currentRankId < 5) {
			try {
				const changeRankResult = await noblox.setRank(groupId, userId, 5);
				res.sendStatus(200);
				res.send("Application approved!");
				return;
			} catch (err) {
				res.sendStatus(500);
				return;
			}
		} else {
			res.sendStatus(406);
			return;
		}
	} catch (err) {
		res.sendStatus(500);
		return;
	}
});

app.get('/', function (req, res) { 
	res.redirect('https://www.roblox.com/groups/33267151/Flawn-Salon');
});

app.listen(port, function () { 
	console.log(`Server running on port ${port}`);
});
