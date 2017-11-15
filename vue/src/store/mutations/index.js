export default {
  updateLoadingStatus (state, status) {
    clearTimeout(state.loadingTimer)
    state.loadingTimer = setTimeout(() => {
      state.isLoading = status
    }, 200)
  },
  setTitleAndBgColorMutation (state, pageTitleInfo) {
    window.StatusBar && window.StatusBar.backgroundColorByHexString(pageTitleInfo.bgColor)
    state.pageTitleInfo.pageTitle = pageTitleInfo.pageTitle
    state.pageTitleInfo.bgColor = pageTitleInfo.bgColor
  }
}
