
export const convertTimeIntoAMPM = (time: string): string => {
    const [crudeHour, crudeMinutes] = time.split(": ")
    const hour = Number(crudeHour) < 12
        ? Number(crudeHour) < 10
            ? `0${crudeHour}`
            : crudeHour
        : Number(crudeHour) - 12 === 0
            ? `12`
            : Number(crudeHour) - 12 < 10
                ? `0${Number(crudeHour) - 12}`
                : `${Number(crudeHour) - 12}`
    const minutes = Number(crudeMinutes) < 10 ? `0${crudeMinutes}` : crudeMinutes
    const ampm = Number(crudeHour) < 12 ? "AM" : "PM"
    return `${hour}:${minutes} ${ampm}`
}

export const convertIntoSeconds = (value: string): string => {
    const splitedValue = value.split("")
    const findHourExists = splitedValue.some((val: string) => val === "h")
    if (findHourExists) {
        const [hour, minutes] = value.split("-")
        const convertHour = hour.replace('h', '*60')
        const [val1h, val2h] = convertHour.split('*')
        const totalHour = (Number(val1h) * Number(val2h)) * 60
        const convertMinutes = minutes.replace('m', '*60')
        const [val1m, val2m] = convertMinutes.split('*')
        const totalMinutes = (Number(val1m) * Number(val2m))
        const totalSeconds = totalHour + totalMinutes
        return `${totalSeconds}`
    } else {
        const convertMinutes = value.replace('m', '*60')
        const [val1m, val2m] = convertMinutes.split('*')
        const totalMinutes = (Number(val1m) * Number(val2m))
        return `${totalMinutes}`
    }
}