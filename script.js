/**
 * RUBINA'S 18th BIRTHDAY CINEMATIC EXPERIENCE
 * Starring Rubina (TUDI) & Prakash (Kalidas)
 * October 7th - 18 Magical Years
 */

// --- Global Audio Controller ---
const bgAudio = new Audio('assets/audio/bg_song.mp3');
bgAudio.loop = true;
bgAudio.volume = 0.55;

let isBgPlaying = false;
let currentVoiceAudio = null; // for voice note playback

// Media Catalog
const couplePhotos = Array.from({ length: 36 }, (_, i) => ({
    id: i + 1,
    src: `assets/images/couple_photo_${String(i + 1).padStart(2, '0')}.jpg`,
    title: `Prakash & Rubina • Moment #${i + 1}`,
    category: 'couple'
}));

const rubinaPortraits = Array.from({ length: 6 }, (_, i) => ({
    id: i + 37,
    src: `assets/images/rubina_portrait_${String(i + 1).padStart(2, '0')}.jpg`,
    title: `Birthday Queen Rubina • Snapshot #${i + 1}`,
    category: 'candid'
}));

const coupleVideos = Array.from({ length: 13 }, (_, i) => ({
    id: i + 1,
    src: `assets/videos/couple_video_${String(i + 1).padStart(2, '0')}.mp4`,
    title: `Our Midnight Reel #${i + 1}`,
    category: 'video'
}));

// Voice Vault Playlist
const voiceNotes = [
    {
        id: 'voice_1',
        title: "Tudi le xya re vandai",
        date: "Sep 24, 2026 • 5:35 AM",
        src: "assets/audio/voice_tudi_chup.mp4",
        speaker: "Rubina",
        quote: "Chup hai! ssssssshhhh chup..."
    },
    {
        id: 'voice_2',
        title: "Rupesh le tudi lai jiskaudai",
        date: "Jul 16, 2026 • 6:31 AM",
        src: "assets/audio/1010902634874933.mp4",
        speaker: "Rubina",
        quote: "Ole ole mani halka nervous bhako jhan tyo dai le dhoka laagyesi ta... 😂"
    },
    {
        id: 'voice_3',
        title: "tudi boulayo",
        date: "Jul 07, 2026 • 9:23 PM",
        src: "assets/audio/1011927981810012.mp4",
        speaker: "Prakash",
        quote: "Oi rubi don't be sad hai... timi sanga huda I forget the whole world."
    },
    {
        id: 'voice_4',
        title: "Risako jasto ni garxe feri",
        date: "Jun 28, 2026 • 1:04 AM",
        src: "assets/audio/1019601550469812.mp4",
        speaker: "Rubina",
        quote: "Suta cito... goodnight nabhani sutyo jhan! 🌙"
    },
    {
        id: 'voice_5',
        title: "Halka love vako jasto",
        date: "Jul 26, 2026 • 6:58 AM",
        src: "assets/audio/1026474930083731.mp4",
        speaker: "Rubina",
        quote: "Bhetesi all we do is yap k... ekchoti ni topic sakidaina!"
    },
    {
        id: 'voice_6',
        title: "tudi lai k ko hatar",
        date: "Jul 30, 2026 • 12:00 AM",
        src: "assets/audio/1026586090168263.mp4",
        speaker: "Rubina",
        quote: "I just want us... no matter what, everything feels right w you."
    },
    {
        id: 'voice_7',
        title: "geet gako jasto ni garxe feri",
        date: "Jul 07, 2026 • 9:25 PM",
        src: "assets/audio/1031544095944594.mp4",
        speaker: "Prakash",
        quote: "Let's keep our bond exactly like this... timi bahek aru koi xaina."
    },
    {
        id: 'voice_8',
        title: "Mood swing hudai xa hai",
        date: "Jul 11, 2026 • 8:16 AM",
        src: "assets/audio/1032203929708733.mp4",
        speaker: "Rubina",
        quote: "Take care, be safe, be warm... sleeppp wellll! ✨"
    },
    {
        id: 'voice_9',
        title: "tudi boksi laugh",
        date: "Sep 02, 2026 • 8:30 AM",
        src: "assets/audio/audioclip-1788317149000-7807.mp4",
        speaker: "Rubina",
        quote: "Good morning sunshine... waking up and missing you ❤️"
    },
    {
        id: 'voice_10',
        title: "hasnani na paune",
        date: "Sep 02, 2026 • 8:35 AM",
        src: "assets/audio/audioclip-1788317409000-7893.mp4",
        speaker: "Rubina",
        quote: "Sunana... timro kura sunna man lagyo aaja! 🌸"
    }
];

