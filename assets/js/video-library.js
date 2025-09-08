document.addEventListener('DOMContentLoaded', () => {
    const videoGallery = document.querySelector('.video-gallery');

    if (videoGallery) {
        fetch('assets/videos/videos.json')
            .then(response => response.json())
            .then(videos => {
                videoGallery.innerHTML = ''; // Clear existing videos
                videos.forEach(videoFile => {
                    const videoName = videoFile.replace('_fixed.mp4', '').replace('.mp4', '');
                    const videoCard = document.createElement('div');
                    videoCard.classList.add('video-card');

                    videoCard.innerHTML = `
                        <h3>${videoName}</h3>
                        <video controls preload="metadata" width="640" height="360">
                            <source src="assets/videos/${videoFile}" type="video/mp4">
                            متصفحك لا يدعم تشغيل الفيديو.
                        </video>
                    `;

                    videoGallery.appendChild(videoCard);
                });
            })
            .catch(error => {
                console.error('Error loading video library:', error);
                videoGallery.innerHTML = '<p>حدث خطأ أثناء تحميل مكتبة الفيديو.</p>';
            });
    }
});
