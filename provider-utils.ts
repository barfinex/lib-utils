/**
 * Безопасное отображение имени провайдера в логах.
 */
export function providerName(p: any): string {
    if (!p) return '❌null';
    if (typeof p === 'function') return p.name;
    if (typeof p === 'symbol') return p.description ?? p.toString();
    if (typeof p === 'string') return p;
    if (typeof p === 'object' && 'provide' in p) {
        const prov = (p as any).provide;
        if (typeof prov === 'symbol') return prov.description ?? prov.toString();
        if (typeof prov === 'function') return prov.name;
        return String(prov);
    }
    return String(p);
}
