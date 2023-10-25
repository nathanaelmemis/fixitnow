function formatDate(unixTimestamp) {
    let date = new Date(unixTimestamp);
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2); // zero-based month
    let day = ('0' + date.getDate()).slice(-2);
    return day + '/' + month + '/' + year;
}

function getDaysDifference(timestamp1, timestamp2) {
    // Convert timestamps to Date objects
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);
  
    // Calculate the time difference in milliseconds
    const timeDifferenceInMs = date2 - date1;
  
    // Convert milliseconds to days
    const millisecondsInOneDay = 1000 * 60 * 60 * 24;
    const daysDifference = Math.floor(timeDifferenceInMs / millisecondsInOneDay);
  
    return daysDifference;
}

export { formatDate, getDaysDifference }