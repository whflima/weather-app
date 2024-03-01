'use client'

import NavBar from "../components/NavBar";
import { useQuery } from "react-query";
import axios from "axios";
import { format, fromUnixTime, parseISO } from "date-fns";
import Container from "@/components/Container";
import { converKelvinToCelsius, convertWindSpeed, getDayOrNightIcon, metersToKilometers } from "@/utils/utilsFunctions";
import WeatherIcon from "@/components/WeatherIcon";
import WeatherDetails from "@/components/WeatherDetails";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>('repoData', async () => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`);
    return data;
  });

  const firstDate = data?.list[0]

  console.log(data?.city);

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    )
  ];

  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  if (isLoading) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <NavBar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{ format(parseISO(firstDate?.dt_txt ?? ''), 'EEEE') }</p>
              <p className="text-lg">({ format(parseISO(firstDate?.dt_txt ?? ''), 'dd.MM.yyyy') })</p>
            </h2>
            <Container className="gap-10 px-6 items-center">
              {/* temperature */}
              <div className="flex flex-col px-4">
                <span className="text-5xl">
                  { converKelvinToCelsius(firstDate?.main.temp ?? 0) }°
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like</span>
                  <span>{ converKelvinToCelsius(firstDate?.main.feels_like ?? 0) }°</span>
                </p>
                <p className="text-xs space-x-2">
                  <span>{ converKelvinToCelsius(firstDate?.main.temp_min ?? 0) }°↓{" "}</span>
                  <span>{ converKelvinToCelsius(firstDate?.main.temp_max ?? 0) }°↑{" "}</span>
                </p>
              </div>

              {/* time and weather icon*/}
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.map((item, index) => 
                  <div key={index} className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
                    <p className="whitespace-nowrap">{ format(parseISO(item.dt_txt), "h:mm a") }</p>
                    <WeatherIcon icomName={getDayOrNightIcon(item.weather[0].icon, item.dt_txt)}/>
                    <p>{ converKelvinToCelsius(item?.main.temp ?? 0) }°</p>
                  </div>
                )}
              </div>
            </Container>
          </div>

          <div className="flex gap-4">
            {/* left */}
            <Container className="w-fit justify-center flex-col px-6 items-center">
              <p className="capitalize text-center">{ firstDate?.weather[0].description }</p>
              <WeatherIcon icomName={getDayOrNightIcon(firstDate?.weather[0].icon ?? "", firstDate?.dt_txt ?? "")}/>
            </Container>

            {/* right */}
            <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
              <WeatherDetails
                airPressure={ `${firstDate?.main.pressure} hPa`}
                humidity={ `${firstDate?.main.humidity}%` }
                sunrise={ format(fromUnixTime(data?.city.sunrise ?? 1702949452), "H:mm") }
                sunset={ format(fromUnixTime(data?.city.sunset ?? 1702949452), "H:mm") }
                visibility={ metersToKilometers(firstDate?.visibility ?? 1000) }
                windSpeed={ convertWindSpeed(firstDate?.wind.speed ?? 0) }
              />
              
            </Container>
          </div>
        </section>

        {/* 7 day forcast data */}
        <section className="flex w-full flex-col gap-4">
          <p className="text-2xl">Forecast (7 days)</p>

          {
            firstDataForEachDate.map((item, index) => (
              <ForecastWeatherDetail 
                key={ index } 
                description={ item?.weather[0].description ?? "" } 
                weatherIcon={ item?.weather[0].icon ?? "" } 
                date={ format(parseISO(item?.dt_txt ?? ""), "dd.MM") } 
                day={ format(parseISO(item?.dt_txt ?? ""), "EEEE") } 
                feels_like={ item?.main.feels_like ?? 0 }
                temp={ item?.main.temp ?? 0 } 
                temp_min={ item?.main.temp_min ?? 0 } 
                temp_max={ item?.main.temp_max ?? 0 } 
                airPressure={ `${item?.main.pressure} hPa` } 
                humidity={ `${item?.main.humidity}%` } 
                sunrise={ format(fromUnixTime(data?.city.sunrise ?? 1702517657), "H:mm") } 
                sunset={ format(fromUnixTime(data?.city.sunset ?? 1702517657), "H:mm") } 
                visibility={ `${metersToKilometers(item?.visibility ?? 10000)}` }
                windSpeed={ `${convertWindSpeed(item?.wind.speed ?? 1.64)}` } 
              />
            ))
          }
        </section>
      </main>
    </div>
  );
}