// That Evening, That Ride Adventure Stops (Our Golden Adventure)
const adventureStops = [
    {
        num: 1,
        time: "06:15 PM",
        title: "Stop 1: Chiya Dailo, Ekantakuna",
        location: "Ekantakuna, Lalitpur",
        description: "Right after Rubina returned from college at 6 PM, Prakash was already waiting downstairs with his scooter. They zipped through the evening traffic to Chiya Dailo in Ekantakuna for hot tea and a warm croissant. We didn't have much time, but somehow, every single minute felt special.",
        quote: "Prakash: 'Ek cup tat-tato chiya, croissant, ani timro saath... somehow, every minute felt special.'",
        badge: "Chiya & Croissant ☕🥐",
        videoSrc: "assets/videos/couple_video_01.mp4"
    },
    {
        num: 2,
        time: "06:55 PM",
        title: "Stop 2: Serenade at Pimbahal Pokhari",
        location: "Pimbahal, Lalitpur",
        description: "The ancient heritage lake under the amber night streetlights. Prakash brought Rubina here to share this quiet, romantic spot, watching the water ripples side by side in awe. This was the moment Prakash captured on video that he later sent on June 27: 'Scooter ma. Ma timi lai ghumai dinxu sarararar. 2 ghanta 😉'.",
        quote: "Prakash: 'Pimbahal pokhari tha xa?? Lalitpur ma babal babal thau haru xa kya... tara timi sanga huda it was pure magic.'",
        badge: "Moonlit Waters 🌙",
        videoSrc: "assets/videos/pimbahal_pokhari.mp4"
    },
    {
        num: 3,
        time: "07:35 PM",
        title: "Stop 3: Cruising Through Jhamsikhel",
        location: "Jhamsikhel, Lalitpur",
        description: "Cruising along the chic glowing cafe lanes. Rubina holding tight on the backseat as the scooter leaned around the turns, sharing one single pair of AirPods. Blasting favorite songs at full volume into the cold night wind, singing out loud and playfully teasing people on the sidewalk.",
        quote: "One AirPod each, full volume, singing along into the freezing night wind without a single care in the world.",
        badge: "One AirPod, Shared Heartbeat 🎧",
        videoSrc: "assets/videos/couple_video_04.mp4"
    },
    {
        num: 4,
        time: "08:10 PM",
        title: "Stop 4: Passing The College Gates",
        location: "Kathmandu",
        description: "Passing the very street and college where Prakash first saw Rubina in her college dress and lost his breath. Re-living the exact moment that started everything and inspired that first fateful DM: 'Oi, sorry hai...'.",
        quote: "'That girl in the college dress on the street who quietly stole my whole future.'",
        badge: "Where Destiny Began 🏫",
        videoSrc: "assets/videos/couple_video_06.mp4"
    },
    {
        num: 5,
        time: "08:45 PM",
        title: "Stop 5: Neon Electric Thamel & The Rush Home",
        location: "Thamel, Kathmandu",
        description: "Neon signs, bustling night streets, buzzing crowds, and that delicious heart-pounding terror: 'Katai ghar bata call aaune ta hoina? Baba le tha paunu hunxa ki?' The thrilling race against the clock to make it back to Anisha's house before 9:00 PM, laughing together in pure adrenaline relief.",
        quote: "Rubina: 'Mata ksm daar lagira thiyo k... tara it was honestly the best night ever.'",
        badge: "Stolen 150 Minutes of Magic ✨",
        videoSrc: "assets/videos/couple_video_08.mp4"
    }
];

// Chat Mockup Sequence (Act 1)
const chatTranscript = [
    { sender: 'Prakash', time: 'Day 1 • 6:27 AM', text: "Ani kya timro koi crush xaina ?" },
    { sender: 'Rubina', time: 'Day 1 • 7:16 AM', text: "haina malai testo koi man pardaina khasai kta manchey mathi alik barosha lagdaina kya... Jhan cheat khayesi ta bho 💔" },
    { sender: 'Prakash', time: 'Day 1 • 7:21 AM', text: "Mero ta xa ek jana ramri lagxa... Ma ta fan xu yar! Timi yesto ramri lagxa ✨" },
    { sender: 'Rubina', time: 'Day 1 • 8:54 AM', text: "Kami manchey ramri hudaina hau... Hya oi real ma maile timlai ekchoti ni dekheko xaina ani 🙈" },
    { sender: 'Prakash', time: 'Day 1 • 8:56 AM', text: "Malai mann parxa timro jasto face." },
    { sender: 'Prakash', time: 'Day 1 • 9:10 AM', text: "Tara ma sanga boli rakha hai... Timro bf vayeni j vayeni, ma jaile timilai help garne xu. Timilai khusi banauna mann lagxa." },
    { sender: 'Rubina', time: 'Day 1 • 9:14 AM', text: "Pir nagara na ma bolihalchu ni 😊" },
    { sender: 'Prakash', time: 'Day 1 • 9:16 AM', text: "Bola and sab kura share gara... Dukha ko sukha ko. Timro close friend banna mann xa, timilai kunai kura ma dukha na hos kya." },
    { sender: 'Rubina', time: 'Jul 12 • 9:07 AM', text: "Aba dekhi i will open up and say whatever comes... ani i do feel u are mine not totally but still ❤️" },
    { sender: 'Prakash', time: 'Jul 18 • 10:24 AM', text: "I just want you to be mine and only mine kyaaaaa! 💕" },
    { sender: 'Rubina', time: 'Sep 13 • 10:52 AM', text: "Kalidas pehele ka ho ya abhi ka hey toh Mera hi na... 🥰" }
];

