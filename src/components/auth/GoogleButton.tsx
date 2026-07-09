'use client';

import { signIn } from 'next-auth/react';
import GoogleLogo from '@/components/icons/GoogleLogo';

export default function GoogleButton({ label }: { label: string }) {
	return (
		<button
			type="button"
			onClick={() => signIn('google', { redirectTo: '/generate' })}
			className="mt-6.5 cursor-pointer inline-flex w-full items-center justify-center gap-3 rounded-md border-[1.5px] border-line bg-white px-5 py-3.25 text-[15px] font-semibold text-ink shadow-[0_1px_2px_rgba(46,42,37,0.05)] transition-[border-color,box-shadow,background] hover:border-muted/40 hover:bg-surface hover:shadow-[0_4px_14px_rgba(46,42,37,0.10)]"
		>
			<GoogleLogo size={19} />
			{label}
		</button>
	);
}
