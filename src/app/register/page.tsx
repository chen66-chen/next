'use client';

/**
 * 用户注册页面组件
 * 
 * 功能：
 * 1. 用户名、邮箱和密码验证
 * 2. 表单输入验证
 * 3. 注册状态管理
 * 4. 错误提示展示
 * 5. 注册成功后重定向到登录页
 */

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, User, Lock, AlertCircle, Loader2, Check } from 'lucide-react';

// 检查URL参数的客户端组件
function RegisterForm() {
  // 路由和Session
  const router = useRouter();
  const { data: session, status } = useSession();
  
  // 表单状态
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // 表单验证状态
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // 检查是否已登录
  useEffect(() => {
    // 注释掉自动重定向逻辑，允许已登录用户访问注册页面
    // if (status === 'authenticated' && session) {
    //   router.push('/');
    // }
  }, [session, status, router]);

  /**
   * 验证用户名
   * @param {string} name - 用户输入的用户名
   * @returns {boolean} 用户名是否有效
   */
  const validateName = (name: string): boolean => {
    if (!name.trim()) {
      setNameError('用户名不能为空');
      return false;
    }
    
    if (name.length < 2) {
      setNameError('用户名至少需要2个字符');
      return false;
    }
    
    setNameError('');
    return true;
  };

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
   * 验证密码强度
   * @param {string} password - 用户输入的密码
   * @returns {boolean} 密码是否符合要求
   */
  const validatePassword = (password: string): boolean => {
    if (password.length < 6) {
      setPasswordError('密码长度至少为6个字符');
      return false;
    }
    
    // 至少包含一个数字和一个字母的简单验证
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    if (!hasLetter || !hasNumber) {
      setPasswordError('密码需要包含至少一个字母和一个数字');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  /**
   * 验证两次密码是否一致
   * @returns {boolean} 密码是否一致
   */
  const validateConfirmPassword = (): boolean => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('两次输入的密码不一致');
      return false;
    }
    
    setConfirmPasswordError('');
    return true;
  };

  /**
   * 处理表单提交
   * @param {React.FormEvent} e - 表单提交事件
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 重置错误状态
    setError('');
    setSuccess('');
    
    // 表单验证
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword();
    
    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    setIsLoading(true);

    try {
      // 调用注册API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '注册失败');
      }

      // 注册成功，显示成功信息
      setSuccess('注册成功！即将跳转到登录页面...');
      
      // 3秒后重定向到登录页
      setTimeout(() => {
        router.push('/login?registered=true');
      }, 3000);
    } catch (error: any) {
      setError(error.message || '注册过程中发生错误，请稍后再试');
      console.error('注册错误:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理输入字段变化并实时验证
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (nameError && value) {
      validateName(value);
    }
  };

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
    if (confirmPassword) {
      validateConfirmPassword();
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (confirmPasswordError && value) {
      validateConfirmPassword();
    }
  };

  // 切换密码可见性
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-8 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center">注册账户</CardTitle>
          <CardDescription className="text-center">
            创建一个新账户以使用所有功能
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
            
            {/* 成功提示 */}
            {success && (
              <Alert className="border-green-500 bg-green-50 dark:bg-green-900/20">
                <Check className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-700 dark:text-green-300">
                  {success}
                </AlertDescription>
              </Alert>
            )}
            
            {/* 用户名输入框 */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                用户名
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="您的用户名"
                  value={name}
                  onChange={handleNameChange}
                  onBlur={() => validateName(name)}
                  className={nameError ? "border-red-500 pr-10" : ""}
                  aria-invalid={!!nameError}
                  disabled={isLoading}
                  required
                />
              </div>
              {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
            </div>
            
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
                  disabled={isLoading}
                  required
                />
              </div>
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </div>
            
            {/* 密码输入框 */}
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-1">
                <Lock className="h-4 w-4" />
                密码
              </Label>
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
                  disabled={isLoading}
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
              <p className="text-xs text-gray-500">
                密码至少需要6个字符，包含字母和数字
              </p>
            </div>
            
            {/* 确认密码输入框 */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex items-center gap-1">
                <Lock className="h-4 w-4" />
                确认密码
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onBlur={validateConfirmPassword}
                  className={confirmPasswordError ? "border-red-500 pr-10" : ""}
                  aria-invalid={!!confirmPasswordError}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  aria-label={showConfirmPassword ? "隐藏密码" : "显示密码"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>}
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
                  注册中...
                </>
              ) : (
                '注册'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <div className="text-sm text-muted-foreground">
            已有账户?{' '}
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline"
            >
              登录
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

// 使用Suspense包装处理URL参数的组件
export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="animate-pulse">加载中...</div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}