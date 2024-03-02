import React from 'react'
import { FiDroplet } from 'react-icons/fi';
import { ImMeter } from 'react-icons/im';
import { LuEye, LuSunrise, LuSunset } from 'react-icons/lu';
import { MdAir } from 'react-icons/md';

export default function WeatherDetails(props: WeatherDetailProps) {
    const {
        visibility = "25km",
        humidity = "61%",
        windSpeed = "7 km/h",
        airPressure = "1012 hPa",
        sunrise = "6:20",
        sunset = "18:20",
    } = props;

    return (
        <>
            <SingleWeatherDetails icon={<LuEye />} information="Visibility" value={props.visibility} />
            <SingleWeatherDetails icon={<FiDroplet />} information="Humidity" value={props.humidity} />
            <SingleWeatherDetails icon={<MdAir />} information="Wind Speed" value={props.windSpeed} />
            <SingleWeatherDetails icon={<ImMeter />} information="Air Pressure" value={props.airPressure} />
            <SingleWeatherDetails icon={<LuSunrise />} information="Sunrise" value={props.sunrise} />
            <SingleWeatherDetails icon={<LuSunset />} information="Sunset" value={props.sunset} />
        </>
    );
}

function SingleWeatherDetails(props: SingleWeatherDetailsProps) {
    return (
        <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
            <p className="whitespace-nowrap">{props.information}</p>
            <div className="text-3xl">{props.icon}</div>
            <p>{props.value}</p>
        </div>
    );
}