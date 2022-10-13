import { invalid, redirect } from '@sveltejs/kit';
import { post, login } from '$lib/utils';

export const actions = {
	default: async ({ cookies, request }) => {
		let form = Object.fromEntries(await request.formData());
		let { username, password, redirect: r } = form;

		let user = { username, password };
		let error;

		try {
			await post('/register', { user });
		} catch (e) {
			if (e.message.includes('taken')) error = e.message;
		}

		try {
			await login(user, cookies);
			error = null;
		} catch (e) {
			error ||= e.message;
		}

		if (error) return invalid(400, { error });
		throw redirect(307, r || `/${user.username}/dashboard`);
	}
};
