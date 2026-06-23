import { STEPS } from "@/components/home/constants";

export default function HowItWorks() {
	return (
		<section id="how-it-works" className="w-full border-y border-line bg-cream-200">
			<div className="mx-auto max-w-280 px-6 pb-17.5 pt-16">
				<div className="mb-11.5 flex flex-col items-center gap-3 text-center">
					<span className="text-eyebrow uppercase text-terracotta">How it works</span>
					<h2 className="font-serif text-h2 font-semibold leading-[1.08] tracking-[-0.015em] sm:text-display">
						From empty fridge to dinner in three steps
					</h2>
				</div>

				<div className="grid grid-cols-1 gap-7 md:grid-cols-3">
					{STEPS.map(({ number, title, caption, Icon }) => (
						<div
							key={number}
							className="flex flex-col gap-3.5 rounded-[18px] border border-line bg-surface px-6.5 py-7.5"
						>
							<div className="flex items-center justify-between">
								<span className="flex h-14 w-14 items-center justify-center rounded-[15px] bg-terracotta/10 text-terracotta">
									<Icon size={26} />
								</span>
								<span className="font-mono text-[15px] font-semibold text-faint">
									{number}
								</span>
							</div>
							<h3 className="mt-1.5 font-serif text-[23px] font-semibold text-ink">
								{title}
							</h3>
							<p className="text-[15.5px] leading-[1.6] text-muted">{caption}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
