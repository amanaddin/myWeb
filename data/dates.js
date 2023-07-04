class DateClass {
  constructor() {
    this.currentDate = new Date();
  }

  getShippingDay(days) {
    this.currentDate.setDate(this.currentDate.getDate() + days);
    const dateValues = getDayMonthDate(this.currentDate);
    const formattedDate = `${dateValues.day}, ${dateValues.month} ${dateValues.date}`;
    return formattedDate;
  }

  getMonthAndDate() {
    this.currentDate.setDate(this.currentDate.getDate());
    const dateValues = getDayMonthDate(this.currentDate);
    const formattedDate = `${dateValues.month} ${dateValues.date}`;
    return formattedDate;
  }

  getDay(month, date) {
    const dateString = `${month} ${date}, ${this.currentDate.getFullYear()}`;
    const fullDate = new Date(dateString);
    const dayOfWeek = fullDate.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = daysOfWeek[dayOfWeek];
    return dayName;
  }
}

function getDayMonthDate(currentDate) {
  const day = currentDate.toLocaleString('en-GB', { weekday: 'long' });
  const month = currentDate.toLocaleString('en-GB', { month: 'long' });
  const date = currentDate.getDate();
  return { day, month, date };
}
