import React from 'react';

// Skeleton Card Loader
export const SkeletonCard = ({ count = 1 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 animate-pulse">
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2 mb-3"></div>
                    <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                </div>
            ))}
        </>
    );
};

// Skeleton Table Loader
export const SkeletonTable = ({ rows = 5, columns = 4 }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="animate-pulse">
                {/* Header */}
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                        {Array.from({ length: columns }).map((_, i) => (
                            <div key={i} className="h-4 bg-slate-200 rounded"></div>
                        ))}
                    </div>
                </div>
                {/* Rows */}
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <div key={rowIndex} className="border-b border-slate-200 px-6 py-4">
                        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <div key={colIndex} className="h-3 bg-slate-200 rounded"></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Skeleton Form Loader
export const SkeletonForm = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 animate-pulse space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                    <div className="h-3 bg-slate-200 rounded w-1/4 mb-2"></div>
                    <div className="h-10 bg-slate-200 rounded"></div>
                </div>
            ))}
            <div className="h-10 bg-slate-300 rounded w-32"></div>
        </div>
    );
};

// Skeleton Dashboard Stats
export const SkeletonStats = ({ count = 4 }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 animate-pulse">
                    <div className="h-3 bg-slate-200 rounded w-1/2 mb-4"></div>
                    <div className="h-8 bg-slate-300 rounded w-3/4"></div>
                </div>
            ))}
        </div>
    );
};

// Page Loader (Full Screen)
export const PageLoader = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
                <p className="text-slate-600 font-medium">Loading...</p>
            </div>
        </div>
    );
};

// Default export
const Loader = ({ variant = 'page', ...props }) => {
    switch (variant) {
        case 'card':
            return <SkeletonCard {...props} />;
        case 'table':
            return <SkeletonTable {...props} />;
        case 'form':
            return <SkeletonForm {...props} />;
        case 'stats':
            return <SkeletonStats {...props} />;
        case 'page':
        default:
            return <PageLoader {...props} />;
    }
};

export default Loader;
