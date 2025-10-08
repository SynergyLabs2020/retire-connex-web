/** @type {import('prettier').Config} */
export const base = {
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 100,
    tabWidth: 4,
    arrowParens: 'always',
    bracketSpacing: true,
    endOfLine: 'lf',
    plugins: ['prettier-plugin-tailwindcss', '@ianvs/prettier-plugin-sort-imports'],
    importOrderParserPlugins: ['typescript', 'jsx', 'tsx'],
};

export const reactConfig = {
    ...base,
    importOrder: [
        '^(react/(.*)$)|^(react$)',
        '',
        '<THIRD_PARTY_MODULES>',
        '',
        '^@/(.*)$',
        '',
        '^[.]',
    ],
};

export const nextConfig = {
    ...base,
    importOrder: [
        '^(next/(.*)$)|^(next$)',
        '',
        '<THIRD_PARTY_MODULES>',
        '',
        '^@/(.*)$',
        '',
        '^[.]',
    ],
};
