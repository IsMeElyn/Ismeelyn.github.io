let config = null;

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
    return color;
}

function initializeVCard() {
	

  const tracks = config.music;

  tracks.sort();

  let currentTrack = 0;
  const audio = document.getElementById('audio-player');
  const playBtn = document.getElementById('play-btn');
  const nextBtn = document.getElementById('next-btn');

  function playTrack() {
    audio.src = tracks[currentTrack];
    audio.play();
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-pause');
  }

  function pauseTrack() {
    audio.pause();
    playBtn.classList.remove('fa-pause');
    playBtn.classList.add('fa-play');
  }

  function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    playTrack();
  }

  function firstClickPlay() {
    playTrack();
    document.removeEventListener('click', firstClickPlay);
  }
  document.addEventListener('click', firstClickPlay);

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      playTrack();
    } else {
      pauseTrack();
    }
  });

  nextBtn.addEventListener('click', nextTrack);

  audio.addEventListener('ended', () => {
    nextTrack();
  });
  
    const el = document.getElementById('name');
    const raw = config.name;
    if (raw.includes('☑️')) {
        const nameOnly = raw.replace('☑️', '').trim();
        el.textContent = nameOnly;
        const space = document.createTextNode(' ');
        el.appendChild(space);
        const badge = document.createElement('img');
        badge.src = './assets/images/verifed.webp';
        badge.alt = 'verified';
        badge.className = 'emoji-verif';
        el.appendChild(badge);
    } else {
        el.textContent = raw;
    }

    document.getElementById('bio').textContent = config.bio;

    const hobbiesContainer = document.getElementById('hobbies-container');
    config.hobbies.forEach(hobby => {
        const hobbyTag = document.createElement('div');
        hobbyTag.className = 'hobby-tag';
        const colorCircle = document.createElement('div');
        colorCircle.className = 'hobby-color';
        colorCircle.style.backgroundColor = hobby.color || getRandomColor();
        const hobbyName = document.createElement('span');
        hobbyName.textContent = hobby.name;
        hobbyTag.appendChild(colorCircle);
        hobbyTag.appendChild(hobbyName);
        hobbiesContainer.appendChild(hobbyTag);
    });

    document.getElementById('whatsapp-btn').onclick = () => window.open(config.socialLinks.whatsapp, '_blank');
    document.getElementById('telegram-btn').onclick = () => window.open(config.socialLinks.telegram, '_blank');
    document.getElementById('github-btn').onclick = () => window.open(config.socialLinks.github, '_blank');
    document.getElementById('discord-btn').onclick = () => window.open(config.socialLinks.discord, '_blank');

    const redirectButtonsContainer = document.getElementById('redirect-buttons');
    config.redirects.forEach(redirect => {
        const redirectBtn = document.createElement('div');
        redirectBtn.className = 'redirect-btn';
        const logoDiv = document.createElement('div');
        logoDiv.className = 'redirect-logo';
        const logoIcon = document.createElement('i');
        logoIcon.className = redirect.logo;
        logoDiv.appendChild(logoIcon);
        const textDiv = document.createElement('div');
        textDiv.className = 'redirect-text';
        const mainText = document.createElement('div');
        mainText.className = 'redirect-main';
        mainText.textContent = redirect.title;
        const subText = document.createElement('div');
        subText.className = 'redirect-sub';
        subText.textContent = redirect.subtitle;
        textDiv.appendChild(mainText);
        textDiv.appendChild(subText);
        redirectBtn.appendChild(logoDiv);
        redirectBtn.appendChild(textDiv);
        redirectBtn.onclick = () => window.open(redirect.url, '_blank');
        redirectButtonsContainer.appendChild(redirectBtn);
    });
}
  
  fetch('./config.json')
    .then(res => res.json())
    .then(data => {
        config = data;
        initializeVCard();
    })
    .catch(err => console.error('Config load error:', err));