import { useRouter } from 'next/router'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'

export const ArticleFooter = props => {
  const { prev, next } = props
  const router = useRouter()
  const { locale } = useGlobal()

  return (
    <div>
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
