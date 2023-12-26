const reg = require.context('@/assets/svg', false, /\.svg$/)
const requireAll = requireContext => {
  requireContext.keys().map(requireContext)
}
requireAll(reg)