module.exports = {
  someSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'intro',
        {
          type: 'category',
          label: 'Tutorial',
          collapsed: false,
          items: [
            'tutorial/part-one',
          ]
        },
        'documentation',
        'new-in-3.0',
      ],
    },
    {
      type: 'category',
      label: 'The Book',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Creation',
          collapsed: true,
          items: [
            'book/creation',
            'book/augment',
            'book/generic',
            'book/procedural-generation',
          ]
        },
        'book/organization',
        {
          type: 'category',
          label: 'Matching',
          items: ['book/match', 'book/matcher'],
        },
        'book/flags',
        'cheat',
      ],
    },
    {
      type: 'category',
      label: 'Articles',
      items: ['articles/naming', 'articles/semantics', 'articles/that-type', 'changelog'],
    },
    {
      type: 'category',
      label: 'Libraries',
      items: ['libraries/rxjs', 'libraries/redux-toolkit'],
    },
    'todo',
    'api',
    'glossary',
  ],
  secondSidebar: [
    'about',
    'changelog',
    'credits',
  ]
};
