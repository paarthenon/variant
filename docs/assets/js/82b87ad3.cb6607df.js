(self.webpackChunkvariant_site=self.webpackChunkvariant_site||[]).push([[6705],{3905:function(e,n,a){"use strict";a.d(n,{Zo:function(){return d},kt:function(){return k}});var t=a(7294);function r(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function s(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function o(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?s(Object(a),!0).forEach((function(n){r(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function p(e,n){if(null==e)return{};var a,t,r=function(e,n){if(null==e)return{};var a,t,r={},s=Object.keys(e);for(t=0;t<s.length;t++)a=s[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(t=0;t<s.length;t++)a=s[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var i=t.createContext({}),l=function(e){var n=t.useContext(i),a=n;return e&&(a="function"==typeof e?e(n):o(o({},n),e)),a},d=function(e){var n=l(e.components);return t.createElement(i.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},c=t.forwardRef((function(e,n){var a=e.components,r=e.mdxType,s=e.originalType,i=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),c=l(a),k=r,F=c["".concat(i,".").concat(k)]||c[k]||m[k]||s;return a?t.createElement(F,o(o({ref:n},d),{},{components:a})):t.createElement(F,o({ref:n},d))}));function k(e,n){var a=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var s=a.length,o=new Array(s);o[0]=c;var p={};for(var i in n)hasOwnProperty.call(n,i)&&(p[i]=n[i]);p.originalType=e,p.mdxType="string"==typeof e?e:r,o[1]=p;for(var l=2;l<s;l++)o[l]=a[l];return t.createElement.apply(null,o)}return t.createElement.apply(null,a)}c.displayName="MDXCreateElement"},6735:function(e,n,a){"use strict";a.r(n),a.d(n,{frontMatter:function(){return p},contentTitle:function(){return i},metadata:function(){return l},toc:function(){return d},default:function(){return c}});var t=a(2122),r=a(9756),s=(a(7294),a(3905)),o=["components"],p={title:"Inspection"},i=void 0,l={unversionedId:"book/inspection",id:"book/inspection",isDocsHomePage:!1,title:"Inspection",description:"`twoslash include animal",source:"@site/docs/book/inspection.md",sourceDirName:"book",slug:"/book/inspection",permalink:"/variant/docs/next/book/inspection",version:"current",frontMatter:{title:"Inspection"},sidebar:"someSidebar",previous:{title:"Procedural Generation",permalink:"/variant/docs/next/book/procedural-generation"},next:{title:"Organization",permalink:"/variant/docs/next/book/organization"}},d=[{value:"<code>type</code> equality",id:"type-equality",children:[]},{value:"<code>isType()</code>",id:"istype",children:[]},{value:"<code>types()</code>",id:"types",children:[]},{value:"<code>typeCatalog()</code>",id:"typecatalog",children:[]},{value:"<code>inferTypes()</code>",id:"infertypes",children:[]}],m={toc:d};function c(e){var n=e.components,a=(0,r.Z)(e,o);return(0,s.kt)("wrapper",(0,t.Z)({},m,a,{components:n,mdxType:"MDXLayout"}),(0,s.kt)("div",{className:"shiki-twoslash-fragment"}),(0,s.kt)("p",null,"Most of the time to do something useful with a discriminated union we'll need to examine its members and their types. Matching is a form of inspection, but is often geared toward processing. Here let's focus on some of the ways to analyze these objects."),(0,s.kt)("h3",{id:"type-equality"},(0,s.kt)("inlineCode",{parentName:"h3"},"type")," equality"),(0,s.kt)("p",null,"Classic. Supports type narrowing"),(0,s.kt)("h3",{id:"istype"},(0,s.kt)("inlineCode",{parentName:"h3"},"isType()")),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"slightly better than if, it works with if or in other conditional contexts."),(0,s.kt)("li",{parentName:"ul"},"supports ",(0,s.kt)("inlineCode",{parentName:"li"},"Animal.dog()")," syntax."),(0,s.kt)("li",{parentName:"ul"},"is a UDTG")),(0,s.kt)("h3",{id:"types"},(0,s.kt)("inlineCode",{parentName:"h3"},"types()")),(0,s.kt)("p",null,"Get a list of the types in a variant. For ",(0,s.kt)("inlineCode",{parentName:"p"},"Animal"),", it would return ",(0,s.kt)("inlineCode",{parentName:"p"},"['cat', 'dog', 'snake']"),". The order is... complicated. Expect it to be unspecified to be safe, but in some modern stacks it will match the order of the template. "),(0,s.kt)("div",{className:"shiki-twoslash-fragment"},(0,s.kt)("pre",{parentName:"div",className:"shiki comrade-contrast",style:{backgroundColor:"rgb(26, 32, 32)",color:"#d6dbdb"}},(0,s.kt)("div",{parentName:"pre",className:"language-id"},"ts"),(0,s.kt)("div",{parentName:"pre",className:"code-container"},(0,s.kt)("code",{parentName:"div"},(0,s.kt)("div",{parentName:"code",className:"line"})))),(0,s.kt)("pre",{parentName:"div",className:"shiki Monotone-red-color-theme",style:{backgroundColor:"#000000",color:"#ffffff"}},(0,s.kt)("div",{parentName:"pre",className:"language-id"},"ts"),(0,s.kt)("div",{parentName:"pre",className:"code-container"},(0,s.kt)("code",{parentName:"div"},(0,s.kt)("div",{parentName:"code",className:"line"}))))),(0,s.kt)("h3",{id:"typecatalog"},(0,s.kt)("inlineCode",{parentName:"h3"},"typeCatalog()")),(0,s.kt)("p",null,"The ",(0,s.kt)("inlineCode",{parentName:"p"},"types()")," function returns an array. This is often appropriate, but suffers from O(n) membership checking. ",(0,s.kt)("inlineCode",{parentName:"p"},"typeCatalog()"),", by contrast, returns a constant object of string literals (a.k.a. what you get it if you call ",(0,s.kt)("inlineCode",{parentName:"p"},"catalog(types(_____))"),"on some variant."),(0,s.kt)("div",{className:"shiki-twoslash-fragment"},(0,s.kt)("pre",{parentName:"div",className:"shiki comrade-contrast",style:{backgroundColor:"rgb(26, 32, 32)",color:"#d6dbdb"}},(0,s.kt)("div",{parentName:"pre",className:"language-id"},"ts"),(0,s.kt)("div",{parentName:"pre",className:"code-container"},(0,s.kt)("code",{parentName:"div"},(0,s.kt)("div",{parentName:"code",className:"line"},(0,s.kt)("span",{parentName:"div",style:{color:"#C24E4B"}},"const"),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"animal"),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"="),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "))))),(0,s.kt)("pre",{parentName:"div",className:"shiki Monotone-red-color-theme",style:{backgroundColor:"#000000",color:"#ffffff"}},(0,s.kt)("div",{parentName:"pre",className:"language-id"},"ts"),(0,s.kt)("div",{parentName:"pre",className:"code-container"},(0,s.kt)("code",{parentName:"div"},(0,s.kt)("div",{parentName:"code",className:"line"},(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"const"),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#F56565"}},"animal"),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"="),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," ")))))),(0,s.kt)("h3",{id:"infertypes"},(0,s.kt)("inlineCode",{parentName:"h3"},"inferTypes()")),(0,s.kt)("p",null,"Create a proxy catalog for a variant based on the instance."),(0,s.kt)("p",null,"While any instance of an animal will only ever have one string literal as its the uniquely identifying property at runtime, at compile time TypeScript can see multiple possibilities in that type and will express them as a union. "),(0,s.kt)("div",{className:"shiki-twoslash-fragment"},(0,s.kt)("pre",{parentName:"div",className:"shiki comrade-contrast twoslash lsp",style:{backgroundColor:"rgb(26, 32, 32)",color:"#d6dbdb"}},(0,s.kt)("div",{parentName:"pre",className:"language-id"},"ts"),(0,s.kt)("div",{parentName:"pre",className:"code-container"},(0,s.kt)("code",{parentName:"div"},(0,s.kt)("div",{parentName:"code",className:"line"},(0,s.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"import"),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," {"),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:'(alias) const inferTypes: <T extends Record<"type", string>>(instance: T) => { [P in T["type"]]: P; }\nimport inferTypes'},"inferTypes")),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"} "),(0,s.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"from"),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#63A5A5"}},"'variant'"),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},";")),(0,s.kt)("div",{parentName:"code",className:"line"},"\xa0"),(0,s.kt)("div",{parentName:"code",className:"line"},(0,s.kt)("span",{parentName:"div",style:{color:"#C24E4B"}},"const"),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:'const animal: {\n    type: "cat";\n    name: string;\n    furnitureDamaged: number;\n} | {\n    type: "dog";\n    name: string;\n    favoriteBall?: string | undefined;\n} | {\n    type: "snake";\n    name: string;\n    pattern: string;\n}'},"animal")),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"="),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:'const Animal: {\n    cat: VariantCreator<"cat", (input: {\n        name: string;\n        furnitureDamaged: number;\n    }) => {\n        name: string;\n        furnitureDamaged: number;\n    }, "type">;\n    dog: VariantCreator<"dog", (input: {\n        name: string;\n        favoriteBall?: string | undefined;\n    }) => {\n        ...;\n    }, "type">;\n    snake: VariantCreator<...>;\n}'},"Animal")),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"."),(0,s.kt)("span",{parentName:"div",style:{color:"#F9F7F1"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:'(property) dog: (input: {\n    name: string;\n    favoriteBall?: string | undefined;\n}) => {\n    type: "dog";\n    name: string;\n    favoriteBall?: string | undefined;\n}'},"dog")),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"({",(0,s.kt)("data-lsp",{parentName:"span",lsp:"(property) name: string"},"name"),": "),(0,s.kt)("span",{parentName:"div",style:{color:"#63A5A5"}},"'Twix'"),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"}) "),(0,s.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"as"),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," ",(0,s.kt)("data-lsp",{parentName:"span",lsp:'type Animal<T extends TypeNames<{ cat: VariantCreator<"cat", (input: { name: string; furnitureDamaged: number; }) => { name: string; furnitureDamaged: number; }, "type">; dog: VariantCreator<"dog", (input: { name: string; favoriteBall?: string | undefined; }) => { ...; }, "type">; snake: VariantCreator<...>; }> = undefined> = T extends undefined ? {\n    type: "cat";\n    name: string;\n    furnitureDamaged: number;\n} | {\n    type: "dog";\n    name: string;\n    favoriteBall?: string | undefined;\n} | {\n    type: "snake";\n    name: string;\n    pattern: string;\n} : T extends TypesOf<{\n    cat: VariantCreator<"cat", (input: {\n        name: string;\n        furnitureDamaged: number;\n    }) => {\n        ...;\n    }, "type">;\n    dog: VariantCreator<...>;\n    snake: VariantCreator<...>;\n}> ? Extract<...> | ... 1 more ... | Extract<...> : {\n    ...;\n} | ... 1 more ... | {\n    ...;\n}'},"Animal"),";")),(0,s.kt)("div",{parentName:"code",className:"line"},(0,s.kt)("span",{parentName:"div",style:{color:"#C24E4B"}},"const"),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:'const ani: {\n    cat: "cat";\n    dog: "dog";\n    snake: "snake";\n}'},"ani")),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"="),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#F9F7F1"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:'(alias) inferTypes<{\n    type: "cat";\n    name: string;\n    furnitureDamaged: number;\n} | {\n    type: "dog";\n    name: string;\n    favoriteBall?: string | undefined;\n} | {\n    type: "snake";\n    name: string;\n    pattern: string;\n}>(instance: {\n    type: "cat";\n    name: string;\n    furnitureDamaged: number;\n} | {\n    ...;\n} | {\n    ...;\n}): {\n    ...;\n}\nimport inferTypes'},"inferTypes")),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"("),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:'const animal: {\n    type: "cat";\n    name: string;\n    furnitureDamaged: number;\n} | {\n    type: "dog";\n    name: string;\n    favoriteBall?: string | undefined;\n} | {\n    type: "snake";\n    name: string;\n    pattern: string;\n}'},"animal")),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},");")),(0,s.kt)("div",{parentName:"code",className:"line"},"\xa0"),(0,s.kt)("div",{parentName:"code",className:"line"},(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:"var console: Console"},"console")),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"."),(0,s.kt)("span",{parentName:"div",style:{color:"#F9F7F1"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:"(method) Console.log(...data: any[]): void"},"log")),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"("),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:'const ani: {\n    cat: "cat";\n    dog: "dog";\n    snake: "snake";\n}'},"ani")),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"."),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:'(property) cat: "cat"'},"cat")),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"); "),(0,s.kt)("span",{parentName:"div",style:{color:"#506565"}},"// cat")),(0,s.kt)("div",{parentName:"code",className:"line"},(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:"var console: Console"},"console")),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"."),(0,s.kt)("span",{parentName:"div",style:{color:"#F9F7F1"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:"(method) Console.log(...data: any[]): void"},"log")),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"("),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:'const animal: {\n    type: "cat";\n    name: string;\n    furnitureDamaged: number;\n} | {\n    type: "dog";\n    name: string;\n    favoriteBall?: string | undefined;\n} | {\n    type: "snake";\n    name: string;\n    pattern: string;\n}'},"animal")),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"."),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:'(property) type: "cat" | "dog" | "snake"'},"type")),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#9BB7A7"}},"==="),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:'const ani: {\n    cat: "cat";\n    dog: "dog";\n    snake: "snake";\n}'},"ani")),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"."),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:'(property) dog: "dog"'},"dog")),(0,s.kt)("span",{parentName:"div",style:{color:"#D6DBDB"}},"); "),(0,s.kt)("span",{parentName:"div",style:{color:"#506565"}},"// true"))))),(0,s.kt)("pre",{parentName:"div",className:"shiki Monotone-red-color-theme twoslash lsp",style:{backgroundColor:"#000000",color:"#ffffff"}},(0,s.kt)("div",{parentName:"pre",className:"language-id"},"ts"),(0,s.kt)("div",{parentName:"pre",className:"code-container"},(0,s.kt)("code",{parentName:"div"},(0,s.kt)("div",{parentName:"code",className:"line"},(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"import"),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"{"),(0,s.kt)("span",{parentName:"div",style:{color:"#F56565"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:'(alias) const inferTypes: <T extends Record<"type", string>>(instance: T) => { [P in T["type"]]: P; }\nimport inferTypes'},"inferTypes")),(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"}"),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"from"),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"'"),(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"variant"),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"'"),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},";")),(0,s.kt)("div",{parentName:"code",className:"line"},"\xa0"),(0,s.kt)("div",{parentName:"code",className:"line"},(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"const"),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#F56565"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:'const animal: {\n    type: "cat";\n    name: string;\n    furnitureDamaged: number;\n} | {\n    type: "dog";\n    name: string;\n    favoriteBall?: string | undefined;\n} | {\n    type: "snake";\n    name: string;\n    pattern: string;\n}'},"animal")),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"="),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#F56565"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:'const Animal: {\n    cat: VariantCreator<"cat", (input: {\n        name: string;\n        furnitureDamaged: number;\n    }) => {\n        name: string;\n        furnitureDamaged: number;\n    }, "type">;\n    dog: VariantCreator<"dog", (input: {\n        name: string;\n        favoriteBall?: string | undefined;\n    }) => {\n        ...;\n    }, "type">;\n    snake: VariantCreator<...>;\n}'},"Animal")),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},".",(0,s.kt)("data-lsp",{parentName:"span",lsp:'(property) dog: (input: {\n    name: string;\n    favoriteBall?: string | undefined;\n}) => {\n    type: "dog";\n    name: string;\n    favoriteBall?: string | undefined;\n}'},"dog")),(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"("),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"{",(0,s.kt)("data-lsp",{parentName:"span",lsp:"(property) name: string"},"name"),": "),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"'"),(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"Twix"),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"'"),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"}"),(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},")"),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"as"),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#F56565"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:'type Animal<T extends TypeNames<{ cat: VariantCreator<"cat", (input: { name: string; furnitureDamaged: number; }) => { name: string; furnitureDamaged: number; }, "type">; dog: VariantCreator<"dog", (input: { name: string; favoriteBall?: string | undefined; }) => { ...; }, "type">; snake: VariantCreator<...>; }> = undefined> = T extends undefined ? {\n    type: "cat";\n    name: string;\n    furnitureDamaged: number;\n} | {\n    type: "dog";\n    name: string;\n    favoriteBall?: string | undefined;\n} | {\n    type: "snake";\n    name: string;\n    pattern: string;\n} : T extends TypesOf<{\n    cat: VariantCreator<"cat", (input: {\n        name: string;\n        furnitureDamaged: number;\n    }) => {\n        ...;\n    }, "type">;\n    dog: VariantCreator<...>;\n    snake: VariantCreator<...>;\n}> ? Extract<...> | ... 1 more ... | Extract<...> : {\n    ...;\n} | ... 1 more ... | {\n    ...;\n}'},"Animal")),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},";")),(0,s.kt)("div",{parentName:"code",className:"line"},(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"const"),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#F56565"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:'const ani: {\n    cat: "cat";\n    dog: "dog";\n    snake: "snake";\n}'},"ani")),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"="),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," ",(0,s.kt)("data-lsp",{parentName:"span",lsp:'(alias) inferTypes<{\n    type: "cat";\n    name: string;\n    furnitureDamaged: number;\n} | {\n    type: "dog";\n    name: string;\n    favoriteBall?: string | undefined;\n} | {\n    type: "snake";\n    name: string;\n    pattern: string;\n}>(instance: {\n    type: "cat";\n    name: string;\n    furnitureDamaged: number;\n} | {\n    ...;\n} | {\n    ...;\n}): {\n    ...;\n}\nimport inferTypes'},"inferTypes")),(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"("),(0,s.kt)("span",{parentName:"div",style:{color:"#F56565"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:'const animal: {\n    type: "cat";\n    name: string;\n    furnitureDamaged: number;\n} | {\n    type: "dog";\n    name: string;\n    favoriteBall?: string | undefined;\n} | {\n    type: "snake";\n    name: string;\n    pattern: string;\n}'},"animal")),(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},")"),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},";")),(0,s.kt)("div",{parentName:"code",className:"line"},"\xa0"),(0,s.kt)("div",{parentName:"code",className:"line"},(0,s.kt)("span",{parentName:"div",style:{color:"#F56565"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:"var console: Console"},"console")),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},".",(0,s.kt)("data-lsp",{parentName:"span",lsp:"(method) Console.log(...data: any[]): void"},"log")),(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"("),(0,s.kt)("span",{parentName:"div",style:{color:"#F56565"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:'const ani: {\n    cat: "cat";\n    dog: "dog";\n    snake: "snake";\n}'},"ani")),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},".",(0,s.kt)("data-lsp",{parentName:"span",lsp:'(property) cat: "cat"'},"cat")),(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},")"),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"; "),(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"//"),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," cat")),(0,s.kt)("div",{parentName:"code",className:"line"},(0,s.kt)("span",{parentName:"div",style:{color:"#F56565"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:"var console: Console"},"console")),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},".",(0,s.kt)("data-lsp",{parentName:"span",lsp:"(method) Console.log(...data: any[]): void"},"log")),(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"("),(0,s.kt)("span",{parentName:"div",style:{color:"#F56565"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:'const animal: {\n    type: "cat";\n    name: string;\n    furnitureDamaged: number;\n} | {\n    type: "dog";\n    name: string;\n    favoriteBall?: string | undefined;\n} | {\n    type: "snake";\n    name: string;\n    pattern: string;\n}'},"animal")),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},".",(0,s.kt)("data-lsp",{parentName:"span",lsp:'(property) type: "cat" | "dog" | "snake"'},"type")," "),(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"==="),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," "),(0,s.kt)("span",{parentName:"div",style:{color:"#F56565"}},(0,s.kt)("data-lsp",{parentName:"span",lsp:'const ani: {\n    cat: "cat";\n    dog: "dog";\n    snake: "snake";\n}'},"ani")),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},".",(0,s.kt)("data-lsp",{parentName:"span",lsp:'(property) dog: "dog"'},"dog")),(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},")"),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}},"; "),(0,s.kt)("span",{parentName:"div",style:{color:"#A8A8B1"}},"//"),(0,s.kt)("span",{parentName:"div",style:{color:"#FFFFFF"}}," true")))))),(0,s.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Proxy limitations")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},"As a proxy object, this has no runtime information about the full list of types. Unlike a typical type catalog, we ",(0,s.kt)("em",{parentName:"p"},"cannot")," use ",(0,s.kt)("inlineCode",{parentName:"p"},"Object.keys()")," or ",(0,s.kt)("inlineCode",{parentName:"p"},"Object.values()"),' to capture or enumerate the items contained within. Proxies are a clever trick. The string "dog" becomes real only when we used the string "dog" to reference the property. It just spat back what we asked for.'))))}c.isMDXComponent=!0}}]);