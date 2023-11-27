import { DEFAULT_SETTINGS } from '../src/settings/DefaultSettings';
import MathjaxLinterSettings from '../src/settings/PluginSettings';

describe('Settings', () => {
  test('DEFAULT_SETTINGS matches expected default settings', () => {
    const expectedSettings: MathjaxLinterSettings = {
      mySetting: 'default'
    };
    expect(DEFAULT_SETTINGS).toEqual(expectedSettings);
  });

  test('DEFAULT_SETTINGS conforms to MathjaxLinterSettings interface', () => {
    const isMathjaxLinterSettings = (settings: any): settings is MathjaxLinterSettings => {
      return 'mySetting' in settings;
    };
    expect(isMathjaxLinterSettings(DEFAULT_SETTINGS)).toBe(true);
  });
});
