(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{158:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return p}));var a=n(1),r=n(9),i=(n(0),n(179)),o={id:"filter",title:"Filtering"},c={id:"use/filter",title:"Filtering",description:"> The last section covered how to create and group variants. Here, we'll cover how to narrow variant types into more specific subsets and automatically extract variants from a module based on various types.\r",source:"@site/docs\\use\\filter.md",permalink:"/variant/docs/use/filter",sidebar:"someSidebar",previous:{title:"Matching",permalink:"/variant/docs/use/matching"},next:{title:"Recursive variants",permalink:"/variant/docs/use/recursive"}},l=[{value:"Filtering the discriminated union",id:"filtering-the-discriminated-union",children:[]},{value:"isOfVariant",id:"isofvariant",children:[]}],s={rightToc:l};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"The last section covered how to create and group variants. Here, we'll cover how to narrow variant types into more specific subsets and automatically extract variants from a module based on various types.")),Object(i.b)("h2",{id:"filtering-the-discriminated-union"},"Filtering the discriminated union"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"Animal")," type allows some filtering out of the box. We have access to the type of a specific form through the ",Object(i.b)("inlineCode",{parentName:"p"},"Animal<'snake'>")," syntax, and can create a type union ",Object(i.b)("inlineCode",{parentName:"p"},"Animal<'dog'> | Animal<'cat'>")," as expected. Remember that it's possible to compute ",Object(i.b)("inlineCode",{parentName:"p"},"Animal<'dog'>")," yourself with the built in ",Object(i.b)("inlineCode",{parentName:"p"},"Extract<T, U>")," type."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type Dog = Extract<Animal, {type: 'dog'}>;\n")),Object(i.b)("p",null,"It's also possible to leverage that",Object(i.b)("inlineCode",{parentName:"p"},"Extract<T, U>")," type to filter the union to only the possibilities matching a given interface. For example, our variant may be structured such that every winged animal has a ",Object(i.b)("inlineCode",{parentName:"p"},"wingCount: number")," property."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"// assume every winged animal has a wingCount property\n// and other animals don't.\ntype WingedAnimal = Extract<Animal, {wingCount: number}>;\n")),Object(i.b)("h2",{id:"isofvariant"},"isOfVariant"),Object(i.b)("p",null,"It's possible to use ",Object(i.b)("inlineCode",{parentName:"p"},"isOfVariant")," to ",Object(i.b)("strong",{parentName:"p"},"narrow")," a variable to a variant type. ",Object(i.b)("inlineCode",{parentName:"p"},"isOfVariant()")," is a ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards"}),"user-defined type guard")," that expects two parameters"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"The variable to be evaluated"),Object(i.b)("li",{parentName:"ol"},"The variant module to compared against")),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"const flap = (animal: WingedAnimal) => {...} \ndeclare var a: Animal;\n\nif (isOfVariant(a, WingedAnimal)) {\n    // a is now known to be an WingedAnimal\n    // so this is safe.\n    flap(a);\n}\n")),Object(i.b)("p",null,"Note it's possible to construct the variant module ",Object(i.b)("inlineCode",{parentName:"p"},"isOfVariant")," is expecting on the fly. "),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"if (isOfVariant(a, variantList([Animal.bird, Animal.pegasus]))) {\n    flap(a);\n}\n")))}p.isMDXComponent=!0},179:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return d}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=r.a.createContext({}),p=function(e){var t=r.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c({},t,{},e)),n},u=function(e){var t=p(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=Object(a.forwardRef)((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=p(n),m=a,d=u["".concat(o,".").concat(m)]||u[m]||b[m]||i;return n?r.a.createElement(d,c({ref:t},s,{components:n})):r.a.createElement(d,c({ref:t},s))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var s=2;s<i;s++)o[s]=n[s];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);