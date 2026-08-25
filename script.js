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

let lastHoverTarget =
	null;

document.addEventListener(
	"mouseover",
	event => {

		const target =
			event.target.closest(
				"button,.file-card,.generated-file-card"
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
				"button,.file-card,.generated-file-card"
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

const API_URL = "https://years-existing-swim-integral.trycloudflare.com";

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

function showHome() {

	if (
		!el.homeScreen ||
		!el.chatScreen
	) {

		return;

	}

	el.chatScreen.style.display =
		"none";

	el.homeScreen.style.display =
		"flex";

	if (
		el.homeNavButton
	) {

		el.homeNavButton.classList.add(
			"active"
		);

	}

	if (
		el.chatNavButton
	) {

		el.chatNavButton.classList.remove(
			"active"
		);

	}

}

function showChat() {

	if (
		!el.homeScreen ||
		!el.chatScreen
	) {

		return;

	}

	el.homeScreen.style.display =
		"none";

	el.chatScreen.style.display =
		"flex";

	if (
		el.homeNavButton
	) {

		el.homeNavButton.classList.remove(
			"active"
		);

	}

	if (
		el.chatNavButton
	) {

		el.chatNavButton.classList.add(
			"active"
		);

	}

	setTimeout(
		() => {

			if (
				el.input
			) {

				el.input.focus();

			}

		},
		120
	);

}

if (
	el.homeNavButton
) {

	el.homeNavButton.addEventListener(
		"click",
		() => {

			playClick();

			showHome();

		}
	);

}

if (
	el.chatNavButton
) {

	el.chatNavButton.addEventListener(
		"click",
		() => {

			playClick();

			showChat();

		}
	);

}

function makeImageId() {

	return (

		Date.now().toString(
			36
		)
		+
		Math.random()
			.toString(
				36
			)
			.slice(
				2
			)

	);

}

function readImageFile(
	file
) {

	return new Promise(
		(
			resolve,
			reject
		) => {

			const reader =
				new FileReader();

			reader.onload =
				() => {

					resolve({

						id:
							makeImageId(),

						name:
							file.name,

						type:
							file.type,

						size:
							file.size,

						dataUrl:
							reader.result

					});

				};

			reader.onerror =
				() => {

					reject(
						reader.error
					);

				};

			reader.readAsDataURL(
				file
			);

		}
	);

}

async function addImageFiles(
	files
) {

	const fileArray =
		Array.from(
			files || []
		);

	if (
		!fileArray.length
	) {

		return;

	}

	const imageFiles =
		fileArray.filter(
			file =>
				file.type &&
				file.type.startsWith(
					"image/"
				)
		);

	if (
		imageFiles.length
	) {

		playClick();

	}

	for (
		const file
		of imageFiles
	) {

		try {

			const image =
				await readImageFile(
					file
				);

			pendingImages.push(
				image
			);

		} catch (
			error
		) {

			console.error(
				"Could not read image:",
				error
			);

		}

	}

	renderImagePreviews();

	el.attachMenu.classList.remove(
		"open"
	);

	el.attachButton.classList.remove(
		"open"
	);

	el.imageInput.value =
		"";

}

function removePendingImage(
	id
) {

	const item =
		document.querySelector(
			`[data-image-id="${id}"]`
		);

	if (
		item
	) {

		item.classList.add(
			"removing"
		);

		playClick();

		setTimeout(
			() => {

				pendingImages =
					pendingImages.filter(
						image =>
							image.id !==
							id
					);

				renderImagePreviews();

			},
			220
		);

		return;

	}

	playClick();

	pendingImages =
		pendingImages.filter(
			image =>
				image.id !==
				id
		);

	renderImagePreviews();

}

function renderImagePreviews() {

	if (
		!pendingImages.length
	) {

		el.attachmentStrip.innerHTML =
			"";

		el.attachmentStrip.classList.add(
			"hidden"
		);

		return;

	}

	el.attachmentStrip.classList.remove(
		"hidden"
	);

	el.attachmentStrip.innerHTML =
		"";

	pendingImages.forEach(
		image => {

			const item =
				document.createElement(
					"div"
				);

			item.className =
				"attachment-item";

			item.dataset.imageId =
				image.id;

			const img =
				document.createElement(
					"img"
				);

			img.src =
				image.dataUrl;

			img.alt =
				image.name ||
				"Attached image";

			const remove =
				document.createElement(
					"button"
				);

			remove.type =
				"button";

			remove.className =
				"attachment-remove";

			remove.textContent =
				"×";

			remove.title =
				"Remove image";

			remove.addEventListener(
				"click",
				event => {

					event.stopPropagation();

					removePendingImage(
						image.id
					);

				}
			);

			const name =
				document.createElement(
					"div"
				);

			name.className =
				"attachment-name";

			name.textContent =
				image.name ||
				"image";

			item.appendChild(
				img
			);

			item.appendChild(
				remove
			);

			item.appendChild(
				name
			);

			el.attachmentStrip.appendChild(
				item
			);

		}
	);

}

function makeFileId() {

	return (

		Date.now().toString(
			36
		)
		+
		Math.random()
			.toString(
				36
			)
			.slice(
				2
			)

	);

}

function getFileTypeName(
	name,
	type
) {

	const lower =
		String(
			name ||
			""
		).toLowerCase();

	const map = {

		".docx":
			"DOCX",

		".pptx":
			"PPTX",

		".xlsx":
			"XLSX",

		".py":
			"Python",

		".lua":
			"Lua",

		".html":
			"HTML",

		".htm":
			"HTML",

		".js":
			"JavaScript",

		".mjs":
			"JavaScript",

		".cjs":
			"JavaScript",

		".ts":
			"TypeScript",

		".tsx":
			"TypeScript",

		".css":
			"CSS",

		".json":
			"JSON",

		".xml":
			"XML",

		".svg":
			"SVG",

		".sql":
			"SQL",

		".md":
			"Markdown",

		".markdown":
			"Markdown",

		".txt":
			"TXT",

		".log":
			"LOG",

		".csv":
			"CSV",

		".tsv":
			"TSV",

		".c":
			"C",

		".h":
			"C Header",

		".cpp":
			"C++",

		".cc":
			"C++",

		".cxx":
			"C++",

		".hpp":
			"C++ Header",

		".java":
			"Java",

		".cs":
			"C#",

		".rs":
			"Rust",

		".go":
			"Go",

		".rb":
			"Ruby",

		".php":
			"PHP",

		".sh":
			"Shell",

		".bat":
			"Batch",

		".cmd":
			"Batch",

		".ps1":
			"PowerShell",

		".yaml":
			"YAML",

		".yml":
			"YAML",

		".ini":
			"INI",

		".toml":
			"TOML",

		".tex":
			"LaTeX",

		".jsx":
			"JavaScript",

		".dart":
			"Dart",

		".swift":
			"Swift",

		".kt":
			"Kotlin",

		".kts":
			"Kotlin",

		".zig":
			"Zig",

		".asm":
			"Assembly",

		".s":
			"Assembly"

	};

	for (
		const extension
		of Object.keys(
			map
		)
	) {

		if (
			lower.endsWith(
				extension
			)
		) {

			return map[
				extension
			];

		}

	}

	if (
		type &&
		type.startsWith(
			"image/"
		)
	) {

		return type
			.split(
				"/"
			)[1]
			.toUpperCase();

	}

	return "File";

}

function readFileDataUrl(
	file
) {

	return new Promise(
		(
			resolve,
			reject
		) => {

			const reader =
				new FileReader();

			reader.onload =
				() => {

					resolve(
						reader.result
					);

				};

			reader.onerror =
				() => {

					reject(
						reader.error
					);

				};

			reader.readAsDataURL(
				file
			);

		}
	);

}

async function addFileFiles(
	files
) {

	const fileArray =
		Array.from(
			files || []
		);

	if (
		!fileArray.length
	) {

		return;

	}

	playClick();

	for (
		const file
		of fileArray
	) {

		try {

			const dataUrl =
				await readFileDataUrl(
					file
				);

			pendingFiles.push({

				id:
					makeFileId(),

				name:
					file.name,

				type:
					file.type,

				size:
					file.size,

				dataUrl:
					dataUrl,

				fileType:
					getFileTypeName(
						file.name,
						file.type
					)

			});

		} catch (
			error
		) {

			console.error(
				"Could not read file:",
				error
			);

		}

	}

	renderFilePreviews();

	el.attachMenu.classList.remove(
		"open"
	);

	el.attachButton.classList.remove(
		"open"
	);

	el.fileInput.value =
		"";

}

function addFilesFromDataTransfer(
	files
) {

	const fileArray =
		Array.from(
			files || []
		);

	if (
		!fileArray.length
	) {

		return;

	}

	const imageFiles =
		fileArray.filter(
			file =>
				file.type &&
				file.type.startsWith(
					"image/"
				)
		);

	const otherFiles =
		fileArray.filter(
			file =>
				!(
					file.type &&
					file.type.startsWith(
						"image/"
					)
				)
		);

	if (
		imageFiles.length
	) {

		addImageFiles(
			imageFiles
		);

	}

	if (
		otherFiles.length
	) {

		addFileFiles(
			otherFiles
		);

	}

}

const dropTargets = [
	el.input,
	el.input.parentElement
];

dropTargets.forEach(
	target => {

		if (
			!target
		) {

			return;

		}

		target.addEventListener(
			"dragover",
			event => {

				event.preventDefault();

				event.stopPropagation();

				if (
					event.dataTransfer
				) {

					event.dataTransfer.dropEffect =
						"copy";

				}

			}
		);

		target.addEventListener(
			"dragenter",
			event => {

				event.preventDefault();

				event.stopPropagation();

			}
		);

		target.addEventListener(
			"dragleave",
			event => {

				event.preventDefault();

				event.stopPropagation();

			}
		);

		target.addEventListener(
			"drop",
			event => {

				event.preventDefault();

				event.stopPropagation();

				const files =
					event.dataTransfer &&
					event.dataTransfer.files;

				if (
					files &&
					files.length
				) {

					addFilesFromDataTransfer(
						files
					);

				}

			}
		);

	}
);

el.input.addEventListener(
	"paste",
	event => {

		const files =
			event.clipboardData &&
			event.clipboardData.files;

		if (
			files &&
			files.length
		) {

			event.preventDefault();

			addFilesFromDataTransfer(
				files
			);

		}

	}
);

function removePendingFile(
	id
) {

	const item =
		document.querySelector(
			`[data-file-id="${id}"]`
		);

	if (
		item
	) {

		item.classList.add(
			"removing"
		);

		playClick();

		setTimeout(
			() => {

				pendingFiles =
					pendingFiles.filter(
						file =>
							file.id !==
							id
					);

				renderFilePreviews();

			},
			220
		);

		return;

	}

	playClick();

	pendingFiles =
		pendingFiles.filter(
			file =>
				file.id !==
				id
		);

	renderFilePreviews();

}

function renderFilePreviews() {

	if (
		!pendingFiles.length
	) {

		el.fileAttachmentStrip.style.display =
			"none";

		el.fileAttachmentStrip.innerHTML =
			"";

		return;

	}

	el.fileAttachmentStrip.style.display =
		"flex";

	el.fileAttachmentStrip.innerHTML =
		"";

	pendingFiles.forEach(
		file => {

			const item =
				document.createElement(
					"div"
				);

			item.className =
				"file-attachment";

			item.dataset.fileId =
				file.id;

			const icon =
				document.createElement(
					"div"
				);

			icon.className =
				"file-attachment-icon";

			icon.textContent =
				getFileTypeShortName(
					file.fileType
				);

			const info =
				document.createElement(
					"div"
				);

			info.className =
				"file-attachment-info";

			const name =
				document.createElement(
					"div"
				);

			name.className =
				"file-attachment-name";

			name.textContent =
				file.name;

			const type =
				document.createElement(
					"div"
				);

			type.className =
				"file-attachment-type";

			type.textContent =
				file.fileType;

			const remove =
				document.createElement(
					"button"
				);

			remove.type =
				"button";

			remove.className =
				"attachment-remove";

			remove.textContent =
				"×";

			remove.title =
				"Remove file";

			remove.addEventListener(
				"click",
				event => {

					event.stopPropagation();

					removePendingFile(
						file.id
					);

				}
			);

			info.appendChild(
				name
			);

			info.appendChild(
				type
			);

			item.appendChild(
				icon
			);

			item.appendChild(
				info
			);

			item.appendChild(
				remove
			);

			el.fileAttachmentStrip.appendChild(
				item
			);

		}
	);

}

function getFileTypeShortName(
	type
) {

	const value =
		String(
			type ||
			"FILE"
		);

	if (
		value ===
		"JavaScript"
	) {

		return "JS";

	}

	if (
		value ===
		"TypeScript"
	) {

		return "TS";

	}

	if (
		value ===
		"PowerShell"
	) {

		return "PS";

	}

	if (
		value ===
		"Markdown"
	) {

		return "MD";

	}

	if (
		value.length >
		5
	) {

		return value
			.slice(
				0,
				5
			)
			.toUpperCase();

	}

	return value.toUpperCase();

}

function cloneFilesForStorage(
	files
) {

	if (
		!Array.isArray(
			files
		)
	) {

		return [];

	}

	return files.map(
		file => ({

			id:
				file.id ||
				makeFileId(),

			name:
				file.name ||
				"file",

			type:
				file.type ||
				"",

			size:
				file.size ||
				0,

			fileType:
				file.fileType ||
				getFileTypeName(
					file.name,
					file.type
				),

			dataUrl:
				file.dataUrl ||
				""

		})
	);

}

function loadState() {

	try {

		const raw =
			localStorage.getItem(
				STORAGE_KEY
			);

		if (
			!raw
		) {

			return {

				params:
					{
						...PRESET_PARAMS.default
					},

				conversation:
					[],

				preset:
					"default"

			};

		}

		const parsed =
			JSON.parse(
				raw
			);

		return {

			params:
				{
					...PRESET_PARAMS.default
				},

			conversation:
				Array.isArray(
					parsed.conversation
				)
					? parsed.conversation
					: [],

			preset:
				"default"

		};

	} catch {

		return {

			params:
				{
					...PRESET_PARAMS.default
				},

			conversation:
				[],

			preset:
				"default"

		};

	}

}

function saveState() {

	try {

		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify(
				state
			)
		);

	} catch (
		error
	) {

		console.error(
			"Could not save Greg state:",
			error
		);

	}

}

function sleep(
	ms
) {

	return new Promise(
		resolve =>
			setTimeout(
				resolve,
				ms
			)
	);

}

function resizeInput() {

	el.input.style.height =
		"auto";

	el.input.style.height =
		Math.min(
			el.input.scrollHeight,
			190
		)
		+
		"px";

}

/* ========================================================
   CHAT SCROLL
   ======================================================== */

let userIsAtBottom =
	true;

function updateScrollState() {

	if (
		!el.messages
	) {

		return;

	}

	const distanceFromBottom =
		el.messages.scrollHeight
		-
		el.messages.scrollTop
		-
		el.messages.clientHeight;

	userIsAtBottom =
		distanceFromBottom <=
		40;

}

function scrollBottom(
	smooth = true,
	force = false
) {

	if (
		!el.messages
	) {

		return;

	}

	if (
		!force &&
		!userIsAtBottom
	) {

		return;

	}

	el.messages.scrollTo({

		top:
			el.messages.scrollHeight,

		behavior:
			smooth
				? "smooth"
				: "auto"

	});

}

if (
	el.messages
) {

	el.messages.addEventListener(
		"scroll",
		updateScrollState
	);

	updateScrollState();

}

/* ========================================================
   IMAGE STORAGE
   ======================================================== */

function cloneImagesForStorage(
	images
) {

	if (
		!Array.isArray(
			images
		)
	) {

		return [];

	}

	return images.map(
		image => ({

			id:
				image.id ||
				makeImageId(),

			name:
				image.name ||
				"image",

			type:
				image.type ||
				"image/*",

			size:
				image.size ||
				0,

			dataUrl:
				image.dataUrl ||
				""

		})
	);

}

function buildWavyText(
	element,
	text,
	startIndex = 0
) {

	const chars =
		Array.from(
			String(text)
		);

	let index =
		startIndex;

	for (
		const char
		of chars
	) {

		if (
			char ===
			"\n"
		) {

			element.appendChild(
				document.createElement(
					"br"
				)
			);

			index +=
				1;

			continue;

		}

		const span =
			document.createElement(
				"span"
			);

		span.className =
			"thinking-label-char";

		span.textContent =
			char;

		const waveDelay =
			index *
			0.06;

		span.style.setProperty(
			"--thinking-delay",
			`${waveDelay}s`
		);

		element.appendChild(
			span
		);

		index +=
			1;

	}

	return index;

}

function appendThinkingText(
	stream,
	text
) {

	if (
		!text
	) {

		return;

	}

	stream.thinkingContent.textContent +=
		text;

	stream.thinkingPanel.classList.add(
		"visible"
	);

	scrollBottom(
		false
	);

}

function startThinkingUI(
	stream
) {

	if (
		stream.thinkingStarted
	) {

		return;

	}

	stream.thinkingStarted =
		true;

	stream.thinkingEnded =
		false;

	stream.thinkingContent.textContent =
		"";

	stream.thinkingLabel.innerHTML =
		"";

	buildWavyText(
		stream.thinkingLabel,
		"Thinking",
		0
	);

	stream.thinkingPanel.classList.remove(
		"closing"
	);

	requestAnimationFrame(
		() => {

			stream.thinkingPanel.classList.add(
				"visible"
			);

		}
	);

	scrollBottom(
		false
	);

}

function finishThinkingUI(
	stream
) {

	if (
		!stream.thinkingStarted ||
		stream.thinkingEnded
	) {

		return;

	}

	stream.thinkingEnded =
		true;

	stream.thinkingPanel.classList.add(
		"closing"
	);

	setTimeout(
		() => {

			if (
				stream.thinkingPanel
			) {

				stream.thinkingPanel.classList.remove(
					"visible"
				);

			}

		},
		420
	);

}

function processThinkingStream(
	chunk,
	parser,
	stream
) {

	if (
		!chunk
	) {

		return;

	}

	stream.thinkingBuffer +=
		chunk;

	while (
		stream.thinkingBuffer.length
	) {

		if (
			!stream.thinkingMode
		) {

			const startIndex =
				stream.thinkingBuffer.indexOf(
					"<think>"
				);

			if (
				startIndex ===
				-1
			) {

				const keepLength =
					"<think>".length -
					1;

				if (
					stream.thinkingBuffer.length <=
					keepLength
				) {

					return;

				}

				const safeLength =
					stream.thinkingBuffer.length -
					keepLength;

				const safeText =
					stream.thinkingBuffer.slice(
						0,
						safeLength
					);

				stream.thinkingBuffer =
					stream.thinkingBuffer.slice(
						safeLength
					);

				if (
					safeText
				) {

					stream.answerText +=
						safeText;

					parser.feed(
						safeText
					);

				}

				continue;

			}

			const answerBeforeThink =
				stream.thinkingBuffer.slice(
					0,
					startIndex
				);

			if (
				answerBeforeThink
			) {

				stream.answerText +=
					answerBeforeThink;

				parser.feed(
					answerBeforeThink
				);

			}

			stream.thinkingBuffer =
				stream.thinkingBuffer.slice(
					startIndex +
					"<think>".length
				);

			stream.thinkingMode =
				true;

			startThinkingUI(
				stream
			);

			continue;

		}

		const endIndex =
			stream.thinkingBuffer.indexOf(
				"</think>"
			);

		if (
			endIndex ===
			-1
		) {

			const keepLength =
				"</think>".length -
				1;

			if (
				stream.thinkingBuffer.length <=
				keepLength
			) {

				return;

			}

			const safeLength =
				stream.thinkingBuffer.length -
				keepLength;

			const thinkingText =
				stream.thinkingBuffer.slice(
					0,
					safeLength
				);

			stream.thinkingBuffer =
				stream.thinkingBuffer.slice(
					safeLength
				);

			appendThinkingText(
				stream,
				thinkingText
			);

			continue;

		}

		const thinkingText =
			stream.thinkingBuffer.slice(
				0,
				endIndex
			);

		if (
			thinkingText
		) {

			appendThinkingText(
				stream,
				thinkingText
			);

		}

		stream.thinkingBuffer =
			stream.thinkingBuffer.slice(
				endIndex +
				"</think>".length
			);

		stream.thinkingMode =
			false;

		finishThinkingUI(
			stream
		);

		continue;

	}

}

function finishThinkingStream(
	parser,
	stream
) {

	if (
		!stream.thinkingBuffer
	) {

		return;

	}

	if (
		stream.thinkingMode
	) {

		appendThinkingText(
			stream,
			stream.thinkingBuffer
		);

		stream.thinkingBuffer =
			"";

		finishThinkingUI(
			stream
		);

		return;

	}

	stream.answerText +=
		stream.thinkingBuffer;

	parser.feed(
		stream.thinkingBuffer
	);

	stream.thinkingBuffer =
	"";

}

function showWelcome() {

	if (
		document.getElementById(
			"welcome"
		)
	) {

		return;

	}

	const welcome =
		document.createElement(
			"div"
		);

	welcome.id =
		"welcome";

	welcome.className =
		"welcome";

	welcome.innerHTML = `

		<div class="welcome-orb">
			G
		</div>

		<h1>
			What can I help you with?
		</h1>

		<p>
			Talk to Greg naturally.
			This is one single continuous chat.
		</p>

		<div class="welcome-suggestions">

			<button
				class="suggestion"
				data-suggestion="Tell me something interesting."
			>

				<div class="suggestion-title">
					Something interesting
				</div>

				<div class="suggestion-text">
					Ask Greg for a random fact or idea.
				</div>

			</button>

			<button
				class="suggestion"
				data-suggestion="Explain how something works."
			>

				<div class="suggestion-title">
					Explain something
				</div>

				<div class="suggestion-text">
					Give Greg a topic and let him explain it.
				</div>

			</button>

			<button
				class="suggestion"
				data-suggestion="Give me a creative idea."
			>

				<div class="suggestion-title">
					Get creative
				</div>

				<div class="suggestion-text">
					Ask for a story, idea, name, or concept.
				</div>

			</button>

			<button
				class="suggestion"
				data-suggestion="Let's have a normal conversation."
			>

				<div class="suggestion-title">
					Just talk
				</div>

				<div class="suggestion-text">
					Start a normal conversation with Greg.
				</div>

			</button>

		</div>

	`;

	el.messages.appendChild(
		welcome
	);

	welcome
		.querySelectorAll(
			".suggestion"
		)
		.forEach(
			button => {

				button.addEventListener(
					"click",
					() => {

						el.input.value =
							button.dataset.suggestion;

						resizeInput();

						el.input.focus();

					}
				);

			}
		);

}

function removeWelcome() {

	const welcome =
		document.getElementById(
			"welcome"
		);

	if (
		welcome &&
		welcome.parentNode
	) {

		welcome.style.transition =
			"opacity .25s ease, transform .25s ease";

		welcome.style.opacity =
			"0";

		welcome.style.transform =
			"translateY(-10px) scale(.98)";

		setTimeout(
			() =>
				welcome.remove(),
			250
		);

	}

}

function addUserMessage(
	text,
	images = [],
	files = []
) {

	removeWelcome();

	const row =
		document.createElement(
			"div"
		);

	row.className =
		"message-row user";

	row.innerHTML = `

		<div class="message-content">

			${
				images.length
					? `
						<div class="sent-image-strip"></div>
					`
					: ""
			}

			${
				files.length
					? `
						<div class="sent-file-strip"></div>
					`
					: ""
			}

			${
				text
					? `
						<div class="message-text"></div>
					`
					: ""
			}

		</div>

		<div class="avatar">
			U
		</div>

	`;

	if (
		images.length
	) {

		const strip =
			row.querySelector(
				".sent-image-strip"
			);

		images.forEach(
			image => {

				const wrapper =
					document.createElement(
						"div"
					);

				wrapper.className =
					"sent-image";

				const img =
					document.createElement(
						"img"
					);

				img.src =
					image.dataUrl;

				img.alt =
					image.name ||
					"Sent image";

				wrapper.appendChild(
					img
				);

				strip.appendChild(
					wrapper
				);

			}
		);

	}

	if (
		files.length
	) {

		const strip =
			row.querySelector(
				".sent-file-strip"
			);

		files.forEach(
			file => {

				const card =
					createFileCard(
						file.name,
						file.fileType ||
						getFileTypeName(
							file.name,
							file.type
						),
						false
					);

				strip.appendChild(
					card
				);

			}
		);

	}

	if (
		text
	) {

		row.querySelector(
			".message-text"
		).textContent =
			text;

	}

	userIsAtBottom =
		true;

	el.messages.appendChild(
		row
	);

	scrollBottom(
		true,
		true
	);

	return row;

}

function createFileCard(
	filename,
	type,
	generated = false,
	downloadData = null
) {

	const card =
		document.createElement(
			"div"
		);

	card.className =
		"file-card"
		+
		(
			generated
				? " generated-file-card"
				: ""
		);

	if (
		generated
	) {

		card.classList.add(
			"generated"
		);

		card.dataset.generatedFile =
			"true";

	}

	const icon =
		document.createElement(
			"div"
		);

	icon.className =
		"file-icon";

	icon.textContent =
		getFileTypeShortName(
			type
		);

	const info =
		document.createElement(
			"div"
		);

	info.className =
		"file-info";

	const name =
		document.createElement(
			"div"
		);

	name.className =
		"file-name";

	name.textContent =
		filename;

	const typeLabel =
		document.createElement(
			"div"
		);

	typeLabel.className =
		"file-type";

	typeLabel.textContent =
		generated
			? (
				type.toUpperCase()
				+
				" · Click to download"
			)
			: type;

	const action =
		document.createElement(
			"div"
		);

	action.className =
		"file-action";

	action.textContent =
		generated
			? "↓"
			: "•";

	info.appendChild(
		name
	);

	info.appendChild(
		typeLabel
	);

	card.appendChild(
		icon
	);

	card.appendChild(
		info
	);

	card.appendChild(
		action
	);

	if (
		generated &&
		downloadData
	) {

		card.addEventListener(
			"click",
			() => {

				playClick();

				card.style.transform =
					"scale(.97)";

				setTimeout(
					() => {

						card.style.transform =
							"";

					},
					120
				);

				downloadGeneratedFile(
					downloadData.data_url,
					downloadData.filename
				);

			}
		);

	}

	return card;

}

function downloadGeneratedFile(
	dataUrl,
	filename
) {

	const link =
		document.createElement(
			"a"
		);

	link.href =
		dataUrl;

	link.download =
		filename;

	link.style.display =
		"none";

	document.body.appendChild(
		link
	);

	link.click();

	link.remove();

}

function addGeneratedFiles(
	files
) {

	if (
		!Array.isArray(
			files
		) ||
		!files.length
	) {

		return;

	}

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

			<div class="sent-file-strip"></div>

		</div>

	`;

	const strip =
		row.querySelector(
			".sent-file-strip"
		);

	files.forEach(
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

	userIsAtBottom =
		true;

	el.messages.appendChild(
		row
	);

	scrollBottom(
		true,
		true
	);

}

function addThinkingMessage() {

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

			<div class="typing-dots">

				<span></span>
				<span></span>
				<span></span>

			</div>

		</div>

	`;

	userIsAtBottom =
		true;

	el.messages.appendChild(
		row
	);

	scrollBottom(
		true,
		true
	);

	return row;

}

function createGregStream() {

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

			<div
				class="thinking-panel"
			>

				<div
					class="thinking-header"
				>

					<span
						class="thinking-dot"
					></span>

					<span
						class="thinking-label"
					>
						Thinking
					</span>

				</div>

				<div
					class="thinking-content"
				></div>

			</div>

			<div
				class="greg-output"
			></div>

			<span
				class="stream-cursor"
			></span>

		</div>

	`;

	userIsAtBottom =
		true;

	el.messages.appendChild(
		row
	);

	scrollBottom(
		true,
		true
	);

	return {

		row:
			row,

		output:
			row.querySelector(
				".greg-output"
			),

		cursor:
			row.querySelector(
				".stream-cursor"
			),

		thinkingPanel:
			row.querySelector(
				".thinking-panel"
			),

		thinkingLabel:
			row.querySelector(
				".thinking-label"
			),

		thinkingContent:
			row.querySelector(
				".thinking-content"
			),

		thinkingBuffer:
			"",

		thinkingMode:
			false,

		thinkingStarted:
			false,

		thinkingEnded:
			false,

		thinkingCharIndex:
			0,

		answerText:
			"",

		metaFound:
			false,

		metaBuffer:
			"",

		metaScanBuffer:
			"",

		imageDescription:
			null,

		imageCount:
			0,

		fileCount:
			0,

		files:
			[],

		generatedFiles:
			[]

	};

}

async function typeText(
	element,
	text,
	delay = 5
) {

	const chars =
		Array.from(
			String(text)
		);

	for (
		let i = 0;
		i < chars.length;
		i++
	) {

		const ch =
			chars[i];

		element.textContent +=
			ch;

		let wait =
			delay;

		if (
			ch ===
			" "
		) {

			wait +=
				10;

		} else if (
			ch ===
			","
		) {

			wait +=
				40;

		} else if (
			ch ===
			"."
		) {

			wait +=
				80;

		} else if (
			ch ===
			"!"
		) {

			wait +=
				90;

		} else if (
			ch ===
			"?"
		) {

			wait +=
				90;

		} else if (
			ch ===
			"\n"
		) {

			wait +=
				120;

		}

		await sleep(
			wait
		);

	}

}

function createCodeBlock(
	language
) {

	const shell =
		document.createElement(
			"div"
		);

	shell.className =
		"code-block-shell";

	const inner =
		document.createElement(
			"div"
		);

	inner.className =
		"code-block-inner";

	const block =
		document.createElement(
			"div"
		);

	block.className =
		"code-block live";

	const header =
		document.createElement(
			"div"
		);

	header.className =
		"code-header";

	const languageLabel =
		document.createElement(
			"span"
		);

	languageLabel.className =
		"code-language";

	languageLabel.textContent =
		language ||
		"code";

	const copyButton =
		document.createElement(
			"button"
		);

	copyButton.className =
		"code-copy";

	copyButton.type =
		"button";

	copyButton.textContent =
		"Copy";

	const codeContent =
		document.createElement(
			"div"
		);

	codeContent.className =
		"code-content";

	codeContent.textContent =
		"";

	copyButton.addEventListener(
		"click",
		async event => {

			event.stopPropagation();

			playClick();

			try {

				await navigator.clipboard.writeText(
					codeContent.textContent
				);

				copyButton.textContent =
					"Copied!";

				setTimeout(
					() =>
						copyButton.textContent =
							"Copy",
					1200
				);

			} catch {

				copyButton.textContent =
					"Copy failed";

				setTimeout(
					() =>
						copyButton.textContent =
							"Copy",
					1200
				);

			}

		}
	);

	header.appendChild(
		languageLabel
	);

	header.appendChild(
		copyButton
	);

	block.appendChild(
		header
	);

	block.appendChild(
		codeContent
	);

	inner.appendChild(
		block
	);

	shell.appendChild(
		inner
	);

	requestAnimationFrame(
		() => {

			requestAnimationFrame(
				() => {

					shell.classList.add(
						"open"
					);

				}
			);

		}
	);

	return {

		shell,
		block,
		codeContent,
		languageLabel

	};

}

class OrderedRenderer {

	constructor(
		stream
	) {

		this.stream =
			stream;

		this.queue =
			[];

		this.running =
			false;

		this.finished =
			false;

		this.waiter =
			null;

		this.code =
			null;

		this.textElement =
			null;

	}

	enqueue(
		operation
	) {

		this.queue.push(
			operation
		);

		this.wake();

		this.run();

	}

	wake() {

		if (
			this.waiter
		) {

			const resolve =
				this.waiter;

			this.waiter =
				null;

			resolve();

		}

	}

	async waitForQueue() {

		if (
			this.queue.length
		) {

			return;

		}

		if (
			this.finished
		) {

			return;

		}

		await new Promise(
			resolve => {

				this.waiter =
					resolve;

			}
		);

	}

	async run() {

		if (
			this.running
		) {

			return;

		}

		this.running =
			true;

		try {

			while (
				!this.finished ||
				this.queue.length
			) {

				if (
					!this.queue.length
				) {

					await this.waitForQueue();

					continue;

				}

				const operation =
					this.queue.shift();

				await this.renderOperation(
					operation
				);

			}

		} finally {

			this.running =
				false;

		}

	}

	async renderOperation(
		operation
	) {

		if (
			operation.type ===
			"text"
		) {

			await this.renderText(
				operation.text
			);

			return;

		}

		if (
			operation.type ===
			"code-open"
		) {

			await this.renderCodeOpen(
				operation.language
			);

			return;

		}

		if (
			operation.type ===
			"code-text"
		) {

			this.renderCodeText(
				operation.text
			);

			return;

		}

		if (
			operation.type ===
			"code-close"
		) {

			this.renderCodeClose();

		}

	}

	async renderText(
		text
	) {

		if (
			!text
		) {

			return;

		}

		const span =
			document.createElement(
				"span"
			);

		span.className =
			"message-text";

		this.stream.output.appendChild(
			span
		);

		this.textElement =
			span;

		await typeText(
			span,
			text,
			25
		);

		scrollBottom(
			false
		);

	}

	async renderCodeOpen(
		language
	) {

		const code =
			createCodeBlock(
				language
			);

		this.stream.output.appendChild(
			code.shell
		);

		this.code =
			code;

		scrollBottom(
			false
		);

		await sleep(
			30
		);

	}

	renderCodeText(
		text
	) {

		if (
			!this.code ||
			!text
		) {

			return;

		}

		this.code.codeContent.textContent +=
			text;

		scrollBottom(
			false
		);

	}

	renderCodeClose() {

		if (
			!this.code
		) {

			return;

		}

		this.code.block.classList.remove(
			"live"
		);

		this.code =
			null;

		scrollBottom(
			false
		);

	}

	async finish() {

		this.finished =
			true;

		this.wake();

		while (
			this.running ||
			this.queue.length
		) {

			await sleep(
				10
			);

		}

	}

}

class StreamParser {

	constructor(
		renderer
	) {

		this.renderer =
			renderer;

		this.mode =
			"text";

		this.pending =
			"";

		this.finished =
			false;

	}

	feed(
		incoming
	) {

		if (
			!incoming ||
			this.finished
		) {

			return;

		}

		this.pending +=
			incoming;

		this.process();

	}

	process() {

		while (
			this.pending.length
		) {

			if (
				this.mode ===
				"text"
			) {

				const markerIndex =
					this.pending.indexOf(
						"```"
					);

				if (
					markerIndex ===
					-1
				) {

					if (
						this.pending.length <=
						2
					) {

						return;

					}

					const safeText =
						this.pending.slice(
							0,
							this.pending.length -
							2
						);

					this.pending =
						this.pending.slice(
							-2
						);

					this.renderer.enqueue({

						type:
							"text",

						text:
							safeText

					});

					continue;

				}

				const textBefore =
					this.pending.slice(
						0,
						markerIndex
					);

				if (
					textBefore
				) {

					this.renderer.enqueue({

						type:
							"text",

						text:
							textBefore

					});

				}

				this.pending =
					this.pending.slice(
						markerIndex +
						3
					);

				this.mode =
					"language";

				continue;

			}

			if (
				this.mode ===
				"language"
			) {

				const newlineIndex =
					this.pending.indexOf(
						"\n"
					);

				if (
					newlineIndex ===
					-1
				) {

					return;

				}

				const language =
					this.pending
						.slice(
							0,
							newlineIndex
						)
						.trim();

				this.pending =
					this.pending.slice(
						newlineIndex +
						1
					);

				this.renderer.enqueue({

					type:
						"code-open",

					language:
						language ||
						"code"

				});

				this.mode =
					"code";

				continue;

			}

			if (
				this.mode ===
				"code"
			) {

				const markerIndex =
					this.pending.indexOf(
						"```"
					);

				if (
					markerIndex ===
					-1
				) {

					if (
						this.pending.length <=
						2
					) {

						return;

					}

					const safeCode =
						this.pending.slice(
							0,
							this.pending.length -
							2
						);

					this.pending =
						this.pending.slice(
							-2
						);

					this.renderer.enqueue({

						type:
							"code-text",

						text:
							safeCode

					});

					continue;

				}

				const codeBefore =
					this.pending.slice(
						0,
						markerIndex
					);

				if (
					codeBefore
				) {

					this.renderer.enqueue({

						type:
							"code-text",

						text:
							codeBefore

					});

				}

				this.pending =
					this.pending.slice(
						markerIndex +
						3
					);

				this.renderer.enqueue({

					type:
						"code-close"

				});

				this.mode =
					"text";

				continue;

			}

		}

	}

	finish() {

		if (
			this.finished
		) {

			return;

		}

		if (
			this.pending
		) {

			if (
				this.mode ===
				"text"
			) {

				this.renderer.enqueue({

					type:
						"text",

					text:
						this.pending

				});

			} else if (
				this.mode ===
				"code"
			) {

				this.renderer.enqueue({

					type:
						"code-text",

					text:
						this.pending

				});

			} else if (
				this.mode ===
				"language"
			) {

				this.renderer.enqueue({

					type:
						"text",

					text:
						"```" +
						this.pending

				});

			}

		}

		this.pending =
			"";

		this.finished =
			true;

	}

}

