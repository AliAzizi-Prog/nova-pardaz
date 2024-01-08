// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'صفحه اصلی',
      path: '/home',
      icon: 'mdi:home-outline',
    },
    {
      title: 'محصولات',
      path: '/second-page',
      icon: 'mdi:email-outline',
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'محصولات اینستاگرام ',
      icon: 'mdi:shield-outline',
    }
  ]
}

export default navigation
