export function formatDate(dateString: string): string {
    const date = new Date(dateString);

    // Format the date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because getMonth() returns 0-indexed month
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Create the formatted date string
    const formattedDate = `${year}-${month}-${day} / ${hours}:${minutes}:${seconds}`;

    return formattedDate;
}