function processStreamChunkWithMetadata(
	chunk,
	parser,
	stream
) {

	if (
		!chunk
	) {

		return;

	}

	if (
		stream.metaFound
	) {

		stream.metaBuffer +=
			chunk;

		return;

	}

	stream.metaScanBuffer +=
		chunk;

	const markerIndex =
		stream.metaScanBuffer.indexOf(
			META_MARKER
		);

	if (
		markerIndex ===
		-1
	) {

		const keepLength =
			META_MARKER.length -
			1;

		if (
			stream.metaScanBuffer.length <=
			keepLength
		) {

			return;

		}

		const safeLength =
			stream.metaScanBuffer.length -
			keepLength;

		const safeText =
			stream.metaScanBuffer.slice(
				0,
				safeLength
			);

		stream.metaScanBuffer =
			stream.metaScanBuffer.slice(
				safeLength
			);

		processThinkingStream(
			safeText,
			parser,
			stream
		);

		return;

	}

	const answerBeforeMetadata =
		stream.metaScanBuffer.slice(
			0,
			markerIndex
		);

	if (
		answerBeforeMetadata
	) {

		processThinkingStream(
			answerBeforeMetadata,
			parser,
			stream
		);

	}

	stream.metaFound =
		true;

	stream.metaBuffer =
		stream.metaScanBuffer.slice(
			markerIndex +
			META_MARKER.length
		);

	stream.metaScanBuffer =
		"";

}

