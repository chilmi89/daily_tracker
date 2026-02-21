import { Head } from '@inertiajs/react';
import ErrorLayout from '@/Layouts/ErrorLayout';

export default function Error403() {
    return (
        <>
            <Head title="403 - Akses Ditolak" />
            <ErrorLayout
                code="403"
                title="Akses Ditolak"
                description="Anda tidak memiliki izin untuk mengakses halaman ini. Hubungi administrator jika Anda merasa ini adalah kesalahan."
            />
        </>
    );
}
