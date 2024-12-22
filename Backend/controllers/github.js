const githubRouter = require('express').Router()

githubRouter.post('/fetch-snippet', async (req, res) => {

	const { owner, repo, filePath, startLine, endLine } = req.body;

	try {
		// Fetch the file content
		const fileResponse = await fetch(
			`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
			{
				headers: {
					Accept: 'application/vnd.github.v3.raw',
					Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
				},
			}
		);

		if (!fileResponse.ok) {
			return res.status(fileResponse.status).json({ error: 'Failed to fetch file content' });
		}

		const data = await fileResponse.text();
		const lines = data.split('\n');
		const snippet = lines.slice(startLine - 1, endLine).join('\n');

		// Fetch commit history for the file
		const commitsResponse = await fetch(
			`https://api.github.com/repos/${owner}/${repo}/commits?path=${filePath}&per_page=1`,
			{
				headers: {
					Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
				},
			}
		);

		if (!commitsResponse.ok) {
			return res.status(commitsResponse.status).json({ error: 'Failed to fetch commit history' });
		}

		const commits = await commitsResponse.json();
		const latestCommitDate = new Date(commits[0]?.commit?.author?.date);

		const currentDate = new Date();
		const timeDifference = currentDate - latestCommitDate; // Time difference in milliseconds

		// Calculate the difference in months
		const months = (currentDate.getFullYear() - latestCommitDate.getFullYear()) * 12 + (currentDate.getMonth() - latestCommitDate.getMonth());
		let fileAge = '';

		if (months >= 1) {
			fileAge = months + ' month' + (months > 1 ? 's' : '') + ' ago';
		} else {
			// If less than a month, calculate in days
			fileAge = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + ' day' + (Math.floor(timeDifference / (1000 * 60 * 60 * 24)) > 1 ? 's' : '') + ' ago';
		}

		return res.status(200).json({ snippet, fileAge });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
});


githubRouter.post('/fetch-profile', fetchProfile = async (req, res) => {
	console.log('hit')
	const { owner } = req.body;

	try {
		const response = await fetch(`https://api.github.com/users/${owner}`, {
			headers: {
				Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
			},
		});
		const profile = await response.json();
		return res.status(200).json(profile);
	} catch (error) {
		console.error('Error fetching profile:', error);
		return res.status(500).json({ error: 'Failed to fetch profile' });
	}
})


module.exports = githubRouter