function finishStreamMetadata(
	parser,
	stream
) {

	if (
		!stream.metaFound
	) {

		if (
			stream.metaScanBuffer
		) {

			processThinkingStream(
				stream.metaScanBuffer,
				parser,
				stream
			);

		}

		stream.metaScanBuffer =
			"";

		return;

	}

	try {

		const metadata =
			JSON.parse(
				stream.metaBuffer.trim()
			);

		if (
			metadata &&
			typeof metadata ===
			"object"
		) {

			stream.imageDescription =
				typeof metadata.image_description ===
				"string"

					? metadata.image_description.trim()

					: null;

			stream.imageCount =
				Number(
					metadata.image_count ||
					0
				);

			stream.fileCount =
				Number(
					metadata.file_count ||
					0
				);

			stream.files =
				Array.isArray(
					metadata.files
				)
					? metadata.files
					: [];

			stream.generatedFiles =
				Array.isArray(
					metadata.generated_files
				)
					? metadata.generated_files
					: [];

		}

	} catch (
		error
	) {

		console.error(
			"Could not parse Greg metadata:",
			error
		);

	}

}

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
							"\n[Visual information from "
							+
							"images attached to this earlier "
							+
							"message:]\n"
							+
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
							"\n[Files attached to this earlier "
							+
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
				stream.generatedFiles

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

