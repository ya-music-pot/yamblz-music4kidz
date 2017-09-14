export default {
  playlist: [
    {
      id: 111,
      name: '',
      artist: 'Егор Крид',
      lyrics: null,
      image_url: '/assets/images/egor.jpg',
      mp3_url: '/assets/music/egor.mp3',
    },
    {
      id: 34976783,
      name: '',
      artist: 'Dragons',
      lyrics: null,
      image_url: '/assets/images/dragons.jpg',
      mp3_url: '/assets/music/dragons.mp3',
    },
    {
      id: 113,
      name: '',
      artist: 'Макс Корж',
      lyrics: null,
      image_url: '/assets/images/max.jpg',
      mp3_url: '/assets/music/max.mp3',
    },
  ],
  steps: [
    {
      step: 1,
      type: 'player',
      title: 'Тебе нравится эта песня?',
    },
    {
      step: 2,
      type: 'emoji',
      title: 'Выбери своё настроение!',
    },
    {
      step: 3,
      type: 'action',
      title: 'Чем будешь заниматься?',
      isGenerateResult: true,
    },
  ],
};
