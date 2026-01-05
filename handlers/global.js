export const generateId = () => { return Math.random().toString(36).substr(2, 9); }

export const getCenter = (n) => { return { x: n.x + n.w/2, y: n.y + n.h/2, w: n.w, h: n.h }; }

export const screenToWorld = ({state, sx, sy}) => {
    return {
        x: (sx - state.pan.x) / state.scale,
        y: (sy - state.pan.y) / state.scale
    };
}

export const promise_chain = (funcs) => {
    return funcs.reduce((promise, func) => {
        return promise.then(result => func().then(Array.prototype.concat.bind(result)));
    }, Promise.resolve([]));
};

export const render_resource_badges = ({nodeElement, options = {}}) => {
    const resourceBadges = nodeElement.querySelector('.resource-badges');
    if (resourceBadges) {
        resourceBadges.innerHTML = ''; // Clear existing badges

        const descInput = nodeElement.querySelector('.node-desc');
        const descValue = descInput.value.trim();
        if (!descValue) return;

        let descObject;
        try { 
            if (descValue.startsWith('{') && descValue.endsWith('}'))
                descObject = JSON.parse(descValue);
            else
                descObject = JSON.parse(`{${descValue}}`); 
        } 
        catch (err) { return; }

        const defaults = {
            show_remove_button: true
        }
        options = Object.assign({}, defaults, options);
        Object.entries(descObject).forEach(([key, value]) => {
            const badge = `<div class="resource-badge">
                ${key} = ${value} 
                ${options.show_remove_button ? `<div class="resource-badge-remove" data-key="${key}">×</div>` : ''}
            </div>`;
            resourceBadges.innerHTML += badge;
        });
    }
}