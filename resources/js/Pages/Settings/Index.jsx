import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import Card from '@/Components/UI/Card';

export default function Index() {
    return (
        <AuthenticatedLayout title="Settings">
            <PageHeader 
                title="System Settings" 
                description="Configure your personal and system preferences."
            />
            <Card title="Preference Panel" description="This page is under construction.">
                <div className="py-20 text-center">
                    <p className="text-slate-400 font-bold uppercase tracking-widest">Coming Soon</p>
                </div>
            </Card>
        </AuthenticatedLayout>
    );
}
