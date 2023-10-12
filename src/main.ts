import { Editor, MarkdownView, Notice, Plugin } from 'obsidian';
import CommandHandler from './commandHandler';
import { DEFAULT_SETTINGS } from './settings/DefaultSettings';
import MathjaxLinterSettings from './settings/PluginSettings';
import { SampleSettingTab } from './settings/SettingsPage';

export default class MathjaxLinter extends Plugin {
	settings: MathjaxLinterSettings;
	commandHandler: CommandHandler = new CommandHandler(this);

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
