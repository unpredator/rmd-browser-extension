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

const form = createElement(
	"form",
	{ class: "thread-subscribe-form" },
	createElement("button", {
		class: "btn btn-block btn-sm thread-subscribe-button black-and-white",
		text: "request review with RMD",
	}),
	createElement("p", {
		class: "reason text-small text-gray",
		text:
			"unpredator encourage every developers to take one step further with reviewing each others code",
	})
);

sideTab.prepend(form);
sideTab.prepend(title);
