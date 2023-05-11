/* eslint-disable */
export default {
  displayName: 'chain-interactions',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/chain-interactions',
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
};
