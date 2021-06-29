# Bad Apple Media Metadata

[Bad Apple must be able to be play everywhere](https://en.wikipedia.org/wiki/Bad_Apple!!#Demoscene). This is my humble contribution.
[Try it on Replit](https://Bad-Apple-Media-Metadata.supersonichub1.repl.co).

## FAQ
### How is Bad Apple being played?
Staring on [January 30th, 2020](https://www.w3.org/TR/2020/WD-mediasession-20200130/), the Chromium project began to push for adoption of the [Media Session API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API) in web browsers, which allows a user to view rich metadata for the media they're playing in the browser (title, author, artwork) and interact with said media beyond a simple play/pause and stop (skip track, fast-forward, rewind). Wherever we can show images, we can show a series of them in quick succession, and wherever we can do that, we can play a video. Wherever we can play a video, we can play Bad Apple.

This site is composed of a simple HTML page, a JavaScript, and some barren CSS so that we don't have to scroll horizontally.

```js
function update() {
  if (video.paused || video.ended) return
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  navigator.mediaSession.metadata.artwork = [
    { src: canvas.toDataURL(), type: "image/png" }
  ]
  setTimeout(() => update(), 0)
}
```

A [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) element enables us to mirror our video with [`drawImage`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage), extract individual frames through [`toDataURL`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL), and then pass those frames to the Media Session API through [`MediaMetadata`](https://developer.mozilla.org/en-US/docs/Web/API/MediaMetadata). This all happens as quickly as the browser can handle with [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) so that we can stay in sync with the video, and only when the video is playing, so that we don't lock up your browser tab.

### How do I view it?
Open up the site, play the video, and get your operating system's virtual media controls to show up. 

On Windows 10, pressing your play/pause media key or volume buttons/knob should work; you can then hover your mouse over it to watch the video in full.

On recent versions of Android, simply pull down your notification shade and look for the media notification associated with your browser; you can watch Bad Apple from your lock screen as well!

On Chrome OS, go [here](https://support.google.com/chromebook/answer/183107?hl=en) and look under `Pause, play, or skip music with quick settings`.
> If you play a song from the web or from a music app, like YouTube Music, you can use quick settings to pause, play, or skip tracks.

> At the bottom right of your screen, select the time.

> From the menu, use the controls to pause, play, or skip tracks.

> Tip: To get quick access to controls, pin this feature. When pinned, to open controls, select the Music icon.

### I followed the instructions above and I don't see anything!
Make sure your browser supports the [Media Session API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API#browser_compatibility) (sorry, Safari users), and even then you still may need a Chromium-based browser for my trick to work. I tried getting this to work on my father's laptop with Firefox, and nothing showed up.

#### Confirmed Working On:
* Android 11 with Google Chrome
* Windows 10 with Google Chrome
* Windows 10 with Microsoft Edge
* Chrome OS 91 with Google Chrome

## Deployment
```bash
# Download a copy to the Bad Apple music video and name it bad-apple.mp4
curl -L -o bad-apple.mp4 'https://alltubedownload.net/download?url=FtutLA63Cp8'
youtube-dl -o bad-apple.mp4 'https://www.youtube.com/watch?v=FtutLA63Cp8'

# Start up a HTTP server
python3 -m http.server
```