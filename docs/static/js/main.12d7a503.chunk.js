(this["webpackJsonptls-investment-advisor"]=this["webpackJsonptls-investment-advisor"]||[]).push([[0],{148:function(e,t,n){var i=n(240),r=["prepare","preprocess","process","clean"];e.exports=function(){var e=new Worker(n.p+"a4e98451d708f4c08de9.worker.js",{name:"[hash].worker.js"});return i(e,r),e}},163:function(e,t,n){},164:function(e,t,n){},242:function(e,t,n){"use strict";n.r(t);var i=n(0),r=n.n(i),a=n(26),s=n.n(a),c=(n(163),n(35)),o=n(87),l=n.n(o),u=n(106),d=(n(164),n(47)),h=n(98),m=n(96),p=n(248),j=n(246),b=n(249),v=n(95),f=n(97),g=n(120),O=n(44),x=[{name:"Bank of Stineford",price:4e5,profits:24e4},{name:"Stineford Weapons Store",price:2e5,profits:75e3},{name:"Trading Pillar Rights",price:3e5,profits:1e5},{name:"Stineford Succubus Tower",price:8e5,social:2},{name:"Yhilini Airship Fleet",price:1e6,profits:1e5},{name:"Min's Trade Route",price:4e5,profits:185e3,givini:1},{name:"Yhilini Succubi Trade",price:function(e){return e.chapter3Infrastructure?4e5:55e4},profits:2e5},{name:"Yhilini Brothel Reform",price:25e3,profits:35e3},{name:"Premium Steel Owner",price:function(e){return e.chapter1Steel?75e3:1e5},profits:1e4},{name:"Yhilini Bank Core Lender",price:function(e){return e.chapter1Bank?45e4:5e5},profits:15e4},{name:"Mercenary Offices",price:function(e){return e.chapter3Infrastructure?15e4:25e4},profits:15e3,social:2},{name:"Theltiar Rentals",price:425e3,profits:95e3,social:1},{name:"Theltiar Flowhouse",price:25e4,profits:8e4},{name:"Denmiel Mushrooms",price:105e3,profits:4e4},{name:"Denmiel Archives",price:25e4,profits:2e4,social:1},{name:"Eustrin Guild",price:6e5,profits:25e4},{name:"Succubus Armorer",price:1e5,profits:1e4},{name:"Gasm Falls Trade",price:275e3,profits:11e4},{name:"Givini Tunnels",price:15e5,profits:3e5,givini:3},{name:"Lustlord Temples",price:8e5,profits:5e4},{name:"Succubus Band Tour",price:1e5,profits:2e3,givini:2,social:1},{name:"Gasm Falls Water Cleanup",price:25e4,social:1},{name:"Orc Tunnels",price:2e5,social:1},{name:"Givini Smithing",price:2e5,profits:1e4,givini:2},{name:"Givini Orc Merchant",price:function(e){var t=e.giviniStart,n=void 0===t?0:t;return n<20?1e5:n<25?2e5:n<35?3e5:n<45?4e5:5e5},profits:function(e){var t=e.giviniStart,n=void 0===t?0:t,i=e.giviniExtra,r=n+(void 0===i?0:i)+e.investments.reduce((function(e,t){return e+((null===t||void 0===t?void 0:t.givini)||0)}),0);return r<20?25e3:r<30?5e4:r<40?1e5:r<50?15e4:2e5},givini:5},{name:"Givini Teahouse Chain",price:275e3,profits:3e4,givini:2,social:1},{name:"Bank of Givini",price:35e4,profits:3e5,givini:5},{name:"Givini Mage Guild",price:1e6,profits:4e4,givini:5},{name:"War Monument",price:1e6,givini:10,social:3},{name:"Tarran'Kan Housing + Tarran'Kan Trade Upgrade",price:11e5,profits:1e5,social:1},{name:"Hall of Mental Strength",price:2e5,profits:25e3,social:1},{name:"Booze Shack",price:15e4,profits:5e4,social:1},{name:"Tradesmasher's Guild",price:35e4,profits:function(e){var t=e.investments,n=e.previousInvestments,i=1+[].concat(Object(m.a)(n),Object(m.a)(t.map((function(e){return e.name})))).filter((function(e){return["Cee'Kan Shipping","Lonely Sailor Services","Givini Orc Merchant","Orcish Democracy","Orc Pools Upgrade"].includes(e)})).length;return i<2?5e4:2===i?75e3:3===i?125e3:4===i?15e4:5===i?175e3:2e5}},{name:"Lonely Sailor Services",price:25e4,profits:1e5,social:1},{name:"Cee'Kan Shipping",price:7e5,profits:2e5},{name:"Orcish Democracy",price:1e6,social:5},{name:"Imp Offices",price:1e5,social:1},{name:"Orc Pools Upgrade",price:5e5,social:2},{name:"Givini Banners + Givini Dragon Statue",price:3500,givini:1}],S=n(6),y=["Min's Trade Route","Yhilini Succubi Trade","Yhilini Bank Core Lender","Mercenary Offices","Theltiar Rentals","Theltiar Flowhouse","Denmiel Mushrooms","Denmiel Archives","Eustrin Guild","Gasm Falls Trade","Premium Steel Owner"],I={previous:["Premium Steel Owner","Min's Trade Route","Yhilini Succubi Trade","Eustrin Guild"],remainingPron:5e3,baseProfit:2e6,chapter1Bank:!0,chapter1Steel:!1,strategy:"social",startingSocial:34,chapter3Infrastructure:!0,merchantSolution:"wait",jhenno:"religion",magicalItems:"givini",mandatory:[]},w=function(e){return Object(m.a)(e).sort().map((function(e){return{label:e,value:e}}))},k={required:!0,message:"Please provide a value."},T=function(e){var t=e.onFinish,n=e.loading,r=Object(i.useState)(I.previous),a=Object(c.a)(r,2),s=a[0],o=a[1],l=p.a.useForm(),u=Object(c.a)(l,1)[0],d=Object(i.useState)(I.merchantSolution),h=Object(c.a)(d,2),m=h[0],T=h[1];return Object(i.useEffect)((function(){"neutral"===m&&"money"===u.getFieldValue("strategy")&&u.setFieldsValue({strategy:"social"})}),[u,m]),Object(i.useEffect)((function(){u.setFieldsValue({mandatory:u.getFieldValue("mandatory").filter((function(e){return!s.includes(e)}))})}),[u,s]),Object(S.jsx)(j.a,{title:"Round one",children:Object(S.jsxs)(p.a,{initialValues:I,onFinish:t,onValuesChange:function(e,t){o(t.previous),T(t.merchantSolution)},className:"first-round-form",form:u,children:[Object(S.jsxs)(j.a,{title:"The past",type:"inner",children:[Object(S.jsxs)("div",{className:"numbers",children:[Object(S.jsx)(p.a.Item,{label:"ProN remaining at the end of chapter 3",name:"remainingPron",tooltip:'In the Calculator, go to "War Investment Phase" and copy the value next to "ProN available".',rules:[k],children:Object(S.jsx)(b.a,{})}),Object(S.jsx)(p.a.Item,{label:"Total profit at the start of chapter 4",name:"baseProfit",tooltip:'In the Calculator, go to "First Tower Run and Investment and copy the value next to "Total ProN Return".',rules:[k],children:Object(S.jsx)(b.a,{})}),Object(S.jsx)(p.a.Item,{label:"Your social standing at the start of chapter 4",name:"startingSocial",tooltip:'In the Calculator, go to "War Investment Phase" and copy the value next to "Social Score".',rules:[k],children:Object(S.jsx)(b.a,{})})]}),Object(S.jsx)(p.a.Item,{label:"Investments already bought during chapters 2/3",name:"previous",children:Object(S.jsx)(v.a,{options:w(y),mode:"multiple"})}),Object(S.jsxs)("div",{className:"checkboxes",children:[!s.includes("Yhilini Bank Core Lender")&&Object(S.jsx)(p.a.Item,{name:"chapter1Bank",valuePropName:"checked",children:Object(S.jsx)(f.a,{children:"You invested 25,000 ProN in the Yhilin Bank during chapter 1."})}),!s.includes("Premium Steel Owner")&&Object(S.jsx)(p.a.Item,{name:"chapter1Steel",valuePropName:"checked",children:Object(S.jsx)(f.a,{children:"You invested 20,000 ProN in Premium Steel during chapter 1."})}),!(s.includes("Yhilini Succubi Trade")&&s.includes("Mercenary Offices"))&&Object(S.jsx)(p.a.Item,{name:"chapter3Infrastructure",valuePropName:"checked",children:Object(S.jsx)(f.a,{children:"You funded Yhilin Infrastructure during chapter 3."})})]})]}),Object(S.jsxs)(j.a,{title:"Strategy",type:"inner",children:[Object(S.jsx)(p.a.Item,{name:"strategy",label:"Main strategy",rules:[k],children:Object(S.jsx)(g.a.Group,{options:[{label:"Focus on profits; do only the bare minimum for the Ardan succession crisis (New Givini \u2265 25).",value:"money",disabled:"neutral"===m},{label:"Mix profits and social; reach most thresholds for the Ardan succession crisis (New Givini \u2265 25, Social \u2265 40).",value:"social"},{label:"Go all in on the Ardan succession crisis (New Givini \u2265 25, Social \u2265 40, dedicated investments).",value:"succession"}]})}),Object(S.jsxs)("div",{className:"selects",children:[Object(S.jsx)(p.a.Item,{label:"Jhenno's cooperation",name:"jhenno",children:Object(S.jsx)(v.a,{options:[{value:"politics",label:"Politics"},{value:"religion",label:"Religion"}]})}),Object(S.jsx)(p.a.Item,{label:"Rose's house magical items",name:"magicalItems",children:Object(S.jsx)(v.a,{options:[{value:"givini",label:"Givini"},{value:"takkan",label:"Tak'Kan"}]})}),Object(S.jsx)(p.a.Item,{label:"Merchant dispute",name:"merchantSolution",children:Object(S.jsx)(v.a,{options:[{value:"neutral",label:"Neutral compromise (force Social \u2265 40)"},{value:"givini",label:"Favor New Givini"},{value:"wait",label:"Wait"}]})})]}),Object(S.jsx)(p.a.Item,{label:"Investments you explictly want to buy, for any reason",name:"mandatory",children:Object(S.jsx)(v.a,{options:w(x.map((function(e){return e.name})).filter((function(e){return!s.includes(e)}))),mode:"multiple"})})]}),Object(S.jsx)(p.a.Item,{children:Object(S.jsx)(O.a,{type:"primary",htmlType:"submit",loading:n,children:"Submit"})})]})})},C=n(245),P=function(e){return e.toLocaleString("en-US")},G=120,M=function(e){var t=e.children,n=e.format?P(Math.abs(t)):Math.abs(t);return"".concat(t<0?"-":"+").concat(n)},N=function(e){var t=e.investments.map((function(e){var t=e.name,n=Object(h.a)(e,["name"]);return Object(d.a)({key:t,name:t},n)})),n=[{title:"Name",dataIndex:"name",sorter:function(e,t){return e.name.localeCompare(t.name)}},{title:"Price",dataIndex:"price",render:function(e){return P(e)},sorter:function(e,t){return e.price-t.price},width:G},{title:"Profits",dataIndex:"profits",render:function(e){return P(e)},sorter:function(e,t){return e.profits-t.profits},width:G},{title:"Social",dataIndex:"social",render:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return Object(S.jsx)(M,{children:e})},width:G}];return Object(S.jsx)(C.a,{dataSource:t,columns:n,pagination:!1})},F=function(e){var t=e.list,n=(void 0===t?[]:t).map((function(e){var t=e.name,n=Object(h.a)(e,["name"]);return Object(d.a)({key:t,name:t},n)})),i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return Object(S.jsx)(M,{format:!0,children:e})},r=[{title:"Name",dataIndex:"name"},{title:"Price",dataIndex:"price",render:i,width:G},{title:"Profits",dataIndex:"profits",render:i,width:G},{title:"Social",dataIndex:"social",render:i,width:G}];return Object(S.jsx)(C.a,{dataSource:n,columns:r,pagination:!1})},R=function(e){var t=e.initialStandings,n=e.nonInvestmentChanges,i=e.investmentChanges,r=function(e,t){var n=t.key;return["base","total"].includes(n)?P(e):Object(S.jsx)(M,{format:!0,children:e})},a=[{dataIndex:"category"},{title:"ProN",dataIndex:"money",render:r,width:G},{title:"Profits",dataIndex:"profits",render:r,width:G},{title:"Social",dataIndex:"social",render:r,width:G}],s=function(e){return t[e]+n[e]+i[e]},c=[Object(d.a)(Object(d.a)({},t),{},{key:"base",category:"Previously"}),Object(d.a)(Object(d.a)({},i),{},{key:"investments",category:"Changes from investments",money:-i.price}),Object(d.a)(Object(d.a)({},n),{},{key:"other",category:"Other changes"})];return Object(S.jsx)(C.a,{dataSource:c,columns:a,pagination:!1,bordered:!0,expandable:{expandedRowRender:function(e){var t=e.key;return"investments"===t?Object(S.jsx)(N,{investments:i.investments}):"other"===t?Object(S.jsx)(F,{list:n.list}):null},rowExpandable:function(e){var t=e.key;return["investments","other"].includes(t)},defaultExpandAllRows:!0},summary:function(){return Object(S.jsxs)(C.a.Summary.Row,{children:[Object(S.jsx)(C.a.Summary.Cell,{colSpan:2,children:"Result"}),Object(S.jsx)(C.a.Summary.Cell,{children:P(t.money+n.money-i.price)}),Object(S.jsx)(C.a.Summary.Cell,{children:P(s("profits"))}),Object(S.jsx)(C.a.Summary.Cell,{children:s("social")})]})}})},B=function(e){var t=e.startingValue,n=void 0===t?0:t,i=e.dataSources;return Object(S.jsxs)("table",{className:"addition",children:[Object(S.jsx)("tbody",{children:Object(S.jsxs)("tr",{children:[Object(S.jsx)("td",{children:"Initial value"}),Object(S.jsx)("td",{children:n}),Object(S.jsx)("td",{})]})}),i.map((function(e,t){var n=e.title,i=e.dataSource;return Object(S.jsxs)("tbody",{children:[Object(S.jsx)("tr",{children:Object(S.jsx)("th",{colSpan:"3",scope:"col",children:n})}),i.map((function(e,t){var n=e.label,i=e.values,r=e.explanation;return Object(S.jsxs)("tr",{children:[Object(S.jsx)("td",{children:n}),Object(S.jsx)("td",{children:i.map((function(e){return"+".concat(e)})).join(" ")}),Object(S.jsx)("td",{children:r})]},t.toString())}))]},t.toString())})),Object(S.jsx)("tfoot",{children:Object(S.jsxs)("tr",{children:[Object(S.jsx)("th",{scope:"row",children:"Total"}),Object(S.jsx)("td",{children:n+i.reduce((function(e,t){return e+t.dataSource.reduce((function(e,t){return e+t.values.reduce((function(e,t){return e+t}))}),0)}),0)})]})})]})},L=function(e){return e.reduce((function(e,t){return e+t.values.reduce((function(e,t){return e+t}),0)}),0)},Y=function(e){return[{label:"Petitions",values:[5,5,2,2,2]},{label:"New Givini Trade",values:[5,1],explanation:"+5 when bought, +1 at round's start"},e.investments.includes("Min's Trade Route")&&{label:"Min's Trade Route",values:[1]}].filter(Boolean)},E=function(e){var t=e.chapter3Investments;return-5+L(Y({investments:t}))},A=function(e){var t=e.merchantSolution;return["givini"===e.magicalItems&&{label:"House Rose's magical items: Givini",values:[2]},"neutral"===t&&{label:"Merchant dispute: Neutral compromise",values:[1]},"givini"===t&&{label:"Merchant dispute: Favor New Givini",values:[2]},{label:"Givino Vinai equipment shop girl",values:[1]},{label:"Givini king",values:[1]},{label:"New Givini Trade",values:[1],explanation:"+1 at the end of the round (before profits from the Givini Orc Merchant are computed)"}].filter(Boolean)},W=function(){return L(A.apply(void 0,arguments))},V=function(e){var t=e.chapter3Investments,n=void 0===t?[]:t,i=e.roundOneInvestments,r=void 0===i?[]:i,a=e.decisions,s=void 0===a?{}:a;return Object(S.jsx)(B,{startingValue:-5,dataSources:[{title:"Chapter start",dataSource:Y({investments:n})},{title:"Investments",dataSource:r.filter((function(e){var t=e.givini;return 0!==(void 0===t?0:t)})).map((function(e){return{label:e.name,values:[e.givini]}})).sort((function(e,t){var n=e.label,i=t.label;return n.localeCompare(i)}))},{title:"Other changes",dataSource:A(s)}]})},D=function(e){var t=e.initialStandings,n=e.nonInvestmentChanges,i=e.investmentChanges,r=e.decisions;return Object(S.jsxs)(j.a,{title:"Changes",className:"results",children:[Object(S.jsx)(j.a,{title:"Ledger",type:"inner",className:"ledger",children:Object(S.jsx)(R,{initialStandings:t,nonInvestmentChanges:n,investmentChanges:i})}),Object(S.jsx)(j.a,{title:"Countries",type:"inner",children:Object(S.jsx)(j.a,{title:"New Givini",type:"inner",children:Object(S.jsx)(V,{chapter3Investments:t.previousInvestments,roundOneInvestments:i.investments,decisions:r})})})]})},q=n(252),K=function(e){var t=e.message;return Object(S.jsx)(j.a,{children:Object(S.jsx)(q.a,{status:"warning",title:t})})},U=function(e){var t=e.strategy,n=e.startingSocial,i=e.jhenno,r=e.merchantSolution;return"money"===t?0:"politics"===i&&"neutral"!==r?39-n:40-n},J=function(){var e=Object(u.a)(l.a.mark((function e(t){var n,i,r,a,s,c,o,u,m,p,j,b,v,f,g,O,x,S,y,I,w,k,T;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.values,i=t.setResult,r=t.runInWoker,(a=t.setError)(void 0),s=n.previous,c=void 0===s?[]:s,o=n.remainingPron,u=n.baseProfit,m=n.strategy,p=n.startingSocial,j=n.merchantSolution,b=n.jhenno,v=n.magicalItems,f=n.mandatory,g=Object(h.a)(n,["previous","remainingPron","baseProfit","strategy","startingSocial","merchantSolution","jhenno","magicalItems","mandatory"]),O={strategy:m,merchantSolution:j,magicalItems:v},x=E({chapter3Investments:c}),S=W(O),y={givini:x,social:p,money:o+u,profits:u,previousInvestments:c},I=["politics"===b&&{name:"Jhenno's political cooperation",social:1},{name:"Succession crisis' reward (best result)",social:3},{name:"The Three Trades become less profitable",profits:-3e5}].filter(Boolean),w={givini:S,money:0,profits:I.reduce((function(e,t){var n=t.profits;return e+(void 0===n?0:n)}),0),social:I.reduce((function(e,t){var n=t.social;return e+(void 0===n?0:n)}),0),list:I},k=Object(d.a)({previousInvestments:c,money:o+u,otherRequirements:{social:U({startingSocial:p,strategy:m,jhenno:b,merchantSolution:j}),givini:(l={giviniStart:x,giviniExtra:S},25-l.giviniStart-l.giviniExtra+3),mandatory:f,atLeastOne:"succession"===m?["War Monument","Givini Mage Guild"]:void 0},giviniStart:x,giviniExtra:S},g),e.next=12,r(k);case 12:if(T=e.sent){e.next=17;break}return i(void 0),a("Couldn't find a working combination of investments for that strategy with these starting values, sorry."),e.abrupt("return");case 17:i({initialStandings:y,nonInvestmentChanges:w,investmentChanges:T,decisions:O});case 18:case"end":return e.stop()}var l}),e)})));return function(t){return e.apply(this,arguments)}}(),z=function(e){var t=e.runInWoker,n=e.loading,r=Object(i.useState)(),a=Object(c.a)(r,2),s=a[0],o=a[1],l=Object(i.useState)(),u=Object(c.a)(l,2),h=u[0],m=u[1];return Object(S.jsxs)(S.Fragment,{children:[Object(S.jsx)(T,{onFinish:function(e){J({values:e,setResult:o,runInWoker:t,setError:m})},loading:n}),h&&Object(S.jsx)(K,{message:h}),s&&Object(S.jsx)(D,Object(d.a)({},s))]})},H=n(148),_=n.n(H),Q=n(247),X=n(253),Z=Q.a.Title,$=function(){return Object(S.jsxs)("div",{className:"disclaimer",children:[Object(S.jsxs)("div",{className:"preamble",children:[Object(S.jsx)(Z,{children:"Investment advisor"}),Object(S.jsxs)("p",{children:["A tool to help you choose the best theoretical best possible investments for (the early steps of chapter 4 of) ",Object(S.jsx)("a",{href:"https://the-last-sovereign.blogspot.com/",children:"The Last Sovereign"}),"."]}),Object(S.jsx)("p",{children:"Just fill in the requested information, choose your strategy and let a quasi-brute force algorithm determine what's best for you (assuming a definition of best here as highest short term returns, then lowest price, while still fulfilling the requirements of your strategy)."}),Object(S.jsxs)("p",{children:["This is definetely an advanced tool, intended for people who are already familiar with the game's ",Object(S.jsx)("a",{href:"https://thelastsovereign.miraheze.org/wiki/Secret_stats",children:"inner workings"}),", with the awesome ",Object(S.jsx)("a",{href:"https://thelastsovereign.flarum.cloud/d/15-calculator",children:"Calculator"}),", and are now looking for the last lousy optimizations they might have missed."]})]}),Object(S.jsx)(X.a,{message:"Assumptions",description:Object(S.jsxs)(S.Fragment,{children:[Object(S.jsx)("span",{children:"This tool takes for granted that:"}),Object(S.jsxs)("ol",{children:[Object(S.jsx)("li",{children:"The Succubus Tower was visited during chapter 1."}),Object(S.jsx)("li",{children:"AriGarda was bribed during chapter 2."}),Object(S.jsx)("li",{children:"Tradesmasher and the Succubus Armorer were met during chapter 3."}),Object(S.jsx)("li",{children:"The three unique Trades (New Givini, Tak'Kan and Chalice States) were bought at the end of chapter 3."}),Object(S.jsx)("li",{children:"Chapter 3 in general was good enough for Yhilin to reach its final state during the first investment phase of Chapter 4."}),Object(S.jsx)("li",{children:"Chapter 3 in general and the war in particular were good enough for all petitions favorable to Givini to appear."}),Object(S.jsx)("li",{children:"All such petitions were approved."}),Object(S.jsx)("li",{children:"If purchased, the Givini Orc Merchant is bought before any other investment of the round."})]})]}),type:"info",showIcon:!0})]})},ee=n(251),te=n(250),ne=n(244),ie=function(e){var t=e.combinationsCount,n=e.progress,i=e.investmentsCount,r=e.preprogress;return i?Object(S.jsxs)(ee.a,{visible:!0,centered:!0,closable:!1,footer:null,children:[Object(S.jsxs)("div",{children:[Object(S.jsxs)("p",{children:["Prefiltering ".concat(Math.pow(2,i).toLocaleString("en-US")," (2"),Object(S.jsx)("sup",{children:i}),") possibilities\u2026"]}),Object(S.jsx)(te.a,{percent:Math.round(100*r)})]}),!!t&&Object(S.jsxs)(S.Fragment,{children:[Object(S.jsx)(ne.a,{}),Object(S.jsxs)("div",{children:[Object(S.jsx)("p",{children:"Processing ".concat(t.toLocaleString("en-US")," remaining possibilities\u2026")}),Object(S.jsx)(te.a,{percent:Math.round(1e4*n)/100})]})]})]}):null},re=function(){var e=Object(i.useState)(),t=Object(c.a)(e,2),n=t[0],r=t[1],a=Object(i.useState)(!1),s=Object(c.a)(a,2),o=s[0],d=s[1],h=Object(i.useState)(),m=Object(c.a)(h,2),p=m[0],j=m[1],b=Object(i.useState)(0),v=Object(c.a)(b,2),f=v[0],g=v[1],O=Object(i.useState)(),x=Object(c.a)(O,2),y=x[0],I=x[1],w=Object(i.useState)(0),k=Object(c.a)(w,2),T=k[0],C=k[1];if(Object(i.useEffect)((function(){return n||r(_()()),function(){null===n||void 0===n||n.terminate()}}),[n]),!n)return null;var P=function(e){var t=e.workerInstance,n=e.setLoading,i=e.setCombinationsCount,r=e.setProgress,a=e.setInvestmentsCount,s=e.setPreprogress;return function(){var e=Object(u.a)(l.a.mark((function e(c){var o,u,d,h,m,p,j;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n(!0),e.next=3,t.prepare(c);case 3:o=e.sent,a(o),s(0),u=0,d=0;case 8:if(!(d<=o)){e.next=17;break}return e.t0=u,e.next=12,t.preprocess();case 12:u=e.t0+=e.sent,s(d/o);case 14:d++,e.next=8;break;case 17:i(u),r(0),h=1e4,p=0;case 21:if(!(p<Math.ceil(u/h))){e.next=30;break}return j=Math.min((p+1)*h,u),e.next=25,t.process(p*h,j);case 25:m=e.sent,r(j/u);case 27:p++,e.next=21;break;case 30:return e.next=32,t.clean();case 32:return n(!1),i(void 0),a(void 0),r(0),s(0),e.abrupt("return",m);case 38:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}({workerInstance:n,setLoading:d,setCombinationsCount:j,setProgress:g,setInvestmentsCount:I,setPreprogress:C});return Object(S.jsxs)("div",{children:[Object(S.jsx)($,{}),Object(S.jsx)(z,{runInWoker:P,loading:o}),o&&Object(S.jsx)(ie,{combinationsCount:p,progress:f,preprogress:T,investmentsCount:y})]})},ae=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,254)).then((function(t){var n=t.getCLS,i=t.getFID,r=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),i(e),r(e),a(e),s(e)}))};s.a.render(Object(S.jsx)(r.a.StrictMode,{children:Object(S.jsx)(re,{})}),document.getElementById("root")),ae()}},[[242,1,2]]]);
//# sourceMappingURL=main.12d7a503.chunk.js.map