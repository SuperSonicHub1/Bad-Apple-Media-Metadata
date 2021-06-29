if ('mediaSession' in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: 'Bad Apple!!',
    album: 'Lovelight',
    artist: 'nomico'
  })
}

const video = document.getElementById("video")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')

function update() {
  if (video.paused || video.ended) return
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  navigator.mediaSession.metadata.artwork = [
    { src: canvas.toDataURL(), type: "image/png" }
  ]
  setTimeout(() => update(), 0)
}

video.addEventListener("play", () => update())
