import { Link } from '@inertiajs/react';

export default function Pagination({ meta }) {
    if (!meta || meta.last_page <= 1) return null;

    const { current_page, last_page, links = [] } = meta;

    return (
        <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500 dark:text-slate-400">
                Halaman <span className="font-medium text-gray-900 dark:text-white">{current_page}</span> dari{' '}
                <span className="font-medium text-gray-900 dark:text-white">{last_page}</span>
            </p>

            <div className="flex items-center gap-1">
                {links.map((link, i) => {
                    const isActive = link.active;
                    const isDisabled = !link.url;

                    if (isDisabled) {
                        return (
                            <span key={i} className="px-3 py-1.5 text-sm text-gray-300 dark:text-slate-700 cursor-not-allowed"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        );
                    }

                    return (
                        <Link
                            key={i}
                            href={link.url}
                            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${isActive
                                    ? 'bg-indigo-600 text-white font-medium shadow-sm'
                                    : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                                }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
