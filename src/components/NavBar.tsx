'use client'

import React, { useState } from 'react'
import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from 'react-icons/md';
import SearchBox from './SearchBox';
import axios from 'axios';
import { loadingCityAtom, placeAtom } from '@/app/atom';
import { useAtom } from 'jotai';
import SuggestionBox from './SuggestionBox';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
const API_URL = process.env.NEXT_PUBLIC_WEATHER_URL;

export default function NavBar(props: NavBarProps) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [, setPlace] = useAtom(placeAtom);
  const [, setLoadingCity] = useAtom(loadingCityAtom);

  async function handleInputChange(value: string) {
    setCity(value);

    if (value.length > 3) {
      try {
        const response = await axios.get(`${API_URL}/find?q=${value}&appid=${API_KEY}`);
        const suggestions = response.data.list.map((item: any) => item.name);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  function handleSuggestionClick(value: string) {
    setCity(value);
    setShowSuggestions(false);
  }

  function handleSubimitSearch(value: React.FormEvent<HTMLFormElement>) {
    setLoadingCity(true);
    value.preventDefault();
    if (suggestions.length === 0) {
      setError("Location not found.");
      setLoadingCity(false);
      return;
    }

    setError("");
    setTimeout(() => {
      setPlace(city);
      setLoadingCity(false);
      setShowSuggestions(false);
    }, 5000);
  }

  function handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setLoadingCity(true);
          const response = await axios.get(`${API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
          setTimeout(() => {
            setLoadingCity(false);
            setPlace(response.data.name);
          }, 500);
        } catch (error) {
          setLoadingCity(false);
        }
      });
    }
  }

  return (
    <>
      <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
        <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-6 mx-auto">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-gray-500 text-3xl">Weather</h2>
            <MdWbSunny title="Your current location" className="text-3xl mt-1 text-yellow-300" />
          </div>
          <section className="flex gap-2 items-center">
            <MdMyLocation onClick={handleCurrentLocation} className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" />
            <MdOutlineLocationOn className='text-3xl' />
            <p className="text-slate-900/80 text-sm">{props.location}</p>
            <div className="relative hidden md:flex">
              <SearchBox value={city} onChange={(e) => handleInputChange(e.target.value)} onSubmit={handleSubimitSearch} />
              <SuggestionBox {...{
                showSuggestions,
                suggestions,
                handleSuggestionClick,
                error,
              }} />
            </div>
          </section>
        </div>
      </nav>

      <section className="flex max-w-7xl px-3 md:hidden">
        <div className="relative">
          <SearchBox value={city} onChange={(e) => handleInputChange(e.target.value)} onSubmit={handleSubimitSearch} />
          <SuggestionBox {...{
            showSuggestions,
            suggestions,
            handleSuggestionClick,
            error,
          }} />
        </div>
      </section>
    </>
  );
}
