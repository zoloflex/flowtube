document.addEventListener('DOMContentLoaded', function () {
    const videoFrame = document.querySelector('.youtube-video iframe');
    const loadButton = document.getElementById('loadVideoBtn');
    const videoIdInput = document.getElementById('videoIdInput');
    const videoThumbnail = document.getElementById('videoThumbnail');
    const videoTitle = document.getElementById('videoTitle');

    const API_KEY = 'AIzaSyBR6c164WKdQrOBOfEdG6cKYALioYhnGbw'; // Replace with your actual API key

    videoIdInput.addEventListener('input', function () {
        const videoId = videoIdInput.value.trim();
        if (videoId.length >= 11) {
            // Show thumbnail
            videoThumbnail.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            videoThumbnail.style.display = 'block';

            // Fetch title using YouTube Data API
            fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    if (data.items && data.items.length > 0) {
                        videoTitle.textContent = data.items[0].snippet.title;
                    } else {
                        videoTitle.textContent = 'Video not found';
                    }
                })
                .catch(() => {
                    videoTitle.textContent = 'Error fetching video title';
                });
        } else {
            videoThumbnail.style.display = 'none';
            videoTitle.textContent = '';
        }
    });

    loadButton.addEventListener('click', function () {
        const newVideoId = videoIdInput.value.trim();
        if (newVideoId) {
            videoFrame.src = `https://www.youtube.com/embed/${newVideoId}`;
        } else {
            alert('Please enter a valid YouTube video ID.');
        }
    });
});