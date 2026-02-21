import { Head } from '@inertiajs/react';

export default function Welcome({ appName }) {
    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        🚀 {appName}
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Inertia.js + React berhasil diinstall!
                    </p>
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                        <span>✅</span>
                        <span>Laravel + Inertia.js + React + Tailwind CSS</span>
                    </div>
                </div>
            </div>
        </>
    );
}