// Initialize Everything on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    initMusicPlayers();
    initParticleCanvas();
    initCountdownTimer();
    initChatReplay();
    initAdventureSection();
    initVoiceVault();
    initMediaGallery();
    initBirthdayLetter();
    initBirthdayCake();
    initLoveMeter();
    setupCelebrationTriggers();
    initScrapbookStickers();
});

// --- 1. Music Players (Vinyl & Navbar) ---
function initMusicPlayers() {
    const heroVinyl = document.getElementById('hero-vinyl-disc');
    const heroTonearm = document.getElementById('hero-tonearm');
    const vinylBtn = document.getElementById('vinyl-play-btn');
    const navPlayBtn = document.getElementById('nav-play-btn');
    const navPlayIcon = document.getElementById('nav-play-icon');
    const navVolume = document.getElementById('nav-volume-slider');
    const eqBars = document.querySelectorAll('.equalizer-bar');
    const audioToast = document.getElementById('audio-unlock-toast');

    function updatePlayState(playing) {
        isBgPlaying = playing;
        if (playing) {
            heroVinyl?.classList.add('spinning');
            heroTonearm?.classList.add('playing');
            navPlayIcon?.classList.replace('fa-play', 'fa-pause');
            eqBars.forEach(b => b.classList.add('active'));
            if (vinylBtn) vinylBtn.innerHTML = '<i class="fas fa-pause mr-2 text-champagne"></i> Pause Anthem';
            if (audioToast) audioToast.style.display = 'none';
        } else {
            heroVinyl?.classList.remove('spinning');
            heroTonearm?.classList.remove('playing');
            navPlayIcon?.classList.replace('fa-pause', 'fa-play');
            eqBars.forEach(b => b.classList.remove('active'));
            if (vinylBtn) vinylBtn.innerHTML = '<i class="fas fa-play mr-2 text-champagne"></i> Play Our Song';
        }
    }

    async function toggleBgMusic() {
        if (bgAudio.paused) {
            try {
                // If a voice note is playing, stop it first
                if (currentVoiceAudio && !currentVoiceAudio.paused) {
                    currentVoiceAudio.pause();
                }
                await bgAudio.play();
                updatePlayState(true);
            } catch (err) {
                console.log('Audio autoplay prevented, requires direct user click', err);
            }
        } else {
            bgAudio.pause();
            updatePlayState(false);
        }
    }

    vinylBtn?.addEventListener('click', toggleBgMusic);
    navPlayBtn?.addEventListener('click', toggleBgMusic);

    if (navVolume) {
        navVolume.addEventListener('input', (e) => {
            bgAudio.volume = parseFloat(e.target.value);
        });
    }

    // Auto-prompt to start music on first user gesture anywhere
    const unlockOnFirstClick = () => {
        if (!isBgPlaying && bgAudio.paused) {
            toggleBgMusic();
        }
        document.removeEventListener('click', unlockOnFirstClick);
    };
    document.addEventListener('click', unlockOnFirstClick, { once: true });
}

// --- 2. Particle Canvas (Gold Sparkles & Rose Petals) ---
function initParticleCanvas() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.2 + 0.8,
            speedY: Math.random() * 0.7 + 0.2,
            speedX: (Math.random() - 0.5) * 0.4,
            opacity: Math.random() * 0.7 + 0.2,
            isPetal: Math.random() > 0.65,
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 2
        });
    }

    function render() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotSpeed;

            if (p.y > height + 20) {
                p.y = -10;
                p.x = Math.random() * width;
            }
            if (p.x > width + 10) p.x = -10;
            if (p.x < -10) p.x = width + 10;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);

            if (p.isPetal) {
                // Draw soft rose petal
                ctx.beginPath();
                ctx.ellipse(0, 0, p.radius * 3.5, p.radius * 2, 0, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(231, 163, 147, ${p.opacity * 0.65})`;
                ctx.fill();
            } else {
                // Draw glowing champagne star
                ctx.beginPath();
                ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(244, 208, 111, ${p.opacity})`;
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'rgba(244, 208, 111, 0.8)';
                ctx.fill();
            }
            ctx.restore();
        }
        requestAnimationFrame(render);
    }
    render();
}

