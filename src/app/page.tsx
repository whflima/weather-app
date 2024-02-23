'use client'

import NavBar from "../components/NavBar";
import { useQuery } from "react-query";
import axios from "axios";
import { format, parseISO } from "date-fns";
import Container from "@/components/Container";
import { converKelvinToCelsius, getDayOrNightIcon } from "@/utils/utilsFunctions";
import WeatherIcon from "@/components/WeatherIcon";

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>('repoData', async () => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`);
    return data;
  });

  const firstDate = data?.list[0]

  console.log(data?.city);

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
        </section>
        <section></section>
      </main>
    </div>
  );
}
