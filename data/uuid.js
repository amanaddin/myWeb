class UUID {
  constructor() { }
  generateUUID() {
    // Generate a random string of characters
    const randomString = Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    // Generate a timestamp-based string
    const timestampString = new Date().getTime().toString(36);

    // Concatenate the random string and the timestamp string
    const uuid = randomString + timestampString;
    return uuid;
  }
}


