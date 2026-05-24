// @ts-ignore
import dashboardStyles from "./dashboard.css?raw";

const db = {
  _instance: null as IDBDatabase | null,

  async open(): Promise<IDBDatabase> {
    if (this._instance) return this._instance;
    this._instance = await new Promise<IDBDatabase>((resolve, reject) => {
      const req = indexedDB.open("BmoTemplateCache", 1);
      req.onupgradeneeded = () => req.result.createObjectStore("kv");
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return this._instance!;
  },

  async get(key: string): Promise<unknown> {
    const d = await this.open();
    return new Promise((resolve, reject) => {
      const tx = d.transaction("kv", "readonly");
      const req = tx.objectStore("kv").get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },

  async set(key: string, val: unknown): Promise<void> {
    const d = await this.open();
    return new Promise((resolve, reject) => {
      const tx = d.transaction("kv", "readwrite");
      const req = tx.objectStore("kv").put(val, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  },
};

class DashBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
    this._render();
  }

  private _render(): void {
    this.shadowRoot!.innerHTML = this._template();
  }

  private _template(): string {
    return `
<style>${dashboardStyles}</style>

<div class="container">
  <header>
    <h1>✦ bmo template ✦</h1>
    <p class="subtitle">bare metal obsidian • single-file web comp</p>
  </header>

  <div class="grid">
    <div class="card">
      <div class="card-icon">🧩</div>
      <h2>your component</h2>
      <p>build something amazing with Shadow DOM + IndexedDB KV storage</p>
    </div>

    <div class="card">
      <div class="card-icon">📦</div>
      <h2>single-file output</h2>
      <p>all JS + CSS inlined into one portable HTML file via vite-plugin-singlefile</p>
    </div>
  </div>

  <footer>
    <p>bmo-template • built with vite + typescript + web components</p>
  </footer>
</div>
`;
  }
}

customElements.define("dash-board", DashBoard);
