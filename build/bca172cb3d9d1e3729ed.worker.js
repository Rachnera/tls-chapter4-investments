!function(e){var n={};function r(t){if(n[t])return n[t].exports;var i=n[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)r.d(t,i,function(n){return e[n]}.bind(null,i));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="/tls-investment-advisor/",r(r.s=0)}([function(e,n,r){"use strict";function t(e,n){(null==n||n>e.length)&&(n=e.length);for(var r=0,t=new Array(n);r<n;r++)t[r]=e[r];return t}function i(e,n){if(e){if("string"===typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,n):void 0}}function o(e){return function(e){if(Array.isArray(e))return t(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||i(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,n){if(null==e)return{};var r,t,i=function(e,n){if(null==e)return{};var r,t,i={},o=Object.keys(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||(i[r]=e[r]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}function c(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function u(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function s(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?u(Object(r),!0).forEach((function(n){c(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function l(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var r=[],t=!0,i=!1,o=void 0;try{for(var a,c=e[Symbol.iterator]();!(t=(a=c.next()).done)&&(r.push(a.value),!n||r.length!==n);t=!0);}catch(u){i=!0,o=u}finally{try{t||null==c.return||c.return()}finally{if(i)throw o}}return r}}(e,n)||i(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}r.r(n),r.d(n,"prepare",(function(){return w})),r.d(n,"preprocess",(function(){return G})),r.d(n,"process",(function(){return k})),r.d(n,"clean",(function(){return M}));var f,p,v,m,y,d=[{name:"Bank of Stineford",price:4e5,profits:24e4,country:"Stineford/Feroholm"},{name:"Stineford Weapons Store",price:2e5,profits:75e3,country:"Stineford/Feroholm"},{name:"Trading Pillar Rights",price:3e5,profits:1e5,country:"Stineford/Feroholm"},{name:"Stineford Succubus Tower",price:8e5,country:"Stineford/Feroholm",social:2},{name:"Yhilini Airship Fleet",price:1e6,country:"Ari-Yhilina",profits:1e5},{name:"Min's Trade Route",price:4e5,profits:185e3,country:"Ari-Yhilina",givini:1},{name:"Yhilini Succubi Trade",price:function(e){return e.chapter3Infrastructure?4e5:55e4},profits:2e5,country:"Ari-Yhilina"},{name:"Yhilini Brothel Reform",price:25e3,profits:35e3,country:"Ari-Yhilina"},{name:"Premium Steel Owner",price:function(e){return e.chapter1Steel?75e3:1e5},profits:1e4,country:"Ari-Yhilina"},{name:"Yhilini Bank Core Lender",price:function(e){return e.chapter1Bank?45e4:5e5},profits:15e4,country:"Ari-Yhilina"},{name:"Mercenary Offices",price:function(e){return e.chapter3Infrastructure?15e4:25e4},profits:15e3,country:"Ari-Yhilina",social:2},{name:"Theltiar Rentals",price:425e3,profits:95e3,country:"Sylvan",social:1},{name:"Theltiar Flowhouse",price:25e4,profits:8e4,country:"Sylvan"},{name:"Denmiel Mushrooms",price:105e3,profits:4e4,country:"Sylvan"},{name:"Denmiel Archives",price:25e4,profits:2e4,country:"Sylvan",social:1},{name:"Eustrin Guild",price:6e5,profits:25e4,country:"Eustrin"},{name:"Succubus Armorer",price:1e5,profits:1e4,country:"Chalice States"},{name:"Gasm Falls Trade",price:275e3,profits:11e4,country:"Chalice States"},{name:"Givini Tunnels",price:15e5,profits:3e5,country:"Chalice States",givini:3},{name:"Lustlord Temples",price:8e5,profits:5e4,country:"Chalice States"},{name:"Succubus Band Tour",price:1e5,profits:2e3,country:"Chalice States",givini:2,social:1},{name:"Gasm Falls Water Cleanup",price:25e4,country:"Chalice States",social:1},{name:"Orc Tunnels",price:2e5,country:"Chalice States",social:1},{name:"Givini Smithing",price:2e5,profits:1e4,country:"New Givini",givini:2},{name:"Givini Orc Merchant",country:"New Givini",price:function(e){var n=e.giviniStart,r=void 0===n?0:n;return r<20?1e5:r<25?2e5:r<35?3e5:r<45?4e5:5e5},profits:function(e){var n=e.giviniStart,r=void 0===n?0:n,t=e.giviniExtra,i=r+(void 0===t?0:t)+e.investments.reduce((function(e,n){return e+((null===n||void 0===n?void 0:n.givini)||0)}),0);return i<20?25e3:i<30?5e4:i<40?1e5:i<50?15e4:2e5},givini:5},{name:"Givini Teahouse Chain",price:275e3,profits:3e4,country:"New Givini",givini:2,social:1},{name:"Bank of Givini",price:35e4,profits:3e5,country:"New Givini",givini:5},{name:"Givini Mage Guild",price:1e6,profits:4e4,country:"New Givini",givini:5},{name:"War Monument",price:1e6,country:"New Givini",givini:10,social:3},{name:"Tarran'Kan Housing + Tarran'Kan Trade Upgrade",price:11e5,profits:1e5,country:"Tak'Kan",social:1},{name:"Hall of Mental Strength",price:2e5,profits:25e3,country:"Tak'Kan",social:1},{name:"Booze Shack",price:15e4,profits:5e4,country:"Tak'Kan",social:1},{name:"Tradesmasher's Guild",price:35e4,profits:function(e){var n=e.investments,r=e.previousInvestments,t=1+[].concat(o(r),o(n.map((function(e){return e.name})))).filter((function(e){return["Cee'Kan Shipping","Lonely Sailor Services","Givini Orc Merchant","Orcish Democracy","Orc Pools Upgrade"].includes(e)})).length;return t<2?5e4:2===t?75e3:3===t?125e3:4===t?15e4:5===t?175e3:2e5},country:"Tak'Kan"},{name:"Lonely Sailor Services",price:25e4,profits:1e5,country:"Tak'Kan",social:1},{name:"Cee'Kan Shipping",price:7e5,profits:2e5,country:"Tak'Kan"},{name:"Orcish Democracy",price:1e6,country:"Tak'Kan",social:5},{name:"Imp Offices",price:1e5,country:"Tak'Kan",social:1},{name:"Orc Pools Upgrade",price:5e5,country:"Tak'Kan",social:2},{name:"Givini Banners + Givini Dragon Statue",price:3500,country:"New Givini",givini:1}],h=function(e){var n=e.investments,r=["War Monument","Givini Mage Guild"];return n.some((function(e){return r.includes(e)}))},g=d.filter((function(e){return"function"===typeof e.profits})),b=function(e){var n=o(e).sort((function(e,n){var r=e.price,t=void 0===r?0:r,i=n.price;return(void 0===i?0:i)-t})),r={};r[void 0]=n.slice(0);for(var t=0;t<n.length;t++)r[n[t].name]=n.slice(t+1);return r},S=function(e){var n=e.combsNMinusOne,r=e.maxPrice,t=e.cheaperThan;if(!n)return[[[],0]];for(var i=[],a=0;a<n.length;a++)for(var c,u=l(n[a],2),s=u[0],f=u[1],p=t[null===(c=s[s.length-1])||void 0===c?void 0:c.name],v=0;v<p.length;v++){var m=p[v],y=f+m.price;y>r||i.push([[].concat(o(s),[m]),y])}return i},O=function(e,n){return"function"===typeof e?e(n):e||0},T=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=s(s({},n),{},{investments:e}),t=0,i=0,o=0,a=0,c=[];return e.forEach((function(e){var n=O(e.profits,r);t+=e.price,i+=n,o+=e.social||0,a+=e.givini||0,c.push(s(s({},e),{},{profits:n}))})),g.forEach((function(e){var t;(null===n||void 0===n||null===(t=n.previousInvestments)||void 0===t?void 0:t.includes(e.name))&&(i+=e.profits(r)-e.profits(s(s({},r),{},{investments:[]})))})),{price:t,profits:i,social:o,givini:a,investments:c}},j=function(e){var n=e.current,r=e.candidate,t=e.money,i=e.otherRequirements,a=void 0===i?{}:i,c=e.context,u=void 0===c?{}:c,s=a.social,l=void 0===s?0:s,f=a.givini,p=void 0===f?0:f;return!(r.price>t)&&(!(r.social<l)&&(!(r.givini<p)&&(!(a.donovanKick&&!h({investments:[].concat(o(u.previousInvestments||[]),o(r.investments.map((function(e){return e.name}))))}))&&(!n||(r.profits>n.profits||r.profits===n.profits&&r.price<n.price)))))},P=function(e){var n=e.money,r=e.otherRequirements,t=void 0===r?{}:r,i=a(e,["money","otherRequirements"]),o=i.previousInvestments,c=void 0===o?[]:o;return{money:n,otherRequirements:t,investments:d.filter((function(e){var n=e.name;return!c.includes(n)})).map((function(e){return s(s({},e),{},{price:O(e.price,i)})})),context:i}},w=function(e){var n;return f=P(e),m=b(f.investments),(null===(n=f.otherRequirements)||void 0===n?void 0:n.donovanKick)&&(m[void 0]=m[void 0].filter((function(e){var n;return h({investments:[].concat(o((null===(n=f.context)||void 0===n?void 0:n.previousInvestments)||[]),[e.name])})}))),p=[],v=null,f.investments.length},G=function(){y=S({combsNMinusOne:y,maxPrice:f.money,cheaperThan:m});for(var e=0;e<y.length;e++)p.push(y[e][0]);return y.length},k=function(e,n){for(var r=f,t=r.money,i=r.otherRequirements,o=r.context,a=e;a<n;a++){var c=p[a],u=T(c,o);j({current:v,candidate:u,money:t,otherRequirements:i,context:o})&&(v=u)}return v},M=function(){f=void 0,p=void 0,v=void 0,m=void 0,y=void 0};addEventListener("message",(function(e){var r,t=e.data,i=t.type,o=t.method,a=t.id,c=t.params;"RPC"===i&&o&&((r=n[o])?Promise.resolve().then((function(){return r.apply(n,c)})):Promise.reject("No such method")).then((function(e){postMessage({type:"RPC",id:a,result:e})})).catch((function(e){var n={message:e};e.stack&&(n.message=e.message,n.stack=e.stack,n.name=e.name),postMessage({type:"RPC",id:a,error:n})}))})),postMessage({type:"RPC",method:"ready"})}]);
//# sourceMappingURL=bca172cb3d9d1e3729ed.worker.js.map