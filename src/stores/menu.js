const menu = {
  isCollapse: false,
  selectMenu: []
}

const menuActions = {
  collapseMenu (menu) {
    menu.isCollapse = !menu.isCollapse
  }
}

export default {
  menu,
  menuActions
}