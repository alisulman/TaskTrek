
export const convertTimeIntoAMPM = (time: string): string => {
    const [crudeHour, crudeMinutes] = time.split(":")
    const hour = Number(crudeHour) < 12
        ? Number(crudeHour) < 10
            ? `${crudeHour}`
            : crudeHour
        : Number(crudeHour) - 12 === 0
            ? `12`
            : Number(crudeHour) - 12 < 10
                ? `0${Number(crudeHour) - 12}`
                : `${Number(crudeHour) - 12}`
    const minutes = Number(crudeMinutes) < 10 ? `${crudeMinutes}` : crudeMinutes
    const ampm = Number(crudeHour) < 12 ? "AM" : "PM"
    return `${hour}:${minutes} ${ampm}`
}

export const convertDateAndTime = (value: string): { date: string, time: string } => {
    const [date, time] = value.split("T")
    const getTime = convertTimeIntoAMPM(time)
    return { date: date, time: getTime }
}

export const convertFromSeconds = (value: string): string => {
    const totalSeconds = Number(value);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (hours > 0 && minutes > 0) {
        return `${hours}h-${minutes}m`;
    } else if (hours > 0) {
        return `${hours}h`;
    } else if (minutes > 0) {
        return `${minutes}m`;
    } else {
        return "0m";
    }
};

export const convertIntoSeconds = (value: string): string => {
    let totalSeconds = 0;

    if (value.includes("h") && value.includes("m")) {
        const [hourPart, minutePart] = value.split("-");
        const hours = Number(hourPart.replace('h', '').trim()) || 0;
        totalSeconds += hours * 3600;
        const minutes = Number(minutePart.replace('m', '').trim()) || 0;
        totalSeconds += minutes * 60;
    }
    else if (value.includes("h")) {
        const hours = Number(value.replace('h', '').trim()) || 0;
        totalSeconds += hours * 3600;
    }
    else if (value.includes("m")) {
        const minutes = Number(value.replace('m', '').trim()) || 0;
        totalSeconds += minutes * 60;
    }
    else {
        return "Invalid format";
    }
    return totalSeconds.toString();
}


export const convertTimeStringToTimestamp = (timeString: string): number => {
    const date = new Date();
    const fullTime: {date: string, time: string} = convertDateAndTime(timeString)
    const [time, modifier] = fullTime.time.split(/( AM| PM)/);
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) {
        hours += 12
    }
    if (modifier === 'AM' && hours === 12) {
        hours = 0;
    }
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
}