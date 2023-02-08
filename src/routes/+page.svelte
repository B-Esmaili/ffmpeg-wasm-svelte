<script lang="ts">
	import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
	let fileUploader: HTMLElement;
	let video: HTMLVideoElement;

	async function convert(e: Event) {
        debugger
		const input = e.target as HTMLInputElement;
		const ffmpeg = createFFmpeg({ log: true });
		const files = input.files;

		if (!files) {
			return;
		}

		const { name } = files[0];

		if (!ffmpeg.isLoaded()) {
			await ffmpeg.load();
		}
		ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
		await ffmpeg.run('-i', name, 'output.mp4');
		const data = ffmpeg.FS('readFile', 'output.mp4');

		if (video) {
			video.setAttribute(
				'src',
				URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))
			);
		}
	}
</script>

<input type="file" bind:this={fileUploader} on:change={convert} />
<video bind:this={video} autoplay="true" />
