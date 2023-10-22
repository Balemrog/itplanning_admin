export const handleLogError = (error) => {
    if (error instanceof Error) {
        console.error(error.message); // Handle general errors
    } else if (error instanceof Response) {
        console.error(`Response Error: ${error.statusText} (${error.status})`);
    } else {
        console.error('An unexpected error occurred:', error);
    }
}