import { post } from '$lib/utils';
import cookie from 'cookie';

let maxAge = 30 * 24 * 60 * 60;

export async function POST({ request }) {
	let body = await post('/login', await request.json());

	let expires = new Date();
	expires.setSeconds(expires.getSeconds() + maxAge);

	return {
		body,
		headers: {
			'set-cookie': cookie.serialize('token', body.token, {
				httpOnly: true,
				maxAge,
				sameSite: 'lax',
				path: '/',
				expires
			})
		}
	};
}