function createStaticCodeBlock(
	language,
	code
) {

	const codeBlock =
		createCodeBlock(
			language
		);

	codeBlock.shell.classList.add(
		"open"
	);

	codeBlock.block.classList.remove(
		"live"
	);

	codeBlock.codeContent.textContent =
		code;

	return codeBlock.shell;

}

function renderStaticMessage(
	container,
	text
) {

	let cursor =
		0;

	while (
		cursor <
		text.length
	) {

		const start =
			text.indexOf(
				"```",
				cursor
			);

		if (
			start ===
			-1
		) {

			const normal =
				text.slice(
					cursor
				);

			if (
				normal
			) {

				const span =
					document.createElement(
						"span"
					);

				span.className =
					"message-text";

				span.textContent =
					normal;

				container.appendChild(
					span
				);

			}

			break;

		}

		if (
			start >
			cursor
		) {

			const normal =
				text.slice(
					cursor,
					start
				);

			const span =
				document.createElement(
					"span"
				);

			span.className =
				"message-text";

			span.textContent =
				normal;

			container.appendChild(
				span
			);

		}

		const languageStart =
			start +
			3;

		const languageEnd =
			text.indexOf(
				"\n",
				languageStart
			);

		if (
			languageEnd ===
			-1
		) {

			const literal =
				document.createElement(
					"span"
				);

			literal.className =
				"message-text";

			literal.textContent =
				text.slice(
					start
				);

			container.appendChild(
				literal
			);

			break;

		}

		const language =
			text.slice(
				languageStart,
				languageEnd
			).trim();

		const codeEnd =
			text.indexOf(
				"```",
				languageEnd +
				1
			);

		if (
			codeEnd ===
			-1
		) {

			container.appendChild(

				createStaticCodeBlock(

					language ||
					"code",

					text.slice(
						languageEnd +
						1
					)

				)

			);

			break;

		}

		const code =
			text.slice(

				languageEnd +
				1,

				codeEnd

			);

		container.appendChild(

			createStaticCodeBlock(

				language ||
				"code",

				code

			)

		);

		cursor =
			codeEnd +
			3;

	}

}

