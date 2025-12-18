const FILE_BUNDLE={"/$app/uix/feedback/circular-progress.js":{content:`import T from "/$app/types/index.js";
import { html, svg } from "/npm/lit-html";

export default {
  tag: "uix-circular-progress",
  properties: {
    value: T.number({ defaultValue: 0 }), // 0-100
    size: T.string({
      defaultValue: "md",
      enum: ["xs", "sm", "md", "lg", "xl"],
    }),
    variant: T.string({
      defaultValue: "primary",
      enum: ["primary", "secondary", "success", "warning", "error"],
    }),
    thickness: T.number({ defaultValue: 4 }),
    indeterminate: T.boolean(false),
    showValue: T.boolean(false),
  },
  style: true,

  _getSizeValue() {
    const sizes = {
      xs: 24,
      sm: 32,
      md: 48,
      lg: 64,
      xl: 96,
    };
    return sizes[this.size] || sizes.md;
  },

  render() {
    const size = this._getSizeValue();
    const center = size / 2;
    const radius = center - this.thickness / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (this.value / 100) * circumference;

    return html\`
      <div class="circular-progress \${this.indeterminate ? "indeterminate" : ""}">
        <svg
          class="circular-progress-svg"
          width="\${size}"
          height="\${size}"
          viewBox="0 0 \${size} \${size}"
        >
          <!-- Background circle -->
          <circle
            class="circular-progress-track"
            cx="\${center}"
            cy="\${center}"
            r="\${radius}"
            fill="none"
            stroke-width="\${this.thickness}"
          ></circle>

          <!-- Progress circle -->
          <circle
            class="circular-progress-indicator circular-progress-\${this.variant}"
            cx="\${center}"
            cy="\${center}"
            r="\${radius}"
            fill="none"
            stroke-width="\${this.thickness}"
            stroke-dasharray="\${circumference}"
            stroke-dashoffset="\${this.indeterminate ? circumference * 0.75 : offset}"
            stroke-linecap="round"
            transform="rotate(-90 \${center} \${center})"
          ></circle>
        </svg>

        \${
          this.showValue && !this.indeterminate
            ? html\`
              <div class="circular-progress-label">
                <span>\${Math.round(this.value)}%</span>
              </div>
            \`
            : ""
        }
      </div>
    \`;
  },
};

/**
 * Circular Progress Component
 *
 * @component
 * @category feedback
 * @tag uix-circular-progress
 *
 * A circular progress indicator showing completion percentage or indeterminate loading state.
 *
 * @example
 * // Basic usage
 * \`\`\`html
 * <uix-circular-progress value="75"></uix-circular-progress>
 * \`\`\`
 *
 * @example
 * // With value label
 * \`\`\`html
 * <uix-circular-progress value="65" show-value></uix-circular-progress>
 * \`\`\`
 *
 * @example
 * // Indeterminate (loading)
 * \`\`\`html
 * <uix-circular-progress indeterminate></uix-circular-progress>
 * \`\`\`
 *
 * @example
 * // Size variants
 * \`\`\`html
 * <div style="display: flex; gap: 1rem; align-items: center;">
 *   <uix-circular-progress size="xs" value="50"></uix-circular-progress>
 *   <uix-circular-progress size="sm" value="60"></uix-circular-progress>
 *   <uix-circular-progress size="md" value="70"></uix-circular-progress>
 *   <uix-circular-progress size="lg" value="80"></uix-circular-progress>
 *   <uix-circular-progress size="xl" value="90"></uix-circular-progress>
 * </div>
 * \`\`\`
 *
 * @example
 * // Color variants
 * \`\`\`html
 * <div style="display: flex; gap: 1rem; align-items: center;">
 *   <uix-circular-progress variant="primary" value="60" show-value></uix-circular-progress>
 *   <uix-circular-progress variant="secondary" value="70" show-value></uix-circular-progress>
 *   <uix-circular-progress variant="success" value="80" show-value></uix-circular-progress>
 *   <uix-circular-progress variant="warning" value="50" show-value></uix-circular-progress>
 *   <uix-circular-progress variant="error" value="30" show-value></uix-circular-progress>
 * </div>
 * \`\`\`
 *
 * @example
 * // Different thicknesses
 * \`\`\`html
 * <div style="display: flex; gap: 1rem; align-items: center;">
 *   <uix-circular-progress value="75" thickness="2"></uix-circular-progress>
 *   <uix-circular-progress value="75" thickness="4"></uix-circular-progress>
 *   <uix-circular-progress value="75" thickness="6"></uix-circular-progress>
 *   <uix-circular-progress value="75" thickness="8"></uix-circular-progress>
 * </div>
 * \`\`\`
 *
 * @example
 * // Progress states
 * \`\`\`html
 * <div style="display: flex; gap: 2rem; align-items: center;">
 *   <div style="text-align: center;">
 *     <uix-circular-progress value="0" show-value></uix-circular-progress>
 *     <p>Not started</p>
 *   </div>
 *   <div style="text-align: center;">
 *     <uix-circular-progress value="45" show-value variant="warning"></uix-circular-progress>
 *     <p>In progress</p>
 *   </div>
 *   <div style="text-align: center;">
 *     <uix-circular-progress value="100" show-value variant="success"></uix-circular-progress>
 *     <p>Complete</p>
 *   </div>
 * </div>
 * \`\`\`
 *
 * @example
 * // File upload progress
 * \`\`\`html
 * <div style="text-align: center; padding: 2rem;">
 *   <uix-circular-progress
 *     size="lg"
 *     value="73"
 *     show-value
 *     variant="primary"
 *   ></uix-circular-progress>
 *   <p style="margin-top: 1rem;">Uploading file...</p>
 * </div>
 * \`\`\`
 *
 * @example
 * // Multiple progress indicators
 * \`\`\`html
 * <div style="display: flex; gap: 2rem; padding: 1rem;">
 *   <div style="flex: 1; text-align: center;">
 *     <uix-circular-progress value="85" show-value variant="success"></uix-circular-progress>
 *     <p>CPU Usage</p>
 *   </div>
 *   <div style="flex: 1; text-align: center;">
 *     <uix-circular-progress value="62" show-value variant="primary"></uix-circular-progress>
 *     <p>Memory</p>
 *   </div>
 *   <div style="flex: 1; text-align: center;">
 *     <uix-circular-progress value="41" show-value variant="warning"></uix-circular-progress>
 *     <p>Disk</p>
 *   </div>
 * </div>
 * \`\`\`
 *
 * @example
 * // With dynamic value
 * \`\`\`js
 * html\`
 *   <uix-circular-progress
 *     .value=\${this.progress}
 *     show-value
 *     size="lg"
 *   ></uix-circular-progress>
 *
 *   <uix-button @click=\${() => this.progress = Math.min(100, this.progress + 10)}>
 *     Increase
 *   </uix-button>
 *   <uix-button @click=\${() => this.progress = Math.max(0, this.progress - 10)}>
 *     Decrease
 *   </uix-button>
 * \`
 * \`\`\`
 *
 * @example
 * // Loading spinner
 * \`\`\`html
 * <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
 *   <uix-circular-progress indeterminate size="lg"></uix-circular-progress>
 *   <p>Loading data...</p>
 * </div>
 * \`\`\`
 */
`,mimeType:"text/javascript"},"/$app/bundler/iframe-builder.js":{content:`/**
 * Iframe-based build process controller
 * Creates an isolated iframe to navigate routes and collect cached files
 */

const IFRAME_TIMEOUT = 60000; // 1 minute max build time
const ROUTE_WAIT_TIME = 500; // Wait time per route

/**
 * Create a hidden iframe for build process
 * @returns {Promise<{iframe: HTMLIFrameElement, cleanup: Function}>}
 */
export function createBuildIframe() {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement("iframe");

    // Hidden iframe styling
    iframe.style.cssText = \`
      position: absolute;
      width: 1px;
      height: 1px;
      left: -9999px;
      visibility: hidden;
    \`;

    iframe.src = "/";

    const cleanup = () => {
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    };

    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error("Iframe build timed out"));
    }, IFRAME_TIMEOUT);

    iframe.onload = () => {
      clearTimeout(timeout);
      resolve({ iframe, cleanup });
    };

    iframe.onerror = (error) => {
      clearTimeout(timeout);
      cleanup();
      reject(error);
    };

    document.body.appendChild(iframe);
  });
}

/**
 * Navigate through all routes in the iframe
 * @param {HTMLIFrameElement} iframe
 * @param {Function} onProgress - Optional callback for progress updates
 * @returns {Promise<Array>} Array of page info objects
 */
export async function navigateIframeRoutes(iframe, onProgress) {
  const iframeWindow = iframe.contentWindow;
  const iframeRouter = iframeWindow.$APP?.Router;

  if (!iframeRouter) {
    throw new Error("Iframe $APP.Router not available");
  }

  const visited = new Set();
  const toVisit = ["/"];
  const pages = [];

  // Single pass: discover routes and collect page info with progress
  let routeCount = 0;

  while (toVisit.length > 0) {
    const route = toVisit.pop();
    if (visited.has(route)) continue;
    visited.add(route);
    routeCount++;

    // Report progress (count and current route only)
    if (onProgress) {
      onProgress({
        current: routeCount,
        route,
      });
    }

    try {
      // Navigate and collect page info
      iframeRouter.go(route);
      await new Promise((resolve) => setTimeout(resolve, ROUTE_WAIT_TIME));

      // Collect page info
      pages.push(collectPageInfo(iframeWindow, route));

      // Discover new routes from links in iframe
      const links = iframeWindow.document.querySelectorAll('[href^="/"]');
      for (const link of links) {
        const href = link.getAttribute("href");
        if (!visited.has(href) && !toVisit.includes(href)) {
          toVisit.push(href);
        }
      }
    } catch (error) {
      console.error(\`Error processing route \${route}:\`, error);
    }
  }

  // Final progress update
  if (onProgress) {
    onProgress({
      current: routeCount,
      route: "Complete",
    });
  }

  return pages;
}

/**
 * Collect page info from iframe's current state
 * @param {Window} iframeWindow
 * @param {string} route
 * @returns {Object} Page info object
 */
function collectPageInfo(iframeWindow, route) {
  const doc = iframeWindow.document;
  const ssg = iframeWindow.$APP?.Router?.currentRoute?.route?.ssg || false;

  const titleTag =
    doc.querySelector("title")?.outerHTML ||
    \`<title>\${iframeWindow.$APP?.settings?.name || "App"}</title>\`;
  const metaTags = Array.from(
    doc.querySelectorAll("head meta[name], head meta[property]"),
  )
    .map((tag) => tag.outerHTML)
    .join("\\n");
  const canonicalLink =
    doc.querySelector('head link[rel="canonical"]')?.outerHTML || "";

  const filePath =
    route === "/" ? "index.html" : \`\${route.slice(1)}/index.html\`;

  return {
    path: filePath,
    content: doc.body.innerHTML,
    headContent: \`\${titleTag}\\n\${metaTags}\\n\${canonicalLink}\`,
    ssg,
  };
}
`,mimeType:"text/javascript"},"/$app/uix/feedback/circular-progress.css":{content:`:where(.uix-circular-progress,uix-circular-progress){display:inline-flex;align-items:center;justify-content:center;position:relative;.indeterminate .circular-progress-indicator{animation:circularProgressSpin 1.4s linear infinite}.circular-progress-svg{transform:rotate(-90deg)}.circular-progress-track{stroke:var(--circular-progress-track-color, var(--color-surface-darker))}.circular-progress-indicator{stroke:var(--circular-progress-color, var(--color-primary));transition:stroke-dashoffset .3s ease}.circular-progress-primary{stroke:var(--color-primary)}.circular-progress-secondary{stroke:var(--color-secondary)}.circular-progress-success{stroke:var(--color-success)}.circular-progress-warning{stroke:var(--color-warning)}.circular-progress-error{stroke:var(--color-danger)}.circular-progress-label{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:var(--circular-progress-label-font-size, .75rem);font-weight:600;color:var(--circular-progress-label-color, var(--color-primary))}&[size=xs]{--circular-progress-label-font-size: .625rem}&[size=sm]{--circular-progress-label-font-size: .75rem}&[size=md]{--circular-progress-label-font-size: .875rem}&[size=lg]{--circular-progress-label-font-size: 1rem}&[size=xl]{--circular-progress-label-font-size: 1.25rem}}@keyframes circularProgressSpin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}
`,mimeType:"text/css"},"/$app/base/bootstrapp.js":{content:`import config from "/$app/base/config.js";
import $APP from "/$app.js";

try {
  if (!("serviceWorker" in navigator))
    throw new Error("Platform not supported");
  const registration = await navigator.serviceWorker.register("/backend.js", {
    type: "module",
  });
  await Promise.race([
    new Promise((resolve) => {
      if (navigator.serviceWorker.controller) return resolve();
      navigator.serviceWorker.addEventListener("controllerchange", () =>
        resolve(),
      );
    }),
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error("Service Worker timed out.")),
        config.serviceWorker.initTimeout,
      ),
    ),
  ]);
  sessionStorage.removeItem("_sw");
  await $APP.load();

  if ($APP.SW?.setRegistration) $APP.SW.setRegistration(registration);
} catch (error) {
  console.error("Service Worker initialization error:", error);
  const retryCount = Number.parseInt(sessionStorage.getItem("_sw") || "0", 10);
  if (retryCount < config.serviceWorker.maxRetries) {
    sessionStorage.setItem("_sw", String(retryCount + 1));
    console.warn(
      \`Retrying Service Worker initialization (attempt \${retryCount + 1}/\${config.serviceWorker.maxRetries})\`,
    );
    window.location.reload();
  } else {
    sessionStorage.removeItem("_sw");
    console.error(
      \`Could not start ServiceWorker after \${config.serviceWorker.maxRetries} attempts\`,
    );
  }
}
if ($APP.settings.dev) {
  try {
    const currentPort = window.location.port;
    const debugPort = config.devServer.getWsPort(currentPort);
    const wsUrl = \`\${window.location.protocol === "https:" ? "wss" : "ws"}://\${
      window.location.hostname
    }:\${debugPort}\`;
    const ws = new WebSocket(wsUrl);

    ws.addEventListener("message", (event) => {
      if (event.data === "APP:REFRESH") {
        console.log("Received refresh request from dev server");
        window.location.reload();
      }
    });
  } catch (e) {
    console.warn("WebSocket connection to dev server failed:", e);
  }
}
`,mimeType:"text/javascript"},"/$app/base/frontend.js":{content:`import $APP from "/$app.js";
import { html } from "/npm/lit-html";

import "/$app/base/apploader.js";
import Controller from "/$app/controller/index.js";
import { initSWFrontend } from "/$app/sw/frontend.js";
import T from "/$app/types/index.js";
import View, { settings } from "/$app/view/index.js";
import Loader from "/$app/view/loader.js";

// Initialize SW frontend with $APP injection
initSWFrontend($APP);

import Backend from "/$app/base/backend/frontend.js";
import initControllerApp, { registerModelType } from "/$app/controller/app.js";
import { initModelFrontend } from "/$app/model/frontend.js";
import { ModelType } from "/$app/model/index.js";
import initRouterApp from "/$app/router/app.js";
import Router from "/$app/router/index.js";
import "/$app/base/app/index.js";

// Initialize model frontend with $APP injection
initModelFrontend($APP);
import "/frontend.js";
settings.iconFontFamily = \`/$app/icon-\${$APP.theme.font.icon.family}/\${$APP.theme.font.icon.family}\`;
Controller.add("backend", Backend);
registerModelType(ModelType);
initControllerApp($APP, Controller, View);
initRouterApp($APP, Router, Controller);

$APP.events.on("APP:INIT", () => {
  if (!View.components.has("app-container"))
    $APP.define("app-container", {
      tag: "app-container",
      class: "flex flex-grow",
      extends: "router-ui",
      properties: {
        routes: T.object({ defaultValue: $APP.routes }),
        full: T.boolean(true),
      },
    });
});

$APP.addModule({ name: "template", path: "/views/templates" });
$APP.addModule({ name: "view", path: "/views" });

const getComponentPath = (tag) => {
  return View.components.get(tag)?.path || Loader.resolvePath(tag);
};

View.getComponentPath = getComponentPath;
settings.loadStyle = !$APP.settings.production;
View.reloadComponents = !!$APP.settings.preview;

// Load theme dev module in dev mode (CSS fetching for components)
if (settings.loadStyle) {
  import("/$app/theme/dev.js");
}

View.plugins.push({
  name: "hydrate",
  willUpdate: ({ instance }) => {
    if (
      $APP.settings.production &&
      !instance.hasUpdated &&
      instance.hasAttribute("client:hydrate")
    ) {
      instance.innerHTML = "";
      instance.removeAttribute("client:hydrate");
    }
  },
});

if (!$APP.routes["/"])
  $APP.routes.set({
    "/": { name: "index", component: () => html\`<app-index></app-index>\` },
  });
`,mimeType:"text/javascript"},"/$app/base/apploader.js":{content:`/**
 * @file Component Loader Integration
 * @description Bridges the $APP framework events to the Core Loader.
 */

import Loader from "/$app/view/loader.js";
import $APP from "/$app.js";

/**
 * Initialize Loader with App settings and start DOM observation
 */
const init = () => {
  Loader.configure({
    basePath: $APP.settings.basePath || "/",
    modules: $APP.modules || {},
    dev: $APP.settings.dev || false,
  });
  Loader.initDOM();
};

$APP.events.on("APP:READY", init);

$APP.events.set({
  moduleAdded({ module }) {
    Loader.addModule(module);
  },
});

$APP.define = Loader.define;
`,mimeType:"text/javascript"},"/$app/controller/index.js":{content:`/**
 * @bootstrapp/controller
 * Main entry point
 */

import adaptersStorage from "./adapters/storage.js";
import adaptersUrl from "./adapters/url.js";
import { createController } from "./core.js";
import * as syncUtils from "./sync.js";
import { createSync } from "./sync-factory.js";

const adapters = { ...adaptersStorage, ...adaptersUrl };
const Controller = createController(adapters);
Controller.createSync = createSync;
Controller.registerSyncType = syncUtils.registerSyncType;
Controller.getSyncInfo = syncUtils.getSyncInfo;

/**
 * Initialize URL sync (popstate listener)
 * Call this once to enable automatic URL adapter synchronization on browser navigation
 */
Controller.initUrlSync = () => {
  if (Controller._urlSyncInitialized) return;
  Controller._urlSyncInitialized = true;

  window.addEventListener("popstate", () => {
    syncUtils.syncUrl(Controller.querystring);
    syncUtils.syncUrl(Controller.hash);
  });
};

/**
 * Install View plugin for sync properties
 * @param {Object} View - View instance
 * @param {Object} options - Plugin options
 * @param {Function} options.onBroadcast - Optional callback for cross-tab sync broadcasts
 * @param {Function} options.onAsyncLoad - Optional async loading handler for special sync types
 */
Controller.installViewPlugin = (View, options = {}) => {
  View.plugins.push({
    name: "syncProps",
    test: ({ component }) =>
      Object.values(component.properties || {}).some((p) => p.sync),
    events: {
      disconnected: ({ instance }) => {
        syncUtils.cleanupSyncBindings(instance, Controller);
      },
      connected: ({ instance, component }) => {
        Object.entries(component.properties)
          .filter(([, p]) => p.sync)
          .forEach(([key, prop]) => {
            const info = syncUtils.getSyncInfo(prop.sync);
            if (!info) {
              return console.error(\`Missing sync object for '\${key}'\`);
            }

            if (info.syncObj) {
              syncUtils.bindCustomSync({
                instance,
                key,
                prop,
                syncObj: info.syncObj,
                onAsyncLoad:
                  options.onAsyncLoad && syncUtils.needsAsyncLoad(info.syncObj)
                    ? options.onAsyncLoad
                    : null,
              });
            } else {
              syncUtils.bindAdapterSync({
                instance,
                key,
                prop,
                adapterName: info.adapter,
                Controller,
                onBroadcast: options.onBroadcast,
              });
            }
          });
      },
      willUpdate: ({ instance, component, changedProps }) => {
        syncUtils.checkDependsOn(instance, component, changedProps);
      },
    },
  });
};

export default Controller;

export { createController, createSync };

export {
  bindAdapterSync,
  bindCustomSync,
  checkDependsOn,
  cleanupSyncBindings,
  getScopedKey,
  getSyncInfo,
  needsAsyncLoad,
  registerSyncType,
  syncUrl,
  updateState,
} from "./sync.js";
`,mimeType:"text/javascript"},"/$app/sw/frontend.js":{content:`/**
 * @file Service Worker Frontend Module
 * @description Frontend communication with Service Worker
 */

let $APP;
const pendingSWRequests = {};
let nextRequestId = 1;

// Update management state
let swRegistration = null;
let waitingWorker = null;
let updateCheckInterval = null;
let visibilityHandler = null;
let updateInProgress = false;

/**
 * Handle incoming messages from Service Worker
 * @param {MessageEvent} message - Message event from SW
 */
const handleSWMessage = async (message = {}) => {
  const { data } = message;
  const { eventId, type, payload } = data;

  // Handle response to pending request
  if (eventId && pendingSWRequests[eventId]) {
    try {
      pendingSWRequests[eventId].resolve(payload);
    } catch (error) {
      pendingSWRequests[eventId].reject(new Error(error));
    } finally {
      delete pendingSWRequests[eventId];
    }
    return;
  }

  // Handle incoming event
  const handler = $APP.swEvents.get(type);
  if (handler) await handler({ payload });
};

/**
 * Post a message to the Service Worker (fire and forget)
 * @param {string} type - Message type
 * @param {any} payload - Message payload
 */
const postMessageToSW = (type, payload) => {
  if (!navigator.serviceWorker?.controller) {
    console.warn("SW: No active service worker controller");
    return;
  }
  navigator.serviceWorker.controller.postMessage({ type, payload });
};

/**
 * Send a request to the Service Worker and wait for response
 * @param {string} type - Request type
 * @param {any} payload - Request payload
 * @param {number} timeout - Timeout in milliseconds (default: 30000)
 * @returns {Promise<any>} Response from SW
 */
const requestToSW = (type, payload, timeout = 30000) => {
  if (!navigator.serviceWorker?.controller) {
    return Promise.reject(new Error("No active service worker controller"));
  }

  const eventId = \`sw-request-\${nextRequestId++}\`;

  return new Promise((resolve, reject) => {
    pendingSWRequests[eventId] = { resolve, reject };

    const timeoutId = setTimeout(() => {
      if (pendingSWRequests[eventId]) {
        delete pendingSWRequests[eventId];
        reject(new Error(\`SW request timed out after \${timeout}ms: \${type}\`));
      }
    }, timeout);

    // Clear timeout on resolution
    const originalResolve = pendingSWRequests[eventId].resolve;
    pendingSWRequests[eventId].resolve = (value) => {
      clearTimeout(timeoutId);
      originalResolve(value);
    };

    navigator.serviceWorker.controller.postMessage({
      type,
      payload,
      eventId,
    });
  });
};

/**
 * Check for Service Worker updates
 * @returns {Promise<boolean>} True if update check was triggered
 */
const checkForUpdates = async () => {
  if (!swRegistration) return false;
  try {
    await swRegistration.update();
    return true;
  } catch (error) {
    console.warn("SW: Update check failed:", error);
    return false;
  }
};

/**
 * Notify that an update is available
 * @param {ServiceWorker} worker - The waiting worker
 */
const notifyUpdateAvailable = (worker) => {
  if (waitingWorker === worker) return; // Already notified for this worker
  console.log("SW: Update available! Emitting SW:UPDATE_AVAILABLE event");
  waitingWorker = worker;
  $APP?.events?.emit("SW:UPDATE_AVAILABLE", { worker });
};

/**
 * Handle when a new Service Worker is found
 * @param {ServiceWorker} newWorker - The installing/waiting worker
 */
const handleNewWorker = (newWorker) => {
  console.log("SW: handleNewWorker called, state:", newWorker.state, "hasController:", !!navigator.serviceWorker.controller);

  // If already installed and we have a controller, it's waiting
  if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
    notifyUpdateAvailable(newWorker);
    return;
  }

  // Listen for state changes (use once to prevent memory leaks)
  newWorker.addEventListener(
    "statechange",
    () => {
      console.log("SW: Worker state changed to:", newWorker.state);
      if (
        newWorker.state === "installed" &&
        navigator.serviceWorker.controller
      ) {
        notifyUpdateAvailable(newWorker);
      }
    },
    { once: true },
  );
};

/**
 * Apply pending update - activates waiting SW and reloads page
 * @param {number} timeout - Timeout in ms before giving up (default: 10000)
 * @returns {boolean} True if update was initiated
 */
const applyUpdate = (timeout = 10000) => {
  if (!waitingWorker) {
    console.warn("SW: No waiting worker to activate");
    return false;
  }

  if (updateInProgress) {
    console.warn("SW: Update already in progress");
    return false;
  }

  updateInProgress = true;

  // Tell the waiting SW to skip waiting
  waitingWorker.postMessage({ type: "SKIP_WAITING" });

  // Set up timeout in case activation fails
  const timeoutId = setTimeout(() => {
    console.error("SW: Update timed out, reload manually");
    updateInProgress = false;
  }, timeout);

  // Reload once the new SW takes control
  navigator.serviceWorker.addEventListener(
    "controllerchange",
    () => {
      clearTimeout(timeoutId);
      window.location.reload();
    },
    { once: true },
  );

  return true;
};

/**
 * Enable automatic update checking
 * @param {Object} config - Update configuration
 * @param {boolean} config.onPageLoad - Check on initial page load (default: true)
 * @param {number} config.pollingInterval - Polling interval in ms (0 to disable, default: 0)
 * @param {boolean} config.onVisibilityChange - Check when tab becomes visible (default: false)
 */
const enableAutoUpdates = (config = {}) => {
  const {
    onPageLoad = true,
    pollingInterval = 0,
    onVisibilityChange = false,
  } = config;

  if (!swRegistration) {
    console.warn("SW: Cannot enable auto updates - no registration");
    return;
  }

  // Clean up existing listeners first
  disableAutoUpdates();

  // Check on page load
  if (onPageLoad) {
    checkForUpdates();
  }

  // Set up polling
  if (pollingInterval > 0) {
    updateCheckInterval = setInterval(checkForUpdates, pollingInterval);
  }

  // Check on visibility change
  if (onVisibilityChange) {
    visibilityHandler = () => {
      if (document.visibilityState === "visible") {
        checkForUpdates();
      }
    };
    document.addEventListener("visibilitychange", visibilityHandler);
  }
};

/**
 * Disable automatic update checking and clean up listeners
 */
const disableAutoUpdates = () => {
  if (updateCheckInterval) {
    clearInterval(updateCheckInterval);
    updateCheckInterval = null;
  }
  if (visibilityHandler) {
    document.removeEventListener("visibilitychange", visibilityHandler);
    visibilityHandler = null;
  }
};

/**
 * Set the SW registration reference (called from bootstrapper)
 * @param {ServiceWorkerRegistration} registration - SW registration
 */
const setRegistration = (registration) => {
  swRegistration = registration;

  // Listen for future updates
  registration.addEventListener("updatefound", () => {
    const newWorker = registration.installing;
    console.log("SW: Update found, new worker installing...");
    if (newWorker) {
      handleNewWorker(newWorker);
    }
  });

  // Check if there's already a waiting worker (update ready to apply)
  if (registration.waiting) {
    console.log("SW: Found waiting worker on registration");
    handleNewWorker(registration.waiting);
  }

  // Check if there's an installing worker (update in progress)
  if (registration.installing) {
    console.log("SW: Found installing worker on registration");
    handleNewWorker(registration.installing);
  }
};

/**
 * Check if an update is available
 * @returns {boolean} True if a worker is waiting
 */
const hasUpdate = () => !!waitingWorker;

/**
 * Get the current registration
 * @returns {ServiceWorkerRegistration|null}
 */
const getRegistration = () => swRegistration;

/**
 * Initialize Service Worker frontend module
 * @param {Object} app - $APP instance
 */
export function initSWFrontend(app) {
  $APP = app;

  // Setup message listener
  if (navigator.serviceWorker) {
    navigator.serviceWorker.onmessage = handleSWMessage;
  }

  // Register swEvents module for handling incoming SW events
  $APP.addModule({
    name: "swEvents",
    base: new Map([
      [
        "SW:SYNC_PROPS",
        ({ payload }) => {
          if (payload?.property && payload?.value !== undefined) {
            $APP.events.emit(\`SYNC:\${payload.property}\`, payload.value);
          }
        },
      ],
      [
        "SW:QUERY_SYNC",
        ({ payload }) => {
          $APP.events.emit("SYNC:QUERY", payload);
        },
      ],
    ]),
  });

  // Register SW module
  const SW = {
    postMessage: postMessageToSW,
    request: requestToSW,
    // Update management
    setRegistration,
    enableAutoUpdates,
    disableAutoUpdates,
    checkForUpdates,
    applyUpdate,
    hasUpdate,
    getRegistration,
    // Build-time caching control
    enableLocalCaching: () => requestToSW("SW:ENABLE_LOCAL_CACHING"),
    disableLocalCaching: () => requestToSW("SW:DISABLE_LOCAL_CACHING"),
    clearLocalCache: () => requestToSW("SW:CLEAR_LOCAL_CACHE"),
  };

  $APP.addModule({
    name: "sw",
    alias: "SW",
    base: SW,
    path: "/$app/sw/views",
  });

  return SW;
}

export {
  setRegistration,
  enableAutoUpdates,
  disableAutoUpdates,
  checkForUpdates,
  applyUpdate,
  hasUpdate,
};
export default { initSWFrontend };
`,mimeType:"text/javascript"},"/$app/view/index.js":{content:`/**
 * @file View System - Web Components with and without Shadow DOM
 * @description Core component system for building reactive UI components using Custom Elements API
 * with lit-html for templating.
 */

import T from "/$app/types/index.js";
import { render } from "/npm/lit-html";

const SANITIZE_KEYS = ["__proto__", "constructor", "prototype"];
const KNOWN_DEFINITION_KEYS = new Set([
  "properties",
  "icons",
  "static",
  "formAssociated",
  "dataQuery",
  "style",
  "css",
  "connected",
  "disconnected",
  "shadow",
  "willUpdate",
  "firstUpdated",
  "updated",
  "dataLoaded",
  "class",
  "role",
  "tag",
]);

export const settings = {};
/**
 * Base View class for all custom components
 * Extends HTMLElement to provide reactive properties, lifecycle hooks, and templating
 * @class View
 * @extends HTMLElement
 */
class View extends HTMLElement {
  /** @static {Object} Property definitions for the component */
  static properties = {};

  static components = new Map();
  /** @static {Object} Internal attribute cache */
  static _attrs = {};

  /** @static {Array} List of plugins to apply to components */
  static plugins = [];

  /** @static {WeakMap} Track which styles have been injected into which shadowRoots */
  static shadowStylesInjected = new WeakMap();

  /** @type {Object} Component state object */
  state = {};

  /** @public {boolean} Whether component has completed first update */
  hasUpdated = false;

  /** @private {boolean} Flag to prevent attribute change loops */
  _ignoreAttributeChange = false;

  /** @private {Map} Map of properties that changed in current update cycle */
  _changedProps = new Map();

  /** @private {Promise|null} The promise for the current update cycle */
  _updatePromise = null;

  /**
   * Packages a component definition object into a Web Component Class.
   * Contains the logic for Mixins, Properties, and Lifecycle binding.
   * @static
   * @param {string} tag - The tag name
   * @param {Object|Function} definition - The component definition
   * @param {Class} BaseClass - The class to extend (View or other component)
   * @returns {Class} The generated class
   */
  static createClass(tag, definition, BaseClass) {
    BaseClass ||= View;
    if (typeof definition === "function") {
      const renderFn = definition;
      const properties = renderFn.properties || {};
      definition = {
        properties,
        render() {
          return renderFn.call(this, this);
        },
      };
    }

    const {
      properties = {},
      icons,
      static: staticProps,
      formAssociated = false,
      dataQuery = false,
      style = false,
      css,
      connected,
      disconnected,
      shadow,
      willUpdate,
      firstUpdated,
      updated,
      dataLoaded,
      class: klass,
      role,
    } = definition;

    const prototypeMethods = {};
    for (const key of Object.keys(definition)) {
      if (KNOWN_DEFINITION_KEYS.has(key)) continue;
      if (SANITIZE_KEYS.includes(key)) continue;

      const descriptor = Object.getOwnPropertyDescriptor(definition, key);
      Object.defineProperty(prototypeMethods, key, descriptor);
    }

    const methodKeysToBind = Object.keys(prototypeMethods);
    const mergedPlugins = new Map();
    [...View.plugins, ...BaseClass.plugins].forEach((plugin) => {
      mergedPlugins.set(plugin.name, plugin);
    });
    const finalPlugins = [...mergedPlugins.values()];

    const component = class extends BaseClass {
      static icons = icons;
      static style = style;
      static css = css;
      static dataQuery = dataQuery;
      static formAssociated = formAssociated;
      static shadow = shadow ?? BaseClass.shadow;
      static plugins = finalPlugins;
      static _classTags = (() => {
        const tags = [];
        let proto = BaseClass;
        while (proto?.tag) {
          tags.unshift(proto.tag);
          proto = Object.getPrototypeOf(proto);
        }
        tags.push(tag);
        return tags;
      })();

      constructor() {
        super();
        methodKeysToBind.forEach((key) => {
          // This relies on the keys in prototypeMethods being safe (fixed above)
          if (typeof this[key] === "function") this[key] = this[key].bind(this);
        });

        if (klass) this.classList.add(...klass.split(" "));
        if (role) this.setAttribute("role", role);
      }

      static get observedAttributes() {
        return Object.keys(component.properties).filter(
          (key) => component.properties[key].attribute !== false,
        );
      }

      static properties = (() => {
        const baseProperties = BaseClass.properties || {};
        const merged = { ...baseProperties };

        // SECURITY FIX 2: Filter properties keys to prevent pollution during merge
        for (const key of Object.keys(properties)) {
          if (SANITIZE_KEYS.includes(key)) {
            // Skip keys that can access the prototype chain
            continue;
          }

          const config = properties[key];
          if (config.type === "object" && config.properties)
            config.properties = merged[key]?.properties
              ? {
                  ...merged[key]?.properties,
                  ...config.properties,
                }
              : config.properties;
          merged[key] = merged[key]
            ? { ...merged[key], ...config }
            : { ...config };
        }
        return merged;
      })();
    };

    if (staticProps && typeof staticProps === "object") {
      Object.assign(component, staticProps);
    }

    Object.defineProperty(component, "name", { value: tag });

    for (const [key, prop] of Object.entries(component.properties)) {
      const { type, sync, attribute, setter, getter } = prop;
      if (sync) continue;

      if (Object.hasOwn(component.prototype, key)) continue;

      Object.defineProperty(component.prototype, key, {
        configurable: true,
        enumerable: true,
        get: getter
          ? function () {
              return getter.call(this);
            }
          : function () {
              return this.state[key];
            },
        set: setter
          ? function (value) {
              setter.call(this, value);
            }
          : function (value) {
              const oldValue = this.state[key];
              if (oldValue === value) return;
              this.state[key] = value;
              if (attribute) {
                this.updateAttribute({
                  key,
                  value,
                  skipPropUpdate: true,
                  type,
                });
              }
              this.requestUpdate(key, oldValue);
            },
      });
    }
    // Copy prototype methods to component, preserving getters/setters
    for (const key of Object.keys(prototypeMethods)) {
      // Skip if it collides with a reactive property
      if (Object.hasOwn(component.properties, key)) continue;

      const descriptor = Object.getOwnPropertyDescriptor(prototypeMethods, key);

      // If it's a getter/setter, define it properly
      if (descriptor.get || descriptor.set) {
        Object.defineProperty(component.prototype, key, {
          configurable: true,
          enumerable: true,
          get: descriptor.get,
          set: descriptor.set,
        });
      } else {
        // Regular method/property - just assign
        component.prototype[key] = descriptor.value;
      }
    }

    component.tag = tag;
    component._attrs = Object.fromEntries(
      Object.keys(component.properties).map((prop) => [
        prop.toLowerCase(),
        prop,
      ]),
    );

    component.plugins = [
      ...component.plugins.filter(
        (plugin) => !plugin.test || plugin.test({ component: component }),
      ),
    ];

    component.plugins.push({
      events: { connected, disconnected, willUpdate, firstUpdated, updated, dataLoaded },
      name: "base",
    });

    return component;
  }

  static define(tag, definition) {
    if (tag === "app-template") console.error({ tag, definition });
    const component = View.createClass(tag, definition);
    if (!customElements.get(tag)) customElements.define(tag, component);
    return component;
  }
  /**
   * Adds an event listener to the component
   * Supports event delegation with selector#eventType syntax
   * @param {string} eventName - Event name or selector#eventType for delegation
   * @param {Function} listener - Event handler function
   * @returns {Function} The wrapper function (for removal)
   */
  on(eventName, listener) {
    if (typeof listener !== "function")
      return console.error(
        \`Error adding listener to \${eventName}: callback is not a function.\`,
      );

    if (eventName.includes("#")) {
      const [selector, eventType] = eventName.split("#");
      const delegatedListener = (event) => {
        const target = event.target.closest(selector);
        if (target && this.contains(target)) listener(event);
      };
      this.addEventListener(eventType, delegatedListener);
      return delegatedListener;
    }
    const wrapper = ({ detail }) => {
      listener(detail);
    };
    this.addEventListener(eventName, wrapper);
    return wrapper;
  }

  /**
   * Removes an event listener from the component
   * @param {string} eventName - Event name or selector#eventType for delegation
   * @param {Function} listener - The listener function to remove
   */
  off(eventName, listener) {
    if (eventName.includes("#")) {
      const [, eventType] = eventName.split("#");
      this.removeEventListener(eventType, listener);
    } else this.removeEventListener(eventName, listener);
  }

  /**
   * Emits a custom event from the component
   * @param {string} eventName - Name of the event to emit
   * @param {*} data - Data to pass in event.detail
   */
  emit(eventName, data) {
    const event = new CustomEvent(eventName, {
      detail: data,
    });
    this.dispatchEvent(event);
  }

  $ = (element) => this.querySelector(element);
  $$ = (element) => this.querySelectorAll(element);

  connectedCallback() {
    if (this.constructor.shadow) {
      const shadowRoot = this._ensureShadowRoot();
      if (this.constructor.css) {
        if (!shadowRoot.querySelector("style[data-component-style]")) {
          const style = document.createElement("style");
          style.setAttribute("data-component-style", "");
          style.textContent = this.constructor.css;
          shadowRoot.prepend(style);
        }
      }
    }
    if (this.constructor.properties) this.initProps();
    if (this.constructor._classTags.length > 0)
      this.classList.add(...this.constructor._classTags);

    for (const plugin of this.constructor.plugins) {
      const { events = {} } = plugin;
      Object.entries(events).map(
        ([event, fn]) => fn && this.on(event, fn.bind(this)),
      );
    }
    this.emit("connected", {
      instance: this,
      component: this.constructor,
      tag: this.constructor.tag,
    });

    this.requestUpdate();
  }

  disconnectedCallback() {
    this.emit("disconnected", {
      instance: this,
      component: this.constructor,
      tag: this.constructor.tag,
    });
  }

  initProps() {
    for (const attr of this.attributes) {
      const key = this.constructor._attrs[attr.name];
      const prop = this.constructor.properties[key];
      if (prop && prop.type !== "boolean" && attr.value === "") {
        this.removeAttribute(attr.name);
        continue;
      }
      if (key) {
        this.state[key] = prop
          ? T.parse(attr.value, { ...prop, attribute: true })
          : attr.value;
      }
    }

    for (const [key, prop] of Object.entries(this.constructor.properties)) {
      const { type, sync, defaultValue, attribute } = prop;
      if (sync) continue;
      if (Object.hasOwn(this, key)) {
        const value = this[key];
        delete this[key];
        this[key] = value;
        continue;
      }

      this.state[key] ??= defaultValue;

      const value = this.state[key];
      const isComplex = ["array", "object", "function"].includes(type);

      if (
        attribute &&
        value !== undefined &&
        !this.hasAttribute(key) &&
        !isComplex
      ) {
        this.updateAttribute({
          key,
          value,
          skipPropUpdate: true,
          type,
        });
      }

      this._changedProps.set(key, undefined);
    }
  }

  /**
   * Requests an update which will be processed in the next microtask.
   * Returns a promise that resolves when the update is complete.
   * @param {string} [key] - The property key that changed
   * @param {*} [oldValue] - The old value of the property
   * @returns {Promise}
   */
  requestUpdate(key, oldValue) {
    if (key) this._changedProps.set(key, oldValue);

    if (this._updatePromise) return this._updatePromise;

    this._updatePromise = this.enqueueUpdate();
    return this._updatePromise;
  }

  /**
   * Performs the update after awaiting a microtask
   * @private
   */
  async enqueueUpdate() {
    await Promise.resolve();
    const result = this.performUpdate(false);
    this._updatePromise = null;
    return result;
  }

  performUpdate(forceUpdate) {
    const changedProps = this._changedProps;

    if (this.hasUpdated && !forceUpdate && !this.shouldUpdate(changedProps))
      return;
    this.emit("willUpdate", {
      changedProps,
      instance: this,
      component: this.constructor,
    });
    this.update(changedProps);
    if (!this.hasUpdated) {
      this.hasUpdated = true;
      this.emit("firstUpdated", {
        changedProps,
        instance: this,
        component: this.constructor,
      });
    }
    this.emit("updated", {
      changedProps,
      instance: this,
      component: this.constructor,
    });
    this._changedProps = new Map();
  }

  shouldUpdate(_changedProps) {
    const changedProps = new Map(_changedProps);
    if (!this.hasUpdated) return true;
    for (const [key, oldValue] of changedProps) {
      const newValue = this[key];
      const prop = this.constructor.properties[key];
      const hasChanged = prop?.hasChanged
        ? prop.hasChanged(newValue, oldValue)
        : oldValue !== newValue;
      if (!hasChanged) changedProps.delete(key);
      else
        this.emit(\`\${key}Changed\`, {
          oldValue,
          value: newValue,
          instance: this,
          component: this.constructor,
        });
    }
    this._changedProps = new Map();
    return changedProps.size > 0;
  }

  /**
   * Ensure shadow root exists if component uses shadow DOM
   */
  _ensureShadowRoot() {
    if (!this.shadowRoot) {
      const opts = { mode: "open" };
      if (typeof this.constructor.shadow === "object")
        Object.assign(opts, this.constructor.shadow);
      this.attachShadow(opts);
    }
    return this.shadowRoot;
  }

  update() {
    const container = this.constructor.shadow ? this._ensureShadowRoot() : this;
    render(this.render(), container);
  }

  render() {
    return null;
  }

  attributeChangedCallback(key, oldValue, value) {
    if (oldValue === value) return;
    this.emit("attributeChangedCallback", {
      instance: this,
      component: this.constructor,
      key,
      value,
      oldValue,
    });
    if (this._ignoreAttributeChange) return;
    this.state[key] = T.parse(value, this.constructor.properties[key]);
    if (this.hasUpdated) this.requestUpdate(key, oldValue);
  }

  updateAttribute({ key, value, type, skipPropUpdate = false }) {
    this._ignoreAttributeChange = skipPropUpdate;
    const isReflectable = type && typeof value !== "function";
    if (isReflectable) {
      if (type === "boolean")
        value ? this.setAttribute(key, "") : this.removeAttribute(key);
      else if (["array", "object"].includes(type))
        this.setAttribute(key, JSON.stringify(value));
      else if (value === null) this.removeAttribute(key);
      else if (type === "string" && String(value).trim().length > 0)
        this.setAttribute(key, String(value));
    }
    if (!skipPropUpdate) this[key] = value;
    else this._ignoreAttributeChange = false;
  }
}

export default View;
`,mimeType:"text/javascript"},"/$app/view/loader.js":{content:`/**
 * @file Component Loader (Core)
 * @description Handles dynamic loading, caching, registration of components,
 * and DOM observation.
 */

import View from "./index.js";

const Loader = {
  settings: {
    basePath: "/",
    modules: {},
    dev: false,
  },

  // Tag prefix to ignore (Server Side Generated)
  ssgTag: "ce-",

  /**
   * Configure the loader with app settings
   * @param {Object} config
   */
  configure(config) {
    Object.assign(Loader.settings, config || {});
  },

  /**
   * Registers a module and its components into the View registry.
   * Maps module component definitions to file paths.
   * @param {Object} module - The module object containing definition and path
   */
  addModule(module) {
    Loader.settings.modules[module.name] = module;
    if (!module.components) return;

    Object.entries(module.components).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        value.forEach((componentName) => {
          const tag = \`\${module.name}-\${componentName}\`;
          const entry = View.components.get(tag) || {};
          entry.path = [module.path, module.name, name, componentName]
            .filter(Boolean)
            .join("/");
          View.components.set(tag, entry);
        });
      } else {
        const tag = \`\${module.name}-\${name}\`;
        const entry = View.components.get(tag) || {};
        const rootPath = module.root ? module.root.replace(/\\/$/, "") : "";
        entry.path = [rootPath, module.path, module.name, name]
          .filter(Boolean)
          .join("/");
        View.components.set(tag, entry);
      }
    });
  },

  resolvePath(tagName) {
    const cached = View.components.get(tagName);
    if (cached?.path) return cached.path;
    const parts = tagName.split("-");
    const moduleName = parts[0];
    const module = Loader.settings.modules[moduleName];
    const componentName = parts.slice(1).join("-");
    return (
      module
        ? [module.path ?? moduleName, componentName]
        : [Loader.settings.basePath, tagName]
    )
      .filter(Boolean)
      .join("/");
  },

  /**
   * Loads the raw definition object from the file system
   */
  async loadDefinition(tag) {
    const cached = View.components.get(tag);
    if (cached?.definition) return cached.definition;

    const path = Loader.resolvePath(tag);
    if (tag === "app-template") console.trace();
    const { default: definition } = await import(\`\${path}.js\`);

    if (!definition)
      return console.warn(
        \`[Loader] No default export found for component \${tag} at \${path}.js\`,
      );

    const entry = View.components.get(tag) || {};
    entry.path = path;
    entry.definition = definition;
    View.components.set(tag, entry);
    return definition;
  },

  /**
   * Main orchestration method.
   * Loads definition, resolves parent (extends), builds class, and defines element.
   */
  async get(tag) {
    tag = tag.toLowerCase();
    if (customElements.get(tag)) {
      const cached = View.components.get(tag);
      if (!cached?._constructor) {
        const entry = View.components.get(tag) || {};
        entry._constructor = customElements.get(tag);
        View.components.set(tag, entry);
      }
      return View.components.get(tag)._constructor;
    }

    const cached = View.components.get(tag);
    if (cached?._constructor && !cached?.loadPromise)
      return cached._constructor;
    if (cached?.loadPromise) return cached.loadPromise;

    const loadPromise = (async () => {
      try {
        const definition = await Loader.loadDefinition(tag);
        if (!definition) throw new Error(\`Definition for \${tag} not found.\`);

        let BaseClass = View;
        let extendsTag =
          definition.extends ||
          (definition.prototype instanceof HTMLElement ? null : undefined);

        if (typeof definition === "function" && definition.extends)
          extendsTag = definition.extends;

        if (extendsTag) BaseClass = await Loader.get(extendsTag);

        const component = View.createClass(tag, definition, BaseClass);
        const entry = View.components.get(tag) || {};
        entry._constructor = component;
        View.components.set(tag, entry);
        if (BaseClass?.plugins)
          for (const { init } of BaseClass.plugins) {
            if (init && typeof init === "function")
              await init({ View, component, definition, tag });
          }

        if (!customElements.get(tag) || View.reloadComponents)
          customElements.define(tag, component);

        return component;
      } catch (error) {
        console.error(\`[Loader] Failed to define component \${tag}:\`, error);
        const entry = View.components.get(tag);
        if (entry) {
          delete entry.loadPromise;
          View.components.set(tag, entry);
        }
        return null;
      }
    })();

    const entry = View.components.get(tag) || {};
    entry.loadPromise = loadPromise;
    View.components.set(tag, entry);
    return loadPromise;
  },

  define(...args) {
    if (typeof args[0] === "string") {
      const tag = args[0].toLowerCase();
      const definition = args[1];
      const entry = View.components.get(tag) || {};
      entry.definition = definition;
      View.components.set(tag, entry);
      if (!Loader.settings.dev) {
        Loader.get(tag).catch((e) =>
          console.error(
            \`[Loader] Error during manual definition for \${tag}:\`,
            e,
          ),
        );
      }
    } else if (typeof args[0] === "object" && args[0] !== null) {
      Object.entries(args[0]).forEach(([tag, definition]) =>
        Loader.define(tag, definition),
      );
    }
  },

  /**
   * Scans a root element for undefined custom elements and loads them.
   */
  async traverseDOM(rootElement = document.body) {
    if (!rootElement || typeof rootElement.querySelectorAll !== "function")
      return;
    const undefinedElements = rootElement.querySelectorAll(":not(:defined)");
    const tagsToProcess = new Set();

    undefinedElements.forEach((element) => {
      const tagName = element.tagName.toLowerCase();
      if (tagName.includes("-") && !tagName.startsWith(Loader.ssgTag))
        tagsToProcess.add(tagName);
    });

    await Promise.allSettled(
      Array.from(tagsToProcess).map((tag) => Loader.get(tag)),
    );
  },

  /**
   * Sets up a MutationObserver to detect new elements added to the DOM.
   */
  observeDOMChanges() {
    const observer = new MutationObserver(async (mutationsList) => {
      const tagsToProcess = new Set();
      for (const mutation of mutationsList) {
        if (mutation.type !== "childList" || mutation.addedNodes.length === 0)
          continue;
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const processNode = (el) => {
            const tagName = el.tagName.toLowerCase();
            const cached = View.components.get(tagName);
            if (
              tagName.includes("-") &&
              !customElements.get(tagName) &&
              !cached?.loadPromise
            )
              tagsToProcess.add(tagName);
          };
          processNode(node);
          if (typeof node.querySelectorAll === "function")
            node.querySelectorAll(":not(:defined)").forEach(processNode);
        });
      }
      if (tagsToProcess.size > 0)
        await Promise.allSettled(
          Array.from(tagsToProcess).map((tag) => Loader.get(tag)),
        );
    });
    observer.observe(document.body, { childList: true, subtree: true });
  },

  /**
   * Convenience initializer for the DOM
   */
  initDOM() {
    Loader.traverseDOM(document.body);
    Loader.observeDOMChanges();
  },
};

const getComponentPath = (tag) => {
  return View.components.get(tag)?.path || Loader.resolvePath(tag);
};

View.getComponentPath = getComponentPath;

export default Loader;
`,mimeType:"text/javascript"},"/$app/base/backend/frontend.js":{content:`import T from "/$app/types/index.js";
import View from "/$app/view/index.js";
import $APP from "/$app.js";

let appWorker;
let wwPort;
const pendingRequests = {};

const handleWWMessage = async (message = {}) => {
  const { data } = message;
  const { eventId, type, payload, connection } = data;
  const response = payload;
  const respond =
    eventId &&
    ((responsePayload) =>
      wwPort.postMessage({
        eventId,
        payload: responsePayload,
        connection,
      }));
  await $APP.events.emit(type, { respond, payload, eventId });

  if (eventId && pendingRequests[eventId]) {
    try {
      pendingRequests[data.eventId].resolve(response);
    } catch (error) {
      pendingRequests[data.eventId].reject(new Error(error));
    } finally {
      delete pendingRequests[eventId];
    }
  }
  if (respond) return respond(response);
};

const initBackend = async () => {
  try {
    appWorker = new Worker(\`/backend.js\`, {
      type: "module",
    });
    const wwChannel = new MessageChannel();
    wwPort = wwChannel.port1;
    wwPort.onmessage = handleWWMessage;
    wwPort.onmessageerror = (e) => {
      console.error("Worker message error:", e);
    };
    appWorker.postMessage({ type: "APP:BACKEND:START" }, [wwChannel.port2]);
    //await navigator.storage.persist();
    $APP.events.on("APP:BACKEND:READY", async () => {
      await $APP.events.emit("APP:READY");
    });
  } catch (error) {
    console.error("Failed to initialize backend:", error);
    throw error;
  }
};

$APP.events.on("APP:INIT", initBackend);

const postMessageToPort = (port, params, retryFn) => {
  if (!port) {
    setTimeout(() => retryFn(params), 100);
    return;
  }
  port.postMessage(params);
};

const postMessageToWW = (params) =>
  postMessageToPort(wwPort, params, postMessageToWW);
const fetchDataQuery = async (instance) => {
  const query = instance["data-query"];
  if (!query) return;

  const {
    model,
    id,
    limit,
    offset = 0,
    order,
    where,
    includes,
    key,
    single,
  } = query;

  if (!model) return console.warn("data-query: 'model' is required");
  if (!key)
    return console.warn(
      "data-query: 'key' is required to know where to store data",
    );
  if (!$APP.Model || !$APP.Model[model])
    return console.error(\`data-query: Model "\${model}" does not exist\`);

  const isMany = query.many ?? (!id && !single);
  const opts = { limit: single ? 1 : limit, offset, includes, order, where };
  if (instance._dataQuerySub && instance._dataQuerySubHandler) {
    instance._dataQuerySub.unsubscribe(instance._dataQuerySubHandler);
    instance._dataQuerySub = null;
  }
  instance._paginationInfo = null;
  instance._dataQuerySubHandler = (data) => {
    const oldValue = instance.state[key];
    instance.state[key] = data;
    instance.requestUpdate(key, oldValue);
    instance.emit("dataLoaded", {
      instance,
      rows: isMany ? data : undefined,
      row: !isMany ? data : undefined,
      ...(instance._paginationInfo || {}),
      component: instance.constructor,
    });
  };

  try {
    if (isMany) {
      const result = await $APP.Model[model].getAll(opts);
      const oldValue = instance.state[key];
      instance.state[key] = result;
      instance._paginationInfo =
        result.limit !== undefined
          ? {
              total: result.total,
              limit: result.limit,
              offset: result.offset,
              count: result.count,
            }
          : null;
      instance.requestUpdate(key, oldValue);
      result.subscribe?.(instance._dataQuerySubHandler);
      instance._dataQuerySub = result;
    } else if (single && where) {
      const result = await $APP.Model[model].getAll(opts);

      const oldValue = instance.state[key];
      instance.state[key] = result[0] || null;
      instance.requestUpdate(key, oldValue);

      // Subscribe to array, extract first item on updates
      result.subscribe?.((data) => {
        instance._dataQuerySubHandler(data[0] || null);
      });
      instance._dataQuerySub = result;
    } else {
      // Single record via id
      const reactiveRow = await $APP.Model[model].get(id);
      const oldValue = instance.state[key];
      instance.state[key] = reactiveRow;
      instance.requestUpdate(key, oldValue);
      console.log({ id, reactiveRow });
      // Subscribe to updates - handle both array and single row formats
      reactiveRow.subscribe?.((data) => {
        const row = Array.isArray(data) ? data[0] : data;
        instance._dataQuerySubHandler(row);
      });
      instance._dataQuerySub = reactiveRow;
    }
    instance.emit("dataLoaded", {
      instance,
      rows: isMany ? instance.state[key] : undefined,
      row: !isMany ? instance.state[key] : undefined,
      ...(instance._paginationInfo || {}),
      component: instance.constructor,
    });
  } catch (error) {
    console.error(
      \`data-query: Failed to load data for model "\${model}":\`,
      error,
    );
    instance.emit("dataError", { instance, error, model, id });
  }

  instance.syncable = true;
};

View.plugins.push({
  name: "dataQuery",
  test: ({ component }) => !!component.dataQuery,
  init: ({ View }) => {
    View.properties["data-query"] = T.object({
      properties: {
        model: T.string(),
        id: T.string(),
        where: T.object(),
        includes: T.string(),
        order: T.string(),
        limit: T.number(),
        offset: T.number(),
        count: T.number(),
        key: T.string(),
        single: T.boolean(),
      },
    });
  },
  events: {
    connected: async ({ instance }) => {
      // Initial data fetch
      await fetchDataQuery(instance);

      // Listen for data-query prop changes to re-fetch
      instance._dataQueryChangeHandler = async () => {
        await fetchDataQuery(instance);
      };
      instance.on("data-queryChanged", instance._dataQueryChangeHandler);
    },
    disconnected: ({ instance }) => {
      // Clean up subscription
      if (instance._dataQuerySub && instance._dataQuerySubHandler)
        instance._dataQuerySub.unsubscribe(instance._dataQuerySubHandler);
      instance._dataQuerySub = null;
      instance._dataQuerySubHandler = null;
      if (instance._dataQueryChangeHandler) {
        instance.off("data-queryChanged", instance._dataQueryChangeHandler);
        instance._dataQueryChangeHandler = null;
      }
    },
  },
});

const backend = (type, payload = {}, connection = null, timeout = 10000) => {
  if (!type) {
    return Promise.reject(new Error("backend: type parameter is required"));
  }
  const eventId =
    Date.now().toString() + Math.random().toString(36).substr(2, 9);
  const params = { type, payload, eventId };
  return new Promise((resolve, reject) => {
    if (connection) params.connection = connection;
    const timeoutId = setTimeout(() => {
      if (pendingRequests[eventId]) {
        delete pendingRequests[eventId];
        reject(
          new Error(
            \`Backend request timeout after \${timeout}ms for type: \${type}\`,
          ),
        );
      }
    }, timeout);

    pendingRequests[eventId] = {
      resolve: (value) => {
        clearTimeout(timeoutId);
        resolve(value);
      },
      reject: (error) => {
        clearTimeout(timeoutId);
        reject(error);
      },
    };

    postMessageToWW(params);
  });
};
const Backend = { request: backend, init: initBackend };
$APP.addModule({ name: "Backend", base: Backend });
export default Backend;
`,mimeType:"text/javascript"},"/$app/controller/app.js":{content:`/**
 * @bootstrapp/controller - App Integration
 * Bridges Controller to $APP framework features (Service Worker integration)
 */

import { registerSyncType } from "./sync.js";

/**
 * Register ModelType as a sync type
 * @param {Function} ModelType - ModelType class constructor
 */
export function registerModelType(ModelType) {
  registerSyncType(
    (adapter) => adapter instanceof ModelType,
    (adapter) => ({ adapter: adapter.name, syncObj: adapter }),
  );
}

/**
 * Async loader for ModelType queries
 * @param {Object} options - Load options
 */
function loadModelTypeAsync({ instance, key, prop, syncObj, updateState }) {
  (async () => {
    let val = prop.defaultValue;
    try {
      const query =
        typeof prop.query === "function" ? prop.query(instance) : prop.query;
      val =
        prop.type === "array"
          ? await syncObj.getAll(query)
          : await (query.id
              ? syncObj.get(query.id, query)
              : syncObj.get(query));

      if (val) {
        val.subscribe((v) => {
          const copied = Array.isArray(v) ? [...v] : { ...v };
          updateState(instance, key, copied);
        });
      }
    } catch (e) {
      console.error(\`Sync error \${key}:\`, e);
    }

    const finalVal = val
      ? Array.isArray(val)
        ? [...val]
        : { ...val }
      : prop.defaultValue;
    updateState(instance, key, finalVal);
  })();
}

/**
 * Initialize controller with $APP integration
 * @param {Object} $APP - The $APP framework instance
 * @param {Object} Controller - The Controller instance
 * @param {Object} View - The View instance
 */
export function initControllerApp($APP, Controller, View) {
  $APP.swEvents.set(
    "SW:PROP_SYNC_UPDATE",
    ({ payload: { sync, key, value } }) => {
      const adapter = Controller[sync];
      if (adapter) {
        console.log(\`SYNC: Update \${sync}.\${key}\`, value);
        adapter.emit(key, value, { skipBroadcast: true });
      }
    },
  );

  Controller.installViewPlugin(View, {
    onBroadcast: (data) =>
      $APP.SW.postMessage("SW:BROADCAST_SYNCED_PROP", data),
    onAsyncLoad: loadModelTypeAsync,
  });

  Controller.initUrlSync();
}

export default initControllerApp;
`,mimeType:"text/javascript"},"/$app/model/frontend.js":{content:`/**
 * @file Frontend Model Module
 * @description Initializes Model system for frontend (browser) context
 */

import { createModel } from "./index.js";
import { SubscriptionManager } from "./subscription-manager.js";

/**
 * Initialize Model module on frontend
 * @param {object} $APP - App instance with Backend, events
 * @param {object} [options={}] - Initialization options
 * @returns {object} Model instance
 */
export function initModelFrontend($APP, options = {}) {
  const Model = createModel($APP);

  // Create request function that uses Backend
  const request = (action, modelName, params = {}) => {
    return $APP.Backend.request(action, {
      model: modelName,
      ...params,
    });
  };

  Model.request = request;
  $APP.addModule({ name: "Model", base: Model });

  // Initialize SubscriptionManager on frontend (without database - notifications come from backend)
  if (!$APP.SubscriptionManager) {
    $APP.SubscriptionManager = new SubscriptionManager(null);
  }

  // New query-level data sync
  $APP.events.on("QUERY_DATA_SYNC", ({ payload }) => {
    const { action, model, record } = payload;

    // Route to SubscriptionManager for query-level notifications
    if ($APP.SubscriptionManager) {
      $APP.SubscriptionManager.notifyMatchingQueries(model, action, record);
    }

    // Broadcast to service worker for other tabs
    if ($APP.SW) {
      $APP.SW.postMessage("SW:BROADCAST_QUERY_SYNC", payload);
    }
  });

  return Model;
}

export default { initModelFrontend };
`,mimeType:"text/javascript"},"/$app/router/app.js":{content:`/**
 * @bootstrapp/router - App Integration
 * Bridges Router to $APP framework features
 */

export function initRouterApp($APP, Router, Controller = null) {
  // Initialize router with $APP configuration
  const init = () => {
    Router.init($APP.routes, {
      appName: $APP.settings.name,
      isProduction: $APP.settings.production,
      onRouteChange: null,
    });

    // Register Router as a sync type for component bindings
    if (Controller) {
      Controller.registerSyncType(
        (adapter) => adapter === Router,
        (adapter) => ({ adapter: "router", syncObj: adapter.$sync }),
      );
    }

    // Make Router available on $APP
    $APP.Router = Router;
  };

  // Hook into APP:INIT event
  $APP.events.on("APP:INIT", init);

  // Register as framework module
  $APP.addModule({
    name: "router",
    path: "/$app/router",
    exports: Router,
  });

  // Set up popstate handler for browser back/forward
  // Only for browser-based routers
  if (Router.adapter?.type === "browser") {
    window.addEventListener("popstate", () => {
      Router.handleHistoryNavigation();
    });
  }
}

export default initRouterApp;
`,mimeType:"text/javascript"},"/$app/router/index.js":{content:`/**
 * @bootstrapp/router
 * Client-side router leveraging the URLPattern API
 * Supports nested routes, dynamic parameters, query strings, and history management
 */

import Controller from "/$app/controller/index.js";
import { createBrowserAdapter } from "./adapters.js";
import { createRouterCore } from "./core.js";

// Create singleton router with browser adapter
const Router = createRouterCore(createBrowserAdapter());

// Initialize sync for reactive properties
Router.$sync = Controller.createSync(Router, "router", [
  "currentRoute",
  "stack",
]);

export default Router;
`,mimeType:"text/javascript"},"/$app/base/app/index.js":{content:`import $APP from "/$app.js";

$APP.addModule({ name: "app", path: "/$app/base/app" });
`,mimeType:"text/javascript"},"/frontend.js":{content:`import T from "/$app/types/index.js";
import $APP from "/$app.js";
import "/models/schema.js";
import "/$app/cms/index.js";
import "/$app/i18n/index.js";
import Theme from "/$app/theme/index.js";
import "/$app/tailwind/index.js";
import "/$app/uix/app.js";
import "/$app/icon-lucide/app.js";
import "/controllers/index.js";
// Admin imports moved to /admin/index.html
import "/$app/maps/app.js";

import { initAuthFrontend } from "/$app/auth/frontend.js";

initAuthFrontend($APP);

$APP.i18n.registerLocale("en", () => import("/locales/en.js"));
$APP.i18n.registerLocale("pt", () => import("/locales/pt.js"));

$APP.events.on("AUTH:GUEST_CONVERTED", async ({ guestId, newUserId }) => {
  await Interactions.migrateGuestData(guestId, newUserId);
});

$APP.events.on("APP:INIT", async () => {
  if ($APP.Auth) {
    const restored = await $APP.Auth.restore();
    console.log(
      restored
        ? \`Auth restored for: \${$APP.Auth.user?.name}\`
        : "No auth session - guest mode",
    );
  }

  Theme.loadTheme("nbs");

  $APP.define("app-container", {
    extends: "router-ui",
    properties: { userId: T.number({ sync: "local" }) },
    async connected() {
      this.currentLang = $APP.i18n.getLanguage();
      $APP.events.on("i18n:language-changed", ({ locale }) => {
        this.currentLang = locale;
      });
      this.addEventListener("item-click", (e) => {
        this.modalItem = e.detail.item;
        this.modalOpen = true;
      });
    },
  });
});
`,mimeType:"text/javascript"},"/$app/controller/adapters/storage.js":{content:`const serialize = (value) => {
  if ((typeof value === "object" && value !== null) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  return value;
};

const deserialize = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const get = (storage) => (key) => {
  const value = storage.getItem(key);
  return value !== null ? deserialize(value) : null;
};

const set = (storage) => (key, value) => {
  storage.setItem(key, serialize(value));
  return { key };
};

const remove = (storage) => (key) => {
  storage.removeItem(key);
  return { key };
};
const keys = (storage) => () => {
  return Object.keys(storage);
};

const has = (storage) => (key) => {
  return storage.getItem(key) !== null && storage.getItem(key) !== undefined;
};

const createStorageAdapter = (storage) => {
  return {
    has: has(storage),
    set: set(storage),
    remove: remove(storage),
    get: get(storage),
    keys: keys(storage),
  };
};

const ramStore = new Map();
const ram = {
  has: (key) => {
    return ramStore.has(key);
  },
  get: (key) => {
    return ramStore.get(key);
  },
  set: (key, value) => {
    ramStore.set(key, value);
    return { key };
  },
  remove: (key) => {
    ramStore.delete(key);
    return { key };
  },
  keys: () => ramStore.keys(),
};

const local = createStorageAdapter(window.localStorage);
const session = createStorageAdapter(window.sessionStorage);
export default { local, ram, session };
`,mimeType:"text/javascript"},"/$app/controller/adapters/url.js":{content:`const getHashParams = () => {
  const hash = window.location.hash.substring(1);
  return new URLSearchParams(hash);
};

const setHashParams = (params) => {
  const newHash = params.toString();
  window.location.hash = newHash;
};

const hash = {
  get: (key) => {
    const params = getHashParams();
    return params.get(key);
  },
  has: (key) => {
    const params = getHashParams();
    return params.has(key);
  },
  set: (key, value) => {
    const params = getHashParams();
    if (value === null || value === undefined) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setHashParams(params);
    window.dispatchEvent(new Event("popstate"));
    return { key };
  },
  remove: (key) => {
    const params = getHashParams();
    params.delete(key);
    setHashParams(params);
    return { key };
  },
  keys: () => {
    const params = getHashParams();
    return [...params.keys()];
  },
  entries: () => {
    const params = getHashParams();
    return [...params.entries()];
  },
};

const querystring = {
  get(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
  },

  set(key, value) {
    const params = new URLSearchParams(window.location.search);
    if (value === null || value === undefined) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    window.history?.pushState?.(
      {},
      "",
      \`\${window.location.pathname}?\${params}\`,
    );
    window.dispatchEvent(new Event("popstate"));
    return { key };
  },

  remove(key) {
    const params = new URLSearchParams(window.location.search);
    params.delete(key);
    window.history.pushState?.({}, "", \`\${window.location.pathname}?\${params}\`);
    return { key };
  },
  keys() {
    const params = new URLSearchParams(window.location.search);
    return [...params.keys()];
  },
  has(key) {
    const params = new URLSearchParams(window.location.search);
    return params.has(key);
  },
  entries: () => {
    const params = new URLSearchParams(window.location.search);
    return [...params.entries()];
  },
};

export default { querystring, hash };
`,mimeType:"text/javascript"},"/$app/controller/core.js":{content:`/**
 * @bootstrapp/controller - Core
 * State management system with reactive adapters
 */

import createEventHandler from "/$app/events/index.js";

const adapters = {};
const adapterCache = new Map();

const parseKey = (k) =>
  typeof k === "string" && k.includes(".") ? k.split(".", 2) : [k, null];

/**
 * Creates an adapter with event capabilities
 * @param {Object} store - The storage backend
 * @param {string} name - Adapter name
 * @returns {Object} Adapter instance
 */
export const createAdapter = (store, name) => {
  const adapter =
    typeof store === "function"
      ? store
      : (k, v) => (v !== undefined ? adapter.set(k, v) : adapter.get(k));

  // Install event system
  createEventHandler(adapter);

  // Emit handler - will be overridden by app.js if needed
  const emit = (k, v) => adapter.emit(k, v);

  adapter.get = (key) => {
    const [k, path] = parseKey(key);
    const val = store.get(k);
    return path && val && typeof val === "object" ? val[path] : val;
  };

  adapter.set = (key, val) => {
    const [k, path] = parseKey(key);
    if (path) {
      const obj = { ...(store.get(k) || {}), [path]: val };
      store.set(k, obj);
      emit(k, obj);
      return obj;
    }
    store.set(k, val);
    emit(k, val);
    return val;
  };

  adapter.remove = (key) => {
    const [k, path] = parseKey(key);
    if (path) {
      const obj = store.get(k);
      if (obj && typeof obj === "object") {
        delete obj[path];
        store.set(k, obj);
        emit(k, obj);
      }
    } else {
      store.remove(k);
      emit(k, undefined);
    }
    return { key: k };
  };

  Object.assign(adapter, {
    has: store.has,
    keys: store.keys,
    entries: store.entries,
    broadcast: store.broadcast,
  });

  adapterCache.set(name, adapter);
  return adapter;
};

/**
 * Controller proxy for lazy adapter creation
 */
export const createController = (initialAdapters = {}) => {
  Object.assign(adapters, initialAdapters);

  const Controller = new Proxy(
    {},
    {
      get(target, prop) {
        if (prop in target) return target[prop];
        if (adapterCache.has(prop)) return adapterCache.get(prop);
        return adapters[prop] ? createAdapter(adapters[prop], prop) : undefined;
      },
    },
  );

  Controller.add = (n, a) =>
    typeof n === "object" ? Object.assign(adapters, n) : (adapters[n] = a);

  Controller.createAdapter = createAdapter;

  return Controller;
};

export default createController;
`,mimeType:"text/javascript"},"/$app/controller/sync.js":{content:`/**
 * @bootstrapp/controller - Sync Utilities
 * Generic sync logic with extensible type system
 */

// Sync type registry for custom types (ModelType, etc.)
const syncTypes = new Map();

/**
 * Register a custom sync type
 * @param {Function} check - Function that returns true if adapter matches this type
 * @param {Function} handler - Function that returns sync info for this type
 *
 * @example
 * registerSyncType(
 *   (adapter) => adapter instanceof ModelType,
 *   (adapter) => ({ adapter: adapter.name, syncObj: adapter })
 * )
 */
export function registerSyncType(check, handler) {
  syncTypes.set(check, handler);
}

/**
 * Get sync info for an adapter with pluggable type checking
 * @param {string|Object} adapter - Adapter name or sync object
 * @returns {Object|null} Sync info with adapter name and sync object
 */
export function getSyncInfo(adapter) {
  if (typeof adapter === "string") return { adapter, syncObj: null };
  for (const [check, handler] of syncTypes)
    if (check(adapter)) return handler(adapter);
  if (adapter?.$sync)
    return { adapter: adapter.$sync.adapter, syncObj: adapter.$sync };
  return null;
}

/**
 * Check if sync object requires async loading
 * @param {Object} syncObj - Sync object to check
 * @returns {boolean} True if async loading needed (has getAll method)
 */
export function needsAsyncLoad(syncObj) {
  return typeof syncObj?.getAll === "function";
}

/**
 * Get scoped key for component instance
 * @param {string} base - Base key name
 * @param {Object} prop - Property definition
 * @param {Object} inst - Component instance
 * @returns {string} Scoped key
 */
export function getScopedKey(base, prop, inst) {
  const { scope } = prop;
  if (!scope) return base;

  if (scope.includes(".")) {
    const [obj, key] = scope.split(".");
    if (inst[obj]?.[key]) return \`\${inst[obj][key]}:\${base}\`;
  }

  return inst[scope] ? \`\${inst[scope]}:\${base}\` : base;
}

/**
 * Update component state and trigger re-render
 * @param {Object} inst - Component instance
 * @param {string} key - Property key
 * @param {*} val - New value
 */
export function updateState(instance, key, val) {
  const oldValue = instance.state[key];
  instance.state[key] = val;
  if (!instance.isConnected) return;
  instance.requestUpdate(key, oldValue);
}

/**
 * Sync URL adapter when browser history changes
 * @param {Object} adapter - URL adapter (querystring or hash)
 */
export function syncUrl(adapter) {
  const current = new Map(adapter.entries());
  const old = new Set(adapter.listeners.keys());

  current.forEach((v, k) => {
    adapter.emit(k, v);
    old.delete(k);
  });

  old.forEach((k) => adapter.emit(k, undefined));
}

/**
 * Bind a custom sync object to a component property
 * @param {Object} options - Binding options
 * @param {Object} options.instance - Component instance
 * @param {string} options.key - Property key
 * @param {Object} options.prop - Property definition
 * @param {Object} options.syncObj - Sync object
 * @param {Function} options.onAsyncLoad - Optional async loading handler for special sync types
 */
export function bindCustomSync({ instance, key, prop, syncObj, onAsyncLoad }) {
  instance._customSyncUnsubscribers ||= [];
  instance._syncReloaders ||= {};

  Object.defineProperty(instance, key, {
    get: () => instance.state[key],
    set: (v) => {
      const oldValue = instance.state[key];
      if (oldValue === v) return;
      instance.state[key] = v;
      if (!prop.query && v !== syncObj.get(key)) syncObj.set(key, v);
      instance.requestUpdate(key, oldValue);
    },
  });

  if (onAsyncLoad && prop.query) {
    // Store reloader function for dependsOn support
    if (prop.dependsOn) {
      instance._syncReloaders[key] = () => {
        // Cleanup old subscription for this key
        const oldUnsubIdx = instance._customSyncUnsubscribers.findIndex(
          (fn) => fn._syncKey === key,
        );
        if (oldUnsubIdx > -1) {
          instance._customSyncUnsubscribers[oldUnsubIdx]();
          instance._customSyncUnsubscribers.splice(oldUnsubIdx, 1);
        }
        // Re-run async load with new query values
        onAsyncLoad({ instance, key, prop, syncObj, updateState });
      };
    }
    onAsyncLoad({ instance, key, prop, syncObj, updateState });
  } else {
    const val = syncObj.get(key);
    instance._customSyncUnsubscribers.push(
      syncObj.subscribe(key, (v) => updateState(instance, key, v)),
    );
    updateState(instance, key, val ?? prop.defaultValue);
  }
}

/**
 * Check if any dependency properties have changed and re-run queries
 * @param {Object} instance - Component instance
 * @param {Object} component - Component definition
 * @param {Map} changedProps - Map of changed property names
 */
export function checkDependsOn(instance, component, changedProps) {
  if (!instance._syncReloaders) return;

  Object.entries(component.properties || {})
    .filter(([, p]) => p.sync && p.dependsOn)
    .forEach(([key, prop]) => {
      const depsChanged = prop.dependsOn.some((dep) => changedProps.has(dep));
      if (depsChanged && instance._syncReloaders[key]) {
        instance._syncReloaders[key]();
      }
    });
}

/**
 * Bind an adapter to a component property
 * @param {Object} options - Binding options
 * @param {Object} options.instance - Component instance
 * @param {string} options.key - Property key
 * @param {Object} options.prop - Property definition
 * @param {string} options.adapterName - Adapter name
 * @param {Object} options.Controller - Controller instance
 * @param {Function} options.onBroadcast - Optional broadcast callback for cross-tab sync
 */
export function bindAdapterSync({
  instance,
  key,
  prop,
  adapterName,
  Controller,
  onBroadcast,
}) {
  const adapter = Controller[adapterName];
  if (!adapter) return;
  const sKey = getScopedKey(key, prop, instance);
  if (onBroadcast && adapterName === "local" && !adapter.hasListeners(sKey)) {
    adapter.on(sKey, (value, opts) => {
      if (!opts?.skipBroadcast) {
        onBroadcast({ value, sync: adapterName, key: sKey });
      }
    });
  }

  const listener = (v) => updateState(instance, key, v);
  (instance._listeners ||= {})[adapterName] ||= {};
  instance._listeners[adapterName][sKey] = listener;

  Object.defineProperty(instance, key, {
    get: () => instance.state[key],
    set: (v) => {
      const oldValue = instance.state[key];
      if (oldValue === v) return;
      instance.state[key] = v;
      if (v !== adapter.get(sKey)) adapter.set(sKey, v);
      instance.requestUpdate(key, oldValue);
    },
  });

  adapter.on(sKey, listener);
  updateState(instance, key, adapter.get(sKey) ?? prop.defaultValue);
}

/**
 * Cleanup sync bindings when component disconnects
 * @param {Object} instance - Component instance
 * @param {Object} Controller - Controller instance
 */
export function cleanupSyncBindings(instance, Controller) {
  if (instance._listeners) {
    Object.entries(instance._listeners).forEach(([name, fns]) => {
      const adapter = Controller[name];
      if (adapter) Object.entries(fns).forEach(([k, fn]) => adapter.off(k, fn));
    });
  }

  if (instance._customSyncUnsubscribers) {
    instance._customSyncUnsubscribers.forEach((unsubscribe) => unsubscribe());
    instance._customSyncUnsubscribers = null;
  }
}
`,mimeType:"text/javascript"},"/$app/controller/sync-factory.js":{content:`/**
 * Creates a sync object for any class instance and installs subscribe/notify pattern
 * @param {Object} instance - The instance to sync with
 * @param {string} adapterName - The name of the adapter to use in the Controller
 * @param {Array<string>} syncableProps - Array of property names that can be synced (optional, defaults to all)
 * @returns {Object} A sync object compatible with the property sync system
 */
export const createSync = (instance, adapterName, syncableProps = null) => {
  if (!instance._listeners) instance._listeners = new Map();
  if (!instance.subscribe) {
    instance.subscribe = function (key, callback) {
      if (!this._listeners.has(key)) this._listeners.set(key, new Set());
      const listeners = this._listeners.get(key);
      listeners.add(callback);
      return () => listeners.delete(callback);
    };
  }
  if (!instance._notify) {
    instance._notify = function (key, value) {
      if (this._listeners.has(key))
        this._listeners.get(key).forEach((callback) => callback(value));
    };
  }
  const allowedProps = syncableProps ? new Set(syncableProps) : null;
  const validateProp = (key) => {
    if (allowedProps && !allowedProps.has(key)) {
      console.warn(
        \`Property "\${key}" is not in the list of syncable properties for \${adapterName}\`,
      );
      return false;
    }
    return true;
  };
  if (syncableProps) {
    syncableProps.forEach((key) => {
      const descriptor = Object.getOwnPropertyDescriptor(instance, key);
      if (descriptor && typeof descriptor.set === "function") return;
      const currentValue = instance[key];
      const privateKey = \`_\${key}\`;
      instance[privateKey] = currentValue;
      Object.defineProperty(instance, key, {
        get() {
          return this[privateKey];
        },
        set(value) {
          if (this[privateKey] === value) return;
          this[privateKey] = value;
          this._notify(key, value);
        },
        enumerable: true,
        configurable: true,
      });
    });
  }

  return {
    adapter: adapterName,
    get: (key) => {
      if (!validateProp(key)) return undefined;
      return instance[key];
    },
    set: (key, value) => {
      if (!validateProp(key)) return;
      instance[key] = value;
    },
    subscribe: (key, callback) => {
      if (!validateProp(key)) return () => {};
      return instance.subscribe(key, callback);
    },
  };
};
`,mimeType:"text/javascript"},"/$app/router/adapters.js":{content:`/**
 * @bootstrapp/router - Platform Adapters
 * Abstracts browser and memory-based platform operations
 */

/**
 * Browser Platform Adapter
 * Uses window.location, window.history, and document APIs
 */
export const createBrowserAdapter = () => ({
  type: "browser",

  // Get current location information
  getLocation() {
    return {
      href: window.location.href,
      origin: window.location.origin,
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
    };
  },

  // Check if current URL matches path
  isSamePath(path) {
    return window.location.href === path;
  },

  // Navigate to new path (SSG support)
  hardNavigate(path) {
    window.location.href = path;
  },

  // Push state to history
  pushState(state, path) {
    const url = new URL(path, window.location.origin);
    if (url.href !== window.location.href) {
      window.history.pushState(state, "", path);
    }
  },

  // Replace current state
  replaceState(state, path) {
    window.history.replaceState(state, "", path);
  },

  // Navigate back in history
  back() {
    window.history.back();
  },

  // Navigate forward in history
  forward() {
    window.history.forward();
  },

  // Set document title
  setTitle(title) {
    document.title = title;
  },
});

/**
 * Memory Platform Adapter
 * Maintains location and history state in memory
 */
export const createMemoryAdapter = (initialPath = "/") => {
  // Parse initial path
  const initialUrl = new URL(initialPath, "http://memory");

  // Internal state
  const state = {
    pathname: initialUrl.pathname,
    search: initialUrl.search,
    hash: initialUrl.hash,
    origin: "http://memory",
  };

  // History stack for back/forward
  const history = [];
  let historyIndex = -1;

  return {
    type: "memory",

    getLocation() {
      return {
        href: \`\${state.origin}\${state.pathname}\${state.search}\${state.hash}\`,
        origin: state.origin,
        pathname: state.pathname,
        search: state.search,
        hash: state.hash,
      };
    },

    isSamePath(path) {
      const url = new URL(path, state.origin);
      const currentHref = \`\${state.pathname}\${state.search}\${state.hash}\`;
      const newHref = \`\${url.pathname}\${url.search}\${url.hash}\`;
      return currentHref === newHref;
    },

    hardNavigate(path) {
      // Memory routers don't support SSG hard navigation
      // Just update state instead
      const url = new URL(path, state.origin);
      state.pathname = url.pathname;
      state.search = url.search;
      state.hash = url.hash;
    },

    pushState(stateData, path) {
      const url = new URL(path, state.origin);

      // Update current state
      state.pathname = url.pathname;
      state.search = url.search;
      state.hash = url.hash;

      // Truncate forward history if we're not at the end
      if (historyIndex < history.length - 1) {
        history.splice(historyIndex + 1);
      }

      // Add to history
      history.push({
        pathname: state.pathname,
        search: state.search,
        hash: state.hash,
        state: stateData,
      });
      historyIndex = history.length - 1;
    },

    replaceState(stateData, path) {
      const url = new URL(path, state.origin);

      // Update current state
      state.pathname = url.pathname;
      state.search = url.search;
      state.hash = url.hash;

      // Replace current history entry
      if (historyIndex >= 0) {
        history[historyIndex] = {
          pathname: state.pathname,
          search: state.search,
          hash: state.hash,
          state: stateData,
        };
      }
    },

    back() {
      if (historyIndex > 0) {
        historyIndex--;
        const entry = history[historyIndex];
        state.pathname = entry.pathname;
        state.search = entry.search;
        state.hash = entry.hash;
        return true; // Indicate navigation occurred
      }
      return false; // No navigation (at start of history)
    },

    forward() {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        const entry = history[historyIndex];
        state.pathname = entry.pathname;
        state.search = entry.search;
        state.hash = entry.hash;
        return true; // Indicate navigation occurred
      }
      return false; // No navigation (at end of history)
    },

    setTitle(title) {
      // Memory routers don't update document.title
      // This is a no-op, but keeps the interface consistent
    },

    // Memory-specific: Get current history state for inspection
    getHistory() {
      return {
        entries: [...history],
        index: historyIndex,
      };
    },
  };
};
`,mimeType:"text/javascript"},"/$app/router/core.js":{content:`/**
 * @bootstrapp/router - Core Implementation
 * Platform-agnostic router logic
 */

/**
 * Creates a router instance with the given platform adapter
 * @param {Object} adapter - Platform adapter (browser or memory)
 * @returns {Object} Router instance
 */
export const createRouterCore = (adapter) => {
  const router = {
    stack: [],
    routes: [],
    namedRoutes: {},
    currentRoute: {},
    defaultTitle: "",
    options: {},
    adapter, // Store adapter reference

    /**
     * Converts a route path and its named parameters into a URLPattern compatible string.
     * e.g., path: '/servers', namedParams: ['page'] becomes '/servers(/page/:page)?'
     * @param {object} route - The route object from the configuration.
     * @returns {string} The pattern string for the URLPattern constructor.
     * @private
     */
    _createPatternString(route) {
      let path = route.path;
      if (route.namedParams && route.namedParams.length > 0) {
        const optionalSegments = route.namedParams
          .map((param) => \`/\${param}/:\${param}\`)
          .join("");
        path += \`(\${optionalSegments})?\`;
      }
      return path;
    },

    /**
     * Recursively flattens the nested route configuration.
     * @param {object} routes - The nested routes object to process.
     * @param {string} [basePath=''] - The base path from the parent route.
     * @param {object} [parentRoute=null] - The parent route object.
     * @returns {{flatRoutes: object, namedRoutes: object}}
     */
    flattenRoutes(routes, basePath = "", parentRoute = null) {
      const flatRoutes = {};
      const namedRoutes = {};

      for (const path in routes) {
        const route =
          typeof routes[path] === "function"
            ? routes[path]
            : { ...routes[path] };
        const fullPath = (basePath + path).replace(/\\/+/g, "/");

        route.path = fullPath || "/";
        route.parent = parentRoute;
        flatRoutes[route.path] = route;

        if (route.name) {
          if (namedRoutes[route.name]) {
            console.warn(
              \`Router: Duplicate route name "\${route.name}". Overwriting.\`,
            );
          }
          namedRoutes[route.name] = route.path;
        }

        if (route.routes) {
          const { flatRoutes: childFlatRoutes, namedRoutes: childNamedRoutes } =
            this.flattenRoutes(route.routes, fullPath, route);
          Object.assign(flatRoutes, childFlatRoutes);
          Object.assign(namedRoutes, childNamedRoutes);
        }
      }
      return { flatRoutes, namedRoutes };
    },

    /**
     * Initializes the router.
     * @param {object} routesConfig - The main routes configuration.
     * @param {object} [options={}] - Configuration options.
     * @param {string} [options.appName=''] - Application name for document titles.
     * @param {boolean} [options.isProduction=false] - Whether running in production mode (affects SSG behavior).
     * @param {Function} [options.onRouteChange=null] - Callback when route changes (receives currentRoute).
     * @param {Function} [options.onTitleChange=null] - Callback when title changes (receives newTitle).
     */
    init(routesConfig, options = {}) {
      if (!routesConfig || !Object.keys(routesConfig).length) {
        console.error("Router: No routes loaded");
        return;
      }

      this.options = {
        appName: "",
        isProduction: false,
        onRouteChange: null,
        onTitleChange: null,
        ...options,
      };

      const { flatRoutes, namedRoutes } = this.flattenRoutes(routesConfig);
      this.namedRoutes = namedRoutes;
      this.defaultTitle = this.options.appName || "";

      for (const path in flatRoutes) {
        const route = flatRoutes[path];
        const patternString = this._createPatternString(route);
        try {
          const pattern = new URLPattern({ pathname: patternString });
          this.routes.push({ pattern, route, originalPath: path });
        } catch (e) {
          console.error(
            \`Router: Error creating URLPattern for path: "\${patternString}"\`,
            e,
          );
        }
      }

      this.routes.sort((a, b) => {
        const aParts = a.originalPath.split("/").length;
        const bParts = b.originalPath.split("/").length;
        return bParts - aParts;
      });

      // Initial route setup using adapter
      const location = this.adapter.getLocation();
      this.setCurrentRoute(location.href, false);
    },

    /**
     * Finds the route that matches the given URL path.
     * @param {string} pathname - The normalized URL pathname to match.
     * @returns {object|null} A match object or null.
     * @private
     */
    _matchRoute(pathname) {
      for (const { pattern, route } of this.routes) {
        const match = pattern.exec({ pathname });

        if (match) {
          const params = match.pathname.groups || {};
          const combinedParams = { ...params };

          const component =
            typeof route === "function"
              ? route
              : typeof route.component === "function"
                ? route.component(combinedParams)
                : route.component;

          const result = {
            route,
            params: combinedParams,
            name: route.name,
            component,
            template: route.template,
          };

          if (route.parent) {
            result.route = route.parent;
            result.template = route.parent.template;
            result.component = route.parent.component(combinedParams);
            result.matched = {
              route,
              params: combinedParams,
              path: route.path,
              name: route.name,
              component: component,
              template: route.template,
            };
          }
          return result;
        }
      }
      return null;
    },

    /**
     * Sets the current route based on a path.
     * @param {string} path - The URL path to navigate to.
     * @param {boolean} [pushState=true] - Whether to push to the history stack.
     */
    setCurrentRoute(path, pushState = true) {
      if (!this.routes.length) return;

      const location = this.adapter.getLocation();
      const url = new URL(path, location.origin);
      const normalizedPathname = this.normalizePath(url.pathname);
      const matched = this._matchRoute(normalizedPathname);

      if (!matched) {
        console.warn(
          \`Router: No route found for path "\${normalizedPathname}".\`,
        );
        return pushState ? this.go("/") : null;
      }

      // SSG route handling (only for browser adapter in production)
      if (
        matched.route.ssg &&
        this.options.isProduction &&
        this.adapter.type === "browser" &&
        !this.adapter.isSamePath(path)
      ) {
        this.adapter.hardNavigate(path);
        return;
      }

      matched.path = url.pathname;
      matched.querystring = url.search;
      matched.hash = url.hash;
      matched.queryParams = Object.fromEntries(url.searchParams.entries());
      matched.params = { ...matched.queryParams, ...matched.params };

      if (matched.route.action) return matched.route.action(matched.params);
      if (matched.route.redirect) return this.go(matched.route.redirect);

      this.currentRoute = matched;
      const newTitle = matched.route.title || this.defaultTitle;
      this.setTitle(newTitle);

      if (pushState) {
        this.pushToStack(path, matched.params, newTitle);
        this._pushState(path, { path });
      } else {
        this.updateCurrentRoute(this.currentRoute);
      }
    },

    /**
     * Handles browser history navigation (back/forward buttons).
     */
    handleHistoryNavigation() {
      const location = this.adapter.getLocation();
      const currentPath = location.href;
      const stackIndex = this.stack.findIndex(
        (item) =>
          this.normalizePath(item.path) === this.normalizePath(currentPath),
      );
      if (stackIndex !== -1) {
        this.truncateStack(stackIndex);
      }
      this.setCurrentRoute(currentPath, false);
    },

    /**
     * Generates a URL path for a named route.
     * @param {string} routeName - The name of the route.
     * @param {object} [params={}] - The parameters for the path.
     * @returns {string|null} The generated path or null on error.
     */
    create(routeName, params = {}) {
      if (!routeName) {
        console.error("Router: Route name is required for Router.create()");
        return null;
      }

      const pathPattern = this.namedRoutes[routeName];
      if (!pathPattern) {
        console.error(\`Router: Route with name "\${routeName}" not found.\`);
        return null;
      }

      let finalPath = pathPattern;
      const pathParams = { ...params };

      finalPath = finalPath.replace(/:(\\w+)/g, (match, paramName) => {
        if (
          pathParams[paramName] !== undefined &&
          pathParams[paramName] !== null
        ) {
          const value = pathParams[paramName];
          delete pathParams[paramName];
          return String(value);
        }
        console.warn(
          \`Router: Parameter "\${paramName}" was not provided for named route "\${routeName}".\`,
        );
        return match;
      });

      const queryParams = new URLSearchParams(pathParams).toString();
      return queryParams ? \`\${finalPath}?\${queryParams}\` : finalPath;
    },

    /**
     * Navigates to a given route.
     * @param {string} routeNameOrPath - The path or the name of the route.
     * @param {object} [params] - Route parameters if navigating by name.
     */
    go(routeNameOrPath, params) {
      const isNamedRoute = !!params || this.namedRoutes[routeNameOrPath];
      const path = isNamedRoute
        ? this.create(routeNameOrPath, params)
        : routeNameOrPath;
      if (path !== null) {
        this.setCurrentRoute(path, true);
      }
    },

    /**
     * Navigates to a named route (alias for go).
     * @param {string} routeName - The name of the route.
     * @param {object} [params={}] - Route parameters.
     */
    navigate(routeName, params = {}) {
      return this.go(routeName, params);
    },

    /**
     * Replaces the current route without adding to history.
     * @param {string} routeNameOrPath - The path or the name of the route.
     * @param {object} [params={}] - Route parameters if using named route.
     */
    replace(routeNameOrPath, params = {}) {
      const isNamedRoute = !!params || this.namedRoutes[routeNameOrPath];
      const path = isNamedRoute
        ? this.create(routeNameOrPath, params)
        : routeNameOrPath;

      if (path === null) return;

      const location = this.adapter.getLocation();
      const url = new URL(path, location.origin);
      const normalizedPathname = this.normalizePath(url.pathname);
      const matched = this._matchRoute(normalizedPathname);

      if (!matched) {
        console.warn(
          \`Router: No route found for path "\${normalizedPathname}".\`,
        );
        return;
      }

      matched.path = url.pathname;
      matched.querystring = url.search;
      matched.hash = url.hash;
      matched.queryParams = Object.fromEntries(url.searchParams.entries());
      matched.params = { ...matched.queryParams, ...matched.params };

      this.currentRoute = matched;
      const newTitle = matched.route.title || this.defaultTitle;
      this.setTitle(newTitle);

      this.adapter.replaceState({ path }, path);
      this.updateCurrentRoute(this.currentRoute);
    },

    /**
     * Navigate forward in history.
     */
    forward() {
      const didNavigate = this.adapter.forward();
      // For memory router, trigger route update after forward
      if (this.adapter.type === "memory" && didNavigate) {
        this.handleHistoryNavigation();
      }
    },

    /**
     * Navigate to home route and reset stack.
     */
    home() {
      this.stack = [];
      this.go("/");
    },

    /**
     * Navigate back in history.
     */
    back() {
      if (this.stack.length <= 1) return this.home();
      this.stack = this.stack.slice(0, -1);
      const didNavigate = this.adapter.back();
      // For memory router, trigger route update after back
      if (this.adapter.type === "memory" && didNavigate) {
        this.handleHistoryNavigation();
      }
    },

    _pushState(path, state = {}) {
      const location = this.adapter.getLocation();
      const fullUrl = new URL(path, location.origin).href;
      if (!this.adapter.isSamePath(fullUrl)) {
        this.adapter.pushState(state, path);
      }
      this.updateCurrentRoute(this.currentRoute);
    },

    pushToStack(path, params = {}, title = this.defaultTitle) {
      const newItem = { path, params, title };
      if (this.normalizePath(path) === "/") {
        this.stack = [newItem];
      } else {
        this.stack = [...this.stack, newItem];
      }
    },

    setTitle(newTitle) {
      const fullTitle =
        newTitle && this.options.appName
          ? \`\${newTitle} | \${this.options.appName}\`
          : newTitle || this.options.appName;

      this.adapter.setTitle(fullTitle);

      if (this.stack.length > 0) {
        const updated = [...this.stack];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          title: newTitle,
        };
        this.stack = updated;
      }
      // Reassign currentRoute to trigger reactivity in synced components
      if (this.currentRoute?.route) {
        this.currentRoute = {
          ...this.currentRoute,
          route: {
            ...this.currentRoute.route,
            title: newTitle,
          },
        };
      }

      if (this.options.onTitleChange) {
        this.options.onTitleChange(fullTitle);
      }
    },

    updateCurrentRoute(route) {
      this.currentRoute = { ...route, root: this.isRoot() };
      if (this.options.onRouteChange) {
        this.options.onRouteChange(this.currentRoute);
      }
    },

    isRoot() {
      return this.stack.length <= 1;
    },

    truncateStack(index = 0) {
      this.stack = this.stack.slice(0, index + 1);
    },

    normalizePath(path = "/") {
      const normalized = path.split("?")[0].split("#")[0];
      return (normalized || "/").replace(/\\/+$/, "") || "/";
    },

    /**
     * Handles click events on links for SPA navigation.
     * Use this in components that render <a> tags to enable client-side routing.
     * @param {MouseEvent} e - The click event from the anchor element
     * @param {Object} [options={}] - Options
     * @param {boolean} [options.external=false] - If true, always use browser navigation
     * @returns {boolean} True if SPA navigation was triggered, false otherwise
     */
    handleLinkClick(e, options = {}) {
      const { external = false } = options;

      // Let browser handle modifier keys (new tab, download, etc.)
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) {
        return false;
      }

      const link = e.currentTarget;
      if (!link?.href) return false;

      const location = this.adapter.getLocation();
      const isLocal = link.origin === location.origin && !external;

      if (isLocal) {
        e.preventDefault();
        const path = [link.pathname, link.search].filter(Boolean).join("");
        this.go(path);
        return true;
      }

      return false;
    },
  };

  return router;
};
`,mimeType:"text/javascript"},"/$app/cms/index.js":{content:`/**
 * @bootstrapp/cms - Content Management System
 *
 * Provides CMS features for content models:
 * - Rich text editing (Markdown)
 * - Media library with upload
 * - SEO fields with preview
 * - Publishing workflow (draft/published/scheduled)
 *
 * Usage:
 *   // In frontend.js - register types and plugin
 *   import "@bootstrapp/cms";
 *
 *   // In schema.js - use CMS types
 *   import { cmsModels, cmsFields } from "@bootstrapp/cms/schema.js";
 *
 *   $APP.models.set({
 *     ...cmsModels, // Adds cms_media model
 *     posts: {
 *       $cms: true, // Enable CMS features
 *       ...cmsFields, // Add status, publishedAt, scheduledAt, seo
 *       title: T.string({ required: true }),
 *       body: T.richText(), // Uses CMS rich text editor
 *       image: T.media(),   // Uses CMS media picker
 *     }
 *   });
 */

import T from "/$app/types/index.js";
import cmsTypes from "./types.js";

// Register CMS types with the type system
T.registerExtension(cmsTypes);

// Import and register the admin plugin
import "./plugin.js";

// Re-export schema helpers
export { cmsFields, cmsModels } from "./schema.js";

console.log("[CMS] Package initialized");
`,mimeType:"text/javascript"},"/$app/i18n/index.js":{content:`/**
 * i18n Module
 * Provides internationalization support for Bootstrapp apps
 */
import Controller from "/$app/controller/index.js";
import View from "/$app/view/index.js";
import { I18n } from "./base.js";
import i18nViewPlugin from "./view-plugin.js";

// Initialize i18n instance
const i18nInstance = new I18n();

// Register view plugin for component-level i18n
View.plugins.push(i18nViewPlugin);
const base = {
  /**
   * Translate a key (with pluralization support)
   * @param {string} key - Translation key (dot-separated)
   * @param {Object} params - Parameters for interpolation (use 'n' or 'count' for plurals)
   * @example
   * $APP.i18n.t('welcome.title')
   * $APP.i18n.t('pushup', { n: 5 })  // "5 pushups"
   * $APP.i18n.t('greeting', { name: 'John' })  // "Hello, John!"
   */
  t: (key, params) => i18nInstance.t(key, params),

  /**
   * Format a number according to current locale
   * @param {number} number - Number to format
   * @param {Object} options - Intl.NumberFormat options
   * @example
   * $APP.i18n.n(1000)  // "1,000" (en) or "1.000" (pt)
   * $APP.i18n.n(0.5, { style: 'percent' })  // "50%"
   * $APP.i18n.n(99.99, { style: 'currency', currency: 'USD' })  // "$99.99"
   */
  n: (number, options) => i18nInstance.formatNumber(number, options),

  /**
   * Format a date according to current locale
   * @param {Date|string|number} date - Date to format
   * @param {Object} options - Intl.DateTimeFormat options
   * @example
   * $APP.i18n.d(new Date())  // "Jan 15, 2025"
   * $APP.i18n.d(date, { dateStyle: 'full' })  // "Wednesday, January 15, 2025"
   * $APP.i18n.d(date, { timeStyle: 'short' })  // "2:30 PM"
   */
  d: (date, options) => i18nInstance.formatDate(date, options),

  /**
   * Format a relative date (today, yesterday, X days ago)
   * @param {Date|string|number} date - Date to format
   * @example
   * $APP.i18n.r(new Date())  // "today"
   * $APP.i18n.r(yesterdayDate)  // "yesterday"
   * $APP.i18n.r(twoDaysAgo)  // "2 days ago"
   */
  r: (date) => i18nInstance.formatRelativeDate(date),

  /**
   * Set current language (with lazy loading)
   * @param {string} locale - Locale code
   */
  setLanguage: async (locale) => {
    console.log("i18n setLanguage called with:", locale);
    const newLocale = await i18nInstance.setLanguage(locale);
    console.log("Locale loaded:", newLocale);

    // Persist to localStorage via Controller
    if (Controller?.i18n) {
      Controller.i18n.set("currentLocale", newLocale);
    }

    // Auto re-render root component if enabled
    const autoRerender = $APP.settings.i18n.autoRerender;
    const rootComponent = $APP.settings.i18n.rootComponent;
    console.log("Auto-rerender settings:", { autoRerender, rootComponent });

    if (autoRerender && rootComponent) {
      try {
        const oldContainer = document.querySelector(rootComponent);
        console.log("Found container:", oldContainer);
        if (oldContainer) {
          // Use innerHTML to create custom element (createElement doesn't work for custom elements)
          const temp = document.createElement('div');
          temp.innerHTML = \`<\${rootComponent}></\${rootComponent}>\`;
          oldContainer.replaceWith(temp.firstElementChild);
          console.log("Replaced container");
        }
      } catch (error) {
        console.warn("Failed to auto-rerender root component:", error);
        console.warn("You may need to manually trigger re-render");
      }
    }

    return newLocale;
  },

  /**
   * Get current language
   */
  getLanguage: () => i18nInstance.getLanguage(),

  /**
   * Get available locales
   */
  getAvailableLocales: () => i18nInstance.getAvailableLocales(),

  /**
   * Register a locale loader for lazy loading
   * @param {string} locale - Locale code
   * @param {Function} loader - Function that returns Promise<translations>
   */
  registerLocale: (locale, loader) =>
    i18nInstance.registerLocale(locale, loader),

  /**
   * Add translations for a locale (used by modules)
   * @param {string} locale - Locale code
   * @param {Object} translations - Translation object
   */
  addTranslations: (locale, translations) =>
    i18nInstance.addTranslations(locale, translations),

  /**
   * Internal: Get i18n instance (for advanced use cases)
   */
  _instance: i18nInstance,
};
// Register module with Bootstrapp
$APP.addModule({
  name: "i18n",
  base,

  settings: {
    defaultLocale: "en",
    fallbackLocale: "en",
    persistLocale: true,
    autoRerender: true,
    rootComponent: "app-container",
  },

  events: () => ({
    /**
     * When a module is added, merge its i18n translations
     */
    moduleAdded({ module }) {
      if (module.i18n) {
        // Module provides translations: { locale: translations }
        for (const [locale, translations] of Object.entries(module.i18n)) {
          i18nInstance.addTranslations(locale, translations);
        }
      }
    },

    /**
     * On app init, restore saved language preference
     */
    async "APP:INIT"() {
      // Set up Controller adapter for persistence
      if (Controller && !Controller.i18n) {
        Controller.createAdapter("i18n", {
          storage: "localStorage",
          prefix: "i18n:",
        });
      }

      // Restore saved locale
      const savedLocale = Controller?.i18n?.get("currentLocale");
      if (savedLocale) {
        await i18nInstance.setLanguage(savedLocale);
      } else {
        // Use default locale from settings
        const defaultLocale = $APP.settings.get("i18n.defaultLocale") || "en";
        await i18nInstance.setLanguage(defaultLocale);
      }
    },
  }),
});

export default base;
`,mimeType:"text/javascript"},"/$app/theme/index.js":{content:`import View, { settings } from "/$app/view/index.js";

// Production CSS cache for Shadow DOM components
const productionCSSCache = new Map();

/**
 * Get component CSS content (works in both dev and production)
 * - Dev: returns cached cssContent from View.components (populated by dev.js)
 * - Production: fetches from /styles/{tag}.css
 * @param {string} tag - Component tag name
 * @returns {Promise<string|null>} CSS content
 */
const getComponentCSS = async (tag) => {
  // Dev: check View.components cache (populated by theme/dev.js)
  const entry = View.components.get(tag);
  if (entry?.cssContent) {
    return entry.cssContent;
  }

  // Production: check local cache
  if (productionCSSCache.has(tag)) {
    return productionCSSCache.get(tag);
  }

  // Production: fetch from /styles/{tag}.css
  try {
    const response = await fetch(\`/styles/\${tag}.css\`);
    if (response.ok) {
      const css = await response.text();
      productionCSSCache.set(tag, css);
      return css;
    }
  } catch (e) {
    // Silent fail - CSS file might not exist for all components
  }

  return null;
};

// Theme plugin - Shadow DOM CSS injection (works in both dev and production)
// Note: The init hook for fetching CSS in dev is in theme/dev.js
View.plugins.push({
  name: "theme",
  events: {
    connected: async (opts) => {
      const { tag, component, instance } = opts;
      if (!component.style) return;

      const root = instance.getRootNode();
      if (!(root instanceof ShadowRoot)) return;

      // Track injected styles per shadow root
      let injected = View.shadowStylesInjected.get(root);
      if (!injected) {
        injected = new Set();
        View.shadowStylesInjected.set(root, injected);
      }
      if (injected.has(component)) return;

      // Get CSS content (works in both dev and production)
      const cssContent = await getComponentCSS(tag);
      if (!cssContent) return;

      const style = document.createElement("style");
      style.setAttribute("data-component-style", component.tag);
      style.textContent = cssContent;
      root.prepend(style);
      injected.add(component);
    },
  },
});

// Font Loading Utility
const loadedFonts = new Set();
const loadedCSSFiles = new Set();

const loadCSS = (href, prepend = false) => {
  if (loadedCSSFiles.has(href)) {
    return;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;

  if (prepend) {
    document.head.prepend(link);
  } else {
    document.head.appendChild(link);
  }

  loadedCSSFiles.add(href);
};

const loadFont = (fontFamily) => {
  if (!fontFamily || loadedFonts.has(fontFamily)) {
    return;
  }

  const fontName = fontFamily.replace(/\\s+/g, "+");
  const url = \`https://fonts.googleapis.com/css2?family=\${fontName}:wght@300;400;500;600;700;800&display=swap\`;

  loadCSS(url);

  const styleId = "theme-font-vars";
  let styleTag = document.getElementById(styleId);

  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = styleId;
    document.head.appendChild(styleTag);
  }

  styleTag.textContent = \`
    :root {
      --font-family-base: '\${fontFamily}', sans-serif;
    }
    body {
      font-family: var(--font-family-base);
    }
  \`;

  loadedFonts.add(fontFamily);
};

// Color manipulation utilities
const rgbToHSL = (r, g, b) => {
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

const hslToCSS = (hsl) => \`hsl(\${hsl.h} \${hsl.s}% \${hsl.l}%)\`;

const adjustLightness = (hsl, delta) => ({
  h: hsl.h,
  s: hsl.s,
  l: Math.max(0, Math.min(100, hsl.l + delta)),
});

const mixWithColor = (hsl, mixWith, amount) => {
  if (mixWith === "white") {
    return {
      h: hsl.h,
      s: Math.round(hsl.s * (1 - amount * 0.5)),
      l: Math.round(hsl.l + (100 - hsl.l) * amount),
    };
  } else if (mixWith === "black") {
    return {
      h: hsl.h,
      s: Math.round(hsl.s * (1 - amount * 0.3)),
      l: Math.round(hsl.l * (1 - amount)),
    };
  }
  return hsl;
};

const parseColor = (str) => {
  if (!str || typeof str !== "string") return null;
  const s = str.trim();

  // HEX
  if (s.startsWith("#")) {
    let hex = s.slice(1);
    if (hex.length === 3)
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;
    return rgbToHSL(r, g, b);
  }

  // RGB
  if (s.startsWith("rgb")) {
    const match = s.match(/\\d+/g);
    if (!match || match.length < 3) return null;
    return rgbToHSL(match[0] / 255, match[1] / 255, match[2] / 255);
  }

  // HSL
  if (s.startsWith("hsl")) {
    const match = s.match(/[\\d.]+/g);
    if (!match || match.length < 3) return null;
    return {
      h: Math.round(parseFloat(match[0])),
      s: Math.round(parseFloat(match[1])),
      l: Math.round(parseFloat(match[2])),
    };
  }

  return null;
};

const generateShades = (baseHSL, config = {}) => {
  const defaultConfig = {
    lighter: { lightness: 20 },
    light: { lightness: 10 },
    dark: { lightness: -10 },
    darker: { lightness: -20 },
  };

  const shadeConfig = { ...defaultConfig, ...config };
  const shades = { DEFAULT: hslToCSS(baseHSL) };

  for (const [shadeName, shadeOpts] of Object.entries(shadeConfig)) {
    if (shadeName === "DEFAULT") continue;

    if (shadeOpts.mix) {
      const mixed = mixWithColor(
        baseHSL,
        shadeOpts.mix,
        shadeOpts.amount || 0.3,
      );
      shades[shadeName] = hslToCSS(mixed);
    } else if (shadeOpts.lightness !== undefined) {
      const adjusted = adjustLightness(baseHSL, shadeOpts.lightness);
      shades[shadeName] = hslToCSS(adjusted);
    }
  }

  return shades;
};

const generateThemeVariables = (themeObj, prefix = "-") => {
  const variables = {};
  const shadeSuffixes = ["lighter", "light", "dark", "darker"];

  const traverse = (obj, currentKey) => {
    for (const [key, value] of Object.entries(obj)) {
      const newKey = currentKey ? \`\${currentKey}-\${key}\` : \`\${prefix}-\${key}\`;
      const isColorBlock = currentKey === \`\${prefix}-color\`;

      if (typeof value === "object" && value !== null) {
        traverse(value, newKey);
      } else {
        variables[newKey] = value;

        if (isColorBlock && typeof value === "string") {
          const isVariant = shadeSuffixes.some((suffix) =>
            key.endsWith(\`-\${suffix}\`),
          );

          if (!isVariant) {
            const baseHSL = parseColor(value);
            if (baseHSL) {
              const generatedShades = generateShades(baseHSL);

              shadeSuffixes.forEach((shade) => {
                const variantKey = \`\${key}-\${shade}\`;
                if (obj[variantKey] === undefined) {
                  variables[\`\${newKey}-\${shade}\`] = generatedShades[shade];
                }
              });
            }
          }
        }
      }
    }
  };

  traverse(themeObj, "");
  return variables;
};

const injectThemeCSS = (variables) => {
  const styleId = "dynamic-theme-vars";
  let styleTag = document.getElementById(styleId);

  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = styleId;
    document.head.appendChild(styleTag);
  }

  const cssRules = Object.entries(variables)
    .map(([key, val]) => \`\${key}: \${val};\`)
    .join("\\n  ");

  styleTag.textContent = \`:root {\\n  \${cssRules}\\n}\`;
};

// Theme registry
const availableThemes = {};

const registerTheme = (name, loader) => {
  availableThemes[name] = loader;
};

const applyTheme = (themeData) => {
  const cssVars = generateThemeVariables(themeData);
  injectThemeCSS(cssVars);

  if (themeData?.font?.family) loadFont(themeData.font.family);
};

const loadTheme = async (themeInput) => {
  if (!themeInput) {
    const styleTag = document.getElementById("dynamic-theme-vars");
    if (styleTag) styleTag.remove();
    console.log("Theme removed.");
    return;
  }

  if (typeof themeInput === "object" && themeInput !== null) {
    applyTheme(themeInput);
    console.log("Custom theme object applied successfully.");
    return;
  }

  const themeName = themeInput;
  const themeLoader = availableThemes[themeName];

  if (!themeLoader) {
    console.warn(\`Theme "\${themeName}" not found.\`);
    return;
  }

  try {
    const module = await themeLoader();
    const themeData = module.default || module;
    applyTheme(themeData);
    console.log(\`Theme "\${themeName}" loaded successfully.\`);
  } catch (error) {
    console.error(\`Failed to load theme "\${themeName}":\`, error);
  }
};

// Register default themes
registerTheme("gruvbox-dark", () => import("./themes/gruvbox-dark.js"));
registerTheme("gruvbox-light", () => import("./themes/gruvbox-light.js"));
registerTheme("nbs", () => import("./themes/nbs.js"));

// Public API
export default {
  // Core functions
  parseColor,
  generateShades,
  generateThemeVariables,
  injectThemeCSS,

  // Theme management
  registerTheme,
  loadTheme,
  applyTheme,
  availableThemes,

  // Resource loading
  loadCSS,
  loadFont,
  getComponentCSS,

  // Utility functions
  rgbToHSL,
  hslToCSS,
  adjustLightness,
  mixWithColor,
};

export {
  parseColor,
  generateShades,
  generateThemeVariables,
  injectThemeCSS,
  registerTheme,
  loadTheme,
  applyTheme,
  availableThemes,
  loadCSS,
  loadFont,
  getComponentCSS,
  rgbToHSL,
  hslToCSS,
  adjustLightness,
  mixWithColor,
};
`,mimeType:"text/javascript"},"/$app/tailwind/index.js":{content:"export default {}"},"/$app/uix/app.js":{content:`import Theme from "/$app/theme/index.js";
import { html } from "/npm/lit-html";
import $APP from "/$app.js";
import UIX from "./index.js";

$APP.routes.set({ "/showcase": () => html\`<uix-showcase></uix-showcase>\` });
Theme.loadCSS("/$app/uix/theme.css", true);

$APP.addModule(UIX);
`,mimeType:"text/javascript"},"/$app/icon-lucide/app.js":{content:`import $APP from "/$app.js";

$APP.addModule({ name: "icon-lucide", icon: true });
`,mimeType:"text/javascript"},"/controllers/index.js":{content:`import $APP from "/$app.js";
import { html } from "/npm/lit-html";

const routes = {
  "/": {
    name: "discover",
    component: () => html\`<view-discover-view></view-discover-view>\`,
    title: "Discover - MEETUP.RIO",
    template: "template-app",
  },
  "/discover": {
    name: "discover-alias",
    component: () => html\`<view-discover-view></view-discover-view>\`,
    title: "Discover - MEETUP.RIO",
    routes: {
      "/:category": {
        name: "discover-category",
        component: ({ category }) =>
          html\`<view-discover-view .initialCategory=\${category}></view-discover-view>\`,
        title: "Discover - MEETUP.RIO",
      },
    },
    template: "template-app",
  },
  // TODO: MEETUPS HIDDEN - Restore when feature returns
  // "/meetups": {
  //   name: "meetups",
  //   component: () => html\`<view-meetups-view></view-meetups-view>\`,
  //   title: "My Meetups - MEETUP.RIO",
  //   template: "template-app",
  // },
  "/events": {
    name: "events",
    component: () => html\`<view-events-view></view-events-view>\`,
    title: "Events - MEETUP.RIO",
    template: "template-app",
  },
  "/guides": {
    name: "guides",
    component: () =>
      html\`<view-guides-view .data-query=\${{ model: "guides", key: "guides" }}></view-guides-view>\`,
    title: "Guides - MEETUP.RIO",
    template: "template-app",
  },
  "/guide/:slug": {
    name: "guide-detail",
    component: ({ slug }) =>
      html\`<view-guide-detail-view .data-query=\${{ model: "guides", where: { slug }, key: "guide", single: true }}></view-guide-detail-view>\`,
    title: "Guide - MEETUP.RIO",
    template: "template-detail",
    pageTitle: "GUIDE",
  },
  "/groups": {
    name: "groups",
    component: () =>
      html\`<view-groups-view  .data-query=\${{ model: "groups", key: "groups" }}></view-groups-view>\`,
    title: "Groups - MEETUP.RIO",
    template: "template-app",
  },
  "/profile": {
    name: "profile",
    component: () => html\`<view-profile-view></view-profile-view>\`,
    title: "My Profile - MEETUP.RIO",
    template: "template-app",
  },
  "/place/:slug": {
    name: "place-detail",
    component: ({ slug }) =>
      html\`<view-place-detail-view .data-query=\${{ model: "places", where: { slug }, key: "place", single: true }}></view-place-detail-view>\`,
    title: "Place - MEETUP.RIO",
    template: "template-detail",
    pageTitle: "PLACE DETAILS",
  },
  "/event/:slug": {
    name: "event-detail",
    component: ({ slug }) =>
      html\`<view-event-detail-view .data-query=\${{ model: "events", where: { slug }, key: "event", single: true }}></view-event-detail-view>\`,
    title: "Event - MEETUP.RIO",
    template: "template-detail",
    pageTitle: "EVENT DETAILS",
  },
  "/meetup/:slug": {
    name: "meetup-detail",
    component: ({ slug }) =>
      html\`<view-meetup-detail-view .data-query=\${{ model: "meetups", where: { slug }, key: "meetup", single: true }}></view-meetup-detail-view>\`,
    title: "Meetup - MEETUP.RIO",
    template: "template-detail",
    pageTitle: "MEETUP DETAILS",
  },
  "/group/:slug": {
    name: "group-detail",
    component: ({ slug }) =>
      html\`<view-group-detail-view .data-query=\${{ model: "groups", where: { slug }, key: "group", single: true }}></view-group-detail-view>\`,
    title: "Group - MEETUP.RIO",
    template: "template-detail",
    pageTitle: "GROUP DETAILS",
  },
  "/calendar": {
    name: "calendar",
    component: () => html\`<view-calendar-view></view-calendar-view>\`,
    title: "Calendar - MEETUP.RIO",
    template: "template-app",
  },
  "/auth/callback": {
    name: "auth-callback",
    component: () => html\`<view-auth-callback></view-auth-callback>\`,
    title: "Authenticating... - MEETUP.RIO",
  },
};

$APP.routes.set(routes);
`,mimeType:"text/javascript"},"/$app/maps/app.js":{content:`/**
 * @bootstrapp/maps - App Module
 * Register maps components
 */

import $APP from "/$app.js";
import mapsSearchComponent from "./search.js";

// Register as module
$APP.addModule({
  name: "maps",
  path: "/$app/maps",
});

// Define the maps-search component
$APP.define("maps-search", mapsSearchComponent);
`,mimeType:"text/javascript"},"/$app/auth/frontend.js":{content:`/**
 * @file Frontend Auth Module
 * @description Handles user authentication state, session persistence, and cross-tab sync
 */

/**
 * AuthSession - Manages auth token persistence in localStorage
 */
export class AuthSession {
  static STORAGE_KEY = "bootstrapp_auth";
  static TOKEN_KEY = "bootstrapp_token";

  /**
   * Get stored auth session
   * @returns {{ token: string, user: object, timestamp: number } | null}
   */
  static get() {
    try {
      const data = localStorage.getItem(AuthSession.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error("AuthSession: Failed to parse stored session", e);
      return null;
    }
  }

  /**
   * Store auth session
   * @param {string} token - Auth token
   * @param {object} user - User object
   * @param {object} [$APP] - App instance for cross-tab sync
   */
  static set(token, user, $APP = null) {
    const data = { token, user, timestamp: Date.now() };
    localStorage.setItem(AuthSession.STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(AuthSession.TOKEN_KEY, token);

    // Broadcast to other tabs via Service Worker
    if ($APP?.SW) {
      $APP.SW.postMessage({
        type: "SW:BROADCAST_AUTH_STATE",
        payload: { token, user, action: "login" },
      });
    }
  }

  /**
   * Clear stored auth session
   * @param {object} [$APP] - App instance for cross-tab sync
   */
  static clear($APP = null) {
    localStorage.removeItem(AuthSession.STORAGE_KEY);
    localStorage.removeItem(AuthSession.TOKEN_KEY);

    if ($APP?.SW) {
      $APP.SW.postMessage({
        type: "SW:BROADCAST_AUTH_STATE",
        payload: { action: "logout" },
      });
    }
  }

  /**
   * Get stored token
   * @returns {string | null}
   */
  static getToken() {
    return localStorage.getItem(AuthSession.TOKEN_KEY);
  }

  /**
   * Check if stored token is valid (not expired)
   * @returns {boolean}
   */
  static isValid() {
    const data = AuthSession.get();
    if (!data || !data.token) return false;

    // Tokens are JWTs - check expiration
    try {
      const payload = JSON.parse(atob(data.token.split(".")[1]));
      return payload.exp * 1000 > Date.now();
    } catch (e) {
      return false;
    }
  }

  /**
   * Get token expiration time in ms
   * @returns {number | null}
   */
  static getExpiration() {
    const data = AuthSession.get();
    if (!data || !data.token) return null;

    try {
      const payload = JSON.parse(atob(data.token.split(".")[1]));
      return payload.exp * 1000;
    } catch (e) {
      return null;
    }
  }
}

/**
 * Create Auth module instance
 * @param {object} $APP - App instance with Backend, SW, events, Database
 * @returns {object} Auth module
 */
export function createAuth($APP) {
  const Auth = {
    // State
    user: null,
    token: null,
    _refreshTimer: null,
    _$APP: $APP,

    /**
     * Check if user is authenticated
     */
    get isAuthenticated() {
      return !!this.token && !!this.user;
    },

    /**
     * Check if user is a guest (not authenticated)
     */
    get isGuest() {
      return !this.isAuthenticated;
    },

    // ============================================================
    // Guest ID Management
    // ============================================================

    /**
     * Storage key for guest ID
     * @private
     */
    _GUEST_ID_KEY: "bootstrapp_guest_id",

    /**
     * Get or create a persistent guest ID
     * Used to track guest interactions before registration
     * @returns {string} Guest ID in format "guest_{timestamp}_{random}"
     */
    getGuestId() {
      let guestId = localStorage.getItem(this._GUEST_ID_KEY);
      if (!guestId) {
        guestId = \`guest_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
        localStorage.setItem(this._GUEST_ID_KEY, guestId);
      }
      return guestId;
    },

    /**
     * Clear the stored guest ID (called after successful registration)
     */
    clearGuestId() {
      localStorage.removeItem(this._GUEST_ID_KEY);
    },

    /**
     * Get the current user ID - either authenticated user ID or guest ID
     * This is the primary way to get a user identifier for data operations
     * @returns {string} User ID or guest ID
     */
    get currentUserId() {
      return this.isAuthenticated ? this.user.id : this.getGuestId();
    },

    /**
     * Check if a given user ID is a guest ID
     * @param {string} userId - User ID to check
     * @returns {boolean} True if the ID is a guest ID
     */
    isGuestId(userId) {
      return typeof userId === "string" && userId.startsWith("guest_");
    },

    /**
     * Login with email and password
     * @param {string} email
     * @param {string} password
     * @returns {Promise<{ success: boolean, user?: object, error?: string }>}
     */
    async login(email, password) {
      try {
        const result = await $APP.Backend.request("AUTH:LOGIN", {
          email,
          password,
        });

        if (result.error) {
          return { success: false, error: result.error };
        }

        if (result.token && result.user) {
          this.token = result.token;
          this.user = result.user;
          AuthSession.set(result.token, result.user, $APP);
          this._startRefreshTimer();

          // Notify the database adapter of user login (triggers sync)
          if ($APP.Database?.handleUserLogin) {
            await $APP.Database.handleUserLogin(result.user.id);
          }

          $APP.events.emit("AUTH:LOGGED_IN", { user: result.user });
          return { success: true, user: result.user };
        }

        return { success: false, error: "Invalid response from server" };
      } catch (error) {
        console.error("Auth.login error:", error);
        return { success: false, error: error.message };
      }
    },

    /**
     * Register a new user
     * @param {object} data - { email, password, passwordConfirm?, name, ...extraData }
     * @returns {Promise<{ success: boolean, user?: object, error?: string }>}
     */
    async register(data) {
      try {
        const result = await $APP.Backend.request("AUTH:REGISTER", data);

        if (result.error) {
          return { success: false, error: result.error, data: result.data };
        }

        if (result.token && result.user) {
          this.token = result.token;
          this.user = result.user;
          AuthSession.set(result.token, result.user, $APP);
          this._startRefreshTimer();
          $APP.events.emit("AUTH:REGISTERED", { user: result.user });
          return { success: true, user: result.user };
        }

        return { success: false, error: "Invalid response from server" };
      } catch (error) {
        console.error("Auth.register error:", error);
        return { success: false, error: error.message };
      }
    },

    /**
     * Start OAuth login flow
     * @param {string} provider - 'google' or 'apple'
     * @returns {Promise<{ success: boolean, error?: string }>}
     */
    async loginWithOAuth(provider) {
      try {
        const redirectUrl = \`\${window.location.origin}/auth/callback\`;
        const result = await $APP.Backend.request("AUTH:OAUTH_START", {
          provider,
          redirectUrl,
        });

        if (result.error) {
          return { success: false, error: result.error };
        }

        if (result.authUrl && result.codeVerifier) {
          // Store OAuth state for callback
          sessionStorage.setItem("oauth_code_verifier", result.codeVerifier);
          sessionStorage.setItem("oauth_provider", provider);
          sessionStorage.setItem("oauth_redirect", window.location.href);
          sessionStorage.setItem("oauth_state", result.state || "");

          // Redirect to OAuth provider
          window.location.href = result.authUrl;
          return { success: true, redirecting: true };
        }

        return { success: false, error: "Invalid OAuth response" };
      } catch (error) {
        console.error("Auth.loginWithOAuth error:", error);
        return { success: false, error: error.message };
      }
    },

    /**
     * Complete OAuth login after redirect
     * @param {string} code - Authorization code from OAuth provider
     * @param {string} state - State parameter for validation
     * @returns {Promise<{ success: boolean, user?: object, error?: string }>}
     */
    async completeOAuth(code, state) {
      try {
        const codeVerifier = sessionStorage.getItem("oauth_code_verifier");
        const provider = sessionStorage.getItem("oauth_provider");
        const storedState = sessionStorage.getItem("oauth_state");
        const redirectUrl = \`\${window.location.origin}/auth/callback\`;

        // Clear OAuth session storage
        sessionStorage.removeItem("oauth_code_verifier");
        sessionStorage.removeItem("oauth_provider");
        sessionStorage.removeItem("oauth_state");

        if (!codeVerifier || !provider) {
          return { success: false, error: "OAuth session expired" };
        }

        // Validate state if provided
        if (storedState && state && storedState !== state) {
          return { success: false, error: "OAuth state mismatch" };
        }

        const result = await $APP.Backend.request("AUTH:OAUTH_COMPLETE", {
          provider,
          code,
          codeVerifier,
          redirectUrl,
        });

        if (result.error) {
          return { success: false, error: result.error };
        }

        if (result.token && result.user) {
          this.token = result.token;
          this.user = result.user;
          AuthSession.set(result.token, result.user, $APP);
          this._startRefreshTimer();
          $APP.events.emit("AUTH:OAUTH_SUCCESS", {
            user: result.user,
            provider,
          });

          // Redirect back to original page
          const returnUrl = sessionStorage.getItem("oauth_redirect") || "/";
          sessionStorage.removeItem("oauth_redirect");

          // Small delay to let events process
          setTimeout(() => {
            window.location.href = returnUrl;
          }, 100);

          return { success: true, user: result.user };
        }

        return { success: false, error: "Invalid OAuth response" };
      } catch (error) {
        console.error("Auth.completeOAuth error:", error);
        return { success: false, error: error.message };
      }
    },

    /**
     * Logout current user
     */
    async logout() {
      try {
        await $APP.Backend.request("AUTH:LOGOUT");
      } catch (error) {
        console.warn("Auth.logout backend error (continuing):", error);
      }

      this.token = null;
      this.user = null;
      this._stopRefreshTimer();
      AuthSession.clear($APP);

      // Notify the database adapter to switch to guest mode
      if ($APP.Database?.handleUserLogout) {
        $APP.Database.handleUserLogout(this.getGuestId());
      }

      $APP.events.emit("AUTH:LOGGED_OUT");
    },

    /**
     * Refresh the auth token
     * @returns {Promise<boolean>}
     */
    async refreshToken() {
      if (!this.token) return false;

      try {
        const result = await $APP.Backend.request("AUTH:REFRESH_TOKEN", {
          token: this.token,
        });

        if (result.token && result.user) {
          this.token = result.token;
          this.user = result.user;
          AuthSession.set(result.token, result.user, $APP);
          return true;
        }

        return false;
      } catch (error) {
        console.error("Auth.refreshToken error:", error);
        // Token refresh failed - log out
        await this.logout();
        return false;
      }
    },

    /**
     * Restore auth session from localStorage
     * @returns {Promise<boolean>}
     */
    async restore() {
      const session = AuthSession.get();

      if (!session || !session.token) {
        this.user = null;
        this.token = null;
        return false;
      }

      // Check if token is still valid
      if (!AuthSession.isValid()) {
        // Token expired - try to refresh
        this.token = session.token;
        const refreshed = await this.refreshToken();
        if (!refreshed) {
          AuthSession.clear($APP);
          return false;
        }
      } else {
        // Valid token - restore session
        this.token = session.token;
        this.user = session.user;
        this._startRefreshTimer();
      }

      $APP.events.emit("AUTH:RESTORED", { user: this.user });
      return true;
    },

    /**
     * Update current user profile
     * @param {object} data - Fields to update
     * @returns {Promise<{ success: boolean, user?: object, error?: string }>}
     */
    async updateUser(data) {
      if (!this.isAuthenticated) {
        return { success: false, error: "Not authenticated" };
      }

      try {
        const result = await $APP.Backend.request("AUTH:UPDATE_USER", data);

        if (result.error) {
          return { success: false, error: result.error };
        }

        if (result.user) {
          this.user = result.user;
          AuthSession.set(this.token, result.user, $APP);
          $APP.events.emit("AUTH:USER_UPDATED", { user: result.user });
          return { success: true, user: result.user };
        }

        return { success: false, error: "Invalid response" };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    /**
     * Convert guest to registered user
     * Emits AUTH:GUEST_CONVERTED event for app-layer migration handling
     * @param {object} guestData - Guest's current data/preferences
     * @param {object} registrationData - Registration data (email, password, name)
     * @returns {Promise<{ success: boolean, user?: object, error?: string }>}
     */
    async convertGuest(guestData, registrationData) {
      const guestId = this.getGuestId();

      // Merge guest preferences with registration data
      const mergedData = {
        ...registrationData,
        ...guestData,
      };

      // Register the new user
      const result = await this.register(mergedData);

      if (result.success) {
        // Emit event for app-layer to handle migration
        // Apps can listen for this and call their own migration logic
        $APP.events.emit("AUTH:GUEST_CONVERTED", {
          guestId,
          newUserId: result.user.id,
          user: result.user,
        });

        // Clear the guest ID after successful registration
        this.clearGuestId();
      }

      return result;
    },

    /**
     * Start token refresh timer
     * @private
     */
    _startRefreshTimer() {
      this._stopRefreshTimer();

      const checkAndRefresh = async () => {
        const expiration = AuthSession.getExpiration();
        if (!expiration) return;

        const timeUntilExpiry = expiration - Date.now();

        // Refresh if less than 15 minutes remaining
        if (timeUntilExpiry < 15 * 60 * 1000) {
          await this.refreshToken();
        }
      };

      // Check every 10 minutes
      this._refreshTimer = setInterval(checkAndRefresh, 10 * 60 * 1000);

      // Also check immediately
      checkAndRefresh();
    },

    /**
     * Stop token refresh timer
     * @private
     */
    _stopRefreshTimer() {
      if (this._refreshTimer) {
        clearInterval(this._refreshTimer);
        this._refreshTimer = null;
      }
    },
  };

  return Auth;
}

/**
 * Initialize Auth module on frontend
 * @param {object} $APP - App instance
 * @returns {object} Auth module
 */
export function initAuthFrontend($APP) {
  const Auth = createAuth($APP);

  // Register Auth module
  $APP.addModule({ name: "Auth", base: Auth });

  // Listen for cross-tab auth state changes
  $APP.swEvents?.set("SW:AUTH_STATE_UPDATE", ({ payload }) => {
    const { action, token, user } = payload;

    if (action === "logout") {
      Auth.token = null;
      Auth.user = null;
      Auth._stopRefreshTimer();
      $APP.events.emit("AUTH:LOGGED_OUT");
    } else if (action === "login" && token && user) {
      Auth.token = token;
      Auth.user = user;
      Auth._startRefreshTimer();
      $APP.events.emit("AUTH:LOGGED_IN", { user });
    }
  });

  return Auth;
}

export default { AuthSession, createAuth, initAuthFrontend };
`,mimeType:"text/javascript"},"/$app/cms/plugin.js":{content:`/**
 * @bootstrapp/cms - Admin Plugin
 * Registers CMS features with the admin plugin system
 */

import { registerPlugin } from "/$app/admin/plugins.js";
import $APP from "/$app.js";
import { html } from "/npm/lit-html";

$APP.addModule({ name: "cms", path: "/$app/cms/views" });
registerPlugin("cms", {
  /**
   * Custom field type renderers
   * These are used by the form generator to render CMS-specific fields
   */
  fieldTypes: {
    richText: (field, value, onChange) => html\`
      <cms-rich-text
        .value=\${value || ""}
        .field=\${field}
        @change=\${(e) => onChange(e.detail)}
      ></cms-rich-text>
    \`,

    media: (field, value, onChange) => html\`
      <cms-media-picker
        .value=\${value || ""}
        .field=\${field}
        @change=\${(e) => onChange(e.detail)}
      ></cms-media-picker>
    \`,

    seo: (field, value, onChange) => html\`
      <cms-seo-fields
        .value=\${value || {}}
        .field=\${field}
        @change=\${(e) => onChange(e.detail)}
      ></cms-seo-fields>
    \`,

    publishStatus: (field, value, onChange) => html\`
      <cms-publishing-bar
        .status=\${value || "draft"}
        @status-change=\${(e) => onChange(e.detail)}
      ></cms-publishing-bar>
    \`,
  },

  /**
   * Sidebar items for admin navigation
   */
  sidebar: [
    {
      label: "Content",
      icon: "file-text",
      href: "/admin/content",
    },
    {
      label: "Media Library",
      icon: "image",
      href: "/admin/media-library",
    },
  ],

  /**
   * Additional routes for CMS features
   */
  routes: {
    "/admin/content": {
      name: "cms-dashboard",
      component: () => html\`<cms-dashboard></cms-dashboard>\`,
      title: "Content Management",
      template: "admin-layout",
    },
    "/admin/content/:model/new": {
      name: "cms-editor-new",
      component: ({ model }) => html\`
        <cms-editor model=\${model}></cms-editor>
      \`,
      title: "New Content",
      template: "admin-layout",
    },
    "/admin/content/:model/:id": {
      name: "cms-editor",
      component: ({ model, id }) => html\`
        <cms-editor model=\${model} contentId=\${id} .data-query=\${{ model, id: Number(id), key: "content" }}></cms-editor>
      \`,
      title: "Edit Content",
      template: "admin-layout",
    },
    "/admin/content/:model": {
      name: "cms-content-list",
      component: ({ model }) => html\`
        <cms-content-list
          model=\${model}
          .data-query=\${{ model, key: "items" }}
        ></cms-content-list>
      \`,
      title: "Content",
      template: "admin-layout",
    },
    "/admin/media-library": {
      name: "cms-media-library",
      component: () => html\`
        <cms-media-library
          .data-query=\${{ model: "cms_media", key: "media" }}
        ></cms-media-library>
      \`,
      title: "Media Library",
      template: "admin-layout",
    },
  },
});

console.error("[CMS] Plugin registered");
console.log($APP.routes);
`,mimeType:"text/javascript"},"/$app/i18n/base.js":{content:`/**
 * Core i18n Engine
 * Provides translation management with lazy loading support
 */

export class I18n {
  constructor() {
    this.translations = {}; // { locale: { key: value } }
    this.currentLocale = "en";
    this.fallbackLocale = "en";
    this.loadedLocales = new Set();
    this.localeLoaders = {}; // { locale: () => Promise<translations> }
  }

  /**
   * Register a locale loader function for lazy loading
   * @param {string} locale - Locale code (e.g., 'en', 'pt')
   * @param {Function} loader - Function that returns Promise<translations>
   */
  registerLocale(locale, loader) {
    this.localeLoaders[locale] = loader;
  }

  /**
   * Add translations for a locale (used by modules to contribute translations)
   * @param {string} locale - Locale code
   * @param {Object} translations - Translation object
   */
  addTranslations(locale, translations) {
    // Skip if translations is empty, null, or undefined
    if (
      !translations ||
      (typeof translations === "object" &&
        Object.keys(translations).length === 0)
    ) {
      return;
    }

    if (!this.translations[locale]) {
      this.translations[locale] = {};
    }
    this.translations[locale] = this.deepMerge(
      this.translations[locale],
      translations,
    );
    this.loadedLocales.add(locale); // Only mark as loaded if we actually added translations
  }

  /**
   * Deep merge two objects
   */
  deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key])
      ) {
        result[key] = this.deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }

  /**
   * Load a locale (lazy loading if loader is registered)
   * @param {string} locale - Locale code
   */
  async loadLocale(locale) {
    // Check if locale has actual translations, not just marked as loaded
    const hasTranslations =
      this.translations[locale] &&
      Object.keys(this.translations[locale]).length > 0;

    if (this.loadedLocales.has(locale) && hasTranslations) {
      return; // Already loaded with actual content
    }

    if (this.localeLoaders[locale]) {
      try {
        const translations = await this.localeLoaders[locale]();
        this.addTranslations(locale, translations.default || translations);
      } catch (error) {
        console.warn(\`Failed to load locale "\${locale}":\`, error);
      }
    }
  }

  /**
   * Set current language
   * @param {string} locale - Locale code
   */
  async setLanguage(locale) {
    await this.loadLocale(locale);
    this.currentLocale = locale;

    // Emit event for reactive updates
    if (typeof $APP !== "undefined" && $APP.events) {
      $APP.events.emit("i18n:language-changed", { locale });
    }

    return locale;
  }

  /**
   * Get current language
   */
  getLanguage() {
    return this.currentLocale;
  }

  /**
   * Get available locales (registered loaders + loaded translations)
   */
  getAvailableLocales() {
    const locales = new Set([
      ...Object.keys(this.localeLoaders),
      ...Object.keys(this.translations),
    ]);
    return Array.from(locales);
  }

  /**
   * Get value from nested object using dot notation
   * @param {Object} obj - Object to search
   * @param {string} path - Dot-separated path (e.g., 'welcome.title')
   */
  getNestedValue(obj, path) {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  }

  /**
   * Get plural category for a number (zero, one, two, few, many, other)
   * @param {number} count - The number to get plural category for
   * @returns {string} - Plural category (zero, one, other, etc.)
   */
  getPluralCategory(count) {
    try {
      const pluralRules = new Intl.PluralRules(this.currentLocale);
      const category = pluralRules.select(count);
      return category;
    } catch (error) {
      // Fallback to simple English rules
      if (count === 0) return "zero";
      if (count === 1) return "one";
      return "other";
    }
  }

  /**
   * Check if an object is a plural form object
   * @param {*} obj - Object to check
   * @returns {boolean}
   */
  isPluralObject(obj) {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
    // Check if it has plural keys like 'one', 'other', 'zero', 'few', 'many'
    const pluralKeys = ["zero", "one", "two", "few", "many", "other"];
    const keys = Object.keys(obj);
    return keys.some((key) => pluralKeys.includes(key));
  }

  /**
   * Select plural form from plural object
   * @param {Object} pluralObj - Object with plural forms
   * @param {number} count - Number to select plural for
   * @returns {string}
   */
  selectPlural(pluralObj, count) {
    const category = this.getPluralCategory(count);

    // Try exact match first
    if (pluralObj[category]) {
      return pluralObj[category];
    }

    // Fallback chain: category -> other -> first available
    return pluralObj.other || pluralObj[Object.keys(pluralObj)[0]] || "";
  }

  /**
   * Format a number according to locale
   * @param {number} number - Number to format
   * @param {Object} options - Intl.NumberFormat options
   * @returns {string}
   */
  formatNumber(number, options = {}) {
    try {
      return new Intl.NumberFormat(this.currentLocale, {
        style: options.style || "decimal",
        minimumFractionDigits: options.minimumFractionDigits,
        maximumFractionDigits: options.maximumFractionDigits,
        currency: options.currency,
        ...options,
      }).format(number);
    } catch (error) {
      console.warn("Number formatting failed:", error);
      return String(number);
    }
  }

  /**
   * Format a date according to locale
   * @param {Date|string|number} date - Date to format
   * @param {Object} options - Intl.DateTimeFormat options
   * @returns {string}
   */
  formatDate(date, options = {}) {
    try {
      return new Intl.DateTimeFormat(this.currentLocale, {
        dateStyle: options.dateStyle || "medium",
        timeStyle: options.timeStyle,
        ...options,
      }).format(new Date(date));
    } catch (error) {
      console.warn("Date formatting failed:", error);
      return String(date);
    }
  }

  /**
   * Format a relative date (today, yesterday, X days ago)
   * @param {Date|string|number} date - Date to format
   * @returns {string}
   */
  formatRelativeDate(date) {
    const now = new Date();
    const target = new Date(date);

    // Reset time to midnight for day comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetDay = new Date(
      target.getFullYear(),
      target.getMonth(),
      target.getDate(),
    );

    const diffTime = targetDay - today;
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    // Handle special cases with translations
    if (diffDays === 0) {
      return this.t("relative.today") || "today";
    } else if (diffDays === -1) {
      return this.t("relative.yesterday") || "yesterday";
    } else if (diffDays === 1) {
      return this.t("relative.tomorrow") || "tomorrow";
    } else if (diffDays < 0) {
      // Use Intl.RelativeTimeFormat if available
      try {
        const rtf = new Intl.RelativeTimeFormat(this.currentLocale, {
          numeric: "auto",
        });
        return rtf.format(diffDays, "day");
      } catch (error) {
        return (
          this.t("relative.daysAgo", { n: Math.abs(diffDays) }) ||
          \`\${Math.abs(diffDays)} days ago\`
        );
      }
    } else {
      try {
        const rtf = new Intl.RelativeTimeFormat(this.currentLocale, {
          numeric: "auto",
        });
        return rtf.format(diffDays, "day");
      } catch (error) {
        return (
          this.t("relative.inDays", { n: diffDays }) || \`in \${diffDays} days\`
        );
      }
    }
  }

  /**
   * Interpolate parameters in translation string
   * @param {string} str - Translation string with {param} placeholders
   * @param {Object} params - Parameters to interpolate
   */
  interpolate(str, params = {}) {
    if (!str || typeof str !== "string") return str;

    return str.replace(/\\{(\\w+)\\}/g, (match, key) => {
      return params[key] !== undefined ? params[key] : match;
    });
  }

  /**
   * Translate a key (with pluralization support)
   * @param {string} key - Translation key (dot-separated)
   * @param {Object} params - Parameters for interpolation (use 'n' or 'count' for plurals)
   * @returns {string}
   */
  t(key, params = {}) {
    if (!key) return "";

    // Try current locale
    let translation = this.getNestedValue(
      this.translations[this.currentLocale],
      key,
    );

    // Fallback to fallback locale
    if (
      translation === undefined &&
      this.currentLocale !== this.fallbackLocale
    ) {
      translation = this.getNestedValue(
        this.translations[this.fallbackLocale],
        key,
      );
    }

    // If still not found, return the key
    if (translation === undefined) {
      console.warn(
        \`Translation not found for key "\${key}" in locale "\${this.currentLocale}"\`,
      );
      return key;
    }

    // Check if translation is a plural object
    if (this.isPluralObject(translation)) {
      const count = params.n !== undefined ? params.n : params.count;
      if (count === undefined) {
        console.warn(
          \`Plural translation "\${key}" requires 'n' or 'count' parameter\`,
        );
        return key;
      }
      translation = this.selectPlural(translation, count);
    }

    // Handle nested objects (return key if not a string)
    if (typeof translation !== "string") {
      console.warn(\`Translation for key "\${key}" is not a string\`);
      return key;
    }

    // Interpolate parameters
    return this.interpolate(translation, params);
  }
}

export default I18n;
`,mimeType:"text/javascript"},"/$app/i18n/view-plugin.js":{content:`/**
 * i18n View Plugin
 * Adds component-level i18n support to View components
 *
 * Features:
 * - Extracts inline i18n from component definitions (serves as English default)
 * - Auto-namespaces translations by component tag name
 * - Injects helper methods: $t(), $n(), $d(), $r()
 * - Auto-updates components when language changes
 */

export default {
  name: "i18n",

  /**
   * Called when component is registered via $APP.define()
   * Extracts inline i18n and registers as English translations
   */
  init: ({ component, definition, tag }) => {
    // Extract inline i18n (this IS the English/default translation)
    if (definition.i18n && typeof definition.i18n === "object") {
      // Register under component tag name namespace
      const translations = { [tag]: definition.i18n };

      // Add to English locale (inline i18n is the source of truth for English)
      if (typeof $APP !== "undefined" && $APP.i18n) {
        $APP.i18n.addTranslations("en", translations);
      }
    }

    // Inject helper methods into component prototype

    /**
     * Translate a key with auto-namespacing
     * @param {string} key - Translation key (auto-prefixed with component name)
     * @param {Object} params - Parameters for interpolation/pluralization
     * @example
     * this.$t('submit')  // \u2192 'my-component.submit'
     * this.$t('count', { n: 5 })  // \u2192 Pluralized translation
     */
    component.prototype.$t = function (key, params) {
      const componentName = this.tagName.toLowerCase();
      return $APP.i18n.t(\`\${componentName}.\${key}\`, params);
    };

    /**
     * Format a number with current locale
     * @param {number} number - Number to format
     * @param {Object} options - Intl.NumberFormat options
     */
    component.prototype.$n = (number, options) => $APP.i18n.n(number, options);

    /**
     * Format a date with current locale
     * @param {Date|string|number} date - Date to format
     * @param {Object} options - Intl.DateTimeFormat options
     */
    component.prototype.$d = (date, options) => $APP.i18n.d(date, options);

    /**
     * Format a relative date (today, yesterday, X days ago)
     * @param {Date|string|number} date - Date to format
     */
    component.prototype.$r = (date) => $APP.i18n.r(date);
  },

  /**
   * Component lifecycle events
   */
  events: {
    /**
     * Called when component instance connects to DOM
     * Sets up auto-update on language change
     */
    connected: function () {
      // Create handler that triggers re-render on language change
      this._i18nUpdateHandler = () => {
        this.requestUpdate();
      };

      // Listen to language change events
      if (typeof $APP !== "undefined" && $APP.events) {
        $APP.events.on("i18n:language-changed", this._i18nUpdateHandler);
      }
    },

    /**
     * Called when component instance disconnects from DOM
     * Cleans up event listeners
     */
    disconnected: function () {
      // Remove language change listener
      if (
        this._i18nUpdateHandler &&
        typeof $APP !== "undefined" &&
        $APP.events
      ) {
        $APP.events.off("i18n:language-changed", this._i18nUpdateHandler);
        this._i18nUpdateHandler = null;
      }
    },
  },
};
`,mimeType:"text/javascript"},"/$app/uix/index.js":{content:`export default {
  name: "uix",
  path: "/$app",
  root: true,
  i18n: {
    pt: () => import("./locales/pt.js"),
  },
  components: {
    navigation: [
      "accordion",
      "breadcrumbs",
      "menu",
      "navbar",
      "nav-item",
      "pagination",
      "sidebar",
      "tabs",
      "tree",
      "tree-item",
      "wizard",
    ],
    overlay: [
      "alert-dialog",
      "drawer",
      "dropdown",
      "modal",
      "overlay",
      "popover",
      "tooltip",
      "popover-controller",
    ],
    display: [
      "avatar",
      "badge",
      "link",
      "button",
      "calendar",
      "circle",
      "editable",
      "heading",
      "icon",
      "image",
      "link",
      "list",
      "list-item",
      "markdown",
      "media",
      "pattern",
      "stat",
      "table",
      "data-table",
      "tag",
      "text",
    ],
    layout: [
      "card",
      "container",
      "divider",
      "flex",
      "grid",
      "page",
      "panel",
      "section",
      "split-pane",
    ],
    app: ["app-container", "app-header", "bottom-nav", "title-bar"],
    page: [
      "cta-section",
      "faq-section",
      "feature-grid",
      "footer",
      "hero-section",
      "logo-cloud",
      "newsletter-section",
      "pricing-card",
      "pricing-table",
      "stats-section",
      "stat-card",
      "contact-avatar",
      "metric-hero-card",
      "testimonial-card",
      "testimonial-section",
    ],
    feedback: [
      "circular-progress",
      "progress-bar",
      "skeleton",
      "spinner",
      "toast",
    ],
    utility: [
      "device",
      "clipboard",
      "darkmode",
      "draggable",
      "droparea",
      "indexeddb-explorer",
      "seo",
      "theme-toggle",
    ],
    form: [
      "auth-form",
      "checkbox",
      "code",
      "file-upload",
      "form",
      "label",
      "input",
      "form-input",
      "join",
      "number-input",
      "radio",
      "radio-group",
      "rating",
      "select",
      "slider",
      "switch",
      "textarea",
      "time",
    ],
    docs: [
      "showcase",
      "showcase-code-viewer",
      "showcase-property-editor",
      "showcase-sidebar",
      "theme-generator",
    ],
  },
};
`,mimeType:"text/javascript"},"/$app/maps/search.js":{content:`import T from "/$app/types/index.js";
import { html } from "/npm/lit-html";
import { createMapsClient } from "./index.js";

export default {
  tag: "maps-search",
  style: true,

  properties: {
    query: T.string({ defaultValue: "" }),
    results: T.array({ defaultValue: [] }),
    loading: T.boolean({ defaultValue: false }),
    selectedResult: T.object(),
    placeholder: T.string({ defaultValue: "Search for a place..." }),
  },

  async search() {
    if (!this.query.trim()) return;

    this.loading = true;
    try {
      const client = createMapsClient();
      this.results = await client.search(this.query);
    } catch (err) {
      console.error("Maps search error:", err);
      this.results = [];
    }
    this.loading = false;
  },

  selectResult(result) {
    this.selectedResult = result;
    this.emit("place-selected", result);
  },

  handleKeydown(e) {
    if (e.key === "Enter") this.search();
  },

  render() {
    return html\`<div class="maps-search-input">
          <uix-input
            .value=\${this.query}
            @input=\${(e) => (this.query = e.target.value)}
            @keydown=\${this.handleKeydown}
            placeholder=\${this.placeholder}
            icon="search"
          ></uix-input>
          <uix-button @click=\${() => this.search()} ?loading=\${this.loading}>
            <uix-icon name="search" size="18"></uix-icon>
            Search
          </uix-button>
        </div>

        \${
          this.results.length > 0
            ? html\`
              <div class="maps-results">
                \${this.results.map(
                  (r) => html\`
                    <div
                      class="maps-result \${this.selectedResult?.id === r.id ? "selected" : ""}"
                      @click=\${() => this.selectResult(r)}
                    >
                      <uix-icon name="map-pin" size="16" class="maps-result-icon"></uix-icon>
                      <div class="maps-result-content">
                        <strong class="maps-result-name">\${r.name}</strong>
                        <small class="maps-result-address">\${r.address}</small>
                      </div>
                    </div>
                  \`,
                )}
              </div>
            \`
            : ""
        }
    \`;
  },
};
`,mimeType:"text/javascript"},"/$app/admin/plugins.js":{content:`/**
 * @bootstrapp/admin - Plugin System
 * Simple function-based plugin registry for admin extensibility
 */

import $APP from "/$app.js";

// Plugin registry using closures
const plugins = new Map();

/**
 * Register an admin plugin
 * @param {string} name - Unique plugin name
 * @param {Object} config - Plugin configuration
 * @param {Object} config.routes - Plugin routes { path: routeConfig }
 * @param {Object} config.actions - Model-specific actions { modelName: [{ label, icon, handler }] }
 * @param {Object} config.modals - Custom modals { name: { component } }
 * @param {Object} config.fieldTypes - Custom field type renderers
 * @param {Array} config.sidebar - Sidebar navigation items
 */
export const registerPlugin = (name, config) => {
  plugins.set(name, { name, ...config });

  // If plugin has routes, register them immediately
  // This handles late-registered plugins (after admin/index.js has run)
  if (config.routes && $APP.routes) {
    $APP.routes.set(config.routes);
  }
};

/**
 * Get all registered plugins
 * @returns {Array} Array of plugin configs
 */
export const getPlugins = () => [...plugins.values()];

/**
 * Get custom actions for a specific model
 * @param {string} model - Model name
 * @returns {Array} Array of action configs
 */
export const getModelActions = (model) =>
  getPlugins()
    .filter((p) => p.actions?.[model])
    .flatMap((p) => p.actions[model]);

/**
 * Get all custom modals from plugins
 * @returns {Object} Merged modals object
 */
export const getPluginModals = () =>
  getPlugins().reduce((acc, p) => ({ ...acc, ...p.modals }), {});

/**
 * Get all custom field types from plugins
 * @returns {Object} Merged field types object
 */
export const getFieldTypes = () =>
  getPlugins().reduce((acc, p) => ({ ...acc, ...p.fieldTypes }), {});

/**
 * Get all sidebar items from plugins
 * @returns {Array} Array of sidebar item configs
 */
export const getSidebarItems = () =>
  getPlugins()
    .filter((p) => p.sidebar)
    .flatMap((p) => p.sidebar);

/**
 * Get all routes from plugins
 * @returns {Object} Merged routes object
 */
export const getPluginRoutes = () =>
  getPlugins().reduce((acc, p) => ({ ...acc, ...p.routes }), {});
`,mimeType:"text/javascript"},"/$app/maps/index.js":{content:`/**
 * @bootstrapp/maps - Provider-Agnostic Maps Client
 * Prototype implementation with Nominatim (OpenStreetMap)
 */

// Provider implementations
const providers = {
  nominatim: {
    search: async (query) => {
      const res = await fetch(
        \`https://nominatim.openstreetmap.org/search?q=\${encodeURIComponent(query)}&format=json&limit=10&addressdetails=1\`,
        {
          headers: {
            "User-Agent": "Bootstrapp/1.0",
          },
        },
      );
      const data = await res.json();
      return data.map((item) => ({
        id: item.place_id,
        name: item.name || item.display_name.split(",")[0],
        address: item.display_name,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        type: item.type,
        category: item.class,
      }));
    },
  },
};

/**
 * Create a maps client instance
 * @param {string} provider - Provider name (default: 'nominatim')
 * @returns {Object} Maps client with search method
 */
export const createMapsClient = (provider = "nominatim") => {
  const impl = providers[provider];
  if (!impl) throw new Error(\`Unknown maps provider: \${provider}\`);

  return {
    search: (query) => impl.search(query),
    provider,
  };
};

/**
 * Register a custom maps provider
 * @param {string} name - Provider name
 * @param {Object} impl - Provider implementation { search: async (query) => [...] }
 */
export const registerProvider = (name, impl) => {
  providers[name] = impl;
};

export default createMapsClient;
`,mimeType:"text/javascript"},"/$app/uix/theme.css":{content:`html,body{font-family:var(--font-family);background-color:var(--background-color);color:var(--text-color);width:100%;min-height:100%;height:100%;padding:0;margin:0}a{color:inherit;text-decoration:none;cursor:pointer}html{font-size:14px}@media (max-width: 768px){html{font-size:18px}}@media (max-width: 480px){html{font-size:20px}}textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}:root{box-sizing:border-box;text-size-adjust:none;line-height:1.2}*,*:before,*:after{box-sizing:border-box}*{margin:0}body{font-family:var(--font-family)}button,textarea,select{background-color:inherit;border-width:0;color:inherit}img,picture,video,canvas,svg{display:block;max-width:100%}input,button,textarea,select{font:inherit;background:inherit;border:inherit}p,h1,h2,h3,h4,h5,h6{font-family:var(--font-family);overflow-wrap:break-word}dialog::backdrop{background-color:#000c}::-webkit-scrollbar{width:10px;height:10px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#79797966;border-radius:0}::-webkit-scrollbar-thumb:hover{background:#646464b3}::-webkit-scrollbar-thumb:active{background:#555c}::-webkit-scrollbar-corner{background:transparent}*{scrollbar-width:thin;scrollbar-color:rgba(121,121,121,.4) transparent}*:not(:defined){display:block;height:100%;opacity:0;transition:opacity .5s ease-in-out;border:1px solid red}.dark{filter:invert(1) hue-rotate(180deg)}.dark img,.dark dialog,.dark video,.dark iframe{filter:invert(1) hue-rotate(180deg)}[direction=horizontal]{--flex-direction: row;flex-direction:row}[direction=vertical]{--flex-direction: column;flex-direction:row}[cursor-pointer]{cursor:pointer}[w-full]{width:100%}[h-full]{height:100%}[min-h-0]{min-height:0}[min-w-0]{min-width:0}[flex]{display:flex}[flex-col]{flex-direction:column}[flex-1]{flex:1}[flex-grow]{flex-grow:1}[flex-shrink-0]{flex-shrink:0}
`,mimeType:"text/css"},"/$app/theme/dev.js":{content:"export default {}"},"/locales/en.js":{content:`/**
 * English translations for meetup.rio
 */
export default {
  app: {
    title: "MEETUP.RIO",
    tagline: "Discover the best of Rio de Janeiro",
  },
  tabs: {
    discover: "Discover",
    events: "Events",
    guides: "Guides",
    groups: "Groups",
    profile: "Profile",
    // meetups: "Meetups", // Hidden
  },
  categories: {
    all: "All",
    beaches: "Beaches",
    hiking: "Hiking",
    culture: "Culture",
    parties: "Parties",
    food: "Food & Drinks",
    sports: "Sports",
    dancing: "Dancing",
    groups: "Groups",
  },
  guides: {
    title: "Guides",
    article: "Article",
    list: "Curated List",
    featured: "Featured Guides",
    allGuides: "All Guides",
    empty: "No guides available yet",
    placesInGuide: "Places in this Guide",
    writtenBy: "Written by",
    contents: "Contents",
    viewPlace: "View Place",
    viewEvent: "View Event",
  },
  events: {
    title: "Events",
    thisWeek: "This Week",
    upcoming: "Upcoming",
    weekly: "Weekly Events",
    recurring: "Recurring",
    noEvents: "No events scheduled",
  },
  actions: {
    like: "Like",
    skip: "Skip",
    share: "Share",
    unlike: "Unlike",
    join: "Join",
    joined: "Joined",
    beFirst: "Be the first to join!",
    peopleJoined: "{count} joined",
  },
  browse: {
    saved: "SAVED!",
    allCaughtUp: "All Caught Up!",
    noMoreContent: "You've explored everything in this category!",
    viewSaved: "View Saved",
    showSkipped: "Show Skipped Again",
    cardView: "Cards",
    listView: "List",
    noContent: "No content available",
  },
  groups: {
    title: "WhatsApp Groups",
    subtitle: "Join Rio communities and stay connected",
    featured: "Featured Groups",
    allGroups: "All Groups",
    empty: "No groups available yet",
    joinGroup: "Join Group",
  },
  saved: {
    title: "Your Saved Places",
    empty: "No Saved Places Yet",
    emptyDescription:
      "Start browsing and save your favorite places and events!",
    count: {
      zero: "no saved items",
      one: "{n} saved item",
      other: "{n} saved items",
    },
  },
  about: {
    title: "About Rio",
    description:
      "Rio de Janeiro is a vibrant city known for its stunning beaches, lively culture, and iconic landmarks. Whether you're looking for relaxation on the sand, exciting nightlife, delicious food, or breathtaking attractions, Rio has something for everyone!",
    feature1: "Discover famous beaches like Copacabana and Ipanema",
    feature2: "Explore the best nightlife and live music venues",
    feature3: "Find amazing restaurants and local food spots",
    feature4: "Visit iconic attractions and hidden gems",
    sampleDataTitle: "Try It Out!",
    sampleDataDescription:
      "Load sample places and events to explore how the app works.",
    loadSampleData: "Load Sample Data",
    loading: "Loading...",
    dataLoaded: "Sample data loaded successfully!",
    dataLoadError: "Error loading sample data. Please try again.",
  },
  content: {
    date: "Date",
    time: "Time",
    venue: "Venue",
    address: "Address",
  },
  relative: {
    today: "today",
    yesterday: "yesterday",
    tomorrow: "tomorrow",
    daysAgo: "{n} days ago",
    inDays: "in {n} days",
  },
  calendar: {
    title: "Events Calendar",
    listView: "List",
    gridView: "Month",
    today: "Today",
    tomorrow: "Tomorrow",
    thisWeek: "This Week",
    later: "Later",
    noEvents: "No events scheduled",
    eventsToday: "Events Today",
    recurring: "Recurring",
    nextOccurrence: "Next: {date}",
    viewAll: "View All",
  },
  recurrence: {
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    custom: "Custom Days",
    ends: "Ends on {date}",
    never: "Never ends",
    everyMonday: "Every Monday",
    everyFriday: "Every Friday",
    pattern: "Every {pattern}",
  },
  location: {
    allowLocation: "Allow Location",
    skip: "Skip for now",
    whyNeeded: "We use your location to show nearby events",
    nearYou: "Near You",
    requestPermission: "Enable location to see events near you",
    permissionDenied: "Location access denied",
    distance: "Distance",
    getDirections: "Get Directions",
  },
  tags: {
    "pet-friendly": "Pet Friendly",
    "wheelchair-accessible": "Accessible",
    "free-entry": "Free Entry",
    "family-friendly": "Family Friendly",
    "must-see": "Must See",
    chill: "Chill",
    romantic: "Romantic",
    adventure: "Adventure",
    party: "Party",
    "local-favorite": "Local Favorite",
  },
  badges: {
    recommended: "Recommended",
    popular: "Popular",
    featured: "Featured",
  },
  search: {
    placeholder: "Search places, events, guides...",
    noResults: "No results found",
    places: "Places",
    events: "Events",
    guides: "Guides",
    groups: "Groups",
  },
  related: {
    places: "Similar Places",
    events: "You Might Also Like",
    guides: "Related Guides",
    groups: "Similar Communities",
  },
};
`,mimeType:"text/javascript"},"/backend.js":{content:`$APP.databaseConfig = {
  type: "indexeddb",
  url: "http://127.0.0.1:8090",
  adminEmail: "alanmeira@gmail.com",
  adminPassword: "1234567890",
  autoAuth: true,
  syncOnInit: false,
  conflictStrategy: "local-wins",
};

import "/$app/base/backend.js";
`,mimeType:"text/javascript"},"/$app/theme/themes/nbs.js":{content:`/**
 * Neobrutalist (NBS) Theme
 * Bold borders, hard shadows, vibrant colors
 * Playful, interactive design with tactile feedback
 */

const fontFamily = "Manrope";

export default {
  font: {
    family: fontFamily,
    icon: { family: "lucide" },
    // Font weights
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    black: "900",
  },

  link: { color: "var(--text-color)" },
  text: {
    color: "#1a1a1a",
    muted: "#6b7280",
    // Font sizes
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
  },
  background: { color: "#faf5f0" },

  color: {
    // Vibrant, saturated colors
    primary: "#fabd2f",
    "primary-lighter": "#fde8a3",
    "primary-light": "#fcd875",
    "primary-dark": "#d79921",
    "primary-darker": "#b57614",

    secondary: "#ec4899",
    "secondary-lighter": "#fbcfe8",
    "secondary-light": "#f9a8d4",
    "secondary-dark": "#db2777",
    "secondary-darker": "#be185d",

    success: "#22c55e",
    "success-lighter": "#bbf7d0",
    "success-light": "#86efac",
    "success-dark": "#16a34a",
    "success-darker": "#15803d",

    danger: "#ef4444",
    "danger-lighter": "#fecaca",
    "danger-light": "#fca5a5",
    "danger-dark": "#dc2626",
    "danger-darker": "#b91c1c",

    warning: "#f97316",
    "warning-lighter": "#fed7aa",
    "warning-light": "#fdba74",
    "warning-dark": "#ea580c",
    "warning-darker": "#c2410c",

    info: "#3b82f6",
    "info-lighter": "#bfdbfe",
    "info-light": "#93c5fd",
    "info-dark": "#2563eb",
    "info-darker": "#1d4ed8",

    surface: "#ffffff",
    "surface-light": "#faf5f0",
    "surface-lighter": "#ffffff",
    "surface-dark": "#f5f0eb",
    "surface-darker": "#ebe5df",

    hover: "#d79921",
    focus: "#fabd2f",
    inverse: "#1a1a1a",
    "inverse-lighter": "#525252",
    "inverse-light": "#404040",
    "inverse-dark": "#0a0a0a",
    "inverse-darker": "#000000",
  },

  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    "2xl": "2rem",
    "3xl": "3rem",
    "4xl": "5rem",
  },

  // Line heights (generates --leading-tight, --leading-normal, etc.)
  leading: {
    tight: "1.2",
    normal: "1.5",
    relaxed: "1.75",
  },

  // NBS uses larger border radii
  radius: {
    none: "0",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    full: "9999px",
  },

  // Hard offset shadows (NBS signature)
  shadow: {
    none: "none",
    sm: "2px 2px 0px 0px rgba(0,0,0,1)",
    md: "4px 4px 0px 0px rgba(0,0,0,1)",
    lg: "6px 6px 0px 0px rgba(0,0,0,1)",
    xl: "8px 8px 0px 0px rgba(0,0,0,1)",
    "2xl": "12px 12px 0px 0px rgba(0,0,0,1)",
  },

  // NBS-specific component styling (kebab-case keys!)
  button: {
    "border-size": "3px",
    "border-color": "black",
    "border-radius": "0.75rem",
    shadow: "4px 4px 0px 0px rgba(0,0,0,1)",
    "hover-shadow": "2px 2px 0px 0px rgba(0,0,0,1)",
    "active-shadow": "none",
    "hover-translate-x": "-2px",
    "hover-translate-y": "-2px",
    "active-translate-x": "2px",
    "active-translate-y": "2px",
    "font-weight": "900",
    "text-transform": "uppercase",
  },

  input: {
    background: "#ffffff",
    "background-focus": "#ffffff",
    "background-disabled": "#f5f5f5",
    "border-color": "#000000",
    "border-width": "3px",
    "border-radius": "0.75rem",
    "border-focus": "#000000",
    "border-error": "#ef4444",
    text: "#1a1a1a",
    placeholder: "#9ca3af",
    icon: "#6b7280",
    shadow: "4px 4px 0px 0px rgba(0,0,0,1)",
    "focus-shadow": "6px 6px 0px 0px rgba(0,0,0,1)",
  },

  checkbox: {
    "border-width": "3px",
    "border-color": "#000000",
    "border-radius": "0.375rem",
    shadow: "3px 3px 0px 0px rgba(0,0,0,1)",
    "hover-border-color": "#000000",
    "checked-background-color": "#fabd2f",
    "checked-border-color": "#000000",
    "label-font-weight": "600",
  },

  label: {
    "font-size": "1rem",
    "font-weight": "700",
    color: "#1a1a1a",
    "letter-spacing": "0.05em",
    "text-transform": "uppercase",
    margin: "0.5rem",
  },

  tabs: {
    background: "#ffffff",
    "border-color": "#000000",
    "border-width": "3px",
    "border-radius": "0.75rem",
    shadow: "4px 4px 0px 0px rgba(0,0,0,1)",
    "list-background": "#f5f5f5",
    "list-border-color": "#000000",
    tab: {
      padding: "1rem 1.5rem",
      gap: "0.5rem",
      "font-size": "0.875rem",
      "font-weight": "900",
      "text-transform": "uppercase",
      "letter-spacing": "0.05em",
      color: "#6b7280",
      "color-hover": "#1a1a1a",
      "color-active": "#1a1a1a",
      background: "transparent",
      "background-hover": "#e5e5e5",
      "background-active": "#ffffff",
      "border-width": "3px",
      "border-active": "#000000",
    },
  },

  card: {
    background: "#ffffff",
    border: "#000000",
    "border-width": "3px",
    "border-hover": "#000000",
    text: "#1a1a1a",
    "text-muted": "#6b7280",
    header: {
      background: "transparent",
      border: "#000000",
      padding: "0.75rem 1rem",
    },
    footer: {
      background: "transparent",
      border: "#000000",
      "border-style": "solid",
      padding: "0.75rem 1rem",
    },
    icon: {
      background: "#f5f5f5",
      size: "3rem",
      "border-radius": "0.75rem",
    },
    tag: {
      background: "#fabd2f",
      text: "#1a1a1a",
      padding: "0.25rem 0.5rem",
      "border-radius": "0.5rem",
    },
  },

  modal: {
    background: "#ffffff",
    "border-width": "3px",
    "border-color": "#000000",
    "border-radius": "1rem",
    shadow: "8px 8px 0px 0px rgba(0,0,0,1)",
    color: "#1a1a1a",
    overlay: "rgba(0, 0, 0, 0.5)",
    "header-padding": "1.25rem 1.5rem",
    "header-border-width": "3px",
    "header-background": "#ffffff",
    "header-font-size": "1.25rem",
    "header-font-weight": "900",
    "header-color": "#1a1a1a",
    "body-padding": "1.5rem",
    "body-color": "#4b5563",
    "footer-padding": "1rem 1.5rem",
    "footer-border-width": "3px",
    "footer-background": "#f9fafb",
  },

  panel: {
    background: "#ffffff",
    "background-hover": "#f5f5f5",
    border: "#000000",
    "header-background": "transparent",
    "header-text": "#1a1a1a",
    "header-border": "#000000",
  },

  dropdown: {
    background: "#ffffff",
    "background-hover": "#f5f5f5",
    "background-active": "#e5e5e5",
    border: "#000000",
    text: "#1a1a1a",
    "text-muted": "#6b7280",
    separator: "#e5e5e5",
    shadow: "4px 4px 0px 0px rgba(0,0,0,1)",
  },

  badge: {
    default: {
      background: "#f5f5f5",
      text: "#1a1a1a",
      border: "#000000",
    },
    success: {
      background: "#22c55e",
      text: "#ffffff",
      border: "#000000",
    },
    danger: {
      background: "#ef4444",
      text: "#ffffff",
      border: "#000000",
    },
    warning: {
      background: "#f97316",
      text: "#ffffff",
      border: "#000000",
    },
    info: {
      background: "#3b82f6",
      text: "#ffffff",
      border: "#000000",
    },
  },

  list: {
    background: "transparent",
    "background-hover": "#f5f5f5",
    "background-active": "#e5e5e5",
    "background-selected": "#fabd2f",
    border: "#000000",
    "border-hover": "#000000",
    text: "#1a1a1a",
    "text-muted": "#6b7280",
  },

  tree: {
    background: "transparent",
    "background-hover": "#f5f5f5",
    "background-selected": "#fabd2f",
    border: "#000000",
    indent: "1rem",
    icon: "#6b7280",
    "icon-hover": "#1a1a1a",
  },

  table: {
    "border-width": "3px",
    "border-color": "#000000",
    "border-radius": "1rem",
    shadow: "4px 4px 0px 0px rgba(0,0,0,1)",
    "header-background": "#ffffff",
    "header-color": "#1a1a1a",
    "header-font-weight": "900",
    "header-font-size": "0.75rem",
    "header-text-transform": "uppercase",
    "row-background": "#ffffff",
    "row-hover-background": "#fef3c7",
    "cell-padding": "1rem 1.25rem",
    "cell-font-size": "0.875rem",
    "cell-color": "#4b5563",
  },

  pagination: {
    "border-width": "3px",
    "border-color": "#000000",
    "border-radius": "0.75rem",
    background: "#ffffff",
    color: "#1a1a1a",
    "font-weight": "700",
    shadow: "3px 3px 0px 0px rgba(0,0,0,1)",
    "hover-background": "#f5f5f5",
    "hover-border-color": "#000000",
    "hover-shadow": "2px 2px 0px 0px rgba(0,0,0,1)",
    "hover-transform": "translate(-1px, -1px)",
    "active-background": "#fabd2f",
    "active-border-color": "#000000",
    "active-color": "#000000",
    "active-shadow": "3px 3px 0px 0px rgba(0,0,0,1)",
    "nav-font-weight": "900",
  },

  progress: {
    "border-width": "3px",
    "border-color": "#000000",
    "border-radius": "0.75rem",
    background: "#ffffff",
    "fill-background": "var(--color-primary)",
    shadow: "3px 3px 0px 0px rgba(0,0,0,1)",
    height: "1.25rem",
    "height-sm": "0.75rem",
    "height-lg": "1.75rem",
  },

  breadcrumbs: {
    "font-size": "0.875rem",
    "font-weight": "700",
    "current-font-weight": "900",
    "text-transform": "uppercase",
    "letter-spacing": "0.05em",
    "link-color": "#6b7280",
    "link-hover-color": "#1a1a1a",
    "current-color": "#1a1a1a",
    "separator-color": "#9ca3af",
    gap: "0.5rem",
  },

  sidebar: {
    background: "#ffffff",
    "border-width": "3px",
    "border-color": "#000000",
    "border-radius": "0",
    shadow: "none",
    width: "256px",
    "collapsed-width": "80px",
    // Header
    "header-padding": "1rem",
    "header-background": "#ffffff",
    "header-border-width": "3px",
    "header-font-weight": "900",
    // Content
    "content-padding": "0.75rem",
    // Footer
    "footer-padding": "0.75rem",
    "footer-background": "#ffffff",
    "footer-border-width": "3px",
    // Toggle button
    "toggle-background": "transparent",
    "toggle-hover-background": "#f5f5f5",
    "toggle-border-radius": "0.5rem",
    // Nav items
    "item-padding": "0.75rem 1rem",
    "item-border-radius": "0.75rem",
    "item-font-weight": "500",
    "item-color": "#4b5563",
    "item-hover-background": "#f5f5f5",
    "item-hover-color": "#1a1a1a",
    "item-active-background": "#000000",
    "item-active-color": "#ffffff",
    "item-active-font-weight": "600",
  },
};
`,mimeType:"text/javascript"},"/$app/router/ui.js":{content:`import T from "/$app/types/index.js";
import { html } from "/npm/lit-html";
import { keyed } from "/npm/lit-html/directives/keyed.js";
import { html as staticHTML, unsafeStatic } from "/npm/lit-html/static.js";
import Router from "./index.js";

export default {
  tag: "router-ui",
  properties: {
    currentRoute: T.object({
      sync: Router,
    }),
  },
  renderRoute(route, params) {
    const component =
      typeof route.component === "function"
        ? route.component(params)
        : route.component;
    return route.template
      ? staticHTML\`<\${unsafeStatic(route.template)} .component=\${component}>
			</\${unsafeStatic(route.template)}>\`
      : component;
  },

  render() {
    const { route, params } = this.currentRoute || {};
    return route
      ? keyed(
          route.name ?? route.path,
          this.renderRoute(
            typeof route === "function" ? { component: route } : route,
            params,
          ),
        )
      : html\`404: Page not found\`;
  },
};
`,mimeType:"text/javascript"},"/$app/base/backend.js":{content:`import config from "/$app/base/config.js";
import createEventHandler from "/$app/events/index.js";
import { initSWBackend } from "/$app/sw/backend.js";
import $APP from "/$app.js";

$APP.addModule({ name: "events", base: createEventHandler({}) });
initSWBackend($APP, config);
import "/$app/base/backend/workers/database.js";
`,mimeType:"text/javascript"},"/$app/base/config.js":{content:`/**
 * Bootstrapp Framework Configuration
 *
 * Central configuration for framework constants and settings
 * @module config
 */

/**
 * Service Worker configuration
 */
export const serviceWorker = {
  /** Timeout in milliseconds for Service Worker initialization */
  initTimeout: 200,
  /** Maximum number of retries for Service Worker registration */
  maxRetries: 5,
};

/**
 * Cache configuration for Service Worker file caching
 */
export const cache = {
  /** Cache name for local files */
  localFiles: "local-files-v1",
  /** Cache name for staging files */
  stagingFiles: "staging-files-v1",
};

/**
 * Backend communication configuration
 */
export const backend = {
  /** Default timeout in milliseconds for client requests to backend */
  requestTimeout: 5000,
};

/**
 * Test configuration
 */
export const test = {
  /** Default test server host */
  host: "test.localhost",
  /** Default test server port */
  port: 1313,
  /** Get full test URL */
  getUrl(path = '/test.html') {
    return \`http://\${this.host}:\${this.port}\${path}\`;
  }
};

/**
 * Development server configuration
 */
export const devServer = {
  /**
   * Calculate WebSocket port for dev server hot reload
   * @param {number} currentPort - Current application port
   * @returns {number} WebSocket port
   */
  getWsPort(currentPort) {
    return Number.parseInt(currentPort, 10) + 1;
  }
};

/**
 * Default configuration object
 */
export default {
  serviceWorker,
  cache,
  backend,
  test,
  devServer,
};
`,mimeType:"text/javascript"},"/$app/events/index.js":{content:`/**
 * @bootstrapp/events
 * Lightweight event system with pub/sub pattern
 */

/**
 * Creates an event handler with on, off, emit, set, get
 * @param {Object} target - The target object to install event methods on (optional)
 * @param {Object} options - Configuration options
 * @param {boolean} options.getter - Whether to include the 'get' method (default: true)
 * @returns {Object} Event handler instance
 */
function createEventHandler(target = {}, { getter = true } = {}) {
  const listeners = new Map();

  target.listeners = listeners;
  target.hasListeners = (key) => listeners.has(key);

  /**
   * Registers an event listener.
   * @param {string} key - The event key.
   * @param {Function} callback - The listener function (can be async).
   */
  target.on = (key, callback) => {
    if (!callback)
      return console.error(
        \`Error adding listener to \${key}: no callback passed\`,
      );
    if (!listeners.has(key)) listeners.set(key, new Set());
    listeners.get(key).add(callback);
  };

  /**
   * Registers multiple event listeners from an object.
   * @param {Object<string, Function>} events - Key-value pairs of events and callbacks.
   */
  target.set = (events) =>
    Object.entries(events).forEach(([key, callback]) =>
      target.on(key, callback),
    );

  /**
   * Gets all registered callbacks for a specific key.
   * @param {string} key - The event key.
   * @returns {Function[]} An array of callback functions.
   */
  if (getter) target.get = (key) => [...(listeners.get(key) ?? [])];

  /**
   * Unregisters an event listener.
   * @param {string} key - The event key.
   * @param {Function} callback - The listener function to remove.
   */
  target.off = (key, callback) => {
    const callbackSet = listeners.get(key);
    if (!callbackSet) return;
    callbackSet.delete(callback);
    if (callbackSet.size === 0) listeners.delete(key);
  };

  /**
   * Executes all listeners for a key and returns a Promise
   * that resolves when all listeners (sync or async) have completed.
   * @param {string} key - The event key.
   * @param {*} data - The data to pass to the listeners.
   * @returns {Promise<Array<*>>} A promise resolving to an array of results from the listeners.
   */
  target.emit = async (key, data) => {
    const results = [];
    listeners.get(key)?.forEach((callback) => {
      try {
        results.push(callback(data));
      } catch (error) {
        console.error(\`Error in listener for key "\${key}":\`, error);
      }
    });
    return Promise.all(results);
  };

  return target;
}

export default createEventHandler;
`,mimeType:"text/javascript"},"/$app/sw/backend.js":{content:`/**
 * @file Service Worker Backend Module
 * @description Service Worker backend with caching, fetch handling, and messaging
 */

import createFSHandlers from "./filesystem.js";

let $APP;
let config;

/**
 * Get MIME type for a file path
 * @param {string} path - File path
 * @returns {string} MIME type
 */
const getMimeType = (path) => {
  const ext = path.split(".").pop()?.toLowerCase();
  const mimeTypes = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    mjs: "application/javascript",
    json: "application/json",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    svg: "image/svg+xml",
    ico: "image/x-icon",
    webp: "image/webp",
    woff: "font/woff",
    woff2: "font/woff2",
    ttf: "font/ttf",
    eot: "application/vnd.ms-fontobject",
    otf: "font/otf",
    mp3: "audio/mpeg",
    mp4: "video/mp4",
    webm: "video/webm",
    pdf: "application/pdf",
    txt: "text/plain",
    md: "text/markdown",
    xml: "application/xml",
    wasm: "application/wasm",
  };
  return mimeTypes[ext] || "application/octet-stream";
};

/**
 * Get local URL for a path
 * @param {string} path - File path
 * @returns {string} Full URL
 */
const getLocalUrl = (path) => {
  const origin = self.location.origin;
  const normalizedPath = path.startsWith("/") ? path : \`/\${path}\`;
  return \`\${origin}\${normalizedPath}\`;
};

/**
 * Initialize Service Worker backend
 * @param {Object} app - $APP instance
 * @param {Object} appConfig - App configuration
 */
export function initSWBackend(app, appConfig = {}) {
  $APP = app;
  config = appConfig;

  // Only run in service worker runtime
  if ($APP.settings?.runtime !== "serviceworker") {
    return;
  }

  const LOCAL_FILES_CACHE_NAME = config.cache?.localFiles || "local-files-v1";
  const STAGING_CACHE_NAME = config.cache?.stagingFiles || "staging-files-v1";
  const CDN_CACHE_NAME = "cdn-assets-v1";
  const FILE_STORE_CACHE_NAME = "file-store-v1";

  const ALLOWED_HOSTNAMES = [
    "esm.sh",
    "cdn.jsdelivr.net",
    "unpkg.com",
    "cdnjs.cloudflare.com",
  ];

  // Build-time caching state (opt-in, disabled by default)
  let localCachingEnabled = false;

  // File system cache helpers
  const fsCache = {
    open: async (type) => {
      const cacheNames = {
        local: LOCAL_FILES_CACHE_NAME,
        staging: STAGING_CACHE_NAME,
        cdn: CDN_CACHE_NAME,
        fileStore: FILE_STORE_CACHE_NAME,
      };
      return caches.open(cacheNames[type] || type);
    },
    getKeysInDirectory: async (cache, dirPath) => {
      const keys = await cache.keys();
      return keys.filter((req) => {
        const url = new URL(req.url);
        return url.pathname.startsWith(dirPath);
      });
    },
  };

  // Create filesystem event handlers
  const FSHandlers = createFSHandlers({ getMimeType, fsCache, getLocalUrl });

  // Service Worker install event
  self.addEventListener("install", (event) => {
    console.log("Service Worker: Installing...");
    event.waitUntil(
      Promise.all([
        caches.open(LOCAL_FILES_CACHE_NAME),
        caches.open(STAGING_CACHE_NAME),
        caches.open(CDN_CACHE_NAME),
        caches.open(FILE_STORE_CACHE_NAME),
      ]).then(() => {
        console.log("Service Worker: Caches initialized");
        // In dev mode, skip waiting automatically for faster iteration
        return self.skipWaiting();
      }),
    );
  });

  // Service Worker activate event
  self.addEventListener("activate", (event) => {
    console.log("Service Worker: Activating...");
    event.waitUntil(self.clients.claim());
  });

  // Message handler
  const respond = (client) => (payload, type) => {
    client.postMessage({ payload, type });
  };

  const messageHandlers = {
    SKIP_WAITING: async () => {
      console.log("Service Worker: Skip waiting requested");
      self.skipWaiting();
    },
    "SW:BROADCAST_SYNCED_PROP": async (data, { broadcast }) => {
      broadcast({ type: "SW:SYNC_PROPS", payload: data.payload });
    },
    "SW:BROADCAST_QUERY_SYNC": async (data, { broadcast }) => {
      broadcast({ type: "SW:QUERY_SYNC", payload: data.payload });
    },
    "SW:BROADCAST_AUTH_STATE": async (data, { broadcast }) => {
      broadcast({ type: "SW:AUTH_STATE", payload: data.payload });
    },
    "SW:CACHE_FILE": async (data, { respond }) => {
      try {
        const { url, content } = data.payload;
        const cache = await fsCache.open("fileStore");
        const response = new Response(content, {
          headers: { "Content-Type": getMimeType(url) },
        });
        await cache.put(url, response);
        respond({ success: true });
      } catch (error) {
        respond({ error: error.message });
      }
    },
    "SW:ENABLE_LOCAL_CACHING": async (data, { respond }) => {
      localCachingEnabled = true;
      console.log("Service Worker: Local caching ENABLED for build");
      respond({ success: true, enabled: true });
    },
    "SW:DISABLE_LOCAL_CACHING": async (data, { respond }) => {
      localCachingEnabled = false;
      console.log("Service Worker: Local caching DISABLED");
      respond({ success: true, enabled: false });
    },
    "SW:CLEAR_LOCAL_CACHE": async (data, { respond }) => {
      try {
        const localCache = await fsCache.open("local");
        const keys = await localCache.keys();
        await Promise.all(keys.map((key) => localCache.delete(key)));
        console.log(
          \`Service Worker: Cleared \${keys.length} entries from local cache\`,
        );
        respond({ success: true, clearedCount: keys.length });
      } catch (error) {
        respond({ error: error.message });
      }
    },
    "SW:GET_CACHED_FILES": async (data, { respond }) => {
      try {
        const files = {};

        // Get local files
        const localCache = await fsCache.open("local");
        const localKeys = await localCache.keys();
        for (const req of localKeys) {
          const response = await localCache.match(req);
          if (response) {
            const url = new URL(req.url);
            // Skip paths without file extensions (SPA routes like /admin/models/users)
            const hasExtension =
              url.pathname.includes(".") && !url.pathname.endsWith("/");
            if (!hasExtension) continue;

            const content = await response.clone().text();
            const mimeType =
              response.headers.get("Content-Type")?.split(";")[0] ||
              getMimeType(url.pathname);
            files[url.pathname] = { content, mimeType };
          }
        }

        // Get CDN files (esm.sh) with their esm.sh paths
        const cdnCache = await fsCache.open("cdn");
        const cdnKeys = await cdnCache.keys();
        for (const req of cdnKeys) {
          const response = await cdnCache.match(req);
          if (response) {
            const url = new URL(req.url);
            if (url.hostname === "esm.sh") {
              const esmPath = \`\${url.pathname}\${url.search}\`;
              const content = await response.clone().text();
              const mimeType =
                response.headers.get("Content-Type")?.split(";")[0] ||
                "application/javascript";
              files[esmPath] = { content, mimeType };
            }
          }
        }

        respond(files);
      } catch (error) {
        respond({ error: error.message });
      }
    },
    ...FSHandlers,
  };

  self.addEventListener("message", async (event) => {
    const { data } = event;
    const { type, payload, eventId } = data;
    const client = event.source;

    const broadcastToClients = async (message) => {
      const clients = await self.clients.matchAll({ type: "window" });
      clients.forEach((c) => {
        if (c.id !== client?.id) {
          c.postMessage(message);
        }
      });
    };

    const handler = messageHandlers[type];
    if (handler) {
      await handler(
        { payload, eventId },
        {
          respond: (responsePayload, responseType) => {
            if (client) {
              client.postMessage({
                payload: responsePayload,
                type: responseType || type,
                eventId,
              });
            }
          },
          broadcast: broadcastToClients,
        },
      );
    } else {
      // Emit event for custom handlers
      $APP.events?.emit(type, { payload, eventId, client });
    }
  });

  // Fetch handler
  self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    // Handle /npm/ requests - proxy to esm.sh
    if (
      url.origin === self.location.origin &&
      url.pathname.startsWith("/npm/")
    ) {
      event.respondWith(
        (async () => {
          // Convert /npm/lit-html to https://esm.sh/lit-html
          const packagePath = url.pathname.slice(5); // Remove "/npm/"
          const esmUrl = \`https://esm.sh/\${packagePath}\${url.search}\`;

          // Check CDN cache first
          const cdnCache = await fsCache.open("cdn");
          const cacheKey = new Request(esmUrl);
          const cachedResponse = await cdnCache.match(cacheKey);
          if (cachedResponse) return cachedResponse;

          // Fetch from esm.sh
          try {
            const networkResponse = await fetch(esmUrl);
            if (networkResponse.ok) {
              cdnCache.put(cacheKey, networkResponse.clone());
            }
            return networkResponse;
          } catch (error) {
            console.error("SW: ESM.sh fetch failed:", error);
            return new Response("Network error", { status: 503 });
          }
        })(),
      );
      return;
    }

    // Handle esm.sh internal paths (e.g., /lit-html@3.3.1/..., /v135/...)
    const isEsmPath =
      url.origin === self.location.origin &&
      (url.pathname.match(/^\\/[^/]+@[\\d.]+/) || url.pathname.startsWith("/v1"));

    if (isEsmPath) {
      event.respondWith(
        (async () => {
          const esmUrl = \`https://esm.sh\${url.pathname}\${url.search}\`;
          const cdnCache = await fsCache.open("cdn");
          const cacheKey = new Request(esmUrl);
          const cachedResponse = await cdnCache.match(cacheKey);
          if (cachedResponse) return cachedResponse;

          try {
            const networkResponse = await fetch(esmUrl);
            if (networkResponse.ok) {
              cdnCache.put(cacheKey, networkResponse.clone());
            }
            return networkResponse;
          } catch (error) {
            console.error("SW: ESM.sh internal fetch failed:", error);
            return new Response("Network error", { status: 503 });
          }
        })(),
      );
      return;
    }

    // Handle CDN requests
    if (ALLOWED_HOSTNAMES.includes(url.hostname)) {
      event.respondWith(
        (async () => {
          const cdnCache = await fsCache.open("cdn");
          const cachedResponse = await cdnCache.match(event.request);
          if (cachedResponse) return cachedResponse;

          try {
            const networkResponse = await fetch(event.request);
            if (networkResponse.ok) {
              cdnCache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          } catch (error) {
            console.error("SW: CDN fetch failed:", error);
            return new Response("Network error", { status: 503 });
          }
        })(),
      );
      return;
    }

    // Handle local requests
    if (url.origin === self.location.origin) {
      event.respondWith(
        (async () => {
          // Try staging cache first (edited files from IDE)
          const stagingCache = await fsCache.open("staging");
          const stagingResponse = await stagingCache.match(event.request);
          if (stagingResponse) return stagingResponse;

          // Always fetch from network in dev (don't serve from local cache)
          try {
            const networkResponse = await fetch(event.request);
            // Only cache GET requests when build-time caching is enabled
            if (
              localCachingEnabled &&
              networkResponse.ok &&
              event.request.method === "GET"
            ) {
              const localCache = await fsCache.open("local");
              localCache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          } catch (error) {
            console.error("SW: Local fetch failed:", error);
            return new Response("Not found", { status: 404 });
          }
        })(),
      );
    }
  });

  console.log("Service Worker: Backend initialized");
}

export default { initSWBackend };
`,mimeType:"text/javascript"},"/$app.js":{content:`import createEventHandler from "/$app/events/index.js";

const runtime = (() => {
  if (
    typeof ServiceWorkerGlobalScope !== "undefined" &&
    globalThis instanceof ServiceWorkerGlobalScope
  )
    return "serviceworker";

  if (
    typeof WorkerGlobalScope !== "undefined" &&
    globalThis instanceof WorkerGlobalScope
  )
    return "worker";
  return "frontend";
})();

globalThis.sleep = (ms = 0) =>
  new Promise((resolve) => setTimeout(resolve, ms));
const ObjectStorageFunctions = {
  set: function (...args) {
    if (args.length === 1 && typeof args[0] === "object" && args[0] !== null)
      Object.entries(args[0]).forEach(([k, v]) => {
        this[k] =
          !Array.isArray(this[k]) &&
          typeof this[k] === "object" &&
          typeof v === "object"
            ? { ...this[k], ...v }
            : v;
      });
    if (args.length === 2 && typeof args[0] === "string")
      this[args[0]] = args[1];
    return this;
  },
  get: function (...args) {
    const [key1, key2] = args;
    if (args.length === 0) return undefined;
    if (args.length === 2) return this[key1]?.[key2];
    return this[key1];
  },
  remove: function (...args) {
    args.length === 2 ? delete this[args[0]][args[1]] : delete this[args[0]];
    return this;
  },
  keys: function () {
    return Object.keys(this);
  },
};
const fs = {
  async fetchResource(path, handleResponse, extension) {
    try {
      const response = await fetch(path);
      this[path] = {
        path,
        extension,
      };
      if (response.ok) return await handleResponse(response);
    } catch (error) {
      console.warn(\`Resource not found at: \${path}\`, error);
    }
    return null;
  },
  text(path) {
    return fs.fetchResource(path, (res) => res.text(), "text");
  },
  json(path) {
    return fs.fetchResource(path, (res) => res.json(), "json");
  },
  getFilePath(file) {
    return \`\${$APP.settings.basePath}\${file.startsWith("/") ? file : \`/\${file}\`}\`;
  },
  getRequestPath(urlString) {
    const url = new URL(urlString);
    return url.pathname + url.search;
  },
};

const installModulePrototype = (base) => {
  if (base instanceof Set || base instanceof Map || Array.isArray(base)) return;
  if (!base) base = {};
  const proto = Object.create(Object.getPrototypeOf(base));
  Object.assign(proto, ObjectStorageFunctions);
  Object.setPrototypeOf(base, proto);
  return base;
};

const coreModules = {
  events: createEventHandler({}),
  app: {},
  assetFiles: new Set(),
  components: {},
  data: {},
  devFiles: new Set(),
  error: console.error,
  fs: fs,
  log: console.log,
  models: {},
  modules: {},
  routes: {},
  settings: {
    base: {
      runtime,
      dev: true,
      backend: false,
      frontend: true,
      basePath: "",
    },
    events: ({ context }) => ({
      moduleAdded({ module }) {
        if (module.settings) context[module.name] = module.settings;
      },
    }),
  },
};

if (runtime === "frontend") {
  coreModules.routes = {};
  coreModules.icons = {
    alias: "Icons",
    base: new Map(Object.entries(globalThis.__icons || {})),
  };
  coreModules.theme = {
    base: {
      font: {
        icon: {
          family: "lucide",
        },
      },
    },
    events: ({ context }) => ({
      moduleAdded({ module }) {
        if (module.theme) context[module.name] = module.theme;
      },
    }),
  };
}

const prototypeAPP = {
  async load(production, backend = false) {
    try {
      const response = await fetch("/package.json");
      if (!response.ok)
        throw new Error(\`HTTP error! status: \${response.status}\`);
      const appConfig = await response.json();
      this._packageJson = appConfig;
      await this.bootstrap({ ...appConfig, production, backend });
    } catch (error) {
      console.error("Could not load 'package.json'. Bootstrap failed.", {
        error,
      });
    }
  },
  async bootstrap({
    backend = false,
    production = false,
    settings = {},
    theme,
  } = {}) {
    for (const [key, value] of Object.entries({
      ...settings,
      backend,
      runtime,
      frontend: !backend,
      production,
      dev: !production,
    }))
      this.settings.set(key, value);
    if (!backend && theme) this.theme.set(theme);
    try {
      await import("/index.js");
      if (this.settings.dev) {
        await this.loadModuleSchemas();
        await this.loadModuleData();
      }
      await import(
        backend ? "/$app/base/backend/backend.js" : "/$app/base/frontend.js"
      );
      await this.events.emit("APP:INIT");
    } catch (error) {
      console.warn(error);
    }
    return this;
  },
  async loadModuleSchemas() {
    console.log(this.settings.dev, { runtime });
    if (!this.settings.dev || !this._packageJson) return;

    console.log(this.settings.dev, { runtime });
    const { discoverSchemaModules, namespaceModels } = await import(
      "/$app/model/schema-loader.js"
    );
    const modules = await discoverSchemaModules(this._packageJson);
    console.log({ modules });
    for (const mod of modules) {
      try {
        const schemaPath = \`/node_modules/\${mod.packageName}/models/schema.js\`;
        const schemaModule = await import(schemaPath);
        const models = schemaModule.default;

        if (models) {
          const namespace = mod.namespace ? mod.name : null;
          const namespacedModels = namespaceModels(models, namespace);
          this.models.set(namespacedModels);
          this.log?.(
            \`Loaded schema from \${mod.packageName}\` +
              (namespace ? \` (namespace: \${namespace}_*)\` : ""),
          );
        }
      } catch (e) {
        console.warn(\`Failed to load schema from \${mod.packageName}:\`, e);
      }
    }
  },
  async loadModuleData() {
    if (!this.settings.dev || !this._packageJson) return;

    const { discoverSchemaModules, namespaceData } = await import(
      "/$app/model/schema-loader.js"
    );
    const modules = await discoverSchemaModules(this._packageJson);

    for (const mod of modules) {
      try {
        const seedPath = \`/node_modules/\${mod.packageName}/models/seed.js\`;
        const seedModule = await import(seedPath);
        const data = seedModule.default;

        if (data) {
          const namespace = mod.namespace ? mod.name : null;
          const namespacedData = namespaceData(data, namespace);
          this.data.set(namespacedData);
          this.log?.(
            \`Loaded seed data from \${mod.packageName}\` +
              (namespace ? \` (namespace: \${namespace}_*)\` : ""),
          );
        }
      } catch (e) {
        // seed.js is optional, don't warn if not found
        if (!e.message?.includes("Failed to fetch")) {
          console.warn(\`Failed to load seed from \${mod.packageName}:\`, e);
        }
      }
    }
  },
  addModule(module) {
    if (
      (module.dev && this.settings.dev !== true) ||
      !!this?.modules?.[module.name]
    )
      return;
    if (!module.base) module.base = {};
    const { alias, name, events } = module;
    const base = module.base ?? this[name];
    if (this.modules && !this.modules[name]) this.modules.set(name, module);
    installModulePrototype(base);
    this[name] = base;
    if (alias) this[alias] = base;
    if (events)
      Object.entries(
        typeof events === "function"
          ? events({ $APP: this, context: base })
          : events,
      ).map(([name, fn]) => this.events.on(name, fn));
    this.events
      .get("moduleAdded")
      .map((fn) => fn.bind(this[module.name])({ module }));

    if (this.log) this.log(\`Module '\${module.name}' added successfully\`);
    return base;
  },
};

const $APP = Object.create(prototypeAPP);

for (const [name, base = {}] of Object.entries(coreModules))
  $APP.addModule({
    name,
    ...(base.base ? base : { base }),
  });
globalThis.$APP = $APP;
export default $APP;
`,mimeType:"text/javascript"},"/$app/base/backend/workers/database.js":{content:`import $APP from "/$app.js";

if ($APP.settings.runtime === "worker") {
  const bootstrap = async () => {
    console.log("bootstrap() called");
    const APP = await $APP.load(!$APP.settings.dev, true);
    return APP;
  };

  let commsPort;
  const events = [];
  const MessageHandler = {
    handleMessage: async ({ data }) => {
      if (data.eventId && events.includes(data.eventId)) return;
      if (data.eventId) events.push(data.eventId);
      const respond =
        data.eventId &&
        ((responsePayload) => {
          if (commsPort)
            commsPort.postMessage({
              eventId: data.eventId,
              payload: responsePayload,
              connection: data.connection,
            });
        });
      if ($APP?.Backend) {
        console.log(\`Routing message to backend: \${data.type}\`, data);
        $APP.Backend.handleMessage({
          data,
          respond,
        });
      } else {
        $APP.events.on("APP:DATABASE:STARTED", async () => {
          console.log(
            \`Routing message to backend after APP:DATABASE:STARTED: \${data.type}\`,
          );
          $APP.Backend.handleMessage({
            data,
            respond,
          });
        });
      }
    },
  };

  self.addEventListener("message", async (event) => {
    if (event.data.type === "APP:BACKEND:START") {
      commsPort = event.ports[0];
      console.info("Communication port initialized");
      commsPort.onmessage = MessageHandler.handleMessage;
      (async () => {
        await bootstrap();
        commsPort.postMessage({ type: "APP:BACKEND:READY" });
        $APP.Backend.client = commsPort;
      })();
    }
  });
}
`,mimeType:"text/javascript"},"/$app/sw/filesystem.js":{content:`/**
 * @file Filesystem Event Handlers
 * @description Service Worker filesystem operations for cache-based storage
 */

/**
 * Create filesystem event handlers for Service Worker
 * @param {Object} deps - Dependencies
 * @param {Function} deps.getMimeType - Function to get MIME type from path
 * @param {Object} deps.fsCache - Cache helper object
 * @param {Function} deps.getLocalUrl - Function to get local URL from path
 * @returns {Object} Event handlers map
 */
export default ({ getMimeType, fsCache, getLocalUrl }) => ({
  "FS:WRITE_FILES": async (data, { respond }) => {
    try {
      const { files } = data.payload;
      if (!Array.isArray(files))
        throw new Error("Payload must include a 'files' array.");

      const filesToCache = files.map((entry) => {
        const fullPath = entry.directory
          ? \`\${entry.directory}/\${entry.name}\`
          : \`/\${entry.name}\`;
        if (entry.isDirectory) {
          const dirPath = fullPath.endsWith("/") ? fullPath : \`\${fullPath}/\`;
          return { path: \`\${dirPath}.dir-placeholder\`, content: "" };
        }
        return { path: fullPath, content: entry.content || "" };
      });

      const cache = await fsCache.open("local");
      const cachingPromises = filesToCache.map(({ path, content }) => {
        const requestUrl = getLocalUrl(path);
        const responseToCache = new Response(content, {
          headers: { "Content-Type": getMimeType(path) },
        });
        return cache.put(requestUrl, responseToCache);
      });

      await Promise.all(cachingPromises);
      console.info(\`Service Worker: Batch wrote \${files.length} entries.\`);
      respond({ success: true, count: files.length }, "FS_WRITE_FILES_SUCCESS");
    } catch (error) {
      console.error("Service Worker Error in FS:WRITE_FILES:", error);
      respond({ error: error.message }, "FS_WRITE_FILES_ERROR");
    }
  },

  "FS:WRITE_FILE": async (data, { respond }) => {
    try {
      const { path, content, system } = data.payload;
      const cache = await fsCache.open(system ? "cdn" : "staging");
      const requestUrl = system ? \`https://\${path}\` : getLocalUrl(path);
      const responseToCache = new Response(content, {
        headers: { "Content-Type": getMimeType(path) },
      });
      await cache.put(requestUrl, responseToCache);
      respond({ path }, "FS_WRITE_SUCCESS");
    } catch (error) {
      console.error({ error, data });
      respond({ error: error.message }, "FS_WRITE_ERROR");
    }
  },

  "FS:READ_FILE": async (data, { respond }) => {
    try {
      const { path, system } = data.payload;
      let response;

      if (system) {
        const cdnCache = await fsCache.open("cdn");
        const requestUrl = \`https://\${path}\`;
        response = await cdnCache.match(requestUrl);
      } else {
        const stgCache = await fsCache.open("staging");
        const globalCache = await fsCache.open("local");
        const requestUrl = getLocalUrl(path);
        response =
          (await stgCache.match(requestUrl)) ||
          (await globalCache.match(requestUrl));
      }

      if (!response) throw new Error(\`File not found: \${path}\`);
      const content = await response.text();
      respond({ path, content }, "FS_READ_SUCCESS");
    } catch (error) {
      respond({ error: error.message }, "FS_READ_ERROR");
    }
  },

  "FS:DELETE_FILE": async (data, { respond }) => {
    try {
      const { path, system } = data.payload;
      let deleted = false;

      if (system) {
        const cdnCache = await fsCache.open("cdn");
        const requestUrl = \`https://\${path}\`;
        deleted = await cdnCache.delete(requestUrl);
      } else {
        const stgCache = await fsCache.open("staging");
        const globalCache = await fsCache.open("local");
        const requestUrl = getLocalUrl(path);
        const deletedFromStg = await stgCache.delete(requestUrl);
        const deletedFromGlobal = await globalCache.delete(requestUrl);
        deleted = deletedFromStg || deletedFromGlobal;
      }

      if (!deleted) {
        throw new Error(\`File not found: \${path}\`);
      }
      respond({ path }, "FS_DELETE_SUCCESS");
    } catch (error) {
      respond({ error: error.message }, "FS_DELETE_ERROR");
    }
  },

  "FS:DELETE_DIRECTORY": async (data, { respond }) => {
    try {
      const { path, system } = data.payload;

      if (system) {
        respond(
          { path, message: "System directory deletion not supported." },
          "FS_DIRECTORY_DELETE_SKIPPED"
        );
        return;
      }

      const stgCache = await fsCache.open("staging");
      const globalCache = await fsCache.open("local");
      const dirPath = path.endsWith("/") ? path : \`\${path}/\`;

      const keysInStgDir = await fsCache.getKeysInDirectory(stgCache, dirPath);
      const keysInGlobalDir = await fsCache.getKeysInDirectory(globalCache, dirPath);

      const allKeys = [...keysInStgDir, ...keysInGlobalDir];
      const uniqueUrls = [...new Set(allKeys.map((req) => req.url))];

      const deletionPromises = uniqueUrls.flatMap((url) => [
        stgCache.delete(url),
        globalCache.delete(url),
      ]);

      await Promise.all(deletionPromises);
      respond({ path }, "FS_DIRECTORY_DELETE_SUCCESS");
    } catch (error) {
      respond({ error: error.message }, "FS_DIRECTORY_DELETE_ERROR");
    }
  },

  "FS:LIST_FILES": async (data, { respond }) => {
    try {
      const { path = "/", system } = data.payload;

      if (system) {
        // List files from CDN cache
        const cdnCache = await fsCache.open("cdn");
        const keys = await cdnCache.keys();
        const pathPrefix =
          path === "/" ? "" : path.endsWith("/") ? path : \`\${path}/\`;
        const directChildren = new Map();

        for (const req of keys) {
          const url = new URL(req.url);
          const fullPath = \`\${url.hostname}\${url.pathname}\`;

          if (path !== "/" && !fullPath.startsWith(pathPrefix)) continue;

          const relativePath =
            path === "/" ? fullPath : fullPath.substring(pathPrefix.length);

          if (!relativePath) continue;

          const firstSlashIndex = relativePath.indexOf("/");
          const segmentName =
            firstSlashIndex === -1
              ? relativePath
              : relativePath.substring(0, firstSlashIndex);

          if (!segmentName) continue;

          const isDirectory = firstSlashIndex !== -1;
          const childPath = \`\${pathPrefix}\${segmentName}\${isDirectory ? "/" : ""}\`;

          if (!directChildren.has(childPath)) {
            directChildren.set(childPath, {
              path: childPath,
              name: segmentName,
              isDirectory,
            });
          }
        }

        const filesList = Array.from(directChildren.values());
        filesList.sort((a, b) => {
          if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1;
          return a.name.localeCompare(b.name);
        });
        respond(filesList);
        return;
      }

      // List local files
      const dirPath = path.endsWith("/") ? path : \`\${path}/\`;
      const stgCache = await fsCache.open("staging");
      const globalCache = await fsCache.open("local");

      const stgKeys = await fsCache.getKeysInDirectory(stgCache, dirPath);
      const globalKeys = await fsCache.getKeysInDirectory(globalCache, dirPath);

      const requestMap = new Map();
      globalKeys.forEach((req) => requestMap.set(req.url, req));
      stgKeys.forEach((req) => requestMap.set(req.url, req));
      const keys = Array.from(requestMap.values());

      const pathPromises = keys.map(async (req) => {
        const fullPathUrl = new URL(req.url).pathname;
        const isDirPlaceholder = fullPathUrl.endsWith(".dir-placeholder");
        const finalPath = isDirPlaceholder
          ? fullPathUrl.replace(/\\.dir-placeholder$/, "")
          : fullPathUrl;
        return { path: finalPath };
      });

      const allCacheEntries = (await Promise.all(pathPromises)).filter(Boolean);
      const directChildren = new Map();

      for (const entry of allCacheEntries) {
        if (!entry.path.startsWith(dirPath)) continue;
        const relativePath = entry.path.substring(dirPath.length);
        if (relativePath === "") continue;

        const firstSlashIndex = relativePath.indexOf("/");
        const segmentName =
          firstSlashIndex === -1
            ? relativePath
            : relativePath.substring(0, firstSlashIndex);
        if (!segmentName) continue;

        const isDirectory = firstSlashIndex !== -1 || entry.path.endsWith("/");
        if (isDirectory) {
          const childDirPath = \`\${dirPath}\${segmentName}/\`;
          if (!directChildren.has(childDirPath)) {
            directChildren.set(childDirPath, {
              path: childDirPath,
              name: segmentName,
              isDirectory: true,
            });
          }
        } else {
          const childFilePath = \`\${dirPath}\${segmentName}\`;
          if (!directChildren.has(childFilePath)) {
            directChildren.set(childFilePath, {
              path: childFilePath,
              name: segmentName,
              isDirectory: false,
            });
          }
        }
      }

      const filesList = Array.from(directChildren.values());
      filesList.sort((a, b) => {
        if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1;
        return a.name.localeCompare(b.name);
      });

      respond(filesList);
    } catch (error) {
      console.error("Service Worker Error in FS:LIST_FILES:", error);
      respond({ error: error.message }, "FS_LIST_ERROR");
    }
  },

  "FS:DIR_EXISTS": async (data, { respond }) => {
    try {
      const { path } = data.payload;
      if (!path) throw new Error("Payload must include 'path'.");
      const dirPath = path.endsWith("/") ? path : \`\${path}/\`;
      const stgCache = await fsCache.open("staging");
      const globalCache = await fsCache.open("local");

      const stgKeys = await fsCache.getKeysInDirectory(stgCache, dirPath);
      if (stgKeys.length > 0) {
        respond(true);
        return;
      }

      const globalKeys = await fsCache.getKeysInDirectory(globalCache, dirPath);
      respond(globalKeys.length > 0);
    } catch (error) {
      respond({ error: error.message }, "FS_DIR_EXISTS_ERROR");
    }
  },

  "FS:FILE_EXISTS": async (data, { respond }) => {
    try {
      const { path } = data.payload;
      if (!path) throw new Error("Payload must include 'path'.");
      const stgCache = await fsCache.open("staging");
      const globalCache = await fsCache.open("local");
      const requestUrl = getLocalUrl(path);

      let response = await stgCache.match(requestUrl);
      if (response) {
        respond(true);
        return;
      }

      response = await globalCache.match(requestUrl);
      respond(!!response);
    } catch (error) {
      respond({ error: error.message }, "FS_FILE_EXISTS_ERROR");
    }
  },
});
`,mimeType:"text/javascript"},"/package.json":{content:`{
  "name": "meetup.rio",
  "version": "0.1.0",
  "description": "Discover Rio de Janeiro - Places, Events, and Things to Do",
  "type": "module",
  "dependencies": {
    "@bootstrapp/auth": "file:../../public/auth",
    "@bootstrapp/base": "file:../../public/base",
    "@bootstrapp/model": "file:../../public/model",
    "@bootstrapp/model-indexeddb": "file:../../public/model-indexeddb",
    "@bootstrapp/sw": "file:../../public/sw",
    "@bootstrapp/controller": "file:../../public/controller",
    "@bootstrapp/events": "file:../../public/events",
    "@bootstrapp/i18n": "file:../../public/i18n",
    "@bootstrapp/icon-lucide": "file:../../public/icon-lucide",
    "@bootstrapp/router": "file:../../public/router",
    "@bootstrapp/tailwind": "file:../../public/tailwind",
    "@bootstrapp/theme": "file:../../public/theme",
    "@bootstrapp/types": "file:../../public/types",
    "@bootstrapp/uix": "file:../../public/uix",
    "@bootstrapp/view": "file:../../public/view",
    "@bootstrapp/admin": "file:../../public/admin",
    "@bootstrapp/maps": "file:../../public/maps",
    "@bootstrapp/extension": "file:../../public/extension",
    "@bootstrapp/bundler": "file:../../public/bundler",
    "@bootstrapp/github": "file:../../public/github",
    "@bootstrapp/cms": "file:../../public/cms",
    "pocketbase": "^0.26.5"
  },
  "settings": {
    "name": "Meetup Rio",
    "short_name": "Meetup.Rio",
    "description": "Discover Rio de Janeiro - Places, Events, and Things to Do",
    "url": "https://meetup.rio/",
    "theme_color": "#00d4aa",
    "og_image": "/assets/cover.png",
    "emojiIcon": "\u{1F334}",
    "scope": "/",
    "brand": {
      "name": "MEETUP",
      "accent": ".RIO",
      "accentClass": "text-pink-700"
    },
    "defaultLocation": "Rio de Janeiro",
    "navTabs": [
      {
        "id": "discover",
        "route": "/discover",
        "icon": "compass",
        "label": "Discover"
      },
      {
        "id": "events",
        "route": "/events",
        "icon": "calendar",
        "label": "Events"
      },
      {
        "id": "guides",
        "route": "/guides",
        "icon": "book-open",
        "label": "Guides"
      },
      {
        "id": "groups",
        "route": "/groups",
        "icon": "users",
        "label": "Groups"
      }
    ],
    "deploy": {
      "owner": "meiraleal",
      "repo": "meetup.rio",
      "branch": "main"
    }
  },
  "theme": {
    "font": {
      "family": "Manrope"
    },
    "icon": {
      "family": "lucide"
    },
    "color": {
      "primary": "hsl(179 85% 53%)",
      "secondary": "hsl(6 90% 64%)",
      "accent": "hsl(6 90% 64%)",
      "surface": "hsl(100 35% 80%)",
      "text": "hsl(183 80% 34%)",
      "danger": "hsl(0 90% 65%)",
      "border": "#000000",
      "border-subtle": "#5c5050"
    }
  }
}
`,mimeType:"application/json"},"/index.js":{content:`import "/models/schema.js";
`,mimeType:"text/javascript"},"/models/schema.js":{content:`export const version = 6;

import { slugHooks } from "/$app/model/slug.js";
import T from "/$app/types/index.js";
import cmsTypes from "/$app/cms/types.js";
import $APP from "/$app.js";
import { cmsModels } from "/$app/cms/schema.js";

// Register CMS types (T.media, T.richText, T.seo, T.publishStatus)
T.registerExtension(cmsTypes);

const generateId = () => {
  const timestamp = String(Date.now() + Math.floor(Math.random() * 100));
  const random = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, "0");
  return Number(timestamp + random);
};

const generateUserId = generateId;
const generateContentId = generateId;

$APP.models.set({
  // Include CMS media model
  ...cmsModels,

  users: {
    id: T.string({ required: true }),
    name: T.string({ required: true }),
    username: T.string(),
    bio: T.string(),
    avatar: T.string(), // PocketBase expects file upload, not URL
    stats: T.object(),

    // Prototype auth
    email: T.string({ required: true }), // Required by PocketBase
    password: T.string(),
    passwordConfirm: T.string(),
    isGuest: T.boolean({ defaultValue: false }),

    // Onboarding Fields
    travelStatus: T.string({ defaultValue: "visitor" }),
    arrivalDate: T.string(),
    departureDate: T.string(),
    vibeTime: T.string({ defaultValue: "night" }),
    vibeSocial: T.string({ defaultValue: "social" }),
    vibeDrink: T.string({ defaultValue: "caipirinha" }),
    lookingFor: T.array({ defaultValue: [] }),

    // Location
    lastKnownLat: T.number(),
    lastKnownLng: T.number(),

    // User Interactions - Likes
    likedPlaces: T.belongs_many("places"),
    likedEvents: T.belongs_many("events"),
    likedMeetups: T.belongs_many("meetups"),
    likedGroups: T.belongs_many("groups"),

    // User Interactions - Interests (only for events/meetups)
    interestedEvents: T.belongs_many("events"),
    interestedMeetups: T.belongs_many("meetups"),

    // User Interactions - Skips
    skippedPlaces: T.belongs_many("places"),
    skippedEvents: T.belongs_many("events"),
    skippedMeetups: T.belongs_many("meetups"),
    skippedGroups: T.belongs_many("groups"),

    createdAt: T.string({}),
  },
  places: {
    $hooks: slugHooks("name", "slug"),
    // Core
    id: T.string({ required: true }),
    name: T.string({ required: true }),
    slug: T.string({ index: true, immutable: true }),
    description: T.string({ required: true }),
    category: T.string({ required: true, index: true }),
    image: T.string({ required: true }),

    // Location
    address: T.string(),
    lat: T.number({ index: true }),
    lng: T.number({ index: true }),

    // Contact
    phone: T.string(),
    website: T.string(),

    // Rating
    rating: T.number(),
    reviewCount: T.number({ defaultValue: 0 }),

    // Google Maps
    gmapsId: T.string({ index: true }), // For deduplication
    gmaps: T.object({ attribute: false }), // Full GMaps data snapshot

    // Social
    whatsappLink: T.string(),
    featured: T.boolean({ defaultValue: false, index: true }),

    // Discovery & Recommendations
    tags: T.array({ defaultValue: [], index: true }),
    recommended: T.boolean({ defaultValue: false, index: true }),
    viewCount: T.number({ defaultValue: 0 }),

    // Metadata
    createdAt: T.string({ required: true, index: true }),
    order: T.number({ index: true }),
  },
  events: {
    $hooks: slugHooks("name", "slug"),
    // Core
    id: T.string({ required: true }),
    name: T.string({ required: true }),
    slug: T.string({ index: true, immutable: true }),
    description: T.string({ required: true }),
    category: T.string({ required: true, index: true }),
    image: T.string({ required: true }),

    // Event details
    date: T.string({ index: true }),
    time: T.string(),
    venue: T.string(),

    // Pricing
    price: T.number({ defaultValue: 0 }),
    currency: T.string({ defaultValue: "BRL" }),
    ticketLink: T.string(),

    // Location
    lat: T.number({ index: true }),
    lng: T.number({ index: true }),

    // Relationships
    place: T.belongs("places"), // FK to places (optional)

    // Recurrence
    isRecurring: T.boolean({ defaultValue: false, index: true }),
    recurrencePattern: T.string(),
    recurrenceDays: T.array({ defaultValue: [] }),
    recurrenceEndDate: T.string(),
    recurrenceParentId: T.string({ index: true }),

    // Social
    attendees: T.array({ defaultValue: [] }),
    createdBy: T.belongs("users"),
    maxAttendees: T.number({ defaultValue: 20 }),
    isActive: T.boolean({ defaultValue: true, index: true }),
    whatsappLink: T.string(),

    // Discovery & Recommendations
    tags: T.array({ defaultValue: [], index: true }),
    recommended: T.boolean({ defaultValue: false, index: true }),
    viewCount: T.number({ defaultValue: 0 }),

    // Metadata
    createdAt: T.string({ required: true, index: true }),
    order: T.number({ index: true }),
  },
  meetups: {
    $hooks: slugHooks("name", "slug"),
    // Core
    id: T.string({ required: true }),
    name: T.string({ required: true }),
    slug: T.string({ index: true, immutable: true }),
    description: T.string({ required: true }),
    category: T.string({ required: true, index: true }),
    image: T.string({ required: true }),
    date: T.string({ index: true }),
    time: T.string(),
    venue: T.string(),

    // Relationships (mutually exclusive)
    event: T.belongs("events"), // FK to events (optional)
    place: T.belongs("places"), // FK to places (optional)

    // Location
    lat: T.number({ index: true }),
    lng: T.number({ index: true }),

    // Social
    attendees: T.array({ defaultValue: [] }),
    createdBy: T.belongs("users"),
    maxAttendees: T.number({ defaultValue: 20 }),
    isActive: T.boolean({ defaultValue: true, index: true }),

    // Metadata
    createdAt: T.string({ required: true, index: true }),
    order: T.number({ index: true }),
  },
  groups: {
    $hooks: slugHooks("name", "slug"),
    // Core
    id: T.string({ required: true }),
    name: T.string({ required: true }),
    slug: T.string({ index: true, immutable: true }),
    description: T.string({ required: true }),
    category: T.string({ required: true, index: true }),
    image: T.string({ required: true }),

    // Group details
    groupName: T.string(),
    memberCount: T.string(),
    whatsappLink: T.string(),

    // Social
    featured: T.boolean({ defaultValue: false, index: true }),

    // Discovery & Recommendations
    tags: T.array({ defaultValue: [], index: true }),
    recommended: T.boolean({ defaultValue: false, index: true }),
    viewCount: T.number({ defaultValue: 0 }),

    // Location (optional, for location-based groups)
    lat: T.number({ index: true }),
    lng: T.number({ index: true }),

    // Metadata
    createdAt: T.string({ required: true, index: true }),
    order: T.number({ index: true }),
  },
  // Guides - Editorial content (articles and curated lists)
  guides: {
    $cms: true, // Enable CMS features (rich text, media picker, SEO)
    $hooks: slugHooks("title", "slug"),
    id: T.string({ required: true }),
    title: T.string({ required: true }),
    slug: T.string({ index: true, immutable: true }),
    description: T.string({ required: true }),
    coverImage: T.media(), // CMS media picker

    // Type discriminator: "article" or "list"
    guideType: T.string({
      required: true,
      enum: ["article", "list"],
      index: true,
    }),

    // Categories this guide belongs to
    categories: T.array({ defaultValue: [] }),

    // Article-specific: rich text/markdown content
    body: T.richText(), // CMS rich text editor

    // List-specific: array of { type: "place"|"event", id: string, note?: string }
    items: T.array({ defaultValue: [] }),

    // Author & Social
    author: T.belongs("users"),
    featured: T.boolean({ defaultValue: false, index: true }),

    // Discovery & Recommendations
    tags: T.array({ defaultValue: [], index: true }),
    recommended: T.boolean({ defaultValue: false, index: true }),
    viewCount: T.number({ defaultValue: 0 }),

    // Publishing workflow
    status: T.publishStatus(), // CMS draft/published/scheduled
    publishedAt: T.string({ index: true }),
    scheduledAt: T.string({ index: true }),

    // SEO
    seo: T.seo(), // CMS SEO fields

    // Metadata
    createdAt: T.string({ required: true, index: true }),
    order: T.number({ index: true }),
  },
  // Meetup attendance tracking (events don't need attendance - users attend meetups)
  meetup_attendance: {
    id: T.string({ required: true }),
    user: T.belongs("users", { required: true }),
    meetup: T.belongs("meetups", { required: true }),
    status: T.string({
      defaultValue: "attending",
      enum: ["attending", "maybe", "cancelled"],
    }),
    joinedAt: T.string({ required: true, index: true }),
    updatedAt: T.string({ index: true }),
    createdAt: T.string({ required: true }),
  },
});
const users = [
  { id: "guest", name: "Guest", email: "guest@localhost", isGuest: true },
  {
    id: generateUserId(),
    name: "John Brooklyn",
    username: "@johnbrooklyn",
    bio: "Travel writers who wrote my own story. Living my life in my style.",
    email: "john.brooklyn@example.com",
    stats: {
      interested: 1359,
      saved: 876,
      attending: 28,
    },
    // Default Values for New Fields
    travelStatus: "visitor",
    arrivalDate: "2025-12-01",
    departureDate: "2025-12-15",
    vibeTime: "morning",
    vibeSocial: "social",
    vibeDrink: "coconut",
    lookingFor: ["dates", "activities"],
    createdAt: new Date().toISOString(),
    password: "123456890",
    passwordConfirm: "123456890",
  },
  {
    id: generateUserId(),
    name: "Maria Silva",
    username: "@mariasilva",
    bio: "Rio local, samba lover, and night owl. Let's dance! \u{1F483}",
    email: "maria.silva@example.com",
    stats: {
      interested: 234,
      saved: 156,
      attending: 42,
    },
    travelStatus: "resident",
    vibeTime: "night",
    vibeSocial: "social",
    vibeDrink: "caipirinha",
    lookingFor: ["friends", "parties"],
    createdAt: new Date().toISOString(),
    password: "123456890",
    passwordConfirm: "123456890",
  },
  {
    id: generateUserId(),
    name: "Carlos Mendez",
    username: "@carlosnomad",
    bio: "Digital nomad exploring South America. Always down for a beach day!",
    email: "carlos.mendez@example.com",
    stats: {
      interested: 567,
      saved: 345,
      attending: 38,
    },
    travelStatus: "nomad",
    arrivalDate: "2025-12-01",
    departureDate: "2026-02-28",
    vibeTime: "morning",
    vibeSocial: "chill",
    vibeDrink: "coconut",
    lookingFor: ["friends", "tips", "activities"],
    createdAt: new Date().toISOString(),
    password: "123456890",
    passwordConfirm: "123456890",
  },
  {
    id: generateUserId(),
    name: "Ana Costa",
    username: "@anacosta",
    bio: "Party girl visiting from S\xE3o Paulo. Show me Rio's nightlife! \u{1F389}",
    email: "ana.costa@example.com",
    stats: {
      interested: 892,
      saved: 234,
      attending: 18,
    },
    travelStatus: "visitor",
    arrivalDate: "2025-12-10",
    departureDate: "2025-12-20",
    vibeTime: "night",
    vibeSocial: "social",
    vibeDrink: "beer",
    lookingFor: ["parties", "dates"],
    createdAt: new Date().toISOString(),
    password: "123456890",
    passwordConfirm: "123456890",
  },
  {
    id: generateUserId(),
    name: "Lucas Santos",
    username: "@lucassantos",
    bio: "Carioca born and raised. Morning runs and a\xE7a\xED bowls are my thing.",
    email: "lucas.santos@example.com",
    stats: {
      interested: 445,
      saved: 289,
      attending: 31,
    },
    travelStatus: "resident",
    vibeTime: "morning",
    vibeSocial: "chill",
    vibeDrink: "coconut",
    lookingFor: ["activities", "tips"],
    createdAt: new Date().toISOString(),
    password: "123456890",
    passwordConfirm: "123456890",
  },
  {
    id: generateUserId(),
    name: "Julia Martinez",
    username: "@juliatraveler",
    bio: "Solo traveler making friends around the world. Let's explore Rio together!",
    email: "julia.martinez@example.com",
    stats: {
      interested: 1123,
      saved: 678,
      attending: 45,
    },
    travelStatus: "visitor",
    arrivalDate: "2025-12-05",
    departureDate: "2025-12-25",
    vibeTime: "night",
    vibeSocial: "social",
    vibeDrink: "caipirinha",
    lookingFor: ["friends", "parties", "dates"],
    createdAt: new Date().toISOString(),
    password: "123456890",
    passwordConfirm: "123456890",
  },
  {
    id: generateUserId(),
    name: "Pedro Oliveira",
    username: "@pedrolocal",
    bio: "Beach volleyball enthusiast and Rio tour guide. Ask me anything!",
    email: "pedro.oliveira@example.com",
    stats: {
      interested: 356,
      saved: 234,
      attending: 52,
    },
    travelStatus: "resident",
    vibeTime: "morning",
    vibeSocial: "social",
    vibeDrink: "beer",
    lookingFor: ["friends", "activities"],
    createdAt: new Date().toISOString(),
    password: "123456890",
    passwordConfirm: "123456890",
  },
  {
    id: generateUserId(),
    name: "Sofia Rodriguez",
    username: "@sofiaexplorer",
    bio: "Remote worker and adventure seeker. Yoga, hiking, and good coffee \u2615",
    email: "sofia.rodriguez@example.com",
    stats: {
      interested: 789,
      saved: 445,
      attending: 35,
    },
    travelStatus: "nomad",
    arrivalDate: "2025-11-15",
    departureDate: "2026-01-31",
    vibeTime: "morning",
    vibeSocial: "chill",
    vibeDrink: "coconut",
    lookingFor: ["tips", "activities", "friends"],
    createdAt: new Date().toISOString(),
    password: "123456890",
    passwordConfirm: "123456890",
  },
  {
    id: generateUserId(),
    name: "Diego Fernandez",
    username: "@diegofernandez",
    bio: "Here for the holidays! Looking to party and meet cool people \u{1F37B}",
    email: "diego.fernandez@example.com",
    stats: {
      interested: 445,
      saved: 167,
      attending: 12,
    },
    travelStatus: "visitor",
    arrivalDate: "2025-12-15",
    departureDate: "2025-12-30",
    vibeTime: "night",
    vibeSocial: "social",
    vibeDrink: "beer",
    lookingFor: ["parties", "friends"],
    createdAt: new Date().toISOString(),
    password: "123456890",
    passwordConfirm: "123456890",
  },
  {
    id: generateUserId(),
    name: "Beatriz Lima",
    username: "@beatrizcarioca",
    bio: "Rio de Janeiro \xE9 meu amor! Coffee addict and culture enthusiast \u{1F3AD}",
    email: "beatriz.lima@example.com",
    stats: {
      interested: 612,
      saved: 389,
      attending: 37,
    },
    travelStatus: "resident",
    vibeTime: "night",
    vibeSocial: "social",
    vibeDrink: "caipirinha",
    lookingFor: ["friends", "dates"],
    createdAt: new Date().toISOString(),
    password: "123456890",
    passwordConfirm: "123456890",
  },
  {
    id: generateUserId(),
    name: "Rafael Almeida",
    username: "@rafaelrio",
    bio: "Surf instructor and beach lover. Catch me at Prainha! \u{1F3C4}\u200D\u2642\uFE0F",
    email: "rafael.almeida@example.com",
    stats: {
      interested: 234,
      saved: 145,
      attending: 22,
    },
    travelStatus: "resident",
    vibeTime: "morning",
    vibeSocial: "chill",
    vibeDrink: "coconut",
    lookingFor: ["activities", "friends"],
    createdAt: new Date().toISOString(),
    password: "123456890",
    passwordConfirm: "123456890",
  },
  {
    id: generateUserId(),
    name: "Emma Thompson",
    username: "@emmaexplores",
    bio: "British expat living in Rio for 2 years. Love samba and a\xE7a\xED!",
    email: "emma.thompson@example.com",
    stats: {
      interested: 567,
      saved: 345,
      attending: 41,
    },
    travelStatus: "resident",
    vibeTime: "night",
    vibeSocial: "social",
    vibeDrink: "caipirinha",
    lookingFor: ["parties", "friends"],
    createdAt: new Date().toISOString(),
    password: "123456890",
    passwordConfirm: "123456890",
  },
  {
    id: generateUserId(),
    name: "Gabriel Souza",
    username: "@gabrielcarioca",
    bio: "DJ and music producer. Ask me about Rio's underground scene \u{1F3A7}",
    email: "gabriel.souza@example.com",
    stats: {
      interested: 892,
      saved: 567,
      attending: 63,
    },
    travelStatus: "resident",
    vibeTime: "night",
    vibeSocial: "social",
    vibeDrink: "beer",
    lookingFor: ["parties", "friends"],
    createdAt: new Date().toISOString(),
    password: "123456890",
    passwordConfirm: "123456890",
  },
  {
    id: generateUserId(),
    name: "Isabella Chen",
    username: "@isabellawanderer",
    bio: "Travel blogger from Singapore. Documenting my South America journey!",
    email: "isabella.chen@example.com",
    stats: {
      interested: 1456,
      saved: 892,
      attending: 28,
    },
    travelStatus: "visitor",
    arrivalDate: "2025-12-01",
    departureDate: "2025-12-20",
    vibeTime: "morning",
    vibeSocial: "social",
    vibeDrink: "coconut",
    lookingFor: ["tips", "activities", "friends"],
    createdAt: new Date().toISOString(),
    password: "123456890",
    passwordConfirm: "123456890",
  },
  {
    id: generateUserId(),
    name: "Thiago Barbosa",
    username: "@thiagofitness",
    bio: "Personal trainer and CrossFit enthusiast. Training on the beach daily!",
    email: "thiago.barbosa@example.com",
    stats: {
      interested: 345,
      saved: 189,
      attending: 34,
    },
    travelStatus: "resident",
    vibeTime: "morning",
    vibeSocial: "chill",
    vibeDrink: "coconut",
    lookingFor: ["activities", "friends"],
    createdAt: new Date().toISOString(),
    password: "123456890",
    passwordConfirm: "123456890",
  },
];
// Generate IDs for events that will be referenced by meetups
const carnivalBallId = generateContentId();

// Pre-generate IDs for places that guides will reference
const christRedeemerId = generateContentId();
const sugarloafId = generateContentId();
const selaronId = generateContentId();
const botanicalGardenId = generateContentId();
const arpoadorId = generateContentId();

$APP.data.set({
  places: [
    // BEACHES
    {
      id: generateContentId(),
      name: "Copacabana Beach",
      description:
        "Iconic 4km beach with the famous wave-pattern boardwalk. Perfect for sunbathing, swimming, and people-watching.",
      category: "beaches",
      image: "https://picsum.photos/seed/copacabana/400/600",
      address: "Av. Atl\xE2ntica, Copacabana, Rio de Janeiro",
      lat: -22.9711,
      lng: -43.1822,
      tags: ["family-friendly", "must-see", "chill"],
      recommended: true,
      viewCount: 500,
      createdAt: "2025-01-01T00:00:00Z",
      order: 4,
    },
    {
      id: generateContentId(),
      name: "Ipanema Beach",
      description:
        "Trendy beach known for its stunning sunsets, upscale neighborhood, and the famous 'Girl from Ipanema' song.",
      category: "beaches",
      image: "https://picsum.photos/seed/ipanema/400/600",
      address: "Av. Vieira Souto, Ipanema, Rio de Janeiro",
      lat: -22.9838,
      lng: -43.2044,
      whatsappLink: "https://wa.me/?text=Ipanema%20Beach%20is%20amazing!%20\u{1F305}",
      tags: ["romantic", "must-see", "local-favorite"],
      recommended: true,
      viewCount: 450,
      createdAt: "2025-01-02T00:00:00Z",
      order: 2,
    },
    {
      id: generateContentId(),
      name: "Prainha",
      description:
        "Hidden gem beach surrounded by lush green mountains. Less crowded, perfect for surfing and nature lovers.",
      category: "beaches",
      image: "https://picsum.photos/seed/prainha/400/600",
      address: "Av. Estado da Guanabara, Recreio dos Bandeirantes",
      lat: -23.0425,
      lng: -43.5008,
      whatsappLink:
        "https://wa.me/?text=Found%20this%20hidden%20beach%20gem%20-%20Prainha!%20\u{1F3C4}",
      tags: ["adventure", "chill", "local-favorite"],
      viewCount: 120,
      createdAt: "2025-01-03T00:00:00Z",
      order: 3,
    },

    // PARTIES & DANCING
    {
      id: generateContentId(),
      name: "Lapa Arches Street Party",
      description:
        "Historic neighborhood known for samba, live music, and vibrant nightlife under the famous arches.",
      category: "parties",
      image: "https://picsum.photos/seed/lapa/400/600",
      address: "Arcos da Lapa, Centro, Rio de Janeiro",
      lat: -22.913,
      lng: -43.1802,
      whatsappLink:
        "https://wa.me/?text=Let's%20party%20at%20Lapa%20Arches!%20\u{1F389}",
      tags: ["party", "local-favorite", "must-see"],
      recommended: true,
      viewCount: 380,
      createdAt: "2025-01-04T00:00:00Z",
      order: 4,
    },

    // FOOD & DRINKS
    {
      id: generateContentId(),
      name: "Confeiteiro Colombo",
      description:
        "Historic Belle \xC9poque caf\xE9 serving traditional Brazilian pastries and coffee since 1894. A must-visit!",
      category: "food",
      image: "https://picsum.photos/seed/colombo/400/600",
      address: "Rua Gon\xE7alves Dias, 32, Centro",
      lat: -22.9067,
      lng: -43.1773,
      whatsappLink:
        "https://wa.me/?text=Amazing%20historic%20caf\xE9%20-%20Confeitaria%20Colombo!%20\u2615",
      tags: ["must-see", "romantic", "local-favorite"],
      recommended: true,
      viewCount: 290,
      createdAt: "2025-01-07T00:00:00Z",
      order: 7,
    },
    {
      id: generateContentId(),
      name: "Churrascaria Palace",
      description:
        "Traditional Brazilian steakhouse with unlimited rod\xEDzio service. Experience the best cuts of meat!",
      category: "food",
      image: "https://picsum.photos/seed/churrasco/400/600",
      address: "Rua Rodolfo Dantas, 16, Copacabana",
      lat: -22.9688,
      lng: -43.1862,
      whatsappLink: "https://wa.me/?text=Best%20churrascaria%20in%20Rio!%20\u{1F969}",
      tags: ["family-friendly", "local-favorite"],
      viewCount: 85,
      createdAt: "2025-01-08T00:00:00Z",
      order: 8,
    },

    // CULTURE
    {
      id: christRedeemerId,
      name: "Christ the Redeemer",
      description:
        "Iconic 98-foot Art Deco statue atop Corcovado Mountain. One of the New Seven Wonders of the World!",
      category: "culture",
      image: "https://picsum.photos/seed/christ/400/600",
      address: "Parque Nacional da Tijuca, Alto da Boa Vista",
      lat: -22.9519,
      lng: -43.2105,
      whatsappLink:
        "https://wa.me/?text=Visiting%20Christ%20the%20Redeemer!%20\u271D\uFE0F",
      tags: ["must-see", "family-friendly", "wheelchair-accessible"],
      recommended: true,
      viewCount: 850,
      createdAt: "2025-01-10T00:00:00Z",
      order: 10,
    },
    {
      id: sugarloafId,
      name: "Sugarloaf Mountain Cable Car",
      description:
        "Take the cable car to the top for breathtaking 360\xB0 views of Rio, beaches, and Guanabara Bay.",
      category: "culture",
      image: "https://picsum.photos/seed/sugarloaf/400/600",
      address: "Av. Pasteur, 520, Urca",
      lat: -22.9489,
      lng: -43.1575,
      whatsappLink:
        "https://wa.me/?text=Amazing%20views%20from%20Sugarloaf%20Mountain!%20\u{1F6A1}",
      tags: ["must-see", "romantic", "adventure"],
      recommended: true,
      viewCount: 720,
      createdAt: "2025-01-11T00:00:00Z",
      order: 11,
    },
    {
      id: selaronId,
      name: "Escadaria Selar\xF3n",
      description:
        "Colorful mosaic staircase with 215 steps, decorated with tiles from over 60 countries. Perfect for photos!",
      category: "culture",
      image: "https://picsum.photos/seed/selaron/400/600",
      address: "Rua Joaquim Silva, Lapa",
      lat: -22.915,
      lng: -43.1796,
      whatsappLink:
        "https://wa.me/?text=Check%20out%20these%20colorful%20steps!%20\u{1F3A8}",
      tags: ["must-see", "free-entry", "local-favorite"],
      viewCount: 210,
      createdAt: "2025-01-12T00:00:00Z",
      order: 12,
    },
    {
      id: botanicalGardenId,
      name: "Rio Botanical Garden",
      description:
        "Peaceful 340-acre garden with over 6,500 species. Home to giant water lilies and the famous palm tree avenue.",
      category: "culture",
      image: "https://picsum.photos/seed/botanical/400/600",
      address: "Rua Jardim Bot\xE2nico, 1008, Jardim Bot\xE2nico",
      lat: -22.9668,
      lng: -43.2246,
      whatsappLink:
        "https://wa.me/?text=Beautiful%20Botanical%20Garden%20in%20Rio!%20\u{1F334}",
      tags: ["family-friendly", "chill", "wheelchair-accessible"],
      viewCount: 180,
      createdAt: "2025-01-14T00:00:00Z",
      order: 14,
    },
    {
      id: arpoadorId,
      name: "Arpoador Rock Sunset",
      description:
        "Famous spot where locals gather to watch the sunset between Ipanema and Copacabana. Bring your camera!",
      category: "beaches",
      image: "https://picsum.photos/seed/arpoador/400/600",
      address: "Arpoador, between Ipanema and Copacabana",
      lat: -22.9897,
      lng: -43.1898,
      whatsappLink: "https://wa.me/?text=Best%20sunset%20spot%20in%20Rio!%20\u{1F307}",
      tags: ["romantic", "free-entry", "local-favorite"],
      recommended: true,
      viewCount: 340,
      createdAt: "2025-01-15T00:00:00Z",
      order: 15,
    },
  ],
  events: [
    {
      id: carnivalBallId,
      name: "Copacabana Palace Carnival Ball",
      description:
        "Exclusive black-tie carnival ball at the iconic Copacabana Palace Hotel. Experience glamour and tradition! Dress code is strictly black tie or luxury costume.",
      category: "parties",
      image: "https://picsum.photos/seed/carnival/400/600",
      date: "2025-03-01",
      time: "22:00",
      venue: "Copacabana Palace Hotel",
      price: 2500,
      currency: "BRL",
      ticketLink: "https://example.com/tickets",
      lat: -22.9667,
      lng: -43.1756,
      tags: ["party", "must-see", "romantic"],
      recommended: true,
      viewCount: 320,
      createdAt: "2025-01-05T00:00:00Z",
      order: 1,
    },
    {
      id: generateContentId(),
      name: "Pedra do Sal Samba Night",
      description:
        "Authentic outdoor samba gathering every Monday and Friday. Free event with locals dancing in the streets!",
      category: "dancing",
      image: "https://picsum.photos/seed/samba/400/600",
      date: "2025-12-05",
      time: "19:00",
      venue: "Pedra do Sal, Sa\xFAde",
      lat: -22.8955,
      lng: -43.1896,
      isRecurring: true,
      recurrencePattern: "custom",
      recurrenceDays: [1, 5], // Monday and Friday
      recurrenceEndDate: "2026-03-31",
      attendees: [],
      whatsappLink:
        "https://wa.me/?text=Join%20me%20for%20samba%20at%20Pedra%20do%20Sal!%20\u{1F483}",
      tags: ["local-favorite", "free-entry", "party"],
      recommended: true,
      viewCount: 280,
      createdAt: "2025-01-06T00:00:00Z",
      order: 6,
    },
    {
      id: generateContentId(),
      name: "Rio Food Truck Festival",
      description:
        "Monthly food festival with 30+ gourmet food trucks, live music, and craft beer. Variety for everyone!",
      category: "food",
      image: "https://picsum.photos/seed/foodtruck/400/600",
      date: "2025-12-15",
      time: "12:00",
      venue: "Parque dos Atletas, Barra da Tijuca",
      lat: -22.9844,
      lng: -43.3958,
      attendees: [
        users[0].id,
        users[1].id,
        users[2].id,
        users[3].id,
        users[4].id,
        users[5].id,
      ],
      whatsappLink:
        "https://wa.me/?text=Food%20Truck%20Festival%20this%20weekend!%20\u{1F354}",
      tags: ["family-friendly", "pet-friendly"],
      viewCount: 95,
      createdAt: "2025-01-09T00:00:00Z",
      order: 9,
    },
    {
      id: generateContentId(),
      name: "Maracan\xE3 Stadium Tour",
      description:
        "Guided tour of the legendary football stadium. Walk on the field, visit locker rooms, and feel the history!",
      category: "sports",
      image: "https://picsum.photos/seed/maracana/400/600",
      date: "2025-12-10",
      time: "14:00",
      venue: "Est\xE1dio do Maracan\xE3, Maracan\xE3",
      lat: -22.9121,
      lng: -43.2302,
      attendees: [
        users[0].id,
        users[1].id,
        users[2].id,
        users[3].id,
        users[4].id,
        users[5].id,
      ],
      whatsappLink: "https://wa.me/?text=Stadium%20tour%20at%20Maracan\xE3!%20\u26BD",
      tags: ["must-see", "wheelchair-accessible", "family-friendly"],
      viewCount: 150,
      createdAt: "2025-01-13T00:00:00Z",
      order: 13,
    },
    {
      id: generateContentId(),
      name: "Copacabana Beach Volleyball",
      description:
        "Weekly pickup volleyball games at Copacabana Beach. All skill levels welcome! Bring water and sunscreen.",
      category: "sports",
      image: "https://picsum.photos/seed/beachvolley/400/600",
      date: "2025-12-07",
      time: "09:00",
      venue: "Posto 6, Copacabana Beach",
      lat: -22.9711,
      lng: -43.1822,
      isRecurring: true,
      recurrencePattern: "custom",
      recurrenceDays: [0, 6], // Sunday and Saturday
      recurrenceEndDate: "2026-02-28",
      attendees: [
        users[0].id,
        users[1].id,
        users[2].id,
        users[3].id,
        users[4].id,
        users[5].id,
      ],
      whatsappLink:
        "https://wa.me/?text=Beach%20Volleyball%20this%20weekend!%20\u{1F3D0}",
      tags: ["free-entry", "chill", "local-favorite"],
      viewCount: 75,
      createdAt: "2025-01-19T00:00:00Z",
      order: 16,
    },
    {
      id: generateContentId(),
      name: "Ipanema Sunset Yoga",
      description:
        "Free outdoor yoga sessions at sunset. Bring your own mat and enjoy the ocean breeze. Beginner-friendly!",
      category: "sports",
      image: "https://picsum.photos/seed/yoga/400/600",
      date: "2025-12-05",
      time: "17:30",
      venue: "Arpoador Beach",
      lat: -22.9897,
      lng: -43.1898,
      isRecurring: true,
      recurrencePattern: "custom",
      recurrenceDays: [2, 4], // Tuesday and Thursday
      recurrenceEndDate: "2026-03-31",
      attendees: [
        users[0].id,
        users[1].id,
        users[2].id,
        users[3].id,
        users[4].id,
        users[5].id,
      ],
      whatsappLink: "https://wa.me/?text=Sunset%20Yoga%20at%20Arpoador!%20\u{1F9D8}",
      tags: ["free-entry", "chill", "romantic"],
      viewCount: 110,
      createdAt: "2025-01-20T00:00:00Z",
      order: 17,
    },
    {
      id: generateContentId(),
      name: "Downtown Food Market",
      description:
        "Weekly food market featuring local vendors, fresh produce, and street food. Support local businesses!",
      category: "food",
      image: "https://picsum.photos/seed/market/400/600",
      date: "2025-12-05",
      time: "12:00",
      venue: "Pra\xE7a XV, Centro",
      lat: -22.9035,
      lng: -43.1758,
      isRecurring: true,
      recurrencePattern: "custom",
      recurrenceDays: [4], // Thursday
      recurrenceEndDate: "2025-12-31",
      attendees: [
        users[0].id,
        users[1].id,
        users[2].id,
        users[3].id,
        users[4].id,
        users[5].id,
      ],
      whatsappLink: "https://wa.me/?text=Food%20Market%20on%20Thursday!%20\u{1F34E}",
      tags: ["free-entry", "family-friendly", "local-favorite"],
      viewCount: 88,
      createdAt: "2025-01-21T00:00:00Z",
      order: 18,
    },
    {
      id: generateContentId(),
      name: "Lapa Street Party",
      description:
        "The legendary Lapa nightlife experience! Samba, caipirinhas, and live music under the arches every weekend.",
      category: "parties",
      image: "https://picsum.photos/seed/lapaparty/400/600",
      date: "2025-12-05",
      time: "22:00",
      venue: "Arcos da Lapa, Centro",
      lat: -22.913,
      lng: -43.1802,
      isRecurring: true,
      recurrencePattern: "custom",
      recurrenceDays: [5, 6], // Friday and Saturday
      recurrenceEndDate: "2026-03-01",
      attendees: [
        users[0].id,
        users[1].id,
        users[2].id,
        users[3].id,
        users[4].id,
        users[5].id,
      ],
      whatsappLink: "https://wa.me/?text=Party%20at%20Lapa%20tonight!%20\u{1F389}",
      tags: ["party", "local-favorite", "must-see"],
      recommended: true,
      viewCount: 260,
      createdAt: "2025-01-22T00:00:00Z",
      order: 19,
    },
  ],
  meetups: [
    {
      id: generateContentId(),
      name: "Pre-Ball Drinks",
      description:
        "Let's meet for some champagne before heading into the Palace! Meeting at the hotel bar.",
      category: "parties",
      image: "https://picsum.photos/seed/drinks/400/300",
      date: "2025-03-01",
      time: "20:00",
      venue: "Pergula Restaurant",
      event: carnivalBallId, // Linked to Carnival Ball event
      attendees: [],
      createdAt: "2025-01-25T00:00:00Z",
      order: 3,
    },
  ],
  groups: [
    // FEATURED GROUPS
    {
      id: generateContentId(),
      name: "MEETUP.RIO - Official",
      description:
        "The main MEETUP.RIO community! Connect with travelers, get insider tips, and join events happening around Rio.",
      category: "groups",
      groupName: "MEETUP.RIO - Official",
      memberCount: "1,200+ members",
      image: "https://picsum.photos/seed/meetuprio/400/600",
      lat: -22.9068,
      lng: -43.1729,
      whatsappLink: "https://chat.whatsapp.com/MEETUPRIO",
      featured: true,
      tags: ["local-favorite", "must-see"],
      recommended: true,
      viewCount: 450,
      createdAt: "2025-01-01T00:00:00Z",
      order: 20,
    },
    {
      id: generateContentId(),
      name: "Rio Events & Parties",
      description:
        "Stay updated on the hottest parties, festivals, and events in Rio. Organized by MEETUP.RIO team.",
      category: "groups",
      groupName: "Rio Events & Parties",
      memberCount: "800+ members",
      image: "https://picsum.photos/seed/rioevents/400/600",
      lat: -22.9068,
      lng: -43.1729,
      whatsappLink: "https://chat.whatsapp.com/RIOEVENTS",
      featured: true,
      tags: ["party", "local-favorite"],
      viewCount: 320,
      createdAt: "2025-01-02T00:00:00Z",
      order: 21,
    },

    // COMMUNITY GROUPS
    {
      id: generateContentId(),
      name: "Ipanema Locals",
      description:
        "Community group for people living in or visiting Ipanema. Share tips, meetups, and local recommendations.",
      category: "groups",
      groupName: "Ipanema Locals",
      memberCount: "350+ members",
      image: "https://picsum.photos/seed/ipanema-group/400/600",
      lat: -22.9838,
      lng: -43.2044,
      whatsappLink: "https://chat.whatsapp.com/IPANEMA",
      featured: false,
      tags: ["chill", "local-favorite"],
      viewCount: 85,
      createdAt: "2025-01-16T00:00:00Z",
      order: 22,
    },
    {
      id: generateContentId(),
      name: "Rio Food Lovers",
      description:
        "For food enthusiasts! Share restaurant recommendations, food truck finds, and organize dinner meetups.",
      category: "groups",
      groupName: "Rio Food Lovers",
      memberCount: "500+ members",
      image: "https://picsum.photos/seed/foodies/400/600",
      lat: -22.9068,
      lng: -43.1729,
      whatsappLink: "https://chat.whatsapp.com/RIOFOODIES",
      featured: false,
      tags: ["local-favorite", "family-friendly"],
      viewCount: 120,
      createdAt: "2025-01-17T00:00:00Z",
      order: 23,
    },
    {
      id: generateContentId(),
      name: "Beach Volleyball Rio",
      description:
        "Join pickup games at Copacabana and Ipanema! All skill levels welcome. Games usually weekends.",
      category: "groups",
      groupName: "Beach Volleyball Rio",
      memberCount: "280+ members",
      image: "https://picsum.photos/seed/volleyball/400/600",
      lat: -22.9711,
      lng: -43.1822,
      whatsappLink: "https://chat.whatsapp.com/VOLLEYBALL",
      featured: false,
      tags: ["chill", "free-entry"],
      viewCount: 65,
      createdAt: "2025-01-18T00:00:00Z",
      order: 24,
    },
  ],
  guides: [
    // FEATURED ARTICLE
    {
      id: generateContentId(),
      title: "Complete Guide to Rio's Best Beaches",
      description:
        "From the iconic Copacabana to hidden gems like Prainha - everything you need to know about Rio's stunning coastline.",
      coverImage: "https://picsum.photos/seed/beaches-guide/400/600",
      guideType: "article",
      categories: ["beaches"],
      tags: ["must-see", "family-friendly", "chill"],
      recommended: true,
      body: \`Rio de Janeiro is blessed with some of the world's most beautiful beaches, each with its own unique character and vibe.

## Copacabana - The Classic
The most famous beach in Brazil, Copacabana stretches for 4km along the Atlantic coast. The iconic wave-pattern boardwalk, designed by Roberto Burle Marx, is perfect for morning jogs or evening strolls. Best time to visit: early morning for exercise, sunset for drinks at the kiosks.

## Ipanema - The Trendy
Made famous by the song "The Girl from Ipanema," this beach is where Rio's beautiful people gather. The beach is divided into "postos" (lifeguard stations), each with its own crowd - Posto 9 is popular with the young and artistic, while Posto 8 attracts families.

## Prainha - The Hidden Gem
If you want to escape the crowds, head to Prainha in Recreio dos Bandeirantes. Surrounded by lush mountains, this small beach offers excellent surfing and a more natural setting. It's a 40-minute drive from the city center but worth every minute.

## Arpoador - The Sunset Spot
Located between Ipanema and Copacabana, Arpoador Rock is THE place to watch the sunset. Locals gather every evening and applaud as the sun dips below the horizon - a truly magical Rio experience.

## Pro Tips
- Bring cash for beach vendors (\xE1gua de coco, mate, snacks)
- Rent a beach chair and umbrella (around R$20-30)
- Don't bring valuables - leave them at your hotel
- Apply sunscreen regularly - the tropical sun is intense!\`,
      featured: true,
      status: "published",
      publishedAt: "2025-01-15T00:00:00Z",
      createdAt: "2025-01-15T00:00:00Z",
      order: 1,
    },
    // FEATURED LIST
    {
      id: generateContentId(),
      title: "10 Must-Visit Museums in Rio",
      description:
        "Curated collection of Rio's best museums for art, history, and culture lovers. From contemporary art to colonial history.",
      coverImage: "https://picsum.photos/seed/museums-guide/400/600",
      guideType: "list",
      categories: ["culture"],
      tags: ["must-see", "wheelchair-accessible", "family-friendly"],
      recommended: true,
      items: [
        { type: "place", id: christRedeemerId, note: "World-class contemporary art museum designed by Oscar Niemeyer" },
        { type: "place", id: botanicalGardenId, note: "Beautiful imperial palace in the Botanical Garden area" },
        { type: "place", id: selaronId, note: "Stunning architecture and interactive science exhibits" },
      ],
      featured: true,
      status: "published",
      publishedAt: "2025-01-16T00:00:00Z",
      createdAt: "2025-01-16T00:00:00Z",
      order: 2,
    },
    // ARTICLE - Sports
    {
      id: generateContentId(),
      title: "Guide to Maracan\xE3 Stadium",
      description:
        "Everything you need to know about visiting Brazil's most legendary football stadium - tours, matches, and history.",
      coverImage: "https://picsum.photos/seed/maracana-guide/400/600",
      guideType: "article",
      categories: ["sports", "culture"],
      tags: ["must-see", "wheelchair-accessible", "local-favorite"],
      body: \`The Maracan\xE3 Stadium is more than just a football venue - it's a temple of Brazilian passion and history.

## History
Built for the 1950 FIFA World Cup, Maracan\xE3 was once the largest stadium in the world, holding nearly 200,000 fans. Today, after renovations for the 2014 World Cup and 2016 Olympics, it seats about 78,000 but remains one of the most iconic sports venues on Earth.

## Stadium Tours
Tours run daily from 9am to 5pm (except match days). You'll walk through the locker rooms, touch the grass, see the trophy room, and sit in the press area. The tour takes about 40 minutes.

Ticket prices:
- Adults: R$65
- Students/Seniors: R$32

## Watching a Match
Nothing compares to experiencing a live match at Maracan\xE3. The atmosphere when Flamengo or Fluminense play is electric. Tickets are available on club websites or at the stadium on match days.

## Getting There
- Metro: Maracan\xE3 station (Line 2)
- Address: Av. Pres. Castelo Branco, Port\xE3o 3

## Tips
- Arrive early on match days (gates open 2 hours before)
- Wear your team's colors if you have one!
- Don't miss the Hall of Fame section
- The museum shop has great souvenirs\`,
      status: "published",
      featured: false,
      publishedAt: "2025-01-17T00:00:00Z",
      createdAt: "2025-01-17T00:00:00Z",
      order: 3,
    },
    // LIST - Hiking
    {
      id: generateContentId(),
      title: "Best Hiking Trails Near Rio",
      description:
        "From beginner-friendly walks to challenging climbs - discover Rio's incredible natural beauty beyond the beaches.",
      coverImage: "https://picsum.photos/seed/hiking-guide/400/600",
      guideType: "list",
      categories: ["hiking"],
      tags: ["adventure", "free-entry", "must-see"],
      items: [
        { type: "place", id: sugarloafId, note: "Moderate 3-hour hike with stunning views of Sugarloaf and Guanabara Bay" },
        { type: "place", id: botanicalGardenId, note: "Easy walk through Atlantic Forest to a beautiful waterfall" },
        { type: "place", id: christRedeemerId, note: "Challenging climb but the 360\xB0 views are unforgettable" },
      ],
      status: "published",
      featured: false,
      publishedAt: "2025-01-18T00:00:00Z",
      createdAt: "2025-01-18T00:00:00Z",
      order: 4,
    },
    // ARTICLE - Parties/Dancing
    {
      id: generateContentId(),
      title: "Lapa Nightlife: The Ultimate Guide",
      description:
        "Navigate Rio's most vibrant neighborhood for samba, live music, and unforgettable nights under the famous arches.",
      coverImage: "https://picsum.photos/seed/lapa-guide/400/600",
      guideType: "article",
      categories: ["parties", "dancing"],
      tags: ["party", "local-favorite", "must-see"],
      recommended: true,
      body: \`Lapa is the beating heart of Rio's nightlife. This historic neighborhood transforms every weekend into one giant street party.

## The Arcos da Lapa
The iconic 18th-century aqueduct arches are the neighborhood's landmark. On Friday and Saturday nights, the streets below fill with thousands of people, live samba bands, and countless bars and clubs.

## Best Nights to Go
- **Monday & Friday**: Pedra do Sal - authentic samba in the historic port area
- **Friday & Saturday**: Full Lapa experience - streets packed, all venues open
- **Sunday**: Feira de Antiguidades (antique fair) during the day, quieter nights

## Top Venues
1. **Rio Scenarium** - Three floors of antiques and live samba
2. **Carioca da Gema** - Intimate venue for quality samba
3. **Circo Voador** - Larger concerts and events
4. **Leviano Bar** - Great for starting the night

## What to Expect
- Things don't get going until 11pm-midnight
- Most bars have live music (no cover, but drink minimums)
- Street vendors sell caipirinhas and beer
- It's crowded - watch your belongings
- Take Uber/taxi home

## Safety Tips
- Go in groups
- Don't flash expensive phones or jewelry
- Use official taxis or ride apps
- Stick to well-lit, busy areas
- The party goes until 4-5am!\`,
      status: "published",
      featured: false,
      publishedAt: "2025-01-19T00:00:00Z",
      createdAt: "2025-01-19T00:00:00Z",
      order: 5,
    },
  ],
  users,
});
`,mimeType:"text/javascript"},"/$app/model/slug.js":{content:`/**
 * @file Slug Utilities
 * @description Utilities for generating URL-friendly slugs from strings
 */

/**
 * Convert a string to a URL-friendly slug
 * @param {string} str - String to slugify
 * @returns {string} URL-friendly slug
 * @example
 * slugify("Hello World!") // "hello-world"
 * slugify("Caf\xE9 & A\xE7a\xED") // "cafe-acai"
 */
export const slugify = (str) => {
  if (!str || typeof str !== "string") return "";

  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9]+/g, "-") // non-alphanumeric -> hyphen
    .replace(/^-|-$/g, "") // trim leading/trailing hyphens
    .replace(/-+/g, "-"); // collapse multiple hyphens
};

/**
 * Generate a unique slug by checking against existing records
 * Appends -1, -2, etc. if duplicates exist
 * @param {Object} adapter - Database adapter instance
 * @param {string} model - Model name
 * @param {string} field - Slug field name
 * @param {string} value - Source value to slugify
 * @param {string|number|null} [excludeId=null] - ID to exclude from duplicate check (for edits)
 * @returns {Promise<string>} Unique slug
 * @example
 * await generateUniqueSlug(adapter, "places", "slug", "My Place") // "my-place"
 * await generateUniqueSlug(adapter, "places", "slug", "My Place") // "my-place-1" (if "my-place" exists)
 */
export const generateUniqueSlug = async (
  adapter,
  model,
  field,
  value,
  excludeId = null,
) => {
  const base = slugify(value);
  if (!base) return "";

  let candidate = base;
  let suffix = 0;

  while (true) {
    const existing = await adapter.getAll(model, {
      where: { [field]: candidate },
      limit: 1,
    });

    // No conflict, or only conflict is self (edit case)
    if (!existing.length || existing[0].id === excludeId) {
      return candidate;
    }

    suffix++;
    candidate = \`\${base}-\${suffix}\`;
  }
};

/**
 * Create reusable hooks for auto-generating slugs
 * @param {string} [sourceField="name"] - Field to generate slug from
 * @param {string} [slugField="slug"] - Field to store slug in
 * @returns {Object} Hooks object with beforeAdd and beforeEdit
 * @example
 * // In schema.js
 * import { slugHooks } from "/$app/model/slug.js";
 *
 * places: {
 *   $hooks: slugHooks("name", "slug"),
 *   name: T.string({ required: true }),
 *   slug: T.string({ index: true, immutable: true }),
 * }
 */
export const slugHooks = (sourceField = "name", slugField = "slug") => ({
  beforeAdd: async (data, { model, adapter }) => {
    if (!data[slugField] && data[sourceField]) {
      data[slugField] = await generateUniqueSlug(
        adapter,
        model,
        slugField,
        data[sourceField],
      );
    }
    return data;
  },
  beforeEdit: async (data, { model, adapter }) => {
    // Only regenerate slug if source field changed and slug not manually provided
    // Note: If slug field is immutable, it will be stripped anyway
    if (data[sourceField] && !data[slugField]) {
      data[slugField] = await generateUniqueSlug(
        adapter,
        model,
        slugField,
        data[sourceField],
        data.id,
      );
    }
    return data;
  },
});

export default { slugify, generateUniqueSlug, slugHooks };
`,mimeType:"text/javascript"},"/$app/cms/types.js":{content:`/**
 * @bootstrapp/cms - Type Extensions
 * Adds CMS-specific field types for content management
 */

/**
 * Rich text field (Markdown with preview)
 * Usage:
 *   T.richText()                        // Default markdown editor
 *   T.richText({ editor: "wysiwyg" })   // WYSIWYG editor
 *   T.richText({ required: true })      // Required field
 */
const createRichText = (options = {}) => {
  return {
    type: "string",
    cmsType: "richText",
    editor: options.editor || "markdown",
    persist: true,
    attribute: false,
    defaultValue: "",
    ...options,
  };
};

/**
 * Media field (image URL with picker)
 * Usage:
 *   T.media()                           // Default image picker
 *   T.media({ accept: "image/png" })    // Specific file types
 *   T.media({ maxSize: 2 * 1024 * 1024 }) // 2MB limit
 */
const createMedia = (options = {}) => {
  return {
    type: "string",
    cmsType: "media",
    accept: options.accept || "image/*",
    maxSize: options.maxSize || 5 * 1024 * 1024, // 5MB default
    persist: true,
    attribute: false,
    defaultValue: "",
    ...options,
  };
};

/**
 * SEO object field with meta title, description, and og:image
 * Usage:
 *   T.seo()                             // Default SEO fields
 *   T.seo({ required: true })           // Required SEO
 */
const createSeo = (options = {}) => {
  return {
    type: "object",
    cmsType: "seo",
    persist: true,
    attribute: false,
    defaultValue: {
      metaTitle: "",
      metaDescription: "",
      ogImage: "",
      ...(options.defaultValue || {}),
    },
    ...options,
  };
};

/**
 * Publishing status enum
 * Usage:
 *   T.publishStatus()                   // Default: draft
 *   T.publishStatus({ defaultValue: "published" })
 */
const createPublishStatus = (options = {}) => {
  return {
    type: "string",
    cmsType: "publishStatus",
    persist: true,
    attribute: true,
    defaultValue: options.defaultValue || "draft",
    enum: ["draft", "published", "scheduled"],
    index: true,
    ...options,
  };
};

/**
 * CMS types extension object
 * Register with T.registerExtension(cmsTypes)
 */
const cmsTypes = {
  types: {
    richText: createRichText,
    media: createMedia,
    seo: createSeo,
    publishStatus: createPublishStatus,
  },
};

export default cmsTypes;
export { createRichText, createMedia, createSeo, createPublishStatus };
`,mimeType:"text/javascript"},"/$app/types/index.js":{content:`/**
 * @file Type System - Type validation and coercion
 * @description Provides type definitions, validation, and conversion utilities
 * for model fields and component properties. Supports primitive types,
 * relationships, and custom validators.
 */

import timestampExt from "./timestamp.js";

/** @type {Object<string, RegExp>} Format validation patterns */
const formats = { email: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/ };

/**
 * Safely parses JSON with fallback
 * @private
 * @param {string} value - String to parse
 * @returns {*} Parsed value or undefined
 */
const parseJSON = (value) => {
  try {
    return value in specialCases ? value : JSON.parse(value);
  } catch (_) {
    return undefined;
  }
};

/**
 * Special case values for type conversion
 * @private
 * @type {Object}
 */
const specialCases = {
  undefined: undefined,
  null: null,
  "": null,
  [undefined]: undefined,
};

/**
 * Type conversion handlers for each supported type
 * @private
 * @type {Object<string, Function>}
 */
const typeHandlers = {
  any: (value) => value,
  function: (value) => value,
  boolean: (value, { attribute = true } = {}) =>
    (attribute && value === "") || ["true", 1, "1", true].includes(value),
  string: (val) => (val in specialCases ? specialCases[val] : String(val)),
  array: (value, prop = {}) => {
    if (Array.isArray(value)) return value;
    const { itemType } = prop;
    try {
      if (!value) throw value;
      const parsedArray = parseJSON(value);
      if (!Array.isArray(parsedArray)) throw parsedArray;
      return !itemType
        ? parsedArray
        : parsedArray.map((item) =>
            typeof item !== "object"
              ? item
              : Object.entries(item).reduce((obj, [key, val]) => {
                  obj[key] = typeHandlers[itemType[key]?.type]
                    ? typeHandlers[itemType[key].type](val, prop)
                    : val;
                  return obj;
                }, {}),
          );
    } catch (_) {
      return [];
    }
  },
  number: (value) => {
    return value === null || value === undefined || value === ""
      ? value
      : Number(value);
  },
  date: (value) => {
    if (!value) return null;
    if (value instanceof Date) return value;
    return new Date(value);
  },
  datetime: (value) => {
    if (!value) return null;
    if (value instanceof Date) return value;
    const date = new Date(value);
    return date;
  },
  object: (v, prop = {}) => {
    if (v === null) return null;
    const value = typeof v === "string" ? parseJSON(v) : v;
    if (prop.properties && value && typeof value === "object") {
      Object.entries(prop.properties).map(([propKey, propProps]) => {
        if (
          propProps.defaultValue !== undefined &&
          value[propKey] === undefined
        ) {
          value[propKey] = propProps.defaultValue;
        }
      });
    }
    return value;
  },
};

const parse = (value, prop = {}) => {
  const { type } = prop;
  return (typeHandlers[type] || ((val) => val))(value, prop);
};

const validations = {
  datetime: (value, prop = {}) => {
    if (value === null) {
      return prop.required ? ["required", null] : null;
    }
    if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
      return ["invalid", "invalid datetime"];
    }
    if (prop.min && value < new Date(prop.min)) {
      return ["minimum", null];
    }
    if (prop.max && value > new Date(prop.max)) {
      return ["maximum", null];
    }
  },
  date: (value, prop = {}) => {
    if (value === null) {
      return prop.required ? ["required", null] : null;
    }
    if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
      return ["invalid", "invalid date"];
    }
    if (prop.min && value < new Date(prop.min)) {
      return ["minimum", null];
    }
    if (prop.max && value > new Date(prop.max)) {
      return ["maximum", null];
    }
  },
  object: (value, prop = {}) => {
    if (value === null) {
      return prop.required
        ? ["required", null]
        : ["invalid", "null is not an object"];
    }
    if (typeof value !== "object" || Array.isArray(value)) {
      return ["invalid", "not an object"];
    }
  },
  number: (value, prop = {}) => {
    if (Number.isNaN(Number(value))) {
      if (
        !prop.required &&
        (value === null || value === undefined || value === "")
      ) {
        return null;
      }
      return ["NaN", null];
    }
    if ("min" in prop && value < prop.min) {
      return ["minimum", null];
    }
    if ("max" in prop && value > prop.max) {
      return ["maximum", null];
    }
  },
};

const validateField = (value, prop, context = {}) => {
  if (value === undefined && prop.defaultValue !== undefined) {
    value = prop.defaultValue;
  }

  if (
    prop.required === true &&
    (value === undefined || value === null || value === "")
  )
    return ["required", null];
  if (prop.customValidator) {
    const result = prop.customValidator(value, prop, context);
    if (result) return result;
  }
  if (prop.relationship) {
    if (prop.many) {
      return [
        null,
        Array.isArray(value)
          ? value.map((i) => (prop.mixed ? i : (i?.id ?? i)))
          : [],
      ];
    }
    return [null, value?.id ?? value];
  }
  const typeHandler = typeHandlers[prop.type];
  let typedValue = typeHandler ? typeHandler(value, prop) : value;
  if (
    (value === undefined || value === null || value === "") &&
    prop.defaultValue !== undefined
  )
    typedValue = prop.defaultValue;

  if (
    prop.required === true &&
    (typedValue === undefined || typedValue === null || typedValue === "")
  )
    return ["required", null];
  if (!prop.required && (typedValue === null || typedValue === undefined)) {
    if (prop.type === "object" && typedValue === null) {
    } else return [null, typedValue];
  }

  const validation = validations[prop.type];
  if (validation) {
    const errors = validation(typedValue, prop);
    if (errors) return errors;
  }

  if (prop.format) {
    const formatFn =
      formats[prop.format] ||
      (typeof prop.format === "function" ? prop.format : null);

    if (formatFn) {
      const format =
        typeof formatFn === "function"
          ? formatFn
          : (value) => formatFn.test(value);
      const isValid = format(typedValue);
      if (!isValid) return ["invalid", \`invalid format: \${prop.format}\`];
    }
  }

  return [null, typedValue];
};

/**
 * Prototype for methods to be attached to type definition objects.
 * @private
 */
const TypeDefinitionPrototype = {
  /**
   * Validates a value against this type definition.
   * @param {*} value - The value to validate.
   * @param {Object} [context={}] - Additional context for validation.
   * @returns {{valid: boolean, value: *, error: string|null, details: *|null}}
   */
  validate(value, context = {}) {
    const [error, result] = validateField(value, this, context);

    if (error) {
      return {
        valid: false,
        error: error,
        details: result,
        value: value,
      };
    }

    return {
      valid: true,
      value: result,
      error: null,
      details: null,
    };
  },
};

function interpolate(str, data) {
  return str.replace(/\\\${(.*?)}/g, (_, key) => {
    return data[key.trim()];
  });
}

/**
 * Validates an object against a type schema
 * @param {Object} object - Object to validate
 * @param {Object} options - Validation options
 * @param {Object} options.schema - Type schema to validate against
 * @param {Object} [options.row={}] - Original row data for context
 * @param {boolean} [options.undefinedProps=true] - Validate undefined props
 * @param {boolean} [options.validateVirtual=false] - Validate virtual properties
 * @param {string} [options.operation=null] - Operation context (add, edit, etc.)
 * @returns {Array} [errors, validatedObject] tuple
 */
const validateType = (
  object,
  {
    schema,
    row = {},
    undefinedProps = true,
    validateVirtual = false,
    operation = null,
  },
) => {
  if (!schema) return [null, object];
  const errors = {};
  let hasError = false;

  const context = { operation, row };

  const props = undefinedProps ? schema : object;
  for (const key in props) {
    const prop = { ...schema[key], key };
    if ("virtual" in prop || prop.persist === false) continue;
    const shouldValidate =
      prop.customValidator || object[key] !== undefined || prop.required;

    const [error, value] = shouldValidate
      ? validateField(object[key], prop, context)
      : [null, prop.defaultValue];

    if (error) {
      hasError = true;
      errors[key] = error;
    } else if (value !== undefined) object[key] = value;
  }
  const virtual = Object.fromEntries(
    Object.entries(schema).filter(([_, prop]) => "virtual" in prop),
  );
  for (const prop in virtual) {
    if (validateVirtual) {
      const [error, value] = validateField(
        interpolate(virtual[prop].virtual, { ...row, ...object }),
        virtual[prop],
        context,
      );
      if (error) {
        hasError = true;
        errors[prop] = error;
      } else if (value !== undefined) object[prop] = value;
    } else
      object[prop] = interpolate(virtual[prop].virtual, { ...row, ...object });
  }

  if (hasError) return [errors, null];
  return [null, object];
};

/**
 * Creates a type definition object
 * @param {string} type - Type name (string, number, boolean, etc.)
 * @param {*|Object} options - Default value or options object
 * @returns {Object} Type definition
 */
const createType = (type, options) => {
  const normalizedOptions =
    typeof options === "object" && !Array.isArray(options) && options !== null
      ? options
      : { defaultValue: options };

  const typeDef = {
    type,
    persist: true,
    attribute: !["array", "object", "function"].includes(type),
    ...normalizedOptions,
  };

  Object.setPrototypeOf(typeDef, TypeDefinitionPrototype);

  return typeDef;
};

/**
 * Type system helper functions
 * @type {Object}
 */
const typesHelpers = {
  createType,
  parse,
  validateType,
};

/** @type {Object} Extension registry for custom type creators */
const customTypeCreators = {};

/**
 * Registers a type system extension
 * @param {Object} extension - Extension object with types property
 * @param {Object} [extension.types] - Custom type creator functions
 */
const registerExtension = (extension) => {
  if (extension.types) {
    Object.assign(customTypeCreators, extension.types);
  }
};

typesHelpers.registerExtension = registerExtension;

/**
 * Creates a relationship type factory function
 * @private
 * @param {string} relationship - Relationship type (belongs, many, one, etc.)
 * @returns {Function} Type factory function
 */
const createRelationType =
  (relationship) =>
  (...args) => {
    const targetModel = args[0];
    let targetForeignKey;
    let options = args[2];
    if (typeof args[1] === "string") targetForeignKey = args[1];
    else options = args[1];
    const belongs = belongTypes.includes(relationship);

    const typeDef = {
      type: belongs
        ? relationship === "belongs_many"
          ? "array"
          : "string"
        : relationship === "one"
          ? "string"
          : "array",
      many: manyTypes.includes(relationship),
      belongs,
      persist: belongs,
      relationship,
      defaultValue: relationship === "belongs_many" ? [] : null,
      polymorphic: targetModel === "*" || Array.isArray(targetModel),
      targetModel,
      targetForeignKey,
      index: belongTypes.includes(relationship),
      ...options,
    };

    Object.setPrototypeOf(typeDef, TypeDefinitionPrototype);

    return typeDef;
  };

const relationshipTypes = ["one", "many", "belongs", "belongs_many"];
const manyTypes = ["many", "belongs_many"];
const belongTypes = ["belongs", "belongs_many"];
const proxyHandler = {
  get(target, prop) {
    if (target[prop]) return target[prop];
    if (customTypeCreators[prop]) return customTypeCreators[prop];

    const type = prop.toLowerCase();
    if (relationshipTypes.includes(prop)) return createRelationType(prop);
    return (options = {}) => {
      if (!typeHandlers[type]) throw new Error(\`Unknown type: \${type}\`);
      return createType(type, options);
    };
  },
};

const Types = new Proxy(typesHelpers, proxyHandler);

Types.registerExtension(timestampExt);
export default Types;
`,mimeType:"text/javascript"},"/$app/cms/schema.js":{content:`/**
 * @bootstrapp/cms - Schema Definitions
 * Provides the media model and CMS-specific field definitions
 */

import T from "/$app/types/index.js";
import $APP from "/$app.js";

/**
 * Get all CMS-enabled models from the app schema
 * @returns {string[]} Array of model names that have $cms: true
 */
export const getCmsModels = () => {
  return Object.entries($APP.models)
    .filter(([_, schema]) => schema.$cms === true)
    .map(([name]) => name);
};

/**
 * CMS models schema
 * Projects can merge this into their own models via Object spread
 *
 * Usage:
 *   import { cmsModels } from "@bootstrapp/cms/schema.js";
 *   $APP.models.set({ ...cmsModels, ...myModels });
 */
export const cmsModels = {
  /**
   * Media library model
   * Stores uploaded media files (images, documents, etc.)
   */
  cms_media: {
    id: T.string({ required: true }),
    url: T.string({ required: true }),
    name: T.string({ required: true }),
    alt: T.string({ defaultValue: "" }),
    size: T.number({ defaultValue: 0 }),
    type: T.string({ defaultValue: "image/jpeg" }),
    width: T.number(),
    height: T.number(),
    folder: T.string({ defaultValue: "", index: true }),
    tags: T.array({ defaultValue: [], index: true }),
    createdAt: T.string({ required: true, index: true }),
    updatedAt: T.string({ index: true }),
  },
};

/**
 * CMS field mixin for content models
 * Add these fields to any model that needs CMS features
 *
 * Usage:
 *   import { cmsFields } from "@bootstrapp/cms/schema.js";
 *   $APP.models.set({
 *     posts: {
 *       $cms: true,
 *       ...cmsFields,
 *       title: T.string({ required: true }),
 *       // ... other fields
 *     }
 *   });
 */
export const cmsFields = {
  // Publishing workflow
  status: T.string({
    defaultValue: "draft",
    enum: ["draft", "published", "scheduled"],
    index: true,
  }),
  publishedAt: T.string({ index: true }),
  scheduledAt: T.string({ index: true }),

  // SEO fields
  seo: T.object({
    attribute: false,
    defaultValue: {
      metaTitle: "",
      metaDescription: "",
      ogImage: "",
    },
  }),
};

export default { cmsModels, cmsFields };
`,mimeType:"text/javascript"},"/$app/types/timestamp.js":{content:`// ============================================================================
// Timestamp Extension
// Adds T.timestamp() with auto-creation and auto-update support
// ============================================================================

/**
 * Timestamp validator with auto-creation and auto-update logic
 * - Auto-creates timestamp on create operation if value is empty
 * - Auto-updates timestamp on update operation if \`update: true\` option is set
 * - Stores as unix timestamp (milliseconds since epoch)
 */
const timestampValidator = (value, prop, context = {}) => {
  const { operation } = context;
  const currentTime = Date.now();

  if (prop.update === true) {
    return [null, currentTime];
  }

  // Auto-create logic: create on insert if no value provided
  if (
    operation === "create" &&
    prop.create !== false &&
    (!value || value === "")
  ) {
    return [null, currentTime];
  }

  // If value is provided, validate and convert it
  if (value) {
    let timestamp;

    // Convert Date objects to timestamp
    if (value instanceof Date) {
      timestamp = value.getTime();
    }
    // Convert string dates to timestamp
    else if (typeof value === "string") {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        return ["invalid_timestamp", null];
      }
      timestamp = date.getTime();
    }
    // Keep numbers as-is
    else if (typeof value === "number") {
      timestamp = value;
    } else {
      return ["invalid_timestamp", null];
    }

    // Check min/max constraints
    if (prop.min && timestamp < prop.min) {
      return ["minimum", null];
    }
    if (prop.max && timestamp > prop.max) {
      return ["maximum", null];
    }

    return [null, timestamp];
  }

  // No value and no auto-create
  return [null, null];
};

/**
 * Timestamp type creator
 * Usage:
 *   T.timestamp()                 // Auto-creates on insert only
 *   T.timestamp({ update: true }) // Auto-creates on insert, auto-updates on every update
 *   T.timestamp({ index: true })  // With database index
 *
 * Stores timestamps as numbers (milliseconds since epoch)
 */
const createTimestamp = (options = {}) => {
  return {
    type: "number",
    timestamp: true,
    index: true,
    persist: true,
    attribute: true,
    customValidator: timestampValidator,
    ...options,
  };
};

export default {
  types: {
    timestamp: createTimestamp,
  },
};
`,mimeType:"text/javascript"},"/$app/model/schema-loader.js":{content:`/**
 * Schema Loader Utility
 * Discovers and loads module schemas from @bootstrapp/* dependencies
 */

/**
 * Discover modules with bootstrapp.schema: true in their package.json
 * @param {object} projectPackageJson - The project's package.json content
 * @returns {Promise<Array<{name: string, packageName: string, namespace: boolean}>>}
 */
export async function discoverSchemaModules(projectPackageJson) {
  const modules = [];
  const deps = {
    ...projectPackageJson.dependencies,
    ...projectPackageJson.devDependencies,
  };

  for (const [depName] of Object.entries(deps)) {
    if (!depName.startsWith("@bootstrapp/")) continue;

    try {
      const pkgRes = await fetch(\`/node_modules/\${depName}/package.json\`);
      if (!pkgRes.ok) continue;

      const pkg = await pkgRes.json();

      if (pkg?.bootstrapp?.schema === true) {
        const moduleName = depName.replace("@bootstrapp/", "");
        modules.push({
          name: moduleName,
          packageName: depName,
          namespace: pkg.bootstrapp.namespace !== false,
        });
      }
    } catch (e) {
      console.warn(\`Failed to check schema for \${depName}:\`, e);
    }
  }

  return modules;
}

/**
 * Apply namespace prefix to model names
 * @param {object} models - Original models object
 * @param {string} namespace - Namespace prefix
 * @returns {object} Namespaced models
 */
export function namespaceModels(models, namespace) {
  if (!namespace) return models;

  const namespaced = {};
  const modelNames = Object.keys(models);

  for (const [modelName, modelDef] of Object.entries(models)) {
    const namespacedName = \`\${namespace}_\${modelName}\`;
    namespaced[namespacedName] = updateRelationshipRefs(
      { ...modelDef },
      namespace,
      modelNames
    );
  }

  return namespaced;
}

/**
 * Apply namespace prefix to seed data keys
 * @param {object} data - Original data object
 * @param {string} namespace - Namespace prefix
 * @returns {object} Namespaced data
 */
export function namespaceData(data, namespace) {
  if (!namespace) return data;

  const namespaced = {};

  for (const [modelName, records] of Object.entries(data)) {
    const namespacedName = \`\${namespace}_\${modelName}\`;
    namespaced[namespacedName] = records;
  }

  return namespaced;
}

/**
 * Update relationship references to use namespaced model names
 * @param {object} modelDef - Model definition
 * @param {string} namespace - Namespace prefix
 * @param {string[]} modelNames - List of model names in this module
 * @returns {object} Updated model definition
 */
function updateRelationshipRefs(modelDef, namespace, modelNames) {
  const updated = { ...modelDef };

  for (const [fieldName, fieldDef] of Object.entries(updated)) {
    if (!fieldDef || typeof fieldDef !== "object") continue;

    // Handle T.belongs, T.many, T.one, T.belongs_many relationships
    if (fieldDef.targetModel && modelNames.includes(fieldDef.targetModel)) {
      updated[fieldName] = {
        ...fieldDef,
        targetModel: \`\${namespace}_\${fieldDef.targetModel}\`,
      };
    }
  }

  return updated;
}
`,mimeType:"text/javascript"},"/node_modules/@bootstrapp/bundler/models/schema.js":{content:`import T from "/$app/types/index.js";

export default {
  credentials: {
    // GitHub credentials
    owner: T.string(),
    repo: T.string(),
    branch: T.string({ defaultValue: "main" }),
    token: T.string(),
    // VPS credentials
    vps: T.object({ defaultValue: {} }),
  },
  releases: {
    version: T.string({
      index: true,
    }),
    notes: T.string(),
    status: T.string({
      enum: ["pending", "success", "failed"],
      defaultValue: "pending",
    }),
    deployType: T.string({
      enum: ["spa", "ssg", "hybrid", "worker"],
      defaultValue: "hybrid",
    }),
    deployTarget: T.string({
      enum: ["github", "cloudflare", "zip", "targz", "localhost", "vps"],
      defaultValue: "localhost",
    }),
    deployedAt: T.string(),
    files: T.array(),
    result: T.object(),
    buildId: T.string(), // For versioned builds
  },
};
`,mimeType:"text/javascript"},"/node_modules/@bootstrapp/auth/package.json":{content:`{
  "name": "@bootstrapp/auth",
  "version": "0.2.0",
  "description": "Authentication module with session persistence, OAuth, and cross-tab sync",
  "main": "./index.js",
  "module": "./index.js",
  "type": "module",
  "exports": {
    ".": "./index.js",
    "./frontend": "./frontend.js",
    "./backend": "./backend.js"
  },
  "keywords": [
    "auth",
    "authentication",
    "session",
    "oauth",
    "pocketbase",
    "bootstrapp"
  ],
  "author": "Alan Leal",
  "license": "AGPL-3.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/bootstrapp-ai/bootstrapp.git",
    "directory": "public/auth"
  },
  "homepage": "https://github.com/bootstrapp-ai/bootstrapp#readme",
  "bugs": {
    "url": "https://github.com/bootstrapp-ai/bootstrapp/issues"
  },
  "dependencies": {
    "@bootstrapp/events": "^0.2.0"
  }
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/base/package.json":{content:`{
  "name": "@bootstrapp/base",
  "version": "0.2.0",
  "description": "Bootstrapp MVC Framework - app shell and meta package",
  "main": "./index.js",
  "module": "./index.js",
  "type": "module",
  "exports": {
    ".": "./index.js",
    "./app": "./app.js",
    "./frontend": "./frontend.js",
    "./backend": "./backend.js",
    "./config": "./config.js",
    "./apploader": "./apploader.js",
    "./bootstrapp": "./bootstrapp.js",
    "./backend/backend": "./backend/backend.js",
    "./backend/frontend": "./backend/frontend.js",
    "./app/*": "./app/*",
    "./test/*": "./test/*"
  },
  "keywords": [
    "bootstrapp",
    "framework",
    "web-components",
    "pocketbase",
    "offline-first"
  ],
  "author": "Alan Leal",
  "license": "AGPL-3.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/bootstrapp-ai/bootstrapp.git",
    "directory": "public/base"
  },
  "homepage": "https://github.com/bootstrapp-ai/bootstrapp#readme",
  "bugs": {
    "url": "https://github.com/bootstrapp-ai/bootstrapp/issues"
  },
  "dependencies": {
    "@bootstrapp/types": "^0.2.0",
    "@bootstrapp/events": "^0.2.0",
    "@bootstrapp/view": "^0.2.0",
    "@bootstrapp/router": "^0.1.0",
    "@bootstrapp/controller": "^0.2.0",
    "@bootstrapp/theme": "^0.2.0",
    "@bootstrapp/model": "^0.2.0",
    "@bootstrapp/auth": "^0.2.0",
    "@bootstrapp/sw": "^0.2.0"
  }
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/model/package.json":{content:`{
  "name": "@bootstrapp/model",
  "version": "0.2.0",
  "description": "ORM-like data layer with reactive arrays, proxy-based API, and subscription management",
  "main": "./index.js",
  "module": "./index.js",
  "type": "module",
  "exports": {
    ".": "./index.js",
    "./frontend": "./frontend.js",
    "./backend": "./backend.js",
    "./subscription-manager": "./subscription-manager.js",
    "./query-builder": "./query-builder.js",
    "./row-utils": "./row-utils.js",
    "./factory": "./factory.js",
    "./adapter-base": "./adapter-base.js"
  },
  "keywords": [
    "orm",
    "model",
    "data-layer",
    "reactive",
    "proxy",
    "subscriptions",
    "bootstrapp"
  ],
  "author": "Alan Leal",
  "license": "AGPL-3.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/bootstrapp-ai/bootstrapp.git",
    "directory": "public/model"
  },
  "homepage": "https://github.com/bootstrapp-ai/bootstrapp#readme",
  "bugs": {
    "url": "https://github.com/bootstrapp-ai/bootstrapp/issues"
  },
  "dependencies": {
    "@bootstrapp/events": "^0.2.0"
  }
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/model-indexeddb/package.json":{content:`{
  "name": "@bootstrapp/model-indexeddb",
  "version": "0.2.0",
  "description": "IndexedDB database adapter for @bootstrapp/model with offline-first support",
  "main": "./index.js",
  "module": "./index.js",
  "type": "module",
  "exports": {
    ".": "./index.js",
    "./adapter": "./adapter.js",
    "./system-model-manager": "./system-model-manager.js"
  },
  "keywords": [
    "indexeddb",
    "database",
    "adapter",
    "offline-first",
    "orm",
    "bootstrapp"
  ],
  "author": "Alan Leal",
  "license": "AGPL-3.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/bootstrapp-ai/bootstrapp.git",
    "directory": "public/model-indexeddb"
  },
  "homepage": "https://github.com/bootstrapp-ai/bootstrapp#readme",
  "bugs": {
    "url": "https://github.com/bootstrapp-ai/bootstrapp/issues"
  },
  "dependencies": {
    "@bootstrapp/model": "^0.2.0"
  }
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/sw/package.json":{content:`{
  "name": "@bootstrapp/sw",
  "version": "0.2.0",
  "description": "Service Worker module with caching, messaging, and filesystem API",
  "main": "./index.js",
  "module": "./index.js",
  "type": "module",
  "exports": {
    ".": "./index.js",
    "./frontend": "./frontend.js",
    "./backend": "./backend.js",
    "./adapter": "./adapter.js",
    "./filesystem": "./filesystem.js"
  },
  "keywords": [
    "service-worker",
    "sw",
    "cache",
    "offline",
    "filesystem",
    "bootstrapp"
  ],
  "author": "Alan Leal",
  "license": "AGPL-3.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/bootstrapp-ai/bootstrapp.git",
    "directory": "public/sw"
  },
  "homepage": "https://github.com/bootstrapp-ai/bootstrapp#readme",
  "bugs": {
    "url": "https://github.com/bootstrapp-ai/bootstrapp/issues"
  },
  "dependencies": {
    "@bootstrapp/events": "^0.2.0"
  }
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/controller/package.json":{content:`{
  "name": "@bootstrapp/controller",
  "version": "0.2.0",
  "description": "Reactive state management with storage, URL, and custom adapters",
  "main": "./index.js",
  "module": "./index.js",
  "type": "module",
  "exports": {
    ".": "./index.js",
    "./sync": "./sync.js",
    "./sync-factory": "./sync-factory.js",
    "./adapters/storage": "./adapters/storage.js",
    "./adapters/url": "./adapters/url.js",
    "./app": "./app.js"
  },
  "keywords": [
    "state-management",
    "reactive",
    "storage",
    "url-state",
    "controller",
    "bootstrapp"
  ],
  "author": "Alan Leal",
  "license": "AGPL-3.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/bootstrapp-ai/bootstrapp.git",
    "directory": "public/controller"
  },
  "homepage": "https://github.com/bootstrapp-ai/bootstrapp#readme",
  "bugs": {
    "url": "https://github.com/bootstrapp-ai/bootstrapp/issues"
  },
  "dependencies": {
    "@bootstrapp/events": "^0.2.0"
  }
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/events/package.json":{content:`{
  "name": "@bootstrapp/events",
  "version": "0.2.0",
  "description": "Lightweight event system with pub/sub pattern and event handler installation",
  "main": "./index.js",
  "module": "./index.js",
  "type": "module",
  "exports": {
    ".": "./index.js"
  },
  "keywords": [
    "events",
    "pub-sub",
    "event-emitter",
    "observer-pattern",
    "bootstrapp"
  ],
  "author": "Alan Leal",
  "license": "AGPL-3.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/bootstrapp-ai/bootstrapp.git",
    "directory": "public/events"
  },
  "homepage": "https://github.com/bootstrapp-ai/bootstrapp#readme",
  "bugs": {
    "url": "https://github.com/bootstrapp-ai/bootstrapp/issues"
  }
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/i18n/package.json":{content:`{
  "name": "@bootstrapp/i18n",
  "version": "0.2.0",
  "description": "Internationalization (i18n) module for Bootstrapp framework",
  "type": "module",
  "main": "index.js",
  "exports": {
    ".": "./index.js",
    "./base": "./base.js",
    "./view-plugin": "./view-plugin.js"
  },
  "dependencies": {
    "@bootstrapp/controller": "^0.2.0",
    "@bootstrapp/view": "^0.2.0"
  },
  "keywords": [
    "bootstrapp",
    "i18n",
    "internationalization",
    "localization",
    "translation"
  ],
  "author": "Alan Leal",
  "license": "AGPL-3.0"
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/icon-lucide/package.json":{content:`{
  "name": "@bootstrapp/icon-lucide",
  "version": "0.0.1",
  "type": "module",
  "description": "Lucide icon library for Bootstrapp framework",
  "main": "index.js",
  "exports": {
    ".": "./index.js",
    "./lucide/*": "./lucide/*",
    "./app.js": "./app.js"
  },
  "dependencies": {
    "@bootstrapp/base": "^0.2.0"
  }
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/router/package.json":{content:`{
  "name": "@bootstrapp/router",
  "version": "0.1.0",
  "description": "Client-side router with URLPattern API support, nested routes, and history management",
  "main": "./index.js",
  "module": "./index.js",
  "type": "module",
  "exports": {
    ".": "./index.js",
    "./app": "./app.js",
    "./ui": "./ui.js"
  },
  "keywords": [
    "router",
    "routing",
    "spa",
    "urlpattern",
    "history",
    "navigation",
    "bootstrapp"
  ],
  "author": "Alan Leal",
  "license": "AGPL-3.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/bootstrapp-ai/bootstrapp.git",
    "directory": "public/router"
  },
  "homepage": "https://github.com/bootstrapp-ai/bootstrapp#readme",
  "bugs": {
    "url": "https://github.com/bootstrapp-ai/bootstrapp/issues"
  },
  "dependencies": {
    "@bootstrapp/controller": "^0.2.0",
    "@bootstrapp/types": "^0.2.0"
  }
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/tailwind/package.json":{content:`{
  "name": "@bootstrapp/tailwind",
  "version": "0.1.0",
  "description": "Tailwind/UnoCSS styling configuration for Bootstrapp",
  "type": "module",
  "main": "index.js",
  "exports": {
    ".": "./index.js"
  },
  "dependencies": {
    "@bootstrapp/base": "^0.2.0"
  }
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/theme/package.json":{content:`{
  "name": "@bootstrapp/theme",
  "version": "0.2.0",
  "description": "Standalone theming system with dynamic CSS variable generation and color utilities",
  "main": "./index.js",
  "module": "./index.js",
  "type": "module",
  "exports": {
    ".": "./index.js",
    "./themes/*": "./themes/*"
  },
  "keywords": [
    "theme",
    "theming",
    "css-variables",
    "color-utilities",
    "design-system",
    "bootstrapp"
  ],
  "author": "Alan Leal",
  "license": "AGPL-3.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/bootstrapp-ai/bootstrapp.git",
    "directory": "public/theme"
  },
  "homepage": "https://github.com/bootstrapp-ai/bootstrapp#readme",
  "bugs": {
    "url": "https://github.com/bootstrapp-ai/bootstrapp/issues"
  },
  "dependencies": {
    "@bootstrapp/view": "^0.2.0"
  }
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/types/package.json":{content:`{
  "name": "@bootstrapp/types",
  "version": "0.2.0",
  "description": "Type validation and coercion library for model fields and component properties",
  "main": "./index.js",
  "module": "./index.js",
  "type": "module",
  "exports": {
    ".": "./index.js"
  },
  "keywords": [
    "types",
    "validation",
    "coercion",
    "schema",
    "type-system",
    "bootstrapp"
  ],
  "author": "Alan Leal",
  "license": "AGPL-3.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/bootstrapp-ai/bootstrapp.git",
    "directory": "base/types"
  },
  "homepage": "https://github.com/bootstrapp-ai/bootstrapp#readme",
  "bugs": {
    "url": "https://github.com/bootstrapp-ai/bootstrapp/issues"
  },
  "dependencies": {},
  "devDependencies": {}
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/uix/package.json":{content:`{
  "name": "@bootstrapp/uix",
  "version": "0.2.0",
  "description": "UI/UX component toolkit built on @bootstrapp/view with ready-to-use components for modern web applications",
  "main": "./index.js",
  "module": "./index.js",
  "type": "module",
  "exports": {
    ".": "./index.js",
    "./import.js": "./import.js",
    "./display/*": "./display/*",
    "./layout/*": "./layout/*",
    "./form/*": "./form/*",
    "./navigation/*": "./navigation/*",
    "./overlay/*": "./overlay/*",
    "./feedback/*": "./feedback/*",
    "./page/*": "./page/*",
    "./app/*": "./app/*",
    "./utility/*": "./utility/*",
    "./theme.css": "./theme.css"
  },
  "keywords": [
    "ui-components",
    "uix",
    "web-components",
    "bootstrapp",
    "design-system",
    "component-library",
    "lit-html",
    "custom-elements"
  ],
  "author": "Alan Leal",
  "license": "AGPL-3.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/bootstrapp-ai/bootstrapp.git",
    "directory": "public/uix"
  },
  "homepage": "https://github.com/bootstrapp-ai/bootstrapp#readme",
  "bugs": {
    "url": "https://github.com/bootstrapp-ai/bootstrapp/issues"
  },
  "dependencies": {
    "@bootstrapp/view": "^0.2.0",
    "@bootstrapp/types": "^0.2.0",
    "@bootstrapp/theme": "^0.2.0",
    "@bootstrapp/router": "^0.1.0",
    "@bootstrapp/controller": "^0.2.0",
    "@bootstrapp/base": "^0.2.0",
    "lit-html": "^3.0.0"
  }
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/view/package.json":{content:`{
  "name": "@bootstrapp/view",
  "version": "0.2.0",
  "description": "Web components framework built on Custom Elements API with lit-html templating",
  "main": "./index.js",
  "module": "./index.js",
  "scripts": {
    "docs": "npx serve docs -p 3000"
  },
  "type": "module",
  "exports": {
    ".": "./index.js",
    "./loader": "./loader.js"
  },
  "keywords": [
    "web-components",
    "custom-elements",
    "lit-html",
    "reactive",
    "view",
    "bootstrapp",
    "framework"
  ],
  "author": "Alan Leal",
  "license": "AGPL-3.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/bootstrapp-ai/bootstrapp.git",
    "directory": "base/view"
  },
  "homepage": "https://github.com/bootstrapp-ai/bootstrapp#readme",
  "bugs": {
    "url": "https://github.com/bootstrapp-ai/bootstrapp/issues"
  },
  "dependencies": {
    "@bootstrapp/types": "^0.1.0",
    "lit-html": "^3.3.1"
  },
  "devDependencies": {}
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/admin/package.json":{content:`{
  "name": "@bootstrapp/admin",
  "version": "0.1.0",
  "description": "Bootstrapp Admin Panel",
  "type": "module",
  "main": "index.js",
  "exports": {
    ".": "./index.js",
    "./cms/*": "./cms/*",
    "./project/*": "./project/*",
    "./views/*": "./views/*"
  },
  "dependencies": {
    "@bootstrapp/base": "^0.2.0",
    "@bootstrapp/bundler": "^0.1.0"
  }
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/maps/package.json":{content:`{
  "name": "@bootstrapp/maps",
  "version": "0.1.0",
  "description": "Provider-agnostic maps integration for searching and geocoding places",
  "main": "./index.js",
  "module": "./index.js",
  "type": "module",
  "exports": {
    ".": "./index.js",
    "./app.js": "./app.js",
    "./search.js": "./search.js",
    "./search.css": "./search.css"
  },
  "keywords": [
    "maps",
    "geocoding",
    "places",
    "nominatim",
    "openstreetmap",
    "bootstrapp",
    "web-components"
  ],
  "author": "Alan Leal",
  "license": "AGPL-3.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/bootstrapp-ai/bootstrapp.git",
    "directory": "public/maps"
  },
  "homepage": "https://github.com/bootstrapp-ai/bootstrapp#readme",
  "bugs": {
    "url": "https://github.com/bootstrapp-ai/bootstrapp/issues"
  },
  "dependencies": {
    "@bootstrapp/base": "^0.2.0",
    "@bootstrapp/types": "^0.2.0",
    "@bootstrapp/view": "^0.2.0",
    "lit-html": "^3.0.0"
  }
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/extension/package.json":{content:`{
  "name": "@bootstrapp/extension",
  "version": "0.1.0",
  "description": "Chrome extension for bidirectional communication between admin panel and browser tabs",
  "type": "module",
  "exports": {
    ".": "./index.js",
    "./admin-bridge.js": "./admin-bridge.js"
  },
  "keywords": [
    "chrome-extension",
    "browser-extension",
    "scraping",
    "dom-manipulation",
    "bootstrapp"
  ],
  "author": "Alan Leal",
  "license": "AGPL-3.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/bootstrapp-ai/bootstrapp.git",
    "directory": "public/extension"
  }
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/bundler/package.json":{content:`{
  "name": "@bootstrapp/bundler",
  "version": "0.1.0",
  "description": "Bootstrapp project bundler",
  "type": "module",
  "main": "index.js",
  "exports": {
    ".": "./index.js"
  },
  "bootstrapp": {
    "schema": true,
    "namespace": true
  },
  "dependencies": {
    "@bootstrapp/base": "^0.2.0",
    "@bootstrapp/github": "^0.1.0"
  }
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/github/package.json":{content:`{
  "name": "@bootstrapp/github",
  "version": "0.1.0",
  "description": "GitHub API integration for Bootstrapp",
  "type": "module",
  "main": "index.js",
  "exports": {
    ".": "./index.js"
  },
  "dependencies": {
    "@bootstrapp/base": "^0.2.0"
  }
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/cms/package.json":{content:`{
  "name": "@bootstrapp/cms",
  "version": "0.1.0",
  "description": "Content Management System for Bootstrapp - rich text, media library, SEO, publishing workflow",
  "type": "module",
  "main": "index.js",
  "exports": {
    ".": "./index.js",
    "./schema.js": "./schema.js",
    "./types.js": "./types.js",
    "./plugin.js": "./plugin.js"
  },
  "keywords": [
    "bootstrapp",
    "cms",
    "content-management",
    "rich-text",
    "media-library",
    "seo"
  ],
  "author": "Bootstrapp",
  "license": "MIT",
  "peerDependencies": {
    "@bootstrapp/types": "*",
    "@bootstrapp/admin": "*"
  }
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/bundler/models/seed.js":{content:`import $APP from "/$app.js";

const { deploy = {} } = $APP.settings;

export default {
  credentials: [
    {
      id: "singleton",
      owner: deploy.owner || "",
      branch: deploy.branch || "main",
      repo: deploy.repo || "",
      token: deploy.token || "",
    },
  ],
};
`,mimeType:"text/javascript"},"/$app/base/backend/backend.js":{content:`import { initAuthBackend } from "/$app/auth/backend.js";
import config from "/$app/base/config.js";
import { initModelBackend } from "/$app/model/backend.js";
import { loadAdapter } from "/$app/model/adapter-loader.js";
import { createDatabase } from "/$app/model/factory.js";
import {
  buildQueryResult,
  matchesWhere,
  validateQueryOptions,
} from "/$app/model/query-builder.js";
import {
  generateId,
  mergeRowUpdates,
  prepareRow,
  validateRow,
} from "/$app/model/row-utils.js";
import { SubscriptionManager } from "/$app/model/subscription-manager.js";
import {
  loadRelationships,
  loadRelationshipsForMany,
} from "/$app/model/relationship-loader.js";
import T from "/$app/types/index.js";
import $APP from "/$app.js";

/**
 * Load the required database adapter based on config type
 * @param {string} type - Adapter type (indexeddb, pocketbase, hybrid)
 * @returns {Promise<void>}
 */
async function loadDatabaseAdapter(type = "indexeddb") {
  const dependencies = {
    validateRow,
    prepareRow,
    generateId,
    mergeRowUpdates,
    buildQueryResult,
    matchesWhere,
    validateQueryOptions,
    loadRelationships,
    loadRelationshipsForMany,
    eventEmitter: (event, data) => $APP.events.emit(event, data),
    subscriptionManager: $APP.SubscriptionManager,
  };

  await loadAdapter(type, dependencies);
}

// Initialize model and auth backends with $APP injection
initModelBackend($APP);
initAuthBackend($APP);
let Backend;
let Database;
let SysModel;

if ($APP.settings.runtime === "worker") {
  const SYSMODELS = { APP: "App", USER: "User", DEVICE: "Device" };

  const SYSTEM = {
    export: async () => {
      if ($APP.Database?.exportData) {
        return await $APP.Database.exportData();
      }
      throw new Error("Export not supported by current database adapter");
    },
    import: async (payload) => {
      if (Database?.importData) {
        const { dump, keepIndex = true } = payload;
        await Database.importData(dump, { keepIndex });

        if (SysModel) {
          const manager = SysModel.getSystemModelManager();
          const app = await manager.getApp();
          await SysModel.edit(manager.MODELS.APP, app.id, {
            migrationTimestamp: Date.now(),
          });
        }
        return { success: true };
      }
      throw new Error("Import not supported by current database adapter");
    },
  };

  $APP.addModule({
    name: "sysmodels",
    alias: "SYSTEM",
    base: SYSTEM,
    settings: SYSMODELS,
  });

  const dbConfig = $APP.databaseConfig || {};
  const needsSystemModels =
    !dbConfig.type ||
    dbConfig.type === "indexeddb" ||
    dbConfig.type === "hybrid";

  if (needsSystemModels) {
    $APP.sysmodels.set({
      [SYSMODELS.APP]: {
        name: T.string({ index: true, primary: true }),
        version: T.number(),
        users: T.many(SYSMODELS.USER, "appId"),
        active: T.boolean({ defaultValue: true, index: true }),
        models: T.object(),
        migrationTimestamp: T.number(),
      },
      [SYSMODELS.USER]: {
        name: T.string({ index: true, primary: true }),
        appId: T.one(SYSMODELS.APP, "users"),
        devices: T.many(SYSMODELS.DEVICE, "userId"),
        publicKey: T.string(),
        privateKey: T.string(),
        active: T.boolean({ index: true }),
      },
      [SYSMODELS.DEVICE]: {
        name: T.string({ index: true, primary: true }),
        userId: T.one(SYSMODELS.USER, "devices"),
        deviceData: T.string(),
        active: T.boolean({ defaultValue: true, index: true }),
      },
    });
  }

  $APP.events.on("APP:BACKEND:STARTED", async ({ app, user, device }) => {
    if (!app) {
      console.error("APP:BACKEND:STARTED hook called with invalid app.", {
        app,
      });
      return;
    }
    if (Database) {
      $APP.SubscriptionManager = new SubscriptionManager(Database);
      console.log("SubscriptionManager: Initialized");

      $APP.Database = Database;
    }
    await $APP.events.emit("APP:DATABASE:STARTED", { app, user, device });
  });

  let nextRequestId = 1;
  const pendingBackendRequests = {};

  const requestFromClient = async (
    type,
    payload,
    timeout = config.backend.requestTimeout,
  ) => {
    const clients = await self.clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    });
    const client = clients[0]; // Simple strategy: pick the first client.

    if (!client) {
      return Promise.reject(
        new Error("No active client found to send request to."),
      );
    }

    const eventId = \`backend-request-\${nextRequestId++}\`;

    return new Promise((resolve, reject) => {
      pendingBackendRequests[eventId] = { resolve, reject };
      setTimeout(() => {
        delete pendingBackendRequests[eventId];
        reject(new Error(\`Request timed out after \${timeout}ms\`));
      }, timeout);
      client.postMessage({
        type,
        payload,
        eventId,
      });
    });
  };

  const broadcast = async (params) => {
    if (!$APP.Backend.client) return;
    $APP.Backend.client.postMessage(params);
    $APP.Backend.client.postMessage({ type: "BROADCAST", params });
  };

  const handleMessage = async ({ data, respond }) => {
    const { type, payload, eventId } = data;
    if (pendingBackendRequests[eventId]) {
      const promise = pendingBackendRequests[eventId];
      promise.resolve(payload);
      delete pendingBackendRequests[eventId];
      return;
    }

    await $APP.events.emit(type, {
      payload,
      eventId,
      respond,
      client: createClientProxy($APP.Backend.client),
      broadcast,
    });
  };

  const createClientProxy = (client) => {
    return new Proxy(
      {},
      {
        get: (target, prop) => {
          return (payload) => sendRequestToClient(client, prop, payload);
        },
      },
    );
  };

  const sendRequestToClient = (client, type, payload) => {
    const eventId = \`sw_\${nextRequestId++}\`;
    return new Promise((resolve, reject) => {
      pendingBackendRequests[eventId] = { resolve, reject };
      client.postMessage({ type, payload, eventId });
    });
  };

  const createAppEntry = async (options) => {
    if (!SysModel) return null;
    const manager = SysModel.getSystemModelManager();
    return manager ? await manager.createAppEntry(options) : null;
  };

  const getApp = async () => {
    if (!SysModel) return null;
    const manager = SysModel.getSystemModelManager();
    return manager ? await manager.getApp() : null;
  };

  const getUser = async (_app) => {
    if ($APP.Backend.user) return $APP.Backend.user;
    if (!SysModel) return null;
    const manager = SysModel.getSystemModelManager();
    return manager ? await manager.getUser(_app) : null;
  };

  const getDevice = async (opts) => {
    if (!SysModel) return null;
    const manager = SysModel.getSystemModelManager();
    return manager ? await manager.getDevice(opts) : null;
  };

  $APP.events.set({
    GET_CURRENT_APP: async ({ respond }) => {
      if (!SysModel) {
        respond({
          error: "Multi-app not supported with current database adapter",
        });
        return;
      }
      const app = await $APP.Backend.getApp();
      respond(app);
    },
    LIST_APPS: async ({ respond }) => {
      if (!SysModel) {
        respond({
          error: "Multi-app not supported with current database adapter",
        });
        return;
      }
      const manager = SysModel.getSystemModelManager();
      const apps = await manager.listApps();
      respond(apps || []);
    },
    CREATE_APP: async ({ respond }) => {
      if (!SysModel) {
        respond({
          error: "Multi-app not supported with current database adapter",
        });
        return;
      }
      const manager = SysModel.getSystemModelManager();
      const currentApp = await manager.getApp();
      if (currentApp) {
        await SysModel.edit(SYSMODELS.APP, currentApp.id, {
          active: false,
        });
      }

      const newApp = await manager.createAppEntry();
      const env = await manager.setupAppEnvironment(newApp);
      respond(env.app);
    },
    SELECT_APP: async ({ payload, respond }) => {
      if (!SysModel) {
        respond({
          error: "Multi-app not supported with current database adapter",
        });
        return;
      }
      const { appId } = payload;
      if (!appId) {
        return respond({
          error: "An 'appId' is required to select an app.",
        });
      }

      const manager = SysModel.getSystemModelManager();
      const selectedApp = await manager.selectApp(appId);
      const env = await manager.setupAppEnvironment(selectedApp);
      respond(env.app);
    },

    GET_DB_DUMP: async ({ respond }) => {
      const dump = await $APP.SYSTEM.export();
      respond(dump);
    },

    LOAD_DB_DUMP: async ({ payload, respond = console.log }) => {
      try {
        await $APP.SYSTEM.import(payload);
        respond({ success: true });
      } catch (error) {
        console.error("Failed to load DB dump:", error);
        respond({ success: false, error });
      }
    },
  });

  Backend = {
    bootstrap: async () => {
      const dbConfig = {
        type: "indexeddb",
        name: "app",
        models: $APP.models,
        ...($APP.databaseConfig || {}),
      };
      const needsSystemModels = ["indexeddb", "hybrid"].includes(dbConfig.type);

      // Load the required database adapter based on config type
      // - indexeddb: loads indexeddb adapter
      // - pocketbase: loads pocketbase adapter
      // - hybrid: loads all three (indexeddb, pocketbase, hybrid)
      await loadDatabaseAdapter(dbConfig.type);

      let app;
      if (needsSystemModels) {
        SysModel = await createDatabase({
          type: "indexeddb",
          name: SYSMODELS.APP,
          version: 1,
          models: $APP.sysmodels,
          system: true,
          enableSystemModels: true,
          systemModelManagerOptions: {
            eventEmitter: (event, data) => $APP.events.emit(event, data),
            importData: async ({ dump }) => {
              if (Database?.importData) {
                await Database.importData(dump, { keepIndex: true });
              }
            },
          },
        });
        await SysModel.init();
        $APP.SysModel = SysModel;

        const manager = SysModel.getSystemModelManager();
        app = await manager.getApp();
        if (!app) app = await manager.createAppEntry();
        dbConfig.name = app.id;
        dbConfig.version = app.version;
        Database = await createDatabase(dbConfig);
        $APP.Database = Database;
        await Database.init();
        if ($APP.data && !app.migrationTimestamp) {
          console.error({ app });
          await manager.migrateData($APP.data, app);
          app = await manager.getApp();
        }

        await $APP.events.emit("APP:BACKEND:STARTED", { app });
      } else {
        app = {
          id: dbConfig.name,
          version: 1,
          active: true,
        };
        Database = await createDatabase(dbConfig);
        await Database.init();

        // Migrate initial data for PocketBase (if $APP.data exists and DB is empty)
        if ($APP.data && Object.keys($APP.data).length > 0) {
          console.log("PocketBase: Checking for initial data migration...");
          // Check if first model has any data
          const firstModel = Object.keys($APP.data)[0];
          const existing = await Database.getAll(firstModel, { limit: 1 });
          if (existing.length === 0) {
            console.log("PocketBase: Migrating initial data...");
            await Database.importData($APP.data);
            console.log("PocketBase: Initial data migration complete");
          } else {
            console.log("PocketBase: Data already exists, skipping migration");
          }
        }

        const env = { app, user: null, device: null };
        await $APP.events.emit("APP:BACKEND:STARTED", env);
      }
    },
    handleMessage,
    getApp,
    getDevice,
    createAppEntry,
    getUser,
    broadcast,
    requestFromClient,
  };
  $APP.addModule({ name: "Backend", base: Backend });
}

$APP.events.on("APP:INIT", async () => {
  console.info("Initializing backend application");
  await Backend.bootstrap();
});

export default Backend;
`,mimeType:"text/javascript"},"/$app/auth/backend.js":{content:`/**
 * @file Backend Auth Module
 * @description Handles authentication event handlers in the Web Worker context
 */

/**
 * Generate a random code verifier for PKCE
 * @returns {string}
 */
const generateCodeVerifier = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode.apply(null, array))
    .replace(/\\+/g, "-")
    .replace(/\\//g, "_")
    .replace(/=+$/, "");
};

/**
 * Generate code challenge from verifier for PKCE
 * @param {string} verifier
 * @returns {Promise<string>}
 */
const generateCodeChallenge = async (verifier) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, new Uint8Array(digest)))
    .replace(/\\+/g, "-")
    .replace(/\\//g, "_")
    .replace(/=+$/, "");
};

/**
 * Create auth event handlers for worker context
 * @param {object} $APP - App instance with Database
 * @returns {object} Event handlers object
 */
export function createAuthEventHandlers($APP) {
  /**
   * Get PocketBase instance from Database adapter
   * @returns {object} PocketBase instance
   * @throws {Error} If PocketBase is not initialized
   */
  const getPb = () => {
    if (!$APP.Database?.pb) {
      throw new Error("PocketBase not initialized");
    }
    return $APP.Database.pb;
  };

  return {
    /**
     * Login with email and password
     */
    "AUTH:LOGIN": async ({ payload, respond }) => {
      try {
        const pb = getPb();
        const { email, password } = payload;

        const authData = await pb.collection("users").authWithPassword(email, password);

        respond({
          token: authData.token,
          user: authData.record,
        });
      } catch (error) {
        console.error("AUTH:LOGIN error:", error);
        respond({
          error: error.message || "Login failed",
          code: error.status,
        });
      }
    },

    /**
     * Register a new user
     */
    "AUTH:REGISTER": async ({ payload, respond }) => {
      try {
        const pb = getPb();
        const { email, password, passwordConfirm, name, ...extraData } = payload;

        // Build user data
        const userData = {
          email,
          password,
          passwordConfirm: passwordConfirm || password,
          name,
          ...extraData,
          isGuest: false,
        };

        // Create the user
        await pb.collection("users").create(userData);

        // Auto-login after registration
        const authData = await pb.collection("users").authWithPassword(email, password);

        respond({
          token: authData.token,
          user: authData.record,
        });
      } catch (error) {
        console.error("AUTH:REGISTER error:", error);
        respond({
          error: error.message || "Registration failed",
          code: error.status,
          data: error.data,
        });
      }
    },

    /**
     * Start OAuth flow - returns auth URL and PKCE verifier
     */
    "AUTH:OAUTH_START": async ({ payload, respond }) => {
      try {
        const pb = getPb();
        const { provider, redirectUrl } = payload;

        // Get available auth methods
        const authMethods = await pb.collection("users").listAuthMethods();

        if (!authMethods.oauth2?.enabled) {
          respond({ error: "OAuth2 is not enabled" });
          return;
        }

        const providerConfig = authMethods.oauth2.providers?.find(
          (p) => p.name === provider,
        );

        if (!providerConfig) {
          respond({ error: \`OAuth provider "\${provider}" is not configured\` });
          return;
        }

        // Generate PKCE challenge
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = await generateCodeChallenge(codeVerifier);

        // Build auth URL
        const authUrl = new URL(providerConfig.authURL);
        authUrl.searchParams.set("redirect_uri", redirectUrl);
        authUrl.searchParams.set("code_challenge", codeChallenge);
        authUrl.searchParams.set("code_challenge_method", "S256");

        respond({
          authUrl: authUrl.toString(),
          codeVerifier,
          state: providerConfig.state,
          provider,
        });
      } catch (error) {
        console.error("AUTH:OAUTH_START error:", error);
        respond({ error: error.message || "Failed to start OAuth" });
      }
    },

    /**
     * Complete OAuth flow - exchange code for token
     */
    "AUTH:OAUTH_COMPLETE": async ({ payload, respond }) => {
      try {
        const pb = getPb();
        const { provider, code, codeVerifier, redirectUrl } = payload;

        const authData = await pb
          .collection("users")
          .authWithOAuth2Code(provider, code, codeVerifier, redirectUrl);

        respond({
          token: authData.token,
          user: authData.record,
          meta: authData.meta,
        });
      } catch (error) {
        console.error("AUTH:OAUTH_COMPLETE error:", error);
        respond({
          error: error.message || "OAuth authentication failed",
          code: error.status,
        });
      }
    },

    /**
     * Logout - clear auth store
     */
    "AUTH:LOGOUT": async ({ respond }) => {
      try {
        const pb = getPb();
        pb.authStore.clear();
        respond({ success: true });
      } catch (error) {
        console.error("AUTH:LOGOUT error:", error);
        respond({ error: error.message });
      }
    },

    /**
     * Get current authenticated user
     */
    "AUTH:GET_USER": async ({ respond }) => {
      try {
        const pb = getPb();
        respond({ user: pb.authStore.model });
      } catch (error) {
        respond({ error: error.message });
      }
    },

    /**
     * Refresh auth token
     */
    "AUTH:REFRESH_TOKEN": async ({ payload, respond }) => {
      try {
        const pb = getPb();

        // Restore token if provided
        if (payload?.token) {
          pb.authStore.save(payload.token, pb.authStore.model);
        }

        const authData = await pb.collection("users").authRefresh();

        respond({
          token: authData.token,
          user: authData.record,
        });
      } catch (error) {
        console.error("AUTH:REFRESH_TOKEN error:", error);
        respond({
          error: error.message || "Token refresh failed",
          code: error.status,
        });
      }
    },

    /**
     * Update current user profile
     */
    "AUTH:UPDATE_USER": async ({ payload, respond }) => {
      try {
        const pb = getPb();
        const userId = pb.authStore.model?.id;

        if (!userId) {
          respond({ error: "Not authenticated" });
          return;
        }

        const updated = await pb.collection("users").update(userId, payload);
        respond({ user: updated });
      } catch (error) {
        console.error("AUTH:UPDATE_USER error:", error);
        respond({
          error: error.message || "Update failed",
          code: error.status,
        });
      }
    },

    /**
     * Hookable guest migration - emits event for apps to handle
     * Apps should listen to AUTH:MIGRATE_GUEST_REQUEST and respond
     */
    "AUTH:MIGRATE_GUEST": async ({ payload, respond }) => {
      try {
        const { guestId, newUserId } = payload;

        if (!guestId || !newUserId) {
          respond({ error: "guestId and newUserId are required" });
          return;
        }

        // Emit event for app-level migration handlers
        // Apps can register handlers via $APP.events.on("AUTH:MIGRATE_GUEST_REQUEST", ...)
        const migrationResult = { success: true, migrated: {} };

        // Allow apps to hook into migration
        try {
          await new Promise((resolve, reject) => {
            let handled = false;

            // Set a timeout in case no handler responds
            const timeout = setTimeout(() => {
              if (!handled) {
                resolve(); // No handler, that's ok
              }
            }, 100);

            // Emit the event and wait for handlers
            $APP.events.emit("AUTH:MIGRATE_GUEST_REQUEST", {
              guestId,
              newUserId,
              onComplete: (result) => {
                handled = true;
                clearTimeout(timeout);
                if (result) {
                  Object.assign(migrationResult.migrated, result);
                }
                resolve();
              },
              onError: (error) => {
                handled = true;
                clearTimeout(timeout);
                reject(error);
              },
            });
          });
        } catch (migrationError) {
          console.warn("Guest migration handler error:", migrationError);
          migrationResult.warning = migrationError.message;
        }

        respond(migrationResult);
      } catch (error) {
        console.error("AUTH:MIGRATE_GUEST error:", error);
        respond({ error: error.message });
      }
    },

    /**
     * Check if email is available for registration
     */
    "AUTH:CHECK_EMAIL": async ({ payload, respond }) => {
      try {
        const pb = getPb();
        const { email } = payload;

        // Try to find a user with this email
        try {
          const users = await pb.collection("users").getList(1, 1, {
            filter: \`email = "\${email}"\`,
          });
          respond({ available: users.totalItems === 0 });
        } catch (e) {
          // If we can't query, assume available
          respond({ available: true });
        }
      } catch (error) {
        respond({ error: error.message });
      }
    },
  };
}

/**
 * Initialize Auth backend in worker context
 * @param {object} $APP - App instance
 */
export function initAuthBackend($APP) {
  const handlers = createAuthEventHandlers($APP);
  $APP.events.set(handlers);
  console.log("Auth backend module loaded");
}

export default { createAuthEventHandlers, initAuthBackend };
`,mimeType:"text/javascript"},"/$app/model/backend.js":{content:`/**
 * @file Backend Model Module
 * @description Initializes Model system for worker context with database operations
 */

import { createModel } from "./index.js";

/**
 * Create model event handlers for worker context
 * @param {object} $APP - App instance with Database
 * @returns {object} Event handlers object
 */
export function createModelEventHandlers($APP) {
  return {
    ADD: async ({ payload, respond }) => {
      try {
        const response = await $APP.Database.add(payload.model, payload.row);
        respond([null, response]);
      } catch (error) {
        respond([error, null]);
      }
    },
    ADD_MANY: async ({ payload, respond }) => {
      const results = [];
      for (const row of payload.rows) {
        try {
          const result = await $APP.Database.add(payload.model, row);
          results.push([null, result]);
        } catch (error) {
          respond([error, null]);
        }
      }
      respond([null, results]);
    },
    REMOVE: async ({ payload, respond }) => {
      const response = await $APP.Database.remove(payload.model, payload.id);
      respond(response);
    },
    REMOVE_MANY: async ({ payload, respond }) => {
      const results = [];
      const ids = Array.isArray(payload.ids) ? payload.ids : [payload.ids];
      for (const id of ids) {
        const result = await $APP.Database.remove(payload.model, id);
        results.push(result);
      }
      respond([null, results]);
    },
    EDIT: async ({ payload, respond }) => {
      if (!payload.row.id) {
        respond([
          new Error("Record data must include 'id' field for edit operation"),
          null,
        ]);
        return;
      }
      try {
        const response = await $APP.Database.edit(
          payload.model,
          payload.row.id,
          payload.row,
        );
        respond([null, response]);
      } catch (error) {
        respond([error, null]);
      }
    },
    EDIT_MANY: async ({ payload, respond }) => {
      const results = [];
      for (const row of payload.rows) {
        if (!row.id) {
          results.push([new Error("Record must have id field"), null]);
          continue;
        }
        try {
          const result = await $APP.Database.edit(payload.model, row.id, row);
          results.push([null, result]);
        } catch (error) {
          respond([error, null]);
        }
      }
      respond([null, results]);
    },
    GET: async ({ payload, respond }) => {
      const { id, model, opts = {} } = payload;
      let response;
      if (id) {
        response = await $APP.Database.get(model, id, opts);
      } else if (opts.where) {
        const where =
          typeof opts.where === "string" ? JSON.parse(opts.where) : opts.where;
        const results = await $APP.Database.getAll(model, {
          where,
          limit: 1,
          includes: opts.includes || [],
        });
        response = results.length > 0 ? results[0] : null;
      } else {
        response = null;
      }
      respond(response);
    },
    GET_MANY: async ({ payload: { model, opts = {} }, respond } = {}) => {
      const response = await $APP.Database.getAll(model, opts);
      respond(response);
    },
  };
}

/**
 * Create relationship sync handlers
 * @param {object} $APP - App instance
 * @returns {object} Event handlers for relationship sync
 */
export function createRelationshipSyncHandlers($APP) {
  return {
    onAddRecord({ model, row }) {
      $APP.Backend.broadcast({
        type: "QUERY_DATA_SYNC",
        payload: { action: "add", model, record: row },
      });
    },
    onEditRecord({ model, row }) {
      $APP.Backend.broadcast({
        type: "QUERY_DATA_SYNC",
        payload: { action: "update", model, record: row },
      });
    },
    onRemoveRecord({ model, row, id }) {
      $APP.Backend.broadcast({
        type: "QUERY_DATA_SYNC",
        payload: { action: "delete", model, record: row || { id } },
      });
    },
  };
}

/**
 * Initialize Model backend in worker context
 * @param {object} $APP - App instance with Database, Backend
 * @returns {object} Model instance
 */
export function initModelBackend($APP) {
  const Model = createModel($APP);

  // Register CRUD event handlers
  const queryModelEvents = createModelEventHandlers($APP);
  $APP.events.set(queryModelEvents);

  // Create direct request function for worker
  const request = (action, modelName, payload = {}) => {
    return new Promise((resolve) => {
      const event = queryModelEvents[action];
      if (event && typeof event === "function") {
        event({
          respond: resolve,
          payload: {
            model: modelName,
            ...payload,
          },
        });
      } else
        resolve({ success: false, error: \`Action "\${action}" not found.\` });
    });
  };

  // Register relationship sync handlers
  const relationshipHandlers = createRelationshipSyncHandlers($APP);
  $APP.events.set(relationshipHandlers);

  Model.request = request;
  $APP.addModule({ name: "Model", base: Model });

  return Model;
}

export default {
  createModelEventHandlers,
  createRelationshipSyncHandlers,
  initModelBackend,
};
`,mimeType:"text/javascript"},"/$app/model/factory.js":{content:`/**
 * @file Database Adapter Factory
 * @description Factory function to create database adapters with lazy loading
 */

/**
 * Registry of available adapter types
 * @type {Map<string, Class>}
 */
const ADAPTER_REGISTRY = new Map();

/**
 * Register a database adapter
 * @param {string} type - Adapter type name
 * @param {Class} AdapterClass - Adapter class
 */
export function registerAdapter(type, AdapterClass) {
  if (ADAPTER_REGISTRY.has(type)) {
    console.warn(\`Database: Overwriting existing adapter type "\${type}"\`);
  }
  ADAPTER_REGISTRY.set(type, AdapterClass);
  console.info(\`Database: Registered adapter type "\${type}"\`);
}

/**
 * Create a database adapter instance
 * @param {Object} config - Configuration object
 * @param {string} [config.type='indexeddb'] - Adapter type
 * @param {string} config.name - Database name
 * @param {number} [config.version=1] - Database version
 * @param {Object} config.models - Model schemas
 * @returns {Promise<Object>} Adapter instance
 *
 */
export async function createDatabase(config) {
  if (typeof config === "string") {
    config = { type: config };
  }

  const { type = "indexeddb", name, version = 1, models = {} } = config;

  if (!name) {
    throw new Error("Database name is required");
  }

  if (!models || Object.keys(models).length === 0) {
    console.warn(\`Database: No models provided for database "\${name}"\`);
  }

  // Check registry first
  if (!ADAPTER_REGISTRY.has(type)) {
    throw new Error(
      \`Unknown adapter type "\${type}". Available types: \${getAvailableAdapters().join(", ")}. Use registerAdapter() to register adapters.\`,
    );
  }

  const AdapterClass = ADAPTER_REGISTRY.get(type);
  const adapter = new AdapterClass(config);

  console.info(\`Database: Created \${type} adapter for "\${name}" v\${version}\`);

  return adapter;
}

/**
 * Get list of registered adapter types
 * @returns {Array<string>} List of adapter type names
 */
export function getAvailableAdapters() {
  return Array.from(ADAPTER_REGISTRY.keys());
}

/**
 * Check if an adapter type is registered
 * @param {string} type - Adapter type name
 * @returns {boolean} True if adapter is registered
 */
export function hasAdapter(type) {
  return ADAPTER_REGISTRY.has(type);
}

export default {
  createDatabase,
  registerAdapter,
  getAvailableAdapters,
  hasAdapter,
};
`,mimeType:"text/javascript"},"/$app/model/adapter-loader.js":{content:`/**
 * @file Adapter Loader
 * @description Lazy loads database adapters based on configuration
 */

import { registerAdapter } from "/$app/model/factory.js";

/**
 * Adapter import paths mapped by type
 */
const ADAPTER_PATHS = {
  indexeddb: "/$app/model-indexeddb/adapter.js",
  pocketbase: "/$app/model-pocketbase/adapter.js",
  hybrid: "/$app/model-hybrid/adapter.js",
};

/**
 * Create a configured adapter class with injected dependencies
 * @param {Class} BaseAdapter - Base adapter class
 * @param {Object} dependencies - Framework dependencies to inject
 * @returns {Class} Configured adapter class
 */
function createConfiguredAdapter(BaseAdapter, dependencies) {
  return class ConfiguredAdapter extends BaseAdapter {
    constructor(cfg) {
      super({
        ...cfg,
        ...dependencies,
      });
    }
  };
}

/**
 * Load and register a database adapter by type
 * @param {string} type - Adapter type (indexeddb, pocketbase, hybrid)
 * @param {Object} dependencies - Framework dependencies to inject
 * @returns {Promise<void>}
 */
export async function loadAdapter(type, dependencies) {
  const path = ADAPTER_PATHS[type];
  if (!path) {
    throw new Error(
      \`Unknown adapter type: "\${type}". Available types: \${Object.keys(ADAPTER_PATHS).join(", ")}\`,
    );
  }

  // Handle hybrid adapter specially - it needs both IndexedDB and PocketBase classes
  if (type === "hybrid") {
    await loadHybridAdapter(dependencies);
    return;
  }

  try {
    const module = await import(path);
    const AdapterClass =
      module.default || module.IndexedDBAdapter || module.PocketBaseAdapter;

    if (!AdapterClass) {
      throw new Error(\`Failed to load adapter class for type: "\${type}"\`);
    }

    // For PocketBase adapter, dynamically import PocketBase and inject it
    let adapterDeps = dependencies;
    if (type === "pocketbase") {
      const PocketBase = (await import("/npm/pocketbase")).default;
      adapterDeps = { ...dependencies, PocketBase };
    }

    const ConfiguredAdapter = createConfiguredAdapter(AdapterClass, adapterDeps);
    registerAdapter(type, ConfiguredAdapter);

    console.info(\`AdapterLoader: Loaded and registered "\${type}" adapter\`);
  } catch (error) {
    console.error(\`AdapterLoader: Failed to load "\${type}" adapter:\`, error);
    throw error;
  }
}

/**
 * Load and register the hybrid adapter
 * Hybrid requires both IndexedDB and PocketBase adapter classes
 * @param {Object} dependencies - Framework dependencies to inject
 * @returns {Promise<void>}
 */
async function loadHybridAdapter(dependencies) {
  try {
    // Load all adapter modules and PocketBase in parallel
    const [indexeddbModule, pocketbaseModule, hybridModule, pocketbaseLib] = await Promise.all([
      import(ADAPTER_PATHS.indexeddb),
      import(ADAPTER_PATHS.pocketbase),
      import(ADAPTER_PATHS.hybrid),
      import("/npm/pocketbase"),
    ]);

    const IndexedDBAdapter =
      indexeddbModule.default || indexeddbModule.IndexedDBAdapter;
    const PocketBaseAdapter =
      pocketbaseModule.default || pocketbaseModule.PocketBaseAdapter;
    const HybridAdapter = hybridModule.default || hybridModule.HybridAdapter;
    const PocketBase = pocketbaseLib.default;

    if (!IndexedDBAdapter || !PocketBaseAdapter || !HybridAdapter) {
      throw new Error("Failed to load required adapter classes for hybrid mode");
    }

    // Create configured versions of the sub-adapters
    const ConfiguredIndexedDB = createConfiguredAdapter(
      IndexedDBAdapter,
      dependencies,
    );
    const ConfiguredPocketBase = createConfiguredAdapter(
      PocketBaseAdapter,
      { ...dependencies, PocketBase },
    );

    // Create hybrid adapter that uses configured sub-adapters
    const ConfiguredHybrid = class extends HybridAdapter {
      constructor(cfg) {
        super({
          ...cfg,
          ...dependencies,
          IndexedDBAdapter: ConfiguredIndexedDB,
          PocketBaseAdapter: ConfiguredPocketBase,
        });
      }
    };

    registerAdapter("hybrid", ConfiguredHybrid);

    console.info(
      \`AdapterLoader: Loaded and registered "hybrid" adapter (with indexeddb + pocketbase)\`,
    );
  } catch (error) {
    console.error(\`AdapterLoader: Failed to load hybrid adapter:\`, error);
    throw error;
  }
}

export default { loadAdapter };
`,mimeType:"text/javascript"},"/$app/model/query-builder.js":{content:`/**
 * @file Query Builder Utilities
 * @description Common query building and filtering logic shared across adapters
 */

/**
 * Parse order string into structured format
 * @param {string|Array} order - Order specification
 * @returns {Array<{field: string, direction: 'ASC'|'DESC'}>}
 * @example
 * parseOrder('name ASC') => [{field: 'name', direction: 'ASC'}]
 * parseOrder('age DESC, name ASC') => [{field: 'age', direction: 'DESC'}, {field: 'name', direction: 'ASC'}]
 */
export function parseOrder(order) {
  if (!order) return [];
  if (Array.isArray(order)) return order;

  return order.split(',').map(part => {
    const [field, direction = 'ASC'] = part.trim().split(/\\s+/);
    return { field, direction: direction.toUpperCase() };
  });
}

/**
 * Apply where filter to a record
 * @param {Object} record - Record to test
 * @param {Object} where - Filter conditions
 * @returns {boolean} True if record matches filter
 * @example
 * matchesWhere({age: 25}, {age: 25}) => true
 * matchesWhere({age: 30}, {age: {'>': 25}}) => true
 */
export function matchesWhere(record, where) {
  if (!where || Object.keys(where).length === 0) return true;

  return Object.entries(where).every(([field, condition]) => {
    const value = record[field];

    // Direct equality
    if (typeof condition !== 'object' || condition === null) {
      // Use string coercion for 'id' field to handle string/number mismatch
      // (PocketBase returns string IDs, but queries may use numbers)
      if (field === 'id') {
        return String(value) === String(condition);
      }
      return value === condition;
    }

    // Operator-based conditions
    return Object.entries(condition).every(([operator, expected]) => {
      switch (operator) {
        case '>':
          return value > expected;
        case '>=':
          return value >= expected;
        case '<':
          return value < expected;
        case '<=':
          return value <= expected;
        case '!=':
        case '<>':
          return value !== expected;
        case 'in':
          return Array.isArray(expected) && expected.includes(value);
        case 'not in':
          return Array.isArray(expected) && !expected.includes(value);
        case 'like':
          return typeof value === 'string' && value.includes(expected);
        case 'ilike':
          return typeof value === 'string' &&
                 value.toLowerCase().includes(expected.toLowerCase());
        case 'is null':
          return value === null || value === undefined;
        case 'is not null':
          return value !== null && value !== undefined;
        default:
          return value === expected;
      }
    });
  });
}

/**
 * Apply sorting to an array of records
 * @param {Array<Object>} records - Records to sort
 * @param {string|Array} order - Sort specification
 * @returns {Array<Object>} Sorted records
 */
export function applyOrder(records, order) {
  if (!order || !records || records.length === 0) return records;

  const orderArray = parseOrder(order);
  if (orderArray.length === 0) return records;

  return [...records].sort((a, b) => {
    for (const { field, direction } of orderArray) {
      const aVal = a[field];
      const bVal = b[field];

      if (aVal === bVal) continue;

      const comparison = aVal < bVal ? -1 : 1;
      return direction === 'DESC' ? -comparison : comparison;
    }
    return 0;
  });
}

/**
 * Apply limit and offset to an array of records
 * @param {Array<Object>} records - Records to paginate
 * @param {number} [limit] - Maximum records to return
 * @param {number} [offset=0] - Records to skip
 * @returns {Array<Object>} Paginated records
 */
export function applyPagination(records, limit, offset = 0) {
  if (!records) return [];
  if (!limit && !offset) return records;

  const start = offset || 0;
  const end = limit ? start + limit : undefined;

  return records.slice(start, end);
}

/**
 * Build a complete query result from options
 * @param {Array<Object>} allRecords - All available records
 * @param {Object} options - Query options
 * @param {Object} [options.where] - Filter conditions
 * @param {string|Array} [options.order] - Sort specification
 * @param {number} [options.limit] - Maximum records
 * @param {number} [options.offset] - Records to skip
 * @returns {Object} {items: Array, count: number, total: number}
 */
export function buildQueryResult(allRecords, options = {}) {
  const { where, order, limit, offset } = options;

  // Filter
  let filtered = where ? allRecords.filter(r => matchesWhere(r, where)) : allRecords;
  const total = filtered.length;

  // Sort
  if (order) {
    filtered = applyOrder(filtered, order);
  }

  // Paginate
  const items = applyPagination(filtered, limit, offset);

  return {
    items,
    count: total,
    total,
    limit,
    offset: offset || 0,
  };
}

/**
 * Validate query options
 * @param {Object} options - Query options to validate
 * @throws {Error} If options are invalid
 */
export function validateQueryOptions(options = {}) {
  const { limit, offset, where } = options;

  if (limit !== undefined) {
    if (typeof limit !== 'number' || limit < 0) {
      throw new Error('limit must be a positive number');
    }
  }

  if (offset !== undefined) {
    if (typeof offset !== 'number' || offset < 0) {
      throw new Error('offset must be a non-negative number');
    }
  }

  if (where !== undefined && (typeof where !== 'object' || where === null)) {
    throw new Error('where must be an object');
  }

  return true;
}

export default {
  parseOrder,
  matchesWhere,
  applyOrder,
  applyPagination,
  buildQueryResult,
  validateQueryOptions,
};
`,mimeType:"text/javascript"},"/$app/model/row-utils.js":{content:`/**
 * @file Row Utilities
 * @description Utilities for preparing, validating, and transforming database rows
 */

/**
 * Type conversion maps for boolean values
 * Different databases may store booleans differently
 */
export const BOOLEAN_TO_STORAGE = { true: 1, false: 0 };
export const STORAGE_TO_BOOLEAN = { 1: true, 0: false, true: true, false: false };

/**
 * Prepare a row for storage in the database
 * Handles type conversion, default values, and relationship fields
 * @param {Object} models - All model schemas
 * @param {string} modelName - Name of the model
 * @param {Object} row - Row data to prepare
 * @param {Object} [options={}] - Preparation options
 * @param {Object} [options.currentRow={}] - Existing row (for updates)
 * @param {boolean} [options.reverse=false] - Convert from storage format
 * @returns {Object} Prepared row
 */
export function prepareRow(models, modelName, row, options = {}) {
  const { currentRow = {}, reverse = false } = options;
  const modelSchema = models[modelName];

  if (!modelSchema) {
    throw new Error(\`Model "\${modelName}" not found in schema\`);
  }

  const prepared = { ...row };
  const booleanMap = reverse ? STORAGE_TO_BOOLEAN : BOOLEAN_TO_STORAGE;

  for (const [field, fieldDef] of Object.entries(modelSchema)) {
    // Skip relationship fields that don't belong (many, one)
    if (fieldDef.relationship && !fieldDef.belongs) {
      continue;
    }

    const value = row[field];

    // Preserve current value if new value is undefined
    if (value === undefined && currentRow[field] !== undefined) {
      prepared[field] = currentRow[field];
      continue;
    }

    // Convert booleans for storage
    if (fieldDef.type === "boolean" && value !== undefined && value !== null) {
      prepared[field] = reverse
        ? (booleanMap[value] ?? value)
        : (booleanMap[value] ?? value);
    }

    // Handle timestamps
    if ((fieldDef.type === "date" || fieldDef.type === "datetime") && value) {
      if (reverse) {
        // Convert from storage (timestamp) to Date
        prepared[field] = typeof value === "number" ? new Date(value) : value;
      } else {
        // Convert to timestamp for storage
        prepared[field] = value instanceof Date ? value.getTime() : value;
      }
    }

    // Apply default values for new records
    if (
      !reverse &&
      value === undefined &&
      fieldDef.defaultValue !== undefined
    ) {
      prepared[field] =
        typeof fieldDef.defaultValue === "function"
          ? fieldDef.defaultValue()
          : fieldDef.defaultValue;
    }
  }

  return prepared;
}

/**
 * Validate a row against model schema
 * @param {Object} models - All model schemas
 * @param {string} modelName - Name of the model
 * @param {Object} row - Row data to validate
 * @param {Object} [options={}] - Validation options
 * @param {string} [options.operation] - Operation type (add, edit)
 * @returns {Object} {valid: boolean, errors: Object, data: Object}
 */
export function validateRow(models, modelName, row, options = {}) {
  const modelSchema = models[modelName];

  if (!modelSchema) {
    return {
      valid: false,
      errors: { _model: \`Model "\${modelName}" not found\` },
      data: null,
    };
  }

  const errors = {};
  const validated = { ...row };

  for (const [field, fieldDef] of Object.entries(modelSchema)) {
    const value = row[field];

    // Check required fields
    if (
      fieldDef.required &&
      (value === undefined || value === null || value === "")
    ) {
      if (options.operation !== "edit") {
        // Required only for add, not partial updates
        errors[field] = \`\${field} is required\`;
        continue;
      }
    }

    // Type validation
    if (value !== undefined && value !== null && fieldDef.type) {
      const expectedType = fieldDef.type;
      const actualType = Array.isArray(value) ? "array" : typeof value;

      const validTypes = {
        string: ["string", "number"], // Allow coercion
        number: ["number", "string"], // Allow coercion
        boolean: ["boolean", "number", "string"], // Allow coercion
        object: ["object"],
        array: ["array"],
        date: ["object", "number", "string"], // Date objects or timestamps
        datetime: ["object", "number", "string"],
      };

      if (
        validTypes[expectedType] &&
        !validTypes[expectedType].includes(actualType)
      ) {
        errors[field] = \`\${field} must be of type \${expectedType}\`;
      }
    }

    // Custom validators
    if (fieldDef.validator && value !== undefined) {
      try {
        const isValid = fieldDef.validator(value, row);
        if (!isValid) {
          errors[field] = \`\${field} failed custom validation\`;
        }
      } catch (e) {
        errors[field] = e.message || \`\${field} validation error\`;
      }
    }

    // Format validation (e.g., email)
    if (fieldDef.format && value) {
      const formats = {
        email: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
        url: /^https?:\\/\\/.+/,
      };

      if (formats[fieldDef.format] && !formats[fieldDef.format].test(value)) {
        errors[field] = \`\${field} must be a valid \${fieldDef.format}\`;
      }
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: validated,
  };
}

/**
 * Extract relationship fields from a row
 * @param {Object} modelSchema - Model schema
 * @param {Object} row - Row data
 * @returns {Object} {belongs: Object, references: Object}
 */
export function extractRelationships(modelSchema, row) {
  const belongs = {}; // Foreign keys (belongs relationships)
  const references = {}; // Data for many/one relationships

  for (const [field, fieldDef] of Object.entries(modelSchema)) {
    if (!fieldDef.relationship) continue;

    if (fieldDef.belongs && row[field] !== undefined) {
      belongs[field] = row[field];
    } else if (!fieldDef.belongs && row[field] !== undefined) {
      references[field] = row[field];
    }
  }

  return { belongs, references };
}

/**
 * Generate a unique ID (for databases that don't auto-generate)
 * @param {boolean} [useStringId=false] - Return string ID instead of number
 * @returns {string|number} Unique ID
 */
export function generateId(useStringId = false) {
  const id = \`\${Date.now()}\${Math.random().toString(10).substr(2, 2)}\`;
  return useStringId ? id : Number(id);
}

/**
 * Clone a row (deep copy)
 * @param {Object} row - Row to clone
 * @returns {Object} Cloned row
 */
export function cloneRow(row) {
  if (!row || typeof row !== "object") return row;

  try {
    return JSON.parse(JSON.stringify(row));
  } catch (e) {
    // Fallback for objects with circular references
    return { ...row };
  }
}

/**
 * Merge row updates (for partial updates)
 * @param {Object} currentRow - Current row data
 * @param {Object} updates - Updates to apply
 * @returns {Object} Merged row
 */
export function mergeRowUpdates(currentRow, updates) {
  return {
    ...currentRow,
    ...updates,
  };
}

export default {
  prepareRow,
  validateRow,
  extractRelationships,
  generateId,
  cloneRow,
  mergeRowUpdates,
  BOOLEAN_TO_STORAGE,
  STORAGE_TO_BOOLEAN,
};
`,mimeType:"text/javascript"},"/$app/model/subscription-manager.js":{content:`/**
 * @file Subscription Manager
 * @description Manages query-level subscriptions for efficient data synchronization
 * Tracks unique queries (model + where clause) and routes notifications only to matching subscribers
 */

import { matchesWhere } from "./query-builder.js";

/**
 * Represents a single query subscription
 */
export class QuerySubscription {
  constructor(model, where, filterString) {
    this.model = model; // Model name (e.g., "users")
    this.where = where; // Where clause object (e.g., { status: "active" })
    this.filterString = filterString; // Adapter-specific filter string
    this.queryHash = null; // Unique hash for this query
    this.callbacks = new Set(); // Set of callback functions
    this.refCount = 0; // Number of active subscribers
  }

  /**
   * Add a callback to this subscription
   */
  addCallback(callback) {
    this.callbacks.add(callback);
    this.refCount++;
  }

  /**
   * Remove a callback from this subscription
   */
  removeCallback(callback) {
    this.callbacks.delete(callback);
    this.refCount--;
  }

  /**
   * Notify all callbacks with an event
   */
  notify(event) {
    this.callbacks.forEach((callback) => {
      try {
        callback(event);
      } catch (error) {
        console.error("Error in query subscription callback:", error);
      }
    });
  }
}

/**
 * Generate a stable hash for a query (model + where clause)
 * @param {string} model - Model name
 * @param {object} where - Where clause object
 * @returns {string} Query hash
 */
export function hashQuery(model, where) {
  if (!where || Object.keys(where).length === 0) {
    return \`\${model}::*\`; // All records
  }

  // Sort keys for stable hashing
  const sortedKeys = Object.keys(where).sort();
  const sortedWhere = {};
  sortedKeys.forEach((key) => {
    sortedWhere[key] = where[key];
  });

  const whereString = JSON.stringify(sortedWhere);
  return \`\${model}::\${whereString}\`;
}

/**
 * Default filter builder (identity function)
 * Can be replaced by adapter-specific builders (e.g., PocketBase filter syntax)
 * @param {object} where - Where clause object
 * @returns {string} Filter string
 */
const defaultFilterBuilder = (where) => {
  if (!where || Object.keys(where).length === 0) {
    return "";
  }
  return JSON.stringify(where);
};

/**
 * Centralized subscription manager for query-level subscriptions
 */
export class SubscriptionManager {
  /**
   * @param {object} database - Database adapter instance (optional)
   * @param {object} [options={}] - Configuration options
   * @param {function} [options.buildFilterString] - Custom filter string builder
   */
  constructor(database, options = {}) {
    this.database = database; // Database adapter instance

    // Allow custom filter builder (e.g., for PocketBase)
    this.buildFilterString = options.buildFilterString || defaultFilterBuilder;

    // Map: queryHash -> QuerySubscription
    this.subscriptions = new Map();

    // Map: model -> Set<queryHash>
    this.modelToQueries = new Map();

    // Map: queryHash -> adapter-specific unsubscribe function
    this.adapterUnsubscribers = new Map();
  }

  /**
   * Set a custom filter builder function
   * @param {function} builder - Filter builder function (where) => filterString
   */
  setFilterBuilder(builder) {
    this.buildFilterString = builder;
  }

  /**
   * Subscribe to a query (model + where clause)
   * @param {string} model - Model name
   * @param {object} where - Where clause object
   * @param {function} callback - Callback function (event) => void
   * @returns {function} Unsubscribe function
   */
  async subscribe(model, where, callback) {
    if (typeof callback !== "function") {
      console.error("Subscription callback must be a function");
      return () => {};
    }

    const queryHash = hashQuery(model, where);
    let subscription = this.subscriptions.get(queryHash);
    let isNew = false;

    if (!subscription) {
      // First subscriber for this query - create new subscription
      const filterString = this.buildFilterString(where);
      subscription = new QuerySubscription(model, where, filterString);
      subscription.queryHash = queryHash;
      isNew = true;
    }

    // Add callback BEFORE adding to maps (prevents race condition where
    // notifyMatchingQueries finds subscription but callbacks is empty)
    subscription.addCallback(callback);

    if (isNew) {
      // Now add to tracking maps
      this.subscriptions.set(queryHash, subscription);

      if (!this.modelToQueries.has(model)) {
        this.modelToQueries.set(model, new Set());
      }
      this.modelToQueries.get(model).add(queryHash);

      // Create adapter-specific subscription (PocketBase realtime)
      await this.createAdapterSubscription(subscription);
    }

    // Return unsubscribe function
    return () => this.unsubscribe(queryHash, callback);
  }

  /**
   * Unsubscribe a callback from a query
   * @param {string} queryHash - Query hash
   * @param {function} callback - Callback to remove
   */
  unsubscribe(queryHash, callback) {
    const subscription = this.subscriptions.get(queryHash);
    if (!subscription) return;

    subscription.removeCallback(callback);

    // If no more subscribers, cleanup
    if (subscription.refCount === 0) {
      this.cleanupSubscription(queryHash);
    }
  }

  /**
   * Create adapter-specific subscription (PocketBase, IndexedDB, Hybrid)
   * @param {QuerySubscription} subscription
   * @private
   */
  async createAdapterSubscription(subscription) {
    const { model, filterString } = subscription;

    // Check if database adapter supports realtime subscriptions
    if (
      this.database?.realtimeManager &&
      typeof this.database.realtimeManager.subscribe === "function"
    ) {
      // PocketBase or Hybrid adapter with realtime support
      try {
        const unsubscribe = await this.database.realtimeManager.subscribe(
          model,
          filterString,
          (event) => {
            // Route event to subscription callbacks
            subscription.notify(event);
          },
        );

        this.adapterUnsubscribers.set(subscription.queryHash, unsubscribe);
      } catch (error) {
        console.error(
          "SubscriptionManager: Failed to create realtime subscription",
          error,
        );
      }
    }
    // IndexedDB adapter uses event-based notifications (no native realtime)
  }

  /**
   * Cleanup a subscription when no more subscribers
   * @param {string} queryHash
   * @private
   */
  cleanupSubscription(queryHash) {
    const subscription = this.subscriptions.get(queryHash);
    if (!subscription) return;

    // Unsubscribe from adapter
    const adapterUnsub = this.adapterUnsubscribers.get(queryHash);
    if (adapterUnsub && typeof adapterUnsub === "function") {
      adapterUnsub();
      this.adapterUnsubscribers.delete(queryHash);
    }

    // Remove from tracking
    this.subscriptions.delete(queryHash);

    const modelQueries = this.modelToQueries.get(subscription.model);
    if (modelQueries) {
      modelQueries.delete(queryHash);
      if (modelQueries.size === 0) {
        this.modelToQueries.delete(subscription.model);
      }
    }
  }

  /**
   * Notify all query subscriptions that match a record change
   * Used by IndexedDB adapter and frontend event handler
   * @param {string} model - Model name
   * @param {string} action - Action type: 'add', 'update', 'delete'
   * @param {object} record - Changed record
   */
  notifyMatchingQueries(model, action, record) {
    const queryHashes = this.modelToQueries.get(model);
    if (!queryHashes) return;

    for (const queryHash of queryHashes) {
      const subscription = this.subscriptions.get(queryHash);
      if (!subscription) continue;

      // For deletes, always notify (can't check match on deleted record)
      // For add/update, check if record matches the where clause
      const shouldNotify =
        action === "delete" ||
        action === "remove" ||
        !subscription.where ||
        Object.keys(subscription.where).length === 0 ||
        matchesWhere(record, subscription.where);
      if (shouldNotify) {
        subscription.notify({
          action,
          record,
          model,
        });
      }
    }
  }

  /**
   * Cleanup all subscriptions (called on app shutdown)
   */
  cleanup() {
    for (const queryHash of this.subscriptions.keys()) {
      this.cleanupSubscription(queryHash);
    }
  }

  /**
   * Get subscription statistics (for debugging)
   */
  getStats() {
    const stats = {
      totalSubscriptions: this.subscriptions.size,
      byModel: {},
    };

    for (const [model, queryHashes] of this.modelToQueries) {
      stats.byModel[model] = {
        queries: queryHashes.size,
        totalCallbacks: 0,
      };

      for (const queryHash of queryHashes) {
        const subscription = this.subscriptions.get(queryHash);
        if (subscription) {
          stats.byModel[model].totalCallbacks += subscription.refCount;
        }
      }
    }

    return stats;
  }
}

export default SubscriptionManager;
`,mimeType:"text/javascript"},"/$app/model/relationship-loader.js":{content:`/**
 * @file Relationship Loader
 * @description Handles loading of relationships (belongs, many, one) for database records
 */

/**
 * Load relationships for a single record
 * @param {Object} adapter - Database adapter instance
 * @param {Object} models - Model schemas
 * @param {string} modelName - Name of the model
 * @param {Object} record - Record to load relationships for
 * @param {Array<string>} includes - Relationship names to load
 * @param {boolean} [recursive=false] - Load nested relationships
 * @returns {Promise<Object>} Record with loaded relationships
 */
export async function loadRelationships(
  adapter,
  models,
  modelName,
  record,
  includes,
  recursive = false,
) {
  if (!includes || includes.length === 0 || !record) {
    return record;
  }

  const modelSchema = models[modelName];
  if (!modelSchema) {
    console.warn(\`Relationship loader: Model "\${modelName}" not found\`);
    return record;
  }

  const enriched = { ...record };

  for (const relationName of includes) {
    const relationDef = modelSchema[relationName];

    if (!relationDef) {
      console.warn(
        \`Relationship loader: Relationship "\${relationName}" not found in model "\${modelName}"\`,
      );
      continue;
    }

    if (!relationDef.relationship) {
      console.warn(
        \`Relationship loader: Field "\${relationName}" is not a relationship\`,
      );
      continue;
    }

    try {
      enriched[relationName] = await loadRelationship(
        adapter,
        models,
        modelName,
        record,
        relationName,
        relationDef,
        recursive,
      );
    } catch (error) {
      console.error(
        \`Relationship loader: Error loading "\${relationName}"\`,
        error,
      );
      enriched[relationName] = relationDef.many ? [] : null;
    }
  }

  return enriched;
}

/**
 * Load relationships for multiple records
 * @param {Object} adapter - Database adapter instance
 * @param {Object} models - Model schemas
 * @param {string} modelName - Name of the model
 * @param {Array<Object>} records - Records to load relationships for
 * @param {Array<string>} includes - Relationship names to load
 * @param {boolean} [recursive=false] - Load nested relationships
 * @returns {Promise<Array<Object>>} Records with loaded relationships
 */
export async function loadRelationshipsForMany(
  adapter,
  models,
  modelName,
  records,
  includes,
  recursive = false,
) {
  if (!includes || includes.length === 0 || !records || records.length === 0) {
    return records;
  }

  return Promise.all(
    records.map((record) =>
      loadRelationships(adapter, models, modelName, record, includes, recursive),
    ),
  );
}

/**
 * Load a single relationship
 * @private
 */
async function loadRelationship(
  adapter,
  models,
  modelName,
  record,
  relationName,
  relationDef,
  recursive,
) {
  const { relationship, targetModel, targetForeignKey, many } = relationDef;

  // Belongs relationship (foreign key in this model)
  if (relationship === "belongs") {
    const foreignKeyValue = record[relationName];
    if (!foreignKeyValue) return null;

    const related = await adapter.get(targetModel, foreignKeyValue);
    return related;
  }

  // Belongs Many relationship (array of foreign keys)
  if (relationship === "belongs_many") {
    const foreignKeyValues = record[relationName];
    if (!Array.isArray(foreignKeyValues) || foreignKeyValues.length === 0) {
      return [];
    }

    const allRecords = await adapter.getAll(targetModel);
    return allRecords.filter((r) => foreignKeyValues.includes(r.id));
  }

  // Has Many relationship (foreign key in target model)
  if (relationship === "many") {
    const foreignKeyField = targetForeignKey || \`\${modelName}Id\`;

    const related = await adapter.getAll(targetModel, {
      where: { [foreignKeyField]: record.id },
    });

    return related || [];
  }

  // Has One relationship (foreign key in target model)
  if (relationship === "one") {
    const foreignKeyField = targetForeignKey || \`\${modelName}Id\`;

    const related = await adapter.getAll(targetModel, {
      where: { [foreignKeyField]: record.id },
      limit: 1,
    });

    return related && related.length > 0 ? related[0] : null;
  }

  console.warn(
    \`Relationship loader: Unknown relationship type "\${relationship}"\`,
  );
  return many ? [] : null;
}

/**
 * Parse nested includes syntax
 * Supports: ['posts', 'posts.comments', 'author']
 * @param {Array<string>} includes - Include specifications
 * @returns {Object} Structured includes with nested relationships
 * @example
 * parseIncludes(['posts', 'posts.comments', 'author'])
 * // Returns:
 * // {
 * //   posts: { nested: ['comments'] },
 * //   author: { nested: [] }
 * // }
 */
export function parseIncludes(includes) {
  if (!includes || !Array.isArray(includes)) {
    return {};
  }

  const parsed = {};

  for (const include of includes) {
    const parts = include.split(".");
    const rootRelation = parts[0];

    if (!parsed[rootRelation]) {
      parsed[rootRelation] = { nested: [] };
    }

    if (parts.length > 1) {
      const nestedPath = parts.slice(1).join(".");
      parsed[rootRelation].nested.push(nestedPath);
    }
  }

  return parsed;
}

/**
 * Load nested relationships recursively
 * @param {Object} adapter - Database adapter instance
 * @param {Object} models - Model schemas
 * @param {string} modelName - Name of the model
 * @param {Object|Array} records - Record(s) to load relationships for
 * @param {Array<string>} includes - Include specifications
 * @returns {Promise<Object|Array>} Records with nested relationships loaded
 */
export async function loadNestedRelationships(
  adapter,
  models,
  modelName,
  records,
  includes,
) {
  if (!includes || includes.length === 0) {
    return records;
  }

  const parsedIncludes = parseIncludes(includes);
  const isArray = Array.isArray(records);
  const recordArray = isArray ? records : [records];

  // Load first level relationships
  const firstLevelIncludes = Object.keys(parsedIncludes);
  const enriched = await loadRelationshipsForMany(
    adapter,
    models,
    modelName,
    recordArray,
    firstLevelIncludes,
    false,
  );

  // Load nested relationships
  for (const [relationName, { nested }] of Object.entries(parsedIncludes)) {
    if (nested.length === 0) continue;

    const relationDef = models[modelName][relationName];
    if (!relationDef) continue;

    const targetModel = relationDef.targetModel;

    for (const record of enriched) {
      const relatedData = record[relationName];
      if (!relatedData) continue;

      // Recursively load nested relationships
      if (Array.isArray(relatedData)) {
        record[relationName] = await loadNestedRelationships(
          adapter,
          models,
          targetModel,
          relatedData,
          nested,
        );
      } else {
        record[relationName] = await loadNestedRelationships(
          adapter,
          models,
          targetModel,
          relatedData,
          nested,
        );
      }
    }
  }

  return isArray ? enriched : enriched[0];
}

export default {
  loadRelationships,
  loadRelationshipsForMany,
  loadNestedRelationships,
  parseIncludes,
};
`,mimeType:"text/javascript"},"/$app/model/index.js":{content:`/**
 * @file Model System - ORM-like API for data access
 * @description Provides a proxy-based model API with automatic CRUD operations,
 * dynamic finders, relationships, and reactive data synchronization
 */
import createEventHandler from "/$app/events/index.js";

export class ModelType {}

/**
 * Symbol used to store subscription callbacks on a row instance
 * without polluting the data properties.
 */
const SUBSCRIPTION_SYMBOL = Symbol("subscriptions");

/**
 * Symbol used to store relationship subscription unsubscribers on a row instance.
 */
const RELATIONSHIP_SUBS_SYMBOL = Symbol("relationshipSubscriptions");

/**
 * A simple helper to check if a row matches a 'where' clause.
 * This is naive and only supports exact, top-level key-value matches.
 * @param {object} row - The row object to check.
 * @param {object} where - The 'where' clause (e.g., { active: true }).
 * @returns {boolean} True if the row matches.
 */
const simpleMatcher = (row, where) => {
  if (!where || Object.keys(where).length === 0) {
    return true; // No filter means all rows match.
  }
  return Object.keys(where).every((key) => {
    // Use string coercion for 'id' field to handle string/number mismatch
    if (key === "id") {
      return String(row[key]) === String(where[key]);
    }
    return row[key] === where[key];
  });
};

/**
 * Create a reactive array prototype with subscription capabilities
 * @param {function} proxifyRow - Function to proxify individual rows
 * @param {object} $APP - App instance with SubscriptionManager
 * @returns {object} Reactive array prototype
 */
function createReactiveArrayPrototype(proxifyRow, $APP) {
  const reactiveArrayPrototype = {
    // Pagination metadata (set by proxifyMultipleRows when available)
    total: 0,
    limit: undefined,
    offset: 0,
    count: 0,

    /**
     * Subscribes to changes in the row set.
     * @param {function(Array): void} callback - Fired with the new array.
     */
    subscribe(callback) {
      if (typeof callback !== "function") {
        console.error("Subscription callback must be a function.");
        return this;
      }
      // On the first subscription, register query-level listener
      if (this.subscriptions.size === 0) {
        this.registerListeners();
      }
      this.subscriptions.add(callback);
      return this;
    },

    /**
     * Unsubscribes from changes.
     * @param {function} callback - The original callback to remove.
     */
    unsubscribe(callback) {
      this.subscriptions.delete(callback);
      // If last subscription is gone, destroy all listeners
      if (this.subscriptions.size === 0) {
        this.destroy();
      }
    },

    /**
     * Notifies all set-level subscribers with the current rows.
     */
    notifySubscribers() {
      // Pass a shallow copy so subscribers can't mutate our internal array
      const rowsCopy = [...this];
      this.subscriptions.forEach((cb) => {
        try {
          cb(rowsCopy);
        } catch (err) {
          console.error("Error in ReactiveArray subscription callback:", err);
        }
      });
    },

    /**
     * Handle query-level update notifications from SubscriptionManager
     * @param {object} event - Event object { action, record, model }
     * @private
     */
    handleQueryUpdate(event) {
      const { action, record } = event;

      switch (action) {
        case "add":
        case "create":
          this.handleRecordAdd(record);
          break;

        case "update":
        case "edit":
          this.handleRecordUpdate(record);
          break;

        case "delete":
        case "remove":
          this.handleRecordDelete(record);
          break;
      }
    },

    /**
     * Handle a new record being added
     * @param {object} newRecord - The new record
     * @private
     */
    handleRecordAdd(newRecord) {
      // Check if already in array
      if (this.some((r) => String(r.id) === String(newRecord.id))) {
        return;
      }

      // Proxify and add to array
      const proxified = proxifyRow(newRecord, this.modelName);
      this.push(proxified);
      this.notifySubscribers();
    },

    /**
     * Handle a record being updated
     * @param {object} updatedRecord - The updated record
     * @private
     */
    handleRecordUpdate(updatedRecord) {
      const index = this.findIndex(
        (r) => String(r.id) === String(updatedRecord.id),
      );

      if (index > -1) {
        // Record exists in our array
        // Check if still matches our where clause
        const stillMatches =
          !this.opts.where || simpleMatcher(updatedRecord, this.opts.where);

        if (stillMatches) {
          // Replace with new proxified row (ensures different object reference for change detection)
          const newRow = proxifyRow(updatedRecord, this.modelName);
          this[index] = newRow;
          this.notifySubscribers();
        } else {
          // No longer matches - remove from array
          this.splice(index, 1);
          this.notifySubscribers();
        }
      } else {
        // Record not in array, but might match now (e.g., status changed to 'active')
        const matches =
          !this.opts.where || simpleMatcher(updatedRecord, this.opts.where);

        if (matches) {
          this.handleRecordAdd(updatedRecord);
        }
      }
    },

    /**
     * Handle a record being deleted
     * @param {object} deletedRecord - The deleted record (with at least { id })
     * @private
     */
    handleRecordDelete(deletedRecord) {
      const index = this.findIndex(
        (r) => String(r.id) === String(deletedRecord.id),
      );
      if (index > -1) {
        this.splice(index, 1);
        this.notifySubscribers();
      }
    },

    /**
     * Registers query-level listener via SubscriptionManager
     * @private
     */
    registerListeners() {
      // Subscribe to this specific query (model + where clause)
      $APP.SubscriptionManager.subscribe(
        this.modelName,
        this.opts.where,
        (event) => this.handleQueryUpdate(event),
      )
        .then((unsubscribe) => {
          this.queryUnsubscribe = unsubscribe;
        })
        .catch((error) => {
          console.error("Failed to register query subscription:", error);
        });
    },

    /**
     * Cleans up all listeners to prevent memory leaks.
     * @private
     */
    destroy() {
      if (
        this.queryUnsubscribe &&
        typeof this.queryUnsubscribe === "function"
      ) {
        this.queryUnsubscribe();
        this.queryUnsubscribe = null;
      }
      this.subscriptions.clear();
    },
  };
  Object.setPrototypeOf(reactiveArrayPrototype, Array.prototype);
  return reactiveArrayPrototype;
}

/**
 * Create instance proxy handler for model rows
 * @param {object} Model - Model instance
 * @param {object} $APP - App instance
 * @returns {ProxyHandler} Instance proxy handler
 */
function createInstanceProxyHandler(Model, $APP) {
  return {
    get(target, prop, receiver) {
      if (prop === "remove")
        return () =>
          Model.request("REMOVE", target._modelName, { id: target.id });

      if (prop === "update")
        return () => {
          const cleanRow = { ...target };
          delete cleanRow._modelName;
          return Model.request("EDIT", target._modelName, {
            row: cleanRow,
          });
        };

      if (prop === "include") {
        return async (include) => {
          if (!target.id || !target._modelName) {
            console.error(
              "Cannot run .include() on an object without an ID or model name.",
            );
            return receiver;
          }

          if (!(target._modelName in $APP.models))
            throw new Error(
              \`Model \${target._modelName} does not exist in models\`,
            );

          const model = $APP.models[target._modelName];
          const propDef = model[include];
          if (!propDef)
            throw new Error(
              \`Relationship '\${include}' not found in \${target._modelName} model\`,
            );
          const freshData = await Model.request(
            "GET_MANY",
            propDef.targetModel,
            {
              opts: {
                where: propDef.belongs
                  ? target[include]
                  : { [propDef.targetForeignKey]: target.id },
              },
            },
          );
          target[include] = Model.proxifyMultipleRows(
            freshData,
            propDef.targetModel,
          );

          return receiver;
        };
      }

      /**
       * Instance method: Subscribe to updates on this specific row instance.
       * Uses SubscriptionManager under the hood with a single-row query.
       */
      if (prop === "subscribe") {
        return (callback) => {
          if (typeof callback !== "function") {
            console.error("Subscription callback must be a function.");
            return target;
          }

          // Use SubscriptionManager with single-row query
          if ($APP.SubscriptionManager) {
            $APP.SubscriptionManager.subscribe(
              target._modelName,
              { id: target.id },
              (event) => {
                const { action, record } = event;
                if (action === "delete" || action === "remove") {
                  callback(undefined); // Signal deletion
                } else {
                  callback(record); // Pass updated record
                }
              },
            )
              .then((unsubscribe) => {
                // Store unsubscribe function on the target for later cleanup
                if (!target[SUBSCRIPTION_SYMBOL]) {
                  target[SUBSCRIPTION_SYMBOL] = new Set();
                }
                target[SUBSCRIPTION_SYMBOL].add({
                  callback,
                  unsubscribe,
                });
              })
              .catch((error) => {
                console.error("Failed to create row subscription:", error);
              });
          } else {
            // Fallback to old method if SubscriptionManager not available
            if (!target[SUBSCRIPTION_SYMBOL]) {
              target[SUBSCRIPTION_SYMBOL] = new Set();
            }
            target[SUBSCRIPTION_SYMBOL].add(callback);
          }

          return target;
        };
      }

      /**
       * Instance method: Unsubscribe from updates on this row instance.
       * @deprecated Use query-level subscriptions instead
       */
      if (prop === "unsubscribe") {
        return (callback) => {
          if (target[SUBSCRIPTION_SYMBOL]) {
            // Find and call unsubscribe function if using SubscriptionManager
            for (const item of target[SUBSCRIPTION_SYMBOL]) {
              if (
                typeof item === "object" &&
                item.callback === callback &&
                item.unsubscribe
              ) {
                item.unsubscribe();
                target[SUBSCRIPTION_SYMBOL].delete(item);
                return;
              }
            }
            // Fallback for old method
            target[SUBSCRIPTION_SYMBOL].delete(callback);
          }
        };
      }

      return target[prop];
    },

    set(target, prop, value) {
      target[prop] = value;
      return true;
    },
  };
}

/**
 * Create the Model proxy system
 * @param {object} $APP - App instance with models, events, SubscriptionManager
 * @returns {Proxy} Model proxy
 */
export function createModel($APP) {
  let Model;
  let instanceProxyHandler;
  let reactiveArrayPrototype;

  /**
   * Auto-subscribe to included relationships so changes propagate
   * @param {object} row - The row with loaded relationships
   * @param {string} modelName - Name of the model
   * @param {Array<string>} includes - Relationship names that were included
   */
  const autoSubscribeRelationships = (row, modelName, includes) => {
    if (!row || !includes?.length || !$APP.models?.[modelName]) return;

    const modelDef = $APP.models[modelName];
    const unsubscribers = [];

    for (const relationName of includes) {
      const relDef = modelDef[relationName];
      if (!relDef || !relDef.targetModel) continue;

      const targetModel = relDef.targetModel;

      if (relDef.belongs) {
        // Single foreign key: subscribe to that record
        // row[relationName] could be the ID or the loaded object
        const relData = row[relationName];
        const relId = typeof relData === "object" ? relData?.id : relData;
        if (relId) {
          subscribeToRelated(
            targetModel,
            { id: relId },
            row,
            relationName,
            unsubscribers,
          );
        }
      } else if (relDef.belongs_many) {
        // Array of foreign keys or loaded objects
        const relArray = row[relationName] || [];
        for (const item of relArray) {
          const itemId = typeof item === "object" ? item?.id : item;
          if (itemId) {
            subscribeToRelated(
              targetModel,
              { id: itemId },
              row,
              relationName,
              unsubscribers,
            );
          }
        }
      } else if (relDef.many || relDef.one) {
        // Reverse relationship: subscribe to targetModel where foreignKey = row.id
        const foreignKey =
          relDef.targetForeignKey || \`\${modelName.toLowerCase()}Id\`;
        subscribeToRelated(
          targetModel,
          { [foreignKey]: row.id },
          row,
          relationName,
          unsubscribers,
        );
      }
    }

    // Store unsubscribers on the row for cleanup
    if (unsubscribers.length > 0) {
      row[RELATIONSHIP_SUBS_SYMBOL] = unsubscribers;
    }
  };

  /**
   * Subscribe to a related model and update parent row when changes occur
   */
  const subscribeToRelated = (
    targetModel,
    where,
    parentRow,
    relationName,
    unsubscribers,
  ) => {
    if (!$APP.SubscriptionManager) return;

    $APP.SubscriptionManager.subscribe(targetModel, where, (event) => {
      const { action, record } = event;

      if (action === "update" || action === "edit") {
        // Update the relationship data in parent row
        updateRelationshipData(parentRow, relationName, record);
      } else if (action === "delete" || action === "remove") {
        // Remove from relationship if it's an array
        removeFromRelationship(parentRow, relationName, record);
      }
    })
      .then((unsubscribe) => {
        if (unsubscribe) {
          unsubscribers.push(unsubscribe);
        }
      })
      .catch((err) => {
        console.error("Failed to subscribe to relationship:", err);
      });
  };

  /**
   * Update relationship data when a related record changes
   */
  const updateRelationshipData = (parentRow, relationName, updatedRecord) => {
    const currentData = parentRow[relationName];

    if (Array.isArray(currentData)) {
      // Find and update the record in the array
      const index = currentData.findIndex(
        (item) => String(item?.id || item) === String(updatedRecord.id),
      );
      if (index > -1) {
        // Create new array with updated item for change detection
        const newArray = [...currentData];
        newArray[index] = updatedRecord;
        parentRow[relationName] = newArray;
      }
    } else if (currentData && typeof currentData === "object") {
      // Single relationship - replace with updated data
      if (String(currentData.id) === String(updatedRecord.id)) {
        parentRow[relationName] = updatedRecord;
      }
    }
  };

  /**
   * Remove a deleted record from relationship array
   */
  const removeFromRelationship = (parentRow, relationName, deletedRecord) => {
    const currentData = parentRow[relationName];

    if (Array.isArray(currentData)) {
      const newArray = currentData.filter(
        (item) => String(item?.id || item) !== String(deletedRecord.id),
      );
      if (newArray.length !== currentData.length) {
        parentRow[relationName] = newArray;
      }
    } else if (currentData && typeof currentData === "object") {
      if (String(currentData.id) === String(deletedRecord.id)) {
        parentRow[relationName] = null;
      }
    }
  };

  const handleModelRequest = async ({ modelName, action, payload }) => {
    const result = await Model.request(action, modelName, payload);
    if (action === "ADD_MANY" && result && Array.isArray(result.results)) {
      result.results.forEach((res) => {
        if (res.status === "fulfilled" && res.value) {
          res.value = proxifyRow(res.value, modelName);
        }
      });
      return result;
    }
    if (action.includes("MANY")) {
      if (payload.opts.object) return result;
      const opts = payload.opts || {};
      if (result?.items) {
        // Extract pagination info from result
        const paginationInfo = {
          total: result.total,
          limit: result.limit,
          offset: result.offset,
          count: result.count,
        };
        // Proxify items with pagination metadata attached to the array
        const reactiveItems = proxifyMultipleRows(
          result.items,
          modelName,
          opts,
          paginationInfo,
        );
        // Auto-subscribe for each row if includes provided
        if (opts.includes?.length) {
          reactiveItems.forEach((row) =>
            autoSubscribeRelationships(row, modelName, opts.includes),
          );
        }
        // Return the reactive array directly (pagination info is on the array itself)
        return reactiveItems;
      }
      const proxified = proxifyMultipleRows(result, modelName, opts);
      // Auto-subscribe for each row if includes provided
      if (opts.includes?.length) {
        proxified.forEach((row) =>
          autoSubscribeRelationships(row, modelName, opts.includes),
        );
      }
      return proxified;
    }
    if (["ADD", "EDIT"].includes(action)) {
      if (result[0]) return [result[0], null];
      return [null, proxifyRow(result[1], modelName)];
    }

    const proxifiedResult = proxifyRow(result, modelName);
    // Auto-subscribe if includes provided for single record
    if (payload.opts?.includes?.length && proxifiedResult) {
      autoSubscribeRelationships(
        proxifiedResult,
        modelName,
        payload.opts.includes,
      );
    }
    return proxifiedResult;
  };

  const getMethodRegistry = (modelName) => [
    {
      type: "static",
      name: "get",
      handler: (idOrOpts, opts = {}) =>
        handleModelRequest({
          modelName,
          action: "GET",
          payload: ["string", "number"].includes(typeof idOrOpts)
            ? { id: idOrOpts, opts }
            : { opts: idOrOpts },
        }),
    },
    {
      type: "static",
      name: "getAll",
      handler: (opts = {}) =>
        handleModelRequest({
          modelName,
          action: "GET_MANY",
          payload: { opts },
        }),
    },
    {
      type: "static",
      name: "add",
      handler: (row, opts) =>
        handleModelRequest({
          modelName,
          action: "ADD",
          payload: { row, opts },
        }),
    },
    {
      type: "static",
      name: "addMany",
      handler: (rows, opts) =>
        handleModelRequest({
          modelName,
          action: "ADD_MANY",
          payload: { rows, opts },
        }),
    },
    {
      type: "static",
      name: "remove",
      handler: (id) => Model.request("REMOVE", modelName, { id }),
    },
    {
      type: "static",
      name: "removeAll",
      handler: (where) =>
        Model.request("REMOVE_MANY", modelName, { opts: { where } }),
    },
    {
      type: "static",
      name: "edit",
      handler: (row) =>
        handleModelRequest({
          modelName,
          action: "EDIT",
          payload: { row },
        }),
    },
    {
      type: "static",
      name: "editAll",
      handler: (where, updates) =>
        Model.request("EDIT_MANY", modelName, { opts: { where, updates } }),
    },
    {
      type: "static",
      name: "upsert",
      handler: (row, opts) =>
        handleModelRequest({
          modelName,
          action: row?.id ? "EDIT" : "ADD",
          payload: { row, opts },
        }),
    },
    { type: "dynamic", prefix: "getBy", action: "GET" },
    { type: "dynamic", prefix: "getAllBy", action: "GET_MANY" },
    { type: "dynamic", prefix: "editAllBy", action: "EDIT_MANY" },
    { type: "dynamic", prefix: "editBy", action: "EDIT" },
    { type: "dynamic", prefix: "removeBy", action: "REMOVE" },
    { type: "dynamic", prefix: "removeAllBy", action: "REMOVE_MANY" },
  ];

  const proxifyRow = (row, modelName) => {
    if (!row || typeof row !== "object" || row.errors) return row;

    // If row already exists in cache, create NEW object (immutable update for change detection)
    if (Model[modelName].rows[row.id]) {
      const existingRow = Model[modelName].rows[row.id];
      // Create NEW object with merged data instead of mutating
      const updatedRow = { ...existingRow, ...row };
      updatedRow._modelName = modelName;

      // Replace in cache with new object
      Model[modelName].rows[row.id] = updatedRow;

      // Transfer and trigger subscriptions with the NEW object reference
      const subscriptions = existingRow[SUBSCRIPTION_SYMBOL];
      if (subscriptions && subscriptions.size > 0) {
        updatedRow[SUBSCRIPTION_SYMBOL] = subscriptions;
        subscriptions.forEach(({ callback }) => {
          try {
            callback(updatedRow);
          } catch (err) {
            console.error(
              "Error in row subscription callback (manual update):",
              err,
            );
          }
        });
      }
      // Return proxy wrapping the NEW object
      return new Proxy(updatedRow, instanceProxyHandler);
    }

    // New row: cache it, set up listener, and return new proxy
    Model[modelName].rows[row.id] = row;

    Model[modelName].on(\`get:\${row.id}\`, (data) => {
      const rowInstance = Model[modelName].rows[row.id];
      // Get subscriptions *before* potentially deleting the row
      const subscriptions = rowInstance
        ? rowInstance[SUBSCRIPTION_SYMBOL]
        : undefined;

      if (data === undefined) {
        // Data is gone, notify subscribers and delete from cache
        delete Model[modelName].rows[row.id];

        if (subscriptions && subscriptions.size > 0) {
          subscriptions.forEach(({ callback }) => {
            try {
              callback(undefined); // Signal deletion
            } catch (err) {
              console.error(
                "Error in row subscription callback (deletion):",
                err,
              );
            }
          });
          subscriptions.clear();
        }
        return;
      }

      // Data updated, merge changes
      const { id: _, ...newRow } = data;
      Object.assign(rowInstance, newRow);

      // Notify subscribers of the update
      if (subscriptions && subscriptions.size > 0) {
        subscriptions.forEach(({ callback }) => {
          try {
            callback(rowInstance); // Pass the updated row instance
          } catch (err) {
            console.error("Error in row subscription callback (update):", err);
          }
        });
      }
    });

    row._modelName = modelName;
    const proxified = new Proxy(
      Model[modelName].rows[row.id],
      instanceProxyHandler,
    );

    return proxified;
  };

  /**
   * Proxifies multiple rows and returns a ReactiveRowSet for query-level reactivity.
   * @param {Array<object>} rows - The array of row data.
   * @param {string} modelName - The name of the model.
   * @param {object} [opts={}] - The original query options.
   * @param {object} [paginationInfo=null] - Pagination metadata {total, limit, offset, count}.
   * @returns {ReactiveRowSet | Array}
   */
  const proxifyMultipleRows = (
    rows,
    modelName,
    opts = {},
    paginationInfo = null,
  ) => {
    if (!Array.isArray(rows)) return rows;

    // Create the individual proxified rows
    const proxifiedRows = rows.map((row) => proxifyRow(row, modelName));

    // Augment the array with reactive capabilities
    Object.setPrototypeOf(proxifiedRows, reactiveArrayPrototype);

    // Initialize reactive properties on the instance
    proxifiedRows.modelName = modelName;
    proxifiedRows.opts = opts;
    proxifiedRows.subscriptions = new Set();
    proxifiedRows.queryUnsubscribe = null;

    // Attach pagination info if provided
    if (paginationInfo) {
      proxifiedRows.total = paginationInfo.total;
      proxifiedRows.limit = paginationInfo.limit;
      proxifiedRows.offset = paginationInfo.offset;
      proxifiedRows.count = paginationInfo.count;
    }

    return proxifiedRows;
  };

  const uncapitalize = (str) => {
    if (typeof str !== "string" || !str) return str;
    return str.charAt(0).toLowerCase() + str.slice(1);
  };

  const modelApiCache = new Map();

  Model = new Proxy(
    {},
    {
      get(target, prop, receiver) {
        if (prop in target) return Reflect.get(target, prop, receiver);
        if (modelApiCache.has(prop)) return modelApiCache.get(prop);
        const modelName = prop;
        if (!(prop in $APP.models)) {
          throw new Error(\`Model \${modelName} does not exist in models\`);
        }
        const modelSchema = $APP.models[modelName];
        const methodRegistry = getMethodRegistry(modelName, modelSchema);
        const modelApi = new Proxy(
          Object.assign(Object.create(ModelType.prototype), {
            name: modelName,
          }),
          {
            get(target, methodName, modelReceiver) {
              if (methodName in target)
                return Reflect.get(target, methodName, modelReceiver);
              for (const definition of methodRegistry) {
                if (
                  definition.type === "static" &&
                  definition.name === methodName
                )
                  return definition.handler;

                if (
                  definition.type === "dynamic" &&
                  methodName.startsWith(definition.prefix)
                ) {
                  const property = methodName.slice(definition.prefix.length);
                  if (!property) continue;

                  const propertyKey = uncapitalize(property);

                  if (!(propertyKey in modelSchema))
                    throw new Error(
                      \`Property '\${propertyKey}' not found in model '\${modelName}'\`,
                    );

                  return (value, row = null) => {
                    const payload = {
                      opts: { where: { [propertyKey]: value } },
                    };
                    if (row) payload.opts.row = row;

                    return handleModelRequest({
                      modelName,
                      action: definition.action,
                      payload,
                    });
                  };
                }
              }
              throw new Error(
                \`Method '\${methodName}' not found in model '\${modelName}'\`,
              );
            },
          },
        );
        createEventHandler(modelApi, { getter: false });
        modelApi.rows = {};
        modelApiCache.set(prop, modelApi);
        return modelApi;
      },
    },
  );

  // Initialize the handlers that need Model reference
  instanceProxyHandler = createInstanceProxyHandler(Model, $APP);
  reactiveArrayPrototype = createReactiveArrayPrototype(proxifyRow, $APP);

  // Attach utility methods
  Model.proxifyRow = proxifyRow;
  Model.proxifyMultipleRows = proxifyMultipleRows;
  Model.ModelType = ModelType;

  return Model;
}

export default { createModel, ModelType };
`,mimeType:"text/javascript"},"/$app/model-indexeddb/adapter.js":{content:`/**
 * @file IndexedDB Database Adapter
 * @description IndexedDB adapter implementing the database interface
 */

import { DatabaseAdapterBase } from "/$app/model/adapter-base.js";
import { SystemModelManager } from "./system-model-manager.js";

/**
 * IndexedDB Adapter Configuration
 * @typedef {Object} IndexedDBConfig
 * @property {string} name - Database name
 * @property {number} version - Database version
 * @property {Object} models - Model schemas
 * @property {boolean} [system] - Is system database
 * @property {Function} [onConnected] - Callback when connected
 * @property {boolean} [enableSystemModels] - Enable system model management
 * @property {Function} [buildQueryResult] - Query result builder (injected)
 * @property {Function} [matchesWhere] - Where clause matcher (injected)
 * @property {Function} [validateQueryOptions] - Query options validator (injected)
 * @property {Function} [loadRelationships] - Relationship loader (injected)
 * @property {Function} [loadRelationshipsForMany] - Batch relationship loader (injected)
 * @property {Function} [generateId] - ID generator (injected)
 * @property {Function} [mergeRowUpdates] - Row merge function (injected)
 * @property {Function} [prepareRow] - Row preparation function (injected)
 * @property {Function} [validateRow] - Row validation function (injected)
 * @property {Function} [eventEmitter] - Event emitter for reactivity
 * @property {Object} [subscriptionManager] - Subscription manager for query notifications
 */

export class IndexedDBAdapter extends DatabaseAdapterBase {
  constructor(config) {
    super(config);
    this.db = null;
    this.isConnected = false;
    this.connectionPromise = null;

    // Injected dependencies
    this.buildQueryResult =
      config.buildQueryResult ||
      ((records, options) => ({ items: records, total: records.length }));
    this.matchesWhere = config.matchesWhere || (() => true);
    this.validateQueryOptions = config.validateQueryOptions || (() => {});
    this.loadRelationships = config.loadRelationships || ((a, b, c, r) => r);
    this.loadRelationshipsForMany =
      config.loadRelationshipsForMany || ((a, b, c, r) => r);
    this.generateId =
      config.generateId ||
      ((useStringId) => {
        const id = \`\${Date.now()}\${Math.random().toString(10).substr(2, 2)}\`;
        return useStringId ? id : Number(id);
      });
    this.mergeRowUpdates =
      config.mergeRowUpdates ||
      ((current, updates) => ({ ...current, ...updates }));
    this.prepareRow =
      config.prepareRow || ((models, model, row) => ({ ...row }));
    this.validateRow =
      config.validateRow || (() => ({ valid: true, errors: {} }));
    this.eventEmitter = config.eventEmitter || null;
    this.subscriptionManager = config.subscriptionManager || null;

    // System model manager
    this.systemModelManager = config.enableSystemModels
      ? new SystemModelManager(this, config.systemModelManagerOptions || {})
      : null;
  }

  /**
   * Initialize IndexedDB connection
   * @returns {Promise<IDBDatabase>}
   */
  async init() {
    if (this.connectionPromise) return this.connectionPromise;

    this.connectionPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(this.name, Number(this.version));

      request.onerror = (event) => {
        this.connectionPromise = null;
        console.error("IndexedDB: Failed to open database", event.target.error);
        reject(new Error(\`Failed to open database: \${event.target.error}\`));
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        this.isConnected = true;
        this.db.onversionchange = () => {
          console.warn(
            "IndexedDB: Database version changed, closing connection",
          );
          this.close();
        };
        console.log(
          \`IndexedDB: Connected to database "\${this.name}" v\${this.version}\`,
        );
        if (this.onConnected && typeof this.onConnected === "function") {
          this.onConnected();
        }
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const transaction = event.target.transaction;
        console.info(
          \`IndexedDB: Upgrading database to version \${this.version}\`,
        );
        for (const [modelName, schema] of Object.entries(this.models)) {
          if (!db.objectStoreNames.contains(modelName)) {
            this._createObjectStore(db, modelName, schema);
          } else {
            this._updateObjectStore(transaction.objectStore(modelName), schema);
          }
        }
      };
    });

    return this.connectionPromise;
  }

  /**
   * Create an object store with indexes
   * @private
   */
  _createObjectStore(db, storeName, schema) {
    const idField = schema.id;
    const useAutoIncrement = !idField || idField.type === "number";

    const store = db.createObjectStore(storeName, {
      keyPath: "id",
      autoIncrement: useAutoIncrement,
    });

    for (const [field, fieldDef] of Object.entries(schema)) {
      if (fieldDef.index === true || fieldDef.unique === true) {
        store.createIndex(field, field, {
          unique: fieldDef.unique ?? false,
          multiEntry: fieldDef.type === "array",
        });
      }
    }

    console.log(
      \`IndexedDB: Created object store "\${storeName}" with \${Object.keys(schema).length} fields\`,
    );
  }

  /**
   * Update object store indexes
   * @private
   */
  _updateObjectStore(store, schema) {
    for (const [field, fieldDef] of Object.entries(schema)) {
      if (
        (fieldDef.index === true || fieldDef.unique === true) &&
        !store.indexNames.contains(field)
      ) {
        store.createIndex(field, field, {
          unique: fieldDef.unique ?? false,
          multiEntry: fieldDef.type === "array",
        });
        console.log(\`IndexedDB: Added index for field "\${field}"\`);
      }
    }
  }

  /**
   * Execute a transaction
   * @private
   */
  async _executeTransaction(storeNames, mode, callback) {
    await this.init();

    return new Promise((resolve, reject) => {
      const stores = Array.isArray(storeNames) ? storeNames : [storeNames];
      const transaction = this.db.transaction(stores, mode);
      const result = callback(transaction);

      transaction.oncomplete = () => resolve(result);
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(new Error("Transaction aborted"));
    });
  }

  /**
   * Emit an event if eventEmitter is available
   * @private
   */
  _emit(event, data) {
    if (this.eventEmitter && typeof this.eventEmitter === "function") {
      this.eventEmitter(event, data);
    }
  }

  /**
   * Notify query subscribers that match this record change
   * @param {string} model - Model name
   * @param {string} action - Action type: 'add', 'update', 'delete'
   * @param {Object} record - Changed record
   * @private
   */
  _notifyQuerySubscribers(model, action, record) {
    if (!this.subscriptionManager) return;

    const subManager = this.subscriptionManager;
    const queryHashes = subManager.modelToQueries?.get(model);
    if (!queryHashes) return;

    for (const queryHash of queryHashes) {
      const subscription = subManager.subscriptions?.get(queryHash);
      if (!subscription) continue;

      const shouldNotify =
        action === "delete" ||
        !subscription.where ||
        Object.keys(subscription.where).length === 0 ||
        this.matchesWhere(record, subscription.where);

      if (shouldNotify) {
        subscription.callbacks.forEach((callback) => {
          try {
            callback({ action, record, model });
          } catch (error) {
            console.error(
              "IndexedDB: Error in query subscription callback:",
              error,
            );
          }
        });
      }
    }
  }

  /**
   * Get a single record by ID or query
   * @param {string} model - Model name
   * @param {string|number|Object} idOrWhere - Record ID or where clause object
   * @param {Object} [options={}] - Query options
   * @returns {Promise<Object|null>}
   */
  async get(model, idOrWhere, options = {}) {
    try {
      const isId = typeof idOrWhere !== "object" || idOrWhere === null;

      if (isId) {
        const id = idOrWhere;
        let record = await this._executeTransaction(
          model,
          "readonly",
          (transaction) => {
            return new Promise((resolve, reject) => {
              const store = transaction.objectStore(model);
              const request = store.get(id);
              request.onsuccess = () => {
                const row = request.result;
                if (row) {
                  const prepared = this.prepareRow(this.models, model, row, {
                    reverse: true,
                    currentRow: row,
                  });
                  resolve(prepared);
                } else {
                  resolve(null);
                }
              };
              request.onerror = () => reject(request.error);
            });
          },
        );

        if (record && options.includes) {
          record = await this.loadRelationships(
            this,
            this.models,
            model,
            record,
            options.includes,
            options.recursive || false,
          );
        }

        return record;
      } else {
        const where = idOrWhere;
        const results = await this.getAll(model, {
          where,
          limit: 1,
          includes: options.includes,
        });
        return results.length > 0 ? results[0] : null;
      }
    } catch (error) {
      console.error(\`IndexedDB: Error getting record from "\${model}"\`, error);
      throw error;
    }
  }

  /**
   * Get all records matching criteria
   * @param {string} model - Model name
   * @param {Object} [options={}] - Query options
   * @returns {Promise<Array<Object>>}
   */
  async getAll(model, options = {}) {
    this.validateQueryOptions(options);

    try {
      const records = await this._executeTransaction(
        model,
        "readonly",
        (transaction) => {
          return new Promise((resolve, reject) => {
            const store = transaction.objectStore(model);
            const request = store.getAll();

            request.onsuccess = () => {
              const rows = request.result || [];
              const prepared = rows.map((row) =>
                this.prepareRow(this.models, model, row, {
                  reverse: true,
                  currentRow: row,
                }),
              );
              resolve(prepared);
            };
            request.onerror = () => reject(request.error);
          });
        },
      );

      const result = this.buildQueryResult(records, options);
      let items = result.items;

      if (options.includes && items.length > 0) {
        items = await this.loadRelationshipsForMany(
          this,
          this.models,
          model,
          items,
          options.includes,
          options.recursive || false,
        );
      }

      // Return full pagination object if limit was requested
      if (options.limit !== undefined) {
        result.items = items; // items may have relationships loaded
        return result;
      }
      return items;
    } catch (error) {
      console.error(\`IndexedDB: Error getting records from "\${model}"\`, error);
      throw error;
    }
  }

  /**
   * Add a new record
   * @param {string} model - Model name
   * @param {Object} data - Record data
   * @returns {Promise<Object>} Created record with ID
   */
  async add(model, data) {
    // Run beforeAdd hook
    data = await this.runBeforeAdd(model, data);

    const idField = this.models[model]?.id;
    const useStringId = (idField && idField.type === "string") || !idField;
    if (!data.id) data.id = this.generateId(useStringId);

    const validation = this.validateRow(this.models, model, data, {
      operation: "add",
    });
    if (!validation.valid) {
      throw new Error(
        \`Validation failed: \${JSON.stringify(validation.errors)}\`,
      );
    }

    try {
      const prepared = this.prepareRow(this.models, model, data);

      const id = await this._executeTransaction(
        model,
        "readwrite",
        (transaction) => {
          return new Promise((resolve, reject) => {
            try {
              const store = transaction.objectStore(model);
              const request = store.add(prepared);

              request.onsuccess = () => {
                if (!this.system) {
                  this._emit(\`ModelAddRecord-\${model}\`, {
                    model,
                    row: prepared,
                  });
                  this._emit("onAddRecord", { model, row: prepared });
                  this._notifyQuerySubscribers(model, "add", prepared);
                }
                resolve(request.result);
              };
              request.onerror = () => reject(request.error);
            } catch (error) {
              reject(error);
            }
          });
        },
      );

      const result = await this.get(model, id);
      // Run afterAdd hook
      return this.runAfterAdd(model, result);
    } catch (error) {
      console.error(\`IndexedDB: Error adding record to "\${model}"\`, error);
      throw error;
    }
  }

  /**
   * Update an existing record
   * @param {string} model - Model name
   * @param {string|number} id - Record ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated record
   */
  async edit(model, id, data) {
    // Strip immutable fields
    data = this.stripImmutableFields(model, data);

    // Run beforeEdit hook
    data = await this.runBeforeEdit(model, { ...data, id });

    const validation = this.validateRow(this.models, model, data, {
      operation: "edit",
    });
    if (!validation.valid) {
      throw new Error(
        \`Validation failed: \${JSON.stringify(validation.errors)}\`,
      );
    }

    try {
      const currentRecord = await this.get(model, id);
      if (!currentRecord) {
        throw new Error(\`Record with id \${id} not found in model "\${model}"\`);
      }

      const merged = this.mergeRowUpdates(currentRecord, data);
      merged.id = id;
      const prepared = this.prepareRow(this.models, model, merged, {
        currentRow: currentRecord,
      });

      await this._executeTransaction(model, "readwrite", (transaction) => {
        return new Promise((resolve, reject) => {
          const store = transaction.objectStore(model);
          const request = store.put(prepared);

          request.onsuccess = () => {
            if (!this.system) {
              this._emit(\`ModelEditRecord-\${model}\`, {
                model,
                row: prepared,
              });
              this._emit("onEditRecord", { model, row: prepared });
              this._notifyQuerySubscribers(model, "update", prepared);
            }
            resolve(request.result);
          };
          request.onerror = () => reject(request.error);
        });
      });

      const result = await this.get(model, id);
      // Run afterEdit hook
      return this.runAfterEdit(model, result);
    } catch (error) {
      console.error(\`IndexedDB: Error updating record in "\${model}"\`, error);
      throw error;
    }
  }

  /**
   * Delete a record
   * @param {string} model - Model name
   * @param {string|number} id - Record ID
   * @returns {Promise<boolean>} True if deleted
   */
  async remove(model, id) {
    try {
      const record = await this.get(model, id);

      // Run beforeRemove hook - can return false to cancel
      const shouldProceed = await this.runBeforeRemove(model, id, record);
      if (!shouldProceed) {
        return false;
      }

      await this._executeTransaction(model, "readwrite", (transaction) => {
        return new Promise((resolve, reject) => {
          const store = transaction.objectStore(model);
          const request = store.delete(id);
          request.onsuccess = () => {
            if (!this.system) {
              this._emit(\`ModelRemoveRecord-\${model}\`, { model, id });
              this._emit("onRemoveRecord", { model, id });
              this._notifyQuerySubscribers(model, "delete", record || { id });
            }
            resolve(true);
          };
          request.onerror = () => reject(request.error);
        });
      });

      // Run afterRemove hook
      await this.runAfterRemove(model, id, record);

      console.log(\`IndexedDB: Deleted record \${id} from "\${model}"\`);
      return true;
    } catch (error) {
      console.error(\`IndexedDB: Error deleting record from "\${model}"\`, error);
      throw error;
    }
  }

  /**
   * Count records matching criteria
   * @param {string} model - Model name
   * @param {Object} [options={}] - Query options
   * @returns {Promise<number>}
   */
  async count(model, options = {}) {
    const records = await this.getAll(model, { where: options.where });
    return records.length;
  }

  /**
   * Execute operations in a transaction
   * @param {Function} callback - Async function to execute
   * @returns {Promise<*>} Result of callback
   */
  async transaction(callback) {
    await this.init();
    return callback(this);
  }

  /**
   * Close database connection
   * @returns {Promise<void>}
   */
  async close() {
    if (this.db) {
      this.db.close();
      this.db = null;
      this.isConnected = false;
      this.connectionPromise = null;
      console.log("IndexedDB: Connection closed");
    }
  }

  /**
   * Export all model data
   * @returns {Promise<Object>} Data dump object
   */
  async exportData() {
    const dump = {};
    for (const modelName of Object.keys(this.models)) {
      dump[modelName] = await this.getAll(modelName, { object: true });
    }
    return dump;
  }

  /**
   * Import data with optional ID preservation
   * @param {Object} dump - Data dump object
   * @param {Object} options - Import options
   * @param {boolean} options.keepIndex - Whether to preserve original IDs
   * @returns {Promise<void>}
   */
  async importData(dump, options = {}) {
    for (const [modelName, entries] of Object.entries(dump)) {
      if (this.models[modelName])
        await this.addMany(modelName, entries, {
          keepIndex: options.keepIndex,
        });
    }
  }

  /**
   * Get system model manager if supported
   * @returns {SystemModelManager|null}
   */
  getSystemModelManager() {
    return this.systemModelManager;
  }

  /**
   * Get adapter metadata
   * @returns {Object}
   */
  getMetadata() {
    return {
      ...super.getMetadata(),
      type: "indexeddb",
      isConnected: this.isConnected,
      dbName: this.name,
    };
  }
}

export default IndexedDBAdapter;
`,mimeType:"text/javascript"},"/$app/model/adapter-base.js":{content:`/**
 * @file Database Adapter Base Class
 * @description Abstract base class that all database adapters must extend
 */

/**
 * @typedef {Object} QueryOptions
 * @property {number} [limit] - Maximum number of records to return
 * @property {number} [offset] - Number of records to skip
 * @property {string|Array<{field: string, direction: 'ASC'|'DESC'}>} [order] - Sort order
 * @property {Object} [where] - Filter conditions
 * @property {Array<string>} [includes] - Relationships to load
 * @property {boolean} [recursive] - Load nested relationships
 */

/**
 * Abstract base class for database adapters
 * All adapters should extend this class and implement its methods
 */
export class DatabaseAdapterBase {
  constructor({ name, version, models, system, onConnected }) {
    this.name = name;
    this.version = version;
    this.models = models;
    this.system = system;
    this.onConnected = onConnected;
  }

  /**
   * Initialize the database connection
   * @returns {Promise<void>}
   * @abstract
   */
  async init() {
    throw new Error("init() must be implemented by adapter");
  }

  /**
   * Get a single record by ID
   * @param {string} model - Model name
   * @param {string|number} id - Record ID
   * @param {QueryOptions} [options={}] - Query options
   * @returns {Promise<Object|null>} The record or null if not found
   * @abstract
   */
  async get(model, id, options = {}) {
    throw new Error("get() must be implemented by adapter");
  }

  /**
   * Get multiple records
   * @param {string} model - Model name
   * @param {QueryOptions} [options={}] - Query options
   * @returns {Promise<Array<Object>>} Array of records
   * @abstract
   */
  async getAll(model, options = {}) {
    throw new Error("getAll() must be implemented by adapter");
  }

  /**
   * Add a new record
   * @param {string} model - Model name
   * @param {Object} data - Record data
   * @returns {Promise<Object>} The created record with ID
   * @abstract
   */
  async add(model, data) {
    throw new Error("add() must be implemented by adapter");
  }

  /**
   * Add multiple records in a batch
   * @param {string} model - Model name
   * @param {Array<Object>} dataArray - Array of records to create
   * @returns {Promise<Array<Object>>} Array of created records
   */
  async addMany(model, dataArray) {
    const results = [];
    for (const data of dataArray) {
      results.push(await this.add(model, data));
    }
    return results;
  }

  /**
   * Update an existing record
   * @param {string} model - Model name
   * @param {string|number} id - Record ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} The updated record
   * @abstract
   */
  async edit(model, id, data) {
    throw new Error("edit() must be implemented by adapter");
  }

  /**
   * Delete a record
   * @param {string} model - Model name
   * @param {string|number} id - Record ID
   * @returns {Promise<boolean>} True if deleted successfully
   * @abstract
   */
  async remove(model, id) {
    throw new Error("remove() must be implemented by adapter");
  }

  /**
   * Count records matching criteria
   * @param {string} model - Model name
   * @param {QueryOptions} [options={}] - Query options (where clause)
   * @returns {Promise<number>} Count of matching records
   * @abstract
   */
  async count(model, options = {}) {
    throw new Error("count() must be implemented by adapter");
  }

  /**
   * Execute operations within a transaction
   * @param {Function} callback - Async function to execute in transaction
   * @returns {Promise<*>} Result of the callback
   * @abstract
   */
  async transaction(callback) {
    throw new Error("transaction() must be implemented by adapter");
  }

  /**
   * Close the database connection
   * @returns {Promise<void>}
   * @abstract
   */
  async close() {
    throw new Error("close() must be implemented by adapter");
  }

  /**
   * Export all data from this adapter
   * @returns {Promise<Object>} Data dump object
   */
  async exportData() {
    return {};
  }

  /**
   * Import data into this adapter
   * @param {Object} dump - Data dump object
   * @param {Object} options - Import options
   * @param {boolean} options.keepIndex - Whether to preserve original IDs
   * @returns {Promise<void>}
   */
  async importData(dump, options = {}) {}

  /**
   * Get system model manager if supported
   * @returns {Object|null}
   */
  getSystemModelManager() {
    return null;
  }

  /**
   * Get adapter metadata
   * @returns {Object} Metadata about the adapter
   */
  getMetadata() {
    return {
      name: this.constructor.name,
      type: "unknown",
      version: this.version,
      models: Object.keys(this.models || {}),
      system: this.system,
    };
  }

  // ============================================
  // Hook System - Call these from concrete adapters
  // ============================================

  /**
   * Run beforeAdd hook if defined in schema
   * @param {string} model - Model name
   * @param {Object} data - Record data
   * @returns {Promise<Object>} Modified data
   */
  async runBeforeAdd(model, data) {
    const schema = this.models?.[model];
    if (schema?.$hooks?.beforeAdd) {
      return await schema.$hooks.beforeAdd(data, {
        model,
        adapter: this,
        operation: "add",
      });
    }
    return data;
  }

  /**
   * Run afterAdd hook if defined in schema
   * @param {string} model - Model name
   * @param {Object} result - Created record
   * @returns {Promise<Object>} Result (unchanged)
   */
  async runAfterAdd(model, result) {
    const schema = this.models?.[model];
    if (schema?.$hooks?.afterAdd) {
      await schema.$hooks.afterAdd(result, {
        model,
        adapter: this,
        operation: "add",
      });
    }
    return result;
  }

  /**
   * Run beforeEdit hook if defined in schema
   * @param {string} model - Model name
   * @param {Object} data - Update data (should include id)
   * @returns {Promise<Object>} Modified data
   */
  async runBeforeEdit(model, data) {
    const schema = this.models?.[model];
    if (schema?.$hooks?.beforeEdit) {
      return await schema.$hooks.beforeEdit(data, {
        model,
        adapter: this,
        operation: "edit",
      });
    }
    return data;
  }

  /**
   * Run afterEdit hook if defined in schema
   * @param {string} model - Model name
   * @param {Object} result - Updated record
   * @returns {Promise<Object>} Result (unchanged)
   */
  async runAfterEdit(model, result) {
    const schema = this.models?.[model];
    if (schema?.$hooks?.afterEdit) {
      await schema.$hooks.afterEdit(result, {
        model,
        adapter: this,
        operation: "edit",
      });
    }
    return result;
  }

  /**
   * Run beforeRemove hook if defined in schema
   * @param {string} model - Model name
   * @param {string|number} id - Record ID
   * @param {Object} record - Record being deleted
   * @returns {Promise<boolean>} False to cancel deletion
   */
  async runBeforeRemove(model, id, record) {
    const schema = this.models?.[model];
    if (schema?.$hooks?.beforeRemove) {
      const result = await schema.$hooks.beforeRemove(record, {
        model,
        adapter: this,
        operation: "remove",
        id,
      });
      // Return false to cancel deletion
      if (result === false) return false;
    }
    return true;
  }

  /**
   * Run afterRemove hook if defined in schema
   * @param {string} model - Model name
   * @param {string|number} id - Deleted record ID
   * @param {Object} record - Deleted record data
   */
  async runAfterRemove(model, id, record) {
    const schema = this.models?.[model];
    if (schema?.$hooks?.afterRemove) {
      await schema.$hooks.afterRemove(record, {
        model,
        adapter: this,
        operation: "remove",
        id,
      });
    }
  }

  /**
   * Strip immutable fields from update data
   * Call this in edit() before validation
   * @param {string} model - Model name
   * @param {Object} data - Update data
   * @returns {Object} Data with immutable fields removed
   */
  stripImmutableFields(model, data) {
    const schema = this.models?.[model];
    if (!schema) return data;

    const result = { ...data };
    for (const [field, prop] of Object.entries(schema)) {
      if (field.startsWith("$")) continue; // Skip special keys like $hooks
      if (prop?.immutable && field in result && field !== "id") {
        delete result[field];
      }
    }
    return result;
  }
}

/**
 * Validate adapter implementation
 * @param {DatabaseAdapterBase} adapter - Adapter instance to validate
 * @throws {Error} If adapter doesn't implement required methods
 */
export function validateAdapter(adapter) {
  const requiredMethods = [
    "init",
    "get",
    "getAll",
    "add",
    "edit",
    "remove",
    "count",
    "transaction",
    "close",
  ];

  const missing = requiredMethods.filter(
    (method) => typeof adapter[method] !== "function",
  );

  if (missing.length > 0) {
    throw new Error(
      \`Adapter \${adapter.constructor.name} is missing required methods: \${missing.join(", ")}\`,
    );
  }

  return true;
}

export default DatabaseAdapterBase;
`,mimeType:"text/javascript"},"/$app/model-indexeddb/system-model-manager.js":{content:`/**
 * @file System Model Manager
 * @description Manages system models (App, User, Device) for local-first applications
 */

export class SystemModelManager {
  /**
   * @param {Object} db - Database adapter instance
   * @param {Object} [options={}] - Configuration options
   * @param {Function} [options.eventEmitter] - Function to emit events
   * @param {Function} [options.getBackendUser] - Function to get backend user
   * @param {Function} [options.importData] - Function to import data
   */
  constructor(db, options = {}) {
    this.db = db;
    this.MODELS = { APP: "App", USER: "User", DEVICE: "Device" };

    // Injectable dependencies
    this.eventEmitter = options.eventEmitter || (() => {});
    this.getBackendUser = options.getBackendUser || (() => null);
    this.setBackendUser = options.setBackendUser || (() => {});
    this.importData = options.importData || (() => {});
  }

  /**
   * Generate RSA-OAEP key pair for encryption
   * @returns {Promise<{publicKey: string, privateKey: string}>}
   * @private
   */
  async generateKeyPair() {
    const keyPair = await self.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      true,
      ["encrypt", "decrypt"],
    );

    const publicKey = await self.crypto.subtle.exportKey(
      "spki",
      keyPair.publicKey,
    );
    const privateKey = await self.crypto.subtle.exportKey(
      "pkcs8",
      keyPair.privateKey,
    );

    return {
      publicKey: btoa(String.fromCharCode(...new Uint8Array(publicKey))),
      privateKey: btoa(String.fromCharCode(...new Uint8Array(privateKey))),
    };
  }

  /**
   * Get current active app
   * @returns {Promise<Object|null>}
   */
  async getApp() {
    const { items } = await this.db.getAll(this.MODELS.APP, {
      where: { active: true },
      limit: 1,
    });
    return items.length > 0 ? items[0] : null;
  }

  /**
   * Get current active user for an app
   * @param {Object} _app - App object
   * @returns {Promise<Object|null>}
   */
  async getUser(_app) {
    const backendUser = this.getBackendUser();
    if (backendUser) return backendUser;

    const app = _app || (await this.getApp());
    const currentBackendUser = this.getBackendUser();

    if (currentBackendUser && currentBackendUser.appId !== app.id) {
      this.setBackendUser(null);
    }

    if (!this.getBackendUser()) {
      let puser = await this.db.get(this.MODELS.USER, {
        appId: app.id,
        active: true,
      });
      if (!puser) {
        puser = await this.createUserEntry({ app });
      }
      const { privateKey, active, ...user } = puser;
      this.setBackendUser(user);
    }
    return this.getBackendUser();
  }

  /**
   * Get device for user
   * @param {Object} options
   * @param {Object} options.app - App object
   * @param {Object} options.user - User object
   * @returns {Promise<Object|null>}
   */
  async getDevice({ app: _app, user: _user } = {}) {
    const app = _app || (await this.getApp());
    const user = _user || (await this.getUser(app));
    if (!user) throw new Error("User not found");
    const device = await this.db.get(this.MODELS.DEVICE, {
      userId: user.id,
      active: true,
    });
    return device || null;
  }

  /**
   * Create new app entry
   * @param {Object} options
   * @param {number} options.timestamp - Creation timestamp
   * @param {string} options.id - App ID
   * @param {number} options.version - App version
   * @returns {Promise<Object>}
   */
  async createAppEntry({
    timestamp = Date.now(),
    id = timestamp.toString(),
    version = 1,
  } = {}) {
    const app = {
      id,
      version,
      active: true,
    };

    await this.db.add(this.MODELS.APP, app);
    await this.eventEmitter("APP:CREATED", { app });
    return app;
  }

  /**
   * Create user entry for app
   * @param {Object} options
   * @param {Object} options.app - App object
   * @param {Object} options.device - Device data
   * @param {Object} options.user - User data
   * @returns {Promise<Object>}
   */
  async createUserEntry({ app: _app, device, user } = {}) {
    const app = _app || (await this.getApp());
    if (!user) {
      const existingUsers = await this.db.getAll(this.MODELS.USER, {
        where: {
          active: true,
          appId: app.id,
        },
        limit: 1,
      });
      const existingUser = existingUsers.length > 0 ? existingUsers[0] : null;

      if (existingUser) {
        existingUser.privateKey = null;
        const existingDevices = await this.db.getAll(this.MODELS.DEVICE, {
          where: {
            userId: existingUser.id,
            active: true,
          },
          limit: 1,
        });
        const existingDevice =
          existingDevices.length > 0 ? existingDevices[0] : null;
        if (!existingDevice) await this.db.add(this.MODELS.DEVICE, device);
        return existingUser;
      }
    }

    const { publicKey, privateKey } = await this.generateKeyPair();
    const newUser = user || {
      id: user?.id,
      name: user?.name || "Local User",
      publicKey,
      privateKey,
      appId: app.id,
      active: true,
    };
    await this.db.add(this.MODELS.USER, newUser);

    const newDevice = device || {
      userId: newUser.id,
      appId: app.id,
      active: true,
    };
    await this.db.add(this.MODELS.DEVICE, newDevice);
    newUser.privateKey = null;
    return newUser;
  }

  /**
   * List all apps
   * @returns {Promise<Array>}
   */
  async listApps() {
    return await this.db.getAll(this.MODELS.APP);
  }

  /**
   * Select app by ID
   * @param {string} appId - App ID to select
   * @returns {Promise<Object>}
   */
  async selectApp(appId) {
    const currentApp = await this.getApp();
    if (currentApp && currentApp.id !== appId) {
      await this.db.edit(this.MODELS.APP, currentApp.id, {
        active: false,
      });
    }

    await this.db.edit(this.MODELS.APP, appId, {
      active: true,
    });

    return await this.db.get(this.MODELS.APP, appId);
  }

  /**
   * Migrate data to database
   * @param {Object} data - Data to migrate
   * @param {Object} opts - Migration options
   * @param {boolean} opts.skipDynamicCheck - Skip dynamic model check
   */
  async migrateData(data, app) {
    const appsData = Object.entries(data || {});
    if (appsData.length) {
      const dump = {};
      for (const [modelName, entries] of appsData) {
        dump[modelName] = entries;
      }
      console.error({ dump, app });
      this.importData({ dump, app });

      await this.db.edit(this.MODELS.APP, app.id, {
        migrationTimestamp: Date.now(),
      });
    }
  }
}

export default SystemModelManager;
`,mimeType:"text/javascript"},"/views/templates/app.js":{content:`import Router from "/$app/router/index.js";
import T from "/$app/types/index.js";
import $APP from "/$app.js";
import { html } from "/npm/lit-html";

const { brand, navTabs } = $APP.settings;

export default {
  class: "min-h-screen w-full bg-purple-50 flex flex-col font-sans",
  properties: {
    currentRoute: T.object({ sync: Router }),
    currentLang: T.string("en"),
    modalItem: T.object(null),
    modalOpen: T.boolean(false),
    userId: T.number({ sync: "local" }),
  },
  getActiveTabFromRoute() {
    const rN = this.currentRoute?.name;
    const tabIds = navTabs.map((t) => t.id).filter((id) => id !== "discover");
    return tabIds.includes(rN) ? rN : "discover";
  },
  render() {
    const aT = this.getActiveTabFromRoute();

    return html\`
      <!-- Desktop Top Nav -->
      <nav class="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b-3 border-black">
        <view-logo></view-logo>
        <div class="flex items-center gap-6">
          \${navTabs.map(
            (tab) => html\`
              <uix-link
                href=\${tab.route}
                class="font-bold uppercase text-sm transition-colors \${aT === tab.id ? brand.accentClass : \`text-black hover:\${brand.accentClass}\`}"
              >
                \${tab.label}
              </uix-link>
            \`,
          )}
          <uix-link
            href="/profile"
            class="w-10 h-10 rounded-full bg-green-300 border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <uix-icon name="user" size="sm"></uix-icon>
          </uix-link>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto no-scrollbar pb-24 md:pb-0">
        \${this.currentRoute.component}
      </main>

      <!-- Mobile Bottom Nav -->
      <nav class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden bg-black rounded-full">
        <div class="px-4 py-3 flex items-center gap-4">
        \${navTabs.map(
          (tab) => html\`
            <uix-link
              href=\${tab.route}
              class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 \${
                aT === tab.id
                  ? "bg-white/10 ring-2 ring-white text-white"
                  : "text-gray-400 hover:text-white"
              }"
            >
              <uix-icon name=\${tab.icon} size="md"></uix-icon>
            </uix-link>
          \`,
        )}
        </div>
      </nav>

      <!-- Modal -->
      <view-item-modal .item=\${this.modalItem} .isOpen=\${this.modalOpen} @close=\${() => {
        this.modalOpen = false;
        this.modalItem = null;
      }}></view-item-modal>
    \`;
  },
};
`,mimeType:"text/javascript"},"/views/logo.js":{content:`import { html } from "/npm/lit-html";

export default {
  render() {
    return html\`<uix-link href="/" class="text-2xl font-black uppercase tracking-tight">
          <uix-icon name="tree-palm" size="lg"></uix-icon>
          \${$APP.settings.brand.name}<span class="\${$APP.settings.brand.accentClass} -ml-1">\${$APP.settings.brand.accent}</span>
        </uix-link>\`;
  },
};
`,mimeType:"text/javascript"},"/$app/uix/display/link.js":{content:`/**
 * App Link Component
 * Core link component for navigation and routing
 * Popup behaviors (tooltip, dropdown, etc.) moved to separate uix components
 */

import Router from "/$app/router/index.js";
import T from "/$app/types/index.js";
import { html } from "/npm/lit-html";

export default {
  tag: "uix-link",
  style: true,
  shadow: true,
  properties: {
    content: T.object(),
    external: T.boolean(),
    skipRoute: T.boolean(),
    hideLabel: T.boolean(),
    disabled: T.boolean(),
    name: T.string(),
    alt: T.string(),
    label: T.string(),
    type: T.string(),
    href: T.string(),
    related: T.string(),
    icon: T.string(),
    click: T.function(),
    confirmation: T.string(),
    popovertarget: T.string(),
    popovertargetaction: T.string(),
  },
  _handlePopoverTarget(e) {
    if (!this.popovertarget) return false;

    const target = document.getElementById(this.popovertarget);
    if (!target || typeof target.toggle !== "function") return false;

    e.preventDefault();
    e.stopPropagation();

    // Get the actual button/anchor element from shadow DOM
    const triggerElement = this.shadowRoot.querySelector("button, a");

    const action = this.popovertargetaction || "toggle";
    if (action === "toggle") {
      target.toggle(triggerElement);
    } else if (action === "show") {
      target._open(triggerElement);
    } else if (action === "hide") {
      target._close();
    }

    return true;
  },

  _defaultOnClick(e) {
    // Prevent any action if disabled
    if (this.disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }

    // Handle popover target first
    if (this._handlePopoverTarget(e)) {
      return;
    }

    // Use shared router link handler for SPA navigation
    if (this.href && !this.skipRoute) {
      const handled = Router.handleLinkClick(e, { external: this.external });
      if (handled) return;
    }

    // Prevent default for links without href
    if (!this.href) {
      e.preventDefault();
    }

    // Handle custom click handler
    if (this.click && this.type !== "submit") {
      if (this.confirmation) {
        if (window.confirm(this.confirmation)) {
          this.click(e);
        }
      } else {
        this.click(e);
      }
      e.stopImmediatePropagation();
    }
  },
  render() {
    const content = html\`
      \${this.icon ? html\`<uix-icon name=\${this.icon} part="icon"></uix-icon>\` : null}
      <slot></slot>
      \${this.hideLabel ? null : this.label}
    \`;
    const useButton = !this.href && this.popovertarget;

    if (useButton) {
      return html\`
        <button
          part="anchor"
          @click=\${this._defaultOnClick}
          name=\${this.name || this.label || this.alt}
          aria-disabled=\${this.disabled ? "true" : "false"}
          ?disabled=\${this.disabled}
          type="button"
        >
          \${content}
        </button>
      \`;
    }

    return html\`
      <a
        part="anchor"
        href=\${this.disabled ? undefined : this.href || "#"}
        @click=\${this._defaultOnClick}
        related=\${this.related}
        name=\${this.name || this.label || this.alt}
        alt=\${this.alt || this.label || this.name}
        aria-disabled=\${this.disabled ? "true" : "false"}
        ?disabled=\${this.disabled}
      >
        \${content}
      </a>
    \`;
  },
};
`,mimeType:"text/javascript"},"/$app/uix/display/icon.js":{content:`import T from "/$app/types/index.js";
import { settings } from "/$app/view/index.js";
import { unsafeHTML } from "/npm/lit-html/directives/unsafe-html.js";

const Icons = new Map();
export default {
  tag: "uix-icon",
  style: true,
  static: { Icons },
  properties: {
    name: T.string(),
    svg: T.string(),
    solid: T.boolean(),
    size: T.string(),
    color: T.string({
      enum: [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "inverse",
      ],
    }),
  },
  async getIcon(name) {
    if (Icons.has(name)) this.svg = Icons.get(name);
    else {
      try {
        const response = await fetch(\`\${settings.iconFontFamily}/\${name}.svg\`);
        if (response.ok) {
          const svgElement = await response.text();
          Icons.set(name, svgElement);
          this.svg = svgElement;
        } else {
          console.error(\`Failed to fetch icon: \${name}\`);
        }
      } catch (error) {
        console.error(\`Error fetching icon: \${name}\`, error);
      }
    }
  },
  willUpdate({ changedProps }) {
    if (changedProps.has("name")) this.getIcon(this.name);
  },
  connected() {
    this.getIcon(this.name);
  },
  render() {
    return !this.svg ? null : unsafeHTML(this.svg);
  },
};

/**
 * Copyright (c) Alan Carlos Meira Leal
 *
 * Icon Component
 *
 * @component
 * @category media
 * @tag uix-icon
 *
 * Displays an SVG icon fetched dynamically from the configured icon font family.
 * Supports various sizes, semantic colors, and solid/outline styles.
 *
 * @property {string} name - The name of the icon to display (e.g., "home", "user", "settings")
 * @property {string} size - The size of the icon (xs, sm, md, lg, xl, 2xl, 3xl)
 * @property {string} color - Semantic color (primary, secondary, success, danger, warning, info, inverse)
 * @property {boolean} solid - Whether to use the solid/filled version of the icon style
 *
 * @example Basic Usage
 * \`\`\`html
 * <uix-icon name="house"></uix-icon>
 * \`\`\`
 *
 * @example All Sizes
 * \`\`\`html
 * * <uix-icon name="star" size="xs"></uix-icon>
 *
 * * <uix-icon name="star" size="sm"></uix-icon>
 *
 * * <uix-icon name="star" size="md"></uix-icon>
 *
 * * <uix-icon name="star" size="lg"></uix-icon>
 *
 * * <uix-icon name="star" size="xl"></uix-icon>
 *
 * * <uix-icon name="star" size="2xl"></uix-icon>
 *
 * * <uix-icon name="star" size="3xl"></uix-icon>
 *
 * * <uix-icon name="star" size="4xl"></uix-icon>
 * \`\`\`
 *
 * @example With Semantic Colors
 * \`\`\`html
 * <uix-icon name="circle-check" color="success" size="lg"></uix-icon>
 * <uix-icon name="exclamation-circle" color="danger" size="lg"></uix-icon>
 * <uix-icon name="info-circle" color="info" size="lg"></uix-icon>
 * \`\`\`
 *
 * @example Solid Style
 * \`\`\`html
 * * <uix-icon name="heart" size="xl" color="danger"></uix-icon>
 *
 * * <uix-icon name="heart" size="xl" color="danger" solid></uix-icon>
 * \`\`\`
 */
`,mimeType:"text/javascript"},"/views/discover-view.js":{content:`import T from "/$app/types/index.js";
import $APP from "/$app.js";
import { html } from "/npm/lit-html";
import { NBS } from "./utils.js";

const { brand } = $APP.settings;

export default {
  style: true,

  properties: {
    userId: T.string({ defaultValue: "guest" }),
    places: T.array({ sync: $APP.Model.places, query: {} }),
    events: T.array({ sync: $APP.Model.events, query: {} }),
    groups: T.array({ sync: $APP.Model.groups, query: {} }),
    guides: T.array({ sync: $APP.Model.guides, query: {} }),
    // TODO: MEETUPS HIDDEN - Restore when feature returns
    // meetups: T.array({ sync: $APP.Model.meetups, query: {} }),
    // meetupAttendance: T.array({ defaultValue: [] }),
    searchQuery: T.string({ defaultValue: "" }),
  },
  async connected() {
    this.userId = $APP.Auth.isAuthenticated ? $APP.Auth.currentUserId : "guest";
    // TODO: MEETUPS HIDDEN - Restore when feature returns
    // this.meetupAttendance = await $APP.Model.meetup_attendance.getAll({
    //   where: { user: this.userId },
    // });
  },
  isLoading() {
    return !this.places || !this.events || !this.groups;
  },
  // TODO: MEETUPS HIDDEN - Restore when feature returns
  // isJoined(meetupId) {
  //   return this.meetupAttendance?.some((a) => a.meetup === meetupId) || false;
  // },
  getNextEvents() {
    return (this.events || []).sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );
  },
  // TODO: MEETUPS HIDDEN - Restore when feature returns
  // getMyMeetups() {
  //   const joinedMeetupIds = new Set(
  //     (this.meetupAttendance || []).map((a) => a.meetup),
  //   );
  //   return (this.meetups || []).filter((m) => joinedMeetupIds.has(m.id));
  // },
  getFeaturedGuides() {
    return (this.guides || []).filter((g) => g.featured).slice(0, 2);
  },
  getRecommendedItems() {
    // Combine recommended places and events
    const recPlaces = (this.places || []).filter(
      (p) => p.recommended || p.viewCount >= 100,
    );
    const recEvents = (this.events || []).filter(
      (e) => e.recommended || e.viewCount >= 100,
    );
    return [...recPlaces, ...recEvents].slice(0, 4);
  },
  render() {
    if (this.isLoading()) return NBS.SPINNER;

    const nE = this.events ?? [];
    const nY = this.places ?? [];
    const featuredGuides = this.getFeaturedGuides();
    const recommendedItems = this.getRecommendedItems();

    return html\`
      <div class="space-y-6 pb-8">
        <!-- Header with branding and search -->
        <header class="px-4 pt-4">
          <div class="flex items-center justify-between mb-4 md:hidden">
            <view-logo></view-logo>
          </div>
          <view-global-search></view-global-search>
        </header>

        <!-- Today in Rio (Events) -->
        <div class="md:px-6 overflow-hidden mx-1 max-w-screen">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-black uppercase text-black">Today in Rio</h2>
            <button @click=\${() => $APP.Router.go("events")} class="text-xs font-bold text-pink-700 uppercase hover:underline">View all</button>
          </div>
          <div class="flex gap-4 overflow-x-auto pb-4">
            \${
              nE.length === 0
                ? html\`<div class="text-sm font-bold text-gray-500 italic">No upcoming events found.</div>\`
                : nE.map(
                    (event) => html\`
                <view-story-circle .content=\${event} .onClick=\${(e) => $APP.Router.go("event-detail", { slug: e.slug })} class="last:mr-1"></view-story-circle>
              \`,
                  )
            }
          </div>
        </div>

        <!-- Recommended Section -->
        \${
          recommendedItems.length > 0
            ? html\`
          <div class="px-6 overflow-hidden">
            <div class="flex items-center gap-3 mb-4">
              <span class="px-3 py-1 bg-yellow-300 border-2 border-black rounded-lg font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                \u2B50 \${$APP.i18n?.t?.("badges.recommended") || "Recommended"}
              </span>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4">
              \${recommendedItems.map((item) => {
                const isEvent = item.date !== undefined;
                const type = isEvent ? "event" : "place";
                return html\`
                  <div
                    class="bg-white border-3 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
                    @click=\${() => $APP.Router.go(\`\${type}-detail\`, { slug: item.slug })}
                  >
                    <div class="relative h-28 bg-gray-200">
                      <img src="\${item.image}" alt="\${item.name}" class="w-full h-full object-cover" />
                      <div class="absolute top-2 right-2">
                        <span class="px-2 py-0.5 bg-yellow-300 border-2 border-black rounded text-[10px] font-black">\u2B50</span>
                      </div>
                    </div>
                    <div class="p-2">
                      <div class="text-xs font-black leading-tight line-clamp-2 uppercase">\${item.name}</div>
                      \${
                        isEvent && item.date
                          ? html\`
                        <div class="text-[10px] font-bold text-gray-500 mt-1">\u{1F4C5} \${new Date(item.date).toLocaleDateString()}</div>
                      \`
                          : null
                      }
                    </div>
                  </div>
                \`;
              })}
            </div>
          </div>
        \`
            : null
        }

        <!-- Featured Guides -->
        \${
          featuredGuides.length > 0
            ? html\`
          <div class="px-6 overflow-hidden">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-black uppercase text-black">Guides</h2>
              <button @click=\${() => $APP.Router.go("guides")} class="text-xs font-bold text-pink-700 uppercase hover:underline">View all</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
              \${featuredGuides.map(
                (guide) => html\`
                  <view-guide-card
                    .guide=\${guide}
                    .featured=\${true}
                    .onClick=\${(g) => $APP.Router.go("guide-detail", { slug: g.slug })}
                  ></view-guide-card>
                \`,
              )}
            </div>
          </div>
        \`
            : null
        }

        <!-- TODO: MEETUPS HIDDEN - Restore when feature returns
        <div class="px-6 overflow-hidden">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-black uppercase text-black">My Meetups</h2>
            <button class="text-xs font-bold text-pink-700 uppercase hover:underline">View more</button>
          </div>
          ...meetups section...
        </div>
        -->

        <!-- Near You (Places) -->
        <div class="px-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-black uppercase text-black">Near You</h2>
            <button class="text-xs font-bold text-pink-700 uppercase hover:underline">Filter</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-2 md:p-4 lg:p-8">
            \${nY.map(
              (place) => html\`
                <view-meetup-card-compact .content=\${place} type="place" .onClick=\${(p) => $APP.Router.go("place-detail", { slug: p.slug })}></view-meetup-card-compact>
              \`,
            )}
          </div>
        </div>
      </div>
    \`;
  },
};
`,mimeType:"text/javascript"},"/views/item-modal.js":{content:`import T from "/$app/types/index.js";
import { html } from "/npm/lit-html";
import $APP from "/$app.js";

export default {
  style: true,
  properties: {
    item: T.object({ attribute: false }),
    isOpen: T.boolean({ defaultValue: false }),
  },
  handleClose() {
    this.isOpen = false;
    this.item = null;
    this.dispatchEvent(
      new CustomEvent("close", { bubbles: true, composed: true }),
    );
  },
  render() {
    if (!this.item) return null;

    return html\`
      <uix-modal
        .open=\${this.isOpen}
        @modal-close=\${this.handleClose.bind(this)}
        @modal-cancel=\${this.handleClose.bind(this)}
      >
        <view-content-card .content=\${this.item}></view-content-card>
        <div slot="footer" class="pt-4">
          <button
            data-close
            class="w-full bg-danger border-3 border-black text-white rounded-xl font-black py-3 uppercase text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            \u2715 \${$APP.i18n.t("actions.close")}
          </button>
        </div>
      </uix-modal>
    \`;
  },
};
`,mimeType:"text/javascript"},"/views/utils.js":{content:`import { html } from "/npm/lit-html";

// Category definitions
export const CATEGORIES = {
  all: { id: "all", color: "gray-200", icon: "\u{1F4CD}" },
  beaches: { id: "beaches", color: "blue-300", icon: "\u{1F3D6}\uFE0F" },
  hiking: { id: "hiking", color: "green-400", icon: "\u{1F97E}" },
  culture: { id: "culture", color: "amber-300", icon: "\u{1F3DB}\uFE0F" },
  parties: { id: "parties", color: "purple-300", icon: "\u{1F389}" },
  food: { id: "food", color: "orange-300", icon: "\u{1F37D}\uFE0F" },
  sports: { id: "sports", color: "red-300", icon: "\u26BD" },
  dancing: { id: "dancing", color: "pink-300", icon: "\u{1F483}" },
  groups: { id: "groups", color: "rose-300", icon: "\u{1F4AC}" },
};

// Place categories (excludes groups which is for WhatsApp communities)
export const PLACE_CATEGORIES = ["beaches", "hiking", "culture", "parties", "food", "sports", "dancing"];

// Attribute tags - practical characteristics
export const ATTRIBUTE_TAGS = {
  "pet-friendly": { icon: "\u{1F415}", color: "emerald-200", label: "Pet Friendly" },
  "wheelchair-accessible": { icon: "\u267F", color: "blue-200", label: "Accessible" },
  "free-entry": { icon: "\u{1F193}", color: "green-200", label: "Free Entry" },
  "family-friendly": { icon: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}", color: "yellow-200", label: "Family Friendly" },
  "must-see": { icon: "\u2B50", color: "amber-200", label: "Must See" },
};

// Vibe tags - atmosphere and experience
export const VIBE_TAGS = {
  chill: { icon: "\u{1F60E}", color: "sky-200", label: "Chill" },
  romantic: { icon: "\u{1F495}", color: "pink-200", label: "Romantic" },
  adventure: { icon: "\u{1F3D4}\uFE0F", color: "orange-200", label: "Adventure" },
  party: { icon: "\u{1F389}", color: "purple-200", label: "Party" },
  "local-favorite": { icon: "\u{1F1E7}\u{1F1F7}", color: "lime-200", label: "Local Favorite" },
};

// All tags combined
export const ALL_TAGS = { ...ATTRIBUTE_TAGS, ...VIBE_TAGS };

// Helper to get tag info
export const getTagInfo = (tagId) => ALL_TAGS[tagId] || { icon: "\u{1F3F7}\uFE0F", color: "gray-200", label: tagId };

// Neubrutalist Shadow styles
export const NBS = {
  S: "border-3 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all",
  M: "border-3 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all",
  L: "border-3 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
  ACTIVE_SM:
    "active:shadow-none active:translate-x-[2px] active:translate-y-[2px]",
  ACTIVE_LG:
    "active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
  SPINNER: html\`<div class="flex items-center justify-center min-h-screen"><uix-spinner></uix-spinner></div>\`,
};

// Helper functions
export const getCategoryColor = (category) =>
  CATEGORIES[category]?.color
    ? \`bg-\${CATEGORIES[category].color}\`
    : "bg-gray-200";

export const getUser = () => $APP.Auth?.user || null;

export const isGuest = () => $APP.Auth?.isGuest ?? true;

export const styleTag = (css) => html\`<style>\${css}</style>\`;
`,mimeType:"text/javascript"},"/views/item-modal.css":{content:`app-item-modal .uix-modal::part(dialog){background:transparent;border:none;box-shadow:none;padding:1rem;max-width:42rem;width:100%;max-height:90vh;overflow:auto}app-item-modal .uix-modal::part(dialog)::backdrop{background:var(--modal-overlay, rgba(0,0,0,.6));backdrop-filter:blur(4px)}app-item-modal .uix-modal::part(header),app-item-modal .uix-modal::part(footer){display:none}app-item-modal .uix-modal::part(body){padding:0}
`,mimeType:"text/css"},"/$app/uix/display/link.css":{content:`:where(.uix-link,uix-link){display:inline-flex;align-items:center;justify-content:var(--link-justify-content, center);width:var(--link-width, auto);flex-direction:var(--link-direction, row);gap:var(--link-gap, var(--spacing-xs, .25rem));box-sizing:border-box;font-family:inherit;font-size:var(--link-font-size, var(--text-sm, .875rem));font-weight:var(--link-font-weight, 600);line-height:var(--link-line-height, 1.5);text-decoration:var(--link-text-decoration, none);color:var(--link-color, var(--text-color, inherit));cursor:pointer;&[vertical]::part(anchor){display:flex;flex-direction:column}&::part(anchor){display:inline-flex;align-items:center;justify-content:var(--link-justify-content, left);width:100%;height:100%;gap:var(--link-gap, var(--spacing-xs, .25rem));flex-direction:var(--link-direction, row);padding:var(--link-padding-y, var(--spacing-sm, .5rem)) var(--link-padding-x, var(--spacing-md, .75rem));font-family:inherit;font-size:inherit;font-weight:inherit;line-height:inherit;text-decoration:var(--link-text-decoration, none);color:inherit;cursor:pointer;transition:var( --link-transition, color .2s ease, opacity .2s ease, transform .1s ease );&:hover{color:var(--link-hover-color, var(--link-color));text-decoration:var( --link-hover-text-decoration, var(--link-text-decoration, none) );opacity:var(--link-hover-opacity, .9)}&:active{color:var(--link-active-color, var(--link-color));transform:var(--link-active-transform, scale(.98))}&:focus-visible{outline:2px solid var(--color-primary-dark, #d79921);outline-offset:2px}&:visited{color:var(--link-visited-color, var(--link-color))}&[disabled],&[aria-disabled=true]{opacity:var(--link-disabled-opacity, .5);cursor:not-allowed;pointer-events:none}}&::part(icon){display:inline-flex;align-items:center;justify-content:center;width:var(--link-icon-size, 1.25rem);height:var(--link-icon-size, 1.25rem);color:var(--link-icon-color, currentColor);flex-shrink:0}&[underline]{--link-text-decoration: underline}&[underline=hover]{--link-text-decoration: none;--link-hover-text-decoration: underline}&[variant=primary]{--link-color: var(--color-primary);--link-hover-color: var(--color-primary-dark);--link-active-color: var(--color-primary-darker)}&[variant=secondary]{--link-color: var(--color-secondary);--link-hover-color: var(--color-secondary-dark);--link-active-color: var(--color-secondary-darker)}&[variant=muted]{--link-color: var(--text-muted);--link-hover-color: var(--text-color)}&[size=xs]{--link-font-size: var(--text-xs, .75rem);--link-padding-y: .2rem;--link-padding-x: .4rem;--link-gap: .125rem;--link-icon-size: .75em}&[size=sm]{--link-font-size: var(--text-sm, .875rem);--link-padding-y: .25rem;--link-padding-x: .5rem;--link-gap: .25rem;--link-icon-size: .875em}&[size=md]{--link-font-size: var(--text-base, 1rem);--link-padding-y: .5rem;--link-padding-x: .75rem;--link-gap: .375rem;--link-icon-size: 1em}&[size=lg]{--link-font-size: var(--text-lg, 1.125rem);--link-padding-y: .75rem;--link-padding-x: 1rem;--link-gap: .5rem;--link-icon-size: 1.125em}&[size=xl]{--link-font-size: var(--text-xl, 1.25rem);--link-padding-y: 1rem;--link-padding-x: 1.25rem;--link-gap: .625rem;--link-icon-size: 1.25em}&[compact]{--link-padding-x: 0;--link-padding-y: 0}&[w-full],&[wfull]{width:100%;display:flex}}
`,mimeType:"text/css"},"/views/discover-view.css":{content:`.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}.scrollbar-hide::-webkit-scrollbar{display:none}
`,mimeType:"text/css"},"/$app/uix/display/icon.css":{content:`:where(.uix-icon,uix-icon){display:inline-block;vertical-align:middle;--icon-size: calc(var(--spacing, .25rem) * 4);width:var(--icon-size);height:var(--icon-size);svg{height:inherit;width:inherit}&[solid]{stroke:currentColor;fill:currentColor}&[color=primary]{color:var(--color-primary)}&[color=secondary]{color:var(--color-secondary)}&[color=success]{color:var(--color-success)}&[color=danger]{color:var(--color-danger)}&[color=warning]{color:var(--color-warning)}&[color=info]{color:var(--color-info)}&[color=inverse]{color:var(--color-inverse)}&[size=xs]{--icon-size: calc(var(--spacing, .25rem) * 3)}&[size=sm]{--icon-size: calc(var(--spacing, .25rem) * 4)}&[size=md]{--icon-size: calc(var(--spacing, .25rem) * 6)}&[size=lg]{--icon-size: calc(var(--spacing, .25rem) * 8)}&[size=xl]{--icon-size: calc(var(--spacing, .25rem) * 10)}&[size="2xl"]{--icon-size: calc(var(--spacing, .25rem) * 14)}&[size="3xl"]{--icon-size: calc(var(--spacing, .25rem) * 20)}&[size="4xl"]{--icon-size: calc(var(--spacing, .25rem) * 30)}}
`,mimeType:"text/css"},"/$app/uix/feedback/spinner.js":{content:`/**
 * Spinner Component
 *
 * @component
 * @category feedback
 * @tag uix-spinner
 *
 * A loading spinner component with multiple animation variants and sizes.
 * Uses pure CSS animations for performance.
 *
 * @example Basic Spinner
 * \`\`\`html
 * <uix-spinner></uix-spinner>
 * \`\`\`
 *
 * @example Spinner Variants
 * Different animation styles
 * \`\`\`html
 * <div class="flex gap-4">
 *   <uix-spinner variant="circular"></uix-spinner>
 *   <uix-spinner variant="dots"></uix-spinner>
 *   <uix-spinner variant="bars"></uix-spinner>
 * </div>
 * \`\`\`
 *
 * @example Spinner Sizes
 * \`\`\`html
 * <div class="flex gap-4 items-center">
 *   <uix-spinner size="xs"></uix-spinner>
 *   <uix-spinner size="sm"></uix-spinner>
 *   <uix-spinner size="md"></uix-spinner>
 *   <uix-spinner size="lg"></uix-spinner>
 *   <uix-spinner size="xl"></uix-spinner>
 * </div>
 * \`\`\`
 *
 * @example Colored Spinner
 * \`\`\`html
 * <uix-spinner primary></uix-spinner>
 * <uix-spinner secondary></uix-spinner>
 * <uix-spinner success></uix-spinner>
 * <uix-spinner danger></uix-spinner>
 * \`\`\`
 *
 * @example Custom Color
 * \`\`\`html
 * <uix-spinner style="--spinner-color: #ff6b6b;"></uix-spinner>
 * \`\`\`
 */

import T from "/$app/types/index.js";
import { html } from "/npm/lit-html";

export default {
  tag: "uix-spinner",
  properties: {
    variant: T.string({
      defaultValue: "circular",
      enum: ["circular", "dots", "bars"],
    }),
    size: T.string({
      defaultValue: "md",
      enum: ["xs", "sm", "md", "lg", "xl"],
    }),
    primary: T.boolean(),
    secondary: T.boolean(),
    success: T.boolean(),
    danger: T.boolean(),
    warning: T.boolean(),
    info: T.boolean(),
  },
  style: true,
  render() {
    // Circular variant uses CSS ::before pseudo-element
    if (this.variant === "circular") {
      return html\`\`;
    }

    // Dots and bars variants need 3 elements
    if (this.variant === "dots") {
      return html\`
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      \`;
    }

    if (this.variant === "bars") {
      return html\`
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      \`;
    }

    return html\`\`;
  },
};
`,mimeType:"text/javascript"},"/$app/icon-lucide/lucide/user.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></g></svg>',mimeType:"image/svg+xml"},"/$app/icon-lucide/lucide/compass.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m16.24 7.76l-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/><circle cx="12" cy="12" r="10"/></g></svg>',mimeType:"image/svg+xml"},"/$app/icon-lucide/lucide/calendar.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M8 2v4m8-4v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></g></svg>',mimeType:"image/svg+xml"},"/$app/icon-lucide/lucide/book-open.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zm20 0h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',mimeType:"image/svg+xml"},"/$app/icon-lucide/lucide/users.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87m-3-12a4 4 0 0 1 0 7.75"/></g></svg>',mimeType:"image/svg+xml"},"/views/meetup-card-compact.js":{content:`import T from "/$app/types/index.js";
import { html } from "/npm/lit-html";
import $APP from "/$app.js";
import { CATEGORIES, getCategoryColor } from "./utils.js";

export default {
  style: true,
  properties: {
    content: T.object({ attribute: false }),
    onClick: T.function({ attribute: false }),
    type: T.string({ defaultValue: "" }), // e.g., "place", "event", "meetup", "group"
    showTags: T.boolean({ defaultValue: true }),
    showBadge: T.boolean({ defaultValue: true }),
  },
  getCategoryEmoji() {
    return CATEGORIES[this.content?.category]?.icon || "\u{1F4CD}";
  },
  handleCardClick(e) {
    if (e.target.closest(".join-button")) return;
    if (this.onClick) this.onClick(this.content);
  },
  handleJoinClick(e) {
    e.stopPropagation();
  },
  render() {
    if (!this.content) return null;
    const { showTags, showBadge } = this;
    const isJoined = this.content.joined;
    const hasTags = showTags && this.content.tags?.length > 0;
    const hasBadge = showBadge && (this.content.recommended || this.content.viewCount >= 100);
    const btnCls = \`join-button w-full py-2 px-4 border-2 border-black rounded-lg font-black uppercase text-xs transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] \${isJoined ? "bg-primary text-black hover:bg-primary-dark" : "bg-accent text-black hover:bg-accent"}\`;

    return html\`
      <uix-card
        class="meetup-card-compact"
        shadow="md"
        hover
        borderWidth="3"
        padding="none"
        @click=\${(e) => this.handleCardClick(e)}
      >
        <div slot="header" class="relative w-full h-48 bg-gray-100"
          style="background-image: url(\${this.content.image}); background-size: cover; background-position: center;"
        >
          \${hasBadge ? html\`
            <div class="absolute top-2 right-2">
              <view-recommended-badge
                .recommended=\${this.content.recommended}
                .viewCount=\${this.content.viewCount || 0}
              ></view-recommended-badge>
            </div>
          \` : null}
        </div>
        <div class="p-3 space-y-2 flex-1 flex flex-col">
          <div>
            <div class="inline-flex items-center gap-1 px-2 py-1 \${getCategoryColor(this.content.category)} border-2 border-black rounded-lg font-black text-xs uppercase text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              \${this.getCategoryEmoji()} \${$APP.i18n.t(\`categories.\${this.content.category}\`)}
            </div>
          </div>
          <uix-link href="/\${this.type || this.content._type || 'place'}/\${this.content.slug}" class="text-lg font-black leading-tight line-clamp-2 uppercase">\${this.content.name}</uix-link>
          \${hasTags ? html\`
            <view-tags-display .tags=\${this.content.tags} .maxVisible=\${2}></view-tags-display>
          \` : null}
          <div class="flex-1"></div>
        </div>
        <div slot="footer" class="p-3 pt-0">
          <button class="\${btnCls}" @click=\${(e) => this.handleJoinClick(e)}>
            \${isJoined ? html\`\u2713 \${$APP.i18n.t("actions.joined")}\` : html\`\u2764\uFE0F \${$APP.i18n.t("actions.join")}\`}
          </button>
        </div>
      </uix-card>
    \`;
  },
};
`,mimeType:"text/javascript"},"/views/story-circle.js":{content:`import T from "/$app/types/index.js";
import { html } from "/npm/lit-html";

export default {
  properties: {
    content: T.object({ attribute: false }),
    onClick: T.function({ attribute: false }),
  },
  render() {
    if (!this.content) return null;
    return html\`
      <div
        class="flex flex-col items-center gap-1 cursor-pointer group min-w-[72px]"
        @click=\${() => this.onClick && this.onClick(this.content)}
      >
        <div class="p-[3px] rounded-full bg-gradient-to-tr from-accent to-primary border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none transition-all">
          <div class="w-16 h-16 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
             <img src="\${this.content.image}" alt="\${this.content.name}" class="w-full h-full object-cover" />
          </div>
        </div>
        <uix-link href="/event/\${this.content.slug}" class="text-xs font-black uppercase text-center max-w-[80px] truncate leading-tight">
          \${this.content.name}
        </uix-link>
      </div>
    \`;
  },
};
`,mimeType:"text/javascript"},"/$app/icon-lucide/lucide/tree-palm.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1l1 1h4m3-.86A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1l-1 1h-3"/><path d="M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25l.7-.7l.71-.71l2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35"/><path d="M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14"/></g></svg>',mimeType:"image/svg+xml"},"/views/global-search.js":{content:`import T from "/$app/types/index.js";
import $APP from "/$app.js";
import { html } from "/npm/lit-html";
import { ALL_TAGS } from "./utils.js";

export default {
  properties: {
    query: T.string({ defaultValue: "" }),
    isOpen: T.boolean({ defaultValue: false }),
    selectedTags: T.array({ defaultValue: [] }),
    places: T.array({ sync: $APP.Model.places, query: {} }),
    events: T.array({ sync: $APP.Model.events, query: {} }),
    guides: T.array({ sync: $APP.Model.guides, query: {} }),
    groups: T.array({ sync: $APP.Model.groups, query: {} }),
  },

  handleInputChange(e) {
    this.query = e.target.value;
    this.isOpen = this.query.length > 0 || this.selectedTags.length > 0;
  },

  handleFocus() {
    this.isOpen = true;
  },

  handleBlur() {
    // Delay to allow click on results
    setTimeout(() => {
      this.isOpen = false;
    }, 200);
  },

  toggleTag(tagId) {
    if (this.selectedTags.includes(tagId)) {
      this.selectedTags = this.selectedTags.filter((t) => t !== tagId);
    } else {
      this.selectedTags = [...this.selectedTags, tagId];
    }
    this.isOpen = true;
  },

  clearSearch() {
    this.query = "";
    this.selectedTags = [];
    this.isOpen = false;
  },

  getFilteredResults() {
    const q = this.query.toLowerCase().trim();
    const tags = this.selectedTags;

    const matchesQuery = (item) => {
      if (!q) return true;
      return (
        item.name?.toLowerCase().includes(q) ||
        item.title?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q)
      );
    };

    const matchesTags = (item) => {
      if (tags.length === 0) return true;
      return tags.some((tag) => item.tags?.includes(tag));
    };

    const filterItems = (items) =>
      (items || []).filter((item) => matchesQuery(item) && matchesTags(item));

    return {
      places: filterItems(this.places).slice(0, 3),
      events: filterItems(this.events).slice(0, 3),
      guides: filterItems(this.guides).slice(0, 3),
      groups: filterItems(this.groups).slice(0, 3),
    };
  },

  navigateTo(type, slug) {
    this.clearSearch();
    $APP.Router.go(\`\${type}-detail\`, { slug });
  },

  renderResultItem(item, type) {
    const name = item.name || item.title;
    const icon =
      type === "place"
        ? "\u{1F4CD}"
        : type === "event"
          ? "\u{1F4C5}"
          : type === "guide"
            ? "\u{1F4D6}"
            : "\u{1F465}";

    return html\`
      <button
        class="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-3 border-b border-gray-200 last:border-0"
        @click=\${() => this.navigateTo(type, item.slug)}
      >
        <span class="text-lg">\${icon}</span>
        <div class="flex-1 min-w-0">
          <div class="font-bold text-sm truncate">\${name}</div>
          <div class="text-xs text-gray-500 truncate">\${item.description?.substring(0, 50)}...</div>
        </div>
        \${item.recommended ? html\`<span class="text-yellow-500">\u2B50</span>\` : null}
      </button>
    \`;
  },

  render() {
    const results = this.getFilteredResults();
    const hasResults =
      results.places.length > 0 ||
      results.events.length > 0 ||
      results.guides.length > 0 ||
      results.groups.length > 0;
    const hasQuery = this.query.length > 0 || this.selectedTags.length > 0;

    return html\`
      <div class="relative">
        <!-- Search Input -->
        <div class="relative">
          <input
            type="text"
            .value=\${this.query}
            @input=\${(e) => this.handleInputChange(e)}
            @focus=\${() => this.handleFocus()}
            @blur=\${() => this.handleBlur()}
            placeholder=\${$APP.i18n?.t?.("search.placeholder") || "Search places, events, guides..."}
            class="w-full px-4 py-3 pl-12 pr-12 bg-white border-3 border-black rounded-xl font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          \${
            hasQuery
              ? html\`
            <button
              @click=\${() => this.clearSearch()}
              class="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          \`
              : null
          }
        </div>

        <!-- Tag Filters -->
        <div class="overflow-hidden -mx-4 sm:mx-0">
          <div class="flex gap-2 mt-3 overflow-x-auto pb-2 flex-nowrap px-4 sm:px-0 max-w-100vw">
          \${Object.entries(ALL_TAGS)
            .slice(0, 6)
            .map(([tagId, tagInfo]) => {
              const isSelected = this.selectedTags.includes(tagId);
              return html\`
              <button
                @click=\${() => this.toggleTag(tagId)}
                class="flex-shrink-0 px-3 py-1.5 border-2 border-black rounded-lg font-bold text-xs transition-all \${
                  isSelected
                    ? \`bg-\${tagInfo.color} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]\`
                    : "bg-white hover:bg-gray-100"
                }"
              >
                \${tagInfo.icon} \${tagInfo.label}
              </button>
            \`;
            })}
          </div>
        </div>

        <!-- Results Dropdown -->
        \${
          this.isOpen && hasQuery
            ? html\`
          <div class="absolute top-full left-0 right-0 mt-2 bg-white border-3 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden z-50 max-h-96 overflow-y-auto">
            \${
              !hasResults
                ? html\`
              <div class="p-6 text-center">
                <div class="text-2xl mb-2">\u{1F50D}</div>
                <div class="font-bold text-gray-500">\${$APP.i18n?.t?.("search.noResults") || "No results found"}</div>
              </div>
            \`
                : html\`
              \${
                results.places.length > 0
                  ? html\`
                <div class="px-4 py-2 bg-gray-100 font-black text-xs uppercase text-gray-600">
                  \${$APP.i18n?.t?.("search.places") || "Places"}
                </div>
                \${results.places.map((item) => this.renderResultItem(item, "place"))}
              \`
                  : null
              }
              \${
                results.events.length > 0
                  ? html\`
                <div class="px-4 py-2 bg-gray-100 font-black text-xs uppercase text-gray-600">
                  \${$APP.i18n?.t?.("search.events") || "Events"}
                </div>
                \${results.events.map((item) => this.renderResultItem(item, "event"))}
              \`
                  : null
              }
              \${
                results.guides.length > 0
                  ? html\`
                <div class="px-4 py-2 bg-gray-100 font-black text-xs uppercase text-gray-600">
                  \${$APP.i18n?.t?.("search.guides") || "Guides"}
                </div>
                \${results.guides.map((item) => this.renderResultItem(item, "guide"))}
              \`
                  : null
              }
              \${
                results.groups.length > 0
                  ? html\`
                <div class="px-4 py-2 bg-gray-100 font-black text-xs uppercase text-gray-600">
                  \${$APP.i18n?.t?.("search.groups") || "Groups"}
                </div>
                \${results.groups.map((item) => this.renderResultItem(item, "group"))}
              \`
                  : null
              }
            \`
            }
          </div>
        \`
            : null
        }
      </div>
    \`;
  },
};
`,mimeType:"text/javascript"},"/views/guide-card.js":{content:`import T from "/$app/types/index.js";
import $APP from "/$app.js";
import { html } from "/npm/lit-html";
import { getCategoryColor } from "./utils.js";

export default {
  properties: {
    guide: T.object(),
    featured: T.boolean({ defaultValue: false }),
    onClick: T.function({ attribute: false }),
  },

  handleClick() {
    if (this.onClick) this.onClick(this.guide);
  },

  render() {
    const g = this.guide;
    if (!g) return null;

    const isArticle = g.guideType === "article";
    const typeLabel = isArticle ? "Article" : "Curated List";
    const typeColor = isArticle ? "bg-amber-300" : "bg-emerald-300";
    const typeIcon = isArticle ? "\u{1F4DD}" : "\u{1F4CB}";

    const hasBadge = g.recommended || g.viewCount >= 100;
    const hasTags = g.tags?.length > 0;

    // Featured card - larger layout
    if (this.featured) {
      return html\`
        <div
          class="bg-white border-3 border-black rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
          @click=\${() => this.handleClick()}
        >
          <div class="relative h-48 bg-gray-200">
            <img src="\${g.coverImage}" alt="\${g.title}" class="w-full h-full object-cover" />
            <div class="absolute top-3 left-3 flex gap-2">
              <span class="px-3 py-1 \${typeColor} border-2 border-black rounded-lg font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                \${typeIcon} \${typeLabel}
              </span>
            </div>
            \${hasBadge ? html\`
              <div class="absolute top-3 right-3">
                <view-recommended-badge
                  .recommended=\${g.recommended}
                  .viewCount=\${g.viewCount || 0}
                ></view-recommended-badge>
              </div>
            \` : null}
          </div>
          <div class="p-4 space-y-3">
            <uix-link href="/guide/\${g.slug}" class="text-xl font-black uppercase leading-tight line-clamp-2">\${g.title}</uix-link>
            <p class="text-sm font-medium text-gray-600 line-clamp-2">\${g.description}</p>
            \${hasTags ? html\`
              <view-tags-display .tags=\${g.tags} .maxVisible=\${3}></view-tags-display>
            \` : null}
            <div class="flex items-center gap-2 flex-wrap">
              \${(g.categories || []).map(cat => html\`
                <span class="px-2 py-1 \${getCategoryColor(cat)} border-2 border-black rounded-lg font-bold text-xs uppercase">
                  \${$APP.i18n?.t?.(\`categories.\${cat}\`) || cat}
                </span>
              \`)}
              \${!isArticle && g.items?.length ? html\`
                <span class="px-2 py-1 bg-gray-100 border-2 border-black rounded-lg font-bold text-xs">
                  \${g.items.length} places
                </span>
              \` : null}
            </div>
          </div>
        </div>
      \`;
    }

    // Regular card - compact grid style
    return html\`
      <div
        class="bg-white border-3 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer flex flex-col h-full"
        @click=\${() => this.handleClick()}
      >
        <div class="relative h-32 bg-gray-200 flex-shrink-0">
          <img src="\${g.coverImage}" alt="\${g.title}" class="w-full h-full object-cover" />
          <div class="absolute top-2 left-2">
            <span class="px-2 py-0.5 \${typeColor} border-2 border-black rounded font-bold text-[10px] uppercase">
              \${typeIcon} \${isArticle ? "Article" : "List"}
            </span>
          </div>
          \${hasBadge ? html\`
            <div class="absolute top-2 right-2">
              <view-recommended-badge
                .recommended=\${g.recommended}
                .viewCount=\${g.viewCount || 0}
              ></view-recommended-badge>
            </div>
          \` : null}
        </div>
        <div class="p-3 flex-1 flex flex-col">
          <uix-link href="/guide/\${g.slug}" class="text-sm font-black uppercase leading-tight mb-1 line-clamp-2">\${g.title}</uix-link>
          <p class="text-xs font-medium text-gray-500 line-clamp-2 flex-1">\${g.description}</p>
          \${hasTags ? html\`
            <div class="mt-2">
              <view-tags-display .tags=\${g.tags} .maxVisible=\${2}></view-tags-display>
            </div>
          \` : null}
          <div class="flex items-center gap-1 mt-2 flex-wrap">
            \${(g.categories || []).slice(0, 2).map(cat => html\`
              <span class="px-1.5 py-0.5 \${getCategoryColor(cat)} border border-black rounded font-bold text-[9px] uppercase">
                \${$APP.i18n?.t?.(\`categories.\${cat}\`) || cat}
              </span>
            \`)}
            \${!isArticle && g.items?.length ? html\`
              <span class="text-[10px] font-bold text-gray-500 ml-auto">
                \${g.items.length} places
              </span>
            \` : null}
          </div>
        </div>
      </div>
    \`;
  },
};
`,mimeType:"text/javascript"},"/$app/uix/feedback/spinner.css":{content:`:where(.uix-spinner,uix-spinner){display:inline-flex;align-items:center;justify-content:center;--spinner-color: var(--color-primary);--spinner-size: 2rem;width:var(--spinner-size);height:var(--spinner-size);position:relative;&[primary]{--spinner-color: var(--color-primary)}&[secondary]{--spinner-color: var(--color-secondary)}&[success]{--spinner-color: var(--color-success)}&[danger]{--spinner-color: var(--color-danger)}&[warning]{--spinner-color: var(--color-warning)}&[info]{--spinner-color: var(--color-info)}&[size=xs]{--spinner-size: 1rem}&[size=sm]{--spinner-size: 1.5rem}&[size=md]{--spinner-size: 2rem}&[size=lg]{--spinner-size: 3rem}&[size=xl]{--spinner-size: 4rem}&[variant=circular]:before{content:"";display:block;width:100%;height:100%;border:calc(var(--spinner-size) / 8) solid var(--color-surface-darker);border-top-color:var(--spinner-color);border-radius:50%;animation:spinner-circular .8s linear infinite}&[variant=dots]{gap:calc(var(--spinner-size) / 6)}&[variant=dots] .dot{display:block;width:calc(var(--spinner-size) / 4);height:calc(var(--spinner-size) / 4);background-color:var(--spinner-color);border-radius:50%;animation:spinner-dots 1.4s ease-in-out infinite}&[variant=dots] .dot:nth-child(1){animation-delay:-.32s}&[variant=dots] .dot:nth-child(2){animation-delay:-.16s}&[variant=dots] .dot:nth-child(3){animation-delay:0s}&[variant=bars]{gap:calc(var(--spinner-size) / 8)}&[variant=bars] .bar{display:block;width:calc(var(--spinner-size) / 6);height:100%;background-color:var(--spinner-color);border-radius:calc(var(--spinner-size) / 12);animation:spinner-bars 1.2s ease-in-out infinite}&[variant=bars] .bar:nth-child(1){animation-delay:-.24s}&[variant=bars] .bar:nth-child(2){animation-delay:-.12s}&[variant=bars] .bar:nth-child(3){animation-delay:0s}}@keyframes spinner-circular{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes spinner-dots{0%,80%,to{opacity:.3;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}@keyframes spinner-bars{0%,40%,to{transform:scaleY(.4);opacity:.5}20%{transform:scaleY(1);opacity:1}}
`,mimeType:"text/css"},"/views/profile-view.js":{content:`import T from "/$app/types/index.js";
import $APP from "/$app.js";
import { html } from "/npm/lit-html";
import { NBS } from "./utils.js";

export default {
  properties: {
    userId: T.string({ defaultValue: "guest" }),
    currentUser: T.object({
      sync: $APP.Model.users,
      query: (inst) => ({
        id: inst.userId,
        includes: [
          "likedPlaces",
          "likedEvents",
          "likedMeetups",
          "likedGroups",
          "interestedEvents",
          "interestedMeetups",
        ],
      }),
      dependsOn: ["userId"],
    }),
    meetupAttendance: T.array({ defaultValue: [] }),
    activeTab: T.string({ defaultValue: "attending" }),
    showOnboarding: T.boolean({ defaultValue: false }),
  },
  async connected() {
    this.userId = $APP.Auth.isAuthenticated ? $APP.Auth.currentUserId : "guest";
    this.meetupAttendance = await $APP.Model.meetup_attendance.getAll({
      where: { user: this.userId },
    });
  },
  getStats() {
    if (!this.currentUser) return { eventsJoined: 0, saved: 0, attending: 0 };
    const u = this.currentUser;
    const joinedIds = new Set(
      (this.meetupAttendance || []).map((a) => a.meetup),
    );

    return {
      attending: (u.likedMeetups || []).filter((m) => joinedIds.has(m.id))
        .length,
      saved:
        (u.likedPlaces?.length || 0) +
        (u.likedEvents?.length || 0) +
        (u.likedMeetups?.length || 0) +
        (u.likedGroups?.length || 0),
      eventsJoined: u.interestedEvents?.length || 0,
    };
  },
  async handleSaveProfile(fD) {
    const user = $APP.Auth.user;
    if (user) await $APP.Model.users.edit({ id: user.id, ...fD });
    this.showOnboarding = false;
  },
  getTabContent() {
    if (!this.currentUser) return [];
    const u = this.currentUser;
    const joinedIds = new Set(
      (this.meetupAttendance || []).map((a) => a.meetup),
    );

    switch (this.activeTab) {
      case "attending":
        // Meetups user has joined
        return (u.likedMeetups || [])
          .filter((m) => joinedIds.has(m.id))
          .map((m) => ({ ...m, _type: "meetup" }));

      case "saved":
        // All liked items
        return [
          ...(u.likedPlaces || []).map((p) => ({ ...p, _type: "place" })),
          ...(u.likedEvents || []).map((e) => ({ ...e, _type: "event" })),
          ...(u.likedMeetups || []).map((m) => ({ ...m, _type: "meetup" })),
          ...(u.likedGroups || []).map((g) => ({ ...g, _type: "group" })),
        ];

      case "history": {
        // All interactions (liked + interested) - deduplicated
        const all = new Map();
        (u.likedPlaces || []).forEach((p) =>
          all.set(\`place-\${p.id}\`, { ...p, _type: "place" }),
        );
        (u.likedEvents || []).forEach((e) =>
          all.set(\`event-\${e.id}\`, { ...e, _type: "event" }),
        );
        (u.likedMeetups || []).forEach((m) =>
          all.set(\`meetup-\${m.id}\`, { ...m, _type: "meetup" }),
        );
        (u.likedGroups || []).forEach((g) =>
          all.set(\`group-\${g.id}\`, { ...g, _type: "group" }),
        );
        (u.interestedEvents || []).forEach((e) =>
          all.set(\`event-\${e.id}\`, { ...e, _type: "event" }),
        );
        (u.interestedMeetups || []).forEach((m) =>
          all.set(\`meetup-\${m.id}\`, { ...m, _type: "meetup" }),
        );
        return Array.from(all.values());
      }

      default:
        return [];
    }
  },
  render() {
    const user = this.currentUser || $APP.Auth.user || {};
    if (!user || !this.currentUser) return NBS.SPINNER;
    const tC = this.getTabContent();
    const s = this.getStats();
    const dR =
      user.arrivalDate && user.departureDate
        ? \`\${new Date(user.arrivalDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })} - \${new Date(user.departureDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })}\`
        : "";
    const editBtnCls =
      "absolute top-6 right-6 bg-white p-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all";
    const tabBtnCls = (t) =>
      \`flex-1 py-3 px-2 border-3 border-black rounded-xl font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all \${NBS.ACTIVE_SM} \${this.activeTab === t ? "bg-accent text-black" : "bg-white text-black"}\`;
    const emptyBtnCls =
      "mt-4 px-6 py-2 bg-accent border-3 border-black rounded-xl font-black uppercase text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all";

    return html\`
      <div class="px-4 sm:px-8 mx-auto pb-20">
        <view-onboarding-wizard
          .isOpen=\${this.showOnboarding} .user=\${user}
          .onClose=\${() => (this.showOnboarding = false)} .onSave=\${this.handleSaveProfile.bind(this)}
        ></view-onboarding-wizard>
        <div class="relative bg-white border-b-3 border-black rounded-b-[2.5rem] p-8 pb-16 shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
          <button @click=\${() => (this.showOnboarding = true)} class="\${editBtnCls}">\u270F\uFE0F Edit</button>
          <div class="flex justify-center mb-4 mt-4">
            <div class="w-32 h-32 rounded-3xl border-3 border-black bg-cover bg-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white"
              style="background-image: url(\${user.avatar})"
            ></div>
          </div>
          <div class="text-center space-y-2">
            <h1 class="text-3xl font-black flex items-center justify-center gap-2 text-black">
              \${user.name}
              <div class="bg-blue-400 text-white rounded-full p-1 border-2 border-black w-6 h-6 flex items-center justify-center text-[10px]">\u2713</div>
            </h1>
            <div class="flex flex-wrap justify-center gap-2 max-w-xs mx-auto">
              <div class="px-3 py-1 bg-white border-2 border-black rounded-lg font-bold text-xs shadow-sm flex items-center gap-1">
                \${user.travelStatus === "resident" ? "\u{1F3E0} Local" : "\u2708\uFE0F Visitor"}
              </div>
              \${
                dR
                  ? html\`
                <div class="px-3 py-1 bg-accent border-2 border-black rounded-lg font-bold text-xs shadow-sm flex items-center gap-1">
                  \u{1F5D3}\uFE0F \${dR}
                </div>
              \`
                  : null
              }
            </div>
            <div class="flex flex-wrap justify-center gap-2 pt-2">
              \${user.vibeTime ? html\`<span class="px-2 py-1 bg-secondary-lighter border border-black rounded-md text-[10px] font-bold uppercase">\${user.vibeTime}</span>\` : null}
              \${user.vibeDrink ? html\`<span class="px-2 py-1 bg-secondary-lighter border border-black rounded-md text-[10px] font-bold uppercase">\${user.vibeDrink}</span>\` : null}
              \${(user.lookingFor || []).slice(0, 2).map((t) => html\`<span class="px-2 py-1 bg-primary-lighter border border-black rounded-md text-[10px] font-bold uppercase">Looking for \${t}</span>\`)}
            </div>
            \${user.bio ? html\`<p class="text-center text-sm font-bold text-gray-700 mt-4 max-w-md mx-auto">\${user.bio}</p>\` : null}
          </div>
        </div>
        <div class="px-4 sm:px-6 -mt-10 relative z-10 mb-8">
          <div class="grid grid-cols-3 bg-white border-3 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] divide-x-2 divide-black p-2">
            <div class="text-center py-3"><div class="text-2xl font-black text-black">\${s.eventsJoined}</div><div class="text-[10px] font-bold uppercase text-gray-500 mt-1">Events Joined</div></div>
            <div class="text-center py-3"><div class="text-2xl font-black text-black">\${s.saved}</div><div class="text-[10px] font-bold uppercase text-gray-500 mt-1">Saved</div></div>
            <div class="text-center py-3"><div class="text-2xl font-black text-black">\${s.attending}</div><div class="text-[10px] font-bold uppercase text-gray-500 mt-1">Attending</div></div>
          </div>
        </div>
        <div class="flex gap-2 p-4 sm:p-6 mb-2">
          \${["attending", "saved", "history"].map(
            (
              t,
            ) => html\`<button @click=\${() => (this.activeTab = t)} class="\${tabBtnCls(t)}">
              \${t === "attending" ? "Attending" : t === "saved" ? "Saved" : "History"}
            </button>\`,
          )}
        </div>
        <div class="px-4 sm:px-6 mb-12">
          \${
            tC.length > 0
              ? html\`<div class="grid grid-cols-2 gap-4">
              \${tC.map((item) => html\`<view-meetup-card-compact .content=\${item} .onClick=\${(i) => $APP.Router.go(\`\${i._type}-detail\`, { slug: i.slug })}></view-meetup-card-compact>\`)}
            </div>\`
              : html\`<div class="bg-white border-3 border-black rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center space-y-4">
              <div class="text-5xl mb-4">\${this.activeTab === "attending" ? "\u{1F4C5}" : this.activeTab === "saved" ? "\u{1F4BE}" : "\u{1F4DA}"}</div>
              <p class="text-lg font-bold text-gray-600">
                \${this.activeTab === "attending" ? "No events joined yet" : this.activeTab === "saved" ? "No saved places yet" : "No activity yet"}
              </p>
              <button @click=\${() => $APP.Router.go("discover")} class="\${emptyBtnCls}">Explore Events</button>
            </div>\`
          }
        </div>
      </div>
    \`;
  },
};
`,mimeType:"text/javascript"},"/views/meetup-card-compact.css":{content:`.meetup-card-compact.uix-card{cursor:pointer;height:100%;background:#fff;border-color:var(--card-border-color, black);border-radius:1rem}.meetup-card-compact.uix-card>[slot=header]{border-bottom:3px solid var(--card-border-color, black);padding:0}.meetup-card-compact.uix-card>[slot=footer]{justify-content:stretch}.meetup-card-compact.uix-card>[slot=footer]>button{width:100%}
`,mimeType:"text/css"},"/views/onboarding-wizard.js":{content:`import T from "/$app/types/index.js";
import { html } from "/npm/lit-html";

const NBS_S =
  "border-3 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all";

export default {
  properties: {
    isOpen: T.boolean({ defaultValue: false }),
    user: T.object({ attribute: false }),
    onSave: T.function({ attribute: false }),
    onClose: T.function({ attribute: false }),
    formData: T.object({ defaultValue: {} }),
  },
  connected() {
    if (this.user) {
      this.formData = {
        travelStatus: this.user.travelStatus || "visitor",
        arrivalDate: this.user.arrivalDate || "",
        departureDate: this.user.departureDate || "",
        vibeTime: this.user.vibeTime || "morning",
        vibeSocial: this.user.vibeSocial || "social",
        vibeDrink: this.user.vibeDrink || "caipirinha",
        lookingFor: this.user.lookingFor || [],
      };
    }
  },
  updateField(f, v) {
    this.formData = { ...this.formData, [f]: v };
  },
  toggleLookingFor(v) {
    const c = this.formData.lookingFor || [];
    this.updateField(
      "lookingFor",
      c.includes(v) ? c.filter((i) => i !== v) : [...c, v],
    );
  },
  handleStepChange(e) {
    if (
      e.detail.step === 2 &&
      e.detail.direction === "forward" &&
      this.formData.travelStatus === "resident"
    ) {
      setTimeout(() => e.target.nextStep(), 0);
    }
  },
  handleFinish() {
    if (this.onSave) this.onSave(this.formData);
  },
  handleCancel() {
    if (this.onClose) this.onClose();
  },
  render() {
    if (!this.isOpen) return null;

    const stepBtnCls = (s) =>
      \`w-full p-4 border-3 border-black rounded-2xl font-black uppercase text-lg flex items-center justify-between \${NBS_S} \${this.formData.travelStatus === s ? "bg-accent" : "bg-white"}\`;
    const optBtnCls = (v, f, a) =>
      \`flex-1 py-3 border-2 border-black rounded-xl font-bold text-sm \${this.formData[f] === v ? a : "bg-white"}\`;
    const lookingForOptions = [
      { id: "friends", label: "New Friends \u{1F46F}" },
      { id: "dates", label: "Dates \u2764\uFE0F" },
      { id: "activities", label: "Activity Partners \u{1F3BE}" },
      { id: "tips", label: "Local Tips \u{1F5FA}\uFE0F" },
      { id: "party", label: "Parties \u{1F389}" },
    ];

    return html\`
      <uix-wizard
        modal
        .totalSteps=\${4}
        .showNavigation=\${false}
        finishLabel="Complete Profile \u2728"
        @step-change=\${this.handleStepChange}
        @wizard-finish=\${this.handleFinish}
        @wizard-cancel=\${this.handleCancel}
      >
        <!-- Step 1: Travel Status -->
        <div slot="step-1">
          <h2 class="text-2xl font-black uppercase text-center mb-6">
            Are you a Local or Visiting?
          </h2>
          <div class="space-y-4">
            \${["resident", "visitor", "nomad"].map(
              (s) => html\`
                <button
                  @click=\${(e) => {
                    this.updateField("travelStatus", s);
                    e.target.closest("uix-wizard").nextStep();
                  }}
                  class="\${stepBtnCls(s)}"
                >
                  <span>
                    \${
                      s === "resident"
                        ? "\u{1F3E0} I Live Here"
                        : s === "visitor"
                          ? "\u2708\uFE0F Just Visiting"
                          : "\u{1F4BB} Digital Nomad"
                    }
                  </span>
                  \${this.formData.travelStatus === s ? "\u2713" : "\u2192"}
                </button>
              \`,
            )}
          </div>
        </div>

        <!-- Step 2: Travel Dates (skipped for residents) -->
        <div slot="step-2">
          <h2 class="text-2xl font-black uppercase text-center mb-6">
            When are you here?
          </h2>
          <div class="space-y-6">
            <div>
              <label class="block font-bold text-sm uppercase mb-2">Arrival Date</label>
              <input
                type="date"
                class="w-full p-4 border-3 border-black rounded-xl font-bold bg-gray-50 focus:bg-yellow-100 outline-none"
                .value=\${this.formData.arrivalDate}
                @change=\${(e) => this.updateField("arrivalDate", e.target.value)}
              />
            </div>
            <div>
              <label class="block font-bold text-sm uppercase mb-2">Departure Date</label>
              <input
                type="date"
                class="w-full p-4 border-3 border-black rounded-xl font-bold bg-gray-50 focus:bg-yellow-100 outline-none"
                .value=\${this.formData.departureDate}
                @change=\${(e) => this.updateField("departureDate", e.target.value)}
              />
            </div>
            <button
              @click=\${(e) => e.target.closest("uix-wizard").nextStep()}
              class="w-full py-4 bg-black text-white rounded-xl font-black uppercase tracking-wider hover:bg-gray-800"
            >
              Next Step \u2192
            </button>
          </div>
        </div>

        <!-- Step 3: Vibe -->
        <div slot="step-3">
          <h2 class="text-2xl font-black uppercase text-center mb-6">
            What's your Vibe?
          </h2>
          <div class="space-y-6">
            <div>
              <label class="block font-bold text-xs uppercase mb-2 text-center text-gray-500">
                Morning or Night?
              </label>
              <div class="flex gap-2">
                <button
                  @click=\${() => this.updateField("vibeTime", "morning")}
                  class="\${optBtnCls("morning", "vibeTime", "bg-accent-light")}"
                >
                  \u2600\uFE0F Early Bird
                </button>
                <button
                  @click=\${() => this.updateField("vibeTime", "night")}
                  class="\${optBtnCls("night", "vibeTime", "bg-primary-dark")}"
                >
                  \u{1F319} Night Owl
                </button>
              </div>
            </div>
            <div>
              <label class="block font-bold text-xs uppercase mb-2 text-center text-gray-500">
                Pick your poison
              </label>
              <div class="flex gap-2">
                <button
                  @click=\${() => this.updateField("vibeDrink", "coconut")}
                  class="\${optBtnCls("coconut", "vibeDrink", "bg-green-300")}"
                >
                  \u{1F965} Coconut
                </button>
                <button
                  @click=\${() => this.updateField("vibeDrink", "caipirinha")}
                  class="\${optBtnCls("caipirinha", "vibeDrink", "bg-accent-light")}"
                >
                  \u{1F379} Caipi
                </button>
                <button
                  @click=\${() => this.updateField("vibeDrink", "beer")}
                  class="\${optBtnCls("beer", "vibeDrink", "bg-accent")}"
                >
                  \u{1F37A} Beer
                </button>
              </div>
            </div>
            <button
              @click=\${(e) => e.target.closest("uix-wizard").nextStep()}
              class="w-full py-4 bg-black text-white rounded-xl font-black uppercase tracking-wider hover:bg-gray-800"
            >
              Next Step \u2192
            </button>
          </div>
        </div>

        <!-- Step 4: Looking For -->
        <div slot="step-4">
          <h2 class="text-2xl font-black uppercase text-center mb-6">
            Looking for...
          </h2>
          <div class="space-y-3 mb-8">
            \${lookingForOptions.map(
              (opt) => html\`
                <button
                  @click=\${() => this.toggleLookingFor(opt.id)}
                  class="w-full py-3 px-4 border-2 border-black rounded-xl font-bold text-left flex justify-between items-center transition-all \${
                    (this.formData.lookingFor || []).includes(opt.id)
                      ? "bg-pink-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[1px] translate-y-[1px]"
                      : "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  }"
                >
                  <span>\${opt.label}</span>
                  \${(this.formData.lookingFor || []).includes(opt.id) ? "\u2713" : "+"}
                </button>
              \`,
            )}
          </div>
          <button
            @click=\${(e) => e.target.closest("uix-wizard").nextStep()}
            class="w-full py-4 bg-primary-dark border-3 border-black text-black rounded-xl font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            Complete Profile \u2728
          </button>
        </div>
      </uix-wizard>
    \`;
  },
};
`,mimeType:"text/javascript"},"/views/groups-view.js":{content:`import T from "/$app/types/index.js";
import $APP from "/$app.js";
import { html } from "/npm/lit-html";
import { ALL_TAGS, getTagInfo, NBS } from "./utils.js";

const { brand } = $APP.settings;

export default {
  dataQuery: true,
  properties: {
    groups: T.array(),
    selectedTags: T.array({ defaultValue: [] }),
  },
  goToGroup(group) {
    $APP.Router.go("group-detail", { slug: group.slug });
  },
  toggleTag(tagId) {
    if (this.selectedTags.includes(tagId)) {
      this.selectedTags = this.selectedTags.filter((t) => t !== tagId);
    } else {
      this.selectedTags = [...this.selectedTags, tagId];
    }
  },
  filterByTags(groups) {
    if (this.selectedTags.length === 0) return groups;
    return groups.filter((g) =>
      this.selectedTags.some((tag) => g.tags?.includes(tag)),
    );
  },
  render() {
    if (!this.groups) return NBS.SPINNER;

    const filteredGroups = this.filterByTags(this.groups);
    const featured = filteredGroups.filter((g) => g.featured);
    const regular = filteredGroups.filter((g) => !g.featured);

    return html\`
      <div class="p-4 sm:p-6 space-y-6 pb-24">
        <!-- Mobile Header with branding -->
        <header class="md:hidden flex items-center justify-between">
          <view-logo></view-logo>
          <div class="bg-pink-300 border-2 border-black rounded-full w-10 h-10 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span class="text-lg">\u{1F4AC}</span>
          </div>
        </header>

        <!-- Page Title -->
        <h1 class="text-2xl md:text-4xl font-black uppercase text-black tracking-tight">
          Communities
        </h1>

        <!-- Tag Filters -->
        <div class="flex gap-2 overflow-x-auto pb-2">
          \${Object.entries(ALL_TAGS)
            .slice(0, 6)
            .map(([tagId, tagInfo]) => {
              const isSelected = this.selectedTags.includes(tagId);
              return html\`
              <button
                @click=\${() => this.toggleTag(tagId)}
                class="flex-shrink-0 px-3 py-1.5 border-2 border-black rounded-lg font-bold text-xs transition-all \${
                  isSelected
                    ? \`bg-\${tagInfo.color} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]\`
                    : "bg-white hover:bg-gray-100"
                }"
              >
                \${tagInfo.icon} \${tagInfo.label}
              </button>
            \`;
            })}
          \${
            this.selectedTags.length > 0
              ? html\`
            <button
              @click=\${() => {
                this.selectedTags = [];
              }}
              class="flex-shrink-0 px-3 py-1.5 border-2 border-black rounded-lg font-bold text-xs bg-gray-100 hover:bg-gray-200 transition-all"
            >
              Clear
            </button>
          \`
              : null
          }
        </div>

        <!-- Featured Section -->
        \${
          featured.length > 0
            ? html\`
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 bg-yellow-300 border-2 border-black rounded-lg font-black text-sm uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
                \u2B50 Featured
              </span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
              \${featured.map(
                (g) => html\`
                <view-group
                  .group=\${g}
                  .featured=\${true}
                  .onClick=\${(group) => this.goToGroup(group)}
                ></view-group>
              \`,
              )}
            </div>
          </div>
        \`
            : null
        }

        <!-- All Groups Section -->
        \${
          regular.length > 0
            ? html\`
          <div class="space-y-4">
            <h2 class="text-xl font-black uppercase text-black">All Communities</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              \${regular.map(
                (g) => html\`
                <view-group
                  .group=\${g}
                  .onClick=\${(group) => this.goToGroup(group)}
                ></view-group>
              \`,
              )}
            </div>
          </div>
        \`
            : null
        }

        <!-- Empty State -->
        \${
          this.groups.length === 0
            ? html\`
          <div class="bg-white border-3 border-black rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center">
            <div class="text-5xl mb-4">\u{1F997}</div>
            <h3 class="text-xl font-black uppercase mb-2">No Communities Yet</h3>
            <p class="text-gray-600 font-medium">Be the first to start a community!</p>
          </div>
        \`
            : null
        }
      </div>
    \`;
  },
};
`,mimeType:"text/javascript"},"/views/group.js":{content:`import T from "/$app/types/index.js";
import { html } from "/npm/lit-html";

export default {
  properties: {
    group: T.object(),
    featured: T.boolean({ defaultValue: false }),
    onClick: T.function({ attribute: false }),
  },
  handleCardClick(e) {
    // Don't navigate if clicking the WhatsApp button
    if (e.target.closest(".whatsapp-btn")) return;
    if (this.onClick) this.onClick(this.group);
  },
  render() {
    if (!this.group) return null;
    const g = this.group;
    const hasBadge = g.recommended || g.viewCount >= 100;
    const hasTags = g.tags?.length > 0;

    // Featured cards get a different, larger layout
    if (this.featured) {
      return html\`
        <div
          class="bg-white border-3 border-black rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
          @click=\${(e) => this.handleCardClick(e)}
        >
          <div class="relative h-40 bg-gray-200">
            <img src="\${g.image}" alt="\${g.name}" class="w-full h-full object-cover" />
            <div class="absolute top-3 left-3">
              \${hasBadge ? html\`
                <view-recommended-badge
                  .recommended=\${g.recommended}
                  .viewCount=\${g.viewCount || 0}
                ></view-recommended-badge>
              \` : html\`
                <span class="px-3 py-1 bg-yellow-300 border-2 border-black rounded-lg font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  \u2B50 Featured
                </span>
              \`}
            </div>
          </div>
          <div class="p-4 space-y-3">
            <uix-link href="/group/\${g.slug}" class="text-xl font-black uppercase leading-tight">\${g.name}</uix-link>
            <p class="text-sm font-medium text-gray-600 line-clamp-2">\${g.description}</p>
            \${hasTags ? html\`
              <view-tags-display .tags=\${g.tags} .maxVisible=\${3}></view-tags-display>
            \` : null}
            <div class="flex items-center justify-between pt-2">
              <div class="flex items-center gap-2">
                <span class="px-3 py-1 bg-gray-100 border-2 border-black rounded-lg font-black text-xs">
                  \u{1F465} \${g.memberCount}
                </span>
              </div>
              <a
                href="\${g.whatsappLink}"
                target="_blank"
                class="whatsapp-btn px-4 py-2 bg-green-400 border-2 border-black rounded-xl font-black uppercase text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                @click=\${(e) => e.stopPropagation()}
              >
                \u{1F4AC} Join
              </a>
            </div>
          </div>
        </div>
      \`;
    }

    // Regular card - compact grid style
    return html\`
      <div
        class="bg-white border-3 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer flex flex-col h-full"
        @click=\${(e) => this.handleCardClick(e)}
      >
        <div class="relative h-32 bg-gray-200 flex-shrink-0">
          <img src="\${g.image}" alt="\${g.name}" class="w-full h-full object-cover" />
          \${hasBadge ? html\`
            <div class="absolute top-2 right-2">
              <view-recommended-badge
                .recommended=\${g.recommended}
                .viewCount=\${g.viewCount || 0}
              ></view-recommended-badge>
            </div>
          \` : null}
          <div class="absolute bottom-2 right-2">
            <span class="px-2 py-1 bg-white border-2 border-black rounded-lg font-black text-[10px]">
              \u{1F465} \${g.memberCount}
            </span>
          </div>
        </div>
        <div class="p-3 flex-1 flex flex-col">
          <uix-link href="/group/\${g.slug}" class="text-sm font-black uppercase leading-tight mb-1 line-clamp-2">\${g.name}</uix-link>
          <p class="text-xs font-medium text-gray-500 line-clamp-2 flex-1">\${g.description}</p>
          \${hasTags ? html\`
            <div class="mt-2">
              <view-tags-display .tags=\${g.tags} .maxVisible=\${2}></view-tags-display>
            </div>
          \` : null}
          <a
            href="\${g.whatsappLink}"
            target="_blank"
            class="whatsapp-btn mt-3 block w-full text-center py-2 bg-green-400 border-2 border-black rounded-xl font-black uppercase text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            @click=\${(e) => e.stopPropagation()}
          >
            \u{1F4AC} Join Chat
          </a>
        </div>
      </div>
    \`;
  },
};
`,mimeType:"text/javascript"},"/views/recommended-badge.js":{content:`import T from "/$app/types/index.js";
import { html } from "/npm/lit-html";

const POPULAR_THRESHOLD = 100;

export default {
  properties: {
    recommended: T.boolean({ defaultValue: false }),
    viewCount: T.number({ defaultValue: 0 }),
    size: T.string({ defaultValue: "sm" }), // sm, md
  },

  render() {
    const { recommended, viewCount, size } = this;

    const isPopular = viewCount >= POPULAR_THRESHOLD;

    if (!recommended && !isPopular) return null;

    const sizeClasses = size === "md"
      ? "px-3 py-1.5 text-sm"
      : "px-2 py-1 text-xs";

    // Recommended takes priority over Popular
    if (recommended) {
      return html\`
        <span class="inline-flex items-center gap-1 bg-yellow-300 border-2 border-black rounded-lg font-black uppercase \${sizeClasses} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <span>\u2B50</span>
          <span>Recommended</span>
        </span>
      \`;
    }

    return html\`
      <span class="inline-flex items-center gap-1 bg-pink-400 border-2 border-black rounded-lg font-black uppercase \${sizeClasses} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        <span>\u{1F525}</span>
        <span>Popular</span>
      </span>
    \`;
  },
};
`,mimeType:"text/javascript"},"/views/tags-display.js":{content:`import T from "/$app/types/index.js";
import { html } from "/npm/lit-html";
import { getTagInfo } from "./utils.js";

export default {
  properties: {
    tags: T.array({ defaultValue: [] }),
    maxVisible: T.number({ defaultValue: 3 }),
    size: T.string({ defaultValue: "sm" }), // sm, md
    showIcon: T.boolean({ defaultValue: true }),
  },

  render() {
    const { tags, maxVisible, size, showIcon } = this;

    if (!tags || tags.length === 0) return null;

    const visibleTags = tags.slice(0, maxVisible);
    const hiddenCount = tags.length - maxVisible;

    const sizeClasses = size === "md"
      ? "px-3 py-1.5 text-sm"
      : "px-2 py-1 text-xs";

    return html\`
      <div class="flex flex-wrap gap-1.5">
        \${visibleTags.map((tag) => {
          const tagInfo = getTagInfo(tag);
          return html\`
            <span class="inline-flex items-center gap-1 bg-\${tagInfo.color} border-2 border-black rounded-lg font-bold \${sizeClasses}">
              \${showIcon ? html\`<span>\${tagInfo.icon}</span>\` : null}
              <span>\${tagInfo.label}</span>
            </span>
          \`;
        })}
        \${hiddenCount > 0 ? html\`
          <span class="inline-flex items-center bg-gray-200 border-2 border-black rounded-lg font-bold \${sizeClasses}">
            +\${hiddenCount}
          </span>
        \` : null}
      </div>
    \`;
  },
};
`,mimeType:"text/javascript"},"/views/templates/detail.js":{content:`import Router from "/$app/router/index.js";
import T from "/$app/types/index.js";
import $APP from "/$app.js";
import { html } from "/npm/lit-html";

const { brand, navTabs } = $APP.settings;

export default {
  class: "min-h-screen w-full bg-purple-50 flex flex-col font-sans",
  properties: {
    currentRoute: T.object({ sync: Router }),
    currentLang: T.string("en"),
    modalItem: T.object(null),
    modalOpen: T.boolean(false),
    userId: T.number({ sync: "local" }),
  },
  getActiveTabFromRoute() {
    const rN = this.currentRoute?.name;
    // Map detail views to their parent tab
    const detailToTab = {
      "place-detail": "discover",
      "event-detail": "events",
      "group-detail": "groups",
      "guide-detail": "guides",
      "meetup-detail": "discover",
    };
    if (detailToTab[rN]) return detailToTab[rN];
    const tabIds = navTabs.map((t) => t.id).filter((id) => id !== "discover");
    return tabIds.includes(rN) ? rN : "discover";
  },
  render() {
    const aT = this.getActiveTabFromRoute();
    const displayTitle =
      this.currentRoute?.route?.title || this.currentRoute?.pageTitle || "";

    return html\`
      <nav class="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b-3 border-black">
        <div class="flex items-center gap-4">
          <button
            @click=\${() => window.history.back()}
            class="w-10 h-10 flex items-center justify-center border-2 border-black rounded-xl bg-white hover:bg-gray-100 transition-colors"
          >
            <uix-icon name="arrow-left" size="20"></uix-icon>
          </button>
          <uix-link href="/" class="text-2xl font-black uppercase tracking-tight">
            <uix-icon name="tree-palm" size="lg"></uix-icon>
          \${brand.name}<span class="\${brand.accentClass} -ml-1">\${brand.accent}</span>
          </uix-link>
        </div>

        <div class="font-black uppercase tracking-tight text-gray-600 truncate max-w-[300px] sm:max-w-full text-center w-full text-3xl">
          \${displayTitle}
        </div>

        <div class="flex items-center gap-6">
          \${navTabs.map(
            (tab) => html\`
              <uix-link
                href=\${tab.route}
                class="font-bold uppercase text-sm transition-colors \${aT === tab.id ? brand.accentClass : \`text-black hover:\${brand.accentClass}\`}"
              >
                \${tab.label}
              </uix-link>
            \`,
          )}
          <uix-link
            href="/profile"
            class="w-10 h-10 rounded-full bg-green-300 border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <uix-icon name="user" size="sm"></uix-icon>
          </uix-link>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto no-scrollbar pb-24 md:pb-0">
        \${this.currentRoute.component}
      </main>

      <!-- Mobile Bottom Nav -->
      <nav class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden bg-black rounded-full">
        <div class="px-4 py-3 flex items-center gap-4">
        \${navTabs.map(
          (tab) => html\`
            <uix-link
              href=\${tab.route}
              class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 \${
                aT === tab.id
                  ? "bg-white/10 ring-2 ring-white text-white"
                  : "text-gray-400 hover:text-white"
              }"
            >
              <uix-icon name=\${tab.icon} size="md"></uix-icon>
            </uix-link>
          \`,
        )}
        </div>
      </nav>

      <!-- Modal -->
      <view-item-modal .item=\${this.modalItem} .isOpen=\${this.modalOpen} @close=\${() => {
        this.modalOpen = false;
        this.modalItem = null;
      }}></view-item-modal>
    \`;
  },
};
`,mimeType:"text/javascript"},"/views/group-detail-view.js":{content:`import T from "/$app/types/index.js";
import $APP from "/$app.js";
import { html } from "/npm/lit-html";
import { getCategoryColor, NBS } from "./utils.js";
import "./detail-hero.js";
import "./detail-info-card.js";

export default {
  dataQuery: true,
  properties: {
    group: T.object({ attribute: false }),
    userId: T.string({ defaultValue: "guest" }),
    currentUser: T.object({
      sync: $APP.Model.users,
      query: (inst) => ({
        id: inst.userId,
        includes: ["likedGroups"],
      }),
      dependsOn: ["userId"],
    }),
    showAuthPrompt: T.boolean({ defaultValue: false }),
    authPromptMessage: T.string({ defaultValue: "" }),
    showAuthModal: T.boolean({ defaultValue: false }),
  },
  async connected() {
    this.userId = $APP.Auth.isAuthenticated ? $APP.Auth.currentUserId : "guest";
  },
  dataLoaded({ row }) {
    if (row?.name) {
      $APP.Router.setTitle(row.name);
    }
  },
  isLiked() {
    if (!this.currentUser || !this.group) return false;
    return (
      this.currentUser.likedGroups?.some((g) => g.id === this.group.id) || false
    );
  },
  async handleLikeToggle() {
    const g = this.group;
    if (!g || !this.currentUser) return;

    if (this.isLiked()) {
      // Remove from liked
      this.currentUser.likedGroups = this.currentUser.likedGroups.filter(
        (i) => i.id !== g.id,
      );
    } else {
      // Add to liked
      this.currentUser.likedGroups = [
        ...this.currentUser.likedGroups,
        { id: g.id },
      ];
    }
    await $APP.Model.users.edit(this.currentUser);
  },
  render() {
    const m = this.group;
    if (!m) return NBS.SPINNER;
    const isLiked = this.isLiked();

    return html\`
      <div class="bg-purple-50 min-h-screen pb-20">
        <view-auth-modal
          .isOpen=\${this.showAuthModal}
          .onClose=\${() => (this.showAuthModal = false)}
          .onSuccess=\${() => location.reload()}
        ></view-auth-modal>
        \${
          this.showAuthPrompt
            ? html\`
              <div class="fixed bottom-20 left-4 right-4 z-40">
                <view-auth-prompt
                  .message=\${this.authPromptMessage}
                  .onLogin=\${() => {
                    this.showAuthPrompt = false;
                    this.showAuthModal = true;
                  }}
                  .onDismiss=\${() => (this.showAuthPrompt = false)}
                ></view-auth-prompt>
              </div>
            \`
            : null
        }
        <!-- Hero -->
        <view-detail-hero
          .image=\${m.image}
          .title=\${m.name}
          .category=\${$APP.i18n.t(\`categories.\${m.category}\`)}
          .categoryColor=\${getCategoryColor(m.category)}
          .badges=\${m.featured ? [{ label: "\u2B50 Featured", colorClass: "bg-yellow-300" }] : []}
          .recommended=\${m.recommended}
          .viewCount=\${m.viewCount || 0}
        ></view-detail-hero>

        <!-- Content - Two Column Layout -->
        <div class="px-4 -mt-6 relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Main Content (2/3 width on desktop) -->
            <div class="md:col-span-2 space-y-6">
              <view-detail-info-card
                .tags=\${m.tags || []}
                .description=\${m.description}
                .headerContent=\${() => html\`
                  \${m.groupName
                    ? html\`<div class="flex items-center gap-2 text-sm font-bold text-gray-600 mb-2">
                        <span>\u{1F4AC} \${m.groupName}</span>
                      </div>\`
                    : null}
                  \${m.memberCount
                    ? html\`<div class="flex items-center gap-2 text-sm font-bold text-gray-600">
                        <span>\u{1F465} \${m.memberCount}</span>
                      </div>\`
                    : null}
                \`}
                .actions=\${[
                  ...(m.whatsappLink
                    ? [
                        {
                          label: "\u{1F4AC} Join WhatsApp Group",
                          href: m.whatsappLink,
                          target: "_blank",
                          variant: "success",
                        },
                      ]
                    : []),
                  {
                    label: isLiked ? "\u2764\uFE0F Saved" : "\u{1F90D} Save Group",
                    onClick: () => this.handleLikeToggle(),
                    variant: isLiked ? "danger" : "primary",
                  },
                ]}
              ></view-detail-info-card>
            </div>

            <!-- Sidebar (1/3 width on desktop) -->
            <div class="space-y-6">
              <view-detail-sidebar
                type="group"
                .currentItem=\${m}
                .showToc=\${false}
              ></view-detail-sidebar>
            </div>
          </div>

          <div class="h-24"></div>
        </div>
      </div>
    \`;
  },
};
`,mimeType:"text/javascript"},"/views/detail-hero.js":{content:`import T from "/$app/types/index.js";
import { html } from "/npm/lit-html";

export default {
  properties: {
    image: T.string({ defaultValue: "" }),
    title: T.string({ defaultValue: "" }),
    category: T.string({ defaultValue: "" }),
    categoryColor: T.string({ defaultValue: "bg-pink-300" }),
    badges: T.array({ defaultValue: [] }),
    recommended: T.boolean({ defaultValue: false }),
    viewCount: T.number({ defaultValue: 0 }),
  },

  handleBack() {
    window.history.back();
  },

  handleShare() {
    if (navigator.share) {
      navigator.share({
        title: this.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  },

  render() {
    const showRecommendedBadge = this.recommended || this.viewCount >= 100;

    return html\`
      <div
        class="relative w-full h-48 sm:h-80 bg-gray-200 border-b-3 border-black overflow-hidden"
      >
        <!-- Hero Image -->
        <img src="\${this.image}" alt="\${this.title}" class="w-full h-full object-cover" />

        <!-- Bottom-Left Badges -->
        <div class="absolute bottom-4 left-4 flex gap-2 flex-wrap z-20">
          \${
            this.category
              ? html\`
                <div
                  class="px-3 py-1 \${this.categoryColor} border-2 border-black rounded-lg font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  \${this.category}
                </div>
              \`
              : null
          }
          \${this.badges.map(
            (badge) => html\`
              <div
                class="px-3 py-1 \${
                  badge.colorClass || "bg-gray-200"
                } border-2 border-black rounded-lg font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                \${badge.label}
              </div>
            \`,
          )}
        </div>

        <!-- Bottom-Right: Share button only (mobile) -->
        <div class="absolute bottom-4 right-4 md:hidden z-20">
          <button
            @click=\${() => this.handleShare()}
            class="w-10 h-10 flex items-center justify-center border-2 border-black rounded-xl bg-white hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <uix-icon name="share" size="20"></uix-icon>
          </button>
        </div>

        <!-- Bottom-Left: Recommended badge with category badges (mobile) -->
        \${
          showRecommendedBadge
            ? html\`
              <div class="absolute bottom-14 left-4 md:hidden z-20">
                <view-recommended-badge
                  .recommended=\${this.recommended}
                  .viewCount=\${this.viewCount}
                ></view-recommended-badge>
              </div>
            \`
            : null
        }

        <!-- Mobile Header (just back + title) -->
        <div
          class="absolute top-4 left-4 right-4 flex items-center gap-2 md:hidden"
        >
          <button
            @click=\${() => this.handleBack()}
            class="w-10 h-10 flex-shrink-0 flex items-center justify-center border-2 border-black rounded-xl bg-white hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <uix-icon name="arrow-left" size="20"></uix-icon>
          </button>
          <div
            class="px-3 py-2 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] max-w-[75%]"
          >
            <span class="font-black text-sm uppercase truncate block"
              >\${this.title}</span
            >
          </div>
        </div>

        <!-- Desktop Share Button & Badge -->
        <div class="absolute top-4 right-4 hidden md:flex items-center gap-2">
          <button
            @click=\${() => this.handleShare()}
            class="w-10 h-10 flex items-center justify-center border-2 border-black rounded-xl bg-white hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <uix-icon name="share" size="20"></uix-icon>
          </button>
          \${
            showRecommendedBadge
              ? html\`
                <view-recommended-badge
                  .recommended=\${this.recommended}
                  .viewCount=\${this.viewCount}
                ></view-recommended-badge>
              \`
              : null
          }
        </div>
      </div>
    \`;
  },
};
`,mimeType:"text/javascript"},"/views/detail-info-card.js":{content:`import T from "/$app/types/index.js";
import { html, nothing } from "/npm/lit-html";

export default {
  properties: {
    location: T.string({ defaultValue: "" }),
    tags: T.array({ defaultValue: [] }),
    description: T.string({ defaultValue: "" }),
    actions: T.array({ defaultValue: [] }),
    headerContent: T.function({ attribute: false }),
    beforeDescription: T.function({ attribute: false }),
    afterDescription: T.function({ attribute: false }),
  },

  renderAction(action) {
    const variantClasses = {
      primary:
        "bg-primary border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      success:
        "bg-green-400 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      danger:
        "bg-pink-400 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      outline:
        "bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
    };

    const classes = variantClasses[action.variant || "primary"];

    if (action.href) {
      return html\`
        <a
          href="\${action.href}"
          target="\${action.target || "_self"}"
          class="block w-full text-center py-3 \${classes} rounded-xl font-black uppercase text-black transition-all"
        >
          \${action.icon ? html\`<span class="mr-1">\${action.icon}</span>\` : null}
          \${action.label}
        </a>
      \`;
    }

    return html\`
      <button
        @click=\${action.onClick}
        class="w-full py-4 \${classes} rounded-xl font-black uppercase text-black cursor-pointer transition-all"
      >
        \${action.icon ? html\`<span class="mr-1">\${action.icon}</span>\` : null}
        \${action.label}
      </button>
    \`;
  },

  render() {
    return html\`
      <div
        class="bg-white border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
      >
        <!-- Header Content (custom) -->
        \${this.headerContent ? this.headerContent() : nothing}

        <!-- Location -->
        \${this.location
          ? html\`
              <div
                class="flex items-center gap-2 text-sm font-bold text-gray-600 mb-2"
              >
                <span>\${this.location}</span>
              </div>
            \`
          : nothing}

        <!-- Tags -->
        \${this.tags?.length > 0
          ? html\`
              <div class="mb-4">
                <view-tags-display
                  .tags=\${this.tags}
                  .maxVisible=\${4}
                  size="md"
                ></view-tags-display>
              </div>
            \`
          : nothing}

        <!-- Before Description Content (custom) -->
        \${this.beforeDescription ? this.beforeDescription() : nothing}

        <!-- Description -->
        \${this.description
          ? html\`
              <div class="mt-4 pt-4 border-t-2 border-dashed border-gray-200">
                <p class="text-base font-medium text-gray-800 leading-relaxed">
                  \${this.description}
                </p>
              </div>
            \`
          : nothing}

        <!-- After Description Content (custom) -->
        \${this.afterDescription ? this.afterDescription() : nothing}

        <!-- Action Buttons -->
        \${this.actions?.length > 0
          ? html\`
              <div class="mt-6 pt-6 border-t-2 border-dashed border-gray-300">
                <div class="space-y-3">
                  \${this.actions.map((action) => this.renderAction(action))}
                </div>
              </div>
            \`
          : nothing}
      </div>
    \`;
  },
};
`,mimeType:"text/javascript"},"/$app/icon-lucide/lucide/arrow-left.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 19l-7-7l7-7m7 7H5"/></svg>',mimeType:"image/svg+xml"},"/views/auth-modal.js":{content:`import T from "/$app/types/index.js";
import { html } from "/npm/lit-html";
import $APP from "/$app.js";

export default {
  style: true,
  properties: {
    isOpen: T.boolean({ defaultValue: false }),
    onClose: T.function({ attribute: false }),
    onSuccess: T.function({ attribute: false }),
    loading: T.boolean({ defaultValue: false }),
    error: T.string({ defaultValue: "" }),
  },
  async handleAuthSubmit(e) {
    const { mode, name, email, password, passwordConfirm } = e.detail;
    const authForm = this.querySelector("uix-auth-form");
    this.loading = true;
    this.error = "";

    try {
      let result;
      if (mode === "register") {
        result = await $APP.Auth.register({
          name,
          email,
          password,
          passwordConfirm: passwordConfirm || password,
          username: \`@\${name.toLowerCase().replace(/\\s/g, "")}\`,
          stats: { interested: 0, saved: 0, attending: 0 },
          travelStatus: "visitor",
          vibeTime: "night",
          vibeSocial: "social",
          vibeDrink: "caipirinha",
          lookingFor: [],
        });
      } else {
        result = await $APP.Auth.login(email, password);
      }

      if (result.success) {
        if (this.onSuccess) this.onSuccess();
      } else {
        this.error = result.error || "Authentication failed";
        authForm?.setError(this.error);
      }
    } catch (error) {
      this.error = error.message || "An error occurred";
      authForm?.setError(this.error);
    } finally {
      this.loading = false;
    }
  },
  async handleOAuth(e) {
    const { provider } = e.detail;
    this.loading = true;
    this.error = "";

    try {
      const result = await $APP.Auth.loginWithOAuth(provider);
      if (result.error) {
        this.error = result.error;
        const authForm = this.querySelector("uix-auth-form");
        authForm?.setError(this.error);
      }
    } catch (error) {
      this.error = error.message || "OAuth failed";
      const authForm = this.querySelector("uix-auth-form");
      authForm?.setError(this.error);
    } finally {
      this.loading = false;
    }
  },
  handleGuest() {
    if (this.onClose) this.onClose();
  },
  render() {
    if (!this.isOpen) return null;

    return html\`
      <uix-modal
        .open=\${this.isOpen}
        @modal-close=\${() => this.onClose?.()}
        @modal-cancel=\${() => this.onClose?.()}
      >
        <div slot="header" class="flex justify-between items-center w-full">
          <h2 class="text-2xl font-black uppercase">Join MEETUP.RIO</h2>
        </div>
        <uix-auth-form
          .showTabs=\${true}
          .showOAuth=\${true}
          .showGuest=\${true}
          .loading=\${this.loading}
          registerTitle="Join MEETUP.RIO"
          @auth-submit=\${this.handleAuthSubmit}
          @auth-oauth=\${this.handleOAuth}
          @auth-guest=\${this.handleGuest}
        ></uix-auth-form>
      </uix-modal>
    \`;
  },
};
`,mimeType:"text/javascript"},"/views/detail-sidebar.js":{content:`import T from "/$app/types/index.js";
import $APP from "/$app.js";
import { html } from "/npm/lit-html";
import "./sidebar-quick-info.js";
import "./sidebar-map-preview.js";

export default {
  properties: {
    type: T.string({ defaultValue: "guide" }), // "guide" | "event" | "group" | "place"
    currentItem: T.object({ attribute: false }),
    tocItems: T.array({ defaultValue: [] }),
    showToc: T.boolean({ defaultValue: false }),
    showQuickInfo: T.boolean({ defaultValue: true }),
    showMap: T.boolean({ defaultValue: true }),
  },

  scrollToItem(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  },

  renderToc() {
    if (!this.showToc || !this.tocItems?.length) return null;

    return html\`
      <div class="p-4">
        <h4 class="font-black uppercase text-sm mb-3">
          \${$APP.i18n?.t?.("guides.contents") || "Contents"}
        </h4>
        <ul class="space-y-2">
          \${this.tocItems.map(
            (item, i) => html\`
              <li>
                <a
                  href="#\${item.id}"
                  @click=\${(e) => {
                    e.preventDefault();
                    this.scrollToItem(item.id);
                  }}
                  class="text-sm font-medium text-gray-700 hover:text-black flex items-start gap-2 transition-colors"
                >
                  <span
                    class="text-xs text-gray-400 font-bold mt-0.5 flex-shrink-0"
                    >\${i + 1}.</span
                  >
                  <span class="line-clamp-2">\${item.title}</span>
                </a>
              </li>
            \`
          )}
        </ul>
      </div>
    \`;
  },

  renderRelatedContent() {
    if (!this.currentItem) return null;

    const titleKey = \`related.\${this.type === "guide" ? "guides" : this.type === "event" ? "events" : this.type === "place" ? "places" : "groups"}\`;
    const defaultTitles = {
      guide: "Related Guides",
      event: "You Might Also Like",
      place: "Similar Places",
      group: "Similar Communities",
    };

    return html\`
      <view-related-content
        .currentItem=\${this.currentItem}
        type=\${this.type}
        .title=\${$APP.i18n?.t?.(titleKey) || defaultTitles[this.type]}
      ></view-related-content>
    \`;
  },

  getStats() {
    const item = this.currentItem;
    if (!item) return [];

    const stats = [];

    if (item.viewCount) {
      stats.push({ icon: "\u{1F441}\uFE0F", value: item.viewCount, label: "views" });
    }
    if (item.rating) {
      stats.push({ icon: "\u2B50", value: item.rating.toFixed(1), label: "rating" });
    }
    if (item.memberCount) {
      stats.push({ icon: "\u{1F465}", value: item.memberCount, label: "members" });
    }
    if (item.attendees?.length) {
      stats.push({ icon: "\u{1F3AB}", value: item.attendees.length, label: "going" });
    }
    if (item.price !== undefined && this.type === "event") {
      stats.push({
        icon: "\u{1F4B0}",
        value: item.price === 0 ? "FREE" : \`R$\${item.price}\`,
        label: "price",
      });
    }

    return stats;
  },

  renderQuickInfo() {
    if (!this.showQuickInfo || !this.currentItem) return null;

    const item = this.currentItem;
    return html\`
      <view-sidebar-quick-info
        .category=\${item.category || item.categories?.[0] || ""}
        .tags=\${item.tags || []}
        .stats=\${this.getStats()}
        .location=\${item.address || item.venue || ""}
      ></view-sidebar-quick-info>
    \`;
  },

  renderMapPreview() {
    if (!this.showMap || !this.currentItem?.lat || !this.currentItem?.lng) return null;

    const item = this.currentItem;
    return html\`
      <view-sidebar-map-preview
        .lat=\${item.lat}
        .lng=\${item.lng}
        .address=\${item.address || item.venue || ""}
      ></view-sidebar-map-preview>
    \`;
  },

  renderDivider() {
    return html\`<div class="border-t border-gray-200 mx-4"></div>\`;
  },

  render() {
    const hasQuickInfo = this.showQuickInfo && this.currentItem;
    const hasMap = this.showMap && this.currentItem?.lat && this.currentItem?.lng;
    const hasToc = this.showToc && this.tocItems?.length > 0;
    const hasRelated = this.currentItem;

    return html\`
      <div class="bg-white border-3 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:sticky md:top-20 overflow-hidden">
        \${this.renderQuickInfo()}
        \${hasQuickInfo && hasMap ? this.renderDivider() : null}
        \${this.renderMapPreview()}
        \${(hasQuickInfo || hasMap) && hasToc ? this.renderDivider() : null}
        \${this.renderToc()}
        \${(hasQuickInfo || hasMap || hasToc) && hasRelated ? this.renderDivider() : null}
        \${this.renderRelatedContent()}
      </div>
    \`;
  },
};
`,mimeType:"text/javascript"},"/$app/icon-lucide/lucide/share.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8m-4-6l-4-4l-4 4m4-4v13"/></svg>',mimeType:"image/svg+xml"},"/views/sidebar-quick-info.js":{content:`import T from "/$app/types/index.js";
import $APP from "/$app.js";
import { html } from "/npm/lit-html";
import { CATEGORIES, getTagInfo } from "./utils.js";

export default {
  properties: {
    category: T.string({ defaultValue: "" }),
    tags: T.array({ defaultValue: [] }),
    stats: T.array({ defaultValue: [] }), // [{icon, value, label}]
    location: T.string({ defaultValue: "" }),
  },

  render() {
    const hasContent = this.category || this.stats?.length > 0 || this.location || this.tags?.length > 0;
    if (!hasContent) return null;

    const categoryInfo = CATEGORIES[this.category];

    return html\`
      <div class="p-4">
        <!-- Category badge -->
        \${this.category && categoryInfo ? html\`
          <div class="mb-3">
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-\${categoryInfo.color} border-2 border-black rounded-lg font-black text-sm uppercase">
              \${categoryInfo.icon} \${$APP.i18n?.t?.(\`categories.\${this.category}\`) || this.category}
            </span>
          </div>
        \` : null}

        <!-- Stats row -->
        \${this.stats?.length > 0 ? html\`
          <div class="flex flex-wrap gap-3 mb-3 text-sm">
            \${this.stats.map(stat => html\`
              <div class="flex items-center gap-1">
                <span class="text-gray-400">\${stat.icon}</span>
                <span class="font-bold">\${stat.value}</span>
              </div>
            \`)}
          </div>
        \` : null}

        <!-- Location -->
        \${this.location ? html\`
          <div class="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <span>\u{1F4CD}</span>
            <span class="font-medium line-clamp-1">\${this.location}</span>
          </div>
        \` : null}

        <!-- Tags -->
        \${this.tags?.length > 0 ? html\`
          <div class="flex flex-wrap gap-1.5">
            \${this.tags.slice(0, 4).map(tag => {
              const tagInfo = getTagInfo(tag);
              return html\`
                <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-\${tagInfo.color} border border-black rounded text-xs font-bold">
                  \${tagInfo.icon} \${tagInfo.label}
                </span>
              \`;
            })}
          </div>
        \` : null}
      </div>
    \`;
  },
};
`,mimeType:"text/javascript"},"/views/sidebar-map-preview.js":{content:`import T from "/$app/types/index.js";
import { html } from "/npm/lit-html";

export default {
  properties: {
    lat: T.number(),
    lng: T.number(),
    address: T.string({ defaultValue: "" }),
  },

  render() {
    if (!this.lat || !this.lng) return null;

    const googleMapsUrl = \`https://www.google.com/maps?q=\${this.lat},\${this.lng}\`;

    return html\`
      <a href=\${googleMapsUrl} target="_blank" rel="noopener noreferrer" class="block px-4 py-3">
        <div class="h-24 bg-gradient-to-b from-green-100 to-blue-100 rounded-lg flex items-center justify-center border border-gray-200 relative overflow-hidden">
          <!-- Stylized map background pattern -->
          <div class="absolute inset-0 opacity-20">
            <div class="absolute top-2 left-4 w-16 h-px bg-gray-400"></div>
            <div class="absolute top-6 left-8 w-12 h-px bg-gray-400"></div>
            <div class="absolute top-10 left-2 w-20 h-px bg-gray-400"></div>
            <div class="absolute bottom-6 right-4 w-14 h-px bg-gray-400"></div>
            <div class="absolute bottom-10 right-8 w-10 h-px bg-gray-400"></div>
          </div>
          <!-- Pin icon -->
          <div class="text-center relative z-10">
            <div class="text-3xl mb-1">\u{1F4CD}</div>
            <div class="text-xs font-bold text-gray-600">View on Map</div>
          </div>
        </div>
      </a>
    \`;
  },
};
`,mimeType:"text/javascript"},"/views/auth-modal.css":{content:`uix-modal::part(dialog){border:4px solid black;border-radius:1.5rem;box-shadow:8px 8px #ffffff80;max-width:28rem;padding:0;overflow:hidden}uix-modal::part(header){background:var(--color-primary);color:#000;border-bottom:3px solid black;padding:1.5rem}uix-modal::part(body){padding:0}
`,mimeType:"text/css"},"/views/related-content.js":{content:`import T from "/$app/types/index.js";
import $APP from "/$app.js";
import { html } from "/npm/lit-html";

export default {
  properties: {
    currentItem: T.object({ attribute: false }),
    type: T.string({ defaultValue: "place" }), // place, event, guide, group
    title: T.string({ defaultValue: "" }),
    maxItems: T.number({ defaultValue: 4 }),
    places: T.array({ sync: $APP.Model.places, query: {} }),
    events: T.array({ sync: $APP.Model.events, query: {} }),
    guides: T.array({ sync: $APP.Model.guides, query: {} }),
    groups: T.array({ sync: $APP.Model.groups, query: {} }),
  },

  getCollection() {
    switch (this.type) {
      case "place":
        return this.places || [];
      case "event":
        return this.events || [];
      case "guide":
        return this.guides || [];
      case "group":
        return this.groups || [];
      default:
        return [];
    }
  },

  calculateScore(item) {
    if (!this.currentItem) return 0;
    let score = 0;

    // Category match (+10 points)
    const currentCategory =
      this.currentItem.category || this.currentItem.categories?.[0];
    const itemCategory = item.category || item.categories?.[0];
    if (currentCategory && itemCategory && currentCategory === itemCategory) {
      score += 10;
    }

    // Tag matches (+5 points each)
    const currentTags = this.currentItem.tags || [];
    const itemTags = item.tags || [];
    const sharedTags = currentTags.filter((tag) => itemTags.includes(tag));
    score += sharedTags.length * 5;

    // Boost recommended items
    if (item.recommended) score += 3;

    // Boost popular items
    if (item.viewCount >= 100) score += 2;

    return score;
  },

  getRelatedItems() {
    const collection = this.getCollection();
    const currentId = this.currentItem?.id;

    // Filter out current item and score the rest
    const scored = collection
      .filter((item) => item.id !== currentId)
      .map((item) => ({ item, score: this.calculateScore(item) }))
      .filter(({ score }) => score > 0) // Only items with some relevance
      .sort((a, b) => b.score - a.score)
      .slice(0, this.maxItems);

    return scored.map(({ item }) => item);
  },

  getRouteType() {
    return this.type === "guide" ? "guide" : this.type;
  },

  render() {
    const relatedItems = this.getRelatedItems();

    if (relatedItems.length === 0) return null;

    const displayTitle =
      this.title ||
      $APP.i18n?.t?.(\`related.\${this.type}s\`) ||
      \`Related \${this.type}s\`;

    return html\`
      <div class="p-4">
        <h3 class="text-sm font-black uppercase mb-3">\${displayTitle}</h3>
        <div class="space-y-1">
          \${relatedItems.map(
            (item) => html\`
            <div
              class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              @click=\${() => $APP.Router.go(\`\${this.getRouteType()}-detail\`, { slug: item.slug })}
            >
              <div class="w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden border-2 border-black bg-gray-200">
                <img src="\${item.image || item.coverImage}" alt="\${item.name || item.title}" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-sm font-bold leading-tight line-clamp-1">\${item.name || item.title}</div>
                \${
                  item.category
                    ? html\`
                  <div class="text-xs text-gray-500">\${$APP.i18n?.t?.(\`categories.\${item.category}\`) || item.category}</div>
                \`
                    : null
                }
              </div>
              \${item.recommended ? html\`<span class="text-xs">\u2B50</span>\` : null}
            </div>
          \`,
          )}
        </div>
      </div>
    \`;
  },
};
`,mimeType:"text/javascript"},"/views/guides-view.js":{content:`import T from "/$app/types/index.js";
import $APP from "/$app.js";
import { html } from "/npm/lit-html";
import { NBS } from "./utils.js";

const { brand } = $APP.settings;

export default {
  dataQuery: true,
  properties: {
    guides: T.array(),
    selectedType: T.string({ defaultValue: "all" }),
  },

  goToGuide(guide) {
    $APP.Router.go("guide-detail", { slug: guide.slug });
  },

  getFilteredGuides() {
    let filtered = this.guides || [];

    if (this.selectedType !== "all") {
      filtered = filtered.filter((g) => g.guideType === this.selectedType);
    }

    return filtered;
  },

  render() {
    if (!this.guides) return NBS.SPINNER;

    const featured = this.guides.filter((g) => g.featured);
    const filtered = this.getFilteredGuides();

    return html\`
      <div class="p-4 sm:p-6 space-y-6 pb-24">
        <!-- Mobile Header with branding -->
        <header class="md:hidden flex items-center justify-between">
          <view-logo></view-logo>
          <div class="bg-amber-300 border-2 border-black rounded-full w-10 h-10 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span class="text-lg">\u{1F4DA}</span>
          </div>
        </header>

        <!-- Page Title -->
        <h1 class="text-2xl md:text-4xl font-black uppercase text-black tracking-tight">
          Guides
        </h1>

        <!-- Type Filter Tabs -->
        <div class="flex gap-2 overflow-x-auto pb-2">
          \${["all", "article", "list"].map(
            (type) => html\`
              <button
                @click=\${() => (this.selectedType = type)}
                class="px-4 py-2 border-2 border-black rounded-lg font-bold text-sm uppercase whitespace-nowrap
                \${
                  this.selectedType === type
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                }
                shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                \${
                  type === "all"
                    ? "All"
                    : type === "article"
                      ? "Articles"
                      : "Curated Lists"
                }
              </button>
            \`,
          )}
        </div>

        <!-- Featured Section -->
        \${
          featured.length > 0 && this.selectedType === "all"
            ? html\`
              <div class="space-y-4">
                <div class="flex items-center gap-2">
                  <span
                    class="px-3 py-1 bg-yellow-300 border-2 border-black rounded-lg font-black text-sm uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-1"
                  >
                    Featured
                  </span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                  \${featured.map(
                    (g) => html\`
                      <view-guide-card
                        .guide=\${g}
                        .featured=\${true}
                        .onClick=\${(guide) => this.goToGuide(guide)}
                      ></view-guide-card>
                    \`,
                  )}
                </div>
              </div>
            \`
            : null
        }

        <!-- All Guides Section -->
        \${
          filtered.length > 0
            ? html\`
              <div class="space-y-4">
                <h2 class="text-xl font-black uppercase text-black">
                  \${
                    this.selectedType === "all"
                      ? "All Guides"
                      : this.selectedType === "article"
                        ? "Articles"
                        : "Curated Lists"
                  }
                </h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  \${filtered.map(
                    (g) => html\`
                      <view-guide-card
                        .guide=\${g}
                        .onClick=\${(guide) => this.goToGuide(guide)}
                      ></view-guide-card>
                    \`,
                  )}
                </div>
              </div>
            \`
            : null
        }

        <!-- Empty State -->
        \${
          filtered.length === 0
            ? html\`
              <div
                class="bg-white border-3 border-black rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center"
              >
                <div class="text-5xl mb-4">\u{1F4DA}</div>
                <h3 class="text-xl font-black uppercase mb-2">No Guides Yet</h3>
                <p class="text-gray-600 font-medium">
                  Check back soon for local insights and tips!
                </p>
              </div>
            \`
            : null
        }
      </div>
    \`;
  },
};
`,mimeType:"text/javascript"},"/views/guide-detail-view.js":{content:`import T from "/$app/types/index.js";
import $APP from "/$app.js";
import { html } from "/npm/lit-html";
import { getCategoryColor, NBS } from "./utils.js";
import "./detail-hero.js";
import "./detail-info-card.js";

export default {
  dataQuery: true,
  properties: {
    guide: T.object({ attribute: false }),
    linkedPlaces: T.array({ defaultValue: [] }),
    linkedEvents: T.array({ defaultValue: [] }),
  },

  dataLoaded({ row }) {
    if (row?.title) $APP.Router.setTitle(row.title);
  },

  async fetchLinkedItems() {
    const items = this.guide.items || [];
    const placeIds = items
      .filter((i) => i.type === "place" && i.id)
      .map((i) => i.id);
    const eventIds = items
      .filter((i) => i.type === "event" && i.id)
      .map((i) => i.id);

    if (placeIds.length > 0) {
      const places = await $APP.Model.places.getAll();
      this.linkedPlaces = places.filter((p) => placeIds.includes(p.id));
    }
    if (eventIds.length > 0) {
      const events = await $APP.Model.events.getAll();
      this.linkedEvents = events.filter((e) => eventIds.includes(e.id));
    }
  },

  getLinkedItem(item) {
    if (item.type === "place") {
      return this.linkedPlaces.find((p) => p.id === item.id);
    }
    return this.linkedEvents.find((e) => e.id === item.id);
  },

  getTocItems() {
    const g = this.guide;
    if (!g) return [];

    if (g.guideType === "article") {
      // Parse headers from body
      const body = g.body || "";
      const headers = [];
      let sectionIndex = 0;

      body.split("\\n").forEach((line) => {
        if (line.startsWith("## ")) {
          headers.push({
            id: \`section-\${sectionIndex}\`,
            title: line.slice(3).trim(),
            level: 2,
          });
          sectionIndex++;
        }
      });
      return headers;
    } else {
      // List items become TOC
      return (g.items || []).map((item, i) => ({
        id: \`item-\${i}\`,
        title: item.note || \`Item \${i + 1}\`,
        level: 1,
      }));
    }
  },

  renderArticleBody() {
    const body = this.guide.body || "";

    // Simple markdown-like rendering
    // Split by double newlines for paragraphs, render headers
    const sections = body.split("\\n\\n");
    let sectionIndex = 0;

    return html\`
      <div class="prose prose-lg max-w-none space-y-4">
        \${sections.map((section) => {
          const trimmed = section.trim();
          if (trimmed.startsWith("## ")) {
            const id = \`section-\${sectionIndex}\`;
            sectionIndex++;
            return html\`<h2
              id=\${id}
              class="text-xl font-black uppercase mt-6 mb-3 text-black scroll-mt-20"
            >
              \${trimmed.slice(3)}
            </h2>\`;
          }
          if (trimmed.startsWith("# ")) {
            return html\`<h1
              class="text-2xl font-black uppercase mt-6 mb-3 text-black"
            >
              \${trimmed.slice(2)}
            </h1>\`;
          }
          if (trimmed.startsWith("- ")) {
            const items = trimmed.split("\\n").filter((l) => l.startsWith("- "));
            return html\`
              <ul class="list-disc list-inside space-y-1">
                \${items.map(
                  (item) =>
                    html\`<li class="text-gray-800 font-medium">
                      \${item.slice(2)}
                    </li>\`,
                )}
              </ul>
            \`;
          }
          if (trimmed.match(/^\\d+\\./)) {
            const items = trimmed.split("\\n").filter((l) => l.match(/^\\d+\\./));
            return html\`
              <ol class="list-decimal list-inside space-y-1">
                \${items.map(
                  (item) =>
                    html\`<li class="text-gray-800 font-medium">
                      \${item.replace(/^\\d+\\.\\s*/, "")}
                    </li>\`,
                )}
              </ol>
            \`;
          }
          // Regular paragraph - handle **bold** text
          const formatted = trimmed.replace(
            /\\*\\*([^*]+)\\*\\*/g,
            "<strong>$1</strong>",
          );
          return html\`<p
            class="text-gray-800 font-medium leading-relaxed"
            .innerHTML=\${formatted}
          ></p>\`;
        })}
      </div>
    \`;
  },

  renderListItems() {
    const items = this.guide.items || [];

    return html\`
      <div class="space-y-4">
        \${items.map((item, index) => {
          const linked = this.getLinkedItem(item);
          return html\`
            <div
              id="item-\${index}"
              class="bg-gray-50 border-2 border-black rounded-xl p-4 flex gap-4 scroll-mt-20"
            >
              <div
                class="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-black text-lg"
              >
                \${index + 1}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    class="px-2 py-0.5 \${
                      item.type === "place" ? "bg-blue-200" : "bg-purple-200"
                    } border border-black rounded font-bold text-xs uppercase"
                  >
                    \${item.type === "place" ? "Place" : "Event"}
                  </span>
                  \${
                    linked
                      ? html\`
                        <button
                          @click=\${() =>
                            $APP.Router.go(
                              item.type === "place"
                                ? "place-detail"
                                : "event-detail",
                              { slug: linked.slug },
                            )}
                          class="px-2 py-0.5 bg-black text-white rounded font-bold text-xs uppercase hover:bg-gray-800 transition-colors"
                        >
                          \${
                            $APP.i18n?.t?.(
                              \`guides.view\${item.type === "place" ? "Place" : "Event"}\`,
                            ) || \`View \${item.type}\`
                          }
                        </button>
                      \`
                      : null
                  }
                </div>
                \${
                  linked
                    ? html\`<h4 class="font-black text-sm mb-1">\${linked.name}</h4>\`
                    : null
                }
                \${
                  item.note
                    ? html\`<p class="text-gray-700 font-medium text-sm">
                      \${item.note}
                    </p>\`
                    : null
                }
              </div>
            </div>
          \`;
        })}
      </div>
    \`;
  },

  render() {
    const g = this.guide;
    if (!g) return NBS.SPINNER;

    const isArticle = g.guideType === "article";
    const typeLabel = isArticle ? "Article" : "Curated List";
    const typeColor = isArticle ? "bg-amber-300" : "bg-emerald-300";
    const tocItems = this.getTocItems();

    return html\`
      <div class="bg-purple-50 min-h-screen pb-20">
        <!-- Hero -->
        <view-detail-hero
          .image=\${g.coverImage}
          .title=\${g.title}
          .category=\${isArticle ? "Article" : "List"}
          .categoryColor=\${typeColor}
          .badges=\${(g.categories || []).map((cat) => ({
            label: $APP.i18n?.t?.(\`categories.\${cat}\`) || cat,
            colorClass: getCategoryColor(cat),
          }))}
          .recommended=\${g.recommended}
          .viewCount=\${g.viewCount || 0}
        ></view-detail-hero>

        <!-- Content - Two Column Layout -->
        <div class="px-4 -mt-6 relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Main Content (2/3 width on desktop) -->
            <div class="md:col-span-2 space-y-6">
              <view-detail-info-card
                .tags=\${g.tags || []}
                .headerContent=\${() => html\`
                  <p class="text-gray-600 font-medium text-base mb-4">\${g.description}</p>
                \`}
                .afterDescription=\${
                  g.publishedAt
                    ? () => html\`
                      <div class="flex items-center gap-3 mt-4 pt-4 border-t-2 border-dashed border-gray-200">
                        <div class="w-10 h-10 bg-amber-200 border-2 border-black rounded-full flex items-center justify-center font-black">
                          \${isArticle ? "A" : "L"}
                        </div>
                        <div>
                          <div class="text-xs font-bold text-gray-500 uppercase">Published</div>
                          <div class="font-bold text-sm">
                            \${new Date(g.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </div>
                        </div>
                      </div>
                    \`
                    : null
                }
              ></view-detail-info-card>

              <!-- Body (Article) or Items (List) -->
              <div
                class="bg-white border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                \${
                  isArticle
                    ? this.renderArticleBody()
                    : html\`
                      <h3
                        class="text-lg font-black uppercase mb-4 flex items-center gap-2"
                      >
                        \${
                          $APP.i18n?.t?.("guides.placesInGuide") ||
                          "Places in this Guide"
                        }
                        <span
                          class="bg-black text-white text-xs px-2 py-1 rounded-md"
                        >
                          \${g.items?.length || 0}
                        </span>
                      </h3>
                      \${this.renderListItems()}
                    \`
                }
              </div>
            </div>

            <!-- Sidebar (1/3 width on desktop) -->
            <div class="space-y-6">
              <view-detail-sidebar
                type="guide"
                .currentItem=\${g}
                .tocItems=\${tocItems}
                .showToc=\${tocItems.length > 0}
              ></view-detail-sidebar>
            </div>
          </div>

          <div class="h-24"></div>
        </div>
      </div>
    \`;
  },
};
`,mimeType:"text/javascript"},"/views/events-view.js":{content:`import T from "/$app/types/index.js";
import $APP from "/$app.js";
import { html } from "/npm/lit-html";
import {
  CATEGORIES,
  getCategoryColor,
  NBS,
  PLACE_CATEGORIES,
} from "./utils.js";

const { brand } = $APP.settings;

// Event categories (subset of place categories)
const EVENT_CATEGORIES = ["all", ...PLACE_CATEGORIES];

export default {
  properties: {
    events: T.array({ sync: $APP.Model.events, query: {} }),
    selectedFilter: T.string({ defaultValue: "upcoming" }),
    selectedCategory: T.string({ defaultValue: "all" }),
  },

  goToEvent(event) {
    $APP.Router.go("event-detail", { slug: event.slug });
  },

  setCategory(cat) {
    this.selectedCategory = cat;
  },

  filterByCategory(events) {
    if (this.selectedCategory === "all") return events;
    return events.filter((e) => e.category === this.selectedCategory);
  },

  getUpcomingEvents() {
    const today = new Date().toISOString().split("T")[0];
    const events = this.filterByCategory(this.events || []);
    return events
      .filter((e) => e.date >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  },

  getThisWeekEvents() {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const todayStr = today.toISOString().split("T")[0];
    const nextWeekStr = nextWeek.toISOString().split("T")[0];

    const events = this.filterByCategory(this.events || []);
    return events
      .filter((e) => e.date >= todayStr && e.date <= nextWeekStr)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  },

  getRecurringEvents() {
    const events = this.filterByCategory(this.events || []);
    return events.filter((e) => e.isRecurring);
  },

  formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  },

  render() {
    if (!this.events) return NBS.SPINNER;

    const upcoming = this.getUpcomingEvents();
    const thisWeek = this.getThisWeekEvents();
    const recurring = this.getRecurringEvents();

    return html\`
      <div class="p-4 sm:p-6 space-y-6 pb-24">
        <!-- Mobile Header with branding -->
        <header class="md:hidden flex items-center justify-between">
          <view-logo></view-logo>
          <uix-link
            href="/calendar"
            class="bg-purple-300 border-2 border-black rounded-full w-10 h-10 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <span class="text-lg">\u{1F4C5}</span>
          </uix-link>
        </header>

        <!-- Page Title -->
        <div class="flex items-center justify-between">
          <h1
            class="text-2xl md:text-4xl font-black uppercase text-black tracking-tight"
          >
            Events
          </h1>
          <uix-link
            href="/calendar"
            class="text-xs font-bold text-pink-700 uppercase hover:underline hidden md:block"
          >
            Calendar View
          </uix-link>
        </div>

        <!-- Category Filters -->
        <div class="overflow-hidden -mx-4 sm:-mx-6">
          <div class="flex gap-2 overflow-x-auto pb-2 flex-nowrap px-4 sm:px-6">
            \${EVENT_CATEGORIES.map((cat) => {
              const isSelected = this.selectedCategory === cat;
              const catInfo = CATEGORIES[cat] || {
                icon: "\u{1F4CD}",
                color: "gray-200",
              };
              return html\`
                <button
                  @click=\${() => this.setCategory(cat)}
                  class="flex-shrink-0 px-3 py-1.5 border-2 border-black rounded-lg font-bold text-xs transition-all \${
                    isSelected
                      ? \`bg-\${catInfo.color} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]\`
                      : "bg-white hover:bg-gray-100"
                  }"
                >
                  \${catInfo.icon} \${$APP.i18n?.t?.(\`categories.\${cat}\`) || cat}
                </button>
              \`;
            })}
          </div>
        </div>

        <!-- This Week Section -->
        \${
          thisWeek.length > 0
            ? html\`
              <div class="space-y-4">
                <div class="flex items-center gap-2">
                  <span
                    class="px-3 py-1 bg-pink-300 border-2 border-black rounded-lg font-black text-sm uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-1"
                  >
                    This Week
                  </span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  \${thisWeek.slice(0, 6).map(
                    (event) => html\`
                      <div
                        @click=\${() => this.goToEvent(event)}
                        class="bg-white border-3 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
                      >
                        <div class="relative h-32 bg-gray-200">
                          <img
                            src="\${event.image}"
                            alt="\${event.name}"
                            class="w-full h-full object-cover"
                          />
                          <div class="absolute top-2 left-2">
                            <span
                              class="px-2 py-0.5 \${getCategoryColor(
                                event.category,
                              )} border-2 border-black rounded font-bold text-[10px] uppercase"
                            >
                              \${event.category}
                            </span>
                          </div>
                          \${
                            event.isRecurring
                              ? html\`
                                <div class="absolute top-2 right-2">
                                  <span
                                    class="px-2 py-0.5 bg-blue-200 border-2 border-black rounded font-bold text-[10px]"
                                  >
                                    Recurring
                                  </span>
                                </div>
                              \`
                              : null
                          }
                        </div>
                        <div class="p-3">
                          <div
                            class="text-xs font-bold text-pink-700 uppercase mb-1"
                          >
                            \${this.formatDate(event.date)}
                            \${event.time ? \`at \${event.time}\` : ""}
                          </div>
                          <uix-link
                            href="/event/\${event.slug}"
                            class="text-sm font-black uppercase leading-tight line-clamp-2"
                            >\${event.name}</uix-link
                          >
                          <div class="text-xs text-gray-500 font-medium mt-1">
                            \${event.venue}
                          </div>
                        </div>
                      </div>
                    \`,
                  )}
                </div>
              </div>
            \`
            : null
        }

        <!-- Recurring Events Section -->
        \${
          recurring.length > 0
            ? html\`
              <div class="space-y-4">
                <h2 class="text-xl font-black uppercase text-black">
                  Weekly Events
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  \${recurring.map(
                    (event) => html\`
                      <div
                        @click=\${() => this.goToEvent(event)}
                        class="bg-white border-3 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer flex gap-4"
                      >
                        <div
                          class="w-20 h-20 bg-gray-200 border-2 border-black rounded-lg flex-shrink-0 bg-cover bg-center"
                          style="background-image: url('\${event.image}')"
                        ></div>
                        <div class="flex-1 min-w-0">
                          <div class="flex items-center gap-2 mb-1">
                            <span
                              class="px-2 py-0.5 \${getCategoryColor(
                                event.category,
                              )} border border-black rounded font-bold text-[9px] uppercase"
                            >
                              \${event.category}
                            </span>
                            <span
                              class="px-2 py-0.5 bg-blue-200 border border-black rounded font-bold text-[9px]"
                            >
                              Weekly
                            </span>
                          </div>
                          <uix-link
                            href="/event/\${event.slug}"
                            class="text-sm font-black uppercase leading-tight line-clamp-1"
                            >\${event.name}</uix-link
                          >
                          <div class="text-xs text-gray-500 font-medium mt-1">
                            \${event.time} - \${event.venue}
                          </div>
                        </div>
                      </div>
                    \`,
                  )}
                </div>
              </div>
            \`
            : null
        }

        <!-- All Upcoming Events -->
        \${
          upcoming.length > 0
            ? html\`
              <div class="space-y-4">
                <h2 class="text-xl font-black uppercase text-black">
                  All Upcoming
                </h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  \${upcoming.map(
                    (event) => html\`
                      <view-meetup-card-compact
                        .content=\${event}
                        type="event"
                        .onClick=\${(e) => this.goToEvent(e)}
                      ></view-meetup-card-compact>
                    \`,
                  )}
                </div>
              </div>
            \`
            : null
        }

        <!-- Empty State -->
        \${
          this.events.length === 0
            ? html\`
              <div
                class="bg-white border-3 border-black rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center"
              >
                <div class="text-5xl mb-4">\u{1F4C5}</div>
                <h3 class="text-xl font-black uppercase mb-2">
                  No Events Yet
                </h3>
                <p class="text-gray-600 font-medium">
                  Check back soon for upcoming events in Rio!
                </p>
              </div>
            \`
            : null
        }
      </div>
    \`;
  },
};
`,mimeType:"text/javascript"},"/views/event-detail-view.js":{content:`import T from "/$app/types/index.js";
import $APP from "/$app.js";
import { html } from "/npm/lit-html";
import { getCategoryColor, isGuest, NBS } from "./utils.js";
import "./detail-hero.js";
import "./detail-info-card.js";

export default {
  dataQuery: true,
  properties: {
    event: T.object({ attribute: false }),
    userId: T.string({ defaultValue: "guest" }),
    currentUser: T.object({
      sync: $APP.Model.users,
      query: (inst) => ({
        id: inst.userId,
        includes: ["likedEvents", "interestedEvents"],
      }),
      dependsOn: ["userId"],
    }),
    showAuthPrompt: T.boolean({ defaultValue: false }),
    authPromptMessage: T.string({ defaultValue: "" }),
    showAuthModal: T.boolean({ defaultValue: false }),
  },
  async connected() {
    this.userId = $APP.Auth.isAuthenticated ? $APP.Auth.currentUserId : "guest";
    // Track view count
    if (this.event?.id) {
      await $APP.Model.events.edit(this.event.id, {
        viewCount: (this.event.viewCount || 0) + 1,
      });
    }
  },
  dataLoaded({ row }) {
    if (row?.name) {
      $APP.Router.setTitle(row.name);
    }
  },
  isInterested() {
    if (!this.currentUser || !this.event) return false;
    return (
      this.currentUser.interestedEvents?.some((e) => e.id === this.event.id) ||
      false
    );
  },
  getRelatedMeetups() {
    if (!this.event) return [];
    return (this.meetups || []).filter((m) => m.event === this.event.id);
  },
  async handleInterestToggle() {
    const e = this.event;
    if (!e || !this.currentUser) return;

    if (this.isInterested()) {
      // Remove from interested
      this.currentUser.interestedEvents =
        this.currentUser.interestedEvents.filter((i) => i.id !== e.id);
    } else {
      // Add to interested
      this.currentUser.interestedEvents = [
        ...this.currentUser.interestedEvents,
        { id: e.id },
      ];
    }
    await $APP.Model.users.edit(this.currentUser);
  },
  // Keeping createMeetup method for potential future admin use
  async createMeetup() {
    if (isGuest()) {
      this.showAuthPrompt = true;
      this.authPromptMessage = "Create an account to host meetups!";
      return;
    }
    const e = this.event;
    const n = {
      id: Number(\`\${Date.now()}00\`),
      name: \`Meetup at \${e.name}\`,
      description: "Join me! I'm looking for a group to go with.",
      category: e.category,
      event: e.id,
      image: e.image,
      date: e.date,
      time: "19:00",
      venue: e.venue,
      attendees: [],
      createdAt: new Date().toISOString(),
      order: 0,
    };
    await $APP.Model.meetups.add(n);
    alert("Meetup Created! Others can now join you.");
  },
  render() {
    const m = this.event;
    if (!m) return NBS.SPINNER;

    const rM = this.getRelatedMeetups();
    const h = $APP.Auth.user;
    const isInterested = this.isInterested();
    const pD =
      m.price && m.price > 0 ? \`\${m.currency || "R$"} \${m.price}\` : "FREE";

    return html\`
      <div class="bg-purple-50 min-h-screen pb-20">
        <view-auth-modal
          .isOpen=\${this.showAuthModal}
          .onClose=\${() => (this.showAuthModal = false)}
          .onSuccess=\${() => location.reload()}
        ></view-auth-modal>
        \${this.showAuthPrompt
          ? html\`
              <div class="fixed bottom-20 left-4 right-4 z-40">
                <view-auth-prompt
                  .message=\${this.authPromptMessage}
                  .onLogin=\${() => {
                    this.showAuthPrompt = false;
                    this.showAuthModal = true;
                  }}
                  .onDismiss=\${() => (this.showAuthPrompt = false)}
                ></view-auth-prompt>
              </div>
            \`
          : null}
        <!-- Hero -->
        <view-detail-hero
          .image=\${m.image}
          .title=\${m.name}
          .category=\${$APP.i18n.t(\`categories.\${m.category}\`)}
          .categoryColor=\${getCategoryColor(m.category)}
          .badges=\${m.isRecurring ? [{ label: "Recurring", colorClass: "bg-blue-200" }] : []}
          .recommended=\${m.recommended}
          .viewCount=\${m.viewCount || 0}
        ></view-detail-hero>

        <!-- Content - Two Column Layout -->
        <div class="px-4 -mt-6 relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Main Content (2/3 width on desktop) -->
            <div class="md:col-span-2 space-y-6">
              <view-detail-info-card
                .location=\${"\u{1F4CD} " + (m.venue || "Rio de Janeiro")}
                .tags=\${m.tags || []}
                .description=\${m.description}
                .beforeDescription=\${() => html\`
                  <div
                    class="grid grid-cols-3 gap-0 border-3 border-black rounded-xl overflow-hidden bg-gray-50"
                  >
                    <div class="p-3 text-center border-r-3 border-black bg-white">
                      <div class="text-xs font-black text-gray-400 uppercase">DATE</div>
                      <div class="text-sm font-black text-black">
                        \${m.date
                          ? new Date(m.date)
                              .toLocaleDateString("en-US", { month: "short", day: "numeric" })
                              .toUpperCase()
                          : "TBA"}
                      </div>
                    </div>
                    <div class="p-3 text-center border-r-3 border-black bg-white">
                      <div class="text-xs font-black text-gray-400 uppercase">TIME</div>
                      <div class="text-sm font-black text-black">\${m.time || "All Day"}</div>
                    </div>
                    <div class="p-3 text-center bg-white">
                      <div class="text-xs font-black text-gray-400 uppercase">PRICE</div>
                      <div class="text-sm font-black \${m.price === 0 ? "text-green-600" : "text-black"}">
                        \${pD}
                      </div>
                    </div>
                  </div>
                \`}
                .afterDescription=\${m.ticketLink
                  ? () => html\`
                      <div class="mt-6 pt-6 border-t-2 border-dashed border-gray-300">
                        <div class="flex items-center justify-between mb-3">
                          <span class="font-black text-sm uppercase">Tickets required</span>
                          <span class="font-bold text-sm bg-green-100 text-green-800 px-2 py-1 rounded border border-green-800">\${pD}</span>
                        </div>
                      </div>
                    \`
                  : null}
                .actions=\${[
                  ...(m.ticketLink
                    ? [
                        {
                          label: "\u{1F39F}\uFE0F Buy Tickets",
                          href: m.ticketLink,
                          target: "_blank",
                          variant: "success",
                        },
                      ]
                    : []),
                  {
                    label: isInterested ? "\u2713 Interested" : "Mark as Interested",
                    onClick: () => this.handleInterestToggle(),
                    variant: isInterested ? "success" : "primary",
                  },
                ]}
              ></view-detail-info-card>

              <!-- Community Meetups Section -->
              \${rM.length > 0
                ? html\`
                    <div>
                      <div class="flex items-center justify-between mb-4">
                        <h3 class="text-xl font-black uppercase">
                          Community Meetups
                        </h3>
                        <span
                          class="bg-black text-white text-xs font-bold px-2 py-1 rounded-md"
                          >\${rM.length}</span
                        >
                      </div>
                      <div class="space-y-4">
                        \${rM.map(
                          (meetup) => html\`
                            <div
                              class="bg-white border-3 border-black rounded-xl p-4 flex gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:bg-gray-50"
                              @click=\${() =>
                                $APP.Router.go("meetup-detail", {
                                  slug: meetup.slug,
                                })}
                            >
                              <div
                                class="w-16 h-16 bg-gray-200 border-2 border-black rounded-lg flex-shrink-0 bg-cover bg-center"
                                style="background-image: url('\${meetup.image}')"
                              ></div>
                              <div class="flex-1 min-w-0">
                                <h4 class="font-black text-sm truncate uppercase">
                                  \${meetup.name}
                                </h4>
                                <div class="text-xs font-bold text-gray-500 mb-2">
                                  \u{1F4C5} \${meetup.date} \u2022 \${meetup.time}
                                </div>
                                <div class="flex items-center gap-2">
                                  <div class="flex -space-x-2">
                                    \${meetup.attendees.map(
                                      () => html\`<div
                                        class="w-6 h-6 rounded-full bg-gray-300 border border-black"
                                      ></div>\`,
                                    )}
                                  </div>
                                  <span class="text-xs font-black text-gray-400"
                                    >\${meetup.attendees.length} going</span
                                  >
                                </div>
                              </div>
                            </div>
                          \`,
                        )}
                      </div>
                    </div>
                  \`
                : null}
            </div>

            <!-- Sidebar (1/3 width on desktop) -->
            <div class="space-y-6">
              <view-detail-sidebar
                type="event"
                .currentItem=\${m}
                .showToc=\${false}
              ></view-detail-sidebar>
            </div>
          </div>

          <div class="h-24"></div>
        </div>
      </div>
    \`;
  },
};
`,mimeType:"text/javascript"},"/views/calendar-view.js":{content:`import T from "/$app/types/index.js";
import { html } from "/npm/lit-html";
import $APP from "/$app.js";
import { CATEGORIES } from "./utils.js";

export default {
  properties: {
    events: T.array({ sync: $APP.Model.events, query: {} }),
    selectedCategory: T.string({ defaultValue: "all" }),
  },
  getFilteredEvents() {
    const events = (this.events || []).map((e) => ({ ...e, title: e.name }));
    return this.selectedCategory === "all"
      ? events
      : events.filter((e) => e.category === this.selectedCategory);
  },
  handleCategoryChange(category) {
    this.selectedCategory = category;
  },
  handleEventClick(e) {
    const event = e.detail.event;
    $APP.Router.go("event-detail", {
      id: event.recurrenceParentId || event.id,
    });
  },
  render() {
    return html\`
      <div class="min-h-screen bg-surface pb-20">
        <div class="bg-white border-b-3 border-black px-6 py-4">
          <div class="flex items-center justify-between mb-4">
            <button
              @click=\${() => $APP.Router.back()}
              class="w-10 h-10 flex items-center justify-center border-2 border-black rounded-lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <h1 class="text-2xl font-black uppercase">Calendar</h1>
            <div class="w-10"></div>
          </div>
          <div class="overflow-x-auto pb-2">
            <div class="flex gap-2 min-w-max">
              \${Object.keys(CATEGORIES)
                .filter((c) => c !== "groups")
                .map(
                  (c) => html\`
                    <button
                      @click=\${() => this.handleCategoryChange(c)}
                      class="px-4 py-1.5 border-2 border-black rounded-lg font-bold text-xs uppercase \${this.selectedCategory === c ? "bg-accent" : "bg-white"}"
                    >
                      \${c}
                    </button>
                  \`,
                )}
            </div>
          </div>
        </div>
        <div class="px-6 py-6">
          <uix-calendar
            .events=\${this.getFilteredEvents()}
            @event-click=\${this.handleEventClick}
          ></uix-calendar>
        </div>
      </div>
    \`;
  },
};
`,mimeType:"text/javascript"},"/$app/uix/display/calendar.js":{content:`import T from "/$app/types/index.js";
import { html } from "/npm/lit-html";

// Utility functions for calendar logic
const generateRecurringInstances = (event, startDate, endDate) => {
  if (!event.isRecurring) return [];
  const instances = [];
  const current = new Date(startDate);
  const end = new Date(endDate);
  const recurrenceEnd = event.recurrenceEndDate
    ? new Date(event.recurrenceEndDate)
    : new Date(current.getTime() + 31536000000); // 1 year default
  const originalDate = new Date(event.date);

  const shouldGenerate = (date, evt, origDate) => {
    switch (evt.recurrencePattern) {
      case "daily":
        return true;
      case "weekly":
        return date.getDay() === origDate.getDay();
      case "monthly":
        return date.getDate() === origDate.getDate();
      case "custom":
        return evt.recurrenceDays?.includes(date.getDay());
      default:
        return false;
    }
  };

  const advance = (date, pattern) => {
    switch (pattern) {
      case "daily":
        date.setDate(date.getDate() + 1);
        break;
      case "weekly":
        date.setDate(date.getDate() + 7);
        break;
      case "monthly":
        date.setMonth(date.getMonth() + 1);
        break;
      case "custom":
        date.setDate(date.getDate() + 1);
        break;
    }
  };

  while (current <= end && current <= recurrenceEnd) {
    if (shouldGenerate(current, event, originalDate)) {
      instances.push({
        ...event,
        id: \`\${event.id}-\${current.toISOString().split("T")[0]}\`,
        date: current.toISOString().split("T")[0],
        recurrenceParentId: event.id,
        isRecurring: false,
      });
    }
    advance(current, event.recurrencePattern);
  }
  return instances;
};

const isSameDay = (d1, d2) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

const isThisWeek = (date) => {
  const today = new Date();
  const weekFromNow = new Date(today.getTime() + 604800000);
  return date >= today && date <= weekFromNow;
};

const getDateSection = (dateStr, locale) => {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (isSameDay(date, today)) return "TODAY";
  if (isSameDay(date, tomorrow)) return "TOMORROW";
  if (isThisWeek(date))
    return date.toLocaleDateString(locale, { weekday: "long" }).toUpperCase();
  return date
    .toLocaleDateString(locale, { month: "short", day: "numeric" })
    .toUpperCase();
};

const groupEventsByDate = (events) =>
  events.reduce(
    (groups, event) => ({
      ...groups,
      [event.date]: [...(groups[event.date] || []), event],
    }),
    {},
  );

const getEventsInRange = (startDate, endDate, events) => {
  const withRecurring = [];

  events.forEach((event) => {
    if (event.isRecurring) {
      withRecurring.push(...generateRecurringInstances(event, startDate, endDate));
    } else {
      const eventDate = new Date(event.date);
      if (eventDate >= startDate && eventDate <= endDate) {
        withRecurring.push(event);
      }
    }
  });
  return withRecurring.sort((a, b) => new Date(a.date) - new Date(b.date));
};

const formatMonthYear = (month, year, locale) =>
  new Date(year, month, 1)
    .toLocaleDateString(locale, { month: "long", year: "numeric" })
    .toUpperCase();

const getDaysInMonth = (year, month, events) => {
  const days = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventsByDate = events.reduce(
    (groups, event) => ({
      ...groups,
      [event.date]: [...(groups[event.date] || []), event],
    }),
    {},
  );

  // Previous month padding
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    const dateStr = date.toISOString().split("T")[0];
    days.push({
      date,
      day: date.getDate(),
      isCurrentMonth: false,
      isToday: false,
      events: eventsByDate[dateStr] || [],
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateStr = date.toISOString().split("T")[0];
    date.setHours(0, 0, 0, 0);
    days.push({
      date,
      day,
      isCurrentMonth: true,
      isToday: date.getTime() === today.getTime(),
      events: eventsByDate[dateStr] || [],
    });
  }

  // Next month padding (fill to 42 days = 6 weeks)
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    const date = new Date(year, month + 1, i);
    const dateStr = date.toISOString().split("T")[0];
    days.push({
      date,
      day: date.getDate(),
      isCurrentMonth: false,
      isToday: false,
      events: eventsByDate[dateStr] || [],
    });
  }

  return days;
};

export default {
  tag: "uix-calendar",
  style: true,
  shadow: true,
  properties: {
    // Data
    events: T.array({ defaultValue: [] }),

    // View state
    viewMode: T.string({ defaultValue: "month", enum: ["list", "month"] }),
    currentMonth: T.number(new Date().getMonth()),
    currentYear: T.number(new Date().getFullYear()),
    selectedDate: T.string(""),
    showDayPanel: T.boolean(false),

    // Config
    showViewToggle: T.boolean(true),
    showNavigation: T.boolean(true),
    showTodayButton: T.boolean(true),
    locale: T.string("en"),
    monthsAhead: T.number(3),
  },

  // Get events for the calendar range (for list view)
  getEventsForCalendar() {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setMonth(endDate.getMonth() + this.monthsAhead);
    return getEventsInRange(today, endDate, this.events || []);
  },

  // Navigation handlers
  handleNav(direction) {
    if (direction === -1) {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    } else {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    }
    this.showDayPanel = false;
    this.emit("month-change", {
      month: this.currentMonth,
      year: this.currentYear,
    });
  },

  handleTodayClick() {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.showDayPanel = false;
  },

  handleViewToggle(mode) {
    this.viewMode = mode;
  },

  handleDayClick(dayObj) {
    const dateStr = dayObj.date.toISOString().split("T")[0];
    const hasEvents = dayObj.events.length > 0;
    if (this.selectedDate === dateStr) {
      this.showDayPanel = !this.showDayPanel && hasEvents;
    } else {
      this.selectedDate = dateStr;
      this.showDayPanel = hasEvents;
    }
    this.emit("day-click", { date: dateStr, events: dayObj.events });
  },

  handleClosePanel() {
    this.showDayPanel = false;
  },

  handleEventClick(event, e) {
    e?.stopPropagation();
    this.emit("event-click", { event });
  },

  getEventsForSelectedDay() {
    if (!this.selectedDate) return [];
    return this.getEventsForCalendar().filter(
      (e) => e.date === this.selectedDate,
    );
  },

  render() {
    const events = this.getEventsForCalendar();
    const groupedEvents = groupEventsByDate(events);

    return html\`
      <style>
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      </style>

      <div class="calendar-container" part="container">
        \${this.showViewToggle ? this.renderViewToggle() : null}
        \${this.viewMode === "list"
          ? this.renderListView(groupedEvents)
          : this.renderGridView(events)}
      </div>
    \`;
  },

  renderViewToggle() {
    return html\`
      <div class="view-toggle" part="view-toggle">
        <button
          @click=\${() => this.handleViewToggle("list")}
          class="toggle-btn \${this.viewMode === "list" ? "active" : ""}"
          part="toggle-btn \${this.viewMode === "list" ? "toggle-btn-active" : ""}"
        >
          List
        </button>
        <button
          @click=\${() => this.handleViewToggle("month")}
          class="toggle-btn \${this.viewMode === "month" ? "active" : ""}"
          part="toggle-btn \${this.viewMode === "month" ? "toggle-btn-active" : ""}"
        >
          Month
        </button>
      </div>
    \`;
  },

  renderListView(groupedEvents) {
    const dateKeys = Object.keys(groupedEvents).sort();

    if (dateKeys.length === 0) {
      return html\`
        <div class="empty-state" part="empty">
          <div class="empty-icon">\u{1F4C5}</div>
          <p class="empty-text">No events scheduled</p>
        </div>
      \`;
    }

    return html\`
      <div class="list-view" part="list">
        \${dateKeys.map((dateKey) => {
          const eventsForDate = groupedEvents[dateKey];
          const section = getDateSection(dateKey, this.locale);
          return html\`
            <div class="list-section" part="list-section">
              <h2 class="list-section-title" part="list-section-title">\${section}</h2>
              <div class="list-items">
                \${eventsForDate.map(
                  (event) => html\`
                    <div
                      @click=\${(e) => this.handleEventClick(event, e)}
                      class="list-item"
                      part="list-item"
                      data-category="\${event.category || ""}"
                    >
                      \${event.image
                        ? html\`<img
                            src="\${event.image}"
                            alt="\${event.title}"
                            class="list-item-image"
                            part="list-item-image"
                          />\`
                        : null}
                      <div class="list-item-content" part="list-item-content">
                        <div class="list-item-header">
                          <h3 class="list-item-title" part="list-item-title">\${event.title}</h3>
                          \${event.recurrenceParentId
                            ? html\`<span class="recurring-badge" part="recurring-badge">\u{1F501}</span>\`
                            : null}
                        </div>
                        <p class="list-item-meta" part="list-item-meta">
                          \${event.time || ""} \${event.venue || event.address ? \`\u2022 \${event.venue || event.address}\` : ""}
                        </p>
                        <slot name="list-item-extra" .event=\${event}></slot>
                      </div>
                    </div>
                  \`,
                )}
              </div>
            </div>
          \`;
        })}
      </div>
    \`;
  },

  renderGridView(events) {
    const days = getDaysInMonth(this.currentYear, this.currentMonth, events);
    const monthYearLabel = formatMonthYear(this.currentMonth, this.currentYear, this.locale);
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return html\`
      <div class="grid-view" part="grid-view">
        \${this.showNavigation ? html\`
          <div class="grid-header" part="header">
            <button
              @click=\${() => this.handleNav(-1)}
              class="nav-btn"
              part="nav-btn nav-btn-prev"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <h2 class="month-label" part="month-label">\${monthYearLabel}</h2>
            <button
              @click=\${() => this.handleNav(1)}
              class="nav-btn"
              part="nav-btn nav-btn-next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        \` : null}

        \${this.showTodayButton ? html\`
          <button
            @click=\${this.handleTodayClick.bind(this)}
            class="today-btn"
            part="today-btn"
          >
            Jump to Today
          </button>
        \` : null}

        <div class="grid-container" part="grid">
          <div class="weekday-header" part="weekday-header">
            \${weekDays.map(
              (day) => html\`<div class="weekday" part="weekday">\${day}</div>\`,
            )}
          </div>
          <div class="days-grid" part="days-grid">
            \${days.map((dayObj) => {
              const isSelected =
                this.selectedDate === dayObj.date.toISOString().split("T")[0];
              const hasEvents = dayObj.events.length > 0;
              return html\`
                <div
                  @click=\${() => this.handleDayClick(dayObj)}
                  class="day-cell \${dayObj.isToday ? "today" : ""} \${isSelected ? "selected" : ""} \${!dayObj.isCurrentMonth ? "other-month" : ""} \${hasEvents ? "has-events" : ""}"
                  part="day \${dayObj.isToday ? "day-today" : ""} \${isSelected ? "day-selected" : ""} \${!dayObj.isCurrentMonth ? "day-other-month" : ""}"
                >
                  <span class="day-number" part="day-number">\${dayObj.day}</span>
                  \${hasEvents
                    ? html\`
                        <div class="day-events" part="day-events">
                          \${dayObj.events.slice(0, 2).map(
                            (event) => html\`
                              <div
                                class="event-indicator"
                                part="event"
                                data-category="\${event.category || ""}"
                              >
                                \${event.title.length > 12
                                  ? event.title.substring(0, 12) + "..."
                                  : event.title}
                              </div>
                            \`,
                          )}
                          \${dayObj.events.length > 2
                            ? html\`<div class="more-events" part="more-events">+\${dayObj.events.length - 2} more</div>\`
                            : null}
                        </div>
                      \`
                    : null}
                </div>
              \`;
            })}
          </div>
        </div>

        \${this.showDayPanel ? this.renderDayDetailPanel() : null}
      </div>
    \`;
  },

  renderDayDetailPanel() {
    const selectedEvents = this.getEventsForSelectedDay();
    const selectedDateObj = new Date(this.selectedDate);
    const dateLabel = selectedDateObj
      .toLocaleDateString(this.locale, {
        weekday: "long",
        month: "short",
        day: "numeric",
      })
      .toUpperCase();

    return html\`
      <div
        @click=\${this.handleClosePanel.bind(this)}
        class="panel-overlay"
        part="panel-overlay"
        style="animation: fadeIn 0.2s ease-out;"
      ></div>
      <div class="day-panel" part="panel" style="animation: slideUp 0.3s ease-out;">
        <div class="panel-header" part="panel-header">
          <h3 class="panel-title" part="panel-title">\${dateLabel}</h3>
          <button
            @click=\${this.handleClosePanel.bind(this)}
            class="panel-close"
            part="panel-close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="panel-content" part="panel-content">
          \${selectedEvents.length === 0
            ? html\`<p class="panel-empty" part="panel-empty">No events on this day</p>\`
            : selectedEvents.map(
                (event) => html\`
                  <div
                    @click=\${(e) => this.handleEventClick(event, e)}
                    class="panel-item"
                    part="panel-item"
                    data-category="\${event.category || ""}"
                  >
                    \${event.image
                      ? html\`<img
                          src="\${event.image}"
                          alt="\${event.title}"
                          class="panel-item-image"
                          part="panel-item-image"
                        />\`
                      : null}
                    <div class="panel-item-content" part="panel-item-content">
                      <div class="panel-item-header">
                        <h4 class="panel-item-title" part="panel-item-title">\${event.title}</h4>
                        \${event.recurrenceParentId
                          ? html\`<span class="recurring-badge" part="recurring-badge">\u{1F501}</span>\`
                          : null}
                      </div>
                      <p class="panel-item-meta" part="panel-item-meta">
                        \${event.time || ""} \${event.venue || event.address ? \`\u2022 \${event.venue || event.address}\` : ""}
                      </p>
                    </div>
                  </div>
                \`,
              )}
        </div>
      </div>
    \`;
  },
};

/**
 * Calendar Component
 *
 * @component
 * @category display
 * @tag uix-calendar
 *
 * A full-featured calendar component with list and month grid views,
 * recurring event support, and day detail panels.
 *
 * @slot - Default slot for additional content
 *
 * @part container - Main calendar container
 * @part view-toggle - View mode toggle container
 * @part toggle-btn - Toggle button
 * @part toggle-btn-active - Active toggle button
 * @part header - Grid view header with navigation
 * @part nav-btn - Navigation buttons
 * @part month-label - Current month/year label
 * @part today-btn - Jump to today button
 * @part grid - Calendar grid container
 * @part weekday-header - Weekday names row
 * @part weekday - Individual weekday name
 * @part days-grid - Grid of day cells
 * @part day - Individual day cell
 * @part day-today - Today's day cell
 * @part day-selected - Selected day cell
 * @part day-other-month - Day cell from adjacent month
 * @part day-number - Day number text
 * @part day-events - Container for event indicators
 * @part event - Event indicator in grid
 * @part more-events - "+N more" indicator
 * @part list - List view container
 * @part list-section - Date section in list view
 * @part list-section-title - Section title (TODAY, TOMORROW, etc.)
 * @part list-item - Event item in list view
 * @part list-item-image - Event image in list
 * @part list-item-content - Event content container
 * @part list-item-title - Event title
 * @part list-item-meta - Event time/venue info
 * @part recurring-badge - Recurring event indicator
 * @part panel - Day detail panel
 * @part panel-overlay - Panel backdrop overlay
 * @part panel-header - Panel header
 * @part panel-title - Panel date title
 * @part panel-close - Panel close button
 * @part panel-content - Panel event list
 * @part panel-item - Event item in panel
 * @part panel-empty - Empty panel message
 * @part empty - Empty state container
 *
 * @fires day-click - When a day is clicked. Detail: { date: string, events: array }
 * @fires event-click - When an event is clicked. Detail: { event: object }
 * @fires month-change - When month changes. Detail: { month: number, year: number }
 *
 * @example Basic Calendar
 * \`\`\`html
 * <uix-calendar
 *   .events=\${[
 *     { id: "1", date: "2024-01-15", title: "Meeting" },
 *     { id: "2", date: "2024-01-20", title: "Conference", isRecurring: true, recurrencePattern: "weekly" }
 *   ]}
 * ></uix-calendar>
 * \`\`\`
 *
 * @example List View Only
 * \`\`\`html
 * <uix-calendar
 *   viewMode="list"
 *   .showViewToggle=\${false}
 *   .events=\${events}
 * ></uix-calendar>
 * \`\`\`
 */
`,mimeType:"text/javascript"},"/$app/uix/display/calendar.css":{content:`:where(.uix-calendar,uix-calendar){display:block;--calendar-border-width: 2px;--calendar-border-color: black;--calendar-border-radius: .75rem;--calendar-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);--calendar-shadow-sm: 2px 2px 0px 0px rgba(0, 0, 0, 1);--calendar-today-bg: #fef3c7;--calendar-today-border: #eab308;--calendar-selected-bg: var(--color-accent, #f472b6);--calendar-font-family: inherit;&::part(view-toggle){display:flex;gap:.5rem;margin-bottom:1rem}&::part(toggle-btn){flex:1;padding:.5rem 1rem;font-weight:900;font-size:.875rem;text-transform:uppercase;border:3px solid var(--calendar-border-color);border-radius:var(--calendar-border-radius);background:#fff;box-shadow:3px 3px #000;cursor:pointer;transition:all .15s ease;&:active{transform:translate(2px,2px);box-shadow:1px 1px #000}}&::part(toggle-btn-active){background:var(--calendar-selected-bg)}&::part(header){display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem}&::part(nav-btn){width:2.5rem;height:2.5rem;display:flex;align-items:center;justify-content:center;background:#fff;border:3px solid var(--calendar-border-color);border-radius:.5rem;box-shadow:var(--calendar-shadow);cursor:pointer;transition:all .15s ease;&:active{transform:translate(2px,2px);box-shadow:var(--calendar-shadow-sm)}}&::part(month-label){font-size:1.125rem;font-weight:900;text-transform:uppercase}&::part(today-btn){width:100%;margin-bottom:1rem;padding:.5rem 1rem;background:#f9a8d4;border:3px solid var(--calendar-border-color);border-radius:var(--calendar-border-radius);font-weight:900;font-size:.875rem;text-transform:uppercase;box-shadow:var(--calendar-shadow);cursor:pointer;transition:all .15s ease;&:active{transform:translate(2px,2px);box-shadow:var(--calendar-shadow-sm)}}&::part(grid){background:#fff;border:3px solid var(--calendar-border-color);border-radius:var(--calendar-border-radius);padding:.75rem;box-shadow:6px 6px #000}&::part(weekday-header){display:grid;grid-template-columns:repeat(7,1fr);gap:.25rem;margin-bottom:.5rem}&::part(weekday){text-align:center;font-weight:900;font-size:.75rem;color:#4b5563}&::part(days-grid){display:grid;grid-template-columns:repeat(7,1fr);gap:.25rem}&::part(day){aspect-ratio:1;position:relative;display:flex;flex-direction:column;align-items:flex-start;padding:.25rem;border-radius:.5rem;border:2px solid #d1d5db;cursor:pointer;overflow:hidden;transition:all .15s ease;&:active{transform:translate(1px,1px)}}&::part(day-today){background:var(--calendar-today-bg);border-color:var(--calendar-today-border);border-width:3px}&::part(day-selected){background:var(--calendar-selected-bg);border-color:var(--calendar-border-color);border-width:3px;box-shadow:var(--calendar-shadow-sm)}&::part(day-other-month){opacity:.4}&::part(day-number){font-size:.75rem;font-weight:700;margin-bottom:.125rem}&::part(day-events){width:100%;display:flex;flex-direction:column;gap:.125rem}&::part(event){font-size:9px;line-height:1.1;font-weight:700;padding:.125rem .25rem;border-radius:.25rem;border:1px solid var(--calendar-border-color);background:#e0e7ff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}&::part(more-events){font-size:8px;font-weight:700;color:#4b5563;padding:0 .25rem}&::part(list){display:flex;flex-direction:column;gap:1.5rem}&::part(list-section-title){font-size:.875rem;font-weight:900;text-transform:uppercase;color:#4b5563;margin-bottom:.75rem}&::part(list-item){display:flex;gap:1rem;background:#fff;border:3px solid var(--calendar-border-color);border-radius:var(--calendar-border-radius);padding:1rem;box-shadow:var(--calendar-shadow);cursor:pointer;transition:all .15s ease;&:hover{transform:translate(2px,2px);box-shadow:var(--calendar-shadow-sm)}}&::part(list-item-image){width:5rem;height:5rem;object-fit:cover;border-radius:.5rem;border:2px solid var(--calendar-border-color)}&::part(list-item-title){font-weight:900;font-size:.875rem;line-height:1.25}&::part(list-item-meta){font-size:.75rem;color:#4b5563;margin-top:.25rem}&::part(recurring-badge){flex-shrink:0;font-size:.75rem;font-weight:700;background:#ddd6fe;border:1px solid var(--calendar-border-color);padding:.125rem .5rem;border-radius:.25rem}&::part(panel-overlay){position:fixed;inset:0;background:#00000080;z-index:40}&::part(panel){position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:3px solid var(--calendar-border-color);border-radius:1rem 1rem 0 0;z-index:50;max-height:70vh;overflow-y:auto}&::part(panel-header){position:sticky;top:0;background:#fff;border-bottom:2px solid var(--calendar-border-color);padding:1rem 1.5rem;display:flex;align-items:center;justify-content:space-between}&::part(panel-title){font-weight:900;font-size:1.125rem}&::part(panel-close){width:2rem;height:2rem;display:flex;align-items:center;justify-content:center;border:2px solid var(--calendar-border-color);border-radius:.5rem;background:#fff;cursor:pointer;&:hover{background:#f3f4f6}}&::part(panel-content){padding:1rem 1.5rem;display:flex;flex-direction:column;gap:.75rem}&::part(panel-item){display:flex;gap:.75rem;background:#f9fafb;border:2px solid var(--calendar-border-color);border-radius:var(--calendar-border-radius);padding:.75rem;cursor:pointer;box-shadow:3px 3px #000;transition:all .15s ease;&:hover{transform:translate(2px,2px);box-shadow:none}}&::part(panel-item-image){width:4rem;height:4rem;object-fit:cover;border-radius:.5rem;border:2px solid var(--calendar-border-color)}&::part(panel-item-title){font-weight:700;font-size:.875rem;line-height:1.25}&::part(panel-item-meta){font-size:.75rem;color:#4b5563;margin-top:.25rem}&::part(panel-empty){text-align:center;font-size:.875rem;font-weight:700;color:#9ca3af;padding:2rem 0}&::part(empty){display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5rem 0;.empty-icon{font-size:3.75rem;margin-bottom:1rem}.empty-text{font-size:1.125rem;font-weight:700;color:#9ca3af}}}
`,mimeType:"text/css"},"/$app/uix/layout/card.js":{content:`import T from "/$app/types/index.js";
import { html } from "/npm/lit-html";

export default {
  extends: "uix-container",
  i18n: {},
  style: true,
  shadow: true,
  properties: {
    borderWidth: T.string({
      defaultValue: "1",
      enum: ["none", "1", "2", "3"],
    }),
    borderStyle: T.string({
      defaultValue: "solid",
      enum: ["solid", "dashed", "dotted"],
    }),
    shadow: T.string({
      defaultValue: "none",
      enum: ["none", "sm", "md", "lg"],
    }),
    hover: T.boolean({
      defaultValue: false,
    }),
    gap: T.string({
      defaultValue: "md",
      enum: ["none", "xs", "sm", "md", "lg", "xl"],
    }),
  },
  render() {
    return html\`
      <slot name="header" part="header"></slot>
      <slot part="body"><slot></slot></slot>
      
      <slot part="footer" name="footer"></slot>
    \`;
  },
};

/**
 * Copyright (c) Alan Carlos Meira Leal
 *
 * Card Component
 *
 * @component
 * @category layout
 * @tag uix-card
 *
 * A versatile container component for displaying grouped content with optional
 * header and footer sections. Supports different variants and padding options.
 *
 * @slot header - Optional header content
 * @slot - Default slot for card body content
 * @slot footer - Optional footer content
 * @part header - The card header container
 * @part body - The card body container
 * @part footer - The card footer container
 *
 * @example Basic Card
 * \`\`\`html
 * <uix-card>
 *   <h3 slot="header">Card Title</h3>
 *   <p>Card content goes here...</p>
 * </uix-card>
 * \`\`\`
 *
 * @example Card with Footer
 * \`\`\`html
 * <uix-card>
 *   <header slot="header"><h3 class="flex">User Profile</h3></header>
 *   <article>
 *     <p>John Doe</p>
 *     <p>Software Engineer</p>
 *   </article>
 *   <footer slot="footer">
 *     <uix-button primary>Edit</uix-button>
 *     <uix-button>Cancel</uix-button>
 *   </footer>
 * </uix-card>
 * \`\`\`
 *
 * @example Card Variants
 * \`\`\`html
 * <div class="flex flex-row gap-2">
 *  <uix-card variant="default">Default Card</uix-card>
 *  <uix-card variant="elevated">Elevated Card</uix-card>
 * </div>
 * \`\`\`
 *
 * @example Card Padding Options
 * \`\`\`html
 * <div class="flex flex-row gap-2">
 *  <uix-card padding="none">No Padding</uix-card>
 *  <uix-card padding="sm">Small Padding</uix-card>
 *  <uix-card padding="md">Medium Padding</uix-card>
 *  <uix-card padding="lg">Large Padding</uix-card>
 * </div>
 * \`\`\`
 */
`,mimeType:"text/javascript"},"/$app/uix/layout/container.js":{content:`/**
 * UIX Container Component
 * Generic container component with padding, overflow, and variant support
 */

import T from "/$app/types/index.js";

export default {
  style: true,
  properties: {
    padding: T.string({
      defaultValue: "md",
      enum: ["none", "sm", "md", "lg"],
    }),
    overflow: T.string({
      enum: ["visible", "hidden", "auto", "scroll"],
    }),
    variant: T.string({
      defaultValue: "default",
      enum: ["default", "filled", "outlined", "elevated"],
    }),
  },
};
`,mimeType:"text/javascript"},"/$app/uix/layout/container.css":{content:`:where(.uix-container,uix-container){display:block;box-sizing:border-box;background:var(--container-background, var(--color-surface-lighter));border:1px solid var(--container-border-color, var(--color-surface-dark));border-radius:var(--container-border-radius, var(--radius-md, .375rem));overflow:var(--container-overflow, visible);&[padding=none]{padding:0}&[padding=sm]{padding:var(--spacing-sm, .5rem)}&[padding=md]{padding:var(--spacing-md, .75rem) var(--spacing-lg, 1rem)}&[padding=lg]{padding:var(--spacing-lg, 1rem) var(--spacing-xl, 1.5rem)}&[overflow=visible]{--container-overflow: visible}&[overflow=hidden]{--container-overflow: hidden}&[overflow=auto]{--container-overflow: auto}&[overflow=scroll]{--container-overflow: scroll}&[variant=default]{--container-background: inherit;--container-border-color: var(--color-surface-dark)}&[variant=filled]{--container-background: var(--color-surface-light);--container-border-color: var(--color-surface)}&[variant=outlined]{--container-background: transparent;--container-border-color: var(--color-surface)}&[variant=elevated]{--container-background: var(--color-surface-lighter);--container-border-color: var(--color-surface-dark);box-shadow:0 1px 3px #0000001f,0 1px 2px #0000003d;&:hover{box-shadow:0 3px 6px #00000029,0 3px 6px #0000003b;transition:box-shadow .3s ease}}}
`,mimeType:"text/css"},"/$app/uix/layout/card.css":{content:`:where(.uix-card,uix-card){display:flex;flex-direction:column;overflow:hidden;background:var(--card-background, inherit);&::part(body){display:flex;flex-direction:column;flex:1}>[slot=header]{margin:0;display:flex;padding:var( --card-header-padding, var(--spacing-md, .75rem) var(--spacing-lg, 1rem) );border-bottom-width:var(--card-header-border-width, 0);border-bottom-style:solid;border-bottom-color:var( --card-header-border-color, var(--card-border-primary, #504945) );background:var(--card-header-background-color, transparent)}>[slot=footer]{display:flex;padding:var( --card-footer-padding, var(--spacing-md, .75rem) var(--spacing-lg, 1rem) );border-top-width:var(--card-footer-border-width, 0);border-top-style:var(--card-footer-border-style, solid);border-top-color:var( --card-footer-border-color, var(--color-surface, #504945) );background:var(--card-footer-background-color, transparent);flex-direction:row;gap:var(--spacing-sm, .5rem);align-items:center;justify-content:flex-end}&[style*=--card-gradient-from]::part(body){background:linear-gradient(135deg,var(--card-gradient-from),var(--card-gradient-to, var(--card-gradient-from)))}&[padding=none]::part(body){padding:0}&[padding=sm]::part(body){padding:var(--spacing-sm, .5rem)}&[padding=md]::part(body){padding:var(--spacing-md, .75rem) var(--spacing-lg, 1rem)}&[padding=lg]::part(body){padding:var(--spacing-lg, 1rem) var(--spacing-xl, 1.5rem)}&[borderWidth=none]{border-width:0}&[borderWidth="1"]{border-width:1px}&[borderWidth="2"]{border-width:2px}&[borderWidth="3"]{border-width:3px}&[borderStyle=solid]{border-style:solid}&[borderStyle=dashed]{border-style:dashed}&[borderStyle=dotted]{border-style:dotted}&[gap=none]::part(body){gap:0}&[gap=xs]::part(body){gap:var(--spacing-xs, .25rem)}&[gap=sm]::part(body){gap:var(--spacing-sm, .5rem)}&[gap=md]::part(body){gap:var(--spacing-md, .75rem)}&[gap=lg]::part(body){gap:var(--spacing-lg, 1rem)}&[gap=xl]::part(body){gap:var(--spacing-xl, 1.5rem)}&[shadow=sm]{box-shadow:var(--shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, .05))}&[shadow=md]{box-shadow:var( --shadow-md, 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06) )}&[shadow=lg]{box-shadow:var( --shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05) )}&[hover]{transition:all .2s ease;cursor:pointer;&:hover{border-color:var(--card-border-hover, #83a598)}&[shadow=sm]:hover{box-shadow:var( --shadow-md, 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06) )}&[shadow=md]:hover{box-shadow:var( --shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05) )}&[shadow=lg]:hover{box-shadow:var( --shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, .1), 0 10px 10px -5px rgba(0, 0, 0, .04) )}}}
`,mimeType:"text/css"},"/views/place-detail-view.js":{content:`import T from "/$app/types/index.js";
import $APP from "/$app.js";
import { html } from "/npm/lit-html";
import { getCategoryColor, isGuest, NBS } from "./utils.js";
import "./detail-hero.js";
import "./detail-info-card.js";
import "./detail-sidebar.js";

export default {
  dataQuery: true,
  properties: {
    place: T.object(),
    userId: T.string({ defaultValue: "guest" }),
    currentUser: T.object({
      sync: $APP.Model.users,
      query: (inst) => ({
        id: inst.userId,
        includes: ["likedPlaces"],
      }),
      dependsOn: ["userId"],
    }),
    showAuthPrompt: T.boolean({ defaultValue: false }),
    authPromptMessage: T.string({ defaultValue: "" }),
    showAuthModal: T.boolean({ defaultValue: false }),
  },
  async connected() {
    this.userId = $APP.Auth.isAuthenticated ? $APP.Auth.currentUserId : "guest";
    // Track view count
    if (this.place?.id) {
      await $APP.Model.places.edit(this.place.id, {
        viewCount: (this.place.viewCount || 0) + 1,
      });
    }
  },
  dataLoaded({ row }) {
    if (row?.name) {
      $APP.Router.setTitle(row.name);
    }
  },
  isLiked() {
    if (!this.currentUser || !this.place) return false;
    return this.currentUser.likedPlaces.some(
      (place) => place === this.place.id || place.id === this.place.id,
    );
  },
  getRelatedMeetups() {
    if (!this.place) return [];
    return (this.meetups || []).filter((m) => m.place === this.place.id);
  },
  async handleLikeToggle() {
    const p = this.place;
    if (!p || !this.currentUser) return;
    if (this.isLiked()) {
      this.currentUser.likedPlaces = this.currentUser.likedPlaces.filter(
        (id) => id !== p.id && id.id !== p.id,
      );
    } else {
      this.currentUser.likedPlaces.push(p.id);
    }
    await $APP.Model.users.edit(this.currentUser);
  },
  async createMeetup() {
    if (isGuest()) {
      this.showAuthPrompt = true;
      this.authPromptMessage = "Create an account to host meetups!";
      return;
    }
    const p = this.place;
    const n = {
      id: Number(\`\${Date.now()}00\`),
      name: \`Meetup at \${p.name}\`,
      description: "Join me! I'm looking for a group to go with.",
      category: p.category,
      place: p.id,
      image: p.image,
      date: new Date().toISOString().split("T")[0],
      time: "19:00",
      venue: p.address,
      attendees: [],
      createdAt: new Date().toISOString(),
      order: 0,
    };
    await $APP.Model.meetups.add(n);
    alert("Meetup Created! Others can now join you.");
  },
  render() {
    const m = this.place;
    if (!m) return NBS.SPINNER;

    const rM = this.getRelatedMeetups();
    const isLiked = this.isLiked();
    return html\`
      <div class="bg-purple-50 min-h-screen pb-20">
        <view-auth-modal
          .isOpen=\${this.showAuthModal}
          .onClose=\${() => (this.showAuthModal = false)}
          .onSuccess=\${() => location.reload()}
        ></view-auth-modal>
        \${
          this.showAuthPrompt
            ? html\`
          <div class="fixed bottom-20 left-4 right-4 z-40">
            <view-auth-prompt
              .message=\${this.authPromptMessage}
              .onLogin=\${() => {
                this.showAuthPrompt = false;
                this.showAuthModal = true;
              }}
              .onDismiss=\${() => (this.showAuthPrompt = false)}
            ></view-auth-prompt>
          </div>
        \`
            : null
        }
        <!-- Hero -->
        <view-detail-hero
          .image=\${m.image}
          .title=\${m.name}
          .category=\${$APP.i18n.t(\`categories.\${m.category}\`)}
          .categoryColor=\${getCategoryColor(m.category)}
          .recommended=\${m.recommended}
          .viewCount=\${m.viewCount || 0}
        ></view-detail-hero>

        <!-- 2-Column Grid -->
        <div class="px-4 -mt-6 relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Main Content (2/3) -->
            <div class="md:col-span-2 space-y-6">
              <view-detail-info-card
                .location=\${"\u{1F4CD} " + (m.address || "Rio de Janeiro")}
                .tags=\${m.tags || []}
                .description=\${m.description}
                .actions=\${[
                  ...(m.whatsappLink
                    ? [
                        {
                          label: "\u{1F4AC} WhatsApp",
                          href: m.whatsappLink,
                          target: "_blank",
                          variant: "success",
                        },
                      ]
                    : []),
                  {
                    label: isLiked ? "\u2764\uFE0F Saved" : "\u{1F90D} Save Place",
                    onClick: () => this.handleLikeToggle(),
                    variant: isLiked ? "danger" : "primary",
                  },
                ]}
              ></view-detail-info-card>
              <div class="mt-2">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-xl font-black uppercase">Community Meetups</h3>
                  <span class="bg-black text-white text-xs font-bold px-2 py-1 rounded-md">\${rM.length}</span>
                </div>
                <div class="space-y-4">
                  \${
                    rM.length > 0
                      ? rM.map(
                          (meetup) => html\`
                      <div class="bg-white border-3 border-black rounded-xl p-4 flex gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:bg-gray-50" @click=\${() => $APP.Router.go("meetup-detail", { slug: meetup.slug })}>
                        <div class="w-16 h-16 bg-gray-200 border-2 border-black rounded-lg flex-shrink-0 bg-cover bg-center" style="background-image: url('\${meetup.image}')"></div>
                        <div class="flex-1 min-w-0">
                          <h4 class="font-black text-sm truncate uppercase">\${meetup.name}</h4>
                          <div class="text-xs font-bold text-gray-500 mb-2">\u{1F4C5} \${meetup.date} \u2022 \${meetup.time}</div>
                          <div class="flex items-center gap-2">
                            <div class="flex -space-x-2">
                              \${meetup.attendees.map(() => html\`<div class="w-6 h-6 rounded-full bg-gray-300 border border-black"></div>\`)}
                            </div>
                            <span class="text-xs font-black text-gray-400">\${meetup.attendees.length} going</span>
                          </div>
                        </div>
                      </div>
                    \`,
                        )
                      : html\`
                      <div class="bg-yellow-50 border-3 border-black border-dashed rounded-xl p-6 text-center">
                        <div class="text-4xl mb-2">\u{1F997}</div>
                        <p class="font-bold text-sm text-gray-600 mb-3">No community meetups yet.</p>
                        <p class="text-xs text-gray-500">Be the first to create a meetup at this place!</p>
                      </div>
                    \`
                  }
                  <button @click=\${() => this.createMeetup()} class="w-full py-4 bg-white border-3 border-black rounded-xl font-black uppercase flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <span class="text-xl">+</span> Create a Meetup
                  </button>
                </div>
              </div>
            </div>

            <!-- Sidebar (1/3) -->
            <div class="space-y-4 self-start">
              <view-detail-sidebar
                type="place"
                .currentItem=\${m}
                .showToc=\${false}
                .showQuickInfo=\${true}
                .showMap=\${true}
              ></view-detail-sidebar>
            </div>
          </div>
          <div class="h-24"></div>
        </div>
      </div>
    \`;
  },
};
`,mimeType:"text/javascript"},"/lit-html":{content:`export*from"/lit-html@3.3.1/es2022/lit-html.mjs";
`,mimeType:"application/javascript"},"/lit-html@3.3.1/es2022/lit-html.mjs":{content:`var M=globalThis,b=M.trustedTypes,P=b?b.createPolicy("lit-html",{createHTML:e=>e}):void 0,w="$lit$",d=\`lit$\${Math.random().toFixed(9).slice(2)}$\`,S="?"+d,X=\`<\${S}>\`,c=document,f=()=>c.createComment(""),y=e=>e===null||typeof e!="object"&&typeof e!="function",I=Array.isArray,R=e=>I(e)||typeof e?.[Symbol.iterator]=="function",E=\`[ 	
\\f\\r]\`,H=/<(?:(!--|\\/[^a-zA-Z])|(\\/?[a-zA-Z][^>\\s]*)|(\\/?$))/g,L=/-->/g,O=/>/g,u=RegExp(\`>|\${E}(?:([^\\\\s"'>=/]+)(\${E}*=\${E}*(?:[^ 	
\\f\\r"'\\\`<>=]|("|')|))|$)\`,"g"),W=/'/g,j=/"/g,D=/^(?:script|style|textarea|title)$/i,B=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),Y=B(1),tt=B(2),et=B(3),m=Symbol.for("lit-noChange"),a=Symbol.for("lit-nothing"),V=new WeakMap,g=c.createTreeWalker(c,129);function k(e,t){if(!I(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return P!==void 0?P.createHTML(t):t}var z=(e,t)=>{let i=e.length-1,n=[],s,r=t===2?"<svg>":t===3?"<math>":"",h=H;for(let l=0;l<i;l++){let o=e[l],N,A,$=-1,_=0;for(;_<o.length&&(h.lastIndex=_,A=h.exec(o),A!==null);)_=h.lastIndex,h===H?A[1]==="!--"?h=L:A[1]!==void 0?h=O:A[2]!==void 0?(D.test(A[2])&&(s=RegExp("</"+A[2],"g")),h=u):A[3]!==void 0&&(h=u):h===u?A[0]===">"?(h=s??H,$=-1):A[1]===void 0?$=-2:($=h.lastIndex-A[2].length,N=A[1],h=A[3]===void 0?u:A[3]==='"'?j:W):h===j||h===W?h=u:h===L||h===O?h=H:(h=u,s=void 0);let p=h===u&&e[l+1].startsWith("/>")?" ":"";r+=h===H?o+X:$>=0?(n.push(N),o.slice(0,$)+w+o.slice($)+d+p):o+d+($===-2?l:p)}return[k(e,r+(e[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},U=class K{constructor({strings:t,_$litType$:i},n){let s;this.parts=[];let r=0,h=0,l=t.length-1,o=this.parts,[N,A]=z(t,i);if(this.el=K.createElement(N,n),g.currentNode=this.el.content,i===2||i===3){let $=this.el.content.firstChild;$.replaceWith(...$.childNodes)}for(;(s=g.nextNode())!==null&&o.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let $ of s.getAttributeNames())if($.endsWith(w)){let _=A[h++],p=s.getAttribute($).split(d),T=/([.?@])?(.*)/.exec(_);o.push({type:1,index:r,name:T[2],strings:p,ctor:T[1]==="."?Z:T[1]==="?"?q:T[1]==="@"?G:x}),s.removeAttribute($)}else $.startsWith(d)&&(o.push({type:6,index:r}),s.removeAttribute($));if(D.test(s.tagName)){let $=s.textContent.split(d),_=$.length-1;if(_>0){s.textContent=b?b.emptyScript:"";for(let p=0;p<_;p++)s.append($[p],f()),g.nextNode(),o.push({type:2,index:++r});s.append($[_],f())}}}else if(s.nodeType===8)if(s.data===S)o.push({type:2,index:r});else{let $=-1;for(;($=s.data.indexOf(d,$+1))!==-1;)o.push({type:7,index:r}),$+=d.length-1}r++}}static createElement(t,i){let n=c.createElement("template");return n.innerHTML=t,n}};function v(e,t,i=e,n){if(t===m)return t;let s=n!==void 0?i._$Co?.[n]:i._$Cl,r=y(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(e),s._$AT(e,i,n)),n!==void 0?(i._$Co??=[])[n]=s:i._$Cl=s),s!==void 0&&(t=v(e,s._$AS(e,t.values),s,n)),t}var F=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??c).importNode(t,!0);g.currentNode=n;let s=g.nextNode(),r=0,h=0,l=i[0];for(;l!==void 0;){if(r===l.index){let o;l.type===2?o=new C(s,s.nextSibling,this,e):l.type===1?o=new l.ctor(s,l.name,l.strings,this,e):l.type===6&&(o=new J(s,this,e)),this._$AV.push(o),l=i[++h]}r!==l?.index&&(s=g.nextNode(),r++)}return g.currentNode=c,n}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},C=class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,n,s){this.type=2,this._$AH=a,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,i=this._$AM;return i!==void 0&&t?.nodeType===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=v(this,t,i),y(t)?t===a||t==null||t===""?(this._$AH!==a&&this._$AR(),this._$AH=a):t!==this._$AH&&t!==m&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):R(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==a&&y(this._$AH)?this._$AA.nextSibling.data=t:this.T(c.createTextNode(t)),this._$AH=t}$(t){let{values:i,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=U.createElement(k(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(i);else{let r=new F(s,this),h=r.u(this.options);r.p(i),this.T(h),this._$AH=r}}_$AC(t){let i=V.get(t.strings);return i===void 0&&V.set(t.strings,i=new U(t)),i}k(t){I(this._$AH)||(this._$AH=[],this._$AR());let i=this._$AH,n,s=0;for(let r of t)s===i.length?i.push(n=new Q(this.O(f()),this.O(f()),this,this.options)):n=i[s],n._$AI(r),s++;s<i.length&&(this._$AR(n&&n._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},x=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,s){this.type=1,this._$AH=a,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=a}_$AI(e,t=this,i,n){let s=this.strings,r=!1;if(s===void 0)e=v(this,e,t,0),r=!y(e)||e!==this._$AH&&e!==m,r&&(this._$AH=e);else{let h=e,l,o;for(e=s[0],l=0;l<s.length-1;l++)o=v(this,h[i+l],t,l),o===m&&(o=this._$AH[l]),r||=!y(o)||o!==this._$AH[l],o===a?e=a:e!==a&&(e+=(o??"")+s[l+1]),this._$AH[l]=o}r&&!n&&this.j(e)}j(e){e===a?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Z=class extends x{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===a?void 0:e}},q=class extends x{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==a)}},G=class extends x{constructor(e,t,i,n,s){super(e,t,i,n,s),this.type=5}_$AI(e,t=this){if((e=v(this,e,t,0)??a)===m)return;let i=this._$AH,n=e===a&&i!==a||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==a&&(i===a||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},J=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){v(this,e)}},it={M:w,P:d,A:S,C:1,L:z,R:F,D:R,V:v,I:C,H:x,N:q,U:G,B:Z,F:J},st=M.litHtmlPolyfillSupport;st?.(U,C),(M.litHtmlVersions??=[]).push("3.3.1");var nt=(e,t,i)=>{let n=i?.renderBefore??t,s=n._$litPart$;if(s===void 0){let r=i?.renderBefore??null;n._$litPart$=s=new C(t.insertBefore(f(),r),r,void 0,i??{})}return s._$AI(e),s};export{it as _$LH,Y as html,et as mathml,m as noChange,a as nothing,nt as render,tt as svg};/*! Bundled license information:

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
`,mimeType:"application/javascript"},"/lit-html/static.js":{content:`import"/lit-html@3.3.1/es2022/lit-html.mjs";export*from"/lit-html@3.3.1/es2022/static.mjs";
`,mimeType:"application/javascript"},"/lit-html/directives/keyed.js":{content:`import"/lit-html@3.3.1/es2022/directive-helpers.mjs";import"/lit-html@3.3.1/es2022/directive.mjs";import"/lit-html@3.3.1/es2022/lit-html.mjs";export*from"/lit-html@3.3.1/es2022/directives/keyed.mjs";
`,mimeType:"application/javascript"},"/lit-html@3.3.1/es2022/directive-helpers.mjs":{content:`import{_$LH as n}from"./lit-html.mjs";var{I:m}=n,v=e=>e===null||typeof e!="object"&&typeof e!="function",p={HTML:1,SVG:2,MATHML:3},d=(e,t)=>t===void 0?e?._$litType$!==void 0:e?._$litType$===t,u=e=>e?._$litType$?.h!=null,f=e=>e?._$litDirective$!==void 0,c=e=>e?._$litDirective$,T=e=>e.strings===void 0,_=()=>document.createComment(""),P=(e,t,i)=>{let a=e._$AA.parentNode,l=t===void 0?e._$AB:t._$AA;if(i===void 0){let r=a.insertBefore(_(),l),$=a.insertBefore(_(),l);i=new m(r,$,e,e.options)}else{let r=i._$AB.nextSibling,$=i._$AM,o=$!==e;if(o){let s;i._$AQ?.(e),i._$AM=e,i._$AP!==void 0&&(s=e._$AU)!==$._$AU&&i._$AP(s)}if(r!==l||o){let s=i._$AA;for(;s!==r;){let A=s.nextSibling;a.insertBefore(s,l),s=A}}}return i},g=(e,t,i=e)=>(e._$AI(t,i),e),y={},C=(e,t=y)=>e._$AH=t,R=e=>e._$AH,B=e=>{e._$AR(),e._$AA.remove()},H=e=>{e._$AR()};export{p as TemplateResultType,H as clearPart,R as getCommittedValue,c as getDirectiveClass,P as insertPart,u as isCompiledTemplateResult,f as isDirectiveResult,v as isPrimitive,T as isSingleExpression,d as isTemplateResult,B as removePart,g as setChildPartValue,C as setCommittedValue};/*! Bundled license information:

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
`,mimeType:"application/javascript"},"/lit-html@3.3.1/es2022/static.mjs":{content:`import{html as p,svg as S,mathml as v}from"./lit-html.mjs";var n=Symbol.for(""),d=t=>{if(t?.r===n)return t?._$litStatic$},_=t=>({_$litStatic$:t,r:n}),g=(t,...a)=>({_$litStatic$:a.reduce((s,i,o)=>s+(e=>{if(e._$litStatic$!==void 0)return e._$litStatic$;throw Error(\`Value passed to 'literal' function must be a 'literal' result: \${e}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.\`)})(i)+t[o+1],t[0]),r:n}),m=new Map,u=t=>(a,...s)=>{let i=s.length,o,e,l=[],c=[],$,r=0,f=!1;for(;r<i;){for($=a[r];r<i&&(e=s[r],(o=d(e))!==void 0);)$+=o+a[++r],f=!0;r!==i&&c.push(e),l.push($),r++}if(r===i&&l.push(a[i]),f){let h=l.join("$$lit$$");(a=m.get(h))===void 0&&(l.raw=l,m.set(h,a=l)),s=c}return t(a,...s)},w=u(p),b=u(S),y=u(v);export{w as html,g as literal,y as mathml,b as svg,_ as unsafeStatic,u as withStatic};/*! Bundled license information:

lit-html/static.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
`,mimeType:"application/javascript"},"/lit-html@3.3.1/es2022/directive.mjs":{content:`var i={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},s=t=>(...e)=>({_$litDirective$:t,values:e}),T=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};export{T as Directive,i as PartType,s as directive};/*! Bundled license information:

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
`,mimeType:"application/javascript"},"/lit-html@3.3.1/es2022/directives/keyed.mjs":{content:`import{nothing as s}from"../lit-html.mjs";import{directive as i,Directive as o}from"../directive.mjs";import{setCommittedValue as a}from"../directive-helpers.mjs";var m=i(class extends o{constructor(){super(...arguments),this.key=s}render(t,e){return this.key=t,e}update(t,[e,r]){return e!==this.key&&(a(t),this.key=e),r}});export{m as keyed};/*! Bundled license information:

lit-html/directives/keyed.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
`,mimeType:"application/javascript"},"/lit-html/directives/unsafe-html.js":{content:`import"/lit-html@3.3.1/es2022/directive.mjs";import"/lit-html@3.3.1/es2022/lit-html.mjs";export*from"/lit-html@3.3.1/es2022/directives/unsafe-html.mjs";
`,mimeType:"application/javascript"},"/lit-html@3.3.1/es2022/directives/unsafe-html.mjs":{content:`import{nothing as t,noChange as s}from"../lit-html.mjs";import{Directive as n,PartType as a,directive as o}from"../directive.mjs";var i=class extends n{constructor(r){if(super(r),this.it=t,r.type!==a.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===t||r==null)return this._t=void 0,this.it=r;if(r===s)return r;if(typeof r!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this._t;this.it=r;let e=[r];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};i.directiveName="unsafeHTML",i.resultType=1;var c=o(i);export{i as UnsafeHTMLDirective,c as unsafeHTML};/*! Bundled license information:

lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
`,mimeType:"application/javascript"},"/style.css":{content:`@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--un-bg-opacity:100%;--un-ring-opacity:100%;--un-border-opacity:100%;--un-text-opacity:100%;--un-translate-x:initial;--un-translate-y:initial;--un-translate-z:initial;--un-leading:initial;--un-space-y-reverse:initial;--un-divide-x-reverse:initial;--un-border-style:solid;--un-divide-opacity:100%;--un-from-opacity:100%;--un-to-opacity:100%}}@property --un-text-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}@property --un-leading{syntax:"*";inherits:false;}@property --un-border-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}@property --un-bg-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}@property --un-ring-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}@property --un-inset-ring-color{syntax:"*";inherits:false;}@property --un-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000;}@property --un-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000;}@property --un-inset-shadow-color{syntax:"*";inherits:false;}@property --un-ring-color{syntax:"*";inherits:false;}@property --un-ring-inset{syntax:"*";inherits:false;}@property --un-ring-offset-color{syntax:"*";inherits:false;}@property --un-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000;}@property --un-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0px;}@property --un-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000;}@property --un-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000;}@property --un-shadow-color{syntax:"*";inherits:false;}@property --un-translate-x{syntax:"*";inherits:false;initial-value:0;}@property --un-translate-y{syntax:"*";inherits:false;initial-value:0;}@property --un-translate-z{syntax:"*";inherits:false;initial-value:0;}@property --un-from-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}@property --un-gradient-from{syntax:"<color>";inherits:false;initial-value:#0000;}@property --un-gradient-from-position{syntax:"<length-percentage>";inherits:false;initial-value:0%;}@property --un-gradient-position{syntax:"*";inherits:false;}@property --un-gradient-stops{syntax:"*";inherits:false;}@property --un-gradient-to{syntax:"<color>";inherits:false;initial-value:#0000;}@property --un-gradient-to-position{syntax:"<length-percentage>";inherits:false;initial-value:100%;}@property --un-gradient-via{syntax:"<color>";inherits:false;initial-value:#0000;}@property --un-gradient-via-position{syntax:"<length-percentage>";inherits:false;initial-value:50%;}@property --un-gradient-via-stops{syntax:"*";inherits:false;}@property --un-to-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}@property --un-space-y-reverse{syntax:"*";inherits:false;initial-value:0;}@property --un-divide-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}@property --un-border-style{syntax:"*";inherits:false;initial-value:solid;}@property --un-divide-x-reverse{syntax:"*";inherits:false;initial-value:0;}:root,:host{--spacing: .25rem;--font-icon-family: lucide;--font-family: Manrope;--icon-family: lucide;--color-primary: hsl(179 85% 53%);--color-secondary: hsl(6 90% 64%);--color-accent: hsl(6 90% 64%);--color-surface: hsl(100 35% 80%);--color-text: hsl(183 80% 34%);--color-danger: hsl(0 90% 65%);--color-border: #000000;--color-border-subtle: #5c5050;--colors-black: #000;--colors-white: #fff;--colors-slate-50: oklch(98.4% .003 247.858);--colors-slate-100: oklch(96.8% .007 247.896);--colors-slate-200: oklch(92.9% .013 255.508);--colors-slate-300: oklch(86.9% .022 252.894);--colors-slate-400: oklch(70.4% .04 256.788);--colors-slate-500: oklch(55.4% .046 257.417);--colors-slate-600: oklch(44.6% .043 257.281);--colors-slate-700: oklch(37.2% .044 257.287);--colors-slate-800: oklch(27.9% .041 260.031);--colors-slate-900: oklch(20.8% .042 265.755);--colors-slate-950: oklch(12.9% .042 264.695);--colors-slate-DEFAULT: oklch(70.4% .04 256.788);--colors-gray-50: oklch(98.5% .002 247.839);--colors-gray-100: oklch(96.7% .003 264.542);--colors-gray-200: oklch(92.8% .006 264.531);--colors-gray-300: oklch(87.2% .01 258.338);--colors-gray-400: oklch(70.7% .022 261.325);--colors-gray-500: oklch(55.1% .027 264.364);--colors-gray-600: oklch(44.6% .03 256.802);--colors-gray-700: oklch(37.3% .034 259.733);--colors-gray-800: oklch(27.8% .033 256.848);--colors-gray-900: oklch(21% .034 264.665);--colors-gray-950: oklch(13% .028 261.692);--colors-gray-DEFAULT: oklch(70.7% .022 261.325);--colors-zinc-50: oklch(98.5% 0 0);--colors-zinc-100: oklch(96.7% .001 286.375);--colors-zinc-200: oklch(92% .004 286.32);--colors-zinc-300: oklch(87.1% .006 286.286);--colors-zinc-400: oklch(70.5% .015 286.067);--colors-zinc-500: oklch(55.2% .016 285.938);--colors-zinc-600: oklch(44.2% .017 285.786);--colors-zinc-700: oklch(37% .013 285.805);--colors-zinc-800: oklch(27.4% .006 286.033);--colors-zinc-900: oklch(21% .006 285.885);--colors-zinc-950: oklch(14.1% .005 285.823);--colors-zinc-DEFAULT: oklch(70.5% .015 286.067);--colors-neutral-50: oklch(98.5% 0 0);--colors-neutral-100: oklch(97% 0 0);--colors-neutral-200: oklch(92.2% 0 0);--colors-neutral-300: oklch(87% 0 0);--colors-neutral-400: oklch(70.8% 0 0);--colors-neutral-500: oklch(55.6% 0 0);--colors-neutral-600: oklch(43.9% 0 0);--colors-neutral-700: oklch(37.1% 0 0);--colors-neutral-800: oklch(26.9% 0 0);--colors-neutral-900: oklch(20.5% 0 0);--colors-neutral-950: oklch(14.5% 0 0);--colors-neutral-DEFAULT: oklch(70.8% 0 0);--colors-stone-50: oklch(98.5% .001 106.423);--colors-stone-100: oklch(97% .001 106.424);--colors-stone-200: oklch(92.3% .003 48.717);--colors-stone-300: oklch(86.9% .005 56.366);--colors-stone-400: oklch(70.9% .01 56.259);--colors-stone-500: oklch(55.3% .013 58.071);--colors-stone-600: oklch(44.4% .011 73.639);--colors-stone-700: oklch(37.4% .01 67.558);--colors-stone-800: oklch(26.8% .007 34.298);--colors-stone-900: oklch(21.6% .006 56.043);--colors-stone-950: oklch(14.7% .004 49.25);--colors-stone-DEFAULT: oklch(70.9% .01 56.259);--colors-red-50: oklch(97.1% .013 17.38);--colors-red-100: oklch(93.6% .032 17.717);--colors-red-200: oklch(88.5% .062 18.334);--colors-red-300: oklch(80.8% .114 19.571);--colors-red-400: oklch(70.4% .191 22.216);--colors-red-500: oklch(63.7% .237 25.331);--colors-red-600: oklch(57.7% .245 27.325);--colors-red-700: oklch(50.5% .213 27.518);--colors-red-800: oklch(44.4% .177 26.899);--colors-red-900: oklch(39.6% .141 25.723);--colors-red-950: oklch(25.8% .092 26.042);--colors-red-DEFAULT: oklch(70.4% .191 22.216);--colors-orange-50: oklch(98% .016 73.684);--colors-orange-100: oklch(95.4% .038 75.164);--colors-orange-200: oklch(90.1% .076 70.697);--colors-orange-300: oklch(83.7% .128 66.29);--colors-orange-400: oklch(75% .183 55.934);--colors-orange-500: oklch(70.5% .213 47.604);--colors-orange-600: oklch(64.6% .222 41.116);--colors-orange-700: oklch(55.3% .195 38.402);--colors-orange-800: oklch(47% .157 37.304);--colors-orange-900: oklch(40.8% .123 38.172);--colors-orange-950: oklch(26.6% .079 36.259);--colors-orange-DEFAULT: oklch(75% .183 55.934);--colors-amber-50: oklch(98.7% .022 95.277);--colors-amber-100: oklch(96.2% .059 95.617);--colors-amber-200: oklch(92.4% .12 95.746);--colors-amber-300: oklch(87.9% .169 91.605);--colors-amber-400: oklch(82.8% .189 84.429);--colors-amber-500: oklch(76.9% .188 70.08);--colors-amber-600: oklch(66.6% .179 58.318);--colors-amber-700: oklch(55.5% .163 48.998);--colors-amber-800: oklch(47.3% .137 46.201);--colors-amber-900: oklch(41.4% .112 45.904);--colors-amber-950: oklch(27.9% .077 45.635);--colors-amber-DEFAULT: oklch(82.8% .189 84.429);--colors-yellow-50: oklch(98.7% .026 102.212);--colors-yellow-100: oklch(97.3% .071 103.193);--colors-yellow-200: oklch(94.5% .129 101.54);--colors-yellow-300: oklch(90.5% .182 98.111);--colors-yellow-400: oklch(85.2% .199 91.936);--colors-yellow-500: oklch(79.5% .184 86.047);--colors-yellow-600: oklch(68.1% .162 75.834);--colors-yellow-700: oklch(55.4% .135 66.442);--colors-yellow-800: oklch(47.6% .114 61.907);--colors-yellow-900: oklch(42.1% .095 57.708);--colors-yellow-950: oklch(28.6% .066 53.813);--colors-yellow-DEFAULT: oklch(85.2% .199 91.936);--colors-lime-50: oklch(98.6% .031 120.757);--colors-lime-100: oklch(96.7% .067 122.328);--colors-lime-200: oklch(93.8% .127 124.321);--colors-lime-300: oklch(89.7% .196 126.665);--colors-lime-400: oklch(84.1% .238 128.85);--colors-lime-500: oklch(76.8% .233 130.85);--colors-lime-600: oklch(64.8% .2 131.684);--colors-lime-700: oklch(53.2% .157 131.589);--colors-lime-800: oklch(45.3% .124 130.933);--colors-lime-900: oklch(40.5% .101 131.063);--colors-lime-950: oklch(27.4% .072 132.109);--colors-lime-DEFAULT: oklch(84.1% .238 128.85);--colors-green-50: oklch(98.2% .018 155.826);--colors-green-100: oklch(96.2% .044 156.743);--colors-green-200: oklch(92.5% .084 155.995);--colors-green-300: oklch(87.1% .15 154.449);--colors-green-400: oklch(79.2% .209 151.711);--colors-green-500: oklch(72.3% .219 149.579);--colors-green-600: oklch(62.7% .194 149.214);--colors-green-700: oklch(52.7% .154 150.069);--colors-green-800: oklch(44.8% .119 151.328);--colors-green-900: oklch(39.3% .095 152.535);--colors-green-950: oklch(26.6% .065 152.934);--colors-green-DEFAULT: oklch(79.2% .209 151.711);--colors-emerald-50: oklch(97.9% .021 166.113);--colors-emerald-100: oklch(95% .052 163.051);--colors-emerald-200: oklch(90.5% .093 164.15);--colors-emerald-300: oklch(84.5% .143 164.978);--colors-emerald-400: oklch(76.5% .177 163.223);--colors-emerald-500: oklch(69.6% .17 162.48);--colors-emerald-600: oklch(59.6% .145 163.225);--colors-emerald-700: oklch(50.8% .118 165.612);--colors-emerald-800: oklch(43.2% .095 166.913);--colors-emerald-900: oklch(37.8% .077 168.94);--colors-emerald-950: oklch(26.2% .051 172.552);--colors-emerald-DEFAULT: oklch(76.5% .177 163.223);--colors-teal-50: oklch(98.4% .014 180.72);--colors-teal-100: oklch(95.3% .051 180.801);--colors-teal-200: oklch(91% .096 180.426);--colors-teal-300: oklch(85.5% .138 181.071);--colors-teal-400: oklch(77.7% .152 181.912);--colors-teal-500: oklch(70.4% .14 182.503);--colors-teal-600: oklch(60% .118 184.704);--colors-teal-700: oklch(51.1% .096 186.391);--colors-teal-800: oklch(43.7% .078 188.216);--colors-teal-900: oklch(38.6% .063 188.416);--colors-teal-950: oklch(27.7% .046 192.524);--colors-teal-DEFAULT: oklch(77.7% .152 181.912);--colors-cyan-50: oklch(98.4% .019 200.873);--colors-cyan-100: oklch(95.6% .045 203.388);--colors-cyan-200: oklch(91.7% .08 205.041);--colors-cyan-300: oklch(86.5% .127 207.078);--colors-cyan-400: oklch(78.9% .154 211.53);--colors-cyan-500: oklch(71.5% .143 215.221);--colors-cyan-600: oklch(60.9% .126 221.723);--colors-cyan-700: oklch(52% .105 223.128);--colors-cyan-800: oklch(45% .085 224.283);--colors-cyan-900: oklch(39.8% .07 227.392);--colors-cyan-950: oklch(30.2% .056 229.695);--colors-cyan-DEFAULT: oklch(78.9% .154 211.53);--colors-sky-50: oklch(97.7% .013 236.62);--colors-sky-100: oklch(95.1% .026 236.824);--colors-sky-200: oklch(90.1% .058 230.902);--colors-sky-300: oklch(82.8% .111 230.318);--colors-sky-400: oklch(74.6% .16 232.661);--colors-sky-500: oklch(68.5% .169 237.323);--colors-sky-600: oklch(58.8% .158 241.966);--colors-sky-700: oklch(50% .134 242.749);--colors-sky-800: oklch(44.3% .11 240.79);--colors-sky-900: oklch(39.1% .09 240.876);--colors-sky-950: oklch(29.3% .066 243.157);--colors-sky-DEFAULT: oklch(74.6% .16 232.661);--colors-blue-50: oklch(97% .014 254.604);--colors-blue-100: oklch(93.2% .032 255.585);--colors-blue-200: oklch(88.2% .059 254.128);--colors-blue-300: oklch(80.9% .105 251.813);--colors-blue-400: oklch(70.7% .165 254.624);--colors-blue-500: oklch(62.3% .214 259.815);--colors-blue-600: oklch(54.6% .245 262.881);--colors-blue-700: oklch(48.8% .243 264.376);--colors-blue-800: oklch(42.4% .199 265.638);--colors-blue-900: oklch(37.9% .146 265.522);--colors-blue-950: oklch(28.2% .091 267.935);--colors-blue-DEFAULT: oklch(70.7% .165 254.624);--colors-indigo-50: oklch(96.2% .018 272.314);--colors-indigo-100: oklch(93% .034 272.788);--colors-indigo-200: oklch(87% .065 274.039);--colors-indigo-300: oklch(78.5% .115 274.713);--colors-indigo-400: oklch(67.3% .182 276.935);--colors-indigo-500: oklch(58.5% .233 277.117);--colors-indigo-600: oklch(51.1% .262 276.966);--colors-indigo-700: oklch(45.7% .24 277.023);--colors-indigo-800: oklch(39.8% .195 277.366);--colors-indigo-900: oklch(35.9% .144 278.697);--colors-indigo-950: oklch(25.7% .09 281.288);--colors-indigo-DEFAULT: oklch(67.3% .182 276.935);--colors-violet-50: oklch(96.9% .016 293.756);--colors-violet-100: oklch(94.3% .029 294.588);--colors-violet-200: oklch(89.4% .057 293.283);--colors-violet-300: oklch(81.1% .111 293.571);--colors-violet-400: oklch(70.2% .183 293.541);--colors-violet-500: oklch(60.6% .25 292.717);--colors-violet-600: oklch(54.1% .281 293.009);--colors-violet-700: oklch(49.1% .27 292.581);--colors-violet-800: oklch(43.2% .232 292.759);--colors-violet-900: oklch(38% .189 293.745);--colors-violet-950: oklch(28.3% .141 291.089);--colors-violet-DEFAULT: oklch(70.2% .183 293.541);--colors-purple-50: oklch(97.7% .014 308.299);--colors-purple-100: oklch(94.6% .033 307.174);--colors-purple-200: oklch(90.2% .063 306.703);--colors-purple-300: oklch(82.7% .119 306.383);--colors-purple-400: oklch(71.4% .203 305.504);--colors-purple-500: oklch(62.7% .265 303.9);--colors-purple-600: oklch(55.8% .288 302.321);--colors-purple-700: oklch(49.6% .265 301.924);--colors-purple-800: oklch(43.8% .218 303.724);--colors-purple-900: oklch(38.1% .176 304.987);--colors-purple-950: oklch(29.1% .149 302.717);--colors-purple-DEFAULT: oklch(71.4% .203 305.504);--colors-fuchsia-50: oklch(97.7% .017 320.058);--colors-fuchsia-100: oklch(95.2% .037 318.852);--colors-fuchsia-200: oklch(90.3% .076 319.62);--colors-fuchsia-300: oklch(83.3% .145 321.434);--colors-fuchsia-400: oklch(74% .238 322.16);--colors-fuchsia-500: oklch(66.7% .295 322.15);--colors-fuchsia-600: oklch(59.1% .293 322.896);--colors-fuchsia-700: oklch(51.8% .253 323.949);--colors-fuchsia-800: oklch(45.2% .211 324.591);--colors-fuchsia-900: oklch(40.1% .17 325.612);--colors-fuchsia-950: oklch(29.3% .136 325.661);--colors-fuchsia-DEFAULT: oklch(74% .238 322.16);--colors-pink-50: oklch(97.1% .014 343.198);--colors-pink-100: oklch(94.8% .028 342.258);--colors-pink-200: oklch(89.9% .061 343.231);--colors-pink-300: oklch(82.3% .12 346.018);--colors-pink-400: oklch(71.8% .202 349.761);--colors-pink-500: oklch(65.6% .241 354.308);--colors-pink-600: oklch(59.2% .249 .584);--colors-pink-700: oklch(52.5% .223 3.958);--colors-pink-800: oklch(45.9% .187 3.815);--colors-pink-900: oklch(40.8% .153 2.432);--colors-pink-950: oklch(28.4% .109 3.907);--colors-pink-DEFAULT: oklch(71.8% .202 349.761);--colors-rose-50: oklch(96.9% .015 12.422);--colors-rose-100: oklch(94.1% .03 12.58);--colors-rose-200: oklch(89.2% .058 10.001);--colors-rose-300: oklch(81% .117 11.638);--colors-rose-400: oklch(71.2% .194 13.428);--colors-rose-500: oklch(64.5% .246 16.439);--colors-rose-600: oklch(58.6% .253 17.585);--colors-rose-700: oklch(51.4% .222 16.935);--colors-rose-800: oklch(45.5% .188 13.697);--colors-rose-900: oklch(41% .159 10.272);--colors-rose-950: oklch(27.1% .105 12.094);--colors-rose-DEFAULT: oklch(71.2% .194 13.428);--colors-light-50: oklch(99.4% 0 0);--colors-light-100: oklch(99.11% 0 0);--colors-light-200: oklch(98.51% 0 0);--colors-light-300: oklch(98.16% .0017 247.84);--colors-light-400: oklch(97.31% 0 0);--colors-light-500: oklch(96.12% 0 0);--colors-light-600: oklch(96.32% .0034 247.86);--colors-light-700: oklch(94.17% .0052 247.88);--colors-light-800: oklch(91.09% .007 247.9);--colors-light-900: oklch(90.72% .0051 228.82);--colors-light-950: oklch(89.23% .006 239.83);--colors-light-DEFAULT: oklch(97.31% 0 0);--colors-dark-50: oklch(40.91% 0 0);--colors-dark-100: oklch(35.62% 0 0);--colors-dark-200: oklch(31.71% 0 0);--colors-dark-300: oklch(29.72% 0 0);--colors-dark-400: oklch(25.2% 0 0);--colors-dark-500: oklch(23.93% 0 0);--colors-dark-600: oklch(22.73% .0038 286.09);--colors-dark-700: oklch(22.21% 0 0);--colors-dark-800: oklch(20.9% 0 0);--colors-dark-900: oklch(16.84% 0 0);--colors-dark-950: oklch(13.44% 0 0);--colors-dark-DEFAULT: oklch(25.2% 0 0);--colors-default: var(--text-color);--colors-muted: var(--text-muted);--colors-inverted: var(--color-inverse);--colors-surface-DEFAULT: var(--color-surface);--colors-surface-lighter: var(--color-surface-lighter);--colors-surface-light: var(--color-surface-light);--colors-surface-dark: var(--color-surface-dark);--colors-surface-darker: var(--color-surface-darker);--colors-accent-DEFAULT: var(--color-accent);--colors-accent-lighter: var(--color-accent-lighter);--colors-accent-light: var(--color-accent-light);--colors-accent-dark: var(--color-accent-dark);--colors-accent-darker: var(--color-accent-darker);--colors-inverse-DEFAULT: var(--color-inverse);--colors-inverse-lighter: var(--color-inverse-lighter);--colors-inverse-light: var(--color-inverse-light);--colors-inverse-dark: var(--color-inverse-dark);--colors-inverse-darker: var(--color-inverse-darker);--colors-primary-DEFAULT: var(--color-primary);--colors-primary-lighter: var(--color-primary-lighter);--colors-primary-light: var(--color-primary-light);--colors-primary-dark: var(--color-primary-dark);--colors-primary-darker: var(--color-primary-darker);--colors-secondary-DEFAULT: var(--color-secondary);--colors-secondary-lighter: var(--color-secondary-lighter);--colors-secondary-light: var(--color-secondary-light);--colors-secondary-dark: var(--color-secondary-dark);--colors-secondary-darker: var(--color-secondary-darker);--colors-success-DEFAULT: var(--color-success);--colors-success-lighter: var(--color-success-lighter);--colors-success-light: var(--color-success-light);--colors-success-dark: var(--color-success-dark);--colors-success-darker: var(--color-success-darker);--colors-danger-DEFAULT: var(--color-danger);--colors-danger-lighter: var(--color-danger-lighter);--colors-danger-light: var(--color-danger-light);--colors-danger-dark: var(--color-danger-dark);--colors-danger-darker: var(--color-danger-darker);--colors-warning-DEFAULT: var(--color-warning);--colors-warning-lighter: var(--color-warning-lighter);--colors-warning-light: var(--color-warning-light);--colors-warning-dark: var(--color-warning-dark);--colors-warning-darker: var(--color-warning-darker);--colors-info-DEFAULT: var(--color-info);--colors-info-lighter: var(--color-info-lighter);--colors-info-light: var(--color-info-light);--colors-info-dark: var(--color-info-dark);--colors-info-darker: var(--color-info-darker);--colors-hover: var(--color-hover);--colors-focus: var(--color-focus);--text-xs-fontSize: .75rem;--text-xs-lineHeight: 1rem;--text-sm-fontSize: .875rem;--text-sm-lineHeight: 1.25rem;--text-base-fontSize: 1rem;--text-base-lineHeight: 1.5rem;--text-lg-fontSize: 1.125rem;--text-lg-lineHeight: 1.75rem;--text-xl-fontSize: 1.25rem;--text-xl-lineHeight: 1.75rem;--text-2xl-fontSize: 1.5rem;--text-2xl-lineHeight: 2rem;--text-3xl-fontSize: 1.875rem;--text-3xl-lineHeight: 2.25rem;--text-4xl-fontSize: 2.25rem;--text-4xl-lineHeight: 2.5rem;--text-5xl-fontSize: 3rem;--text-5xl-lineHeight: 1;--text-6xl-fontSize: 3.75rem;--text-6xl-lineHeight: 1;--text-7xl-fontSize: 4.5rem;--text-7xl-lineHeight: 1;--text-8xl-fontSize: 6rem;--text-8xl-lineHeight: 1;--text-9xl-fontSize: 8rem;--text-9xl-lineHeight: 1;--fontWeight-thin: 100;--fontWeight-extralight: 200;--fontWeight-light: 300;--fontWeight-normal: 400;--fontWeight-medium: 500;--fontWeight-semibold: 600;--fontWeight-bold: 700;--fontWeight-extrabold: 800;--fontWeight-black: 900;--tracking-tighter: -.05em;--tracking-tight: -.025em;--tracking-normal: 0em;--tracking-wide: .025em;--tracking-wider: .05em;--tracking-widest: .1em;--leading-none: 1;--leading-tight: 1.25;--leading-snug: 1.375;--leading-normal: 1.5;--leading-relaxed: 1.625;--leading-loose: 2;--textStrokeWidth-DEFAULT: 1.5rem;--textStrokeWidth-none: 0;--textStrokeWidth-sm: thin;--textStrokeWidth-md: medium;--textStrokeWidth-lg: thick;--radius-DEFAULT: .25rem;--radius-none: 0;--radius-xs: .125rem;--radius-sm: .25rem;--radius-md: .375rem;--radius-lg: .5rem;--radius-xl: .75rem;--radius-2xl: 1rem;--radius-3xl: 1.5rem;--radius-4xl: 2rem;--ease-linear: linear;--ease-in: cubic-bezier(.4, 0, 1, 1);--ease-out: cubic-bezier(0, 0, .2, 1);--ease-in-out: cubic-bezier(.4, 0, .2, 1);--ease-DEFAULT: cubic-bezier(.4, 0, .2, 1);--blur-DEFAULT: 8px;--blur-xs: 4px;--blur-sm: 8px;--blur-md: 12px;--blur-lg: 16px;--blur-xl: 24px;--blur-2xl: 40px;--blur-3xl: 64px;--perspective-dramatic: 100px;--perspective-near: 300px;--perspective-normal: 500px;--perspective-midrange: 800px;--perspective-distant: 1200px;--default-transition-duration: .15s;--default-transition-timingFunction: cubic-bezier(.4, 0, .2, 1);--default-font-family: var(--font-sans);--default-font-featureSettings: var(--font-sans--font-feature-settings);--default-font-variationSettings: var(--font-sans--font-variation-settings);--default-monoFont-family: var(--font-mono);--default-monoFont-featureSettings: var(--font-mono--font-feature-settings);--default-monoFont-variationSettings: var(--font-mono--font-variation-settings);--container-3xs: 16rem;--container-2xs: 18rem;--container-xs: 20rem;--container-sm: 24rem;--container-md: 28rem;--container-lg: 32rem;--container-xl: 36rem;--container-2xl: 42rem;--container-3xl: 48rem;--container-4xl: 56rem;--container-5xl: 64rem;--container-6xl: 72rem;--container-7xl: 80rem;--container-prose: 65ch;--textColor-DEFAULT: var(--text-color);--backgroundColor-DEFAULT: var(--background-color)}*,:after,:before,::backdrop,::file-selector-button{box-sizing:border-box;margin:0;padding:0;border:0 solid}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:var( --default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" );font-feature-settings:var(--default-font-featureSettings, normal);font-variation-settings:var(--default-font-variationSettings, normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var( --default-monoFont-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace );font-feature-settings:var(--default-monoFont-featureSettings, normal);font-variation-settings:var(--default-monoFont-variationSettings, normal);font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea,::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;border-radius:0;background-color:transparent;opacity:1}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not (-webkit-appearance: -apple-pay-button)) or (contain-intrinsic-size: 1px){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit,::-webkit-datetime-edit-year-field,::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-minute-field,::-webkit-datetime-edit-second-field,::-webkit-datetime-edit-millisecond-field,::-webkit-datetime-edit-meridiem-field{padding-block:0}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]),::file-selector-button{appearance:button}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}.text-\\[10px\\]{font-size:10px}.text-\\[9px\\]{font-size:9px}.text-2xl{font-size:var(--text-2xl-fontSize);line-height:var(--un-leading, var(--text-2xl-lineHeight))}.text-3xl{font-size:var(--text-3xl-fontSize);line-height:var(--un-leading, var(--text-3xl-lineHeight))}.text-4xl{font-size:var(--text-4xl-fontSize);line-height:var(--un-leading, var(--text-4xl-lineHeight))}.text-5xl{font-size:var(--text-5xl-fontSize);line-height:var(--un-leading, var(--text-5xl-lineHeight))}.text-base{font-size:var(--text-base-fontSize);line-height:var(--un-leading, var(--text-base-lineHeight))}.text-lg{font-size:var(--text-lg-fontSize);line-height:var(--un-leading, var(--text-lg-lineHeight))}.text-sm{font-size:var(--text-sm-fontSize);line-height:var(--un-leading, var(--text-sm-lineHeight))}.text-xl{font-size:var(--text-xl-fontSize);line-height:var(--un-leading, var(--text-xl-lineHeight))}.text-xs{font-size:var(--text-xs-fontSize);line-height:var(--un-leading, var(--text-xs-lineHeight))}.text-black{color:color-mix(in srgb,var(--colors-black) var(--un-text-opacity),transparent)}.text-gray-400{color:color-mix(in srgb,var(--colors-gray-400) var(--un-text-opacity),transparent)}.text-gray-500{color:color-mix(in srgb,var(--colors-gray-500) var(--un-text-opacity),transparent)}.text-gray-600{color:color-mix(in srgb,var(--colors-gray-600) var(--un-text-opacity),transparent)}.text-gray-700{color:color-mix(in srgb,var(--colors-gray-700) var(--un-text-opacity),transparent)}.text-gray-800{color:color-mix(in srgb,var(--colors-gray-800) var(--un-text-opacity),transparent)}.text-green-600{color:color-mix(in srgb,var(--colors-green-600) var(--un-text-opacity),transparent)}.text-green-800{color:color-mix(in srgb,var(--colors-green-800) var(--un-text-opacity),transparent)}.text-pink-700{color:color-mix(in srgb,var(--colors-pink-700) var(--un-text-opacity),transparent)}.text-white{color:color-mix(in srgb,var(--colors-white) var(--un-text-opacity),transparent)}.hover\\:text-black:hover{color:color-mix(in srgb,var(--colors-black) var(--un-text-opacity),transparent)}.hover\\:text-pink-700:hover{color:color-mix(in srgb,var(--colors-pink-700) var(--un-text-opacity),transparent)}.hover\\:text-white:hover{color:color-mix(in srgb,var(--colors-white) var(--un-text-opacity),transparent)}.leading-relaxed{--un-leading:var(--leading-relaxed);line-height:var(--leading-relaxed)}.leading-tight{--un-leading:var(--leading-tight);line-height:var(--leading-tight)}.tracking-tight{--un-tracking:var(--tracking-tight);letter-spacing:var(--tracking-tight)}.font-black{--un-font-weight:var(--fontWeight-black);font-weight:var(--fontWeight-black)}.font-bold{--un-font-weight:var(--fontWeight-bold);font-weight:var(--fontWeight-bold)}.font-medium{--un-font-weight:var(--fontWeight-medium);font-weight:var(--fontWeight-medium)}.m12{margin:calc(var(--spacing) * 12)}.m16\\.24{margin:calc(var(--spacing) * 16.24)}.-mx-4{margin-inline:calc(calc(var(--spacing) * 4) * -1)}.mx-1{margin-inline:calc(var(--spacing) * 1)}.mx-4{margin-inline:calc(var(--spacing) * 4)}.mx-auto{margin-inline:auto}.-ml-1{margin-left:calc(calc(var(--spacing) * 1) * -1)}.-mt-10{margin-top:calc(calc(var(--spacing) * 10) * -1)}.-mt-6{margin-top:calc(calc(var(--spacing) * 6) * -1)}.mb-1{margin-bottom:calc(var(--spacing) * 1)}.mb-12{margin-bottom:calc(var(--spacing) * 12)}.mb-2{margin-bottom:calc(var(--spacing) * 2)}.mb-3{margin-bottom:calc(var(--spacing) * 3)}.mb-4{margin-bottom:calc(var(--spacing) * 4)}.mb-8{margin-bottom:calc(var(--spacing) * 8)}.ml-auto{margin-left:auto}.mt-0\\.5{margin-top:calc(var(--spacing) * .5)}.mt-1{margin-top:calc(var(--spacing) * 1)}.mt-2{margin-top:calc(var(--spacing) * 2)}.mt-3{margin-top:calc(var(--spacing) * 3)}.mt-4{margin-top:calc(var(--spacing) * 4)}.mt-6{margin-top:calc(var(--spacing) * 6)}.last\\:mr-1:last-child{margin-right:calc(var(--spacing) * 1)}.p-\\[3px\\]{padding:3px}.p-1{padding:calc(var(--spacing) * 1)}.p-2{padding:calc(var(--spacing) * 2)}.p-3{padding:calc(var(--spacing) * 3)}.p-4{padding:calc(var(--spacing) * 4)}.p-6{padding:calc(var(--spacing) * 6)}.p-8{padding:calc(var(--spacing) * 8)}.px-1\\.5{padding-inline:calc(var(--spacing) * 1.5)}.px-2{padding-inline:calc(var(--spacing) * 2)}.px-3{padding-inline:calc(var(--spacing) * 3)}.px-4{padding-inline:calc(var(--spacing) * 4)}.px-6{padding-inline:calc(var(--spacing) * 6)}.py-0\\.5{padding-block:calc(var(--spacing) * .5)}.py-1{padding-block:calc(var(--spacing) * 1)}.py-1\\.5{padding-block:calc(var(--spacing) * 1.5)}.py-2{padding-block:calc(var(--spacing) * 2)}.py-3{padding-block:calc(var(--spacing) * 3)}.py-4{padding-block:calc(var(--spacing) * 4)}.py-6{padding-block:calc(var(--spacing) * 6)}.pb-16{padding-bottom:calc(var(--spacing) * 16)}.pb-2{padding-bottom:calc(var(--spacing) * 2)}.pb-20{padding-bottom:calc(var(--spacing) * 20)}.pb-24{padding-bottom:calc(var(--spacing) * 24)}.pb-4{padding-bottom:calc(var(--spacing) * 4)}.pb-8{padding-bottom:calc(var(--spacing) * 8)}.pl-12{padding-left:calc(var(--spacing) * 12)}.pr-12{padding-right:calc(var(--spacing) * 12)}.pt-0{padding-top:calc(var(--spacing) * 0)}.pt-2{padding-top:calc(var(--spacing) * 2)}.pt-4{padding-top:calc(var(--spacing) * 4)}.pt-6{padding-top:calc(var(--spacing) * 6)}.text-center{text-align:center}.outline-none{--un-outline-style:none;outline-style:none}.border{border-width:1px}.border-2{border-width:2px}.border-3{border-width:3px}.border-b-3{border-bottom-width:3px}.border-r-3{border-right-width:3px}.border-t{border-top-width:1px}.border-t-2{border-top-width:2px}.border-black{border-color:color-mix(in srgb,var(--colors-black) var(--un-border-opacity),transparent)}.border-gray-200{border-color:color-mix(in srgb,var(--colors-gray-200) var(--un-border-opacity),transparent)}.border-gray-300{border-color:color-mix(in srgb,var(--colors-gray-300) var(--un-border-opacity),transparent)}.border-green-800{border-color:color-mix(in srgb,var(--colors-green-800) var(--un-border-opacity),transparent)}.border-white{border-color:color-mix(in srgb,var(--colors-white) var(--un-border-opacity),transparent)}.rounded{border-radius:var(--radius-DEFAULT)}.rounded-2xl{border-radius:var(--radius-2xl)}.rounded-3xl{border-radius:var(--radius-3xl)}.rounded-full{border-radius:calc(infinity * 1px)}.rounded-lg{border-radius:var(--radius-lg)}.rounded-md{border-radius:var(--radius-md)}.rounded-xl{border-radius:var(--radius-xl)}.rounded-b-\\[2\\.5rem\\]{border-bottom-left-radius:2.5rem;border-bottom-right-radius:2.5rem}.border-dashed{--un-border-style:dashed;border-style:dashed}.bg-accent{background-color:color-mix(in srgb,var(--colors-accent-DEFAULT) var(--un-bg-opacity),transparent)}.bg-amber-200{background-color:color-mix(in srgb,var(--colors-amber-200) var(--un-bg-opacity),transparent)}.bg-amber-300{background-color:color-mix(in srgb,var(--colors-amber-300) var(--un-bg-opacity),transparent)}.bg-black{background-color:color-mix(in srgb,var(--colors-black) var(--un-bg-opacity),transparent)}.bg-blue-200{background-color:color-mix(in srgb,var(--colors-blue-200) var(--un-bg-opacity),transparent)}.bg-blue-300{background-color:color-mix(in srgb,var(--colors-blue-300) var(--un-bg-opacity),transparent)}.bg-blue-400{background-color:color-mix(in srgb,var(--colors-blue-400) var(--un-bg-opacity),transparent)}.bg-emerald-200{background-color:color-mix(in srgb,var(--colors-emerald-200) var(--un-bg-opacity),transparent)}.bg-emerald-300{background-color:color-mix(in srgb,var(--colors-emerald-300) var(--un-bg-opacity),transparent)}.bg-gray-100{background-color:color-mix(in srgb,var(--colors-gray-100) var(--un-bg-opacity),transparent)}.bg-gray-200{background-color:color-mix(in srgb,var(--colors-gray-200) var(--un-bg-opacity),transparent)}.bg-gray-400{background-color:color-mix(in srgb,var(--colors-gray-400) var(--un-bg-opacity),transparent)}.bg-gray-50{background-color:color-mix(in srgb,var(--colors-gray-50) var(--un-bg-opacity),transparent)}.bg-green-100{background-color:color-mix(in srgb,var(--colors-green-100) var(--un-bg-opacity),transparent)}.bg-green-200{background-color:color-mix(in srgb,var(--colors-green-200) var(--un-bg-opacity),transparent)}.bg-green-300{background-color:color-mix(in srgb,var(--colors-green-300) var(--un-bg-opacity),transparent)}.bg-green-400{background-color:color-mix(in srgb,var(--colors-green-400) var(--un-bg-opacity),transparent)}.bg-lime-200{background-color:color-mix(in srgb,var(--colors-lime-200) var(--un-bg-opacity),transparent)}.bg-orange-200{background-color:color-mix(in srgb,var(--colors-orange-200) var(--un-bg-opacity),transparent)}.bg-orange-300{background-color:color-mix(in srgb,var(--colors-orange-300) var(--un-bg-opacity),transparent)}.bg-pink-200{background-color:color-mix(in srgb,var(--colors-pink-200) var(--un-bg-opacity),transparent)}.bg-pink-300{background-color:color-mix(in srgb,var(--colors-pink-300) var(--un-bg-opacity),transparent)}.bg-pink-400{background-color:color-mix(in srgb,var(--colors-pink-400) var(--un-bg-opacity),transparent)}.bg-primary{background-color:color-mix(in srgb,var(--colors-primary-DEFAULT) var(--un-bg-opacity),transparent)}.bg-purple-200{background-color:color-mix(in srgb,var(--colors-purple-200) var(--un-bg-opacity),transparent)}.bg-purple-300{background-color:color-mix(in srgb,var(--colors-purple-300) var(--un-bg-opacity),transparent)}.bg-purple-50{background-color:color-mix(in srgb,var(--colors-purple-50) var(--un-bg-opacity),transparent)}.bg-red-300{background-color:color-mix(in srgb,var(--colors-red-300) var(--un-bg-opacity),transparent)}.bg-rose-300{background-color:color-mix(in srgb,var(--colors-rose-300) var(--un-bg-opacity),transparent)}.bg-secondary-lighter{background-color:color-mix(in srgb,var(--colors-secondary-lighter) var(--un-bg-opacity),transparent)}.bg-sky-200{background-color:color-mix(in srgb,var(--colors-sky-200) var(--un-bg-opacity),transparent)}.bg-surface{background-color:color-mix(in srgb,var(--colors-surface-DEFAULT) var(--un-bg-opacity),transparent)}.bg-white{background-color:color-mix(in srgb,var(--colors-white) var(--un-bg-opacity),transparent)}.bg-white\\/10{background-color:color-mix(in srgb,var(--colors-white) 10%,transparent)}.bg-yellow-200{background-color:color-mix(in srgb,var(--colors-yellow-200) var(--un-bg-opacity),transparent)}.bg-yellow-300{background-color:color-mix(in srgb,var(--colors-yellow-300) var(--un-bg-opacity),transparent)}.bg-yellow-50{background-color:color-mix(in srgb,var(--colors-yellow-50) var(--un-bg-opacity),transparent)}.hover\\:bg-accent:hover{background-color:color-mix(in srgb,var(--colors-accent-DEFAULT) var(--un-bg-opacity),transparent)}.hover\\:bg-gray-100:hover{background-color:color-mix(in srgb,var(--colors-gray-100) var(--un-bg-opacity),transparent)}.hover\\:bg-gray-50:hover{background-color:color-mix(in srgb,var(--colors-gray-50) var(--un-bg-opacity),transparent)}.opacity-20{opacity:20%}.hover\\:underline:hover{text-decoration-line:underline}.flex{display:flex}.inline-flex{display:inline-flex}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.flex-grow{flex-grow:1}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.flex-nowrap{flex-wrap:nowrap}.gap-0{gap:calc(var(--spacing) * 0)}.gap-1{gap:calc(var(--spacing) * 1)}.gap-1\\.5{gap:calc(var(--spacing) * 1.5)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-3{gap:calc(var(--spacing) * 3)}.gap-4{gap:calc(var(--spacing) * 4)}.gap-6{gap:calc(var(--spacing) * 6)}.grid{display:grid}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.h-10{height:calc(var(--spacing) * 10)}.h-16{height:calc(var(--spacing) * 16)}.h-20{height:calc(var(--spacing) * 20)}.h-24{height:calc(var(--spacing) * 24)}.h-28{height:calc(var(--spacing) * 28)}.h-32{height:calc(var(--spacing) * 32)}.h-40{height:calc(var(--spacing) * 40)}.h-48{height:calc(var(--spacing) * 48)}.h-5{height:calc(var(--spacing) * 5)}.h-6{height:calc(var(--spacing) * 6)}.h-full{height:100%}.h-px{height:1px}.max-w-\\[300px\\]{max-width:300px}.max-w-\\[75\\%\\]{max-width:75%}.max-w-\\[80px\\]{max-width:80px}.max-w-100vw,.max-w-screen{max-width:100vw}.max-w-none{max-width:none}.max-w-xs{max-width:var(--container-xs)}.min-h-screen{min-height:100vh}.min-w-\\[72px\\]{min-width:72px}.min-w-0{min-width:calc(var(--spacing) * 0)}.min-w-max{min-width:max-content}.w-10{width:calc(var(--spacing) * 10)}.w-12{width:calc(var(--spacing) * 12)}.w-14{width:calc(var(--spacing) * 14)}.w-16{width:calc(var(--spacing) * 16)}.w-20{width:calc(var(--spacing) * 20)}.w-32{width:calc(var(--spacing) * 32)}.w-5{width:calc(var(--spacing) * 5)}.w-6{width:calc(var(--spacing) * 6)}.w-full{width:100%}.block{display:block}.hidden{display:none}.cursor-pointer{cursor:pointer}.whitespace-nowrap{white-space:nowrap}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.uppercase{text-transform:uppercase}.ring-2{--un-ring-shadow:var(--un-ring-inset,) 0 0 0 calc(2px + var(--un-ring-offset-width)) var(--un-ring-color, currentColor);box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.ring-white{--un-ring-color:color-mix(in srgb, var(--colors-white) var(--un-ring-opacity), transparent)}.shadow-\\[0px_4px_0px_0px_rgba\\(0\\,0\\,0\\,1\\)\\]{--un-shadow:0px 4px 0px 0px var(--un-shadow-color, rgba(0, 0, 0, 1));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.shadow-\\[2px_2px_0px_0px_rgba\\(0\\,0\\,0\\,1\\)\\]{--un-shadow:2px 2px 0px 0px var(--un-shadow-color, rgba(0, 0, 0, 1));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.shadow-\\[3px_3px_0px_0px_rgba\\(0\\,0\\,0\\,1\\)\\]{--un-shadow:3px 3px 0px 0px var(--un-shadow-color, rgba(0, 0, 0, 1));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.shadow-\\[4px_4px_0px_0px_rgba\\(0\\,0\\,0\\,1\\)\\]{--un-shadow:4px 4px 0px 0px var(--un-shadow-color, rgba(0, 0, 0, 1));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.shadow-\\[6px_6px_0px_0px_rgba\\(0\\,0\\,0\\,1\\)\\]{--un-shadow:6px 6px 0px 0px var(--un-shadow-color, rgba(0, 0, 0, 1));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.shadow-sm{--un-shadow:0 1px 3px 0 var(--un-shadow-color, rgb(0 0 0 / .1)),0 1px 2px -1px var(--un-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.group:hover .group-hover\\:shadow-none{--un-shadow:0 0 var(--un-shadow-color, rgb(0 0 0 / 0));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.hover\\:shadow-\\[1px_1px_0px_0px_rgba\\(0\\,0\\,0\\,1\\)\\]:hover{--un-shadow:1px 1px 0px 0px var(--un-shadow-color, rgba(0, 0, 0, 1));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.hover\\:shadow-\\[2px_2px_0px_0px_rgba\\(0\\,0\\,0\\,1\\)\\]:hover{--un-shadow:2px 2px 0px 0px var(--un-shadow-color, rgba(0, 0, 0, 1));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.hover\\:shadow-\\[4px_4px_0px_0px_rgba\\(0\\,0\\,0\\,1\\)\\]:hover{--un-shadow:4px 4px 0px 0px var(--un-shadow-color, rgba(0, 0, 0, 1));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.hover\\:shadow-none:hover{--un-shadow:0 0 var(--un-shadow-color, rgb(0 0 0 / 0));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.focus\\:shadow-\\[2px_2px_0px_0px_rgba\\(0\\,0\\,0\\,1\\)\\]:focus{--un-shadow:2px 2px 0px 0px var(--un-shadow-color, rgba(0, 0, 0, 1));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.active\\:shadow-\\[2px_2px_0px_0px_rgba\\(0\\,0\\,0\\,1\\)\\]:active{--un-shadow:2px 2px 0px 0px var(--un-shadow-color, rgba(0, 0, 0, 1));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.active\\:shadow-none:active{--un-shadow:0 0 var(--un-shadow-color, rgb(0 0 0 / 0));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.-translate-x-1\\/2{--un-translate-x:-50%;translate:var(--un-translate-x) var(--un-translate-y)}.-translate-y-1\\/2{--un-translate-y:-50%;translate:var(--un-translate-x) var(--un-translate-y)}.group:hover .group-hover\\:translate-x-\\[1px\\]{--un-translate-x:1px;translate:var(--un-translate-x) var(--un-translate-y)}.group:hover .group-hover\\:translate-y-\\[1px\\]{--un-translate-y:1px;translate:var(--un-translate-x) var(--un-translate-y)}.hover\\:translate-x-\\[1px\\]:hover{--un-translate-x:1px;translate:var(--un-translate-x) var(--un-translate-y)}.hover\\:translate-x-\\[2px\\]:hover{--un-translate-x:2px;translate:var(--un-translate-x) var(--un-translate-y)}.hover\\:translate-x-\\[3px\\]:hover{--un-translate-x:3px;translate:var(--un-translate-x) var(--un-translate-y)}.hover\\:translate-y-\\[1px\\]:hover{--un-translate-y:1px;translate:var(--un-translate-x) var(--un-translate-y)}.hover\\:translate-y-\\[2px\\]:hover{--un-translate-y:2px;translate:var(--un-translate-x) var(--un-translate-y)}.hover\\:translate-y-\\[3px\\]:hover{--un-translate-y:3px;translate:var(--un-translate-x) var(--un-translate-y)}.focus\\:translate-x-\\[2px\\]:focus{--un-translate-x:2px;translate:var(--un-translate-x) var(--un-translate-y)}.focus\\:translate-y-\\[2px\\]:focus{--un-translate-y:2px;translate:var(--un-translate-x) var(--un-translate-y)}.active\\:translate-x-\\[2px\\]:active{--un-translate-x:2px;translate:var(--un-translate-x) var(--un-translate-y)}.active\\:translate-y-\\[2px\\]:active{--un-translate-y:2px;translate:var(--un-translate-x) var(--un-translate-y)}.-rotate-1{rotate:-1deg}.transform{transform:var(--un-rotate-x) var(--un-rotate-y) var(--un-rotate-z) var(--un-skew-x) var(--un-skew-y)}.transition-all{transition-property:all;transition-timing-function:var(--un-ease, var(--default-transition-timingFunction));transition-duration:var(--un-duration, var(--default-transition-duration))}.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,--un-gradient-from,--un-gradient-via,--un-gradient-to;transition-timing-function:var(--un-ease, var(--default-transition-timingFunction));transition-duration:var(--un-duration, var(--default-transition-duration))}.duration-200{--un-duration:.2s;transition-duration:.2s}.items-start{align-items:flex-start}.items-center{align-items:center}.self-start{align-self:flex-start}.inset-0{inset:calc(var(--spacing) * 0)}.bottom-10{bottom:calc(var(--spacing) * 10)}.bottom-14{bottom:calc(var(--spacing) * 14)}.bottom-2{bottom:calc(var(--spacing) * 2)}.bottom-4{bottom:calc(var(--spacing) * 4)}.bottom-6{bottom:calc(var(--spacing) * 6)}.left-1\\/2{left:50%}.left-2{left:calc(var(--spacing) * 2)}.left-3{left:calc(var(--spacing) * 3)}.left-4{left:calc(var(--spacing) * 4)}.left-8{left:calc(var(--spacing) * 8)}.right-2{right:calc(var(--spacing) * 2)}.right-3{right:calc(var(--spacing) * 3)}.right-4{right:calc(var(--spacing) * 4)}.right-6{right:calc(var(--spacing) * 6)}.right-8{right:calc(var(--spacing) * 8)}.top-1\\/2{top:50%}.top-10{top:calc(var(--spacing) * 10)}.top-2{top:calc(var(--spacing) * 2)}.top-3{top:calc(var(--spacing) * 3)}.top-4{top:calc(var(--spacing) * 4)}.top-6{top:calc(var(--spacing) * 6)}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.z-10{z-index:10}.z-20{z-index:20}.z-50{z-index:50}.overflow-hidden{overflow:hidden}.overflow-x-auto{overflow-x:auto}.overflow-y-auto{overflow-y:auto}.from-accent{--un-gradient-from:color-mix(in oklab, var(--colors-accent-DEFAULT) var(--un-from-opacity), transparent);--un-gradient-stops:var(--un-gradient-via-stops, var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-to) var(--un-gradient-to-position))}.from-green-100{--un-gradient-from:color-mix(in oklab, var(--colors-green-100) var(--un-from-opacity), transparent);--un-gradient-stops:var(--un-gradient-via-stops, var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-to) var(--un-gradient-to-position))}.to-blue-100{--un-gradient-to:color-mix(in oklab, var(--colors-blue-100) var(--un-to-opacity), transparent);--un-gradient-stops:var(--un-gradient-via-stops, var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-to) var(--un-gradient-to-position))}.to-primary{--un-gradient-to:color-mix(in oklab, var(--colors-primary-DEFAULT) var(--un-to-opacity), transparent);--un-gradient-stops:var(--un-gradient-via-stops, var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-to) var(--un-gradient-to-position))}.bg-cover{background-size:cover}.bg-center{background-position:center}.object-cover{object-fit:cover}.line-clamp-1{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.line-clamp-2{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.scroll-mt-20{scroll-margin-top:calc(var(--spacing) * 20)}.space-y-1>:not(:last-child){--un-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 1) * var(--un-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 1) * calc(1 - var(--un-space-y-reverse)))}.space-y-2>:not(:last-child){--un-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 2) * var(--un-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 2) * calc(1 - var(--un-space-y-reverse)))}.space-y-3>:not(:last-child){--un-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 3) * var(--un-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 3) * calc(1 - var(--un-space-y-reverse)))}.space-y-4>:not(:last-child){--un-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 4) * var(--un-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 4) * calc(1 - var(--un-space-y-reverse)))}.space-y-6>:not(:last-child){--un-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 6) * var(--un-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 6) * calc(1 - var(--un-space-y-reverse)))}.divide-black>:not(:last-child){border-color:color-mix(in srgb,var(--colors-black) var(--un-divide-opacity),transparent)}.divide-x-2>:not(:last-child){--un-divide-x-reverse:0;border-left-width:calc(2px * var(--un-divide-x-reverse));border-left-style:var(--un-border-style);border-right-width:calc(2px * calc(1 - var(--un-divide-x-reverse)));border-right-style:var(--un-border-style)}@supports (color: color-mix(in lab,red,red)){.text-black{color:color-mix(in oklab,var(--colors-black) var(--un-text-opacity),transparent)}.text-gray-400{color:color-mix(in oklab,var(--colors-gray-400) var(--un-text-opacity),transparent)}.text-gray-500{color:color-mix(in oklab,var(--colors-gray-500) var(--un-text-opacity),transparent)}.text-gray-600{color:color-mix(in oklab,var(--colors-gray-600) var(--un-text-opacity),transparent)}.text-gray-700{color:color-mix(in oklab,var(--colors-gray-700) var(--un-text-opacity),transparent)}.text-gray-800{color:color-mix(in oklab,var(--colors-gray-800) var(--un-text-opacity),transparent)}.text-green-600{color:color-mix(in oklab,var(--colors-green-600) var(--un-text-opacity),transparent)}.text-green-800{color:color-mix(in oklab,var(--colors-green-800) var(--un-text-opacity),transparent)}.text-pink-700{color:color-mix(in oklab,var(--colors-pink-700) var(--un-text-opacity),transparent)}.text-white{color:color-mix(in oklab,var(--colors-white) var(--un-text-opacity),transparent)}.hover\\:text-black:hover{color:color-mix(in oklab,var(--colors-black) var(--un-text-opacity),transparent)}.hover\\:text-pink-700:hover{color:color-mix(in oklab,var(--colors-pink-700) var(--un-text-opacity),transparent)}.hover\\:text-white:hover{color:color-mix(in oklab,var(--colors-white) var(--un-text-opacity),transparent)}.border-black{border-color:color-mix(in oklab,var(--colors-black) var(--un-border-opacity),transparent)}.border-gray-200{border-color:color-mix(in oklab,var(--colors-gray-200) var(--un-border-opacity),transparent)}.border-gray-300{border-color:color-mix(in oklab,var(--colors-gray-300) var(--un-border-opacity),transparent)}.border-green-800{border-color:color-mix(in oklab,var(--colors-green-800) var(--un-border-opacity),transparent)}.border-white{border-color:color-mix(in oklab,var(--colors-white) var(--un-border-opacity),transparent)}.bg-accent{background-color:color-mix(in oklab,var(--colors-accent-DEFAULT) var(--un-bg-opacity),transparent)}.bg-amber-200{background-color:color-mix(in oklab,var(--colors-amber-200) var(--un-bg-opacity),transparent)}.bg-amber-300{background-color:color-mix(in oklab,var(--colors-amber-300) var(--un-bg-opacity),transparent)}.bg-black{background-color:color-mix(in oklab,var(--colors-black) var(--un-bg-opacity),transparent)}.bg-blue-200{background-color:color-mix(in oklab,var(--colors-blue-200) var(--un-bg-opacity),transparent)}.bg-blue-300{background-color:color-mix(in oklab,var(--colors-blue-300) var(--un-bg-opacity),transparent)}.bg-blue-400{background-color:color-mix(in oklab,var(--colors-blue-400) var(--un-bg-opacity),transparent)}.bg-emerald-200{background-color:color-mix(in oklab,var(--colors-emerald-200) var(--un-bg-opacity),transparent)}.bg-emerald-300{background-color:color-mix(in oklab,var(--colors-emerald-300) var(--un-bg-opacity),transparent)}.bg-gray-100{background-color:color-mix(in oklab,var(--colors-gray-100) var(--un-bg-opacity),transparent)}.bg-gray-200{background-color:color-mix(in oklab,var(--colors-gray-200) var(--un-bg-opacity),transparent)}.bg-gray-400{background-color:color-mix(in oklab,var(--colors-gray-400) var(--un-bg-opacity),transparent)}.bg-gray-50{background-color:color-mix(in oklab,var(--colors-gray-50) var(--un-bg-opacity),transparent)}.bg-green-100{background-color:color-mix(in oklab,var(--colors-green-100) var(--un-bg-opacity),transparent)}.bg-green-200{background-color:color-mix(in oklab,var(--colors-green-200) var(--un-bg-opacity),transparent)}.bg-green-300{background-color:color-mix(in oklab,var(--colors-green-300) var(--un-bg-opacity),transparent)}.bg-green-400{background-color:color-mix(in oklab,var(--colors-green-400) var(--un-bg-opacity),transparent)}.bg-lime-200{background-color:color-mix(in oklab,var(--colors-lime-200) var(--un-bg-opacity),transparent)}.bg-orange-200{background-color:color-mix(in oklab,var(--colors-orange-200) var(--un-bg-opacity),transparent)}.bg-orange-300{background-color:color-mix(in oklab,var(--colors-orange-300) var(--un-bg-opacity),transparent)}.bg-pink-200{background-color:color-mix(in oklab,var(--colors-pink-200) var(--un-bg-opacity),transparent)}.bg-pink-300{background-color:color-mix(in oklab,var(--colors-pink-300) var(--un-bg-opacity),transparent)}.bg-pink-400{background-color:color-mix(in oklab,var(--colors-pink-400) var(--un-bg-opacity),transparent)}.bg-primary{background-color:color-mix(in oklab,var(--colors-primary-DEFAULT) var(--un-bg-opacity),transparent)}.bg-purple-200{background-color:color-mix(in oklab,var(--colors-purple-200) var(--un-bg-opacity),transparent)}.bg-purple-300{background-color:color-mix(in oklab,var(--colors-purple-300) var(--un-bg-opacity),transparent)}.bg-purple-50{background-color:color-mix(in oklab,var(--colors-purple-50) var(--un-bg-opacity),transparent)}.bg-red-300{background-color:color-mix(in oklab,var(--colors-red-300) var(--un-bg-opacity),transparent)}.bg-rose-300{background-color:color-mix(in oklab,var(--colors-rose-300) var(--un-bg-opacity),transparent)}.bg-secondary-lighter{background-color:color-mix(in oklab,var(--colors-secondary-lighter) var(--un-bg-opacity),transparent)}.bg-sky-200{background-color:color-mix(in oklab,var(--colors-sky-200) var(--un-bg-opacity),transparent)}.bg-surface{background-color:color-mix(in oklab,var(--colors-surface-DEFAULT) var(--un-bg-opacity),transparent)}.bg-white{background-color:color-mix(in oklab,var(--colors-white) var(--un-bg-opacity),transparent)}.bg-white\\/10{background-color:color-mix(in oklab,var(--colors-white) 10%,transparent)}.bg-yellow-200{background-color:color-mix(in oklab,var(--colors-yellow-200) var(--un-bg-opacity),transparent)}.bg-yellow-300{background-color:color-mix(in oklab,var(--colors-yellow-300) var(--un-bg-opacity),transparent)}.bg-yellow-50{background-color:color-mix(in oklab,var(--colors-yellow-50) var(--un-bg-opacity),transparent)}.hover\\:bg-accent:hover{background-color:color-mix(in oklab,var(--colors-accent-DEFAULT) var(--un-bg-opacity),transparent)}.hover\\:bg-gray-100:hover{background-color:color-mix(in oklab,var(--colors-gray-100) var(--un-bg-opacity),transparent)}.hover\\:bg-gray-50:hover{background-color:color-mix(in oklab,var(--colors-gray-50) var(--un-bg-opacity),transparent)}.ring-white{--un-ring-color:color-mix(in oklab, var(--colors-white) var(--un-ring-opacity), transparent)}}@media (min-width: 40rem){.sm\\:-mx-6{margin-inline:calc(calc(var(--spacing) * 6) * -1)}.sm\\:mx-0{margin-inline:calc(var(--spacing) * 0)}.sm\\:p-6{padding:calc(var(--spacing) * 6)}.sm\\:px-0{padding-inline:calc(var(--spacing) * 0)}.sm\\:px-6{padding-inline:calc(var(--spacing) * 6)}.sm\\:px-8{padding-inline:calc(var(--spacing) * 8)}.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.sm\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.sm\\:h-80{height:calc(var(--spacing) * 80)}.sm\\:max-w-full{max-width:100%}}@media (min-width: 48rem){.md\\:text-4xl{font-size:var(--text-4xl-fontSize);line-height:var(--un-leading, var(--text-4xl-lineHeight))}.md\\:p-4{padding:calc(var(--spacing) * 4)}.md\\:px-6{padding-inline:calc(var(--spacing) * 6)}.md\\:pb-0{padding-bottom:calc(var(--spacing) * 0)}.md\\:flex{display:flex}.md\\:col-span-2{grid-column:span 2/span 2}.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.md\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.md\\:block{display:block}.md\\:hidden{display:none}.md\\:top-20{top:calc(var(--spacing) * 20)}.md\\:sticky{position:sticky}}@media (min-width: 64rem){.lg\\:p-8{padding:calc(var(--spacing) * 8)}.lg\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}}:root{--font-family: Manrope;--font-icon-family: lucide;--font-normal: 400;--font-medium: 500;--font-semibold: 600;--font-bold: 700;--font-black: 900;--link-color: var(--text-color);--text-color: #1a1a1a;--text-muted: #6b7280;--text-xs: .75rem;--text-sm: .875rem;--text-base: 1rem;--text-lg: 1.125rem;--text-xl: 1.25rem;--text-2xl: 1.5rem;--text-3xl: 1.875rem;--background-color: #faf5f0;--color-primary: #fabd2f;--color-primary-lighter: #fde8a3;--color-primary-light: #fcd875;--color-primary-dark: #d79921;--color-primary-darker: #b57614;--color-secondary: #ec4899;--color-secondary-lighter: #fbcfe8;--color-secondary-light: #f9a8d4;--color-secondary-dark: #db2777;--color-secondary-darker: #be185d;--color-success: #22c55e;--color-success-lighter: #bbf7d0;--color-success-light: #86efac;--color-success-dark: #16a34a;--color-success-darker: #15803d;--color-danger: #ef4444;--color-danger-lighter: #fecaca;--color-danger-light: #fca5a5;--color-danger-dark: #dc2626;--color-danger-darker: #b91c1c;--color-warning: #f97316;--color-warning-lighter: #fed7aa;--color-warning-light: #fdba74;--color-warning-dark: #ea580c;--color-warning-darker: #c2410c;--color-info: #3b82f6;--color-info-lighter: #bfdbfe;--color-info-light: #93c5fd;--color-info-dark: #2563eb;--color-info-darker: #1d4ed8;--color-surface: #ffffff;--color-surface-light: #faf5f0;--color-surface-lighter: #ffffff;--color-surface-dark: #f5f0eb;--color-surface-darker: #ebe5df;--color-hover: #d79921;--color-hover-lighter: hsl(40 73% 69%);--color-hover-light: hsl(40 73% 59%);--color-hover-dark: hsl(40 73% 39%);--color-hover-darker: hsl(40 73% 29%);--color-focus: #fabd2f;--color-focus-lighter: hsl(42 95% 78%);--color-focus-light: hsl(42 95% 68%);--color-focus-dark: hsl(42 95% 48%);--color-focus-darker: hsl(42 95% 38%);--color-inverse: #1a1a1a;--color-inverse-lighter: #525252;--color-inverse-light: #404040;--color-inverse-dark: #0a0a0a;--color-inverse-darker: #000000;--spacing-xs: .25rem;--spacing-sm: .5rem;--spacing-md: .75rem;--spacing-lg: 1rem;--spacing-xl: 1.5rem;--spacing-2xl: 2rem;--spacing-3xl: 3rem;--spacing-4xl: 5rem;--leading-tight: 1.2;--leading-normal: 1.5;--leading-relaxed: 1.75;--radius-none: 0;--radius-sm: .5rem;--radius-md: .75rem;--radius-lg: 1rem;--radius-xl: 1.5rem;--radius-full: 9999px;--shadow-none: none;--shadow-sm: 2px 2px 0px 0px rgba(0,0,0,1);--shadow-md: 4px 4px 0px 0px rgba(0,0,0,1);--shadow-lg: 6px 6px 0px 0px rgba(0,0,0,1);--shadow-xl: 8px 8px 0px 0px rgba(0,0,0,1);--shadow-2xl: 12px 12px 0px 0px rgba(0,0,0,1);--button-border-size: 3px;--button-border-color: black;--button-border-radius: .75rem;--button-shadow: 4px 4px 0px 0px rgba(0,0,0,1);--button-hover-shadow: 2px 2px 0px 0px rgba(0,0,0,1);--button-active-shadow: none;--button-hover-translate-x: -2px;--button-hover-translate-y: -2px;--button-active-translate-x: 2px;--button-active-translate-y: 2px;--button-font-weight: 900;--button-text-transform: uppercase;--input-background: #ffffff;--input-background-focus: #ffffff;--input-background-disabled: #f5f5f5;--input-border-color: #000000;--input-border-width: 3px;--input-border-radius: .75rem;--input-border-focus: #000000;--input-border-error: #ef4444;--input-text: #1a1a1a;--input-placeholder: #9ca3af;--input-icon: #6b7280;--input-shadow: 4px 4px 0px 0px rgba(0,0,0,1);--input-focus-shadow: 6px 6px 0px 0px rgba(0,0,0,1);--checkbox-border-width: 3px;--checkbox-border-color: #000000;--checkbox-border-radius: .375rem;--checkbox-shadow: 3px 3px 0px 0px rgba(0,0,0,1);--checkbox-hover-border-color: #000000;--checkbox-checked-background-color: #fabd2f;--checkbox-checked-border-color: #000000;--checkbox-label-font-weight: 600;--label-font-size: 1rem;--label-font-weight: 700;--label-color: #1a1a1a;--label-letter-spacing: .05em;--label-text-transform: uppercase;--label-margin: .5rem;--tabs-background: #ffffff;--tabs-border-color: #000000;--tabs-border-width: 3px;--tabs-border-radius: .75rem;--tabs-shadow: 4px 4px 0px 0px rgba(0,0,0,1);--tabs-list-background: #f5f5f5;--tabs-list-border-color: #000000;--tabs-tab-padding: 1rem 1.5rem;--tabs-tab-gap: .5rem;--tabs-tab-font-size: .875rem;--tabs-tab-font-weight: 900;--tabs-tab-text-transform: uppercase;--tabs-tab-letter-spacing: .05em;--tabs-tab-color: #6b7280;--tabs-tab-color-hover: #1a1a1a;--tabs-tab-color-active: #1a1a1a;--tabs-tab-background: transparent;--tabs-tab-background-hover: #e5e5e5;--tabs-tab-background-active: #ffffff;--tabs-tab-border-width: 3px;--tabs-tab-border-active: #000000;--card-background: #ffffff;--card-border: #000000;--card-border-width: 3px;--card-border-hover: #000000;--card-text: #1a1a1a;--card-text-muted: #6b7280;--card-header-background: transparent;--card-header-border: #000000;--card-header-padding: .75rem 1rem;--card-footer-background: transparent;--card-footer-border: #000000;--card-footer-border-style: solid;--card-footer-padding: .75rem 1rem;--card-icon-background: #f5f5f5;--card-icon-size: 3rem;--card-icon-border-radius: .75rem;--card-tag-background: #fabd2f;--card-tag-text: #1a1a1a;--card-tag-padding: .25rem .5rem;--card-tag-border-radius: .5rem;--modal-background: #ffffff;--modal-border-width: 3px;--modal-border-color: #000000;--modal-border-radius: 1rem;--modal-shadow: 8px 8px 0px 0px rgba(0,0,0,1);--modal-color: #1a1a1a;--modal-overlay: rgba(0, 0, 0, .5);--modal-header-padding: 1.25rem 1.5rem;--modal-header-border-width: 3px;--modal-header-background: #ffffff;--modal-header-font-size: 1.25rem;--modal-header-font-weight: 900;--modal-header-color: #1a1a1a;--modal-body-padding: 1.5rem;--modal-body-color: #4b5563;--modal-footer-padding: 1rem 1.5rem;--modal-footer-border-width: 3px;--modal-footer-background: #f9fafb;--panel-background: #ffffff;--panel-background-hover: #f5f5f5;--panel-border: #000000;--panel-header-background: transparent;--panel-header-text: #1a1a1a;--panel-header-border: #000000;--dropdown-background: #ffffff;--dropdown-background-hover: #f5f5f5;--dropdown-background-active: #e5e5e5;--dropdown-border: #000000;--dropdown-text: #1a1a1a;--dropdown-text-muted: #6b7280;--dropdown-separator: #e5e5e5;--dropdown-shadow: 4px 4px 0px 0px rgba(0,0,0,1);--badge-default-background: #f5f5f5;--badge-default-text: #1a1a1a;--badge-default-border: #000000;--badge-success-background: #22c55e;--badge-success-text: #ffffff;--badge-success-border: #000000;--badge-danger-background: #ef4444;--badge-danger-text: #ffffff;--badge-danger-border: #000000;--badge-warning-background: #f97316;--badge-warning-text: #ffffff;--badge-warning-border: #000000;--badge-info-background: #3b82f6;--badge-info-text: #ffffff;--badge-info-border: #000000;--list-background: transparent;--list-background-hover: #f5f5f5;--list-background-active: #e5e5e5;--list-background-selected: #fabd2f;--list-border: #000000;--list-border-hover: #000000;--list-text: #1a1a1a;--list-text-muted: #6b7280;--tree-background: transparent;--tree-background-hover: #f5f5f5;--tree-background-selected: #fabd2f;--tree-border: #000000;--tree-indent: 1rem;--tree-icon: #6b7280;--tree-icon-hover: #1a1a1a;--table-border-width: 3px;--table-border-color: #000000;--table-border-radius: 1rem;--table-shadow: 4px 4px 0px 0px rgba(0,0,0,1);--table-header-background: #ffffff;--table-header-color: #1a1a1a;--table-header-font-weight: 900;--table-header-font-size: .75rem;--table-header-text-transform: uppercase;--table-row-background: #ffffff;--table-row-hover-background: #fef3c7;--table-cell-padding: 1rem 1.25rem;--table-cell-font-size: .875rem;--table-cell-color: #4b5563;--pagination-border-width: 3px;--pagination-border-color: #000000;--pagination-border-radius: .75rem;--pagination-background: #ffffff;--pagination-color: #1a1a1a;--pagination-font-weight: 700;--pagination-shadow: 3px 3px 0px 0px rgba(0,0,0,1);--pagination-hover-background: #f5f5f5;--pagination-hover-border-color: #000000;--pagination-hover-shadow: 2px 2px 0px 0px rgba(0,0,0,1);--pagination-hover-transform: translate(-1px, -1px);--pagination-active-background: #fabd2f;--pagination-active-border-color: #000000;--pagination-active-color: #000000;--pagination-active-shadow: 3px 3px 0px 0px rgba(0,0,0,1);--pagination-nav-font-weight: 900;--progress-border-width: 3px;--progress-border-color: #000000;--progress-border-radius: .75rem;--progress-background: #ffffff;--progress-fill-background: var(--color-primary);--progress-shadow: 3px 3px 0px 0px rgba(0,0,0,1);--progress-height: 1.25rem;--progress-height-sm: .75rem;--progress-height-lg: 1.75rem;--breadcrumbs-font-size: .875rem;--breadcrumbs-font-weight: 700;--breadcrumbs-current-font-weight: 900;--breadcrumbs-text-transform: uppercase;--breadcrumbs-letter-spacing: .05em;--breadcrumbs-link-color: #6b7280;--breadcrumbs-link-hover-color: #1a1a1a;--breadcrumbs-current-color: #1a1a1a;--breadcrumbs-separator-color: #9ca3af;--breadcrumbs-gap: .5rem;--sidebar-background: #ffffff;--sidebar-border-width: 3px;--sidebar-border-color: #000000;--sidebar-border-radius: 0;--sidebar-shadow: none;--sidebar-width: 256px;--sidebar-collapsed-width: 80px;--sidebar-header-padding: 1rem;--sidebar-header-background: #ffffff;--sidebar-header-border-width: 3px;--sidebar-header-font-weight: 900;--sidebar-content-padding: .75rem;--sidebar-footer-padding: .75rem;--sidebar-footer-background: #ffffff;--sidebar-footer-border-width: 3px;--sidebar-toggle-background: transparent;--sidebar-toggle-hover-background: #f5f5f5;--sidebar-toggle-border-radius: .5rem;--sidebar-item-padding: .75rem 1rem;--sidebar-item-border-radius: .75rem;--sidebar-item-font-weight: 500;--sidebar-item-color: #4b5563;--sidebar-item-hover-background: #f5f5f5;--sidebar-item-hover-color: #1a1a1a;--sidebar-item-active-background: #000000;--sidebar-item-active-color: #ffffff;--sidebar-item-active-font-weight: 600}:root{--font-family-base: "Manrope", sans-serif}body{font-family:var(--font-family-base)}app-item-modal .uix-modal::part(dialog){background:transparent;border:none;box-shadow:none;padding:1rem;max-width:42rem;width:100%;max-height:90vh;overflow:auto}app-item-modal .uix-modal::part(dialog)::backdrop{background:var(--modal-overlay, rgba(0,0,0,.6));backdrop-filter:blur(4px)}app-item-modal .uix-modal::part(header),app-item-modal .uix-modal::part(footer){display:none}app-item-modal .uix-modal::part(body){padding:0}:where(.uix-link,uix-link){display:inline-flex;align-items:center;justify-content:var(--link-justify-content, center);width:var(--link-width, auto);flex-direction:var(--link-direction, row);gap:var(--link-gap, var(--spacing-xs, .25rem));box-sizing:border-box;font-family:inherit;font-size:var(--link-font-size, var(--text-sm, .875rem));font-weight:var(--link-font-weight, 600);line-height:var(--link-line-height, 1.5);text-decoration:var(--link-text-decoration, none);color:var(--link-color, var(--text-color, inherit));cursor:pointer;&[vertical]::part(anchor){display:flex;flex-direction:column}&::part(anchor){display:inline-flex;align-items:center;justify-content:var(--link-justify-content, left);width:100%;height:100%;gap:var(--link-gap, var(--spacing-xs, .25rem));flex-direction:var(--link-direction, row);padding:var(--link-padding-y, var(--spacing-sm, .5rem)) var(--link-padding-x, var(--spacing-md, .75rem));font-family:inherit;font-size:inherit;font-weight:inherit;line-height:inherit;text-decoration:var(--link-text-decoration, none);color:inherit;cursor:pointer;transition:var( --link-transition, color .2s ease, opacity .2s ease, transform .1s ease );&:hover{color:var(--link-hover-color, var(--link-color));text-decoration:var( --link-hover-text-decoration, var(--link-text-decoration, none) );opacity:var(--link-hover-opacity, .9)}&:active{color:var(--link-active-color, var(--link-color));transform:var(--link-active-transform, scale(.98))}&:focus-visible{outline:2px solid var(--color-primary-dark, #d79921);outline-offset:2px}&:visited{color:var(--link-visited-color, var(--link-color))}&[disabled],&[aria-disabled=true]{opacity:var(--link-disabled-opacity, .5);cursor:not-allowed;pointer-events:none}}&::part(icon){display:inline-flex;align-items:center;justify-content:center;width:var(--link-icon-size, 1.25rem);height:var(--link-icon-size, 1.25rem);color:var(--link-icon-color, currentColor);flex-shrink:0}&[underline]{--link-text-decoration: underline}&[underline=hover]{--link-text-decoration: none;--link-hover-text-decoration: underline}&[variant=primary]{--link-color: var(--color-primary);--link-hover-color: var(--color-primary-dark);--link-active-color: var(--color-primary-darker)}&[variant=secondary]{--link-color: var(--color-secondary);--link-hover-color: var(--color-secondary-dark);--link-active-color: var(--color-secondary-darker)}&[variant=muted]{--link-color: var(--text-muted);--link-hover-color: var(--text-color)}&[size=xs]{--link-font-size: var(--text-xs, .75rem);--link-padding-y: .2rem;--link-padding-x: .4rem;--link-gap: .125rem;--link-icon-size: .75em}&[size=sm]{--link-font-size: var(--text-sm, .875rem);--link-padding-y: .25rem;--link-padding-x: .5rem;--link-gap: .25rem;--link-icon-size: .875em}&[size=md]{--link-font-size: var(--text-base, 1rem);--link-padding-y: .5rem;--link-padding-x: .75rem;--link-gap: .375rem;--link-icon-size: 1em}&[size=lg]{--link-font-size: var(--text-lg, 1.125rem);--link-padding-y: .75rem;--link-padding-x: 1rem;--link-gap: .5rem;--link-icon-size: 1.125em}&[size=xl]{--link-font-size: var(--text-xl, 1.25rem);--link-padding-y: 1rem;--link-padding-x: 1.25rem;--link-gap: .625rem;--link-icon-size: 1.25em}&[compact]{--link-padding-x: 0;--link-padding-y: 0}&[w-full],&[wfull]{width:100%;display:flex}}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}.scrollbar-hide::-webkit-scrollbar{display:none}:where(.uix-icon,uix-icon){display:inline-block;vertical-align:middle;--icon-size: calc(var(--spacing, .25rem) * 4);width:var(--icon-size);height:var(--icon-size);svg{height:inherit;width:inherit}&[solid]{stroke:currentColor;fill:currentColor}&[color=primary]{color:var(--color-primary)}&[color=secondary]{color:var(--color-secondary)}&[color=success]{color:var(--color-success)}&[color=danger]{color:var(--color-danger)}&[color=warning]{color:var(--color-warning)}&[color=info]{color:var(--color-info)}&[color=inverse]{color:var(--color-inverse)}&[size=xs]{--icon-size: calc(var(--spacing, .25rem) * 3)}&[size=sm]{--icon-size: calc(var(--spacing, .25rem) * 4)}&[size=md]{--icon-size: calc(var(--spacing, .25rem) * 6)}&[size=lg]{--icon-size: calc(var(--spacing, .25rem) * 8)}&[size=xl]{--icon-size: calc(var(--spacing, .25rem) * 10)}&[size="2xl"]{--icon-size: calc(var(--spacing, .25rem) * 14)}&[size="3xl"]{--icon-size: calc(var(--spacing, .25rem) * 20)}&[size="4xl"]{--icon-size: calc(var(--spacing, .25rem) * 30)}}:where(.uix-spinner,uix-spinner){display:inline-flex;align-items:center;justify-content:center;--spinner-color: var(--color-primary);--spinner-size: 2rem;width:var(--spinner-size);height:var(--spinner-size);position:relative;&[primary]{--spinner-color: var(--color-primary)}&[secondary]{--spinner-color: var(--color-secondary)}&[success]{--spinner-color: var(--color-success)}&[danger]{--spinner-color: var(--color-danger)}&[warning]{--spinner-color: var(--color-warning)}&[info]{--spinner-color: var(--color-info)}&[size=xs]{--spinner-size: 1rem}&[size=sm]{--spinner-size: 1.5rem}&[size=md]{--spinner-size: 2rem}&[size=lg]{--spinner-size: 3rem}&[size=xl]{--spinner-size: 4rem}&[variant=circular]:before{content:"";display:block;width:100%;height:100%;border:calc(var(--spinner-size) / 8) solid var(--color-surface-darker);border-top-color:var(--spinner-color);border-radius:50%;animation:spinner-circular .8s linear infinite}&[variant=dots]{gap:calc(var(--spinner-size) / 6)}&[variant=dots] .dot{display:block;width:calc(var(--spinner-size) / 4);height:calc(var(--spinner-size) / 4);background-color:var(--spinner-color);border-radius:50%;animation:spinner-dots 1.4s ease-in-out infinite}&[variant=dots] .dot:nth-child(1){animation-delay:-.32s}&[variant=dots] .dot:nth-child(2){animation-delay:-.16s}&[variant=dots] .dot:nth-child(3){animation-delay:0s}&[variant=bars]{gap:calc(var(--spinner-size) / 8)}&[variant=bars] .bar{display:block;width:calc(var(--spinner-size) / 6);height:100%;background-color:var(--spinner-color);border-radius:calc(var(--spinner-size) / 12);animation:spinner-bars 1.2s ease-in-out infinite}&[variant=bars] .bar:nth-child(1){animation-delay:-.24s}&[variant=bars] .bar:nth-child(2){animation-delay:-.12s}&[variant=bars] .bar:nth-child(3){animation-delay:0s}}@keyframes spinner-circular{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes spinner-dots{0%,80%,to{opacity:.3;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}@keyframes spinner-bars{0%,40%,to{transform:scaleY(.4);opacity:.5}20%{transform:scaleY(1);opacity:1}}.meetup-card-compact.uix-card{cursor:pointer;height:100%;background:#fff;border-color:var(--card-border-color, black);border-radius:1rem}.meetup-card-compact.uix-card>[slot=header]{border-bottom:3px solid var(--card-border-color, black);padding:0}.meetup-card-compact.uix-card>[slot=footer]{justify-content:stretch}.meetup-card-compact.uix-card>[slot=footer]>button{width:100%}uix-modal::part(dialog){border:4px solid black;border-radius:1.5rem;box-shadow:8px 8px #ffffff80;max-width:28rem;padding:0;overflow:hidden}uix-modal::part(header){background:var(--color-primary);color:#000;border-bottom:3px solid black;padding:1.5rem}uix-modal::part(body){padding:0}:where(.uix-calendar,uix-calendar){display:block;--calendar-border-width: 2px;--calendar-border-color: black;--calendar-border-radius: .75rem;--calendar-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);--calendar-shadow-sm: 2px 2px 0px 0px rgba(0, 0, 0, 1);--calendar-today-bg: #fef3c7;--calendar-today-border: #eab308;--calendar-selected-bg: var(--color-accent, #f472b6);--calendar-font-family: inherit;&::part(view-toggle){display:flex;gap:.5rem;margin-bottom:1rem}&::part(toggle-btn){flex:1;padding:.5rem 1rem;font-weight:900;font-size:.875rem;text-transform:uppercase;border:3px solid var(--calendar-border-color);border-radius:var(--calendar-border-radius);background:#fff;box-shadow:3px 3px #000;cursor:pointer;transition:all .15s ease;&:active{transform:translate(2px,2px);box-shadow:1px 1px #000}}&::part(toggle-btn-active){background:var(--calendar-selected-bg)}&::part(header){display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem}&::part(nav-btn){width:2.5rem;height:2.5rem;display:flex;align-items:center;justify-content:center;background:#fff;border:3px solid var(--calendar-border-color);border-radius:.5rem;box-shadow:var(--calendar-shadow);cursor:pointer;transition:all .15s ease;&:active{transform:translate(2px,2px);box-shadow:var(--calendar-shadow-sm)}}&::part(month-label){font-size:1.125rem;font-weight:900;text-transform:uppercase}&::part(today-btn){width:100%;margin-bottom:1rem;padding:.5rem 1rem;background:#f9a8d4;border:3px solid var(--calendar-border-color);border-radius:var(--calendar-border-radius);font-weight:900;font-size:.875rem;text-transform:uppercase;box-shadow:var(--calendar-shadow);cursor:pointer;transition:all .15s ease;&:active{transform:translate(2px,2px);box-shadow:var(--calendar-shadow-sm)}}&::part(grid){background:#fff;border:3px solid var(--calendar-border-color);border-radius:var(--calendar-border-radius);padding:.75rem;box-shadow:6px 6px #000}&::part(weekday-header){display:grid;grid-template-columns:repeat(7,1fr);gap:.25rem;margin-bottom:.5rem}&::part(weekday){text-align:center;font-weight:900;font-size:.75rem;color:#4b5563}&::part(days-grid){display:grid;grid-template-columns:repeat(7,1fr);gap:.25rem}&::part(day){aspect-ratio:1;position:relative;display:flex;flex-direction:column;align-items:flex-start;padding:.25rem;border-radius:.5rem;border:2px solid #d1d5db;cursor:pointer;overflow:hidden;transition:all .15s ease;&:active{transform:translate(1px,1px)}}&::part(day-today){background:var(--calendar-today-bg);border-color:var(--calendar-today-border);border-width:3px}&::part(day-selected){background:var(--calendar-selected-bg);border-color:var(--calendar-border-color);border-width:3px;box-shadow:var(--calendar-shadow-sm)}&::part(day-other-month){opacity:.4}&::part(day-number){font-size:.75rem;font-weight:700;margin-bottom:.125rem}&::part(day-events){width:100%;display:flex;flex-direction:column;gap:.125rem}&::part(event){font-size:9px;line-height:1.1;font-weight:700;padding:.125rem .25rem;border-radius:.25rem;border:1px solid var(--calendar-border-color);background:#e0e7ff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}&::part(more-events){font-size:8px;font-weight:700;color:#4b5563;padding:0 .25rem}&::part(list){display:flex;flex-direction:column;gap:1.5rem}&::part(list-section-title){font-size:.875rem;font-weight:900;text-transform:uppercase;color:#4b5563;margin-bottom:.75rem}&::part(list-item){display:flex;gap:1rem;background:#fff;border:3px solid var(--calendar-border-color);border-radius:var(--calendar-border-radius);padding:1rem;box-shadow:var(--calendar-shadow);cursor:pointer;transition:all .15s ease;&:hover{transform:translate(2px,2px);box-shadow:var(--calendar-shadow-sm)}}&::part(list-item-image){width:5rem;height:5rem;object-fit:cover;border-radius:.5rem;border:2px solid var(--calendar-border-color)}&::part(list-item-title){font-weight:900;font-size:.875rem;line-height:1.25}&::part(list-item-meta){font-size:.75rem;color:#4b5563;margin-top:.25rem}&::part(recurring-badge){flex-shrink:0;font-size:.75rem;font-weight:700;background:#ddd6fe;border:1px solid var(--calendar-border-color);padding:.125rem .5rem;border-radius:.25rem}&::part(panel-overlay){position:fixed;inset:0;background:#00000080;z-index:40}&::part(panel){position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:3px solid var(--calendar-border-color);border-radius:1rem 1rem 0 0;z-index:50;max-height:70vh;overflow-y:auto}&::part(panel-header){position:sticky;top:0;background:#fff;border-bottom:2px solid var(--calendar-border-color);padding:1rem 1.5rem;display:flex;align-items:center;justify-content:space-between}&::part(panel-title){font-weight:900;font-size:1.125rem}&::part(panel-close){width:2rem;height:2rem;display:flex;align-items:center;justify-content:center;border:2px solid var(--calendar-border-color);border-radius:.5rem;background:#fff;cursor:pointer;&:hover{background:#f3f4f6}}&::part(panel-content){padding:1rem 1.5rem;display:flex;flex-direction:column;gap:.75rem}&::part(panel-item){display:flex;gap:.75rem;background:#f9fafb;border:2px solid var(--calendar-border-color);border-radius:var(--calendar-border-radius);padding:.75rem;cursor:pointer;box-shadow:3px 3px #000;transition:all .15s ease;&:hover{transform:translate(2px,2px);box-shadow:none}}&::part(panel-item-image){width:4rem;height:4rem;object-fit:cover;border-radius:.5rem;border:2px solid var(--calendar-border-color)}&::part(panel-item-title){font-weight:700;font-size:.875rem;line-height:1.25}&::part(panel-item-meta){font-size:.75rem;color:#4b5563;margin-top:.25rem}&::part(panel-empty){text-align:center;font-size:.875rem;font-weight:700;color:#9ca3af;padding:2rem 0}&::part(empty){display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5rem 0;.empty-icon{font-size:3.75rem;margin-bottom:1rem}.empty-text{font-size:1.125rem;font-weight:700;color:#9ca3af}}}:where(.uix-container,uix-container){display:block;box-sizing:border-box;background:var(--container-background, var(--color-surface-lighter));border:1px solid var(--container-border-color, var(--color-surface-dark));border-radius:var(--container-border-radius, var(--radius-md, .375rem));overflow:var(--container-overflow, visible);&[padding=none]{padding:0}&[padding=sm]{padding:var(--spacing-sm, .5rem)}&[padding=md]{padding:var(--spacing-md, .75rem) var(--spacing-lg, 1rem)}&[padding=lg]{padding:var(--spacing-lg, 1rem) var(--spacing-xl, 1.5rem)}&[overflow=visible]{--container-overflow: visible}&[overflow=hidden]{--container-overflow: hidden}&[overflow=auto]{--container-overflow: auto}&[overflow=scroll]{--container-overflow: scroll}&[variant=default]{--container-background: inherit;--container-border-color: var(--color-surface-dark)}&[variant=filled]{--container-background: var(--color-surface-light);--container-border-color: var(--color-surface)}&[variant=outlined]{--container-background: transparent;--container-border-color: var(--color-surface)}&[variant=elevated]{--container-background: var(--color-surface-lighter);--container-border-color: var(--color-surface-dark);box-shadow:0 1px 3px #0000001f,0 1px 2px #0000003d;&:hover{box-shadow:0 3px 6px #00000029,0 3px 6px #0000003b;transition:box-shadow .3s ease}}}:where(.uix-card,uix-card){display:flex;flex-direction:column;overflow:hidden;background:var(--card-background, inherit);&::part(body){display:flex;flex-direction:column;flex:1}>[slot=header]{margin:0;display:flex;padding:var( --card-header-padding, var(--spacing-md, .75rem) var(--spacing-lg, 1rem) );border-bottom-width:var(--card-header-border-width, 0);border-bottom-style:solid;border-bottom-color:var( --card-header-border-color, var(--card-border-primary, #504945) );background:var(--card-header-background-color, transparent)}>[slot=footer]{display:flex;padding:var( --card-footer-padding, var(--spacing-md, .75rem) var(--spacing-lg, 1rem) );border-top-width:var(--card-footer-border-width, 0);border-top-style:var(--card-footer-border-style, solid);border-top-color:var( --card-footer-border-color, var(--color-surface, #504945) );background:var(--card-footer-background-color, transparent);flex-direction:row;gap:var(--spacing-sm, .5rem);align-items:center;justify-content:flex-end}&[style*=--card-gradient-from]::part(body){background:linear-gradient(135deg,var(--card-gradient-from),var(--card-gradient-to, var(--card-gradient-from)))}&[padding=none]::part(body){padding:0}&[padding=sm]::part(body){padding:var(--spacing-sm, .5rem)}&[padding=md]::part(body){padding:var(--spacing-md, .75rem) var(--spacing-lg, 1rem)}&[padding=lg]::part(body){padding:var(--spacing-lg, 1rem) var(--spacing-xl, 1.5rem)}&[borderWidth=none]{border-width:0}&[borderWidth="1"]{border-width:1px}&[borderWidth="2"]{border-width:2px}&[borderWidth="3"]{border-width:3px}&[borderStyle=solid]{border-style:solid}&[borderStyle=dashed]{border-style:dashed}&[borderStyle=dotted]{border-style:dotted}&[gap=none]::part(body){gap:0}&[gap=xs]::part(body){gap:var(--spacing-xs, .25rem)}&[gap=sm]::part(body){gap:var(--spacing-sm, .5rem)}&[gap=md]::part(body){gap:var(--spacing-md, .75rem)}&[gap=lg]::part(body){gap:var(--spacing-lg, 1rem)}&[gap=xl]::part(body){gap:var(--spacing-xl, 1.5rem)}&[shadow=sm]{box-shadow:var(--shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, .05))}&[shadow=md]{box-shadow:var( --shadow-md, 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06) )}&[shadow=lg]{box-shadow:var( --shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05) )}&[hover]{transition:all .2s ease;cursor:pointer;&:hover{border-color:var(--card-border-hover, #83a598)}&[shadow=sm]:hover{box-shadow:var( --shadow-md, 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06) )}&[shadow=md]:hover{box-shadow:var( --shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05) )}&[shadow=lg]:hover{box-shadow:var( --shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, .1), 0 10px 10px -5px rgba(0, 0, 0, .04) )}}}
`,mimeType:"text/css"}},BUNDLE_ADMIN=!1;self.addEventListener("install",e=>{console.log("SW: Installing new version...")}),self.addEventListener("activate",e=>{console.log("SW: Activated"),e.waitUntil(self.clients.claim())}),self.addEventListener("message",e=>{e.data?.type==="SKIP_WAITING"&&(console.log("SW: Skip waiting requested, activating..."),self.skipWaiting())}),self.addEventListener("fetch",e=>{let n=new URL(e.request.url).pathname;n.startsWith("/npm/")&&(n="/"+n.slice(5));const t=FILE_BUNDLE[n];if(t){e.respondWith(new Response(t.content,{headers:{"Content-Type":t.mimeType||"application/javascript"}}));return}if(!(n.includes(".")&&!n.endsWith("/"))&&e.request.mode==="navigate"){if(BUNDLE_ADMIN&&n.startsWith("/admin")){const a=FILE_BUNDLE["/admin/index.html"];if(a){e.respondWith(new Response(a.content,{headers:{"Content-Type":"text/html"}}));return}}const r=FILE_BUNDLE["/index.html"];if(r){e.respondWith(new Response(r.content,{headers:{"Content-Type":"text/html"}}));return}}});
