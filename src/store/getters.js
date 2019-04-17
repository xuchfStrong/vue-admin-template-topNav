const getters = {
  sidebar: state => state.app.sidebar,
  navMenu: state => state.app.navMenu,
  isDashboard: state => state.app.isDashboard,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles
}
export default getters
