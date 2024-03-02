module.exports = {
  someSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Tutorial',
      collapsed: false,
      items: [
        'tutorial/part-zero',
      ]
    },
    {
      type: 'category',
      label: 'The Book',
      collapsed: false,
      items: [
        'book/creation',
        {
          type: 'category',
          label: 'Fancier Variants',
          collapsed: true,
          items: [
            'book/scoped',
            'book/recursive',
            'book/generic',
            'book/augment',
          ]
        },
        'book/inspection',
        'book/organization',
        'book/match',
        'book/matcher',
        'book/catalog',
        'book/flags',
        'book/utilities',
      ],
    },
    {
      type: 'category',
      label: 'Articles',
      items: [
        'articles/naming',
        'articles/semantics',
        'articles/that-type',
        'articles/documentation',
        'articles/procedural-generation',
        'articles/pitch',
        'changelog',
        'new-in-3.0',
        'cheat',
      ],
    },
    {
      type: 'category',
      label: 'Libraries',
      items: ['libraries/react', 'libraries/redux', 'libraries/redux-toolkit', 'libraries/rxjs'],
    },
    'todo',
    'glossary',
    {
      type: 'doc',
      id: 'api/modules',
      label: '☕ API',
    }
    
  ],
  secondSidebar: [
    'about',
    'credits',
  ]
};
