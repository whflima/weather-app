interface WeatherData {
    cod: string;
    message: number;
    cnt: number;
    list: WeatherListItem[];
    city: CityInfo;
}

interface WeatherListItem {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    };
    weather: Weather[];
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
        pod: string;
    };
    dt_txt: string;
}

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface CityInfo {
    id: number;
    name: string;
    coord: {
        lat: number;
        lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

interface SingleWeatherDetailsProps {
    information: string;
    icon: React.ReactNode;
    value: string;
}

interface WeatherDetailProps {
    visibility: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
}

interface ForecastWeatherDetailProps extends WeatherDetailProps{
    weatherIcon: string;
    date: string;
    day: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    description: string;
}

interface SuggestionBoxProps {
    showSuggestions: boolean;
    suggestions: string[];
    handleSuggestionClick: (item: string) => void;
    error: string;
}

interface NavBarProps {
    location?: string;
}

interface SearchBoxProps {
    value: string;
    className?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
}