const vscode = require('vscode');
const http = require('http');

const { KEYS } = require('./src/constants');

const IP = '0.0.0.0';
const PORT = 8060;

const window = vscode.window;

const res = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roku Remote</title>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  </head>
  <body>
    <button onclick="upKey()">Up</button>
	<button onclick="leftKey()">Left</button>
	<button onclick="downKey()">Down</button>
	<button onclick="rightKey()">Right</button>
	<button onclick="backKey()">Back</button>
    <button onclick="OKKey()">OK</button>
	<script>
		const vscode = acquireVsCodeApi();

		function upKey () {
			vscode.postMessage('${KEYS.UP}');
		}

		function leftKey () {
			vscode.postMessage('${KEYS.LEFT}');
		}

		function downKey () {
			vscode.postMessage('${KEYS.DOWN}');
		}

		function rightKey () {
			vscode.postMessage('${KEYS.RIGHT}');
		}

		function backKey () {
			vscode.postMessage('${KEYS.BACK}');
		}

		function OKKey () {
			vscode.postMessage('${KEYS.OK}');
		}

		function onKeyDown (e) {
			vscode.postMessage(e.code);
		}

		document.addEventListener('keydown', onKeyDown);
    </script>
  </body>
</html>`;

function activate(context) {
	console.log('Extension activated');

	const commandId = 'extension.roku-remote'
	let disposable = vscode.commands.registerCommand(commandId, function () {

		const panel = window.createWebviewPanel(
			'type_id',
			'Roku Remote',
			vscode.ViewColumn.Two,
			{
				enableScripts: true
			}
		);
		
		panel.webview.html = res;

		panel.webview.onDidReceiveMessage(
			message => {
				switch (message) {
					case KEYS.UP:
						console.log(KEYS.UP);
						http.get(`http://${IP}:${PORT}/press/Up`);
						break;
					case KEYS.LEFT:
						console.log(KEYS.LEFT);
						http.get(`http://${IP}:${PORT}/press/Left`);
						break;
					case KEYS.DOWN:
						console.log(KEYS.DOWN);
						http.get(`http://${IP}:${PORT}/press/Down`);
						break;
					case KEYS.RIGHT:
						console.log(KEYS.RIGHT);
						http.get(`http://${IP}:${PORT}/press/Right`);
						break;
					case KEYS.OK:
						console.log(KEYS.OK);
						http.get(`http://${IP}:${PORT}/press/Select`);
						break;
					case KEYS.BACK:
						console.log(KEYS.BACK);
						http.get(`http://${IP}:${PORT}/press/Back`);
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

module.exports = {
  activate,
  deactivate
}
