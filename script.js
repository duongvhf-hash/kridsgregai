const bgMusic =
	document.getElementById(
		"bgMusic"
	);

bgMusic.volume =
	0.3;

bgMusic
	.play()
	.catch(() => {});

document.addEventListener(
	"click",
	() => {

		if (
			bgMusic.paused
		) {

			bgMusic
				.play()
				.catch(() => {});

		}

	},
	{
		once:
			true
	}
);

const SFX_VOLUME =
	0.06;

const SFX_MIN_PITCH =
	0.80;

const SFX_MAX_PITCH =
	1.20;

function playSfx(
	file
) {

	const audio =
		new Audio(
			file
		);

	audio.volume =
		SFX_VOLUME;

	audio.playbackRate =
		SFX_MIN_PITCH
		+
		Math.random()
		*
		(
			SFX_MAX_PITCH
			-
			SFX_MIN_PITCH
		);

	audio.play().catch(
		() => {}
	);

}

function playHover1() {

	playSfx(
		"hover1.wav"
	);

}

function playHover2() {

	playSfx(
		"hover2.wav"
	);

}

function playClick() {

	playSfx(
		"click1.wav"
	);

}

/* ============================================================
   GREG IMAGE ANIMATIONS
   ============================================================ */

const gregImageAnimationStyle =
	document.createElement(
		"style"
	);

gregImageAnimationStyle.textContent = `
	@keyframes gregImageRowIn {
		from {
			opacity: 0;
			transform: translateY(18px) scale(.985);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes gregImageReveal {
		from {
			opacity: 0;
			transform: scale(.975);
			filter: blur(7px);
		}
		to {
			opacity: 1;
			transform: scale(1);
			filter: blur(0);
		}
	}

	@keyframes gregImageGlow {
		0% {
			box-shadow:
				0 18px 42px rgba(0,0,0,.28),
				0 0 0 rgba(141,240,160,0);
		}
		45% {
			box-shadow:
				0 22px 50px rgba(0,0,0,.30),
				0 0 34px rgba(141,240,160,.10);
		}
		100% {
			box-shadow:
				0 18px 42px rgba(0,0,0,.28),
				0 0 0 rgba(141,240,160,0);
		}
	}

	@keyframes gregImageDownloadIn {
		from {
			opacity: 0;
			transform:
				translateY(-8px)
				scale(.94);
		}
		to {
			opacity: 1;
			transform:
				translateY(0)
				scale(1);
		}
	}

	.greg-image-message {
		animation:
			gregImageRowIn
			.42s
			cubic-bezier(.22,1,.36,1)
			both;
	}

	.greg-generated-image-card {
		position: relative;
		width: fit-content;
		max-width: min(900px,100%);
		margin-top: 10px;
		overflow: hidden;
		border-radius: 16px;
		background:
			rgba(255,255,255,.025);
		border:
			1px solid
			rgba(255,255,255,.08);
		animation:
			gregImageGlow
			1.15s
			.18s
			ease-out
			both;
		transition:
			transform .2s ease,
			border-color .2s ease,
			box-shadow .2s ease;
	}

	.greg-generated-image-card:hover {
		transform:
			translateY(-3px);
		border-color:
			rgba(141,240,160,.18);
		box-shadow:
			0 24px 52px
			rgba(0,0,0,.32);
	}

	.greg-generated-image {
		display: block;
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: min(680px,72vh);
		object-fit: contain;
		border-radius: 16px;
		animation:
			gregImageReveal
			.5s
			.05s
			cubic-bezier(.22,1,.36,1)
			both;
	}

	.greg-generated-image-download {
		position: absolute;
		top: 12px;
		right: 12px;
		z-index: 3;
		padding: 8px 12px;
		border:
			1px solid
			rgba(255,255,255,.12);
		border-radius: 10px;
		background:
			rgba(5,11,8,.84);
		backdrop-filter:
			blur(12px);
		color:
			var(--text,#ecf7ef);
		font: inherit;
		font-size: 11px;
		font-weight: 800;
		cursor: pointer;
		opacity: 0;
		transform:
			translateY(-8px)
			scale(.94);
		transition:
			opacity .2s ease,
			transform .2s ease,
			background .16s ease,
			border-color .16s ease;
	}

	.greg-generated-image-card:hover
	.greg-generated-image-download,
	.greg-generated-image-download:focus-visible {
		opacity: 1;
		animation:
			gregImageDownloadIn
			.28s
			cubic-bezier(.22,1,.36,1)
			both;
	}

	.greg-generated-image-download:hover {
		background:
			rgba(20,31,25,.95);
		border-color:
			rgba(141,240,160,.28);
		transform:
			translateY(-2px)
			scale(1.03);
	}

	.greg-generated-image-download:active {
		transform:
			translateY(0)
			scale(.96);
	}

	@media (
		prefers-reduced-motion: reduce
	) {

		.greg-image-message,
		.greg-generated-image-card,
		.greg-generated-image,
		.greg-generated-image-download {
			animation: none !important;
			transition: none !important;
		}

	}
`;

