export function imgFile (value, rule = '') {
  return document.getElementById('app').dataset.img_domain + value + rule
}