// --- 3. Countdown Timer (To Oct 7th) ---
function initCountdownTimer() {
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    if (!daysEl) return;

    // October 7th target
    const currentYear = new Date().getFullYear();
    let bdayDate = new Date(currentYear, 9, 7, 0, 0, 0); // Month 9 is October (0-indexed)

    function update() {
        const now = new Date();
        let diff = bdayDate - now;

        if (diff <= 0) {
            // Already birthday!
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minsEl.textContent = '00';
            secsEl.textContent = '00';
            const bdayBanner = document.getElementById('bday-active-banner');
            if (bdayBanner) bdayBanner.classList.remove('hidden');
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = String(d).padStart(2, '0');
        hoursEl.textContent = String(h).padStart(2, '0');
        minsEl.textContent = String(m).padStart(2, '0');
        secsEl.textContent = String(s).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

// --- 4. Act 1: Chat Replay Animation ---
function initChatReplay() {
    const container = document.getElementById('chat-messages-container');
    const replayBtn = document.getElementById('replay-chat-btn');
    if (!container) return;

    function renderChat() {
        container.innerHTML = '';
        chatTranscript.forEach((msg, idx) => {
            const isPrakash = msg.sender === 'Prakash';
            const wrapper = document.createElement('div');
            wrapper.className = `flex flex-col mb-4 ${isPrakash ? 'items-end' : 'items-start'} opacity-0 transform translate-y-3 transition-all duration-500`;
            wrapper.style.transitionDelay = `${idx * 160}ms`;

            const label = document.createElement('span');
            label.className = 'text-xs text-rose-300/60 mb-1 px-2 font-mono';
            label.textContent = `${msg.sender} • ${msg.time}`;

            const bubble = document.createElement('div');
            bubble.className = `max-w-[85%] md:max-w-[70%] p-3.5 text-sm md:text-base leading-relaxed ${isPrakash ? 'chat-bubble-prakash' : 'chat-bubble-rubina'
                }`;
            bubble.textContent = msg.text;

            wrapper.appendChild(label);
            wrapper.appendChild(bubble);
            container.appendChild(wrapper);

            setTimeout(() => {
                wrapper.classList.remove('opacity-0', 'translate-y-3');
            }, 50);
        });
    }

    renderChat();
    replayBtn?.addEventListener('click', () => {
        renderChat();
        triggerConfettiMini();
    });
}

// --- 5. Act 2: 2.5-Hour Adventure Stops ---
function initAdventureSection() {
    const listContainer = document.getElementById('adventure-stops-list');
    const previewContainer = document.getElementById('adventure-stop-preview');
    if (!listContainer || !previewContainer) return;

    let activeStopIdx = 1; // Default to Pimbahal Pokhari (Stop 2)

    function renderStops() {
        listContainer.innerHTML = '';
        adventureStops.forEach((stop, idx) => {
            const isActive = idx === activeStopIdx;
            const btn = document.createElement('button');
            btn.className = `w-full text-left p-4 rounded-xl transition-all duration-300 border flex items-center justify-between ${isActive
                ? 'bg-rose-950/80 border-champagne text-champagne shadow-lg timeline-dot-active'
                : 'bg-[#2a080f]/40 border-rose-900/30 text-rose-200/80 hover:bg-[#3d0b16]/60 hover:border-rose-700/50'
                }`;

            btn.innerHTML = `
                <div class="flex items-center space-x-3">
                    <span class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${isActive ? 'bg-champagne text-burgundy-dark font-cinzel' : 'bg-rose-900/40 text-rose-300'
                }">${stop.num}</span>
                    <div>
                        <div class="font-semibold text-sm md:text-base">${stop.title}</div>
                        <div class="text-xs text-rose-300/60 font-mono">${stop.time} • ${stop.location}</div>
                    </div>
                </div>
                <i class="fas fa-chevron-right text-xs ${isActive ? 'text-champagne transform rotate-90' : 'text-rose-400/40'}"></i>
            `;

            btn.addEventListener('click', () => {
                activeStopIdx = idx;
                renderStops();
                renderPreview(stop);
            });

            listContainer.appendChild(btn);
        });
    }

    function renderPreview(stop) {
        previewContainer.innerHTML = `
            <div class="glass-panel-gold rounded-2xl p-6 md:p-8 animate-fadeIn">
                <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-champagne/20 text-champagne border border-champagne/40">
                        ${stop.badge}
                    </span>
                    <span class="text-xs font-mono text-rose-300/70"><i class="far fa-clock mr-1"></i> ${stop.time}</span>
                </div>
                
                <h3 class="font-playfair text-2xl md:text-3xl text-gold-gradient font-bold mb-3">${stop.title}</h3>
                
                <p class="text-rose-100/90 text-sm md:text-base leading-relaxed mb-6 font-light">
                    ${stop.description}
                </p>

                <div class="relative rounded-xl overflow-hidden shadow-2xl border border-rose-900/40 mb-6 bg-black aspect-video flex items-center justify-center">
                    <video id="adventure-video-player" src="${stop.videoSrc}" controls class="w-full h-full object-cover" poster="assets/images/couple_photo_05.jpg"></video>
                </div>

                <div class="p-4 rounded-xl bg-burgundy-dark/60 border border-rose-800/30 flex items-start space-x-3">
                    <i class="fas fa-quote-left text-champagne/60 text-lg mt-1"></i>
                    <p class="font-handwritten text-xl text-rose-200 leading-snug">
                        ${stop.quote}
                    </p>
                </div>
            </div>
        `;
    }

    renderStops();
    renderPreview(adventureStops[activeStopIdx]);
}

// --- 6. Act 3: Voice Vault (Cassette Player Widget) ---
function initVoiceVault() {
    const playlistContainer = document.getElementById('voice-playlist');
    const cassetteTitle = document.getElementById('cassette-track-title');
    const cassetteDate = document.getElementById('cassette-track-date');
    const cassetteQuote = document.getElementById('cassette-track-quote');
    const cassettePlayBtn = document.getElementById('cassette-play-btn');
    const cassettePrevBtn = document.getElementById('cassette-prev-btn');
    const cassetteNextBtn = document.getElementById('cassette-next-btn');
    const cassetteLoopBtn = document.getElementById('cassette-loop-btn');
    const cassetteSeekBar = document.getElementById('cassette-seek-bar');
    const cassetteCurrentTime = document.getElementById('cassette-current-time');
    const cassetteDuration = document.getElementById('cassette-duration');
    const cassetteLedRec = document.getElementById('cassette-led-rec');
    const spools = document.querySelectorAll('.tape-spool');
    const cassetteWaves = document.querySelectorAll('.cassette-wave-bar');

    let currentTrackIdx = 0;
    let isDraggingSeek = false;
    let isLooping = false;
    const voiceAudio = new Audio(voiceNotes[0].src);
    currentVoiceAudio = voiceAudio;

    function formatTime(seconds) {
        if (isNaN(seconds) || seconds < 0) return '0:00';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    function loadTrack(idx, autoPlay = false) {
        currentTrackIdx = idx;
        const track = voiceNotes[idx];
        voiceAudio.src = track.src;

        if (cassetteTitle) cassetteTitle.textContent = track.title;
        if (cassetteDate) cassetteDate.textContent = `${track.speaker} • ${track.date}`;
        if (cassetteQuote) cassetteQuote.textContent = `"${track.quote}"`;

        if (cassetteSeekBar) cassetteSeekBar.value = 0;
        if (cassetteCurrentTime) cassetteCurrentTime.textContent = '0:00';
        if (cassetteDuration) cassetteDuration.textContent = '--:--';

        updatePlaylistUI();

        if (autoPlay) {
            playVoiceNote();
        } else {
            stopVoiceNote();
        }
    }

    function playVoiceNote() {
        // Lower background song volume temporarily
        if (isBgPlaying && !bgAudio.paused) {
            bgAudio.volume = 0.15;
        }

        voiceAudio.play().then(() => {
            if (cassettePlayBtn) {
                cassettePlayBtn.innerHTML = '<i class="fas fa-pause mr-2 text-burgundy-dark"></i> Pause Tape';
            }
            spools.forEach(s => s.classList.add('playing'));
            cassetteWaves.forEach(w => w.classList.add('active'));
            cassetteLedRec?.classList.add('active');
            updatePlaylistUI();
        }).catch(err => console.log('Audio playback error', err));
    }

    function stopVoiceNote() {
        voiceAudio.pause();
        if (cassettePlayBtn) {
            cassettePlayBtn.innerHTML = '<i class="fas fa-play mr-2 text-burgundy-dark"></i> Play Tape';
        }
        spools.forEach(s => s.classList.remove('playing'));
        cassetteWaves.forEach(w => w.classList.remove('active'));
        cassetteLedRec?.classList.remove('active');
        updatePlaylistUI();

        // Restore background song volume
        if (isBgPlaying && !bgAudio.paused) {
            bgAudio.volume = 0.55;
        }
    }

    voiceAudio.addEventListener('timeupdate', () => {
        if (cassetteCurrentTime) cassetteCurrentTime.textContent = formatTime(voiceAudio.currentTime);
        if (cassetteSeekBar && !isDraggingSeek) {
            if (voiceAudio.duration && !isNaN(voiceAudio.duration)) {
                cassetteSeekBar.value = (voiceAudio.currentTime / voiceAudio.duration) * 100;
            } else {
                cassetteSeekBar.value = 0;
            }
        }
    });

    voiceAudio.addEventListener('loadedmetadata', () => {
        if (cassetteDuration && voiceAudio.duration) {
            cassetteDuration.textContent = formatTime(voiceAudio.duration);
        }
    });

    voiceAudio.addEventListener('ended', () => {
        if (!isLooping) {
            stopVoiceNote();
        }
    });

    if (cassetteSeekBar) {
        cassetteSeekBar.addEventListener('input', () => {
            isDraggingSeek = true;
        });
        cassetteSeekBar.addEventListener('change', () => {
            if (voiceAudio.duration && !isNaN(voiceAudio.duration)) {
                voiceAudio.currentTime = (cassetteSeekBar.value / 100) * voiceAudio.duration;
            }
            isDraggingSeek = false;
        });
    }

    cassettePlayBtn?.addEventListener('click', () => {
        if (voiceAudio.paused) {
            playVoiceNote();
        } else {
            stopVoiceNote();
        }
    });

    cassettePrevBtn?.addEventListener('click', () => {
        const prevIdx = (currentTrackIdx - 1 + voiceNotes.length) % voiceNotes.length;
        loadTrack(prevIdx, true);
    });

    cassetteNextBtn?.addEventListener('click', () => {
        const nextIdx = (currentTrackIdx + 1) % voiceNotes.length;
        loadTrack(nextIdx, true);
    });

    cassetteLoopBtn?.addEventListener('click', () => {
        isLooping = !isLooping;
        voiceAudio.loop = isLooping;
        cassetteLoopBtn.classList.toggle('text-champagne', isLooping);
        cassetteLoopBtn.classList.toggle('border-champagne', isLooping);
    });

    function updatePlaylistUI() {
        if (!playlistContainer) return;
        playlistContainer.innerHTML = '';

        voiceNotes.forEach((vn, idx) => {
            const isCurrent = idx === currentTrackIdx;
            const isPlaying = isCurrent && !voiceAudio.paused;
            const isRubina = vn.speaker.toLowerCase().includes('rubina');
            const item = document.createElement('div');
            item.className = `p-3 sm:p-3.5 rounded-xl cursor-pointer transition-all duration-300 border flex items-center justify-between group ${isCurrent
                ? 'bg-gradient-to-r from-rose-950/90 to-burgundy-rich/80 border-champagne text-champagne shadow-[0_4px_20px_rgba(244,208,111,0.2)]'
                : 'bg-burgundy-dark/50 border-rose-900/30 text-rose-200/80 hover:bg-[#340912]/70 hover:border-rose-800/60'
                }`;

            item.innerHTML = `
                <div class="flex items-center space-x-3 min-w-0 pr-2">
                    <div class="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold transition-all ${isCurrent
                    ? 'bg-champagne text-burgundy-dark shadow-[0_0_10px_rgba(244,208,111,0.5)]'
                    : 'bg-rose-950/70 border border-rose-800/40 text-rose-300 group-hover:border-champagne/40'
                }">
                        <i class="fas ${isPlaying ? 'fa-compact-disc fa-spin' : 'fa-tape text-[11px]'}"></i>
                    </div>
                    <div class="min-w-0">
                        <div class="text-sm font-semibold truncate ${isCurrent ? 'text-champagne font-bold' : 'text-rose-100 group-hover:text-champagne'}">
                            ${vn.title}
                        </div>
                        <div class="flex items-center space-x-2 text-[11px] font-mono text-rose-300/70 mt-0.5">
                            <span class="px-1.5 py-0.2 rounded text-[10px] ${isRubina ? 'bg-rose-900/60 text-rose-300 border border-rose-800/40' : 'bg-amber-950/60 text-champagne border border-amber-800/40'
                }">
                                ${isRubina ? '🎙️ Rubina' : '🎙️ Prakash'}
                            </span>
                            <span>•</span>
                            <span>${vn.date}</span>
                        </div>
                        <div class="text-[11px] font-handwritten text-rose-300/80 italic truncate mt-0.5">
                            "${vn.quote}"
                        </div>
                    </div>
                </div>
                <div class="flex-shrink-0 pl-2">
                    ${isPlaying
                    ? '<div class="flex items-center space-x-0.5"><span class="w-1 h-3.5 bg-champagne rounded-full animate-bounce"></span><span class="w-1 h-5 bg-champagne rounded-full animate-bounce delay-100"></span><span class="w-1 h-2.5 bg-champagne rounded-full animate-bounce delay-200"></span></div>'
                    : '<div class="w-7 h-7 rounded-full bg-rose-900/30 flex items-center justify-center group-hover:bg-champagne/20 transition-all"><i class="fas fa-play text-[10px] text-rose-300 group-hover:text-champagne ml-0.5"></i></div>'
                }
                </div>
            `;

            item.addEventListener('click', () => {
                loadTrack(idx, true);
            });

            playlistContainer.appendChild(item);
        });
    }

    // Expose direct playback trigger
    window.playVoiceClipDirectly = function (idx) {
        loadTrack(idx, true);
        const cassettePlayer = document.getElementById('cassette-play-btn');
        if (cassettePlayer) {
            cassettePlayer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    loadTrack(0, false);
}

// Global Filter for Inside Jokes
window.filterJokes = function (category, tabBtn) {
    document.querySelectorAll('.joke-filter-tab').forEach(t => t.classList.remove('active'));
    if (tabBtn) tabBtn.classList.add('active');

    const cards = document.querySelectorAll('.tudi-joke-card');
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
            card.classList.remove('hidden-card');
        } else {
            card.classList.add('hidden-card');
        }
    });
};

// Global Celebrate Joke Interaction
window.celebrateJoke = function (type) {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 30,
            spread: 60,
            origin: { y: 0.75 },
            colors: ['#f4d06f', '#e7a393', '#ff3366', '#ffffff']
        });
    }
};

