import { MathjaxLinter } from '../src/main.ts';

describe('MathjaxLinter', () => {
  let mockPlugin;

  beforeEach(() => {
    mockPlugin = {
      loadData: jest.fn(),
      saveData: jest.fn(),
      addSettingTab: jest.fn()
    };
  });

  test('onload loads settings correctly', async () => {
    const expectedSettings = { mySetting: 'test' };
    mockPlugin.loadData.mockResolvedValue(expectedSettings);
    const linter = new MathjaxLinter(mockPlugin);
    await linter.onload();
    expect(linter.settings).toEqual(expectedSettings);
  });

  test('loadSettings loads settings correctly', async () => {
    const expectedSettings = { mySetting: 'test' };
    mockPlugin.loadData.mockResolvedValue(expectedSettings);
    const linter = new MathjaxLinter(mockPlugin);
    await linter.loadSettings();
    expect(linter.settings).toEqual(expectedSettings);
  });

  test('saveSettings saves settings correctly', async () => {
    const expectedSettings = { mySetting: 'test' };
    const linter = new MathjaxLinter(mockPlugin);
    linter.settings = expectedSettings;
    await linter.saveSettings();
    expect(mockPlugin.saveData).toHaveBeenCalledWith(expectedSettings);
  });
});
