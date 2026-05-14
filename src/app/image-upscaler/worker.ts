import Upscaler from 'upscaler';

let upscaler: any = null;

self.onmessage = async (e: MessageEvent) => {
  const { type, image, patchSize, padding } = e.data;

  if (type === 'init') {
    try {
      if (!upscaler) {
        upscaler = new Upscaler();
      }
      self.postMessage({ type: 'init-success' });
    } catch (error: any) {
      self.postMessage({ type: 'error', message: error.message || 'Failed to initialize AI' });
    }
    return;
  }

  if (type === 'upscale') {
    try {
      if (!upscaler) {
        throw new Error("Upscaler not initialized");
      }

      // Convert base64 Data URL to ImageBitmap inside the worker
      const response = await fetch(image);
      const blob = await response.blob();
      const imageBitmap = await createImageBitmap(blob);

      // Perform the AI Upscaling process returning a tensor
      const tensor = await upscaler.upscale(imageBitmap, {
        output: 'tensor',
        patchSize: patchSize || 64,
        padding: padding || 2,
        progress: (percent: number) => {
          self.postMessage({ type: 'progress', percent });
        }
      });

      // Extract pixel data and shape from the tensor
      const data = await tensor.data();
      const shape = tensor.shape; // [height, width, channels]

      self.postMessage({ type: 'success', data, shape });

      // Dispose tensor to free memory
      tensor.dispose();

    } catch (error: any) {
      self.postMessage({ type: 'error', message: error.message || 'Failed to upscale image' });
    }
  }
};
