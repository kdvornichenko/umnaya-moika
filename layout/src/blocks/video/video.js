$.each('.video', btn => {
    const video = $.qs('video', btn);
    btn.addEventListener('click', () => {
        if (video.paused) {
            btn.classList.add('is-active');
            video.controls = true;
            video.play();
        }
    });

    video.addEventListener('ended', () => {
        video.controls = false;
        btn.classList.remove('is-active');
    });
});
