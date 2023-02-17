import axios from 'axios'
import dotenv from 'dotenv'
import {
	BadRequestError,
	CustomError,
	UnauthorizedUserError,
} from './customError'

dotenv.config()

axios.defaults.baseURL =
	process.env.NTNUI_TOOLS_API_URL || 'https://api.ntnui.no/'

type IGroupPageResult = {
	data: {
		membership: {
			type: string
		}
	}
}

async function getRoleInGroup(
	group_slug: string,
	token: string
): Promise<string | null> {
	return axios
		.get(`/groups/${group_slug}`, {
			headers: { Authorization: `Bearer ${token}` },
		})
		.then((retrievedGroup: IGroupPageResult) => {
			const group = retrievedGroup.data
			if (group.membership) {
				return group.membership.type
			}
			return null
		})
		.catch((err) => {
			// Could not find group in NTNUI membership system
			if (err.response.status === 404) {
				return null
			}
			throw new CustomError('Could not get role in group', 500)
		})
}

type INtnuiTokens = {
	access: string
	refresh: string
}

interface ITokenResponse {
	data: {
		refresh: string
		access: string
	}
}

async function getNtnuiToken(
	phone_number: string,
	password: string
): Promise<INtnuiTokens> {
	return axios
		.post('token/', {
			phone_number,
			password,
		})
		.then((tokenRes: ITokenResponse) => ({
			access: tokenRes.data.access,
			refresh: tokenRes.data.refresh,
		}))
		.catch((err) => {
			if (err.response.status === 401) {
				throw UnauthorizedUserError
			} else if (err.response.status === 400) {
				throw BadRequestError
			}
			throw new CustomError('Unexpected error.', 500)
		})
}

async function isValidNtnuiToken(token: string): Promise<boolean> {
	return axios
		.post('token/verify/', {
			token,
		})
		.then(() => true)
		.catch(() => false)
}

interface IAccessTokenResponse {
	data: {
		access: string
	}
}

interface INtnuiAccessToken {
	access: string
}

async function refreshNtnuiToken(token: string): Promise<INtnuiAccessToken> {
	return axios
		.post('token/refresh/', {
			refresh: token,
		})
		.then((tokenRes: IAccessTokenResponse) => ({
			access: tokenRes.data.access,
		}))
		.catch((err) => {
			if (err.response.status === 401) {
				throw new CustomError('Invalid token.', 401)
			} else if (err.response.status === 400) {
				throw BadRequestError
			}
			throw new CustomError('Unexpected error.', 500)
		})
}

interface IUserProfileResponse {
	data: {
		first_name: string
		last_name: string
		date_of_birth?: string
		address?: string
		zip_code?: string
		register_date?: string
		email: string
		sit_email?: string
		contact_email?: string
		phone_number: string
		ntnui_no: number
		contract_expiry_date?: string
		memberships: {
			group: string
			slug: string
			membership_no: number
			type: string
			group_expiry: string
		}[]
	}
}

async function getNtnuiProfile(token: string): Promise<IUserProfileResponse> {
	return axios.get('users/profile', {
		headers: { Authorization: `Bearer ${token}` },
	})
}
export {
	getNtnuiProfile,
	getRoleInGroup,
	getNtnuiToken,
	isValidNtnuiToken,
	refreshNtnuiToken,
}
