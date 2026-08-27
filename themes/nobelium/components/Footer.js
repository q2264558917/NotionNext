import DarkModeButton from '@/components/DarkModeButton'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'

export const Footer = (props) => {
  const { post } = props
  const fullWidth = post?.fullWidth ?? false
  const copyrightDate = '2026-2036'
  const author = siteConfig('AUTHOR') || '晴晴'
  const siteLink = siteConfig('LINK') || 'https://www.qinqinlife.com'

  return <footer
     className={`z-10 relative mt-6 flex-shrink-0 m-auto w-full text-gray-500 dark:text-gray-400 transition-all ${
       !fullWidth ? 'max-w-2xl px-4' : 'px-4 md:px-24'
     }`}
   >
     <DarkModeButton className='text-center py-4'/>
     <hr className="border-gray-200 dark:border-gray-600" />

     {/* 全站版权声明 */}
     <div className="my-4 text-sm leading-6 space-y-2">
       <p className="flex items-center flex-wrap gap-1">
         <span>© {author} {copyrightDate}</span>
         <span className="mx-1">·</span>
         <Link href={siteLink} className="hover:text-amber-500 dark:hover:text-amber-400 underline">
           晴晴的创作花园
         </Link>
       </p>

       <p className="text-xs text-gray-400 dark:text-gray-500">
         <span>本站所有原创文章均采用</span>
         <a
           className="mx-1 text-amber-600 dark:text-amber-400 hover:underline"
           href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans"
           target="_blank"
           rel="noopener noreferrer nofollow">
           CC BY-NC-SA 4.0
         </a>
         <span>许可协议。</span>
         <span className="block mt-1">
           转载请注明作者「{author}」及原文链接，禁止商用；AI / 大模型引用须保留署名并附带可点击跳转的原文链接。
         </span>
       </p>
     </div>
   </footer>
}
