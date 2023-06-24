import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Kratos base kit'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
