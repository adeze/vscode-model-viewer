# vscode-model-viewer README

This is the vscode extention for viewing 3D models including glTF(glb) and USDZ formats.
- Uses the native HTML `<model>` element (https://webkit.org/blog/17118/a-step-into-the-spatial-web-the-html-model-element-in-apple-vision-pro/) with Google's model-viewer (https://github.com/google/model-viewer) as a fallback for broader browser support
- Supports USDZ, glTF, and glb file formats

## How to view 3D models (glb/gltf/usdz)

1. Install extension
2. Open a 3D model file (glb, gltf, or usdz) in editor
3. Press Ctrl + Shift + P
4. Pick `View: Reopen Editor With...`
5. `Configure default editor for *.glb` (or *.gltf, *.usdz)
6. `3D Model`

![image](doc/how_to_view.gif)

## Extension Settings

There is no settings yet.

## Release Notes

### v0.0.2

Initial release
