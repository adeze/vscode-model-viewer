import "@google/model-viewer";
import { ModelViewerElement } from "@google/model-viewer";

const vscode = acquireVsCodeApi();

async function loadModelFromData(initialContent: Uint8Array, mimeType: string): Promise<string> {
    const blob = new Blob([initialContent], { type: mimeType });
    return URL.createObjectURL(blob);
}

/**
 * Returns the appropriate MIME type for 3D model file formats.
 * Used to set correct content type for <source> elements in native <model> element.
 */
function getMimeType(fileExtension: string): string {
    switch (fileExtension) {
        case '.usdz':
            return 'model/vnd.usdz+zip';
        case '.glb':
            return 'model/gltf-binary';
        case '.gltf':
            return 'model/gltf+json';
        default:
            return 'application/octet-stream';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener('message', async e => {
        const { type, body, fileExtension } = e.data;
        switch (type) {
            case 'update':
                {
                    const mimeType = getMimeType(fileExtension);
                    loadModelFromData(body, mimeType).then(modelpath => {
                        const nativeModel: HTMLElement = document.querySelector('#model-native')!;
                        const modelViewer: ModelViewerElement = document.querySelector('#model-3d')!;
                        
                        // Clear existing sources
                        const existingSources = nativeModel.querySelectorAll('source');
                        existingSources.forEach(source => source.remove());
                        
                        // Create and add source element for native <model>
                        const source = document.createElement('source');
                        source.src = modelpath;
                        source.type = mimeType;
                        nativeModel.insertBefore(source, modelViewer);
                        
                        // Also set model-viewer src as fallback
                        modelViewer.src = modelpath;
                    });

                    return;
                }
        }
    });

    vscode.postMessage({ type: 'ready' });
});
