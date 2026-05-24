export type WeatherData = {
  temp: string;
  feelsLike: string;
  humidity: string;
  desc: string;
  location: string;
  emoji: string;
};

function emojiFor(desc: string): string {
  if (desc.includes("sunny") || desc.includes("clear")) return "☀️";
  if (desc.includes("cloud") || desc.includes("overcast")) return "☁️";
  if (desc.includes("rain") || desc.includes("drizzle") || desc.includes("shower")) return "🌧️";
  if (desc.includes("thunder") || desc.includes("storm")) return "⛈️";
  if (desc.includes("snow") || desc.includes("sleet") || desc.includes("ice")) return "❄️";
  if (desc.includes("fog") || desc.includes("mist") || desc.includes("haze")) return "🌫️";
  if (desc.includes("partly")) return "⛅";
  return "🌤️";
}

export async function fetchWeather(): Promise<WeatherData> {
  const res = await fetch("https://wttr.in/?format=j1", { mode: "cors" });
  if (!res.ok) throw new Error();
  const data = await res.json();
  const cc = data.current_condition[0];
  const area = data.nearest_area?.[0]?.areaName?.[0]?.value ?? "your area";
  const region = data.nearest_area?.[0]?.region?.[0]?.value ?? "";
  const desc = (cc.weatherDesc[0].value as string).toLowerCase();

  return {
    temp: cc.temp_F,
    feelsLike: cc.FeelsLikeF,
    humidity: cc.humidity,
    desc,
    location: region ? `${area}, ${region}` : area,
    emoji: emojiFor(desc),
  };
}
