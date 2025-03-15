(()=>{"use strict";var o,l={983:()=>{const o=window.wp.blocks,l=window.wp.i18n,t=window.wp.element,e=window.wp.blockEditor,n=window.wp.components,s=window.wp.primitives,i=window.ReactJSXRuntime,c=(0,i.jsx)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,i.jsx)(s.Path,{d:"M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"})}),r=(0,i.jsx)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,i.jsx)(s.Path,{d:"M11 12.5V17.5H12.5V12.5H17.5V11H12.5V6H11V11H6V12.5H11Z"})}),p=window.React,a=JSON.parse('{"UU":"buntywp/polls-block"}');(0,o.registerBlockType)(a.UU,{edit:function({attributes:o,setAttributes:s,clientId:a}){const{question:d,options:u,blockId:w}=o;console.log("options",u),(0,t.useEffect)((()=>{w||s({blockId:a})}),[w,a,s]);const b=()=>{s({options:[...u,{option:"",votes:0}]})};return(0,p.createElement)("div",{...(0,e.useBlockProps)(),key:w},(0,i.jsxs)("div",{className:"poll-block-editor",children:[(0,i.jsx)("div",{className:"poll-question",children:(0,i.jsx)(e.RichText,{tagName:"h3",placeholder:(0,l.__)("Ask a question","custom-poll-block"),value:d,onChange:o=>s({question:o})})}),u.map(((o,t)=>(0,i.jsxs)("div",{className:"poll-option",children:[(0,i.jsx)(n.TextControl,{placeholder:(0,l.__)("Choice ","custom-poll-block")+(t+1),value:o.option,onChange:o=>((o,l)=>{console.log("options",u);const t=u.map(((t,e)=>e===o?{...t,option:l}:t));s({options:t})})(t,o)}),(0,i.jsx)(n.Button,{icon:c,isSmall:!0,label:(0,l.__)("Remove option","custom-poll-block"),onClick:()=>(o=>{const l=[...u];l.splice(o,1),s({options:l})})(t),className:"poll-remove-button",disabled:u.length<=2}),t===u.length-1&&(0,i.jsx)(n.Button,{icon:r,onClick:b,className:"poll-add-button",label:(0,l.__)("Add option","custom-poll-block")})]},t)))]}))},save:function({attributes:o}){const{question:l,options:t,blockId:e}=o;return console.log("attributes",o),null}})}},t={};function e(o){var n=t[o];if(void 0!==n)return n.exports;var s=t[o]={exports:{}};return l[o](s,s.exports,e),s.exports}e.m=l,o=[],e.O=(l,t,n,s)=>{if(!t){var i=1/0;for(a=0;a<o.length;a++){for(var[t,n,s]=o[a],c=!0,r=0;r<t.length;r++)(!1&s||i>=s)&&Object.keys(e.O).every((o=>e.O[o](t[r])))?t.splice(r--,1):(c=!1,s<i&&(i=s));if(c){o.splice(a--,1);var p=n();void 0!==p&&(l=p)}}return l}s=s||0;for(var a=o.length;a>0&&o[a-1][2]>s;a--)o[a]=o[a-1];o[a]=[t,n,s]},e.o=(o,l)=>Object.prototype.hasOwnProperty.call(o,l),(()=>{var o={78:0,498:0};e.O.j=l=>0===o[l];var l=(l,t)=>{var n,s,[i,c,r]=t,p=0;if(i.some((l=>0!==o[l]))){for(n in c)e.o(c,n)&&(e.m[n]=c[n]);if(r)var a=r(e)}for(l&&l(t);p<i.length;p++)s=i[p],e.o(o,s)&&o[s]&&o[s][0](),o[s]=0;return e.O(a)},t=globalThis.webpackChunkpolls_block=globalThis.webpackChunkpolls_block||[];t.forEach(l.bind(null,0)),t.push=l.bind(null,t.push.bind(t))})();var n=e.O(void 0,[498],(()=>e(983)));n=e.O(n)})();