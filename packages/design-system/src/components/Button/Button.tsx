import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    asChild?: boolean;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}: ButtonProps) {
    const classes = [
        'button',
        `button--${variant}`,
        size !== 'md' ? `button--${size}` : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
