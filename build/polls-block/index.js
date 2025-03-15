(()=>{"use strict";var o,l={983:()=>{const o=window.wp.blocks,l=window.wp.i18n,e=window.wp.element,t=window.wp.blockEditor,n=window.wp.components,s=window.wp.primitives,i=window.ReactJSXRuntime,r=(0,i.jsx)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,i.jsx)(s.Path,{d:"M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"})}),c=(0,i.jsx)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,i.jsx)(s.Path,{d:"M11 12.5V17.5H12.5V12.5H17.5V11H12.5V6H11V11H6V12.5H11Z"})}),p=window.React,a=JSON.parse('{"UU":"buntywp/polls-block"}');(0,o.registerBlockType)(a.UU,{edit:function({attributes:o,setAttributes:s,clientId:a}){const{question:d,options:w,blockId:u}=o;console.log("options",w),(0,e.useEffect)((()=>{u||s({blockId:a})}),[u,a,s]);const v=()=>{s({options:[...w,{option:"",votes:0}]})};return(0,p.createElement)("div",{...(0,t.useBlockProps)(),key:u},(0,i.jsxs)("div",{className:"poll-block-editor",children:[(0,i.jsx)("div",{className:"poll-question",children:(0,i.jsx)(t.RichText,{tagName:"h3",placeholder:(0,l.__)("Ask a question","polls-block"),value:d,onChange:o=>s({question:o})})}),w.map(((o,e)=>(0,i.jsxs)("div",{className:"poll-option",children:[(0,i.jsx)(n.TextControl,{placeholder:(0,l.__)("Choice ","polls-block")+(e+1),value:o.option,onChange:o=>((o,l)=>{const e=w.map(((e,t)=>t===o?{...e,option:l}:e));s({options:e})})(e,o)}),(0,i.jsx)(n.Button,{icon:r,isSmall:!0,label:(0,l.__)("Remove option","polls-block"),onClick:()=>(o=>{const l=[...w];l.splice(o,1),s({options:l})})(e),className:"poll-remove-button",disabled:w.length<=2}),e===w.length-1&&(0,i.jsx)(n.Button,{icon:c,onClick:v,className:"poll-add-button",label:(0,l.__)("Add option","polls-block")})]},e)))]}))},save:function(){return null}})}},e={};function t(o){var n=e[o];if(void 0!==n)return n.exports;var s=e[o]={exports:{}};return l[o](s,s.exports,t),s.exports}t.m=l,o=[],t.O=(l,e,n,s)=>{if(!e){var i=1/0;for(a=0;a<o.length;a++){for(var[e,n,s]=o[a],r=!0,c=0;c<e.length;c++)(!1&s||i>=s)&&Object.keys(t.O).every((o=>t.O[o](e[c])))?e.splice(c--,1):(r=!1,s<i&&(i=s));if(r){o.splice(a--,1);var p=n();void 0!==p&&(l=p)}}return l}s=s||0;for(var a=o.length;a>0&&o[a-1][2]>s;a--)o[a]=o[a-1];o[a]=[e,n,s]},t.o=(o,l)=>Object.prototype.hasOwnProperty.call(o,l),(()=>{var o={78:0,498:0};t.O.j=l=>0===o[l];var l=(l,e)=>{var n,s,[i,r,c]=e,p=0;if(i.some((l=>0!==o[l]))){for(n in r)t.o(r,n)&&(t.m[n]=r[n]);if(c)var a=c(t)}for(l&&l(e);p<i.length;p++)s=i[p],t.o(o,s)&&o[s]&&o[s][0](),o[s]=0;return t.O(a)},e=globalThis.webpackChunkpolls_block=globalThis.webpackChunkpolls_block||[];e.forEach(l.bind(null,0)),e.push=l.bind(null,e.push.bind(e))})();var n=t.O(void 0,[498],(()=>t(983)));n=t.O(n)})();