// 显示加载中进度条
export function showLoading ({ state, commit }) {
  commit('updateLoadingStatus', true)
}

// 隐藏加载中进度条
export function hideLoading ({ state, commit }) {
  commit('updateLoadingStatus', false)
}

// 设置页面标题与背景颜色
export function setTitleAndBgColor ({ state, commit }, pageTitleInfo) {
  commit('setTitleAndBgColorMutation', pageTitleInfo)
}
