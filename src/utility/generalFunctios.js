import jwtDecode from "jwt-decode";

export function generateRandomNumber(max,min){
    return Math.floor(Math.random()* (max-min+1)) + min
}

export function isoStringToGMT(isoString) {
    // Create a new Date object using the ISO 8601 string
    const date = new Date(isoString);

    // Get the components of the date
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getUTCDate().toString().padStart(2, '0');
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');

    // Assemble the GMT time string
    const gmtTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} GMT`;

    return gmtTime;
}

export function getTimeElapsed(timestamp) {
    const currentTime = new Date();
    const pastTime = new Date(timestamp);

    const timeDifference = currentTime - pastTime;

    // Calculate time differences in various units
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30.44)); // Approximate months
    const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25)); // Approximate years

    // Choose the appropriate unit based on the time elapsed
    if (years > 0) {
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    } else if (months > 0) {
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else if (days > 0) {
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (hours > 0) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
}

export function isTokenExpired(token) {
    try {
      // Decode the token without verifying the signature
      const decoded = jwtDecode(token, { complete: true });

      console.log(decoded);
  
      // Check if the token has an expiration claim
      if (decoded && decoded.exp) {
        // Get the current time in seconds
        const currentTime = Math.floor(Date.now() / 1000);
  
        // Compare the expiration time with the current time
        return decoded.exp < currentTime;
      }
      
      // If there is no expiration claim, consider the token as not expired
      return false;
    } catch (error) {
      // Handle decoding errors
      console.error('Error decoding token:', error);
      return false;
    }
  }


