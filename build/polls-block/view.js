import*as t from"@wordpress/interactivity";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};const o=(s={getContext:()=>t.getContext,store:()=>t.store},r={},e.d(r,s),r),{state:n}=(0,o.store)("buntywp-polls",{state:{get totalVoteCount(){return(0,o.getContext)().totalVotes},get userLoggedin(){return(0,o.getContext)().isLoggedIn}},actions:{toggleVote:()=>{const t=(0,o.getContext)();if(t.userVoted||!t.isLoggedIn)return;let e=t.item.id;t.options[e].votes=(t.options[e].votes||0)+1,t.userSelection=e,t.options=t.options,t.totalVotes=Number(t.totalVotes+1),t.userVoted=!0,function(t){fetch(n.ajaxUrl,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({action:"save_poll_vote",nonce:n.nonce,context:JSON.stringify(t)})}).then((t=>t.json())).then((t=>{console.log("Vote saved:",t)})).catch((t=>{console.error("Error saving vote:",t)}))}(t)},getPercentage:()=>{const t=(0,o.getContext)();if(0===t.totalVotes)return"0%";let e=t.item.id;return`${(t.options[e].votes/t.totalVotes*100).toFixed(0)}%`},getUserSelection:()=>{const t=(0,o.getContext)();let e=t.item.id;return!(parseInt(t.options[e].id)===parseInt(t.userSelection))}},callbacks:{logIsPollOpen:()=>{const{isOpen:t}=(0,o.getContext)();console.log("*isOpen*",t)}}});var s,r;