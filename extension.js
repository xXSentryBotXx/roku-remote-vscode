const vscode = require('vscode');
const request = require('request');
const path = require('path');
const fs = require('fs');

const { KEYS, REMOTE_ACTIONS, EXT_ACTIONS } = require('./src/constants');
const { interpolate } = require('./src/utils');
const PORT = 8060;

const window = vscode.window;

let ipAddress = '0.0.0.0';

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
				console.log(message);
				switch (message.action) {
					case EXT_ACTIONS.REMOTE_ACTION:
						const remoteAction = REMOTE_ACTIONS[message.payload];
						if (remoteAction) {
							request.post(`http://${ipAddress}:${PORT}/keypress/${remoteAction}`);
						}
						break;
					case EXT_ACTIONS.SET_IP_ADDRESS:
						ipAddress = message.payload;
						break;
					case EXT_ACTIONS.SEND_TEXT:
						sendTextToRoku(message.payload);
						break;
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

function sendTextToRoku(text) {
	const MS_INTERVAL = 400;
	Array.prototype.forEach.call(text, (l, idx) => {
		setTimeout(() => {
			request.post(`http://${ipAddress}:${PORT}/keypress/LIT_${l}`);
		}, MS_INTERVAL * idx);
	});
}

module.exports = {
  activate,
  deactivate
}
