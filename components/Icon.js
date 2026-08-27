/**
 * Icon 组件
 * 基于 @tabler/icons-react（已内置），替代 FontAwesome
 * 用法：<Icon name="search" className="w-4 h-4" />
 */
import dynamic from 'next/dynamic'

// 动态加载 Tabler 图标，避免打包不需要的图标
const IconSearch = dynamic(() => import('@tabler/icons-react').then(m => m.IconSearch))
const IconLoader = dynamic(() => import('@tabler/icons-react').then(m => m.IconLoader))
const IconEye = dynamic(() => import('@tabler/icons-react').then(m => m.IconEye))
const IconKey = dynamic(() => import('@tabler/icons-react').then(m => m.IconKey))
const IconChevronUp = dynamic(() => import('@tabler/icons-react').then(m => m.IconChevronUp))
const IconChevronDown = dynamic(() => import('@tabler/icons-react').then(m => m.IconChevronDown))
const IconPlus = dynamic(() => import('@tabler/icons-react').then(m => m.IconPlus))
const IconMail = dynamic(() => import('@tabler/icons-react').then(m => m.IconMail))
const IconFolder = dynamic(() => import('@tabler/icons-react').then(m => m.IconFolder))
const IconTag = dynamic(() => import('@tabler/icons-react').then(m => m.IconTag))
const IconArchive = dynamic(() => import('@tabler/icons-react').then(m => m.IconArchive))
const IconMenu2 = dynamic(() => import('@tabler/icons-react').then(m => m.IconMenu2))
const IconX = dynamic(() => import('@tabler/icons-react').then(m => m.IconX))
const IconBroadcast = dynamic(() => import('@tabler/icons-react').then(m => m.IconBroadcast))
const IconCopyright = dynamic(() => import('@tabler/icons-react').then(m => m.IconCopyright))
const IconFeather = dynamic(() => import('@tabler/icons-react').then(m => m.IconFeather))
const IconRobot = dynamic(() => import('@tabler/icons-react').then(m => m.IconRobot))
const IconExternalLink = dynamic(() => import('@tabler/icons-react').then(m => m.IconExternalLink))

// FontAwesome 名称 → Tabler 组件 映射表
const ICON_MAP = {
  // solid / regular 通用名称
  'search': IconSearch,
  'magnifying-glass': IconSearch,
  'loader': IconLoader,
  'spinner': IconLoader,
  'eye': IconEye,
  'eye-regular': IconEye,
  'key': IconKey,
  'angle-up': IconChevronUp,
  'chevron-up': IconChevronUp,
  'chevron-down': IconChevronDown,
  'angle-down': IconChevronDown,
  'plus': IconPlus,
  'envelope': IconMail,
  'envelope-regular': IconMail,
  'mail': IconMail,
  'folder': IconFolder,
  'folder-regular': IconFolder,
  'tag': IconTag,
  'archive': IconArchive,
  'bars': IconMenu2,
  'menu': IconMenu2,
  'times': IconX,
  'xmark': IconX,
  'close': IconX,
  'podcast': IconBroadcast,
  'broadcast': IconBroadcast,
  'copyright': IconCopyright,
  'copyright-regular': IconCopyright,
  'feather': IconFeather,
  'robot': IconRobot,
  'external-link': IconExternalLink,
  'external-link-alt': IconExternalLink,
  'link': IconExternalLink,
}

/**
 * @param {string} name FontAwesome 图标名（不含 fa-/fas-/far-/fab- 前缀）
 * @param {string} className CSS 类名，如 'w-4 h-4 text-red-500'
 */
export default function Icon({ name, className = 'w-4 h-4', ...rest }) {
  // 清理前缀
  const cleanName = (name || '')
    .replace(/^(fas|far|fab|fa|la)-/, '')
    .replace(/^fa-/, '')
    .replace(/^la-/, '')

  const Comp = ICON_MAP[cleanName]
  if (!Comp) {
    // 未映射的图标返回空 span（保持布局不坍塌）
    return <span className={className} {...rest} />
  }
  return <Comp className={className} {...rest} />
}
