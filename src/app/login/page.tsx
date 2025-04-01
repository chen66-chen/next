'use client';

/**
 * 登录页面组件
 * 
 * 功能：
 * 1. 用户邮箱和密码验证
 * 2. 表单输入验证
 * 3. 登录状态管理
 * 4. 错误提示展示
 * 5. 登录成功后重定向
 */

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';

// 主登录表单组件
function LoginForm() {
  // 路由和会话管理
  const router = useRouter();
  const { data: session, status } = useSession();
  
  // 表单状态管理
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // 表单验证状态
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 如果用户已登录，重定向到首页
  useEffect(() => {
    // 注释掉自动重定向逻辑，允许已登录用户访问登录页面
    // if (status === 'authenticated' && session) {
    //   router.push('/');
    // }
  }, [session, status, router]);

  /**
   * 验证邮箱格式
   * @param {string} email - 用户输入的邮箱
   * @returns {boolean} 邮箱格式是否有效
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailError(isValid ? '' : '请输入有效的邮箱地址');
    return isValid;
  };

  /**
   * 验证密码长度和复杂度
   * @param {string} password - 用户输入的密码
   * @returns {boolean} 密码是否符合要求
   */
  const validatePassword = (password: string): boolean => {
    const isValid = password.length >= 6;
    setPasswordError(isValid ? '' : '密码长度至少为6个字符');
    return isValid;
  };

  /**
   * 处理表单提交
   * @param {React.FormEvent} e - 表单提交事件
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表单验证
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    
    // 重置错误状态并设置加载状态
    setError('');
    setIsLoading(true);

    try {
      // 调用NextAuth的signIn方法进行登录验证
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      // 处理登录结果
      if (result?.error) {
        setError('登录失败：邮箱或密码错误');
      } else {
        // 登录成功，重定向到首页
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      // 处理登录过程中的错误
      setError('登录过程中发生错误，请稍后再试');
      console.error('登录错误:', error);
    } finally {
      // 无论成功或失败，都结束加载状态
      setIsLoading(false);
    }
  };

  // 处理输入字段变化并实时验证
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError && value) {
      validateEmail(value);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError && value) {
      validatePassword(value);
    }
  };

  // 切换密码可见性
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-8 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center">登录</CardTitle>
          <CardDescription className="text-center">
            输入您的邮箱和密码登录账户
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 错误提示 */}
            {error && (
              <Alert variant="destructive" className="border-red-500">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {/* 邮箱输入框 */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                邮箱
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => validateEmail(email)}
                  className={emailError ? "border-red-500 pr-10" : ""}
                  aria-invalid={!!emailError}
                  required
                />
              </div>
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </div>
            
            {/* 密码输入框 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="flex items-center gap-1">
                  <Lock className="h-4 w-4" />
                  密码
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  忘记密码?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => validatePassword(password)}
                  className={passwordError ? "border-red-500 pr-10" : ""}
                  aria-invalid={!!passwordError}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  aria-label={showPassword ? "隐藏密码" : "显示密码"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
            </div>
            
            {/* 提交按钮 */}
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  登录中...
                </>
              ) : (
                '登录'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <div className="text-sm text-muted-foreground">
            还没有账户?{' '}
            <Link
              href="/register"
              className="text-primary font-semibold hover:underline"
            >
              注册
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

// 使用Suspense包装登录表单
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="animate-pulse">加载中...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}