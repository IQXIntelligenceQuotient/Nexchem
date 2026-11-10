(() => {
    const dialog = document.querySelector('#solvent-dialog');
    if (!dialog || typeof dialog.showModal !== 'function') return;

    const entries = [...document.querySelectorAll('.solvent-entry')];
    const search = document.querySelector('.solvent-search');
    const input = search.querySelector('input');
    const status = document.querySelector('#solvent-results');
    const empty = document.querySelector('#solvent-empty');
    const copy = dialog.querySelector('.solvent-dialog-copy');
    const preview = dialog.querySelector('#solvent-preview');
    const caption = dialog.querySelector('#solvent-caption');
    const mediaNote = dialog.querySelector('.solvent-media-note');
    const viewButtons = [...dialog.querySelectorAll('.solvent-views button')];
    const imageRoot = 'assets/img/solvents/';
    const packages = {
        'solvent-butyl-acetate': ['solvent-drums', 'Blue drums with amber sample bottles'],
        'solvent-methyl-acetate': ['solvent-methyl-bottle', 'White sample bottle with a silver label']
    };
    const liquidViews = [
        ['solvent-beaker', 'Clear stand-in liquid in a beaker'],
        ['solvent-vial', 'Clear stand-in liquid in a sample vial'],
        ['solvent-cylinder', 'Clear stand-in liquid in a graduated cylinder']
    ];
    let activeProduct;
    let opener;

    const normalize = value => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

    function filterProducts() {
        const terms = normalize(input.value).split(' ').filter(Boolean);
        let count = 0;
        for (const entry of entries) {
            const name = normalize(entry.querySelector('summary').textContent);
            entry.hidden = !terms.every(term => name.includes(term));
            if (!entry.hidden) count++;
        }
        empty.hidden = count !== 0;
        status.textContent = count ? `${count} product${count === 1 ? '' : 's'} shown` : 'No matching products';
    }

    function showView(index) {
        const packaging = packages[activeProduct.id] || ['solvent-bottle', 'White chemical sample bottle'];
        const [file, description] = [packaging, ...liquidViews][index];
        preview.src = `${imageRoot}${file}.webp`;
        preview.alt = description;
        caption.textContent = description;
        viewButtons.forEach((button, position) => button.setAttribute('aria-pressed', String(index === position)));
    }

    function openProduct(entry, trigger) {
        activeProduct = entry;
        opener = trigger;
        const showLiquidViews = entry.dataset.liquidPreview !== 'unavailable';
        viewButtons.slice(1).forEach(button => { button.hidden = !showLiquidViews; });
        mediaNote.textContent = showLiquidViews
            ? 'The liquid views use the same clear stand-in across products. Ask Nexchem for actual appearance and packaging.'
            : 'Packaging illustration only. Ask Nexchem for the exact grade and a representative sample.';
        const details = entry.querySelector('.solvent-info').cloneNode(true);
        details.querySelector('h3').id = 'solvent-dialog-title';
        copy.replaceChildren(details);
        showView(0);
        document.documentElement.classList.add('solvent-modal-open');
        dialog.showModal();
        dialog.scrollTop = 0;
    }

    search.hidden = false;
    input.addEventListener('input', filterProducts);

    entries.forEach(entry => {
        const summary = entry.querySelector('summary');
        summary.setAttribute('aria-haspopup', 'dialog');
        summary.addEventListener('click', event => {
            event.preventDefault();
            openProduct(entry, summary);
        });
    });
    document.querySelectorAll('.solvent-photo').forEach(link => {
        link.setAttribute('aria-haspopup', 'dialog');
        link.addEventListener('click', event => {
            event.preventDefault();
            openProduct(document.querySelector(link.hash), link);
        });
    });
    viewButtons.forEach((button, index) => button.addEventListener('click', () => showView(index)));
    dialog.querySelector('.solvent-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
        if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => {
        document.documentElement.classList.remove('solvent-modal-open');
        opener?.focus({ preventScroll: true });
    });
})();
