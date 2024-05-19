
export const truncate = (str: string, length: number) => {
    if (!str) return '...';
    if (str.length <= length) return str;
    const prefix = str.slice(0, length / 2);
    const suffix = str.slice(-length / 2);
    return `${prefix}...${suffix}`;
}
