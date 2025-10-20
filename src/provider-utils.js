"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerName = providerName;
function providerName(p) {
    if (!p)
        return '❌null';
    if (typeof p === 'function')
        return p.name;
    if (typeof p === 'symbol')
        return p.description ?? p.toString();
    if (typeof p === 'string')
        return p;
    if (typeof p === 'object' && 'provide' in p) {
        const prov = p.provide;
        if (typeof prov === 'symbol')
            return prov.description ?? prov.toString();
        if (typeof prov === 'function')
            return prov.name;
        return String(prov);
    }
    return String(p);
}
//# sourceMappingURL=provider-utils.js.map