document.head.appendChild(
	gregImageAnimationStyle
);

let lastHoverTarget =
	null;

document.addEventListener(
	"mouseover",
	event => {

		const target =
			event.target.closest(
				"button,.file-card,.generated-file-card,.greg-generated-image-download"
			);

		if (
			!target
		) {

			return;

		}

		if (
			target ===
			lastHoverTarget
		) {

			return;

		}

		lastHoverTarget =
			target;

		if (

			target.classList.contains(
				"attach-button"
			)

			||

			target.classList.contains(
				"attachment-remove"
			)

			||

			target.classList.contains(
				"attach-option"
			)

			||

			target.classList.contains(
				"file-card"
			)

			||

			target.classList.contains(
				"generated-file-card"
			)

		) {

			playHover2();

		} else {

			playHover1();

		}

	}
);

document.addEventListener(
	"mouseout",
	event => {

		const target =
			event.target.closest(
				"button,.file-card,.generated-file-card,.greg-generated-image-download"
			);

		if (
			target &&
			target ===
			lastHoverTarget
		) {

			const related =
				event.relatedTarget;

			if (
				!related ||
				!target.contains(
					related
				)
			) {

				lastHoverTarget =
					null;

			}

		}

	}
);

document.addEventListener(
	"click",
	event => {

		const target =
			event.target.closest(
				"button,.file-card"
			);

		if (
			!target
		) {

			return;

		}

		if (
			target.dataset.generatedFile ===
			"true"
		) {

			return;

		}

		playClick();

	}
);

const canvas =
	document.getElementById(
		"bgCanvas"
	);

const ctx =
	canvas.getContext(
		"2d"
	);

function resizeCanvas() {

	const dpr =
		Math.max(
			1,
			window.devicePixelRatio || 1
		);

	canvas.width =
		Math.floor(
			window.innerWidth *
			dpr
		);

	canvas.height =
		Math.floor(
			window.innerHeight *
			dpr
		);

	canvas.style.width =
		window.innerWidth +
		"px";

	canvas.style.height =
		window.innerHeight +
		"px";

	ctx.setTransform(
		dpr,
		0,
		0,
		dpr,
		0,
		0
	);

}

window.addEventListener(
	"resize",
	resizeCanvas
);

resizeCanvas();

const particles =
	Array.from(
		{
			length:
				42
		},
		() => ({

			x:
				Math.random() *
				window.innerWidth,

			y:
				Math.random() *
				window.innerHeight,

			r:
				18 +
				Math.random() *
				55,

			vx:
				(
					Math.random() -
					0.5
				) *
				0.22,

			vy:
				(
					Math.random() -
					0.5
				) *
				0.18,

			hue:
				Math.floor(
					Math.random() *
					360
				),

			alpha:
				0.05 +
				Math.random() *
				0.18,

			pulse:
				Math.random() *
				Math.PI *
				2

		})
	);

