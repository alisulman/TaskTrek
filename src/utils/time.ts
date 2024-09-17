
export const convertTimeIntoAMPM = (time: string): string => {
    const [crudeHour, crudeMinutes] = time.split(": ")
    const hour = Number(crudeHour) < 12
        ? Number(crudeHour) < 10
            ? `0${crudeHour}`
            : crudeHour
        : Number(crudeHour) - 12 === 0
            ? `12`
            : `${Number(crudeHour) - 12}`
    const minutes = Number(crudeMinutes) < 10 ? `0${crudeMinutes}` : crudeMinutes
    const ampm = Number(crudeHour) < 12 ? "AM" : "PM"
    return `${hour}:${minutes} ${ampm}`
}