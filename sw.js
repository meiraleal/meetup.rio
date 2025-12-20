const FILE_BUNDLE={"/node_modules/@bootstrapp/uix/feedback/circular-progress.js":{content:`import s from"/$app/types/index.js";import{html as a}from"/npm/lit-html";export default{tag:"uix-circular-progress",properties:{value:s.number({defaultValue:0}),size:s.string({defaultValue:"md",enum:["xs","sm","md","lg","xl"]}),variant:s.string({defaultValue:"primary",enum:["primary","secondary","success","warning","error"]}),thickness:s.number({defaultValue:4}),indeterminate:s.boolean(!1),showValue:s.boolean(!1)},style:!0,_getSizeValue(){const e={xs:24,sm:32,md:48,lg:64,xl:96};return e[this.size]||e.md},render(){const e=this._getSizeValue(),r=e/2,t=r-this.thickness/2,i=2*Math.PI*t,c=i-this.value/100*i;return a\`
      <div class="circular-progress \${this.indeterminate?"indeterminate":""}">
        <svg
          class="circular-progress-svg"
          width="\${e}"
          height="\${e}"
          viewBox="0 0 \${e} \${e}"
        >
          <!-- Background circle -->
          <circle
            class="circular-progress-track"
            cx="\${r}"
            cy="\${r}"
            r="\${t}"
            fill="none"
            stroke-width="\${this.thickness}"
          ></circle>

          <!-- Progress circle -->
          <circle
            class="circular-progress-indicator circular-progress-\${this.variant}"
            cx="\${r}"
            cy="\${r}"
            r="\${t}"
            fill="none"
            stroke-width="\${this.thickness}"
            stroke-dasharray="\${i}"
            stroke-dashoffset="\${this.indeterminate?i*.75:c}"
            stroke-linecap="round"
            transform="rotate(-90 \${r} \${r})"
          ></circle>
        </svg>

        \${this.showValue&&!this.indeterminate?a\`
              <div class="circular-progress-label">
                <span>\${Math.round(this.value)}%</span>
              </div>
            \`:""}
      </div>
    \`}};
`,mimeType:"text/javascript"},"/$app/bundler/iframe-builder.js":{content:'const f=6e4,h=500;export function createBuildIframe(){return new Promise((c,t)=>{const e=document.createElement("iframe");e.style.cssText=`\n      position: absolute;\n      width: 1px;\n      height: 1px;\n      left: -9999px;\n      visibility: hidden;\n    `,e.src="/";const o=()=>{e.parentNode&&e.parentNode.removeChild(e)},n=setTimeout(()=>{o(),t(new Error("Iframe build timed out"))},6e4);e.onload=()=>{clearTimeout(n),c({iframe:e,cleanup:o})},e.onerror=r=>{clearTimeout(n),o(),t(r)},document.body.appendChild(e)})}export async function navigateIframeRoutes(c,t){const e=c.contentWindow,o=e.$APP?.Router;if(!o)throw new Error("Iframe $APP.Router not available");const n=new Set,r=["/"],a=[];let s=0;for(;r.length>0;){const i=r.pop();if(!n.has(i)){n.add(i),s++,t&&t({current:s,route:i});try{o.go(i),await new Promise(u=>setTimeout(u,500)),a.push(d(e,i));const l=e.document.querySelectorAll(\'[href^="/"]\');for(const u of l){const m=u.getAttribute("href");!n.has(m)&&!r.includes(m)&&r.push(m)}}catch(l){console.error(`Error processing route ${i}:`,l)}}}return t&&t({current:s,route:"Complete"}),a}function d(c,t){const e=c.document,o=c.$APP?.Router?.currentRoute?.route?.ssg||!1,n=e.querySelector("title")?.outerHTML||`<title>${c.$APP?.settings?.name||"App"}</title>`,r=Array.from(e.querySelectorAll("head meta[name], head meta[property]")).map(i=>i.outerHTML).join(`\n`),a=e.querySelector(\'head link[rel="canonical"]\')?.outerHTML||"";return{path:t==="/"?"index.html":`${t.slice(1)}/index.html`,content:e.body.innerHTML,headContent:`${n}\n${r}\n${a}`,ssg:o}}\n',mimeType:"text/javascript"},"/node_modules/@bootstrapp/uix/feedback/circular-progress.css":{content:`:where(.uix-circular-progress,uix-circular-progress){display:inline-flex;align-items:center;justify-content:center;position:relative;.indeterminate .circular-progress-indicator{animation:circularProgressSpin 1.4s linear infinite}.circular-progress-svg{transform:rotate(-90deg)}.circular-progress-track{stroke:var(--circular-progress-track-color, var(--color-surface-darker))}.circular-progress-indicator{stroke:var(--circular-progress-color, var(--color-primary));transition:stroke-dashoffset .3s ease}.circular-progress-primary{stroke:var(--color-primary)}.circular-progress-secondary{stroke:var(--color-secondary)}.circular-progress-success{stroke:var(--color-success)}.circular-progress-warning{stroke:var(--color-warning)}.circular-progress-error{stroke:var(--color-danger)}.circular-progress-label{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:var(--circular-progress-label-font-size, .75rem);font-weight:600;color:var(--circular-progress-label-color, var(--color-primary))}&[size=xs]{--circular-progress-label-font-size: .625rem}&[size=sm]{--circular-progress-label-font-size: .75rem}&[size=md]{--circular-progress-label-font-size: .875rem}&[size=lg]{--circular-progress-label-font-size: 1rem}&[size=xl]{--circular-progress-label-font-size: 1.25rem}}@keyframes circularProgressSpin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}
`,mimeType:"text/css"},"/$app/base/bootstrapp.js":{content:'import o from"/$app/base/config.js";import t from"/$app.js";try{if(!("serviceWorker"in navigator))throw new Error("Platform not supported");const r=await navigator.serviceWorker.register("/backend.js",{type:"module"});await Promise.race([new Promise(e=>{if(navigator.serviceWorker.controller)return e();navigator.serviceWorker.addEventListener("controllerchange",()=>e())}),new Promise((e,i)=>setTimeout(()=>i(new Error("Service Worker timed out.")),o.serviceWorker.initTimeout))]),sessionStorage.removeItem("_sw"),await t.load(),t.SW?.setRegistration&&t.SW.setRegistration(r)}catch(r){console.error("Service Worker initialization error:",r);const e=Number.parseInt(sessionStorage.getItem("_sw")||"0",10);e<o.serviceWorker.maxRetries?(sessionStorage.setItem("_sw",String(e+1)),console.warn(`Retrying Service Worker initialization (attempt ${e+1}/${o.serviceWorker.maxRetries})`),window.location.reload()):(sessionStorage.removeItem("_sw"),console.error(`Could not start ServiceWorker after ${o.serviceWorker.maxRetries} attempts`))}if(t.settings.dev)try{const r=window.location.port,e=o.devServer.getWsPort(r),i=`${window.location.protocol==="https:"?"wss":"ws"}://${window.location.hostname}:${e}`;new WebSocket(i).addEventListener("message",s=>{s.data==="APP:REFRESH"&&(console.log("Received refresh request from dev server"),window.location.reload())})}catch(r){console.warn("WebSocket connection to dev server failed:",r)}\n',mimeType:"text/javascript"},"/$app/base/frontend.js":{content:'import o from"/$app.js";import{html as a}from"/npm/lit-html";import"/$app/base/apploader.js";import r from"/$app/controller/index.js";import{initSWFrontend as l}from"/$app/sw/frontend.js";import n from"/$app/types/index.js";import e,{settings as i}from"/$app/view/index.js";import p from"/$app/view/loader.js";if(!window.__COMPONENT_MAP__){const{loadComponentMappings:t}=await import("/$app/view/component-discovery.js"),m=await t();p.initMappings(m)}l(o);import s from"/$app/base/backend/frontend.js";import d,{registerModelType as f}from"/$app/controller/app.js";import{initModelFrontend as c}from"/$app/model/frontend.js";import{ModelType as u}from"/$app/model/index.js";import h from"/$app/router/app.js";import g from"/$app/router/index.js";import"/$app/base/app/index.js";c(o);import"/frontend.js";i.iconFontFamily=`/$app/icon-${o.theme.font.icon.family}/${o.theme.font.icon.family}`,r.add("backend",s),f(u),d(o,r,e),h(o,g,r),o.events.on("APP:INIT",()=>{e.components.has("app-container")||o.define("app-container",{tag:"app-container",class:"flex flex-grow",extends:"router-ui",properties:{routes:n.object({defaultValue:o.routes}),full:n.boolean(!0)}})});const y=t=>e.components.get(t)?.path||p.resolvePath(t);e.getComponentPath=y,i.loadStyle=!o.settings.production,e.reloadComponents=!!o.settings.preview,i.loadStyle&&import("/$app/theme/dev.js"),e.plugins.push({name:"hydrate",willUpdate:({instance:t})=>{o.settings.production&&!t.hasUpdated&&t.hasAttribute("client:hydrate")&&(t.innerHTML="",t.removeAttribute("client:hydrate"))}}),o.routes["/"]||o.routes.set({"/":{name:"index",component:()=>a`<app-index></app-index>`}});\n',mimeType:"text/javascript"},"/$app/base/apploader.js":{content:`import i from"/$app/view/index.js";import t from"/$app/view/loader.js";import e from"/$app.js";e.View=i;const o=()=>{t.configure({basePath:e.settings.basePath||"/",modules:e.modules||{},dev:e.settings.dev||!1}),t.initDOM()};e.events.on("APP:READY",o),e.events.set({moduleAdded({module:d}){t.addModule(d)}}),e.define=t.define;
`,mimeType:"text/javascript"},"/$app/controller/index.js":{content:'import l from"./adapters/storage.js";import p from"./adapters/url.js";import{createController as i}from"./core.js";import*as e from"./sync.js";import{createSync as y}from"./sync-factory.js";const S={...l,...p},n=i(S);n.createSync=y,n.registerSyncType=e.registerSyncType,n.getSyncInfo=e.getSyncInfo,n.initUrlSync=()=>{n._urlSyncInitialized||(n._urlSyncInitialized=!0,window.addEventListener("popstate",()=>{e.syncUrl(n.querystring),e.syncUrl(n.hash)}))},n.installViewPlugin=(d,o={})=>{d.plugins.push({name:"syncProps",test:({component:t})=>Object.values(t.properties||{}).some(c=>c.sync),events:{disconnected:({instance:t})=>{e.cleanupSyncBindings(t,n)},connected:({instance:t,component:c})=>{Object.entries(c.properties).filter(([,r])=>r.sync).forEach(([r,a])=>{const s=e.getSyncInfo(a.sync);if(!s)return console.error(`Missing sync object for \'${r}\'`);s.syncObj?e.bindCustomSync({instance:t,key:r,prop:a,syncObj:s.syncObj,onAsyncLoad:o.onAsyncLoad&&e.needsAsyncLoad(s.syncObj)?o.onAsyncLoad:null}):e.bindAdapterSync({instance:t,key:r,prop:a,adapterName:s.adapter,Controller:n,onBroadcast:o.onBroadcast})})},willUpdate:({instance:t,component:c,changedProps:r})=>{e.checkDependsOn(t,c,r)}}})};export default n;export{i as createController,y as createSync};export{bindAdapterSync,bindCustomSync,checkDependsOn,cleanupSyncBindings,getScopedKey,getSyncInfo,needsAsyncLoad,registerSyncType,syncUrl,updateState}from"./sync.js";\n',mimeType:"text/javascript"},"/$app/sw/frontend.js":{content:'let a;const r={};let I=1,l=null,i=null,v=null,c=null,W=!1;const k=async(e={})=>{const{data:n}=e,{eventId:t,type:o,payload:u}=n;if(t&&r[t]){try{r[t].resolve(u)}catch(f){r[t].reject(new Error(f))}finally{delete r[t]}return}const s=a.swEvents.get(o);s&&await s({payload:u})},b=(e,n)=>{if(!navigator.serviceWorker?.controller){console.warn("SW: No active service worker controller");return}navigator.serviceWorker.controller.postMessage({type:e,payload:n})},g=(e,n,t=3e4)=>{if(!navigator.serviceWorker?.controller)return Promise.reject(new Error("No active service worker controller"));const o=`sw-request-${I++}`;return new Promise((u,s)=>{r[o]={resolve:u,reject:s};const f=setTimeout(()=>{r[o]&&(delete r[o],s(new Error(`SW request timed out after ${t}ms: ${e}`)))},t),h=r[o].resolve;r[o].resolve=C=>{clearTimeout(f),h(C)},navigator.serviceWorker.controller.postMessage({type:e,payload:n,eventId:o})})},d=async()=>{if(!l)return!1;try{return await l.update(),!0}catch(e){return console.warn("SW: Update check failed:",e),!1}},w=e=>{i!==e&&(console.log("SW: Update available! Emitting SW:UPDATE_AVAILABLE event"),i=e,a?.events?.emit("SW:UPDATE_AVAILABLE",{worker:e}))},p=e=>{if(console.log("SW: handleNewWorker called, state:",e.state,"hasController:",!!navigator.serviceWorker.controller),e.state==="installed"&&navigator.serviceWorker.controller){w(e);return}e.addEventListener("statechange",()=>{console.log("SW: Worker state changed to:",e.state),e.state==="installed"&&navigator.serviceWorker.controller&&w(e)},{once:!0})},m=(e=1e4)=>{if(!i)return console.warn("SW: No waiting worker to activate"),!1;if(W)return console.warn("SW: Update already in progress"),!1;W=!0,i.postMessage({type:"SKIP_WAITING"});const n=setTimeout(()=>{console.error("SW: Update timed out, reload manually"),W=!1},e);return navigator.serviceWorker.addEventListener("controllerchange",()=>{clearTimeout(n),window.location.reload()},{once:!0}),!0},A=(e={})=>{const{onPageLoad:n=!0,pollingInterval:t=0,onVisibilityChange:o=!1}=e;if(!l){console.warn("SW: Cannot enable auto updates - no registration");return}S(),n&&d(),t>0&&(v=setInterval(d,t)),o&&(c=()=>{document.visibilityState==="visible"&&d()},document.addEventListener("visibilitychange",c))},S=()=>{v&&(clearInterval(v),v=null),c&&(document.removeEventListener("visibilitychange",c),c=null)},E=e=>{l=e,e.addEventListener("updatefound",()=>{const n=e.installing;console.log("SW: Update found, new worker installing..."),n&&p(n)}),e.waiting&&(console.log("SW: Found waiting worker on registration"),p(e.waiting)),e.installing&&(console.log("SW: Found installing worker on registration"),p(e.installing))},L=()=>!!i,y=()=>l;export function initSWFrontend(e){a=e,navigator.serviceWorker&&(navigator.serviceWorker.onmessage=k),a.addModule({name:"swEvents",base:new Map([["SW:SYNC_PROPS",({payload:t})=>{t?.property&&t?.value!==void 0&&a.events.emit(`SYNC:${t.property}`,t.value)}],["SW:QUERY_SYNC",({payload:t})=>{a.events.emit("SYNC:QUERY",t)}]])});const n={postMessage:b,request:g,setRegistration:E,enableAutoUpdates:A,disableAutoUpdates:S,checkForUpdates:d,applyUpdate:m,hasUpdate:L,getRegistration:y,enableLocalCaching:()=>g("SW:ENABLE_LOCAL_CACHING"),disableLocalCaching:()=>g("SW:DISABLE_LOCAL_CACHING"),clearLocalCache:()=>g("SW:CLEAR_LOCAL_CACHE")};return a.addModule({name:"sw",alias:"SW",base:n,path:"/$app/sw/views"}),n}export{E as setRegistration,A as enableAutoUpdates,S as disableAutoUpdates,d as checkForUpdates,m as applyUpdate,L as hasUpdate};export default{initSWFrontend};\n',mimeType:"text/javascript"},"/$app/view/index.js":{content:'import j from"/$app/types/index.js";import{render as x}from"/npm/lit-html";const U=["__proto__","constructor","prototype"],I=new Set(["properties","icons","static","formAssociated","dataQuery","style","css","connected","disconnected","shadow","willUpdate","firstUpdated","updated","dataLoaded","class","role","tag"]);export const settings={};class f extends HTMLElement{static properties={};static components=new Map;static _attrs={};static plugins=[];static shadowStylesInjected=new WeakMap;state={};hasUpdated=!1;_ignoreAttributeChange=!1;_changedProps=new Map;_updatePromise=null;static createClass(t,e,s){if(s||=f,typeof e=="function"){const o=e;e={properties:o.properties||{},render(){return o.call(this,this)}}}const{properties:i={},icons:a,static:c,formAssociated:u=!1,dataQuery:d=!1,style:g=!1,css:A,connected:E,disconnected:C,shadow:S,willUpdate:v,firstUpdated:L,updated:k,dataLoaded:T,class:m,role:y}=e,b={};for(const o of Object.keys(e)){if(I.has(o)||U.includes(o))continue;const r=Object.getOwnPropertyDescriptor(e,o);Object.defineProperty(b,o,r)}const q=Object.keys(b),w=new Map;[...f.plugins,...s.plugins].forEach(o=>{w.set(o.name,o)});const M=[...w.values()],n=class extends s{static icons=a;static style=g;static css=A;static dataQuery=d;static formAssociated=u;static shadow=S??s.shadow;static plugins=M;static _classTags=(()=>{const o=[];let r=s;for(;r?.tag;)o.unshift(r.tag),r=Object.getPrototypeOf(r);return o.push(t),o})();constructor(){super(),q.forEach(o=>{typeof this[o]=="function"&&(this[o]=this[o].bind(this))}),m&&this.classList.add(...m.split(" ")),y&&this.setAttribute("role",y)}static get observedAttributes(){return Object.keys(n.properties).filter(o=>n.properties[o].attribute!==!1)}static properties=(()=>{const r={...s.properties||{}};for(const p of Object.keys(i)){if(U.includes(p))continue;const h=i[p];h.type==="object"&&h.properties&&(h.properties=r[p]?.properties?{...r[p]?.properties,...h.properties}:h.properties),r[p]=r[p]?{...r[p],...h}:{...h}}return r})()};c&&typeof c=="object"&&Object.assign(n,c),Object.defineProperty(n,"name",{value:t});for(const[o,r]of Object.entries(n.properties)){const{type:p,sync:h,attribute:R,setter:O,getter:P}=r;h||Object.hasOwn(n.prototype,o)||Object.defineProperty(n.prototype,o,{configurable:!0,enumerable:!0,get:P?function(){return P.call(this)}:function(){return this.state[o]},set:O?function(l){O.call(this,l)}:function(l){const _=this.state[o];_!==l&&(this.state[o]=l,R&&this.updateAttribute({key:o,value:l,skipPropUpdate:!0,type:p}),this.requestUpdate(o,_))}})}for(const o of Object.keys(b)){if(Object.hasOwn(n.properties,o))continue;const r=Object.getOwnPropertyDescriptor(b,o);r.get||r.set?Object.defineProperty(n.prototype,o,{configurable:!0,enumerable:!0,get:r.get,set:r.set}):n.prototype[o]=r.value}return n.tag=t,n._attrs=Object.fromEntries(Object.keys(n.properties).map(o=>[o.toLowerCase(),o])),n.plugins=[...n.plugins.filter(o=>!o.test||o.test({component:n}))],n.plugins.push({events:{connected:E,disconnected:C,willUpdate:v,firstUpdated:L,updated:k,dataLoaded:T},name:"base"}),n}static define(t,e){t==="app-template"&&console.error({tag:t,definition:e});const s=f.createClass(t,e);return customElements.get(t)||customElements.define(t,s),s}on(t,e){if(typeof e!="function")return console.error(`Error adding listener to ${t}: callback is not a function.`);if(t.includes("#")){const[i,a]=t.split("#"),c=u=>{const d=u.target.closest(i);d&&this.contains(d)&&e(u)};return this.addEventListener(a,c),c}const s=({detail:i})=>{e(i)};return this.addEventListener(t,s),s}off(t,e){if(t.includes("#")){const[,s]=t.split("#");this.removeEventListener(s,e)}else this.removeEventListener(t,e)}emit(t,e){const s=new CustomEvent(t,{detail:e});this.dispatchEvent(s)}$=t=>this.querySelector(t);$$=t=>this.querySelectorAll(t);connectedCallback(){if(this.constructor.shadow){const t=this._ensureShadowRoot();if(this.constructor.css&&!t.querySelector("style[data-component-style]")){const e=document.createElement("style");e.setAttribute("data-component-style",""),e.textContent=this.constructor.css,t.prepend(e)}}this.constructor.properties&&this.initProps(),this.constructor._classTags.length>0&&this.classList.add(...this.constructor._classTags);for(const t of this.constructor.plugins){const{events:e={}}=t;Object.entries(e).map(([s,i])=>i&&this.on(s,i.bind(this)))}this.emit("connected",{instance:this,component:this.constructor,tag:this.constructor.tag}),this.requestUpdate()}disconnectedCallback(){this.emit("disconnected",{instance:this,component:this.constructor,tag:this.constructor.tag})}initProps(){for(const t of this.attributes){const e=this.constructor._attrs[t.name],s=this.constructor.properties[e];if(s&&s.type!=="boolean"&&t.value===""){this.removeAttribute(t.name);continue}e&&(this.state[e]=s?j.parse(t.value,{...s,attribute:!0}):t.value)}for(const[t,e]of Object.entries(this.constructor.properties)){const{type:s,sync:i,defaultValue:a,attribute:c}=e;if(i)continue;if(Object.hasOwn(this,t)){const g=this[t];delete this[t],this[t]=g;continue}this.state[t]??=a;const u=this.state[t],d=["array","object","function"].includes(s);c&&u!==void 0&&!this.hasAttribute(t)&&!d&&this.updateAttribute({key:t,value:u,skipPropUpdate:!0,type:s}),this._changedProps.set(t,void 0)}}requestUpdate(t,e){return t&&this._changedProps.set(t,e),this._updatePromise?this._updatePromise:(this._updatePromise=this.enqueueUpdate(),this._updatePromise)}async enqueueUpdate(){await Promise.resolve();const t=this.performUpdate(!1);return this._updatePromise=null,t}performUpdate(t){const e=this._changedProps;this.hasUpdated&&!t&&!this.shouldUpdate(e)||(this.emit("willUpdate",{changedProps:e,instance:this,component:this.constructor}),this.update(e),this.hasUpdated||(this.hasUpdated=!0,this.emit("firstUpdated",{changedProps:e,instance:this,component:this.constructor})),this.emit("updated",{changedProps:e,instance:this,component:this.constructor}),this._changedProps=new Map)}shouldUpdate(t){const e=new Map(t);if(!this.hasUpdated)return!0;for(const[s,i]of e){const a=this[s],c=this.constructor.properties[s];(c?.hasChanged?c.hasChanged(a,i):i!==a)?this.emit(`${s}Changed`,{oldValue:i,value:a,instance:this,component:this.constructor}):e.delete(s)}return this._changedProps=new Map,e.size>0}_ensureShadowRoot(){if(!this.shadowRoot){const t={mode:"open"};typeof this.constructor.shadow=="object"&&Object.assign(t,this.constructor.shadow),this.attachShadow(t)}return this.shadowRoot}update(){const t=this.constructor.shadow?this._ensureShadowRoot():this;x(this.render(),t)}render(){return null}attributeChangedCallback(t,e,s){e!==s&&(this.emit("attributeChangedCallback",{instance:this,component:this.constructor,key:t,value:s,oldValue:e}),!this._ignoreAttributeChange&&(this.state[t]=j.parse(s,this.constructor.properties[t]),this.hasUpdated&&this.requestUpdate(t,e)))}updateAttribute({key:t,value:e,type:s,skipPropUpdate:i=!1}){this._ignoreAttributeChange=i,s&&typeof e!="function"&&(s==="boolean"?e?this.setAttribute(t,""):this.removeAttribute(t):["array","object"].includes(s)?this.setAttribute(t,JSON.stringify(e)):e===null?this.removeAttribute(t):s==="string"&&String(e).trim().length>0&&this.setAttribute(t,String(e))),i?this._ignoreAttributeChange=!1:this[t]=e}}export default f;\n',mimeType:"text/javascript"},"/$app/view/loader.js":{content:'import s from"./index.js";if(typeof window<"u"&&window.__COMPONENT_MAP__)for(const[e,t]of Object.entries(window.__COMPONENT_MAP__))s.components.set(e,{path:t});const a={settings:{basePath:"/",modules:{},dev:!1},componentMappings:{},ssgTag:"ce-",configure(e){Object.assign(a.settings,e||{})},initMappings(e){a.componentMappings=e},addModule(e){a.settings.modules[e.name]=e},resolvePath(e){const t=s.components.get(e);if(t?.path)return t.path;const c=e.split("-"),i=c[0],n=c.slice(1).join("-"),o=a.componentMappings[i];if(!o)return console.warn(`[Loader] No component mapping for prefix: ${i}`),null;if(o.paths){const r=o.paths[n];return r?`${o.base}${r}`:(console.warn(`[Loader] Component \'${n}\' not found in ${i} mappings`),null)}if(o.folders){const r=o.folders[0];return`${o.base}${r}${n}`}return null},async loadDefinition(e){const t=s.components.get(e);if(t?.definition)return t.definition;if(t?.path)try{const{default:r}=await import(`${t.path}.js`);if(r)return t.definition=r,s.components.set(e,t),r}catch(r){throw console.error(`[Loader] Failed to load ${e} from cached path:`,t.path,r),r}const c=e.split("-"),i=c[0],n=c.slice(1).join("-"),o=a.componentMappings[i];if(!o)return console.error(`[Loader] No mapping for prefix: ${i}`),null;if(o.paths){const r=o.paths[n];if(!r)return console.error(`[Loader] Component \'${n}\' not found in ${i} mappings`),null;const f=`${o.base}${r}`;try{const{default:d}=await import(`${f}.js`);if(d){const p=s.components.get(e)||{};return p.path=f,p.definition=d,s.components.set(e,p),d}}catch(d){throw console.error(`[Loader] Failed to load ${e} from ${f}:`,d),d}}if(o.folders){let r;for(const f of o.folders){const d=`${o.base}${f}${n}`;try{const{default:p}=await import(`${d}.js`);if(p){const l=s.components.get(e)||{};return l.path=d,l.definition=p,s.components.set(e,l),p}}catch(p){r=p}}if(console.error(`[Loader] Component ${e} not found in any folder:`,o.folders),r)throw r}return null},async get(e){if(e=e.toLowerCase(),customElements.get(e)){if(!s.components.get(e)?._constructor){const o=s.components.get(e)||{};o._constructor=customElements.get(e),s.components.set(e,o)}return s.components.get(e)._constructor}const t=s.components.get(e);if(t?._constructor&&!t?.loadPromise)return t._constructor;if(t?.loadPromise)return t.loadPromise;const c=(async()=>{try{const n=await a.loadDefinition(e);if(!n)throw new Error(`Definition for ${e} not found.`);let o=s,r=n.extends||(n.prototype instanceof HTMLElement?null:void 0);typeof n=="function"&&n.extends&&(r=n.extends),r&&(o=await a.get(r));const f=s.createClass(e,n,o),d=s.components.get(e)||{};if(d._constructor=f,s.components.set(e,d),o?.plugins)for(const{init:p}of o.plugins)p&&typeof p=="function"&&await p({View:s,component:f,definition:n,tag:e});return(!customElements.get(e)||s.reloadComponents)&&customElements.define(e,f),f}catch(n){console.error(`[Loader] Failed to define component ${e}:`,n);const o=s.components.get(e);return o&&(delete o.loadPromise,s.components.set(e,o)),null}})(),i=s.components.get(e)||{};return i.loadPromise=c,s.components.set(e,i),c},define(...e){if(typeof e[0]=="string"){const t=e[0].toLowerCase(),c=e[1],i=s.components.get(t)||{};i.definition=c,s.components.set(t,i),a.settings.dev||a.get(t).catch(n=>console.error(`[Loader] Error during manual definition for ${t}:`,n))}else typeof e[0]=="object"&&e[0]!==null&&Object.entries(e[0]).forEach(([t,c])=>a.define(t,c))},async traverseDOM(e=document.body){if(!e||typeof e.querySelectorAll!="function")return;const t=e.querySelectorAll(":not(:defined)"),c=new Set;t.forEach(i=>{const n=i.tagName.toLowerCase();n.includes("-")&&!n.startsWith(a.ssgTag)&&c.add(n)}),await Promise.allSettled(Array.from(c).map(i=>a.get(i)))},observeDOMChanges(){new MutationObserver(async t=>{const c=new Set;for(const i of t)i.type!=="childList"||i.addedNodes.length===0||i.addedNodes.forEach(n=>{if(n.nodeType!==Node.ELEMENT_NODE)return;const o=r=>{const f=r.tagName.toLowerCase(),d=s.components.get(f);f.includes("-")&&!customElements.get(f)&&!d?.loadPromise&&c.add(f)};o(n),typeof n.querySelectorAll=="function"&&n.querySelectorAll(":not(:defined)").forEach(o)});c.size>0&&await Promise.allSettled(Array.from(c).map(i=>a.get(i)))}).observe(document.body,{childList:!0,subtree:!0})},initDOM(){a.traverseDOM(document.body),a.observeDOMChanges()}},m=e=>s.components.get(e)?.path||a.resolvePath(e);s.getComponentPath=m;export default a;\n',mimeType:"text/javascript"},"/$app/base/backend/frontend.js":{content:'import d from"/$app/types/index.js";import A from"/$app/view/index.js";import u from"/$app.js";let Q,c;const f={},H=async(e={})=>{const{data:a}=e,{eventId:t,type:l,payload:s,connection:m}=a,b=s,n=t&&(i=>c.postMessage({eventId:t,payload:i,connection:m}));if(await u.events.emit(l,{respond:n,payload:s,eventId:t}),t&&f[t])try{f[a.eventId].resolve(b)}catch(i){f[a.eventId].reject(new Error(i))}finally{delete f[t]}if(n)return n(b)},S=async()=>{try{Q=new Worker("/backend.js",{type:"module"});const e=new MessageChannel;c=e.port1,c.onmessage=H,c.onmessageerror=a=>{console.error("Worker message error:",a)},Q.postMessage({type:"APP:BACKEND:START"},[e.port2]),u.events.on("APP:BACKEND:READY",async()=>{await u.events.emit("APP:READY")})}catch(e){throw console.error("Failed to initialize backend:",e),e}};u.events.on("APP:INIT",S);const P=(e,a,t)=>{if(!e){setTimeout(()=>t(a),100);return}e.postMessage(a)},h=e=>P(c,e,h),q=async e=>{const a=e["data-query"];if(!a)return;const{model:t,id:l,limit:s,offset:m=0,order:b,where:n,includes:i,key:o,single:w}=a;if(!t)return console.warn("data-query: \'model\' is required");if(!o)return console.warn("data-query: \'key\' is required to know where to store data");if(!u.Model||!u.Model[t])return console.error(`data-query: Model "${t}" does not exist`);const p=a.many??(!l&&!w),_={limit:w?1:s,offset:m,includes:i,order:b,where:n};e._dataQuerySub&&e._dataQuerySubHandler&&(e._dataQuerySub.unsubscribe(e._dataQuerySubHandler),e._dataQuerySub=null),e._paginationInfo=null,e._dataQuerySubHandler=r=>{const y=e.state[o];e.state[o]=r,e.requestUpdate(o,y),e.emit("dataLoaded",{instance:e,rows:p?r:void 0,row:p?void 0:r,...e._paginationInfo||{},component:e.constructor})};try{if(p){const r=await u.Model[t].getAll(_),y=e.state[o];e.state[o]=r,e._paginationInfo=r.limit!==void 0?{total:r.total,limit:r.limit,offset:r.offset,count:r.count}:null,e.requestUpdate(o,y),r.subscribe?.(e._dataQuerySubHandler),e._dataQuerySub=r}else if(w&&n){const r=await u.Model[t].getAll(_),y=e.state[o];e.state[o]=r[0]||null,e.requestUpdate(o,y),r.subscribe?.(g=>{e._dataQuerySubHandler(g[0]||null)}),e._dataQuerySub=r}else{const r=await u.Model[t].get(l),y=e.state[o];e.state[o]=r,e.requestUpdate(o,y),console.log({id:l,reactiveRow:r}),r.subscribe?.(g=>{const k=Array.isArray(g)?g[0]:g;e._dataQuerySubHandler(k)}),e._dataQuerySub=r}e.emit("dataLoaded",{instance:e,rows:p?e.state[o]:void 0,row:p?void 0:e.state[o],...e._paginationInfo||{},component:e.constructor})}catch(r){console.error(`data-query: Failed to load data for model "${t}":`,r),e.emit("dataError",{instance:e,error:r,model:t,id:l})}e.syncable=!0};A.plugins.push({name:"dataQuery",test:({component:e})=>!!e.dataQuery,init:({View:e})=>{e.properties["data-query"]=d.object({properties:{model:d.string(),id:d.string(),where:d.object(),includes:d.string(),order:d.string(),limit:d.number(),offset:d.number(),count:d.number(),key:d.string(),single:d.boolean()}})},events:{connected:async({instance:e})=>{await q(e),e._dataQueryChangeHandler=async()=>{await q(e)},e.on("data-queryChanged",e._dataQueryChangeHandler)},disconnected:({instance:e})=>{e._dataQuerySub&&e._dataQuerySubHandler&&e._dataQuerySub.unsubscribe(e._dataQuerySubHandler),e._dataQuerySub=null,e._dataQuerySubHandler=null,e._dataQueryChangeHandler&&(e.off("data-queryChanged",e._dataQueryChangeHandler),e._dataQueryChangeHandler=null)}}});const v=(e,a={},t=null,l=1e4)=>{if(!e)return Promise.reject(new Error("backend: type parameter is required"));const s=Date.now().toString()+Math.random().toString(36).substr(2,9),m={type:e,payload:a,eventId:s};return new Promise((b,n)=>{t&&(m.connection=t);const i=setTimeout(()=>{f[s]&&(delete f[s],n(new Error(`Backend request timeout after ${l}ms for type: ${e}`)))},l);f[s]={resolve:o=>{clearTimeout(i),b(o)},reject:o=>{clearTimeout(i),n(o)}},h(m)})},M={request:v,init:S};u.addModule({name:"Backend",base:M});export default M;\n',mimeType:"text/javascript"},"/$app/model/frontend.js":{content:`import{createModel as a}from"./index.js";import{SubscriptionManager as u}from"./subscription-manager.js";export function initModelFrontend(e,c={}){const o=a(e),i=(n,r,t={})=>e.Backend.request(n,{model:r,...t});return o.request=i,e.addModule({name:"Model",base:o}),e.SubscriptionManager||(e.SubscriptionManager=new u(null)),e.events.on("QUERY_DATA_SYNC",({payload:n})=>{const{action:r,model:t,record:s}=n;e.SubscriptionManager&&e.SubscriptionManager.notifyMatchingQueries(t,r,s),e.SW&&e.SW.postMessage("SW:BROADCAST_QUERY_SYNC",n)}),o}export default{initModelFrontend};
`,mimeType:"text/javascript"},"/$app/controller/app.js":{content:'import{registerSyncType as y}from"./sync.js";export function registerModelType(a){y(e=>e instanceof a,e=>({adapter:e.name,syncObj:e}))}function d({instance:a,key:e,prop:r,syncObj:i,updateState:n}){(async()=>{let t=r.defaultValue;try{const o=typeof r.query=="function"?r.query(a):r.query;t=r.type==="array"?await i.getAll(o):await(o.id?i.get(o.id,o):i.get(o)),t&&t.subscribe(c=>{const l=Array.isArray(c)?[...c]:{...c};n(a,e,l)})}catch(o){console.error(`Sync error ${e}:`,o)}const s=t?Array.isArray(t)?[...t]:{...t}:r.defaultValue;n(a,e,s)})()}export function initControllerApp(a,e,r){a.swEvents.set("SW:PROP_SYNC_UPDATE",({payload:{sync:i,key:n,value:t}})=>{const s=e[i];s&&(console.log(`SYNC: Update ${i}.${n}`,t),s.emit(n,t,{skipBroadcast:!0}))}),e.installViewPlugin(r,{onBroadcast:i=>a.SW.postMessage("SW:BROADCAST_SYNCED_PROP",i),onAsyncLoad:d}),e.initUrlSync()}export default initControllerApp;\n',mimeType:"text/javascript"},"/$app/router/app.js":{content:`export function initRouterApp(t,e,i=null){const a=()=>{e.init(t.routes,{appName:t.settings.name,isProduction:t.settings.production,onRouteChange:null}),i&&i.registerSyncType(n=>n===e,n=>({adapter:"router",syncObj:n.$sync})),t.Router=e};t.events.on("APP:INIT",a),t.addModule({name:"router",exports:e}),e.adapter?.type==="browser"&&window.addEventListener("popstate",()=>{e.handleHistoryNavigation()})}export default initRouterApp;
`,mimeType:"text/javascript"},"/$app/router/index.js":{content:`import e from"/$app/controller/index.js";import{createBrowserAdapter as t}from"./adapters.js";import{createRouterCore as o}from"./core.js";const r=o(t());r.$sync=e.createSync(r,"router",["currentRoute","stack"]);export default r;
`,mimeType:"text/javascript"},"/$app/base/app/index.js":{content:`import a from"/$app.js";a.addModule({name:"app"});
`,mimeType:"text/javascript"},"/frontend.js":{content:'import r from"/$app/types/index.js";import e from"/$app.js";import"/models/schema.js";import"/$app/cms/index.js";import"/$app/i18n/index.js";import o from"/$app/theme/index.js";import"/$app/tailwind/index.js";import"/$app/uix/app.js";import"/$app/icon-lucide/app.js";import"/controllers/index.js";import"/$app/maps/app.js";import"/$app/notifications/index.js";import{initAuthFrontend as i}from"/$app/auth/frontend.js";i(e),e.i18n.registerLocale("en",()=>import("/locales/en.js")),e.i18n.registerLocale("pt",()=>import("/locales/pt.js")),e.events.on("APP:INIT",async()=>{if(e.Auth){const t=await e.Auth.restore();console.log(t?`Auth restored for: ${e.Auth.user?.name}`:"No auth session - guest mode")}o.loadTheme("nbs"),e.define("app-container",{extends:"router-ui",properties:{userId:r.number({sync:"local"})},async connected(){this.currentLang=e.i18n.getLanguage(),e.events.on("i18n:language-changed",({locale:t})=>{this.currentLang=t}),this.addEventListener("item-click",t=>{this.modalItem=t.detail.item,this.modalOpen=!0})}})});\n',mimeType:"text/javascript"},"/$app/controller/adapters/storage.js":{content:`const o=e=>typeof e=="object"&&e!==null||Array.isArray(e)?JSON.stringify(e):e,c=e=>{try{return JSON.parse(e)}catch{return e}},u=e=>t=>{const n=e.getItem(t);return n!==null?c(n):null},i=e=>(t,n)=>(e.setItem(t,o(n)),{key:t}),a=e=>t=>(e.removeItem(t),{key:t}),l=e=>()=>Object.keys(e),m=e=>t=>e.getItem(t)!==null&&e.getItem(t)!==void 0,s=e=>({has:m(e),set:i(e),remove:a(e),get:u(e),keys:l(e)}),r=new Map,d={has:e=>r.has(e),get:e=>r.get(e),set:(e,t)=>(r.set(e,t),{key:e}),remove:e=>(r.delete(e),{key:e}),keys:()=>r.keys()},g=s(window.localStorage),S=s(window.sessionStorage);export default{local:g,ram:d,session:S};
`,mimeType:"text/javascript"},"/$app/controller/adapters/url.js":{content:'const n=()=>{const a=window.location.hash.substring(1);return new URLSearchParams(a)},t=a=>{const s=a.toString();window.location.hash=s},r={get:a=>n().get(a),has:a=>n().has(a),set:(a,s)=>{const e=n();return s==null?e.delete(a):e.set(a,s),t(e),window.dispatchEvent(new Event("popstate")),{key:a}},remove:a=>{const s=n();return s.delete(a),t(s),{key:a}},keys:()=>[...n().keys()],entries:()=>[...n().entries()]},o={get(a){return new URLSearchParams(window.location.search).get(a)},set(a,s){const e=new URLSearchParams(window.location.search);return s==null?e.delete(a):e.set(a,s),window.history?.pushState?.({},"",`${window.location.pathname}?${e}`),window.dispatchEvent(new Event("popstate")),{key:a}},remove(a){const s=new URLSearchParams(window.location.search);return s.delete(a),window.history.pushState?.({},"",`${window.location.pathname}?${s}`),{key:a}},keys(){return[...new URLSearchParams(window.location.search).keys()]},has(a){return new URLSearchParams(window.location.search).has(a)},entries:()=>[...new URLSearchParams(window.location.search).entries()]};export default{querystring:o,hash:r};\n',mimeType:"text/javascript"},"/$app/controller/core.js":{content:`import b from"/$app/events/index.js";const o={},f=new Map,u=e=>typeof e=="string"&&e.includes(".")?e.split(".",2):[e,null];export const createAdapter=(e,i)=>{const n=typeof e=="function"?e:(r,t)=>t!==void 0?n.set(r,t):n.get(r);b(n);const c=(r,t)=>n.emit(r,t);return n.get=r=>{const[t,a]=u(r),s=e.get(t);return a&&s&&typeof s=="object"?s[a]:s},n.set=(r,t)=>{const[a,s]=u(r);if(s){const d={...e.get(a)||{},[s]:t};return e.set(a,d),c(a,d),d}return e.set(a,t),c(a,t),t},n.remove=r=>{const[t,a]=u(r);if(a){const s=e.get(t);s&&typeof s=="object"&&(delete s[a],e.set(t,s),c(t,s))}else e.remove(t),c(t,void 0);return{key:t}},Object.assign(n,{has:e.has,keys:e.keys,entries:e.entries,broadcast:e.broadcast}),f.set(i,n),n},createController=(e={})=>{Object.assign(o,e);const i=new Proxy({},{get(n,c){return c in n?n[c]:f.has(c)?f.get(c):o[c]?createAdapter(o[c],c):void 0}});return i.add=(n,c)=>typeof n=="object"?Object.assign(o,n):o[n]=c,i.createAdapter=createAdapter,i};export default createController;
`,mimeType:"text/javascript"},"/$app/controller/sync.js":{content:'const d=new Map;export function registerSyncType(e,t){d.set(e,t)}export function getSyncInfo(e){if(typeof e=="string")return{adapter:e,syncObj:null};for(const[t,r]of d)if(t(e))return r(e);return e?.$sync?{adapter:e.$sync.adapter,syncObj:e.$sync}:null}export function needsAsyncLoad(e){return typeof e?.getAll=="function"}export function getScopedKey(e,t,r){const{scope:s}=t;if(!s)return e;if(s.includes(".")){const[n,o]=s.split(".");if(r[n]?.[o])return`${r[n][o]}:${e}`}return r[s]?`${r[s]}:${e}`:e}export function updateState(e,t,r){const s=e.state[t];e.state[t]=r,e.isConnected&&e.requestUpdate(t,s)}export function syncUrl(e){const t=new Map(e.entries()),r=new Set(e.listeners.keys());t.forEach((s,n)=>{e.emit(n,s),r.delete(n)}),r.forEach(s=>e.emit(s,void 0))}export function bindCustomSync({instance:e,key:t,prop:r,syncObj:s,onAsyncLoad:n}){if(e._customSyncUnsubscribers||=[],e._syncReloaders||={},Object.defineProperty(e,t,{get:()=>e.state[t],set:o=>{const u=e.state[t];u!==o&&(e.state[t]=o,!r.query&&o!==s.get(t)&&s.set(t,o),e.requestUpdate(t,u))}}),n&&r.query)r.dependsOn&&(e._syncReloaders[t]=()=>{const o=e._customSyncUnsubscribers.findIndex(u=>u._syncKey===t);o>-1&&(e._customSyncUnsubscribers[o](),e._customSyncUnsubscribers.splice(o,1)),n({instance:e,key:t,prop:r,syncObj:s,updateState})}),n({instance:e,key:t,prop:r,syncObj:s,updateState});else{const o=s.get(t);e._customSyncUnsubscribers.push(s.subscribe(t,u=>updateState(e,t,u))),updateState(e,t,o??r.defaultValue)}}export function checkDependsOn(e,t,r){e._syncReloaders&&Object.entries(t.properties||{}).filter(([,s])=>s.sync&&s.dependsOn).forEach(([s,n])=>{n.dependsOn.some(u=>r.has(u))&&e._syncReloaders[s]&&e._syncReloaders[s]()})}export function bindAdapterSync({instance:e,key:t,prop:r,adapterName:s,Controller:n,onBroadcast:o}){const u=n[s];if(!u)return;const c=getScopedKey(t,r,e);o&&s==="local"&&!u.hasListeners(c)&&u.on(c,(f,l)=>{l?.skipBroadcast||o({value:f,sync:s,key:c})});const i=f=>updateState(e,t,f);(e._listeners||={})[s]||={},e._listeners[s][c]=i,Object.defineProperty(e,t,{get:()=>e.state[t],set:f=>{const l=e.state[t];l!==f&&(e.state[t]=f,f!==u.get(c)&&u.set(c,f),e.requestUpdate(t,l))}}),u.on(c,i),updateState(e,t,u.get(c)??r.defaultValue)}export function cleanupSyncBindings(e,t){e._listeners&&Object.entries(e._listeners).forEach(([r,s])=>{const n=t[r];n&&Object.entries(s).forEach(([o,u])=>n.off(o,u))}),e._customSyncUnsubscribers&&(e._customSyncUnsubscribers.forEach(r=>r()),e._customSyncUnsubscribers=null)}\n',mimeType:"text/javascript"},"/$app/controller/sync-factory.js":{content:'export const createSync=(r,u,s=null)=>{r._listeners||(r._listeners=new Map),r.subscribe||(r.subscribe=function(t,e){this._listeners.has(t)||this._listeners.set(t,new Set);const i=this._listeners.get(t);return i.add(e),()=>i.delete(e)}),r._notify||(r._notify=function(t,e){this._listeners.has(t)&&this._listeners.get(t).forEach(i=>i(e))});const l=s?new Set(s):null,f=t=>l&&!l.has(t)?(console.warn(`Property "${t}" is not in the list of syncable properties for ${u}`),!1):!0;return s&&s.forEach(t=>{const e=Object.getOwnPropertyDescriptor(r,t);if(e&&typeof e.set=="function")return;const i=r[t],o=`_${t}`;r[o]=i,Object.defineProperty(r,t,{get(){return this[o]},set(n){this[o]!==n&&(this[o]=n,this._notify(t,n))},enumerable:!0,configurable:!0})}),{adapter:u,get:t=>{if(f(t))return r[t]},set:(t,e)=>{f(t)&&(r[t]=e)},subscribe:(t,e)=>f(t)?r.subscribe(t,e):()=>{}}};\n',mimeType:"text/javascript"},"/$app/router/adapters.js":{content:'export const createBrowserAdapter=()=>({type:"browser",getLocation(){return{href:window.location.href,origin:window.location.origin,pathname:window.location.pathname,search:window.location.search,hash:window.location.hash}},isSamePath(h){return window.location.href===h},hardNavigate(h){window.location.href=h},pushState(h,o){new URL(o,window.location.origin).href!==window.location.href&&window.history.pushState(h,"",o)},replaceState(h,o){window.history.replaceState(h,"",o)},back(){window.history.back()},forward(){window.history.forward()},setTitle(h){document.title=h}}),createMemoryAdapter=(h="/")=>{const o=new URL(h,"http://memory"),a={pathname:o.pathname,search:o.search,hash:o.hash,origin:"http://memory"},n=[];let t=-1;return{type:"memory",getLocation(){return{href:`${a.origin}${a.pathname}${a.search}${a.hash}`,origin:a.origin,pathname:a.pathname,search:a.search,hash:a.hash}},isSamePath(e){const r=new URL(e,a.origin),s=`${a.pathname}${a.search}${a.hash}`,i=`${r.pathname}${r.search}${r.hash}`;return s===i},hardNavigate(e){const r=new URL(e,a.origin);a.pathname=r.pathname,a.search=r.search,a.hash=r.hash},pushState(e,r){const s=new URL(r,a.origin);a.pathname=s.pathname,a.search=s.search,a.hash=s.hash,t<n.length-1&&n.splice(t+1),n.push({pathname:a.pathname,search:a.search,hash:a.hash,state:e}),t=n.length-1},replaceState(e,r){const s=new URL(r,a.origin);a.pathname=s.pathname,a.search=s.search,a.hash=s.hash,t>=0&&(n[t]={pathname:a.pathname,search:a.search,hash:a.hash,state:e})},back(){if(t>0){t--;const e=n[t];return a.pathname=e.pathname,a.search=e.search,a.hash=e.hash,!0}return!1},forward(){if(t<n.length-1){t++;const e=n[t];return a.pathname=e.pathname,a.search=e.search,a.hash=e.hash,!0}return!1},setTitle(e){},getHistory(){return{entries:[...n],index:t}}}};\n',mimeType:"text/javascript"},"/$app/router/core.js":{content:'export const createRouterCore=u=>({stack:[],routes:[],namedRoutes:{},currentRoute:{},defaultTitle:"",options:{},adapter:u,_createPatternString(t){let o=t.path;if(t.namedParams&&t.namedParams.length>0){const e=t.namedParams.map(a=>`/${a}/:${a}`).join("");o+=`(${e})?`}return o},flattenRoutes(t,o="",e=null){const a={},i={};for(const n in t){const r=typeof t[n]=="function"?t[n]:{...t[n]},s=(o+n).replace(/\\/+/g,"/");if(r.path=s||"/",r.parent=e,a[r.path]=r,r.name&&(i[r.name]&&console.warn(`Router: Duplicate route name "${r.name}". Overwriting.`),i[r.name]=r.path),r.routes){const{flatRoutes:h,namedRoutes:c}=this.flattenRoutes(r.routes,s,r);Object.assign(a,h),Object.assign(i,c)}}return{flatRoutes:a,namedRoutes:i}},init(t,o={}){if(!t||!Object.keys(t).length){console.error("Router: No routes loaded");return}this.options={appName:"",isProduction:!1,onRouteChange:null,onTitleChange:null,...o};const{flatRoutes:e,namedRoutes:a}=this.flattenRoutes(t);this.namedRoutes=a,this.defaultTitle=this.options.appName||"";for(const n in e){const r=e[n],s=this._createPatternString(r);try{const h=new URLPattern({pathname:s});this.routes.push({pattern:h,route:r,originalPath:n})}catch(h){console.error(`Router: Error creating URLPattern for path: "${s}"`,h)}}this.routes.sort((n,r)=>{const s=n.originalPath.split("/").length;return r.originalPath.split("/").length-s});const i=this.adapter.getLocation();console.error({href:i.href}),this.setCurrentRoute(i.href,!1)},_matchRoute(t){for(const{pattern:o,route:e}of this.routes){const a=o.exec({pathname:t});if(a){const n={...a.pathname.groups||{}},r=typeof e=="function"?e:typeof e.component=="function"?e.component(n):e.component,s={route:e,params:n,name:e.name,component:r,template:e.template};return e.parent&&(s.route=e.parent,s.template=e.parent.template,s.component=e.parent.component(n),s.matched={route:e,params:n,path:e.path,name:e.name,component:r,template:e.template}),s}}return null},setCurrentRoute(t,o=!0){if(!this.routes.length)return;const e=this.adapter.getLocation(),a=new URL(t,e.origin),i=this.normalizePath(a.pathname),n=this._matchRoute(i);if(console.error({matched:n,routes:JSON.stringify(this.routes)}),!n)return console.warn(`Router: No route found for path "${i}".`),o?this.go("/"):null;if(n.route.ssg&&this.options.isProduction&&this.adapter.type==="browser"&&!this.adapter.isSamePath(t)){this.adapter.hardNavigate(t);return}if(n.path=a.pathname,n.querystring=a.search,n.hash=a.hash,n.queryParams=Object.fromEntries(a.searchParams.entries()),n.params={...n.queryParams,...n.params},n.route.action)return n.route.action(n.params);if(n.route.redirect)return this.go(n.route.redirect);this.currentRoute=n;const r=n.route.title||this.defaultTitle;this.setTitle(r),o?(this.pushToStack(t,n.params,r),this._pushState(t,{path:t})):this.updateCurrentRoute(this.currentRoute)},handleHistoryNavigation(){const o=this.adapter.getLocation().href,e=this.stack.findIndex(a=>this.normalizePath(a.path)===this.normalizePath(o));e!==-1&&this.truncateStack(e),this.setCurrentRoute(o,!1)},create(t,o={}){if(!t)return console.error("Router: Route name is required for Router.create()"),null;const e=this.namedRoutes[t];if(!e)return console.error(`Router: Route with name "${t}" not found.`),null;let a=e;const i={...o};a=a.replace(/:(\\w+)/g,(r,s)=>{if(i[s]!==void 0&&i[s]!==null){const h=i[s];return delete i[s],String(h)}return console.warn(`Router: Parameter "${s}" was not provided for named route "${t}".`),r});const n=new URLSearchParams(i).toString();return n?`${a}?${n}`:a},go(t,o){const a=!!o||this.namedRoutes[t]?this.create(t,o):t;a!==null&&this.setCurrentRoute(a,!0)},navigate(t,o={}){return this.go(t,o)},replace(t,o={}){const a=!!o||this.namedRoutes[t]?this.create(t,o):t;if(a===null)return;const i=this.adapter.getLocation(),n=new URL(a,i.origin),r=this.normalizePath(n.pathname),s=this._matchRoute(r);if(!s){console.warn(`Router: No route found for path "${r}".`);return}s.path=n.pathname,s.querystring=n.search,s.hash=n.hash,s.queryParams=Object.fromEntries(n.searchParams.entries()),s.params={...s.queryParams,...s.params},this.currentRoute=s;const h=s.route.title||this.defaultTitle;this.setTitle(h),this.adapter.replaceState({path:a},a),this.updateCurrentRoute(this.currentRoute)},forward(){const t=this.adapter.forward();this.adapter.type==="memory"&&t&&this.handleHistoryNavigation()},home(){this.stack=[],this.go("/")},back(){if(this.stack.length<=1)return this.home();this.stack=this.stack.slice(0,-1);const t=this.adapter.back();this.adapter.type==="memory"&&t&&this.handleHistoryNavigation()},_pushState(t,o={}){const e=this.adapter.getLocation(),a=new URL(t,e.origin).href;this.adapter.isSamePath(a)||this.adapter.pushState(o,t),this.updateCurrentRoute(this.currentRoute)},pushToStack(t,o={},e=this.defaultTitle){const a={path:t,params:o,title:e};this.normalizePath(t)==="/"?this.stack=[a]:this.stack=[...this.stack,a]},setTitle(t){const o=t&&this.options.appName?`${t} | ${this.options.appName}`:t||this.options.appName;if(this.adapter.setTitle(o),this.stack.length>0){const e=[...this.stack];e[e.length-1]={...e[e.length-1],title:t},this.stack=e}this.currentRoute?.route&&(this.currentRoute={...this.currentRoute,route:{...this.currentRoute.route,title:t}}),this.options.onTitleChange&&this.options.onTitleChange(o)},updateCurrentRoute(t){this.currentRoute={...t,root:this.isRoot()},this.options.onRouteChange&&this.options.onRouteChange(this.currentRoute)},isRoot(){return this.stack.length<=1},truncateStack(t=0){this.stack=this.stack.slice(0,t+1)},normalizePath(t="/"){return(t.split("?")[0].split("#")[0]||"/").replace(/\\/+$/,"")||"/"},handleLinkClick(t,o={}){const{external:e=!1}=o;if(t.ctrlKey||t.metaKey||t.shiftKey||t.button===1)return!1;const a=t.currentTarget;if(!a?.href)return!1;const i=this.adapter.getLocation();if(a.origin===i.origin&&!e){t.preventDefault();const r=[a.pathname,a.search].filter(Boolean).join("");return this.go(r),!0}return!1}});\n',mimeType:"text/javascript"},"/$app/cms/index.js":{content:`import o from"/$app/types/index.js";import e from"./types.js";o.registerExtension(e);import"./plugin.js";export{cmsFields,cmsModels}from"./schema.js";console.log("[CMS] Package initialized");
`,mimeType:"text/javascript"},"/$app/i18n/index.js":{content:'import o from"/$app/controller/index.js";import c from"/$app/view/index.js";import{I18n as g}from"./base.js";import d from"./view-plugin.js";const t=new g;c.plugins.push(d);const s={t:(e,n)=>t.t(e,n),n:(e,n)=>t.formatNumber(e,n),d:(e,n)=>t.formatDate(e,n),r:e=>t.formatRelativeDate(e),setLanguage:async e=>{console.log("i18n setLanguage called with:",e);const n=await t.setLanguage(e);console.log("Locale loaded:",n),o?.i18n&&o.i18n.set("currentLocale",n);const i=$APP.settings.i18n.autoRerender,a=$APP.settings.i18n.rootComponent;if(console.log("Auto-rerender settings:",{autoRerender:i,rootComponent:a}),i&&a)try{const r=document.querySelector(a);if(console.log("Found container:",r),r){const l=document.createElement("div");l.innerHTML=`<${a}></${a}>`,r.replaceWith(l.firstElementChild),console.log("Replaced container")}}catch(r){console.warn("Failed to auto-rerender root component:",r),console.warn("You may need to manually trigger re-render")}return n},getLanguage:()=>t.getLanguage(),getAvailableLocales:()=>t.getAvailableLocales(),registerLocale:(e,n)=>t.registerLocale(e,n),addTranslations:(e,n)=>t.addTranslations(e,n),_instance:t};$APP.addModule({name:"i18n",base:s,settings:{defaultLocale:"en",fallbackLocale:"en",persistLocale:!0,autoRerender:!0,rootComponent:"app-container"},events:()=>({moduleAdded({module:e}){if(e.i18n)for(const[n,i]of Object.entries(e.i18n))t.addTranslations(n,i)},async"APP:INIT"(){o&&!o.i18n&&o.createAdapter("i18n",{storage:"localStorage",prefix:"i18n:"});const e=o?.i18n?.get("currentLocale");if(e)await t.setLanguage(e);else{const n=$APP.settings.get("i18n.defaultLocale")||"en";await t.setLanguage(n)}}})});export default s;\n',mimeType:"text/javascript"},"/$app/theme/index.js":{content:'import f from"/$app/view/index.js";const C=new Map,$=async e=>{const n=f.components.get(e);if(n?.cssContent)return n.cssContent;if(C.has(e))return C.get(e);try{const t=await fetch(`/styles/${e}.css`);if(t.ok){const s=await t.text();return C.set(e,s),s}}catch{}return null};f.plugins.push({name:"theme",events:{connected:async e=>{const{tag:n,component:t,instance:s}=e;if(!t.style)return;const o=s.getRootNode();if(!(o instanceof ShadowRoot))return;let a=f.shadowStylesInjected.get(o);if(a||(a=new Set,f.shadowStylesInjected.set(o,a)),a.has(t))return;const r=await $(n);if(!r)return;const c=document.createElement("style");c.setAttribute("data-component-style",t.tag),c.textContent=r,o.prepend(c),a.add(t)}}});const j=new Set,E=new Set,S=(e,n=!1)=>{if(E.has(e))return;const t=document.createElement("link");t.rel="stylesheet",t.href=e,n?document.head.prepend(t):document.head.appendChild(t),E.add(e)},w=e=>{if(!e||j.has(e))return;const t=`https://fonts.googleapis.com/css2?family=${e.replace(/\\s+/g,"+")}:wght@300;400;500;600;700;800&display=swap`;S(t);const s="theme-font-vars";let o=document.getElementById(s);o||(o=document.createElement("style"),o.id=s,document.head.appendChild(o)),o.textContent=`\n    :root {\n      --font-family-base: \'${e}\', sans-serif;\n    }\n    body {\n      font-family: var(--font-family-base);\n    }\n  `,j.add(e)},u=(e,n,t)=>{const s=Math.max(e,n,t),o=Math.min(e,n,t);let a,r,c=(s+o)/2;if(s===o)a=r=0;else{const l=s-o;switch(r=c>.5?l/(2-s-o):l/(s+o),s){case e:a=(n-t)/l+(n<t?6:0);break;case n:a=(t-e)/l+2;break;case t:a=(e-n)/l+4;break}a/=6}return{h:Math.round(a*360),s:Math.round(r*100),l:Math.round(c*100)}},i=e=>`hsl(${e.h} ${e.s}% ${e.l}%)`,b=(e,n)=>({h:e.h,s:e.s,l:Math.max(0,Math.min(100,e.l+n))}),T=(e,n,t)=>n==="white"?{h:e.h,s:Math.round(e.s*(1-t*.5)),l:Math.round(e.l+(100-e.l)*t)}:n==="black"?{h:e.h,s:Math.round(e.s*(1-t*.3)),l:Math.round(e.l*(1-t))}:e,x=e=>{if(!e||typeof e!="string")return null;const n=e.trim();if(n.startsWith("#")){let t=n.slice(1);t.length===3&&(t=t.split("").map(r=>r+r).join(""));const s=parseInt(t.slice(0,2),16)/255,o=parseInt(t.slice(2,4),16)/255,a=parseInt(t.slice(4,6),16)/255;return u(s,o,a)}if(n.startsWith("rgb")){const t=n.match(/\\d+/g);return!t||t.length<3?null:u(t[0]/255,t[1]/255,t[2]/255)}if(n.startsWith("hsl")){const t=n.match(/[\\d.]+/g);return!t||t.length<3?null:{h:Math.round(parseFloat(t[0])),s:Math.round(parseFloat(t[1])),l:Math.round(parseFloat(t[2]))}}return null},M=(e,n={})=>{const s={...{lighter:{lightness:20},light:{lightness:10},dark:{lightness:-10},darker:{lightness:-20}},...n},o={DEFAULT:i(e)};for(const[a,r]of Object.entries(s))if(a!=="DEFAULT"){if(r.mix){const c=T(e,r.mix,r.amount||.3);o[a]=i(c)}else if(r.lightness!==void 0){const c=b(e,r.lightness);o[a]=i(c)}}return o},k=(e,n="-")=>{const t={},s=["lighter","light","dark","darker"],o=(a,r)=>{for(const[c,l]of Object.entries(a)){const p=r?`${r}-${c}`:`${n}-${c}`,F=r===`${n}-color`;if(typeof l=="object"&&l!==null)o(l,p);else if(t[p]=l,F&&typeof l=="string"&&!s.some(h=>c.endsWith(`-${h}`))){const h=x(l);if(h){const N=M(h);s.forEach(y=>{const V=`${c}-${y}`;a[V]===void 0&&(t[`${p}-${y}`]=N[y])})}}}};return o(e,""),t},v=e=>{const n="dynamic-theme-vars";let t=document.getElementById(n);t||(t=document.createElement("style"),t.id=n,document.head.appendChild(t));const s=Object.entries(e).map(([o,a])=>`${o}: ${a};`).join(`\n  `);t.textContent=`:root {\n  ${s}\n}`},m={},d=(e,n)=>{m[e]=n},g=e=>{const n=k(e);v(n),e?.font?.family&&w(e.font.family)},I=async e=>{if(!e){const s=document.getElementById("dynamic-theme-vars");s&&s.remove(),console.log("Theme removed.");return}if(typeof e=="object"&&e!==null){g(e),console.log("Custom theme object applied successfully.");return}const n=e,t=m[n];if(!t){console.warn(`Theme "${n}" not found.`);return}try{const s=await t(),o=s.default||s;g(o),console.log(`Theme "${n}" loaded successfully.`)}catch(s){console.error(`Failed to load theme "${n}":`,s)}};d("gruvbox-dark",()=>import("./themes/gruvbox-dark.js")),d("gruvbox-light",()=>import("./themes/gruvbox-light.js")),d("nbs",()=>import("./themes/nbs.js"));export default{parseColor:x,generateShades:M,generateThemeVariables:k,injectThemeCSS:v,registerTheme:d,loadTheme:I,applyTheme:g,availableThemes:m,loadCSS:S,loadFont:w,getComponentCSS:$,rgbToHSL:u,hslToCSS:i,adjustLightness:b,mixWithColor:T};export{x as parseColor,M as generateShades,k as generateThemeVariables,v as injectThemeCSS,d as registerTheme,I as loadTheme,g as applyTheme,m as availableThemes,S as loadCSS,w as loadFont,$ as getComponentCSS,u as rgbToHSL,i as hslToCSS,b as adjustLightness,T as mixWithColor};\n',mimeType:"text/javascript"},"/$app/tailwind/index.js":{content:"export default {}"},"/$app/uix/app.js":{content:'import e from"/$app/theme/index.js";import{html as m}from"/npm/lit-html";import o from"/$app.js";import r from"./index.js";o.routes.set({"/showcase":()=>m`<uix-showcase></uix-showcase>`}),e.loadCSS("/$app/uix/theme.css",!0),o.addModule(r);\n',mimeType:"text/javascript"},"/$app/icon-lucide/app.js":{content:`import o from"/$app.js";o.addModule({name:"icon-lucide",icon:!0});
`,mimeType:"text/javascript"},"/controllers/index.js":{content:'import i from"/$app.js";import{html as e}from"/npm/lit-html";const a={"/":{name:"discover",component:()=>e`<view-discover-view></view-discover-view>`,title:"Discover - MEETUP.RIO",template:"template-app"},"/discover":{name:"discover-alias",component:()=>e`<view-discover-view></view-discover-view>`,title:"Discover - MEETUP.RIO",routes:{"/:category":{name:"discover-category",component:({category:t})=>e`<view-discover-view .initialCategory=${t}></view-discover-view>`,title:"Discover - MEETUP.RIO"}},template:"template-app"},"/events":{name:"events",component:()=>e`<view-events-view></view-events-view>`,title:"Events - MEETUP.RIO",template:"template-app"},"/guides":{name:"guides",component:()=>e`<view-guides-view .data-query=${{model:"guides",key:"guides"}}></view-guides-view>`,title:"Guides - MEETUP.RIO",template:"template-app"},"/guide/:slug":{name:"guide-detail",component:({slug:t})=>e`<view-guide-detail-view .data-query=${{model:"guides",where:{slug:t},key:"guide",single:!0}}></view-guide-detail-view>`,title:"Guide - MEETUP.RIO",template:"template-detail",pageTitle:"GUIDE"},"/groups":{name:"groups",component:()=>e`<view-groups-view  .data-query=${{model:"groups",key:"groups"}}></view-groups-view>`,title:"Groups - MEETUP.RIO",template:"template-app"},"/profile":{name:"profile",component:()=>e`<view-profile-view></view-profile-view>`,title:"My Profile - MEETUP.RIO",template:"template-app"},"/place/:slug":{name:"place-detail",component:({slug:t})=>e`<view-place-detail-view .data-query=${{model:"places",where:{slug:t},key:"place",single:!0}}></view-place-detail-view>`,title:"Place - MEETUP.RIO",template:"template-detail",pageTitle:"PLACE DETAILS"},"/event/:slug":{name:"event-detail",component:({slug:t})=>e`<view-event-detail-view .data-query=${{model:"events",where:{slug:t},key:"event",single:!0}}></view-event-detail-view>`,title:"Event - MEETUP.RIO",template:"template-detail",pageTitle:"EVENT DETAILS"},"/meetup/:slug":{name:"meetup-detail",component:({slug:t})=>e`<view-meetup-detail-view .data-query=${{model:"meetups",where:{slug:t},key:"meetup",single:!0}}></view-meetup-detail-view>`,title:"Meetup - MEETUP.RIO",template:"template-detail",pageTitle:"MEETUP DETAILS"},"/group/:slug":{name:"group-detail",component:({slug:t})=>e`<view-group-detail-view .data-query=${{model:"groups",where:{slug:t},key:"group",single:!0}}></view-group-detail-view>`,title:"Group - MEETUP.RIO",template:"template-detail",pageTitle:"GROUP DETAILS"},"/calendar":{name:"calendar",component:()=>e`<view-calendar-view></view-calendar-view>`,title:"Calendar - MEETUP.RIO",template:"template-app"},"/auth/callback":{name:"auth-callback",component:()=>e`<view-auth-callback></view-auth-callback>`,title:"Authenticating... - MEETUP.RIO"},"/notifications":{name:"notifications",component:()=>e`<view-notifications-view></view-notifications-view>`,title:"Notifications - MEETUP.RIO",template:"template-app"},"/settings":{name:"settings",component:()=>e`<view-settings-view></view-settings-view>`,title:"Settings - MEETUP.RIO",template:"template-app"},"/about":{name:"about",component:()=>e`<view-about-view></view-about-view>`,title:"About - MEETUP.RIO",template:"template-app"}};i.routes.set(a);\n',mimeType:"text/javascript"},"/$app/maps/app.js":{content:`import m from"/$app.js";import a from"./search.js";m.addModule({name:"maps"}),m.define("maps-search",a);
`,mimeType:"text/javascript"},"/$app/auth/frontend.js":{content:'export class AuthSession{static STORAGE_KEY="bootstrapp_auth";static TOKEN_KEY="bootstrapp_token";static get(){try{const o=localStorage.getItem(AuthSession.STORAGE_KEY);return o?JSON.parse(o):null}catch(o){return console.error("AuthSession: Failed to parse stored session",o),null}}static set(o,e,t=null){const r={token:o,user:e,timestamp:Date.now()};localStorage.setItem(AuthSession.STORAGE_KEY,JSON.stringify(r)),localStorage.setItem(AuthSession.TOKEN_KEY,o),t?.SW&&t.SW.postMessage({type:"SW:BROADCAST_AUTH_STATE",payload:{token:o,user:e,action:"login"}})}static clear(o=null){localStorage.removeItem(AuthSession.STORAGE_KEY),localStorage.removeItem(AuthSession.TOKEN_KEY),o?.SW&&o.SW.postMessage({type:"SW:BROADCAST_AUTH_STATE",payload:{action:"logout"}})}static getToken(){return localStorage.getItem(AuthSession.TOKEN_KEY)}static isValid(){const o=AuthSession.get();if(!o||!o.token)return!1;try{return JSON.parse(atob(o.token.split(".")[1])).exp*1e3>Date.now()}catch{return!1}}static getExpiration(){const o=AuthSession.get();if(!o||!o.token)return null;try{return JSON.parse(atob(o.token.split(".")[1])).exp*1e3}catch{return null}}}export function createAuth(s){return{user:null,token:null,_refreshTimer:null,_$APP:s,get isAuthenticated(){return!!this.token&&!!this.user},get isGuest(){return!this.isAuthenticated},_GUEST_ID_KEY:"bootstrapp_guest_id",getGuestId(){let e=localStorage.getItem(this._GUEST_ID_KEY);return e||(e=`guest_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,localStorage.setItem(this._GUEST_ID_KEY,e)),e},clearGuestId(){localStorage.removeItem(this._GUEST_ID_KEY)},get currentUserId(){return this.isAuthenticated?this.user.id:this.getGuestId()},isGuestId(e){return typeof e=="string"&&e.startsWith("guest_")},async login(e,t){try{const r=await s.Backend.request("AUTH:LOGIN",{email:e,password:t});return r.error?{success:!1,error:r.error}:r.token&&r.user?(this.token=r.token,this.user=r.user,AuthSession.set(r.token,r.user,s),this._startRefreshTimer(),s.Database?.handleUserLogin&&await s.Database.handleUserLogin(r.user.id),s.events.emit("AUTH:LOGGED_IN",{user:r.user}),{success:!0,user:r.user}):{success:!1,error:"Invalid response from server"}}catch(r){return console.error("Auth.login error:",r),{success:!1,error:r.message}}},async register(e){try{const t=await s.Backend.request("AUTH:REGISTER",e);return t.error?{success:!1,error:t.error,data:t.data}:t.token&&t.user?(this.token=t.token,this.user=t.user,AuthSession.set(t.token,t.user,s),this._startRefreshTimer(),s.events.emit("AUTH:REGISTERED",{user:t.user}),{success:!0,user:t.user}):{success:!1,error:"Invalid response from server"}}catch(t){return console.error("Auth.register error:",t),{success:!1,error:t.message}}},async loginWithOAuth(e){try{const t=`${window.location.origin}/auth/callback`,r=await s.Backend.request("AUTH:OAUTH_START",{provider:e,redirectUrl:t});return r.error?{success:!1,error:r.error}:r.authUrl&&r.codeVerifier?(sessionStorage.setItem("oauth_code_verifier",r.codeVerifier),sessionStorage.setItem("oauth_provider",e),sessionStorage.setItem("oauth_redirect",window.location.href),sessionStorage.setItem("oauth_state",r.state||""),window.location.href=r.authUrl,{success:!0,redirecting:!0}):{success:!1,error:"Invalid OAuth response"}}catch(t){return console.error("Auth.loginWithOAuth error:",t),{success:!1,error:t.message}}},async completeOAuth(e,t){try{const r=sessionStorage.getItem("oauth_code_verifier"),n=sessionStorage.getItem("oauth_provider"),i=sessionStorage.getItem("oauth_state"),u=`${window.location.origin}/auth/callback`;if(sessionStorage.removeItem("oauth_code_verifier"),sessionStorage.removeItem("oauth_provider"),sessionStorage.removeItem("oauth_state"),!r||!n)return{success:!1,error:"OAuth session expired"};if(i&&t&&i!==t)return{success:!1,error:"OAuth state mismatch"};const a=await s.Backend.request("AUTH:OAUTH_COMPLETE",{provider:n,code:e,codeVerifier:r,redirectUrl:u});if(a.error)return{success:!1,error:a.error};if(a.token&&a.user){this.token=a.token,this.user=a.user,AuthSession.set(a.token,a.user,s),this._startRefreshTimer(),s.events.emit("AUTH:OAUTH_SUCCESS",{user:a.user,provider:n});const c=sessionStorage.getItem("oauth_redirect")||"/";return sessionStorage.removeItem("oauth_redirect"),setTimeout(()=>{window.location.href=c},100),{success:!0,user:a.user}}return{success:!1,error:"Invalid OAuth response"}}catch(r){return console.error("Auth.completeOAuth error:",r),{success:!1,error:r.message}}},async logout(){try{await s.Backend.request("AUTH:LOGOUT")}catch(e){console.warn("Auth.logout backend error (continuing):",e)}this.token=null,this.user=null,this._stopRefreshTimer(),AuthSession.clear(s),s.Database?.handleUserLogout&&s.Database.handleUserLogout(this.getGuestId()),s.events.emit("AUTH:LOGGED_OUT")},async refreshToken(){if(!this.token)return!1;try{const e=await s.Backend.request("AUTH:REFRESH_TOKEN",{token:this.token});return e.token&&e.user?(this.token=e.token,this.user=e.user,AuthSession.set(e.token,e.user,s),!0):!1}catch(e){return console.error("Auth.refreshToken error:",e),await this.logout(),!1}},async restore(){const e=AuthSession.get();if(!e||!e.token)return this.user=null,this.token=null,!1;if(AuthSession.isValid())this.token=e.token,this.user=e.user,this._startRefreshTimer();else if(this.token=e.token,!await this.refreshToken())return AuthSession.clear(s),!1;return s.events.emit("AUTH:RESTORED",{user:this.user}),!0},async updateUser(e){if(!this.isAuthenticated)return{success:!1,error:"Not authenticated"};try{const t=await s.Backend.request("AUTH:UPDATE_USER",e);return t.error?{success:!1,error:t.error}:t.user?(this.user=t.user,AuthSession.set(this.token,t.user,s),s.events.emit("AUTH:USER_UPDATED",{user:t.user}),{success:!0,user:t.user}):{success:!1,error:"Invalid response"}}catch(t){return{success:!1,error:t.message}}},async convertGuest(e,t){const r=this.getGuestId(),n={...t,...e},i=await this.register(n);return i.success&&(s.events.emit("AUTH:GUEST_CONVERTED",{guestId:r,newUserId:i.user.id,user:i.user}),this.clearGuestId()),i},_startRefreshTimer(){this._stopRefreshTimer();const e=async()=>{const t=AuthSession.getExpiration();if(!t)return;t-Date.now()<15*60*1e3&&await this.refreshToken()};this._refreshTimer=setInterval(e,6e5),e()},_stopRefreshTimer(){this._refreshTimer&&(clearInterval(this._refreshTimer),this._refreshTimer=null)}}}export function initAuthFrontend(s){const o=createAuth(s);return s.addModule({name:"Auth",base:o}),s.swEvents?.set("SW:AUTH_STATE_UPDATE",({payload:e})=>{const{action:t,token:r,user:n}=e;t==="logout"?(o.token=null,o.user=null,o._stopRefreshTimer(),s.events.emit("AUTH:LOGGED_OUT")):t==="login"&&r&&n&&(o.token=r,o.user=n,o._startRefreshTimer(),s.events.emit("AUTH:LOGGED_IN",{user:n}))}),o}export default{AuthSession,createAuth,initAuthFrontend};\n',mimeType:"text/javascript"},"/$app/notifications/index.js":{content:`import e from"/$app.js";const f=async()=>{try{await import("./plugin.js")}catch{}};e.addModule({name:"notifications",path:"/$app/notifications/views",base:{async getUnreadCount(t){return t&&(await e.Model.notifications.getAll({where:{recipient:t,read:!1}}))?.length||0},async markAsRead(t){t&&await e.Model.notifications.edit({id:t,read:!0,readAt:new Date().toISOString()})},async markAllAsRead(t){if(!t)return;const a=await e.Model.notifications.getAll({where:{recipient:t,read:!1}});await Promise.all(a.map(i=>this.markAsRead(i.id)))},async send({recipients:t,title:a,message:i,type:n="system",contentType:r,contentSlug:o,senderId:s}){const l=new Date().toISOString(),c=Array.isArray(t)?t:[t];return Promise.all(c.map(d=>e.Model.notifications.add({recipient:d,sender:s||null,type:n,title:a,message:i,contentType:r||null,contentSlug:o||null,read:!1,createdAt:l})))},async broadcast({title:t,message:a,type:i="system",contentType:n,contentSlug:r,senderId:o}){const s=await e.Model.users.getAll();return this.send({recipients:s.map(l=>l.id),title:t,message:a,type:i,contentType:n,contentSlug:r,senderId:o})},async remove(t){t&&await e.Model.notifications.remove(t)},async removeAllForUser(t){if(!t)return;const a=await e.Model.notifications.getAll({where:{recipient:t}});await Promise.all(a.map(i=>this.remove(i.id)))}}}),f();export default e.notifications;
`,mimeType:"text/javascript"},"/$app/cms/plugin.js":{content:`import{registerPlugin as d}from"/$app/admin/plugins.js";import n from"/$app.js";import{html as a}from"/npm/lit-html";n.addModule({name:"cms"}),d("cms",{fieldTypes:{richText:(e,t,i)=>a\`
      <cms-rich-text
        .value=\${t||""}
        .field=\${e}
        @change=\${m=>i(m.detail)}
      ></cms-rich-text>
    \`,media:(e,t,i)=>a\`
      <cms-media-picker
        .value=\${t||""}
        .field=\${e}
        @change=\${m=>i(m.detail)}
      ></cms-media-picker>
    \`,seo:(e,t,i)=>a\`
      <cms-seo-fields
        .value=\${t||{}}
        .field=\${e}
        @change=\${m=>i(m.detail)}
      ></cms-seo-fields>
    \`,publishStatus:(e,t,i)=>a\`
      <cms-publishing-bar
        .status=\${t||"draft"}
        @status-change=\${m=>i(m.detail)}
      ></cms-publishing-bar>
    \`},sidebar:[{label:"Content",icon:"file-text",href:"/admin/content"},{label:"Media Library",icon:"image",href:"/admin/media-library"}],routes:{"/admin/content":{name:"cms-dashboard",component:()=>a\`<cms-dashboard></cms-dashboard>\`,title:"Content Management",template:"admin-layout"},"/admin/content/:model/new":{name:"cms-editor-new",component:({model:e})=>a\`
        <cms-editor model=\${e}></cms-editor>
      \`,title:"New Content",template:"admin-layout"},"/admin/content/:model/:id":{name:"cms-editor",component:({model:e,id:t})=>a\`
        <cms-editor model=\${e} contentId=\${t} .data-query=\${{model:e,id:Number(t),key:"content"}}></cms-editor>
      \`,title:"Edit Content",template:"admin-layout"},"/admin/content/:model":{name:"cms-content-list",component:({model:e})=>a\`
        <cms-content-list
          model=\${e}
          .data-query=\${{model:e,key:"items"}}
        ></cms-content-list>
      \`,title:"Content",template:"admin-layout"},"/admin/media-library":{name:"cms-media-library",component:()=>a\`
        <cms-media-library
          .data-query=\${{model:"cms_media",key:"media"}}
        ></cms-media-library>
      \`,title:"Media Library",template:"admin-layout"}}}),console.error("[CMS] Plugin registered"),console.log(n.routes);
`,mimeType:"text/javascript"},"/$app/i18n/base.js":{content:'export class I18n{constructor(){this.translations={},this.currentLocale="en",this.fallbackLocale="en",this.loadedLocales=new Set,this.localeLoaders={}}registerLocale(t,e){this.localeLoaders[t]=e}addTranslations(t,e){!e||typeof e=="object"&&Object.keys(e).length===0||(this.translations[t]||(this.translations[t]={}),this.translations[t]=this.deepMerge(this.translations[t],e),this.loadedLocales.add(t))}deepMerge(t,e){const r={...t};for(const a in e)e[a]&&typeof e[a]=="object"&&!Array.isArray(e[a])?r[a]=this.deepMerge(r[a]||{},e[a]):r[a]=e[a];return r}async loadLocale(t){const e=this.translations[t]&&Object.keys(this.translations[t]).length>0;if(!(this.loadedLocales.has(t)&&e)&&this.localeLoaders[t])try{const r=await this.localeLoaders[t]();this.addTranslations(t,r.default||r)}catch(r){console.warn(`Failed to load locale "${t}":`,r)}}async setLanguage(t){return await this.loadLocale(t),this.currentLocale=t,typeof $APP<"u"&&$APP.events&&$APP.events.emit("i18n:language-changed",{locale:t}),t}getLanguage(){return this.currentLocale}getAvailableLocales(){const t=new Set([...Object.keys(this.localeLoaders),...Object.keys(this.translations)]);return Array.from(t)}getNestedValue(t,e){return e.split(".").reduce((r,a)=>r?.[a],t)}getPluralCategory(t){try{return new Intl.PluralRules(this.currentLocale).select(t)}catch{return t===0?"zero":t===1?"one":"other"}}isPluralObject(t){if(!t||typeof t!="object"||Array.isArray(t))return!1;const e=["zero","one","two","few","many","other"];return Object.keys(t).some(a=>e.includes(a))}selectPlural(t,e){const r=this.getPluralCategory(e);return t[r]?t[r]:t.other||t[Object.keys(t)[0]]||""}formatNumber(t,e={}){try{return new Intl.NumberFormat(this.currentLocale,{style:e.style||"decimal",minimumFractionDigits:e.minimumFractionDigits,maximumFractionDigits:e.maximumFractionDigits,currency:e.currency,...e}).format(t)}catch(r){return console.warn("Number formatting failed:",r),String(t)}}formatDate(t,e={}){try{return new Intl.DateTimeFormat(this.currentLocale,{dateStyle:e.dateStyle||"medium",timeStyle:e.timeStyle,...e}).format(new Date(t))}catch(r){return console.warn("Date formatting failed:",r),String(t)}}formatRelativeDate(t){const e=new Date,r=new Date(t),a=new Date(e.getFullYear(),e.getMonth(),e.getDate()),i=new Date(r.getFullYear(),r.getMonth(),r.getDate())-a,n=Math.round(i/(1e3*60*60*24));if(n===0)return this.t("relative.today")||"today";if(n===-1)return this.t("relative.yesterday")||"yesterday";if(n===1)return this.t("relative.tomorrow")||"tomorrow";if(n<0)try{return new Intl.RelativeTimeFormat(this.currentLocale,{numeric:"auto"}).format(n,"day")}catch{return this.t("relative.daysAgo",{n:Math.abs(n)})||`${Math.abs(n)} days ago`}else try{return new Intl.RelativeTimeFormat(this.currentLocale,{numeric:"auto"}).format(n,"day")}catch{return this.t("relative.inDays",{n})||`in ${n} days`}}interpolate(t,e={}){return!t||typeof t!="string"?t:t.replace(/\\{(\\w+)\\}/g,(r,a)=>e[a]!==void 0?e[a]:r)}t(t,e={}){if(!t)return"";let r=this.getNestedValue(this.translations[this.currentLocale],t);if(r===void 0&&this.currentLocale!==this.fallbackLocale&&(r=this.getNestedValue(this.translations[this.fallbackLocale],t)),r===void 0)return console.warn(`Translation not found for key "${t}" in locale "${this.currentLocale}"`),t;if(this.isPluralObject(r)){const a=e.n!==void 0?e.n:e.count;if(a===void 0)return console.warn(`Plural translation "${t}" requires \'n\' or \'count\' parameter`),t;r=this.selectPlural(r,a)}return typeof r!="string"?(console.warn(`Translation for key "${t}" is not a string`),t):this.interpolate(r,e)}}export default I18n;\n',mimeType:"text/javascript"},"/$app/i18n/view-plugin.js":{content:'export default{name:"i18n",init:({component:t,definition:i,tag:a})=>{if(i.i18n&&typeof i.i18n=="object"){const n={[a]:i.i18n};typeof $APP<"u"&&$APP.i18n&&$APP.i18n.addTranslations("en",n)}t.prototype.$t=function(n,e){const P=this.tagName.toLowerCase();return $APP.i18n.t(`${P}.${n}`,e)},t.prototype.$n=(n,e)=>$APP.i18n.n(n,e),t.prototype.$d=(n,e)=>$APP.i18n.d(n,e),t.prototype.$r=n=>$APP.i18n.r(n)},events:{connected:function(){this._i18nUpdateHandler=()=>{this.requestUpdate()},typeof $APP<"u"&&$APP.events&&$APP.events.on("i18n:language-changed",this._i18nUpdateHandler)},disconnected:function(){this._i18nUpdateHandler&&typeof $APP<"u"&&$APP.events&&($APP.events.off("i18n:language-changed",this._i18nUpdateHandler),this._i18nUpdateHandler=null)}}};\n',mimeType:"text/javascript"},"/$app/uix/index.js":{content:`export default{name:"uix",path:"/$app",root:!0,i18n:{pt:()=>import("./locales/pt.js")}};
`,mimeType:"text/javascript"},"/$app/maps/search.js":{content:`import s from"/$app/types/index.js";import{html as t}from"/npm/lit-html";import{createMapsClient as a}from"./index.js";export default{tag:"maps-search",style:!0,properties:{query:s.string({defaultValue:""}),results:s.array({defaultValue:[]}),loading:s.boolean({defaultValue:!1}),selectedResult:s.object(),placeholder:s.string({defaultValue:"Search for a place..."})},async search(){if(this.query.trim()){this.loading=!0;try{const e=a();this.results=await e.search(this.query)}catch(e){console.error("Maps search error:",e),this.results=[]}this.loading=!1}},selectResult(e){this.selectedResult=e,this.emit("place-selected",e)},handleKeydown(e){e.key==="Enter"&&this.search()},render(){return t\`<div class="maps-search-input">
          <uix-input
            .value=\${this.query}
            @input=\${e=>this.query=e.target.value}
            @keydown=\${this.handleKeydown}
            placeholder=\${this.placeholder}
            icon="search"
          ></uix-input>
          <uix-button @click=\${()=>this.search()} ?loading=\${this.loading}>
            <uix-icon name="search" size="18"></uix-icon>
            Search
          </uix-button>
        </div>

        \${this.results.length>0?t\`
              <div class="maps-results">
                \${this.results.map(e=>t\`
                    <div
                      class="maps-result \${this.selectedResult?.id===e.id?"selected":""}"
                      @click=\${()=>this.selectResult(e)}
                    >
                      <uix-icon name="map-pin" size="16" class="maps-result-icon"></uix-icon>
                      <div class="maps-result-content">
                        <strong class="maps-result-name">\${e.name}</strong>
                        <small class="maps-result-address">\${e.address}</small>
                      </div>
                    </div>
                  \`)}
              </div>
            \`:""}
    \`}};
`,mimeType:"text/javascript"},"/$app/admin/plugins.js":{content:`import s from"/$app.js";const o=new Map;export const registerPlugin=(e,t)=>{o.set(e,{name:e,...t}),t.routes&&s.routes&&s.routes.set(t.routes)},getPlugins=()=>[...o.values()],getModelActions=e=>getPlugins().filter(t=>t.actions?.[e]).flatMap(t=>t.actions[e]),getPluginModals=()=>getPlugins().reduce((e,t)=>({...e,...t.modals}),{}),getFieldTypes=()=>getPlugins().reduce((e,t)=>({...e,...t.fieldTypes}),{}),getSidebarItems=()=>getPlugins().filter(e=>e.sidebar).flatMap(e=>e.sidebar),getPluginRoutes=()=>getPlugins().reduce((e,t)=>({...e,...t.routes}),{});
`,mimeType:"text/javascript"},"/$app/maps/index.js":{content:'const n={nominatim:{search:async e=>(await(await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(e)}&format=json&limit=10&addressdetails=1`,{headers:{"User-Agent":"Bootstrapp/1.0"}})).json()).map(a=>({id:a.place_id,name:a.name||a.display_name.split(",")[0],address:a.display_name,lat:parseFloat(a.lat),lng:parseFloat(a.lon),type:a.type,category:a.class}))}};export const createMapsClient=(e="nominatim")=>{const s=n[e];if(!s)throw new Error(`Unknown maps provider: ${e}`);return{search:t=>s.search(t),provider:e}},registerProvider=(e,s)=>{n[e]=s};export default createMapsClient;\n',mimeType:"text/javascript"},"/$app/uix/theme.css":{content:`html,body{font-family:var(--font-family);background-color:var(--background-color);color:var(--text-color);width:100%;min-height:100%;height:100%;padding:0;margin:0}a{color:inherit;text-decoration:none;cursor:pointer}html{font-size:14px}@media (max-width: 768px){html{font-size:18px}}@media (max-width: 480px){html{font-size:20px}}textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}:root{box-sizing:border-box;text-size-adjust:none;line-height:1.2}*,*:before,*:after{box-sizing:border-box}*{margin:0}body{font-family:var(--font-family)}button,textarea,select{background-color:inherit;border-width:0;color:inherit}img,picture,video,canvas,svg{display:block;max-width:100%}input,button,textarea,select{font:inherit;background:inherit;border:inherit}p,h1,h2,h3,h4,h5,h6{font-family:var(--font-family);overflow-wrap:break-word}dialog::backdrop{background-color:#000c}::-webkit-scrollbar{width:10px;height:10px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#79797966;border-radius:0}::-webkit-scrollbar-thumb:hover{background:#646464b3}::-webkit-scrollbar-thumb:active{background:#555c}::-webkit-scrollbar-corner{background:transparent}*{scrollbar-width:thin;scrollbar-color:rgba(121,121,121,.4) transparent}*:not(:defined){display:block;height:100%;opacity:0;transition:opacity .5s ease-in-out;border:1px solid red}.dark{filter:invert(1) hue-rotate(180deg)}.dark img,.dark dialog,.dark video,.dark iframe{filter:invert(1) hue-rotate(180deg)}[direction=horizontal]{--flex-direction: row;flex-direction:row}[direction=vertical]{--flex-direction: column;flex-direction:row}[cursor-pointer]{cursor:pointer}[w-full]{width:100%}[h-full]{height:100%}[min-h-0]{min-height:0}[min-w-0]{min-width:0}[flex]{display:flex}[flex-col]{flex-direction:column}[flex-1]{flex:1}[flex-grow]{flex-grow:1}[flex-shrink-0]{flex-shrink:0}
`,mimeType:"text/css"},"/$app/notifications/plugin.js":{content:'import{registerPlugin as o}from"/$app/admin/plugins.js";import{html as i}from"/npm/lit-html";o("notifications",{sidebar:[{label:"Notifications",icon:"bell",href:"/admin/notifications"}],routes:{"/admin/notifications":{name:"admin-notifications",component:()=>i`<notifications-admin-history></notifications-admin-history>`,title:"Admin - Notifications",template:"admin-layout"},"/admin/notifications/compose":{name:"admin-notifications-compose",component:()=>i`<notifications-admin-compose></notifications-admin-compose>`,title:"Admin - Compose Notification",template:"admin-layout"}}});\n',mimeType:"text/javascript"},"/$app/view/component-discovery.js":{content:'export async function loadComponentMappings(){const t={},c=await fetch("/package.json").then(o=>o.json()),p=c.bootstrapp?.components;if(p)for(const[o,e]of Object.entries(p))if(typeof e=="object"&&!Array.isArray(e))t[o]={base:"/",paths:e};else{const i=Array.isArray(e)?e:[e];t[o]={base:"/",folders:i.map(s=>s.endsWith("/")?s:s+"/")}}const f=Object.keys(c.dependencies||{}).filter(o=>o.startsWith("@bootstrapp/"));for(const o of f){const e=`/node_modules/${o}/package.json`;try{const s=(await fetch(e).then(r=>r.json()))?.bootstrapp?.components;if(s){for(const[r,n]of Object.entries(s))if(!t[r])if(typeof n=="object"&&!Array.isArray(n))t[r]={base:`/node_modules/${o}/`,paths:n};else{const d=Array.isArray(n)?n:[n];t[r]={base:`/node_modules/${o}/`,folders:d.map(a=>a.endsWith("/")?a:a+"/")}}}}catch{}}return t}\n',mimeType:"text/javascript"},"/$app/theme/dev.js":{content:"export default {}"},"/locales/en.js":{content:`export default{app:{title:"MEETUP.RIO",tagline:"Discover the best of Rio de Janeiro"},tabs:{discover:"Discover",events:"Events",guides:"Guides",groups:"Groups",profile:"Profile"},categories:{all:"All",beaches:"Beaches",hiking:"Hiking",culture:"Culture",parties:"Parties",food:"Food & Drinks",sports:"Sports",dancing:"Dancing",groups:"Groups"},guides:{title:"Guides",article:"Article",list:"Curated List",featured:"Featured Guides",allGuides:"All Guides",empty:"No guides available yet",placesInGuide:"Places in this Guide",writtenBy:"Written by",contents:"Contents",viewPlace:"View Place",viewEvent:"View Event"},events:{title:"Events",thisWeek:"This Week",upcoming:"Upcoming",weekly:"Weekly Events",recurring:"Recurring",noEvents:"No events scheduled"},actions:{like:"Like",skip:"Skip",share:"Share",unlike:"Unlike",join:"Join",joined:"Joined",beFirst:"Be the first to join!",peopleJoined:"{count} joined"},browse:{saved:"SAVED!",allCaughtUp:"All Caught Up!",noMoreContent:"You've explored everything in this category!",viewSaved:"View Saved",showSkipped:"Show Skipped Again",cardView:"Cards",listView:"List",noContent:"No content available"},groups:{title:"WhatsApp Groups",subtitle:"Join Rio communities and stay connected",featured:"Featured Groups",allGroups:"All Groups",empty:"No groups available yet",joinGroup:"Join Group"},saved:{title:"Your Saved Places",empty:"No Saved Places Yet",emptyDescription:"Start browsing and save your favorite places and events!",count:{zero:"no saved items",one:"{n} saved item",other:"{n} saved items"}},about:{title:"About Rio",description:"Rio de Janeiro is a vibrant city known for its stunning beaches, lively culture, and iconic landmarks. Whether you're looking for relaxation on the sand, exciting nightlife, delicious food, or breathtaking attractions, Rio has something for everyone!",feature1:"Discover famous beaches like Copacabana and Ipanema",feature2:"Explore the best nightlife and live music venues",feature3:"Find amazing restaurants and local food spots",feature4:"Visit iconic attractions and hidden gems",sampleDataTitle:"Try It Out!",sampleDataDescription:"Load sample places and events to explore how the app works.",loadSampleData:"Load Sample Data",loading:"Loading...",dataLoaded:"Sample data loaded successfully!",dataLoadError:"Error loading sample data. Please try again."},content:{date:"Date",time:"Time",venue:"Venue",address:"Address"},relative:{today:"today",yesterday:"yesterday",tomorrow:"tomorrow",daysAgo:"{n} days ago",inDays:"in {n} days"},calendar:{title:"Events Calendar",listView:"List",gridView:"Month",today:"Today",tomorrow:"Tomorrow",thisWeek:"This Week",later:"Later",noEvents:"No events scheduled",eventsToday:"Events Today",recurring:"Recurring",nextOccurrence:"Next: {date}",viewAll:"View All"},recurrence:{daily:"Daily",weekly:"Weekly",monthly:"Monthly",custom:"Custom Days",ends:"Ends on {date}",never:"Never ends",everyMonday:"Every Monday",everyFriday:"Every Friday",pattern:"Every {pattern}"},location:{allowLocation:"Allow Location",skip:"Skip for now",whyNeeded:"We use your location to show nearby events",nearYou:"Near You",requestPermission:"Enable location to see events near you",permissionDenied:"Location access denied",distance:"Distance",getDirections:"Get Directions"},tags:{"pet-friendly":"Pet Friendly","wheelchair-accessible":"Accessible","free-entry":"Free Entry","family-friendly":"Family Friendly","must-see":"Must See",chill:"Chill",romantic:"Romantic",adventure:"Adventure",party:"Party","local-favorite":"Local Favorite"},badges:{recommended:"Recommended",popular:"Popular",featured:"Featured"},search:{placeholder:"Search places, events, guides...",noResults:"No results found",places:"Places",events:"Events",guides:"Guides",groups:"Groups"},related:{places:"Similar Places",events:"You Might Also Like",guides:"Related Guides",groups:"Similar Communities"}};
`,mimeType:"text/javascript"},"/backend.js":{content:`$APP.databaseConfig={type:"indexeddb",url:"http://127.0.0.1:8090",adminEmail:"alanmeira@gmail.com",adminPassword:"1234567890",autoAuth:!0,syncOnInit:!1,conflictStrategy:"local-wins"};import"/$app/base/backend.js";
`,mimeType:"text/javascript"},"/$app/theme/themes/nbs.js":{content:`const r="Manrope";export default{font:{family:r,icon:{family:"lucide"},normal:"400",medium:"500",semibold:"600",bold:"700",black:"900"},link:{color:"var(--text-color)"},text:{color:"#1a1a1a",muted:"#6b7280",xs:"0.75rem",sm:"0.875rem",base:"1rem",lg:"1.125rem",xl:"1.25rem","2xl":"1.5rem","3xl":"1.875rem"},background:{color:"#faf5f0"},color:{primary:"#fabd2f","primary-lighter":"#fde8a3","primary-light":"#fcd875","primary-dark":"#d79921","primary-darker":"#b57614",secondary:"#ec4899","secondary-lighter":"#fbcfe8","secondary-light":"#f9a8d4","secondary-dark":"#db2777","secondary-darker":"#be185d",success:"#22c55e","success-lighter":"#bbf7d0","success-light":"#86efac","success-dark":"#16a34a","success-darker":"#15803d",danger:"#ef4444","danger-lighter":"#fecaca","danger-light":"#fca5a5","danger-dark":"#dc2626","danger-darker":"#b91c1c",warning:"#f97316","warning-lighter":"#fed7aa","warning-light":"#fdba74","warning-dark":"#ea580c","warning-darker":"#c2410c",info:"#3b82f6","info-lighter":"#bfdbfe","info-light":"#93c5fd","info-dark":"#2563eb","info-darker":"#1d4ed8",surface:"#ffffff","surface-light":"#faf5f0","surface-lighter":"#ffffff","surface-dark":"#f5f0eb","surface-darker":"#ebe5df",hover:"#d79921",focus:"#fabd2f",inverse:"#1a1a1a","inverse-lighter":"#525252","inverse-light":"#404040","inverse-dark":"#0a0a0a","inverse-darker":"#000000"},spacing:{xs:"0.25rem",sm:"0.5rem",md:"0.75rem",lg:"1rem",xl:"1.5rem","2xl":"2rem","3xl":"3rem","4xl":"5rem"},leading:{tight:"1.2",normal:"1.5",relaxed:"1.75"},radius:{none:"0",sm:"0.5rem",md:"0.75rem",lg:"1rem",xl:"1.5rem",full:"9999px"},shadow:{none:"none",sm:"2px 2px 0px 0px rgba(0,0,0,1)",md:"4px 4px 0px 0px rgba(0,0,0,1)",lg:"6px 6px 0px 0px rgba(0,0,0,1)",xl:"8px 8px 0px 0px rgba(0,0,0,1)","2xl":"12px 12px 0px 0px rgba(0,0,0,1)"},button:{"border-size":"3px","border-color":"black","border-radius":"0.75rem",shadow:"4px 4px 0px 0px rgba(0,0,0,1)","hover-shadow":"2px 2px 0px 0px rgba(0,0,0,1)","active-shadow":"none","hover-translate-x":"-2px","hover-translate-y":"-2px","active-translate-x":"2px","active-translate-y":"2px","font-weight":"900","text-transform":"uppercase"},input:{background:"#ffffff","background-focus":"#ffffff","background-disabled":"#f5f5f5","border-color":"#000000","border-width":"3px","border-radius":"0.75rem","border-focus":"#000000","border-error":"#ef4444",text:"#1a1a1a",placeholder:"#9ca3af",icon:"#6b7280",shadow:"4px 4px 0px 0px rgba(0,0,0,1)","focus-shadow":"6px 6px 0px 0px rgba(0,0,0,1)"},checkbox:{"border-width":"3px","border-color":"#000000","border-radius":"0.375rem",shadow:"3px 3px 0px 0px rgba(0,0,0,1)","hover-border-color":"#000000","checked-background-color":"#fabd2f","checked-border-color":"#000000","label-font-weight":"600"},label:{"font-size":"1rem","font-weight":"700",color:"#1a1a1a","letter-spacing":"0.05em","text-transform":"uppercase",margin:"0.5rem"},tabs:{background:"#ffffff","border-color":"#000000","border-width":"3px","border-radius":"0.75rem",shadow:"4px 4px 0px 0px rgba(0,0,0,1)","list-background":"#f5f5f5","list-border-color":"#000000",tab:{padding:"1rem 1.5rem",gap:"0.5rem","font-size":"0.875rem","font-weight":"900","text-transform":"uppercase","letter-spacing":"0.05em",color:"#6b7280","color-hover":"#1a1a1a","color-active":"#1a1a1a",background:"transparent","background-hover":"#e5e5e5","background-active":"#ffffff","border-width":"3px","border-active":"#000000"}},card:{background:"#ffffff",border:"#000000","border-width":"3px","border-hover":"#000000",text:"#1a1a1a","text-muted":"#6b7280",header:{background:"transparent",border:"#000000",padding:"0.75rem 1rem"},footer:{background:"transparent",border:"#000000","border-style":"solid",padding:"0.75rem 1rem"},icon:{background:"#f5f5f5",size:"3rem","border-radius":"0.75rem"},tag:{background:"#fabd2f",text:"#1a1a1a",padding:"0.25rem 0.5rem","border-radius":"0.5rem"}},avatar:{border:"3px solid #000000",shadow:"3px 3px 0px 0px #000",ring:"3px","ring-color":"#ffffff"},modal:{background:"#ffffff","border-width":"3px","border-color":"#000000","border-radius":"1rem",shadow:"8px 8px 0px 0px rgba(0,0,0,1)",color:"#1a1a1a",overlay:"rgba(0, 0, 0, 0.5)","header-padding":"1.25rem 1.5rem","header-border-width":"3px","header-background":"#ffffff","header-font-size":"1.25rem","header-font-weight":"900","header-color":"#1a1a1a","body-padding":"1.5rem","body-color":"#4b5563","footer-padding":"1rem 1.5rem","footer-border-width":"3px","footer-background":"#f9fafb"},drawer:{background:"#ffffff","border-width":"3px","border-color":"#000000","border-radius":"0",shadow:"6px 6px 0px 0px rgba(0,0,0,1)","overlay-background":"rgba(0, 0, 0, 0.6)","header-padding":"1rem 1.25rem","header-border-width":"3px","header-border-color":"#000000","header-background":"#ffffff","header-font-size":"1.125rem","header-font-weight":"900","header-color":"#1a1a1a","body-padding":"1rem","body-color":"#4b5563","footer-padding":"1rem 1.25rem","footer-border-width":"3px","footer-background":"#f9fafb"},panel:{background:"#ffffff","background-hover":"#f5f5f5",border:"#000000","header-background":"transparent","header-text":"#1a1a1a","header-border":"#000000"},dropdown:{background:"#ffffff","background-hover":"#f5f5f5","background-active":"#e5e5e5",border:"#000000",text:"#1a1a1a","text-muted":"#6b7280",separator:"#e5e5e5",shadow:"4px 4px 0px 0px rgba(0,0,0,1)"},badge:{default:{background:"#f5f5f5",text:"#1a1a1a",border:"#000000"},success:{background:"#22c55e",text:"#ffffff",border:"#000000"},danger:{background:"#ef4444",text:"#ffffff",border:"#000000"},warning:{background:"#f97316",text:"#ffffff",border:"#000000"},info:{background:"#3b82f6",text:"#ffffff",border:"#000000"}},list:{background:"transparent","background-hover":"#f5f5f5","background-active":"#e5e5e5","background-selected":"#fabd2f",border:"#000000","border-hover":"#000000",text:"#1a1a1a","text-muted":"#6b7280"},tree:{background:"transparent","background-hover":"#f5f5f5","background-selected":"#fabd2f",border:"#000000",indent:"1rem",icon:"#6b7280","icon-hover":"#1a1a1a"},table:{"border-width":"3px","border-color":"#000000","border-radius":"1rem",shadow:"4px 4px 0px 0px rgba(0,0,0,1)","header-background":"#ffffff","header-color":"#1a1a1a","header-font-weight":"900","header-font-size":"0.75rem","header-text-transform":"uppercase","row-background":"#ffffff","row-hover-background":"#fef3c7","cell-padding":"1rem 1.25rem","cell-font-size":"0.875rem","cell-color":"#4b5563"},pagination:{"border-width":"3px","border-color":"#000000","border-radius":"0.75rem",background:"#ffffff",color:"#1a1a1a","font-weight":"700",shadow:"3px 3px 0px 0px rgba(0,0,0,1)","hover-background":"#f5f5f5","hover-border-color":"#000000","hover-shadow":"2px 2px 0px 0px rgba(0,0,0,1)","hover-transform":"translate(-1px, -1px)","active-background":"#fabd2f","active-border-color":"#000000","active-color":"#000000","active-shadow":"3px 3px 0px 0px rgba(0,0,0,1)","nav-font-weight":"900"},progress:{"border-width":"3px","border-color":"#000000","border-radius":"0.75rem",background:"#ffffff","fill-background":"var(--color-primary)",shadow:"3px 3px 0px 0px rgba(0,0,0,1)",height:"1.25rem","height-sm":"0.75rem","height-lg":"1.75rem"},breadcrumbs:{"font-size":"0.875rem","font-weight":"700","current-font-weight":"900","text-transform":"uppercase","letter-spacing":"0.05em","link-color":"#6b7280","link-hover-color":"#1a1a1a","current-color":"#1a1a1a","separator-color":"#9ca3af",gap:"0.5rem"},sidebar:{background:"#ffffff","border-width":"3px","border-color":"#000000","border-radius":"0",shadow:"none",width:"256px","collapsed-width":"80px","header-padding":"1rem","header-background":"#ffffff","header-border-width":"3px","header-font-weight":"900","content-padding":"0.75rem","footer-padding":"0.75rem","footer-background":"#ffffff","footer-border-width":"3px","toggle-background":"transparent","toggle-hover-background":"#f5f5f5","toggle-border-radius":"0.5rem","item-padding":"0.75rem 1rem","item-border-radius":"0.75rem","item-font-weight":"500","item-color":"#4b5563","item-hover-background":"#f5f5f5","item-hover-color":"#1a1a1a","item-active-background":"#000000","item-active-color":"#ffffff","item-active-font-weight":"600"}};
`,mimeType:"text/javascript"},"/node_modules/@bootstrapp/router/ui.js":{content:'import n from"/$app/types/index.js";import m from"/$app.js";import{html as p}from"/npm/lit-html";import{keyed as c}from"/npm/lit-html/directives/keyed.js";import{html as u,unsafeStatic as r}from"/npm/lit-html/static.js";export default{tag:"router-ui",properties:{currentRoute:n.object({sync:m.Router})},renderRoute(t,e){const o=typeof t.component=="function"?t.component(e):t.component;return t.template?u`<${r(t.template)} .component=${o}>\n			</${r(t.template)}>`:o},render(){const{route:t,params:e}=this.currentRoute||{};return console.error(this.currentRoute,"current Route"),t?c(t.name??t.path,this.renderRoute(typeof t=="function"?{component:t}:t,e)):p`404: Page not found`}};\n',mimeType:"text/javascript"},"/$app/base/backend.js":{content:`import r from"/$app/base/config.js";import e from"/$app/events/index.js";import{initSWBackend as m}from"/$app/sw/backend.js";import o from"/$app.js";o.addModule({name:"events",base:e({})}),m(o,r);import"/$app/base/backend/workers/database.js";
`,mimeType:"text/javascript"},"/$app/events/index.js":{content:'function l(r={},{getter:t=!0}={}){const n=new Map;return r.listeners=n,r.hasListeners=e=>n.has(e),r.on=(e,s)=>{if(!s)return console.error(`Error adding listener to ${e}: no callback passed`);n.has(e)||n.set(e,new Set),n.get(e).add(s)},r.set=e=>Object.entries(e).forEach(([s,o])=>r.on(s,o)),t&&(r.get=e=>[...n.get(e)??[]]),r.off=(e,s)=>{const o=n.get(e);o&&(o.delete(s),o.size===0&&n.delete(e))},r.emit=async(e,s)=>{const o=[];return n.get(e)?.forEach(i=>{try{o.push(i(s))}catch(c){console.error(`Error in listener for key "${e}":`,c)}}),Promise.all(o)},r}export default l;\n',mimeType:"text/javascript"},"/$app/sw/backend.js":{content:'import R from"./filesystem.js";let y,C;const S=h=>{const f=h.split(".").pop()?.toLowerCase();return{html:"text/html",css:"text/css",js:"application/javascript",mjs:"application/javascript",json:"application/json",png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",svg:"image/svg+xml",ico:"image/x-icon",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",ttf:"font/ttf",eot:"application/vnd.ms-fontobject",otf:"font/otf",mp3:"audio/mpeg",mp4:"video/mp4",webm:"video/webm",pdf:"application/pdf",txt:"text/plain",md:"text/markdown",xml:"application/xml",wasm:"application/wasm"}[f]||"application/octet-stream"},T=h=>{const f=self.location.origin,d=h.startsWith("/")?h:`/${h}`;return`${f}${d}`};export function initSWBackend(h,f={}){if(y=h,C=f,y.settings?.runtime!=="serviceworker")return;const d=C.cache?.localFiles||"local-files-v1",E=C.cache?.stagingFiles||"staging-files-v1",A="cdn-assets-v1",W="file-store-v1",k=["esm.sh","cdn.jsdelivr.net","unpkg.com","cdnjs.cloudflare.com"];let g=!1;const l={open:async e=>{const t={local:d,staging:E,cdn:A,fileStore:W};return caches.open(t[e]||e)},getKeysInDirectory:async(e,t)=>(await e.keys()).filter(o=>new URL(o.url).pathname.startsWith(t))},L=R({getMimeType:S,fsCache:l,getLocalUrl:T});self.addEventListener("install",e=>{console.log("Service Worker: Installing..."),e.waitUntil(Promise.all([caches.open(d),caches.open(E),caches.open(A),caches.open(W)]).then(()=>(console.log("Service Worker: Caches initialized"),self.skipWaiting())))}),self.addEventListener("activate",e=>{console.log("Service Worker: Activating..."),e.waitUntil(self.clients.claim())});const N=e=>(t,a)=>{e.postMessage({payload:t,type:a})},_={SKIP_WAITING:async()=>{console.log("Service Worker: Skip waiting requested"),self.skipWaiting()},"SW:BROADCAST_SYNCED_PROP":async(e,{broadcast:t})=>{t({type:"SW:SYNC_PROPS",payload:e.payload})},"SW:BROADCAST_QUERY_SYNC":async(e,{broadcast:t})=>{t({type:"SW:QUERY_SYNC",payload:e.payload})},"SW:BROADCAST_AUTH_STATE":async(e,{broadcast:t})=>{t({type:"SW:AUTH_STATE",payload:e.payload})},"SW:CACHE_FILE":async(e,{respond:t})=>{try{const{url:a,content:o}=e.payload,n=await l.open("fileStore"),s=new Response(o,{headers:{"Content-Type":S(a)}});await n.put(a,s),t({success:!0})}catch(a){t({error:a.message})}},"SW:ENABLE_LOCAL_CACHING":async(e,{respond:t})=>{g=!0,console.log("Service Worker: Local caching ENABLED for build"),t({success:!0,enabled:!0})},"SW:DISABLE_LOCAL_CACHING":async(e,{respond:t})=>{g=!1,console.log("Service Worker: Local caching DISABLED"),t({success:!0,enabled:!1})},"SW:CLEAR_LOCAL_CACHE":async(e,{respond:t})=>{try{const a=await l.open("local"),o=await a.keys();await Promise.all(o.map(n=>a.delete(n))),console.log(`Service Worker: Cleared ${o.length} entries from local cache`),t({success:!0,clearedCount:o.length})}catch(a){t({error:a.message})}},"SW:GET_CACHED_FILES":async(e,{respond:t})=>{try{const a={},o=await l.open("local"),n=await o.keys();for(const c of n){const r=await o.match(c);if(r){const i=new URL(c.url);if(!(i.pathname.includes(".")&&!i.pathname.endsWith("/")))continue;const u=await r.clone().text(),w=r.headers.get("Content-Type")?.split(";")[0]||S(i.pathname);a[i.pathname]={content:u,mimeType:w}}}const s=await l.open("cdn"),p=await s.keys();for(const c of p){const r=await s.match(c);if(r){const i=new URL(c.url);if(i.hostname==="esm.sh"){const m=`${i.pathname}${i.search}`,u=await r.clone().text(),w=r.headers.get("Content-Type")?.split(";")[0]||"application/javascript";a[m]={content:u,mimeType:w}}}}t(a)}catch(a){t({error:a.message})}},...L};self.addEventListener("message",async e=>{const{data:t}=e,{type:a,payload:o,eventId:n}=t,s=e.source,p=async r=>{(await self.clients.matchAll({type:"window"})).forEach(m=>{m.id!==s?.id&&m.postMessage(r)})},c=_[a];c?await c({payload:o,eventId:n},{respond:(r,i)=>{s&&s.postMessage({payload:r,type:i||a,eventId:n})},broadcast:p}):y.events?.emit(a,{payload:o,eventId:n,client:s})}),self.addEventListener("fetch",e=>{const t=new URL(e.request.url);if(t.origin===self.location.origin&&t.pathname.startsWith("/npm/")){e.respondWith((async()=>{const n=`https://esm.sh/${t.pathname.slice(5)}${t.search}`,s=await l.open("cdn"),p=new Request(n),c=await s.match(p);if(c)return c;try{const r=await fetch(n);return r.ok&&s.put(p,r.clone()),r}catch(r){return console.error("SW: ESM.sh fetch failed:",r),new Response("Network error",{status:503})}})());return}if(t.origin===self.location.origin&&(t.pathname.match(/^\\/[^/]+@[\\d.]+/)||t.pathname.startsWith("/v1"))){e.respondWith((async()=>{const o=`https://esm.sh${t.pathname}${t.search}`,n=await l.open("cdn"),s=new Request(o),p=await n.match(s);if(p)return p;try{const c=await fetch(o);return c.ok&&n.put(s,c.clone()),c}catch(c){return console.error("SW: ESM.sh internal fetch failed:",c),new Response("Network error",{status:503})}})());return}if(k.includes(t.hostname)){e.respondWith((async()=>{const o=await l.open("cdn"),n=await o.match(e.request);if(n)return n;try{const s=await fetch(e.request);return s.ok&&o.put(e.request,s.clone()),s}catch(s){return console.error("SW: CDN fetch failed:",s),new Response("Network error",{status:503})}})());return}t.origin===self.location.origin&&e.respondWith((async()=>{const n=await(await l.open("staging")).match(e.request);if(n)return n;try{const s=await fetch(e.request);return g&&s.ok&&e.request.method==="GET"&&(await l.open("local")).put(e.request,s.clone()),s}catch(s){return console.error("SW: Local fetch failed:",s),new Response("Not found",{status:404})}})())}),console.log("Service Worker: Backend initialized")}export default{initSWBackend};\n',mimeType:"text/javascript"},"/$app.js":{content:'import p from"/$app/events/index.js";const f=typeof ServiceWorkerGlobalScope<"u"&&globalThis instanceof ServiceWorkerGlobalScope?"serviceworker":typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope?"worker":"frontend";globalThis.sleep=(t=0)=>new Promise(e=>setTimeout(e,t));function l(t={}){const e={...t},r=(c,a)=>!c||typeof c!="object"||Array.isArray(c)||!a||typeof a!="object"||Array.isArray(a)?a:{...c,...a},s={get(c,a){return a==="set"?(...o)=>{if(o.length===1&&typeof o[0]=="object"&&o[0]!==null)for(const[i,m]of Object.entries(o[0]))e[i]=r(e[i],m);else o.length===2&&typeof o[0]=="string"&&(e[o[0]]=o[1]);return n}:a==="get"?(o,i)=>i!==void 0?e[o]?.[i]:e[o]:a==="remove"?(...o)=>(o.length===2?delete e[o[0]]?.[o[1]]:delete e[o[0]],n):a==="keys"?()=>Object.keys(e):a==="values"?()=>Object.values(e):a==="entries"?()=>Object.entries(e):a==="has"?o=>o in e:a==="_isCollection"?!0:a==="_data"?e:e[a]},set(c,a,o){return e[a]=o,!0},has(c,a){return a in e||["set","get","remove","keys","values","entries","has"].includes(a)},ownKeys(){return Reflect.ownKeys(e)},getOwnPropertyDescriptor(c,a){if(a in e)return{enumerable:!0,configurable:!0,value:e[a]}}},n=new Proxy({},s);return n}const u={async fetchResource(t,e,r){try{const s=await fetch(t);if(this[t]={path:t,extension:r},s.ok)return await e(s)}catch(s){console.warn(`Resource not found at: ${t}`,s)}return null},text(t){return u.fetchResource(t,e=>e.text(),"text")},json(t){return u.fetchResource(t,e=>e.json(),"json")},getFilePath(t){return`${d.settings.basePath}${t.startsWith("/")?t:`/${t}`}`},getRequestPath(t){const e=new URL(t);return e.pathname+e.search}},h={events:p({}),app:{},assetFiles:new Set,components:l(),data:l(),devFiles:new Set,error:console.error,fs:u,log:console.log,models:l(),modules:l(),routes:l(),settings:{base:l({runtime:f,dev:!0,backend:!1,frontend:!0,basePath:""}),events:({context:t})=>({moduleAdded({module:e}){e.settings&&(t[e.name]=e.settings)}})}};f==="frontend"&&(h.icons={alias:"Icons",base:new Map(Object.entries(globalThis.__icons||{}))},h.theme={base:l({font:{icon:{family:"lucide"}}}),events:({context:t})=>({moduleAdded({module:e}){e.theme&&(t[e.name]=e.theme)}})});const g={async load(t,e=!1){try{const r=await fetch("/package.json");if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);const s=await r.json();this._packageJson=s,await this.bootstrap({...s,production:t,backend:e})}catch(r){console.error("Could not load \'package.json\'. Bootstrap failed.",{error:r})}},async bootstrap({backend:t=!1,production:e=!1,settings:r={},theme:s}={}){for(const[n,c]of Object.entries({...r,backend:t,runtime:f,frontend:!t,production:e,dev:!e}))this.settings.set(n,c);!t&&s&&this.theme.set(s);try{await import("/index.js"),await this.loadModuleSchemas(),await this.loadModuleData(),await(t?import("/$app/base/backend/backend.js"):import("/$app/base/frontend.js")),await this.events.emit("APP:INIT")}catch(n){console.warn(n)}return this},async loadModuleSchemas(){if(!this._packageJson)return;const{discoverSchemaModules:t,namespaceModels:e}=await import("/$app/model/schema-loader.js"),r=await t(this._packageJson);for(const s of r)try{const a=(await import(`/node_modules/${s.packageName}/models/schema.js`)).default;if(a){const o=s.namespace?s.name:null,i=e(a,o);this.models.set(i),this.log?.(`Loaded schema from ${s.packageName}`+(o?` (namespace: ${o}_*)`:""))}}catch(n){console.warn(`Failed to load schema from ${s.packageName}:`,n)}try{const s=await import("/models/schema.js");s.default&&(this.models.set(s.default),this.log?.("Loaded project schema from /models/schema.js"))}catch{}},async loadModuleData(){if(!this._packageJson)return;const{discoverSchemaModules:t,namespaceData:e}=await import("/$app/model/schema-loader.js"),r=await t(this._packageJson);for(const s of r)try{const a=(await import(`/node_modules/${s.packageName}/models/seed.js`)).default;if(a){const o=s.namespace?s.name:null,i=e(a,o);this.data.set(i),this.log?.(`Loaded seed data from ${s.packageName}`+(o?` (namespace: ${o}_*)`:""))}}catch(n){n.message?.includes("Failed to fetch")||console.warn(`Failed to load seed from ${s.packageName}:`,n)}try{const s=await import("/models/seed.js");s.default&&(this.data.set(s.default),this.log?.("Loaded project seed from /models/seed.js"))}catch{}},addModule(t){if(t.dev&&!this.settings.dev||this.modules?.has(t.name))return;const{alias:e,name:r,events:s,base:n={}}=t;if(this.modules?.set(r,t),this[r]=n,e&&(this[e]=n),s){const a=typeof s=="function"?s({$APP:this,context:n}):s;for(const[o,i]of Object.entries(a))this.events.on(o,i)}const c=this.events.get("moduleAdded")||[];for(const a of c)a.call(n,{module:t});return this.log&&this.log(`Module \'${t.name}\' added successfully`),n}},d=Object.create(g);for(const[t,e={}]of Object.entries(h))d.addModule({name:t,...e.base?e:{base:e}});globalThis.$APP=d;export{l as createCollection};export default d;\n',mimeType:"text/javascript"},"/$app/base/config.js":{content:'export const serviceWorker={initTimeout:200,maxRetries:5},cache={localFiles:"local-files-v1",stagingFiles:"staging-files-v1"},backend={requestTimeout:5e3},test={host:"test.localhost",port:1313,getUrl(t="/test.html"){return`http://${this.host}:${this.port}${t}`}},devServer={getWsPort(t){return Number.parseInt(t,10)+1}};export default{serviceWorker,cache,backend,test,devServer};\n',mimeType:"text/javascript"},"/$app/base/backend/workers/database.js":{content:'import n from"/$app.js";if(n.settings.runtime==="worker"){const c=async()=>(console.log("bootstrap() called"),await n.load(!n.settings.dev,!0));let s;const o=[],i={handleMessage:async({data:e})=>{if(e.eventId&&o.includes(e.eventId))return;e.eventId&&o.push(e.eventId);const t=e.eventId&&(l=>{s&&s.postMessage({eventId:e.eventId,payload:l,connection:e.connection})});n?.Backend?(console.log(`Routing message to backend: ${e.type}`,e),n.Backend.handleMessage({data:e,respond:t})):n.events.on("APP:DATABASE:STARTED",async()=>{console.log(`Routing message to backend after APP:DATABASE:STARTED: ${e.type}`),n.Backend.handleMessage({data:e,respond:t})})}};self.addEventListener("message",async e=>{e.data.type==="APP:BACKEND:START"&&(s=e.ports[0],console.info("Communication port initialized"),s.onmessage=i.handleMessage,(async()=>(await c(),s.postMessage({type:"APP:BACKEND:READY"}),n.Backend.client=s))())})}\n',mimeType:"text/javascript"},"/$app/sw/filesystem.js":{content:'export default({getMimeType:T,fsCache:o,getLocalUrl:g})=>({"FS:WRITE_FILES":async(c,{respond:r})=>{try{const{files:t}=c.payload;if(!Array.isArray(t))throw new Error("Payload must include a \'files\' array.");const i=t.map(e=>{const n=e.directory?`${e.directory}/${e.name}`:`/${e.name}`;return e.isDirectory?{path:`${n.endsWith("/")?n:`${n}/`}.dir-placeholder`,content:""}:{path:n,content:e.content||""}}),a=await o.open("local"),s=i.map(({path:e,content:n})=>{const E=g(e),p=new Response(n,{headers:{"Content-Type":T(e)}});return a.put(E,p)});await Promise.all(s),console.info(`Service Worker: Batch wrote ${t.length} entries.`),r({success:!0,count:t.length},"FS_WRITE_FILES_SUCCESS")}catch(t){console.error("Service Worker Error in FS:WRITE_FILES:",t),r({error:t.message},"FS_WRITE_FILES_ERROR")}},"FS:WRITE_FILE":async(c,{respond:r})=>{try{const{path:t,content:i,system:a}=c.payload,s=await o.open(a?"cdn":"staging"),e=a?`https://${t}`:g(t),n=new Response(i,{headers:{"Content-Type":T(t)}});await s.put(e,n),r({path:t},"FS_WRITE_SUCCESS")}catch(t){console.error({error:t,data:c}),r({error:t.message},"FS_WRITE_ERROR")}},"FS:READ_FILE":async(c,{respond:r})=>{try{const{path:t,system:i}=c.payload;let a;if(i){const e=await o.open("cdn"),n=`https://${t}`;a=await e.match(n)}else{const e=await o.open("staging"),n=await o.open("local"),E=g(t);a=await e.match(E)||await n.match(E)}if(!a)throw new Error(`File not found: ${t}`);const s=await a.text();r({path:t,content:s},"FS_READ_SUCCESS")}catch(t){r({error:t.message},"FS_READ_ERROR")}},"FS:DELETE_FILE":async(c,{respond:r})=>{try{const{path:t,system:i}=c.payload;let a=!1;if(i){const s=await o.open("cdn"),e=`https://${t}`;a=await s.delete(e)}else{const s=await o.open("staging"),e=await o.open("local"),n=g(t),E=await s.delete(n),p=await e.delete(n);a=E||p}if(!a)throw new Error(`File not found: ${t}`);r({path:t},"FS_DELETE_SUCCESS")}catch(t){r({error:t.message},"FS_DELETE_ERROR")}},"FS:DELETE_DIRECTORY":async(c,{respond:r})=>{try{const{path:t,system:i}=c.payload;if(i){r({path:t,message:"System directory deletion not supported."},"FS_DIRECTORY_DELETE_SKIPPED");return}const a=await o.open("staging"),s=await o.open("local"),e=t.endsWith("/")?t:`${t}/`,n=await o.getKeysInDirectory(a,e),E=await o.getKeysInDirectory(s,e),p=[...n,...E],_=[...new Set(p.map(d=>d.url))].flatMap(d=>[a.delete(d),s.delete(d)]);await Promise.all(_),r({path:t},"FS_DIRECTORY_DELETE_SUCCESS")}catch(t){r({error:t.message},"FS_DIRECTORY_DELETE_ERROR")}},"FS:LIST_FILES":async(c,{respond:r})=>{try{const{path:t="/",system:i}=c.payload;if(i){const h=await(await o.open("cdn")).keys(),u=t==="/"?"":t.endsWith("/")?t:`${t}/`,S=new Map;for(const y of h){const m=new URL(y.url),D=`${m.hostname}${m.pathname}`;if(t!=="/"&&!D.startsWith(u))continue;const R=t==="/"?D:D.substring(u.length);if(!R)continue;const F=R.indexOf("/"),f=F===-1?R:R.substring(0,F);if(!f)continue;const L=F!==-1,P=`${u}${f}${L?"/":""}`;S.has(P)||S.set(P,{path:P,name:f,isDirectory:L})}const I=Array.from(S.values());I.sort((y,m)=>y.isDirectory!==m.isDirectory?y.isDirectory?-1:1:y.name.localeCompare(m.name)),r(I);return}const a=t.endsWith("/")?t:`${t}/`,s=await o.open("staging"),e=await o.open("local"),n=await o.getKeysInDirectory(s,a),E=await o.getKeysInDirectory(e,a),p=new Map;E.forEach(l=>p.set(l.url,l)),n.forEach(l=>p.set(l.url,l));const _=Array.from(p.values()).map(async l=>{const h=new URL(l.url).pathname;return{path:h.endsWith(".dir-placeholder")?h.replace(/\\.dir-placeholder$/,""):h}}),d=(await Promise.all(_)).filter(Boolean),w=new Map;for(const l of d){if(!l.path.startsWith(a))continue;const h=l.path.substring(a.length);if(h==="")continue;const u=h.indexOf("/"),S=u===-1?h:h.substring(0,u);if(!S)continue;if(u!==-1||l.path.endsWith("/")){const y=`${a}${S}/`;w.has(y)||w.set(y,{path:y,name:S,isDirectory:!0})}else{const y=`${a}${S}`;w.has(y)||w.set(y,{path:y,name:S,isDirectory:!1})}}const $=Array.from(w.values());$.sort((l,h)=>l.isDirectory!==h.isDirectory?l.isDirectory?-1:1:l.name.localeCompare(h.name)),r($)}catch(t){console.error("Service Worker Error in FS:LIST_FILES:",t),r({error:t.message},"FS_LIST_ERROR")}},"FS:DIR_EXISTS":async(c,{respond:r})=>{try{const{path:t}=c.payload;if(!t)throw new Error("Payload must include \'path\'.");const i=t.endsWith("/")?t:`${t}/`,a=await o.open("staging"),s=await o.open("local");if((await o.getKeysInDirectory(a,i)).length>0){r(!0);return}const n=await o.getKeysInDirectory(s,i);r(n.length>0)}catch(t){r({error:t.message},"FS_DIR_EXISTS_ERROR")}},"FS:FILE_EXISTS":async(c,{respond:r})=>{try{const{path:t}=c.payload;if(!t)throw new Error("Payload must include \'path\'.");const i=await o.open("staging"),a=await o.open("local"),s=g(t);let e=await i.match(s);if(e){r(!0);return}e=await a.match(s),r(!!e)}catch(t){r({error:t.message},"FS_FILE_EXISTS_ERROR")}}});\n',mimeType:"text/javascript"},"/package.json":{content:`{
  "name": "meetup.rio",
  "version": "0.1.0",
  "description": "Discover Rio de Janeiro - Places, Events, and Things to Do",
  "type": "module",
  "bootstrapp": {
    "components": {
      "view": "views/",
      "template": "views/templates/"
    }
  },
  "scripts": {
    "test": "node ../../public/cli/bin/bootstrapp.js test --browser",
    "test:headed": "node ../../public/cli/bin/bootstrapp.js test --browser --headed"
  },
  "dependencies": {
    "@bootstrapp/admin": "file:../../public/admin",
    "@bootstrapp/auth": "file:../../public/auth",
    "@bootstrapp/base": "file:../../public/base",
    "@bootstrapp/bundler": "file:../../public/bundler",
    "@bootstrapp/cms": "file:../../public/cms",
    "@bootstrapp/controller": "file:../../public/controller",
    "@bootstrapp/events": "file:../../public/events",
    "@bootstrapp/extension": "file:../../public/extension",
    "@bootstrapp/github": "file:../../public/github",
    "@bootstrapp/i18n": "file:../../public/i18n",
    "@bootstrapp/icon-lucide": "file:../../public/icon-lucide",
    "@bootstrapp/maps": "file:../../public/maps",
    "@bootstrapp/model": "file:../../public/model",
    "@bootstrapp/model-indexeddb": "file:../../public/model-indexeddb",
    "@bootstrapp/notifications": "file:../../public/notifications",
    "@bootstrapp/router": "file:../../public/router",
    "@bootstrapp/sw": "file:../../public/sw",
    "@bootstrapp/tailwind": "file:../../public/tailwind",
    "@bootstrapp/theme": "file:../../public/theme",
    "@bootstrapp/types": "file:../../public/types",
    "@bootstrapp/uix": "file:../../public/uix",
    "@bootstrapp/view": "file:../../public/view",
    "pocketbase": "^0.26.5"
  },
  "settings": {
    "name": "MEETUP.RIO",
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
      "accentClass": "text-teal-600"
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
  },
  "devDependencies": {
    "lit-html": "^3.3.1",
    "typescript": "^5.9.3"
  }
}
`,mimeType:"application/json"},"/index.js":{content:`import"/models/schema.js";
`,mimeType:"text/javascript"},"/models/schema.js":{content:`export const version=1;import{cmsModels as t}from"/$app/cms/schema.js";import u from"/$app/cms/types.js";import{slugHooks as r}from"/$app/model/slug.js";import e from"/$app/types/index.js";e.registerExtension(u);export default{...t,users:{id:e.string({required:!0}),name:e.string({required:!0}),username:e.string(),bio:e.string(),avatar:e.string(),stats:e.object(),email:e.string({required:!0}),password:e.string(),passwordConfirm:e.string(),isGuest:e.boolean({defaultValue:!1}),travelStatus:e.string({defaultValue:"visitor"}),arrivalDate:e.string(),departureDate:e.string(),vibeTime:e.string({defaultValue:"night"}),vibeSocial:e.string({defaultValue:"social"}),vibeDrink:e.string({defaultValue:"caipirinha"}),lookingFor:e.array({defaultValue:[]}),lastKnownLat:e.number(),lastKnownLng:e.number(),likedPlaces:e.belongs_many("places"),likedEvents:e.belongs_many("events"),likedMeetups:e.belongs_many("meetups"),likedGroups:e.belongs_many("groups"),interestedEvents:e.belongs_many("events"),interestedMeetups:e.belongs_many("meetups"),skippedPlaces:e.belongs_many("places"),skippedEvents:e.belongs_many("events"),skippedMeetups:e.belongs_many("meetups"),skippedGroups:e.belongs_many("groups"),createdAt:e.string({})},places:{$hooks:r("name","slug"),id:e.string({required:!0}),name:e.string({required:!0}),slug:e.string({index:!0,immutable:!0}),description:e.string({required:!0}),category:e.string({required:!0,index:!0}),image:e.string({required:!0}),address:e.string(),lat:e.number({index:!0}),lng:e.number({index:!0}),phone:e.string(),website:e.string(),rating:e.number(),reviewCount:e.number({defaultValue:0}),gmapsId:e.string({index:!0}),gmaps:e.object({attribute:!1}),whatsappLink:e.string(),instagram:e.string(),featured:e.boolean({defaultValue:!1,index:!0}),tags:e.array({defaultValue:[],index:!0}),recommended:e.boolean({defaultValue:!1,index:!0}),viewCount:e.number({defaultValue:0}),createdAt:e.string({required:!0,index:!0}),order:e.number({index:!0})},events:{$hooks:r("name","slug"),id:e.string({required:!0}),name:e.string({required:!0}),slug:e.string({index:!0,immutable:!0}),description:e.string({required:!0}),category:e.string({required:!0,index:!0}),image:e.string({required:!0}),date:e.string({index:!0}),time:e.string(),venue:e.string(),price:e.number({defaultValue:0}),currency:e.string({defaultValue:"BRL"}),ticketLink:e.string(),lat:e.number({index:!0}),lng:e.number({index:!0}),place:e.belongs("places"),isRecurring:e.boolean({defaultValue:!1,index:!0}),recurrencePattern:e.string(),recurrenceDays:e.array({defaultValue:[]}),recurrenceEndDate:e.string(),recurrenceParentId:e.string({index:!0}),attendees:e.array({defaultValue:[]}),createdBy:e.belongs("users"),maxAttendees:e.number({defaultValue:20}),isActive:e.boolean({defaultValue:!0,index:!0}),whatsappLink:e.string(),tags:e.array({defaultValue:[],index:!0}),recommended:e.boolean({defaultValue:!1,index:!0}),viewCount:e.number({defaultValue:0}),createdAt:e.string({required:!0,index:!0}),order:e.number({index:!0})},meetups:{$hooks:r("name","slug"),id:e.string({required:!0}),name:e.string({required:!0}),slug:e.string({index:!0,immutable:!0}),description:e.string({required:!0}),category:e.string({required:!0,index:!0}),image:e.string({required:!0}),date:e.string({index:!0}),time:e.string(),venue:e.string(),event:e.belongs("events"),place:e.belongs("places"),lat:e.number({index:!0}),lng:e.number({index:!0}),attendees:e.array({defaultValue:[]}),createdBy:e.belongs("users"),maxAttendees:e.number({defaultValue:20}),isActive:e.boolean({defaultValue:!0,index:!0}),createdAt:e.string({required:!0,index:!0}),order:e.number({index:!0})},groups:{$hooks:r("name","slug"),id:e.string({required:!0}),name:e.string({required:!0}),slug:e.string({index:!0,immutable:!0}),description:e.string({required:!0}),category:e.string({required:!0,index:!0}),image:e.string({required:!0}),groupName:e.string(),memberCount:e.string(),whatsappLink:e.string(),featured:e.boolean({defaultValue:!1,index:!0}),tags:e.array({defaultValue:[],index:!0}),recommended:e.boolean({defaultValue:!1,index:!0}),viewCount:e.number({defaultValue:0}),lat:e.number({index:!0}),lng:e.number({index:!0}),createdAt:e.string({required:!0,index:!0}),order:e.number({index:!0})},guides:{$cms:!0,$hooks:r("title","slug"),id:e.string({required:!0}),title:e.string({required:!0}),slug:e.string({index:!0,immutable:!0}),description:e.string({required:!0}),coverImage:e.media(),guideType:e.string({required:!0,enum:["article","list"],index:!0}),categories:e.array({defaultValue:[]}),body:e.richText(),items:e.array({defaultValue:[]}),author:e.belongs("users"),featured:e.boolean({defaultValue:!1,index:!0}),tags:e.array({defaultValue:[],index:!0}),recommended:e.boolean({defaultValue:!1,index:!0}),viewCount:e.number({defaultValue:0}),status:e.publishStatus(),publishedAt:e.string({index:!0}),scheduledAt:e.string({index:!0}),seo:e.seo(),createdAt:e.string({required:!0,index:!0}),order:e.number({index:!0})},meetup_attendance:{id:e.string({required:!0}),user:e.belongs("users",{required:!0}),meetup:e.belongs("meetups",{required:!0}),status:e.string({defaultValue:"attending",enum:["attending","maybe","cancelled"]}),joinedAt:e.string({required:!0,index:!0}),updatedAt:e.string({index:!0}),createdAt:e.string({required:!0})},notifications:{id:e.string({required:!0}),recipient:e.belongs("users",{required:!0}),sender:e.belongs("users"),type:e.string({required:!0,enum:["like","join","follow","mention","system"],index:!0}),title:e.string({required:!0}),message:e.string({required:!0}),contentType:e.string({enum:["place","event","meetup","group","guide"]}),contentSlug:e.string({index:!0}),read:e.boolean({defaultValue:!1,index:!0}),createdAt:e.string({required:!0,index:!0}),readAt:e.string()}};
`,mimeType:"text/javascript"},"/$app/cms/schema.js":{content:`import e from"/$app/types/index.js";import u from"/$app.js";export const getCmsModels=()=>Object.entries(u.models).filter(([t,r])=>r.$cms===!0).map(([t])=>t),cmsModels={cms_media:{id:e.string({required:!0}),url:e.string({required:!0}),name:e.string({required:!0}),alt:e.string({defaultValue:""}),size:e.number({defaultValue:0}),type:e.string({defaultValue:"image/jpeg"}),width:e.number(),height:e.number(),folder:e.string({defaultValue:"",index:!0}),tags:e.array({defaultValue:[],index:!0}),createdAt:e.string({required:!0,index:!0}),updatedAt:e.string({index:!0})}},cmsFields={status:e.string({defaultValue:"draft",enum:["draft","published","scheduled"],index:!0}),publishedAt:e.string({index:!0}),scheduledAt:e.string({index:!0}),seo:e.object({attribute:!1,defaultValue:{metaTitle:"",metaDescription:"",ogImage:""}})};export default{cmsModels,cmsFields};
`,mimeType:"text/javascript"},"/$app/cms/types.js":{content:`const t=(e={})=>({type:"string",cmsType:"richText",editor:e.editor||"markdown",persist:!0,attribute:!1,defaultValue:"",...e}),a=(e={})=>({type:"string",cmsType:"media",accept:e.accept||"image/*",maxSize:e.maxSize||5242880,persist:!0,attribute:!1,defaultValue:"",...e}),r=(e={})=>({type:"object",cmsType:"seo",persist:!0,attribute:!1,defaultValue:{metaTitle:"",metaDescription:"",ogImage:"",...e.defaultValue||{}},...e}),u=(e={})=>({type:"string",cmsType:"publishStatus",persist:!0,attribute:!0,defaultValue:e.defaultValue||"draft",enum:["draft","published","scheduled"],index:!0,...e}),s={types:{richText:t,media:a,seo:r,publishStatus:u}};export default s;export{t as createRichText,a as createMedia,r as createSeo,u as createPublishStatus};
`,mimeType:"text/javascript"},"/$app/model/slug.js":{content:'export const slugify=n=>!n||typeof n!="string"?"":n.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").replace(/-+/g,"-"),generateUniqueSlug=async(n,r,e,t,i=null)=>{const o=slugify(t);if(!o)return"";let f=o,c=0;for(;;){const p=await n.getAll(r,{where:{[e]:f},limit:1});if(!p.length||p[0].id===i)return f;c++,f=`${o}-${c}`}},slugHooks=(n="name",r="slug")=>({beforeAdd:async(e,{model:t,adapter:i})=>(!e[r]&&e[n]&&(e[r]=await generateUniqueSlug(i,t,r,e[n])),e),beforeEdit:async(e,{model:t,adapter:i})=>(e[n]&&!e[r]&&(e[r]=await generateUniqueSlug(i,t,r,e[n],e.id)),e)});export default{slugify,generateUniqueSlug,slugHooks};\n',mimeType:"text/javascript"},"/$app/types/index.js":{content:'import _ from"./timestamp.js";const E={email:/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/},N=e=>{try{return e in g?e:JSON.parse(e)}catch{return}},g={undefined:void 0,null:null,"":null},d={any:e=>e,function:e=>e,boolean:(e,{attribute:n=!0}={})=>n&&e===""||["true",1,"1",!0].includes(e),string:e=>e in g?g[e]:String(e),array:(e,n={})=>{if(Array.isArray(e))return e;const{itemType:r}=n;try{if(!e)throw e;const t=N(e);if(!Array.isArray(t))throw t;return r?t.map(i=>typeof i!="object"?i:Object.entries(i).reduce((l,[u,a])=>(l[u]=d[r[u]?.type]?d[r[u].type](a,n):a,l),{})):t}catch{return[]}},number:e=>e==null||e===""?e:Number(e),date:e=>e?e instanceof Date?e:new Date(e):null,datetime:e=>e?e instanceof Date?e:new Date(e):null,object:(e,n={})=>{if(e===null)return null;const r=typeof e=="string"?N(e):e;return n.properties&&r&&typeof r=="object"&&Object.entries(n.properties).map(([t,i])=>{i.defaultValue!==void 0&&r[t]===void 0&&(r[t]=i.defaultValue)}),r}},P=(e,n={})=>{const{type:r}=n;return(d[r]||(t=>t))(e,n)},H={datetime:(e,n={})=>{if(e===null)return n.required?["required",null]:null;if(!(e instanceof Date)||Number.isNaN(e.getTime()))return["invalid","invalid datetime"];if(n.min&&e<new Date(n.min))return["minimum",null];if(n.max&&e>new Date(n.max))return["maximum",null]},date:(e,n={})=>{if(e===null)return n.required?["required",null]:null;if(!(e instanceof Date)||Number.isNaN(e.getTime()))return["invalid","invalid date"];if(n.min&&e<new Date(n.min))return["minimum",null];if(n.max&&e>new Date(n.max))return["maximum",null]},object:(e,n={})=>{if(e===null)return n.required?["required",null]:["invalid","null is not an object"];if(typeof e!="object"||Array.isArray(e))return["invalid","not an object"]},number:(e,n={})=>{if(Number.isNaN(Number(e)))return!n.required&&(e==null||e==="")?null:["NaN",null];if("min"in n&&e<n.min)return["minimum",null];if("max"in n&&e>n.max)return["maximum",null]}},x=(e,n,r={})=>{if(e===void 0&&n.defaultValue!==void 0&&(e=n.defaultValue),n.required===!0&&(e==null||e===""))return["required",null];if(n.customValidator){const u=n.customValidator(e,n,r);if(u)return u}if(n.relationship)return n.many?[null,Array.isArray(e)?e.map(u=>n.mixed?u:u?.id??u):[]]:[null,e?.id??e];const t=d[n.type];let i=t?t(e,n):e;if((e==null||e==="")&&n.defaultValue!==void 0&&(i=n.defaultValue),n.required===!0&&(i==null||i===""))return["required",null];if(!n.required&&i==null&&!(n.type==="object"&&i===null))return[null,i];const l=H[n.type];if(l){const u=l(i,n);if(u)return u}if(n.format){const u=E[n.format]||(typeof n.format=="function"?n.format:null);if(u&&!(typeof u=="function"?u:b=>u.test(b))(i))return["invalid",`invalid format: ${n.format}`]}return[null,i]},y={validate(e,n={}){const[r,t]=x(e,this,n);return r?{valid:!1,error:r,details:t,value:e}:{valid:!0,value:t,error:null,details:null}}};function q(e,n){return e.replace(/\\${(.*?)}/g,(r,t)=>n[t.trim()])}const $=(e,{schema:n,row:r={},undefinedProps:t=!0,validateVirtual:i=!1,operation:l=null})=>{if(!n)return[null,e];const u={};let a=!1;const m={operation:l,row:r},b=t?n:e;for(const s in b){const f={...n[s],key:s};if("virtual"in f||f.persist===!1)continue;const c=f.customValidator||e[s]!==void 0||f.required,[V,D]=c?x(e[s],f,m):[null,f.defaultValue];V?(a=!0,u[s]=V):D!==void 0&&(e[s]=D)}const o=Object.fromEntries(Object.entries(n).filter(([s,f])=>"virtual"in f));for(const s in o)if(i){const[f,c]=x(q(o[s].virtual,{...r,...e}),o[s],m);f?(a=!0,u[s]=f):c!==void 0&&(e[s]=c)}else e[s]=q(o[s].virtual,{...r,...e});return a?[u,null]:[null,e]},A=(e,n)=>{const r=typeof n=="object"&&!Array.isArray(n)&&n!==null?n:{defaultValue:n},t={type:e,persist:!0,attribute:!["array","object","function"].includes(e),...r};return Object.setPrototypeOf(t,y),t},T={createType:A,parse:P,validateType:$},O={},C=e=>{e.types&&Object.assign(O,e.types)};T.registerExtension=C;const F=e=>(...n)=>{const r=n[0];let t,i=n[2];typeof n[1]=="string"?t=n[1]:i=n[1];const l=w.includes(e),u={type:l?e==="belongs_many"?"array":"string":e==="one"?"string":"array",many:h.includes(e),belongs:l,persist:l,relationship:e,defaultValue:e==="belongs_many"?[]:null,polymorphic:r==="*"||Array.isArray(r),targetModel:r,targetForeignKey:t,index:w.includes(e),...i};return Object.setPrototypeOf(u,y),u},S=["one","many","belongs","belongs_many"],h=["many","belongs_many"],w=["belongs","belongs_many"],J={get(e,n){if(e[n])return e[n];if(O[n])return O[n];const r=n.toLowerCase();return S.includes(n)?F(n):n==="union"?(t={})=>{const i={type:"union",types:t.types||[],persist:!0,attribute:!1,...t};return Object.setPrototypeOf(i,y),i}:n==="function"?(t={})=>{const i={type:"function",args:t.args||[],returns:t.returns||null,persist:!1,attribute:!1,...t};return Object.setPrototypeOf(i,y),i}:(t={})=>{if(!d[r])throw new Error(`Unknown type: ${r}`);return A(r,t)}}},j=new Proxy(T,J);j.registerExtension(_);export default j;\n',mimeType:"text/javascript"},"/$app/types/timestamp.js":{content:`const s=(t,e,m={})=>{const{operation:u}=m,n=Date.now();if(e.update===!0)return[null,n];if(u==="create"&&e.create!==!1&&(!t||t===""))return[null,n];if(t){let i;if(t instanceof Date)i=t.getTime();else if(typeof t=="string"){const r=new Date(t);if(Number.isNaN(r.getTime()))return["invalid_timestamp",null];i=r.getTime()}else if(typeof t=="number")i=t;else return["invalid_timestamp",null];return e.min&&i<e.min?["minimum",null]:e.max&&i>e.max?["maximum",null]:[null,i]}return[null,null]},a=(t={})=>({type:"number",timestamp:!0,index:!0,persist:!0,attribute:!0,customValidator:s,...t});export default{types:{timestamp:a}};
`,mimeType:"text/javascript"},"/$app/model/schema-loader.js":{content:'export async function discoverSchemaModules(o){const n=[],c={...o.dependencies,...o.devDependencies};for(const[e]of Object.entries(c))if(e.startsWith("@bootstrapp/"))try{const s=await fetch(`/node_modules/${e}/package.json`);if(!s.ok)continue;const t=await s.json();if(t?.bootstrapp?.schema===!0){const a=e.replace("@bootstrapp/","");n.push({name:a,packageName:e,namespace:t.bootstrapp.namespace!==!1})}}catch(s){console.warn(`Failed to check schema for ${e}:`,s)}return n}export function namespaceModels(o,n){if(!n)return o;const c={},e=Object.keys(o);for(const[s,t]of Object.entries(o)){const a=`${n}_${s}`;c[a]=r({...t},n,e)}return c}export function namespaceData(o,n){if(!n)return o;const c={};for(const[e,s]of Object.entries(o)){const t=`${n}_${e}`;c[t]=s}return c}function r(o,n,c){const e={...o};for(const[s,t]of Object.entries(e))!t||typeof t!="object"||t.targetModel&&c.includes(t.targetModel)&&(e[s]={...t,targetModel:`${n}_${t.targetModel}`});return e}\n',mimeType:"text/javascript"},"/node_modules/@bootstrapp/bundler/models/schema.js":{content:`import e from"/$app/types/index.js";export default{credentials:{owner:e.string(),repo:e.string(),branch:e.string({defaultValue:"main"}),token:e.string(),vps:e.object({defaultValue:{}})},releases:{version:e.string({index:!0}),notes:e.string(),status:e.string({enum:["pending","success","failed"],defaultValue:"pending"}),deployType:e.string({enum:["spa","ssg","hybrid","worker"],defaultValue:"hybrid"}),deployTarget:e.string({enum:["github","cloudflare","zip","targz","localhost","vps"],defaultValue:"localhost"}),deployedAt:e.string(),files:e.array(),result:e.object(),buildId:e.string()}};
`,mimeType:"text/javascript"},"/node_modules/@bootstrapp/admin/package.json":{content:`{
  "name": "@bootstrapp/admin",
  "version": "0.1.0",
  "description": "Bootstrapp Admin Panel",
  "type": "module",
  "main": "index.js",
  "bootstrapp": {
    "components": {
      "admin": "views/"
    }
  },
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
`,mimeType:"application/json"},"/node_modules/@bootstrapp/auth/package.json":{content:`{
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
  "bootstrapp": {
    "components": {
      "app": "app/"
    }
  },
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
    "namespace": true,
    "components": {
      "bundler": "views/"
    }
  },
  "dependencies": {
    "@bootstrapp/base": "^0.2.0",
    "@bootstrapp/github": "^0.1.0"
  }
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/cms/package.json":{content:`{
  "name": "@bootstrapp/cms",
  "version": "0.1.0",
  "description": "Content Management System for Bootstrapp - rich text, media library, SEO, publishing workflow",
  "type": "module",
  "main": "index.js",
  "bootstrapp": {
    "components": {
      "cms": "views/"
    }
  },
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
`,mimeType:"application/json"},"/node_modules/@bootstrapp/extension/package.json":{content:`{
  "name": "@bootstrapp/extension",
  "version": "0.1.0",
  "description": "Chrome extension for bidirectional communication between admin panel and browser tabs",
  "type": "module",
  "bootstrapp": {
    "components": {
      "extension": "admin/"
    }
  },
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
`,mimeType:"application/json"},"/node_modules/@bootstrapp/maps/package.json":{content:`{
  "name": "@bootstrapp/maps",
  "version": "0.1.0",
  "description": "Provider-agnostic maps integration for searching and geocoding places",
  "main": "./index.js",
  "module": "./index.js",
  "type": "module",
  "bootstrapp": {
    "components": {
      "maps": "./"
    }
  },
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
    "./adapter-base": "./adapter-base.js",
    "./slug": "./slug.js",
    "./slug.js": "./slug.js",
    "./schema-loader": "./schema-loader.js",
    "./schema-loader.js": "./schema-loader.js"
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
`,mimeType:"application/json"},"/node_modules/@bootstrapp/notifications/package.json":{content:`{
  "name": "@bootstrapp/notifications",
  "version": "1.0.0",
  "description": "Notifications system for Bootstrapp framework",
  "type": "module",
  "main": "index.js",
  "exports": {
    ".": "./index.js",
    "./plugin": "./plugin.js",
    "./models/schema": "./models/schema.js"
  },
  "files": [
    "index.js",
    "plugin.js",
    "models/",
    "views/"
  ],
  "keywords": [
    "bootstrapp",
    "notifications",
    "admin"
  ],
  "author": "",
  "license": "MIT"
}
`,mimeType:"application/json"},"/node_modules/@bootstrapp/router/package.json":{content:`{
  "name": "@bootstrapp/router",
  "version": "0.1.0",
  "description": "Client-side router with URLPattern API support, nested routes, and history management",
  "main": "./index.js",
  "module": "./index.js",
  "type": "module",
  "bootstrapp": {
    "components": {
      "router": "./"
    }
  },
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
    ".": "./index.js",
    "./codegen": "./codegen.js"
  },
  "keywords": [
    "types",
    "validation",
    "coercion",
    "schema",
    "type-system",
    "codegen",
    "typescript",
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
  "bootstrapp": {
    "components": {
      "uix": {
        "accordion": "navigation/accordion",
        "breadcrumbs": "navigation/breadcrumbs",
        "menu": "navigation/menu",
        "navbar": "navigation/navbar",
        "nav-item": "navigation/nav-item",
        "pagination": "navigation/pagination",
        "sidebar": "navigation/sidebar",
        "tabs": "navigation/tabs",
        "tree": "navigation/tree",
        "tree-item": "navigation/tree-item",
        "wizard": "navigation/wizard",
        "alert-dialog": "overlay/alert-dialog",
        "drawer": "overlay/drawer",
        "dropdown": "overlay/dropdown",
        "modal": "overlay/modal",
        "overlay": "overlay/overlay",
        "popover": "overlay/popover",
        "tooltip": "overlay/tooltip",
        "popover-controller": "overlay/popover-controller",
        "avatar": "display/avatar",
        "badge": "display/badge",
        "button": "display/button",
        "calendar": "display/calendar",
        "circle": "display/circle",
        "editable": "display/editable",
        "heading": "display/heading",
        "icon": "display/icon",
        "image": "display/image",
        "link": "display/link",
        "list": "display/list",
        "list-item": "display/list-item",
        "markdown": "display/markdown",
        "media": "display/media",
        "pattern": "display/pattern",
        "stat": "display/stat",
        "table": "display/table",
        "data-table": "display/data-table",
        "tag": "display/tag",
        "text": "display/text",
        "card": "layout/card",
        "container": "layout/container",
        "divider": "layout/divider",
        "flex": "layout/flex",
        "grid": "layout/grid",
        "page": "layout/page",
        "panel": "layout/panel",
        "section": "layout/section",
        "split-pane": "layout/split-pane",
        "app-container": "app/app-container",
        "app-header": "app/app-header",
        "bottom-nav": "app/bottom-nav",
        "title-bar": "app/title-bar",
        "cta-section": "page/cta-section",
        "faq-section": "page/faq-section",
        "feature-grid": "page/feature-grid",
        "footer": "page/footer",
        "hero-section": "page/hero-section",
        "logo-cloud": "page/logo-cloud",
        "newsletter-section": "page/newsletter-section",
        "pricing-card": "page/pricing-card",
        "pricing-table": "page/pricing-table",
        "stats-section": "page/stats-section",
        "stat-card": "page/stat-card",
        "contact-avatar": "page/contact-avatar",
        "metric-hero-card": "page/metric-hero-card",
        "testimonial-card": "page/testimonial-card",
        "testimonial-section": "page/testimonial-section",
        "circular-progress": "feedback/circular-progress",
        "progress-bar": "feedback/progress-bar",
        "skeleton": "feedback/skeleton",
        "spinner": "feedback/spinner",
        "toast": "feedback/toast",
        "device": "utility/device",
        "clipboard": "utility/clipboard",
        "darkmode": "utility/darkmode",
        "draggable": "utility/draggable",
        "droparea": "utility/droparea",
        "indexeddb-explorer": "utility/indexeddb-explorer",
        "seo": "utility/seo",
        "theme-toggle": "utility/theme-toggle",
        "auth-form": "form/auth-form",
        "checkbox": "form/checkbox",
        "code": "form/code",
        "file-upload": "form/file-upload",
        "form": "form/form",
        "label": "form/label",
        "input": "form/input",
        "form-input": "form/form-input",
        "join": "form/join",
        "number-input": "form/number-input",
        "radio": "form/radio",
        "radio-group": "form/radio-group",
        "rating": "form/rating",
        "select": "form/select",
        "slider": "form/slider",
        "switch": "form/switch",
        "textarea": "form/textarea",
        "time": "form/time",
        "showcase": "docs/showcase",
        "showcase-code-viewer": "docs/showcase-code-viewer",
        "showcase-property-editor": "docs/showcase-property-editor",
        "showcase-sidebar": "docs/showcase-sidebar",
        "theme-generator": "docs/theme-generator"
      }
    }
  },
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
`,mimeType:"application/json"},"/node_modules/@bootstrapp/bundler/models/seed.js":{content:`import n from"/$app.js";const{deploy:e={}}=n.settings;export default{credentials:[{id:"singleton",owner:e.owner||"",branch:e.branch||"main",repo:e.repo||"",token:e.token||""}]};
`,mimeType:"text/javascript"},"/models/seed.js":{content:`const o=()=>{const c=String(Date.now()+Math.floor(Math.random()*100)),l=Math.floor(Math.random()*100).toString().padStart(2,"0");return Number(c+l)},t=o,a=o,e=[{id:"guest",name:"Guest",email:"guest@localhost",isGuest:!0},{id:t(),name:"John Brooklyn",username:"@johnbrooklyn",bio:"Travel writers who wrote my own story. Living my life in my style.",email:"john.brooklyn@example.com",stats:{interested:1359,saved:876,attending:28},travelStatus:"visitor",arrivalDate:"2025-12-01",departureDate:"2025-12-15",vibeTime:"morning",vibeSocial:"social",vibeDrink:"coconut",lookingFor:["dates","activities"],createdAt:new Date().toISOString(),password:"123456890",passwordConfirm:"123456890"},{id:t(),name:"Maria Silva",username:"@mariasilva",bio:"Rio local, samba lover, and night owl. Let's dance!",email:"maria.silva@example.com",stats:{interested:234,saved:156,attending:42},travelStatus:"resident",vibeTime:"night",vibeSocial:"social",vibeDrink:"caipirinha",lookingFor:["friends","parties"],createdAt:new Date().toISOString(),password:"123456890",passwordConfirm:"123456890"},{id:t(),name:"Carlos Mendez",username:"@carlosnomad",bio:"Digital nomad exploring South America. Always down for a beach day!",email:"carlos.mendez@example.com",stats:{interested:567,saved:345,attending:38},travelStatus:"nomad",arrivalDate:"2025-12-01",departureDate:"2026-02-28",vibeTime:"morning",vibeSocial:"chill",vibeDrink:"coconut",lookingFor:["friends","tips","activities"],createdAt:new Date().toISOString(),password:"123456890",passwordConfirm:"123456890"},{id:t(),name:"Ana Costa",username:"@anacosta",bio:"Party girl visiting from Sao Paulo. Show me Rio's nightlife!",email:"ana.costa@example.com",stats:{interested:892,saved:234,attending:18},travelStatus:"visitor",arrivalDate:"2025-12-10",departureDate:"2025-12-20",vibeTime:"night",vibeSocial:"social",vibeDrink:"beer",lookingFor:["parties","dates"],createdAt:new Date().toISOString(),password:"123456890",passwordConfirm:"123456890"},{id:t(),name:"Lucas Santos",username:"@lucassantos",bio:"Carioca born and raised. Morning runs and acai bowls are my thing.",email:"lucas.santos@example.com",stats:{interested:445,saved:289,attending:31},travelStatus:"resident",vibeTime:"morning",vibeSocial:"chill",vibeDrink:"coconut",lookingFor:["activities","tips"],createdAt:new Date().toISOString(),password:"123456890",passwordConfirm:"123456890"},{id:t(),name:"Julia Martinez",username:"@juliatraveler",bio:"Solo traveler making friends around the world. Let's explore Rio together!",email:"julia.martinez@example.com",stats:{interested:1123,saved:678,attending:45},travelStatus:"visitor",arrivalDate:"2025-12-05",departureDate:"2025-12-25",vibeTime:"night",vibeSocial:"social",vibeDrink:"caipirinha",lookingFor:["friends","parties","dates"],createdAt:new Date().toISOString(),password:"123456890",passwordConfirm:"123456890"},{id:t(),name:"Pedro Oliveira",username:"@pedrolocal",bio:"Beach volleyball enthusiast and Rio tour guide. Ask me anything!",email:"pedro.oliveira@example.com",stats:{interested:356,saved:234,attending:52},travelStatus:"resident",vibeTime:"morning",vibeSocial:"social",vibeDrink:"beer",lookingFor:["friends","activities"],createdAt:new Date().toISOString(),password:"123456890",passwordConfirm:"123456890"},{id:t(),name:"Sofia Rodriguez",username:"@sofiaexplorer",bio:"Remote worker and adventure seeker. Yoga, hiking, and good coffee",email:"sofia.rodriguez@example.com",stats:{interested:789,saved:445,attending:35},travelStatus:"nomad",arrivalDate:"2025-11-15",departureDate:"2026-01-31",vibeTime:"morning",vibeSocial:"chill",vibeDrink:"coconut",lookingFor:["tips","activities","friends"],createdAt:new Date().toISOString(),password:"123456890",passwordConfirm:"123456890"},{id:t(),name:"Diego Fernandez",username:"@diegofernandez",bio:"Here for the holidays! Looking to party and meet cool people",email:"diego.fernandez@example.com",stats:{interested:445,saved:167,attending:12},travelStatus:"visitor",arrivalDate:"2025-12-15",departureDate:"2025-12-30",vibeTime:"night",vibeSocial:"social",vibeDrink:"beer",lookingFor:["parties","friends"],createdAt:new Date().toISOString(),password:"123456890",passwordConfirm:"123456890"},{id:t(),name:"Beatriz Lima",username:"@beatrizcarioca",bio:"Rio de Janeiro e meu amor! Coffee addict and culture enthusiast",email:"beatriz.lima@example.com",stats:{interested:612,saved:389,attending:37},travelStatus:"resident",vibeTime:"night",vibeSocial:"social",vibeDrink:"caipirinha",lookingFor:["friends","dates"],createdAt:new Date().toISOString(),password:"123456890",passwordConfirm:"123456890"},{id:t(),name:"Rafael Almeida",username:"@rafaelrio",bio:"Surf instructor and beach lover. Catch me at Prainha!",email:"rafael.almeida@example.com",stats:{interested:234,saved:145,attending:22},travelStatus:"resident",vibeTime:"morning",vibeSocial:"chill",vibeDrink:"coconut",lookingFor:["activities","friends"],createdAt:new Date().toISOString(),password:"123456890",passwordConfirm:"123456890"},{id:t(),name:"Emma Thompson",username:"@emmaexplores",bio:"British expat living in Rio for 2 years. Love samba and acai!",email:"emma.thompson@example.com",stats:{interested:567,saved:345,attending:41},travelStatus:"resident",vibeTime:"night",vibeSocial:"social",vibeDrink:"caipirinha",lookingFor:["parties","friends"],createdAt:new Date().toISOString(),password:"123456890",passwordConfirm:"123456890"},{id:t(),name:"Gabriel Souza",username:"@gabrielcarioca",bio:"DJ and music producer. Ask me about Rio's underground scene",email:"gabriel.souza@example.com",stats:{interested:892,saved:567,attending:63},travelStatus:"resident",vibeTime:"night",vibeSocial:"social",vibeDrink:"beer",lookingFor:["parties","friends"],createdAt:new Date().toISOString(),password:"123456890",passwordConfirm:"123456890"},{id:t(),name:"Isabella Chen",username:"@isabellawanderer",bio:"Travel blogger from Singapore. Documenting my South America journey!",email:"isabella.chen@example.com",stats:{interested:1456,saved:892,attending:28},travelStatus:"visitor",arrivalDate:"2025-12-01",departureDate:"2025-12-20",vibeTime:"morning",vibeSocial:"social",vibeDrink:"coconut",lookingFor:["tips","activities","friends"],createdAt:new Date().toISOString(),password:"123456890",passwordConfirm:"123456890"},{id:t(),name:"Thiago Barbosa",username:"@thiagofitness",bio:"Personal trainer and CrossFit enthusiast. Training on the beach daily!",email:"thiago.barbosa@example.com",stats:{interested:345,saved:189,attending:34},travelStatus:"resident",vibeTime:"morning",vibeSocial:"chill",vibeDrink:"coconut",lookingFor:["activities","friends"],createdAt:new Date().toISOString(),password:"123456890",passwordConfirm:"123456890"}],s=a(),i=a(),n=a(),d=a(),r=a(),m=a();export default{places:[{id:a(),name:"Copacabana Beach",description:"Iconic 4km beach with the famous wave-pattern boardwalk. Perfect for sunbathing, swimming, and people-watching.",category:"beaches",image:"https://picsum.photos/seed/copacabana/400/600",address:"Av. Atlantica, Copacabana, Rio de Janeiro",lat:-22.9711,lng:-43.1822,tags:["family-friendly","must-see","chill"],recommended:!0,viewCount:500,createdAt:"2025-01-01T00:00:00Z",order:4},{id:a(),name:"Ipanema Beach",description:"Trendy beach known for its stunning sunsets, upscale neighborhood, and the famous 'Girl from Ipanema' song.",category:"beaches",image:"https://picsum.photos/seed/ipanema/400/600",address:"Av. Vieira Souto, Ipanema, Rio de Janeiro",lat:-22.9838,lng:-43.2044,whatsappLink:"https://wa.me/?text=Ipanema%20Beach%20is%20amazing!",tags:["romantic","must-see","local-favorite"],recommended:!0,viewCount:450,createdAt:"2025-01-02T00:00:00Z",order:2},{id:a(),name:"Prainha",description:"Hidden gem beach surrounded by lush green mountains. Less crowded, perfect for surfing and nature lovers.",category:"beaches",image:"https://picsum.photos/seed/prainha/400/600",address:"Av. Estado da Guanabara, Recreio dos Bandeirantes",lat:-23.0425,lng:-43.5008,whatsappLink:"https://wa.me/?text=Found%20this%20hidden%20beach%20gem%20-%20Prainha!",tags:["adventure","chill","local-favorite"],viewCount:120,createdAt:"2025-01-03T00:00:00Z",order:3},{id:a(),name:"Lapa Arches Street Party",description:"Historic neighborhood known for samba, live music, and vibrant nightlife under the famous arches.",category:"parties",image:"https://picsum.photos/seed/lapa/400/600",address:"Arcos da Lapa, Centro, Rio de Janeiro",lat:-22.913,lng:-43.1802,whatsappLink:"https://wa.me/?text=Let's%20party%20at%20Lapa%20Arches!",tags:["party","local-favorite","must-see"],recommended:!0,viewCount:380,createdAt:"2025-01-04T00:00:00Z",order:4},{id:a(),name:"Confeiteiro Colombo",description:"Historic Belle Epoque cafe serving traditional Brazilian pastries and coffee since 1894. A must-visit!",category:"food",image:"https://picsum.photos/seed/colombo/400/600",address:"Rua Goncalves Dias, 32, Centro",lat:-22.9067,lng:-43.1773,whatsappLink:"https://wa.me/?text=Amazing%20historic%20cafe%20-%20Confeitaria%20Colombo!",tags:["must-see","romantic","local-favorite"],recommended:!0,viewCount:290,createdAt:"2025-01-07T00:00:00Z",order:7},{id:a(),name:"Churrascaria Palace",description:"Traditional Brazilian steakhouse with unlimited rodizio service. Experience the best cuts of meat!",category:"food",image:"https://picsum.photos/seed/churrasco/400/600",address:"Rua Rodolfo Dantas, 16, Copacabana",lat:-22.9688,lng:-43.1862,whatsappLink:"https://wa.me/?text=Best%20churrascaria%20in%20Rio!",tags:["family-friendly","local-favorite"],viewCount:85,createdAt:"2025-01-08T00:00:00Z",order:8},{id:i,name:"Christ the Redeemer",description:"Iconic 98-foot Art Deco statue atop Corcovado Mountain. One of the New Seven Wonders of the World!",category:"culture",image:"https://picsum.photos/seed/christ/400/600",address:"Parque Nacional da Tijuca, Alto da Boa Vista",lat:-22.9519,lng:-43.2105,whatsappLink:"https://wa.me/?text=Visiting%20Christ%20the%20Redeemer!",tags:["must-see","family-friendly","wheelchair-accessible"],recommended:!0,viewCount:850,createdAt:"2025-01-10T00:00:00Z",order:10},{id:n,name:"Sugarloaf Mountain Cable Car",description:"Take the cable car to the top for breathtaking 360 views of Rio, beaches, and Guanabara Bay.",category:"culture",image:"https://picsum.photos/seed/sugarloaf/400/600",address:"Av. Pasteur, 520, Urca",lat:-22.9489,lng:-43.1575,whatsappLink:"https://wa.me/?text=Amazing%20views%20from%20Sugarloaf%20Mountain!",tags:["must-see","romantic","adventure"],recommended:!0,viewCount:720,createdAt:"2025-01-11T00:00:00Z",order:11},{id:d,name:"Escadaria Selaron",description:"Colorful mosaic staircase with 215 steps, decorated with tiles from over 60 countries. Perfect for photos!",category:"culture",image:"https://picsum.photos/seed/selaron/400/600",address:"Rua Joaquim Silva, Lapa",lat:-22.915,lng:-43.1796,whatsappLink:"https://wa.me/?text=Check%20out%20these%20colorful%20steps!",tags:["must-see","free-entry","local-favorite"],viewCount:210,createdAt:"2025-01-12T00:00:00Z",order:12},{id:r,name:"Rio Botanical Garden",description:"Peaceful 340-acre garden with over 6,500 species. Home to giant water lilies and the famous palm tree avenue.",category:"culture",image:"https://picsum.photos/seed/botanical/400/600",address:"Rua Jardim Botanico, 1008, Jardim Botanico",lat:-22.9668,lng:-43.2246,whatsappLink:"https://wa.me/?text=Beautiful%20Botanical%20Garden%20in%20Rio!",tags:["family-friendly","chill","wheelchair-accessible"],viewCount:180,createdAt:"2025-01-14T00:00:00Z",order:14},{id:m,name:"Arpoador Rock Sunset",description:"Famous spot where locals gather to watch the sunset between Ipanema and Copacabana. Bring your camera!",category:"beaches",image:"https://picsum.photos/seed/arpoador/400/600",address:"Arpoador, between Ipanema and Copacabana",lat:-22.9897,lng:-43.1898,whatsappLink:"https://wa.me/?text=Best%20sunset%20spot%20in%20Rio!",tags:["romantic","free-entry","local-favorite"],recommended:!0,viewCount:340,createdAt:"2025-01-15T00:00:00Z",order:15}],events:[{id:s,name:"Copacabana Palace Carnival Ball",description:"Exclusive black-tie carnival ball at the iconic Copacabana Palace Hotel. Experience glamour and tradition! Dress code is strictly black tie or luxury costume.",category:"parties",image:"https://picsum.photos/seed/carnival/400/600",date:"2025-03-01",time:"22:00",venue:"Copacabana Palace Hotel",price:2500,currency:"BRL",ticketLink:"https://example.com/tickets",lat:-22.9667,lng:-43.1756,tags:["party","must-see","romantic"],recommended:!0,viewCount:320,createdAt:"2025-01-05T00:00:00Z",order:1},{id:a(),name:"Pedra do Sal Samba Night",description:"Authentic outdoor samba gathering every Monday and Friday. Free event with locals dancing in the streets!",category:"dancing",image:"https://picsum.photos/seed/samba/400/600",date:"2025-12-05",time:"19:00",venue:"Pedra do Sal, Saude",lat:-22.8955,lng:-43.1896,isRecurring:!0,recurrencePattern:"custom",recurrenceDays:[1,5],recurrenceEndDate:"2026-03-31",attendees:[],whatsappLink:"https://wa.me/?text=Join%20me%20for%20samba%20at%20Pedra%20do%20Sal!",tags:["local-favorite","free-entry","party"],recommended:!0,viewCount:280,createdAt:"2025-01-06T00:00:00Z",order:6},{id:a(),name:"Rio Food Truck Festival",description:"Monthly food festival with 30+ gourmet food trucks, live music, and craft beer. Variety for everyone!",category:"food",image:"https://picsum.photos/seed/foodtruck/400/600",date:"2025-12-15",time:"12:00",venue:"Parque dos Atletas, Barra da Tijuca",lat:-22.9844,lng:-43.3958,attendees:[e[0].id,e[1].id,e[2].id,e[3].id,e[4].id,e[5].id],whatsappLink:"https://wa.me/?text=Food%20Truck%20Festival%20this%20weekend!",tags:["family-friendly","pet-friendly"],viewCount:95,createdAt:"2025-01-09T00:00:00Z",order:9},{id:a(),name:"Maracana Stadium Tour",description:"Guided tour of the legendary football stadium. Walk on the field, visit locker rooms, and feel the history!",category:"sports",image:"https://picsum.photos/seed/maracana/400/600",date:"2025-12-10",time:"14:00",venue:"Estadio do Maracana, Maracana",lat:-22.9121,lng:-43.2302,attendees:[e[0].id,e[1].id,e[2].id,e[3].id,e[4].id,e[5].id],whatsappLink:"https://wa.me/?text=Stadium%20tour%20at%20Maracana!",tags:["must-see","wheelchair-accessible","family-friendly"],viewCount:150,createdAt:"2025-01-13T00:00:00Z",order:13},{id:a(),name:"Copacabana Beach Volleyball",description:"Weekly pickup volleyball games at Copacabana Beach. All skill levels welcome! Bring water and sunscreen.",category:"sports",image:"https://picsum.photos/seed/beachvolley/400/600",date:"2025-12-07",time:"09:00",venue:"Posto 6, Copacabana Beach",lat:-22.9711,lng:-43.1822,isRecurring:!0,recurrencePattern:"custom",recurrenceDays:[0,6],recurrenceEndDate:"2026-02-28",attendees:[e[0].id,e[1].id,e[2].id,e[3].id,e[4].id,e[5].id],whatsappLink:"https://wa.me/?text=Beach%20Volleyball%20this%20weekend!",tags:["free-entry","chill","local-favorite"],viewCount:75,createdAt:"2025-01-19T00:00:00Z",order:16},{id:a(),name:"Ipanema Sunset Yoga",description:"Free outdoor yoga sessions at sunset. Bring your own mat and enjoy the ocean breeze. Beginner-friendly!",category:"sports",image:"https://picsum.photos/seed/yoga/400/600",date:"2025-12-05",time:"17:30",venue:"Arpoador Beach",lat:-22.9897,lng:-43.1898,isRecurring:!0,recurrencePattern:"custom",recurrenceDays:[2,4],recurrenceEndDate:"2026-03-31",attendees:[e[0].id,e[1].id,e[2].id,e[3].id,e[4].id,e[5].id],whatsappLink:"https://wa.me/?text=Sunset%20Yoga%20at%20Arpoador!",tags:["free-entry","chill","romantic"],viewCount:110,createdAt:"2025-01-20T00:00:00Z",order:17},{id:a(),name:"Downtown Food Market",description:"Weekly food market featuring local vendors, fresh produce, and street food. Support local businesses!",category:"food",image:"https://picsum.photos/seed/market/400/600",date:"2025-12-05",time:"12:00",venue:"Praca XV, Centro",lat:-22.9035,lng:-43.1758,isRecurring:!0,recurrencePattern:"custom",recurrenceDays:[4],recurrenceEndDate:"2025-12-31",attendees:[e[0].id,e[1].id,e[2].id,e[3].id,e[4].id,e[5].id],whatsappLink:"https://wa.me/?text=Food%20Market%20on%20Thursday!",tags:["free-entry","family-friendly","local-favorite"],viewCount:88,createdAt:"2025-01-21T00:00:00Z",order:18},{id:a(),name:"Lapa Street Party",description:"The legendary Lapa nightlife experience! Samba, caipirinhas, and live music under the arches every weekend.",category:"parties",image:"https://picsum.photos/seed/lapaparty/400/600",date:"2025-12-05",time:"22:00",venue:"Arcos da Lapa, Centro",lat:-22.913,lng:-43.1802,isRecurring:!0,recurrencePattern:"custom",recurrenceDays:[5,6],recurrenceEndDate:"2026-03-01",attendees:[e[0].id,e[1].id,e[2].id,e[3].id,e[4].id,e[5].id],whatsappLink:"https://wa.me/?text=Party%20at%20Lapa%20tonight!",tags:["party","local-favorite","must-see"],recommended:!0,viewCount:260,createdAt:"2025-01-22T00:00:00Z",order:19}],meetups:[{id:a(),name:"Pre-Ball Drinks",description:"Let's meet for some champagne before heading into the Palace! Meeting at the hotel bar.",category:"parties",image:"https://picsum.photos/seed/drinks/400/300",date:"2025-03-01",time:"20:00",venue:"Pergula Restaurant",event:s,attendees:[],createdAt:"2025-01-25T00:00:00Z",order:3}],groups:[{id:a(),name:"MEETUP.RIO - Official",description:"The main MEETUP.RIO community! Connect with travelers, get insider tips, and join events happening around Rio.",category:"groups",groupName:"MEETUP.RIO - Official",memberCount:"1,200+ members",image:"https://picsum.photos/seed/meetuprio/400/600",lat:-22.9068,lng:-43.1729,whatsappLink:"https://chat.whatsapp.com/MEETUPRIO",featured:!0,tags:["local-favorite","must-see"],recommended:!0,viewCount:450,createdAt:"2025-01-01T00:00:00Z",order:20},{id:a(),name:"Rio Events & Parties",description:"Stay updated on the hottest parties, festivals, and events in Rio. Organized by MEETUP.RIO team.",category:"groups",groupName:"Rio Events & Parties",memberCount:"800+ members",image:"https://picsum.photos/seed/rioevents/400/600",lat:-22.9068,lng:-43.1729,whatsappLink:"https://chat.whatsapp.com/RIOEVENTS",featured:!0,tags:["party","local-favorite"],viewCount:320,createdAt:"2025-01-02T00:00:00Z",order:21},{id:a(),name:"Ipanema Locals",description:"Community group for people living in or visiting Ipanema. Share tips, meetups, and local recommendations.",category:"groups",groupName:"Ipanema Locals",memberCount:"350+ members",image:"https://picsum.photos/seed/ipanema-group/400/600",lat:-22.9838,lng:-43.2044,whatsappLink:"https://chat.whatsapp.com/IPANEMA",featured:!1,tags:["chill","local-favorite"],viewCount:85,createdAt:"2025-01-16T00:00:00Z",order:22},{id:a(),name:"Rio Food Lovers",description:"For food enthusiasts! Share restaurant recommendations, food truck finds, and organize dinner meetups.",category:"groups",groupName:"Rio Food Lovers",memberCount:"500+ members",image:"https://picsum.photos/seed/foodies/400/600",lat:-22.9068,lng:-43.1729,whatsappLink:"https://chat.whatsapp.com/RIOFOODIES",featured:!1,tags:["local-favorite","family-friendly"],viewCount:120,createdAt:"2025-01-17T00:00:00Z",order:23},{id:a(),name:"Beach Volleyball Rio",description:"Join pickup games at Copacabana and Ipanema! All skill levels welcome. Games usually weekends.",category:"groups",groupName:"Beach Volleyball Rio",memberCount:"280+ members",image:"https://picsum.photos/seed/volleyball/400/600",lat:-22.9711,lng:-43.1822,whatsappLink:"https://chat.whatsapp.com/VOLLEYBALL",featured:!1,tags:["chill","free-entry"],viewCount:65,createdAt:"2025-01-18T00:00:00Z",order:24}],guides:[{id:a(),title:"Complete Guide to Rio's Best Beaches",description:"From the iconic Copacabana to hidden gems like Prainha - everything you need to know about Rio's stunning coastline.",coverImage:"https://picsum.photos/seed/beaches-guide/400/600",guideType:"article",categories:["beaches"],tags:["must-see","family-friendly","chill"],recommended:!0,body:\`Rio de Janeiro is blessed with some of the world's most beautiful beaches, each with its own unique character and vibe.

## Copacabana - The Classic
The most famous beach in Brazil, Copacabana stretches for 4km along the Atlantic coast. The iconic wave-pattern boardwalk, designed by Roberto Burle Marx, is perfect for morning jogs or evening strolls. Best time to visit: early morning for exercise, sunset for drinks at the kiosks.

## Ipanema - The Trendy
Made famous by the song "The Girl from Ipanema," this beach is where Rio's beautiful people gather. The beach is divided into "postos" (lifeguard stations), each with its own crowd - Posto 9 is popular with the young and artistic, while Posto 8 attracts families.

## Prainha - The Hidden Gem
If you want to escape the crowds, head to Prainha in Recreio dos Bandeirantes. Surrounded by lush mountains, this small beach offers excellent surfing and a more natural setting. It's a 40-minute drive from the city center but worth every minute.

## Arpoador - The Sunset Spot
Located between Ipanema and Copacabana, Arpoador Rock is THE place to watch the sunset. Locals gather every evening and applaud as the sun dips below the horizon - a truly magical Rio experience.

## Pro Tips
- Bring cash for beach vendors (agua de coco, mate, snacks)
- Rent a beach chair and umbrella (around R$20-30)
- Don't bring valuables - leave them at your hotel
- Apply sunscreen regularly - the tropical sun is intense!\`,featured:!0,status:"published",publishedAt:"2025-01-15T00:00:00Z",createdAt:"2025-01-15T00:00:00Z",order:1},{id:a(),title:"10 Must-Visit Museums in Rio",description:"Curated collection of Rio's best museums for art, history, and culture lovers. From contemporary art to colonial history.",coverImage:"https://picsum.photos/seed/museums-guide/400/600",guideType:"list",categories:["culture"],tags:["must-see","wheelchair-accessible","family-friendly"],recommended:!0,items:[{type:"place",id:i,note:"World-class contemporary art museum designed by Oscar Niemeyer"},{type:"place",id:r,note:"Beautiful imperial palace in the Botanical Garden area"},{type:"place",id:d,note:"Stunning architecture and interactive science exhibits"}],featured:!0,status:"published",publishedAt:"2025-01-16T00:00:00Z",createdAt:"2025-01-16T00:00:00Z",order:2},{id:a(),title:"Guide to Maracana Stadium",description:"Everything you need to know about visiting Brazil's most legendary football stadium - tours, matches, and history.",coverImage:"https://picsum.photos/seed/maracana-guide/400/600",guideType:"article",categories:["sports","culture"],tags:["must-see","wheelchair-accessible","local-favorite"],body:\`The Maracana Stadium is more than just a football venue - it's a temple of Brazilian passion and history.

## History
Built for the 1950 FIFA World Cup, Maracana was once the largest stadium in the world, holding nearly 200,000 fans. Today, after renovations for the 2014 World Cup and 2016 Olympics, it seats about 78,000 but remains one of the most iconic sports venues on Earth.

## Stadium Tours
Tours run daily from 9am to 5pm (except match days). You'll walk through the locker rooms, touch the grass, see the trophy room, and sit in the press area. The tour takes about 40 minutes.

Ticket prices:
- Adults: R$65
- Students/Seniors: R$32

## Watching a Match
Nothing compares to experiencing a live match at Maracana. The atmosphere when Flamengo or Fluminense play is electric. Tickets are available on club websites or at the stadium on match days.

## Getting There
- Metro: Maracana station (Line 2)
- Address: Av. Pres. Castelo Branco, Portao 3

## Tips
- Arrive early on match days (gates open 2 hours before)
- Wear your team's colors if you have one!
- Don't miss the Hall of Fame section
- The museum shop has great souvenirs\`,status:"published",featured:!1,publishedAt:"2025-01-17T00:00:00Z",createdAt:"2025-01-17T00:00:00Z",order:3},{id:a(),title:"Best Hiking Trails Near Rio",description:"From beginner-friendly walks to challenging climbs - discover Rio's incredible natural beauty beyond the beaches.",coverImage:"https://picsum.photos/seed/hiking-guide/400/600",guideType:"list",categories:["hiking"],tags:["adventure","free-entry","must-see"],items:[{type:"place",id:n,note:"Moderate 3-hour hike with stunning views of Sugarloaf and Guanabara Bay"},{type:"place",id:r,note:"Easy walk through Atlantic Forest to a beautiful waterfall"},{type:"place",id:i,note:"Challenging climb but the 360 views are unforgettable"}],status:"published",featured:!1,publishedAt:"2025-01-18T00:00:00Z",createdAt:"2025-01-18T00:00:00Z",order:4},{id:a(),title:"Lapa Nightlife: The Ultimate Guide",description:"Navigate Rio's most vibrant neighborhood for samba, live music, and unforgettable nights under the famous arches.",coverImage:"https://picsum.photos/seed/lapa-guide/400/600",guideType:"article",categories:["parties","dancing"],tags:["party","local-favorite","must-see"],recommended:!0,body:\`Lapa is the beating heart of Rio's nightlife. This historic neighborhood transforms every weekend into one giant street party.

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
- The party goes until 4-5am!\`,status:"published",featured:!1,publishedAt:"2025-01-19T00:00:00Z",createdAt:"2025-01-19T00:00:00Z",order:5}],users:e,notifications:[{id:a(),recipient:e[1].id,sender:e[2].id,type:"like",title:"New Like",message:"Maria Silva liked Copacabana Beach",contentType:"place",contentSlug:"copacabana-beach",read:!1,createdAt:new Date(Date.now()-1e3*60*5).toISOString()},{id:a(),recipient:e[1].id,sender:e[3].id,type:"join",title:"New Attendee",message:"Carlos Mendez joined your meetup Pre-Ball Drinks",contentType:"meetup",contentSlug:"pre-ball-drinks",read:!1,createdAt:new Date(Date.now()-1e3*60*30).toISOString()},{id:a(),recipient:e[1].id,type:"system",title:"Welcome to MEETUP.RIO!",message:"Discover the best places and events in Rio de Janeiro",read:!0,createdAt:new Date(Date.now()-1e3*60*60*24).toISOString(),readAt:new Date(Date.now()-1e3*60*60*12).toISOString()},{id:a(),recipient:e[1].id,sender:e[4].id,type:"follow",title:"New Follower",message:"Ana Costa started following you",read:!0,createdAt:new Date(Date.now()-1e3*60*60*48).toISOString(),readAt:new Date(Date.now()-1e3*60*60*24).toISOString()}]};
`,mimeType:"text/javascript"},"/$app/base/backend/backend.js":{content:'import{initAuthBackend as B}from"/$app/auth/backend.js";import I from"/$app/base/config.js";import{initModelBackend as R}from"/$app/model/backend.js";import{loadAdapter as h}from"/$app/model/adapter-loader.js";import{createDatabase as y}from"/$app/model/factory.js";import{buildQueryResult as C,matchesWhere as U,validateQueryOptions as _}from"/$app/model/query-builder.js";import{generateId as q,mergeRowUpdates as O,prepareRow as N,validateRow as K}from"/$app/model/row-utils.js";import{SubscriptionManager as L}from"/$app/model/subscription-manager.js";import{loadRelationships as V,loadRelationshipsForMany as Y}from"/$app/model/relationship-loader.js";import o from"/$app/types/index.js";import t,{createCollection as $}from"/$app.js";async function j(d="indexeddb"){const g={validateRow:K,prepareRow:N,generateId:q,mergeRowUpdates:O,buildQueryResult:C,matchesWhere:U,validateQueryOptions:_,loadRelationships:V,loadRelationshipsForMany:Y,eventEmitter:(u,w)=>t.events.emit(u,w),subscriptionManager:t.SubscriptionManager};await h(d,g)}R(t),B(t);let m,c,i;if(t.settings.runtime==="worker"){const d={APP:"App",USER:"User",DEVICE:"Device"},g=$({export:async()=>{if(t.Database?.exportData)return await t.Database.exportData();throw new Error("Export not supported by current database adapter")},import:async e=>{if(c?.importData){const{dump:a,keepIndex:n=!0}=e;if(await c.importData(a,{keepIndex:n}),i){const r=i.getSystemModelManager(),s=await r.getApp();await i.edit(r.MODELS.APP,s.id,{migrationTimestamp:Date.now()})}return{success:!0}}throw new Error("Import not supported by current database adapter")}});t.addModule({name:"sysmodels",alias:"SYSTEM",base:g,settings:d});const u=t.databaseConfig||{};(!u.type||u.type==="indexeddb"||u.type==="hybrid")&&t.sysmodels.set({[d.APP]:{name:o.string({index:!0,primary:!0}),version:o.number(),users:o.many(d.USER,"appId"),active:o.boolean({defaultValue:!0,index:!0}),models:o.object(),migrationTimestamp:o.number()},[d.USER]:{name:o.string({index:!0,primary:!0}),appId:o.one(d.APP,"users"),devices:o.many(d.DEVICE,"userId"),publicKey:o.string(),privateKey:o.string(),active:o.boolean({index:!0})},[d.DEVICE]:{name:o.string({index:!0,primary:!0}),userId:o.one(d.USER,"devices"),deviceData:o.string(),active:o.boolean({defaultValue:!0,index:!0})}}),t.events.on("APP:BACKEND:STARTED",async({app:e,user:a,device:n})=>{if(!e){console.error("APP:BACKEND:STARTED hook called with invalid app.",{app:e});return}c&&(t.SubscriptionManager=new L(c),console.log("SubscriptionManager: Initialized"),t.Database=c),await t.events.emit("APP:DATABASE:STARTED",{app:e,user:a,device:n})});let A=1;const l={},b=async(e,a,n=I.backend.requestTimeout)=>{const s=(await self.clients.matchAll({type:"window",includeUncontrolled:!0}))[0];if(!s)return Promise.reject(new Error("No active client found to send request to."));const p=`backend-request-${A++}`;return new Promise((x,M)=>{l[p]={resolve:x,reject:M},setTimeout(()=>{delete l[p],M(new Error(`Request timed out after ${n}ms`))},n),s.postMessage({type:e,payload:a,eventId:p})})},f=async e=>{t.Backend.client&&(t.Backend.client.postMessage(e),t.Backend.client.postMessage({type:"BROADCAST",params:e}))},E=async({data:e,respond:a})=>{const{type:n,payload:r,eventId:s}=e;if(l[s]){l[s].resolve(r),delete l[s];return}await t.events.emit(n,{payload:r,eventId:s,respond:a,client:P(t.Backend.client),broadcast:f})},P=e=>new Proxy({},{get:(a,n)=>r=>S(e,n,r)}),S=(e,a,n)=>{const r=`sw_${A++}`;return new Promise((s,p)=>{l[r]={resolve:s,reject:p},e.postMessage({type:a,payload:n,eventId:r})})},D=async e=>{if(!i)return null;const a=i.getSystemModelManager();return a?await a.createAppEntry(e):null},v=async()=>{if(!i)return null;const e=i.getSystemModelManager();return e?await e.getApp():null},T=async e=>{if(t.Backend.user)return t.Backend.user;if(!i)return null;const a=i.getSystemModelManager();return a?await a.getUser(e):null},k=async e=>{if(!i)return null;const a=i.getSystemModelManager();return a?await a.getDevice(e):null};t.events.set({GET_CURRENT_APP:async({respond:e})=>{if(!i){e({error:"Multi-app not supported with current database adapter"});return}const a=await t.Backend.getApp();e(a)},LIST_APPS:async({respond:e})=>{if(!i){e({error:"Multi-app not supported with current database adapter"});return}const n=await i.getSystemModelManager().listApps();e(n||[])},CREATE_APP:async({respond:e})=>{if(!i){e({error:"Multi-app not supported with current database adapter"});return}const a=i.getSystemModelManager(),n=await a.getApp();n&&await i.edit(d.APP,n.id,{active:!1});const r=await a.createAppEntry(),s=await a.setupAppEnvironment(r);e(s.app)},SELECT_APP:async({payload:e,respond:a})=>{if(!i){a({error:"Multi-app not supported with current database adapter"});return}const{appId:n}=e;if(!n)return a({error:"An \'appId\' is required to select an app."});const r=i.getSystemModelManager(),s=await r.selectApp(n),p=await r.setupAppEnvironment(s);a(p.app)},GET_DB_DUMP:async({respond:e})=>{const a=await t.SYSTEM.export();e(a)},LOAD_DB_DUMP:async({payload:e,respond:a=console.log})=>{try{await t.SYSTEM.import(e),a({success:!0})}catch(n){console.error("Failed to load DB dump:",n),a({success:!1,error:n})}}}),m={bootstrap:async()=>{const e={type:"indexeddb",name:"app",models:t.models,...t.databaseConfig||{}},a=["indexeddb","hybrid"].includes(e.type);await j(e.type);let n;if(a){i=await y({type:"indexeddb",name:d.APP,version:1,models:t.sysmodels,system:!0,enableSystemModels:!0,systemModelManagerOptions:{eventEmitter:(s,p)=>t.events.emit(s,p),importData:async({dump:s})=>{c?.importData&&await c.importData(s,{keepIndex:!0})}}}),await i.init(),t.SysModel=i;const r=i.getSystemModelManager();n=await r.getApp(),n||(n=await r.createAppEntry()),e.name=n.id,e.version=n.version,c=await y(e),t.Database=c,await c.init(),t.data&&!n.migrationTimestamp&&(console.error({app:n}),await r.migrateData(t.data,n),n=await r.getApp()),await t.events.emit("APP:BACKEND:STARTED",{app:n})}else{if(n={id:e.name,version:1,active:!0},c=await y(e),await c.init(),t.data&&Object.keys(t.data).length>0){console.log("PocketBase: Checking for initial data migration...");const s=Object.keys(t.data)[0];(await c.getAll(s,{limit:1})).length===0?(console.log("PocketBase: Migrating initial data..."),await c.importData(t.data),console.log("PocketBase: Initial data migration complete")):console.log("PocketBase: Data already exists, skipping migration")}const r={app:n,user:null,device:null};await t.events.emit("APP:BACKEND:STARTED",r)}},handleMessage:E,getApp:v,getDevice:k,createAppEntry:D,getUser:T,broadcast:f,requestFromClient:b},t.addModule({name:"Backend",base:m})}t.events.on("APP:INIT",async()=>{console.info("Initializing backend application"),await m.bootstrap()});export default m;\n',mimeType:"text/javascript"},"/$app/auth/backend.js":{content:'const T=()=>{const l=new Uint8Array(32);return crypto.getRandomValues(l),btoa(String.fromCharCode.apply(null,l)).replace(/\\+/g,"-").replace(/\\//g,"_").replace(/=+$/,"")},m=async l=>{const t=new TextEncoder().encode(l),r=await crypto.subtle.digest("SHA-256",t);return btoa(String.fromCharCode.apply(null,new Uint8Array(r))).replace(/\\+/g,"-").replace(/\\//g,"_").replace(/=+$/,"")};export function createAuthEventHandlers(l){const c=()=>{if(!l.Database?.pb)throw new Error("PocketBase not initialized");return l.Database.pb};return{"AUTH:LOGIN":async({payload:t,respond:r})=>{try{const e=c(),{email:a,password:o}=t,s=await e.collection("users").authWithPassword(a,o);r({token:s.token,user:s.record})}catch(e){console.error("AUTH:LOGIN error:",e),r({error:e.message||"Login failed",code:e.status})}},"AUTH:REGISTER":async({payload:t,respond:r})=>{try{const e=c(),{email:a,password:o,passwordConfirm:s,name:u,...n}=t,d={email:a,password:o,passwordConfirm:s||o,name:u,...n,isGuest:!1};await e.collection("users").create(d);const i=await e.collection("users").authWithPassword(a,o);r({token:i.token,user:i.record})}catch(e){console.error("AUTH:REGISTER error:",e),r({error:e.message||"Registration failed",code:e.status,data:e.data})}},"AUTH:OAUTH_START":async({payload:t,respond:r})=>{try{const e=c(),{provider:a,redirectUrl:o}=t,s=await e.collection("users").listAuthMethods();if(!s.oauth2?.enabled){r({error:"OAuth2 is not enabled"});return}const u=s.oauth2.providers?.find(h=>h.name===a);if(!u){r({error:`OAuth provider "${a}" is not configured`});return}const n=T(),d=await m(n),i=new URL(u.authURL);i.searchParams.set("redirect_uri",o),i.searchParams.set("code_challenge",d),i.searchParams.set("code_challenge_method","S256"),r({authUrl:i.toString(),codeVerifier:n,state:u.state,provider:a})}catch(e){console.error("AUTH:OAUTH_START error:",e),r({error:e.message||"Failed to start OAuth"})}},"AUTH:OAUTH_COMPLETE":async({payload:t,respond:r})=>{try{const e=c(),{provider:a,code:o,codeVerifier:s,redirectUrl:u}=t,n=await e.collection("users").authWithOAuth2Code(a,o,s,u);r({token:n.token,user:n.record,meta:n.meta})}catch(e){console.error("AUTH:OAUTH_COMPLETE error:",e),r({error:e.message||"OAuth authentication failed",code:e.status})}},"AUTH:LOGOUT":async({respond:t})=>{try{c().authStore.clear(),t({success:!0})}catch(r){console.error("AUTH:LOGOUT error:",r),t({error:r.message})}},"AUTH:GET_USER":async({respond:t})=>{try{const r=c();t({user:r.authStore.model})}catch(r){t({error:r.message})}},"AUTH:REFRESH_TOKEN":async({payload:t,respond:r})=>{try{const e=c();t?.token&&e.authStore.save(t.token,e.authStore.model);const a=await e.collection("users").authRefresh();r({token:a.token,user:a.record})}catch(e){console.error("AUTH:REFRESH_TOKEN error:",e),r({error:e.message||"Token refresh failed",code:e.status})}},"AUTH:UPDATE_USER":async({payload:t,respond:r})=>{try{const e=c(),a=e.authStore.model?.id;if(!a){r({error:"Not authenticated"});return}const o=await e.collection("users").update(a,t);r({user:o})}catch(e){console.error("AUTH:UPDATE_USER error:",e),r({error:e.message||"Update failed",code:e.status})}},"AUTH:MIGRATE_GUEST":async({payload:t,respond:r})=>{try{const{guestId:e,newUserId:a}=t;if(!e||!a){r({error:"guestId and newUserId are required"});return}const o={success:!0,migrated:{}};try{await new Promise((s,u)=>{let n=!1;const d=setTimeout(()=>{n||s()},100);l.events.emit("AUTH:MIGRATE_GUEST_REQUEST",{guestId:e,newUserId:a,onComplete:i=>{n=!0,clearTimeout(d),i&&Object.assign(o.migrated,i),s()},onError:i=>{n=!0,clearTimeout(d),u(i)}})})}catch(s){console.warn("Guest migration handler error:",s),o.warning=s.message}r(o)}catch(e){console.error("AUTH:MIGRATE_GUEST error:",e),r({error:e.message})}},"AUTH:CHECK_EMAIL":async({payload:t,respond:r})=>{try{const e=c(),{email:a}=t;try{const o=await e.collection("users").getList(1,1,{filter:`email = "${a}"`});r({available:o.totalItems===0})}catch{r({available:!0})}}catch(e){r({error:e.message})}}}}export function initAuthBackend(l){const c=createAuthEventHandlers(l);l.events.set(c),console.log("Auth backend module loaded")}export default{createAuthEventHandlers,initAuthBackend};\n',mimeType:"text/javascript"},"/$app/model/adapter-loader.js":{content:'import{registerAdapter as c}from"/$app/model/factory.js";const o={indexeddb:"/$app/model-indexeddb/adapter.js",pocketbase:"/$app/model-pocketbase/adapter.js",hybrid:"/$app/model-hybrid/adapter.js"};function p(e,r){return class extends e{constructor(d){super({...d,...r})}}}export async function loadAdapter(e,r){const t=o[e];if(!t)throw new Error(`Unknown adapter type: "${e}". Available types: ${Object.keys(o).join(", ")}`);if(e==="hybrid"){await A(r);return}try{const d=await import(t),s=d.default||d.IndexedDBAdapter||d.PocketBaseAdapter;if(!s)throw new Error(`Failed to load adapter class for type: "${e}"`);let a=r;if(e==="pocketbase"){const n=(await import("/npm/pocketbase")).default;a={...r,PocketBase:n}}const i=p(s,a);c(e,i),console.info(`AdapterLoader: Loaded and registered "${e}" adapter`)}catch(d){throw console.error(`AdapterLoader: Failed to load "${e}" adapter:`,d),d}}async function A(e){try{const[r,t,d,s]=await Promise.all([import(o.indexeddb),import(o.pocketbase),import(o.hybrid),import("/npm/pocketbase")]),a=r.default||r.IndexedDBAdapter,i=t.default||t.PocketBaseAdapter,n=d.default||d.HybridAdapter,l=s.default;if(!a||!i||!n)throw new Error("Failed to load required adapter classes for hybrid mode");const b=p(a,e),u=p(i,{...e,PocketBase:l});c("hybrid",class extends n{constructor(f){super({...f,...e,IndexedDBAdapter:b,PocketBaseAdapter:u})}}),console.info(\'AdapterLoader: Loaded and registered "hybrid" adapter (with indexeddb + pocketbase)\')}catch(r){throw console.error("AdapterLoader: Failed to load hybrid adapter:",r),r}}export default{loadAdapter};\n',mimeType:"text/javascript"},"/$app/model/backend.js":{content:'import{createModel as i}from"./index.js";export function createModelEventHandlers(s){return{ADD:async({payload:e,respond:t})=>{try{const r=await s.Database.add(e.model,e.row);t([null,r])}catch(r){t([r,null])}},ADD_MANY:async({payload:e,respond:t})=>{const r=[];for(const o of e.rows)try{const n=await s.Database.add(e.model,o);r.push([null,n])}catch(n){t([n,null])}t([null,r])},REMOVE:async({payload:e,respond:t})=>{const r=await s.Database.remove(e.model,e.id);t(r)},REMOVE_MANY:async({payload:e,respond:t})=>{const r=[],o=Array.isArray(e.ids)?e.ids:[e.ids];for(const n of o){const a=await s.Database.remove(e.model,n);r.push(a)}t([null,r])},EDIT:async({payload:e,respond:t})=>{if(!e.row.id){t([new Error("Record data must include \'id\' field for edit operation"),null]);return}try{const r=await s.Database.edit(e.model,e.row.id,e.row);t([null,r])}catch(r){t([r,null])}},EDIT_MANY:async({payload:e,respond:t})=>{const r=[];for(const o of e.rows){if(!o.id){r.push([new Error("Record must have id field"),null]);continue}try{const n=await s.Database.edit(e.model,o.id,o);r.push([null,n])}catch(n){t([n,null])}}t([null,r])},GET:async({payload:e,respond:t})=>{const{id:r,model:o,opts:n={}}=e;let a;if(r)a=await s.Database.get(o,r,n);else if(n.where){const l=typeof n.where=="string"?JSON.parse(n.where):n.where,c=await s.Database.getAll(o,{where:l,limit:1,includes:n.includes||[]});a=c.length>0?c[0]:null}else a=null;t(a)},GET_MANY:async({payload:{model:e,opts:t={}},respond:r}={})=>{const o=await s.Database.getAll(e,t);r(o)}}}export function createRelationshipSyncHandlers(s){return{onAddRecord({model:e,row:t}){s.Backend.broadcast({type:"QUERY_DATA_SYNC",payload:{action:"add",model:e,record:t}})},onEditRecord({model:e,row:t}){s.Backend.broadcast({type:"QUERY_DATA_SYNC",payload:{action:"update",model:e,record:t}})},onRemoveRecord({model:e,row:t,id:r}){s.Backend.broadcast({type:"QUERY_DATA_SYNC",payload:{action:"delete",model:e,record:t||{id:r}}})}}}export function initModelBackend(s){const e=i(s),t=createModelEventHandlers(s);s.events.set(t);const r=(n,a,l={})=>new Promise(c=>{const d=t[n];d&&typeof d=="function"?d({respond:c,payload:{model:a,...l}}):c({success:!1,error:`Action "${n}" not found.`})}),o=createRelationshipSyncHandlers(s);return s.events.set(o),e.request=r,s.addModule({name:"Model",base:e}),e}export default{createModelEventHandlers,createRelationshipSyncHandlers,initModelBackend};\n',mimeType:"text/javascript"},"/$app/model/factory.js":{content:'const t=new Map;export function registerAdapter(e,a){t.has(e)&&console.warn(`Database: Overwriting existing adapter type "${e}"`),t.set(e,a),console.info(`Database: Registered adapter type "${e}"`)}export async function createDatabase(e){typeof e=="string"&&(e={type:e});const{type:a="indexeddb",name:r,version:n=1,models:s={}}=e;if(!r)throw new Error("Database name is required");if((!s||Object.keys(s).length===0)&&console.warn(`Database: No models provided for database "${r}"`),!t.has(a))throw new Error(`Unknown adapter type "${a}". Available types: ${getAvailableAdapters().join(", ")}. Use registerAdapter() to register adapters.`);const o=t.get(a),i=new o(e);return console.info(`Database: Created ${a} adapter for "${r}" v${n}`),i}export function getAvailableAdapters(){return Array.from(t.keys())}export function hasAdapter(e){return t.has(e)}export default{createDatabase,registerAdapter,getAvailableAdapters,hasAdapter};\n',mimeType:"text/javascript"},"/$app/model/query-builder.js":{content:`export function parseOrder(t){return t?Array.isArray(t)?t:t.split(",").map(u=>{const[i,n="ASC"]=u.trim().split(/\\s+/);return{field:i,direction:n.toUpperCase()}}):[]}export function matchesWhere(t,u){return!u||Object.keys(u).length===0?!0:Object.entries(u).every(([i,n])=>{const r=t[i];return typeof n!="object"||n===null?i==="id"?String(r)===String(n):r===n:Object.entries(n).every(([s,e])=>{switch(s){case">":return r>e;case">=":return r>=e;case"<":return r<e;case"<=":return r<=e;case"!=":case"<>":return r!==e;case"in":return Array.isArray(e)&&e.includes(r);case"not in":return Array.isArray(e)&&!e.includes(r);case"like":return typeof r=="string"&&r.includes(e);case"ilike":return typeof r=="string"&&r.toLowerCase().includes(e.toLowerCase());case"is null":return r==null;case"is not null":return r!=null;default:return r===e}})})}export function applyOrder(t,u){if(!u||!t||t.length===0)return t;const i=parseOrder(u);return i.length===0?t:[...t].sort((n,r)=>{for(const{field:s,direction:e}of i){const o=n[s],a=r[s];if(o===a)continue;const f=o<a?-1:1;return e==="DESC"?-f:f}return 0})}export function applyPagination(t,u,i=0){if(!t)return[];if(!u&&!i)return t;const n=i||0,r=u?n+u:void 0;return t.slice(n,r)}export function buildQueryResult(t,u={}){const{where:i,order:n,limit:r,offset:s}=u;let e=i?t.filter(f=>matchesWhere(f,i)):t;const o=e.length;return n&&(e=applyOrder(e,n)),{items:applyPagination(e,r,s),count:o,total:o,limit:r,offset:s||0}}export function validateQueryOptions(t={}){const{limit:u,offset:i,where:n}=t;if(u!==void 0&&(typeof u!="number"||u<0))throw new Error("limit must be a positive number");if(i!==void 0&&(typeof i!="number"||i<0))throw new Error("offset must be a non-negative number");if(n!==void 0&&(typeof n!="object"||n===null))throw new Error("where must be an object");return!0}export default{parseOrder,matchesWhere,applyOrder,applyPagination,buildQueryResult,validateQueryOptions};
`,mimeType:"text/javascript"},"/$app/model/row-utils.js":{content:'export const BOOLEAN_TO_STORAGE={true:1,false:0},STORAGE_TO_BOOLEAN={1:!0,0:!1,true:!0,false:!1};export function prepareRow(a,o,u,l={}){const{currentRow:f={},reverse:i=!1}=l,d=a[o];if(!d)throw new Error(`Model "${o}" not found in schema`);const n={...u},s=i?STORAGE_TO_BOOLEAN:BOOLEAN_TO_STORAGE;for(const[e,t]of Object.entries(d)){if(t.relationship&&!t.belongs)continue;const r=u[e];if(r===void 0&&f[e]!==void 0){n[e]=f[e];continue}t.type==="boolean"&&r!==void 0&&r!==null&&(n[e]=s[r]??r),(t.type==="date"||t.type==="datetime")&&r&&(i?n[e]=typeof r=="number"?new Date(r):r:n[e]=r instanceof Date?r.getTime():r),!i&&r===void 0&&t.defaultValue!==void 0&&(n[e]=typeof t.defaultValue=="function"?t.defaultValue():t.defaultValue)}return n}export function validateRow(a,o,u,l={}){const f=a[o];if(!f)return{valid:!1,errors:{_model:`Model "${o}" not found`},data:null};const i={},d={...u};for(const[n,s]of Object.entries(f)){const e=u[n];if(s.required&&(e==null||e==="")&&l.operation!=="edit"){i[n]=`${n} is required`;continue}if(e!=null&&s.type){const t=s.type,r=Array.isArray(e)?"array":typeof e,c={string:["string","number"],number:["number","string"],boolean:["boolean","number","string"],object:["object"],array:["array"],date:["object","number","string"],datetime:["object","number","string"]};c[t]&&!c[t].includes(r)&&(i[n]=`${n} must be of type ${t}`)}if(s.validator&&e!==void 0)try{s.validator(e,u)||(i[n]=`${n} failed custom validation`)}catch(t){i[n]=t.message||`${n} validation error`}if(s.format&&e){const t={email:/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,url:/^https?:\\/\\/.+/};t[s.format]&&!t[s.format].test(e)&&(i[n]=`${n} must be a valid ${s.format}`)}}return{valid:Object.keys(i).length===0,errors:i,data:d}}export function extractRelationships(a,o){const u={},l={};for(const[f,i]of Object.entries(a))i.relationship&&(i.belongs&&o[f]!==void 0?u[f]=o[f]:!i.belongs&&o[f]!==void 0&&(l[f]=o[f]));return{belongs:u,references:l}}export function generateId(a=!1){const o=`${Date.now()}${Math.random().toString(10).substr(2,2)}`;return a?o:Number(o)}export function cloneRow(a){if(!a||typeof a!="object")return a;try{return JSON.parse(JSON.stringify(a))}catch{return{...a}}}export function mergeRowUpdates(a,o){return{...a,...o}}export default{prepareRow,validateRow,extractRelationships,generateId,cloneRow,mergeRowUpdates,BOOLEAN_TO_STORAGE,STORAGE_TO_BOOLEAN};\n',mimeType:"text/javascript"},"/$app/model/subscription-manager.js":{content:'import{matchesWhere as a}from"./query-builder.js";export class QuerySubscription{constructor(t,s,e){this.model=t,this.where=s,this.filterString=e,this.queryHash=null,this.callbacks=new Set,this.refCount=0}addCallback(t){this.callbacks.add(t),this.refCount++}removeCallback(t){this.callbacks.delete(t),this.refCount--}notify(t){this.callbacks.forEach(s=>{try{s(t)}catch(e){console.error("Error in query subscription callback:",e)}})}}export function hashQuery(o,t){if(!t||Object.keys(t).length===0)return`${o}::*`;const s=Object.keys(t).sort(),e={};s.forEach(r=>{e[r]=t[r]});const i=JSON.stringify(e);return`${o}::${i}`}const u=o=>!o||Object.keys(o).length===0?"":JSON.stringify(o);export class SubscriptionManager{constructor(t,s={}){this.database=t,this.buildFilterString=s.buildFilterString||u,this.subscriptions=new Map,this.modelToQueries=new Map,this.adapterUnsubscribers=new Map}setFilterBuilder(t){this.buildFilterString=t}async subscribe(t,s,e){if(typeof e!="function")return console.error("Subscription callback must be a function"),()=>{};const i=hashQuery(t,s);let r=this.subscriptions.get(i),n=!1;if(!r){const c=this.buildFilterString(s);r=new QuerySubscription(t,s,c),r.queryHash=i,n=!0}return r.addCallback(e),n&&(this.subscriptions.set(i,r),this.modelToQueries.has(t)||this.modelToQueries.set(t,new Set),this.modelToQueries.get(t).add(i),await this.createAdapterSubscription(r)),()=>this.unsubscribe(i,e)}unsubscribe(t,s){const e=this.subscriptions.get(t);e&&(e.removeCallback(s),e.refCount===0&&this.cleanupSubscription(t))}async createAdapterSubscription(t){const{model:s,filterString:e}=t;if(this.database?.realtimeManager&&typeof this.database.realtimeManager.subscribe=="function")try{const i=await this.database.realtimeManager.subscribe(s,e,r=>{t.notify(r)});this.adapterUnsubscribers.set(t.queryHash,i)}catch(i){console.error("SubscriptionManager: Failed to create realtime subscription",i)}}cleanupSubscription(t){const s=this.subscriptions.get(t);if(!s)return;const e=this.adapterUnsubscribers.get(t);e&&typeof e=="function"&&(e(),this.adapterUnsubscribers.delete(t)),this.subscriptions.delete(t);const i=this.modelToQueries.get(s.model);i&&(i.delete(t),i.size===0&&this.modelToQueries.delete(s.model))}notifyMatchingQueries(t,s,e){const i=this.modelToQueries.get(t);if(i)for(const r of i){const n=this.subscriptions.get(r);if(!n)continue;(s==="delete"||s==="remove"||!n.where||Object.keys(n.where).length===0||a(e,n.where))&&n.notify({action:s,record:e,model:t})}}cleanup(){for(const t of this.subscriptions.keys())this.cleanupSubscription(t)}getStats(){const t={totalSubscriptions:this.subscriptions.size,byModel:{}};for(const[s,e]of this.modelToQueries){t.byModel[s]={queries:e.size,totalCallbacks:0};for(const i of e){const r=this.subscriptions.get(i);r&&(t.byModel[s].totalCallbacks+=r.refCount)}}return t}}export default SubscriptionManager;\n',mimeType:"text/javascript"},"/$app/model/relationship-loader.js":{content:'export async function loadRelationships(e,o,i,n,t,f=!1){if(!t||t.length===0||!n)return n;const u=o[i];if(!u)return console.warn(`Relationship loader: Model "${i}" not found`),n;const l={...n};for(const r of t){const s=u[r];if(!s){console.warn(`Relationship loader: Relationship "${r}" not found in model "${i}"`);continue}if(!s.relationship){console.warn(`Relationship loader: Field "${r}" is not a relationship`);continue}try{l[r]=await d(e,o,i,n,r,s,f)}catch(h){console.error(`Relationship loader: Error loading "${r}"`,h),l[r]=s.many?[]:null}}return l}export async function loadRelationshipsForMany(e,o,i,n,t,f=!1){return!t||t.length===0||!n||n.length===0?n:Promise.all(n.map(u=>loadRelationships(e,o,i,u,t,f)))}async function d(e,o,i,n,t,f,u){const{relationship:l,targetModel:r,targetForeignKey:s,many:h}=f;if(l==="belongs"){const a=n[t];return a?await e.get(r,a):null}if(l==="belongs_many"){const a=n[t];return!Array.isArray(a)||a.length===0?[]:(await e.getAll(r)).filter(y=>a.includes(y.id))}if(l==="many"){const a=s||`${i}Id`;return await e.getAll(r,{where:{[a]:n.id}})||[]}if(l==="one"){const a=s||`${i}Id`,c=await e.getAll(r,{where:{[a]:n.id},limit:1});return c&&c.length>0?c[0]:null}return console.warn(`Relationship loader: Unknown relationship type "${l}"`),h?[]:null}export function parseIncludes(e){if(!e||!Array.isArray(e))return{};const o={};for(const i of e){const n=i.split("."),t=n[0];if(o[t]||(o[t]={nested:[]}),n.length>1){const f=n.slice(1).join(".");o[t].nested.push(f)}}return o}export async function loadNestedRelationships(e,o,i,n,t){if(!t||t.length===0)return n;const f=parseIncludes(t),u=Array.isArray(n),l=u?n:[n],r=Object.keys(f),s=await loadRelationshipsForMany(e,o,i,l,r,!1);for(const[h,{nested:a}]of Object.entries(f)){if(a.length===0)continue;const c=o[i][h];if(!c)continue;const y=c.targetModel;for(const p of s){const g=p[h];g&&(Array.isArray(g)?p[h]=await loadNestedRelationships(e,o,y,g,a):p[h]=await loadNestedRelationships(e,o,y,g,a))}}return u?s:s[0]}export default{loadRelationships,loadRelationshipsForMany,loadNestedRelationships,parseIncludes};\n',mimeType:"text/javascript"},"/$app/model/index.js":{content:'import q from"/$app/events/index.js";export class ModelType{}const S=Symbol("subscriptions"),O=Symbol("relationshipSubscriptions"),v=(y,l)=>!l||Object.keys(l).length===0?!0:Object.keys(l).every(s=>s==="id"?String(y[s])===String(l[s]):y[s]===l[s]);function U(y,l){const s={total:0,limit:void 0,offset:0,count:0,subscribe(o){return typeof o!="function"?(console.error("Subscription callback must be a function."),this):(this.subscriptions.size===0&&this.registerListeners(),this.subscriptions.add(o),this)},unsubscribe(o){this.subscriptions.delete(o),this.subscriptions.size===0&&this.destroy()},notifySubscribers(){const o=[...this];this.subscriptions.forEach(d=>{try{d(o)}catch(c){console.error("Error in ReactiveArray subscription callback:",c)}})},handleQueryUpdate(o){const{action:d,record:c}=o;switch(d){case"add":case"create":this.handleRecordAdd(c);break;case"update":case"edit":this.handleRecordUpdate(c);break;case"delete":case"remove":this.handleRecordDelete(c);break}},handleRecordAdd(o){if(this.some(c=>String(c.id)===String(o.id)))return;const d=y(o,this.modelName);this.push(d),this.notifySubscribers()},handleRecordUpdate(o){const d=this.findIndex(c=>String(c.id)===String(o.id));if(d>-1)if(!this.opts.where||v(o,this.opts.where)){const p=y(o,this.modelName);this[d]=p,this.notifySubscribers()}else this.splice(d,1),this.notifySubscribers();else(!this.opts.where||v(o,this.opts.where))&&this.handleRecordAdd(o)},handleRecordDelete(o){const d=this.findIndex(c=>String(c.id)===String(o.id));d>-1&&(this.splice(d,1),this.notifySubscribers())},registerListeners(){l.SubscriptionManager.subscribe(this.modelName,this.opts.where,o=>this.handleQueryUpdate(o)).then(o=>{this.queryUnsubscribe=o}).catch(o=>{console.error("Failed to register query subscription:",o)})},destroy(){this.queryUnsubscribe&&typeof this.queryUnsubscribe=="function"&&(this.queryUnsubscribe(),this.queryUnsubscribe=null),this.subscriptions.clear()}};return Object.setPrototypeOf(s,Array.prototype),s}function Y(y,l){return{get(s,o,d){return o==="remove"?()=>y.request("REMOVE",s._modelName,{id:s.id}):o==="update"?()=>{const c={...s};return delete c._modelName,y.request("EDIT",s._modelName,{row:c})}:o==="include"?async c=>{if(!s.id||!s._modelName)return console.error("Cannot run .include() on an object without an ID or model name."),d;if(!(s._modelName in l.models))throw new Error(`Model ${s._modelName} does not exist in models`);const E=l.models[s._modelName][c];if(!E)throw new Error(`Relationship \'${c}\' not found in ${s._modelName} model`);const M=await y.request("GET_MANY",E.targetModel,{opts:{where:E.belongs?s[c]:{[E.targetForeignKey]:s.id}}});return s[c]=y.proxifyMultipleRows(M,E.targetModel),d}:o==="subscribe"?c=>typeof c!="function"?(console.error("Subscription callback must be a function."),s):(l.SubscriptionManager?l.SubscriptionManager.subscribe(s._modelName,{id:s.id},p=>{const{action:E,record:M}=p;c(E==="delete"||E==="remove"?void 0:M)}).then(p=>{s[S]||(s[S]=new Set),s[S].add({callback:c,unsubscribe:p})}).catch(p=>{console.error("Failed to create row subscription:",p)}):(s[S]||(s[S]=new Set),s[S].add(c)),s):o==="unsubscribe"?c=>{if(s[S]){for(const p of s[S])if(typeof p=="object"&&p.callback===c&&p.unsubscribe){p.unsubscribe(),s[S].delete(p);return}s[S].delete(c)}}:s[o]},set(s,o,d){return s[o]=d,!0}}}export function createModel(y){let l,s,o;const d=(e,t,u)=>{if(!e||!u?.length||!y.models?.[t])return;const i=y.models[t],r=[];for(const n of u){const f=i[n];if(!f||!f.targetModel)continue;const h=f.targetModel;if(f.belongs){const a=e[n],b=typeof a=="object"?a?.id:a;b&&c(h,{id:b},e,n,r)}else if(f.belongs_many){const a=e[n]||[];for(const b of a){const x=typeof b=="object"?b?.id:b;x&&c(h,{id:x},e,n,r)}}else if(f.many||f.one){const a=f.targetForeignKey||`${t.toLowerCase()}Id`;c(h,{[a]:e.id},e,n,r)}}r.length>0&&(e[O]=r)},c=(e,t,u,i,r)=>{y.SubscriptionManager&&y.SubscriptionManager.subscribe(e,t,n=>{const{action:f,record:h}=n;f==="update"||f==="edit"?p(u,i,h):(f==="delete"||f==="remove")&&E(u,i,h)}).then(n=>{n&&r.push(n)}).catch(n=>{console.error("Failed to subscribe to relationship:",n)})},p=(e,t,u)=>{const i=e[t];if(Array.isArray(i)){const r=i.findIndex(n=>String(n?.id||n)===String(u.id));if(r>-1){const n=[...i];n[r]=u,e[t]=n}}else i&&typeof i=="object"&&String(i.id)===String(u.id)&&(e[t]=u)},E=(e,t,u)=>{const i=e[t];if(Array.isArray(i)){const r=i.filter(n=>String(n?.id||n)!==String(u.id));r.length!==i.length&&(e[t]=r)}else i&&typeof i=="object"&&String(i.id)===String(u.id)&&(e[t]=null)},M=async({modelName:e,action:t,payload:u})=>{const i=await l.request(t,e,u);if(t==="ADD_MANY"&&i&&Array.isArray(i.results))return i.results.forEach(n=>{n.status==="fulfilled"&&n.value&&(n.value=m(n.value,e))}),i;if(t.includes("MANY")){if(u.opts.object)return i;const n=u.opts||{};if(i?.items){const h={total:i.total,limit:i.limit,offset:i.offset,count:i.count},a=g(i.items,e,n,h);return n.includes?.length&&a.forEach(b=>d(b,e,n.includes)),a}const f=g(i,e,n);return n.includes?.length&&f.forEach(h=>d(h,e,n.includes)),f}if(["ADD","EDIT"].includes(t))return i[0]?[i[0],null]:[null,m(i[1],e)];const r=m(i,e);return u.opts?.includes?.length&&r&&d(r,e,u.opts.includes),r},I=e=>[{type:"static",name:"get",handler:(t,u={})=>M({modelName:e,action:"GET",payload:["string","number"].includes(typeof t)?{id:t,opts:u}:{opts:t}})},{type:"static",name:"getAll",handler:(t={})=>M({modelName:e,action:"GET_MANY",payload:{opts:t}})},{type:"static",name:"add",handler:(t,u)=>M({modelName:e,action:"ADD",payload:{row:t,opts:u}})},{type:"static",name:"addMany",handler:(t,u)=>M({modelName:e,action:"ADD_MANY",payload:{rows:t,opts:u}})},{type:"static",name:"remove",handler:t=>l.request("REMOVE",e,{id:t})},{type:"static",name:"removeAll",handler:t=>l.request("REMOVE_MANY",e,{opts:{where:t}})},{type:"static",name:"edit",handler:t=>M({modelName:e,action:"EDIT",payload:{row:t}})},{type:"static",name:"editAll",handler:(t,u)=>l.request("EDIT_MANY",e,{opts:{where:t,updates:u}})},{type:"static",name:"upsert",handler:(t,u)=>M({modelName:e,action:t?.id?"EDIT":"ADD",payload:{row:t,opts:u}})},{type:"dynamic",prefix:"getBy",action:"GET"},{type:"dynamic",prefix:"getAllBy",action:"GET_MANY"},{type:"dynamic",prefix:"editAllBy",action:"EDIT_MANY"},{type:"dynamic",prefix:"editBy",action:"EDIT"},{type:"dynamic",prefix:"removeBy",action:"REMOVE"},{type:"dynamic",prefix:"removeAllBy",action:"REMOVE_MANY"}],m=(e,t)=>{if(!e||typeof e!="object"||e.errors)return e;if(l[t].rows[e.id]){const i=l[t].rows[e.id],r={...i,...e};r._modelName=t,l[t].rows[e.id]=r;const n=i[S];return n&&n.size>0&&(r[S]=n,n.forEach(({callback:f})=>{try{f(r)}catch(h){console.error("Error in row subscription callback (manual update):",h)}})),new Proxy(r,s)}return l[t].rows[e.id]=e,l[t].on(`get:${e.id}`,i=>{const r=l[t].rows[e.id],n=r?r[S]:void 0;if(i===void 0){delete l[t].rows[e.id],n&&n.size>0&&(n.forEach(({callback:a})=>{try{a(void 0)}catch(b){console.error("Error in row subscription callback (deletion):",b)}}),n.clear());return}const{id:f,...h}=i;Object.assign(r,h),n&&n.size>0&&n.forEach(({callback:a})=>{try{a(r)}catch(b){console.error("Error in row subscription callback (update):",b)}})}),e._modelName=t,new Proxy(l[t].rows[e.id],s)},g=(e,t,u={},i=null)=>{if(!Array.isArray(e))return e;const r=e.map(n=>m(n,t));return Object.setPrototypeOf(r,o),r.modelName=t,r.opts=u,r.subscriptions=new Set,r.queryUnsubscribe=null,i&&(r.total=i.total,r.limit=i.limit,r.offset=i.offset,r.count=i.count),r},T=e=>typeof e!="string"||!e?e:e.charAt(0).toLowerCase()+e.slice(1),A=new Map;return l=new Proxy({},{get(e,t,u){if(t in e)return Reflect.get(e,t,u);if(A.has(t))return A.get(t);const i=t;if(!(t in y.models))throw new Error(`Model ${i} does not exist in models`);const r=y.models[i],n=I(i,r),f=new Proxy(Object.assign(Object.create(ModelType.prototype),{name:i}),{get(h,a,b){if(a in h)return Reflect.get(h,a,b);for(const x of n){if(x.type==="static"&&x.name===a)return x.handler;if(x.type==="dynamic"&&a.startsWith(x.prefix)){const w=a.slice(x.prefix.length);if(!w)continue;const D=T(w);if(!(D in r))throw new Error(`Property \'${D}\' not found in model \'${i}\'`);return(j,_=null)=>{const R={opts:{where:{[D]:j}}};return _&&(R.opts.row=_),M({modelName:i,action:x.action,payload:R})}}}throw new Error(`Method \'${a}\' not found in model \'${i}\'`)}});return q(f,{getter:!1}),f.rows={},A.set(t,f),f}}),s=Y(l,y),o=U(m,y),l.proxifyRow=m,l.proxifyMultipleRows=g,l.ModelType=ModelType,l}export default{createModel,ModelType};\n',mimeType:"text/javascript"},"/$app/model-indexeddb/adapter.js":{content:'import{DatabaseAdapterBase as w}from"/$app/model/adapter-base.js";import{SystemModelManager as y}from"./system-model-manager.js";export class IndexedDBAdapter extends w{constructor(e){super(e),this.db=null,this.isConnected=!1,this.connectionPromise=null,this.buildQueryResult=e.buildQueryResult||((t,r)=>({items:t,total:t.length})),this.matchesWhere=e.matchesWhere||(()=>!0),this.validateQueryOptions=e.validateQueryOptions||(()=>{}),this.loadRelationships=e.loadRelationships||((t,r,s,n)=>n),this.loadRelationshipsForMany=e.loadRelationshipsForMany||((t,r,s,n)=>n),this.generateId=e.generateId||(t=>{const r=`${Date.now()}${Math.random().toString(10).substr(2,2)}`;return t?r:Number(r)}),this.mergeRowUpdates=e.mergeRowUpdates||((t,r)=>({...t,...r})),this.prepareRow=e.prepareRow||((t,r,s)=>({...s})),this.validateRow=e.validateRow||(()=>({valid:!0,errors:{}})),this.eventEmitter=e.eventEmitter||null,this.subscriptionManager=e.subscriptionManager||null,this.systemModelManager=e.enableSystemModels?new y(this,e.systemModelManagerOptions||{}):null}async init(){return this.connectionPromise?this.connectionPromise:(this.connectionPromise=new Promise((e,t)=>{const r=indexedDB.open(this.name,Number(this.version));r.onerror=s=>{this.connectionPromise=null,console.error("IndexedDB: Failed to open database",s.target.error),t(new Error(`Failed to open database: ${s.target.error}`))},r.onsuccess=s=>{this.db=s.target.result,this.isConnected=!0,this.db.onversionchange=()=>{console.warn("IndexedDB: Database version changed, closing connection"),this.close()},console.log(`IndexedDB: Connected to database "${this.name}" v${this.version}`),this.onConnected&&typeof this.onConnected=="function"&&this.onConnected(),e(this.db)},r.onupgradeneeded=s=>{const n=s.target.result,i=s.target.transaction;console.info(`IndexedDB: Upgrading database to version ${this.version}`);for(const[o,a]of Object.entries(this.models))n.objectStoreNames.contains(o)?this._updateObjectStore(i.objectStore(o),a):this._createObjectStore(n,o,a)}}),this.connectionPromise)}_createObjectStore(e,t,r){const s=r.id,n=!s||s.type==="number",i=e.createObjectStore(t,{keyPath:"id",autoIncrement:n});for(const[o,a]of Object.entries(r))(a.index===!0||a.unique===!0)&&i.createIndex(o,o,{unique:a.unique??!1,multiEntry:a.type==="array"});console.log(`IndexedDB: Created object store "${t}" with ${Object.keys(r).length} fields`)}_updateObjectStore(e,t){for(const[r,s]of Object.entries(t))(s.index===!0||s.unique===!0)&&!e.indexNames.contains(r)&&(e.createIndex(r,r,{unique:s.unique??!1,multiEntry:s.type==="array"}),console.log(`IndexedDB: Added index for field "${r}"`))}async _executeTransaction(e,t,r){return await this.init(),new Promise((s,n)=>{const i=Array.isArray(e)?e:[e],o=this.db.transaction(i,t),a=r(o);o.oncomplete=()=>s(a),o.onerror=()=>n(o.error),o.onabort=()=>n(new Error("Transaction aborted"))})}_emit(e,t){this.eventEmitter&&typeof this.eventEmitter=="function"&&this.eventEmitter(e,t)}_notifyQuerySubscribers(e,t,r){if(!this.subscriptionManager)return;const s=this.subscriptionManager,n=s.modelToQueries?.get(e);if(n)for(const i of n){const o=s.subscriptions?.get(i);if(!o)continue;(t==="delete"||!o.where||Object.keys(o.where).length===0||this.matchesWhere(r,o.where))&&o.callbacks.forEach(d=>{try{d({action:t,record:r,model:e})}catch(u){console.error("IndexedDB: Error in query subscription callback:",u)}})}}async get(e,t,r={}){try{if(typeof t!="object"||t===null){const n=t;let i=await this._executeTransaction(e,"readonly",o=>new Promise((a,d)=>{const h=o.objectStore(e).get(n);h.onsuccess=()=>{const l=h.result;if(l){const c=this.prepareRow(this.models,e,l,{reverse:!0,currentRow:l});a(c)}else a(null)},h.onerror=()=>d(h.error)}));return i&&r.includes&&(i=await this.loadRelationships(this,this.models,e,i,r.includes,r.recursive||!1)),i}else{const n=t,i=await this.getAll(e,{where:n,limit:1,includes:r.includes});return i.length>0?i[0]:null}}catch(s){throw console.error(`IndexedDB: Error getting record from "${e}"`,s),s}}async getAll(e,t={}){this.validateQueryOptions(t);try{const r=await this._executeTransaction(e,"readonly",i=>new Promise((o,a)=>{const u=i.objectStore(e).getAll();u.onsuccess=()=>{const l=(u.result||[]).map(c=>this.prepareRow(this.models,e,c,{reverse:!0,currentRow:c}));o(l)},u.onerror=()=>a(u.error)})),s=this.buildQueryResult(r,t);let n=s.items;return t.includes&&n.length>0&&(n=await this.loadRelationshipsForMany(this,this.models,e,n,t.includes,t.recursive||!1)),t.limit!==void 0?(s.items=n,s):n}catch(r){throw console.error(`IndexedDB: Error getting records from "${e}"`,r),r}}async add(e,t){t=await this.runBeforeAdd(e,t);const r=this.models[e]?.id,s=r&&r.type==="string"||!r;t.id||(t.id=this.generateId(s));const n=this.validateRow(this.models,e,t,{operation:"add"});if(!n.valid)throw new Error(`Validation failed: ${JSON.stringify(n.errors)}`);try{const i=this.prepareRow(this.models,e,t),o=await this._executeTransaction(e,"readwrite",d=>new Promise((u,h)=>{try{const c=d.objectStore(e).add(i);c.onsuccess=()=>{this.system||(this._emit(`ModelAddRecord-${e}`,{model:e,row:i}),this._emit("onAddRecord",{model:e,row:i}),this._notifyQuerySubscribers(e,"add",i)),u(c.result)},c.onerror=()=>h(c.error)}catch(l){h(l)}})),a=await this.get(e,o);return this.runAfterAdd(e,a)}catch(i){throw console.error(`IndexedDB: Error adding record to "${e}"`,i),i}}async edit(e,t,r){r=this.stripImmutableFields(e,r),r=await this.runBeforeEdit(e,{...r,id:t});const s=this.validateRow(this.models,e,r,{operation:"edit"});if(!s.valid)throw new Error(`Validation failed: ${JSON.stringify(s.errors)}`);try{const n=await this.get(e,t);if(!n)throw new Error(`Record with id ${t} not found in model "${e}"`);const i=this.mergeRowUpdates(n,r);i.id=t;const o=this.prepareRow(this.models,e,i,{currentRow:n});await this._executeTransaction(e,"readwrite",d=>new Promise((u,h)=>{const c=d.objectStore(e).put(o);c.onsuccess=()=>{this.system||(this._emit(`ModelEditRecord-${e}`,{model:e,row:o}),this._emit("onEditRecord",{model:e,row:o}),this._notifyQuerySubscribers(e,"update",o)),u(c.result)},c.onerror=()=>h(c.error)}));const a=await this.get(e,t);return this.runAfterEdit(e,a)}catch(n){throw console.error(`IndexedDB: Error updating record in "${e}"`,n),n}}async remove(e,t){try{const r=await this.get(e,t);return await this.runBeforeRemove(e,t,r)?(await this._executeTransaction(e,"readwrite",n=>new Promise((i,o)=>{const d=n.objectStore(e).delete(t);d.onsuccess=()=>{this.system||(this._emit(`ModelRemoveRecord-${e}`,{model:e,id:t}),this._emit("onRemoveRecord",{model:e,id:t}),this._notifyQuerySubscribers(e,"delete",r||{id:t})),i(!0)},d.onerror=()=>o(d.error)})),await this.runAfterRemove(e,t,r),console.log(`IndexedDB: Deleted record ${t} from "${e}"`),!0):!1}catch(r){throw console.error(`IndexedDB: Error deleting record from "${e}"`,r),r}}async count(e,t={}){return(await this.getAll(e,{where:t.where})).length}async transaction(e){return await this.init(),e(this)}async close(){this.db&&(this.db.close(),this.db=null,this.isConnected=!1,this.connectionPromise=null,console.log("IndexedDB: Connection closed"))}async exportData(){const e={};for(const t of Object.keys(this.models))e[t]=await this.getAll(t,{object:!0});return e}async importData(e,t={}){for(const[r,s]of Object.entries(e))this.models[r]&&await this.addMany(r,s,{keepIndex:t.keepIndex})}getSystemModelManager(){return this.systemModelManager}getMetadata(){return{...super.getMetadata(),type:"indexeddb",isConnected:this.isConnected,dbName:this.name}}}export default IndexedDBAdapter;\n',mimeType:"text/javascript"},"/$app/model/adapter-base.js":{content:'export class DatabaseAdapterBase{constructor({name:e,version:t,models:r,system:o,onConnected:s}){this.name=e,this.version=t,this.models=r,this.system=o,this.onConnected=s}async init(){throw new Error("init() must be implemented by adapter")}async get(e,t,r={}){throw new Error("get() must be implemented by adapter")}async getAll(e,t={}){throw new Error("getAll() must be implemented by adapter")}async add(e,t){throw new Error("add() must be implemented by adapter")}async addMany(e,t){const r=[];for(const o of t)r.push(await this.add(e,o));return r}async edit(e,t,r){throw new Error("edit() must be implemented by adapter")}async remove(e,t){throw new Error("remove() must be implemented by adapter")}async count(e,t={}){throw new Error("count() must be implemented by adapter")}async transaction(e){throw new Error("transaction() must be implemented by adapter")}async close(){throw new Error("close() must be implemented by adapter")}async exportData(){return{}}async importData(e,t={}){}getSystemModelManager(){return null}getMetadata(){return{name:this.constructor.name,type:"unknown",version:this.version,models:Object.keys(this.models||{}),system:this.system}}async runBeforeAdd(e,t){const r=this.models?.[e];return r?.$hooks?.beforeAdd?await r.$hooks.beforeAdd(t,{model:e,adapter:this,operation:"add"}):t}async runAfterAdd(e,t){const r=this.models?.[e];return r?.$hooks?.afterAdd&&await r.$hooks.afterAdd(t,{model:e,adapter:this,operation:"add"}),t}async runBeforeEdit(e,t){const r=this.models?.[e];return r?.$hooks?.beforeEdit?await r.$hooks.beforeEdit(t,{model:e,adapter:this,operation:"edit"}):t}async runAfterEdit(e,t){const r=this.models?.[e];return r?.$hooks?.afterEdit&&await r.$hooks.afterEdit(t,{model:e,adapter:this,operation:"edit"}),t}async runBeforeRemove(e,t,r){const o=this.models?.[e];return!(o?.$hooks?.beforeRemove&&await o.$hooks.beforeRemove(r,{model:e,adapter:this,operation:"remove",id:t})===!1)}async runAfterRemove(e,t,r){const o=this.models?.[e];o?.$hooks?.afterRemove&&await o.$hooks.afterRemove(r,{model:e,adapter:this,operation:"remove",id:t})}stripImmutableFields(e,t){const r=this.models?.[e];if(!r)return t;const o={...t};for(const[s,a]of Object.entries(r))s.startsWith("$")||a?.immutable&&s in o&&s!=="id"&&delete o[s];return o}}export function validateAdapter(n){const t=["init","get","getAll","add","edit","remove","count","transaction","close"].filter(r=>typeof n[r]!="function");if(t.length>0)throw new Error(`Adapter ${n.constructor.name} is missing required methods: ${t.join(", ")}`);return!0}export default DatabaseAdapterBase;\n',mimeType:"text/javascript"},"/$app/model-indexeddb/system-model-manager.js":{content:`export class SystemModelManager{constructor(e,t={}){this.db=e,this.MODELS={APP:"App",USER:"User",DEVICE:"Device"},this.eventEmitter=t.eventEmitter||(()=>{}),this.getBackendUser=t.getBackendUser||(()=>null),this.setBackendUser=t.setBackendUser||(()=>{}),this.importData=t.importData||(()=>{})}async generateKeyPair(){const e=await self.crypto.subtle.generateKey({name:"RSA-OAEP",modulusLength:2048,publicExponent:new Uint8Array([1,0,1]),hash:"SHA-256"},!0,["encrypt","decrypt"]),t=await self.crypto.subtle.exportKey("spki",e.publicKey),i=await self.crypto.subtle.exportKey("pkcs8",e.privateKey);return{publicKey:btoa(String.fromCharCode(...new Uint8Array(t))),privateKey:btoa(String.fromCharCode(...new Uint8Array(i)))}}async getApp(){const{items:e}=await this.db.getAll(this.MODELS.APP,{where:{active:!0},limit:1});return e.length>0?e[0]:null}async getUser(e){const t=this.getBackendUser();if(t)return t;const i=e||await this.getApp(),a=this.getBackendUser();if(a&&a.appId!==i.id&&this.setBackendUser(null),!this.getBackendUser()){let s=await this.db.get(this.MODELS.USER,{appId:i.id,active:!0});s||(s=await this.createUserEntry({app:i}));const{privateKey:n,active:r,...d}=s;this.setBackendUser(d)}return this.getBackendUser()}async getDevice({app:e,user:t}={}){const i=e||await this.getApp(),a=t||await this.getUser(i);if(!a)throw new Error("User not found");return await this.db.get(this.MODELS.DEVICE,{userId:a.id,active:!0})||null}async createAppEntry({timestamp:e=Date.now(),id:t=e.toString(),version:i=1}={}){const a={id:t,version:i,active:!0};return await this.db.add(this.MODELS.APP,a),await this.eventEmitter("APP:CREATED",{app:a}),a}async createUserEntry({app:e,device:t,user:i}={}){const a=e||await this.getApp();if(!i){const p=await this.db.getAll(this.MODELS.USER,{where:{active:!0,appId:a.id},limit:1}),c=p.length>0?p[0]:null;if(c){c.privateKey=null;const h=await this.db.getAll(this.MODELS.DEVICE,{where:{userId:c.id,active:!0},limit:1});return(h.length>0?h[0]:null)||await this.db.add(this.MODELS.DEVICE,t),c}}const{publicKey:s,privateKey:n}=await this.generateKeyPair(),r=i||{id:i?.id,name:i?.name||"Local User",publicKey:s,privateKey:n,appId:a.id,active:!0};await this.db.add(this.MODELS.USER,r);const d=t||{userId:r.id,appId:a.id,active:!0};return await this.db.add(this.MODELS.DEVICE,d),r.privateKey=null,r}async listApps(){return await this.db.getAll(this.MODELS.APP)}async selectApp(e){const t=await this.getApp();return t&&t.id!==e&&await this.db.edit(this.MODELS.APP,t.id,{active:!1}),await this.db.edit(this.MODELS.APP,e,{active:!0}),await this.db.get(this.MODELS.APP,e)}async migrateData(e,t){const i=Object.entries(e||{});if(i.length){const a={};for(const[s,n]of i)a[s]=n;console.error({dump:a,app:t}),this.importData({dump:a,app:t}),await this.db.edit(this.MODELS.APP,t.id,{migrationTimestamp:Date.now()})}}}export default SystemModelManager;
`,mimeType:"text/javascript"},"/views/templates/app.js":{content:`import l from"/$app/router/index.js";import i from"/$app/types/index.js";import o from"/$app.js";import{html as r}from"/npm/lit-html";const{brand:a,navTabs:s}=o.settings;export default{class:"min-h-screen w-full bg-sky-50 flex flex-col font-sans",properties:{currentRoute:i.object({sync:l}),currentLang:i.string("en"),modalItem:i.object(null),modalOpen:i.boolean(!1),userId:i.string(),user:i.object({attribute:!1}),menuDrawerOpen:i.boolean(!1),notificationsDrawerOpen:i.boolean(!1),notifications:i.array({defaultValue:[]})},async connected(){this.userId=o.Auth.isAuthenticated?o.Auth.currentUserId:null,this.user=o.Auth.user,this.userId&&await this.loadNotifications(),o.Auth.on("change",()=>{this.userId=o.Auth.isAuthenticated?o.Auth.currentUserId:null,this.user=o.Auth.user,this.userId?this.loadNotifications():this.notifications=[]})},async loadNotifications(){try{const e=await o.Model.notifications.getAll({where:{recipient:this.userId},order:"-createdAt"});this.notifications=e||[]}catch(e){console.error("Failed to load notifications:",e),this.notifications=[]}},getUnreadCount(){return(this.notifications||[]).filter(e=>!e.read).length},getActiveTabFromRoute(){const e=this.currentRoute?.name;return s.map(t=>t.id).filter(t=>t!=="discover").includes(e)?e:"discover"},openMenuDrawer(){this.menuDrawerOpen=!0},closeMenuDrawer(){this.menuDrawerOpen=!1},openNotificationsDrawer(){this.notificationsDrawerOpen=!0},closeNotificationsDrawer(){this.notificationsDrawerOpen=!1},render(){const e=this.getActiveTabFromRoute(),n=this.getUnreadCount();return r\`
      <!-- Mobile Header -->
      <view-mobile-header
        .unreadCount=\${n}
        .onMenuClick=\${()=>this.openMenuDrawer()}
        .onNotificationClick=\${()=>this.openNotificationsDrawer()}
      ></view-mobile-header>

      <!-- Desktop Top Nav -->
      <nav class="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b-3 border-black">
        <view-logo></view-logo>
        <div class="flex items-center gap-6">
          \${s.map(t=>r\`
              <uix-link
                href=\${t.route}
                class="font-bold uppercase text-sm transition-colors \${e===t.id?a.accentClass:\`text-black hover:\${a.accentClass}\`}"
              >
                \${t.label}
              </uix-link>
            \`)}
          <!-- Notifications Bell for Desktop -->
          <button
            @click=\${()=>this.openNotificationsDrawer()}
            class="notification-bell w-10 h-10 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <uix-icon name="bell" size="sm"></uix-icon>
            \${n>0?r\`<span class="badge">\${n>9?"9+":n}</span>\`:""}
          </button>
          <uix-link
            href="/profile"
            class="w-10 h-10 rounded-full bg-teal-300 border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
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
        \${s.map(t=>r\`
            <uix-link
              href=\${t.route}
              class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 \${e===t.id?"bg-white/10 ring-2 ring-white text-white":"text-gray-400 hover:text-white"}"
            >
              <uix-icon name=\${t.icon} size="md"></uix-icon>
            </uix-link>
          \`)}
        </div>
      </nav>

      <!-- Menu Drawer (Left) -->
      <view-mobile-menu-drawer
        .open=\${this.menuDrawerOpen}
        .user=\${this.user}
        .onClose=\${()=>this.closeMenuDrawer()}
      ></view-mobile-menu-drawer>

      <!-- Notifications Drawer (Right) -->
      <view-notifications-drawer
        .open=\${this.notificationsDrawerOpen}
        .notifications=\${this.notifications}
        .onClose=\${()=>this.closeNotificationsDrawer()}
      ></view-notifications-drawer>

      <!-- Modal -->
      <view-item-modal .item=\${this.modalItem} .isOpen=\${this.modalOpen} @close=\${()=>{this.modalOpen=!1,this.modalItem=null}}></view-item-modal>
    \`}};
`,mimeType:"text/javascript"},"/views/mobile-header.js":{content:`import e from"/$app/types/index.js";import"/$app.js";import{html as t,nothing as a}from"/npm/lit-html";export default{tag:"view-mobile-header",properties:{unreadCount:e.number({defaultValue:0}),onMenuClick:e.function({attribute:!1}),onNotificationClick:e.function({attribute:!1})},render(){return t\`
      <header class="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b-3 border-black">
        <!-- Hamburger Menu Button -->
        <button
          @click=\${()=>this.onMenuClick?.()}
          class="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          aria-label="Open menu"
        >
          <uix-icon name="menu" size="sm"></uix-icon>
        </button>

        <!-- Logo -->
        <view-logo></view-logo>

        <!-- Notification Bell -->
        <button
          @click=\${()=>this.onNotificationClick?.()}
          class="notification-bell w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          aria-label="View notifications"
        >
          <uix-icon name="bell" size="sm"></uix-icon>
          \${this.unreadCount>0?t\`<span class="badge">\${this.unreadCount>9?"9+":this.unreadCount}</span>\`:a}
        </button>
      </header>
    \`}};
`,mimeType:"text/javascript"},"/views/logo.js":{content:'import{html as n}from"/npm/lit-html";export default{render(){return n`<uix-link href="/" class="text-2xl font-black uppercase tracking-tight">\n          <uix-icon name="tree-palm" size="lg"></uix-icon>\n          ${$APP.settings.brand.name}<span class="${$APP.settings.brand.accentClass} -ml-1">${$APP.settings.brand.accent}</span>\n        </uix-link>`}};\n',mimeType:"text/javascript"},"/node_modules/@bootstrapp/uix/display/link.js":{content:`import r from"/$app/router/index.js";import t from"/$app/types/index.js";import{html as n}from"/npm/lit-html";export default{tag:"uix-link",style:!0,shadow:!0,properties:{content:t.object(),external:t.boolean(),skipRoute:t.boolean(),hideLabel:t.boolean(),disabled:t.boolean(),name:t.string(),alt:t.string(),label:t.string(),type:t.string(),href:t.string(),related:t.string(),icon:t.string(),click:t.function(),confirmation:t.string(),popovertarget:t.string(),popovertargetaction:t.string()},_handlePopoverTarget(e){if(!this.popovertarget)return!1;const i=document.getElementById(this.popovertarget);if(!i||typeof i.toggle!="function")return!1;e.preventDefault(),e.stopPropagation();const a=this.shadowRoot.querySelector("button, a"),o=this.popovertargetaction||"toggle";return o==="toggle"?i.toggle(a):o==="show"?i._open(a):o==="hide"&&i._close(),!0},_defaultOnClick(e){if(this.disabled){e.preventDefault(),e.stopImmediatePropagation();return}this._handlePopoverTarget(e)||this.href&&!this.skipRoute&&r.handleLinkClick(e,{external:this.external})||(this.href||e.preventDefault(),this.click&&this.type!=="submit"&&(this.confirmation?window.confirm(this.confirmation)&&this.click(e):this.click(e),e.stopImmediatePropagation()))},render(){const e=n\`
      \${this.icon?n\`<uix-icon name=\${this.icon} part="icon"></uix-icon>\`:null}
      <slot></slot>
      \${this.hideLabel?null:this.label}
    \`;return!this.href&&this.popovertarget?n\`
        <button
          part="anchor"
          @click=\${this._defaultOnClick}
          name=\${this.name||this.label||this.alt}
          aria-disabled=\${this.disabled?"true":"false"}
          ?disabled=\${this.disabled}
          type="button"
        >
          \${e}
        </button>
      \`:n\`
      <a
        part="anchor"
        href=\${this.disabled?void 0:this.href||"#"}
        @click=\${this._defaultOnClick}
        related=\${this.related}
        name=\${this.name||this.label||this.alt}
        alt=\${this.alt||this.label||this.name}
        aria-disabled=\${this.disabled?"true":"false"}
        ?disabled=\${this.disabled}
      >
        \${e}
      </a>
    \`}};
`,mimeType:"text/javascript"},"/node_modules/@bootstrapp/uix/display/icon.js":{content:'import s from"/$app/types/index.js";import{settings as i}from"/$app/view/index.js";import{unsafeHTML as n}from"/npm/lit-html/directives/unsafe-html.js";const o=new Map;export default{tag:"uix-icon",style:!0,static:{Icons:o},properties:{name:s.string(),svg:s.string(),solid:s.boolean(),size:s.string(),color:s.string({enum:["primary","secondary","success","danger","warning","info","inverse"]})},async getIcon(t){if(o.has(t))this.svg=o.get(t);else try{const e=await fetch(`${i.iconFontFamily}/${t}.svg`);if(e.ok){const r=await e.text();o.set(t,r),this.svg=r}else console.error(`Failed to fetch icon: ${t}`)}catch(e){console.error(`Error fetching icon: ${t}`,e)}},willUpdate({changedProps:t}){t.has("name")&&this.getIcon(this.name)},connected(){this.getIcon(this.name)},render(){return this.svg?n(this.svg):null}};\n',mimeType:"text/javascript"},"/views/discover-view.js":{content:`import a from"/$app/types/index.js";import t from"/$app.js";import{html as s}from"/npm/lit-html";import{NBS as n}from"./utils.js";export default{style:!0,properties:{userId:a.string({defaultValue:"guest"}),places:a.array({sync:t.Model.places,query:{}}),events:a.array({sync:t.Model.events,query:{}}),groups:a.array({sync:t.Model.groups,query:{}}),guides:a.array({sync:t.Model.guides,query:{}}),searchQuery:a.string({defaultValue:""})},async connected(){this.userId=t.Auth.isAuthenticated?t.Auth.currentUserId:"guest"},isLoading(){return!this.places||!this.events||!this.groups},getNextEvents(){return(this.events||[]).sort((l,r)=>new Date(l.date).getTime()-new Date(r.date).getTime())},getFeaturedGuides(){return(this.guides||[]).filter(l=>l.featured).slice(0,2)},getRecommendedItems(){const l=(this.places||[]).filter(d=>d.recommended||d.viewCount>=100),r=(this.events||[]).filter(d=>d.recommended||d.viewCount>=100);return[...l,...r].slice(0,4)},render(){if(this.isLoading())return n.SPINNER;const l=this.events??[],r=this.places??[],d=this.getFeaturedGuides(),c=this.getRecommendedItems();return s\`
      <div class="space-y-6 pb-8">
        <!-- Header with branding and search -->
        <header class="px-2 pt-2">
          <view-global-search></view-global-search>
        </header>

        <!-- Today in Rio (Events) -->
        <div class="md:px-6 overflow-hidden mx-1 max-w-screen">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-black uppercase text-black">Today in Rio</h2>
            <button @click=\${()=>t.Router.go("events")} class="text-xs font-bold text-teal-600 uppercase hover:underline">View all</button>
          </div>
          <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            \${l.length===0?s\`<div class="text-sm font-bold text-gray-500 italic">No upcoming events found.</div>\`:l.map(e=>s\`
                <view-story-circle .content=\${e} .onClick=\${i=>t.Router.go("event-detail",{slug:i.slug})} class="last:mr-1"></view-story-circle>
              \`)}
          </div>
        </div>

        <!-- Recommended Section -->
        \${c.length>0?s\`
          <div class="px-6 overflow-hidden">
            <div class="flex items-center gap-1 mb-4 px-3 py-1 bg-yellow-300 border-2 border-black rounded-lg font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <uix-icon name="star"></uix-icon>
                 \${t.i18n?.t?.("badges.recommended")||"Recommended"}
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4">
              \${c.map(e=>{const i=e.date!==void 0,o=i?"event":"place";return s\`
                  <uix-card
                    shadow="md"
                    hover
                    borderWidth="3"
                    padding="none"
                    class="cursor-pointer"
                    @click=\${()=>t.Router.go(\`\${o}-detail\`,{slug:e.slug})}
                  >
                    <div class="relative h-28 bg-gray-200">
                      <img src="\${e.image}" alt="\${e.name}" class="w-full h-full object-cover" />
                      <div class="absolute top-2 right-2">
                        <span class="px-2 py-0.5 bg-yellow-300 border-2 border-black rounded text-[10px] font-black">\u2B50</span>
                      </div>
                    </div>
                    <div class="p-2">
                      <div class="text-xs font-black leading-tight line-clamp-2 uppercase">\${e.name}</div>
                      \${i&&e.date?s\`
                        <div class="text-[10px] font-bold text-gray-500 mt-1">\u{1F4C5} \${new Date(e.date).toLocaleDateString()}</div>
                      \`:null}
                    </div>
                  </uix-card>
                \`})}
            </div>
          </div>
        \`:null}

        <!-- Featured Guides -->
        \${d.length>0?s\`
          <div class="px-6 overflow-hidden">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-black uppercase text-black">Guides</h2>
              <button @click=\${()=>t.Router.go("guides")} class="text-xs font-bold text-teal-600 uppercase hover:underline">View all</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
              \${d.map(e=>s\`
                  <view-guide-card
                    .guide=\${e}
                    .featured=\${!0}
                    .onClick=\${i=>t.Router.go("guide-detail",{slug:i.slug})}
                  ></view-guide-card>
                \`)}
            </div>
          </div>
        \`:null}

        <!-- TODO: MEETUPS HIDDEN - Restore when feature returns
        <div class="px-6 overflow-hidden">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-black uppercase text-black">My Meetups</h2>
            <button class="text-xs font-bold text-teal-600 uppercase hover:underline">View more</button>
          </div>
          ...meetups section...
        </div>
        -->

        <!-- Near You (Places) -->
        <div class="px-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-black uppercase text-black">Near You</h2>
            <button class="text-xs font-bold text-teal-600 uppercase hover:underline">Filter</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-2 md:p-4 lg:p-8">
            \${r.map(e=>s\`
                <view-meetup-card-compact .content=\${e} type="place" .onClick=\${i=>t.Router.go("place-detail",{slug:i.slug})}></view-meetup-card-compact>
              \`)}
          </div>
        </div>
      </div>
    \`}};
`,mimeType:"text/javascript"},"/views/mobile-menu-drawer.js":{content:`import a from"/$app/types/index.js";import s from"/$app.js";import{html as e}from"/npm/lit-html";const r=[{id:"profile",label:"Profile",icon:"user",route:"/profile"},{id:"saved",label:"Saved",icon:"bookmark",route:"/saved"},{id:"settings",label:"Settings",icon:"settings",route:"/settings"},{id:"about",label:"About",icon:"info",route:"/about"}];export default{tag:"view-mobile-menu-drawer",properties:{open:a.boolean(!1),user:a.object({attribute:!1}),onClose:a.function({attribute:!1})},navigate(t){s.Router.go(t),this.onClose?.()},async handleLogout(){await s.Auth.logout(),this.onClose?.(),s.Router.go("/")},handleLogin(){s.Router.go("/profile"),this.onClose?.()},render(){const t=!this.user||this.user.isGuest,i=t?"Guest":this.user?.name||"User",n=this.user?.avatar;return e\`
      <uix-drawer
        position="left"
        ?open=\${this.open}
        @drawer-closed=\${()=>this.onClose?.()}
        size="md"
      >
        <div class="flex flex-col h-full">
          <!-- User Section -->
          <div class="p-4 border-b-3 border-black bg-white">
            <div class="flex items-center gap-3">
              <uix-avatar
                src=\${n||""}
                name=\${i}
                size="lg"
                class="border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              ></uix-avatar>
              <div class="flex-1 min-w-0">
                <h3 class="font-black text-lg truncate">\${i}</h3>
                \${t?e\`<span class="text-sm text-gray-500 font-medium">Not signed in</span>\`:e\`<span class="text-sm text-gray-500 font-medium">\${this.user?.email||""}</span>\`}
              </div>
              <!-- Close Button -->
              <button
                @click=\${()=>this.onClose?.()}
                class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <uix-icon name="x" size="sm"></uix-icon>
              </button>
            </div>
          </div>

          <!-- Menu Items -->
          <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
            \${r.map(o=>e\`
                <button
                  @click=\${()=>this.navigate(o.route)}
                  class="nbs-menu-item w-full text-left"
                >
                  <uix-icon name=\${o.icon} size="sm"></uix-icon>
                  <span>\${o.label}</span>
                </button>
              \`)}
          </nav>

          <!-- Footer Actions -->
          <div class="p-4 border-t-3 border-black bg-white">
            \${t?e\`
                  <button
                    @click=\${()=>this.handleLogin()}
                    class="w-full py-3 bg-black text-white border-3 border-black rounded-xl font-black uppercase text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
                  >
                    Login / Register
                  </button>
                \`:e\`
                  <button
                    @click=\${()=>this.handleLogout()}
                    class="nbs-menu-item danger w-full justify-center"
                  >
                    <uix-icon name="log-out" size="sm"></uix-icon>
                    <span>Logout</span>
                  </button>
                \`}
          </div>
        </div>
      </uix-drawer>
    \`}};
`,mimeType:"text/javascript"},"/views/notifications-drawer.js":{content:`import o from"/$app/types/index.js";import a from"/$app.js";import{html as i,nothing as s}from"/npm/lit-html";export default{tag:"view-notifications-drawer",properties:{open:o.boolean(!1),notifications:o.array({defaultValue:[]}),onClose:o.function({attribute:!1})},async markAsRead(t){t.read||(await a.Model.notifications.edit({id:t.id,read:!0,readAt:new Date().toISOString()}),this.notifications=this.notifications.map(e=>e.id===t.id?{...e,read:!0}:e))},handleNotificationClick(t){this.markAsRead(t),this.onClose?.(),t.contentType&&t.contentSlug&&a.Router.go(\`\${t.contentType}-detail\`,{slug:t.contentSlug})},viewAll(){this.onClose?.(),a.Router.go("/notifications")},getUnreadCount(){return this.notifications.filter(t=>!t.read).length},render(){const t=this.getUnreadCount(),e=this.notifications.slice(0,5);return i\`
      <uix-drawer
        position="right"
        ?open=\${this.open}
        @drawer-closed=\${()=>this.onClose?.()}
        size="md"
      >
        <div class="flex flex-col h-full">
          <!-- Header -->
          <div class="p-4 border-b-3 border-black bg-white flex items-center justify-between">
            <div class="flex items-center gap-2">
              <h2 class="font-black text-lg uppercase">Notifications</h2>
              \${t>0?i\`
                    <span class="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                      \${t}
                    </span>
                  \`:s}
            </div>
            <button
              @click=\${()=>this.onClose?.()}
              class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <uix-icon name="x" size="sm"></uix-icon>
            </button>
          </div>

          <!-- Notifications List -->
          <div class="flex-1 overflow-y-auto">
            \${e.length>0?e.map(n=>i\`
                    <view-notification-item
                      .notification=\${n}
                      .onClick=\${r=>this.handleNotificationClick(r)}
                    ></view-notification-item>
                  \`):i\`
                  <div class="p-8 text-center">
                    <div class="text-4xl mb-3">\u{1F515}</div>
                    <p class="text-gray-500 font-medium">No notifications yet</p>
                  </div>
                \`}
          </div>

          <!-- Footer -->
          \${this.notifications.length>0?i\`
                <div class="p-4 border-t-3 border-black bg-white">
                  <button
                    @click=\${()=>this.viewAll()}
                    class="w-full py-3 bg-white border-3 border-black rounded-xl font-black uppercase text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
                  >
                    View All Notifications
                  </button>
                </div>
              \`:s}
        </div>
      </uix-drawer>
    \`}};
`,mimeType:"text/javascript"},"/views/item-modal.js":{content:`import e from"/$app/types/index.js";import{html as t}from"/npm/lit-html";import o from"/$app.js";export default{style:!0,properties:{item:e.object({attribute:!1}),isOpen:e.boolean({defaultValue:!1})},handleClose(){this.isOpen=!1,this.item=null,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))},render(){return this.item?t\`
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
            \u2715 \${o.i18n.t("actions.close")}
          </button>
        </div>
      </uix-modal>
    \`:null}};
`,mimeType:"text/javascript"},"/views/utils.js":{content:'import{html as e}from"/npm/lit-html";export const CATEGORIES={all:{id:"all",color:"gray-200",icon:"\\u{1F4CD}"},beaches:{id:"beaches",color:"blue-300",icon:"\\u{1F3D6}\\uFE0F"},hiking:{id:"hiking",color:"green-400",icon:"\\u{1F97E}"},culture:{id:"culture",color:"amber-300",icon:"\\u{1F3DB}\\uFE0F"},parties:{id:"parties",color:"purple-300",icon:"\\u{1F389}"},food:{id:"food",color:"orange-300",icon:"\\u{1F37D}\\uFE0F"},sports:{id:"sports",color:"red-300",icon:"\\u26BD"},dancing:{id:"dancing",color:"teal-300",icon:"\\u{1F483}"},groups:{id:"groups",color:"rose-300",icon:"\\u{1F4AC}"}},PLACE_CATEGORIES=["beaches","hiking","culture","parties","food","sports","dancing"],ATTRIBUTE_TAGS={"pet-friendly":{icon:"\\u{1F415}",color:"emerald-200",label:"Pet Friendly"},"wheelchair-accessible":{icon:"\\u267F",color:"blue-200",label:"Accessible"},"free-entry":{icon:"\\u{1F193}",color:"green-200",label:"Free Entry"},"family-friendly":{icon:"\\u{1F468}\\u200D\\u{1F469}\\u200D\\u{1F467}",color:"yellow-200",label:"Family Friendly"},"must-see":{icon:"\\u2B50",color:"amber-200",label:"Must See"}},VIBE_TAGS={chill:{icon:"\\u{1F60E}",color:"sky-200",label:"Chill"},romantic:{icon:"\\u{1F495}",color:"teal-200",label:"Romantic"},adventure:{icon:"\\u{1F3D4}\\uFE0F",color:"orange-200",label:"Adventure"},party:{icon:"\\u{1F389}",color:"purple-200",label:"Party"},"local-favorite":{icon:"\\u{1F1E7}\\u{1F1F7}",color:"lime-200",label:"Local Favorite"}},ALL_TAGS={...ATTRIBUTE_TAGS,...VIBE_TAGS},getTagInfo=o=>ALL_TAGS[o]||{icon:"\\u{1F3F7}\\uFE0F",color:"gray-200",label:o},NBS={S:"border-3 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all",M:"border-3 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all",L:"border-3 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",ACTIVE_SM:"active:shadow-none active:translate-x-[2px] active:translate-y-[2px]",ACTIVE_LG:"active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",SPINNER:e`<div class="flex items-center justify-center min-h-screen"><uix-spinner></uix-spinner></div>`},getCategoryColor=o=>CATEGORIES[o]?.color?`bg-${CATEGORIES[o].color}`:"bg-gray-200",getUser=()=>$APP.Auth?.user||null,isGuest=()=>$APP.Auth?.isGuest??!0,styleTag=o=>e`<style>${o}</style>`;\n',mimeType:"text/javascript"},"/node_modules/@bootstrapp/uix/overlay/drawer.js":{content:`import e from"/$app/types/index.js";import{html as r}from"/npm/lit-html";export default{tag:"uix-drawer",style:!0,shadow:!0,properties:{open:e.boolean(!1),position:e.string({defaultValue:"right",enum:["left","right","top","bottom"]}),width:e.string({defaultValue:"280px"}),height:e.string({defaultValue:"50vh"}),backdrop:e.boolean(!0),persistent:e.boolean(!1)},_handleBackdropClick(t){t.target===t.currentTarget&&!this.persistent&&this.closeDrawer()},_handleEscapeKey(t){t.key==="Escape"&&this.open&&!this.persistent&&this.closeDrawer()},connected(){this._boundHandleEscape=this._handleEscapeKey.bind(this),document.addEventListener("keydown",this._boundHandleEscape)},disconnected(){this._boundHandleEscape&&document.removeEventListener("keydown",this._boundHandleEscape)},openDrawer(){this.open=!0,this.emit("drawer-opened")},closeDrawer(){this.open=!1,this.emit("drawer-closed")},toggleDrawer(){this.open?this.closeDrawer():this.openDrawer()},render(){return r\`
    <style>
      
      .panel {
          transition:
            transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            opacity 0.3s ease;
          will-change: transform;          
      }
    </style>
      <!-- Backdrop -->
      \${this.backdrop&&this.open?r\`<div
            part="backdrop"
            class="backdrop"
            @click=\${this._handleBackdropClick.bind(this)}
          ></div>\`:""}

      <!-- Drawer Panel -->
      <div part="panel" class="drawer-panel">
        <slot></slot>
      </div>
    \`}};
`,mimeType:"text/javascript"},"/node_modules/@bootstrapp/uix/display/avatar.js":{content:'import i from"/$app/types/index.js";import{html as e}from"/npm/lit-html";export default{tag:"uix-avatar",properties:{src:i.string(),name:i.string(),size:i.string({defaultValue:"md",enum:["xs","sm","md","lg","xl"]}),shape:i.string({defaultValue:"circle",enum:["circle","square","rounded"]}),status:i.string({enum:["online","offline","busy","away"]})},style:!0,getInitials(s){if(!s)return null;const t=s.trim().split(/\\s+/);return t.length===1?t[0].substring(0,2).toUpperCase():(t[0][0]+t[t.length-1][0]).toUpperCase()},render(){const s=this.getInitials(this.name);return e`\n      ${this.src?e`<img src="${this.src}" alt="${this.name||"Avatar"}" />`:s?e`<span class="initials">${s}</span>`:e`<uix-icon name="user"></uix-icon>`}\n      ${this.status?e`<span class="status status--${this.status}"></span>`:""}\n    `}};\n',mimeType:"text/javascript"},"/views/item-modal.css":{content:`app-item-modal .uix-modal::part(dialog){background:transparent;border:none;box-shadow:none;padding:1rem;max-width:42rem;width:100%;max-height:90vh;overflow:auto}app-item-modal .uix-modal::part(dialog)::backdrop{background:var(--modal-overlay, rgba(0,0,0,.6));backdrop-filter:blur(4px)}app-item-modal .uix-modal::part(header),app-item-modal .uix-modal::part(footer){display:none}app-item-modal .uix-modal::part(body){padding:0}
`,mimeType:"text/css"},"/node_modules/@bootstrapp/uix/display/link.css":{content:`:where(.uix-link,uix-link){display:inline-flex;align-items:center;justify-content:var(--link-justify-content, center);width:var(--link-width, auto);flex-direction:var(--link-direction, row);gap:var(--link-gap, var(--spacing-xs, .25rem));box-sizing:border-box;font-family:inherit;font-size:var(--link-font-size, var(--text-sm, .875rem));font-weight:var(--link-font-weight, 600);line-height:var(--link-line-height, 1.5);text-decoration:var(--link-text-decoration, none);color:var(--link-color, var(--text-color, inherit));cursor:pointer;&[vertical]::part(anchor){display:flex;flex-direction:column}&::part(anchor){display:inline-flex;align-items:center;justify-content:var(--link-justify-content, left);width:100%;height:100%;gap:var(--link-gap, var(--spacing-xs, .25rem));flex-direction:var(--link-direction, row);padding:var(--link-padding-y, var(--spacing-sm, .5rem)) var(--link-padding-x, var(--spacing-md, .75rem));font-family:inherit;font-size:inherit;font-weight:inherit;line-height:inherit;text-decoration:var(--link-text-decoration, none);color:inherit;cursor:pointer;transition:var( --link-transition, color .2s ease, opacity .2s ease, transform .1s ease );&:hover{color:var(--link-hover-color, var(--link-color));text-decoration:var( --link-hover-text-decoration, var(--link-text-decoration, none) );opacity:var(--link-hover-opacity, .9)}&:active{color:var(--link-active-color, var(--link-color));transform:var(--link-active-transform, scale(.98))}&:focus-visible{outline:2px solid var(--color-primary-dark, #d79921);outline-offset:2px}&:visited{color:var(--link-visited-color, var(--link-color))}&[disabled],&[aria-disabled=true]{opacity:var(--link-disabled-opacity, .5);cursor:not-allowed;pointer-events:none}}&::part(icon){display:inline-flex;align-items:center;justify-content:center;width:var(--link-icon-size, 1.25rem);height:var(--link-icon-size, 1.25rem);color:var(--link-icon-color, currentColor);flex-shrink:0}&[underline]{--link-text-decoration: underline}&[underline=hover]{--link-text-decoration: none;--link-hover-text-decoration: underline}&[variant=primary]{--link-color: var(--color-primary);--link-hover-color: var(--color-primary-dark);--link-active-color: var(--color-primary-darker)}&[variant=secondary]{--link-color: var(--color-secondary);--link-hover-color: var(--color-secondary-dark);--link-active-color: var(--color-secondary-darker)}&[variant=muted]{--link-color: var(--text-muted);--link-hover-color: var(--text-color)}&[size=xs]{--link-font-size: var(--text-xs, .75rem);--link-padding-y: .2rem;--link-padding-x: .4rem;--link-gap: .125rem;--link-icon-size: .75em}&[size=sm]{--link-font-size: var(--text-sm, .875rem);--link-padding-y: .25rem;--link-padding-x: .5rem;--link-gap: .25rem;--link-icon-size: .875em}&[size=md]{--link-font-size: var(--text-base, 1rem);--link-padding-y: .5rem;--link-padding-x: .75rem;--link-gap: .375rem;--link-icon-size: 1em}&[size=lg]{--link-font-size: var(--text-lg, 1.125rem);--link-padding-y: .75rem;--link-padding-x: 1rem;--link-gap: .5rem;--link-icon-size: 1.125em}&[size=xl]{--link-font-size: var(--text-xl, 1.25rem);--link-padding-y: 1rem;--link-padding-x: 1.25rem;--link-gap: .625rem;--link-icon-size: 1.25em}&[compact]{--link-padding-x: 0;--link-padding-y: 0}&[w-full],&[wfull]{width:100%;display:flex}}
`,mimeType:"text/css"},"/node_modules/@bootstrapp/uix/display/icon.css":{content:`:where(.uix-icon,uix-icon){display:inline-block;vertical-align:middle;--icon-size: calc(var(--spacing, .25rem) * 4);width:var(--icon-size);height:var(--icon-size);svg{height:inherit;width:inherit}&[solid]{stroke:currentColor;fill:currentColor}&[color=primary]{color:var(--color-primary)}&[color=secondary]{color:var(--color-secondary)}&[color=success]{color:var(--color-success)}&[color=danger]{color:var(--color-danger)}&[color=warning]{color:var(--color-warning)}&[color=info]{color:var(--color-info)}&[color=inverse]{color:var(--color-inverse)}&[size=xs]{--icon-size: calc(var(--spacing, .25rem) * 3)}&[size=sm]{--icon-size: calc(var(--spacing, .25rem) * 4)}&[size=md]{--icon-size: calc(var(--spacing, .25rem) * 6)}&[size=lg]{--icon-size: calc(var(--spacing, .25rem) * 8)}&[size=xl]{--icon-size: calc(var(--spacing, .25rem) * 10)}&[size="2xl"]{--icon-size: calc(var(--spacing, .25rem) * 14)}&[size="3xl"]{--icon-size: calc(var(--spacing, .25rem) * 20)}&[size="4xl"]{--icon-size: calc(var(--spacing, .25rem) * 30)}}
`,mimeType:"text/css"},"/views/discover-view.css":{content:`.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}.scrollbar-hide::-webkit-scrollbar{display:none}
`,mimeType:"text/css"},"/node_modules/@bootstrapp/uix/display/avatar.css":{content:`:where(.uix-avatar,uix-avatar){--avatar-size: 2.5rem;--avatar-bg: var(--color-surface-dark, #e5e7eb);--avatar-color: var(--text-muted, #6b7280);--avatar-radius: 50%;--status-size: .75rem;position:relative;display:inline-flex;align-items:center;justify-content:center;width:var(--avatar-size);height:var(--avatar-size);border-radius:var(--avatar-radius);background-color:var(--avatar-ring-color, white);color:var(--avatar-color);border:var(--avatar-border, 2px solid #d1d5db);box-shadow:var(--avatar-shadow, 0 1px 3px 0 rgba(0, 0, 0, .1));padding:var(--avatar-ring, 0px);overflow:hidden;flex-shrink:0;&[size=xs]{--avatar-size: 1.5rem;--status-size: .5rem}&[size=sm]{--avatar-size: 2rem;--status-size: .625rem}&[size=md]{--avatar-size: 2.5rem;--status-size: .75rem}&[size=lg]{--avatar-size: 3.5rem;--status-size: 1rem}&[size=xl]{--avatar-size: 5rem;--status-size: 1.25rem}&[shape=circle]{--avatar-radius: 50%}&[shape=square]{--avatar-radius: 0}&[shape=rounded]{--avatar-radius: var(--radius-md, .375rem)}img{width:100%;height:100%;object-fit:cover;border-radius:100%}.initials{font-size:calc(var(--avatar-size) / 2.5);font-weight:600;line-height:1;text-transform:uppercase;user-select:none}uix-icon{font-size:calc(var(--avatar-size) / 1.8)}.status{position:absolute;bottom:0;right:0;width:var(--status-size);height:var(--status-size);border-radius:50%;border:2px solid var(--color-surface, #fff);box-sizing:border-box}.status--online{background-color:var(--color-success, #22c55e)}.status--offline{background-color:var(--color-muted, #9ca3af)}.status--busy{background-color:var(--color-danger, #ef4444)}.status--away{background-color:var(--color-warning, #f59e0b)}}
`,mimeType:"text/css"},"/node_modules/@bootstrapp/uix/overlay/drawer.css":{content:`:where(.uix-drawer,uix-drawer){position:fixed;inset:0;z-index:var(--drawer-z-index, 1000);pointer-events:none;&[open]{pointer-events:auto;display:flex}&::part(backdrop){display:none;pointer-events:none}&[open]::part(backdrop){display:block;position:absolute;inset:0;background-color:var(--drawer-overlay-background, rgba(0, 0, 0, .6));backdrop-filter:var(--drawer-overlay-blur, blur(2px));z-index:var(--drawer-overlay-z-index, 100);animation:drawer-backdrop-fade-in var(--drawer-animation-duration, .25s) ease-out;cursor:pointer;pointer-events:auto}&::part(panel){position:absolute;background-color:var(--drawer-background, var(--color-surface-light, #ffffff));box-shadow:var(--drawer-shadow, 0 0 30px rgba(0, 0, 0, .4));border:var(--drawer-border-width, 0) solid var(--drawer-border-color, var(--color-surface));z-index:var(--drawer-panel-z-index, 1001);overflow-y:auto;overflow-x:hidden;transition:var( --drawer-transition, transform var(--drawer-animation-duration, .3s) ease-in-out, opacity var(--drawer-animation-duration, .3s) ease-in-out );opacity:0;pointer-events:none}&[open]::part(panel){opacity:1;pointer-events:auto}&::part(header){display:flex;align-items:center;justify-content:space-between;padding:var(--drawer-header-padding, var(--spacing-md, .75rem) var(--spacing-lg, 1rem));border-bottom:var(--drawer-header-border-width, 1px) solid var(--drawer-header-border-color, var(--color-surface));background:var(--drawer-header-background, transparent);font-size:var(--drawer-header-font-size, var(--text-lg, 1.125rem));font-weight:var(--drawer-header-font-weight, var(--font-semibold, 600));color:var(--drawer-header-color, var(--text-color))}&::part(body){flex:1;padding:var(--drawer-body-padding, var(--spacing-lg, 1rem));overflow-y:auto;color:var(--drawer-body-color, var(--text-color))}&::part(footer){display:flex;align-items:center;justify-content:flex-end;gap:var(--drawer-footer-gap, var(--spacing-sm, .5rem));padding:var(--drawer-footer-padding, var(--spacing-md, .75rem) var(--spacing-lg, 1rem));border-top:var(--drawer-footer-border-width, 1px) solid var(--drawer-footer-border-color, var(--color-surface));background:var(--drawer-footer-background, transparent)}&:not([position]),&[position=left]{&::part(panel){top:0;left:0;bottom:0;width:var(--drawer-width, 280px);min-width:var(--drawer-min-width, min(70%, 280px));max-width:var(--drawer-max-width, 400px);height:100%;transform:translate(-100%);border-radius:0 var(--drawer-border-radius, 0) var(--drawer-border-radius, 0) 0}&[open]::part(panel){transform:translate(0)}}&[position=right]{&::part(panel){top:0;right:0;bottom:0;width:var(--drawer-width, 280px);min-width:var(--drawer-min-width, min(70%, 280px));max-width:var(--drawer-max-width, 400px);height:100%;transform:translate(100%);border-radius:var(--drawer-border-radius, 0) 0 0 var(--drawer-border-radius, 0)}&[open]::part(panel){transform:translate(0)}}&[position=top]{&::part(panel){top:0;left:0;right:0;width:100%;height:var(--drawer-height, 50vh);min-height:var(--drawer-min-height, 200px);max-height:var(--drawer-max-height, 80vh);transform:translateY(-100%);border-radius:0 0 var(--drawer-border-radius, 0) var(--drawer-border-radius, 0)}&[open]::part(panel){transform:translateY(0)}}&[position=bottom]{&::part(panel){bottom:0;left:0;right:0;width:100%;height:var(--drawer-height, 50vh);min-height:var(--drawer-min-height, 200px);max-height:var(--drawer-max-height, 80vh);transform:translateY(100%);border-radius:var(--drawer-border-radius, 0) var(--drawer-border-radius, 0) 0 0}&[open]::part(panel){transform:translateY(0)}}&[size=sm]{--drawer-width: 240px;--drawer-height: 30vh}&[size=md]{--drawer-width: 320px;--drawer-height: 50vh}&[size=lg]{--drawer-width: 400px;--drawer-height: 70vh}&[size=xl]{--drawer-width: 500px;--drawer-height: 85vh}&[size=full]{--drawer-width: 100%;--drawer-height: 100vh;--drawer-max-width: 100%;--drawer-max-height: 100vh}}@keyframes drawer-backdrop-fade-in{0%{opacity:0}to{opacity:1}}
`,mimeType:"text/css"},"/node_modules/@bootstrapp/uix/feedback/spinner.js":{content:`import a from"/$app/types/index.js";import{html as s}from"/npm/lit-html";export default{tag:"uix-spinner",properties:{variant:a.string({defaultValue:"circular",enum:["circular","dots","bars"]}),size:a.string({defaultValue:"md",enum:["xs","sm","md","lg","xl"]}),primary:a.boolean(),secondary:a.boolean(),success:a.boolean(),danger:a.boolean(),warning:a.boolean(),info:a.boolean()},style:!0,render(){return this.variant==="circular"?s\`\`:this.variant==="dots"?s\`
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      \`:this.variant==="bars"?s\`
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      \`:s\`\`}};
`,mimeType:"text/javascript"},"/views/profile-view.js":{content:'import n from"/$app/types/index.js";import i from"/$app.js";import{html as r}from"/npm/lit-html";import{NBS as o}from"./utils.js";export default{properties:{userId:n.string({defaultValue:"guest"}),currentUser:n.object({sync:i.Model.users,query:e=>({id:e.userId,includes:["likedPlaces","likedEvents","likedMeetups","likedGroups","interestedEvents","interestedMeetups"]}),dependsOn:["userId"]}),meetupAttendance:n.array({defaultValue:[]}),activeTab:n.string({defaultValue:"attending"}),showOnboarding:n.boolean({defaultValue:!1})},async connected(){this.userId=i.Auth.isAuthenticated?i.Auth.currentUserId:"guest",this.meetupAttendance=await i.Model.meetup_attendance.getAll({where:{user:this.userId}})},getStats(){if(!this.currentUser)return{eventsJoined:0,saved:0,attending:0};const e=this.currentUser,d=new Set((this.meetupAttendance||[]).map(t=>t.meetup));return{attending:(e.likedMeetups||[]).filter(t=>d.has(t.id)).length,saved:(e.likedPlaces?.length||0)+(e.likedEvents?.length||0)+(e.likedMeetups?.length||0)+(e.likedGroups?.length||0),eventsJoined:e.interestedEvents?.length||0}},async handleSaveProfile(e){const d=i.Auth.user;d&&await i.Model.users.edit({id:d.id,...e}),this.showOnboarding=!1},getTabContent(){if(!this.currentUser)return[];const e=this.currentUser,d=new Set((this.meetupAttendance||[]).map(t=>t.meetup));switch(this.activeTab){case"attending":return(e.likedMeetups||[]).filter(t=>d.has(t.id)).map(t=>({...t,_type:"meetup"}));case"saved":return[...(e.likedPlaces||[]).map(t=>({...t,_type:"place"})),...(e.likedEvents||[]).map(t=>({...t,_type:"event"})),...(e.likedMeetups||[]).map(t=>({...t,_type:"meetup"})),...(e.likedGroups||[]).map(t=>({...t,_type:"group"}))];case"history":{const t=new Map;return(e.likedPlaces||[]).forEach(s=>t.set(`place-${s.id}`,{...s,_type:"place"})),(e.likedEvents||[]).forEach(s=>t.set(`event-${s.id}`,{...s,_type:"event"})),(e.likedMeetups||[]).forEach(s=>t.set(`meetup-${s.id}`,{...s,_type:"meetup"})),(e.likedGroups||[]).forEach(s=>t.set(`group-${s.id}`,{...s,_type:"group"})),(e.interestedEvents||[]).forEach(s=>t.set(`event-${s.id}`,{...s,_type:"event"})),(e.interestedMeetups||[]).forEach(s=>t.set(`meetup-${s.id}`,{...s,_type:"meetup"})),Array.from(t.values())}default:return[]}},render(){const e=this.currentUser||i.Auth.user||{};if(!e||!this.currentUser)return o.SPINNER;const d=this.getTabContent(),t=this.getStats(),s=e.arrivalDate&&e.departureDate?`${new Date(e.arrivalDate).toLocaleDateString(void 0,{month:"short",day:"numeric"})} - ${new Date(e.departureDate).toLocaleDateString(void 0,{month:"short",day:"numeric"})}`:"",c="absolute top-6 right-6 bg-white p-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all",p=a=>`flex-1 py-3 px-2 border-3 border-black rounded-xl font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all ${o.ACTIVE_SM} ${this.activeTab===a?"bg-accent text-black":"bg-white text-black"}`;return r`\n      <div class="px-4 sm:px-8 mx-auto pb-20">\n        <view-onboarding-wizard\n          .isOpen=${this.showOnboarding} .user=${e}\n          .onClose=${()=>this.showOnboarding=!1} .onSave=${this.handleSaveProfile.bind(this)}\n        ></view-onboarding-wizard>\n        <div class="relative bg-white border-b-3 border-black rounded-b-[2.5rem] p-8 pb-16 shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">\n          <button @click=${()=>this.showOnboarding=!0} class="${c}">\u270F\uFE0F Edit</button>\n          <div class="flex justify-center mb-4 mt-4">\n            <div class="w-32 h-32 rounded-3xl border-3 border-black bg-cover bg-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white"\n              style="background-image: url(${e.avatar})"\n            ></div>\n          </div>\n          <div class="text-center space-y-2">\n            <h1 class="text-3xl font-black flex items-center justify-center gap-2 text-black">\n              ${e.name}\n              <div class="bg-blue-400 text-white rounded-full p-1 border-2 border-black w-6 h-6 flex items-center justify-center text-[10px]">\u2713</div>\n            </h1>\n            <div class="flex flex-wrap justify-center gap-2 max-w-xs mx-auto">\n              <div class="px-3 py-1 bg-white border-2 border-black rounded-lg font-bold text-xs shadow-sm flex items-center gap-1">\n                ${e.travelStatus==="resident"?"\\u{1F3E0} Local":"\\u2708\\uFE0F Visitor"}\n              </div>\n              ${s?r`\n                <div class="px-3 py-1 bg-accent border-2 border-black rounded-lg font-bold text-xs shadow-sm flex items-center gap-1">\n                  \u{1F5D3}\uFE0F ${s}\n                </div>\n              `:null}\n            </div>\n            <div class="flex flex-wrap justify-center gap-2 pt-2">\n              ${e.vibeTime?r`<span class="px-2 py-1 bg-secondary-lighter border border-black rounded-md text-[10px] font-bold uppercase">${e.vibeTime}</span>`:null}\n              ${e.vibeDrink?r`<span class="px-2 py-1 bg-secondary-lighter border border-black rounded-md text-[10px] font-bold uppercase">${e.vibeDrink}</span>`:null}\n              ${(e.lookingFor||[]).slice(0,2).map(a=>r`<span class="px-2 py-1 bg-primary-lighter border border-black rounded-md text-[10px] font-bold uppercase">Looking for ${a}</span>`)}\n            </div>\n            ${e.bio?r`<p class="text-center text-sm font-bold text-gray-700 mt-4 max-w-md mx-auto">${e.bio}</p>`:null}\n          </div>\n        </div>\n        <div class="px-4 sm:px-6 -mt-10 relative z-10 mb-8">\n          <uix-card shadow="lg" borderWidth="3" padding="sm" class="grid grid-cols-3 divide-x-2 divide-black">\n            <div class="text-center py-3"><div class="text-2xl font-black text-black">${t.eventsJoined}</div><div class="text-[10px] font-bold uppercase text-gray-500 mt-1">Events Joined</div></div>\n            <div class="text-center py-3"><div class="text-2xl font-black text-black">${t.saved}</div><div class="text-[10px] font-bold uppercase text-gray-500 mt-1">Saved</div></div>\n            <div class="text-center py-3"><div class="text-2xl font-black text-black">${t.attending}</div><div class="text-[10px] font-bold uppercase text-gray-500 mt-1">Attending</div></div>\n          </uix-card>\n        </div>\n        <div class="flex gap-2 p-4 sm:p-6 mb-2">\n          ${["attending","saved","history"].map(a=>r`<button @click=${()=>this.activeTab=a} class="${p(a)}">\n              ${a==="attending"?"Attending":a==="saved"?"Saved":"History"}\n            </button>`)}\n        </div>\n        <div class="px-4 sm:px-6 mb-12">\n          ${d.length>0?r`<div class="grid grid-cols-2 gap-4">\n              ${d.map(a=>r`<view-meetup-card-compact .content=${a} .onClick=${l=>i.Router.go(`${l._type}-detail`,{slug:l.slug})}></view-meetup-card-compact>`)}\n            </div>`:r`<uix-card shadow="lg" borderWidth="3" padding="lg" class="text-center space-y-4">\n              <div class="text-5xl mb-4">${this.activeTab==="attending"?"\\u{1F4C5}":this.activeTab==="saved"?"\\u{1F4BE}":"\\u{1F4DA}"}</div>\n              <p class="text-lg font-bold text-gray-600">\n                ${this.activeTab==="attending"?"No events joined yet":this.activeTab==="saved"?"No saved places yet":"No activity yet"}\n              </p>\n              <button @click=${()=>i.Router.go("discover")} class="${"mt-4 px-6 py-2 bg-accent border-3 border-black rounded-xl font-black uppercase text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"}">Explore Events</button>\n            </uix-card>`}\n        </div>\n      </div>\n    `}};\n',mimeType:"text/javascript"},"/$app/icon-lucide/lucide/calendar.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M8 2v4m8-4v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></g></svg>',mimeType:"image/svg+xml"},"/$app/icon-lucide/lucide/users.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87m-3-12a4 4 0 0 1 0 7.75"/></g></svg>',mimeType:"image/svg+xml"},"/$app/icon-lucide/lucide/book-open.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zm20 0h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',mimeType:"image/svg+xml"},"/$app/icon-lucide/lucide/menu.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16M4 6h16M4 18h16"/></svg>',mimeType:"image/svg+xml"},"/$app/icon-lucide/lucide/compass.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m16.24 7.76l-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/><circle cx="12" cy="12" r="10"/></g></svg>',mimeType:"image/svg+xml"},"/$app/icon-lucide/lucide/bell.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9m4.3 13a1.94 1.94 0 0 0 3.4 0"/></svg>',mimeType:"image/svg+xml"},"/$app/icon-lucide/lucide/user.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></g></svg>',mimeType:"image/svg+xml"},"/$app/icon-lucide/lucide/bookmark.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 21l-7-4l-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',mimeType:"image/svg+xml"},"/$app/icon-lucide/lucide/settings.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2"/><circle cx="12" cy="12" r="3"/></g></svg>',mimeType:"image/svg+xml"},"/$app/icon-lucide/lucide/info.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></g></svg>',mimeType:"image/svg+xml"},"/$app/icon-lucide/lucide/x.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"/></svg>',mimeType:"image/svg+xml"},"/$app/icon-lucide/lucide/tree-palm.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1l1 1h4m3-.86A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1l-1 1h-3"/><path d="M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25l.7-.7l.71-.71l2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35"/><path d="M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14"/></g></svg>',mimeType:"image/svg+xml"},"/node_modules/@bootstrapp/uix/feedback/spinner.css":{content:`:where(.uix-spinner,uix-spinner){display:inline-flex;align-items:center;justify-content:center;--spinner-color: var(--color-primary);--spinner-size: 2rem;width:var(--spinner-size);height:var(--spinner-size);position:relative;&[primary]{--spinner-color: var(--color-primary)}&[secondary]{--spinner-color: var(--color-secondary)}&[success]{--spinner-color: var(--color-success)}&[danger]{--spinner-color: var(--color-danger)}&[warning]{--spinner-color: var(--color-warning)}&[info]{--spinner-color: var(--color-info)}&[size=xs]{--spinner-size: 1rem}&[size=sm]{--spinner-size: 1.5rem}&[size=md]{--spinner-size: 2rem}&[size=lg]{--spinner-size: 3rem}&[size=xl]{--spinner-size: 4rem}&[variant=circular]:before{content:"";display:block;width:100%;height:100%;border:calc(var(--spinner-size) / 8) solid var(--color-surface-darker);border-top-color:var(--spinner-color);border-radius:50%;animation:spinner-circular .8s linear infinite}&[variant=dots]{gap:calc(var(--spinner-size) / 6)}&[variant=dots] .dot{display:block;width:calc(var(--spinner-size) / 4);height:calc(var(--spinner-size) / 4);background-color:var(--spinner-color);border-radius:50%;animation:spinner-dots 1.4s ease-in-out infinite}&[variant=dots] .dot:nth-child(1){animation-delay:-.32s}&[variant=dots] .dot:nth-child(2){animation-delay:-.16s}&[variant=dots] .dot:nth-child(3){animation-delay:0s}&[variant=bars]{gap:calc(var(--spinner-size) / 8)}&[variant=bars] .bar{display:block;width:calc(var(--spinner-size) / 6);height:100%;background-color:var(--spinner-color);border-radius:calc(var(--spinner-size) / 12);animation:spinner-bars 1.2s ease-in-out infinite}&[variant=bars] .bar:nth-child(1){animation-delay:-.24s}&[variant=bars] .bar:nth-child(2){animation-delay:-.12s}&[variant=bars] .bar:nth-child(3){animation-delay:0s}}@keyframes spinner-circular{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes spinner-dots{0%,80%,to{opacity:.3;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}@keyframes spinner-bars{0%,40%,to{transform:scaleY(.4);opacity:.5}20%{transform:scaleY(1);opacity:1}}
`,mimeType:"text/css"},"/views/onboarding-wizard.js":{content:`import i from"/$app/types/index.js";import{html as s}from"/npm/lit-html";const n="border-3 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all";export default{properties:{isOpen:i.boolean({defaultValue:!1}),user:i.object({attribute:!1}),onSave:i.function({attribute:!1}),onClose:i.function({attribute:!1}),formData:i.object({defaultValue:{}})},connected(){this.user&&(this.formData={travelStatus:this.user.travelStatus||"visitor",arrivalDate:this.user.arrivalDate||"",departureDate:this.user.departureDate||"",vibeTime:this.user.vibeTime||"morning",vibeSocial:this.user.vibeSocial||"social",vibeDrink:this.user.vibeDrink||"caipirinha",lookingFor:this.user.lookingFor||[]})},updateField(e,a){this.formData={...this.formData,[e]:a}},toggleLookingFor(e){const a=this.formData.lookingFor||[];this.updateField("lookingFor",a.includes(e)?a.filter(l=>l!==e):[...a,e])},handleStepChange(e){e.detail.step===2&&e.detail.direction==="forward"&&this.formData.travelStatus==="resident"&&setTimeout(()=>e.target.nextStep(),0)},handleFinish(){this.onSave&&this.onSave(this.formData)},handleCancel(){this.onClose&&this.onClose()},render(){if(!this.isOpen)return null;const e=t=>\`w-full p-4 border-3 border-black rounded-2xl font-black uppercase text-lg flex items-center justify-between \${n} \${this.formData.travelStatus===t?"bg-accent":"bg-white"}\`,a=(t,r,o)=>\`flex-1 py-3 border-2 border-black rounded-xl font-bold text-sm \${this.formData[r]===t?o:"bg-white"}\`,l=[{id:"friends",label:"New Friends \\u{1F46F}"},{id:"dates",label:"Dates \\u2764\\uFE0F"},{id:"activities",label:"Activity Partners \\u{1F3BE}"},{id:"tips",label:"Local Tips \\u{1F5FA}\\uFE0F"},{id:"party",label:"Parties \\u{1F389}"}];return s\`
      <uix-wizard
        modal
        .totalSteps=\${4}
        .showNavigation=\${!1}
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
            \${["resident","visitor","nomad"].map(t=>s\`
                <button
                  @click=\${r=>{this.updateField("travelStatus",t),r.target.closest("uix-wizard").nextStep()}}
                  class="\${e(t)}"
                >
                  <span>
                    \${t==="resident"?"\\u{1F3E0} I Live Here":t==="visitor"?"\\u2708\\uFE0F Just Visiting":"\\u{1F4BB} Digital Nomad"}
                  </span>
                  \${this.formData.travelStatus===t?"\\u2713":"\\u2192"}
                </button>
              \`)}
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
                @change=\${t=>this.updateField("arrivalDate",t.target.value)}
              />
            </div>
            <div>
              <label class="block font-bold text-sm uppercase mb-2">Departure Date</label>
              <input
                type="date"
                class="w-full p-4 border-3 border-black rounded-xl font-bold bg-gray-50 focus:bg-yellow-100 outline-none"
                .value=\${this.formData.departureDate}
                @change=\${t=>this.updateField("departureDate",t.target.value)}
              />
            </div>
            <button
              @click=\${t=>t.target.closest("uix-wizard").nextStep()}
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
                  @click=\${()=>this.updateField("vibeTime","morning")}
                  class="\${a("morning","vibeTime","bg-accent-light")}"
                >
                  \u2600\uFE0F Early Bird
                </button>
                <button
                  @click=\${()=>this.updateField("vibeTime","night")}
                  class="\${a("night","vibeTime","bg-primary-dark")}"
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
                  @click=\${()=>this.updateField("vibeDrink","coconut")}
                  class="\${a("coconut","vibeDrink","bg-green-300")}"
                >
                  \u{1F965} Coconut
                </button>
                <button
                  @click=\${()=>this.updateField("vibeDrink","caipirinha")}
                  class="\${a("caipirinha","vibeDrink","bg-accent-light")}"
                >
                  \u{1F379} Caipi
                </button>
                <button
                  @click=\${()=>this.updateField("vibeDrink","beer")}
                  class="\${a("beer","vibeDrink","bg-accent")}"
                >
                  \u{1F37A} Beer
                </button>
              </div>
            </div>
            <button
              @click=\${t=>t.target.closest("uix-wizard").nextStep()}
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
            \${l.map(t=>s\`
                <button
                  @click=\${()=>this.toggleLookingFor(t.id)}
                  class="w-full py-3 px-4 border-2 border-black rounded-xl font-bold text-left flex justify-between items-center transition-all \${(this.formData.lookingFor||[]).includes(t.id)?"bg-teal-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[1px] translate-y-[1px]":"bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"}"
                >
                  <span>\${t.label}</span>
                  \${(this.formData.lookingFor||[]).includes(t.id)?"\\u2713":"+"}
                </button>
              \`)}
          </div>
          <button
            @click=\${t=>t.target.closest("uix-wizard").nextStep()}
            class="w-full py-4 bg-primary-dark border-3 border-black text-black rounded-xl font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            Complete Profile \u2728
          </button>
        </div>
      </uix-wizard>
    \`}};
`,mimeType:"text/javascript"},"/node_modules/@bootstrapp/uix/layout/card.js":{content:`import e from"/$app/types/index.js";import{html as t}from"/npm/lit-html";export default{extends:"uix-container",i18n:{},style:!0,shadow:!0,properties:{borderWidth:e.string({defaultValue:"1",enum:["none","1","2","3"]}),borderStyle:e.string({defaultValue:"solid",enum:["solid","dashed","dotted"]}),shadow:e.string({defaultValue:"none",enum:["none","sm","md","lg"]}),hover:e.boolean({defaultValue:!1}),gap:e.string({defaultValue:"md",enum:["none","xs","sm","md","lg","xl"]})},render(){return t\`
      <slot name="header" part="header"></slot>
      <slot part="body"><slot></slot></slot>
      
      <slot part="footer" name="footer"></slot>
    \`}};
`,mimeType:"text/javascript"},"/node_modules/@bootstrapp/uix/layout/container.js":{content:`import e from"/$app/types/index.js";export default{style:!0,properties:{padding:e.string({defaultValue:"md",enum:["none","sm","md","lg"]}),overflow:e.string({enum:["visible","hidden","auto","scroll"]}),variant:e.string({enum:["default","filled","outlined","elevated"]})}};
`,mimeType:"text/javascript"},"/node_modules/@bootstrapp/uix/layout/container.css":{content:`:where(.uix-container,uix-container){display:block;box-sizing:border-box;background:var(--container-background, var(--color-surface-lighter));border:1px solid var(--container-border-color, var(--color-surface-dark));border-radius:var(--container-border-radius, var(--radius-md, .375rem));overflow:var(--container-overflow, visible);&[padding=none]{padding:0}&[padding=sm]{padding:var(--spacing-sm, .5rem)}&[padding=md]{padding:var(--spacing-md, .75rem) var(--spacing-lg, 1rem)}&[padding=lg]{padding:var(--spacing-lg, 1rem) var(--spacing-xl, 1.5rem)}&[overflow=visible]{--container-overflow: visible}&[overflow=hidden]{--container-overflow: hidden}&[overflow=auto]{--container-overflow: auto}&[overflow=scroll]{--container-overflow: scroll}}
`,mimeType:"text/css"},"/node_modules/@bootstrapp/uix/layout/card.css":{content:`:where(.uix-card,uix-card){display:flex;flex-direction:column;overflow:hidden;background:var(--card-background, inherit);--container-border-color: #000;&::part(body){display:flex;flex-direction:column;flex:1}>[slot=header]{margin:0;display:flex;padding:var( --card-header-padding, var(--spacing-md, .75rem) var(--spacing-lg, 1rem) );border-bottom-width:var(--card-header-border-width, 0);border-bottom-style:solid;border-bottom-color:var( --card-header-border-color, var(--card-border-primary, #504945) );background:var(--card-header-background-color, transparent)}>[slot=footer]{display:flex;padding:var( --card-footer-padding, var(--spacing-md, .75rem) var(--spacing-lg, 1rem) );border-top-width:var(--card-footer-border-width, 0);border-top-style:var(--card-footer-border-style, solid);border-top-color:var( --card-footer-border-color, var(--color-surface, #504945) );background:var(--card-footer-background-color, transparent);flex-direction:row;gap:var(--spacing-sm, .5rem);align-items:center;justify-content:flex-end}&[style*=--card-gradient-from]::part(body){background:linear-gradient(135deg,var(--card-gradient-from),var(--card-gradient-to, var(--card-gradient-from)))}&[padding=none]::part(body){padding:0}&[padding=sm]::part(body){padding:var(--spacing-sm, .5rem)}&[padding=md]::part(body){padding:var(--spacing-md, .75rem) var(--spacing-lg, 1rem)}&[padding=lg]::part(body){padding:var(--spacing-lg, 1rem) var(--spacing-xl, 1.5rem)}&[borderWidth=none]{border-width:0}&[borderWidth="1"]{border-width:1px}&[borderWidth="2"]{border-width:2px}&[borderWidth="3"]{border-width:3px}&[borderStyle=solid]{border-style:solid}&[borderStyle=dashed]{border-style:dashed}&[borderStyle=dotted]{border-style:dotted}&[gap=none]::part(body){gap:0}&[gap=xs]::part(body){gap:var(--spacing-xs, .25rem)}&[gap=sm]::part(body){gap:var(--spacing-sm, .5rem)}&[gap=md]::part(body){gap:var(--spacing-md, .75rem)}&[gap=lg]::part(body){gap:var(--spacing-lg, 1rem)}&[gap=xl]::part(body){gap:var(--spacing-xl, 1.5rem)}&[shadow=sm]{box-shadow:var(--shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, .05))}&[shadow=md]{box-shadow:var( --shadow-md, 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06) )}&[shadow=lg]{box-shadow:var( --shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05) )}&[hover]{transition:all .2s ease;cursor:pointer;&:hover{border-color:var(--card-border-hover, #83a598)}&[shadow=sm]:hover{box-shadow:var( --shadow-md, 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06) )}&[shadow=md]:hover{box-shadow:var( --shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05) )}&[shadow=lg]:hover{box-shadow:var( --shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, .1), 0 10px 10px -5px rgba(0, 0, 0, .04) )}}&[variant=filled]{--container-background: var(--color-surface-light);--container-border-color: var(--color-surface)}&[variant=outlined]{--container-background: transparent;--container-border-color: var(--color-surface)}&[variant=elevated]{--container-background: var(--color-surface-lighter);--container-border-color: var(--color-surface-dark);box-shadow:0 1px 3px #0000001f,0 1px 2px #0000003d;&:hover{box-shadow:0 3px 6px #00000029,0 3px 6px #0000003b;transition:box-shadow .3s ease}}}
`,mimeType:"text/css"},"/views/groups-view.js":{content:`import i from"/$app/types/index.js";import o from"/$app.js";import{html as s}from"/npm/lit-html";import{ALL_TAGS as c,NBS as g}from"./utils.js";const{brand:x}=o.settings;export default{dataQuery:!0,properties:{groups:i.array(),selectedTags:i.array({defaultValue:[]})},goToGroup(e){o.Router.go("group-detail",{slug:e.slug})},toggleTag(e){this.selectedTags.includes(e)?this.selectedTags=this.selectedTags.filter(l=>l!==e):this.selectedTags=[...this.selectedTags,e]},filterByTags(e){return this.selectedTags.length===0?e:e.filter(l=>this.selectedTags.some(a=>l.tags?.includes(a)))},render(){if(!this.groups)return g.SPINNER;const e=this.filterByTags(this.groups),l=e.filter(t=>t.featured),a=e.filter(t=>!t.featured);return s\`
      <div class="p-4 sm:p-6 space-y-6 pb-24">
        <!-- Mobile Header with branding -->
        <header class="md:hidden flex items-center justify-between">
          <view-logo></view-logo>
          <div class="bg-teal-300 border-2 border-black rounded-full w-10 h-10 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span class="text-lg">\u{1F4AC}</span>
          </div>
        </header>

        <!-- Page Title -->
        <h1 class="text-2xl md:text-4xl font-black uppercase text-black tracking-tight">
          Communities
        </h1>

        <!-- Tag Filters -->
        <div class="flex gap-2 overflow-x-auto pb-2">
          \${Object.entries(c).slice(0,6).map(([t,r])=>{const d=this.selectedTags.includes(t);return s\`
              <button
                @click=\${()=>this.toggleTag(t)}
                class="flex-shrink-0 px-3 py-1.5 border-2 border-black rounded-lg font-bold text-xs transition-all \${d?\`bg-\${r.color} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]\`:"bg-white hover:bg-gray-100"}"
              >
                \${r.icon} \${r.label}
              </button>
            \`})}
          \${this.selectedTags.length>0?s\`
            <button
              @click=\${()=>{this.selectedTags=[]}}
              class="flex-shrink-0 px-3 py-1.5 border-2 border-black rounded-lg font-bold text-xs bg-gray-100 hover:bg-gray-200 transition-all"
            >
              Clear
            </button>
          \`:null}
        </div>

        <!-- Featured Section -->
        \${l.length>0?s\`
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 bg-yellow-300 border-2 border-black rounded-lg font-black text-sm uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
                \u2B50 Featured
              </span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
              \${l.map(t=>s\`
                <view-group
                  .group=\${t}
                  .featured=\${!0}
                  .onClick=\${r=>this.goToGroup(r)}
                ></view-group>
              \`)}
            </div>
          </div>
        \`:null}

        <!-- All Groups Section -->
        \${a.length>0?s\`
          <div class="space-y-4">
            <h2 class="text-xl font-black uppercase text-black">All Communities</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              \${a.map(t=>s\`
                <view-group
                  .group=\${t}
                  .onClick=\${r=>this.goToGroup(r)}
                ></view-group>
              \`)}
            </div>
          </div>
        \`:null}

        <!-- Empty State -->
        \${this.groups.length===0?s\`
          <uix-card shadow="lg" borderWidth="3" padding="lg" class="text-center">
            <div class="text-5xl mb-4">\u{1F997}</div>
            <h3 class="text-xl font-black uppercase mb-2">No Communities Yet</h3>
            <p class="text-gray-600 font-medium">Be the first to start a community!</p>
          </uix-card>
        \`:null}
      </div>
    \`}};
`,mimeType:"text/javascript"},"/views/group.js":{content:`import l from"/$app/types/index.js";import{html as t}from"/npm/lit-html";export default{properties:{group:l.object(),featured:l.boolean({defaultValue:!1}),onClick:l.function({attribute:!1})},handleCardClick(e){e.target.closest(".whatsapp-btn")||this.onClick&&this.onClick(this.group)},render(){if(!this.group)return null;const e=this.group,s=e.recommended||e.viewCount>=100,r=e.tags?.length>0;return this.featured?t\`
        <uix-card
          shadow="lg"
          hover
          borderWidth="3"
          padding="none"
          class="cursor-pointer"
          @click=\${a=>this.handleCardClick(a)}
        >
          <div class="relative h-40 bg-gray-200">
            <img src="\${e.image}" alt="\${e.name}" class="w-full h-full object-cover" />
            <div class="absolute top-3 left-3">
              \${s?t\`
                <view-recommended-badge
                  .recommended=\${e.recommended}
                  .viewCount=\${e.viewCount||0}
                ></view-recommended-badge>
              \`:t\`
                <span class="px-3 py-1 bg-yellow-300 border-2 border-black rounded-lg font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  \u2B50 Featured
                </span>
              \`}
            </div>
          </div>
          <div class="p-4 space-y-3">
            <uix-link href="/group/\${e.slug}" class="text-xl font-black uppercase leading-tight">\${e.name}</uix-link>
            <p class="text-sm font-medium text-gray-600 line-clamp-2">\${e.description}</p>
            \${r?t\`
              <view-tags-display .tags=\${e.tags} .maxVisible=\${3}></view-tags-display>
            \`:null}
            <div class="flex items-center justify-between pt-2">
              <div class="flex items-center gap-2">
                <span class="px-3 py-1 bg-gray-100 border-2 border-black rounded-lg font-black text-xs">
                  \u{1F465} \${e.memberCount}
                </span>
              </div>
              <a
                href="\${e.whatsappLink}"
                target="_blank"
                class="whatsapp-btn px-4 py-2 bg-green-400 border-2 border-black rounded-xl font-black uppercase text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                @click=\${a=>a.stopPropagation()}
              >
                \u{1F4AC} Join
              </a>
            </div>
          </div>
        </uix-card>
      \`:t\`
      <uix-card
        shadow="md"
        hover
        borderWidth="3"
        padding="none"
        class="cursor-pointer flex flex-col h-full"
        @click=\${a=>this.handleCardClick(a)}
      >
        <div class="relative h-32 bg-gray-200 flex-shrink-0">
          <img src="\${e.image}" alt="\${e.name}" class="w-full h-full object-cover" />
          \${s?t\`
            <div class="absolute top-2 right-2">
              <view-recommended-badge
                .recommended=\${e.recommended}
                .viewCount=\${e.viewCount||0}
              ></view-recommended-badge>
            </div>
          \`:null}
          <div class="absolute bottom-2 right-2">
            <span class="px-2 py-1 bg-white border-2 border-black rounded-lg font-black text-[10px]">
              \u{1F465} \${e.memberCount}
            </span>
          </div>
        </div>
        <div class="p-3 flex-1 flex flex-col">
          <uix-link href="/group/\${e.slug}" class="text-sm font-black uppercase leading-tight mb-1 line-clamp-2">\${e.name}</uix-link>
          <p class="text-xs font-medium text-gray-500 line-clamp-2 flex-1">\${e.description}</p>
          \${r?t\`
            <div class="mt-2">
              <view-tags-display .tags=\${e.tags} .maxVisible=\${2}></view-tags-display>
            </div>
          \`:null}
          <a
            href="\${e.whatsappLink}"
            target="_blank"
            class="whatsapp-btn mt-3 block w-full text-center py-2 bg-green-400 border-2 border-black rounded-xl font-black uppercase text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            @click=\${a=>a.stopPropagation()}
          >
            \u{1F4AC} Join Chat
          </a>
        </div>
      </uix-card>
    \`}};
`,mimeType:"text/javascript"},"/views/tags-display.js":{content:'import l from"/$app/types/index.js";import{html as n}from"/npm/lit-html";import{getTagInfo as u}from"./utils.js";export default{properties:{tags:l.array({defaultValue:[]}),maxVisible:l.number({defaultValue:3}),size:l.string({defaultValue:"sm"}),showIcon:l.boolean({defaultValue:!0})},render(){const{tags:e,maxVisible:a,size:o,showIcon:i}=this;if(!e||e.length===0)return null;const p=e.slice(0,a),t=e.length-a,r=o==="md"?"px-3 py-1.5 text-sm":"px-2 py-1 text-xs";return n`\n      <div class="flex flex-wrap gap-1.5">\n        ${p.map(d=>{const s=u(d);return n`\n            <span class="inline-flex items-center gap-1 bg-${s.color} border-2 border-black rounded-lg font-bold ${r}">\n              ${i?n`<span>${s.icon}</span>`:null}\n              <span>${s.label}</span>\n            </span>\n          `})}\n        ${t>0?n`\n          <span class="inline-flex items-center bg-gray-200 border-2 border-black rounded-lg font-bold ${r}">\n            +${t}\n          </span>\n        `:null}\n      </div>\n    `}};\n',mimeType:"text/javascript"},"/views/recommended-badge.js":{content:`import e from"/$app/types/index.js";import{html as r}from"/npm/lit-html";const t=100;export default{properties:{recommended:e.boolean({defaultValue:!1}),viewCount:e.number({defaultValue:0}),size:e.string({defaultValue:"sm"})},render(){const{recommended:n,viewCount:s,size:o}=this,p=s>=t;if(!n&&!p)return null;const a=o==="md"?"px-3 py-1.5 text-sm":"px-2 py-1 text-xs";return n?r\`
        <span class="inline-flex items-center gap-1 bg-yellow-300 border-2 border-black rounded-lg font-black uppercase \${a} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <uix-icon name="star"></uix-icon>
          <span>Recommended</span>
        </span>
      \`:r\`
      <span class="inline-flex items-center gap-1 bg-teal-400 border-2 border-black rounded-lg font-black uppercase \${a} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">        
        <uix-icon name="flame"></uix-icon>
        <span>Popular</span>
      </span>
    \`}};
`,mimeType:"text/javascript"},"/$app/icon-lucide/lucide/flame.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3c-1.072-2.143-.224-4.054 2-6c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5"/></svg>',mimeType:"image/svg+xml"},"/$app/icon-lucide/lucide/star.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 2l3.09 6.26L22 9.27l-5 4.87l1.18 6.88L12 17.77l-6.18 3.25L7 14.14L2 9.27l6.91-1.01z"/></svg>',mimeType:"image/svg+xml"},"/views/templates/detail.js":{content:`import s from"/$app/router/index.js";import i from"/$app/types/index.js";import c from"/$app.js";import{html as a}from"/npm/lit-html";const{brand:n,navTabs:o}=c.settings;export default{class:"min-h-screen w-full bg-purple-50 flex flex-col font-sans",properties:{currentRoute:i.object({sync:s}),currentLang:i.string("en"),modalItem:i.object(null),modalOpen:i.boolean(!1),userId:i.number({sync:"local"})},getActiveTabFromRoute(){const t=this.currentRoute?.name,r={"place-detail":"discover","event-detail":"events","group-detail":"groups","guide-detail":"guides","meetup-detail":"discover"};return r[t]?r[t]:o.map(l=>l.id).filter(l=>l!=="discover").includes(t)?t:"discover"},render(){const t=this.getActiveTabFromRoute(),r=this.currentRoute?.route?.title||this.currentRoute?.pageTitle||"";return a\`
      <nav class="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b-3 border-black">
        <div class="flex items-center gap-4">
          <button
            @click=\${()=>window.history.back()}
            class="w-10 h-10 flex items-center justify-center border-2 border-black rounded-xl bg-white hover:bg-gray-100 transition-colors"
          >
            <uix-icon name="arrow-left" size="20"></uix-icon>
          </button>
          <uix-link href="/" class="text-2xl font-black uppercase tracking-tight">
            <uix-icon name="tree-palm" size="lg"></uix-icon>
          \${n.name}<span class="\${n.accentClass} -ml-1">\${n.accent}</span>
          </uix-link>
        </div>

        <div class="font-black uppercase tracking-tight text-gray-600 truncate max-w-[300px] sm:max-w-full text-center w-full text-3xl">
          \${r}
        </div>

        <div class="flex items-center gap-6">
          \${o.map(e=>a\`
              <uix-link
                href=\${e.route}
                class="font-bold uppercase text-sm transition-colors \${t===e.id?n.accentClass:\`text-black hover:\${n.accentClass}\`}"
              >
                \${e.label}
              </uix-link>
            \`)}
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
        \${o.map(e=>a\`
            <uix-link
              href=\${e.route}
              class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 \${t===e.id?"bg-white/10 ring-2 ring-white text-white":"text-gray-400 hover:text-white"}"
            >
              <uix-icon name=\${e.icon} size="md"></uix-icon>
            </uix-link>
          \`)}
        </div>
      </nav>

      <!-- Modal -->
      <view-item-modal .item=\${this.modalItem} .isOpen=\${this.modalOpen} @close=\${()=>{this.modalOpen=!1,this.modalItem=null}}></view-item-modal>
    \`}};
`,mimeType:"text/javascript"},"/views/group-detail-view.js":{content:`import t from"/$app/types/index.js";import s from"/$app.js";import{html as i}from"/npm/lit-html";import{getCategoryColor as o,NBS as a}from"./utils.js";import"./detail-hero.js";import"./detail-info-card.js";export default{dataQuery:!0,properties:{group:t.object({attribute:!1}),userId:t.string({defaultValue:"guest"}),currentUser:t.object({sync:s.Model.users,query:e=>({id:e.userId,includes:["likedGroups"]}),dependsOn:["userId"]}),showAuthPrompt:t.boolean({defaultValue:!1}),authPromptMessage:t.string({defaultValue:""}),showAuthModal:t.boolean({defaultValue:!1})},async connected(){this.userId=s.Auth.isAuthenticated?s.Auth.currentUserId:"guest"},dataLoaded({row:e}){e?.name&&s.Router.setTitle(e.name)},isLiked(){return!this.currentUser||!this.group?!1:this.currentUser.likedGroups?.some(e=>e.id===this.group.id)||!1},async handleLikeToggle(){const e=this.group;!e||!this.currentUser||(this.isLiked()?this.currentUser.likedGroups=this.currentUser.likedGroups.filter(r=>r.id!==e.id):this.currentUser.likedGroups=[...this.currentUser.likedGroups,{id:e.id}],await s.Model.users.edit(this.currentUser))},render(){const e=this.group;if(!e)return a.SPINNER;const r=this.isLiked();return i\`
      <div class="bg-purple-50 min-h-screen pb-20">
        <view-auth-modal
          .isOpen=\${this.showAuthModal}
          .onClose=\${()=>this.showAuthModal=!1}
          .onSuccess=\${()=>location.reload()}
        ></view-auth-modal>
        \${this.showAuthPrompt?i\`
              <div class="fixed bottom-20 left-4 right-4 z-40">
                <view-auth-prompt
                  .message=\${this.authPromptMessage}
                  .onLogin=\${()=>{this.showAuthPrompt=!1,this.showAuthModal=!0}}
                  .onDismiss=\${()=>this.showAuthPrompt=!1}
                ></view-auth-prompt>
              </div>
            \`:null}
        <!-- Hero -->
        <view-detail-hero
          .image=\${e.image}
          .title=\${e.name}
          .category=\${s.i18n.t(\`categories.\${e.category}\`)}
          .categoryColor=\${o(e.category)}
          .badges=\${e.featured?[{label:"\\u2B50 Featured",colorClass:"bg-yellow-300"}]:[]}
          .recommended=\${e.recommended}
          .viewCount=\${e.viewCount||0}
        ></view-detail-hero>

        <!-- Content - Two Column Layout -->
        <div class="px-4 -mt-6 relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Main Content (2/3 width on desktop) -->
            <div class="md:col-span-2 space-y-6">
              <view-detail-info-card
                .tags=\${e.tags||[]}
                .description=\${e.description}
                .headerContent=\${()=>i\`
                  \${e.groupName?i\`<div class="flex items-center gap-2 text-sm font-bold text-gray-600 mb-2">
                        <span>\u{1F4AC} \${e.groupName}</span>
                      </div>\`:null}
                  \${e.memberCount?i\`<div class="flex items-center gap-2 text-sm font-bold text-gray-600">
                        <span>\u{1F465} \${e.memberCount}</span>
                      </div>\`:null}
                \`}
                .actions=\${[...e.whatsappLink?[{label:"\\u{1F4AC} Join WhatsApp Group",href:e.whatsappLink,target:"_blank",variant:"success"}]:[],{label:r?"\\u2764\\uFE0F Saved":"\\u{1F90D} Save Group",onClick:()=>this.handleLikeToggle(),variant:r?"danger":"primary"}]}
              ></view-detail-info-card>
            </div>

            <!-- Sidebar (1/3 width on desktop) -->
            <div class="space-y-6">
              <view-detail-sidebar
                type="group"
                .currentItem=\${e}
                .showToc=\${!1}
              ></view-detail-sidebar>
            </div>
          </div>

          <div class="h-24"></div>
        </div>
      </div>
    \`}};
`,mimeType:"text/javascript"},"/views/detail-info-card.js":{content:`import r from"/$app/types/index.js";import{html as t,nothing as a}from"/npm/lit-html";export default{properties:{location:r.string({defaultValue:""}),tags:r.array({defaultValue:[]}),description:r.string({defaultValue:""}),actions:r.array({defaultValue:[]}),headerContent:r.function({attribute:!1}),beforeDescription:r.function({attribute:!1}),afterDescription:r.function({attribute:!1})},renderAction(e){const s={primary:"bg-primary border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",success:"bg-green-400 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",danger:"bg-teal-400 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",outline:"bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"}[e.variant||"primary"];return e.href?t\`
        <a
          href="\${e.href}"
          target="\${e.target||"_self"}"
          class="block w-full text-center py-3 \${s} rounded-xl font-black uppercase text-black transition-all"
        >
          \${e.icon?t\`<span class="mr-1">\${e.icon}</span>\`:null}
          \${e.label}
        </a>
      \`:t\`
      <button
        @click=\${e.onClick}
        class="w-full py-4 \${s} rounded-xl font-black uppercase text-black cursor-pointer transition-all"
      >
        \${e.icon?t\`<span class="mr-1">\${e.icon}</span>\`:null}
        \${e.label}
      </button>
    \`},render(){return t\`
      <uix-card shadow="lg" borderWidth="3" padding="lg">
        <!-- Header Content (custom) -->
        \${this.headerContent?this.headerContent():a}

        <!-- Location -->
        \${this.location?t\`
              <div
                class="flex items-center gap-2 text-sm font-bold text-gray-600 mb-2"
              >
                <span>\${this.location}</span>
              </div>
            \`:a}

        <!-- Tags -->
        \${this.tags?.length>0?t\`
              <div class="mb-4">
                <view-tags-display
                  .tags=\${this.tags}
                  .maxVisible=\${4}
                  size="md"
                ></view-tags-display>
              </div>
            \`:a}

        <!-- Before Description Content (custom) -->
        \${this.beforeDescription?this.beforeDescription():a}

        <!-- Description -->
        \${this.description?t\`
              <div class="mt-4 pt-4 border-t-2 border-dashed border-gray-200">
                <p class="text-base font-medium text-gray-800 leading-relaxed">
                  \${this.description}
                </p>
              </div>
            \`:a}

        <!-- After Description Content (custom) -->
        \${this.afterDescription?this.afterDescription():a}

        <!-- Action Buttons -->
        \${this.actions?.length>0?t\`
              <div class="mt-6 pt-6 border-t-2 border-dashed border-gray-300">
                <div class="space-y-3">
                  \${this.actions.map(e=>this.renderAction(e))}
                </div>
              </div>
            \`:a}
      </uix-card>
    \`}};
`,mimeType:"text/javascript"},"/views/detail-hero.js":{content:`import e from"/$app/types/index.js";import{html as t}from"/npm/lit-html";export default{properties:{image:e.string({defaultValue:""}),title:e.string({defaultValue:""}),category:e.string({defaultValue:""}),categoryColor:e.string({defaultValue:"bg-teal-300"}),badges:e.array({defaultValue:[]}),recommended:e.boolean({defaultValue:!1}),viewCount:e.number({defaultValue:0})},handleBack(){window.history.back()},handleShare(){navigator.share?navigator.share({title:this.title,url:window.location.href}):navigator.clipboard.writeText(window.location.href)},render(){const o=this.recommended||this.viewCount>=100;return t\`
      <div
        class="relative w-full h-48 sm:h-80 bg-gray-200 border-b-3 border-black overflow-hidden"
      >
        <!-- Hero Image -->
        <img src="\${this.image}" alt="\${this.title}" class="w-full h-full object-cover" />

        <!-- Bottom-Left Badges -->
        <div class="absolute bottom-4 left-4 flex gap-2 flex-wrap z-20">
          \${this.category?t\`
                <div
                  class="px-3 py-1 \${this.categoryColor} border-2 border-black rounded-lg font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  \${this.category}
                </div>
              \`:null}
          \${this.badges.map(a=>t\`
              <div
                class="px-3 py-1 \${a.colorClass||"bg-gray-200"} border-2 border-black rounded-lg font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                \${a.label}
              </div>
            \`)}
        </div>

        <!-- Bottom-Right: Share button only (mobile) -->
        <div class="absolute bottom-4 right-4 md:hidden z-20">
          <button
            @click=\${()=>this.handleShare()}
            class="w-10 h-10 flex items-center justify-center border-2 border-black rounded-xl bg-white hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <uix-icon name="share" size="20"></uix-icon>
          </button>
        </div>

        <!-- Bottom-Left: Recommended badge with category badges (mobile) -->
        \${o?t\`
              <div class="absolute bottom-14 left-4 md:hidden z-20">
                <view-recommended-badge
                  .recommended=\${this.recommended}
                  .viewCount=\${this.viewCount}
                ></view-recommended-badge>
              </div>
            \`:null}

        <!-- Mobile Header (just back + title) -->
        <div
          class="absolute top-4 left-4 right-4 flex items-center gap-2 md:hidden"
        >
          <button
            @click=\${()=>this.handleBack()}
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
            @click=\${()=>this.handleShare()}
            class="w-10 h-10 flex items-center justify-center border-2 border-black rounded-xl bg-white hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <uix-icon name="share" size="20"></uix-icon>
          </button>
          \${o?t\`
                <view-recommended-badge
                  .recommended=\${this.recommended}
                  .viewCount=\${this.viewCount}
                ></view-recommended-badge>
              \`:null}
        </div>
      </div>
    \`}};
`,mimeType:"text/javascript"},"/$app/icon-lucide/lucide/arrow-left.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 19l-7-7l7-7m7 7H5"/></svg>',mimeType:"image/svg+xml"},"/views/auth-modal.js":{content:`import r from"/$app/types/index.js";import{html as n}from"/npm/lit-html";import l from"/$app.js";export default{style:!0,properties:{isOpen:r.boolean({defaultValue:!1}),onClose:r.function({attribute:!1}),onSuccess:r.function({attribute:!1}),loading:r.boolean({defaultValue:!1}),error:r.string({defaultValue:""})},async handleAuthSubmit(i){const{mode:o,name:e,email:s,password:a,passwordConfirm:h}=i.detail,u=this.querySelector("uix-auth-form");this.loading=!0,this.error="";try{let t;o==="register"?t=await l.Auth.register({name:e,email:s,password:a,passwordConfirm:h||a,username:\`@\${e.toLowerCase().replace(/\\s/g,"")}\`,stats:{interested:0,saved:0,attending:0},travelStatus:"visitor",vibeTime:"night",vibeSocial:"social",vibeDrink:"caipirinha",lookingFor:[]}):t=await l.Auth.login(s,a),t.success?this.onSuccess&&this.onSuccess():(this.error=t.error||"Authentication failed",u?.setError(this.error))}catch(t){this.error=t.message||"An error occurred",u?.setError(this.error)}finally{this.loading=!1}},async handleOAuth(i){const{provider:o}=i.detail;this.loading=!0,this.error="";try{const e=await l.Auth.loginWithOAuth(o);e.error&&(this.error=e.error,this.querySelector("uix-auth-form")?.setError(this.error))}catch(e){this.error=e.message||"OAuth failed",this.querySelector("uix-auth-form")?.setError(this.error)}finally{this.loading=!1}},handleGuest(){this.onClose&&this.onClose()},render(){return this.isOpen?n\`
      <uix-modal
        .open=\${this.isOpen}
        @modal-close=\${()=>this.onClose?.()}
        @modal-cancel=\${()=>this.onClose?.()}
      >
        <div slot="header" class="flex justify-between items-center w-full">
          <h2 class="text-2xl font-black uppercase">Join MEETUP.RIO</h2>
        </div>
        <uix-auth-form
          .showTabs=\${!0}
          .showOAuth=\${!0}
          .showGuest=\${!0}
          .loading=\${this.loading}
          registerTitle="Join MEETUP.RIO"
          @auth-submit=\${this.handleAuthSubmit}
          @auth-oauth=\${this.handleOAuth}
          @auth-guest=\${this.handleGuest}
        ></uix-auth-form>
      </uix-modal>
    \`:null}};
`,mimeType:"text/javascript"},"/views/detail-sidebar.js":{content:`import i from"/$app/types/index.js";import n from"/$app.js";import{html as r}from"/npm/lit-html";import"./sidebar-quick-info.js";import"./sidebar-map-preview.js";export default{properties:{type:i.string({defaultValue:"guide"}),currentItem:i.object({attribute:!1}),tocItems:i.array({defaultValue:[]}),showToc:i.boolean({defaultValue:!1}),showQuickInfo:i.boolean({defaultValue:!0}),showMap:i.boolean({defaultValue:!0})},scrollToItem(e){const t=document.getElementById(e);t&&t.scrollIntoView({behavior:"smooth",block:"start"})},renderToc(){return!this.showToc||!this.tocItems?.length?null:r\`
      <div class="p-4">
        <h4 class="font-black uppercase text-sm mb-3">
          \${n.i18n?.t?.("guides.contents")||"Contents"}
        </h4>
        <ul class="space-y-2">
          \${this.tocItems.map((e,t)=>r\`
              <li>
                <a
                  href="#\${e.id}"
                  @click=\${s=>{s.preventDefault(),this.scrollToItem(e.id)}}
                  class="text-sm font-medium text-gray-700 hover:text-black flex items-start gap-2 transition-colors"
                >
                  <span
                    class="text-xs text-gray-400 font-bold mt-0.5 flex-shrink-0"
                    >\${t+1}.</span
                  >
                  <span class="line-clamp-2">\${e.title}</span>
                </a>
              </li>
            \`)}
        </ul>
      </div>
    \`},renderRelatedContent(){if(!this.currentItem)return null;const e=\`related.\${this.type==="guide"?"guides":this.type==="event"?"events":this.type==="place"?"places":"groups"}\`,t={guide:"Related Guides",event:"You Might Also Like",place:"Similar Places",group:"Similar Communities"};return r\`
      <view-related-content
        .currentItem=\${this.currentItem}
        type=\${this.type}
        .title=\${n.i18n?.t?.(e)||t[this.type]}
      ></view-related-content>
    \`},getStats(){const e=this.currentItem;if(!e)return[];const t=[];return e.viewCount&&t.push({icon:"\\u{1F441}\\uFE0F",value:e.viewCount,label:"views"}),e.rating&&t.push({icon:"\\u2B50",value:e.rating.toFixed(1),label:"rating"}),e.memberCount&&t.push({icon:"\\u{1F465}",value:e.memberCount,label:"members"}),e.attendees?.length&&t.push({icon:"\\u{1F3AB}",value:e.attendees.length,label:"going"}),e.price!==void 0&&this.type==="event"&&t.push({icon:"\\u{1F4B0}",value:e.price===0?"FREE":\`R$\${e.price}\`,label:"price"}),t},renderQuickInfo(){if(!this.showQuickInfo||!this.currentItem)return null;const e=this.currentItem;return r\`
      <view-sidebar-quick-info
        .category=\${e.category||e.categories?.[0]||""}
        .tags=\${e.tags||[]}
        .stats=\${this.getStats()}
        .location=\${e.address||e.venue||""}
      ></view-sidebar-quick-info>
    \`},renderMapPreview(){if(!this.showMap||!this.currentItem?.lat||!this.currentItem?.lng)return null;const e=this.currentItem;return r\`
      <view-sidebar-map-preview
        .lat=\${e.lat}
        .lng=\${e.lng}
        .address=\${e.address||e.venue||""}
      ></view-sidebar-map-preview>
    \`},renderDivider(){return r\`<div class="border-t border-gray-200 mx-4"></div>\`},render(){const e=this.showQuickInfo&&this.currentItem,t=this.showMap&&this.currentItem?.lat&&this.currentItem?.lng,s=this.showToc&&this.tocItems?.length>0,a=this.currentItem;return r\`
      <div class="bg-white border-3 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:sticky md:top-20 overflow-hidden">
        \${this.renderQuickInfo()}
        \${e&&t?this.renderDivider():null}
        \${this.renderMapPreview()}
        \${(e||t)&&s?this.renderDivider():null}
        \${this.renderToc()}
        \${(e||t||s)&&a?this.renderDivider():null}
        \${this.renderRelatedContent()}
      </div>
    \`}};
`,mimeType:"text/javascript"},"/$app/icon-lucide/lucide/share.svg":{content:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8m-4-6l-4-4l-4 4m4-4v13"/></svg>',mimeType:"image/svg+xml"},"/views/sidebar-quick-info.js":{content:`import s from"/$app/types/index.js";import n from"/$app.js";import{html as t}from"/npm/lit-html";import{CATEGORIES as o,getTagInfo as r}from"./utils.js";export default{properties:{category:s.string({defaultValue:""}),tags:s.array({defaultValue:[]}),stats:s.array({defaultValue:[]}),location:s.string({defaultValue:""})},render(){if(!(this.category||this.stats?.length>0||this.location||this.tags?.length>0))return null;const e=o[this.category];return t\`
      <div class="p-4">
        <!-- Category badge -->
        \${this.category&&e?t\`
          <div class="mb-3">
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-\${e.color} border-2 border-black rounded-lg font-black text-sm uppercase">
              \${e.icon} \${n.i18n?.t?.(\`categories.\${this.category}\`)||this.category}
            </span>
          </div>
        \`:null}

        <!-- Stats row -->
        \${this.stats?.length>0?t\`
          <div class="flex flex-wrap gap-3 mb-3 text-sm">
            \${this.stats.map(a=>t\`
              <div class="flex items-center gap-1">
                <span class="text-gray-400">\${a.icon}</span>
                <span class="font-bold">\${a.value}</span>
              </div>
            \`)}
          </div>
        \`:null}

        <!-- Location -->
        \${this.location?t\`
          <div class="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <span>\u{1F4CD}</span>
            <span class="font-medium line-clamp-1">\${this.location}</span>
          </div>
        \`:null}

        <!-- Tags -->
        \${this.tags?.length>0?t\`
          <div class="flex flex-wrap gap-1.5">
            \${this.tags.slice(0,4).map(a=>{const l=r(a);return t\`
                <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-\${l.color} border border-black rounded text-xs font-bold">
                  \${l.icon} \${l.label}
                </span>
              \`})}
          </div>
        \`:null}
      </div>
    \`}};
`,mimeType:"text/javascript"},"/views/sidebar-map-preview.js":{content:`import t from"/$app/types/index.js";import{html as r}from"/npm/lit-html";export default{properties:{lat:t.number(),lng:t.number(),address:t.string({defaultValue:""})},render(){if(!this.lat||!this.lng)return null;const e=\`https://www.google.com/maps?q=\${this.lat},\${this.lng}\`;return r\`
      <a href=\${e} target="_blank" rel="noopener noreferrer" class="block px-4 py-3">
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
    \`}};
`,mimeType:"text/javascript"},"/views/auth-modal.css":{content:`uix-modal::part(dialog){border:4px solid black;border-radius:1.5rem;box-shadow:8px 8px #ffffff80;max-width:28rem;padding:0;overflow:hidden}uix-modal::part(header){background:var(--color-primary);color:#000;border-bottom:3px solid black;padding:1.5rem}uix-modal::part(body){padding:0}
`,mimeType:"text/css"},"/views/related-content.js":{content:'import a from"/$app/types/index.js";import c from"/$app.js";import{html as l}from"/npm/lit-html";export default{properties:{currentItem:a.object({attribute:!1}),type:a.string({defaultValue:"place"}),title:a.string({defaultValue:""}),maxItems:a.number({defaultValue:4}),places:a.array({sync:c.Model.places,query:{}}),events:a.array({sync:c.Model.events,query:{}}),guides:a.array({sync:c.Model.guides,query:{}}),groups:a.array({sync:c.Model.groups,query:{}})},getCollection(){switch(this.type){case"place":return this.places||[];case"event":return this.events||[];case"guide":return this.guides||[];case"group":return this.groups||[];default:return[]}},calculateScore(r){if(!this.currentItem)return 0;let s=0;const e=this.currentItem.category||this.currentItem.categories?.[0],t=r.category||r.categories?.[0];e&&t&&e===t&&(s+=10);const o=this.currentItem.tags||[],i=r.tags||[],n=o.filter(u=>i.includes(u));return s+=n.length*5,r.recommended&&(s+=3),r.viewCount>=100&&(s+=2),s},getRelatedItems(){const r=this.getCollection(),s=this.currentItem?.id;return r.filter(t=>t.id!==s).map(t=>({item:t,score:this.calculateScore(t)})).filter(({score:t})=>t>0).sort((t,o)=>o.score-t.score).slice(0,this.maxItems).map(({item:t})=>t)},getRouteType(){return this.type==="guide"?"guide":this.type},render(){const r=this.getRelatedItems();if(r.length===0)return null;const s=this.title||c.i18n?.t?.(`related.${this.type}s`)||`Related ${this.type}s`;return l`\n      <div class="p-4">\n        <h3 class="text-sm font-black uppercase mb-3">${s}</h3>\n        <div class="space-y-1">\n          ${r.map(e=>l`\n            <div\n              class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"\n              @click=${()=>c.Router.go(`${this.getRouteType()}-detail`,{slug:e.slug})}\n            >\n              <div class="w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden border-2 border-black bg-gray-200">\n                <img src="${e.image||e.coverImage}" alt="${e.name||e.title}" class="w-full h-full object-cover" />\n              </div>\n              <div class="flex-1 min-w-0">\n                <div class="text-sm font-bold leading-tight line-clamp-1">${e.name||e.title}</div>\n                ${e.category?l`\n                  <div class="text-xs text-gray-500">${c.i18n?.t?.(`categories.${e.category}`)||e.category}</div>\n                `:null}\n              </div>\n              ${e.recommended?l`<span class="text-xs">\u2B50</span>`:null}\n            </div>\n          `)}\n        </div>\n      </div>\n    `}};\n',mimeType:"text/javascript"},"/views/guides-view.js":{content:`import a from"/$app/types/index.js";import r from"/$app.js";import{html as s}from"/npm/lit-html";import{NBS as d}from"./utils.js";const{brand:u}=r.settings;export default{dataQuery:!0,properties:{guides:a.array(),selectedType:a.string({defaultValue:"all"})},goToGuide(t){r.Router.go("guide-detail",{slug:t.slug})},getFilteredGuides(){let t=this.guides||[];return this.selectedType!=="all"&&(t=t.filter(l=>l.guideType===this.selectedType)),t},render(){if(!this.guides)return d.SPINNER;const t=this.guides.filter(e=>e.featured),l=this.getFilteredGuides();return s\`
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
          \${["all","article","list"].map(e=>s\`
              <button
                @click=\${()=>this.selectedType=e}
                class="px-4 py-2 border-2 border-black rounded-lg font-bold text-sm uppercase whitespace-nowrap
                \${this.selectedType===e?"bg-black text-white":"bg-white hover:bg-gray-100"}
                shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                \${e==="all"?"All":e==="article"?"Articles":"Curated Lists"}
              </button>
            \`)}
        </div>

        <!-- Featured Section -->
        \${t.length>0&&this.selectedType==="all"?s\`
              <div class="space-y-4">
                <div class="flex items-center gap-2">
                  <span
                    class="px-3 py-1 bg-yellow-300 border-2 border-black rounded-lg font-black text-sm uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-1"
                  >
                    Featured
                  </span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                  \${t.map(e=>s\`
                      <view-guide-card
                        .guide=\${e}
                        .featured=\${!0}
                        .onClick=\${i=>this.goToGuide(i)}
                      ></view-guide-card>
                    \`)}
                </div>
              </div>
            \`:null}

        <!-- All Guides Section -->
        \${l.length>0?s\`
              <div class="space-y-4">
                <h2 class="text-xl font-black uppercase text-black">
                  \${this.selectedType==="all"?"All Guides":this.selectedType==="article"?"Articles":"Curated Lists"}
                </h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  \${l.map(e=>s\`
                      <view-guide-card
                        .guide=\${e}
                        .onClick=\${i=>this.goToGuide(i)}
                      ></view-guide-card>
                    \`)}
                </div>
              </div>
            \`:null}

        <!-- Empty State -->
        \${l.length===0?s\`
              <uix-card shadow="lg" borderWidth="3" padding="lg" class="text-center">
                <div class="text-5xl mb-4">\u{1F4DA}</div>
                <h3 class="text-xl font-black uppercase mb-2">No Guides Yet</h3>
                <p class="text-gray-600 font-medium">
                  Check back soon for local insights and tips!
                </p>
              </uix-card>
            \`:null}
      </div>
    \`}};
`,mimeType:"text/javascript"},"/views/guide-card.js":{content:`import i from"/$app/types/index.js";import c from"/$app.js";import{html as l}from"/npm/lit-html";import{getCategoryColor as n}from"./utils.js";export default{properties:{guide:i.object(),featured:i.boolean({defaultValue:!1}),onClick:i.function({attribute:!1})},handleClick(){this.onClick&&this.onClick(this.guide)},render(){const e=this.guide;if(!e)return null;const s=e.guideType==="article",p=s?"Article":"Curated List",a=s?"bg-amber-300":"bg-emerald-300",r=s?"\\u{1F4DD}":"\\u{1F4CB}",d=e.recommended||e.viewCount>=100,o=e.tags?.length>0;return this.featured?l\`
        <uix-card
          shadow="lg"
          hover
          borderWidth="3"
          padding="none"
          class="cursor-pointer"
          @click=\${()=>this.handleClick()}
        >
          <div class="relative h-48 bg-gray-200">
            <img src="\${e.coverImage}" alt="\${e.title}" class="w-full h-full object-cover" />
            <div class="absolute top-3 left-3 flex gap-2">
              <span class="px-3 py-1 \${a} border-2 border-black rounded-lg font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                \${r} \${p}
              </span>
            </div>
            \${d?l\`
              <div class="absolute top-3 right-3">
                <view-recommended-badge
                  .recommended=\${e.recommended}
                  .viewCount=\${e.viewCount||0}
                ></view-recommended-badge>
              </div>
            \`:null}
          </div>
          <div class="p-4 space-y-3">
            <uix-link href="/guide/\${e.slug}" class="text-xl font-black uppercase leading-tight line-clamp-2">\${e.title}</uix-link>
            <p class="text-sm font-medium text-gray-600 line-clamp-2">\${e.description}</p>
            \${o?l\`
              <view-tags-display .tags=\${e.tags} .maxVisible=\${3}></view-tags-display>
            \`:null}
            <div class="flex items-center gap-2 flex-wrap">
              \${(e.categories||[]).map(t=>l\`
                <span class="px-2 py-1 \${n(t)} border-2 border-black rounded-lg font-bold text-xs uppercase">
                  \${c.i18n?.t?.(\`categories.\${t}\`)||t}
                </span>
              \`)}
              \${!s&&e.items?.length?l\`
                <span class="px-2 py-1 bg-gray-100 border-2 border-black rounded-lg font-bold text-xs">
                  \${e.items.length} places
                </span>
              \`:null}
            </div>
          </div>
        </uix-card>
      \`:l\`
      <uix-card
        shadow="md"
        hover
        borderWidth="3"
        padding="none"
        class="cursor-pointer flex flex-col h-full"
        @click=\${()=>this.handleClick()}
      >
        <div class="relative h-32 bg-gray-200 flex-shrink-0">
          <img src="\${e.coverImage}" alt="\${e.title}" class="w-full h-full object-cover" />
          <div class="absolute top-2 left-2">
            <span class="px-2 py-0.5 \${a} border-2 border-black rounded font-bold text-[10px] uppercase">
              \${r} \${s?"Article":"List"}
            </span>
          </div>
          \${d?l\`
            <div class="absolute top-2 right-2">
              <view-recommended-badge
                .recommended=\${e.recommended}
                .viewCount=\${e.viewCount||0}
              ></view-recommended-badge>
            </div>
          \`:null}
        </div>
        <div class="p-3 flex-1 flex flex-col">
          <uix-link href="/guide/\${e.slug}" class="text-sm font-black uppercase leading-tight mb-1 line-clamp-2">\${e.title}</uix-link>
          <p class="text-xs font-medium text-gray-500 line-clamp-2 flex-1">\${e.description}</p>
          \${o?l\`
            <div class="mt-2">
              <view-tags-display .tags=\${e.tags} .maxVisible=\${2}></view-tags-display>
            </div>
          \`:null}
          <div class="flex items-center gap-1 mt-2 flex-wrap">
            \${(e.categories||[]).slice(0,2).map(t=>l\`
              <span class="px-1.5 py-0.5 \${n(t)} border border-black rounded font-bold text-[9px] uppercase">
                \${c.i18n?.t?.(\`categories.\${t}\`)||t}
              </span>
            \`)}
            \${!s&&e.items?.length?l\`
              <span class="text-[10px] font-bold text-gray-500 ml-auto">
                \${e.items.length} places
              </span>
            \`:null}
          </div>
        </div>
      </uix-card>
    \`}};
`,mimeType:"text/javascript"},"/views/guide-detail-view.js":{content:`import o from"/$app/types/index.js";import a from"/$app.js";import{html as l}from"/npm/lit-html";import{getCategoryColor as p,NBS as m}from"./utils.js";import"./detail-hero.js";import"./detail-info-card.js";export default{dataQuery:!0,properties:{guide:o.object({attribute:!1}),linkedPlaces:o.array({defaultValue:[]}),linkedEvents:o.array({defaultValue:[]})},dataLoaded({row:e}){e?.title&&a.Router.setTitle(e.title)},async fetchLinkedItems(){const e=this.guide.items||[],t=e.filter(i=>i.type==="place"&&i.id).map(i=>i.id),r=e.filter(i=>i.type==="event"&&i.id).map(i=>i.id);if(t.length>0){const i=await a.Model.places.getAll();this.linkedPlaces=i.filter(s=>t.includes(s.id))}if(r.length>0){const i=await a.Model.events.getAll();this.linkedEvents=i.filter(s=>r.includes(s.id))}},getLinkedItem(e){return e.type==="place"?this.linkedPlaces.find(t=>t.id===e.id):this.linkedEvents.find(t=>t.id===e.id)},getTocItems(){const e=this.guide;if(!e)return[];if(e.guideType==="article"){const t=e.body||"",r=[];let i=0;return t.split(\`
\`).forEach(s=>{s.startsWith("## ")&&(r.push({id:\`section-\${i}\`,title:s.slice(3).trim(),level:2}),i++)}),r}else return(e.items||[]).map((t,r)=>({id:\`item-\${r}\`,title:t.note||\`Item \${r+1}\`,level:1}))},renderArticleBody(){const t=(this.guide.body||"").split(\`

\`);let r=0;return l\`
      <div class="prose prose-lg max-w-none space-y-4">
        \${t.map(i=>{const s=i.trim();if(s.startsWith("## ")){const c=\`section-\${r}\`;return r++,l\`<h2
              id=\${c}
              class="text-xl font-black uppercase mt-6 mb-3 text-black scroll-mt-20"
            >
              \${s.slice(3)}
            </h2>\`}if(s.startsWith("# "))return l\`<h1
              class="text-2xl font-black uppercase mt-6 mb-3 text-black"
            >
              \${s.slice(2)}
            </h1>\`;if(s.startsWith("- ")){const c=s.split(\`
\`).filter(d=>d.startsWith("- "));return l\`
              <ul class="list-disc list-inside space-y-1">
                \${c.map(d=>l\`<li class="text-gray-800 font-medium">
                      \${d.slice(2)}
                    </li>\`)}
              </ul>
            \`}if(s.match(/^\\d+\\./)){const c=s.split(\`
\`).filter(d=>d.match(/^\\d+\\./));return l\`
              <ol class="list-decimal list-inside space-y-1">
                \${c.map(d=>l\`<li class="text-gray-800 font-medium">
                      \${d.replace(/^\\d+\\.\\s*/,"")}
                    </li>\`)}
              </ol>
            \`}const n=s.replace(/\\*\\*([^*]+)\\*\\*/g,"<strong>$1</strong>");return l\`<p
            class="text-gray-800 font-medium leading-relaxed"
            .innerHTML=\${n}
          ></p>\`})}
      </div>
    \`},renderListItems(){const e=this.guide.items||[];return l\`
      <div class="space-y-4">
        \${e.map((t,r)=>{const i=this.getLinkedItem(t);return l\`
            <div
              id="item-\${r}"
              class="bg-gray-50 border-2 border-black rounded-xl p-4 flex gap-4 scroll-mt-20"
            >
              <div
                class="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-black text-lg"
              >
                \${r+1}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    class="px-2 py-0.5 \${t.type==="place"?"bg-blue-200":"bg-purple-200"} border border-black rounded font-bold text-xs uppercase"
                  >
                    \${t.type==="place"?"Place":"Event"}
                  </span>
                  \${i?l\`
                        <button
                          @click=\${()=>a.Router.go(t.type==="place"?"place-detail":"event-detail",{slug:i.slug})}
                          class="px-2 py-0.5 bg-black text-white rounded font-bold text-xs uppercase hover:bg-gray-800 transition-colors"
                        >
                          \${a.i18n?.t?.(\`guides.view\${t.type==="place"?"Place":"Event"}\`)||\`View \${t.type}\`}
                        </button>
                      \`:null}
                </div>
                \${i?l\`<h4 class="font-black text-sm mb-1">\${i.name}</h4>\`:null}
                \${t.note?l\`<p class="text-gray-700 font-medium text-sm">
                      \${t.note}
                    </p>\`:null}
              </div>
            </div>
          \`})}
      </div>
    \`},render(){const e=this.guide;if(!e)return m.SPINNER;const t=e.guideType==="article",r=t?"Article":"Curated List",i=t?"bg-amber-300":"bg-emerald-300",s=this.getTocItems();return l\`
      <div class="bg-purple-50 min-h-screen pb-20">
        <!-- Hero -->
        <view-detail-hero
          .image=\${e.coverImage}
          .title=\${e.title}
          .category=\${t?"Article":"List"}
          .categoryColor=\${i}
          .badges=\${(e.categories||[]).map(n=>({label:a.i18n?.t?.(\`categories.\${n}\`)||n,colorClass:p(n)}))}
          .recommended=\${e.recommended}
          .viewCount=\${e.viewCount||0}
        ></view-detail-hero>

        <!-- Content - Two Column Layout -->
        <div class="px-4 -mt-6 relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Main Content (2/3 width on desktop) -->
            <div class="md:col-span-2 space-y-6">
              <view-detail-info-card
                .tags=\${e.tags||[]}
                .headerContent=\${()=>l\`
                  <p class="text-gray-600 font-medium text-base mb-4">\${e.description}</p>
                \`}
                .afterDescription=\${e.publishedAt?()=>l\`
                      <div class="flex items-center gap-3 mt-4 pt-4 border-t-2 border-dashed border-gray-200">
                        <div class="w-10 h-10 bg-amber-200 border-2 border-black rounded-full flex items-center justify-center font-black">
                          \${t?"A":"L"}
                        </div>
                        <div>
                          <div class="text-xs font-bold text-gray-500 uppercase">Published</div>
                          <div class="font-bold text-sm">
                            \${new Date(e.publishedAt).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}
                          </div>
                        </div>
                      </div>
                    \`:null}
              ></view-detail-info-card>

              <!-- Body (Article) or Items (List) -->
              <uix-card shadow="lg" borderWidth="3" padding="lg">
                \${t?this.renderArticleBody():l\`
                      <h3
                        class="text-lg font-black uppercase mb-4 flex items-center gap-2"
                      >
                        \${a.i18n?.t?.("guides.placesInGuide")||"Places in this Guide"}
                        <span
                          class="bg-black text-white text-xs px-2 py-1 rounded-md"
                        >
                          \${e.items?.length||0}
                        </span>
                      </h3>
                      \${this.renderListItems()}
                    \`}
              </uix-card>
            </div>

            <!-- Sidebar (1/3 width on desktop) -->
            <div class="space-y-6">
              <view-detail-sidebar
                type="guide"
                .currentItem=\${e}
                .tocItems=\${s}
                .showToc=\${s.length>0}
              ></view-detail-sidebar>
            </div>
          </div>

          <div class="h-24"></div>
        </div>
      </div>
    \`}};
`,mimeType:"text/javascript"},"/views/events-view.js":{content:`import n from"/$app/types/index.js";import o from"/$app.js";import{html as r}from"/npm/lit-html";import{CATEGORIES as g,getCategoryColor as c,NBS as p,PLACE_CATEGORIES as u}from"./utils.js";const{brand:f}=o.settings,x=["all",...u];export default{properties:{events:n.array({sync:o.Model.events,query:{}}),selectedFilter:n.string({defaultValue:"upcoming"}),selectedCategory:n.string({defaultValue:"all"})},goToEvent(t){o.Router.go("event-detail",{slug:t.slug})},setCategory(t){this.selectedCategory=t},filterByCategory(t){return this.selectedCategory==="all"?t:t.filter(s=>s.category===this.selectedCategory)},getUpcomingEvents(){const t=new Date().toISOString().split("T")[0];return this.filterByCategory(this.events||[]).filter(a=>a.date>=t).sort((a,e)=>new Date(a.date).getTime()-new Date(e.date).getTime())},getThisWeekEvents(){const t=new Date,s=new Date(t);s.setDate(t.getDate()+7);const a=t.toISOString().split("T")[0],e=s.toISOString().split("T")[0];return this.filterByCategory(this.events||[]).filter(i=>i.date>=a&&i.date<=e).sort((i,d)=>new Date(i.date).getTime()-new Date(d.date).getTime())},getRecurringEvents(){return this.filterByCategory(this.events||[]).filter(s=>s.isRecurring)},formatDate(t){return new Date(t).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})},render(){if(!this.events)return p.SPINNER;const t=this.getUpcomingEvents(),s=this.getThisWeekEvents(),a=this.getRecurringEvents();return r\`
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
            class="text-xs font-bold text-teal-600 uppercase hover:underline hidden md:block"
          >
            Calendar View
          </uix-link>
        </div>

        <!-- Category Filters -->
        <div class="overflow-hidden -mx-4 sm:-mx-6">
          <div class="flex gap-2 overflow-x-auto pb-2 flex-nowrap px-4 sm:px-6">
            \${x.map(e=>{const l=this.selectedCategory===e,i=g[e]||{icon:"\\u{1F4CD}",color:"gray-200"};return r\`
                <button
                  @click=\${()=>this.setCategory(e)}
                  class="flex-shrink-0 px-3 py-1.5 border-2 border-black rounded-lg font-bold text-xs transition-all \${l?\`bg-\${i.color} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]\`:"bg-white hover:bg-gray-100"}"
                >
                  \${i.icon} \${o.i18n?.t?.(\`categories.\${e}\`)||e}
                </button>
              \`})}
          </div>
        </div>

        <!-- This Week Section -->
        \${s.length>0?r\`
              <div class="space-y-4">
                <div class="flex items-center gap-2">
                  <span
                    class="px-3 py-1 bg-teal-300 border-2 border-black rounded-lg font-black text-sm uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-1"
                  >
                    This Week
                  </span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  \${s.slice(0,6).map(e=>r\`
                      <uix-card
                        shadow="md"
                        hover
                        borderWidth="3"
                        padding="none"
                        class="cursor-pointer"
                        @click=\${()=>this.goToEvent(e)}
                      >
                        <div class="relative h-32 bg-gray-200">
                          <img
                            src="\${e.image}"
                            alt="\${e.name}"
                            class="w-full h-full object-cover"
                          />
                          <div class="absolute top-2 left-2">
                            <span
                              class="px-2 py-0.5 \${c(e.category)} border-2 border-black rounded font-bold text-[10px] uppercase"
                            >
                              \${e.category}
                            </span>
                          </div>
                          \${e.isRecurring?r\`
                                <div class="absolute top-2 right-2">
                                  <span
                                    class="px-2 py-0.5 bg-blue-200 border-2 border-black rounded font-bold text-[10px]"
                                  >
                                    Recurring
                                  </span>
                                </div>
                              \`:null}
                        </div>
                        <div class="p-3">
                          <div
                            class="text-xs font-bold text-teal-600 uppercase mb-1"
                          >
                            \${this.formatDate(e.date)}
                            \${e.time?\`at \${e.time}\`:""}
                          </div>
                          <uix-link
                            href="/event/\${e.slug}"
                            class="text-sm font-black uppercase leading-tight line-clamp-2"
                            >\${e.name}</uix-link
                          >
                          <div class="text-xs text-gray-500 font-medium mt-1">
                            \${e.venue}
                          </div>
                        </div>
                      </uix-card>
                    \`)}
                </div>
              </div>
            \`:null}

        <!-- Recurring Events Section -->
        \${a.length>0?r\`
              <div class="space-y-4">
                <h2 class="text-xl font-black uppercase text-black">
                  Weekly Events
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  \${a.map(e=>r\`
                      <uix-card
                        shadow="md"
                        hover
                        borderWidth="3"
                        padding="md"
                        class="cursor-pointer flex gap-4"
                        @click=\${()=>this.goToEvent(e)}
                      >
                        <div
                          class="w-20 h-20 bg-gray-200 border-2 border-black rounded-lg flex-shrink-0 bg-cover bg-center"
                          style="background-image: url('\${e.image}')"
                        ></div>
                        <div class="flex-1 min-w-0">
                          <div class="flex items-center gap-2 mb-1">
                            <span
                              class="px-2 py-0.5 \${c(e.category)} border border-black rounded font-bold text-[9px] uppercase"
                            >
                              \${e.category}
                            </span>
                            <span
                              class="px-2 py-0.5 bg-blue-200 border border-black rounded font-bold text-[9px]"
                            >
                              Weekly
                            </span>
                          </div>
                          <uix-link
                            href="/event/\${e.slug}"
                            class="text-sm font-black uppercase leading-tight line-clamp-1"
                            >\${e.name}</uix-link
                          >
                          <div class="text-xs text-gray-500 font-medium mt-1">
                            \${e.time} - \${e.venue}
                          </div>
                        </div>
                      </uix-card>
                    \`)}
                </div>
              </div>
            \`:null}

        <!-- All Upcoming Events -->
        \${t.length>0?r\`
              <div class="space-y-4">
                <h2 class="text-xl font-black uppercase text-black">
                  All Upcoming
                </h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  \${t.map(e=>r\`
                      <view-meetup-card-compact
                        .content=\${e}
                        type="event"
                        .onClick=\${l=>this.goToEvent(l)}
                      ></view-meetup-card-compact>
                    \`)}
                </div>
              </div>
            \`:null}

        <!-- Empty State -->
        \${this.events.length===0?r\`
              <uix-card shadow="lg" borderWidth="3" padding="lg" class="text-center">
                <div class="text-5xl mb-4">\u{1F4C5}</div>
                <h3 class="text-xl font-black uppercase mb-2">
                  No Events Yet
                </h3>
                <p class="text-gray-600 font-medium">
                  Check back soon for upcoming events in Rio!
                </p>
              </uix-card>
            \`:null}
      </div>
    \`}};
`,mimeType:"text/javascript"},"/views/event-detail-view.js":{content:`import a from"/$app/types/index.js";import t from"/$app.js";import{html as r}from"/npm/lit-html";import{getCategoryColor as o,isGuest as l,NBS as c}from"./utils.js";import"./detail-hero.js";import"./detail-info-card.js";export default{dataQuery:!0,properties:{event:a.object({attribute:!1}),userId:a.string({defaultValue:"guest"}),currentUser:a.object({sync:t.Model.users,query:e=>({id:e.userId,includes:["likedEvents","interestedEvents"]}),dependsOn:["userId"]}),showAuthPrompt:a.boolean({defaultValue:!1}),authPromptMessage:a.string({defaultValue:""}),showAuthModal:a.boolean({defaultValue:!1})},async connected(){this.userId=t.Auth.isAuthenticated?t.Auth.currentUserId:"guest",this.event?.id&&await t.Model.events.edit({id:this.event.id,viewCount:(this.event.viewCount||0)+1})},dataLoaded({row:e}){e?.name&&t.Router.setTitle(e.name)},isInterested(){return!this.currentUser||!this.event?!1:this.currentUser.interestedEvents?.some(e=>e.id===this.event.id)||!1},getRelatedMeetups(){return this.event?(this.meetups||[]).filter(e=>e.event===this.event.id):[]},async handleInterestToggle(){const e=this.event;!e||!this.currentUser||(this.isInterested()?this.currentUser.interestedEvents=this.currentUser.interestedEvents.filter(s=>s.id!==e.id):this.currentUser.interestedEvents=[...this.currentUser.interestedEvents,{id:e.id}],await t.Model.users.edit(this.currentUser))},async createMeetup(){if(l()){this.showAuthPrompt=!0,this.authPromptMessage="Create an account to host meetups!";return}const e=this.event,s={name:\`Meetup at \${e.name}\`,description:"Join me! I'm looking for a group to go with.",category:e.category,event:e.id,image:e.image,date:e.date,time:"19:00",venue:e.venue,attendees:[],createdAt:new Date().toISOString(),order:0};await t.Model.meetups.add(s),alert("Meetup Created! Others can now join you.")},render(){const e=this.event;if(!e)return c.SPINNER;const s=this.getRelatedMeetups(),u=t.Auth.user,n=this.isInterested(),d=e.price&&e.price>0?\`\${e.currency||"R$"} \${e.price}\`:"FREE";return r\`
      <div class="bg-purple-50 min-h-screen pb-20">
        <view-auth-modal
          .isOpen=\${this.showAuthModal}
          .onClose=\${()=>this.showAuthModal=!1}
          .onSuccess=\${()=>location.reload()}
        ></view-auth-modal>
        \${this.showAuthPrompt?r\`
              <div class="fixed bottom-20 left-4 right-4 z-40">
                <view-auth-prompt
                  .message=\${this.authPromptMessage}
                  .onLogin=\${()=>{this.showAuthPrompt=!1,this.showAuthModal=!0}}
                  .onDismiss=\${()=>this.showAuthPrompt=!1}
                ></view-auth-prompt>
              </div>
            \`:null}
        <!-- Hero -->
        <view-detail-hero
          .image=\${e.image}
          .title=\${e.name}
          .category=\${t.i18n.t(\`categories.\${e.category}\`)}
          .categoryColor=\${o(e.category)}
          .badges=\${e.isRecurring?[{label:"Recurring",colorClass:"bg-blue-200"}]:[]}
          .recommended=\${e.recommended}
          .viewCount=\${e.viewCount||0}
        ></view-detail-hero>

        <!-- Content - Two Column Layout -->
        <div class="px-4 -mt-6 relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Main Content (2/3 width on desktop) -->
            <div class="md:col-span-2 space-y-6">
              <view-detail-info-card
                .location=\${"\\u{1F4CD} "+(e.venue||"Rio de Janeiro")}
                .tags=\${e.tags||[]}
                .description=\${e.description}
                .beforeDescription=\${()=>r\`
                  <div
                    class="grid grid-cols-3 gap-0 border-3 border-black rounded-xl overflow-hidden bg-gray-50"
                  >
                    <div class="p-3 text-center border-r-3 border-black bg-white">
                      <div class="text-xs font-black text-gray-400 uppercase">DATE</div>
                      <div class="text-sm font-black text-black">
                        \${e.date?new Date(e.date).toLocaleDateString("en-US",{month:"short",day:"numeric"}).toUpperCase():"TBA"}
                      </div>
                    </div>
                    <div class="p-3 text-center border-r-3 border-black bg-white">
                      <div class="text-xs font-black text-gray-400 uppercase">TIME</div>
                      <div class="text-sm font-black text-black">\${e.time||"All Day"}</div>
                    </div>
                    <div class="p-3 text-center bg-white">
                      <div class="text-xs font-black text-gray-400 uppercase">PRICE</div>
                      <div class="text-sm font-black \${e.price===0?"text-green-600":"text-black"}">
                        \${d}
                      </div>
                    </div>
                  </div>
                \`}
                .afterDescription=\${e.ticketLink?()=>r\`
                      <div class="mt-6 pt-6 border-t-2 border-dashed border-gray-300">
                        <div class="flex items-center justify-between mb-3">
                          <span class="font-black text-sm uppercase">Tickets required</span>
                          <span class="font-bold text-sm bg-green-100 text-green-800 px-2 py-1 rounded border border-green-800">\${d}</span>
                        </div>
                      </div>
                    \`:null}
                .actions=\${[...e.ticketLink?[{label:"\\u{1F39F}\\uFE0F Buy Tickets",href:e.ticketLink,target:"_blank",variant:"success"}]:[],{label:n?"\\u2713 Interested":"Mark as Interested",onClick:()=>this.handleInterestToggle(),variant:n?"success":"primary"}]}
              ></view-detail-info-card>

              <!-- Community Meetups Section -->
              \${s.length>0?r\`
                    <div>
                      <div class="flex items-center justify-between mb-4">
                        <h3 class="text-xl font-black uppercase">
                          Community Meetups
                        </h3>
                        <span
                          class="bg-black text-white text-xs font-bold px-2 py-1 rounded-md"
                          >\${s.length}</span
                        >
                      </div>
                      <div class="space-y-4">
                        \${s.map(i=>r\`
                            <div
                              class="bg-white border-3 border-black rounded-xl p-4 flex gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:bg-gray-50"
                              @click=\${()=>t.Router.go("meetup-detail",{slug:i.slug})}
                            >
                              <div
                                class="w-16 h-16 bg-gray-200 border-2 border-black rounded-lg flex-shrink-0 bg-cover bg-center"
                                style="background-image: url('\${i.image}')"
                              ></div>
                              <div class="flex-1 min-w-0">
                                <h4 class="font-black text-sm truncate uppercase">
                                  \${i.name}
                                </h4>
                                <div class="text-xs font-bold text-gray-500 mb-2">
                                  \u{1F4C5} \${i.date} \u2022 \${i.time}
                                </div>
                                <div class="flex items-center gap-2">
                                  <div class="flex -space-x-2">
                                    \${i.attendees.map(()=>r\`<div
                                        class="w-6 h-6 rounded-full bg-gray-300 border border-black"
                                      ></div>\`)}
                                  </div>
                                  <span class="text-xs font-black text-gray-400"
                                    >\${i.attendees.length} going</span
                                  >
                                </div>
                              </div>
                            </div>
                          \`)}
                      </div>
                    </div>
                  \`:null}
            </div>

            <!-- Sidebar (1/3 width on desktop) -->
            <div class="space-y-6">
              <view-detail-sidebar
                type="event"
                .currentItem=\${e}
                .showToc=\${!1}
              ></view-detail-sidebar>
            </div>
          </div>

          <div class="h-24"></div>
        </div>
      </div>
    \`}};
`,mimeType:"text/javascript"},"/views/calendar-view.js":{content:`import l from"/$app/types/index.js";import{html as s}from"/npm/lit-html";import r from"/$app.js";import{CATEGORIES as i}from"./utils.js";export default{properties:{events:l.array({sync:r.Model.events,query:{}}),selectedCategory:l.string({defaultValue:"all"})},getFilteredEvents(){const e=(this.events||[]).map(t=>({...t,title:t.name}));return this.selectedCategory==="all"?e:e.filter(t=>t.category===this.selectedCategory)},handleCategoryChange(e){this.selectedCategory=e},handleEventClick(e){const t=e.detail.event;r.Router.go("event-detail",{id:t.recurrenceParentId||t.id})},render(){return s\`
      <div class="min-h-screen bg-surface pb-20">
        <div class="bg-white border-b-3 border-black px-6 py-4">
          <div class="flex items-center justify-between mb-4">
            <button
              @click=\${()=>r.Router.back()}
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
              \${Object.keys(i).filter(e=>e!=="groups").map(e=>s\`
                    <button
                      @click=\${()=>this.handleCategoryChange(e)}
                      class="px-4 py-1.5 border-2 border-black rounded-lg font-bold text-xs uppercase \${this.selectedCategory===e?"bg-accent":"bg-white"}"
                    >
                      \${e}
                    </button>
                  \`)}
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
    \`}};
`,mimeType:"text/javascript"},"/node_modules/@bootstrapp/uix/display/calendar.js":{content:`import d from"/$app/types/index.js";import{html as r}from"/npm/lit-html";const v=(e,t,n)=>{if(!e.isRecurring)return[];const s=[],a=new Date(t),i=new Date(n),h=e.recurrenceEndDate?new Date(e.recurrenceEndDate):new Date(a.getTime()+31536e6),u=new Date(e.date),m=(c,l,o)=>{switch(l.recurrencePattern){case"daily":return!0;case"weekly":return c.getDay()===o.getDay();case"monthly":return c.getDate()===o.getDate();case"custom":return l.recurrenceDays?.includes(c.getDay());default:return!1}},g=(c,l)=>{switch(l){case"daily":c.setDate(c.getDate()+1);break;case"weekly":c.setDate(c.getDate()+7);break;case"monthly":c.setMonth(c.getMonth()+1);break;case"custom":c.setDate(c.getDate()+1);break}};for(;a<=i&&a<=h;)m(a,e,u)&&s.push({...e,id:\`\${e.id}-\${a.toISOString().split("T")[0]}\`,date:a.toISOString().split("T")[0],recurrenceParentId:e.id,isRecurring:!1}),g(a,e.recurrencePattern);return s},y=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),w=e=>{const t=new Date,n=new Date(t.getTime()+6048e5);return e>=t&&e<=n},D=(e,t)=>{const n=new Date(e),s=new Date;s.setHours(0,0,0,0);const a=new Date(s);return a.setDate(a.getDate()+1),y(n,s)?"TODAY":y(n,a)?"TOMORROW":w(n)?n.toLocaleDateString(t,{weekday:"long"}).toUpperCase():n.toLocaleDateString(t,{month:"short",day:"numeric"}).toUpperCase()},$=e=>e.reduce((t,n)=>({...t,[n.date]:[...t[n.date]||[],n]}),{}),f=(e,t,n)=>{const s=[];return n.forEach(a=>{if(a.isRecurring)s.push(...v(a,e,t));else{const i=new Date(a.date);i>=e&&i<=t&&s.push(a)}}),s.sort((a,i)=>new Date(a.date)-new Date(i.date))},k=(e,t,n)=>new Date(t,e,1).toLocaleDateString(n,{month:"long",year:"numeric"}).toUpperCase(),b=(e,t,n)=>{const s=[],a=new Date(e,t,1),i=new Date(e,t+1,0),h=a.getDay(),u=i.getDate(),m=new Date;m.setHours(0,0,0,0);const g=n.reduce((l,o)=>({...l,[o.date]:[...l[o.date]||[],o]}),{});for(let l=h-1;l>=0;l--){const o=new Date(e,t,-l),p=o.toISOString().split("T")[0];s.push({date:o,day:o.getDate(),isCurrentMonth:!1,isToday:!1,events:g[p]||[]})}for(let l=1;l<=u;l++){const o=new Date(e,t,l),p=o.toISOString().split("T")[0];o.setHours(0,0,0,0),s.push({date:o,day:l,isCurrentMonth:!0,isToday:o.getTime()===m.getTime(),events:g[p]||[]})}const c=42-s.length;for(let l=1;l<=c;l++){const o=new Date(e,t+1,l),p=o.toISOString().split("T")[0];s.push({date:o,day:o.getDate(),isCurrentMonth:!1,isToday:!1,events:g[p]||[]})}return s};export default{tag:"uix-calendar",style:!0,shadow:!0,properties:{events:d.array({defaultValue:[]}),viewMode:d.string({defaultValue:"month",enum:["list","month"]}),currentMonth:d.number(new Date().getMonth()),currentYear:d.number(new Date().getFullYear()),selectedDate:d.string(""),showDayPanel:d.boolean(!1),showViewToggle:d.boolean(!0),showNavigation:d.boolean(!0),showTodayButton:d.boolean(!0),locale:d.string("en"),monthsAhead:d.number(3)},getEventsForCalendar(){const e=new Date,t=new Date(e);return t.setMonth(t.getMonth()+this.monthsAhead),f(e,t,this.events||[])},handleNav(e){e===-1?this.currentMonth===0?(this.currentMonth=11,this.currentYear--):this.currentMonth--:this.currentMonth===11?(this.currentMonth=0,this.currentYear++):this.currentMonth++,this.showDayPanel=!1,this.emit("month-change",{month:this.currentMonth,year:this.currentYear})},handleTodayClick(){const e=new Date;this.currentMonth=e.getMonth(),this.currentYear=e.getFullYear(),this.showDayPanel=!1},handleViewToggle(e){this.viewMode=e},handleDayClick(e){const t=e.date.toISOString().split("T")[0],n=e.events.length>0;this.selectedDate===t?this.showDayPanel=!this.showDayPanel&&n:(this.selectedDate=t,this.showDayPanel=n),this.emit("day-click",{date:t,events:e.events})},handleClosePanel(){this.showDayPanel=!1},handleEventClick(e,t){t?.stopPropagation(),this.emit("event-click",{event:e})},getEventsForSelectedDay(){return this.selectedDate?this.getEventsForCalendar().filter(e=>e.date===this.selectedDate):[]},render(){const e=this.getEventsForCalendar(),t=$(e);return r\`
      <style>
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      </style>

      <div class="calendar-container" part="container">
        \${this.showViewToggle?this.renderViewToggle():null}
        \${this.viewMode==="list"?this.renderListView(t):this.renderGridView(e)}
      </div>
    \`},renderViewToggle(){return r\`
      <div class="view-toggle" part="view-toggle">
        <button
          @click=\${()=>this.handleViewToggle("list")}
          class="toggle-btn \${this.viewMode==="list"?"active":""}"
          part="toggle-btn \${this.viewMode==="list"?"toggle-btn-active":""}"
        >
          List
        </button>
        <button
          @click=\${()=>this.handleViewToggle("month")}
          class="toggle-btn \${this.viewMode==="month"?"active":""}"
          part="toggle-btn \${this.viewMode==="month"?"toggle-btn-active":""}"
        >
          Month
        </button>
      </div>
    \`},renderListView(e){const t=Object.keys(e).sort();return t.length===0?r\`
        <div class="empty-state" part="empty">
          <div class="empty-icon">\u{1F4C5}</div>
          <p class="empty-text">No events scheduled</p>
        </div>
      \`:r\`
      <div class="list-view" part="list">
        \${t.map(n=>{const s=e[n],a=D(n,this.locale);return r\`
            <div class="list-section" part="list-section">
              <h2 class="list-section-title" part="list-section-title">\${a}</h2>
              <div class="list-items">
                \${s.map(i=>r\`
                    <div
                      @click=\${h=>this.handleEventClick(i,h)}
                      class="list-item"
                      part="list-item"
                      data-category="\${i.category||""}"
                    >
                      \${i.image?r\`<img
                            src="\${i.image}"
                            alt="\${i.title}"
                            class="list-item-image"
                            part="list-item-image"
                          />\`:null}
                      <div class="list-item-content" part="list-item-content">
                        <div class="list-item-header">
                          <h3 class="list-item-title" part="list-item-title">\${i.title}</h3>
                          \${i.recurrenceParentId?r\`<span class="recurring-badge" part="recurring-badge">\u{1F501}</span>\`:null}
                        </div>
                        <p class="list-item-meta" part="list-item-meta">
                          \${i.time||""} \${i.venue||i.address?\`\\u2022 \${i.venue||i.address}\`:""}
                        </p>
                        <slot name="list-item-extra" .event=\${i}></slot>
                      </div>
                    </div>
                  \`)}
              </div>
            </div>
          \`})}
      </div>
    \`},renderGridView(e){const t=b(this.currentYear,this.currentMonth,e),n=k(this.currentMonth,this.currentYear,this.locale),s=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return r\`
      <div class="grid-view" part="grid-view">
        \${this.showNavigation?r\`
          <div class="grid-header" part="header">
            <button
              @click=\${()=>this.handleNav(-1)}
              class="nav-btn"
              part="nav-btn nav-btn-prev"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <h2 class="month-label" part="month-label">\${n}</h2>
            <button
              @click=\${()=>this.handleNav(1)}
              class="nav-btn"
              part="nav-btn nav-btn-next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        \`:null}

        \${this.showTodayButton?r\`
          <button
            @click=\${this.handleTodayClick.bind(this)}
            class="today-btn"
            part="today-btn"
          >
            Jump to Today
          </button>
        \`:null}

        <div class="grid-container" part="grid">
          <div class="weekday-header" part="weekday-header">
            \${s.map(a=>r\`<div class="weekday" part="weekday">\${a}</div>\`)}
          </div>
          <div class="days-grid" part="days-grid">
            \${t.map(a=>{const i=this.selectedDate===a.date.toISOString().split("T")[0],h=a.events.length>0;return r\`
                <div
                  @click=\${()=>this.handleDayClick(a)}
                  class="day-cell \${a.isToday?"today":""} \${i?"selected":""} \${a.isCurrentMonth?"":"other-month"} \${h?"has-events":""}"
                  part="day \${a.isToday?"day-today":""} \${i?"day-selected":""} \${a.isCurrentMonth?"":"day-other-month"}"
                >
                  <span class="day-number" part="day-number">\${a.day}</span>
                  \${h?r\`
                        <div class="day-events" part="day-events">
                          \${a.events.slice(0,2).map(u=>r\`
                              <div
                                class="event-indicator"
                                part="event"
                                data-category="\${u.category||""}"
                              >
                                \${u.title.length>12?u.title.substring(0,12)+"...":u.title}
                              </div>
                            \`)}
                          \${a.events.length>2?r\`<div class="more-events" part="more-events">+\${a.events.length-2} more</div>\`:null}
                        </div>
                      \`:null}
                </div>
              \`})}
          </div>
        </div>

        \${this.showDayPanel?this.renderDayDetailPanel():null}
      </div>
    \`},renderDayDetailPanel(){const e=this.getEventsForSelectedDay(),n=new Date(this.selectedDate).toLocaleDateString(this.locale,{weekday:"long",month:"short",day:"numeric"}).toUpperCase();return r\`
      <div
        @click=\${this.handleClosePanel.bind(this)}
        class="panel-overlay"
        part="panel-overlay"
        style="animation: fadeIn 0.2s ease-out;"
      ></div>
      <div class="day-panel" part="panel" style="animation: slideUp 0.3s ease-out;">
        <div class="panel-header" part="panel-header">
          <h3 class="panel-title" part="panel-title">\${n}</h3>
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
          \${e.length===0?r\`<p class="panel-empty" part="panel-empty">No events on this day</p>\`:e.map(s=>r\`
                  <div
                    @click=\${a=>this.handleEventClick(s,a)}
                    class="panel-item"
                    part="panel-item"
                    data-category="\${s.category||""}"
                  >
                    \${s.image?r\`<img
                          src="\${s.image}"
                          alt="\${s.title}"
                          class="panel-item-image"
                          part="panel-item-image"
                        />\`:null}
                    <div class="panel-item-content" part="panel-item-content">
                      <div class="panel-item-header">
                        <h4 class="panel-item-title" part="panel-item-title">\${s.title}</h4>
                        \${s.recurrenceParentId?r\`<span class="recurring-badge" part="recurring-badge">\u{1F501}</span>\`:null}
                      </div>
                      <p class="panel-item-meta" part="panel-item-meta">
                        \${s.time||""} \${s.venue||s.address?\`\\u2022 \${s.venue||s.address}\`:""}
                      </p>
                    </div>
                  </div>
                \`)}
        </div>
      </div>
    \`}};
`,mimeType:"text/javascript"},"/node_modules/@bootstrapp/uix/display/calendar.css":{content:`:where(.uix-calendar,uix-calendar){display:block;--calendar-border-width: 2px;--calendar-border-color: black;--calendar-border-radius: .75rem;--calendar-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);--calendar-shadow-sm: 2px 2px 0px 0px rgba(0, 0, 0, 1);--calendar-today-bg: #fef3c7;--calendar-today-border: #eab308;--calendar-selected-bg: var(--color-accent, #f472b6);--calendar-font-family: inherit;&::part(view-toggle){display:flex;gap:.5rem;margin-bottom:1rem}&::part(toggle-btn){flex:1;padding:.5rem 1rem;font-weight:900;font-size:.875rem;text-transform:uppercase;border:3px solid var(--calendar-border-color);border-radius:var(--calendar-border-radius);background:#fff;box-shadow:3px 3px #000;cursor:pointer;transition:all .15s ease;&:active{transform:translate(2px,2px);box-shadow:1px 1px #000}}&::part(toggle-btn-active){background:var(--calendar-selected-bg)}&::part(header){display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem}&::part(nav-btn){width:2.5rem;height:2.5rem;display:flex;align-items:center;justify-content:center;background:#fff;border:3px solid var(--calendar-border-color);border-radius:.5rem;box-shadow:var(--calendar-shadow);cursor:pointer;transition:all .15s ease;&:active{transform:translate(2px,2px);box-shadow:var(--calendar-shadow-sm)}}&::part(month-label){font-size:1.125rem;font-weight:900;text-transform:uppercase}&::part(today-btn){width:100%;margin-bottom:1rem;padding:.5rem 1rem;background:#f9a8d4;border:3px solid var(--calendar-border-color);border-radius:var(--calendar-border-radius);font-weight:900;font-size:.875rem;text-transform:uppercase;box-shadow:var(--calendar-shadow);cursor:pointer;transition:all .15s ease;&:active{transform:translate(2px,2px);box-shadow:var(--calendar-shadow-sm)}}&::part(grid){background:#fff;border:3px solid var(--calendar-border-color);border-radius:var(--calendar-border-radius);padding:.75rem;box-shadow:6px 6px #000}&::part(weekday-header){display:grid;grid-template-columns:repeat(7,1fr);gap:.25rem;margin-bottom:.5rem}&::part(weekday){text-align:center;font-weight:900;font-size:.75rem;color:#4b5563}&::part(days-grid){display:grid;grid-template-columns:repeat(7,1fr);gap:.25rem}&::part(day){aspect-ratio:1;position:relative;display:flex;flex-direction:column;align-items:flex-start;padding:.25rem;border-radius:.5rem;border:2px solid #d1d5db;cursor:pointer;overflow:hidden;transition:all .15s ease;&:active{transform:translate(1px,1px)}}&::part(day-today){background:var(--calendar-today-bg);border-color:var(--calendar-today-border);border-width:3px}&::part(day-selected){background:var(--calendar-selected-bg);border-color:var(--calendar-border-color);border-width:3px;box-shadow:var(--calendar-shadow-sm)}&::part(day-other-month){opacity:.4}&::part(day-number){font-size:.75rem;font-weight:700;margin-bottom:.125rem}&::part(day-events){width:100%;display:flex;flex-direction:column;gap:.125rem}&::part(event){font-size:9px;line-height:1.1;font-weight:700;padding:.125rem .25rem;border-radius:.25rem;border:1px solid var(--calendar-border-color);background:#e0e7ff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}&::part(more-events){font-size:8px;font-weight:700;color:#4b5563;padding:0 .25rem}&::part(list){display:flex;flex-direction:column;gap:1.5rem}&::part(list-section-title){font-size:.875rem;font-weight:900;text-transform:uppercase;color:#4b5563;margin-bottom:.75rem}&::part(list-item){display:flex;gap:1rem;background:#fff;border:3px solid var(--calendar-border-color);border-radius:var(--calendar-border-radius);padding:1rem;box-shadow:var(--calendar-shadow);cursor:pointer;transition:all .15s ease;&:hover{transform:translate(2px,2px);box-shadow:var(--calendar-shadow-sm)}}&::part(list-item-image){width:5rem;height:5rem;object-fit:cover;border-radius:.5rem;border:2px solid var(--calendar-border-color)}&::part(list-item-title){font-weight:900;font-size:.875rem;line-height:1.25}&::part(list-item-meta){font-size:.75rem;color:#4b5563;margin-top:.25rem}&::part(recurring-badge){flex-shrink:0;font-size:.75rem;font-weight:700;background:#ddd6fe;border:1px solid var(--calendar-border-color);padding:.125rem .5rem;border-radius:.25rem}&::part(panel-overlay){position:fixed;inset:0;background:#00000080;z-index:40}&::part(panel){position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:3px solid var(--calendar-border-color);border-radius:1rem 1rem 0 0;z-index:50;max-height:70vh;overflow-y:auto}&::part(panel-header){position:sticky;top:0;background:#fff;border-bottom:2px solid var(--calendar-border-color);padding:1rem 1.5rem;display:flex;align-items:center;justify-content:space-between}&::part(panel-title){font-weight:900;font-size:1.125rem}&::part(panel-close){width:2rem;height:2rem;display:flex;align-items:center;justify-content:center;border:2px solid var(--calendar-border-color);border-radius:.5rem;background:#fff;cursor:pointer;&:hover{background:#f3f4f6}}&::part(panel-content){padding:1rem 1.5rem;display:flex;flex-direction:column;gap:.75rem}&::part(panel-item){display:flex;gap:.75rem;background:#f9fafb;border:2px solid var(--calendar-border-color);border-radius:var(--calendar-border-radius);padding:.75rem;cursor:pointer;box-shadow:3px 3px #000;transition:all .15s ease;&:hover{transform:translate(2px,2px);box-shadow:none}}&::part(panel-item-image){width:4rem;height:4rem;object-fit:cover;border-radius:.5rem;border:2px solid var(--calendar-border-color)}&::part(panel-item-title){font-weight:700;font-size:.875rem;line-height:1.25}&::part(panel-item-meta){font-size:.75rem;color:#4b5563;margin-top:.25rem}&::part(panel-empty){text-align:center;font-size:.875rem;font-weight:700;color:#9ca3af;padding:2rem 0}&::part(empty){display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5rem 0;.empty-icon{font-size:3.75rem;margin-bottom:1rem}.empty-text{font-size:1.125rem;font-weight:700;color:#9ca3af}}}
`,mimeType:"text/css"},"/views/global-search.js":{content:`import n from"/$app/types/index.js";import r from"/$app.js";import{html as l}from"/npm/lit-html";import{ALL_TAGS as u}from"./utils.js";export default{properties:{query:n.string({defaultValue:""}),isOpen:n.boolean({defaultValue:!1}),selectedTags:n.array({defaultValue:[]}),places:n.array({sync:r.Model.places,query:{}}),events:n.array({sync:r.Model.events,query:{}}),guides:n.array({sync:r.Model.guides,query:{}}),groups:n.array({sync:r.Model.groups,query:{}})},handleInputChange(e){this.query=e.target.value,this.isOpen=this.query.length>0||this.selectedTags.length>0},handleFocus(){this.isOpen=!0},handleBlur(){setTimeout(()=>{this.isOpen=!1},200)},toggleTag(e){this.selectedTags.includes(e)?this.selectedTags=this.selectedTags.filter(t=>t!==e):this.selectedTags=[...this.selectedTags,e],this.isOpen=!0},clearSearch(){this.query="",this.selectedTags=[],this.isOpen=!1},getFilteredResults(){const e=this.query.toLowerCase().trim(),t=this.selectedTags,o=a=>e?a.name?.toLowerCase().includes(e)||a.title?.toLowerCase().includes(e)||a.description?.toLowerCase().includes(e):!0,s=a=>t.length===0?!0:t.some(c=>a.tags?.includes(c)),i=a=>(a||[]).filter(c=>o(c)&&s(c));return{places:i(this.places).slice(0,3),events:i(this.events).slice(0,3),guides:i(this.guides).slice(0,3),groups:i(this.groups).slice(0,3)}},navigateTo(e,t){this.clearSearch(),r.Router.go(\`\${e}-detail\`,{slug:t})},renderResultItem(e,t){const o=e.name||e.title;return l\`
      <button
        class="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-3 border-b border-gray-200 last:border-0"
        @click=\${()=>this.navigateTo(t,e.slug)}
      >
        <span class="text-lg">\${t==="place"?"\\u{1F4CD}":t==="event"?"\\u{1F4C5}":t==="guide"?"\\u{1F4D6}":"\\u{1F465}"}</span>
        <div class="flex-1 min-w-0">
          <div class="font-bold text-sm truncate">\${o}</div>
          <div class="text-xs text-gray-500 truncate">\${e.description?.substring(0,50)}...</div>
        </div>
        \${e.recommended?l\`<span class="text-yellow-500">\u2B50</span>\`:null}
      </button>
    \`},render(){const e=this.getFilteredResults(),t=e.places.length>0||e.events.length>0||e.guides.length>0||e.groups.length>0,o=this.query.length>0||this.selectedTags.length>0;return l\`
      <div class="relative">
        <!-- Search Input -->
        <div class="relative">
          <input
            type="text"
            .value=\${this.query}
            @input=\${s=>this.handleInputChange(s)}
            @focus=\${()=>this.handleFocus()}
            @blur=\${()=>this.handleBlur()}
            placeholder=\${r.i18n?.t?.("search.placeholder")||"Search places, events, guides..."}
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
          \${o?l\`
            <button
              @click=\${()=>this.clearSearch()}
              class="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          \`:null}
        </div>

        <!-- Tag Filters -->
        <div class="overflow-hidden -mx-4 sm:mx-0">
          <div class="flex gap-2 mt-3 overflow-x-auto pb-2 flex-nowrap px-4 sm:px-0 max-w-100vw scrollbar-hide">
          \${Object.entries(u).slice(0,6).map(([s,i])=>{const a=this.selectedTags.includes(s);return l\`
              <button
                @click=\${()=>this.toggleTag(s)}
                class="flex-shrink-0 px-3 py-1.5 border-2 border-black rounded-lg font-bold text-xs transition-all \${a?\`bg-\${i.color} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]\`:"bg-white hover:bg-gray-100"}"
              >
                \${i.icon} \${i.label}
              </button>
            \`})}
          </div>
        </div>

        <!-- Results Dropdown -->
        \${this.isOpen&&o?l\`
          <div class="absolute top-full left-0 right-0 mt-2 bg-white border-3 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden z-50 max-h-96 overflow-y-auto">
            \${t?l\`
              \${e.places.length>0?l\`
                <div class="px-4 py-2 bg-gray-100 font-black text-xs uppercase text-gray-600">
                  \${r.i18n?.t?.("search.places")||"Places"}
                </div>
                \${e.places.map(s=>this.renderResultItem(s,"place"))}
              \`:null}
              \${e.events.length>0?l\`
                <div class="px-4 py-2 bg-gray-100 font-black text-xs uppercase text-gray-600">
                  \${r.i18n?.t?.("search.events")||"Events"}
                </div>
                \${e.events.map(s=>this.renderResultItem(s,"event"))}
              \`:null}
              \${e.guides.length>0?l\`
                <div class="px-4 py-2 bg-gray-100 font-black text-xs uppercase text-gray-600">
                  \${r.i18n?.t?.("search.guides")||"Guides"}
                </div>
                \${e.guides.map(s=>this.renderResultItem(s,"guide"))}
              \`:null}
              \${e.groups.length>0?l\`
                <div class="px-4 py-2 bg-gray-100 font-black text-xs uppercase text-gray-600">
                  \${r.i18n?.t?.("search.groups")||"Groups"}
                </div>
                \${e.groups.map(s=>this.renderResultItem(s,"group"))}
              \`:null}
            \`:l\`
              <div class="p-6 text-center">
                <div class="text-2xl mb-2">\u{1F50D}</div>
                <div class="font-bold text-gray-500">\${r.i18n?.t?.("search.noResults")||"No results found"}</div>
              </div>
            \`}
          </div>
        \`:null}
      </div>
    \`}};
`,mimeType:"text/javascript"},"/views/story-circle.js":{content:`import t from"/$app/types/index.js";import{html as e}from"/npm/lit-html";export default{properties:{content:t.object({attribute:!1}),onClick:t.function({attribute:!1})},render(){return this.content?e\`
      <div
        class="flex flex-col items-center gap-1 cursor-pointer group min-w-[72px]"
        @click=\${()=>this.onClick&&this.onClick(this.content)}
      >
        <uix-avatar
          src="\${this.content.image}"
          name="\${this.content.name}"
          size="lg"
          class="nbs-story group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none transition-all"
        ></uix-avatar>
        <uix-link href="/event/\${this.content.slug}" class="text-xs font-black uppercase text-center max-w-[80px] truncate leading-tight">
          \${this.content.name}
        </uix-link>
      </div>
    \`:null}};
`,mimeType:"text/javascript"},"/views/meetup-card-compact.js":{content:`import e from"/$app/types/index.js";import{html as o}from"/npm/lit-html";import i from"/$app.js";import{CATEGORIES as d,getCategoryColor as p}from"./utils.js";export default{style:!0,properties:{content:e.object({attribute:!1}),onClick:e.function({attribute:!1}),type:e.string({defaultValue:""}),showTags:e.boolean({defaultValue:!0}),showBadge:e.boolean({defaultValue:!0})},getCategoryEmoji(){return d[this.content?.category]?.icon||"\\u{1F4CD}"},handleCardClick(t){t.target.closest(".join-button")||this.onClick&&this.onClick(this.content)},handleJoinClick(t){t.stopPropagation()},render(){if(!this.content)return null;const{showTags:t,showBadge:s}=this,a=this.content.joined,r=t&&this.content.tags?.length>0,c=s&&(this.content.recommended||this.content.viewCount>=100),l=\`join-button w-full py-2 px-4 border-2 border-black rounded-lg font-black uppercase text-xs transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] \${a?"bg-primary text-black hover:bg-primary-dark":"bg-accent text-black hover:bg-accent"}\`;return o\`
      <uix-card
        class="meetup-card-compact"
        shadow="md"
        hover
        borderWidth="3"
        padding="none"
        @click=\${n=>this.handleCardClick(n)}
      >
        <div slot="header" class="relative w-full h-48 bg-gray-100"
          style="background-image: url(\${this.content.image}); background-size: cover; background-position: center;"
        >
          \${c?o\`
            <div class="absolute top-2 right-2">
              <view-recommended-badge
                .recommended=\${this.content.recommended}
                .viewCount=\${this.content.viewCount||0}
              ></view-recommended-badge>
            </div>
          \`:null}
        </div>
        <div class="p-3 space-y-2 flex-1 flex flex-col">
          <div>
            <div class="inline-flex items-center gap-1 px-2 py-1 \${p(this.content.category)} border-2 border-black rounded-lg font-black text-xs uppercase text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              \${this.getCategoryEmoji()} \${i.i18n.t(\`categories.\${this.content.category}\`)}
            </div>
          </div>
          <uix-link href="/\${this.type||this.content._type||"place"}/\${this.content.slug}" class="text-lg font-black leading-tight line-clamp-2 uppercase">\${this.content.name}</uix-link>
          \${r?o\`
            <view-tags-display .tags=\${this.content.tags} .maxVisible=\${2}></view-tags-display>
          \`:null}
          <div class="flex-1"></div>
        </div>
        <div slot="footer" class="p-3 pt-0">
          <button class="\${l}" @click=\${n=>this.handleJoinClick(n)}>
            \${a?o\`\u2713 \${i.i18n.t("actions.joined")}\`:o\`\u2764\uFE0F \${i.i18n.t("actions.join")}\`}
          </button>
        </div>
      </uix-card>
    \`}};
`,mimeType:"text/javascript"},"/views/meetup-card-compact.css":{content:`.meetup-card-compact.uix-card{cursor:pointer;height:100%;background:#fff;border-color:var(--card-border-color, black);border-radius:1rem}.meetup-card-compact.uix-card>[slot=header]{border-bottom:3px solid var(--card-border-color, black);padding:0}.meetup-card-compact.uix-card>[slot=footer]{justify-content:stretch}.meetup-card-compact.uix-card>[slot=footer]>button{width:100%}
`,mimeType:"text/css"},"/views/place-detail-view.js":{content:`import i from"/$app/types/index.js";import t from"/$app.js";import{html as r}from"/npm/lit-html";import{getCategoryColor as d,isGuest as l,NBS as c}from"./utils.js";import"./detail-hero.js";import"./detail-info-card.js";import"./detail-sidebar.js";export default{dataQuery:!0,properties:{place:i.object(),userId:i.string({defaultValue:"guest"}),currentUser:i.object({sync:t.Model.users,query:e=>({id:e.userId,includes:["likedPlaces"]}),dependsOn:["userId"]}),showAuthPrompt:i.boolean({defaultValue:!1}),authPromptMessage:i.string({defaultValue:""}),showAuthModal:i.boolean({defaultValue:!1})},async connected(){this.userId=t.Auth.isAuthenticated?t.Auth.currentUserId:"guest",this.place?.id&&await t.Model.places.edit({id:this.place.id,viewCount:(this.place.viewCount||0)+1})},dataLoaded({row:e}){e?.name&&t.Router.setTitle(e.name)},isLiked(){return!this.currentUser||!this.place?!1:this.currentUser.likedPlaces.some(e=>e===this.place.id||e.id===this.place.id)},getRelatedMeetups(){return this.place?(this.meetups||[]).filter(e=>e.place===this.place.id):[]},async handleLikeToggle(){const e=this.place;!e||!this.currentUser||(this.isLiked()?this.currentUser.likedPlaces=this.currentUser.likedPlaces.filter(s=>s!==e.id&&s.id!==e.id):this.currentUser.likedPlaces.push(e.id),await t.Model.users.edit(this.currentUser))},async createMeetup(){if(l()){this.showAuthPrompt=!0,this.authPromptMessage="Create an account to host meetups!";return}const e=this.place,s={name:\`Meetup at \${e.name}\`,description:"Join me! I'm looking for a group to go with.",category:e.category,place:e.id,image:e.image,date:new Date().toISOString().split("T")[0],time:"19:00",venue:e.address,attendees:[],createdAt:new Date().toISOString(),order:0};await t.Model.meetups.add(s),alert("Meetup Created! Others can now join you.")},render(){const e=this.place;if(!e)return c.SPINNER;const s=this.getRelatedMeetups(),o=this.isLiked();return r\`
      <div class="bg-purple-50 min-h-screen pb-20">
        <view-auth-modal
          .isOpen=\${this.showAuthModal}
          .onClose=\${()=>this.showAuthModal=!1}
          .onSuccess=\${()=>location.reload()}
        ></view-auth-modal>
        \${this.showAuthPrompt?r\`
          <div class="fixed bottom-20 left-4 right-4 z-40">
            <view-auth-prompt
              .message=\${this.authPromptMessage}
              .onLogin=\${()=>{this.showAuthPrompt=!1,this.showAuthModal=!0}}
              .onDismiss=\${()=>this.showAuthPrompt=!1}
            ></view-auth-prompt>
          </div>
        \`:null}
        <!-- Hero -->
        <view-detail-hero
          .image=\${e.image}
          .title=\${e.name}
          .category=\${t.i18n.t(\`categories.\${e.category}\`)}
          .categoryColor=\${d(e.category)}
          .recommended=\${e.recommended}
          .viewCount=\${e.viewCount||0}
        ></view-detail-hero>

        <!-- 2-Column Grid -->
        <div class="px-4 -mt-6 relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Main Content (2/3) -->
            <div class="md:col-span-2 space-y-6">
              <view-detail-info-card
                .location=\${"\\u{1F4CD} "+(e.address||"Rio de Janeiro")}
                .tags=\${e.tags||[]}
                .description=\${e.description}
                .actions=\${[...e.whatsappLink?[{label:"\\u{1F4AC} WhatsApp",href:e.whatsappLink,target:"_blank",variant:"success"}]:[],{label:o?"\\u2764\\uFE0F Saved":"\\u{1F90D} Save Place",onClick:()=>this.handleLikeToggle(),variant:o?"danger":"primary"}]}
              ></view-detail-info-card>
              <div class="mt-2">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-xl font-black uppercase">Community Meetups</h3>
                  <span class="bg-black text-white text-xs font-bold px-2 py-1 rounded-md">\${s.length}</span>
                </div>
                <div class="space-y-4">
                  \${s.length>0?s.map(a=>r\`
                      <div class="bg-white border-3 border-black rounded-xl p-4 flex gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:bg-gray-50" @click=\${()=>t.Router.go("meetup-detail",{slug:a.slug})}>
                        <div class="w-16 h-16 bg-gray-200 border-2 border-black rounded-lg flex-shrink-0 bg-cover bg-center" style="background-image: url('\${a.image}')"></div>
                        <div class="flex-1 min-w-0">
                          <h4 class="font-black text-sm truncate uppercase">\${a.name}</h4>
                          <div class="text-xs font-bold text-gray-500 mb-2">\u{1F4C5} \${a.date} \u2022 \${a.time}</div>
                          <div class="flex items-center gap-2">
                            <div class="flex -space-x-2">
                              \${a.attendees.map(()=>r\`<div class="w-6 h-6 rounded-full bg-gray-300 border border-black"></div>\`)}
                            </div>
                            <span class="text-xs font-black text-gray-400">\${a.attendees.length} going</span>
                          </div>
                        </div>
                      </div>
                    \`):r\`
                      <div class="bg-yellow-50 border-3 border-black border-dashed rounded-xl p-6 text-center">
                        <div class="text-4xl mb-2">\u{1F997}</div>
                        <p class="font-bold text-sm text-gray-600 mb-3">No community meetups yet.</p>
                        <p class="text-xs text-gray-500">Be the first to create a meetup at this place!</p>
                      </div>
                    \`}
                  <button @click=\${()=>this.createMeetup()} class="w-full py-4 bg-white border-3 border-black rounded-xl font-black uppercase flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <span class="text-xl">+</span> Create a Meetup
                  </button>
                </div>
              </div>
            </div>

            <!-- Sidebar (1/3) -->
            <div class="space-y-4 self-start">
              <view-detail-sidebar
                type="place"
                .currentItem=\${e}
                .showToc=\${!1}
                .showQuickInfo=\${!0}
                .showMap=\${!0}
              ></view-detail-sidebar>
            </div>
          </div>
          <div class="h-24"></div>
        </div>
      </div>
    \`}};
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
`,mimeType:"application/javascript"},"/lit-html/directives/keyed.js":{content:`import"/lit-html@3.3.1/es2022/directive-helpers.mjs";import"/lit-html@3.3.1/es2022/directive.mjs";import"/lit-html@3.3.1/es2022/lit-html.mjs";export*from"/lit-html@3.3.1/es2022/directives/keyed.mjs";
`,mimeType:"application/javascript"},"/lit-html/static.js":{content:`import"/lit-html@3.3.1/es2022/lit-html.mjs";export*from"/lit-html@3.3.1/es2022/static.mjs";
`,mimeType:"application/javascript"},"/lit-html@3.3.1/es2022/directive.mjs":{content:`var i={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},s=t=>(...e)=>({_$litDirective$:t,values:e}),T=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};export{T as Directive,i as PartType,s as directive};/*! Bundled license information:

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
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
`,mimeType:"application/javascript"},"/lit-html@3.3.1/es2022/directive-helpers.mjs":{content:`import{_$LH as n}from"./lit-html.mjs";var{I:m}=n,v=e=>e===null||typeof e!="object"&&typeof e!="function",p={HTML:1,SVG:2,MATHML:3},d=(e,t)=>t===void 0?e?._$litType$!==void 0:e?._$litType$===t,u=e=>e?._$litType$?.h!=null,f=e=>e?._$litDirective$!==void 0,c=e=>e?._$litDirective$,T=e=>e.strings===void 0,_=()=>document.createComment(""),P=(e,t,i)=>{let a=e._$AA.parentNode,l=t===void 0?e._$AB:t._$AA;if(i===void 0){let r=a.insertBefore(_(),l),$=a.insertBefore(_(),l);i=new m(r,$,e,e.options)}else{let r=i._$AB.nextSibling,$=i._$AM,o=$!==e;if(o){let s;i._$AQ?.(e),i._$AM=e,i._$AP!==void 0&&(s=e._$AU)!==$._$AU&&i._$AP(s)}if(r!==l||o){let s=i._$AA;for(;s!==r;){let A=s.nextSibling;a.insertBefore(s,l),s=A}}}return i},g=(e,t,i=e)=>(e._$AI(t,i),e),y={},C=(e,t=y)=>e._$AH=t,R=e=>e._$AH,B=e=>{e._$AR(),e._$AA.remove()},H=e=>{e._$AR()};export{p as TemplateResultType,H as clearPart,R as getCommittedValue,c as getDirectiveClass,P as insertPart,u as isCompiledTemplateResult,f as isDirectiveResult,v as isPrimitive,T as isSingleExpression,d as isTemplateResult,B as removePart,g as setChildPartValue,C as setCommittedValue};/*! Bundled license information:

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
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
`,mimeType:"application/javascript"},"/style.css":{content:`@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--un-bg-opacity:100%;--un-ring-opacity:100%;--un-border-opacity:100%;--un-text-opacity:100%;--un-translate-x:initial;--un-translate-y:initial;--un-translate-z:initial;--un-space-y-reverse:initial;--un-divide-x-reverse:initial;--un-border-style:solid;--un-divide-opacity:100%;--un-leading:initial;--un-from-opacity:100%;--un-to-opacity:100%}}@property --un-text-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}@property --un-leading{syntax:"*";inherits:false;}@property --un-border-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}@property --un-bg-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}@property --un-ring-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}@property --un-inset-ring-color{syntax:"*";inherits:false;}@property --un-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000;}@property --un-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000;}@property --un-inset-shadow-color{syntax:"*";inherits:false;}@property --un-ring-color{syntax:"*";inherits:false;}@property --un-ring-inset{syntax:"*";inherits:false;}@property --un-ring-offset-color{syntax:"*";inherits:false;}@property --un-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000;}@property --un-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0px;}@property --un-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000;}@property --un-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000;}@property --un-shadow-color{syntax:"*";inherits:false;}@property --un-translate-x{syntax:"*";inherits:false;initial-value:0;}@property --un-translate-y{syntax:"*";inherits:false;initial-value:0;}@property --un-translate-z{syntax:"*";inherits:false;initial-value:0;}@property --un-from-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}@property --un-gradient-from{syntax:"<color>";inherits:false;initial-value:#0000;}@property --un-gradient-from-position{syntax:"<length-percentage>";inherits:false;initial-value:0%;}@property --un-gradient-position{syntax:"*";inherits:false;}@property --un-gradient-stops{syntax:"*";inherits:false;}@property --un-gradient-to{syntax:"<color>";inherits:false;initial-value:#0000;}@property --un-gradient-to-position{syntax:"<length-percentage>";inherits:false;initial-value:100%;}@property --un-gradient-via{syntax:"<color>";inherits:false;initial-value:#0000;}@property --un-gradient-via-position{syntax:"<length-percentage>";inherits:false;initial-value:50%;}@property --un-gradient-via-stops{syntax:"*";inherits:false;}@property --un-to-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}@property --un-space-y-reverse{syntax:"*";inherits:false;initial-value:0;}@property --un-divide-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}@property --un-border-style{syntax:"*";inherits:false;initial-value:solid;}@property --un-divide-x-reverse{syntax:"*";inherits:false;initial-value:0;}:root,:host{--spacing: .25rem;--font-icon-family: lucide;--font-family: Manrope;--icon-family: lucide;--color-primary: hsl(179 85% 53%);--color-secondary: hsl(6 90% 64%);--color-accent: hsl(6 90% 64%);--color-surface: hsl(100 35% 80%);--color-text: hsl(183 80% 34%);--color-danger: hsl(0 90% 65%);--color-border: #000000;--color-border-subtle: #5c5050;--colors-black: #000;--colors-white: #fff;--colors-slate-50: oklch(98.4% .003 247.858);--colors-slate-100: oklch(96.8% .007 247.896);--colors-slate-200: oklch(92.9% .013 255.508);--colors-slate-300: oklch(86.9% .022 252.894);--colors-slate-400: oklch(70.4% .04 256.788);--colors-slate-500: oklch(55.4% .046 257.417);--colors-slate-600: oklch(44.6% .043 257.281);--colors-slate-700: oklch(37.2% .044 257.287);--colors-slate-800: oklch(27.9% .041 260.031);--colors-slate-900: oklch(20.8% .042 265.755);--colors-slate-950: oklch(12.9% .042 264.695);--colors-slate-DEFAULT: oklch(70.4% .04 256.788);--colors-gray-50: oklch(98.5% .002 247.839);--colors-gray-100: oklch(96.7% .003 264.542);--colors-gray-200: oklch(92.8% .006 264.531);--colors-gray-300: oklch(87.2% .01 258.338);--colors-gray-400: oklch(70.7% .022 261.325);--colors-gray-500: oklch(55.1% .027 264.364);--colors-gray-600: oklch(44.6% .03 256.802);--colors-gray-700: oklch(37.3% .034 259.733);--colors-gray-800: oklch(27.8% .033 256.848);--colors-gray-900: oklch(21% .034 264.665);--colors-gray-950: oklch(13% .028 261.692);--colors-gray-DEFAULT: oklch(70.7% .022 261.325);--colors-zinc-50: oklch(98.5% 0 0);--colors-zinc-100: oklch(96.7% .001 286.375);--colors-zinc-200: oklch(92% .004 286.32);--colors-zinc-300: oklch(87.1% .006 286.286);--colors-zinc-400: oklch(70.5% .015 286.067);--colors-zinc-500: oklch(55.2% .016 285.938);--colors-zinc-600: oklch(44.2% .017 285.786);--colors-zinc-700: oklch(37% .013 285.805);--colors-zinc-800: oklch(27.4% .006 286.033);--colors-zinc-900: oklch(21% .006 285.885);--colors-zinc-950: oklch(14.1% .005 285.823);--colors-zinc-DEFAULT: oklch(70.5% .015 286.067);--colors-neutral-50: oklch(98.5% 0 0);--colors-neutral-100: oklch(97% 0 0);--colors-neutral-200: oklch(92.2% 0 0);--colors-neutral-300: oklch(87% 0 0);--colors-neutral-400: oklch(70.8% 0 0);--colors-neutral-500: oklch(55.6% 0 0);--colors-neutral-600: oklch(43.9% 0 0);--colors-neutral-700: oklch(37.1% 0 0);--colors-neutral-800: oklch(26.9% 0 0);--colors-neutral-900: oklch(20.5% 0 0);--colors-neutral-950: oklch(14.5% 0 0);--colors-neutral-DEFAULT: oklch(70.8% 0 0);--colors-stone-50: oklch(98.5% .001 106.423);--colors-stone-100: oklch(97% .001 106.424);--colors-stone-200: oklch(92.3% .003 48.717);--colors-stone-300: oklch(86.9% .005 56.366);--colors-stone-400: oklch(70.9% .01 56.259);--colors-stone-500: oklch(55.3% .013 58.071);--colors-stone-600: oklch(44.4% .011 73.639);--colors-stone-700: oklch(37.4% .01 67.558);--colors-stone-800: oklch(26.8% .007 34.298);--colors-stone-900: oklch(21.6% .006 56.043);--colors-stone-950: oklch(14.7% .004 49.25);--colors-stone-DEFAULT: oklch(70.9% .01 56.259);--colors-red-50: oklch(97.1% .013 17.38);--colors-red-100: oklch(93.6% .032 17.717);--colors-red-200: oklch(88.5% .062 18.334);--colors-red-300: oklch(80.8% .114 19.571);--colors-red-400: oklch(70.4% .191 22.216);--colors-red-500: oklch(63.7% .237 25.331);--colors-red-600: oklch(57.7% .245 27.325);--colors-red-700: oklch(50.5% .213 27.518);--colors-red-800: oklch(44.4% .177 26.899);--colors-red-900: oklch(39.6% .141 25.723);--colors-red-950: oklch(25.8% .092 26.042);--colors-red-DEFAULT: oklch(70.4% .191 22.216);--colors-orange-50: oklch(98% .016 73.684);--colors-orange-100: oklch(95.4% .038 75.164);--colors-orange-200: oklch(90.1% .076 70.697);--colors-orange-300: oklch(83.7% .128 66.29);--colors-orange-400: oklch(75% .183 55.934);--colors-orange-500: oklch(70.5% .213 47.604);--colors-orange-600: oklch(64.6% .222 41.116);--colors-orange-700: oklch(55.3% .195 38.402);--colors-orange-800: oklch(47% .157 37.304);--colors-orange-900: oklch(40.8% .123 38.172);--colors-orange-950: oklch(26.6% .079 36.259);--colors-orange-DEFAULT: oklch(75% .183 55.934);--colors-amber-50: oklch(98.7% .022 95.277);--colors-amber-100: oklch(96.2% .059 95.617);--colors-amber-200: oklch(92.4% .12 95.746);--colors-amber-300: oklch(87.9% .169 91.605);--colors-amber-400: oklch(82.8% .189 84.429);--colors-amber-500: oklch(76.9% .188 70.08);--colors-amber-600: oklch(66.6% .179 58.318);--colors-amber-700: oklch(55.5% .163 48.998);--colors-amber-800: oklch(47.3% .137 46.201);--colors-amber-900: oklch(41.4% .112 45.904);--colors-amber-950: oklch(27.9% .077 45.635);--colors-amber-DEFAULT: oklch(82.8% .189 84.429);--colors-yellow-50: oklch(98.7% .026 102.212);--colors-yellow-100: oklch(97.3% .071 103.193);--colors-yellow-200: oklch(94.5% .129 101.54);--colors-yellow-300: oklch(90.5% .182 98.111);--colors-yellow-400: oklch(85.2% .199 91.936);--colors-yellow-500: oklch(79.5% .184 86.047);--colors-yellow-600: oklch(68.1% .162 75.834);--colors-yellow-700: oklch(55.4% .135 66.442);--colors-yellow-800: oklch(47.6% .114 61.907);--colors-yellow-900: oklch(42.1% .095 57.708);--colors-yellow-950: oklch(28.6% .066 53.813);--colors-yellow-DEFAULT: oklch(85.2% .199 91.936);--colors-lime-50: oklch(98.6% .031 120.757);--colors-lime-100: oklch(96.7% .067 122.328);--colors-lime-200: oklch(93.8% .127 124.321);--colors-lime-300: oklch(89.7% .196 126.665);--colors-lime-400: oklch(84.1% .238 128.85);--colors-lime-500: oklch(76.8% .233 130.85);--colors-lime-600: oklch(64.8% .2 131.684);--colors-lime-700: oklch(53.2% .157 131.589);--colors-lime-800: oklch(45.3% .124 130.933);--colors-lime-900: oklch(40.5% .101 131.063);--colors-lime-950: oklch(27.4% .072 132.109);--colors-lime-DEFAULT: oklch(84.1% .238 128.85);--colors-green-50: oklch(98.2% .018 155.826);--colors-green-100: oklch(96.2% .044 156.743);--colors-green-200: oklch(92.5% .084 155.995);--colors-green-300: oklch(87.1% .15 154.449);--colors-green-400: oklch(79.2% .209 151.711);--colors-green-500: oklch(72.3% .219 149.579);--colors-green-600: oklch(62.7% .194 149.214);--colors-green-700: oklch(52.7% .154 150.069);--colors-green-800: oklch(44.8% .119 151.328);--colors-green-900: oklch(39.3% .095 152.535);--colors-green-950: oklch(26.6% .065 152.934);--colors-green-DEFAULT: oklch(79.2% .209 151.711);--colors-emerald-50: oklch(97.9% .021 166.113);--colors-emerald-100: oklch(95% .052 163.051);--colors-emerald-200: oklch(90.5% .093 164.15);--colors-emerald-300: oklch(84.5% .143 164.978);--colors-emerald-400: oklch(76.5% .177 163.223);--colors-emerald-500: oklch(69.6% .17 162.48);--colors-emerald-600: oklch(59.6% .145 163.225);--colors-emerald-700: oklch(50.8% .118 165.612);--colors-emerald-800: oklch(43.2% .095 166.913);--colors-emerald-900: oklch(37.8% .077 168.94);--colors-emerald-950: oklch(26.2% .051 172.552);--colors-emerald-DEFAULT: oklch(76.5% .177 163.223);--colors-teal-50: oklch(98.4% .014 180.72);--colors-teal-100: oklch(95.3% .051 180.801);--colors-teal-200: oklch(91% .096 180.426);--colors-teal-300: oklch(85.5% .138 181.071);--colors-teal-400: oklch(77.7% .152 181.912);--colors-teal-500: oklch(70.4% .14 182.503);--colors-teal-600: oklch(60% .118 184.704);--colors-teal-700: oklch(51.1% .096 186.391);--colors-teal-800: oklch(43.7% .078 188.216);--colors-teal-900: oklch(38.6% .063 188.416);--colors-teal-950: oklch(27.7% .046 192.524);--colors-teal-DEFAULT: oklch(77.7% .152 181.912);--colors-cyan-50: oklch(98.4% .019 200.873);--colors-cyan-100: oklch(95.6% .045 203.388);--colors-cyan-200: oklch(91.7% .08 205.041);--colors-cyan-300: oklch(86.5% .127 207.078);--colors-cyan-400: oklch(78.9% .154 211.53);--colors-cyan-500: oklch(71.5% .143 215.221);--colors-cyan-600: oklch(60.9% .126 221.723);--colors-cyan-700: oklch(52% .105 223.128);--colors-cyan-800: oklch(45% .085 224.283);--colors-cyan-900: oklch(39.8% .07 227.392);--colors-cyan-950: oklch(30.2% .056 229.695);--colors-cyan-DEFAULT: oklch(78.9% .154 211.53);--colors-sky-50: oklch(97.7% .013 236.62);--colors-sky-100: oklch(95.1% .026 236.824);--colors-sky-200: oklch(90.1% .058 230.902);--colors-sky-300: oklch(82.8% .111 230.318);--colors-sky-400: oklch(74.6% .16 232.661);--colors-sky-500: oklch(68.5% .169 237.323);--colors-sky-600: oklch(58.8% .158 241.966);--colors-sky-700: oklch(50% .134 242.749);--colors-sky-800: oklch(44.3% .11 240.79);--colors-sky-900: oklch(39.1% .09 240.876);--colors-sky-950: oklch(29.3% .066 243.157);--colors-sky-DEFAULT: oklch(74.6% .16 232.661);--colors-blue-50: oklch(97% .014 254.604);--colors-blue-100: oklch(93.2% .032 255.585);--colors-blue-200: oklch(88.2% .059 254.128);--colors-blue-300: oklch(80.9% .105 251.813);--colors-blue-400: oklch(70.7% .165 254.624);--colors-blue-500: oklch(62.3% .214 259.815);--colors-blue-600: oklch(54.6% .245 262.881);--colors-blue-700: oklch(48.8% .243 264.376);--colors-blue-800: oklch(42.4% .199 265.638);--colors-blue-900: oklch(37.9% .146 265.522);--colors-blue-950: oklch(28.2% .091 267.935);--colors-blue-DEFAULT: oklch(70.7% .165 254.624);--colors-indigo-50: oklch(96.2% .018 272.314);--colors-indigo-100: oklch(93% .034 272.788);--colors-indigo-200: oklch(87% .065 274.039);--colors-indigo-300: oklch(78.5% .115 274.713);--colors-indigo-400: oklch(67.3% .182 276.935);--colors-indigo-500: oklch(58.5% .233 277.117);--colors-indigo-600: oklch(51.1% .262 276.966);--colors-indigo-700: oklch(45.7% .24 277.023);--colors-indigo-800: oklch(39.8% .195 277.366);--colors-indigo-900: oklch(35.9% .144 278.697);--colors-indigo-950: oklch(25.7% .09 281.288);--colors-indigo-DEFAULT: oklch(67.3% .182 276.935);--colors-violet-50: oklch(96.9% .016 293.756);--colors-violet-100: oklch(94.3% .029 294.588);--colors-violet-200: oklch(89.4% .057 293.283);--colors-violet-300: oklch(81.1% .111 293.571);--colors-violet-400: oklch(70.2% .183 293.541);--colors-violet-500: oklch(60.6% .25 292.717);--colors-violet-600: oklch(54.1% .281 293.009);--colors-violet-700: oklch(49.1% .27 292.581);--colors-violet-800: oklch(43.2% .232 292.759);--colors-violet-900: oklch(38% .189 293.745);--colors-violet-950: oklch(28.3% .141 291.089);--colors-violet-DEFAULT: oklch(70.2% .183 293.541);--colors-purple-50: oklch(97.7% .014 308.299);--colors-purple-100: oklch(94.6% .033 307.174);--colors-purple-200: oklch(90.2% .063 306.703);--colors-purple-300: oklch(82.7% .119 306.383);--colors-purple-400: oklch(71.4% .203 305.504);--colors-purple-500: oklch(62.7% .265 303.9);--colors-purple-600: oklch(55.8% .288 302.321);--colors-purple-700: oklch(49.6% .265 301.924);--colors-purple-800: oklch(43.8% .218 303.724);--colors-purple-900: oklch(38.1% .176 304.987);--colors-purple-950: oklch(29.1% .149 302.717);--colors-purple-DEFAULT: oklch(71.4% .203 305.504);--colors-fuchsia-50: oklch(97.7% .017 320.058);--colors-fuchsia-100: oklch(95.2% .037 318.852);--colors-fuchsia-200: oklch(90.3% .076 319.62);--colors-fuchsia-300: oklch(83.3% .145 321.434);--colors-fuchsia-400: oklch(74% .238 322.16);--colors-fuchsia-500: oklch(66.7% .295 322.15);--colors-fuchsia-600: oklch(59.1% .293 322.896);--colors-fuchsia-700: oklch(51.8% .253 323.949);--colors-fuchsia-800: oklch(45.2% .211 324.591);--colors-fuchsia-900: oklch(40.1% .17 325.612);--colors-fuchsia-950: oklch(29.3% .136 325.661);--colors-fuchsia-DEFAULT: oklch(74% .238 322.16);--colors-pink-50: oklch(97.1% .014 343.198);--colors-pink-100: oklch(94.8% .028 342.258);--colors-pink-200: oklch(89.9% .061 343.231);--colors-pink-300: oklch(82.3% .12 346.018);--colors-pink-400: oklch(71.8% .202 349.761);--colors-pink-500: oklch(65.6% .241 354.308);--colors-pink-600: oklch(59.2% .249 .584);--colors-pink-700: oklch(52.5% .223 3.958);--colors-pink-800: oklch(45.9% .187 3.815);--colors-pink-900: oklch(40.8% .153 2.432);--colors-pink-950: oklch(28.4% .109 3.907);--colors-pink-DEFAULT: oklch(71.8% .202 349.761);--colors-rose-50: oklch(96.9% .015 12.422);--colors-rose-100: oklch(94.1% .03 12.58);--colors-rose-200: oklch(89.2% .058 10.001);--colors-rose-300: oklch(81% .117 11.638);--colors-rose-400: oklch(71.2% .194 13.428);--colors-rose-500: oklch(64.5% .246 16.439);--colors-rose-600: oklch(58.6% .253 17.585);--colors-rose-700: oklch(51.4% .222 16.935);--colors-rose-800: oklch(45.5% .188 13.697);--colors-rose-900: oklch(41% .159 10.272);--colors-rose-950: oklch(27.1% .105 12.094);--colors-rose-DEFAULT: oklch(71.2% .194 13.428);--colors-light-50: oklch(99.4% 0 0);--colors-light-100: oklch(99.11% 0 0);--colors-light-200: oklch(98.51% 0 0);--colors-light-300: oklch(98.16% .0017 247.84);--colors-light-400: oklch(97.31% 0 0);--colors-light-500: oklch(96.12% 0 0);--colors-light-600: oklch(96.32% .0034 247.86);--colors-light-700: oklch(94.17% .0052 247.88);--colors-light-800: oklch(91.09% .007 247.9);--colors-light-900: oklch(90.72% .0051 228.82);--colors-light-950: oklch(89.23% .006 239.83);--colors-light-DEFAULT: oklch(97.31% 0 0);--colors-dark-50: oklch(40.91% 0 0);--colors-dark-100: oklch(35.62% 0 0);--colors-dark-200: oklch(31.71% 0 0);--colors-dark-300: oklch(29.72% 0 0);--colors-dark-400: oklch(25.2% 0 0);--colors-dark-500: oklch(23.93% 0 0);--colors-dark-600: oklch(22.73% .0038 286.09);--colors-dark-700: oklch(22.21% 0 0);--colors-dark-800: oklch(20.9% 0 0);--colors-dark-900: oklch(16.84% 0 0);--colors-dark-950: oklch(13.44% 0 0);--colors-dark-DEFAULT: oklch(25.2% 0 0);--colors-default: var(--text-color);--colors-muted: var(--text-muted);--colors-inverted: var(--color-inverse);--colors-surface-DEFAULT: var(--color-surface);--colors-surface-lighter: var(--color-surface-lighter);--colors-surface-light: var(--color-surface-light);--colors-surface-dark: var(--color-surface-dark);--colors-surface-darker: var(--color-surface-darker);--colors-accent-DEFAULT: var(--color-accent);--colors-accent-lighter: var(--color-accent-lighter);--colors-accent-light: var(--color-accent-light);--colors-accent-dark: var(--color-accent-dark);--colors-accent-darker: var(--color-accent-darker);--colors-inverse-DEFAULT: var(--color-inverse);--colors-inverse-lighter: var(--color-inverse-lighter);--colors-inverse-light: var(--color-inverse-light);--colors-inverse-dark: var(--color-inverse-dark);--colors-inverse-darker: var(--color-inverse-darker);--colors-primary-DEFAULT: var(--color-primary);--colors-primary-lighter: var(--color-primary-lighter);--colors-primary-light: var(--color-primary-light);--colors-primary-dark: var(--color-primary-dark);--colors-primary-darker: var(--color-primary-darker);--colors-secondary-DEFAULT: var(--color-secondary);--colors-secondary-lighter: var(--color-secondary-lighter);--colors-secondary-light: var(--color-secondary-light);--colors-secondary-dark: var(--color-secondary-dark);--colors-secondary-darker: var(--color-secondary-darker);--colors-success-DEFAULT: var(--color-success);--colors-success-lighter: var(--color-success-lighter);--colors-success-light: var(--color-success-light);--colors-success-dark: var(--color-success-dark);--colors-success-darker: var(--color-success-darker);--colors-danger-DEFAULT: var(--color-danger);--colors-danger-lighter: var(--color-danger-lighter);--colors-danger-light: var(--color-danger-light);--colors-danger-dark: var(--color-danger-dark);--colors-danger-darker: var(--color-danger-darker);--colors-warning-DEFAULT: var(--color-warning);--colors-warning-lighter: var(--color-warning-lighter);--colors-warning-light: var(--color-warning-light);--colors-warning-dark: var(--color-warning-dark);--colors-warning-darker: var(--color-warning-darker);--colors-info-DEFAULT: var(--color-info);--colors-info-lighter: var(--color-info-lighter);--colors-info-light: var(--color-info-light);--colors-info-dark: var(--color-info-dark);--colors-info-darker: var(--color-info-darker);--colors-hover: var(--color-hover);--colors-focus: var(--color-focus);--text-xs-fontSize: .75rem;--text-xs-lineHeight: 1rem;--text-sm-fontSize: .875rem;--text-sm-lineHeight: 1.25rem;--text-base-fontSize: 1rem;--text-base-lineHeight: 1.5rem;--text-lg-fontSize: 1.125rem;--text-lg-lineHeight: 1.75rem;--text-xl-fontSize: 1.25rem;--text-xl-lineHeight: 1.75rem;--text-2xl-fontSize: 1.5rem;--text-2xl-lineHeight: 2rem;--text-3xl-fontSize: 1.875rem;--text-3xl-lineHeight: 2.25rem;--text-4xl-fontSize: 2.25rem;--text-4xl-lineHeight: 2.5rem;--text-5xl-fontSize: 3rem;--text-5xl-lineHeight: 1;--text-6xl-fontSize: 3.75rem;--text-6xl-lineHeight: 1;--text-7xl-fontSize: 4.5rem;--text-7xl-lineHeight: 1;--text-8xl-fontSize: 6rem;--text-8xl-lineHeight: 1;--text-9xl-fontSize: 8rem;--text-9xl-lineHeight: 1;--fontWeight-thin: 100;--fontWeight-extralight: 200;--fontWeight-light: 300;--fontWeight-normal: 400;--fontWeight-medium: 500;--fontWeight-semibold: 600;--fontWeight-bold: 700;--fontWeight-extrabold: 800;--fontWeight-black: 900;--tracking-tighter: -.05em;--tracking-tight: -.025em;--tracking-normal: 0em;--tracking-wide: .025em;--tracking-wider: .05em;--tracking-widest: .1em;--leading-none: 1;--leading-tight: 1.25;--leading-snug: 1.375;--leading-normal: 1.5;--leading-relaxed: 1.625;--leading-loose: 2;--textStrokeWidth-DEFAULT: 1.5rem;--textStrokeWidth-none: 0;--textStrokeWidth-sm: thin;--textStrokeWidth-md: medium;--textStrokeWidth-lg: thick;--radius-DEFAULT: .25rem;--radius-none: 0;--radius-xs: .125rem;--radius-sm: .25rem;--radius-md: .375rem;--radius-lg: .5rem;--radius-xl: .75rem;--radius-2xl: 1rem;--radius-3xl: 1.5rem;--radius-4xl: 2rem;--ease-linear: linear;--ease-in: cubic-bezier(.4, 0, 1, 1);--ease-out: cubic-bezier(0, 0, .2, 1);--ease-in-out: cubic-bezier(.4, 0, .2, 1);--ease-DEFAULT: cubic-bezier(.4, 0, .2, 1);--blur-DEFAULT: 8px;--blur-xs: 4px;--blur-sm: 8px;--blur-md: 12px;--blur-lg: 16px;--blur-xl: 24px;--blur-2xl: 40px;--blur-3xl: 64px;--perspective-dramatic: 100px;--perspective-near: 300px;--perspective-normal: 500px;--perspective-midrange: 800px;--perspective-distant: 1200px;--default-transition-duration: .15s;--default-transition-timingFunction: cubic-bezier(.4, 0, .2, 1);--default-font-family: var(--font-sans);--default-font-featureSettings: var(--font-sans--font-feature-settings);--default-font-variationSettings: var(--font-sans--font-variation-settings);--default-monoFont-family: var(--font-mono);--default-monoFont-featureSettings: var(--font-mono--font-feature-settings);--default-monoFont-variationSettings: var(--font-mono--font-variation-settings);--container-3xs: 16rem;--container-2xs: 18rem;--container-xs: 20rem;--container-sm: 24rem;--container-md: 28rem;--container-lg: 32rem;--container-xl: 36rem;--container-2xl: 42rem;--container-3xl: 48rem;--container-4xl: 56rem;--container-5xl: 64rem;--container-6xl: 72rem;--container-7xl: 80rem;--container-prose: 65ch;--textColor-DEFAULT: var(--text-color);--backgroundColor-DEFAULT: var(--background-color)}*,:after,:before,::backdrop,::file-selector-button{box-sizing:border-box;margin:0;padding:0;border:0 solid}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:var( --default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" );font-feature-settings:var(--default-font-featureSettings, normal);font-variation-settings:var(--default-font-variationSettings, normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var( --default-monoFont-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace );font-feature-settings:var(--default-monoFont-featureSettings, normal);font-variation-settings:var(--default-monoFont-variationSettings, normal);font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea,::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;border-radius:0;background-color:transparent;opacity:1}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not (-webkit-appearance: -apple-pay-button)) or (contain-intrinsic-size: 1px){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit,::-webkit-datetime-edit-year-field,::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-minute-field,::-webkit-datetime-edit-second-field,::-webkit-datetime-edit-millisecond-field,::-webkit-datetime-edit-meridiem-field{padding-block:0}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]),::file-selector-button{appearance:button}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}.text-\\[10px\\]{font-size:10px}.text-\\[9px\\]{font-size:9px}.text-2xl{font-size:var(--text-2xl-fontSize);line-height:var(--un-leading, var(--text-2xl-lineHeight))}.text-3xl{font-size:var(--text-3xl-fontSize);line-height:var(--un-leading, var(--text-3xl-lineHeight))}.text-4xl{font-size:var(--text-4xl-fontSize);line-height:var(--un-leading, var(--text-4xl-lineHeight))}.text-5xl{font-size:var(--text-5xl-fontSize);line-height:var(--un-leading, var(--text-5xl-lineHeight))}.text-base{font-size:var(--text-base-fontSize);line-height:var(--un-leading, var(--text-base-lineHeight))}.text-lg{font-size:var(--text-lg-fontSize);line-height:var(--un-leading, var(--text-lg-lineHeight))}.text-sm{font-size:var(--text-sm-fontSize);line-height:var(--un-leading, var(--text-sm-lineHeight))}.text-xl{font-size:var(--text-xl-fontSize);line-height:var(--un-leading, var(--text-xl-lineHeight))}.text-xs{font-size:var(--text-xs-fontSize);line-height:var(--un-leading, var(--text-xs-lineHeight))}.text-black{color:color-mix(in srgb,var(--colors-black) var(--un-text-opacity),transparent)}.text-gray-400{color:color-mix(in srgb,var(--colors-gray-400) var(--un-text-opacity),transparent)}.text-gray-500{color:color-mix(in srgb,var(--colors-gray-500) var(--un-text-opacity),transparent)}.text-gray-600{color:color-mix(in srgb,var(--colors-gray-600) var(--un-text-opacity),transparent)}.text-gray-700{color:color-mix(in srgb,var(--colors-gray-700) var(--un-text-opacity),transparent)}.text-gray-800{color:color-mix(in srgb,var(--colors-gray-800) var(--un-text-opacity),transparent)}.text-green-600{color:color-mix(in srgb,var(--colors-green-600) var(--un-text-opacity),transparent)}.text-green-800{color:color-mix(in srgb,var(--colors-green-800) var(--un-text-opacity),transparent)}.text-teal-600{color:color-mix(in srgb,var(--colors-teal-600) var(--un-text-opacity),transparent)}.text-white{color:color-mix(in srgb,var(--colors-white) var(--un-text-opacity),transparent)}.hover\\:text-black:hover{color:color-mix(in srgb,var(--colors-black) var(--un-text-opacity),transparent)}.hover\\:text-teal-600:hover{color:color-mix(in srgb,var(--colors-teal-600) var(--un-text-opacity),transparent)}.hover\\:text-white:hover{color:color-mix(in srgb,var(--colors-white) var(--un-text-opacity),transparent)}.leading-relaxed{--un-leading:var(--leading-relaxed);line-height:var(--leading-relaxed)}.leading-tight{--un-leading:var(--leading-tight);line-height:var(--leading-tight)}.tracking-tight{--un-tracking:var(--tracking-tight);letter-spacing:var(--tracking-tight)}.font-black{--un-font-weight:var(--fontWeight-black);font-weight:var(--fontWeight-black)}.font-bold{--un-font-weight:var(--fontWeight-bold);font-weight:var(--fontWeight-bold)}.font-medium{--un-font-weight:var(--fontWeight-medium);font-weight:var(--fontWeight-medium)}.m12{margin:calc(var(--spacing) * 12)}.m16\\.24{margin:calc(var(--spacing) * 16.24)}.m19{margin:calc(var(--spacing) * 19)}.-mx-4{margin-inline:calc(calc(var(--spacing) * 4) * -1)}.mx-1{margin-inline:calc(var(--spacing) * 1)}.mx-4{margin-inline:calc(var(--spacing) * 4)}.mx-auto{margin-inline:auto}.-ml-1{margin-left:calc(calc(var(--spacing) * 1) * -1)}.-mt-10{margin-top:calc(calc(var(--spacing) * 10) * -1)}.-mt-6{margin-top:calc(calc(var(--spacing) * 6) * -1)}.mb-1{margin-bottom:calc(var(--spacing) * 1)}.mb-12{margin-bottom:calc(var(--spacing) * 12)}.mb-2{margin-bottom:calc(var(--spacing) * 2)}.mb-3{margin-bottom:calc(var(--spacing) * 3)}.mb-4{margin-bottom:calc(var(--spacing) * 4)}.mb-8{margin-bottom:calc(var(--spacing) * 8)}.ml-auto{margin-left:auto}.mt-0\\.5{margin-top:calc(var(--spacing) * .5)}.mt-1{margin-top:calc(var(--spacing) * 1)}.mt-2{margin-top:calc(var(--spacing) * 2)}.mt-3{margin-top:calc(var(--spacing) * 3)}.mt-4{margin-top:calc(var(--spacing) * 4)}.mt-6{margin-top:calc(var(--spacing) * 6)}.last\\:mr-1:last-child{margin-right:calc(var(--spacing) * 1)}.p-1{padding:calc(var(--spacing) * 1)}.p-2{padding:calc(var(--spacing) * 2)}.p-3{padding:calc(var(--spacing) * 3)}.p-4{padding:calc(var(--spacing) * 4)}.p-6{padding:calc(var(--spacing) * 6)}.p-8{padding:calc(var(--spacing) * 8)}.px-1\\.5{padding-inline:calc(var(--spacing) * 1.5)}.px-2{padding-inline:calc(var(--spacing) * 2)}.px-3{padding-inline:calc(var(--spacing) * 3)}.px-4{padding-inline:calc(var(--spacing) * 4)}.px-6{padding-inline:calc(var(--spacing) * 6)}.py-0\\.5{padding-block:calc(var(--spacing) * .5)}.py-1{padding-block:calc(var(--spacing) * 1)}.py-1\\.5{padding-block:calc(var(--spacing) * 1.5)}.py-2{padding-block:calc(var(--spacing) * 2)}.py-3{padding-block:calc(var(--spacing) * 3)}.py-4{padding-block:calc(var(--spacing) * 4)}.py-6{padding-block:calc(var(--spacing) * 6)}.pb-16{padding-bottom:calc(var(--spacing) * 16)}.pb-2{padding-bottom:calc(var(--spacing) * 2)}.pb-20{padding-bottom:calc(var(--spacing) * 20)}.pb-24{padding-bottom:calc(var(--spacing) * 24)}.pb-4{padding-bottom:calc(var(--spacing) * 4)}.pb-8{padding-bottom:calc(var(--spacing) * 8)}.pl-12{padding-left:calc(var(--spacing) * 12)}.pr-12{padding-right:calc(var(--spacing) * 12)}.pt-0{padding-top:calc(var(--spacing) * 0)}.pt-2{padding-top:calc(var(--spacing) * 2)}.pt-4{padding-top:calc(var(--spacing) * 4)}.pt-6{padding-top:calc(var(--spacing) * 6)}.text-center{text-align:center}.text-left{text-align:left}.outline-none{--un-outline-style:none;outline-style:none}.border{border-width:1px}.border-2{border-width:2px}.border-3{border-width:3px}.border-b-3{border-bottom-width:3px}.border-r-3{border-right-width:3px}.border-t{border-top-width:1px}.border-t-2{border-top-width:2px}.border-t-3{border-top-width:3px}.border-black{border-color:color-mix(in srgb,var(--colors-black) var(--un-border-opacity),transparent)}.border-gray-200{border-color:color-mix(in srgb,var(--colors-gray-200) var(--un-border-opacity),transparent)}.border-gray-300{border-color:color-mix(in srgb,var(--colors-gray-300) var(--un-border-opacity),transparent)}.border-green-800{border-color:color-mix(in srgb,var(--colors-green-800) var(--un-border-opacity),transparent)}.rounded{border-radius:var(--radius-DEFAULT)}.rounded-3xl{border-radius:var(--radius-3xl)}.rounded-full{border-radius:calc(infinity * 1px)}.rounded-lg{border-radius:var(--radius-lg)}.rounded-md{border-radius:var(--radius-md)}.rounded-xl{border-radius:var(--radius-xl)}.rounded-b-\\[2\\.5rem\\]{border-bottom-left-radius:2.5rem;border-bottom-right-radius:2.5rem}.border-dashed{--un-border-style:dashed;border-style:dashed}.bg-accent{background-color:color-mix(in srgb,var(--colors-accent-DEFAULT) var(--un-bg-opacity),transparent)}.bg-amber-200{background-color:color-mix(in srgb,var(--colors-amber-200) var(--un-bg-opacity),transparent)}.bg-amber-300{background-color:color-mix(in srgb,var(--colors-amber-300) var(--un-bg-opacity),transparent)}.bg-black{background-color:color-mix(in srgb,var(--colors-black) var(--un-bg-opacity),transparent)}.bg-blue-200{background-color:color-mix(in srgb,var(--colors-blue-200) var(--un-bg-opacity),transparent)}.bg-blue-300{background-color:color-mix(in srgb,var(--colors-blue-300) var(--un-bg-opacity),transparent)}.bg-blue-400{background-color:color-mix(in srgb,var(--colors-blue-400) var(--un-bg-opacity),transparent)}.bg-emerald-200{background-color:color-mix(in srgb,var(--colors-emerald-200) var(--un-bg-opacity),transparent)}.bg-emerald-300{background-color:color-mix(in srgb,var(--colors-emerald-300) var(--un-bg-opacity),transparent)}.bg-gray-100{background-color:color-mix(in srgb,var(--colors-gray-100) var(--un-bg-opacity),transparent)}.bg-gray-200{background-color:color-mix(in srgb,var(--colors-gray-200) var(--un-bg-opacity),transparent)}.bg-gray-400{background-color:color-mix(in srgb,var(--colors-gray-400) var(--un-bg-opacity),transparent)}.bg-gray-50{background-color:color-mix(in srgb,var(--colors-gray-50) var(--un-bg-opacity),transparent)}.bg-green-100{background-color:color-mix(in srgb,var(--colors-green-100) var(--un-bg-opacity),transparent)}.bg-green-200{background-color:color-mix(in srgb,var(--colors-green-200) var(--un-bg-opacity),transparent)}.bg-green-300{background-color:color-mix(in srgb,var(--colors-green-300) var(--un-bg-opacity),transparent)}.bg-green-400{background-color:color-mix(in srgb,var(--colors-green-400) var(--un-bg-opacity),transparent)}.bg-lime-200{background-color:color-mix(in srgb,var(--colors-lime-200) var(--un-bg-opacity),transparent)}.bg-orange-200{background-color:color-mix(in srgb,var(--colors-orange-200) var(--un-bg-opacity),transparent)}.bg-orange-300{background-color:color-mix(in srgb,var(--colors-orange-300) var(--un-bg-opacity),transparent)}.bg-primary{background-color:color-mix(in srgb,var(--colors-primary-DEFAULT) var(--un-bg-opacity),transparent)}.bg-purple-200{background-color:color-mix(in srgb,var(--colors-purple-200) var(--un-bg-opacity),transparent)}.bg-purple-300{background-color:color-mix(in srgb,var(--colors-purple-300) var(--un-bg-opacity),transparent)}.bg-purple-50{background-color:color-mix(in srgb,var(--colors-purple-50) var(--un-bg-opacity),transparent)}.bg-red-300{background-color:color-mix(in srgb,var(--colors-red-300) var(--un-bg-opacity),transparent)}.bg-rose-300{background-color:color-mix(in srgb,var(--colors-rose-300) var(--un-bg-opacity),transparent)}.bg-secondary-lighter{background-color:color-mix(in srgb,var(--colors-secondary-lighter) var(--un-bg-opacity),transparent)}.bg-sky-200{background-color:color-mix(in srgb,var(--colors-sky-200) var(--un-bg-opacity),transparent)}.bg-sky-50{background-color:color-mix(in srgb,var(--colors-sky-50) var(--un-bg-opacity),transparent)}.bg-surface{background-color:color-mix(in srgb,var(--colors-surface-DEFAULT) var(--un-bg-opacity),transparent)}.bg-teal-200{background-color:color-mix(in srgb,var(--colors-teal-200) var(--un-bg-opacity),transparent)}.bg-teal-300{background-color:color-mix(in srgb,var(--colors-teal-300) var(--un-bg-opacity),transparent)}.bg-teal-400{background-color:color-mix(in srgb,var(--colors-teal-400) var(--un-bg-opacity),transparent)}.bg-white{background-color:color-mix(in srgb,var(--colors-white) var(--un-bg-opacity),transparent)}.bg-white\\/10{background-color:color-mix(in srgb,var(--colors-white) 10%,transparent)}.bg-yellow-200{background-color:color-mix(in srgb,var(--colors-yellow-200) var(--un-bg-opacity),transparent)}.bg-yellow-300{background-color:color-mix(in srgb,var(--colors-yellow-300) var(--un-bg-opacity),transparent)}.bg-yellow-50{background-color:color-mix(in srgb,var(--colors-yellow-50) var(--un-bg-opacity),transparent)}.hover\\:bg-accent:hover{background-color:color-mix(in srgb,var(--colors-accent-DEFAULT) var(--un-bg-opacity),transparent)}.hover\\:bg-gray-100:hover{background-color:color-mix(in srgb,var(--colors-gray-100) var(--un-bg-opacity),transparent)}.hover\\:bg-gray-50:hover{background-color:color-mix(in srgb,var(--colors-gray-50) var(--un-bg-opacity),transparent)}.opacity-20{opacity:20%}.hover\\:underline:hover{text-decoration-line:underline}.flex{display:flex}.inline-flex{display:inline-flex}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.flex-grow{flex-grow:1}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.flex-nowrap{flex-wrap:nowrap}.gap-0{gap:calc(var(--spacing) * 0)}.gap-1{gap:calc(var(--spacing) * 1)}.gap-1\\.5{gap:calc(var(--spacing) * 1.5)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-3{gap:calc(var(--spacing) * 3)}.gap-4{gap:calc(var(--spacing) * 4)}.gap-6{gap:calc(var(--spacing) * 6)}.grid{display:grid}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.h-10{height:calc(var(--spacing) * 10)}.h-20{height:calc(var(--spacing) * 20)}.h-24{height:calc(var(--spacing) * 24)}.h-28{height:calc(var(--spacing) * 28)}.h-32{height:calc(var(--spacing) * 32)}.h-40{height:calc(var(--spacing) * 40)}.h-48{height:calc(var(--spacing) * 48)}.h-5{height:calc(var(--spacing) * 5)}.h-6{height:calc(var(--spacing) * 6)}.h-8{height:calc(var(--spacing) * 8)}.h-full{height:100%}.h-px{height:1px}.max-w-\\[300px\\]{max-width:300px}.max-w-\\[75\\%\\]{max-width:75%}.max-w-\\[80px\\]{max-width:80px}.max-w-100vw,.max-w-screen{max-width:100vw}.max-w-none{max-width:none}.max-w-xs{max-width:var(--container-xs)}.min-h-screen{min-height:100vh}.min-w-\\[72px\\]{min-width:72px}.min-w-0{min-width:calc(var(--spacing) * 0)}.min-w-max{min-width:max-content}.w-10{width:calc(var(--spacing) * 10)}.w-12{width:calc(var(--spacing) * 12)}.w-14{width:calc(var(--spacing) * 14)}.w-16{width:calc(var(--spacing) * 16)}.w-20{width:calc(var(--spacing) * 20)}.w-32{width:calc(var(--spacing) * 32)}.w-5{width:calc(var(--spacing) * 5)}.w-6{width:calc(var(--spacing) * 6)}.w-8{width:calc(var(--spacing) * 8)}.w-full{width:100%}.block{display:block}.hidden{display:none}.cursor-pointer{cursor:pointer}.whitespace-nowrap{white-space:nowrap}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.uppercase{text-transform:uppercase}.ring-2{--un-ring-shadow:var(--un-ring-inset,) 0 0 0 calc(2px + var(--un-ring-offset-width)) var(--un-ring-color, currentColor);box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.ring-white{--un-ring-color:color-mix(in srgb, var(--colors-white) var(--un-ring-opacity), transparent)}.shadow-\\[0px_4px_0px_0px_rgba\\(0\\,0\\,0\\,1\\)\\]{--un-shadow:0px 4px 0px 0px var(--un-shadow-color, rgba(0, 0, 0, 1));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.shadow-\\[2px_2px_0px_0px_rgba\\(0\\,0\\,0\\,1\\)\\]{--un-shadow:2px 2px 0px 0px var(--un-shadow-color, rgba(0, 0, 0, 1));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.shadow-\\[3px_3px_0px_0px_rgba\\(0\\,0\\,0\\,1\\)\\]{--un-shadow:3px 3px 0px 0px var(--un-shadow-color, rgba(0, 0, 0, 1));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.shadow-\\[4px_4px_0px_0px_rgba\\(0\\,0\\,0\\,1\\)\\]{--un-shadow:4px 4px 0px 0px var(--un-shadow-color, rgba(0, 0, 0, 1));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.shadow-\\[6px_6px_0px_0px_rgba\\(0\\,0\\,0\\,1\\)\\]{--un-shadow:6px 6px 0px 0px var(--un-shadow-color, rgba(0, 0, 0, 1));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.shadow-sm{--un-shadow:0 1px 3px 0 var(--un-shadow-color, rgb(0 0 0 / .1)),0 1px 2px -1px var(--un-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.group:hover .group-hover\\:shadow-none{--un-shadow:0 0 var(--un-shadow-color, rgb(0 0 0 / 0));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.hover\\:shadow-\\[1px_1px_0px_0px_rgba\\(0\\,0\\,0\\,1\\)\\]:hover{--un-shadow:1px 1px 0px 0px var(--un-shadow-color, rgba(0, 0, 0, 1));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.hover\\:shadow-\\[2px_2px_0px_0px_rgba\\(0\\,0\\,0\\,1\\)\\]:hover{--un-shadow:2px 2px 0px 0px var(--un-shadow-color, rgba(0, 0, 0, 1));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.hover\\:shadow-none:hover{--un-shadow:0 0 var(--un-shadow-color, rgb(0 0 0 / 0));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.focus\\:shadow-\\[2px_2px_0px_0px_rgba\\(0\\,0\\,0\\,1\\)\\]:focus{--un-shadow:2px 2px 0px 0px var(--un-shadow-color, rgba(0, 0, 0, 1));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.active\\:shadow-\\[2px_2px_0px_0px_rgba\\(0\\,0\\,0\\,1\\)\\]:active{--un-shadow:2px 2px 0px 0px var(--un-shadow-color, rgba(0, 0, 0, 1));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.active\\:shadow-none:active{--un-shadow:0 0 var(--un-shadow-color, rgb(0 0 0 / 0));box-shadow:var(--un-inset-shadow),var(--un-inset-ring-shadow),var(--un-ring-offset-shadow),var(--un-ring-shadow),var(--un-shadow)}.-translate-x-1\\/2{--un-translate-x:-50%;translate:var(--un-translate-x) var(--un-translate-y)}.-translate-y-1\\/2{--un-translate-y:-50%;translate:var(--un-translate-x) var(--un-translate-y)}.group:hover .group-hover\\:translate-x-\\[1px\\]{--un-translate-x:1px;translate:var(--un-translate-x) var(--un-translate-y)}.group:hover .group-hover\\:translate-y-\\[1px\\]{--un-translate-y:1px;translate:var(--un-translate-x) var(--un-translate-y)}.hover\\:translate-x-\\[1px\\]:hover{--un-translate-x:1px;translate:var(--un-translate-x) var(--un-translate-y)}.hover\\:translate-x-\\[2px\\]:hover{--un-translate-x:2px;translate:var(--un-translate-x) var(--un-translate-y)}.hover\\:translate-x-\\[3px\\]:hover{--un-translate-x:3px;translate:var(--un-translate-x) var(--un-translate-y)}.hover\\:translate-y-\\[1px\\]:hover{--un-translate-y:1px;translate:var(--un-translate-x) var(--un-translate-y)}.hover\\:translate-y-\\[2px\\]:hover{--un-translate-y:2px;translate:var(--un-translate-x) var(--un-translate-y)}.hover\\:translate-y-\\[3px\\]:hover{--un-translate-y:3px;translate:var(--un-translate-x) var(--un-translate-y)}.focus\\:translate-x-\\[2px\\]:focus{--un-translate-x:2px;translate:var(--un-translate-x) var(--un-translate-y)}.focus\\:translate-y-\\[2px\\]:focus{--un-translate-y:2px;translate:var(--un-translate-x) var(--un-translate-y)}.active\\:translate-x-\\[2px\\]:active{--un-translate-x:2px;translate:var(--un-translate-x) var(--un-translate-y)}.active\\:translate-y-\\[2px\\]:active{--un-translate-y:2px;translate:var(--un-translate-x) var(--un-translate-y)}.-rotate-1{rotate:-1deg}.transform{transform:var(--un-rotate-x) var(--un-rotate-y) var(--un-rotate-z) var(--un-skew-x) var(--un-skew-y)}.transition-all{transition-property:all;transition-timing-function:var(--un-ease, var(--default-transition-timingFunction));transition-duration:var(--un-duration, var(--default-transition-duration))}.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,--un-gradient-from,--un-gradient-via,--un-gradient-to;transition-timing-function:var(--un-ease, var(--default-transition-timingFunction));transition-duration:var(--un-duration, var(--default-transition-duration))}.duration-200{--un-duration:.2s;transition-duration:.2s}.items-start{align-items:flex-start}.items-center{align-items:center}.self-start{align-self:flex-start}.inset-0{inset:calc(var(--spacing) * 0)}.bottom-10{bottom:calc(var(--spacing) * 10)}.bottom-14{bottom:calc(var(--spacing) * 14)}.bottom-2{bottom:calc(var(--spacing) * 2)}.bottom-4{bottom:calc(var(--spacing) * 4)}.bottom-6{bottom:calc(var(--spacing) * 6)}.left-1\\/2{left:50%}.left-2{left:calc(var(--spacing) * 2)}.left-3{left:calc(var(--spacing) * 3)}.left-4{left:calc(var(--spacing) * 4)}.left-8{left:calc(var(--spacing) * 8)}.right-2{right:calc(var(--spacing) * 2)}.right-3{right:calc(var(--spacing) * 3)}.right-4{right:calc(var(--spacing) * 4)}.right-6{right:calc(var(--spacing) * 6)}.right-8{right:calc(var(--spacing) * 8)}.top-1\\/2{top:50%}.top-10{top:calc(var(--spacing) * 10)}.top-2{top:calc(var(--spacing) * 2)}.top-3{top:calc(var(--spacing) * 3)}.top-4{top:calc(var(--spacing) * 4)}.top-6{top:calc(var(--spacing) * 6)}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.z-10{z-index:10}.z-20{z-index:20}.z-50{z-index:50}.overflow-hidden{overflow:hidden}.overflow-x-auto{overflow-x:auto}.overflow-y-auto{overflow-y:auto}.from-green-100{--un-gradient-from:color-mix(in oklab, var(--colors-green-100) var(--un-from-opacity), transparent);--un-gradient-stops:var(--un-gradient-via-stops, var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-to) var(--un-gradient-to-position))}.to-blue-100{--un-gradient-to:color-mix(in oklab, var(--colors-blue-100) var(--un-to-opacity), transparent);--un-gradient-stops:var(--un-gradient-via-stops, var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-to) var(--un-gradient-to-position))}.bg-cover{background-size:cover}.bg-center{background-position:center}.object-cover{object-fit:cover}.line-clamp-1{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.line-clamp-2{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.scroll-mt-20{scroll-margin-top:calc(var(--spacing) * 20)}.space-y-1>:not(:last-child){--un-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 1) * var(--un-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 1) * calc(1 - var(--un-space-y-reverse)))}.space-y-2>:not(:last-child){--un-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 2) * var(--un-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 2) * calc(1 - var(--un-space-y-reverse)))}.space-y-3>:not(:last-child){--un-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 3) * var(--un-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 3) * calc(1 - var(--un-space-y-reverse)))}.space-y-4>:not(:last-child){--un-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 4) * var(--un-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 4) * calc(1 - var(--un-space-y-reverse)))}.space-y-6>:not(:last-child){--un-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 6) * var(--un-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 6) * calc(1 - var(--un-space-y-reverse)))}.divide-black>:not(:last-child){border-color:color-mix(in srgb,var(--colors-black) var(--un-divide-opacity),transparent)}.divide-x-2>:not(:last-child){--un-divide-x-reverse:0;border-left-width:calc(2px * var(--un-divide-x-reverse));border-left-style:var(--un-border-style);border-right-width:calc(2px * calc(1 - var(--un-divide-x-reverse)));border-right-style:var(--un-border-style)}@supports (color: color-mix(in lab,red,red)){.text-black{color:color-mix(in oklab,var(--colors-black) var(--un-text-opacity),transparent)}.text-gray-400{color:color-mix(in oklab,var(--colors-gray-400) var(--un-text-opacity),transparent)}.text-gray-500{color:color-mix(in oklab,var(--colors-gray-500) var(--un-text-opacity),transparent)}.text-gray-600{color:color-mix(in oklab,var(--colors-gray-600) var(--un-text-opacity),transparent)}.text-gray-700{color:color-mix(in oklab,var(--colors-gray-700) var(--un-text-opacity),transparent)}.text-gray-800{color:color-mix(in oklab,var(--colors-gray-800) var(--un-text-opacity),transparent)}.text-green-600{color:color-mix(in oklab,var(--colors-green-600) var(--un-text-opacity),transparent)}.text-green-800{color:color-mix(in oklab,var(--colors-green-800) var(--un-text-opacity),transparent)}.text-teal-600{color:color-mix(in oklab,var(--colors-teal-600) var(--un-text-opacity),transparent)}.text-white{color:color-mix(in oklab,var(--colors-white) var(--un-text-opacity),transparent)}.hover\\:text-black:hover{color:color-mix(in oklab,var(--colors-black) var(--un-text-opacity),transparent)}.hover\\:text-teal-600:hover{color:color-mix(in oklab,var(--colors-teal-600) var(--un-text-opacity),transparent)}.hover\\:text-white:hover{color:color-mix(in oklab,var(--colors-white) var(--un-text-opacity),transparent)}.border-black{border-color:color-mix(in oklab,var(--colors-black) var(--un-border-opacity),transparent)}.border-gray-200{border-color:color-mix(in oklab,var(--colors-gray-200) var(--un-border-opacity),transparent)}.border-gray-300{border-color:color-mix(in oklab,var(--colors-gray-300) var(--un-border-opacity),transparent)}.border-green-800{border-color:color-mix(in oklab,var(--colors-green-800) var(--un-border-opacity),transparent)}.bg-accent{background-color:color-mix(in oklab,var(--colors-accent-DEFAULT) var(--un-bg-opacity),transparent)}.bg-amber-200{background-color:color-mix(in oklab,var(--colors-amber-200) var(--un-bg-opacity),transparent)}.bg-amber-300{background-color:color-mix(in oklab,var(--colors-amber-300) var(--un-bg-opacity),transparent)}.bg-black{background-color:color-mix(in oklab,var(--colors-black) var(--un-bg-opacity),transparent)}.bg-blue-200{background-color:color-mix(in oklab,var(--colors-blue-200) var(--un-bg-opacity),transparent)}.bg-blue-300{background-color:color-mix(in oklab,var(--colors-blue-300) var(--un-bg-opacity),transparent)}.bg-blue-400{background-color:color-mix(in oklab,var(--colors-blue-400) var(--un-bg-opacity),transparent)}.bg-emerald-200{background-color:color-mix(in oklab,var(--colors-emerald-200) var(--un-bg-opacity),transparent)}.bg-emerald-300{background-color:color-mix(in oklab,var(--colors-emerald-300) var(--un-bg-opacity),transparent)}.bg-gray-100{background-color:color-mix(in oklab,var(--colors-gray-100) var(--un-bg-opacity),transparent)}.bg-gray-200{background-color:color-mix(in oklab,var(--colors-gray-200) var(--un-bg-opacity),transparent)}.bg-gray-400{background-color:color-mix(in oklab,var(--colors-gray-400) var(--un-bg-opacity),transparent)}.bg-gray-50{background-color:color-mix(in oklab,var(--colors-gray-50) var(--un-bg-opacity),transparent)}.bg-green-100{background-color:color-mix(in oklab,var(--colors-green-100) var(--un-bg-opacity),transparent)}.bg-green-200{background-color:color-mix(in oklab,var(--colors-green-200) var(--un-bg-opacity),transparent)}.bg-green-300{background-color:color-mix(in oklab,var(--colors-green-300) var(--un-bg-opacity),transparent)}.bg-green-400{background-color:color-mix(in oklab,var(--colors-green-400) var(--un-bg-opacity),transparent)}.bg-lime-200{background-color:color-mix(in oklab,var(--colors-lime-200) var(--un-bg-opacity),transparent)}.bg-orange-200{background-color:color-mix(in oklab,var(--colors-orange-200) var(--un-bg-opacity),transparent)}.bg-orange-300{background-color:color-mix(in oklab,var(--colors-orange-300) var(--un-bg-opacity),transparent)}.bg-primary{background-color:color-mix(in oklab,var(--colors-primary-DEFAULT) var(--un-bg-opacity),transparent)}.bg-purple-200{background-color:color-mix(in oklab,var(--colors-purple-200) var(--un-bg-opacity),transparent)}.bg-purple-300{background-color:color-mix(in oklab,var(--colors-purple-300) var(--un-bg-opacity),transparent)}.bg-purple-50{background-color:color-mix(in oklab,var(--colors-purple-50) var(--un-bg-opacity),transparent)}.bg-red-300{background-color:color-mix(in oklab,var(--colors-red-300) var(--un-bg-opacity),transparent)}.bg-rose-300{background-color:color-mix(in oklab,var(--colors-rose-300) var(--un-bg-opacity),transparent)}.bg-secondary-lighter{background-color:color-mix(in oklab,var(--colors-secondary-lighter) var(--un-bg-opacity),transparent)}.bg-sky-200{background-color:color-mix(in oklab,var(--colors-sky-200) var(--un-bg-opacity),transparent)}.bg-sky-50{background-color:color-mix(in oklab,var(--colors-sky-50) var(--un-bg-opacity),transparent)}.bg-surface{background-color:color-mix(in oklab,var(--colors-surface-DEFAULT) var(--un-bg-opacity),transparent)}.bg-teal-200{background-color:color-mix(in oklab,var(--colors-teal-200) var(--un-bg-opacity),transparent)}.bg-teal-300{background-color:color-mix(in oklab,var(--colors-teal-300) var(--un-bg-opacity),transparent)}.bg-teal-400{background-color:color-mix(in oklab,var(--colors-teal-400) var(--un-bg-opacity),transparent)}.bg-white{background-color:color-mix(in oklab,var(--colors-white) var(--un-bg-opacity),transparent)}.bg-white\\/10{background-color:color-mix(in oklab,var(--colors-white) 10%,transparent)}.bg-yellow-200{background-color:color-mix(in oklab,var(--colors-yellow-200) var(--un-bg-opacity),transparent)}.bg-yellow-300{background-color:color-mix(in oklab,var(--colors-yellow-300) var(--un-bg-opacity),transparent)}.bg-yellow-50{background-color:color-mix(in oklab,var(--colors-yellow-50) var(--un-bg-opacity),transparent)}.hover\\:bg-accent:hover{background-color:color-mix(in oklab,var(--colors-accent-DEFAULT) var(--un-bg-opacity),transparent)}.hover\\:bg-gray-100:hover{background-color:color-mix(in oklab,var(--colors-gray-100) var(--un-bg-opacity),transparent)}.hover\\:bg-gray-50:hover{background-color:color-mix(in oklab,var(--colors-gray-50) var(--un-bg-opacity),transparent)}.ring-white{--un-ring-color:color-mix(in oklab, var(--colors-white) var(--un-ring-opacity), transparent)}}@media (min-width: 40rem){.sm\\:-mx-6{margin-inline:calc(calc(var(--spacing) * 6) * -1)}.sm\\:mx-0{margin-inline:calc(var(--spacing) * 0)}.sm\\:p-6{padding:calc(var(--spacing) * 6)}.sm\\:px-0{padding-inline:calc(var(--spacing) * 0)}.sm\\:px-6{padding-inline:calc(var(--spacing) * 6)}.sm\\:px-8{padding-inline:calc(var(--spacing) * 8)}.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.sm\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.sm\\:h-80{height:calc(var(--spacing) * 80)}.sm\\:max-w-full{max-width:100%}}@media (min-width: 48rem){.md\\:text-4xl{font-size:var(--text-4xl-fontSize);line-height:var(--un-leading, var(--text-4xl-lineHeight))}.md\\:p-4{padding:calc(var(--spacing) * 4)}.md\\:px-6{padding-inline:calc(var(--spacing) * 6)}.md\\:pb-0{padding-bottom:calc(var(--spacing) * 0)}.md\\:flex{display:flex}.md\\:col-span-2{grid-column:span 2/span 2}.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.md\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.md\\:block{display:block}.md\\:hidden{display:none}.md\\:top-20{top:calc(var(--spacing) * 20)}.md\\:sticky{position:sticky}}@media (min-width: 64rem){.lg\\:p-8{padding:calc(var(--spacing) * 8)}.lg\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}}app-item-modal .uix-modal::part(dialog){background:transparent;border:none;box-shadow:none;padding:1rem;max-width:42rem;width:100%;max-height:90vh;overflow:auto}app-item-modal .uix-modal::part(dialog)::backdrop{background:var(--modal-overlay, rgba(0,0,0,.6));backdrop-filter:blur(4px)}app-item-modal .uix-modal::part(header),app-item-modal .uix-modal::part(footer){display:none}app-item-modal .uix-modal::part(body){padding:0}:where(.uix-link,uix-link){display:inline-flex;align-items:center;justify-content:var(--link-justify-content, center);width:var(--link-width, auto);flex-direction:var(--link-direction, row);gap:var(--link-gap, var(--spacing-xs, .25rem));box-sizing:border-box;font-family:inherit;font-size:var(--link-font-size, var(--text-sm, .875rem));font-weight:var(--link-font-weight, 600);line-height:var(--link-line-height, 1.5);text-decoration:var(--link-text-decoration, none);color:var(--link-color, var(--text-color, inherit));cursor:pointer;&[vertical]::part(anchor){display:flex;flex-direction:column}&::part(anchor){display:inline-flex;align-items:center;justify-content:var(--link-justify-content, left);width:100%;height:100%;gap:var(--link-gap, var(--spacing-xs, .25rem));flex-direction:var(--link-direction, row);padding:var(--link-padding-y, var(--spacing-sm, .5rem)) var(--link-padding-x, var(--spacing-md, .75rem));font-family:inherit;font-size:inherit;font-weight:inherit;line-height:inherit;text-decoration:var(--link-text-decoration, none);color:inherit;cursor:pointer;transition:var( --link-transition, color .2s ease, opacity .2s ease, transform .1s ease );&:hover{color:var(--link-hover-color, var(--link-color));text-decoration:var( --link-hover-text-decoration, var(--link-text-decoration, none) );opacity:var(--link-hover-opacity, .9)}&:active{color:var(--link-active-color, var(--link-color));transform:var(--link-active-transform, scale(.98))}&:focus-visible{outline:2px solid var(--color-primary-dark, #d79921);outline-offset:2px}&:visited{color:var(--link-visited-color, var(--link-color))}&[disabled],&[aria-disabled=true]{opacity:var(--link-disabled-opacity, .5);cursor:not-allowed;pointer-events:none}}&::part(icon){display:inline-flex;align-items:center;justify-content:center;width:var(--link-icon-size, 1.25rem);height:var(--link-icon-size, 1.25rem);color:var(--link-icon-color, currentColor);flex-shrink:0}&[underline]{--link-text-decoration: underline}&[underline=hover]{--link-text-decoration: none;--link-hover-text-decoration: underline}&[variant=primary]{--link-color: var(--color-primary);--link-hover-color: var(--color-primary-dark);--link-active-color: var(--color-primary-darker)}&[variant=secondary]{--link-color: var(--color-secondary);--link-hover-color: var(--color-secondary-dark);--link-active-color: var(--color-secondary-darker)}&[variant=muted]{--link-color: var(--text-muted);--link-hover-color: var(--text-color)}&[size=xs]{--link-font-size: var(--text-xs, .75rem);--link-padding-y: .2rem;--link-padding-x: .4rem;--link-gap: .125rem;--link-icon-size: .75em}&[size=sm]{--link-font-size: var(--text-sm, .875rem);--link-padding-y: .25rem;--link-padding-x: .5rem;--link-gap: .25rem;--link-icon-size: .875em}&[size=md]{--link-font-size: var(--text-base, 1rem);--link-padding-y: .5rem;--link-padding-x: .75rem;--link-gap: .375rem;--link-icon-size: 1em}&[size=lg]{--link-font-size: var(--text-lg, 1.125rem);--link-padding-y: .75rem;--link-padding-x: 1rem;--link-gap: .5rem;--link-icon-size: 1.125em}&[size=xl]{--link-font-size: var(--text-xl, 1.25rem);--link-padding-y: 1rem;--link-padding-x: 1.25rem;--link-gap: .625rem;--link-icon-size: 1.25em}&[compact]{--link-padding-x: 0;--link-padding-y: 0}&[w-full],&[wfull]{width:100%;display:flex}}:where(.uix-icon,uix-icon){display:inline-block;vertical-align:middle;--icon-size: calc(var(--spacing, .25rem) * 4);width:var(--icon-size);height:var(--icon-size);svg{height:inherit;width:inherit}&[solid]{stroke:currentColor;fill:currentColor}&[color=primary]{color:var(--color-primary)}&[color=secondary]{color:var(--color-secondary)}&[color=success]{color:var(--color-success)}&[color=danger]{color:var(--color-danger)}&[color=warning]{color:var(--color-warning)}&[color=info]{color:var(--color-info)}&[color=inverse]{color:var(--color-inverse)}&[size=xs]{--icon-size: calc(var(--spacing, .25rem) * 3)}&[size=sm]{--icon-size: calc(var(--spacing, .25rem) * 4)}&[size=md]{--icon-size: calc(var(--spacing, .25rem) * 6)}&[size=lg]{--icon-size: calc(var(--spacing, .25rem) * 8)}&[size=xl]{--icon-size: calc(var(--spacing, .25rem) * 10)}&[size="2xl"]{--icon-size: calc(var(--spacing, .25rem) * 14)}&[size="3xl"]{--icon-size: calc(var(--spacing, .25rem) * 20)}&[size="4xl"]{--icon-size: calc(var(--spacing, .25rem) * 30)}}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}.scrollbar-hide::-webkit-scrollbar{display:none}:where(.uix-avatar,uix-avatar){--avatar-size: 2.5rem;--avatar-bg: var(--color-surface-dark, #e5e7eb);--avatar-color: var(--text-muted, #6b7280);--avatar-radius: 50%;--status-size: .75rem;position:relative;display:inline-flex;align-items:center;justify-content:center;width:var(--avatar-size);height:var(--avatar-size);border-radius:var(--avatar-radius);background-color:var(--avatar-ring-color, white);color:var(--avatar-color);border:var(--avatar-border, 2px solid #d1d5db);box-shadow:var(--avatar-shadow, 0 1px 3px 0 rgba(0, 0, 0, .1));padding:var(--avatar-ring, 0px);overflow:hidden;flex-shrink:0;&[size=xs]{--avatar-size: 1.5rem;--status-size: .5rem}&[size=sm]{--avatar-size: 2rem;--status-size: .625rem}&[size=md]{--avatar-size: 2.5rem;--status-size: .75rem}&[size=lg]{--avatar-size: 3.5rem;--status-size: 1rem}&[size=xl]{--avatar-size: 5rem;--status-size: 1.25rem}&[shape=circle]{--avatar-radius: 50%}&[shape=square]{--avatar-radius: 0}&[shape=rounded]{--avatar-radius: var(--radius-md, .375rem)}img{width:100%;height:100%;object-fit:cover;border-radius:100%}.initials{font-size:calc(var(--avatar-size) / 2.5);font-weight:600;line-height:1;text-transform:uppercase;user-select:none}uix-icon{font-size:calc(var(--avatar-size) / 1.8)}.status{position:absolute;bottom:0;right:0;width:var(--status-size);height:var(--status-size);border-radius:50%;border:2px solid var(--color-surface, #fff);box-sizing:border-box}.status--online{background-color:var(--color-success, #22c55e)}.status--offline{background-color:var(--color-muted, #9ca3af)}.status--busy{background-color:var(--color-danger, #ef4444)}.status--away{background-color:var(--color-warning, #f59e0b)}}:where(.uix-drawer,uix-drawer){position:fixed;inset:0;z-index:var(--drawer-z-index, 1000);pointer-events:none;&[open]{pointer-events:auto;display:flex}&::part(backdrop){display:none;pointer-events:none}&[open]::part(backdrop){display:block;position:absolute;inset:0;background-color:var(--drawer-overlay-background, rgba(0, 0, 0, .6));backdrop-filter:var(--drawer-overlay-blur, blur(2px));z-index:var(--drawer-overlay-z-index, 100);animation:drawer-backdrop-fade-in var(--drawer-animation-duration, .25s) ease-out;cursor:pointer;pointer-events:auto}&::part(panel){position:absolute;background-color:var(--drawer-background, var(--color-surface-light, #ffffff));box-shadow:var(--drawer-shadow, 0 0 30px rgba(0, 0, 0, .4));border:var(--drawer-border-width, 0) solid var(--drawer-border-color, var(--color-surface));z-index:var(--drawer-panel-z-index, 1001);overflow-y:auto;overflow-x:hidden;transition:var( --drawer-transition, transform var(--drawer-animation-duration, .3s) ease-in-out, opacity var(--drawer-animation-duration, .3s) ease-in-out );opacity:0;pointer-events:none}&[open]::part(panel){opacity:1;pointer-events:auto}&::part(header){display:flex;align-items:center;justify-content:space-between;padding:var(--drawer-header-padding, var(--spacing-md, .75rem) var(--spacing-lg, 1rem));border-bottom:var(--drawer-header-border-width, 1px) solid var(--drawer-header-border-color, var(--color-surface));background:var(--drawer-header-background, transparent);font-size:var(--drawer-header-font-size, var(--text-lg, 1.125rem));font-weight:var(--drawer-header-font-weight, var(--font-semibold, 600));color:var(--drawer-header-color, var(--text-color))}&::part(body){flex:1;padding:var(--drawer-body-padding, var(--spacing-lg, 1rem));overflow-y:auto;color:var(--drawer-body-color, var(--text-color))}&::part(footer){display:flex;align-items:center;justify-content:flex-end;gap:var(--drawer-footer-gap, var(--spacing-sm, .5rem));padding:var(--drawer-footer-padding, var(--spacing-md, .75rem) var(--spacing-lg, 1rem));border-top:var(--drawer-footer-border-width, 1px) solid var(--drawer-footer-border-color, var(--color-surface));background:var(--drawer-footer-background, transparent)}&:not([position]),&[position=left]{&::part(panel){top:0;left:0;bottom:0;width:var(--drawer-width, 280px);min-width:var(--drawer-min-width, min(70%, 280px));max-width:var(--drawer-max-width, 400px);height:100%;transform:translate(-100%);border-radius:0 var(--drawer-border-radius, 0) var(--drawer-border-radius, 0) 0}&[open]::part(panel){transform:translate(0)}}&[position=right]{&::part(panel){top:0;right:0;bottom:0;width:var(--drawer-width, 280px);min-width:var(--drawer-min-width, min(70%, 280px));max-width:var(--drawer-max-width, 400px);height:100%;transform:translate(100%);border-radius:var(--drawer-border-radius, 0) 0 0 var(--drawer-border-radius, 0)}&[open]::part(panel){transform:translate(0)}}&[position=top]{&::part(panel){top:0;left:0;right:0;width:100%;height:var(--drawer-height, 50vh);min-height:var(--drawer-min-height, 200px);max-height:var(--drawer-max-height, 80vh);transform:translateY(-100%);border-radius:0 0 var(--drawer-border-radius, 0) var(--drawer-border-radius, 0)}&[open]::part(panel){transform:translateY(0)}}&[position=bottom]{&::part(panel){bottom:0;left:0;right:0;width:100%;height:var(--drawer-height, 50vh);min-height:var(--drawer-min-height, 200px);max-height:var(--drawer-max-height, 80vh);transform:translateY(100%);border-radius:var(--drawer-border-radius, 0) var(--drawer-border-radius, 0) 0 0}&[open]::part(panel){transform:translateY(0)}}&[size=sm]{--drawer-width: 240px;--drawer-height: 30vh}&[size=md]{--drawer-width: 320px;--drawer-height: 50vh}&[size=lg]{--drawer-width: 400px;--drawer-height: 70vh}&[size=xl]{--drawer-width: 500px;--drawer-height: 85vh}&[size=full]{--drawer-width: 100%;--drawer-height: 100vh;--drawer-max-width: 100%;--drawer-max-height: 100vh}}@keyframes drawer-backdrop-fade-in{0%{opacity:0}to{opacity:1}}:where(.uix-spinner,uix-spinner){display:inline-flex;align-items:center;justify-content:center;--spinner-color: var(--color-primary);--spinner-size: 2rem;width:var(--spinner-size);height:var(--spinner-size);position:relative;&[primary]{--spinner-color: var(--color-primary)}&[secondary]{--spinner-color: var(--color-secondary)}&[success]{--spinner-color: var(--color-success)}&[danger]{--spinner-color: var(--color-danger)}&[warning]{--spinner-color: var(--color-warning)}&[info]{--spinner-color: var(--color-info)}&[size=xs]{--spinner-size: 1rem}&[size=sm]{--spinner-size: 1.5rem}&[size=md]{--spinner-size: 2rem}&[size=lg]{--spinner-size: 3rem}&[size=xl]{--spinner-size: 4rem}&[variant=circular]:before{content:"";display:block;width:100%;height:100%;border:calc(var(--spinner-size) / 8) solid var(--color-surface-darker);border-top-color:var(--spinner-color);border-radius:50%;animation:spinner-circular .8s linear infinite}&[variant=dots]{gap:calc(var(--spinner-size) / 6)}&[variant=dots] .dot{display:block;width:calc(var(--spinner-size) / 4);height:calc(var(--spinner-size) / 4);background-color:var(--spinner-color);border-radius:50%;animation:spinner-dots 1.4s ease-in-out infinite}&[variant=dots] .dot:nth-child(1){animation-delay:-.32s}&[variant=dots] .dot:nth-child(2){animation-delay:-.16s}&[variant=dots] .dot:nth-child(3){animation-delay:0s}&[variant=bars]{gap:calc(var(--spinner-size) / 8)}&[variant=bars] .bar{display:block;width:calc(var(--spinner-size) / 6);height:100%;background-color:var(--spinner-color);border-radius:calc(var(--spinner-size) / 12);animation:spinner-bars 1.2s ease-in-out infinite}&[variant=bars] .bar:nth-child(1){animation-delay:-.24s}&[variant=bars] .bar:nth-child(2){animation-delay:-.12s}&[variant=bars] .bar:nth-child(3){animation-delay:0s}}@keyframes spinner-circular{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes spinner-dots{0%,80%,to{opacity:.3;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}@keyframes spinner-bars{0%,40%,to{transform:scaleY(.4);opacity:.5}20%{transform:scaleY(1);opacity:1}}:where(.uix-container,uix-container){display:block;box-sizing:border-box;background:var(--container-background, var(--color-surface-lighter));border:1px solid var(--container-border-color, var(--color-surface-dark));border-radius:var(--container-border-radius, var(--radius-md, .375rem));overflow:var(--container-overflow, visible);&[padding=none]{padding:0}&[padding=sm]{padding:var(--spacing-sm, .5rem)}&[padding=md]{padding:var(--spacing-md, .75rem) var(--spacing-lg, 1rem)}&[padding=lg]{padding:var(--spacing-lg, 1rem) var(--spacing-xl, 1.5rem)}&[overflow=visible]{--container-overflow: visible}&[overflow=hidden]{--container-overflow: hidden}&[overflow=auto]{--container-overflow: auto}&[overflow=scroll]{--container-overflow: scroll}}:where(.uix-card,uix-card){display:flex;flex-direction:column;overflow:hidden;background:var(--card-background, inherit);--container-border-color: #000;&::part(body){display:flex;flex-direction:column;flex:1}>[slot=header]{margin:0;display:flex;padding:var( --card-header-padding, var(--spacing-md, .75rem) var(--spacing-lg, 1rem) );border-bottom-width:var(--card-header-border-width, 0);border-bottom-style:solid;border-bottom-color:var( --card-header-border-color, var(--card-border-primary, #504945) );background:var(--card-header-background-color, transparent)}>[slot=footer]{display:flex;padding:var( --card-footer-padding, var(--spacing-md, .75rem) var(--spacing-lg, 1rem) );border-top-width:var(--card-footer-border-width, 0);border-top-style:var(--card-footer-border-style, solid);border-top-color:var( --card-footer-border-color, var(--color-surface, #504945) );background:var(--card-footer-background-color, transparent);flex-direction:row;gap:var(--spacing-sm, .5rem);align-items:center;justify-content:flex-end}&[style*=--card-gradient-from]::part(body){background:linear-gradient(135deg,var(--card-gradient-from),var(--card-gradient-to, var(--card-gradient-from)))}&[padding=none]::part(body){padding:0}&[padding=sm]::part(body){padding:var(--spacing-sm, .5rem)}&[padding=md]::part(body){padding:var(--spacing-md, .75rem) var(--spacing-lg, 1rem)}&[padding=lg]::part(body){padding:var(--spacing-lg, 1rem) var(--spacing-xl, 1.5rem)}&[borderWidth=none]{border-width:0}&[borderWidth="1"]{border-width:1px}&[borderWidth="2"]{border-width:2px}&[borderWidth="3"]{border-width:3px}&[borderStyle=solid]{border-style:solid}&[borderStyle=dashed]{border-style:dashed}&[borderStyle=dotted]{border-style:dotted}&[gap=none]::part(body){gap:0}&[gap=xs]::part(body){gap:var(--spacing-xs, .25rem)}&[gap=sm]::part(body){gap:var(--spacing-sm, .5rem)}&[gap=md]::part(body){gap:var(--spacing-md, .75rem)}&[gap=lg]::part(body){gap:var(--spacing-lg, 1rem)}&[gap=xl]::part(body){gap:var(--spacing-xl, 1.5rem)}&[shadow=sm]{box-shadow:var(--shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, .05))}&[shadow=md]{box-shadow:var( --shadow-md, 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06) )}&[shadow=lg]{box-shadow:var( --shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05) )}&[hover]{transition:all .2s ease;cursor:pointer;&:hover{border-color:var(--card-border-hover, #83a598)}&[shadow=sm]:hover{box-shadow:var( --shadow-md, 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06) )}&[shadow=md]:hover{box-shadow:var( --shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05) )}&[shadow=lg]:hover{box-shadow:var( --shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, .1), 0 10px 10px -5px rgba(0, 0, 0, .04) )}}&[variant=filled]{--container-background: var(--color-surface-light);--container-border-color: var(--color-surface)}&[variant=outlined]{--container-background: transparent;--container-border-color: var(--color-surface)}&[variant=elevated]{--container-background: var(--color-surface-lighter);--container-border-color: var(--color-surface-dark);box-shadow:0 1px 3px #0000001f,0 1px 2px #0000003d;&:hover{box-shadow:0 3px 6px #00000029,0 3px 6px #0000003b;transition:box-shadow .3s ease}}}uix-modal::part(dialog){border:4px solid black;border-radius:1.5rem;box-shadow:8px 8px #ffffff80;max-width:28rem;padding:0;overflow:hidden}uix-modal::part(header){background:var(--color-primary);color:#000;border-bottom:3px solid black;padding:1.5rem}uix-modal::part(body){padding:0}:where(.uix-calendar,uix-calendar){display:block;--calendar-border-width: 2px;--calendar-border-color: black;--calendar-border-radius: .75rem;--calendar-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);--calendar-shadow-sm: 2px 2px 0px 0px rgba(0, 0, 0, 1);--calendar-today-bg: #fef3c7;--calendar-today-border: #eab308;--calendar-selected-bg: var(--color-accent, #f472b6);--calendar-font-family: inherit;&::part(view-toggle){display:flex;gap:.5rem;margin-bottom:1rem}&::part(toggle-btn){flex:1;padding:.5rem 1rem;font-weight:900;font-size:.875rem;text-transform:uppercase;border:3px solid var(--calendar-border-color);border-radius:var(--calendar-border-radius);background:#fff;box-shadow:3px 3px #000;cursor:pointer;transition:all .15s ease;&:active{transform:translate(2px,2px);box-shadow:1px 1px #000}}&::part(toggle-btn-active){background:var(--calendar-selected-bg)}&::part(header){display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem}&::part(nav-btn){width:2.5rem;height:2.5rem;display:flex;align-items:center;justify-content:center;background:#fff;border:3px solid var(--calendar-border-color);border-radius:.5rem;box-shadow:var(--calendar-shadow);cursor:pointer;transition:all .15s ease;&:active{transform:translate(2px,2px);box-shadow:var(--calendar-shadow-sm)}}&::part(month-label){font-size:1.125rem;font-weight:900;text-transform:uppercase}&::part(today-btn){width:100%;margin-bottom:1rem;padding:.5rem 1rem;background:#f9a8d4;border:3px solid var(--calendar-border-color);border-radius:var(--calendar-border-radius);font-weight:900;font-size:.875rem;text-transform:uppercase;box-shadow:var(--calendar-shadow);cursor:pointer;transition:all .15s ease;&:active{transform:translate(2px,2px);box-shadow:var(--calendar-shadow-sm)}}&::part(grid){background:#fff;border:3px solid var(--calendar-border-color);border-radius:var(--calendar-border-radius);padding:.75rem;box-shadow:6px 6px #000}&::part(weekday-header){display:grid;grid-template-columns:repeat(7,1fr);gap:.25rem;margin-bottom:.5rem}&::part(weekday){text-align:center;font-weight:900;font-size:.75rem;color:#4b5563}&::part(days-grid){display:grid;grid-template-columns:repeat(7,1fr);gap:.25rem}&::part(day){aspect-ratio:1;position:relative;display:flex;flex-direction:column;align-items:flex-start;padding:.25rem;border-radius:.5rem;border:2px solid #d1d5db;cursor:pointer;overflow:hidden;transition:all .15s ease;&:active{transform:translate(1px,1px)}}&::part(day-today){background:var(--calendar-today-bg);border-color:var(--calendar-today-border);border-width:3px}&::part(day-selected){background:var(--calendar-selected-bg);border-color:var(--calendar-border-color);border-width:3px;box-shadow:var(--calendar-shadow-sm)}&::part(day-other-month){opacity:.4}&::part(day-number){font-size:.75rem;font-weight:700;margin-bottom:.125rem}&::part(day-events){width:100%;display:flex;flex-direction:column;gap:.125rem}&::part(event){font-size:9px;line-height:1.1;font-weight:700;padding:.125rem .25rem;border-radius:.25rem;border:1px solid var(--calendar-border-color);background:#e0e7ff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}&::part(more-events){font-size:8px;font-weight:700;color:#4b5563;padding:0 .25rem}&::part(list){display:flex;flex-direction:column;gap:1.5rem}&::part(list-section-title){font-size:.875rem;font-weight:900;text-transform:uppercase;color:#4b5563;margin-bottom:.75rem}&::part(list-item){display:flex;gap:1rem;background:#fff;border:3px solid var(--calendar-border-color);border-radius:var(--calendar-border-radius);padding:1rem;box-shadow:var(--calendar-shadow);cursor:pointer;transition:all .15s ease;&:hover{transform:translate(2px,2px);box-shadow:var(--calendar-shadow-sm)}}&::part(list-item-image){width:5rem;height:5rem;object-fit:cover;border-radius:.5rem;border:2px solid var(--calendar-border-color)}&::part(list-item-title){font-weight:900;font-size:.875rem;line-height:1.25}&::part(list-item-meta){font-size:.75rem;color:#4b5563;margin-top:.25rem}&::part(recurring-badge){flex-shrink:0;font-size:.75rem;font-weight:700;background:#ddd6fe;border:1px solid var(--calendar-border-color);padding:.125rem .5rem;border-radius:.25rem}&::part(panel-overlay){position:fixed;inset:0;background:#00000080;z-index:40}&::part(panel){position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:3px solid var(--calendar-border-color);border-radius:1rem 1rem 0 0;z-index:50;max-height:70vh;overflow-y:auto}&::part(panel-header){position:sticky;top:0;background:#fff;border-bottom:2px solid var(--calendar-border-color);padding:1rem 1.5rem;display:flex;align-items:center;justify-content:space-between}&::part(panel-title){font-weight:900;font-size:1.125rem}&::part(panel-close){width:2rem;height:2rem;display:flex;align-items:center;justify-content:center;border:2px solid var(--calendar-border-color);border-radius:.5rem;background:#fff;cursor:pointer;&:hover{background:#f3f4f6}}&::part(panel-content){padding:1rem 1.5rem;display:flex;flex-direction:column;gap:.75rem}&::part(panel-item){display:flex;gap:.75rem;background:#f9fafb;border:2px solid var(--calendar-border-color);border-radius:var(--calendar-border-radius);padding:.75rem;cursor:pointer;box-shadow:3px 3px #000;transition:all .15s ease;&:hover{transform:translate(2px,2px);box-shadow:none}}&::part(panel-item-image){width:4rem;height:4rem;object-fit:cover;border-radius:.5rem;border:2px solid var(--calendar-border-color)}&::part(panel-item-title){font-weight:700;font-size:.875rem;line-height:1.25}&::part(panel-item-meta){font-size:.75rem;color:#4b5563;margin-top:.25rem}&::part(panel-empty){text-align:center;font-size:.875rem;font-weight:700;color:#9ca3af;padding:2rem 0}&::part(empty){display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5rem 0;.empty-icon{font-size:3.75rem;margin-bottom:1rem}.empty-text{font-size:1.125rem;font-weight:700;color:#9ca3af}}}.meetup-card-compact.uix-card{cursor:pointer;height:100%;background:#fff;border-color:var(--card-border-color, black);border-radius:1rem}.meetup-card-compact.uix-card>[slot=header]{border-bottom:3px solid var(--card-border-color, black);padding:0}.meetup-card-compact.uix-card>[slot=footer]{justify-content:stretch}.meetup-card-compact.uix-card>[slot=footer]>button{width:100%}:root{--font-family: Manrope;--font-icon-family: lucide;--font-normal: 400;--font-medium: 500;--font-semibold: 600;--font-bold: 700;--font-black: 900;--link-color: var(--text-color);--text-color: #1a1a1a;--text-muted: #6b7280;--text-xs: .75rem;--text-sm: .875rem;--text-base: 1rem;--text-lg: 1.125rem;--text-xl: 1.25rem;--text-2xl: 1.5rem;--text-3xl: 1.875rem;--background-color: #faf5f0;--color-primary: #fabd2f;--color-primary-lighter: #fde8a3;--color-primary-light: #fcd875;--color-primary-dark: #d79921;--color-primary-darker: #b57614;--color-secondary: #ec4899;--color-secondary-lighter: #fbcfe8;--color-secondary-light: #f9a8d4;--color-secondary-dark: #db2777;--color-secondary-darker: #be185d;--color-success: #22c55e;--color-success-lighter: #bbf7d0;--color-success-light: #86efac;--color-success-dark: #16a34a;--color-success-darker: #15803d;--color-danger: #ef4444;--color-danger-lighter: #fecaca;--color-danger-light: #fca5a5;--color-danger-dark: #dc2626;--color-danger-darker: #b91c1c;--color-warning: #f97316;--color-warning-lighter: #fed7aa;--color-warning-light: #fdba74;--color-warning-dark: #ea580c;--color-warning-darker: #c2410c;--color-info: #3b82f6;--color-info-lighter: #bfdbfe;--color-info-light: #93c5fd;--color-info-dark: #2563eb;--color-info-darker: #1d4ed8;--color-surface: #ffffff;--color-surface-light: #faf5f0;--color-surface-lighter: #ffffff;--color-surface-dark: #f5f0eb;--color-surface-darker: #ebe5df;--color-hover: #d79921;--color-hover-lighter: hsl(40 73% 69%);--color-hover-light: hsl(40 73% 59%);--color-hover-dark: hsl(40 73% 39%);--color-hover-darker: hsl(40 73% 29%);--color-focus: #fabd2f;--color-focus-lighter: hsl(42 95% 78%);--color-focus-light: hsl(42 95% 68%);--color-focus-dark: hsl(42 95% 48%);--color-focus-darker: hsl(42 95% 38%);--color-inverse: #1a1a1a;--color-inverse-lighter: #525252;--color-inverse-light: #404040;--color-inverse-dark: #0a0a0a;--color-inverse-darker: #000000;--spacing-xs: .25rem;--spacing-sm: .5rem;--spacing-md: .75rem;--spacing-lg: 1rem;--spacing-xl: 1.5rem;--spacing-2xl: 2rem;--spacing-3xl: 3rem;--spacing-4xl: 5rem;--leading-tight: 1.2;--leading-normal: 1.5;--leading-relaxed: 1.75;--radius-none: 0;--radius-sm: .5rem;--radius-md: .75rem;--radius-lg: 1rem;--radius-xl: 1.5rem;--radius-full: 9999px;--shadow-none: none;--shadow-sm: 2px 2px 0px 0px rgba(0,0,0,1);--shadow-md: 4px 4px 0px 0px rgba(0,0,0,1);--shadow-lg: 6px 6px 0px 0px rgba(0,0,0,1);--shadow-xl: 8px 8px 0px 0px rgba(0,0,0,1);--shadow-2xl: 12px 12px 0px 0px rgba(0,0,0,1);--button-border-size: 3px;--button-border-color: black;--button-border-radius: .75rem;--button-shadow: 4px 4px 0px 0px rgba(0,0,0,1);--button-hover-shadow: 2px 2px 0px 0px rgba(0,0,0,1);--button-active-shadow: none;--button-hover-translate-x: -2px;--button-hover-translate-y: -2px;--button-active-translate-x: 2px;--button-active-translate-y: 2px;--button-font-weight: 900;--button-text-transform: uppercase;--input-background: #ffffff;--input-background-focus: #ffffff;--input-background-disabled: #f5f5f5;--input-border-color: #000000;--input-border-width: 3px;--input-border-radius: .75rem;--input-border-focus: #000000;--input-border-error: #ef4444;--input-text: #1a1a1a;--input-placeholder: #9ca3af;--input-icon: #6b7280;--input-shadow: 4px 4px 0px 0px rgba(0,0,0,1);--input-focus-shadow: 6px 6px 0px 0px rgba(0,0,0,1);--checkbox-border-width: 3px;--checkbox-border-color: #000000;--checkbox-border-radius: .375rem;--checkbox-shadow: 3px 3px 0px 0px rgba(0,0,0,1);--checkbox-hover-border-color: #000000;--checkbox-checked-background-color: #fabd2f;--checkbox-checked-border-color: #000000;--checkbox-label-font-weight: 600;--label-font-size: 1rem;--label-font-weight: 700;--label-color: #1a1a1a;--label-letter-spacing: .05em;--label-text-transform: uppercase;--label-margin: .5rem;--tabs-background: #ffffff;--tabs-border-color: #000000;--tabs-border-width: 3px;--tabs-border-radius: .75rem;--tabs-shadow: 4px 4px 0px 0px rgba(0,0,0,1);--tabs-list-background: #f5f5f5;--tabs-list-border-color: #000000;--tabs-tab-padding: 1rem 1.5rem;--tabs-tab-gap: .5rem;--tabs-tab-font-size: .875rem;--tabs-tab-font-weight: 900;--tabs-tab-text-transform: uppercase;--tabs-tab-letter-spacing: .05em;--tabs-tab-color: #6b7280;--tabs-tab-color-hover: #1a1a1a;--tabs-tab-color-active: #1a1a1a;--tabs-tab-background: transparent;--tabs-tab-background-hover: #e5e5e5;--tabs-tab-background-active: #ffffff;--tabs-tab-border-width: 3px;--tabs-tab-border-active: #000000;--card-background: #ffffff;--card-border: #000000;--card-border-width: 3px;--card-border-hover: #000000;--card-text: #1a1a1a;--card-text-muted: #6b7280;--card-header-background: transparent;--card-header-border: #000000;--card-header-padding: .75rem 1rem;--card-footer-background: transparent;--card-footer-border: #000000;--card-footer-border-style: solid;--card-footer-padding: .75rem 1rem;--card-icon-background: #f5f5f5;--card-icon-size: 3rem;--card-icon-border-radius: .75rem;--card-tag-background: #fabd2f;--card-tag-text: #1a1a1a;--card-tag-padding: .25rem .5rem;--card-tag-border-radius: .5rem;--avatar-border: 3px solid #000000;--avatar-shadow: 3px 3px 0px 0px #000;--avatar-ring: 3px;--avatar-ring-color: #ffffff;--modal-background: #ffffff;--modal-border-width: 3px;--modal-border-color: #000000;--modal-border-radius: 1rem;--modal-shadow: 8px 8px 0px 0px rgba(0,0,0,1);--modal-color: #1a1a1a;--modal-overlay: rgba(0, 0, 0, .5);--modal-header-padding: 1.25rem 1.5rem;--modal-header-border-width: 3px;--modal-header-background: #ffffff;--modal-header-font-size: 1.25rem;--modal-header-font-weight: 900;--modal-header-color: #1a1a1a;--modal-body-padding: 1.5rem;--modal-body-color: #4b5563;--modal-footer-padding: 1rem 1.5rem;--modal-footer-border-width: 3px;--modal-footer-background: #f9fafb;--drawer-background: #ffffff;--drawer-border-width: 3px;--drawer-border-color: #000000;--drawer-border-radius: 0;--drawer-shadow: 6px 6px 0px 0px rgba(0,0,0,1);--drawer-overlay-background: rgba(0, 0, 0, .6);--drawer-header-padding: 1rem 1.25rem;--drawer-header-border-width: 3px;--drawer-header-border-color: #000000;--drawer-header-background: #ffffff;--drawer-header-font-size: 1.125rem;--drawer-header-font-weight: 900;--drawer-header-color: #1a1a1a;--drawer-body-padding: 1rem;--drawer-body-color: #4b5563;--drawer-footer-padding: 1rem 1.25rem;--drawer-footer-border-width: 3px;--drawer-footer-background: #f9fafb;--panel-background: #ffffff;--panel-background-hover: #f5f5f5;--panel-border: #000000;--panel-header-background: transparent;--panel-header-text: #1a1a1a;--panel-header-border: #000000;--dropdown-background: #ffffff;--dropdown-background-hover: #f5f5f5;--dropdown-background-active: #e5e5e5;--dropdown-border: #000000;--dropdown-text: #1a1a1a;--dropdown-text-muted: #6b7280;--dropdown-separator: #e5e5e5;--dropdown-shadow: 4px 4px 0px 0px rgba(0,0,0,1);--badge-default-background: #f5f5f5;--badge-default-text: #1a1a1a;--badge-default-border: #000000;--badge-success-background: #22c55e;--badge-success-text: #ffffff;--badge-success-border: #000000;--badge-danger-background: #ef4444;--badge-danger-text: #ffffff;--badge-danger-border: #000000;--badge-warning-background: #f97316;--badge-warning-text: #ffffff;--badge-warning-border: #000000;--badge-info-background: #3b82f6;--badge-info-text: #ffffff;--badge-info-border: #000000;--list-background: transparent;--list-background-hover: #f5f5f5;--list-background-active: #e5e5e5;--list-background-selected: #fabd2f;--list-border: #000000;--list-border-hover: #000000;--list-text: #1a1a1a;--list-text-muted: #6b7280;--tree-background: transparent;--tree-background-hover: #f5f5f5;--tree-background-selected: #fabd2f;--tree-border: #000000;--tree-indent: 1rem;--tree-icon: #6b7280;--tree-icon-hover: #1a1a1a;--table-border-width: 3px;--table-border-color: #000000;--table-border-radius: 1rem;--table-shadow: 4px 4px 0px 0px rgba(0,0,0,1);--table-header-background: #ffffff;--table-header-color: #1a1a1a;--table-header-font-weight: 900;--table-header-font-size: .75rem;--table-header-text-transform: uppercase;--table-row-background: #ffffff;--table-row-hover-background: #fef3c7;--table-cell-padding: 1rem 1.25rem;--table-cell-font-size: .875rem;--table-cell-color: #4b5563;--pagination-border-width: 3px;--pagination-border-color: #000000;--pagination-border-radius: .75rem;--pagination-background: #ffffff;--pagination-color: #1a1a1a;--pagination-font-weight: 700;--pagination-shadow: 3px 3px 0px 0px rgba(0,0,0,1);--pagination-hover-background: #f5f5f5;--pagination-hover-border-color: #000000;--pagination-hover-shadow: 2px 2px 0px 0px rgba(0,0,0,1);--pagination-hover-transform: translate(-1px, -1px);--pagination-active-background: #fabd2f;--pagination-active-border-color: #000000;--pagination-active-color: #000000;--pagination-active-shadow: 3px 3px 0px 0px rgba(0,0,0,1);--pagination-nav-font-weight: 900;--progress-border-width: 3px;--progress-border-color: #000000;--progress-border-radius: .75rem;--progress-background: #ffffff;--progress-fill-background: var(--color-primary);--progress-shadow: 3px 3px 0px 0px rgba(0,0,0,1);--progress-height: 1.25rem;--progress-height-sm: .75rem;--progress-height-lg: 1.75rem;--breadcrumbs-font-size: .875rem;--breadcrumbs-font-weight: 700;--breadcrumbs-current-font-weight: 900;--breadcrumbs-text-transform: uppercase;--breadcrumbs-letter-spacing: .05em;--breadcrumbs-link-color: #6b7280;--breadcrumbs-link-hover-color: #1a1a1a;--breadcrumbs-current-color: #1a1a1a;--breadcrumbs-separator-color: #9ca3af;--breadcrumbs-gap: .5rem;--sidebar-background: #ffffff;--sidebar-border-width: 3px;--sidebar-border-color: #000000;--sidebar-border-radius: 0;--sidebar-shadow: none;--sidebar-width: 256px;--sidebar-collapsed-width: 80px;--sidebar-header-padding: 1rem;--sidebar-header-background: #ffffff;--sidebar-header-border-width: 3px;--sidebar-header-font-weight: 900;--sidebar-content-padding: .75rem;--sidebar-footer-padding: .75rem;--sidebar-footer-background: #ffffff;--sidebar-footer-border-width: 3px;--sidebar-toggle-background: transparent;--sidebar-toggle-hover-background: #f5f5f5;--sidebar-toggle-border-radius: .5rem;--sidebar-item-padding: .75rem 1rem;--sidebar-item-border-radius: .75rem;--sidebar-item-font-weight: 500;--sidebar-item-color: #4b5563;--sidebar-item-hover-background: #f5f5f5;--sidebar-item-hover-color: #1a1a1a;--sidebar-item-active-background: #000000;--sidebar-item-active-color: #ffffff;--sidebar-item-active-font-weight: 600}:root{--font-family-base: "Manrope", sans-serif}body{font-family:var(--font-family-base)}
`,mimeType:"text/css"}},BUNDLE_ADMIN=!1;self.addEventListener("install",e=>{console.log("SW: Installing new version...")}),self.addEventListener("activate",e=>{console.log("SW: Activated"),e.waitUntil(self.clients.claim())}),self.addEventListener("message",e=>{e.data?.type==="SKIP_WAITING"&&(console.log("SW: Skip waiting requested, activating..."),self.skipWaiting())}),self.addEventListener("fetch",e=>{let t=new URL(e.request.url).pathname;t.startsWith("/npm/")&&(t="/"+t.slice(5));const r=FILE_BUNDLE[t];if(r){e.respondWith(new Response(r.content,{headers:{"Content-Type":r.mimeType||"application/javascript"}}));return}if(!(t.includes(".")&&!t.endsWith("/"))&&e.request.mode==="navigate"){if(BUNDLE_ADMIN&&t.startsWith("/admin")){const a=FILE_BUNDLE["/admin/index.html"];if(a){e.respondWith(new Response(a.content,{headers:{"Content-Type":"text/html"}}));return}}const n=FILE_BUNDLE["/index.html"];if(n){e.respondWith(new Response(n.content,{headers:{"Content-Type":"text/html"}}));return}}});