function drawCanvasBg() {

	const w =
		window.innerWidth;

	const h =
		window.innerHeight;

	ctx.clearRect(
		0,
		0,
		w,
		h
	);

	const g =
		ctx.createLinearGradient(
			0,
			0,
			w,
			h
		);

	g.addColorStop(
		0,
		"rgba(10,18,14,0.10)"
	);

	g.addColorStop(
		1,
		"rgba(3,6,5,0.14)"
	);

	ctx.fillStyle =
		g;

	ctx.fillRect(
		0,
		0,
		w,
		h
	);

	ctx.save();

	ctx.globalCompositeOperation =
		"lighter";

	for (
		const p
		of particles
	) {

		p.x +=
			p.vx;

		p.y +=
			p.vy;

		p.pulse +=
			0.018;

		if (
			p.x < -120
		) {

			p.x =
				w + 120;

		}

		if (
			p.x > w + 120
		) {

			p.x =
				-120;

		}

		if (
			p.y < -120
		) {

			p.y =
				h + 120;

		}

		if (
			p.y > h + 120
		) {

			p.y =
				-120;

		}

		const r =
			p.r +
			Math.sin(
				p.pulse
			) *
			10;

		const grad =
			ctx.createRadialGradient(
				p.x,
				p.y,
				0,
				p.x,
				p.y,
				r
			);

		grad.addColorStop(
			0,
			`hsla(
				${p.hue},
				95%,
				72%,
				${p.alpha}
			)`
		);

		grad.addColorStop(
			0.45,
			`hsla(
				${(p.hue + 40) % 360},
				95%,
				62%,
				${p.alpha * 0.45}
			)`
		);

		grad.addColorStop(
			1,
			"rgba(0,0,0,0)"
		);

		ctx.fillStyle =
			grad;

		ctx.beginPath();

		ctx.arc(
			p.x,
			p.y,
			r,
			0,
			Math.PI * 2
		);

		ctx.fill();

	}

	ctx.restore();

	requestAnimationFrame(
		drawCanvasBg
	);

}

requestAnimationFrame(
	drawCanvasBg
);

const API_URL = "https://divorce-aims-mono-cylinder.trycloudflare.com";

const STORAGE_KEY =
	"greg_ui_api_v6";

const MEMORY_LIMIT =
	80;

const META_MARKER =
	"__GREG_META__";

const DEFAULT_PARAMS = {

	max_new_tokens:
		2000,

	temperature:
		0.6,

	top_p:
		0.85,

	top_k:
		40,

	repetition_penalty:
		1.0,

	no_repeat_ngram_size:
		0

};

const PRESET_PARAMS = {

	default: {

		max_new_tokens:
			2000,

		temperature:
			0.6,

		top_p:
			0.85,

		top_k:
			40,

		repetition_penalty:
			1.0,

		no_repeat_ngram_size:
			0

	},

	fast: {

		max_new_tokens:
			2500,

		temperature:
			0.5,

		top_p:
			0.8,

		top_k:
			30,

		repetition_penalty:
			1.0,

		no_repeat_ngram_size:
			0

	},

	smart: {

		max_new_tokens:
			3000,

		temperature:
			0.7,

		top_p:
			0.9,

		top_k:
			50,

		repetition_penalty:
			1.0,

		no_repeat_ngram_size:
			0

	}

};

const el = {

	messages:
		document.getElementById(
			"messages"
		),

	input:
		document.getElementById(
			"input"
		),

	sendBtn:
		document.getElementById(
			"sendBtn"
		),

	testBtn:
		document.getElementById(
			"testBtn"
		),

	clearBtn:
		document.getElementById(
			"clearBtn"
		),

	exportBtn:
		document.getElementById(
			"exportBtn"
		),

	statusLine:
		document.getElementById(
			"statusLine"
		),

	memoryHint:
		document.getElementById(
			"memoryHint"
		),

	orb:
		document.getElementById(
			"orb"
		),

	presetButton:
		document.getElementById(
			"presetButton"
		),

	presetButtonText:
		document.getElementById(
			"presetButtonText"
		),

	presetMenu:
		document.getElementById(
			"presetMenu"
		),

	attachButton:
		document.getElementById(
			"attachButton"
		),

	attachMenu:
		document.getElementById(
			"attachMenu"
		),

	uploadImageOption:
		document.getElementById(
			"uploadImageOption"
		),

	uploadFileOption:
		document.getElementById(
			"uploadFileOption"
		),

	imageInput:
		document.getElementById(
			"imageInput"
		),

	fileInput:
		document.getElementById(
			"fileInput"
		),

	attachmentStrip:
		document.getElementById(
			"attachmentStrip"
		),

	fileAttachmentStrip:
		document.getElementById(
			"fileAttachmentStrip"
		),

	homeScreen:
		document.getElementById(
			"homeScreen"
		),

	chatScreen:
		document.getElementById(
			"chatScreen"
		),

	homeNavButton:
		document.getElementById(
			"homeNavButton"
		),

	chatNavButton:
		document.getElementById(
			"chatNavButton"
		)

};

