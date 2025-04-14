export function handleError(error: unknown, publicMessage: string = 'An error occurred. Try again later.'): Error {
	const isDevelopment = process.env.NODE_ENV === 'development'

	// In development, return detailed error
	if (isDevelopment) {
		console.error(error)
		return new Error(error instanceof Error ? error.message : String(error))
	}

	// In production, return generic message
	return new Error(publicMessage)
}
