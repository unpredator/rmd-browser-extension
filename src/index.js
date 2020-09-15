const createElement = (tagName, attributes, ...childNodes) => {
	const newElement = document.createElement(tagName);

	for (const [key, value] of Object.entries(attributes)) {
		// text
		if (key === "text") {
			const textNode = document.createTextNode(value);
			newElement.appendChild(textNode);
			continue;
		}

		// event
		if (typeof value === "function") {
			const eventName = key.slice(2);
			if (!attributes.eventTarget) {
				newElement.addEventListener(eventName, value);
				continue;
			}
		}

		newElement.setAttribute(key, value);
	}

	// childNodes
	const fragment = document.createDocumentFragment();
	for (const node of childNodes) {
		if (node === null) {
			continue;
		}
		// comopnent
		if (node instanceof Component) {
			fragment.appendChild(node.getElement());
			continue;
		}

		fragment.appendChild(node);
	}
	newElement.appendChild(fragment);

	return newElement;
};

const sideTab =
	document.querySelector(".flex-shrink-0.col-3") || // pull request
	document.querySelector(".flex-shrink-0.col-12.col-md-3"); // create pull request

const title = createElement("div", {
	class: "discussion-sidebar-heading text-bold",
	text: "Review Makes Developer",
});

sideTab.prepend(title);
