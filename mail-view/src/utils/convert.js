import {useSettingStore} from "@/store/setting.js";
import {useServerStore} from "@/store/server.js";
export function cvtR2Url(key) {

    if (!key) {
        return ''
    }

    if (/^https?:\/\//i.test(key)) {
        return key
    }

    const { settings } = useSettingStore();

    let domain = settings.r2Domain

    if (!domain) {
        const baseUrl = useServerStore().getActiveBaseURL().replace(/\/$/, '')
        return `${baseUrl}/oss/${key.replace(/^\//, '')}`;
    }

    if (!domain.startsWith('http')) {
        return 'https://' + domain + '/' + key
    }

    if (domain.endsWith("/")) {
        domain = domain.slice(0, -1);
    }
    return domain + '/' + key
}

export function toOssDomain(domain) {

    if (!domain) {
        return ''
    }

    if (!domain.startsWith('http')) {
        return 'https://' + domain
    }

    if (domain.endsWith("/")) {
        domain = domain.slice(0, -1);
    }

    return domain
}
