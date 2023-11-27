import { CommandHandler } from '../src/commandHandler.ts';

describe('CommandHandler', () => {
  let mockPlugin;

  beforeEach(() => {
    mockPlugin = {
      addCommand: jest.fn(),
      app: {
        vault: {
          read: jest.fn()
        }
      }
    };
  });

  test('loadCommands adds a command to the plugin', () => {
    const handler = new CommandHandler(mockPlugin);
    expect(mockPlugin.addCommand).toHaveBeenCalled();
  });

  test('loadCommands handles null plugin', () => {
    const handler = new CommandHandler(null);
    expect(mockPlugin.addCommand).not.toHaveBeenCalled();
  });

  test('trimMathJax trims MathJax equations in a markdown string', () => {
    const markdown = "$$ equation $$";
    const expected = "$$equation$$";
    expect(CommandHandler.trimMathJax(markdown)).toEqual(expected);
  });

  test('trimMathJax handles null markdown string', () => {
    expect(CommandHandler.trimMathJax(null)).toEqual("");
  });
});
