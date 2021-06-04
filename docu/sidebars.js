module.exports = {
  someSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['intro', 'documentation', 'new-in-3.0'],
    },
    {
      type: 'category',
      label: 'User Guide',
      items: [
        {
          type: 'category',
          label: 'Creation',
          items: [
            'book/creation',
            'book/augment',
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
      items: ['articles/naming', 'changelog'],
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
