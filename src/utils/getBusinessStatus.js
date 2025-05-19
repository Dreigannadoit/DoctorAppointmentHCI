export const getBusinessStatus = () => {
  const now = new Date();
  const currentDay = now.getDay(); 
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinutes;

  let isOpen = false;
  let statusMessage = "WE ARE CLOSED";
  let hoursDescription = {
    weekdays: "MONDAY - FRIDAY: 7 AM - 9 PM",
    weekends: "SATURDAY, SUNDAY: 10 AM - 3 PM"
  };

  // Weekdays (Monday to Friday)
  if (currentDay >= 1 && currentDay <= 5) {
    const openTime = 7 * 60;   // 7 AM in minutes
    const closeTime = 21 * 60; // 9 PM in minutes
    isOpen = currentTimeInMinutes >= openTime && currentTimeInMinutes <= closeTime;
  } 
  // Weekends (Saturday and Sunday)
  else if (currentDay === 0 || currentDay === 6) {
    const openTime = 10 * 60;  // 10 AM in minutes
    const closeTime = 15 * 60; // 3 PM in minutes
    isOpen = currentTimeInMinutes >= openTime && currentTimeInMinutes <= closeTime;
  }

  statusMessage = isOpen ? "WE ARE OPEN" : "WE ARE CLOSED";

  return {
    isOpen,
    statusMessage,
    hoursDescription
  };
};