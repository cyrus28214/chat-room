export function parseError(error: any): string {
    if (error instanceof Error) {
        return error.message;
    } else {
        return JSON.stringify(error);
    }
}