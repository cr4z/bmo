import Binder from "./binder";
import * as db from "./db";

class DashBoard extends Binder {
  static attrs = ["location", "temp", "desc", "feelslike", "humidity"];
  static templateId = "dash-template";
}
customElements.define("dash-board", DashBoard);

const $ = document.querySelector("dash-board")!;
const set = (k: string, v: string) => $.setAttribute(k, v);

(async () => {
  const cached = await db.get<any>("weather");
  if (cached) {
    set("location", cached.location);
    set("temp", cached.temp);
    set("desc", cached.desc);
    set("feelslike", cached.feelslike);
    set("humidity", cached.humidity);
  }

  try {
    const res = await fetch("https://wttr.in/?format=j1");
    const data = await res.json();
    const c = data.current_condition[0];

    set("location", data.nearest_area[0].areaName[0].value);
    set("temp", `${c.temp_C}°C`);
    set("desc", c.weatherDesc[0].value);
    set("feelslike", `${c.FeelsLikeC}°C`);
    set("humidity", `${c.humidity}%`);

    await db.set("weather", {
      location: data.nearest_area[0].areaName[0].value,
      temp: `${c.temp_C}°C`,
      desc: c.weatherDesc[0].value,
      feelslike: `${c.FeelsLikeC}°C`,
      humidity: `${c.humidity}%`,
    });
  } catch {
    set("desc", "unavailable");
  }
})();
