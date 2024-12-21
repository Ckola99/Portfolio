import fetch from 'node-fetch';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { owner, repo, filePath, startLine, endLine } = req.body;

		try {
			const githubToken = process.env.GITHUB_TOKEN;

			const response = await fetch(
				`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
				{
					headers: {
						Authorization: `token ${githubToken}`,
					},
				}
			);

			if (!response.ok) {
				return res.status(404).json({ error: 'File not found' });
			}

			const data = await response.text();
			const lines = data.split('\n');
			const snippet = lines.slice(startLine - 1, endLine).join('\n');

			res.status(200).json({ snippet });
		} catch (error) {
			res.status(500).json({ error: 'Server error' });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
