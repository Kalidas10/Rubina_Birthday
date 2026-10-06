/**
 * ==========================================================================
 * RUBINA 18TH BIRTHDAY MIDNIGHT EXPERIENCE — ISOLATED JAVASCRIPT
 * Strictly namespaced under rbx* to avoid conflicts with existing website.
 * ==========================================================================
 */

(function () {
    'use strict';

    // Global Namespace Object
    window.rbxBirthdayIntro = {
        isUnlocked: false,
        isCurtainOpen: false,
        isComplete: false,
        countdownTimer: null,
        targetDate: null,
        elements: {}
    };

    const rbx = window.rbxBirthdayIntro;

    // Cache DOM Elements safely
    function rbxCacheElements() {
        rbx.elements = {
            overlay: document.getElementById('rubina-birthday-overlay'),
            stage: document.getElementById('rbx-curtains-stage'),
            curtainLeft: document.getElementById('rbx-curtain-left'),
            curtainRight: document.getElementById('rbx-curtain-right'),
            centerContent: document.getElementById('rbx-center-content'),
            countdownGrid: document.getElementById('rbx-countdown-grid'),
            unlockSection: document.getElementById('rbx-unlock-section'),
            openSurpriseBtn: document.getElementById('rbx-open-surprise-btn'),

            // Digits
            daysEl: document.getElementById('rbx-cd-days'),
            hoursEl: document.getElementById('rbx-cd-hours'),
            minsEl: document.getElementById('rbx-cd-mins'),
            secsEl: document.getElementById('rbx-cd-secs'),
            secsCard: document.getElementById('rbx-secs-card'),

            // Phase 4: Birthday Popup
            popupModal: document.getElementById('rbx-birthday-popup-modal'),
            continueToVideoBtn: document.getElementById('rbx-continue-to-video-btn'),
            skipToSiteFromPopup: document.getElementById('rbx-skip-from-popup-btn'),

            // Phase 5: Video Theater
            videoTheater: document.getElementById('rbx-video-theater'),
            videoEl: document.getElementById('rbx-birthday-video'),
            playOverlay: document.getElementById('rbx-video-play-overlay'),
            playVideoBtn: document.getElementById('rbx-play-video-btn'),
            skipVideoBtn: document.getElementById('rbx-skip-video-btn'),
            fallbackCard: document.getElementById('rbx-video-fallback-card'),
            fallbackContinueBtn: document.getElementById('rbx-fallback-continue-btn'),
            videoFilePicker: document.getElementById('rbx-video-file-picker'),
            replayBirthdayVideoBtn: document.getElementById('replay-birthday-video-btn'),
            endBanner: document.getElementById('rbx-video-end-banner'),

            // Bollywood 5-Second Heartbeat Countdown
            bwCountdown: document.getElementById('rbx-bollywood-countdown'),
            bwHeartStage: document.getElementById('rbx-bw-heart-stage'),
            bwCountNum: document.getElementById('rbx-bw-count-num'),
            bwTagline: document.getElementById('rbx-bw-tagline'),
            bwSkipBtn: document.getElementById('rbx-skip-countdown-btn'),

            // Dev preview
            devPreviewUnlockBtn: document.getElementById('rbx-dev-preview-unlock'),
            devPreviewVideoBtn: document.getElementById('rbx-dev-preview-video')
        };
    }

    // Determine Target Date (October 7th, 00:00:00 local time)
    function rbxGetTargetDate() {
        const now = new Date();
        const year = now.getFullYear();
        // Month index 9 is October (0 = Jan, 9 = Oct)
        return new Date(year, 9, 7, 0, 0, 0);
    }

    // Initialize Countdown and State Check
    function rbxInitCountdown() {
        rbx.targetDate = rbxGetTargetDate();

        // Check if URL has ?preview=unlock or ?test=video
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('preview') || urlParams.has('test')) {
            const mode = urlParams.get('preview') || urlParams.get('test');
            if (mode === 'video') {
                rbxFastForwardToVideo();
                return;
            }
            rbxTriggerUnlockState(true);
            return;
        }

        const now = new Date();
        if (now.getTime() >= rbx.targetDate.getTime()) {
            // Already at or past October 7 midnight!
            rbxTriggerUnlockState(false);
            return;
        }

        // Run initial tick
        rbxTickCountdown();
        // Start 1-second interval
        rbx.countdownTimer = setInterval(rbxTickCountdown, 1000);
    }

    // Countdown Tick Handler
    function rbxTickCountdown() {
        const now = new Date();
        const diff = rbx.targetDate.getTime() - now.getTime();

        if (diff <= 0) {
            // Reached exactly midnight!
            if (rbx.countdownTimer) {
                clearInterval(rbx.countdownTimer);
                rbx.countdownTimer = null;
            }
            rbxTriggerUnlockState(true);
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        if (rbx.elements.daysEl) rbx.elements.daysEl.textContent = String(d).padStart(2, '0');
        if (rbx.elements.hoursEl) rbx.elements.hoursEl.textContent = String(h).padStart(2, '0');
        if (rbx.elements.minsEl) rbx.elements.minsEl.textContent = String(m).padStart(2, '0');
        if (rbx.elements.secsEl) rbx.elements.secsEl.textContent = String(s).padStart(2, '0');

        // Subtle visual tick pulse on seconds card
        if (rbx.elements.secsCard) {
            rbx.elements.secsCard.classList.remove('rbx-tick-pulse');
            void rbx.elements.secsCard.offsetWidth; // Force reflow
            rbx.elements.secsCard.classList.add('rbx-tick-pulse');
        }
    }

    // Phase 2: Midnight Unlock State
    function rbxTriggerUnlockState(withCelebration) {
        rbx.isUnlocked = true;
        if (rbx.countdownTimer) {
            clearInterval(rbx.countdownTimer);
            rbx.countdownTimer = null;
        }

        if (rbx.elements.countdownGrid) {
            rbx.elements.countdownGrid.style.display = 'none';
        }

        const clockStatus = document.getElementById('rbx-clock-status-box');
        if (clockStatus) {
            clockStatus.style.display = 'none';
        }

        const subTitle = document.getElementById('rbx-stage-subtitle');
        if (subTitle) {
            subTitle.style.display = 'none';
        }

        if (rbx.elements.unlockSection) {
            rbx.elements.unlockSection.classList.add('rbx-active');
        }

        if (withCelebration && typeof window.confetti === 'function') {
            try {
                window.confetti({
                    particleCount: 40,
                    spread: 60,
                    origin: { y: 0.6 },
                    colors: ['#f4d06f', '#e7a393', '#d4af37']
                });
            } catch (e) {
                // confetti optional
            }
        }
    }

    // Phase 3: Curtain Opening Animation
    function rbxOpenCurtains() {
        if (rbx.isCurtainOpen) return;
        rbx.isCurtainOpen = true;

        // Fade out center countdown/unlock message
        if (rbx.elements.centerContent) {
            rbx.elements.centerContent.classList.add('rbx-fade-out');
        }

        // Open curtains
        if (rbx.elements.stage) {
            rbx.elements.stage.classList.add('rbx-curtains-opened');
        }

        // Wait for curtain animation (2.2 seconds) to complete before showing popup
        setTimeout(function () {
            rbxShowBirthdayPopup();
        }, 2200);
    }

    // Phase 4: Happy Birthday Popup Modal
    function rbxShowBirthdayPopup() {
        if (rbx.elements.popupModal) {
            rbx.elements.popupModal.classList.add('rbx-show');
        }

        // Soft celebratory confetti burst
        if (typeof window.confetti === 'function') {
            try {
                window.confetti({
                    particleCount: 50,
                    spread: 80,
                    origin: { y: 0.5 },
                    colors: ['#f4d06f', '#e7a393', '#ffb347']
                });
            } catch (e) { }
        }
    }

    function rbxDismissBirthdayPopup(proceedToVideo) {
        if (rbx.elements.popupModal) {
            rbx.elements.popupModal.classList.remove('rbx-show');
        }

        if (proceedToVideo) {
            setTimeout(function () {
                rbxStartBirthdayVideo();
            }, 400);
        } else {
            rbxRevealOriginalWebsite();
        }
    }

    // Background Audio Ducking Controller (Volume down during video, auto increase when finished)
    const RBX_NORMAL_BG_VOLUME = 0.55;
    const RBX_DUCKED_BG_VOLUME = 0.08;
    let rbxVolumeFadeInterval = null;

    function rbxGetBgAudio() {
        try {
            if (typeof bgAudio !== 'undefined' && bgAudio && typeof bgAudio.volume !== 'undefined') {
                return bgAudio;
            }
        } catch (e) { }
        try {
            if (typeof window.bgAudio !== 'undefined' && window.bgAudio && typeof window.bgAudio.volume !== 'undefined') {
                return window.bgAudio;
            }
        } catch (e) { }
        return null;
    }

    // Smoothly fade background audio volume up or down
    function rbxFadeBgAudioVolume(targetVolume, durationMs) {
        const audio = rbxGetBgAudio();
        if (!audio) return;

        if (rbxVolumeFadeInterval) {
            clearInterval(rbxVolumeFadeInterval);
            rbxVolumeFadeInterval = null;
        }

        const startVolume = audio.volume;
        const diff = targetVolume - startVolume;
        if (Math.abs(diff) < 0.01) {
            audio.volume = targetVolume;
            return;
        }

        const steps = 20;
        const stepTime = (durationMs || 600) / steps;
        let currentStep = 0;

        rbxVolumeFadeInterval = setInterval(function () {
            currentStep++;
            const progress = currentStep / steps;
            const newVol = startVolume + diff * progress;
            audio.volume = Math.max(0, Math.min(1, newVol));

            if (currentStep >= steps) {
                audio.volume = targetVolume;
                clearInterval(rbxVolumeFadeInterval);
                rbxVolumeFadeInterval = null;
            }
        }, stepTime);
    }

    // Lower background music volume while video plays
    function rbxDuckBgAudio() {
        console.info('[Rubina Birthday Intro] Ducking background song volume for video playback.');
        rbxFadeBgAudioVolume(RBX_DUCKED_BG_VOLUME, 600);
    }

    // Automatically increase background music volume back to normal level when video finishes
    function rbxRestoreBgAudio() {
        console.info('[Rubina Birthday Intro] Restoring background song volume to normal level.');
        rbxFadeBgAudioVolume(RBX_NORMAL_BG_VOLUME, 1000);

        // Synchronize on-page navbar volume slider if present
        const navVolume = document.getElementById('nav-volume-slider');
        if (navVolume) {
            navVolume.value = RBX_NORMAL_BG_VOLUME;
        }
    }

    // ==========================================================================
    // BOLLYWOOD HEARTBEAT COUNTDOWN PRELUDE (5 SECONDS)
    // ==========================================================================
    const RBX_BOLLYWOOD_TAGLINES = {
        5: "\"Dil ki dhadkan tez ho rahi hai...\" ✨",
        4: "\"A love written in the stars...\" 🌹",
        3: "\"Har saans mein tera hi naam...\" 💖",
        2: "\"Rubina, hold your breath...\" 👑",
        1: "\"Here comes the magic! ❤️\" 🎬"
    };

    let rbxCountdownTimer = null;
    let rbxIsCountdownRunning = false;
    let rbxAudioCtx = null;

    // Web Audio Synthesizer for physical cardiac double-thump sound (lub-dub)
    function rbxGetAudioContext() {
        if (!rbxAudioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                rbxAudioCtx = new AudioContextClass();
            }
        }
        if (rbxAudioCtx && rbxAudioCtx.state === 'suspended') {
            rbxAudioCtx.resume().catch(function () { });
        }
        return rbxAudioCtx;
    }

    function rbxPlayHeartbeatSound() {
        try {
            const ctx = rbxGetAudioContext();
            if (!ctx) return;
            const t = ctx.currentTime;
            // 1st cardiac beat: "lub" (rich 68Hz down to 34Hz)
            rbxCreateCardiacThump(ctx, t, 68, 34, 0.45, 0.15);
            // 2nd cardiac beat: "dub" (56Hz down to 30Hz, 130ms later)
            rbxCreateCardiacThump(ctx, t + 0.13, 56, 30, 0.35, 0.13);
        } catch (e) { }
    }

    function rbxCreateCardiacThump(ctx, startTime, startFreq, endFreq, maxGain, duration) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(startFreq, startTime);
        osc.frequency.exponentialRampToValueAtTime(endFreq, startTime + duration);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(140, startTime);
        filter.frequency.exponentialRampToValueAtTime(60, startTime + duration);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(maxGain, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.02);
    }

    // Celebratory chime when countdown reaches 0 / video begins
    function rbxPlayChimeSound() {
        try {
            const ctx = rbxGetAudioContext();
            if (!ctx) return;
            const t = ctx.currentTime;
            [523.25, 659.25, 783.99, 1046.50].forEach(function (freq, i) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, t + i * 0.05);
                gain.gain.setValueAtTime(0.12, t + i * 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.05 + 0.5);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(t + i * 0.05);
                osc.stop(t + i * 0.05 + 0.55);
            });
        } catch (e) { }
    }

    // Trigger visual pulse & audio for each countdown second
    function rbxTriggerHeartbeatPulse(countNum) {
        rbxPlayHeartbeatSound();

        if (rbx.elements.bwHeartStage) {
            rbx.elements.bwHeartStage.classList.remove('rbx-thump');
            void rbx.elements.bwHeartStage.offsetWidth; // Force reflow
            rbx.elements.bwHeartStage.classList.add('rbx-thump');
        }

        if (rbx.elements.bwCountNum) {
            rbx.elements.bwCountNum.textContent = countNum;
            rbx.elements.bwCountNum.classList.remove('rbx-num-pop');
            void rbx.elements.bwCountNum.offsetWidth;
            rbx.elements.bwCountNum.classList.add('rbx-num-pop');
        }

        if (rbx.elements.bwTagline && RBX_BOLLYWOOD_TAGLINES[countNum]) {
            rbx.elements.bwTagline.textContent = RBX_BOLLYWOOD_TAGLINES[countNum];
            rbx.elements.bwTagline.classList.remove('rbx-fade-in');
            void rbx.elements.bwTagline.offsetWidth;
            rbx.elements.bwTagline.classList.add('rbx-fade-in');
        }
    }

    function rbxStartBollywoodCountdown(onComplete) {
        if (!rbx.elements.bwCountdown) {
            if (typeof onComplete === 'function') onComplete();
            return;
        }

        rbx.elements.bwCountdown.classList.add('rbx-show');
        rbxIsCountdownRunning = true;

        let currentCount = 5;
        rbxTriggerHeartbeatPulse(currentCount);

        if (rbxCountdownTimer) {
            clearInterval(rbxCountdownTimer);
            rbxCountdownTimer = null;
        }

        rbxCountdownTimer = setInterval(function () {
            currentCount--;
            if (currentCount >= 1) {
                rbxTriggerHeartbeatPulse(currentCount);
            } else {
                clearInterval(rbxCountdownTimer);
                rbxCountdownTimer = null;
                rbxPlayChimeSound();
                rbxDismissBollywoodCountdown(onComplete);
            }
        }, 1000);
    }

    function rbxDismissBollywoodCountdown(onComplete) {
        if (rbxCountdownTimer) {
            clearInterval(rbxCountdownTimer);
            rbxCountdownTimer = null;
        }
        rbxIsCountdownRunning = false;

        if (rbx.elements.bwCountdown) {
            rbx.elements.bwCountdown.classList.remove('rbx-show');
        }

        if (typeof onComplete === 'function') {
            onComplete();
        }
    }

    // Phase 5: Birthday Video Presentation Entrypoint
    function rbxStartBirthdayVideo(skipCountdown) {
        if (!rbx.elements.videoTheater) {
            rbxRevealOriginalWebsite();
            return;
        }

        // Lower background song volume for video
        rbxDuckBgAudio();

        rbx.elements.videoTheater.classList.add('rbx-show');

        // Warm up and preload video immediately in background
        const video = rbx.elements.videoEl;
        if (video) {
            if (!video.src || video.src.indexOf('.mp4') === -1) {
                video.src = 'assets/videos/rubybirthday.mp4';
            }
            try {
                video.load();
            } catch (e) { }
        }

        // Reset display states
        if (rbx.elements.fallbackCard) rbx.elements.fallbackCard.classList.remove('rbx-show');
        if (rbx.elements.playOverlay) rbx.elements.playOverlay.classList.remove('rbx-show');
        if (rbx.elements.endBanner) rbx.elements.endBanner.classList.remove('rbx-show');

        if (!skipCountdown && rbx.elements.bwCountdown) {
            // Run 5-second Bollywood heartbeat countdown before video begins
            rbxStartBollywoodCountdown(function () {
                rbxPlayActualVideo();
            });
        } else {
            rbxPlayActualVideo();
        }
    }

    // Play actual video after countdown finishes or is skipped
    function rbxPlayActualVideo() {
        const video = rbx.elements.videoEl;
        if (!video) {
            rbxShowVideoFallback();
            return;
        }

        // Reset display states
        if (rbx.elements.fallbackCard) rbx.elements.fallbackCard.classList.remove('rbx-show');
        if (rbx.elements.playOverlay) rbx.elements.playOverlay.classList.remove('rbx-show');
        if (rbx.elements.endBanner) rbx.elements.endBanner.classList.remove('rbx-show');

        // Ensure primary video source is set
        if (!video.src || video.src.indexOf('.mp4') === -1) {
            video.src = 'assets/videos/rubybirthday.mp4';
        }

        let isVideoReady = false;

        function markVideoReady() {
            isVideoReady = true;
            if (rbx.elements.fallbackCard) rbx.elements.fallbackCard.classList.remove('rbx-show');
        }

        video.addEventListener('loadeddata', markVideoReady, { once: true });
        video.addEventListener('canplay', markVideoReady, { once: true });
        video.addEventListener('playing', markVideoReady, { once: true });

        // Ensure background audio ducks whenever video plays
        video.addEventListener('play', function () {
            rbxDuckBgAudio();
        });

        // Smart cascading error recovery
        video.onerror = function () {
            console.warn('[Rubina Birthday Intro] Primary source notice. Checking fallback options...');
            if (!video.dataset.fallbackLevel) {
                video.dataset.fallbackLevel = '1';
                video.src = 'assets/videos/rubybithday.mp4';
                video.load();
                video.play().catch(function () {
                    if (rbx.elements.playOverlay) rbx.elements.playOverlay.classList.add('rbx-show');
                });
                return;
            }
            if (video.dataset.fallbackLevel === '1') {
                video.dataset.fallbackLevel = '2';
                video.src = 'assets/birthday/rubybirthday.mp4';
                video.load();
                video.play().catch(function () {
                    if (rbx.elements.playOverlay) rbx.elements.playOverlay.classList.add('rbx-show');
                });
                return;
            }
            rbxShowVideoFallback();
        };

        // Attempt playback
        try {
            video.load();
        } catch (e) { }

        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then(function () {
                // Autoplay started successfully
                isVideoReady = true;
                rbxDuckBgAudio();
            }).catch(function (error) {
                // Autoplay blocked by browser policy (e.g. unmuted audio restriction)
                // Show friendly interactive play button overlay
                console.info('[Rubina Birthday Intro] Autoplay blocked, awaiting user tap.', error);
                if (rbx.elements.playOverlay && (!rbx.elements.fallbackCard || !rbx.elements.fallbackCard.classList.contains('rbx-show'))) {
                    rbx.elements.playOverlay.classList.add('rbx-show');
                }
            });
        }

        // Handle natural video completion: automatically restore background volume and reveal site
        video.onended = function () {
            rbxRestoreBgAudio();
            if (rbx.elements.endBanner) {
                rbx.elements.endBanner.classList.add('rbx-show');
            }
            setTimeout(function () {
                rbxRevealOriginalWebsite();
            }, 1800);
        };
    }

    // User clicked Play on video overlay
    function rbxUserPlayVideo() {
        const video = rbx.elements.videoEl;
        if (video) {
            video.play().then(function () {
                rbxDuckBgAudio();
                if (rbx.elements.playOverlay) {
                    rbx.elements.playOverlay.classList.remove('rbx-show');
                }
            }).catch(function (err) {
                console.warn('[Rubina Birthday Intro] Video play error:', err);
                rbxShowVideoFallback();
            });
        }
    }

    // Fail-safe notice if video path blocked or not found
    function rbxShowVideoFallback() {
        rbxRestoreBgAudio();
        if (rbx.elements.playOverlay) {
            rbx.elements.playOverlay.classList.remove('rbx-show');
        }
        if (rbx.elements.fallbackCard) {
            rbx.elements.fallbackCard.classList.add('rbx-show');
        }
    }

    // Skip video button: immediately restore volume and reveal site
    function rbxSkipVideo() {
        rbxDismissBollywoodCountdown();
        rbxRestoreBgAudio();
        const video = rbx.elements.videoEl;
        if (video) {
            try {
                video.pause();
            } catch (e) { }
        }
        rbxRevealOriginalWebsite();
    }

    // Phase 6: Reveal Original Website
    function rbxRevealOriginalWebsite() {
        if (rbx.isComplete) return;
        rbx.isComplete = true;

        // Restore background audio volume to normal level
        rbxRestoreBgAudio();

        // Clean up video playback
        if (rbx.elements.videoEl) {
            try {
                rbx.elements.videoEl.pause();
                rbx.elements.videoEl.currentTime = 0;
            } catch (e) { }
        }

        // Hide video theater dialog
        if (rbx.elements.videoTheater) {
            rbx.elements.videoTheater.classList.remove('rbx-show');
        }

        // Smooth cinematic fade out of intro overlay (1.0s)
        if (rbx.elements.overlay) {
            rbx.elements.overlay.classList.add('rbx-hidden');
            setTimeout(function () {
                rbx.elements.overlay.style.display = 'none';
            }, 1100);
        }
    }

    // Fast-Forward helper for preview testing
    function rbxFastForwardToVideo() {
        rbx.isUnlocked = true;
        rbx.isCurtainOpen = true;
        if (rbx.elements.stage) {
            rbx.elements.stage.classList.add('rbx-curtains-opened');
        }
        if (rbx.elements.centerContent) {
            rbx.elements.centerContent.style.display = 'none';
        }
        if (rbx.elements.popupModal) {
            rbx.elements.popupModal.classList.remove('rbx-show');
        }
        rbxStartBirthdayVideo();
    }

    // Attach Event Listeners
    function rbxAttachListeners() {
        // "Open Surprise" Click
        if (rbx.elements.openSurpriseBtn) {
            rbx.elements.openSurpriseBtn.addEventListener('click', rbxOpenCurtains);
        }

        // Clicking the curtain stage directly after unlock opens curtains
        if (rbx.elements.stage) {
            rbx.elements.stage.addEventListener('click', function (e) {
                if (rbx.isUnlocked && !rbx.isCurtainOpen) {
                    rbxOpenCurtains();
                }
            });
        }

        // Phase 4: Popup buttons
        if (rbx.elements.continueToVideoBtn) {
            rbx.elements.continueToVideoBtn.addEventListener('click', function () {
                rbxDismissBirthdayPopup(true);
            });
        }

        if (rbx.elements.skipToSiteFromPopup) {
            rbx.elements.skipToSiteFromPopup.addEventListener('click', function () {
                rbxDismissBirthdayPopup(false);
            });
        }

        // Phase 5: Video controls
        if (rbx.elements.playVideoBtn) {
            rbx.elements.playVideoBtn.addEventListener('click', rbxUserPlayVideo);
        }

        if (rbx.elements.skipVideoBtn) {
            rbx.elements.skipVideoBtn.addEventListener('click', rbxSkipVideo);
        }

        // Bollywood Countdown Skip Button
        if (rbx.elements.bwSkipBtn) {
            rbx.elements.bwSkipBtn.addEventListener('click', function () {
                rbxDismissBollywoodCountdown(function () {
                    rbxPlayActualVideo();
                });
            });
        }

        if (rbx.elements.fallbackContinueBtn) {
            rbx.elements.fallbackContinueBtn.addEventListener('click', rbxRevealOriginalWebsite);
        }

        // Optional local video file selector fallback
        if (rbx.elements.videoFilePicker) {
            rbx.elements.videoFilePicker.addEventListener('change', function (e) {
                const file = e.target.files && e.target.files[0];
                if (file && rbx.elements.videoEl) {
                    try {
                        const blobUrl = URL.createObjectURL(file);
                        rbx.elements.videoEl.src = blobUrl;
                        if (rbx.elements.fallbackCard) rbx.elements.fallbackCard.classList.remove('rbx-show');
                        if (rbx.elements.playOverlay) rbx.elements.playOverlay.classList.remove('rbx-show');
                        rbxDuckBgAudio();
                        rbx.elements.videoEl.play().catch(function (err) {
                            console.warn('Playback error after file pick:', err);
                        });
                    } catch (err) {
                        console.error('Error loading selected video file:', err);
                    }
                }
            });
        }

        // Replay video button on main page
        if (rbx.elements.replayBirthdayVideoBtn) {
            rbx.elements.replayBirthdayVideoBtn.addEventListener('click', function () {
                rbx.replayVideo();
            });
        }

        // Maintain ducked volume if background song begins playing while video is open
        const mainAudio = rbxGetBgAudio();
        if (mainAudio) {
            mainAudio.addEventListener('play', function () {
                const vid = rbx.elements.videoEl;
                if (vid && !vid.paused && !vid.ended && rbx.elements.videoTheater && rbx.elements.videoTheater.classList.contains('rbx-show')) {
                    mainAudio.volume = RBX_DUCKED_BG_VOLUME;
                }
            });
        }

        // Dev Preview Buttons
        if (rbx.elements.devPreviewUnlockBtn) {
            rbx.elements.devPreviewUnlockBtn.addEventListener('click', function () {
                rbxTriggerUnlockState(true);
            });
        }

        if (rbx.elements.devPreviewVideoBtn) {
            rbx.elements.devPreviewVideoBtn.addEventListener('click', function () {
                rbxFastForwardToVideo();
            });
        }
    }

    // Public Replay Method (can be called anytime from the website)
    rbx.replayVideo = function () {
        if (!rbx.elements.videoTheater) return;
        if (rbx.elements.overlay) {
            rbx.elements.overlay.style.display = 'block';
            rbx.elements.overlay.classList.remove('rbx-hidden');
        }
        rbx.isComplete = false;
        rbxFastForwardToVideo();
    };

    // Boot on DOM Ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            rbxCacheElements();
            rbxAttachListeners();
            rbxInitCountdown();
        });
    } else {
        rbxCacheElements();
        rbxAttachListeners();
        rbxInitCountdown();
    }

})();