let state =
	loadState();

let isSending =
	false;

let connected =
	false;

let activePreset =
	"default";

let pendingImages =
	[];

let pendingFiles =
	[];

/*
The remainder of your original script.js stays here unchanged,
including all existing image/file upload, message rendering,
streaming, thinking, preset, chat, export, replay, and initialization
logic, plus these updated image-generation pieces:
*/

function normalizeGregGeneratedImage(
	imageResult
) {

	if (
		!imageResult
	) {

		return null;

	}

	if (
		typeof imageResult ===
		"string"
	) {

		return {

			dataUrl:
				imageResult,

			width:
				null,

			height:
				null,

			filename:
				"greg_generated_image.png"

		};

	}

	if (
		typeof imageResult !==
		"object"
	) {

		return null;

	}

	const dataUrl =
		imageResult.data_url ||
		imageResult.dataUrl ||
		imageResult.url ||
		imageResult.image_url ||
		imageResult.imageUrl ||
		imageResult.src ||
		"";

	if (
		!dataUrl
	) {

		return null;

	}

	const width =
		Number(
			imageResult.width ||
			0
		);

	const height =
		Number(
			imageResult.height ||
			0
		);

	return {

		dataUrl:
			dataUrl,

		width:
			Number.isFinite(
				width
			) &&
			width > 0
				? width
				: null,

		height:
			Number.isFinite(
				height
			) &&
			height > 0
				? height
				: null,

		filename:
			imageResult.filename ||
			"greg_generated_image.png"

	};

}

function downloadGregGeneratedImage(
	imageResult
) {

	const image =
		normalizeGregGeneratedImage(
			imageResult
		);

	if (
		!image
	) {

		return;

	}

	playClick();

	const link =
		document.createElement(
			"a"
		);

	link.href =
		image.dataUrl;

	link.download =
		image.filename;

	link.style.display =
		"none";

	document.body.appendChild(
		link
	);

	link.click();

	link.remove();

}

function appendGregGeneratedImage(
	container,
	imageResult,
	animate = true
) {

	const image =
		normalizeGregGeneratedImage(
			imageResult
		);

	if (
		!image ||
		!container
	) {

		return null;

	}

	const card =
		document.createElement(
			"div"
		);

	card.className =
		"greg-generated-image-card";

	if (
		!animate
	) {

		card.style.animation =
			"none";

	}

	const imageElement =
		document.createElement(
			"img"
		);

	imageElement.className =
		"greg-generated-image";

	imageElement.src =
		image.dataUrl;

	imageElement.alt =
		"Greg generated image";

	imageElement.draggable =
		false;

	if (
		image.width &&
		image.height
	) {

		imageElement.width =
			image.width;

		imageElement.height =
			image.height;

	}

	if (
		!animate
	) {

		imageElement.style.animation =
			"none";

	}

	const downloadButton =
		document.createElement(
			"button"
		);

	downloadButton.type =
		"button";

	downloadButton.className =
		"greg-generated-image-download";

	downloadButton.textContent =
		"Download";

	downloadButton.title =
		"Download generated image";

	downloadButton.addEventListener(
		"click",
		event => {

			event.preventDefault();

			event.stopPropagation();

			downloadGregGeneratedImage(
				image
			);

		}
	);

	card.appendChild(
		imageElement
	);

	card.appendChild(
		downloadButton
	);

	container.appendChild(
		card
	);

	return card;

}

