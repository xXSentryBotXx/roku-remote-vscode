const vscode = require('vscode');
const request = require('request');
const path = require('path');
const fs = require('fs');

const { KEYS, ACTIONS } = require('./src/constants');
const { interpolate } = require('./src/utils');
const IP = '0.0.0.0';
const PORT = 8060;

const window = vscode.window;

function activate(context) {
  console.log('Extension activated');
  
	const onDiskPath = vscode.Uri.file(
        path.join(context.extensionPath, 'src', 'remote.html')
    );

  const file = onDiskPath.with({ scheme: 'vscode-resource' });

	const commandId = 'extension.roku-remote';
	let disposable = vscode.commands.registerCommand(commandId, function () {

		const panel = window.createWebviewPanel(
			'roku_remote',
			'Roku Remote',
			vscode.ViewColumn.Two,
			{
				enableScripts: true
			}
    );

		panel.webview.html = interpolate(fs.readFileSync(file.fsPath, 'utf8'), KEYS);

		panel.webview.onDidReceiveMessage(
			message => {
        const action = ACTIONS[message];
        if (action) {
          console.log(action);
          request.post(`http://${IP}:${PORT}/keypress/${action}`);
        }
			},
			undefined,
			context.subscriptions
		);

		panel.onDidDispose(
			() => {
			console.log('disposed');
			},
			null,
			context.subscriptions
		)
	});
	context.subscriptions.push(disposable);
}

function deactivate() {
  console.log('Extension disactivated');
}

module.exports = {
  activate,
  deactivate
}