function addStaticGregMessage(
	text,
	generatedFiles = []
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

function updateUI() {

	el.statusLine.textContent =
		connected
			? "Greg API connected"
			: "API offline";

	el.orb.classList.toggle(
		"online",
		connected
	);

	el.sendBtn.disabled =
		isSending;

	el.input.disabled =
		false;

	if (
		isSending
	) {

		el.memoryHint.textContent =
			"Greg is generating...";

	} else if (
		connected
	) {

		el.memoryHint.textContent =
			`Preset: ${
				activePreset
					.charAt(0)
					.toUpperCase()
				+
				activePreset.slice(1)
			}`;

	} else {

		el.memoryHint.textContent =
			"Waiting for connection";

	}

}

async function testApi() {

	el.testBtn.disabled =
		true;

	const oldHint =
		el.memoryHint.textContent;

	el.memoryHint.textContent =
		"Testing connection...";

	try {

		const response =
			await fetch(
				`${API_URL}/chat`,
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
								"ping",

							params:
								{

									max_new_tokens:
										1,

									temperature:
										0.01,

									top_p:
										0.01,

									top_k:
										1,

									repetition_penalty:
										1,

									no_repeat_ngram_size:
										0

								}

						})

				}
			);

		if (
			!response.ok
		) {

			throw new Error(
				`HTTP ${response.status}`
			);

		}

		connected =
			true;

	} catch (
		error
	) {

		console.error(
			error
		);

		connected =
			false;

	} finally {

		el.testBtn.disabled =
			false;

		if (
			!isSending
		) {

			el.memoryHint.textContent =
				connected
					? `Preset: ${
						activePreset
							.charAt(0)
							.toUpperCase()
						+
						activePreset.slice(1)
					}`
					: oldHint;

		}

		updateUI();

	}

}

