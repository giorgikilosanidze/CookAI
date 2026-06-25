import Link from 'next/link';
import CookAIMark from '@/components/icons/CookAIMark';

export default function Logo() {
	return (
		<Link href="/" className="flex items-center gap-2.75 no-underline">
			<CookAIMark size={38} />
			<span className="font-serif text-[23px] font-semibold tracking-tight text-ink">
				CookAI
			</span>
		</Link>
	);
}
