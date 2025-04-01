import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Alert组件变体样式配置
 * 支持的变体:
 * - default: 默认样式
 * - destructive: 错误/警告样式 
 */
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "text-destructive border-destructive/50 dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Alert组件接口定义
 */
interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

/**
 * Alert组件 - 用于显示状态信息、警告或错误
 * @param {AlertProps} props - 组件属性
 * @returns {JSX.Element} Alert组件
 */
function Alert({
  className,
  variant,
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

/**
 * Alert标题组件接口定义
 */
interface AlertTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

/**
 * AlertTitle组件 - 用于显示Alert的标题
 * @param {AlertTitleProps} props - 组件属性
 * @returns {JSX.Element} AlertTitle组件
 */
function AlertTitle({
  className,
  ...props
}: AlertTitleProps) {
  return (
    <h5
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  )
}

/**
 * Alert描述组件接口定义
 */
interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * AlertDescription组件 - 用于显示Alert的详细描述
 * @param {AlertDescriptionProps} props - 组件属性
 * @returns {JSX.Element} AlertDescription组件
 */
function AlertDescription({
  className,
  ...props
}: AlertDescriptionProps) {
  return (
    <div
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
export type { AlertProps, AlertTitleProps, AlertDescriptionProps } 