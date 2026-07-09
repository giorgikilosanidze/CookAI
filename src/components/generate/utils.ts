// Downscale a data-URI image with a canvas so saved thumbnails stay small
// (~60-100 KB instead of the ~1 MB generated photo).
export function downscaleImage(
	dataUri: string,
	maxWidth = 720,
	quality = 0.78,
): Promise<string> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			const scale = Math.min(1, maxWidth / img.width);
			const canvas = document.createElement('canvas');
			canvas.width = Math.round(img.width * scale);
			canvas.height = Math.round(img.height * scale);
			const ctx = canvas.getContext('2d');
			if (!ctx) {
				resolve(dataUri);
				return;
			}
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			resolve(canvas.toDataURL('image/jpeg', quality));
		};
		img.onerror = () => reject(new Error('Could not load image for downscaling.'));
		img.src = dataUri;
	});
}
