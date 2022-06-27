const windowResponse = window.matchMedia('(max-width: 500px)'),
	menubar = document.querySelector('.menu'),
	toggler = document.querySelector('.menu-option'),
	bookmarkBtn = document.querySelector('button.bookmark');

toggler.addEventListener('click', () => {
	if (!toggler.classList.contains('active')) {
		menubar.classList.add('active');
		toggler.classList.add('active');
		toggler
			.querySelector('img')
			.setAttribute('src', 'images/icon-close-menu.svg');
	} else {
		toggler.classList.remove('active');
		toggler
			.querySelector('img')
			.setAttribute('src', 'images/icon-hamburger.svg');
		menubar.classList.remove('active');
	}
});
bookmarkBtn.addEventListener('click', () => {
	console.log(this);
	if (bookmarkBtn.querySelector('img').dataset.image == 'one') {
		bookmarkBtn.querySelector('img').src = 'images/icon-bookmarked.svg';
		bookmarkBtn.style.color = 'hsl(176, 50%, 47%)';
		bookmarkBtn.querySelector('img').dataset.image = 'two';
	} else {
		bookmarkBtn.querySelector('img').src = 'images/icon-bookmark.svg';
		bookmarkBtn.style.color = 'gray';
		bookmarkBtn.querySelector('img').dataset.image = 'one';
	}
});
function response(e) {
	if (e.matches) {
	} else {
	}
}

response(windowResponse);
windowResponse.onchange = response;

// SELECTING PLEDGES
function openSelection(toSelect) {
	toSelect.querySelector('form').classList.remove('hidden-input');
	toSelect.querySelector('.select div').style.display = 'block';
	toSelect.querySelector('.name').style.color = 'hsl(176, 50%, 47%)';
}
const pledgeBoxes = document.querySelectorAll(
	'#back-this-project [class^="block"]'
);

pledgeBoxes.forEach((plgBox) => {
	plgBox.querySelector('.select div').style.display = 'none';
	plgBox.addEventListener('click', () => {
		const selectionModal = document.querySelector('#back-this-project');
		selectionModal
			.querySelectorAll('form')
			.forEach((x) => (x.className = 'hidden-input'));
		selectionModal
			.querySelectorAll('.select > div')
			.forEach((x) => (x.style.display = 'none'));
		selectionModal
			.querySelectorAll('.name')
			.forEach((x) => (x.style.color = '#1a1a1a'));
		openSelection(plgBox);
	});
});

//OPENING MODALS
const scrollBarWidth = window.innerWidth - document.body.offsetWidth,
	selectionModal = document.querySelector('#back-this-project'),
	Modal1 = document.querySelector('.overlay-1');

function openModal1(selected, toOpen) {
	Modal1.style.display = 'block';
	document.body.style.margin = '0px ' + scrollBarWidth + 'px 0px 0px';
	document.body.style.overflow = 'hidden';
	openSelection(selectionModal.querySelector(`[data-select="${toOpen}"]`));
}
document.querySelector('.backing-button').addEventListener('click', () => {
	openModal1();
});
const actionButtons = document.querySelectorAll(
	'.blck-3 button.call-to-action'
);
actionButtons.forEach((btn) => {
	btn.addEventListener('click', () => {
		const btnAttribute = btn.getAttribute('data-select');
		openModal1(btn, btnAttribute);
	});
});

// CLOSING MODALS
const modal2 = document.querySelector('.overlay-2');
const closing = () => {
	document
		.querySelectorAll('[class^="overlay-"]')
		.forEach((x) => (x.style.display = 'none'));
	document.body.style.margin = '0';
	document.body.style.overflow = 'auto';
};
Modal1.querySelector('.exit').addEventListener('click', () => {
	closing();
});
modal2.querySelector('.call-to-action').addEventListener('click', () => {
	closing();
});

// PLEDGING AND TRACKING PLEDGES
const selectionBlocks = selectionModal.querySelectorAll('[class^="block"]');

selectionBlocks.forEach((blck) => {
	const plgShort = blck.querySelector('#sel-plg');
	plgShort.addEventListener('click', () => {
		blck.querySelector('form > input').value =
			+plgShort.querySelector('.num').textContent;
	});
	function onSubmission() {
		let numberOfBackers = +document
				.querySelector('.total-backers')
				.textContent.replace(/,/g, ''),
			amomuntBacked = +document
				.querySelector('.amount-donated')
				.textContent.replace(/,/g, '');
		numberOfBackers++;
		amomuntBacked += +blck.querySelector('form > input').value;
		document.querySelector('.total-backers').textContent =
			numberOfBackers.toLocaleString();
		document.querySelector('.amount-donated').textContent =
			amomuntBacked.toLocaleString();
		closing();
		modal2.style.display = 'block';
	}
	blck.querySelector('.call-to-action').addEventListener('click', () => {
		if (
			Number(blck.querySelector('form > input').value) >=
			Number(plgShort.querySelector('.num').textContent)
		) {
			onSubmission();
		} else {
			alert('Seems like something went wrong');
		}
	});
});
