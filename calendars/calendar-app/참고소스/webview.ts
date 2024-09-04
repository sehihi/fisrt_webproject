export function getWebviewContent() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Calendar Scheduler</title>
        <link rel="stylesheet" href="${vscode.Uri.file(
          path.join(context.extensionPath, "media", "styles.css")
        )}">
    </head>
    <body>
        <div id="calendar"></div>
        <script src="${vscode.Uri.file(
          path.join(context.extensionPath, "media", "script.js")
        )}"></script>
    </body>
    </html>`;
}
