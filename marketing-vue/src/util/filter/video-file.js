export function videoFile (value, fm = '') {
  let origin = document.querySelector('#origin').value
  let video_domain = document.querySelector('#video_domain').value
  let video_no_referer = document.querySelector('#video_no_referer').value
  if (parseInt(origin) === 0) {
    return video_domain + value + fm
  }
  return video_no_referer + value + fm
}
