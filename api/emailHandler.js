export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { name, email, message } = req.body;

		try {
			const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					service_id: process.env.EMAILJS_SERVICE_ID,
					template_id: process.env.EMAILJS_TEMPLATE_ID,
					user_id: process.env.EMAILJS_PUBLIC_KEY,
					template_params: { name, email, message },
				}),
			});

			if (response.ok) {
				return res.status(200).json({ message: 'Email sent successfully' });
			} else {
				return res.status(500).json({ error: 'Failed to send email' });
			}
		} catch (error) {
			return res.status(500).json({ error: 'Server error' });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
