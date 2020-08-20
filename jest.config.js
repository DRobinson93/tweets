/**jest.config.js**/
module.exports = {
    testRegex: 'resources/js/test/.*.test.js$',
    setupFilesAfterEnv: ["@testing-library/react/cleanup-after-each"]
};
