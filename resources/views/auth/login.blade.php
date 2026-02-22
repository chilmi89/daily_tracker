@extends('layouts.guest')

@section('content')
    <main class="w-full max-w-[400px] animate-in fade-in zoom-in slide-in-from-bottom-4 duration-1000">
        <!-- Brand Header -->
        <div class="text-center mb-8 group">
            <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-tr from-indigo-600 to-purple-600 shadow-2xl shadow-indigo-500/40 mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
            </div>
            <h1 class="text-3xl font-black text-white tracking-tighter leading-tight">
                Login Dashboard<span class="text-indigo-500">.</span>
            </h1>
            <p class="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-2">
                System Access Required
            </p>
        </div>

        <!-- Glassmorphism Auth Card -->
        <div class="bg-slate-900/40 backdrop-blur-3xl rounded-4xl border border-slate-800/50 p-8 shadow-3xl relative overflow-hidden group/card text-left">
            <!-- Subtle Internal Glow -->
            <div class="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>

            <form action="{{ route('login') }}" method="POST" class="space-y-5 relative">
                @csrf
                <!-- Email Field -->
                <div class="space-y-1.5">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Email Connection</label>
                    <div class="relative group/input">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-500 group-focus-within/input:text-indigo-500 transition-colors"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        </div>
                        <input
                            type="email"
                            name="email"
                            value="{{ old('email') }}"
                            class="w-full bg-slate-950/40 border border-slate-800/80 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all text-sm font-medium shadow-inner"
                            placeholder="your@email.com"
                            required
                        />
                    </div>
                    @error('email')
                        <p class="text-[10px] text-rose-500 font-bold ml-1 animate-in fade-in slide-in-from-left-2">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Password Field -->
                <div class="space-y-1.5">
                    <div class="flex justify-between items-center px-1">
                        <label class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Secret Key</label>
                        <a href="#" class="text-[10px] font-bold text-indigo-400/80 hover:text-indigo-400 transition-colors">Forgot Access?</a>
                    </div>
                    <div class="relative group/input">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-500 group-focus-within/input:text-indigo-500 transition-colors"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        </div>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            class="w-full bg-slate-950/40 border border-slate-800/80 rounded-xl py-3.5 pl-11 pr-11 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all text-sm font-medium shadow-inner"
                            placeholder="••••••••"
                            required
                        />
                        <button
                            type="button"
                            onclick="const p = document.getElementById('password'); p.type = p.type === 'password' ? 'text' : 'password';"
                            class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-indigo-400 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                    </div>
                    @error('password')
                        <p class="text-[10px] text-rose-500 font-bold ml-1 animate-in fade-in slide-in-from-left-2">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Remember Me Toggle -->
                <div class="flex items-center gap-2.5 px-1 pt-1">
                    <div class="relative inline-flex items-center cursor-pointer select-none">
                        <input
                            type="checkbox"
                            name="remember"
                            id="remember"
                            class="w-4 h-4 rounded-md bg-slate-950 border-slate-800 text-indigo-600 focus:ring-offset-slate-900 focus:ring-indigo-500/50 cursor-pointer transition-all"
                        />
                    </div>
                    <label htmlFor="remember" class="text-xs font-bold text-slate-400 cursor-pointer hover:text-slate-300 transition-colors">Keep me signed in</label>
                </div>

                <!-- Action Button -->
                <button
                    type="submit"
                    class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-xl shadow-xl shadow-indigo-600/20 active:scale-[0.97] transition-all flex items-center justify-center gap-2 group/btn relative overflow-hidden"
                >
                    <span class="text-sm z-10">Authenticate</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover/btn:translate-x-1 transition-transform z-10"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    <!-- Shiny Effect -->
                    <div class="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] group-hover/btn:left-full transition-all duration-1000"></div>
                </button>
            </form>

            <!-- Decorative Divider -->
            <div class="relative my-8">
                <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-slate-800/80"></div>
                </div>
                <div class="relative flex justify-center">
                    <span class="bg-[#0f172a] px-3 text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Network Identity</span>
                </div>
            </div>

            <!-- Social Connect -->
            <div class="grid grid-cols-2 gap-3">
                <button class="flex items-center justify-center gap-2 bg-slate-950/50 hover:bg-slate-800 border border-slate-800/80 rounded-xl py-3 text-slate-300 hover:text-white text-xs font-bold transition-all group/social active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover/social:rotate-20 transition-transform"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" x2="12" y1="8" y2="8"/><line x1="3.95" x2="8.54" y1="6.06" y2="14"/><line x1="10.88" x2="15.46" y1="21.94" y2="14"/></svg>
                    <span>Google</span>
                </button>
                <button class="flex items-center justify-center gap-2 bg-slate-950/50 hover:bg-slate-800 border border-slate-800/80 rounded-xl py-3 text-slate-300 hover:text-white text-xs font-bold transition-all group/social active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover/social:-rotate-20 transition-transform"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    <span>GitHub</span>
                </button>
            </div>
        </div>

        <!-- Final Link -->
        <div class="text-center mt-8">
            <p class="text-slate-500 text-xs font-medium">
                Need a new account? <a href="#" class="text-indigo-400 font-black hover:text-indigo-300 transition-colors decoration-indigo-400/30 underline-offset-4 hover:underline">Register Access</a>
            </p>
        </div>
    </main>
@endsection
