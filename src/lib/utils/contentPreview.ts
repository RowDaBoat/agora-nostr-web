export function truncateContent(content: string, maxLength = 100): string {
	if (!content) return '';
	return content.length > maxLength ? content.slice(0, maxLength) + '...' : content;
}
