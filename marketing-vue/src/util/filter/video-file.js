export function videoFile (value, fm = '') {
  let temp = document.getElementById('app').dataset
  if (parseInt(temp.origin) === 0) {
    return temp['video_domain'] + value + fm
  }
  return temp['video_no_referer'] + value + fm
}