async function sendMessage() {

	const text =
		el.input.value.trim();

	if (

		(
			!text &&
			!pendingImages.length &&
			!pendingFiles.length
		)

		||

		isSending

	) {

		return;

	}

	removeWelcome();

	const imagesForMessage =
		cloneImagesForStorage(
			pendingImages
		);

	const filesForMessage =
		cloneFilesForStorage(
			pendingFiles
		);

	el.input.value =
		"";

	resizeInput();

	addUserMessage(
		text,
		imagesForMessage,
		filesForMessage
	);

	pendingImages =
		[];

	pendingFiles =
		[];

	renderImagePreviews();

	renderFilePreviews();

	isSending =
		true;

	updateUI();

	saveState();

	const thinking =
		addThinkingMessage();

	try {

		await sleep(
			180
		);

		if (
			thinking &&
			thinking.parentNode
		) {

			thinking.remove();

		}

		const result =
			await streamMessage(
				text,
				imagesForMessage,
				filesForMessage
			);

		state.conversation.push({

			role:
				"user",

			content:
				text,

			images:
				imagesForMessage,

			files:
				filesForMessage.map(
					file => ({

						id:
							file.id,

						name:
							file.name,

						type:
							file.type,

						size:
							file.size,

						fileType:
							file.fileType,

						dataUrl:
							file.dataUrl

					})
				),

			imageDescription:
				result.imageDescription ||
				null

		});

		state.conversation.push({

			role:
				"assistant",

			content:
				result.answer,

			images:
				[],

			files:
				[],

			imageDescription:
				null,

			generatedFiles:
				result.generatedFiles ||
				[]

		});

		state.conversation =
			state.conversation.slice(
				-80
			);

		saveState();

		connected =
			true;

	} catch (
		error
	) {

		console.error(
			error
		);

		if (
			thinking &&
			thinking.parentNode
		) {

			thinking.remove();

		}

		connected =
			false;

		const errorMessage =
			error &&
			error.name ===
			"AbortError"

				? "Request timed out."

				: "Uh Oh! Server is having problems";

		addStaticGregMessage(
			errorMessage
		);

	} finally {

		isSending =
			false;

		updateUI();

		el.input.focus();

	}

}

