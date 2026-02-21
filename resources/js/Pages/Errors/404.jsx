import { Head } from '@inertiajs/react';
import ErrorLayout from '@/Layouts/ErrorLayout';

export default function Error404() {
    return (
        <>
            <Head title="404 - Halaman Tidak Ditemukan" />
            <ErrorLayout
                code="404"
                title="Halaman Tidak Ditemukan"
                description="Halaman yang Anda cari tidak ada atau telah dipindah. Periksa kembali URL atau kembali ke dashboard."
            />
        </>
    );
}
