import { Head } from '@inertiajs/react';
import ErrorLayout from '@/Layouts/ErrorLayout';

export default function Error500() {
    return (
        <>
            <Head title="500 - Server Error" />
            <ErrorLayout
                code="500"
                title="Kesalahan Server"
                description="Terjadi kesalahan di sisi server. Tim teknis kami telah diberitahu. Silakan coba lagi dalam beberapa menit."
            />
        </>
    );
}
