export const downloadJson = (data: any, filename: string) => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });

  // Create a link and set the URL as the blob URL
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.json`;

  // Append to the document, click and then remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Revoke the blob URL
  URL.revokeObjectURL(url);
};
