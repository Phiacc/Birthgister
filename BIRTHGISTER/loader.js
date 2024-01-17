export function setupLoadingAnimation() {
    const lottieContainer = document.getElementById('lottieContainer');
    return bodymovin.loadAnimation({
        container: lottieContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'loading.json',
    });
}