function addGregImageToStream(
	stream,
	imageResult
) {

	const messageContent =
		stream.row.querySelector(
			".message-content"
		);

	if (
		!messageContent
	) {

		return null;

	}

	const existing =
		messageContent.querySelector(
			".greg-generated-image-card"
		);

	if (
		existing
	) {

		return existing;

	}

	const card =
		appendGregGeneratedImage(
			messageContent,
			imageResult,
			true
		);

	if (
		card
	) {

		stream.row.classList.add(
			"greg-image-message"
		);

		userIsAtBottom =
			true;

		scrollBottom(
			true,
			true
		);

	}

	return card;

}

/*
Keep your existing createGregStream() function, but its returned
stream state must additionally contain these fields:

		imageRequest:
			null,

		imageResult:
			null

Keep all of its existing fields unchanged.
*/

function finishGregImageMetadata(
	stream,
	metadata
) {

	if (
		!metadata ||
		typeof metadata !==
		"object"
	) {

		return;

	}

	stream.imageRequest =
		metadata.image_request &&
		typeof metadata.image_request ===
		"object"
			? metadata.image_request
			: null;

	stream.imageResult =
		metadata.image_result ||
		metadata.generated_image ||
		metadata.image ||
		null;

}

/*
In your existing finishStreamMetadata(), after:

	stream.generatedFiles = ...

add:

	finishGregImageMetadata(
		stream,
		metadata
	);

*/

function addStaticGregMessage(
	text,
	generatedFiles = [],
	imageResult = null,
	animate = false
) {

	const row =
		document.createElement(
			"div"
		);

	row.className =
		"message-row greg";

	row.innerHTML = `

		<div class="avatar">
			G
		</div>

		<div class="message-content">

			<div class="message-name">
				Greg
			</div>

			<div class="static-output"></div>

		</div>

	`;

	renderStaticMessage(

		row.querySelector(
			".static-output"
		),

		text

	);

	if (
		Array.isArray(
			generatedFiles
		) &&
		generatedFiles.length
	) {

		const strip =
			document.createElement(
				"div"
			);

		strip.className =
			"sent-file-strip";

		generatedFiles.forEach(
			file => {

				strip.appendChild(
					createFileCard(
						file.filename ||
						"greg_file",

						file.type ||
						"file",

						true,

						file
					)
				);

			}
		);

		row
			.querySelector(
				".message-content"
			)
			.appendChild(
				strip
			);

	}

	const normalizedImage =
		normalizeGregGeneratedImage(
			imageResult
		);

	if (
		normalizedImage
	) {

		appendGregGeneratedImage(
			row.querySelector(
				".message-content"
			),
			normalizedImage,
			animate
		);

		row.classList.add(
			"greg-image-message"
		);

	}

	userIsAtBottom =
		true;

	el.messages.appendChild(
		row
	);

	scrollBottom(
		false,
		true
	);

	return row;

}

/*
In your existing streamMessage() finalization, after the existing
cursor removal and before generatedFiles rendering, keep:

	if (
		stream.imageResult
	) {

		addGregImageToStream(
			stream,
			stream.imageResult
		);

	}

Then return these additional fields:

	imageRequest:
		stream.imageRequest,

	imageResult:
		stream.imageResult

Your existing generated-file logic remains unchanged.
*/

