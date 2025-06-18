

export function domToJson(node) {
    const selfClosingTags = new Set(["input", "br", "hr", "img", "meta", "link"]);

    if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.trim();
        return text ? { textContent: text } : null;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return null;

    const tag = node.tagName.toLowerCase();
    const json = { startTag: tag };

    if (selfClosingTags.has(tag)) {
        json.endTag = "/";
    } else {
        json.endTag = `/${tag}`;
    }

    if (node.attributes?.length) {
        json.attr = Array.from(node.attributes).map(attr => ({
            key: attr.name,
            value: attr.name === "required" ? true : attr.value
        }));
    }

    const children = Array.from(node.childNodes)
        .map(domToJson)
        .filter(Boolean);

    if (children.length) {
        json.elements = children;
    }

    return json;
}

export function jsonToDom(json) {
    if (!json.startTag) {
        return document.createTextNode(json.textContent || '');
    }

    const svgns = "http://www.w3.org/2000/svg";
    const svgTags = new Set([
        "svg", "path", "circle", "line", "ellipse", "rect",
        "text", "image", "defs", "pattern"
    ]);

    const create = svgTags.has(json.startTag)
        ? () => document.createElementNS(svgns, json.startTag)
        : () => document.createElement(json.startTag);

    const el = create();

    if (json.attr) {
        for (const { key, value } of json.attr) {
            el.setAttribute(key, value === true ? "" : value);
        }
    }

    if (json.textContent) {
        el.textContent = json.textContent;
    }

    if (json.elements) {
        for (const child of json.elements) {
            el.appendChild(jsonToDom(child));
        }
    }

    return el;
}