// --- 7. Act 4: Infinite Reels Gallery (Photos & Videos) ---
function initMediaGallery() {
    const galleryGrid = document.getElementById('media-gallery-grid');
    const filterTabs = document.querySelectorAll('.gallery-filter-tab');
    if (!galleryGrid) return;

    let currentFilter = 'all';

    // Combine all media
    const allItems = [
        ...coupleVideos.map(v => ({ ...v, type: 'video' })),
        ...couplePhotos.map(p => ({ ...p, type: 'photo' })),
        ...rubinaPortraits.map(r => ({ ...r, type: 'candid' }))
    ];

    function renderGallery() {
        galleryGrid.innerHTML = '';
        const filtered = allItems.filter(item => {
            if (currentFilter === 'all') return true;
            if (currentFilter === 'couple') return item.type === 'photo';
            if (currentFilter === 'video') return item.type === 'video';
            if (currentFilter === 'candid') return item.type === 'candid';
            return true;
        });

        filtered.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'group relative rounded-2xl overflow-hidden glass-panel border border-rose-900/40 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-champagne/60';

            if (item.type === 'video') {
                card.innerHTML = `
                    <div class="aspect-[4/5] bg-black/80 relative flex items-center justify-center overflow-hidden">
                        <video src="${item.src}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" muted loop onmouseover="this.play()" onmouseout="this.pause()"></video>
                        <div class="absolute inset-0 bg-gradient-to-t from-burgundy-dark via-transparent to-black/30"></div>
                        <div class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-950/80 text-champagne border border-champagne/40 backdrop-blur-md">
                            <i class="fas fa-video mr-1"></i> Reel
                        </div>
                        <div class="w-12 h-12 rounded-full bg-champagne text-burgundy-dark flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                            <i class="fas fa-play ml-1"></i>
                        </div>
                        <div class="absolute bottom-3 left-3 right-3">
                            <p class="text-sm font-semibold text-white drop-shadow">${item.title}</p>
                            <p class="text-xs text-rose-300 font-mono">Prakash & Rubina</p>
                        </div>
                    </div>
                `;
                card.addEventListener('click', () => openVideoModal(item.src, item.title));
            } else {
                card.innerHTML = `
                    <div class="aspect-[4/5] bg-burgundy-dark/50 relative overflow-hidden">
                        <img src="${item.src}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                        <div class="absolute inset-0 bg-gradient-to-t from-burgundy-dark via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                        <div class="absolute bottom-3 left-3 right-3">
                            <p class="text-sm font-semibold text-rose-100 drop-shadow">${item.title}</p>
                            <p class="text-xs text-champagne font-handwritten text-lg">${item.type === 'candid' ? 'Birthday Queen ✨' : 'Forever Moments 💕'}</p>
                        </div>
                    </div>
                `;
                card.addEventListener('click', () => openImageModal(item.src, item.title));
            }

            galleryGrid.appendChild(card);
        });
    }

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('bg-champagne', 'text-burgundy-dark', 'font-bold'));
            filterTabs.forEach(t => t.classList.add('text-rose-200', 'bg-[#3e0b14]/50'));

            tab.classList.remove('text-rose-200', 'bg-[#3e0b14]/50');
            tab.classList.add('bg-champagne', 'text-burgundy-dark', 'font-bold');

            currentFilter = tab.getAttribute('data-filter');
            renderGallery();
        });
    });

    renderGallery();
}

