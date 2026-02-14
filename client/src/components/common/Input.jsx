import React from 'react';

const Input = ({
    label,
    type = 'text',
    name,
    placeholder,
    error,
    register,
    className = '',
    ...props
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    {label}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                className={`w-full px-3 py-2 bg-white border ${error ? 'border-red-500' : 'border-slate-300'} rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none ${error ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-primary focus:ring-primary'} 
                  focus:ring-1 transition duration-200`}
                {...(register ? register(name) : {})}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
        </div>
    );
};

export default Input;
