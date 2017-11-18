export function videoFile (value, fm = '') {
  let origin = document.querySelector('#origin').value
  let videoDomain = document.querySelector('#video_domain').value
  let videoNoReferer = document.querySelector('#video_no_referer').value
  if (parseInt(origin) === 0) {
    return videoDomain + value + fm
  }
  return videoNoReferer + value + fm
}
