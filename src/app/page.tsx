'use client'

import NavBar from "../components/NavBar";
import { useQuery } from "react-query";
import axios from "axios";

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>('repoData', async () => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`);
    return data;
  });

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
        <section>
          <div>
            <h2></h2>
            <div></div>
          </div>
        </section>
        <section></section>
      </main>
    </div>
  );
}
