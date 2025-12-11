import "@google/model-viewer";
import { ModelViewerElement } from "@google/model-viewer";

const vscode = acquireVsCodeApi();

async function loadModelFromData(initialContent: Uint8Array): Promise<string> {
    const blob = new Blob([initialContent]);
    return URL.createObjectURL(blob);
}

function isUsdzFile(fileExtension: string): boolean {
    return fileExtension === '.usdz';
}

document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener('message', async e => {
        const { type, body, fileExtension } = e.data;
        switch (type) {
            case 'update':
                {
                    loadModelFromData(body).then(modelpath => {
                        const modelViewer: ModelViewerElement = document.querySelector('#model-3d')!;
                        const nativeModel: HTMLElement = document.querySelector('#model-native')!;
                        
                        if (isUsdzFile(fileExtension)) {
                            // Use native <model> element for USDZ files
                            modelViewer.style.display = 'none';
                            nativeModel.style.display = 'block';
                            nativeModel.setAttribute('src', modelpath);
                        } else {
                            // Use model-viewer for glTF/glb files
                            nativeModel.style.display = 'none';
                            modelViewer.style.display = 'grid';
                            modelViewer.src = modelpath;
                        }
                    });

                    return;
                }
        }
    });

    vscode.postMessage({ type: 'ready' });
});
