module.exports = {
  projectId: 'aicyjg',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    video: true,
    videoCompression: 15,
    videosFolder: 'cypress/videos',
    videoUploadOnPasses: true
  },
};
