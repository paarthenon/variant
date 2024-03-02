"use strict";(self.webpackChunkvariant_site=self.webpackChunkvariant_site||[]).push([[2818],{3905:function(e,a,t){t.d(a,{Zo:function(){return F},kt:function(){return N}});var n=t(7294);function r(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function o(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?o(Object(t),!0).forEach((function(a){r(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function s(e,a){if(null==e)return{};var t,n,r=function(e,a){if(null==e)return{};var t,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=n.createContext({}),i=function(e){var a=n.useContext(p),t=a;return e&&(t="function"==typeof e?e(a):l(l({},a),e)),t},F=function(e){var a=i(e.components);return n.createElement(p.Provider,{value:a},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},d=n.forwardRef((function(e,a){var t=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,F=s(e,["components","mdxType","originalType","parentName"]),c=i(t),d=r,N=c["".concat(p,".").concat(d)]||c[d]||m[d]||o;return t?n.createElement(N,l(l({ref:a},F),{},{components:t})):n.createElement(N,l({ref:a},F))}));function N(e,a){var t=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var o=t.length,l=new Array(o);l[0]=d;var s={};for(var p in a)hasOwnProperty.call(a,p)&&(s[p]=a[p]);s.originalType=e,s[c]="string"==typeof e?e:r,l[1]=s;for(var i=2;i<o;i++)l[i]=t[i];return n.createElement.apply(null,l)}return n.createElement.apply(null,t)}d.displayName="MDXCreateElement"},251:function(e,a,t){t.r(a),t.d(a,{assets:function(){return F},contentTitle:function(){return p},default:function(){return N},frontMatter:function(){return s},metadata:function(){return i},toc:function(){return c}});var n=t(3117),r=t(102),o=(t(7294),t(3905)),l=["components"],s={},p="Part 1 - Defining a Hero",i={unversionedId:"tutorial/part-one",id:"tutorial/part-one",title:"Part 1 - Defining a Hero",description:"Over the course of this tutorial we will develop the logic for a small game. Our hero will have one or more superpowers that will enable them to complete different tasks. These powers may be things like flight, elemental magic, or teleportation. As you might imagine, these powers have very different features and constraints. Teleportation, for example, may have a maximum distance that the user can travel, along with a cooldown to limit the ability's use. The data model for elemental magic would of course need the specific element the user can control.",source:"@site/docs/tutorial/part-one.md",sourceDirName:"tutorial",slug:"/tutorial/part-one",permalink:"/variant/docs/next/tutorial/part-one",draft:!1,tags:[],version:"current",frontMatter:{}},F={},c=[],m={toc:c},d="wrapper";function N(e){var a=e.components,t=(0,r.Z)(e,l);return(0,o.kt)(d,(0,n.Z)({},m,t,{components:a,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"part-1---defining-a-hero"},"Part 1 - Defining a Hero"),(0,o.kt)("p",null,"Over the course of this tutorial we will develop the logic for a small game. Our hero will have one or more superpowers that will enable them to complete different tasks. These powers may be things like ",(0,o.kt)("strong",{parentName:"p"},"flight"),", ",(0,o.kt)("strong",{parentName:"p"},"elemental magic"),", or ",(0,o.kt)("strong",{parentName:"p"},"teleportation"),". As you might imagine, these powers have very different features and constraints. Teleportation, for example, may have a maximum distance that the user can travel, along with a cooldown to limit the ability's use. The data model for elemental magic would of course need the specific element the user can control."),(0,o.kt)("div",{className:"shiki-twoslash-fragment"},(0,o.kt)("pre",{parentName:"div",className:"shiki comrade-contrast",style:{backgroundColor:"rgb(26, 32, 32)",color:"#d6dbdb"}},(0,o.kt)("div",{parentName:"pre",className:"language-id"},"ts"),(0,o.kt)("div",{parentName:"pre",className:"code-container"},(0,o.kt)("code",{parentName:"div"},(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"export"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#C24E4B"}},"const"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"Superpower"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"="),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#F9F7F1"}},"variant"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"({")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"    "),(0,o.kt)("span",{parentName:"div",style:{color:"#506565"}},"/**")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#506565"}},"     * Avatar-like powers")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#506565"}},"     **/")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"    ElementalMagic: "),(0,o.kt)("span",{parentName:"div",style:{color:"#F9F7F1"}},"fields"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"<{")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"        element"),(0,o.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},":"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#63A5A5"}},"'fire'"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"|"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#63A5A5"}},"'air'"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"|"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#63A5A5"}},"'water'"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"|"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#63A5A5"}},"'earth'"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},",")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"    }>(),")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"    Flight: "),(0,o.kt)("span",{parentName:"div",style:{color:"#F9F7F1"}},"fields"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"<{")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"        speed"),(0,o.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},":"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"number"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"; "),(0,o.kt)("span",{parentName:"div",style:{color:"#506565"}},"// in m/s")),(0,o.kt)("div",{parentName:"code",className:"line"}),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"        "),(0,o.kt)("span",{parentName:"div",style:{color:"#506565"}},"/**")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#506565"}},"         * "),(0,o.kt)("span",{parentName:"div",style:{color:"#C24E4B"}},"@unit"),(0,o.kt)("span",{parentName:"div",style:{color:"#506565"}}," seconds.")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#506565"}},"         **/")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"        stamina"),(0,o.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},":"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"number"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},";")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"    }>(),")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"    Invisibility: "),(0,o.kt)("span",{parentName:"div",style:{color:"#F9F7F1"}},"fields"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"<{")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"        method"),(0,o.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},":"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#63A5A5"}},"'psychic'"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"|"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#63A5A5"}},"'light manipulation'"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},";")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"    }>(),")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"    "),(0,o.kt)("span",{parentName:"div",style:{color:"#506565"}},"/**")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#506565"}},"     * The ability to pass through solid matter.")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#506565"}},"     */")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"    Phasing: {},")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"    "),(0,o.kt)("span",{parentName:"div",style:{color:"#506565"}},"/**")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#506565"}},"     * Jump from one place to another instantly.")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#506565"}},"     */")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"    Teleportation: "),(0,o.kt)("span",{parentName:"div",style:{color:"#F9F7F1"}},"fields"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"<{")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"        "),(0,o.kt)("span",{parentName:"div",style:{color:"#506565"}},"/**")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#506565"}},"         * Range in meters.")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#506565"}},"         */")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"        range"),(0,o.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},":"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"number"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},";")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"    }>(),")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"})")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"export"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#C24E4B"}},"type"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," Superpower<T "),(0,o.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"extends"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," TypeNames<"),(0,o.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"typeof"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"Superpower"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"> "),(0,o.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"="),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"undefined"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},">")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"="),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," VariantOf<"),(0,o.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"typeof"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"Superpower"),(0,o.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},", T>"))))),(0,o.kt)("pre",{parentName:"div",className:"shiki Monotone-red-color-theme",style:{backgroundColor:"#000000",color:"#ffffff"}},(0,o.kt)("div",{parentName:"pre",className:"language-id"},"ts"),(0,o.kt)("div",{parentName:"pre",className:"code-container"},(0,o.kt)("code",{parentName:"div"},(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"export"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"const"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#F56565"}},"Superpower"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"="),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," variant"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"("),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"{")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"    "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"/**")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"     * Avatar-like powers")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"     *"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"*/")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"    ElementalMagic: fields"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"<"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"{")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"        "),(0,o.kt)("span",{parentName:"div",style:{color:"#F56565"}},"element"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},":"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"'"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"fire"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"'"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"|"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"'"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"air"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"'"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"|"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"'"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"water"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"'"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"|"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"'"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"earth"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"'"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},",")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"    }"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},">()"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},",")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"    Flight: fields"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"<"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"{")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"        "),(0,o.kt)("span",{parentName:"div",style:{color:"#F56565"}},"speed"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},":"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"number"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"; "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"//"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," in m/s")),(0,o.kt)("div",{parentName:"code",className:"line"}),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"        "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"/**")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"         * @"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"unit"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," seconds.")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"         *"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"*/")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"        "),(0,o.kt)("span",{parentName:"div",style:{color:"#F56565"}},"stamina"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},":"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"number"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},";")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"    }"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},">()"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},",")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"    Invisibility: fields"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"<"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"{")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"        "),(0,o.kt)("span",{parentName:"div",style:{color:"#F56565"}},"method"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},":"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"'"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"psychic"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"'"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"|"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"'"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"light manipulation"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"'"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},";")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"    }"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},">()"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},",")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"    "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"/**")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"     * The ability to pass through solid matter.")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"     "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"*/")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"    Phasing: {},")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"    "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"/**")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"     * Jump from one place to another instantly.")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"     "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"*/")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"    Teleportation: fields"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"<"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"{")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"        "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"/**")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"         * Range in meters.")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"         "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"*/")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"        "),(0,o.kt)("span",{parentName:"div",style:{color:"#F56565"}},"range"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},":"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"number"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},";")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"    }"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},">()"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},",")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"}"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},")")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"export"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"type"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#F56565"}},"Superpower"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"<"),(0,o.kt)("span",{parentName:"div",style:{color:"#F56565"}},"T"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"extends"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#F56565"}},"TypeNames"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"<"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"typeof"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#F56565"}},"Superpower"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},">"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"="),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"undefined>")),(0,o.kt)("div",{parentName:"code",className:"line"},(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"="),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#F56565"}},"VariantOf"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"<"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"typeof"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,o.kt)("span",{parentName:"div",style:{color:"#F56565"}},"Superpower"),(0,o.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},", "),(0,o.kt)("span",{parentName:"div",style:{color:"#F56565"}},"T"),(0,o.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},">")))))),(0,o.kt)("admonition",{title:"Documentation",type:"note"},(0,o.kt)("p",{parentName:"admonition"},"The JSDoc-style comments in the example above will actually carry over to the resulting constructors. Use this to provide helpful information about the relevant types and their intended use. See more in the article ",(0,o.kt)("a",{parentName:"p",href:"../articles/documentation"},"Documentation"))))}N.isMDXComponent=!0}}]);