function updatePresetUI() {

	const labels = {

		default:
			"Default",

		fast:
			"Fast",

		smart:
			"Smart"

	};

	el.presetButtonText.textContent =
		labels[
			activePreset
		]
		||
		"Default";

	document
		.querySelectorAll(
			".preset-option"
		)
		.forEach(
			button => {

				const active =
					button.dataset.preset ===
					activePreset;

				button.classList.toggle(
					"active",
					active
				);

				const check =
					button.querySelector(
						".preset-check"
					);

				if (
					check
				) {

					check.textContent =
						active
							? "✓"
							: "";

				}

			}
		);

}

function setPreset(
	preset
) {

	if (
		!PRESET_PARAMS[preset]
	) {

		preset =
			"default";

	}

	activePreset =
		preset;

	state.preset =
		preset;

	state.params =
		{
			...PRESET_PARAMS[preset]
		};

	saveState();

	updatePresetUI();

	el.presetMenu.classList.remove(
		"open"
	);

	el.memoryHint.textContent =
		`Preset: ${
			preset
				.charAt(0)
				.toUpperCase()
			+
			preset.slice(1)
		}`;

}

el.attachButton.addEventListener(
	"click",
	event => {

		event.stopPropagation();

		el.attachMenu.classList.toggle(
			"open"
		);

		el.attachButton.classList.toggle(
			"open"
		);

		el.presetMenu.classList.remove(
			"open"
		);

	}
);

