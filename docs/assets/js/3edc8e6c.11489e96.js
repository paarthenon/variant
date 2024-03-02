"use strict";(self.webpackChunkvariant_site=self.webpackChunkvariant_site||[]).push([[1682],{3905:function(e,t,a){a.d(t,{Zo:function(){return c},kt:function(){return h}});var n=a(7294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},c=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(a),m=i,h=d["".concat(s,".").concat(m)]||d[m]||u[m]||o;return a?n.createElement(h,r(r({ref:t},c),{},{components:a})):n.createElement(h,r({ref:t},c))}));function h(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=a.length,r=new Array(o);r[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:i,r[1]=l;for(var p=2;p<o;p++)r[p]=a[p];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},3795:function(e,t,a){a.r(t),a.d(t,{assets:function(){return c},contentTitle:function(){return s},default:function(){return h},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return d}});var n=a(3117),i=a(102),o=(a(7294),a(3905)),r=["components"],l={title:"Todo"},s=void 0,p={unversionedId:"todo",id:"todo",title:"Todo",description:"Using a custom discriminant",source:"@site/docs/todo.md",sourceDirName:".",slug:"/todo",permalink:"/variant/docs/next/todo",draft:!1,tags:[],version:"current",frontMatter:{title:"Todo"},sidebar:"someSidebar",previous:{title:"rx/js - Observables",permalink:"/variant/docs/next/libraries/rxjs"},next:{title:"\ud83d\udcd1 Glossary of Terms",permalink:"/variant/docs/next/glossary"}},c={},d=[{value:"Using a custom discriminant",id:"using-a-custom-discriminant",level:3},{value:"DOCUMENTATION.",id:"documentation",level:3},{value:"A discussion on polymorphic variants.",id:"a-discussion-on-polymorphic-variants",level:3},{value:"Tree-shaking",id:"tree-shaking",level:3},{value:"Tests",id:"tests",level:3},{value:"Create a stackblitz (several)",id:"create-a-stackblitz-several",level:3},{value:"Generating new variants (Procedural Generation).",id:"generating-new-variants-procedural-generation",level:3},{value:"Flags and Matrix",id:"flags-and-matrix",level:3},{value:"Used in production",id:"used-in-production",level:3},{value:"Use some or all",id:"use-some-or-all",level:3},{value:"Describe unopinionated.",id:"describe-unopinionated",level:3},{value:"Naming conventions",id:"naming-conventions",level:3},{value:"<code>augment()</code> for immutability",id:"augment-for-immutability",level:3},{value:"Autocomplete",id:"autocomplete",level:3},{value:"Catalog",id:"catalog",level:3},{value:"Problems with computed properties",id:"problems-with-computed-properties",level:3}],u={toc:d},m="wrapper";function h(e){var t=e.components,a=(0,i.Z)(e,r);return(0,o.kt)(m,(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",{id:"using-a-custom-discriminant"},"Using a custom discriminant"),(0,o.kt)("p",null,'Add a section on how to use a custom discriminant instead of "type"'),(0,o.kt)("p",null,"Include a brief stop at ",(0,o.kt)("inlineCode",{parentName:"p"},"variantCosmos"),", explain that this violates tree shaking so if you need the functions to be tree-shakable then call their individual implementations like ",(0,o.kt)("inlineCode",{parentName:"p"},"matchImpl")," from ",(0,o.kt)("inlineCode",{parentName:"p"},"variant/lib/match"),". Maybe I should drop the ",(0,o.kt)("inlineCode",{parentName:"p"},"lib")," so that people can import them more easily."),(0,o.kt)("h3",{id:"documentation"},"DOCUMENTATION."),(0,o.kt)("p",null,"Highlight the fact that JSDoc-style documentation on the members of a variant actually translate to the final object!"),(0,o.kt)("h3",{id:"a-discussion-on-polymorphic-variants"},"A discussion on polymorphic variants."),(0,o.kt)("p",null,"Note: this is NOT IMPORTANT."),(0,o.kt)("p",null,"but it is interesting. Discuss the difference between polymorphic and regular variants and compare the nature of discriminated unions to the two options. They are clearly closer to polymorphic variants."),(0,o.kt)("h3",{id:"tree-shaking"},"Tree-shaking"),(0,o.kt)("p",null,"Claim (and test) that the library is tree-shakable"),(0,o.kt)("h3",{id:"tests"},"Tests"),(0,o.kt)("p",null,"Show the extensive test suite. Explain that the test suite can be used as a set of examples for what the library can actually do. "),(0,o.kt)("h3",{id:"create-a-stackblitz-several"},"Create a stackblitz (several)"),(0,o.kt)("p",null,"Create some stackblitz projects showing how variants can really alter the flow."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"A react app ")),(0,o.kt)("p",null,"I'm not going to show you a todo app. The beauty of variants is that they turn rather more complex tasks into trivial exercises."),(0,o.kt)("h3",{id:"generating-new-variants-procedural-generation"},"Generating new variants (Procedural Generation)."),(0,o.kt)("p",null,"Show that it is possible to enumerate the possible constructors and generate a variant by matching on the type of the function!"),(0,o.kt)("h3",{id:"flags-and-matrix"},"Flags and Matrix"),(0,o.kt)("p",null,"Demonstrate the utility of flags and matrix. Talk about the possibilities when you can treat something like an object (cache it) ",(0,o.kt)("em",{parentName:"p"},"or")," as a list (enumerate it). There are typically problems with iterating through disparate entities, but variants are the ideal solution to that problem."),(0,o.kt)("h3",{id:"used-in-production"},"Used in production"),(0,o.kt)("p",null,"Highlight that there are multiple companies that use variant in production. "),(0,o.kt)("h3",{id:"use-some-or-all"},"Use some or all"),(0,o.kt)("p",null,"Variant is built on standard language features. This means that you can use as much or as little of the library as you wish. It is entirely possible to use variant for the advanced creation utilities and then return to a traditional switch statement to process these items or good old ",(0,o.kt)("inlineCode",{parentName:"p"},"if (animal.type === 'cat') {")," which will narrow correctly."),(0,o.kt)("p",null,"It is also entirely possible to ignore the creation utilities completely. I know of at least a couple users who use graphQL codegen to create their discriminated unions but use variant's matching utilities to process them."),(0,o.kt)("h3",{id:"describe-unopinionated"},"Describe unopinionated."),(0,o.kt)("p",null,"Variant, against the fashion of the time, is ",(0,o.kt)("em",{parentName:"p"},"unopinionated"),". Variant does not proselytize, it is intended to be foundational library and operate ",(0,o.kt)("em",{parentName:"p"},"on your terms")," while doing its utter best to stay out of your way."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"use whatever naming or capitalization"),(0,o.kt)("li",{parentName:"ul"},"use raw styles ")),(0,o.kt)("h3",{id:"naming-conventions"},"Naming conventions"),(0,o.kt)("p",null,"Should ",(0,o.kt)("inlineCode",{parentName:"p"},"Animal")," be singular or pluralized? Should case names be ",(0,o.kt)("inlineCode",{parentName:"p"},"camelCase"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"PascalCase"),", or ",(0,o.kt)("inlineCode",{parentName:"p"},"snake_case"),"? It does not matter to the library. I personally recommand that variants be singular, cases be ",(0,o.kt)("inlineCode",{parentName:"p"},"PascalCase"),", and the flags version be plural. i.e. ",(0,o.kt)("inlineCode",{parentName:"p"},"Attribute"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"Attribute.VideoCodec"),", and ",(0,o.kt)("inlineCode",{parentName:"p"},"Attributes")," referring to the potential object on some model."),(0,o.kt)("h3",{id:"augment-for-immutability"},(0,o.kt)("inlineCode",{parentName:"h3"},"augment()")," for immutability"),(0,o.kt)("p",null,"You can create truly immutable variants by calling ",(0,o.kt)("inlineCode",{parentName:"p"},"augment()")," and passing the function ",(0,o.kt)("inlineCode",{parentName:"p"},"Object.freeze")," (test this)."),(0,o.kt)("h3",{id:"autocomplete"},"Autocomplete"),(0,o.kt)("p",null,"Emphasize the focus on a good autocomplete experience. This can be part of the UX conversation along with documentation. This isn't just a laziness thing, having autocompletion implies that the types involved are constrained in useful ways."),(0,o.kt)("h3",{id:"catalog"},"Catalog"),(0,o.kt)("p",null,"WHile variants have flags, catalog serves as its own set of flags."),(0,o.kt)("div",{className:"shiki-twoslash-fragment"},(0,o.kt)("pre",{parentName:"div",className:"shiki comrade-contrast",style:{backgroundColor:"rgb(26, 32, 32)",color:"#d6dbdb"}},(0,o.kt)("div",{parentName:"pre",className:"language-id"},"ts"),(0,o.kt)("div",{parentName:"pre",className:"code-container"},(0,o.kt)("code",{parentName:"div"},(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#C24E4B"}},"const"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"subCatalog"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"="),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#F9F7F1"}},"catalog"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"([")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"    "),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"bigCatalog"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"."),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"one"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},",")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"    "),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"bigCatalog"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"."),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"two"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},",")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"]);"))))),(0,o.kt)("pre",{parentName:"div",className:"shiki Monotone-red-color-theme",style:{backgroundColor:"#000000",color:"#ffffff"}},(0,o.kt)("div",{parentName:"pre",className:"language-id"},"ts"),(0,o.kt)("div",{parentName:"pre",className:"code-container"},(0,o.kt)("code",{parentName:"div"},(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"const"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#F56565"}},"subCatalog"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"="),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," catalog"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"("),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"[")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"    "),(0,o.kt)("span",{parentName:"div",style:{color:"#F56565"}},"bigCatalog"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},".one,")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"    "),(0,o.kt)("span",{parentName:"div",style:{color:"#F56565"}},"bigCatalog"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},".two,")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"]"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},")"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},";")))))),(0,o.kt)("p",null,"That is essentially the same."),(0,o.kt)("h3",{id:"problems-with-computed-properties"},"Problems with computed properties"),(0,o.kt)("p",null,"There's a problem with using computed properties in the match handler - it can no longer evaluate missing cases in the autocomplete."),(0,o.kt)("p",null,"Basically, if you were to define a matcher where instead of using the literals themselve you used a shared type, then you would not be able to benefit from autocomplete, and you would still need to confront the issues with missing keys. In this scenario, matcher is strictly better."))}h.isMDXComponent=!0}}]);