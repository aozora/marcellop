/**
 * Original code: https://github.com/anotherempty/svelte-intersection-api-action/blob/master/src/index.js
 * @param entries
 * @param node
 */

const handle = (entries, node) => {
	entries.forEach((entry) => {
		node.dispatchEvent(new CustomEvent('crossed', { detail: entry }));
	});
};

export function intersectionAPI(node, options = {}) {
	const observer = new IntersectionObserver((entries) => handle(entries, node), options);
	observer.observe(node);

	return {
		destroy() {
			observer.unobserve(node);
		}
	};
}
