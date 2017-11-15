// 显示加载中进度条
export function showLoading ({ state, commit }) {
  commit('updateLoadingStatus', true)
}

// 隐藏加载中进度条
export function hideLoading ({ state, commit }) {
  commit('updateLoadingStatus', false)
}