el.uploadImageOption.addEventListener(
	"click",
	() => {

		el.imageInput.click();

	}
);

el.uploadFileOption.addEventListener(
	"click",
	() => {

		el.fileInput.click();

	}
);

el.imageInput.addEventListener(
	"change",
	event => {

		addImageFiles(
			event.target.files
		);

	}
);

el.fileInput.addEventListener(
	"change",
	event => {

		addFileFiles(
			event.target.files
		);

	}
);

el.presetButton.addEventListener(
	"click",
	event => {

		event.stopPropagation();

		el.presetMenu.classList.toggle(
			"open"
		);

		el.attachMenu.classList.remove(
			"open"
		);

		el.attachButton.classList.remove(
			"open"
		);

	}
);

document.addEventListener(
	"click",
	event => {

		if (
			!el.presetMenu.contains(
				event.target
			) &&
			event.target !==
			el.presetButton
		) {

			el.presetMenu.classList.remove(
				"open"
			);

		}

		if (
			!el.attachMenu.contains(
				event.target
			) &&
			event.target !==
			el.attachButton
		) {

			el.attachMenu.classList.remove(
				"open"
			);

			el.attachButton.classList.remove(
				"open"
			);

		}

	}
);

document
	.querySelectorAll(
		".preset-option"
	)
	.forEach(
		button => {

			button.addEventListener(
				"click",
				() =>
					setPreset(
						button.dataset.preset
					)
			);

		}
	);

activePreset =
	"default";

state.preset =
	"default";

state.params =
	{
		...PRESET_PARAMS.default
	};

updatePresetUI();

function clearChat() {

	if (
		!confirm(
			"Clear this single chat?"
		)
	) {

		return;

	}

	state.conversation =
		[];

	saveState();

	pendingImages =
		[];

	pendingFiles =
		[];

	renderImagePreviews();

	renderFilePreviews();

	userIsAtBottom =
		true;

	el.messages.innerHTML =
		"";

	showWelcome();

	scrollBottom(
		false,
		true
	);

	el.input.focus();

}

function exportChat() {

	const blob =
		new Blob(

			[
				JSON.stringify(
					state,
					null,
					2
				)
			],

			{
				type:
					"application/json"
			}

		);

	const url =
		URL.createObjectURL(
			blob
		);

	const a =
		document.createElement(
			"a"
		);

	a.href =
		url;

	a.download =
		"greg_chat_state.json";

	document.body.appendChild(
		a
	);

	a.click();

	a.remove();

	URL.revokeObjectURL(
		url
	);

}

function replayConversation() {

	userIsAtBottom =
		true;

	el.messages.innerHTML =
		"";

	if (
		state.conversation.length ===
		0
	) {

		showWelcome();

		return;

	}

	for (
		const item
		of state.conversation
	) {

		if (
			item.role ===
			"user"
		) {

			const storedFiles =
				Array.isArray(
					item.files
				)
					? item.files
					: [];

			addUserMessage(

				item.content ||
				"",

				Array.isArray(
					item.images
				)
					? item.images
					: [],

				storedFiles

			);

		} else if (
			item.role ===
			"assistant"
		) {

			addStaticGregMessage(

				item.content ||
				"",

				Array.isArray(
					item.generatedFiles
				)
					? item.generatedFiles
					: []

			);

		}

	}

	userIsAtBottom =
		true;

	scrollBottom(
		false,
		true
	);

}

el.input.addEventListener(
	"input",
	resizeInput
);

el.input.addEventListener(
	"keydown",
	event => {

		if (
			event.key ===
			"Enter" &&
			!event.shiftKey
		) {

			event.preventDefault();

			sendMessage();

		}

	}
);

el.sendBtn.addEventListener(
	"click",
	sendMessage
);

el.testBtn.addEventListener(
	"click",
	testApi
);

el.clearBtn.addEventListener(
	"click",
	clearChat
);

el.exportBtn.addEventListener(
	"click",
	exportChat
);

replayConversation();

updateUI();

resizeInput();

renderImagePreviews();

renderFilePreviews();

showHome();

setTimeout(
	testApi,
	500
);

setTimeout(
	() => {

		if (
			el.input &&
			el.chatScreen &&
			el.chatScreen.style.display !==
			"none"
		) {

			el.input.focus();

		}

	},
	700
);

function startHomeTitleWave() {

	const title =
		document.querySelector(
			".home-title"
		);

	if (
		!title
	) {

		return;

	}

	const chars =
		Array.from(
			title.querySelectorAll(
				"span"
			)
		);

	const startTime =
		performance.now();

	function animate(
		time
	) {

		const elapsed =
			(
				time -
				startTime
			) /
			1000;

		chars.forEach(
			(
				char,
				index
			) => {

				const offset =
					index *
					0.22;

				const y =
					Math.sin(
						elapsed *
						2.8
						-
						offset
					) *
					10;

				const rotation =
					Math.sin(
						elapsed *
						2.8
						-
						offset
					) *
					1.5;

				char.style.transform =
					`translateY(${y}px) rotate(${rotation}deg)`;

			}
		);

		requestAnimationFrame(
			animate
		);

	}

	requestAnimationFrame(
		animate
	);

}

startHomeTitleWave();