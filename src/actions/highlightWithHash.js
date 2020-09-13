let nodes = [];

export default function highlightWithHash(node, {color, dur}, add=true) {
    add && nodes.push({node,color,dur});
    if (node.id && location.hash === `#${node.id}`) {
        node.style.backgroundColor = color;
        
        setTimeout(() => {
            node.style.transitionDuration = `${dur}ms`;
            node.style.backgroundColor = 'transparent'
        }, 0);

        setTimeout(() => {
            node.style.transitionDuration = null; node.style.backgroundColor = null
        }, dur);
    }

    return {
        "destroy": () => {
            nodes.splice(nodes.indexOf(nodes.find(item => item.node === node)), 1);
        }
    }
}

process.browser && window.addEventListener("hashchange", () => {
    nodes.forEach(node => {
        highlightWithHash(node.node, {color: node.color, dur: node.dur},false);
    });
});