import { useRouter } from 'next/router'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'

export const ArticleFooter = props => {
  const { prev, next } = props
  const router = useRouter()
  const { locale } = useGlobal()

  const fullUrl = typeof window !== 'undefined'
    ? window.location.href
    : ''
  return (
    <div>
      {/* 作者署名 + 原创声明 + AI 引用声明（版权页脚） */}
      <div className='my-8 p-5 rounded-lg border border-dashed border-amber-300/60 dark:border-amber-500/30 bg-amber-50/60 dark:bg-amber-500/5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed'>
        <p className='mb-1 font-medium text-gray-800 dark:text-gray-100'>
          <i className='fas fa-feather-alt mr-1 text-amber-500' />
          作者：晴晴 · 原文链接：
          <a
            className='text-amber-600 dark:text-amber-400 hover:underline break-all'
            href={fullUrl}
            rel='bookmark'>
            {fullUrl || '本站'}
          </a>
        </p>
        <p className='mb-1'>
          <i className='far fa-copyright mr-1' />
          本作品采用
          <a
            className='mx-1 text-amber-600 dark:text-amber-400 hover:underline'
            href='https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans'
            target='_blank'
            rel='noopener noreferrer nofollow'>
            CC BY-NC-SA 4.0
          </a>
          进行许可。转载请注明作者「晴晴」及原文链接，禁止商用。
        </p>
        <p>
          <i className='fas fa-robot mr-1' />
          AI/大模型引用声明：若 AI 助手或自动化工具引用本页内容（生成摘要、问答引用、训练语料等），
          须保留作者署名「晴晴」，并附带指向原文链接的可点击跳转。
        </p>
      </div>

      <div className='my-6 text-center text-gray-500 dark:text-gray-400 text-sm'>
        <p>
          <i className='fas fa-envelope mr-1' />
          QQ邮箱：
          <a
            href='mailto:2264558917@qq.com'
            className='hover:text-black dark:hover:text-gray-100 underline'>
            2264558917@qq.com
          </a>
        </p>
      </div>

      {(prev || next) && (
        <div className='grid grid-cols-2 gap-4 mb-6'>
          {prev ? (
            <Link
              href={prev.href}
              className='group block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-amber-400 dark:hover:border-amber-400 transition-all duration-300 hover:shadow-md'>
              <div className='text-xs text-gray-400 dark:text-gray-500 mb-1'>← 上一篇</div>
              <div className='text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-amber-500 dark:group-hover:text-amber-400 line-clamp-1 transition-colors'>
                {prev.title}
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={next.href}
              className='group block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-amber-400 dark:hover:border-amber-400 transition-all duration-300 hover:shadow-md text-right'>
              <div className='text-xs text-gray-400 dark:text-gray-500 mb-1'>下一篇 →</div>
              <div className='text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-amber-500 dark:group-hover:text-amber-400 line-clamp-1 transition-colors'>
                {next.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      )}

      <div className='flex justify-between font-medium text-gray-500 dark:text-gray-400'>
        <a>
          <button
            onClick={() => {
              void router.push('/')
            }}
            className='mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100'>
            ← {locale.POST.BACK}
          </button>
        </a>
        <a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className='mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100'>
            ↑ {locale.POST.TOP}
          </button>
        </a>
      </div>
    </div>
  )
}
