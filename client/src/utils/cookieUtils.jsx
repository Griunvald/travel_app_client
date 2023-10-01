function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const encodedCookieValue = parts.pop().split(';').shift();
    const decodedCookieValue = decodeURIComponent(encodedCookieValue);
    return decodedCookieValue;
  }
}

export default getCookie;