async function streamMessage(
	userText,
	images = [],
	files = []
) {

	const controller =
		new AbortController();

	const timeout =
		setTimeout(
			() =>
				controller.abort(),
			1800000
		);

	const stream =
		createGregStream();

	const renderer =
		new OrderedRenderer(
			stream
		);

	const parser =
		new StreamParser(
			renderer
		);

	let completed =
		false;

	const recentMessages =
		state.conversation
			.slice(
				-MEMORY_LIMIT
			)
			.map(
				item => {

					const speaker =
						item.role ===
						"user"
							? "User"
							: "Greg";

					let result =
						`${speaker}: ${
							item.content || ""
						}`;

					if (
						item.role ===
							"user" &&
						item.imageDescription
					) {

						result +=
							"\n[Visual information from " +
							"images attached to this earlier " +
							"message:]\n" +
							item.imageDescription;

					}

					if (
						item.role ===
							"user" &&
						Array.isArray(
							item.files
						) &&
						item.files.length
					) {

						result +=
							"\n[Files attached to this earlier " +
							"message:]\n";

						item.files.forEach(
							file => {

								result +=
									`File: ${
										file.name ||
										"file"
									}`;

								if (
									file.fileType
								) {

									result +=
										` (${file.fileType})`;

								}

								result +=
									"\n";

							}
						);

					}

					return result;

				}
			)
			.join(
				"\n\n"
			);

	const imagePayload =
		images.map(
			image =>
				image.dataUrl
		);

	try {

		const response =
			await fetch(
				`${API_URL}/chat/stream`,
				{
					method:
						"POST",

					headers:
						{
							"Content-Type":
								"application/json"
						},

					body:
						JSON.stringify({

							message:
								userText,

							memory:
								recentMessages,

							params:
								state.params,

							images:
								imagePayload,

							files:
								files

						}),

					signal:
						controller.signal

				}
			);

		if (
			!response.ok
		) {

			const errorText =
				await response.text();

			throw new Error(
				`HTTP ${response.status}: ${
					errorText ||
					"Request failed"
				}`
			);

		}

		if (
			!response.body
		) {

			throw new Error(
				"Browser streaming is unavailable."
			);

		}

		const reader =
			response.body.getReader();

		const decoder =
			new TextDecoder(
				"utf-8"
			);

		while (
			true
		) {

			const result =
				await reader.read();

			if (
				result.done
			) {

				break;

			}

			const chunk =
				decoder.decode(
					result.value,
					{
						stream:
							true
					}
				);

			if (
				!chunk
			) {

				continue;

			}

			processStreamChunkWithMetadata(
				chunk,
				parser,
				stream
			);

			scrollBottom(
				false
			);

		}

		const finalChunk =
			decoder.decode();

		if (
			finalChunk
		) {

			processStreamChunkWithMetadata(
				finalChunk,
				parser,
				stream
			);

		}

		finishStreamMetadata(
			parser,
			stream
		);

		finishThinkingStream(
			parser,
			stream
		);

		parser.finish();

		await renderer.finish();

		finishThinkingUI(
			stream
		);

		if (
			stream.cursor &&
			stream.cursor.parentNode
		) {

			stream.cursor.remove();

		}

		if (
			stream.imageResult
		) {

			addGregImageToStream(
				stream,
				stream.imageResult
			);

		}

		if (
			Array.isArray(
				stream.generatedFiles
			) &&
			stream.generatedFiles.length
		) {

			const messageContent =
				stream.row.querySelector(
					".message-content"
				);

			if (
				messageContent
			) {

				const strip =
					document.createElement(
						"div"
					);

				strip.className =
					"sent-file-strip";

				stream.generatedFiles.forEach(
					file => {

						const card =
							createFileCard(
								file.filename ||
								"greg_file",

								file.type ||
								"file",

								true,

								file
							);

						strip.appendChild(
							card
						);

					}
				);

				messageContent.appendChild(
					strip
				);

				scrollBottom();

			}

		}

		completed =
			true;

		return {

			answer:
				stream.answerText.trim(),

			imageDescription:
				stream.imageDescription,

			imageCount:
				stream.imageCount,

			fileCount:
				stream.fileCount,

			files:
				stream.files,

			generatedFiles:
				stream.generatedFiles,

			imageRequest:
				stream.imageRequest,

			imageResult:
				stream.imageResult

		};

	} finally {

		clearTimeout(
			timeout
		);

		finishThinkingUI(
			stream
		);

		if (
			!completed
		) {

			parser.finish();

			await renderer.finish()
				.catch(
					() => {}
				);

		}

		if (
			stream.cursor &&
			stream.cursor.parentNode
		) {

			stream.cursor.remove();

		}

	}

}

/*
Keep the remainder of your original script.js unchanged.

In sendMessage(), when storing the assistant conversation item,
use:

	imageRequest:
		result.imageRequest ||
		null,

	imageResult:
		result.imageResult ||
		null

In replayConversation(), call:

	addStaticGregMessage(
		item.content || "",
		Array.isArray(
			item.generatedFiles
		)
			? item.generatedFiles
			: [],
		item.imageResult ||
			null,
		false
	);

All existing functions after this point remain exactly as in
your uploaded script.js.
*/