{{--
    Global Toast Notification Component
    Usage from PHP: session()->flash('toast', ['type' => 'success|error|warning|info', 'message' => '...'])
    Usage from JS:  window.showToast('success', 'Pesan anda')
--}}

@php
    $toast   = session('toast');
    $success = session('success');
    $error   = session('error');

    // Normalize to toast format
    if (!$toast && $success) {
        $toast = ['type' => 'success', 'message' => $success];
    } elseif (!$toast && $error) {
        $toast = ['type' => 'error', 'message' => $error];
    }
@endphp

{{-- Toast Container --}}
<div id="toast-container" class="fixed top-5 right-5 z-200 flex flex-col gap-3 pointer-events-none" style="max-width: 380px; width: calc(100vw - 2.5rem)">
</div>