// Media Lightbox Modals
function openImageModal(src, title) {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalTitle = document.getElementById('lightbox-title');
    const modalVideo = document.getElementById('lightbox-video');

    if (!modal) return;
    modalVideo.style.display = 'none';
    modalVideo.pause();

    modalImg.style.display = 'block';
    modalImg.src = src;
    modalTitle.textContent = title;
    modal.classList.remove('hidden');
}

function openVideoModal(src, title) {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalTitle = document.getElementById('lightbox-title');
    const modalVideo = document.getElementById('lightbox-video');

    if (!modal) return;
    modalImg.style.display = 'none';

    modalVideo.style.display = 'block';
    modalVideo.src = src;
    modalTitle.textContent = title;
    modal.classList.remove('hidden');
    modalVideo.play();
}

function closeMediaModal() {
    const modal = document.getElementById('lightbox-modal');
    const modalVideo = document.getElementById('lightbox-video');
    if (modal) {
        modal.classList.add('hidden');
        if (modalVideo) modalVideo.pause();
    }
}

// --- 8. Act 5: Interactive Sealed 3D Letter ---
function initBirthdayLetter() {
    const envelope = document.getElementById('secret-envelope');
    const waxSeal = document.getElementById('wax-seal-btn');
    const openLetterModalBtn = document.getElementById('open-letter-fullscreen');
    const letterModal = document.getElementById('letter-fullscreen-modal');

    function toggleEnvelope() {
        if (!envelope) return;
        envelope.classList.toggle('open');
        triggerConfettiMini();
    }

    waxSeal?.addEventListener('click', toggleEnvelope);
    openLetterModalBtn?.addEventListener('click', () => {
        if (letterModal) letterModal.classList.remove('hidden');
        triggerConfettiExplosion();
    });
}

