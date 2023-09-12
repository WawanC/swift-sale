import {
  applyDecorators,
  UnsupportedMediaTypeException,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';

const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

export function ValidPictures() {
  return applyDecorators(
    UseInterceptors(
      FilesInterceptor('pictures', 4, {
        dest: path.join(__dirname, '..', '..', 'temp'),
        limits: { fileSize: 1000 * 1000 },
        fileFilter(
          req: any,
          file: Express.Multer.File,
          cb: (error: Error | null, acceptFile: boolean) => void,
        ) {
          console.log(file.size);
          if (!allowedTypes.includes(file.mimetype)) {
            return cb(
              new UnsupportedMediaTypeException(
                'Valid picture file is required',
              ),
              false,
            );
          }
          return cb(null, true);
        },
      }),
    ),
  );
}
