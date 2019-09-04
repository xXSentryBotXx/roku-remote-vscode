const vscode = require('vscode');
const request = require('request');

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
  </head>
  <body>
	<table>
		<tr>
			<td colspan="2">
				<button onclick="backKey()">Back</button>
			</td>
			<td colspan="2">
				<button onclick="homeKey()">Home</button>
			</td>
		</tr>
		<tr>
			<td></td>
			<td>
				<button onclick="upKey()">Up</button>
			</td>
			<td></td>
		</tr>
		<tr>
			<td>
				<button onclick="leftKey()">Left</button>
			</td>
			<td>
				<button onclick="OKKey()">OK</button>
			</td>
			<td>
				<button onclick="rightKey()">Right</button>
			</td>
		</tr>
		<tr>
			<td></td>
			<td>
				<button onclick="downKey()">Down</button>
			</td>
			<td></td>
		</tr>
	</table>

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

		function homeKey () {
			vscode.postMessage('${KEYS.HOME}');
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
						request.post(`http://${IP}:${PORT}/keypress/Up`);
						break;
					case KEYS.LEFT:
						console.log(KEYS.LEFT);
						request.post(`http://${IP}:${PORT}/keypress/Left`);
						break;
					case KEYS.DOWN:
						console.log(KEYS.DOWN);
						request.post(`http://${IP}:${PORT}/keypress/Down`);
						break;
					case KEYS.RIGHT:
						console.log(KEYS.RIGHT);
						request.post(`http://${IP}:${PORT}/keypress/Right`);
						break;
					case KEYS.OK:
						console.log(KEYS.OK);
						request.post(`http://${IP}:${PORT}/keypress/Select`);
						break;
					case KEYS.BACK:
						console.log(KEYS.BACK);
						request.post(`http://${IP}:${PORT}/keypress/Back`);
						break;
					case KEYS.HOME:
						console.log(KEYS.HOME);
						request.post(`http://${IP}:${PORT}/keypress/Home`);
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
