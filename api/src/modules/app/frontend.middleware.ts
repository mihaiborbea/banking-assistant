import * as path from 'path';

const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg', '.json'];

const resolvePath = (file: string) => path.resolve(__dirname, '..', '..', '..', 'public', file);

export function frontendMiddleware(req: any, res: any, next: any): any {
  const { url } = req;
  if (url.indexOf('api') === 1) {
    // it starts with /api --> continue with execution
    next();
  } else if (url.indexOf('uploads') === 1) {
    const fileName = url.split('/')[url.split('/').length - 1];
    res.sendFile(resolvePath(path.join('uploads', 'merchants', fileName)));
  } else if (allowedExt.filter(ext => url.indexOf(ext) > 0).length > 0) {
    // it has a file extension --> resolve the file
    res.sendFile(resolvePath(`client${url}`));
  } else {
    // in all other cases, redirect to the index.html!
    res.sendFile(resolvePath('client/index.html'));
  }
}