function closeLetterModal() {
    const letterModal = document.getElementById('letter-fullscreen-modal');
    if (letterModal) letterModal.classList.add('hidden');
}

// --- 9. Interactive Birthday Cake & Candles ---
function initBirthdayCake() {
    const blowBtn = document.getElementById('blow-candles-btn');
    const flames = document.querySelectorAll('.candle-flame');
    const wishModal = document.getElementById('birthday-wish-modal');
    let blownOut = false;

    function blowOutCandles() {
        if (blownOut) {
            // Re-light
            flames.forEach(f => f.classList.remove('blown-out'));
            blowBtn.innerHTML = '<i class="fas fa-wind mr-2"></i> Make a Wish & Blow Candles 🎂';
            blownOut = false;
        } else {
            flames.forEach(f => f.classList.add('blown-out'));
            blowBtn.innerHTML = '<i class="fas fa-fire mr-2"></i> Re-light Candles ✨';
            blownOut = true;

            // Trigger Fireworks celebration!
            triggerConfettiExplosion();

            setTimeout(() => {
                if (wishModal) wishModal.classList.remove('hidden');
            }, 800);
        }
    }

    blowBtn?.addEventListener('click', blowOutCandles);
    flames.forEach(flame => {
        flame.addEventListener('click', blowOutCandles);
    });
}

