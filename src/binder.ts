const _setup = new Set<Function>();

export default abstract class Binder extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return (this as any).attrs;
  }

  connectedCallback() {
    const ctor = this.constructor as any;

    if (!_setup.has(ctor)) {
      _setup.add(ctor);
      const proto = ctor.prototype;
      for (const attr of ctor.attrs || []) {
        Object.defineProperty(proto, attr, {
          get() { return this.getAttribute(attr); },
          set(v) { this.setAttribute(attr, v ?? ""); },
          configurable: true,
        });
      }
    }

    const id = ctor.templateId;
    if (id) {
      const t = document.getElementById(id) as HTMLTemplateElement | null;
      if (t) this.shadowRoot!.appendChild(t.content.cloneNode(true));
    }
  }

  attributeChangedCallback(name: string, _: string | null, val: string | null) {
    const el = this.shadowRoot?.getElementById(name);
    if (el) el.textContent = val;
  }
}
