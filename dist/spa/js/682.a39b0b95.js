"use strict";(globalThis["webpackChunkquasar_project"]=globalThis["webpackChunkquasar_project"]||[]).push([[682],{8682:(e,t,n)=>{n.r(t),n.d(t,{default:()=>q});var a=n(9835),i=n(6970);function o(e,t,n,o,r,l){const s=(0,a.up)("q-btn"),u=(0,a.up)("q-input"),d=(0,a.up)("q-toolbar"),c=(0,a.up)("q-img"),m=(0,a.up)("q-item-section"),p=(0,a.up)("q-item-label"),h=(0,a.up)("q-tooltip"),w=(0,a.up)("q-item"),b=(0,a.up)("q-virtual-scroll"),y=(0,a.up)("q-card-section"),g=(0,a.up)("q-card");return(0,a.wg)(),(0,a.j4)(g,{style:{height:"100vh"}},{default:(0,a.w5)((()=>[(0,a.Wm)(d,{style:{height:"68px"}},{default:(0,a.w5)((()=>[(0,a.Wm)(s,{icon:"o_arrow_back",flat:"",round:"",class:"q-mr-md",onClick:t[0]||(t[0]=t=>e.context.emit("close"))}),(0,a.Wm)(u,{modelValue:e.query,"onUpdate:modelValue":t[1]||(t[1]=t=>e.query=t),dense:"",filled:"",rounded:"",placeholder:"YouTube search...",clearable:"",debounce:1e3,style:{width:"100%"},loading:e.loading,disable:e.loading},null,8,["modelValue","loading","disable"])])),_:1}),(0,a.Wm)(y,{style:{height:"calc(100% - 68px)"}},{default:(0,a.w5)((()=>[(0,a.Wm)(b,{items:e.items,separator:"",style:{height:"100%"}},{default:(0,a.w5)((({item:t,index:n})=>[((0,a.wg)(),(0,a.j4)(w,{key:n,dense:"",class:"q-px-none"},{default:(0,a.w5)((()=>[(0,a.Wm)(m,{avatar:""},{default:(0,a.w5)((()=>[(0,a.Wm)(c,{src:t.snippet.thumbnails.medium.url,width:t.snippet.thumbnails.medium.width,height:t.snippet.thumbnails.medium.height,style:{width:"140px"}},null,8,["src","width","height"])])),_:2},1024),(0,a.Wm)(m,null,{default:(0,a.w5)((()=>[(0,a.Wm)(p,null,{default:(0,a.w5)((()=>[(0,a.Uk)(" #"+(0,i.zw)(n+1)+" - "+(0,i.zw)(t.snippet.title),1)])),_:2},1024),(0,a.Wm)(p,{caption:""},{default:(0,a.w5)((()=>[(0,a.Uk)((0,i.zw)(t.snippet.channelTitle),1)])),_:2},1024)])),_:2},1024),(0,a.Wm)(m,{side:""},{default:(0,a.w5)((()=>[(0,a.Wm)(s,{round:"",icon:"o_playlist_add",unelevated:"",color:"green",onClick:n=>e.mainStore.AddToPlaylist(t)},{default:(0,a.w5)((()=>[(0,a.Wm)(h,null,{default:(0,a.w5)((()=>[(0,a.Uk)("Add to Queue")])),_:1})])),_:2},1032,["onClick"])])),_:2},1024)])),_:2},1024))])),_:1},8,["items"])])),_:1})])),_:1})}var r=n(499),l=n(9085),s=(n(9665),n(9981)),u=n.n(s);function d(){function e(e,o){e.forEach((e=>{try{e.hasOwnProperty("itemSectionRenderer")?e.itemSectionRenderer.contents.forEach((e=>{try{e.hasOwnProperty("channelRenderer")&&o.results.push(t(e.channelRenderer)),e.hasOwnProperty("videoRenderer")&&o.results.push(i(e.videoRenderer)),e.hasOwnProperty("radioRenderer")&&o.results.push(a(e.radioRenderer)),e.hasOwnProperty("playlistRenderer")&&o.results.push(n(e.playlistRenderer))}catch(r){console.error("Failed to parse renderer:",r),console.log(e)}})):e.hasOwnProperty("continuationItemRenderer")&&(o["nextPageToken"]=e.continuationItemRenderer.continuationEndpoint.continuationCommand.token)}catch(r){console.error("Failed to read contents for section list:",r),console.log(e)}}))}function t(e){let t={id:e.channelId,title:e.title.simpleText,url:`https://www.youtube.com${e.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,snippet:e.descriptionSnippet?e.descriptionSnippet.runs.reduce(o,""):"",thumbnail_src:e.thumbnail.thumbnails[e.thumbnail.thumbnails.length-1].url,video_count:e.videoCountText?e.videoCountText.runs.reduce(o,""):"",subscriber_count:e.subscriberCountText?e.subscriberCountText.simpleText:"0 subscribers",verified:e.ownerBadges&&e.ownerBadges.some((e=>e.metadataBadgeRenderer.style.indexOf("VERIFIED")>-1))||!1};return{channel:t}}function n(e){let t=e.thumbnailRenderer.playlistVideoThumbnailRenderer.thumbnail.thumbnails,n={id:e.playlistId,title:e.title.simpleText,url:`https://www.youtube.com${e.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,thumbnail_src:t[t.length-1].url,video_count:e.videoCount},a={username:e.shortBylineText.runs[0].text,url:`https://www.youtube.com${e.shortBylineText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url}`};return{playlist:n,uploader:a}}function a(e){let t={id:e.playlistId,title:e.title.simpleText,url:`https://www.youtube.com${e.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,thumbnail_src:e.thumbnail.thumbnails[e.thumbnail.thumbnails.length-1].url,video_count:e.videoCountText.runs.reduce(o,"")},n={username:e.shortBylineText?e.shortBylineText.simpleText:"YouTube"};return{radio:t,uploader:n}}function i(e){let t={id:e.videoId,title:e.title.runs.reduce(o,""),url:`https://www.youtube.com${e.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,duration:e.lengthText?e.lengthText.simpleText:"Live",snippet:e.descriptionSnippet?e.descriptionSnippet.runs.reduce(((e,t)=>e+(t.bold?`<b>${t.text}</b>`:t.text)),""):"",upload_date:e.publishedTimeText?e.publishedTimeText.simpleText:"Live",thumbnail_src:e.thumbnail.thumbnails[e.thumbnail.thumbnails.length-1].url,views:e.viewCountText?e.viewCountText.simpleText||e.viewCountText.runs.reduce(o,""):e.publishedTimeText?"0 views":"0 watching"},n={username:e.ownerText.runs[0].text,url:`https://www.youtube.com${e.ownerText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url}`};return n.verified=e.ownerBadges&&e.ownerBadges.some((e=>e.metadataBadgeRenderer.style.indexOf("VERIFIED")>-1))||!1,{video:t,uploader:n}}function o(e,t){return e+t.text}async function r(t,n,a){return new Promise(((i,o)=>{let r={results:[]};if(n)r["parser"]="json_format.page_token",r["key"]=n,u().post(`https://www.youtube.com/youtubei/v1/search?key=${n}`,{json:{context:{client:{clientName:"WEB",clientVersion:"2.20201022.01.01"}},continuation:a}},((t,n,a)=>{if(!t&&200===n.statusCode)return e(a.onResponseReceivedCommands[0].appendContinuationItemsAction.continuationItems,r),i(r);i({error:t})}));else{let n=`https://www.youtube.com/results?q=${encodeURIComponent(t)}`;u().get(n,{withCredentials:!0}).then(((e,t)=>{console.warn("yutube get",e,t)})),u()(n,((t,n,a)=>{if(!t&&200===n.statusCode){r["parser"]="json_format",r["key"]=a.match(/"innertubeApiKey":"([^"]*)/)[1];let t,n=[];try{let e=a.match(/ytInitialData[^{]*(.*?);\s*<\/script>/s);e&&e.length>1?r["parser"]+=".object_var":(r["parser"]+=".original",e=a.match(/ytInitialData"[^{]*(.*);\s*window\["ytInitialPlayerResponse"\]/s)),t=JSON.parse(e[1]),r["estimatedResults"]=t.estimatedResults||"0",n=t.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents}catch(o){console.error("Failed to parse data:",o),console.log(t)}return e(n,r),i(r)}i({error:t})}))}}))}return{youtube:r}}const c=(0,a.aZ)({name:"YTSearch",emits:["close"],setup(e,t){const n=(0,r.iH)("AIzaSyBam3KaApHnQwkQK8YlxdSGqCjSEL2omLo"),i=(0,l.h)(),o=(0,r.iH)(null),s=((0,a.f3)("axios"),(0,r.iH)([])),u=(0,r.iH)(!1),{youtube:c}=d();(0,a.Fl)((()=>o.value?`https://www.googleapis.com/youtube/v3/search?key=${n.value}&type=video&part=snippet&maxResults=20&q=${o.value}`:`https://www.googleapis.com/youtube/v3/search?key=${n.value}&type=video&part=snippet&maxResults=20&q=videoke+latest+songs+with+lyrics`));(0,a.YP)(o,(()=>{m()}));const m=async()=>{await c(o.value||"videoke+latest+songs+with+lyrics").then((e=>{console.warn("serach",e)}))};return(0,a.bv)((()=>{m()})),{context:t,mainStore:i,loading:u,items:s,query:o}}});var m=n(1639),p=n(4458),h=n(1663),w=n(4455),b=n(1852),y=n(3190),g=n(2482),v=n(490),x=n(1233),T=n(335),f=n(3115),C=n(6858),_=n(9984),R=n.n(_);const k=(0,m.Z)(c,[["render",o]]),q=k;R()(c,"components",{QCard:p.Z,QToolbar:h.Z,QBtn:w.Z,QInput:b.Z,QCardSection:y.Z,QVirtualScroll:g.Z,QItem:v.Z,QItemSection:x.Z,QImg:T.Z,QItemLabel:f.Z,QTooltip:C.Z})}}]);