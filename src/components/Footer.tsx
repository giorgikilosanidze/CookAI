// import Link from 'next/link';
import CookAIMark from "@/components/icons/CookAIMark";

export default function Footer() {
	return (
		<footer className="flex w-full flex-wrap items-center justify-between gap-x-7 gap-y-4.5 border-t border-line bg-cream-200 px-7 py-6.5">
			<div className="flex items-center gap-2.5">
				<CookAIMark size={30} />
				<span className="font-serif text-[19px] font-semibold text-ink">CookAI</span>
				<span className="ml-1 text-[13px] text-faint">Cook with what you have.</span>
			</div>

			<div className="text-sm text-muted">
				Built by <span className="font-semibold text-ink">Giorgi Kilosanidze</span>
				{/* <Link
          href="#"
          className="border-b border-terracotta/35 font-semibold text-terracotta no-underline transition-colors hover:border-terracotta"
        >
          Portfolio
        </Link> */}
			</div>
		</footer>
	);
}
