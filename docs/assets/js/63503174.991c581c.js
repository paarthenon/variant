"use strict";(self.webpackChunkvariant_site=self.webpackChunkvariant_site||[]).push([[823],{4134:function(e){e.exports=JSON.parse('{"pluginId":"default","version":"2.1.0","label":"2.1.0","banner":null,"badge":true,"noIndex":false,"className":"docs-version-2.1.0","isLast":true,"docsSidebars":{"version-2.1.0/someSidebar":[{"collapsed":true,"type":"category","label":"Getting Started","items":[{"type":"link","label":"Introduction","href":"/variant/docs/intro","docId":"intro"},{"type":"link","label":"Motivation","href":"/variant/docs/motivation","docId":"motivation"}],"collapsible":true},{"collapsed":true,"type":"category","label":"User Guide","items":[{"type":"link","label":"Variant","href":"/variant/docs/use/variant","docId":"use/variant"},{"type":"link","label":"Grouping","href":"/variant/docs/use/grouping","docId":"use/grouping"},{"type":"link","label":"Matching","href":"/variant/docs/use/matching","docId":"use/matching"},{"type":"link","label":"Filtering & Analyzing","href":"/variant/docs/use/filter","docId":"use/filter"},{"type":"link","label":"Advanced Creation","href":"/variant/docs/use/advanced-creation","docId":"use/advanced-creation"},{"type":"link","label":"React + Redux \u269b\ufe0f","href":"/variant/docs/use/redux","docId":"use/redux"},{"type":"link","label":"Cheat Sheet","href":"/variant/docs/cheat","docId":"cheat"}],"collapsible":true},{"collapsed":true,"type":"category","label":"Articles","items":[{"type":"link","label":"That type tho...","href":"/variant/docs/articles/that-type","docId":"articles/that-type"},{"type":"link","label":"\'type\', \'tag\', and \'kind\'","href":"/variant/docs/articles/type-name","docId":"articles/type-name"},{"type":"link","label":"\ud83d\udd2e Augmenting variants","href":"/variant/docs/articles/augment","docId":"articles/augment"},{"type":"link","label":"Changelog","href":"/variant/docs/changelog","docId":"changelog"}],"collapsible":true},{"type":"link","label":"\u2615 API","href":"/variant/docs/api","docId":"api"}],"version-2.1.0/secondSidebar":[{"type":"link","label":"About","href":"/variant/docs/about","docId":"about"},{"type":"link","label":"Changelog","href":"/variant/docs/changelog","docId":"changelog"},{"type":"link","label":"Credits & Attribution","href":"/variant/docs/credits","docId":"credits"}]},"docs":{"about":{"id":"about","title":"About","description":"Variant is a project I wished existed. I love TypeScript, but I find it\'s discriminated unions implementation elegant in some ways and clunky in others. See the motivation page for some of the problems this library addresses.","sidebar":"version-2.1.0/secondSidebar"},"api":{"id":"api","title":"API Reference","description":"Functions","sidebar":"version-2.1.0/someSidebar"},"articles/augment":{"id":"articles/augment","title":"\ud83d\udd2e Augmenting variants","description":"\ud83d\udd2e denotes preview content. These are features that are available, but not well-documented and may be modified in the near future as they see better integration.","sidebar":"version-2.1.0/someSidebar"},"articles/that-type":{"id":"articles/that-type","title":"That type tho...","description":"I admit this type I ask you to include is... a bit much.","sidebar":"version-2.1.0/someSidebar"},"articles/type-name":{"id":"articles/type-name","title":"\'type\', \'tag\', and \'kind\'","description":"Some users may prefer a discriminant other than type. The keys tag and kind are popular in various circles, and typename is used in GraphQL communities. The key typeis just the default. You can make a new variant() function to make variants with another discriminant by calling variantFactory.","sidebar":"version-2.1.0/someSidebar"},"changelog":{"id":"changelog","title":"Changelog","description":"Summary of the changes in each patch.","sidebar":"version-2.1.0/secondSidebar"},"cheat":{"id":"cheat","title":"Cheat Sheet","description":"Assume Animal is defined as in the Introduction","sidebar":"version-2.1.0/someSidebar"},"credits":{"id":"credits","title":"Credits & Attribution","description":"I could not have built this so cleanly or quickly myself. I owe thanks to several projects.","sidebar":"version-2.1.0/secondSidebar"},"intro":{"id":"intro","title":"Introduction","description":"**Variant** is a language feature disguised as a library.","sidebar":"version-2.1.0/someSidebar"},"mdx":{"id":"mdx","title":"Powered by MDX","description":"You can write JSX and use React components within your Markdown thanks to MDX."},"motivation":{"id":"motivation","title":"Motivation","description":"\u26a0 This page explains why variant matters. If you just want to know how to use the library, move on and come back to this page.","sidebar":"version-2.1.0/someSidebar"},"use/advanced-creation":{"id":"use/advanced-creation","title":"Advanced Creation","description":"We may wish to have more control or convenience in our variant creation. This library provides a series of inline and top-level helper functions to assist with these efforts. The inline functions are called as an element of variantModule and can be chained. The top-level helpers require special handling.","sidebar":"version-2.1.0/someSidebar"},"use/cast-and-narrow":{"id":"use/cast-and-narrow","title":"Cast and Narrow","description":"Let\'s say you have an animal: Animal and you\'re sure it\'s a snake or you only care about it if it\'s a snake. Here are a couple of shortcuts to help with that."},"use/filter":{"id":"use/filter","title":"Filtering & Analyzing","description":"The last section covered how to create and group variants. Here, we\'ll cover how to narrow variant types into more specific subsets and automatically extract variants from a module based on various types.","sidebar":"version-2.1.0/someSidebar"},"use/generic":{"id":"use/generic","title":"Generic variants","description":""},"use/grouping":{"id":"use/grouping","title":"Grouping","description":"A variant\'s possible cases are most useful in context. The variant for Diamonds could mean any number of things, but the intended meaning becomes clear when Diamonds \u2666 is placed next to Spades \u2660, Hearts \u2665, and Clubs \u2663. In general we call this collection of tag constructors the Variant Module. This module can be constructed in several ways and every method is compatible with the others. Feel free to mix and match styles as the situation dictates.","sidebar":"version-2.1.0/someSidebar"},"use/matching":{"id":"use/matching","title":"Matching","description":"Pattern matching is the crown jewel of variant types. In general, pattern matching compares a given object to a series of patterns and executes the relevant code block when a match is found. Variant features a match expression and several more specific versions for use depending on the situation.","sidebar":"version-2.1.0/someSidebar"},"use/redux":{"id":"use/redux","title":"React + Redux \u269b\ufe0f","description":"Variant works seamlessly with react and redux. Create your actions as a variant just like you would anything else. It should Just Work\u2122 as an action type for your reducers. You can create async task creators by simply using an async function in your variant definition.","sidebar":"version-2.1.0/someSidebar"},"use/variant":{"id":"use/variant","title":"Variant","description":"A variant is a single object that can take many forms. Each of those forms has a type, sometimes called a tag, and optionally a body that tells us what kind of data we have available if in that form. In the introduction we saw how several types of animals could be grouped into the module Animal. In this section we\'ll take a look at the underlying building block that variantModule and variantList use, the variant() function, which can also be used alone.","sidebar":"version-2.1.0/someSidebar"}}}')}}]);