function closeWishModal() {
    const wishModal = document.getElementById('birthday-wish-modal');
    if (wishModal) wishModal.classList.add('hidden');
}

// --- 10. Love Compatibility Meter ---
function initLoveMeter() {
    const loveBar = document.getElementById('love-meter-bar');
    const loveVal = document.getElementById('love-meter-val');
    const pulseHeart = document.getElementById('love-pulse-heart');

    if (!loveBar) return;

    let score = 0;
    const targetScore = 1000;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            const interval = setInterval(() => {
                score += 25;
                if (score >= targetScore) {
                    score = targetScore;
                    clearInterval(interval);
                    triggerConfettiMini();
                }
                if (loveVal) loveVal.textContent = `${score}%`;
                if (loveBar) loveBar.style.width = '100%';
            }, 30);
            observer.disconnect();
        }
    }, { threshold: 0.5 });

    observer.observe(loveBar);

    pulseHeart?.addEventListener('click', () => {
        triggerConfettiMini();
    });
}

// --- 11. Confetti & Celebration Cannons ---
function setupCelebrationTriggers() {
    const celebrateBtns = document.querySelectorAll('.celebrate-btn-trigger');
    celebrateBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            triggerConfettiExplosion();
        });
    });
}

function triggerConfettiMini() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#f4d06f', '#e7a393', '#d84a68', '#fff']
        });
    }
}

function triggerConfettiExplosion() {
    if (typeof confetti === 'function') {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 }
        };

        function fire(particleRatio, opts) {
            confetti(Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio)
            }));
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
            colors: ['#f4d06f', '#fae8a8']
        });
        fire(0.2, {
            spread: 60,
            colors: ['#e7a393', '#ff9800']
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
            colors: ['#d84a68', '#b80c29']
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            colors: ['#ffffff', '#ffd285'],
            scalar: 1.2
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
            colors: ['#f4d06f', '#e7a393']
        });
    }
}

// --- 12. Scrapbook Stickers (Interactive Tap & Heart Burst) ---
function initScrapbookStickers() {
    const stickers = document.querySelectorAll('.scrapbook-sticker');
    const heartEmojis = ['💖', '✨', '🎂', '💕', '🌸', '🥰', '💫', '❤️'];

    stickers.forEach(sticker => {
        sticker.addEventListener('click', (e) => {
            // Trigger playful wobble animation
            sticker.classList.remove('wobble-active');
            void sticker.offsetWidth; // trigger DOM reflow
            sticker.classList.add('wobble-active');

            // Floating sparkles and romantic heart particles
            const rect = sticker.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            for (let i = 0; i < 4; i++) {
                const particle = document.createElement('div');
                particle.className = 'sticker-heart-particle';
                particle.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
                particle.style.left = `${centerX + (Math.random() * 30 - 15)}px`;
                particle.style.top = `${centerY + (Math.random() * 20 - 10)}px`;
                particle.style.setProperty('--tx', `${(Math.random() - 0.5) * 60}px`);
                document.body.appendChild(particle);

                setTimeout(() => {
                    particle.remove();
                }, 1100);
            }

            // Confetti mini burst on click
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 18,
                    spread: 50,
                    origin: {
                        x: centerX / window.innerWidth,
                        y: centerY / window.innerHeight
                    },
                    colors: ['#f4d06f', '#e7a393', '#ff85a2', '#ffffff']
                });
            }
        });
    });
}

