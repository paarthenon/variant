(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{158:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return p}));var a=n(1),r=n(9),i=(n(0),n(179)),o={id:"filter",title:"Filtering"},c={id:"use/filter",title:"Filtering",description:"> The last section covered how to create and group variants. Here, we'll cover how to narrow variant types into more specific subsets and automatically extract variants from a module based on various types.\r",source:"@site/docs\\use\\filter.md",permalink:"/variant/docs/use/filter",sidebar:"someSidebar",previous:{title:"Matching",permalink:"/variant/docs/use/matching"},next:{title:"Recursive variants",permalink:"/variant/docs/use/recursive"}},s=[{value:"Filtering the discriminated union",id:"filtering-the-discriminated-union",children:[]},{value:"isOfVariant",id:"isofvariant",children:[]},{value:"Cast and Narrow",id:"cast-and-narrow",children:[]}],l={rightToc:s};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"The last section covered how to create and group variants. Here, we'll cover how to narrow variant types into more specific subsets and automatically extract variants from a module based on various types.")),Object(i.b)("h2",{id:"filtering-the-discriminated-union"},"Filtering the discriminated union"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"Animal")," type allows some filtering out of the box. We have access to the type of a specific form through the ",Object(i.b)("inlineCode",{parentName:"p"},"Animal<'snake'>")," syntax, and can create a type union ",Object(i.b)("inlineCode",{parentName:"p"},"Animal<'dog'> | Animal<'cat'>")," as expected."),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"Animal")," type can also be filtered with a type or interface. It's possible to leverage TypeScript's built in ",Object(i.b)("inlineCode",{parentName:"p"},"Extract<T, U>")," type to filter the union to only the possibilities matching a given interface."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"// assume every winged animal has a wingCount property\n// and other animals don't.\ntype AnimalWithWings = Extract<Animal, {wingCount: number}>;\n")),Object(i.b)("h2",{id:"isofvariant"},"isOfVariant"),Object(i.b)("p",null,"It's possible to use ",Object(i.b)("inlineCode",{parentName:"p"},"isOfVariant")," to ",Object(i.b)("strong",{parentName:"p"},"narrow")," a variable to a variant type. ",Object(i.b)("inlineCode",{parentName:"p"},"isOfVariant()")," is a ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards"}),"user-defined type guard")," that expects two parameters"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"The variable to be evaluated"),Object(i.b)("li",{parentName:"ol"},"The variant module to compared against")),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"const flap = (animal: AnimalWithWings) => {...} \ndeclare var a: Animal;\n\nif (isOfVariant(a, AnimalWithWings)) {\n    // a is now known to be an AnimalWithWings\n    // so this is safe.\n    flap(a);\n}\n")),Object(i.b)("p",null,"Note it's possible to construct the variant module ",Object(i.b)("inlineCode",{parentName:"p"},"isOfVariant")," is expecting on the fly. "),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"if (isOfVariant(a, variantList([Animal.bird, Animal.pegasus]))) {\n    flap(a);\n}\n")),Object(i.b)("h2",{id:"cast-and-narrow"},"Cast and Narrow"),Object(i.b)("p",null,"Let's say you have an ",Object(i.b)("inlineCode",{parentName:"p"},"animal: Animal")," and you're sure it's a snake or you only care about it if it's a snake. Here are a couple of shortcuts to help with that."),Object(i.b)("p",null,"If you're sure it's a snake, use cast."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"const snake = cast(animal, 'snake'); // typeof snake === Animal<'snake'>;\n")),Object(i.b)("p",null,"The second property will only allow valid keys of animal."),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Yes this is equivalent to ",Object(i.b)("inlineCode",{parentName:"p"},"const snake = animal as Animal<'snake'>")," but is cleaner in a ",Object(i.b)("inlineCode",{parentName:"p"},"useSelector")," call. Imagine ",Object(i.b)("inlineCode",{parentName:"p"},"state.view")," is a variant of menu states like ",Object(i.b)("inlineCode",{parentName:"p"},"Game"),", ",Object(i.b)("inlineCode",{parentName:"p"},"Settings"),", ",Object(i.b)("inlineCode",{parentName:"p"},"About"),", ",Object(i.b)("inlineCode",{parentName:"p"},"MainMenu"),"."),Object(i.b)("pre",{parentName:"blockquote"},Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"// settingsPage.tsx\nconst graphicsSettings = useSelector((state: RootState) => cast(state.view, 'Settings').graphics);\n"))),Object(i.b)("p",null,"If you're not sure it's a snake, try to narrow it."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"const snake = narrow(animal, 'snake'); // typeof snake === (Animal<'snake'> | undefined);\n\nconsole.log(snake?.pattern);\n")),Object(i.b)("p",null,"Like before, the second property can only be a valid key of ",Object(i.b)("inlineCode",{parentName:"p"},"Animal"),". If ",Object(i.b)("inlineCode",{parentName:"p"},"animal")," is in fact a snake you get it back. If not, you get undefined. This works very well with the optional chaining operator in TypeScript. Especially when you get a deeper object in the tree. "),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Yes this is equivalent to ",Object(i.b)("inlineCode",{parentName:"p"},"const snake = partialMatch(animal, {snake: s => s});")," but it's more readable. It's also clearer in a ",Object(i.b)("inlineCode",{parentName:"p"},"useSelector")," call."),Object(i.b)("pre",{parentName:"blockquote"},Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"// settingsPage.tsx\nconst graphicsSettings = useSelector((state: RootState) => \n    narrow(state.view, 'Settings')?.graphics ?? DEFAULT_GRAPHICS_SETTINGS);\n"))))}p.isMDXComponent=!0},179:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return d}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=r.a.createContext({}),p=function(e){var t=r.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c({},t,{},e)),n},b=function(e){var t=p(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=Object(a.forwardRef)((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),b=p(n),m=a,d=b["".concat(o,".").concat(m)]||b[m]||u[m]||i;return n?r.a.createElement(d,c({ref:t},l,{components:n})):r.a.createElement(d,c({ref:t},l))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var l=2;l<i;l++)o[l]=n[l];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);