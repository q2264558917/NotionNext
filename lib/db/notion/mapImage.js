import BLOG from '@/blog.config'
import { siteConfig } from '../../config'

/**
 * 图片映射
 *
 * @param {*} img 图片地址，可能是相对路径，可能是外链
 * @param {*} block 数据块，可能是单个内容块，可能是Page
 * @param {*} type block 单个内容块 ； collection 集合列表
 * @param {*} from 来自
 * @returns
 */
const mapImgUrl = (img, block, type = 'block', needCompress = true) => {
  if (!img) {
    return null
  }

  let ret = null
  // 相对目录，则视为notion的自带图片
  if (img.startsWith('/')) {
    ret = BLOG.NOTION_HOST + img
  } else {
    ret = img
  }

  const hasConverted =
     ret.indexOf('https://www.notion.so/image') === 0 ||
     ret.includes('notion.site/images/page-cover/')

  // 需要转化的URL ; 识别aws图床地址，或者bookmark类型的外链图片
  // Notion新图床资源 格式为 attachment:${id}:${name}
  const needConvert =
    !hasConverted &&
    (block.type === 'bookmark' ||
      ret.includes('secure.notion-static.com') ||
      ret.includes('prod-files-secure')) ||
      ret.indexOf('attachment')===0


  // Notion旧图床
  if (needConvert) {
    ret =
      BLOG.NOTION_HOST +
      '/image/' +
      encodeURIComponent(ret) +
      '?table=' +
      type +
      '&id=' +
      block.id
  }

  if (!isEmoji(ret) && ret.indexOf('notion.so/images/page-cover') < 0) {
    if (BLOG.RANDOM_IMAGE_URL) {
      // 只有配置了随机图片接口，才会替换图片
      const texts = BLOG.RANDOM_IMAGE_REPLACE_TEXT
      let isReplace = false
      if (texts) {
        const textArr = texts.split(',')
        // 判断是否包含替换的文本
        textArr.forEach(text => {
          if (ret.indexOf(text) > -1) {
            isReplace = true
          }
        })
      } else {
        isReplace = true
      }
      if (isReplace) {
        ret = BLOG.RANDOM_IMAGE_URL
      }
    }

    // 图片url优化，确保每一篇文章的图片url唯一
    if (
      ret &&
      ret.length > 4 &&
      !ret.includes('https://www.notion.so/images/')
    ) {
      // 图片接口拼接唯一识别参数，防止请求的图片被缓，而导致随机结果相同
      const separator = ret.includes('?') ? '&' : '?'
      ret = `${ret.trim()}${separator}t=${block.id}`
    }
  }

  // 统一压缩图片
  if (needCompress) {
    const width = block?.format?.block_width
    ret = compressImage(ret, width)
  }

  return ret
}

/**
 * 是否是emoji图标
 * @param {*} str
 * @returns
 */
function isEmoji(str) {
  const emojiRegex =
    /[\u{1F300}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}\u{238C}\u{2B06}\u{2B07}\u{2B05}\u{27A1}\u{2194}-\u{2199}\u{2194}\u{21A9}\u{21AA}\u{2934}\u{2935}\u{25AA}\u{25AB}\u{25FE}\u{25FD}\u{25FB}\u{25FC}\u{25B6}\u{25C0}\u{1F200}-\u{1F251}]/u
  return emojiRegex.test(str)
}

/**
 * 压缩图片
 * 1. Notion图床可以通过指定url-query参数来压缩裁剪图片 例如 ?xx=xx&width=400
 * 2. UnPlash 图片可以通过api q=50 控制压缩质量 width=400 控制图片尺寸
 * @param {*} image
 */
const compressImage = (image, width, quality = 80, fmt = 'webp') => {
  if (!image || image.indexOf('http') !== 0) {
    return image
  }

  if (image.includes(".svg")) return image

  if (!width || width === 0) {
    width = siteConfig('IMAGE_COMPRESS_WIDTH')
  }

  // ✅ 核心优化：把 Notion 图片 URL 包一层 Vercel 的 /_next/image 代理
  // 好处：1. 浏览器不再直连 notion.so（国内被墙/超慢），全部走 Vercel CDN
  //       2. Vercel 自动转 webp/avif（每张图从几百KB 压到 20-50KB）
  //       3. 第一次请求由 Vercel 从 Notion 拉取，后续全部 CDN 缓存秒出
  const isNotionImage =
    image.indexOf('notion.so/image') > -1 ||
    image.indexOf('notion.site/image') > -1 ||
    image.indexOf('notion.so/images/page-cover') > -1 ||
    image.indexOf('notion.site/images/page-cover') > -1 ||
    image.indexOf('secure.notion-static.com') > -1 ||
    image.indexOf('prod-files-secure') > -1

  if (isNotionImage) {
    // Next.js 要求 width 必须匹配 deviceSizes 里的值
    const allowedWidths = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
    let targetW = Number(width)
    if (!allowedWidths.includes(targetW)) {
      // 找最近的一个
      targetW = allowedWidths.find(w => w >= targetW) || 1920
    }
    const encodedUrl = encodeURIComponent(image)
    return `/_next/image?url=${encodedUrl}&w=${targetW}&q=${quality}`
  }

  let urlObj
  let params
  try {
    urlObj = new URL(image)
    params = new URLSearchParams(urlObj.search)
  } catch (err) {
    try {
      const decoded = decodeURIComponent(image)
      urlObj = new URL(decoded)
      params = new URLSearchParams(urlObj.search)
    } catch (e) {
      console.error('compressImage: Invalid URL:', image, err)
      return image
    }
  }
  
  // Notion图床
  if (
    image.indexOf(BLOG.NOTION_HOST) === 0 &&
    image.indexOf('amazonaws.com') > 0
  ) {
    params.set('width', width)
    params.set('cache', 'v2')
    urlObj.search = params.toString()
    return urlObj.toString()
  } else if (image.indexOf('https://images.unsplash.com/') === 0) {
    // 压缩unsplash图片
    params.set('q', quality)
    params.set('width', width)
    params.set('fmt', fmt)
    params.set('fm', fmt)
    urlObj.search = params.toString()
    return urlObj.toString()
  } else if (image.indexOf('https://your_picture_bed') === 0) {
    return 'do_somethin_here'
  }

  return image
}

export { compressImage, mapImgUrl }
