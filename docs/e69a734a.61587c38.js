(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{167:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return s}));var a=n(1),r=n(9),i=(n(0),n(179)),o={id:"recursive",title:"Recursive variants"},l={id:"use/recursive",title:"Recursive variants",description:"Recursive variants are a wonderful pattern for expressing and evaluating tree and list-like data. The traditional example involves a binary tree, so let's do a binary tree of `Animal`s. An animal tree may not have many real world applications but please bear with me. We'll create a more universal `Tree<T>` type in the next section on [generic variants](use/generic).\r",source:"@site/docs\\use\\recursive.md",permalink:"/variant/docs/use/recursive",sidebar:"someSidebar",previous:{title:"Filtering",permalink:"/variant/docs/use/filter"},next:{title:"Generic variants",permalink:"/variant/docs/use/generic"}},c=[{value:"<code>typedVariant&lt;T&gt;()</code>",id:"typedvariantt",children:[{value:"<code>pass</code>",id:"pass",children:[]},{value:"custom implementation",id:"custom-implementation",children:[]}]}],p={rightToc:c};function s(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Recursive variants are a wonderful pattern for expressing and evaluating tree and list-like data. The traditional example involves a binary tree, so let's do a binary tree of ",Object(i.b)("inlineCode",{parentName:"p"},"Animal"),"s. An animal tree may not have many real world applications but please bear with me. We'll create a more universal ",Object(i.b)("inlineCode",{parentName:"p"},"Tree<T>")," type in the next section on ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"use/generic"}),"generic variants"),"."),Object(i.b)("h2",{id:"typedvariantt"},Object(i.b)("inlineCode",{parentName:"h2"},"typedVariant<T>()")),Object(i.b)("p",null,"So far we've been letting the ",Object(i.b)("strong",{parentName:"p"},"type")," flow from the ",Object(i.b)("strong",{parentName:"p"},"value"),". However, this makes recursive variants impossible. Attempting to reference ",Object(i.b)("inlineCode",{parentName:"p"},"AnimalNode")," in the ",Object(i.b)("em",{parentName:"p"},"definition")," for ",Object(i.b)("inlineCode",{parentName:"p"},"AnimalNode")," causes an error in the time-loop (and ",Object(i.b)("inlineCode",{parentName:"p"},"tsc"),")."),Object(i.b)("p",null,"So we've got flip our approach. We're going to make a ",Object(i.b)("strong",{parentName:"p"},"type")," and ",Object(i.b)("em",{parentName:"p"},"then")," create the variant module, the ",Object(i.b)("strong",{parentName:"p"},"value"),", based on that type."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"type AnimalTree =\n    | Variant<'Leaf', {animal: Animal}>\n    | Variant<'Branch', {left?: AnimalTree, right?: AnimalTree, label?: string}>\n;\n\nconst AnimalTree = typedVariant<AnimalTree>({\n    Leaf: pass,\n    Branch: pass,\n});\n\nconst tree = AnimalTree.Branch({\n    label: 'Animal Kingdom',\n    left: AnimalTree.Leaf({animal: Animal.snake({name: 'Steve'})),\n    right: AnimalTree.Branch({\n        label: 'Mammals',\n        left: AnimalTree.Leaf({animal: Animal.dog({name: 'Cerberus'})}),\n        right: AnimalTree.Leaf({animal: Animal.cat({name: 'Sikandar'})}),\n    })\n})\n")),Object(i.b)("p",null,"In this example we created a recursive type, a binary tree of ",Object(i.b)("inlineCode",{parentName:"p"},"Animal"),"s. We then created the implementation of that type as a variant module by calling ",Object(i.b)("inlineCode",{parentName:"p"},"typedVariant<T>()"),". "),Object(i.b)("h3",{id:"pass"},Object(i.b)("inlineCode",{parentName:"h3"},"pass")),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"pass")," achieves the most common use case\u2014create a variant that accepts an object of a given type and returns that object plus the ",Object(i.b)("inlineCode",{parentName:"p"},"type: ...")," property. The user is welcome to write the implementation themselves, but most often ",Object(i.b)("inlineCode",{parentName:"p"},"pass")," is sufficient."),Object(i.b)("h3",{id:"custom-implementation"},"custom implementation"),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"typedVariant<T>()")," uses the type ",Object(i.b)("inlineCode",{parentName:"p"},"T")," to restrict the object you offer as the implementation, meaning you can safely destructure the variant's input in its own implementation."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"const AnimalTree = typedVariant<AnimalTree>({\n    Leaf: ({animal}) => {\n        console.log('creating leaf node with animal', animal);\n        return {animal};\n    },\n    Branch: pass,\n});\n\n")))}s.isMDXComponent=!0},179:function(e,t,n){"use strict";n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return d}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=r.a.createContext({}),s=function(e){var t=r.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l({},t,{},e)),n},m=function(e){var t=s(e.components);return r.a.createElement(p.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=Object(a.forwardRef)((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),m=s(n),u=a,d=m["".concat(o,".").concat(u)]||m[u]||b[u]||i;return n?r.a.createElement(d,l({ref:t},p,{components:n})):r.a.createElement(d,l({ref:t},p))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=u;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);