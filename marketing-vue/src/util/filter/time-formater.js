export default {

  /**
   * 当前时间戳
   * @return {number}  unix时间戳(秒)
   */
  CurTime: function () {
    return Date.parse(new Date()) / 1000
  },
  /**
   * 日期 转换为 Unix时间戳
   * @param string
   * @return {number}  unix时间戳(秒)
   */
  DateToUnix: function (string) {
    let f = string.split(' ', 2)
    let d = (f[0] ? f[0] : '').split('-', 3)
    let t = (f[1] ? f[1] : '').split(':', 3)
    return (new Date(
      parseInt(d[0], 10) || null,
      (parseInt(d[1], 10) || 1) - 1,
      parseInt(d[2], 10) || null,
      parseInt(t[0], 10) || null,
      parseInt(t[1], 10) || null,
      parseInt(t[2], 10) || null
    )).getTime() / 1000
  },
  /**
   * 时间戳转换日期
   * @param {int} unixTime    待时间戳(秒)
   * @param {boolean} isFull    返回完整时间(Y-m-d 或者 Y-m-d H:i:s)
   * @param point
   * @param {int}  timeZone   时区
   * @return {string}
   */
  UnixToDate: function (unixTime, isFull, point = '-', timeZone) {
    if (typeof (timeZone) === 'number') {
      unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60
    }
    let time = new Date(unixTime * 1000)
    let ymdhis = ''
    let strMouth = time.getUTCMonth() + 1
    let strDay = time.getUTCDate()
    ymdhis += time.getUTCFullYear() + point
    ymdhis += (strMouth < 10 ? (0 + '' + strMouth) : strMouth) + point
    ymdhis += (strDay < 10 ? 0 + '' + strDay : strDay)
    if (isFull === true) {
      ymdhis += ' ' + time.getHours() + ':'

      ymdhis += (time.getUTCMinutes() >= 0 && time.getUTCMinutes() <= 9) ?
        '0' + time.getUTCMinutes() : time.getUTCMinutes()
    }
    return ymdhis
  },
  /**
   * 时间戳转换日期
   * @param {int} unixTime    待时间戳(秒)
   * @param {int}  timeZone   时区
   * @return {string}
   */
  UnixToDateMS: function (unixTime, timeZone) {
    if (typeof (timeZone) === 'number') {
      unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60
    }
    let time = new Date(unixTime * 1000)
    let ymdhis = ''

    ymdhis += time.getHours() + ':'

    ymdhis += (time.getUTCMinutes() >= 0 && time.getUTCMinutes() <= 9) ?
      '0' + time.getUTCMinutes() : time.getUTCMinutes()

    return ymdhis
  }
}
