import businessHoursConfig from "../config/businessHoursConfig";
import dateTimeRangesOverlap from "./dateTimeRangesOverlap";
import timeToMinutes from "./timeToMinutes";

export default function generateAvailableSlots(unavailableEvents, year, month, slotDurationHours = 1) {
    const availableSlots = [];
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);
    const businessStartMinutes = timeToMinutes(businessHoursConfig.startTime);
    const businessEndMinutes = timeToMinutes(businessHoursConfig.endTime);

    for (let day = new Date(firstDayOfMonth); day <= lastDayOfMonth; day.setDate(day.getDate() + 1)) {
        const currentDay = new Date(day);
        const dayOfWeek = currentDay.getDay();
        if (!businessHoursConfig.daysOfWeek.includes(dayOfWeek)) continue;

        for (let hour = businessStartMinutes / 60; hour < businessEndMinutes / 60; hour += slotDurationHours) {
            const slotStart = new Date(currentDay);
            slotStart.setHours(hour, 0, 0, 0);
            const slotEnd = new Date(slotStart);
            slotEnd.setHours(slotStart.getHours() + slotDurationHours, 0, 0, 0);
            const slotEndCurrentDayMinutes = slotEnd.getHours() * 60 + slotEnd.getMinutes();
            if (slotEnd.getDate() > slotStart.getDate() || slotEndCurrentDayMinutes > businessEndMinutes) continue;

            let isSlotBlocked = false;
            for (const unavailableEvent of unavailableEvents) {
                if (unavailableEvent.extendedProps && unavailableEvent.extendedProps.isUnavailable) {
                    if (unavailableEvent.daysOfWeek) {
                        if (unavailableEvent.daysOfWeek.includes(dayOfWeek)) {
                            const unavailableStartMinutes = timeToMinutes(unavailableEvent.startTime);
                            const unavailableEndMinutes = timeToMinutes(unavailableEvent.endTime);
                            const currentSlotStartMinutes = slotStart.getHours() * 60 + slotStart.getMinutes();
                            const currentSlotEndMinutes = (slotEnd.getHours() * 60 + slotEnd.getMinutes()) === 0 ? 24 * 60 : (slotEnd.getHours() * 60 + slotEnd.getMinutes());
                            if (currentSlotStartMinutes < unavailableEndMinutes && currentSlotEndMinutes > unavailableStartMinutes) {
                                isSlotBlocked = true; break;
                            }
                        }
                    } else {
                        if (dateTimeRangesOverlap(slotStart, slotEnd, new Date(unavailableEvent.start), new Date(unavailableEvent.end))) {
                            isSlotBlocked = true; break;
                        }
                    }
                }
            }
            if (!isSlotBlocked) {
                availableSlots.push({
                    title: 'Available', start: slotStart.toISOString(), end: slotEnd.toISOString(),
                    className: 'event-available', display: 'block',
                    extendedProps: { isAvailableSlot: true }
                });
            }
        }
    }
    return availableSlots;
}