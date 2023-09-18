import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className,disabled, type = "button", ...props }, ref) => {
        return (
            <button
                ref={ref}
                type={type}
                className={twMerge(
                    `py-3 px-4 disabled:cursor-not-allowed  disabled:opacity-50 bg-green-500 border-transparent rounded-full w-full text-black font-bold hover:opacity-75 transition `,
                    className
                )}
                {...props}
                disabled={disabled}
            >
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export default Button;
