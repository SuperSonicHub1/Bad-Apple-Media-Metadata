if ('mediaSession' in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: 'Bad Apple!!',
    album: 'Lovelight',
    artist: 'nomico'
  })
}

/** @type {HTMLVideoElement} */
const video = document.getElementById("video")
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')

// Takes up the UI thread less, but it's more choppy
// video.addEventListener("timeupdate", () => {
// 	ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
// 	navigator.mediaSession.metadata.artwork = [
// 		{ src: canvas.toDataURL(), type: "image/png" }
// 	]
// })

function update() {
  if (video.paused || video.ended) return
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  navigator.mediaSession.metadata.artwork = [
    { src: canvas.toDataURL(), type: "image/png" }
  ]
  setTimeout(() => update(), 0)
}

video.addEventListener("play", () => update())
