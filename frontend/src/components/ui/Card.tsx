import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md'
}) => {
  const baseClasses = 'bg-white border border-gray-200 rounded-lg'

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  }

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  }

  const cardClasses = `${baseClasses} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${className}`

  return (
    <div className={cardClasses}>
      {children}
    </div>
  )
}

// カードヘッダーコンポーネント
interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`border-b border-gray-200 pb-3 mb-4 ${className}`}>
      {children}
    </div>
  )
}

// カードタイトルコンポーネント
interface CardTitleProps {
  children: React.ReactNode
  className?: string
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = ''
}) => {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  )
}