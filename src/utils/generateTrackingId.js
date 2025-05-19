export default function generateTrackingId() {
    const now = new Date();
    const randomChars = Math.random().toString(36).substring(2, 4).toUpperCase();
    return `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getFullYear()}-${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}-${randomChars}`;
}