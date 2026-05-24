<script lang="ts">
  import "./styles.css";
  import * as db from "./db";
  import { onMount } from "svelte";
  import { fetchWeather, type WeatherData } from "./weather";

  const CACHE_TTL = 30 * 60 * 1000;

  let weather: WeatherData | null = $state(null);
  let status: "loading" | "live" | "cached" | "failed" = $state("loading");
  let emoji = $state("");

  onMount(async () => {
    const cached = db.get<WeatherData>("weather");
    if (cached) {
      weather = cached;
      emoji = cached.emoji;
      status = "cached";
    }

    if (!navigator.onLine) {
      if (!weather) status = "failed";
      return;
    }

    try {
      const w = await fetchWeather();
      db.set("weather", w, CACHE_TTL);
      weather = w;
      emoji = w.emoji;
      status = "live";
    } catch {
      if (!weather) status = "failed";
    }
  });
</script>

<div class="container">
  <div class="hero">
    <h1>BMO</h1>
    <p class="subtitle">
      Bare Metal on Obsidian
      {#if weather}
        · <span class="loc">{weather.location}</span>
      {/if}
    </p>
  </div>

  <div class="card">
    {#if !weather && status === "failed"}
      <div class="current">
        <span class="desc weather-error">couldn't reach the weather gnomes</span
        >
      </div>
      <span class="badge badge-failed">
        <span class="status-dot dot-failed"></span>offline
      </span>
    {:else if weather}
      <div class="current">
        <span class="card-icon">{emoji}</span>
        <span class={status === "live" ? "temp temp-live" : "temp temp-cached"}
          >{weather.temp}°F</span
        >
        <span class="desc">{weather.desc}</span>
      </div>
      <div class="meta">
        <div class="row">
          <span class="l">Feels Like</span><span class="v"
            >{weather.feelsLike}°F</span
          >
        </div>
        <div class="row">
          <span class="l">Humidity</span><span class="v"
            >{weather.humidity}%</span
          >
        </div>
      </div>
      {#if status === "live" || status === "cached"}
        <div style="text-align:center">
          <span class="badge badge-{status}">
            <span class="status-dot dot-{status}"></span>{status}
          </span>
        </div>
      {/if}
    {:else}
      <div class="current">
        <span
          class="card-icon"
          style="font-size:2rem;display:block;margin-bottom:8px">☀️</span
        >
        <span class="desc">fetching forecast...</span>
      </div>
      <div class="card-loading">checking the clouds ☁️</div>
    {/if}
  </div>

  <footer>bmo-template</footer>
</div>
