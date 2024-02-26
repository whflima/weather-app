export function converKelvinToCelsius(tempInKelvin: number): number {
    const tempInCelsius = tempInKelvin - 273.15;
    return Math.floor(tempInCelsius);
}

export function getDayOrNightIcon(iconName: string, dateTimeString: string): string {
    const hours = new Date(dateTimeString).getHours();
    const isDayTime = hours >= 6 && hours < 18;
    return isDayTime ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n");
}

export function metersToKilometers(visibilityInMeters: number): string {
    const VisibilityInKiloMeters = visibilityInMeters / 1000;
    return `${VisibilityInKiloMeters.toFixed(0)}km`;
}

export function convertWindSpeed(speedInMetersPerSecond: number): string {
    const speedInMetersPerHour = speedInMetersPerSecond * 3.6000;
    return `${speedInMetersPerHour.toFixed(0)}km/h`;
}