import * as vscode from "vscode";
import { getWebviewContent } from "./webview";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "calendar-scheduler.openCalendar",
    () => {
      const panel = vscode.window.createWebviewPanel(
        "calendarScheduler",
        "Calendar Scheduler",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        }
      );

      panel.webview.html = getWebviewContent();

      panel.webview.onDidReceiveMessage((message) => {
        switch (message.command) {
          case "addSchedule":
            vscode.window.showInformationMessage(
              `Schedule added: ${message.text}`
            );
            return;
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
