import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/Utils/cn';

export default function Modal({ 
    id, 
    show = false, 
    title, 
    children, 
    footer, 
    onClose, 
    maxWidth = 'lg' 
}) {
    const modalRef = useRef(null);

    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                if (modalRef.current) {
                    modalRef.current.classList.remove('opacity-0', 'scale-95');
                    modalRef.current.classList.add('opacity-100', 'scale-100');
                }
            }, 10);
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [show]);

    if (!show) return null;

    const maxWidthClasses = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-500"
                onClick={onClose}
            />

            {/* Modal Box */}
            <div 
                ref={modalRef}
                className={cn(
                    "relative w-full bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl transition-all duration-300 transform opacity-0 scale-95 border border-white/20 dark:border-slate-800",
                    maxWidthClasses[maxWidth]
                )}
            >
                {/* Header */}
                <div className="px-8 pt-8 pb-4 flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic flex items-center gap-2">
                        <div className="w-2 h-6 bg-indigo-600 rounded-full" />
                        {title}
                    </h3>
                    <button 
                        onClick={onClose}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all active:scale-90"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Body */}
                <div className="px-8 py-4 overflow-y-auto max-h-[70vh] custom-scrollbar">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="px-8 pb-8 pt-4 flex items-center justify-end gap-3">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
