### niivue-tinygrad

This repository uses the WebGL2-based [NiiVue](https://github.com/niivue/niivue) to simulate the [acacc-viewer](https://brainbrowser.cbrain.mcgill.ca/macacc-viewer) of the seminal WebGL1 [BrainBrowser](https://github.com/aces/brainbrowser).

### For Developers

You can serve a hot-reloadable web page that allows you to interactively modify the source code.

```bash
git clone git@github.com:rordenlab/niivue-macacc.git
cd niivue-macacc
npm install
npm run dev
```

#### to build and serve the built version

```bash
npm run build
npx http-server dist/ # or npm run preview
```

