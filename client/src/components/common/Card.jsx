import React from 'react';

const Card = ({ children, title, className = '', headerAction }) => {
    return (
        <div className={`bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden ${className}`}>
            {(title || headerAction) && (
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    {title && <h3 className="text-lg font-semibold text-slate-800">{title}</h3>}
                    {headerAction && <div>{headerAction}</div>}
                </div>
            )}
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};

export default Card;
