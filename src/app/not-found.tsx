import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">404 - 页面未找到</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          抱歉，您访问的页面不存在或已被移除。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/">返回首页</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
