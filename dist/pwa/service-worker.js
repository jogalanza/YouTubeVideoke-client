if(!self.define){let i,e={};const n=(n,s)=>(n=new URL(n+".js",s).href,e[n]||new Promise((e=>{if("document"in self){const i=document.createElement("script");i.src=n,i.onload=e,document.head.appendChild(i)}else i=n,importScripts(n),e()})).then((()=>{let i=e[n];if(!i)throw new Error(`Module ${n} didn’t register its module`);return i})));self.define=(s,p)=>{const l=i||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let a={};const c=i=>n(i,l),t={module:{uri:l},exports:a,require:c};e[l]=Promise.all(s.map((i=>t[i]||c(i)))).then((i=>(p(...i),a)))}}define(["./workbox-b81e226a"],(function(i){"use strict";i.setCacheNameDetails({prefix:"quasar-project"}),self.addEventListener("message",(i=>{i.data&&"SKIP_WAITING"===i.data.type&&self.skipWaiting()})),i.precacheAndRoute([{url:"/clientapp/dist/pwa/config/index.js",revision:"83d3a8dc46686118eeb6ffecd4227f35"},{url:"/clientapp/dist/pwa/css/193.ce6deb18.css",revision:null},{url:"/clientapp/dist/pwa/css/287.9da5ed11.css",revision:null},{url:"/clientapp/dist/pwa/css/593.0f8da0f4.css",revision:null},{url:"/clientapp/dist/pwa/css/app.188fcf7b.css",revision:null},{url:"/clientapp/dist/pwa/css/vendor.d85938f6.css",revision:null},{url:"/clientapp/dist/pwa/favicon.ico",revision:"f4facfeaed834544d622544acfbb7722"},{url:"/clientapp/dist/pwa/fonts/KFOkCnqEu92Fr1MmgVxIIzQ.68bb21d0.woff",revision:null},{url:"/clientapp/dist/pwa/fonts/KFOlCnqEu92Fr1MmEU9fBBc-.48af7707.woff",revision:null},{url:"/clientapp/dist/pwa/fonts/KFOlCnqEu92Fr1MmSU5fBBc-.c2f7ab22.woff",revision:null},{url:"/clientapp/dist/pwa/fonts/KFOlCnqEu92Fr1MmWUlfBBc-.77ecb942.woff",revision:null},{url:"/clientapp/dist/pwa/fonts/KFOlCnqEu92Fr1MmYUtfBBc-.f5677eb2.woff",revision:null},{url:"/clientapp/dist/pwa/fonts/KFOmCnqEu92Fr1Mu4mxM.f1e2a767.woff",revision:null},{url:"/clientapp/dist/pwa/fonts/LDItaoyNOAY6Uewc665JcIzCKsKc_M9flwmJ.5d681e2e.woff",revision:null},{url:"/clientapp/dist/pwa/fonts/LDItaoyNOAY6Uewc665JcIzCKsKc_M9flwmPq_HTTw.c380809f.woff2",revision:null},{url:"/clientapp/dist/pwa/fonts/daxpro/dax-pro-regular-demo.html",revision:"0d11bf1e2e49c09945d89f3268145ec1"},{url:"/clientapp/dist/pwa/fonts/daxpro/dax-pro-regular-webfont.woff",revision:"5120468044a4b5dbd30eeb51b12a8936"},{url:"/clientapp/dist/pwa/fonts/daxpro/dax-pro-regular-webfont.woff2",revision:"ac20e3a2a8837708795c713fc515408d"},{url:"/clientapp/dist/pwa/fonts/daxpro/generator_config.txt",revision:"4dce64e8848e18c45c2fdabbe045335d"},{url:"/clientapp/dist/pwa/fonts/daxpro/index.css",revision:"e258e625eee17ef3c60c3831f5273639"},{url:"/clientapp/dist/pwa/fonts/daxpro/specimen_files/grid_12-825-55-15.css",revision:"1d29e85aacb2c562218ecb103ac749fc"},{url:"/clientapp/dist/pwa/fonts/daxpro/specimen_files/specimen_stylesheet.css",revision:"d8d97306d1cb009d7726378ea0c9e5ca"},{url:"/clientapp/dist/pwa/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.4d73cb90.woff",revision:null},{url:"/clientapp/dist/pwa/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.0383092b.woff2",revision:null},{url:"/clientapp/dist/pwa/fonts/gok-H7zzDkdnRel8-DQ6KAXJ69wP1tGnf4ZGhUcY.f882956f.woff",revision:null},{url:"/clientapp/dist/pwa/fonts/gok-H7zzDkdnRel8-DQ6KAXJ69wP1tGnf4ZGhUcel5euIg.6f420cf1.woff2",revision:null},{url:"/clientapp/dist/pwa/icons/apple-icon-120x120.png",revision:"d082235f6e6d2109e84e397f66fa868d"},{url:"/clientapp/dist/pwa/icons/apple-icon-152x152.png",revision:"3c728ce3e709b7395be487becf76283a"},{url:"/clientapp/dist/pwa/icons/apple-icon-167x167.png",revision:"3fec89672a18e4b402ede58646917c2d"},{url:"/clientapp/dist/pwa/icons/apple-icon-180x180.png",revision:"aa47843bd47f34b7ca4b99f65dd25955"},{url:"/clientapp/dist/pwa/icons/favicon-128x128.png",revision:"ab92df0270f054ca388127c9703a4911"},{url:"/clientapp/dist/pwa/icons/favicon-16x16.png",revision:"e4b046d41e08e6fa06626d6410ab381d"},{url:"/clientapp/dist/pwa/icons/favicon-32x32.png",revision:"410858b01fa6d3d66b7bf21447c5f1fc"},{url:"/clientapp/dist/pwa/icons/favicon-96x96.png",revision:"db2bde7f824fb4057ffd1c42f6ed756e"},{url:"/clientapp/dist/pwa/icons/icon-128x128.png",revision:"ab92df0270f054ca388127c9703a4911"},{url:"/clientapp/dist/pwa/icons/icon-192x192.png",revision:"7659f0d3e9602e71811f8b7cf2ce0e8e"},{url:"/clientapp/dist/pwa/icons/icon-256x256.png",revision:"cf5ad3498fb6fda43bdafd3c6ce9b824"},{url:"/clientapp/dist/pwa/icons/icon-384x384.png",revision:"fdfc1b3612b6833a27a7b260c9990247"},{url:"/clientapp/dist/pwa/icons/icon-512x512.png",revision:"2c2dc987945806196bd18cb6028d8bf4"},{url:"/clientapp/dist/pwa/icons/ms-icon-144x144.png",revision:"8de1b0e67a62b881cd22d935f102a0e6"},{url:"/clientapp/dist/pwa/icons/safari-pinned-tab.svg",revision:"3e4c3730b00c89591de9505efb73afd3"},{url:"/clientapp/dist/pwa/index.html",revision:"7d1d33d5246ef3820b90b7142a768414"},{url:"/clientapp/dist/pwa/js/193.b31aa1e5.js",revision:null},{url:"/clientapp/dist/pwa/js/287.cc2bf2ce.js",revision:null},{url:"/clientapp/dist/pwa/js/297.85355b7e.js",revision:null},{url:"/clientapp/dist/pwa/js/54.6a4bc5ff.js",revision:null},{url:"/clientapp/dist/pwa/js/593.74b59e26.js",revision:null},{url:"/clientapp/dist/pwa/js/682.a39b0b95.js",revision:null},{url:"/clientapp/dist/pwa/js/695.550d031d.js",revision:null},{url:"/clientapp/dist/pwa/js/713.0e36f442.js",revision:null},{url:"/clientapp/dist/pwa/js/745.8d986cad.js",revision:null},{url:"/clientapp/dist/pwa/js/830.1d7b35b8.js",revision:null},{url:"/clientapp/dist/pwa/js/862.45468cc1.js",revision:null},{url:"/clientapp/dist/pwa/js/app.dedb8d23.js",revision:null},{url:"/clientapp/dist/pwa/js/jquery-3.3.1.min.js",revision:"7642efffb6b3559547f9580ec72ce4ef"},{url:"/clientapp/dist/pwa/js/jquery.signalR-2.4.1.js",revision:"a03df2ef24bf40b71b5b6e27795db089"},{url:"/clientapp/dist/pwa/js/resizable.js",revision:"7ed139dfa1dd99a14e4d02dde461f9dd"},{url:"/clientapp/dist/pwa/js/vendor.ea9cd9b3.js",revision:null},{url:"/clientapp/dist/pwa/manifest.json",revision:"fd11b9bd06e02013fe12a0b4599a844d"},{url:"/clientapp/dist/pwa/test.html",revision:"d41d8cd98f00b204e9800998ecf8427e"}],{}),i.registerRoute(new i.NavigationRoute(i.createHandlerBoundToURL("/clientapp/dist/pwa/index.html"),{denylist:[/service-worker\.js$/,/workbox-(.)*\.js$/]}))}));
