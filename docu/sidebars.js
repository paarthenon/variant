module.exports = {
  someSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Tutorial',
      collapsed: false,
      items: [
        'tutorial/part-zero',
        'tutorial/part-one',
      ]
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
            'book/advanced-creation',
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
        'new-in-3.0',
        'cheat',
      ],

    },
    {
      type: 'category',
      label: 'Articles',
      items: ['articles/naming', 'articles/semantics', 'articles/that-type', 'articles/documentation', 'articles/pitch', 'changelog'],
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
