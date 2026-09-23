const modal = document.getElementById('message-modal');
const modalText = document.getElementById('modal-text');
const closeModalButton = document.querySelector('.close-modal');
const revealCards = document.querySelectorAll('.reveal-card');
const videoModal = document.getElementById('video-modal');
const closeVideoModalButton = document.querySelector('.close-video-modal');
const videoPlayer = document.getElementById('video-player');
const videoTriggerButton = document.querySelector('.video-trigger');
const loveReasons = [
  'Porque você torna os meus dias mais suaves e mais bonitos.',
  'Porque sua presença me dá paz, segurança e um motivo para sorrir.',
  'Porque você é a pessoa que me faz querer ser melhor todos os dias.',
  'Porque o seu jeito de amar me faz sentir em casa em qualquer lugar.',
  'Porque você é a minha alegria, a minha calma e a minha prioridade.',
  'Porque com você, até os momentos simples viram memórias lindas.',
  'Porque você tem um coração que enche o meu de amor e gratidão.',
  'Porque você me lembra que o amor é feito de gentileza, presença e cuidado.'
];

function openModal(message) {
  modalText.textContent = message;
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

revealCards.forEach((card) => {
  const button = card.querySelector('.open-letter');
  button.addEventListener('click', () => {
    const message = card.dataset.message;
    openModal(message);
  });
});

closeModalButton.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

const gerarMotivoButton = document.getElementById('gerar-motivo');
const motivoTexto = document.getElementById('motivo-texto');

gerarMotivoButton.addEventListener('click', () => {
  const motivoAleatorio = loveReasons[Math.floor(Math.random() * loveReasons.length)];
  motivoTexto.textContent = motivoAleatorio;
});

const botaoAmor = document.getElementById('botao-amor');
if (botaoAmor) {
  botaoAmor.addEventListener('click', () => {
    const motivoAleatorio = loveReasons[Math.floor(Math.random() * loveReasons.length)];
    openModal(`Motivo do dia: ${motivoAleatorio}`);
  });
}

const personalMessageField = document.getElementById('personal-message');
const saveMessageButton = document.getElementById('save-message');
const clearMessageButton = document.getElementById('clear-message');
const savedMessagePreview = document.getElementById('saved-message-preview');

if (personalMessageField && saveMessageButton && clearMessageButton && savedMessagePreview) {
  const STORAGE_KEY = 'nosso-cantinho-mensagem';
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    personalMessageField.value = savedMessage;
    savedMessagePreview.textContent = savedMessage;
  }

  saveMessageButton.addEventListener('click', () => {
    const text = personalMessageField.value.trim();
    if (!text) {
      savedMessagePreview.textContent = 'Sua mensagem vai aparecer aqui.';
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    localStorage.setItem(STORAGE_KEY, text);
    savedMessagePreview.textContent = text;
  });

  clearMessageButton.addEventListener('click', () => {
    personalMessageField.value = '';
    localStorage.removeItem(STORAGE_KEY);
    savedMessagePreview.textContent = 'Sua mensagem vai aparecer aqui.';
  });
}

if (videoTriggerButton) {
  videoTriggerButton.addEventListener('click', () => {
    videoModal.classList.remove('hidden');
    videoPlayer.currentTime = 0;
    videoPlayer.play();
  });
}

if (closeVideoModalButton) {
  closeVideoModalButton.addEventListener('click', () => {
    videoModal.classList.add('hidden');
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  });
}

if (videoModal) {
  videoModal.addEventListener('click', (event) => {
    if (event.target === videoModal) {
      videoModal.classList.add('hidden');
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
    }
  });
}

if (videoPlayer) {
  videoPlayer.addEventListener('ended', () => {
    videoModal.classList.add('hidden');
  });
}
