const copyButton = document.getElementById('copy-command');
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(document.getElementById('command').textContent);
    copyButton.textContent = 'Copied!';
  } catch {
    copyButton.textContent = 'Select and copy the command above';
  }
});
